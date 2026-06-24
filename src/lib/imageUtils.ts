const BUNNY_CDN = 'https://renaissance-cdn.b-cdn.net';

// Dossier de la storage zone chargé le 11 juin 2026 (563 fichiers, 203 dossiers).
// Source : _BUNNY UPLOAD products / _CORRESPONDANCE.txt, vérifié en ligne fichier par fichier.
// Ordre des vues : 1 = FACE, puis TROIS-QUARTS, PROFIL, TOP.
// Graphie XXXX gardée pour 40-44 (titres Shopify actuels) ; migration XL en une fois plus tard.
const BUNNY_FOLDER = 'PRODUITS2026-06-11';

const BUNNY_FILES: Record<string, string[]> = {
  'II-Colori-1': ['1.jpg','2.jpg'],
  'II-Colori-2': ['1.jpg','2.jpg'],
  'II-Colori-3': ['1.jpg','2.jpg'],
  'III-Colori-1': ['1.jpg','2.jpg'],
  'III-Colori-2': ['1.jpg','2.jpg'],
  'III-Colori-3': ['1.jpg','2.jpg'],
  'IV-Colori-1': ['1.jpg','2.jpg'],
  'IV-Colori-2': ['1.jpg','2.jpg'],
  'IV-Colori-3': ['1.jpg','2.jpg'],
  'VI-Colori-1': ['1.jpg','2.jpg'],
  'VI-Colori-2': ['1.jpg','2.jpg'],
  'VI-Colori-3': ['1.jpg','2.jpg'],
  'VII-Colori-1': ['1.jpg','2.jpg'],
  'VII-Colori-2': ['1.jpg','2.jpg'],
  'VII-Colori-3': ['1.jpg','2.jpg'],
  'VIII-Colori-1': ['1.jpg','2.jpg'],
  'VIII-Colori-2': ['1.jpg','2.jpg'],
  'VIII-Colori-3': ['1.jpg','2.jpg'],
  'IX-Colori-1': ['1.jpg','2.jpg'],
  'IX-Colori-2': ['1.jpg','2.jpg'],
  'X-Colori-1': ['1.jpg','2.jpg'],
  'X-Colori-2': ['1.jpg','2.jpg'],
  'X-Colori-3': ['1.jpg','2.jpg'],
  'XI-51-Colori-1': ['1.jpg','2.jpg'],
  'XI-51-Colori-2': ['1.jpg','2.jpg'],
  'XI-51-Colori-3': ['1.jpg','2.jpg'],
  'XI-51-Colori-4': ['1.jpg','2.jpg'],
  'XI-51-Colori-5': ['1.jpg','2.jpg'],
  'XI-51-Colori-6': ['1.png'],
  'XI-53-Colori-1': ['1.jpg','2.jpg'],
  'XI-53-Colori-2': ['1.jpg','2.jpg'],
  'XI-53-Colori-3': ['1.jpg','2.jpg'],
  'XI-53-Colori-4': ['1.png'],
  'XI-53-Colori-5': ['1.png'],
  'XI-53-Colori-6': ['1.png'],
  'XII-Colori-1': ['1.jpg','2.jpg'],
  'XII-Colori-2': ['1.jpg','2.jpg'],
  'XII-Colori-3': ['1.jpg','2.jpg'],
  'XIII-Colori-1': ['1.jpg','2.jpg'],
  'XIII-Colori-2': ['1.jpg','2.jpg'],
  'XIII-Colori-3': ['1.jpg','2.jpg'],
  'XIII-Colori-4': ['1.jpg','2.jpg'],
  'XIII-Colori-5': ['1.png','2.png'],
  'XIII-Colori-6': ['1.png','2.png'],
  'XIII-Colori-7': ['1.png','2.png'],
  'XIV-Colori-1': ['1.jpg','2.jpg'],
  'XIV-Colori-2': ['1.jpg','2.jpg'],
  'XIV-Colori-3': ['1.jpg','2.jpg'],
  'XVI-Colori-1': ['1.jpg','2.jpg'],
  'XVI-Colori-2': ['1.jpg','2.jpg'],
  'XVI-Colori-3': ['1.jpg','2.jpg'],
  'XVII-Colori-1': ['1.jpg','2.jpg'],
  'XVII-Colori-2': ['1.jpg','2.jpg'],
  'XVII-Colori-3': ['1.jpg','2.jpg'],
  'XVII-Colori-4': ['1.jpg','2.jpg'],
  'XVII-Colori-5': ['1.png','2.png','3.png'],
  'XVII-Colori-6': ['1.png','2.png','3.png'],
  'XVII-Colori-7': ['1.jpg','2.jpg'],
  'XVII-Colori-8': ['1.jpg','2.jpg'],
  'XVIII-Colori-1': ['1.jpg','2.jpg'],
  'XVIII-Colori-2': ['1.jpg','2.jpg'],
  'XVIII-Colori-3': ['1.jpg','2.jpg'],
  'XVIII-Colori-4': ['1.jpg','2.jpg'],
  'XIX-Colori-1': ['1.jpg','2.jpg'],
  'XIX-Colori-2': ['1.jpg','2.jpg'],
  'XIX-Colori-3': ['1.jpg','2.jpg'],
  'XIX-Colori-4': ['1.jpg','2.jpg'],
  'XX-Colori-1': ['1.jpg','2.jpg'],
  'XX-Colori-2': ['1.jpg','2.jpg'],
  'XX-Colori-3': ['1.jpg','2.jpg'],
  'XXI-Colori-1': ['1.jpg','2.jpg'],
  'XXI-Colori-2': ['1.jpg','2.jpg'],
  'XXI-Colori-3': ['1.jpg','2.jpg'],
  'XXI-Colori-4': ['1.jpg','2.jpg'],
  'XXI-Colori-5': ['1.jpg','2.jpg'],
  'XXII-Colori-1': ['1.jpg','2.jpg'],
  'XXII-Colori-2': ['1.jpg','2.jpg'],
  'XXII-Colori-3': ['1.jpg','2.jpg'],
  'XXIII-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XXIII-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XXIII-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XXIII-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XXIV-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XXIV-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XXIV-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XXIV-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XXV-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XXV-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XXV-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XXVI-Colori-1': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXVI-Colori-2': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXVI-Colori-3': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXVI-Colori-4': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXVII-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXVII-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXVII-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXVIII-Colori-1': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXVIII-Colori-2': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXVIII-Colori-3': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXVIII-Colori-4': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXIX-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXIX-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXIX-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXX-Colori-1': ['1.png','2.png','3.jpg','4.jpg'],
  'XXX-Colori-2': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXX-Colori-3': ['1.jpg','2.png','3.jpg','4.jpg'],
  'XXX-Colori-4': ['1.png','2.png'],
  'XXXI-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XXXI-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XXXI-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XXXII-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXII-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXII-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXII-Colori-4': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXII-Colori-5': ['1.png','2.png'],
  'XXXII-Colori-6': ['1.jpg','2.jpg','3.jpg'],
  'XXXII-Colori-7': ['1.jpg','2.jpg','3.jpg'],
  'XXXIII-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIII-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIII-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIV-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIV-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XXXIV-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XXXIV-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XXXV-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXV-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXV-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXVI-Colori-1': ['1.jpg','2.jpg','4.jpg'],
  'XXXVI-Colori-2': ['1.jpg','2.jpg','4.jpg'],
  'XXXVI-Colori-3': ['2.jpg','3.jpg','4.jpg'],
  'XXXVII-Colori-1': ['1.jpg','2.jpg'],
  'XXXVII-Colori-2': ['1.jpg','2.jpg'],
  'XXXVII-Colori-3': ['1.jpg','2.jpg'],
  'XXXVIII-Colori-1': ['1.jpg','2.jpg'],
  'XXXVIII-Colori-2': ['1.jpg','2.jpg'],
  'XXXVIII-Colori-3': ['1.jpg','2.jpg'],
  'XXXVIII-Colori-4': ['1.jpg','2.jpg'],
  'XXXIX-Colori-1': ['1.jpg','2.jpg'],
  'XXXIX-Colori-2': ['1.jpg','2.jpg'],
  'XXXIX-Colori-3': ['1.jpg','2.jpg'],
  'XXXIX-Colori-4': ['1.jpg','2.jpg'],
  'XXXIX-Colori-5': ['1.jpg','2.jpg'],
  'XXXX-Colori-1': ['1.jpg','2.jpg'],
  'XXXX-Colori-2': ['1.jpg','2.jpg'],
  'XXXX-Colori-3': ['1.jpg','2.jpg'],
  'XXXXI-Colori-1': ['1.jpg','2.jpg'],
  'XXXXI-Colori-2': ['1.jpg','2.jpg'],
  'XXXXI-Colori-3': ['1.jpg','2.jpg'],
  'XXXXII-Colori-1': ['1.jpg','2.jpg'],
  'XXXXII-Colori-2': ['1.jpg','2.jpg'],
  'XXXXII-Colori-3': ['1.jpg','2.jpg'],
  'XXXXII-Colori-4': ['1.jpg','2.jpg'],
  'XXXXIII-Colori-1': ['1.jpg','2.jpg'],
  'XXXXIII-Colori-2': ['1.jpg','2.jpg'],
  'XXXXIII-Colori-3': ['1.jpg','2.jpg'],
  'XXXXIII-Colori-4': ['1.jpg','2.jpg'],
  'XXXXIV-Colori-1': ['1.jpg','2.jpg'],
  'XXXXIV-Colori-2': ['1.jpg','2.jpg'],
  'XXXXIV-Colori-3': ['1.jpg','2.jpg'],
  'XXXXIV-Colori-4': ['1.jpg','2.png','3.jpg'],
  'XXXXIV-Colori-5': ['1.jpg','2.jpg','3.jpg'],
  'XXXXIV-Colori-6': ['1.jpg','2.jpg','3.jpg'],
  'L-Colori-1': ['1.jpg','2.jpg'],
  'L-Colori-2': ['1.jpg','2.jpg'],
  'L-Colori-3': ['1.jpg','2.jpg'],
  'LI-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'LI-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'LI-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'LII-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'LII-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'LII-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LII-Colori-4': ['1.jpg','3.jpg','4.jpg'],
  'LIII-Colori-1': ['1.jpg','3.jpg','4.jpg'],
  'LIII-Colori-2': ['1.jpg','3.jpg','4.jpg'],
  'LIII-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LIII-Colori-4': ['1.jpg','3.jpg','4.jpg'],
  'LIII-Colori-5': ['1.jpg','3.jpg','4.jpg'],
  'LIV-Colori-1': ['1.jpg','3.jpg','4.jpg'],
  'LIV-Colori-2': ['1.jpg','3.jpg','4.jpg'],
  'LIV-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LIV-Colori-4': ['1.jpg','3.jpg','4.jpg'],
  'LV-Colori-1': ['1.jpg','3.jpg','4.jpg'],
  'LV-Colori-2': ['1.jpg','3.jpg','4.jpg'],
  'LV-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LVI-Colori-1': ['1.jpg','3.jpg','4.jpg'],
  'LVI-Colori-2': ['1.jpg','3.jpg','4.jpg'],
  'LVI-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LVII-Colori-1': ['1.jpg','3.jpg','4.jpg'],
  'LVII-Colori-2': ['1.jpg','3.jpg','4.jpg'],
  'LVII-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LVIII-Colori-1': ['1.jpg','3.jpg','4.jpg'],
  'LVIII-Colori-2': ['1.jpg','3.jpg','4.jpg'],
  'LVIII-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LIX-Colori-1': ['1.jpg','3.jpg','4.jpg'],
  'LIX-Colori-2': ['1.jpg','3.jpg','4.jpg'],
  'LIX-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LX-Colori-1': ['1.jpg','3.jpg','4.jpg'],
  'LX-Colori-2': ['1.jpg','3.jpg','4.jpg'],
  'LX-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LXI-Colori-1': ['1.jpg','3.jpg','4.jpg'],
  'LXI-Colori-2': ['1.jpg','3.jpg','4.jpg'],
  'LXI-Colori-3': ['1.jpg','3.jpg','4.jpg'],
  'LXI-Colori-4': ['1.jpg','3.jpg','4.jpg'],
};

