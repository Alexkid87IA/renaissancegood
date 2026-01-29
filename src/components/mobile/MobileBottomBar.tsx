import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { ShoppingBag, Check } from 'lucide-react';

interface Variant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
}

interface MobileBottomBarProps {
  selectedVariant: Variant | undefined;
  productPrice: string;
  isOutOfStock?: boolean;
}

export default function MobileBottomBar({ selectedVariant, productPrice, isOutOfStock = false }: MobileBottomBarProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) {
      alert('Ce produit n\'est pas disponible');
      return;
    }

    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }

    try {
      await addToCart(selectedVariant.id);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
    >
      {/* Fond avec blur */}
      <div className="bg-white/95 backdrop-blur-xl border-t border-dark-text/8">
        <div className="px-5 pt-3 pb-4">

          {/* Réassurance top */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="font-sans text-[7px] tracking-[0.2em] text-dark-text/30 uppercase">Livraison offerte</span>
            <span className="w-3 h-px bg-dark-text/10" />
            <span className="font-sans text-[7px] tracking-[0.2em] text-dark-text/30 uppercase">Garantie 2 ans</span>
            <span className="w-3 h-px bg-dark-text/10" />
            <span className="font-sans text-[7px] tracking-[0.2em] text-dark-text/30 uppercase">Retour 14j</span>
          </div>

          {/* Prix + CTA */}
          <div className="flex items-center gap-4">
            {/* Price block */}
            <div className="flex-shrink-0 min-w-[80px]">
              <p className="font-sans text-[7px] tracking-[0.2em] text-dark-text/35 uppercase mb-0.5">Prix</p>
              <p className={`font-display text-xl font-bold tracking-tight ${isOutOfStock ? 'text-dark-text/25 line-through' : 'text-dark-text'}`}>
                {selectedVariant?.price || productPrice}
              </p>
            </div>

            {/* CTA Button */}
            {isOutOfStock ? (
              <div className="flex-1 h-[52px] border border-dark-text/10 flex items-center justify-center">
                <span className="font-sans text-[9px] tracking-[0.3em] font-medium text-dark-text/25 uppercase">
                  Indisponible
                </span>
              </div>
            ) : (
              <motion.button
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant?.availableForSale}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 h-[52px] flex items-center justify-center gap-2.5 font-sans text-[9px] tracking-[0.25em] font-medium uppercase transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  addedToCart
                    ? 'bg-dark-text text-white'
                    : 'bg-dark-text text-white active:bg-dark-text/90'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      AJOUT...
                    </motion.span>
                  ) : addedToCart ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5" />
                      AJOUTÉ
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      AJOUTER AU PANIER
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
