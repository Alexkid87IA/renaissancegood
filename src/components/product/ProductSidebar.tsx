import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { getColorFromName, isLightColor, metallicGradient } from '../../lib/colorMap';
import { createSanitizedMarkup } from '../../lib/sanitize';
import { ColorVariant, getColorSwatchStyle } from '../../lib/productGrouping';

interface Variant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
  colorName: string;
  image: string | null;
}

interface Product {
  id: string;
  name: string;
  modelName?: string;
  collection: string;
  badge?: string;
  price: string;
  frame: string;
  lens: string;
  colors: { name: string }[];
  dimensions: {
    lens: string;
    bridge: string;
    temple: string;
  };
  description: string;
  descriptionHtml?: string;
  variants: Variant[];
  tags?: string[];
}

interface ProductSidebarProps {
  product: Product;
  selectedColorIndex: number;
  onColorChange: (index: number) => void;
  // Nouvelles props pour les variantes de couleur (autres produits du même modèle)
  colorVariants?: ColorVariant[];
  selectedColorVariantIndex?: number;
  onColorVariantChange?: (index: number) => void;
}

export default function ProductSidebar({
  product,
  selectedColorIndex,
  onColorChange,
  colorVariants = [],
  selectedColorVariantIndex = 0,
  onColorVariantChange
}: ProductSidebarProps) {
  const [showDimensions, setShowDimensions] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    const selectedVariant = product.variants[selectedColorIndex];
    
    if (!selectedVariant || !selectedVariant.availableForSale) {
      alert('Ce produit n\'est pas disponible');
      return;
    }

    try {
      await addToCart(selectedVariant.id);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  // Obtenir la variante et le prix sélectionné
  const selectedVariant = product.variants[selectedColorIndex];
  const displayPrice = selectedVariant?.price || product.price;

  // Vérifier si le produit est adaptable en optique
  const isNonAdaptable = product.tags?.some(tag =>
    tag.toLowerCase() === 'non-adaptable' ||
    tag.toLowerCase() === 'solaire-uniquement'
  );

  return (
    <div className="w-[340px] laptop:w-[380px] xl:w-[480px] bg-white border-r border-dark-text/10 fixed left-0 top-20 bottom-0 overflow-y-auto z-50 hidden lg:block">
      <div className="p-8 laptop:p-10 xl:p-12">
        {/* Product Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl laptop:text-4xl xl:text-5xl font-bold text-dark-text mb-3 leading-[0.95] uppercase">
            {product.modelName || product.name}
          </h1>
          {product.badge && (
            <div className="inline-block border border-dark-text px-3 py-1.5">
              <span className="font-sans text-[8px] tracking-[0.3em] font-bold text-dark-text">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Prix - Visible en haut */}
        <div className="mb-8 pb-8 border-b border-dark-text/10">
          <div className="flex items-center justify-between">
            <span className="font-display text-3xl font-bold text-dark-text">
              {displayPrice}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
              className={`px-6 py-3 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-dark-text text-white hover:bg-dark-text/90'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'AJOUT...' : addedToCart ? 'AJOUTÉ ✓' : 'AJOUTER'}
            </button>
          </div>
        </div>

        {/* Badge Adaptable / Non-Adaptable */}
        <div className="mb-8 pb-8 border-b border-dark-text/10">
          {isNonAdaptable ? (
            <div className="flex items-center gap-3 bg-bronze/5 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-bronze/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-bronze" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.1em] font-bold text-bronze uppercase">
                  Solaire uniquement
                </p>
                <p className="font-sans text-xs text-dark-text/50 mt-0.5">
                  Non adaptable en verres correcteurs
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.1em] font-bold text-dark-text uppercase">
                  Adaptable à votre vue
                </p>
                <p className="font-sans text-xs text-dark-text/50 mt-0.5">
                  Compatible verres correcteurs
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================
            SÉLECTION DE COLORIS (AUTRES PRODUITS DU MÊME MODÈLE)
            ======================================== */}
        {colorVariants.length > 1 && onColorVariantChange && (
          <div className="mb-8 pb-8 border-b border-dark-text/10">
            <div className="flex items-center justify-between mb-5">
              <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
                COLORIS
              </span>
              <span className="font-sans text-xs text-dark-text/50">
                {colorVariants.length} disponibles
              </span>
            </div>

            {/* Grille des miniatures de coloris */}
            <div className="flex flex-wrap gap-3">
              {colorVariants.map((variant, index) => {
                const isSelected = selectedColorVariantIndex === index;

                return (
                  <button
                    key={variant.handle}
                    onClick={() => onColorVariantChange(index)}
                    className={`relative group transition-all duration-300 hover:scale-105`}
                    title={`Coloris ${variant.colorNumber}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-dark-text ring-offset-2'
                          : 'ring-1 ring-dark-text/20 hover:ring-dark-text/40'
                      }`}
                    >
                      {variant.thumbnail ? (
                        <img
                          src={variant.thumbnail}
                          alt={`Coloris ${variant.colorNumber}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={getColorSwatchStyle(variant.colorNumber, variant.colorName)}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================
            SÉLECTION DE VARIANTES INTERNES (si plusieurs)
            ======================================== */}
        {product.variants.length > 1 && (
          <div className="mb-8 pb-8 border-b border-dark-text/10">
            <div className="flex items-center justify-between mb-5">
              <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
                VARIANTE
              </span>
              <span className="font-sans text-sm text-dark-text/70">
                {product.variants[selectedColorIndex]?.colorName || 'Sélectionner'}
              </span>
            </div>

            {/* Grille des boutons de variante */}
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant, index) => {
                const colorValue = getColorFromName(variant.colorName);
                const isSelected = selectedColorIndex === index;
                const isAvailable = variant.availableForSale;

                return (
                  <button
                    key={variant.id}
                    onClick={() => onColorChange(index)}
                    disabled={!isAvailable}
                    className={`relative group transition-all duration-300 ${
                      !isAvailable ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
                    }`}
                    title={`${variant.colorName}${!isAvailable ? ' (Épuisé)' : ''}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-dark-text ring-offset-2'
                          : 'ring-1 ring-dark-text/20 hover:ring-dark-text/40'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full relative overflow-hidden shadow-sm"
                        style={{ backgroundColor: colorValue }}
                      >
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)'
                          }}
                        />
                      </div>
                    </div>

                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-red-500 rotate-45" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedVariant && !selectedVariant.availableForSale && (
              <p className="mt-4 font-sans text-sm text-red-600">
                Cette variante est actuellement épuisée
              </p>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-8 pb-8 border-b border-dark-text/10">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
              DESCRIPTION
            </span>
            <motion.div
              animate={{ rotate: showDescription ? 0 : 45 }}
              transition={{ duration: 0.2 }}
            >
              {showDescription ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </motion.div>
          </button>
          
          <AnimatePresence>
            {showDescription && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {product.descriptionHtml ? (
                  <div
                    className="font-sans text-sm text-dark-text/70 leading-relaxed description-content"
                    dangerouslySetInnerHTML={createSanitizedMarkup(product.descriptionHtml)}
                  />
                ) : (
                  <p className="font-sans text-sm text-dark-text/70 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dimensions */}
        <div className="mb-8 pb-8 border-b border-dark-text/10">
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
              DIMENSIONS
            </span>
            <motion.div
              animate={{ rotate: showDimensions ? 0 : 45 }}
              transition={{ duration: 0.2 }}
            >
              {showDimensions ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </motion.div>
          </button>
          
          <AnimatePresence>
            {showDimensions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-neutral-50 rounded">
                    <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">Verre</p>
                    <p className="font-sans text-sm font-medium text-dark-text">{product.dimensions.lens}</p>
                  </div>
                  <div className="text-center p-3 bg-neutral-50 rounded">
                    <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">Pont</p>
                    <p className="font-sans text-sm font-medium text-dark-text">{product.dimensions.bridge}</p>
                  </div>
                  <div className="text-center p-3 bg-neutral-50 rounded">
                    <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">Branche</p>
                    <p className="font-sans text-sm font-medium text-dark-text">{product.dimensions.temple}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        </div>

      {/* Style pour la description HTML */}
      <style>{`
        .description-content p {
          margin-bottom: 1rem;
        }
        
        .description-content p:last-child {
          margin-bottom: 0;
        }
        
        .description-content strong,
        .description-content b {
          font-weight: 600;
          color: rgb(26, 26, 26);
        }
        
        .description-content ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin: 0.75rem 0;
        }
        
        .description-content li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}