// ========================================
// COMPOSANT GROUPED PRODUCT CARD
// Carte produit — mode grille (vertical) ou éditorial (horizontal single-col)
// ========================================

import { useState, useMemo, memo, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GroupedProduct, getColorSwatchStyle } from '../lib/productGrouping';
import type { ColorVariant } from '../lib/productGrouping';
import { getProductDescription } from '../data/productDescriptions';
import LocaleLink from './LocaleLink';
import ModelTitle from './ModelTitle';
import { resizeShopifyImage } from '../lib/imageUtils';

interface GroupedProductCardProps {
  groupedProduct: GroupedProduct;
  index?: number;
  showNewBadge?: boolean;
  collectionName?: string;
  layout?: 'grid' | 'editorial';
}

// Set global pour ne pas preloader deux fois la même URL
const preloaded = new Set<string>();
let productPagePreloaded = false;

function preloadProductPage() {
  if (productPagePreloaded) return;
  productPagePreloaded = true;
  void import('../pages/ProductPage');
}

function preloadImage(url: string) {
  if (preloaded.has(url)) return;
  preloaded.add(url);
  const img = new Image();
  img.src = url;
}

// Preload les images d'un seul coloris (appelé au hover du swatch ou de la carte)
function preloadVariantImages(variant: ColorVariant) {
  for (const edge of variant.product.images.edges) {
    preloadImage(resizeShopifyImage(edge.node.url, 800, variant.product.title, variant.product.images.edges.indexOf(edge)));
  }
}

