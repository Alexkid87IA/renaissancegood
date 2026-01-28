// ========================================
// COMPOSANT GROUPED PRODUCT CARD
// Carte produit affichant un modèle avec ses variantes de couleur
// ========================================

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GroupedProduct, getColorSwatchStyle } from '../lib/productGrouping';

interface GroupedProductCardProps {
  groupedProduct: GroupedProduct;
  index?: number;
  showNewBadge?: boolean;
}

export default function GroupedProductCard({
  groupedProduct,
  index = 0,
  showNewBadge = true
}: GroupedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentVariant = groupedProduct.colorVariants[selectedVariantIndex];
  const currentProduct = currentVariant.product;

  const productImages = useMemo(
    () => currentProduct.images.edges.map(edge => edge.node.url),
    [currentProduct.images.edges]
  );
  const currentImage = productImages[currentImageIndex] || productImages[0];

  const price = useMemo(
    () => parseFloat(currentProduct.priceRange.minVariantPrice.amount).toFixed(0),
    [currentProduct.priceRange.minVariantPrice.amount]
  );
  const category = currentProduct.tags?.includes('Solaire') ? 'SOLAIRE' : 'OPTICAL';

  // Calculer le stock total
  const totalStock = useMemo(
    () => currentProduct.variants?.edges.reduce((total, edge) => {
      return total + (edge.node.quantityAvailable || 0);
    }, 0) || 0,
    [currentProduct.variants?.edges]
  );
  const isOutOfStock = totalStock === 0;

  // Changer de variante de couleur
  const handleColorChange = (variantIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariantIndex(variantIndex);
    setCurrentImageIndex(0); // Reset image index when changing color
  };

  return (
    <motion.div
      className="group relative bg-white overflow-hidden col-span-full sm:col-span-1 md:col-span-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={`/product/${currentVariant.handle}`}
        className="block cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image principale */}
        <div className={`relative aspect-[16/9] overflow-hidden bg-beige/20 ${isOutOfStock ? 'opacity-70' : ''}`}>
          <motion.img
            key={`${currentVariant.handle}-${currentImageIndex}`}
            src={currentImage}
            alt={groupedProduct.modelName}
            className="w-full h-full object-cover"
            loading="lazy"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: isHovered ? 1.05 : 1, opacity: 1 }}
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
              {productImages.slice(0, 5).map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(imgIndex);
                  }}
                  aria-label={`Image ${imgIndex + 1}`}
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

          {/* Indicateur nombre de coloris (coin droit) */}
          {groupedProduct.colorVariants.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <span className="font-sans text-[9px] tracking-wider text-dark-text font-medium">
                {groupedProduct.colorVariants.length} coloris
              </span>
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
              <h3 className="font-display text-xl sm:text-2xl font-bold text-dark-text leading-tight mb-1 uppercase">
                {groupedProduct.modelName}
              </h3>
            </div>
          </div>

          {/* Miniatures de coloris */}
          {groupedProduct.colorVariants.length > 1 && (
            <div className="flex items-center gap-2 mb-4">
              {groupedProduct.colorVariants.map((variant, variantIndex) => (
                <button
                  key={variant.handle}
                  onClick={(e) => handleColorChange(variantIndex, e)}
                  className={`w-8 h-8 rounded-lg overflow-hidden transition-all ${
                    selectedVariantIndex === variantIndex
                      ? 'ring-2 ring-dark-text ring-offset-1 scale-110'
                      : 'ring-1 ring-dark-text/20 hover:ring-dark-text/40'
                  }`}
                  title={`Coloris ${variant.colorNumber}`}
                  aria-label={`Coloris ${variant.colorNumber}`}
                >
                  {variant.thumbnail ? (
                    <img
                      src={variant.thumbnail}
                      alt={`Coloris ${variant.colorNumber}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={getColorSwatchStyle(variant.colorNumber, variant.colorName)}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-dark-text/5">
            <p className="font-sans text-base sm:text-lg font-semibold text-dark-text">
              {price} €
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

export type { GroupedProductCardProps };
