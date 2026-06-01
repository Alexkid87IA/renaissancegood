const BUNNY_CDN = 'https://renaissance-cdn.b-cdn.net';

const BUNNY_FILES: Record<string, string[]> = {
  'II-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'II-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'II-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'III-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'IV-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'IV-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'IV-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'VI-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'VII-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'VII-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'VIII-Colori-1': ['1.jpg','2.jpg'],
  'VIII-Colori-2': ['1.jpg','2.jpg'],
  'VIII-Colori-3': ['1.jpg','2.jpg'],
  'IX-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XI-51-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XI-51-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XI-51-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XI-51-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XI-51-Colori-5': ['1.jpg','2.jpg','3.jpg'],
  'XI-53-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XI-53-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XI-53-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'L-Colori-1': ['1.jpg','2.jpg'],
  'L-Colori-2': ['1.jpg','2.jpg'],
  'L-Colori-3': ['1.jpg','2.jpg'],
  'LI-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'LI-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'LII-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LII-Colori-2': ['front.jpg','side.jpg','top.jpg'],
  'LII-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LII-Colori-4': ['front.jpg','side.jpg','top.jpg'],
  'LIII-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LIII-Colori-2': ['front.jpg','side.jpg','top.jpg'],
  'LIII-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LIII-Colori-4': ['front.jpg','side.jpg','top.jpg'],
  'LIII-Colori-5': ['front.jpg','side.jpg','top.jpg'],
  'LIV-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LIV-Colori-2': ['front.jpg','side.jpg','top.jpg'],
  'LIV-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LIV-Colori-4': ['front.jpg','side.jpg','top.jpg'],
  'LIX-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LIX-Colori-2': ['front.jpg','side.jpg','top.jpg'],
  'LIX-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LV-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LV-Colori-2': ['front.jpg','side.jpg','top.jpg'],
  'LV-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LVI-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LVI-Colori-2': ['front.jpg','side.jpg','top.jpg'],
  'LVI-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LVII-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LVII-Colori-2': ['front.jpg','side.jpg','top.jpg'],
  'LVII-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LVIII-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LVIII-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LX-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LX-Colori-2': ['front.jpg','side.jpg','top.jpg'],
  'LX-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LXI-Colori-1': ['front.jpg','side.jpg','top.jpg'],
  'LXI-Colori-2': ['front.jpg','side.jpg','top.jpg'],
  'LXI-Colori-3': ['front.jpg','side.jpg','top.jpg'],
  'LXI-Colori-4': ['front.jpg','side.jpg','top.jpg'],
  'XII-Colori-1': ['1.jpg','2.jpg'],
  'XII-Colori-2': ['1.jpg','2.jpg'],
  'XII-Colori-3': ['1.jpg','2.jpg'],
  'XIII-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XIII-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XIII-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XIII-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XIV-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XIV-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XIV-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XVI-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XVI-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XVI-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XVII-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XVII-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XVII-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XVII-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XVIII-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XVIII-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XVIII-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XVIII-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XIX-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XIX-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XIX-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XIX-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XX-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XX-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XX-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XXI-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XXI-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XXI-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XXI-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XXI-Colori-5': ['1.jpg','2.jpg','3.jpg'],
  'XXII-Colori-1': ['1.jpg','2.jpg','3.jpg'],
  'XXII-Colori-2': ['1.jpg','2.jpg','3.jpg'],
  'XXII-Colori-3': ['1.jpg','2.jpg','3.jpg'],
  'XXX-Colori-1': ['1.jpg','2.jpg'],
  'XXX-Colori-2': ['1.jpg','2.jpg'],
  'XXVII-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXVII-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXVII-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXIX-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXIX-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXIX-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXII-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXII-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXII-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXII-Colori-4': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXII-Colori-6': ['1.jpg','2.jpg','3.jpg'],
  'XXXII-Colori-7': ['1.jpg','2.jpg','3.jpg'],
  'XXXIII-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIII-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIII-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIV-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIV-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIV-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIV-Colori-4': ['1.jpg','2.jpg','3.jpg'],
  'XXXV-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXV-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXV-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXVI-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXVI-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXVI-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXIX-Colori-1': ['1.jpg','2.jpg'],
  'XXXIX-Colori-2': ['1.jpg','2.jpg'],
  'XXXIX-Colori-3': ['1.jpg','2.jpg'],
  'XXXIX-Colori-4': ['1.jpg','2.jpg'],
  'XXXIX-Colori-5': ['1.jpg','2.jpg'],
  'XXXVII-Colori-1': ['1.jpg','2.jpg'],
  'XXXVII-Colori-2': ['1.jpg','2.jpg'],
  'XXXVII-Colori-3': ['1.jpg','2.jpg'],
  'XXXVIII-Colori-1': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXVIII-Colori-2': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXVIII-Colori-3': ['1.jpg','2.jpg','3.jpg','4.jpg'],
  'XXXVIII-Colori-4': ['1.jpg','2.jpg','3.jpg','4.jpg'],
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
  'XXXXIV-Colori-4': ['1.jpg','3.jpg'],
  'XXXXIV-Colori-5': ['1.jpg','2.jpg','3.jpg'],
  'XXXXIV-Colori-6': ['1.jpg','2.jpg','3.jpg'],
};

function titleToBunnyUrl(title: string, imageIndex: number): string | null {
  const match = title.match(/Renaissance\s+([A-Z]+)(?:\s+(\d{2}))?\s+Colori\s+(\d+)/i);
  if (!match) return null;

  const [, model, size, colori] = match;
  const folderName = size ? `${model}-${size}-Colori-${colori}` : `${model}-Colori-${colori}`;
  const files = BUNNY_FILES[folderName];

  if (!files || imageIndex >= files.length) return null;

  return `${BUNNY_CDN}/products/${folderName}/${files[imageIndex]}`;
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
