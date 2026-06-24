import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../contexts/LocaleContext';
import { getProducts } from '../lib/shopify';
import { getGroupedProductsForCollection, GroupedProduct } from '../lib/productGrouping';
import type { CollectionId } from '../data/productEditorial';
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
  // Variantes mobiles : le hero mobile est une bande horizontale, donc on peut
  // y servir une vidéo/poster au format paysage même si le desktop est en portrait.
  // Absents => on retombe sur heroVideo / heroPoster.
  heroVideoMobile?: string;
  heroPosterMobile?: string;
}

interface HeroProps {
  heroRef: React.Ref<HTMLDivElement>;
  config: CollectionPageConfig;
  prefix: string;
}

function VideoHero({ heroRef, config, prefix }: HeroProps) {
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

      {/* ── DESKTOP — Vidéo plein écran + overlay + texte en surimpression ── */}
      <div className="relative h-full overflow-hidden hidden lg:block">
        <video
          ref={videoRef}
          src={config.heroVideo}
          poster={config.heroPoster || config.heroImage}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#000000]/60 to-transparent" />

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
          }}
          initial="hidden"
          animate="visible"
          className="absolute left-8 xl:left-12 bottom-10 xl:bottom-12 max-w-xl"
          style={{ filter: 'drop-shadow(0 2px 20px rgba(0,0,0,0.8)) drop-shadow(0 4px 40px rgba(0,0,0,0.5))' }}
        >
          <motion.p variants={fade} className="font-sans text-white text-xs tracking-[0.2em] uppercase mb-2">
            {t(`${prefix}.heroLabel`)}
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-[-0.03em] leading-[0.95]"
          >
            {t(`${prefix}.heroTitle`)}<br />
            <span className="font-light italic">{t(`${prefix}.heroSubtitle`)}</span>
          </motion.h1>

          <motion.p variants={fade} className="font-sans text-white text-sm mb-6 leading-relaxed max-w-md">
            {t(`${prefix}.heroDescription`)}
          </motion.p>

          <motion.div variants={fade}>
            <button
              onClick={scrollToProducts}
              className="group relative overflow-hidden inline-flex items-center justify-center rounded-2xl border border-white/[0.55] px-9 py-4 transition-colors duration-500"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-white group-hover:text-[#0a0a0a] transition-colors duration-500">{t(`${prefix}.exploreCollection`)}</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── MOBILE — Vidéo plein cadre + overlay bas + texte centré ── */}
      <div className="relative h-full overflow-hidden lg:hidden">
        <video
          src={config.heroVideoMobile || config.heroVideo}
          poster={config.heroPosterMobile || config.heroPoster || config.heroImage}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

        <div className="relative h-full flex flex-col items-center text-center justify-end px-6 pb-12">
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
            <p className="text-white/[0.62] text-sm font-sans leading-relaxed font-light mb-6">
              {t(`${prefix}.heroDescription`)}
            </p>
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-7 py-3 font-sans text-[9px] tracking-[0.24em] font-medium uppercase text-white active:bg-white active:text-[#0a0a0a] transition-colors duration-300"
            >
              <span>{t(`${prefix}.exploreCollection`)}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ImageHero({ heroRef, config, prefix }: HeroProps) {
  const { t } = useTranslation('collections');

  const scrollToProducts = useCallback(() => {
    document.querySelector('[data-products-section]')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={heroRef} className="h-screen relative overflow-hidden bg-[#000000]" data-header-theme="dark">
      {/* DESKTOP — Image plein écran + overlay + texte */}
      <div className="relative h-full overflow-hidden hidden lg:block">
        <img
          src={config.heroImage}
          alt={t(`${prefix}.heroImageAlt`)}
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
          decoding="sync"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#000000]/60 to-transparent" />

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
          }}
          initial="hidden"
          animate="visible"
          className="absolute left-8 xl:left-12 bottom-10 xl:bottom-12 max-w-xl"
          style={{ filter: 'drop-shadow(0 2px 20px rgba(0,0,0,0.8)) drop-shadow(0 4px 40px rgba(0,0,0,0.5))' }}
        >
          <motion.p variants={fade} className="font-sans text-white text-xs tracking-[0.2em] uppercase mb-2">
            {t(`${prefix}.heroLabel`)}
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-[-0.03em] leading-[0.95]"
          >
            {t(`${prefix}.heroTitle`)}<br />
            <span className="font-light italic">{t(`${prefix}.heroSubtitle`)}</span>
          </motion.h1>

          <motion.p variants={fade} className="font-sans text-white text-sm mb-6 leading-relaxed max-w-md">
            {t(`${prefix}.heroDescription`)}
          </motion.p>

          <motion.div variants={fade}>
            <button
              onClick={scrollToProducts}
              className="group relative overflow-hidden inline-flex items-center justify-center rounded-2xl border border-white/[0.55] px-9 py-4 transition-colors duration-500"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-white group-hover:text-[#0a0a0a] transition-colors duration-500">{t(`${prefix}.exploreCollection`)}</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* MOBILE — Image plein cadre + overlay bas + texte centré */}
      <div className="relative h-full overflow-hidden lg:hidden">
        <img
          src={config.heroImage}
          alt={t(`${prefix}.heroImageAlt`)}
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchpriority="high"
          decoding="sync"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

        <div className="relative h-full flex flex-col items-center text-center justify-end px-6 pb-12">
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
            <p className="text-white/[0.62] text-sm font-sans leading-relaxed font-light mb-6">
              {t(`${prefix}.heroDescription`)}
            </p>
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-7 py-3 font-sans text-[9px] tracking-[0.24em] font-medium uppercase text-white active:bg-white active:text-[#0a0a0a] transition-colors duration-300"
            >
              <span>{t(`${prefix}.exploreCollection`)}</span>
            </button>
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

  const prefix = config.translationPrefix;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const shopifyProducts = await getProducts(shopifyLanguage);
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
    return getGroupedProductsForCollection(products, config.translationPrefix as CollectionId);
  }, [products, config.translationPrefix]);

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
        />
      ) : (
        <ImageHero
          heroRef={heroRef}
          config={config}
          prefix={prefix}
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
