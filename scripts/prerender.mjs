// Pré-rendu post-build : rend chaque route avec un Chromium moderne (Puppeteer)
// contre `vite preview`, puis écrit le HTML complet dans dist/<route>/index.html.
// Remplace vite-plugin-prerender (qui embarquait un Chromium de 2019 incapable
// de rendre l'app). Fail-soft : si Puppeteer ne peut pas démarrer, le build
// n'échoue pas (Googlebot rend le JS, le noindex est levé).
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// Routes FR (sans préfixe = canonical / x-default). Exclues : /product/:id
// (handles Shopify non énumérables au build), /cart, /checkout(/confirmation),
// /blog (orphelin), et toutes les redirections.
const ROUTES = [
  '/',
  '/collections/heritage',
  '/collections/versailles',
  '/collections/isis',
  '/shop',
  '/histoire',
  '/manifeste',
  '/fabrication',
  '/opticiens',
  '/faq',
  '/contact',
  '/garantie',
  '/guide-tailles',
  '/livraison',
  '/suivi-commande',
  '/mentions-legales',
  '/confidentialite',
  '/cgv',
  '/cookies',
];

const READY = 'html[data-prerender-ready]';
const NAV_TIMEOUT = 45000;

async function main() {
  // dist doit exister (build préalable).
  try {
    await fs.access(path.join(DIST, 'index.html'));
  } catch {
    console.warn('[prerender] dist/index.html absent — lancer `vite build` d’abord. Ignoré.');
    return;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=fr-FR'],
    });
  } catch (err) {
    console.warn('[prerender] Puppeteer indisponible, pré-rendu ignoré :', err.message);
    return;
  }

  const server = await preview({ root: ROOT, preview: { port: 4190, strictPort: false }, logLevel: 'warn' });
  const base = (server.resolvedUrls?.local?.[0] ?? 'http://localhost:4190/').replace(/\/$/, '');

  // Capture TOUT en mémoire d’abord : on n’écrit dans dist qu’à la fin, sinon
  // le fallback SPA servirait un index.html déjà muté pendant les captures.
  const captured = [];
  const failures = [];

  for (const route of ROUTES) {
    const page = await browser.newPage();
    // Forcer le français (sans préfixe, i18n retombe sur navigator.language).
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'language', { get: () => 'fr-FR' });
      Object.defineProperty(navigator, 'languages', { get: () => ['fr-FR', 'fr'] });
    });
    try {
      // domcontentloaded + attente du signal applicatif (data-prerender-ready) :
      // plus robuste que networkidle0, qui ne se déclenche jamais si une connexion
      // traîne (CDN, pixel). Le signal garantit déjà contenu + Helmet posés.
      await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
      await page.waitForSelector(READY, { timeout: NAV_TIMEOUT });
      let html = await page.content();
      html = html.replace(' data-prerender-ready="true"', '');
      captured.push({ route, html });
      console.log('[prerender] ok   ' + route);
    } catch (err) {
      failures.push(route);
      console.warn('[prerender] ÉCHEC ' + route + ' : ' + err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await server.close();

  // Écriture finale.
  for (const { route, html } of captured) {
    const outDir = route === '/' ? DIST : path.join(DIST, route);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
  }

  console.log(`[prerender] ${captured.length}/${ROUTES.length} routes écrites.`);
  if (failures.length) {
    console.warn('[prerender] routes non rendues (laissées au rendu JS) : ' + failures.join(', '));
  }
}

main().catch((err) => {
  // Fail-soft : on n’échoue jamais le build à cause du pré-rendu.
  console.warn('[prerender] erreur non bloquante :', err?.message ?? err);
});
