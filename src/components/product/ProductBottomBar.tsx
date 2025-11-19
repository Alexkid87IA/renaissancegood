import { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  collection: string;
  price: string;
  frame: string;
  lens: string;
  colors: { name: string }[];
}

interface ProductBottomBarProps {
  product: Product;
  selectedColorIndex: number;
}

export default function ProductBottomBar({ product, selectedColorIndex }: ProductBottomBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

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

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      product_name: product.name,
      product_collection: product.collection,
      selected_frame: product.frame,
      selected_lens: product.lens,
      selected_color: product.colors[selectedColorIndex].name,
      color_index: selectedColorIndex,
      price: product.price,
      image_url: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1600',
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-dark-text/10 z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="px-4 lg:px-8 py-4 flex items-center justify-between gap-4 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Visual Color Thumbnail */}
          <div className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-dark-text/20 rounded-sm flex items-center justify-center bg-white p-2">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
              <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Product Info */}
          <div className="hidden sm:block">
            <p className="font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text/50 uppercase mb-1">
              FRAME
            </p>
            <p className="font-sans text-sm text-dark-text font-medium mb-2">{product.frame}</p>
            <p className="font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text/50 uppercase mb-1">
              LENS
            </p>
            <p className="font-sans text-sm text-dark-text">{product.lens}</p>
          </div>
        </div>

        {/* Price & Buy Button */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="text-right">
            <p className="font-sans text-xl lg:text-2xl font-semibold text-dark-text">
              {product.price}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`px-6 lg:px-10 py-3 lg:py-4 font-sans text-[10px] tracking-[0.3em] font-bold transition-all duration-200 whitespace-nowrap ${
              addedToCart
                ? 'bg-green-600 text-white'
                : 'bg-dark-text text-white hover:bg-dark-text/90'
            }`}
          >
            {addedToCart ? 'AJOUTÉ ✓' : 'AJOUTER AU PANIER'}
          </button>
        </div>
      </div>
    </div>
  );
}
