import type { MenuProduct } from './MegaMenu';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
}

/** Fisher-Yates shuffle */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Products excluded from mega menu (by exact or partial title) */
export const MEGA_MENU_EXCLUDED = ['RENAISSANCE XXX COLORI 1'];

/** Format Shopify products for mega menu — always 4 cards, varied, guaranteed */
export function formatProducts(products: ShopifyProduct[], defaultDescription: string): MenuProduct[] {
  if (products.length === 0) return [];

  const filtered = products.filter(p =>
    !MEGA_MENU_EXCLUDED.some(ex => p.title.includes(ex))
  );

  const shuffled = shuffleArray(filtered.length > 0 ? filtered : products);

  const all: MenuProduct[] = shuffled.map((product) => ({
    name: product.title,
    image: product.images.edges[0]?.node.url || '',
    description: product.description.substring(0, 50) || defaultDescription,
    price: `€${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
    handle: product.handle
  }));

  const result = all.slice(0, 4);

  while (result.length < 4) {
    const source = all[result.length % all.length];
    result.push({ ...source });
  }

  return result;
}

export type { ShopifyProduct };
