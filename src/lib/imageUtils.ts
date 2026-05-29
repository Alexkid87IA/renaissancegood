const BUNNY_CDN = 'https://renaissance-cdn.b-cdn.net';

const ISIS_VIEWS = ['front', 'side', 'top'] as const;
const VERSAILLES_NUMS = ['1', '2'] as const;

const ISIS_PREFIXES = ['L', 'LI', 'LII', 'LIII', 'LIV', 'LV', 'LVI', 'LVII', 'LVIII', 'LIX', 'LX', 'LXI'];

// Only folders that actually exist on Bunny CDN
const BUNNY_FOLDERS = new Set([
  'L-Colori-1','L-Colori-2','L-Colori-3',
  'LI-Colori-2','LI-Colori-3',
  'LII-Colori-1','LII-Colori-2','LII-Colori-3','LII-Colori-4',
  'LIII-Colori-1','LIII-Colori-2','LIII-Colori-3','LIII-Colori-4','LIII-Colori-5',
  'LIV-Colori-1','LIV-Colori-2','LIV-Colori-3','LIV-Colori-4',
  'LIX-Colori-1','LIX-Colori-2','LIX-Colori-3',
  'LV-Colori-1','LV-Colori-2','LV-Colori-3',
  'LVI-Colori-1','LVI-Colori-2','LVI-Colori-3',
  'LVII-Colori-1','LVII-Colori-2','LVII-Colori-3',
  'LVIII-Colori-1','LVIII-Colori-3',
  'LX-Colori-1','LX-Colori-2','LX-Colori-3',
  'LXI-Colori-1','LXI-Colori-2','LXI-Colori-3','LXI-Colori-4',
  'XII-Colori-1','XII-Colori-2','XII-Colori-3',
  'XXXII-Colori-6','XXXII-Colori-7',
  'XXXIV-Colori-4',
  'XXXIX-Colori-1','XXXIX-Colori-2','XXXIX-Colori-3','XXXIX-Colori-4','XXXIX-Colori-5',
  'XXXVII-Colori-1','XXXVII-Colori-2','XXXVII-Colori-3',
  'XXXVIII-Colori-1','XXXVIII-Colori-2','XXXVIII-Colori-3','XXXVIII-Colori-4',
  'XXXX-Colori-1','XXXX-Colori-2','XXXX-Colori-3',
  'XXXXI-Colori-1','XXXXI-Colori-2','XXXXI-Colori-3',
  'XXXXII-Colori-1','XXXXII-Colori-2','XXXXII-Colori-3','XXXXII-Colori-4',
  'XXXXIII-Colori-1','XXXXIII-Colori-2','XXXXIII-Colori-3','XXXXIII-Colori-4',
  'XXXXIV-Colori-1','XXXXIV-Colori-2','XXXXIV-Colori-3','XXXXIV-Colori-4','XXXXIV-Colori-5','XXXXIV-Colori-6',
]);

function isIsisModel(roman: string): boolean {
  return ISIS_PREFIXES.includes(roman);
}

function titleToBunnyUrl(title: string, imageIndex: number): string | null {
  const match = title.match(/Renaissance\s+([A-Z]+)\s+Colori\s+(\d+)/i);
  if (!match) return null;

  const [, model, colori] = match;
  const folderName = `${model}-Colori-${colori}`;

  if (!BUNNY_FOLDERS.has(folderName)) return null;

  const folder = `products/${folderName}`;

  if (isIsisModel(model)) {
    const view = ISIS_VIEWS[imageIndex] || ISIS_VIEWS[0];
    return `${BUNNY_CDN}/${folder}/${view}.jpg`;
  }

  const num = VERSAILLES_NUMS[imageIndex] || VERSAILLES_NUMS[0];
  return `${BUNNY_CDN}/${folder}/${num}.jpg`;
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
