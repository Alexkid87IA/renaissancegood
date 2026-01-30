import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface Variant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
  colorName: string;
  image: string | null;
}

interface ProductImage {
  url: string;
  altText: string | null;
}

interface Product {
  id: string;
  name: string;
  modelName?: string;
  collection: string;
  price: string;
  frame: string;
  lens: string;
  colors: { name: string }[];
  variants: Variant[];
  allImages?: ProductImage[];
}

interface ProductBottomBarProps {
  product: Product;
  selectedColorIndex: number;
  visible?: boolean;
}

export default function ProductBottomBar({ product, selectedColorIndex, visible = true }: ProductBottomBarProps) {
  const { t } = useTranslation('product');
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    const selectedVariant = product.variants[selectedColorIndex];

    if (!selectedVariant || !selectedVariant.availableForSale) {
      alert(t('sidebar.productUnavailable'));
      return;
    }

    try {
      await addToCart(selectedVariant.id);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch {
      // Add to cart error silently handled
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedVariant = product.variants[selectedColorIndex];
  const thumbnailUrl = selectedVariant?.image || product.allImages?.[0]?.url || null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60]"
        >
          {/* Lien "Voir le produit" au-dessus de la barre */}
          <div className="flex justify-center pb-3">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 bg-dark-text/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg hover:bg-dark-text transition-colors"
            >
              <ChevronUp size={14} />
              <span className="font-sans text-[10px] tracking-[0.15em] uppercase font-medium">
                {t('bottomBar.viewProduct')}
              </span>
            </button>
          </div>

          {/* Barre principale */}
          <div className="bg-white border-t border-dark-text/10 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
            <div className="px-5 lg:px-10 py-4 lg:py-5 flex items-center justify-between gap-6 max-w-[1800px] mx-auto">

              {/* Gauche : miniature + nom */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg border border-dark-text/10 shadow-sm overflow-hidden bg-neutral-50 flex-shrink-0">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={product.modelName || product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-base lg:text-lg font-bold text-dark-text leading-tight uppercase truncate">
                    {product.modelName || product.name}
                  </p>
                  <p className="font-sans text-[10px] tracking-[0.15em] text-dark-text/40 uppercase mt-0.5">
                    Renaissance Paris
                  </p>
                </div>
              </div>

              {/* Droite : prix + CTA */}
              <div className="flex items-center gap-5 lg:gap-8 flex-shrink-0">
                <span className="font-display text-xl lg:text-2xl font-bold text-dark-text">
                  {selectedVariant?.price || product.price}
                </span>

                <button
                  onClick={handleAddToCart}
                  disabled={isLoading || !selectedVariant?.availableForSale}
                  className={`px-8 lg:px-10 py-3.5 lg:py-4 font-sans text-[10px] lg:text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-dark-text text-white hover:bg-dark-text/90'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? t('bottomBar.adding') : addedToCart ? t('bottomBar.added') : t('bottomBar.addToCart')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
