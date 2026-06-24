// ============================================================
// Générateur de la table BUNNY_FILES (photos produit)
// ------------------------------------------------------------
// Sonde le CDN Bunny public pour CHAQUE coloris déjà connu et
// réécrit `BUNNY_FILES` dans src/lib/imageUtils.ts d'après ce qui
// existe RÉELLEMENT en ligne. Plus de liste figée à maintenir.
//
// Aucune clé requise : on interroge le CDN public (GET/HEAD).
// Un paramètre anti-cache force l'origine pour refléter les
// suppressions récentes.
//
// Lancer :  node scripts/sync-bunny-photos.mjs
//           node scripts/sync-bunny-photos.mjs --dry   (aperçu sans écrire)
// ============================================================

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = join(__dirname, '..', 'src', 'lib', 'imageUtils.ts');
const DRY = process.argv.includes('--dry');

const MAX_INDEX = 9;            // on teste 1.jpg .. 9.jpg
const EXTS = ['jpg', 'png'];    // extensions possibles
const CONCURRENCY = 24;         // requêtes simultanées

const src = readFileSync(FILE, 'utf8');

// --- Récupère les constantes CDN / dossier depuis le fichier ---
const cdn = src.match(/const BUNNY_CDN = '([^']+)'/)?.[1];
const folderRoot = src.match(/const BUNNY_FOLDER = '([^']+)'/)?.[1];
if (!cdn || !folderRoot) {
  console.error('Impossible de lire BUNNY_CDN / BUNNY_FOLDER dans imageUtils.ts');
  process.exit(1);
}

// --- Isole le bloc BUNNY_FILES ---
const blockRe = /const BUNNY_FILES: Record<string, string\[\]> = \{\n([\s\S]*?)\n\};/;
const blockMatch = src.match(blockRe);
if (!blockMatch) {
  console.error('Bloc BUNNY_FILES introuvable.');
  process.exit(1);
}

// --- Clés (dossiers) dans leur ordre d'origine ---
const keys = [...blockMatch[1].matchAll(/^\s*'([^']+)':/gm)].map((m) => m[1]);
console.log(`${keys.length} coloris à sonder sur ${cdn}/${folderRoot}\n`);

// --- Sonde un fichier (true si 200) ---
async function exists(folder, file) {
  const url = `${cdn}/${folderRoot}/${folder}/${file}?nocache=${Date.now()}-${Math.round(performance.now())}`;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.status === 200;
  } catch {
    return false;
  }
}

// --- Sonde un dossier : renvoie la liste des fichiers présents, en ordre ---
async function probeFolder(folder) {
  const files = [];
  for (let i = 1; i <= MAX_INDEX; i++) {
    for (const ext of EXTS) {
      if (await exists(folder, `${i}.${ext}`)) files.push(`${i}.${ext}`);
    }
  }
  return files;
}

// --- Pool de concurrence ---
async function mapPool(items, fn, size) {
  const out = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const cur = idx++;
      out[cur] = await fn(items[cur], cur);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, worker));
  return out;
}

// --- Table actuelle, pour comparer ---
const current = {};
for (const m of blockMatch[1].matchAll(/^\s*'([^']+)':\s*\[([^\]]*)\]/gm)) {
  current[m[1]] = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

const results = await mapPool(keys, async (folder) => [folder, await probeFolder(folder)], CONCURRENCY);

// --- Construit le nouveau bloc + journal des changements ---
const lines = [];
let changed = 0;
let emptied = 0;
for (const [folder, found] of results) {
  const before = current[folder] || [];
  // Garde-fou : si rien trouvé (réseau ?), on conserve l'existant et on avertit.
  const finalList = found.length > 0 ? found : before;
  if (found.length === 0) {
    emptied++;
    console.warn(`  ! ${folder} : 0 fichier trouvé, ancien conservé (${before.join(', ')})`);
  }
  const beforeStr = before.join(',');
  const afterStr = finalList.join(',');
  if (beforeStr !== afterStr) {
    changed++;
    console.log(`  ~ ${folder} : [${before.join(', ')}] -> [${finalList.join(', ')}]`);
  }
  lines.push(`  '${folder}': [${finalList.map((f) => `'${f}'`).join(',')}],`);
}

console.log(`\n${changed} coloris modifié(s), ${emptied} sans fichier (conservés).`);

if (DRY) {
  console.log('\n[--dry] aucun fichier écrit.');
  process.exit(0);
}

const newBlock = `const BUNNY_FILES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const out = src.replace(blockRe, newBlock);
writeFileSync(FILE, out, 'utf8');
console.log(`\nimageUtils.ts mis à jour. Pense à relancer le serveur dev (HMR ne recharge pas ce fichier).`);
