import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { Award, Truck } from 'lucide-react';

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
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-dark-text/10 z-50 safe-area-bottom"
    >
      <div className="px-4 py-4">
        {/* Reassurance Icons - Mobile */}
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-dark-text/5">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-bronze/10 flex items-center justify-center">
              <Award size={12} className="text-bronze" />
            </div>
            <span className="font-sans text-[9px] text-dark-text/60">Garantie 2 ans</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-bronze/10 flex items-center justify-center">
              <Truck size={12} className="text-bronze" />
            </div>
            <span className="font-sans text-[9px] text-dark-text/60">Livraison Offerte</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <p className="font-sans text-xs text-dark-text/60 tracking-wide mb-1">Prix</p>
            <p className={`font-sans text-xl font-semibold ${isOutOfStock ? 'text-dark-text/40 line-through' : 'text-dark-text'}`}>
              {selectedVariant?.price || productPrice}
            </p>
          </div>

          {isOutOfStock ? (
            <div className="flex-1 py-4 bg-bronze/10 border border-bronze/30 flex items-center justify-center">
              <span className="font-sans text-[11px] tracking-[0.2em] font-bold text-bronze uppercase">
                Indisponible
              </span>
            </div>
          ) : (
            <motion.button
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-4 font-sans text-[11px] tracking-[0.3em] font-bold transition-all duration-300 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-dark-text text-white active:bg-dark-text/90'
              } disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
            >
              {isLoading ? 'AJOUT...' : addedToCart ? 'AJOUTÉ ✓' : 'AJOUTER AU PANIER'}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}