import { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Award, Truck, Shield } from 'lucide-react';

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
  price: string;
  frame: string;
  lens: string;
  colors: { name: string }[];
  variants: Variant[];
}

interface ProductBottomBarProps {
  product: Product;
  selectedColorIndex: number;
}

export default function ProductBottomBar({ product, selectedColorIndex }: ProductBottomBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isLoading } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerHeight = 400;

      if (documentHeight - scrollPosition < footerHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = async () => {
    // Récupérer le variant ID de la variante sélectionnée
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

  if (!isVisible) return null;

  const selectedVariant = product.variants[selectedColorIndex];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-dark-text/10 z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="px-3 sm:px-4 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4 max-w-[1800px] mx-auto">
        {/* Reassurance Elements */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {/* Garantie 2 ans */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-bronze/10 flex items-center justify-center flex-shrink-0">
                <Award size={14} className="text-bronze sm:w-4 sm:h-4" />
              </div>
              <span className="font-sans text-[10px] sm:text-xs text-dark-text/70 whitespace-nowrap hidden sm:block">
                Garantie 2 ans
              </span>
            </div>

            {/* Livraison Offerte */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-bronze/10 flex items-center justify-center flex-shrink-0">
                <Truck size={14} className="text-bronze sm:w-4 sm:h-4" />
              </div>
              <span className="font-sans text-[10px] sm:text-xs text-dark-text/70 whitespace-nowrap hidden sm:block">
                Livraison Offerte
              </span>
            </div>

            {/* Paiement Sécurisé - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-bronze/10 flex items-center justify-center flex-shrink-0">
                <Shield size={14} className="text-bronze sm:w-4 sm:h-4" />
              </div>
              <span className="font-sans text-[10px] sm:text-xs text-dark-text/70 whitespace-nowrap">
                Paiement Sécurisé
              </span>
            </div>
          </div>

        {/* Price & Buy Button */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="text-right">
            <p className="font-sans text-base sm:text-xl lg:text-2xl font-semibold text-dark-text whitespace-nowrap">
              {selectedVariant?.price || product.price}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant?.availableForSale}
            className={`px-4 sm:px-6 lg:px-10 py-2.5 sm:py-3 lg:py-4 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] font-bold transition-all duration-200 whitespace-nowrap ${
              addedToCart
                ? 'bg-green-600 text-white'
                : 'bg-dark-text text-white hover:bg-dark-text/90'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'AJOUT...' : addedToCart ? 'AJOUTÉ ✓' : window.innerWidth < 640 ? 'AJOUTER' : 'AJOUTER AU PANIER'}
          </button>
        </div>
      </div>
    </div>
  );
}