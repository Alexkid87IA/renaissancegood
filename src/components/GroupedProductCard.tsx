// ========================================
// COMPOSANT GROUPED PRODUCT CARD
// Carte produit — mode grille (vertical) ou éditorial (horizontal single-col)
// ========================================

import { useState, useMemo, memo, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GroupedProduct, getColorSwatchStyle } from '../lib/productGrouping';
import { getProductDescription } from '../data/productDescriptions';
import LocaleLink from './LocaleLink';
import T from './TranslatedText';

interface GroupedProductCardProps {
  groupedProduct: GroupedProduct;
  index?: number;
  showNewBadge?: boolean;
  collectionName?: string;
  layout?: 'grid' | 'editorial';
}

// Set global pour ne pas preloader deux fois la même URL
const preloaded = new Set<string>();

function preloadImage(url: string) {
  if (preloaded.has(url)) return;
  preloaded.add(url);
  const img = new Image();
  img.src = url;
}

// Preload les images d'un seul coloris (appelé au hover du swatch ou de la carte)
function preloadVariantImages(variant: ColorVariant) {
  for (const edge of variant.product.images.edges) {
    preloadImage(resizeShopifyImage(edge.node.url, 800));
  }
}

// Resize Shopify CDN images — ajoute _WIDTHx au nom de fichier
function resizeShopifyImage(url: string, width: number): string {
  if (!url || !url.includes('cdn.shopify.com')) return url;
  // Pattern: filename.ext → filename_WIDTHx.ext
  return url.replace(/(\.\w+)(\?|$)/, `_${width}x$1$2`);
}

