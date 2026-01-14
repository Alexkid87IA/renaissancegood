import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2 } from 'lucide-react';
import MobileImageGallery from './MobileImageGallery';
import MobileProductInfo from './MobileProductInfo';
import MobileAccordion from './MobileAccordion';
import MobileBottomBar from './MobileBottomBar';
import MobileFabricationSection from './MobileFabricationSection';
import MobileRelatedProducts from './MobileRelatedProducts';
import { createSanitizedMarkup } from '../../lib/sanitize';
import { ColorVariant, getColorSwatchStyle } from '../../lib/productGrouping';

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
  images?: string[];
  tags?: string[];
}

interface ProductPageMobileProps {
  product: Product;
  colorVariants?: ColorVariant[];
  selectedColorVariantIndex?: number;
  onColorVariantChange?: (index: number) => void;
}

export default function ProductPageMobile({
  product,
  colorVariants = [],
  selectedColorVariantIndex = 0,
  onColorVariantChange
}: ProductPageMobileProps) {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Vérifier si le produit est adaptable en optique
  const isNonAdaptable = product.tags?.some(tag => 
    tag.toLowerCase() === 'non-adaptable' || 
    tag.toLowerCase() === 'solaire-uniquement'
  );

  // Vérifier si le variant sélectionné est en rupture de stock
  const selectedVariant = product.variants[selectedColorIndex];
  const isOutOfStock = !selectedVariant?.availableForSale;

  const handleShare = async () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Découvrez ${product.name} sur Renaissance`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    }
  };

  const accordionSections = [
    {
      title: 'DESCRIPTION',
      content: (
        <div
          className="font-sans text-sm text-dark-text/70 leading-relaxed description-content"
          dangerouslySetInnerHTML={createSanitizedMarkup(product.descriptionHtml || product.description)}
        />
      ),
    },
    {
      title: 'CADRE & VERRES',
      content: (
        <div className="space-y-3">
          <div>
            <span className="font-sans text-xs tracking-wider font-bold text-dark-text uppercase block mb-1">
              CADRE
            </span>
            <span className="font-sans text-sm text-dark-text/70">{product.frame}</span>
          </div>
          <div>
            <span className="font-sans text-xs tracking-wider font-bold text-dark-text uppercase block mb-1">
              VERRES
            </span>
            <span className="font-sans text-sm text-dark-text/70">{product.lens}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'DIMENSIONS',
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-sans text-xs text-dark-text/60">Largeur des verres</span>
            <span className="font-sans text-sm text-dark-text font-medium">{product.dimensions.lens}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-sans text-xs text-dark-text/60">Largeur du pont</span>
            <span className="font-sans text-sm text-dark-text font-medium">{product.dimensions.bridge}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-sans text-xs text-dark-text/60">Longueur des branches</span>
            <span className="font-sans text-sm text-dark-text font-medium">{product.dimensions.temple}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-dark-text/10 h-[60px] flex items-center justify-between px-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Retour"
        >
          <ChevronLeft className="w-6 h-6 text-dark-text" />
        </button>

        <h1 className="font-display text-base font-light text-dark-text tracking-tight absolute left-1/2 -translate-x-1/2 uppercase">
          {product.name}
        </h1>

        <button
          onClick={handleShare}
          className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Partager"
        >
          <Share2 className="w-5 h-5 text-dark-text" />
        </button>
      </motion.header>

      <div className="pt-[60px]">
        <MobileImageGallery
          images={product.images || []}
          productName={product.name}
        />

        <MobileProductInfo
          product={product}
          selectedColorIndex={selectedColorIndex}
          onColorChange={setSelectedColorIndex}
        />

        {/* Sélecteur de coloris (autres produits du même modèle) */}
        {colorVariants.length > 1 && onColorVariantChange && (
          <div className="px-5 py-4 border-b border-dark-text/10">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
                COLORIS
              </span>
              <span className="font-sans text-xs text-dark-text/50">
                {colorVariants.length} disponibles
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {colorVariants.map((variant, index) => {
                const isSelected = selectedColorVariantIndex === index;

                return (
                  <button
                    key={variant.handle}
                    onClick={() => onColorVariantChange(index)}
                    className="relative transition-all duration-200 active:scale-95"
                    title={`Coloris ${variant.colorNumber}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                        isSelected
                          ? 'ring-2 ring-dark-text ring-offset-2'
                          : 'ring-1 ring-dark-text/20'
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
                          className="w-full h-full bg-dark-text/10"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bandeau Rupture de Stock - Mobile */}
        {isOutOfStock && (
          <div className="mx-5 mb-4 p-4 bg-bronze/10 border border-bronze/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bronze/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-bronze" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-bronze uppercase tracking-wide">
                  Rupture de stock
                </p>
                <p className="font-sans text-xs text-dark-text/60 mt-0.5">
                  Ce modèle est temporairement indisponible
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Badge Adaptable / Non-Adaptable */}
        <div className="px-5 py-4 border-b border-dark-text/10">
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

        <MobileAccordion sections={accordionSections} defaultOpen={0} />

        <MobileFabricationSection frame={product.frame} lens={product.lens} />

        <MobileRelatedProducts currentProductId={product.id} limit={4} />
      </div>

      <MobileBottomBar
        selectedVariant={product.variants[selectedColorIndex]}
        productPrice={product.price}
        isOutOfStock={isOutOfStock}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .description-content p {
          margin-bottom: 0.75rem;
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
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}