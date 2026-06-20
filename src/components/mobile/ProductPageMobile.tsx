import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, ArrowRight } from 'lucide-react';
import MobileImageGallery from './MobileImageGallery';
import MobileProductInfo from './MobileProductInfo';
import MobileAccordion from './MobileAccordion';
import MobileBottomBar from './MobileBottomBar';
import MobileRelatedProducts from './MobileRelatedProducts';
import { createSanitizedMarkup } from '../../lib/sanitize';
import { ColorVariant, getColorSwatchStyle } from '../../lib/productGrouping';
import { useProductData } from '../../hooks/useProductData';
import { useLocale } from '../../contexts/LocaleContext';
import { resizeShopifyImage } from '../../lib/imageUtils';
import { Product } from '../../types/product';
import { getModelEditorial } from '../../data/productEditorial';
import { useCart } from '../../contexts/CartContext';

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
  const { t } = useTranslation('product');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const {
    translatedName,
    translatedDescription,
    translatedDescriptionHtml,
    isNonAdaptable,
    isOutOfStock,
  } = useProductData(product, selectedColorIndex);

  // Ajout au panier dans la fiche (en plus de la barre fixe du bas, répétition
  // assumée, demande Yassin 2026-06-20). Même logique que MobileBottomBar.
  const { addToCart, isLoading } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const selectedVariant = product.variants[selectedColorIndex];

  const handleAddToCart = async () => {
    if (!selectedVariant?.availableForSale) return;
    try {
      await addToCart(selectedVariant.id);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
    } catch {
      // erreur silencieuse, comme la barre du bas
    }
  };

  // Éditorial interne : si le modèle a une fiche, on rend la structure « maquette ».
  // La copy sort dans la langue du site (transcréations préparées, repli FR).
  const { locale } = useLocale();
  const editorial = product.modelName ? getModelEditorial(product.modelName, locale) : null;

  const handleShare = async () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: translatedName,
          text: t('mobile.shareText', { name: translatedName }),
          url: window.location.href,
        });
      } catch {
        // Share cancelled by user
      }
    }
  };

  const matiereLine = editorial
    ? (editorial.model.matiere === 'titane' ? t('sidebar.materialTitanium') : t('sidebar.materialAcetate')) +
      (editorial.model.adaptable ? ` · ${t('sidebar.adaptable')}` : '')
    : '';

  // Tailles (51 / 53) : le verre affiché suit la taille choisie. Le pont et la
  // branche sont identiques d'une taille à l'autre.
  const verreParTaille = (() => {
    const v = product.variants[selectedColorIndex]?.colorName?.trim();
    return editorial && product.variants.length > 1 && v && /^\d{1,2}$/.test(v)
      ? parseInt(v, 10)
      : editorial?.model.dimensions.verre;
  })();

  const accordionSections = editorial
    ? [
        {
          title: editorial.proof.label.toUpperCase(),
          content: (
            <p className="font-sans text-sm italic text-dark-text/70 leading-[1.8]">
              {editorial.proof.texte}
            </p>
          ),
        },
        {
          title: t('sidebar.dimensions'),
          content: (
            <div className="space-y-4">
              <p className="font-sans text-[13px] text-dark-text/60 leading-[1.7] font-light">
                {editorial.model.morphologie}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">{t('mobile.lensWidthShort')}</span>
                <span className="font-sans text-sm text-dark-text/70 font-light">{verreParTaille}mm</span>
              </div>
              <div className="w-full h-px bg-dark-text/5" />
              <div className="flex items-center justify-between">
                <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">{t('sidebar.bridge')}</span>
                <span className="font-sans text-sm text-dark-text/70 font-light">{editorial.model.dimensions.pont}mm</span>
              </div>
              <div className="w-full h-px bg-dark-text/5" />
              <div className="flex items-center justify-between">
                <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">{t('mobile.templesShort')}</span>
                <span className="font-sans text-sm text-dark-text/70 font-light">{editorial.model.dimensions.branche}mm</span>
              </div>
            </div>
          ),
        },
        {
          title: t('sidebar.material'),
          content: (
            <p className="font-sans text-sm text-dark-text/70 leading-[1.8] font-light">{matiereLine}</p>
          ),
        },
        // Collection et symbole : absents quand le modèle porte le visage seul (Bible 8.1).
        ...(editorial.collection
          ? [{
              title: t('sidebar.collectionTitle', { name: editorial.collection.nom }),
              content: editorial.collection.recit ? (
                <p className="font-sans text-sm text-dark-text/70 leading-[1.8] font-light">{editorial.collection.recit}</p>
              ) : (
                <></>
              ),
            }]
          : []),
        ...(editorial.symbole
          ? [{
              title: `${editorial.symbole.nom.toUpperCase()} · ${editorial.symbole.etendard.toUpperCase()}`,
              content: (
                <div>
                  <p className="font-sans text-sm italic text-bronze leading-[1.7]">{editorial.symbole.definition}</p>
                  {editorial.symbole.deuxLectures && (
                    <p className="font-sans text-sm text-dark-text/70 leading-[1.8] font-light mt-3">
                      {editorial.symbole.deuxLectures}
                    </p>
                  )}
                </div>
              ),
            }]
          : []),
      ]
    : [
    {
      title: t('description'),
      content: (
        <div
          className="font-sans text-sm text-dark-text/60 leading-[1.8] font-light description-content"
          dangerouslySetInnerHTML={createSanitizedMarkup(translatedDescriptionHtml || translatedDescription)}
        />
      ),
    },
    {
      title: t('mobile.frameAndLenses'),
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">{t('mobile.frame')}</span>
            <span className="font-sans text-sm text-dark-text/70 font-light">{product.frame}</span>
          </div>
          <div className="w-full h-px bg-dark-text/5" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">{t('mobile.lenses')}</span>
            <span className="font-sans text-sm text-dark-text/70 font-light">{product.lens}</span>
          </div>
        </div>
      ),
    },
    {
      title: t('sidebar.dimensions'),
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">{t('mobile.lensWidthShort')}</span>
            <span className="font-sans text-sm text-dark-text/70 font-light">{product.dimensions.lens}</span>
          </div>
          <div className="w-full h-px bg-dark-text/5" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">{t('sidebar.bridge')}</span>
            <span className="font-sans text-sm text-dark-text/70 font-light">{product.dimensions.bridge}</span>
          </div>
          <div className="w-full h-px bg-dark-text/5" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">{t('mobile.templesShort')}</span>
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
          aria-label={t('mobile.back')}
        >
          <ChevronLeft className="w-5 h-5 text-dark-text" />
        </button>

        <p className="font-sans text-[8px] tracking-[0.4em] font-medium text-dark-text/40 uppercase">
          {product.collection}
        </p>

        <button
          onClick={handleShare}
          className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
          aria-label={t('mobile.share')}
        >
          <Share2 className="w-4 h-4 text-dark-text/60" />
        </button>
      </motion.header>

      <div className="pt-[56px]">
        {/* Gallery */}
        <MobileImageGallery
          images={product.images || []}
          productName={translatedName}
          shopifyTitle={product.name}
        />

        {/* Product Info */}
        {editorial ? (
          <div className="bg-white px-6 pt-6 pb-4">
            {editorial.collection && (
              <p className="font-sans text-dark-text/[0.48] text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
                {t('sidebar.collectionTitle', { name: editorial.collection.nom })}
              </p>
            )}
            <h1 className="font-display text-2xl font-bold text-dark-text tracking-[-0.02em] leading-[1.12] mb-2 uppercase">
              {editorial.model.romain} ({editorial.model.arabe})
              {editorial.model.collab
                ? ` ${editorial.model.collab.replace(/ /g, ' ')}`
                : ''}
            </h1>
            <p className="font-display text-lg font-light text-dark-text/70 mb-4">{product.price}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className="group inline-flex items-center gap-2 border-b border-dark-text/40 pb-1.5 font-sans text-[11px] tracking-[0.24em] uppercase text-dark-text disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? t('sidebar.adding') : addedToCart ? t('sidebar.added') : t('sidebar.add')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate('/opticiens')}
                className="group inline-flex items-center gap-2 border-b border-dark-text/40 pb-1.5 font-sans text-[11px] tracking-[0.24em] uppercase text-dark-text"
              >
                {t('sidebar.tryInStore')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ) : (
          <MobileProductInfo
            product={product}
            selectedColorIndex={selectedColorIndex}
            onColorChange={setSelectedColorIndex}
          />
        )}

        {/* Coloris numérotés — sous le prix, même grille que desktop (ProductSidebar) */}
        {colorVariants.length > 1 && onColorVariantChange && (
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
                {t('sidebar.coloris')}
              </span>
              <span className="font-sans text-[10px] tracking-[0.1em] text-dark-text/40 uppercase">
                {selectedColorVariantIndex + 1} / {colorVariants.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {colorVariants.map((variant, index) => {
                const isSelected = selectedColorVariantIndex === index;
                return (
                  <button
                    key={variant.handle}
                    onClick={() => onColorVariantChange(index)}
                    className={`min-w-0 transition-all duration-300 active:scale-95 ${isSelected ? '' : 'opacity-70'}`}
                    title={t('sidebar.colorisNumber', { number: index + 1 })}
                  >
                    <div className={`w-full aspect-[4/3] overflow-hidden bg-[#f5f4f0] transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-dark-text ring-offset-2' : 'ring-1 ring-dark-text/10'
                    }`}>
                      {variant.thumbnail ? (
                        <img
                          src={resizeShopifyImage(variant.thumbnail, 520, variant.product?.title, 0)}
                          alt={t('sidebar.colorisNumber', { number: index + 1 })}
                          className="w-full h-full object-contain p-2.5"
                          loading={isSelected ? 'eager' : 'lazy'}
                          decoding="async"
                          sizes="(max-width: 640px) 45vw, 240px"
                        />
                      ) : (
                        <div className="w-full h-full" style={getColorSwatchStyle(variant.colorNumber, variant.colorName)} />
                      )}
                    </div>
                    <p className={`font-sans text-[8px] tracking-[0.15em] uppercase text-center mt-2 transition-colors duration-300 ${
                      isSelected ? 'text-dark-text font-bold' : 'text-dark-text/45'
                    }`}>
                      {t('sidebar.colorisNumber', { number: index + 1 })}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Taille — variantes internes du produit (ex. 51 / 53) */}
        {product.variants.length > 1 &&
          product.variants.every((v) => /^\d{1,2}$/.test((v.colorName || '').trim())) && (
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
                {t('size')}
              </span>
              <span className="font-sans text-[11px] text-dark-text/50 font-light">
                {product.variants[selectedColorIndex]?.colorName
                  ? `${product.variants[selectedColorIndex].colorName} mm`
                  : ''}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.variants.map((variant, index) => {
                const isSelected = selectedColorIndex === index;
                const isAvailable = variant.availableForSale;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedColorIndex(index)}
                    disabled={!isAvailable}
                    className={`px-6 py-2.5 font-sans text-sm tracking-[0.1em] border transition-all duration-300 active:scale-95 ${
                      isSelected
                        ? 'border-dark-text bg-dark-text text-white'
                        : 'border-dark-text/20 text-dark-text'
                    } ${!isAvailable ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                  >
                    {variant.colorName}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Légende + description — placées sous les coloris et la taille, même
            ordre que le desktop : on choisit, puis on lit. */}
        {editorial && (
          <div className="bg-white px-6 pb-4">
            <p className="font-display italic text-base text-dark-text/90 leading-snug mb-3">
              {editorial.model.legende}
            </p>
            <p className="font-sans text-sm text-dark-text/75 leading-[1.8]">
              {editorial.model.description}
            </p>
          </div>
        )}

        {/* Adaptable badge */}
        <div className="px-6 py-5 border-t border-dark-text/[0.08]">
          {isNonAdaptable ? (
            <div className="flex items-center gap-4 bg-bronze/5 border border-bronze/[0.15] px-5 py-4">
              <div className="w-10 h-10 border border-bronze/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-bronze" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.15em] font-bold text-dark-text uppercase">
                  {t('mobile.sunOnlyTitle')}
                </p>
                <p className="font-sans text-[11px] text-dark-text/[0.45] font-light mt-0.5">
                  {t('mobile.sunOnlyDesc')}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 bg-dark-text/[0.02] border border-dark-text/10 px-5 py-4">
              <div className="w-10 h-10 border border-dark-text/[0.15] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-dark-text" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.15em] font-bold text-dark-text uppercase">
                  {t('sidebar.adaptable')}
                </p>
                <p className="font-sans text-[11px] text-dark-text/[0.45] font-light mt-0.5">
                  {t('mobile.adaptableDesc')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Out of stock banner */}
        {isOutOfStock && (
          <div className="mx-6 mb-2 py-3 border border-dark-text/10">
            <p className="font-sans text-[9px] tracking-[0.3em] font-medium text-dark-text/40 uppercase text-center">
              {t('mobile.tempUnavailable')}
            </p>
          </div>
        )}

        {/* Accordion */}
        <MobileAccordion sections={accordionSections} defaultOpen={0} />

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