// ── Mode grille : composant léger, memoized ──
const GridCard = memo(function GridCard({
  groupedProduct,
}: {
  groupedProduct: GroupedProduct;
}) {
  const { t } = useTranslation('product');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageReady, setImageReady] = useState(true);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const currentVariant = groupedProduct.colorVariants[selectedVariantIndex];
  const currentProduct = currentVariant.product;

  const productImages = useMemo(
    () => currentProduct.images.edges.map(edge => edge.node.url),
    [currentProduct.images.edges]
  );
  const currentImage = productImages[currentImageIndex] || productImages[0];

  const price = useMemo(
    () => parseFloat(currentProduct.priceRange.minVariantPrice.amount).toFixed(0),
    [currentProduct.priceRange.minVariantPrice.amount]
  );

  const isOutOfStock = currentProduct.availableForSale === false;

  const finishLoading = useCallback(() => {
    setImageLoading(false);
    setImageReady(true);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
  }, []);

  // Safety timeout: force show after 2s if onLoad doesn't fire
  useEffect(() => {
    if (!imageLoading) return;
    safetyTimerRef.current = setTimeout(finishLoading, 2000);
    return () => { if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current); };
  }, [imageLoading, currentImage, finishLoading]);

  // Preload le coloris actuel au hover de la carte
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    preloadVariantImages(groupedProduct.colorVariants[selectedVariantIndex]);
  }, [groupedProduct, selectedVariantIndex]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Preload le coloris cible au hover du swatch, puis switch au clic
  const handleSwatchHover = useCallback((variantIndex: number) => {
    preloadVariantImages(groupedProduct.colorVariants[variantIndex]);
  }, [groupedProduct]);

  const handleColorChange = useCallback((variantIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);
    setImageReady(false);
    setSelectedVariantIndex(variantIndex);
    setCurrentImageIndex(0);
  }, []);

  const handleImageChange = useCallback((imgIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);
    setImageReady(false);
    setCurrentImageIndex(imgIndex);
  }, []);

  return (
    <div className="group relative">
      <LocaleLink
        to={`/product/${currentVariant.handle}`}
        className="block cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[#f0eeea]">
          <img
            key={`${selectedVariantIndex}-${currentImageIndex}`}
            src={resizeShopifyImage(currentImage, 800)}
            alt={groupedProduct.modelName}
            onLoad={finishLoading}
            className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHovered ? 'scale-[1.04]' : 'scale-100'
            } ${imageReady ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
          />

          {/* Loading bar — bronze sweep */}
          {imageLoading && (
            <div className="absolute inset-x-0 bottom-0 h-[2px] z-30 overflow-hidden">
              <div className="h-full bg-bronze animate-[loadingSweep_1.2s_ease-in-out_infinite]" />
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-block bg-dark-text/80 text-white font-sans text-[8px] tracking-[0.25em] font-medium uppercase px-3 py-1.5">
                {t('sidebar.soldOut')}
              </span>
            </div>
          )}

          {productImages.length > 1 && (
            <div className={`absolute bottom-2.5 left-3 flex gap-0.5 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {productImages.slice(0, 5).map((_, imgIndex) => (
                <button
                  type="button"
                  key={imgIndex}
                  onClick={(e) => handleImageChange(imgIndex, e)}
                  aria-label={`Image ${imgIndex + 1}`}
                  className="p-1 cursor-pointer"
                >
                  <span className={`block h-[2px] rounded-full transition-all duration-300 ${
                    currentImageIndex === imgIndex
                      ? 'bg-dark-text w-4'
                      : 'bg-dark-text/25 w-2 hover:bg-dark-text/50'
                  }`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 pb-2">
          <h3 className="font-display text-sm sm:text-base font-bold text-dark-text tracking-[-0.01em] leading-tight uppercase truncate">
            <T>{groupedProduct.modelName}</T>
          </h3>
          <p className="font-sans text-sm font-semibold text-dark-text mt-1">
            {price}&nbsp;€
          </p>

          {(() => {
            const desc = getProductDescription(groupedProduct.modelName);
            return desc ? (
              <p className="font-sans text-[11px] sm:text-xs text-dark-text/50 leading-[1.6] font-light mt-2 line-clamp-2">
                {desc}
              </p>
            ) : null;
          })()}

          {groupedProduct.colorVariants.length > 1 && (
            <div className="flex items-center gap-2 mt-3">
              {groupedProduct.colorVariants.map((variant, variantIndex) => (
                <button
                  type="button"
                  key={variant.handle}
                  onClick={(e) => handleColorChange(variantIndex, e)}
                  onMouseEnter={() => handleSwatchHover(variantIndex)}
                  className={`flex-1 max-w-[56px] aspect-square overflow-hidden transition-all duration-200 ${
                    selectedVariantIndex === variantIndex
                      ? 'ring-2 ring-dark-text ring-offset-2 opacity-100'
                      : 'ring-1 ring-dark-text/10 opacity-50 hover:opacity-80 hover:ring-dark-text/30'
                  }`}
                  title={`${t('sidebar.color')} ${variant.colorNumber}`}
                  aria-label={`${t('sidebar.color')} ${variant.colorNumber}`}
                >
                  {variant.thumbnail ? (
                    <img
                      src={resizeShopifyImage(variant.thumbnail, 150)}
                      alt={`${t('sidebar.color')} ${variant.colorNumber}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={getColorSwatchStyle(variant.colorNumber, variant.colorName)}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </LocaleLink>
    </div>
  );
});

// ── Composant principal : dispatch grid vs editorial ──
function GroupedProductCard({
  groupedProduct,
  index = 0,
  collectionName,
  layout = 'grid',
}: GroupedProductCardProps) {
  if (layout === 'grid') {
    return <GridCard groupedProduct={groupedProduct} />;
  }
  return <EditorialCard groupedProduct={groupedProduct} index={index} collectionName={collectionName} />;
}

// ── Mode éditorial ──
const EditorialCard = memo(function EditorialCard({
  groupedProduct,
  index = 0,
  collectionName,
}: {
  groupedProduct: GroupedProduct;
  index?: number;
  collectionName?: string;
}) {
  const { t } = useTranslation('product');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageReady, setImageReady] = useState(true);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const currentVariant = groupedProduct.colorVariants[selectedVariantIndex];
  const currentProduct = currentVariant.product;

  const productImages = useMemo(
    () => currentProduct.images.edges.map(edge => edge.node.url),
    [currentProduct.images.edges]
  );
  const currentImage = productImages[currentImageIndex] || productImages[0];

  const price = useMemo(
    () => parseFloat(currentProduct.priceRange.minVariantPrice.amount).toFixed(0),
    [currentProduct.priceRange.minVariantPrice.amount]
  );

  const isOutOfStock = currentProduct.availableForSale === false;
  const counterLabel = String(index + 1).padStart(2, '0');
  const thumbnailImages = productImages.slice(0, 5);
  const isEven = index % 2 === 0;

  const finishLoading = useCallback(() => {
    setImageLoading(false);
    setImageReady(true);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
  }, []);

  // Safety timeout: force show after 2s if onLoad doesn't fire
  useEffect(() => {
    if (!imageLoading) return;
    safetyTimerRef.current = setTimeout(finishLoading, 2000);
    return () => { if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current); };
  }, [imageLoading, currentImage, finishLoading]);

  // Preload le coloris actuel au hover de la carte
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    preloadVariantImages(groupedProduct.colorVariants[selectedVariantIndex]);
  }, [groupedProduct, selectedVariantIndex]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleSwatchHover = useCallback((variantIndex: number) => {
    preloadVariantImages(groupedProduct.colorVariants[variantIndex]);
  }, [groupedProduct]);

  const handleColorChange = useCallback((variantIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);
    setImageReady(false);
    setSelectedVariantIndex(variantIndex);
    setCurrentImageIndex(0);
  }, []);

  const handleImageChange = useCallback((imgIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);
    setImageReady(false);
    setCurrentImageIndex(imgIndex);
  }, []);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <LocaleLink
        to={`/product/${currentVariant.handle}`}
        className="block cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Desktop : horizontal, alternance gauche/droite */}
        <div className={`hidden md:flex items-stretch ${isEven ? '' : 'flex-row-reverse'}`}>
          {/* Image — 60% */}
          <div className="relative w-[60%] bg-[#f0eeea]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                key={`desktop-${selectedVariantIndex}-${currentImageIndex}`}
                src={resizeShopifyImage(currentImage, 1000)}
                alt={groupedProduct.modelName}
                onLoad={finishLoading}
                className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isHovered ? 'scale-[1.03]' : 'scale-100'
                } ${imageReady ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
              />

              {/* Loading bar — bronze sweep */}
              {imageLoading && (
                <div className="absolute inset-x-0 bottom-0 h-[2px] z-30 overflow-hidden">
                  <div className="h-full bg-bronze animate-[loadingSweep_1.2s_ease-in-out_infinite]" />
                </div>
              )}
              <div className="absolute top-4 left-4 z-10 w-8 h-8 border border-white/30 flex items-center justify-center">
                <span className="font-sans text-[10px] font-medium text-white tracking-wide">
                  {counterLabel}
                </span>
              </div>

              {isOutOfStock && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-block bg-dark-text/80 text-white font-sans text-[9px] tracking-[0.25em] font-medium uppercase px-4 py-2">
                    {t('sidebar.soldOut')}
                  </span>
                </div>
              )}
            </div>

            {thumbnailImages.length > 1 && (
              <div className="flex gap-1.5 pt-1.5">
                {thumbnailImages.map((imgUrl, imgIndex) => (
                  <button
                    type="button"
                    key={imgIndex}
                    onClick={(e) => handleImageChange(imgIndex, e)}
                    aria-label={`Image ${imgIndex + 1}`}
                    className={`relative flex-1 aspect-[16/10] overflow-hidden cursor-pointer transition-opacity duration-300 ${
                      currentImageIndex === imgIndex
                        ? 'opacity-100'
                        : 'opacity-40 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={resizeShopifyImage(imgUrl, 300)}
                      alt={`${groupedProduct.modelName} - ${imgIndex + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Infos — 40% */}
          <div className={`w-[40%] bg-white flex flex-col justify-center ${isEven ? 'pl-10 xl:pl-14 pr-8' : 'pr-10 xl:pr-14 pl-8'}`}>
            {collectionName && (
              <p className="font-sans text-[9px] tracking-[0.35em] text-dark-text/30 uppercase mb-4">
                {collectionName}
              </p>
            )}

            <p className="font-display text-4xl xl:text-5xl font-bold text-dark-text/[0.06] leading-none mb-3">
              {counterLabel}
            </p>

            <h3 className={`font-display text-2xl xl:text-3xl font-bold text-dark-text tracking-[-0.02em] leading-[0.95] uppercase transition-colors duration-500 ${
              isHovered ? 'text-bronze' : ''
            }`}>
              <T>{groupedProduct.modelName}</T>
            </h3>

            <div className={`w-12 h-px mt-6 mb-5 transition-all duration-500 ${
              isHovered ? 'bg-bronze/40' : 'bg-dark-text/15'
            }`} />

            <p className="font-sans text-base sm:text-lg font-semibold text-dark-text">
              {price}&nbsp;€
            </p>

            {(() => {
              const desc = getProductDescription(groupedProduct.modelName);
              return desc ? (
                <p className="font-sans text-xs xl:text-sm text-dark-text/45 leading-[1.7] font-light mt-4 line-clamp-3">
                  {desc}
                </p>
              ) : null;
            })()}

            {groupedProduct.colorVariants.length > 1 && (
              <div className="mt-6">
                <p className="font-sans text-[8px] tracking-[0.2em] text-dark-text/30 uppercase mb-3">
                  {t('sidebar.coloris')} — {groupedProduct.colorVariants.length}
                </p>
                <div className="flex gap-2.5">
                  {groupedProduct.colorVariants.map((variant, variantIndex) => (
                    <button
                      type="button"
                      key={variant.handle}
                      onClick={(e) => handleColorChange(variantIndex, e)}
                      onMouseEnter={() => handleSwatchHover(variantIndex)}
                      className={`flex-1 max-w-[72px] aspect-square overflow-hidden transition-all duration-300 ${
                        selectedVariantIndex === variantIndex
                          ? 'ring-2 ring-dark-text ring-offset-2 opacity-100'
                          : 'ring-1 ring-dark-text/10 opacity-40 hover:opacity-75 hover:ring-dark-text/30'
                      }`}
                      title={`${t('sidebar.color')} ${variant.colorNumber}`}
                      aria-label={`${t('sidebar.color')} ${variant.colorNumber}`}
                    >
                      {variant.thumbnail ? (
                        <img src={resizeShopifyImage(variant.thumbnail, 200)} alt={`${t('sidebar.color')} ${variant.colorNumber}`} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full" style={getColorSwatchStyle(variant.colorNumber, variant.colorName)} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <span className="group/btn relative inline-flex overflow-hidden border border-dark-text px-8 py-3.5">
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover/btn:text-beige transition-colors duration-500">
                  {t('sidebar.discover')}
                </span>
                <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
              </span>
            </div>
          </div>
        </div>

        {/* Mobile : carte verticale */}
        <div className="md:hidden">
          <div className="relative bg-[#f0eeea]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                key={`mobile-${selectedVariantIndex}-${currentImageIndex}`}
                src={resizeShopifyImage(currentImage, 600)}
                alt={groupedProduct.modelName}
                onLoad={finishLoading}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageReady ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
              />

              {/* Loading bar — bronze sweep */}
              {imageLoading && (
                <div className="absolute inset-x-0 bottom-0 h-[2px] z-30 overflow-hidden">
                  <div className="h-full bg-bronze animate-[loadingSweep_1.2s_ease-in-out_infinite]" />
                </div>
              )}
              <div className="absolute top-3 left-3 z-10 w-7 h-7 border border-white/30 flex items-center justify-center">
                <span className="font-sans text-[9px] font-medium text-white tracking-wide">
                  {counterLabel}
                </span>
              </div>
              {isOutOfStock && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-block bg-dark-text/80 text-white font-sans text-[8px] tracking-[0.25em] font-medium uppercase px-3 py-1.5">
                    {t('sidebar.soldOut')}
                  </span>
                </div>
              )}
            </div>

            {thumbnailImages.length > 1 && (
              <div className="flex gap-1 pt-1">
                {thumbnailImages.map((imgUrl, imgIndex) => (
                  <button
                    type="button"
                    key={imgIndex}
                    onClick={(e) => handleImageChange(imgIndex, e)}
                    aria-label={`Image ${imgIndex + 1}`}
                    className={`relative flex-1 aspect-[16/10] overflow-hidden cursor-pointer transition-opacity duration-300 ${
                      currentImageIndex === imgIndex
                        ? 'opacity-100'
                        : 'opacity-40 hover:opacity-80'
                    }`}
                  >
                    <img src={resizeShopifyImage(imgUrl, 200)} alt={`${groupedProduct.modelName} - ${imgIndex + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white px-4 pt-4 pb-4">
            {collectionName && (
              <p className="font-sans text-[8px] tracking-[0.35em] text-dark-text/30 uppercase mb-1.5">
                {collectionName}
              </p>
            )}
            <h3 className="font-display text-lg font-bold text-dark-text tracking-[-0.01em] leading-tight uppercase">
              <T>{groupedProduct.modelName}</T>
            </h3>
            <div className="w-8 h-px bg-dark-text/15 mt-3 mb-3" />
            <p className="font-sans text-base font-semibold text-dark-text">
              {price}&nbsp;€
            </p>
            {groupedProduct.colorVariants.length > 1 && (
              <div className="mt-4">
                <p className="font-sans text-[7px] tracking-[0.2em] text-dark-text/30 uppercase mb-2.5">
                  {t('sidebar.coloris')} — {groupedProduct.colorVariants.length}
                </p>
                <div className="flex gap-2">
                  {groupedProduct.colorVariants.map((variant, variantIndex) => (
                    <button
                      type="button"
                      key={variant.handle}
                      onClick={(e) => handleColorChange(variantIndex, e)}
                      className={`flex-1 max-w-[64px] aspect-square overflow-hidden transition-all duration-300 ${
                        selectedVariantIndex === variantIndex
                          ? 'ring-2 ring-dark-text ring-offset-2 opacity-100'
                          : 'ring-1 ring-dark-text/10 opacity-40 hover:opacity-75'
                      }`}
                      title={`${t('sidebar.color')} ${variant.colorNumber}`}
                      aria-label={`${t('sidebar.color')} ${variant.colorNumber}`}
                    >
                      {variant.thumbnail ? (
                        <img src={resizeShopifyImage(variant.thumbnail, 150)} alt={`${t('sidebar.color')} ${variant.colorNumber}`} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full" style={getColorSwatchStyle(variant.colorNumber, variant.colorName)} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </LocaleLink>
    </motion.div>
  );
});

function arePropsEqual(
  prev: GroupedProductCardProps,
  next: GroupedProductCardProps
) {
  return (
    prev.groupedProduct.modelName === next.groupedProduct.modelName &&
    prev.groupedProduct.colorVariants.length === next.groupedProduct.colorVariants.length &&
    prev.index === next.index &&
    prev.layout === next.layout &&
    prev.collectionName === next.collectionName
  );
}

export default memo(GroupedProductCard, arePropsEqual);
export type { GroupedProductCardProps };
