import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../contexts/LocaleContext';
import { getProductsByCollection } from '../lib/shopify';
import { getGroupedProducts, GroupedProduct } from '../lib/productGrouping';
import { Product } from './ProductCard';
import GroupedProductCard from './GroupedProductCard';
import SEO from './SEO';
import { fade } from './shared';
import { resizeShopifyImage } from '../lib/imageUtils';

const VIDEO_SPEED = 0.7;

export interface CollectionPageConfig {
  collectionId: string;
  collectionName: string;
  translationPrefix: string;
  heroImage: string;
  seoUrl: string;
  heroVideo?: string;
  heroPoster?: string;
}

interface HeroProps {
  heroRef: React.Ref<HTMLDivElement>;
  config: CollectionPageConfig;
  prefix: string;
  imageY: MotionValue<string>;
}

function VideoHero({ heroRef, config, prefix, imageY }: HeroProps) {
  const { t } = useTranslation('collections');
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToProducts = useCallback(() => {
    document.querySelector('[data-products-section]')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = VIDEO_SPEED;
    video.play().catch(() => {
      const playOnTouch = () => {
        video.play();
        document.removeEventListener('touchstart', playOnTouch);
      };
      document.addEventListener('touchstart', playOnTouch);
    });
  }, []);

  return (
    <div ref={heroRef} className="h-screen relative overflow-hidden bg-[#000000]" data-header-theme="dark">

      {/* ── DESKTOP — Même layout trapèze que ImageHero, vidéo à la place de l'image ── */}
      <div className="relative h-full overflow-hidden hidden lg:flex">
        <div className="w-[52%] relative flex flex-col justify-center pl-10 xl:pl-20 2xl:pl-28 pr-10 xl:pr-12 overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ transformOrigin: 'center' }}
          >
            <div className="w-[140%] h-px bg-white/[0.04] rotate-[20deg]" />
          </motion.div>


          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
            }}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-display text-[clamp(4.25rem,5.75vw,8rem)] font-bold text-white tracking-normal leading-[0.84] mb-4 max-w-full break-words"
            >
              {t(`${prefix}.heroTitle`)}
            </motion.h1>

            <motion.p variants={fade} className="font-display text-lg xl:text-xl 2xl:text-2xl font-light italic text-white/[0.68] tracking-[-0.02em] leading-[1] mb-6 xl:mb-8">
              {t(`${prefix}.heroSubtitle`)}
            </motion.p>

            <motion.div variants={fade} className="w-10 h-px bg-bronze/[0.45] mb-6 xl:mb-8" />

            <motion.p variants={fade} className="font-sans text-white/[0.62] text-xs xl:text-[13px] 2xl:text-sm leading-[2] font-light max-w-xs mb-8 xl:mb-10">
              {t(`${prefix}.heroDescription`)}
            </motion.p>

            <motion.div variants={fade}>
              <button
                onClick={scrollToProducts}
                className="group inline-flex items-center gap-3 border-b border-white/[0.4] pb-1.5 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white transition-colors duration-500 hover:text-bronze hover:border-bronze/[0.6]"
              >
                <span>{t(`${prefix}.exploreCollection`)}</span>
                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-10 xl:left-20 2xl:left-28 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-8 h-px bg-white/[0.15]" />
            <span className="font-sans text-white/[0.15] text-[9px] tracking-[0.3em] uppercase">{t('scroll')}</span>
          </motion.div>
        </div>

        {/* Zone droite — Vidéo avec clip-path trapèze (même forme que l'image) */}
        <motion.div
          className="w-[48%] relative overflow-hidden"
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.video
            ref={videoRef}
            src={config.heroVideo}
            poster={config.heroPoster || config.heroImage}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: imageY }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-100"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 79px, rgba(255,255,255,0.03) 79px, rgba(255,255,255,0.03) 80px)',
            }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-[20%] right-[20%] flex items-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex-1 h-px bg-white/[0.06]" />
          <motion.div
            className="w-2 h-2 bg-white/[0.06] mx-3"
            style={{ transform: 'rotate(45deg)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          />
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>
      </div>

      {/* ── MOBILE — Vidéo clip diagonale + contenu bas ── */}
      <div className="relative h-full overflow-hidden lg:hidden flex flex-col">
        <motion.div
          className="relative h-[50%] overflow-hidden"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <video
            src={config.heroVideo}
            poster={config.heroPoster || config.heroImage}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </motion.div>

        <div className="flex-1 px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-[clamp(2.5rem,12vw,3.75rem)] font-bold text-white mb-2 tracking-normal leading-[0.88] max-w-full break-words">
              {t(`${prefix}.heroTitle`)}
            </h1>
            <p className="font-display text-lg font-light italic text-white/[0.68] tracking-[-0.02em] mb-4">
              {t(`${prefix}.heroSubtitle`)}
            </p>
            <div className="w-8 h-px bg-bronze/[0.45] mb-4" />
            <p className="text-white/[0.62] text-sm font-sans leading-relaxed font-light mb-6">
              {t(`${prefix}.heroDescription`)}
            </p>
            <button
              onClick={scrollToProducts}
              className="group inline-flex items-center gap-3 border-b border-white/[0.4] pb-1.5 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white transition-colors duration-500 hover:text-bronze hover:border-bronze/[0.6] active:text-bronze"
            >
              <span>{t(`${prefix}.exploreCollection`)}</span>
              <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          <motion.div
            className="flex items-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex-1 h-px bg-white/[0.06]" />
            <div className="w-1.5 h-1.5 bg-white/[0.06] mx-2" style={{ transform: 'rotate(45deg)' }} />
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ImageHero({ heroRef, config, prefix, imageY }: HeroProps) {
  const { t } = useTranslation('collections');

  const scrollToProducts = useCallback(() => {
    document.querySelector('[data-products-section]')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={heroRef} className="h-screen relative overflow-hidden bg-[#000000]" data-header-theme="dark">
      {/* DESKTOP */}
      <div className="relative h-full overflow-hidden hidden lg:flex">
        <div className="w-[52%] relative flex flex-col justify-center pl-10 xl:pl-20 2xl:pl-28 pr-10 xl:pr-12 overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ transformOrigin: 'center' }}
          >
            <div className="w-[140%] h-px bg-white/[0.04] rotate-[20deg]" />
          </motion.div>


          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
            }}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-display text-[clamp(4.25rem,5.75vw,8rem)] font-bold text-white tracking-normal leading-[0.84] mb-4 max-w-full break-words"
            >
              {t(`${prefix}.heroTitle`)}
            </motion.h1>

            <motion.p variants={fade} className="font-display text-lg xl:text-xl 2xl:text-2xl font-light italic text-white/[0.68] tracking-[-0.02em] leading-[1] mb-6 xl:mb-8">
              {t(`${prefix}.heroSubtitle`)}
            </motion.p>

            <motion.div variants={fade} className="w-10 h-px bg-bronze/[0.45] mb-6 xl:mb-8" />

            <motion.p variants={fade} className="font-sans text-white/[0.62] text-xs xl:text-[13px] 2xl:text-sm leading-[2] font-light max-w-xs mb-8 xl:mb-10">
              {t(`${prefix}.heroDescription`)}
            </motion.p>

            <motion.div variants={fade}>
              <button
                onClick={scrollToProducts}
                className="group inline-flex items-center gap-3 border-b border-white/[0.4] pb-1.5 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white transition-colors duration-500 hover:text-bronze hover:border-bronze/[0.6]"
              >
                <span>{t(`${prefix}.exploreCollection`)}</span>
                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-10 xl:left-20 2xl:left-28 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-8 h-px bg-white/[0.15]" />
            <span className="font-sans text-white/[0.15] text-[9px] tracking-[0.3em] uppercase">{t('scroll')}</span>
          </motion.div>
        </div>

        <motion.div
          className="w-[48%] relative overflow-hidden"
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={config.heroImage}
            alt={t(`${prefix}.heroImageAlt`)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: imageY }}
            fetchpriority="high"
            decoding="sync"
            loading="eager"
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-100"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 79px, rgba(255,255,255,0.03) 79px, rgba(255,255,255,0.03) 80px)',
            }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-[20%] right-[20%] flex items-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex-1 h-px bg-white/[0.06]" />
          <motion.div
            className="w-2 h-2 bg-white/[0.06] mx-3"
            style={{ transform: 'rotate(45deg)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          />
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="relative h-full overflow-hidden lg:hidden flex flex-col">
        <motion.div
          className="relative h-[50%] overflow-hidden"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <img
            src={config.heroImage}
            alt={t(`${prefix}.heroImageAlt`)}
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
            decoding="sync"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </motion.div>

        <div className="flex-1 px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-[clamp(2.5rem,12vw,3.75rem)] font-bold text-white mb-2 tracking-normal leading-[0.88] max-w-full break-words">
              {t(`${prefix}.heroTitle`)}
            </h1>
            <p className="font-display text-lg font-light italic text-white/[0.68] tracking-[-0.02em] mb-4">
              {t(`${prefix}.heroSubtitle`)}
            </p>
            <div className="w-8 h-px bg-bronze/[0.45] mb-4" />
            <p className="text-white/[0.62] text-sm font-sans leading-relaxed font-light mb-6">
              {t(`${prefix}.heroDescription`)}
            </p>
            <button
              onClick={scrollToProducts}
              className="group inline-flex items-center gap-3 border-b border-white/[0.4] pb-1.5 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white transition-colors duration-500 hover:text-bronze hover:border-bronze/[0.6] active:text-bronze"
            >
              <span>{t(`${prefix}.exploreCollection`)}</span>
              <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          <motion.div
            className="flex items-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex-1 h-px bg-white/[0.06]" />
            <div className="w-1.5 h-1.5 bg-white/[0.06] mx-2" style={{ transform: 'rotate(45deg)' }} />
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionPageTemplate({ config }: { config: CollectionPageConfig }) {
  const { t } = useTranslation('collections');
  const { shopifyLanguage } = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const prefix = config.translationPrefix;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const shopifyProducts = await getProductsByCollection(config.collectionId, shopifyLanguage);
        setProducts(shopifyProducts as Product[]);
      } catch {
        setError(t('errorLoading'));
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [shopifyLanguage, config.collectionId, t]);

  const groupedProducts: GroupedProduct[] = useMemo(() => {
    return getGroupedProducts(products);
  }, [products]);

  // ============================================================
  // Preload de TOUTES les images hero produit dès que products
  // arrive — warme le cache Shopify CDN AVANT que les cards entrent
  // dans le viewport. Élimine le shimmer sur 100% des cartes.
  //
  // Les 4 premières sont en fetchPriority=high (LCP), le reste en
  // auto (le navigateur les download en background sans bloquer).
  // ~30-80 KB par image WebP à 800px = budget raisonnable.
  // ============================================================
  useEffect(() => {
    if (groupedProducts.length === 0) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const width = isMobile ? 600 : 800;
    const links: HTMLLinkElement[] = [];
    for (let i = 0; i < groupedProducts.length; i++) {
      const firstVariant = groupedProducts[i].colorVariants[0];
      const firstImage = firstVariant?.product.images.edges[0]?.node.url;
      if (!firstImage) continue;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resizeShopifyImage(firstImage, width);
      link.fetchPriority = i < 4 ? 'high' : 'auto';
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      for (const link of links) link.remove();
    };
  }, [groupedProducts]);

  return (
    <div className="relative bg-beige" data-header-theme="light">
      <SEO
        title={t(`${prefix}.seoTitle`)}
        description={t(`${prefix}.seoDescription`)}
        url={config.seoUrl}
      />
      {config.heroVideo ? (
        <VideoHero
          heroRef={heroRef}
          config={config}
          prefix={prefix}
          imageY={imageY}
        />
      ) : (
        <ImageHero
          heroRef={heroRef}
          config={config}
          prefix={prefix}
          imageY={imageY}
        />
      )}

      <div className="relative z-20 bg-beige" data-products-section>
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 laptop:px-16 pt-10 md:pt-16 pb-16 md:pb-24">
          {loading && (
            <div className="text-center py-32">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-dark-text"></div>
              <p className="font-sans text-dark-text/60 text-sm tracking-wider uppercase mt-6">
                {t('loading')}
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-32">
              <p className="font-sans text-red-600 text-sm tracking-wider uppercase mb-4">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="font-sans text-xs tracking-wider uppercase border border-dark-text px-6 py-3 hover:bg-dark-text hover:text-white transition-colors"
              >
                {t('retry')}
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="flex flex-col gap-6 md:gap-0">
                {groupedProducts.map((groupedProduct, index) => (
                  <React.Fragment key={groupedProduct.modelName}>
                    <GroupedProductCard
                      groupedProduct={groupedProduct}
                      index={index}
                      collectionName={config.collectionName}
                      layout="editorial"
                    />
                    {index < groupedProducts.length - 1 && (
                      <div className="hidden md:block py-8 lg:py-10" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {groupedProducts.length === 0 && (
                <div className="text-center py-32">
                  <p className="font-sans text-dark-text/40 text-sm tracking-wider uppercase">
                    {t('noProducts')}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
