import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  collection: string;
  badge: string;
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
  const { addToCart } = useCart();

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

  return (
    <div className="w-[340px] laptop:w-[380px] xl:w-[480px] bg-white border-r border-dark-text/10 fixed left-0 top-20 bottom-0 overflow-y-auto z-50 hidden lg:block">
      <div className="p-8 laptop:p-10 xl:p-12">
        {/* Product Header */}
        <div className="mb-10">
          <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-dark-text/50 uppercase mb-3">
            {product.collection}
          </p>
          <h1 className="font-display text-4xl laptop:text-5xl xl:text-6xl font-bold text-dark-text mb-4 leading-[0.95]">
            {product.name}
          </h1>
          <div className="inline-block border border-dark-text px-3 py-1.5">
            <span className="font-sans text-[8px] tracking-[0.3em] font-bold text-dark-text">
              {product.badge}
            </span>
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-8 pb-8 border-b border-dark-text/10">
          <div className="flex items-center justify-between mb-4">
            <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
              SELECT COLOR
            </span>
            <Minus className="w-4 h-4 text-dark-text" />
          </div>

          <div className="grid grid-cols-4 laptop:grid-cols-5 gap-2 laptop:gap-3">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => onColorChange(index)}
                className={`aspect-square border-2 rounded-sm transition-all duration-200 hover:scale-105 ${
                  selectedColorIndex === index
                    ? 'border-dark-text shadow-md'
                    : 'border-dark-text/20 hover:border-dark-text/40'
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
              </button>
            ))}
          </div>
        </div>

        {/* Frame & Lens Info */}
        <div className="mb-8 pb-8 border-b border-dark-text/10 space-y-4">
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
        <div className="mb-8 pb-8 border-b border-dark-text/10">
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

        {/* Description */}
        <div className="mb-8">
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
                <p className="font-sans text-sm text-dark-text/70 leading-[1.7]">
                  {product.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price & Buy Button */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <div className="border border-dark-text/20 flex items-center justify-center">
            <span className="font-sans text-lg font-semibold text-dark-text">
              {product.price}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`px-6 py-4 font-sans text-[10px] tracking-[0.3em] font-bold transition-all duration-200 ${
              addedToCart
                ? 'bg-green-600 text-white'
                : 'bg-dark-text text-white hover:bg-dark-text/90'
            }`}
          >
            {addedToCart ? 'AJOUTÉ ✓' : 'AJOUTER'}
          </button>
        </div>
      </div>
    </div>
  );
}
