// ========================================
// COMPOSANT PRODUCTCARD RÉUTILISABLE
// Utilisé dans : ShopPage, CollectionsPage, HeritageCollectionPage, VersaillesCollectionPage
// ========================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

export default function ProductCard({ product, index = 0, showNewBadge = true }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = product.images.edges.map(edge => edge.node.url);
  const currentImage = productImages[currentImageIndex] || productImages[0];
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);
  const category = product.tags?.includes('Solaire') ? 'SOLAIRE' : 'OPTICAL';

  // Calculer le stock total de tous les variants
  const totalStock = product.variants?.edges.reduce((total, edge) => {
    return total + (edge.node.quantityAvailable || 0);
  }, 0) || 0;

  // Rupture de stock si stock total = 0
  const isOutOfStock = totalStock === 0;

  return (
    <motion.div
      className="group relative bg-white overflow-hidden col-span-full sm:col-span-1 md:col-span-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={`/product/${product.handle}`}
        className="block cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative aspect-[16/9] overflow-hidden bg-beige/20 ${isOutOfStock ? 'opacity-70' : ''}`}>
          <motion.img
            key={currentImageIndex}
            src={currentImage}
            alt={product.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Badge Rupture de stock */}
          {isOutOfStock && (
            <div className="absolute top-4 right-4 bg-bronze/90 px-4 py-2">
              <span className="font-sans text-[8px] tracking-[0.2em] font-bold text-white uppercase">
                Rupture de stock
              </span>
            </div>
          )}


          {/* Navigation images */}
          {productImages.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-1 z-10">
              {productImages.map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(imgIndex);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  aria-label={`View image ${imgIndex + 1}`}
                  className="p-2 -m-1 cursor-pointer"
                >
                  <span className={`block h-2 rounded-full transition-all ${
                    currentImageIndex === imgIndex
                      ? 'bg-dark-text w-6'
                      : 'bg-dark-text/30 w-2 hover:bg-dark-text/50'
                  }`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations produit */}
        <div className="p-5 sm:p-6 bg-white">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <p className="font-sans text-[9px] tracking-[0.25em] text-dark-text/50 uppercase mb-2">
                {category}
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-dark-text leading-tight mb-1">
                {product.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-dark-text/5">
            <p className="font-sans text-base sm:text-lg font-semibold text-dark-text">
              {price}
            </p>
            <div className="text-dark-text/40 group-hover:text-dark-text group-hover:translate-x-1 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Export des types pour réutilisation
export type { ProductCardProps, ProductImage, ProductVariant, ProductCollection };