function titleToBunnyFolder(title: string): string | null {
  // Trois formes de titres Shopify :
  //   « Renaissance XXXIV Colori 2 », « Renaissance XI 51 Colori 3 »,
  //   « Renaissance x FRENCH CUT IV Colori 1 » (dossier IV),
  //   « Renaissance VIII x OCHO Colori 1 » (dossier VIII).
  const match = title.match(
    /Renaissance\s+(?:x\s+FRENCH\s+CUT\s+)?([A-Z]+)(?:\s+(\d{2}))?(?:\s+x\s+OCHO)?\s+Colori\s+(\d+)/i
  );
  if (!match) return null;

  const [, rawModel, size, colori] = match;
  // Les titres Shopify sont passés en romain standard (XL..XLIV) le 2026-06-21,
  // mais les dossiers Bunny restent en graphie additive (XXXX..XXXXIV). On mappe
  // le romain affiché vers le nom de dossier réel pour ne pas casser les images.
  const FOLDER_ALIAS: Record<string, string> = {
    XL: 'XXXX', XLI: 'XXXXI', XLII: 'XXXXII', XLIII: 'XXXXIII', XLIV: 'XXXXIV',
  };
  const model = FOLDER_ALIAS[rawModel.toUpperCase()] ?? rawModel.toUpperCase();
  return size ? `${model}-${size}-Colori-${colori}` : `${model}-Colori-${colori}`;
}

