import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useLocale } from '../../contexts/LocaleContext';
import { getColorFromName } from '../../lib/colorMap';
import { createSanitizedMarkup } from '../../lib/sanitize';
import { ColorVariant, getColorSwatchStyle } from '../../lib/productGrouping';
import { useProductData } from '../../hooks/useProductData';
import { resizeShopifyImage } from '../../lib/imageUtils';
import { Product } from '../../types/product';
import { getModelEditorial } from '../../data/productEditorial';

// Accordéon éditorial — même pattern visuel que les sections de la fiche.
function EditorialAccordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-dark-text/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 group"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase text-left">
          {title}
        </span>
        <motion.div animate={{ rotate: open ? 0 : 45 }} transition={{ duration: 0.2 }}>
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductSidebarProps {
  product: Product;
  selectedColorIndex: number;
  onColorChange: (index: number) => void;
  // Nouvelles props pour les variantes de couleur (autres produits du même modèle)
  colorVariants?: ColorVariant[];
  selectedColorVariantIndex?: number;
  onColorVariantChange?: (index: number) => void;
  priceRef?: React.Ref<HTMLDivElement>;
}

export default function ProductSidebar({
  product,
  selectedColorIndex,
  onColorChange,
  colorVariants = [],
  selectedColorVariantIndex = 0,
  onColorVariantChange,
  priceRef
}: ProductSidebarProps) {
  const { t } = useTranslation('product');
  const {
    translatedName,
    translatedDescription,
    translatedDescriptionHtml,
    isNonAdaptable,
    selectedVariant,
    displayPrice,
  } = useProductData(product, selectedColorIndex);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showFabrication, setShowFabrication] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isLoading } = useCart();

  // Éditorial interne : si le modèle a une fiche (productEditorial.ts), on rend
  // la structure « maquette » ; sinon on retombe sur l'ancien rendu plus bas.
  // La copy sort dans la langue du site (transcréations préparées, repli FR).
  const { locale } = useLocale();
  const editorial = product.modelName ? getModelEditorial(product.modelName, locale) : null;

  const handleAddToCart = async () => {
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

  // ==========================================================================
  // RENDU ÉDITORIAL (structure maquette, habillage clair du site)
  // ==========================================================================
  if (editorial) {
    const { model, collection, symbole, proof } = editorial;
    const matiereLine =
      (model.matiere === 'titane' ? t('sidebar.materialTitanium') : t('sidebar.materialAcetate')) +
      (model.adaptable ? ` · ${t('sidebar.adaptable')}` : '');

    return (
      <div>
        <div className="p-8 laptop:p-10 xl:p-12">
          {/* Chapitre / collection */}
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-dark-text/45 mb-3">
            {t('sidebar.collectionTitle', { name: collection.nom })}
          </p>

          {/* Titre : chiffre romain + arabe, même taille et même typo */}
          <h1 className="font-display text-3xl laptop:text-4xl xl:text-5xl font-bold text-dark-text mb-4 leading-[0.95] uppercase">
            {model.romain} ({model.arabe})
          </h1>

          {/* Prix + actions (liens fléchés, jamais de bouton qui crie) */}
          <div ref={priceRef} className="mb-6 pb-6 border-b border-dark-text/10">
            <span className="font-display text-2xl font-bold text-dark-text">{displayPrice}</span>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-5">
              <button
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className="group inline-flex items-center gap-2 border-b border-dark-text/40 pb-1.5 font-sans text-[11px] tracking-[0.24em] uppercase text-dark-text hover:border-dark-text transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? t('sidebar.adding') : addedToCart ? t('sidebar.added') : t('sidebar.add')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <Link
                to="/opticiens"
                className="group inline-flex items-center gap-2 border-b border-dark-text/40 pb-1.5 font-sans text-[11px] tracking-[0.24em] uppercase text-dark-text hover:border-dark-text transition-colors duration-300"
              >
                {t('sidebar.tryInStore')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Coloris numérotés — juste sous les actions */}
          {colorVariants.length > 1 && onColorVariantChange && (
            <div className="mb-2 pb-6 border-b border-dark-text/10">
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
                      className={`group min-w-0 transition-all duration-300 ${isSelected ? '' : 'opacity-70 hover:opacity-100'}`}
                      title={t('sidebar.colorisNumber', { number: index + 1 })}
                    >
                      <div className={`w-full aspect-[4/3] overflow-hidden bg-[#f5f4f0] transition-all duration-300 ${
                        isSelected ? 'ring-2 ring-dark-text ring-offset-2' : 'ring-1 ring-dark-text/10 hover:ring-dark-text/30'
                      }`}>
                        {variant.thumbnail ? (
                          <img
                            src={resizeShopifyImage(variant.thumbnail, 520, variant.product?.title, 0)}
                            alt={t('sidebar.colorisNumber', { number: index + 1 })}
                            className="w-full h-full object-contain p-2.5"
                            loading={isSelected ? 'eager' : 'lazy'}
                            decoding="async"
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

          {/* Légende + description courte (primaire, visible) */}
          <p className="font-display italic text-lg laptop:text-xl text-dark-text/90 leading-snug mb-4">
            {model.legende}
          </p>
          <p className="font-sans text-[14px] text-dark-text/80 leading-[1.8] mb-6 pb-6 border-b border-dark-text/10">
            {model.description}
          </p>

          {/* Secondaire — accordéons (+/−), même rythme que la fiche actuelle */}
          <EditorialAccordion title={proof.label} defaultOpen>
            <p className="font-sans text-[14px] italic text-dark-text/85 leading-[1.8]">
              {proof.texte}
            </p>
          </EditorialAccordion>

          <EditorialAccordion title={t('sidebar.dimensions')}>
            <p className="font-sans text-[13px] text-dark-text/70 mb-4">{model.morphologie}</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-neutral-50 rounded">
                <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">{t('sidebar.lens')}</p>
                <p className="font-sans text-sm font-medium text-dark-text">{model.dimensions.verre}mm</p>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded">
                <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">{t('sidebar.bridge')}</p>
                <p className="font-sans text-sm font-medium text-dark-text">{model.dimensions.pont}mm</p>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded">
                <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">{t('sidebar.temple')}</p>
                <p className="font-sans text-sm font-medium text-dark-text">{model.dimensions.branche}mm</p>
              </div>
            </div>
          </EditorialAccordion>

          <EditorialAccordion title={t('sidebar.material')}>
            <p className="font-sans text-[14px] text-dark-text/80 leading-[1.8]">{matiereLine}</p>
          </EditorialAccordion>

          <EditorialAccordion title={t('sidebar.collectionTitle', { name: collection.nom })}>
            {collection.recit ? (
              <p className="font-sans text-[14px] text-dark-text/80 leading-[1.8]">{collection.recit}</p>
            ) : null}
          </EditorialAccordion>

          <EditorialAccordion title={`${symbole.nom} · ${symbole.etendard}`}>
            <p className="font-sans text-[14px] italic text-bronze leading-[1.7]">{symbole.definition}</p>
            {symbole.deuxLectures && (
              <p className="font-sans text-[14px] text-dark-text/80 leading-[1.8] mt-3">{symbole.deuxLectures}</p>
            )}
          </EditorialAccordion>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-8 laptop:p-10 xl:p-12">
        {/* Product Header */}
        <div className="mb-5">
          <h1 className="font-display text-3xl laptop:text-4xl xl:text-5xl font-bold text-dark-text mb-1 leading-[0.95] uppercase">
            {translatedName}
          </h1>
        </div>

        {/* Coloris — selection premium */}
        {colorVariants.length > 1 && onColorVariantChange && (
          <div className="mb-6 pb-6 border-b border-dark-text/10">
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
                    className={`relative group min-w-0 transition-all duration-300 ${isSelected ? '' : 'opacity-70 hover:opacity-100'}`}
                    title={`Coloris ${variant.colorNumber}`}
                  >
                    <div
                      className={`w-full aspect-[4/3] rounded-none overflow-hidden bg-[#f5f4f0] transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-dark-text ring-offset-2'
                          : 'ring-1 ring-dark-text/10 hover:ring-dark-text/30'
                      }`}
                    >
                      {variant.thumbnail ? (
                        <img
                          src={resizeShopifyImage(variant.thumbnail, 520, variant.product?.title, 0)}
                          alt={`Coloris ${variant.colorNumber}`}
                          className="w-full h-full object-contain p-2.5"
                          loading={isSelected ? 'eager' : 'lazy'}
                          decoding="async"
                          sizes="(max-width: 1024px) 45vw, (max-width: 1280px) 180px, 220px"
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={getColorSwatchStyle(variant.colorNumber, variant.colorName)}
                        />
                      )}
                    </div>
                    {/* Label underneath */}
                    <p className={`font-sans text-[8px] tracking-[0.15em] uppercase text-center mt-2 transition-colors duration-300 ${
                      isSelected ? 'text-dark-text font-bold' : 'text-dark-text/[0.45]'
                    }`}>
                      {variant.colorName || `Col. ${variant.colorNumber}`}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Prix */}
        <div ref={priceRef} className="mb-6 pb-6 border-b border-dark-text/10">
          <div className="flex items-center justify-between">
            <span className="font-display text-3xl font-bold text-dark-text">
              {displayPrice}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
              className={`px-6 py-3 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-dark-text text-white hover:bg-dark-text/90'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? t('sidebar.adding') : addedToCart ? t('sidebar.added') : t('sidebar.add')}
            </button>
          </div>
        </div>

        {/* Badge Adaptable / Non-Adaptable (compact) */}
        <div className="mb-6 pb-6 border-b border-dark-text/10">
          {isNonAdaptable ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-bronze/5 rounded">
              <svg className="w-3.5 h-3.5 text-bronze flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <span className="font-sans text-[10px] tracking-[0.1em] font-medium text-bronze uppercase">
                {t('sidebar.sunOnly')}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded">
              <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="font-sans text-[10px] tracking-[0.1em] font-medium text-dark-text uppercase">
                {t('sidebar.adaptable')}
              </span>
            </div>
          )}
        </div>

        {/* Description (preview + Voir plus) */}
        <div className="mb-6 pb-6 border-b border-dark-text/10">
          <div className={`relative ${!showDescription ? 'max-h-[5.5em] overflow-hidden' : ''}`}>
            {translatedDescriptionHtml ? (
              <div
                className="font-sans text-[13px] text-dark-text/[0.85] leading-[1.85] description-content"
                dangerouslySetInnerHTML={createSanitizedMarkup(translatedDescriptionHtml)}
              />
            ) : (
              <p className="font-sans text-[13px] text-dark-text/[0.85] leading-[1.85]">
                {translatedDescription}
              </p>
            )}
            {!showDescription && (
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent" />
            )}
          </div>
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="font-sans text-xs tracking-[0.1em] text-dark-text/70 hover:text-dark-text mt-3 transition-colors duration-300 underline underline-offset-4 decoration-dark-text/25 hover:decoration-dark-text/60"
          >
            {showDescription ? t('sidebar.seeLess') : t('sidebar.seeMore')}
          </button>
        </div>

        {/* ========================================
            SÉLECTION DE VARIANTES INTERNES (si plusieurs)
            ======================================== */}
        {product.variants.length > 1 && (
          <div className="mb-8 pb-8 border-b border-dark-text/10">
            <div className="flex items-center justify-between mb-5">
              <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
                {t('sidebar.variant')}
              </span>
              <span className="font-sans text-sm text-dark-text/70">
                {product.variants[selectedColorIndex]?.colorName || t('sidebar.select')}
              </span>
            </div>

            {/* Grille des boutons de variante */}
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant, index) => {
                const colorValue = getColorFromName(variant.colorName || '');
                const isSelected = selectedColorIndex === index;
                const isAvailable = variant.availableForSale;

                return (
                  <button
                    key={variant.id}
                    onClick={() => onColorChange(index)}
                    disabled={!isAvailable}
                    className={`relative group transition-all duration-300 ${
                      !isAvailable ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
                    }`}
                    title={`${variant.colorName}${!isAvailable ? ` (${t('sidebar.soldOut')})` : ''}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-dark-text ring-offset-2'
                          : 'ring-1 ring-dark-text/20 hover:ring-dark-text/40'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full relative overflow-hidden shadow-sm"
                        style={{ backgroundColor: colorValue }}
                      >
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)'
                          }}
                        />
                      </div>
                    </div>

                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-red-500 rotate-45" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedVariant && !selectedVariant.availableForSale && (
              <p className="mt-4 font-sans text-sm text-red-600">
                {t('sidebar.variantSoldOut')}
              </p>
            )}
          </div>
        )}

        {/* Dimensions */}
        <div className="mb-6 pb-6 border-b border-dark-text/10">
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className="w-full flex items-center justify-between group"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
              {t('sidebar.dimensions')}
            </span>
            <motion.div
              animate={{ rotate: showDimensions ? 0 : 45 }}
              transition={{ duration: 0.2 }}
            >
              {showDimensions ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </motion.div>
          </button>

          <AnimatePresence>
            {showDimensions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-neutral-50 rounded">
                    <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">{t('sidebar.lens')}</p>
                    <p className="font-sans text-sm font-medium text-dark-text">{product.dimensions.lens}</p>
                  </div>
                  <div className="text-center p-3 bg-neutral-50 rounded">
                    <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">{t('sidebar.bridge')}</p>
                    <p className="font-sans text-sm font-medium text-dark-text">{product.dimensions.bridge}</p>
                  </div>
                  <div className="text-center p-3 bg-neutral-50 rounded">
                    <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">{t('sidebar.temple')}</p>
                    <p className="font-sans text-sm font-medium text-dark-text">{product.dimensions.temple}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fabrication */}
        <div className="mb-6 pb-6 border-b border-dark-text/10">
          <button
            onClick={() => setShowFabrication(!showFabrication)}
            className="w-full flex items-center justify-between group"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-dark-text uppercase">
              {t('sidebar.fabrication')}
            </span>
            <motion.div
              animate={{ rotate: showFabrication ? 0 : 45 }}
              transition={{ duration: 0.2 }}
            >
              {showFabrication ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </motion.div>
          </button>

          <AnimatePresence>
            {showFabrication && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-neutral-50 rounded">
                      <p className="font-display text-lg font-bold text-dark-text">6-8</p>
                      <p className="font-sans text-[9px] tracking-[0.15em] text-dark-text/50 uppercase mt-0.5">{t('sidebar.artisansPerPair')}</p>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded">
                      <p className="font-display text-lg font-bold text-dark-text">100+</p>
                      <p className="font-sans text-[9px] tracking-[0.15em] text-dark-text/50 uppercase mt-0.5">{t('sidebar.fabricationSteps')}</p>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded">
                      <p className="font-display text-lg font-bold text-dark-text">8-15h</p>
                      <p className="font-sans text-[9px] tracking-[0.15em] text-dark-text/50 uppercase mt-0.5">{t('sidebar.cumulativeWork')}</p>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded">
                      <p className="font-display text-lg font-bold text-dark-text">3</p>
                      <p className="font-sans text-[9px] tracking-[0.15em] text-dark-text/50 uppercase mt-0.5">{t('sidebar.countriesOneStandard')}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-sans text-xs text-dark-text/60 leading-relaxed">
                      <span className="font-semibold text-dark-text">{t('sidebar.fab1Title')}</span> {t('sidebar.fab1Desc')}
                    </p>
                    <p className="font-sans text-xs text-dark-text/60 leading-relaxed">
                      <span className="font-semibold text-dark-text">{t('sidebar.fab2Title')}</span> {t('sidebar.fab2Desc')}
                    </p>
                    <p className="font-sans text-xs text-dark-text/60 leading-relaxed">
                      <span className="font-semibold text-dark-text">{t('sidebar.fab3Title')}</span> {t('sidebar.fab3Desc')}
                    </p>
                    <p className="font-sans text-xs text-dark-text/60 leading-relaxed">
                      <span className="font-semibold text-dark-text">{t('sidebar.fab4Title')}</span> {t('sidebar.fab4Desc')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        </div>

      {/* Style pour la description HTML */}
      <style>{`
        .description-content p {
          margin-bottom: 1rem;
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
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
