// ========================================
// COMPOSANT PRODUCTCARD RÉUTILISABLE
// ========================================

import { useState, memo, useCallback } from 'react';
import LocaleLink from './LocaleLink';

interface ProductImage {
  url: string;
  altText: string | null;
}

interface ProductVariant {
  id: string;
  quantityAvailable?: number;
  availableForSale?: boolean;
}

interface ProductCollection {
  handle: string;
  title: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale?: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: ProductImage;
    }>;
  };
  variants?: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  tags?: string[];
  collections?: {
    edges: Array<{
      node: ProductCollection;
    }>;
  };
}

interface ProductCardProps {
  product: Product;
  index?: number;
  showNewBadge?: boolean;
}

// Resize Shopify CDN images
function resizeShopifyImage(url: string, width: number): string {
  if (!url || !url.includes('cdn.shopify.com')) return url;
  return url.replace(/(\.\w+)(\?|$)/, `_${width}x$1$2`);
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = product.images.edges.map(edge => edge.node.url);
  const currentImage = productImages[currentImageIndex] || productImages[0];
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);

  const isOutOfStock = product.availableForSale === false;

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleImageChange = useCallback((imgIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(imgIndex);
  }, []);

  return (
    <div className="group relative">
      <LocaleLink
        to={`/product/${product.handle}`}
        className="block cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`relative aspect-[16/9] overflow-hidden bg-[#f0eeea] ${isOutOfStock ? 'opacity-70' : ''}`}>
          <img
            src={resizeShopifyImage(currentImage, 800)}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHovered ? 'scale-[1.04]' : 'scale-100'
            }`}
            loading="lazy"
          />

          {isOutOfStock && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-block bg-dark-text/80 text-white font-sans text-[8px] tracking-[0.25em] font-medium uppercase px-3 py-1.5">
                Épuisé
              </span>
            </div>
          )}

          {productImages.length > 1 && (
            <div className={`absolute bottom-2.5 left-3 flex gap-0.5 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {productImages.slice(0, 5).map((_, imgIndex) => (
                <button
                  type="button"
                  key={imgIndex}
                  onClick={(e) => handleImageChange(imgIndex, e)}
                  aria-label={`Image ${imgIndex + 1}`}
                  className="p-1 cursor-pointer"
                >
                  <span className={`block h-[2px] rounded-full transition-all duration-300 ${
                    currentImageIndex === imgIndex
                      ? 'bg-dark-text w-4'
                      : 'bg-dark-text/25 w-2 hover:bg-dark-text/50'
                  }`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 pb-2">
          <h3 className="font-display text-sm sm:text-base font-bold text-dark-text tracking-[-0.01em] leading-tight uppercase truncate">
            {product.title}
          </h3>
          <p className="font-sans text-sm font-semibold text-dark-text mt-1">
            {price}&nbsp;€
          </p>
        </div>
      </LocaleLink>
    </div>
  );
});

export default ProductCard;
export type { ProductCardProps, ProductImage, ProductVariant, ProductCollection };