function titleToBunnyUrl(title: string, imageIndex: number): string | null {
  const folderName = titleToBunnyFolder(title);
  if (!folderName) return null;

  const files = BUNNY_FILES[folderName];
  if (!files || imageIndex >= files.length) return null;

  return `${BUNNY_CDN}/${BUNNY_FOLDER}/${folderName}/${files[imageIndex]}`;
}

// Liste complète des images validées d'un coloris. Quand le modèle est dans la
// table, la galerie n'affiche QUE ces images : aucun complément Shopify.
export function getBunnyImages(title?: string): string[] | null {
  if (!title) return null;

  const folderName = titleToBunnyFolder(title);
  if (!folderName) return null;

  const files = BUNNY_FILES[folderName];
  if (!files) return null;

  return files.map(file => `${BUNNY_CDN}/${BUNNY_FOLDER}/${folderName}/${file}`);
}

export function resizeShopifyImage(url: string, width: number, productTitle?: string, imageIndex?: number): string {
  if (!url) return url;

  if (url.includes('b-cdn.net')) return url;

  if (productTitle && imageIndex !== undefined) {
    const bunnyUrl = titleToBunnyUrl(productTitle, imageIndex);
    if (bunnyUrl) return bunnyUrl;
  }

  if (url.includes('cdn.shopify.com')) {
    try {
      const u = new URL(url);
      u.searchParams.set('width', String(Math.min(width * 2, 4096)));
      return u.toString();
    } catch {
      return url;
    }
  }

  return url;
}
