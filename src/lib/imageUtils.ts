const BUNNY_CDN = 'https://renaissance-cdn.b-cdn.net';

const ISIS_VIEWS = ['front', 'side', 'top'] as const;
const VERSAILLES_NUMS = ['1', '2'] as const;

// Roman numerals >= L (50) belong to Isis collection (front/side/top naming)
const ISIS_PREFIXES = ['L', 'LI', 'LII', 'LIII', 'LIV', 'LV', 'LVI', 'LVII', 'LVIII', 'LIX', 'LX', 'LXI'];

function isIsisModel(roman: string): boolean {
  return ISIS_PREFIXES.includes(roman);
}

function titleToBunnyUrl(title: string, imageIndex: number): string | null {
  // "Renaissance XXXVII Colori 3" → model=XXXVII, colori=3
  const match = title.match(/Renaissance\s+([A-Z]+)\s+Colori\s+(\d+)/i);
  if (!match) return null;

  const [, model, colori] = match;
  const folder = `products/${model}-Colori-${colori}`;

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
