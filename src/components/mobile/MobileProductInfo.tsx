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
  badge?: string;
  price: string;
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
      className="bg-white px-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-6">
        {product.badge && (
          <div className="inline-block">
            <div className="border border-dark-text px-3 py-1.5">
              <span className="font-sans text-[9px] tracking-[0.3em] font-bold text-dark-text">
                {product.badge}
              </span>
            </div>
          </div>
        )}

        <div>
          <h1 className="font-display text-3xl font-light text-dark-text leading-tight tracking-tight mb-3">
            {product.name}
          </h1>
          <p className="font-sans text-2xl font-semibold text-dark-text">
            {selectedVariant?.price || product.price}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-sans text-[11px] tracking-[0.25em] font-bold text-dark-text uppercase">
              CHOISIR UNE COULEUR
            </span>
            <span className="font-sans text-xs text-dark-text/60 tracking-wide">
              {product.colors[selectedColorIndex]?.name || ''}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {product.colors.map((color, index) => (
              <motion.button
                key={index}
                onClick={() => handleColorChange(index)}
                disabled={!product.variants[index]?.availableForSale}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square border-2 transition-all duration-200 relative ${
                  selectedColorIndex === index
                    ? 'border-dark-text shadow-lg bg-dark-text/5'
                    : 'border-dark-text/20'
                } ${
                  !product.variants[index]?.availableForSale
                    ? 'opacity-30 cursor-not-allowed'
                    : 'active:scale-95'
                }`}
                title={color.name}
              >
                <div className="w-full h-full flex items-center justify-center p-3">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                    <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                    <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                {selectedColorIndex === index && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dark-text" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
