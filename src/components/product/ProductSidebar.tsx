import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface Variant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
}

interface Product {
  id: string;
  name: string;
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
}

interface ProductSidebarProps {
  product: Product;
  selectedColorIndex: number;
  onColorChange: (index: number) => void;
}

export default function ProductSidebar({ product, selectedColorIndex, onColorChange }: ProductSidebarProps) {
  const [showDimensions, setShowDimensions] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
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

  return (
    <div className="w-full lg:w-[340px] laptop:w-[380px] xl:w-[480px] bg-white lg:border-r border-dark-text/10 lg:fixed lg:left-0 lg:top-20 lg:bottom-0 overflow-y-auto z-50">
      <div className="p-4 sm:p-6 lg:p-8 laptop:p-10 xl:p-12">
        {/* Product Header */}
        <div className="mb-6 lg:mb-10">
          <h1 className="font-display text-3xl sm:text-4xl laptop:text-5xl xl:text-6xl font-bold text-dark-text mb-3 lg:mb-4 leading-[0.95]">
            {product.name}
          </h1>
          {product.badge && (
            <div className="inline-block border border-dark-text px-3 py-1.5">
              <span className="font-sans text-[8px] tracking-[0.3em] font-bold text-dark-text">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Color Selection - DÉPLACÉE AVANT LA DESCRIPTION */}
        <div className="mb-6 lg:mb-8 pb-6 lg:pb-8 border-b border-dark-text/10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <span className="font-sans text-[11px] tracking-[0.25em] font-bold text-dark-text uppercase">
              SELECT COLOR
            </span>
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/60">
              {product.colors[selectedColorIndex]?.name || ''}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 laptop:grid-cols-5 gap-2 sm:gap-3 laptop:gap-4">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => onColorChange(index)}
                disabled={!product.variants[index]?.availableForSale}
                className={`aspect-square border-2 transition-all duration-300 hover:scale-105 relative ${
                  selectedColorIndex === index
                    ? 'border-dark-text shadow-lg bg-dark-text/5'
                    : 'border-dark-text/20 hover:border-dark-text/50'
                } ${
                  !product.variants[index]?.availableForSale
                    ? 'opacity-30 cursor-not-allowed'
                    : ''
                }`}
                title={color.name}
              >
                <div className="w-full h-full flex items-center justify-center p-2">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                    <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                    <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                {selectedColorIndex === index && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dark-text" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Description - APRÈS LA SÉLECTION DE COULEUR */}
        <div className="mb-6 lg:mb-8 pb-6 lg:pb-8 border-b border-dark-text/10">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
              DESCRIPTION
            </span>
            <motion.div
              animate={{ rotate: showDescription ? 0 : 90 }}
              transition={{ duration: 0.2 }}
            >
              <Minus className="w-4 h-4 text-dark-text" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showDescription && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div 
                  className="font-sans text-sm text-dark-text/70 leading-[1.8] space-y-4 description-content"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Frame & Lens Info */}
        <div className="mb-6 lg:mb-8 pb-6 lg:pb-8 border-b border-dark-text/10 space-y-3 lg:space-y-4">
          <div>
            <span className="font-sans text-[10px] tracking-[0.15em] font-bold text-dark-text uppercase block mb-1">
              FRAME
            </span>
            <span className="font-sans text-sm text-dark-text/70">
              {product.frame}
            </span>
          </div>
          <div>
            <span className="font-sans text-[10px] tracking-[0.15em] font-bold text-dark-text uppercase block mb-1">
              LENS
            </span>
            <span className="font-sans text-sm text-dark-text/70">
              {product.lens}
            </span>
          </div>
        </div>

        {/* Dimensions */}
        <div className="mb-6 lg:mb-8 pb-6 lg:pb-8 border-b border-dark-text/10">
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
              DIMENSIONS
            </span>
            <motion.div
              animate={{ rotate: showDimensions ? 0 : 90 }}
              transition={{ duration: 0.2 }}
            >
              <Minus className="w-4 h-4 text-dark-text" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showDimensions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs text-dark-text/60">Lens Width</span>
                  <span className="font-sans text-xs text-dark-text font-medium">{product.dimensions.lens}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs text-dark-text/60">Bridge Width</span>
                  <span className="font-sans text-xs text-dark-text font-medium">{product.dimensions.bridge}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs text-dark-text/60">Temple Length</span>
                  <span className="font-sans text-xs text-dark-text font-medium">{product.dimensions.temple}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price & Buy Button - Caché sur mobile car présent dans BottomBar */}
        <div className="hidden lg:grid grid-cols-2 gap-3 pt-4">
          <div className="border border-dark-text/20 flex items-center justify-center">
            <span className="font-sans text-lg font-semibold text-dark-text">
              {product.variants[selectedColorIndex]?.price || product.price}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !product.variants[selectedColorIndex]?.availableForSale}
            className={`px-6 py-4 font-sans text-[10px] tracking-[0.3em] font-bold transition-all duration-200 ${
              addedToCart
                ? 'bg-green-600 text-white'
                : 'bg-dark-text text-white hover:bg-dark-text/90'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'AJOUT...' : addedToCart ? 'AJOUTÉ ✓' : 'AJOUTER'}
          </button>
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
        
        .description-content li strong {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}