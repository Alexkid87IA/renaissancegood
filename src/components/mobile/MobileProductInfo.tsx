import { motion } from 'framer-motion';

interface Variant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
}

interface Product {
  id: string;
  name: string;
  modelName?: string;
  badge?: string;
  price: string;
  collection: string;
  colors: { name: string }[];
  variants: Variant[];
  description: string;
  descriptionHtml?: string;
}

interface MobileProductInfoProps {
  product: Product;
  selectedColorIndex: number;
  onColorChange: (index: number) => void;
}

export default function MobileProductInfo({
  product,
  selectedColorIndex,
  onColorChange
}: MobileProductInfoProps) {

  const handleColorChange = (index: number) => {
    onColorChange(index);
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const selectedVariant = product.variants[selectedColorIndex];

  return (
    <motion.div
      className="bg-white px-6 pt-6 pb-4"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {/* Collection label */}
      <p className="font-sans text-dark-text/30 text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
        {product.collection}
      </p>

      {/* Product name */}
      <h1 className="font-display text-2xl font-bold text-dark-text tracking-[-0.02em] leading-[0.95] mb-2">
        {product.modelName || product.name}
      </h1>

      {/* Price */}
      <p className="font-display text-lg font-light text-dark-text/70 mb-5">
        {selectedVariant?.price || product.price}
      </p>

      {/* Separator */}
      <div className="w-10 h-px bg-dark-text/10 mb-5" />

      {/* Color variants — only show if more than 1 */}
      {product.colors && product.colors.length > 1 && (
        <div className="mb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="font-sans text-[9px] tracking-[0.3em] font-medium text-dark-text/40 uppercase">
              Couleur
            </span>
            <span className="font-sans text-[11px] text-dark-text/50 font-light">
              {product.colors[selectedColorIndex]?.name || ''}
            </span>
          </div>

          <div className="flex gap-2.5">
            {product.colors.map((color, index) => {
              const isSelected = selectedColorIndex === index;
              const isAvailable = product.variants[index]?.availableForSale;

              return (
                <button
                  key={index}
                  onClick={() => handleColorChange(index)}
                  disabled={!isAvailable}
                  className={`relative w-10 h-10 transition-all duration-300 ${
                    !isAvailable ? 'opacity-20 cursor-not-allowed' : 'active:scale-95'
                  }`}
                  title={color.name}
                >
                  <div
                    className={`w-full h-full border transition-all duration-300 ${
                      isSelected
                        ? 'border-dark-text'
                        : 'border-dark-text/15'
                    }`}
                  >
                    <div className="w-full h-full bg-dark-text/5 flex items-center justify-center">
                      <span className="font-sans text-[7px] tracking-[0.1em] text-dark-text/50 uppercase leading-tight text-center px-0.5">
                        {color.name.substring(0, 6)}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