// ── Mode grille : composant léger, memoized ──
const GridCard = memo(function GridCard({
  groupedProduct,
  index = 0,
}: {
  groupedProduct: GroupedProduct;
  index?: number;
}) {
  const { t } = useTranslation('product');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  // Démarre à `false` : tant que l'image lazy n'a pas appelé onLoad,
  // on affiche le shimmer skeleton plutôt qu'un bg flat.
  const isAboveFold = index < 6;
  const isLcpCandidate = index < 4;
  const [imageReady, setImageReady] = useState(isAboveFold);
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
    preloadProductPage();
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
          {/* Shimmer skeleton — visible tant que l'image n'est pas chargée */}
          {!imageReady && (
            <div className="absolute inset-0 skeleton-shimmer pointer-events-none z-10" />
          )}

          <img
            key={`${selectedVariantIndex}-${currentImageIndex}`}
            src={resizeShopifyImage(currentImage, 700, currentProduct.title, currentImageIndex)}
            alt={groupedProduct.modelName}
            onLoad={finishLoading}
            onError={finishLoading}
            className={`w-full h-full object-cover transition-[transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHovered ? 'scale-[1.04]' : 'scale-100'
            } ${imageReady ? 'opacity-100' : 'opacity-0'}`}
            loading={isAboveFold ? 'eager' : 'lazy'}
            fetchpriority={isLcpCandidate ? 'high' : 'auto'}
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-dark-text tracking-normal leading-[0.95] uppercase break-words">
              <ModelTitle name={groupedProduct.modelName} />
            </h3>
            <p className="font-sans text-sm font-semibold text-dark-text whitespace-nowrap pt-0.5">
              {price}&nbsp;€
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-y border-dark-text/[0.08] py-2.5">
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-dark-text/[0.62]">
              {groupedProduct.colorVariants.length} {t('sidebar.coloris')}
            </p>
            {groupedProduct.colorVariants.length > 1 && (
              <span className="font-sans text-[8px] tracking-[0.24em] uppercase text-bronze">
                {t('sidebar.discover')}
              </span>
            )}
          </div>

          {groupedProduct.colorVariants.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 mt-3 bg-white/70 border border-dark-text/[0.06] p-2">
              {groupedProduct.colorVariants.map((variant, variantIndex) => (
                <button
                  type="button"
                  key={variant.handle}
                  onClick={(e) => handleColorChange(variantIndex, e)}
                  onMouseEnter={() => handleSwatchHover(variantIndex)}
                  className={`h-14 w-14 sm:h-16 sm:w-16 overflow-hidden transition-all duration-200 ${
                    selectedVariantIndex === variantIndex
                      ? 'ring-2 ring-bronze ring-offset-2 opacity-100'
                      : 'ring-1 ring-dark-text/10 opacity-65 hover:opacity-100 hover:ring-dark-text/30'
                  }`}
                  title={`${t('sidebar.color')} ${variant.colorNumber}`}
                  aria-label={`${t('sidebar.color')} ${variant.colorNumber}`}
                >
                  {variant.thumbnail ? (
                    <img
                      src={resizeShopifyImage(variant.thumbnail, 150, variant.product.title, 0)}
                      alt={`${t('sidebar.color')} ${variant.colorNumber}`}
                      className="w-full h-full object-contain bg-[#f5f4f0] p-1.5"
                      loading="lazy"
                      decoding="async"
                      sizes="56px"
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
    return <GridCard groupedProduct={groupedProduct} index={index} />;
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
  // Toutes les images sont preloadées via CollectionPageTemplate.
  // Les 6 premières sont en eager + les 4 premières en fetchPriority high.
  const isAboveFold = index < 6;
  const isLcpCandidate = index < 4;
  // Puisque toutes les images sont preloadées, on démarre visible
  // (pas de shimmer flash pour les images déjà en cache).
  // Le shimmer ne s'active que sur changement de coloris (imageLoading).
  const [imageReady, setImageReady] = useState(true);
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
    preloadProductPage();
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
      style={{ contain: 'layout paint', willChange: 'transform' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
              {/* Shimmer skeleton — visible tant que l'image n'est pas chargée */}
              {!imageReady && (
                <div className="absolute inset-0 skeleton-shimmer pointer-events-none z-10" />
              )}

              <img
                key={`desktop-${selectedVariantIndex}-${currentImageIndex}`}
                src={resizeShopifyImage(currentImage, 800, currentProduct.title, currentImageIndex)}
                alt={groupedProduct.modelName}
                onLoad={finishLoading}
                onError={finishLoading}
                className={`w-full h-full object-cover transition-[transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isHovered ? 'scale-[1.03]' : 'scale-100'
                } ${imageReady ? 'opacity-100' : 'opacity-0'}`}
                loading={isAboveFold ? 'eager' : 'lazy'}
                fetchpriority={isLcpCandidate ? 'high' : 'auto'}
                decoding="async"
                sizes="(max-width: 768px) 100vw, 60vw"
              />

              {/* Loading bar — bronze sweep */}
              {imageLoading && (
                <div className="absolute inset-x-0 bottom-0 h-[2px] z-30 overflow-hidden">
                  <div className="h-full bg-bronze animate-[loadingSweep_1.2s_ease-in-out_infinite]" />
                </div>
              )}
              {isOutOfStock && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-block bg-dark-text/70 border border-white/10 text-white font-sans text-[9px] tracking-[0.25em] font-medium uppercase px-4 py-2 rounded-[3px]">
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
                      src={resizeShopifyImage(imgUrl, 300, currentProduct.title, imgIndex)}
                      alt={`${groupedProduct.modelName} - ${imgIndex + 1}`}
                      className="w-full h-full object-contain bg-[#f5f4f0] p-2"
                      loading="lazy"
                      decoding="async"
                      sizes="160px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Infos — 40% glassmorphism */}
          {/* Note perf : pas de backdrop-blur ici — trop coûteux multiplié par N cards.
              Utilise un bg solide blanc cassé qui imite l'effet glass sans cost GPU. */}
          <div className={`w-[40%] bg-white/[0.85] border border-white/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_4px_30px_rgba(0,0,0,0.03)] flex flex-col justify-center ${isEven ? 'pl-10 xl:pl-14 pr-8' : 'pr-10 xl:pr-14 pl-8'}`}>
            {collectionName && (
              <p className="font-sans text-[9px] tracking-[0.35em] text-dark-text/30 uppercase mb-4">
                {collectionName}
              </p>
            )}

            <h3 className={`font-display text-2xl xl:text-3xl font-bold text-dark-text tracking-[-0.02em] leading-[0.95] uppercase transition-colors duration-500 ${
              isHovered ? 'text-bronze' : ''
            }`}>
              <ModelTitle name={groupedProduct.modelName} />
            </h3>

            <div className={`w-12 h-px mt-6 mb-5 transition-all duration-500 ${
              isHovered ? 'bg-bronze/40' : 'bg-dark-text/[0.15]'
            }`} />

            <p className="font-sans text-base sm:text-lg font-semibold text-dark-text">
              {price}&nbsp;€
            </p>

            {(() => {
              const desc = getProductDescription(groupedProduct.modelName);
              return desc ? (
                <p className="font-sans text-xs xl:text-sm text-dark-text/[0.45] leading-[1.7] font-light mt-4 line-clamp-3">
                  {desc}
                </p>
              ) : null;
            })()}

            {groupedProduct.colorVariants.length > 1 && (
              <div className="mt-6">
                <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-3">
                  {t('sidebar.coloris')} · {groupedProduct.colorVariants.length}
                </p>
                <div className="flex gap-3">
                  {groupedProduct.colorVariants.map((variant, variantIndex) => (
                    <button
                      type="button"
                      key={variant.handle}
                      onClick={(e) => handleColorChange(variantIndex, e)}
                      onMouseEnter={() => handleSwatchHover(variantIndex)}
                      className={`flex-1 max-w-[96px] aspect-[4/3] overflow-hidden transition-all duration-300 ${
                        selectedVariantIndex === variantIndex
                          ? 'ring-2 ring-dark-text ring-offset-2 opacity-100'
                          : 'ring-1 ring-dark-text/[0.15] opacity-65 hover:opacity-90 hover:ring-dark-text/30'
                      }`}
                      title={variant.colorName || `${t('sidebar.color')} ${variant.colorNumber}`}
                      aria-label={variant.colorName || `${t('sidebar.color')} ${variant.colorNumber}`}
                    >
                      {variant.thumbnail ? (
                        <img
                          src={resizeShopifyImage(variant.thumbnail, 250, variant.product.title, 0)}
                          alt={variant.colorName || `${t('sidebar.color')} ${variant.colorNumber}`}
                          className="w-full h-full object-contain bg-[#f5f4f0] p-2"
                          loading="lazy"
                          decoding="async"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full" style={getColorSwatchStyle(variant.colorNumber, variant.colorName)} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <span className="relative inline-flex items-center overflow-hidden rounded-2xl border border-dark-text/[0.45] px-7 py-3 transition-all duration-500">
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text transition-colors duration-500 group-hover:text-beige">{t('sidebar.discover')}</span>
                <span className="absolute inset-0 bg-dark-text scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </span>
            </div>
          </div>
        </div>

        {/* Mobile : carte verticale */}
        <div className="md:hidden">
          <div className="relative bg-[#f0eeea]">
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* Shimmer skeleton — visible tant que l'image n'est pas chargée */}
              {!imageReady && (
                <div className="absolute inset-0 skeleton-shimmer pointer-events-none z-10" />
              )}

              <img
                key={`mobile-${selectedVariantIndex}-${currentImageIndex}`}
                src={resizeShopifyImage(currentImage, 600, currentProduct.title, currentImageIndex)}
                alt={groupedProduct.modelName}
                onLoad={finishLoading}
                onError={finishLoading}
                className={`w-full h-full object-cover ${imageReady ? 'opacity-100' : 'opacity-0'}`}
                loading={isAboveFold ? 'eager' : 'lazy'}
                fetchpriority={isLcpCandidate ? 'high' : 'auto'}
                decoding="async"
                sizes="100vw"
              />

              {/* Loading bar — bronze sweep */}
              {imageLoading && (
                <div className="absolute inset-x-0 bottom-0 h-[2px] z-30 overflow-hidden">
                  <div className="h-full bg-bronze animate-[loadingSweep_1.2s_ease-in-out_infinite]" />
                </div>
              )}
              {isOutOfStock && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-block bg-dark-text/70 border border-white/10 text-white font-sans text-[8px] tracking-[0.25em] font-medium uppercase px-3 py-1.5 rounded-[3px]">
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
                    <img
                      src={resizeShopifyImage(imgUrl, 200, currentProduct.title, imgIndex)}
                      alt={`${groupedProduct.modelName} - ${imgIndex + 1}`}
                      className="w-full h-full object-contain bg-[#f5f4f0] p-2"
                      loading="lazy"
                      decoding="async"
                      sizes="33vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/[0.85] border border-white/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)] px-4 pt-4 pb-4">
            {collectionName && (
              <p className="font-sans text-[8px] tracking-[0.35em] text-dark-text/30 uppercase mb-1.5">
                {collectionName}
              </p>
            )}
            <h3 className="font-display text-lg font-bold text-dark-text tracking-[-0.01em] leading-tight uppercase">
              <ModelTitle name={groupedProduct.modelName} />
            </h3>
            <div className="w-8 h-px bg-dark-text/[0.15] mt-3 mb-3" />
            <p className="font-sans text-base font-semibold text-dark-text">
              {price}&nbsp;€
            </p>
            {groupedProduct.colorVariants.length > 1 && (
              <div className="mt-4">
                <p className="font-sans text-[8px] tracking-[0.2em] text-dark-text/50 uppercase mb-2.5">
                  {t('sidebar.coloris')} · {groupedProduct.colorVariants.length}
                </p>
                <div className="flex gap-2.5">
                  {groupedProduct.colorVariants.map((variant, variantIndex) => (
                    <button
                      type="button"
                      key={variant.handle}
                      onClick={(e) => handleColorChange(variantIndex, e)}
                      className={`flex-1 max-w-[76px] aspect-[4/3] overflow-hidden transition-all duration-300 ${
                        selectedVariantIndex === variantIndex
                          ? 'ring-2 ring-dark-text ring-offset-2 opacity-100'
                          : 'ring-1 ring-dark-text/[0.15] opacity-65 hover:opacity-90'
                      }`}
                      title={variant.colorName || `${t('sidebar.color')} ${variant.colorNumber}`}
                      aria-label={variant.colorName || `${t('sidebar.color')} ${variant.colorNumber}`}
                    >
                      {variant.thumbnail ? (
                        <img
                          src={resizeShopifyImage(variant.thumbnail, 200, variant.product.title, 0)}
                          alt={variant.colorName || `${t('sidebar.color')} ${variant.colorNumber}`}
                          className="w-full h-full object-contain bg-[#f5f4f0] p-1.5"
                          loading="lazy"
                          decoding="async"
                          sizes="76px"
                        />
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
