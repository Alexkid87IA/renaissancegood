import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Share2 } from 'lucide-react';
import MobileImageGallery from './MobileImageGallery';
import MobileProductInfo from './MobileProductInfo';
import MobileAccordion from './MobileAccordion';
import MobileBottomBar from './MobileBottomBar';
import MobileRelatedProducts from './MobileRelatedProducts';
import { createSanitizedMarkup } from '../../lib/sanitize';
import { ColorVariant, getColorSwatchStyle } from '../../lib/productGrouping';
import { useAutoTranslate, useAutoTranslateHtml } from '../../hooks/useAutoTranslate';

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
  const translatedName = useAutoTranslate(product.name);
  const translatedDescription = useAutoTranslate(product.description);
  const translatedDescriptionHtml = useAutoTranslateHtml(product.descriptionHtml || null);

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
          title: translatedName,
          text: `Découvrez ${translatedName} sur Renaissance`,
          url: window.location.href,
        });
      } catch {
        // Share cancelled by user
      }
    }
  };

  const accordionSections = [
    {
      title: 'DESCRIPTION',
      content: (
        <div
          className="font-sans text-sm text-dark-text/60 leading-[1.8] font-light description-content"
          dangerouslySetInnerHTML={createSanitizedMarkup(translatedDescriptionHtml || translatedDescription)}
        />
      ),
    },
    {
      title: 'CADRE & VERRES',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">Cadre</span>
            <span className="font-sans text-sm text-dark-text/70 font-light">{product.frame}</span>
          </div>
          <div className="w-full h-px bg-dark-text/5" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">Verres</span>
            <span className="font-sans text-sm text-dark-text/70 font-light">{product.lens}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'DIMENSIONS',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">Largeur verres</span>
            <span className="font-sans text-sm text-dark-text/70 font-light">{product.dimensions.lens}</span>
          </div>
          <div className="w-full h-px bg-dark-text/5" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">Pont</span>
            <span className="font-sans text-sm text-dark-text/70 font-light">{product.dimensions.bridge}</span>
          </div>
          <div className="w-full h-px bg-dark-text/5" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">Branches</span>
            <span className="font-sans text-sm text-dark-text/70 font-light">{product.dimensions.temple}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-28">
      {/* Header — dark transparent */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg h-[56px] flex items-center justify-between px-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Retour"
        >
          <ChevronLeft className="w-5 h-5 text-dark-text" />
        </button>

        <p className="font-sans text-[8px] tracking-[0.4em] font-medium text-dark-text/40 uppercase">
          {product.collection}
        </p>

        <button
          onClick={handleShare}
          className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Partager"
        >
          <Share2 className="w-4 h-4 text-dark-text/60" />
        </button>
      </motion.header>

      <div className="pt-[56px]">
        {/* Gallery */}
        <MobileImageGallery
          images={product.images || []}
          productName={translatedName}
        />

        {/* Product Info */}
        <MobileProductInfo
          product={product}
          selectedColorIndex={selectedColorIndex}
          onColorChange={setSelectedColorIndex}
        />

        {/* Adaptable badge */}
        <div className="px-6 py-5 border-t border-dark-text/8">
          {isNonAdaptable ? (
            <div className="flex items-center gap-4 bg-bronze/5 border border-bronze/15 px-5 py-4">
              <div className="w-10 h-10 border border-bronze/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-bronze" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.15em] font-bold text-dark-text uppercase">
                  Solaire uniquement
                </p>
                <p className="font-sans text-[11px] text-dark-text/45 font-light mt-0.5">
                  Non adaptable en verres correcteurs
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 bg-dark-text/[0.02] border border-dark-text/10 px-5 py-4">
              <div className="w-10 h-10 border border-dark-text/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-dark-text" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.15em] font-bold text-dark-text uppercase">
                  Adaptable à votre vue
                </p>
                <p className="font-sans text-[11px] text-dark-text/45 font-light mt-0.5">
                  Compatible verres correcteurs
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Out of stock banner */}
        {isOutOfStock && (
          <div className="mx-6 mb-2 py-3 border border-dark-text/10">
            <p className="font-sans text-[9px] tracking-[0.3em] font-medium text-dark-text/40 uppercase text-center">
              Temporairement indisponible
            </p>
          </div>
        )}

        {/* Accordion */}
        <MobileAccordion sections={accordionSections} defaultOpen={0} />

        {/* Sélecteur de coloris — après dimensions, avant related */}
        {colorVariants.length > 1 && onColorVariantChange && (
          <div className="px-6 py-6 border-t border-dark-text/8">
            <div className="flex items-center justify-between mb-5">
              <span className="font-sans text-[9px] tracking-[0.3em] font-medium text-dark-text/40 uppercase">
                Autres coloris
              </span>
              <span className="font-sans text-[11px] text-dark-text/40">
                {colorVariants.length - 1} coloris
              </span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {colorVariants.map((variant, index) => {
                if (index === selectedColorVariantIndex) return null;
                return (
                  <button
                    key={variant.handle}
                    onClick={() => onColorVariantChange(index)}
                    className="relative transition-all duration-200 active:scale-95 w-[calc(50%-0.375rem)]"
                    title={variant.colorName}
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden ring-1 ring-dark-text/10 bg-[#f5f4f0]">
                      {variant.thumbnail ? (
                        <img
                          src={variant.thumbnail}
                          alt={variant.colorName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-dark-text/5" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-dark-text/10 flex-shrink-0"
                        style={getColorSwatchStyle(variant.colorNumber, variant.colorName)}
                      />
                      <span className="font-sans text-[10px] tracking-[0.1em] text-dark-text/50">
                        {variant.colorName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Related products */}
        <MobileRelatedProducts currentProductId={product.id} limit={3} />
      </div>

      {/* Bottom bar */}
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
