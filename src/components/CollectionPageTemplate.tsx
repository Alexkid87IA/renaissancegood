import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../contexts/LocaleContext';
import { getProductsByCollection } from '../lib/shopify';
import { getGroupedProducts, GroupedProduct } from '../lib/productGrouping';
import { Product } from './ProductCard';
import GroupedProductCard from './GroupedProductCard';
import SEO from './SEO';
import { fade } from './shared';
import { resizeShopifyImage } from '../lib/imageUtils';

interface FilterOption {
  label: string;
  value: string;
}

// ==========================================================================
// FilterPopover — sélecteur desktop avec popover custom (remplace <select>)
// - Aucun backdrop-blur (solid bg-beige)
// - Bronze accent sur l'option active
// - Click-outside + Escape pour fermer
// ==========================================================================
function FilterPopover({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeOption = options.find((o) => o.value === value) ?? options[0];
  const isFiltered = value !== 'all';

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`group flex items-center gap-2.5 px-4 py-2.5 border transition-colors duration-200 ${
          isFiltered
            ? 'border-bronze/60 text-bronze'
            : 'border-dark-text/12 text-dark-text hover:border-dark-text/35'
        }`}
      >
        <span className="font-sans text-[8px] tracking-[0.32em] uppercase text-dark-text/45 font-medium">
          {label}
        </span>
        <span className="font-sans text-[11px] tracking-[0.04em] font-medium">
          {activeOption.label}
        </span>
        <svg
          className={`w-2.5 h-2.5 text-dark-text/40 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          viewBox="0 0 12 7"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-2 min-w-[190px] bg-beige border border-dark-text/12 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)] z-40"
          >
            {/* Filet bronze top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent pointer-events-none" />
            <div className="py-1">
              {options.map((o) => {
                const isActive = o.value === value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-4 px-4 py-2.5 font-sans text-[11px] tracking-[0.04em] transition-colors duration-150 ${
                      isActive
                        ? 'text-bronze'
                        : 'text-dark-text/75 hover:text-bronze hover:bg-white/40'
                    }`}
                  >
                    <span>{o.label}</span>
                    {isActive && (
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 12 10"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 5L4.5 8.5L11 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================================================
// FilterPillGroup — radio pills pour la drawer mobile
// ==========================================================================
function FilterPillGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="font-sans text-[8px] tracking-[0.35em] text-dark-text/40 uppercase font-medium mb-3">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const isActive = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={`px-4 py-2 border font-sans text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${
                isActive
                  ? 'border-bronze bg-bronze text-white'
                  : 'border-dark-text/15 text-dark-text/70 hover:border-bronze hover:text-bronze'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function matchesTag(product: Product, tag: string): boolean {
  return product.tags?.some(t => t.toLowerCase() === tag.toLowerCase()) || false;
}

export interface CollectionPageConfig {
  /** Shopify collection ID (e.g. 'HERITAGE', 'VERSAILLES') */
  collectionId: string;
  /** Display name (e.g. 'Heritage', 'Versailles') */
  collectionName: string;
  /** Translation key prefix (e.g. 'heritage', 'versailles') */
  translationPrefix: string;
  /** Hero image URL */
  heroImage: string;
  /** SEO route path (e.g. '/collections/heritage') */
  seoUrl: string;
  /** Additional shape filter options beyond the defaults */
  extraShapeFilters?: FilterOption[];
}

export default function CollectionPageTemplate({ config }: { config: CollectionPageConfig }) {
  const { t } = useTranslation('collections');
  const { shopifyLanguage } = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const prefix = config.translationPrefix;

  const materials: FilterOption[] = [
    { label: t('filters.all'), value: 'all' },
    { label: t('filters.acetate'), value: 'Acétate' },
    { label: t('filters.metal'), value: 'Métal' },
    { label: t('filters.titanium'), value: 'Titane' }
  ];

  const shapes: FilterOption[] = [
    { label: t('filters.all'), value: 'all' },
    { label: t('filters.round'), value: 'Rond' },
    { label: t('filters.oval'), value: 'Ovale' },
    { label: t('filters.square'), value: 'Carré' },
    ...(config.extraShapeFilters || [])
  ];

  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
  }, [shopifyLanguage, config.collectionId]);

  const groupedProducts: GroupedProduct[] = useMemo(() => {
    let filtered = [...products];
    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(p => matchesTag(p, selectedMaterial));
    }
    if (selectedShape !== 'all') {
      filtered = filtered.filter(p => matchesTag(p, selectedShape));
    }
    return getGroupedProducts(filtered);
  }, [selectedMaterial, selectedShape, products]);

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
    <div className="relative bg-beige">
      <SEO
        title={t(`${prefix}.seoTitle`)}
        description={t(`${prefix}.seoDescription`)}
        url={config.seoUrl}
      />
      <div
        ref={heroRef}
        className="h-screen relative overflow-hidden bg-[#000000]"
      >
        {/* DESKTOP — Géométrique avec clip-path */}
        <div className="relative h-full overflow-hidden hidden lg:flex">
          {/* Zone gauche — Contenu */}
          <div className="w-[50%] relative flex flex-col justify-center pl-10 xl:pl-24 2xl:pl-32 pr-8 xl:pr-12 overflow-hidden">
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
              className="absolute top-10 left-10 xl:left-24 2xl:left-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="font-sans text-white/25 text-[9px] tracking-[0.4em] font-medium uppercase">
                {t(`${prefix}.collectionNumber`)}
              </p>
            </motion.div>

            <motion.div
              ref={contentRef}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
              }}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="font-display text-[4.5rem] xl:text-[7rem] 2xl:text-[9rem] font-bold text-white tracking-[-0.03em] leading-[0.8] mb-4"
              >
                {t(`${prefix}.heroTitle`)}
              </motion.h1>

              <motion.p variants={fade} className="font-display text-lg xl:text-xl 2xl:text-2xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-6 xl:mb-8">
                {t(`${prefix}.heroSubtitle`)}
              </motion.p>

              <motion.div variants={fade} className="w-10 h-px bg-white/10 mb-6 xl:mb-8" />

              <motion.p variants={fade} className="font-sans text-white/25 text-xs xl:text-[13px] 2xl:text-sm leading-[2] font-light max-w-xs mb-8 xl:mb-10">
                {t(`${prefix}.heroDescription`)}
              </motion.p>

              <motion.div variants={fade}>
                <button
                  onClick={() => {
                    const section = document.querySelector('[data-products-section]');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative overflow-hidden border border-white/20 px-10 py-4 transition-all duration-500 hover:border-white"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#000000] transition-colors duration-500">
                    {t(`${prefix}.exploreCollection`)}
                  </span>
                  <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-10 xl:left-24 2xl:left-32 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="w-8 h-px bg-white/15" />
              <span className="font-sans text-white/15 text-[9px] tracking-[0.3em] uppercase">{t('scroll')}</span>
            </motion.div>
          </div>

          {/* Zone droite — Image avec clip-path trapèze */}
          <motion.div
            className="w-[50%] relative overflow-hidden"
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={config.heroImage}
              alt={t(`${prefix}.heroImageAlt`)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: imageY }}
              fetchPriority="high"
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

        {/* MOBILE — Image clip diagonale + contenu bas */}
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
              fetchPriority="high"
              decoding="sync"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute top-24 left-6 font-sans text-white/50 text-[9px] tracking-[0.3em] font-medium uppercase"
            >
              {t(`${prefix}.collectionNumber`)}
            </motion.p>
          </motion.div>

          <div className="flex-1 px-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2 tracking-[-0.03em] leading-[0.85]">
                {t(`${prefix}.heroTitle`)}
              </h1>
              <p className="font-display text-lg font-light italic text-white/50 tracking-[-0.02em] mb-4">
                {t(`${prefix}.heroSubtitle`)}
              </p>
              <div className="w-8 h-px bg-white/10 mb-4" />
              <p className="text-white/30 text-sm font-sans leading-relaxed font-light mb-6">
                {t(`${prefix}.heroDescription`)}
              </p>
              <button
                onClick={() => {
                  const section = document.querySelector('[data-products-section]');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden w-full border border-white/20 px-8 py-4 transition-all duration-500 hover:border-white active:scale-[0.98]"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#000000] transition-colors duration-500">
                  {t(`${prefix}.exploreCollection`)}
                </span>
                <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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

      <div className="relative z-20 bg-beige" data-products-section>
        {/* ============================================================
            Barre de filtres éditoriale — sticky sous le header
            - Solid bg-beige : ZÉRO backdrop-blur (critique pour perf scroll)
            - Single-line layout : [count serif] [filet bronze] [popovers]
            - Top offset aligné sur le header fixe (h-16 / h-20 / h-24)
            - Filet bronze signature en top-border
            ============================================================ */}
        <div className="sticky top-16 md:top-20 lg:top-24 z-30 bg-beige border-b border-dark-text/[0.08]">
          {/* Filet bronze signature */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/15 to-transparent pointer-events-none" />

          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 laptop:px-16">
            <div className="flex items-center justify-between gap-4 py-4 md:py-5">

              {/* LEFT — Compteur éditorial avec large chiffre serif */}
              <div className="flex items-baseline gap-3 md:gap-5 flex-shrink-0">
                <span className="font-display text-[32px] md:text-[40px] font-bold text-dark-text leading-none tabular-nums tracking-[-0.02em]">
                  {String(loading ? 0 : groupedProducts.length).padStart(2, '0')}
                </span>
                <div className="hidden sm:flex flex-col gap-0.5 pt-1">
                  <span className="font-sans text-[8px] tracking-[0.38em] text-bronze uppercase font-medium">
                    {config.collectionName}
                  </span>
                  <span className="font-sans text-[8px] tracking-[0.32em] text-dark-text/40 uppercase">
                    {t('filters.products')}
                  </span>
                </div>
              </div>

              {/* MIDDLE — filet bronze décoratif (desktop) */}
              <div className="hidden lg:flex flex-1 items-center gap-2 mx-4 min-w-0">
                <div className="flex-1 h-px bg-dark-text/[0.08]" />
                <div className="w-1 h-1 bg-bronze/30" style={{ transform: 'rotate(45deg)' }} aria-hidden="true" />
                <div className="flex-1 h-px bg-dark-text/[0.08]" />
              </div>

              {/* RIGHT — Popovers desktop */}
              <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                <FilterPopover
                  label={t('filters.material')}
                  options={materials}
                  value={selectedMaterial}
                  onChange={setSelectedMaterial}
                />
                <FilterPopover
                  label={t('filters.shape')}
                  options={shapes}
                  value={selectedShape}
                  onChange={setSelectedShape}
                />
                {(selectedMaterial !== 'all' || selectedShape !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMaterial('all');
                      setSelectedShape('all');
                    }}
                    className="ml-1 font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text/50 hover:text-bronze transition-colors duration-200 underline underline-offset-[6px] decoration-dark-text/20 hover:decoration-bronze"
                  >
                    {t('filters.reset')}
                  </button>
                )}
              </div>

              {/* RIGHT — Bouton filtres mobile */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden group flex items-center gap-2 px-3.5 py-2 border border-dark-text/15 text-dark-text hover:border-bronze hover:text-bronze transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M10 18h4" />
                </svg>
                <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase">
                  {t('filters.filtersButton')}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            Drawer mobile — bottom sheet avec pills (pas de select natif)
            - Solid bg-beige (pas de backdrop-blur)
            - Pill buttons bronze pour selection
            - CTA apply avec bronze sweep hover signature
            ============================================================ */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-dark-text/50 z-50 md:hidden"
                onClick={() => setShowMobileFilters(false)}
                aria-hidden="true"
              />
              <motion.div
                className="fixed inset-x-0 bottom-0 bg-beige border-t border-dark-text/10 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label={t('filters.title')}
              >
                {/* Filet bronze top */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent pointer-events-none" />

                {/* Grabber indicator */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 bg-dark-text/15 rounded-full" />
                </div>

                <div className="px-6 pt-4 pb-8">
                  <div className="flex items-start justify-between mb-7">
                    <div>
                      <p className="font-sans text-[8px] tracking-[0.4em] text-bronze uppercase font-medium mb-1.5">
                        {config.collectionName}
                      </p>
                      <h3 className="font-display text-[26px] font-bold text-dark-text tracking-[-0.01em] leading-none">
                        {t('filters.title')}
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 -mt-2 -mr-2 text-dark-text/60 hover:text-bronze transition-colors"
                      aria-label="Close"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <FilterPillGroup
                      label={t('filters.material')}
                      options={materials}
                      value={selectedMaterial}
                      onChange={setSelectedMaterial}
                    />
                    <FilterPillGroup
                      label={t('filters.shape')}
                      options={shapes}
                      value={selectedShape}
                      onChange={setSelectedShape}
                    />
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedMaterial('all');
                        setSelectedShape('all');
                      }}
                      className="flex-1 px-6 py-3.5 border border-dark-text/15 font-sans text-[9px] tracking-[0.3em] font-medium text-dark-text/70 uppercase hover:border-bronze hover:text-bronze transition-colors duration-200"
                    >
                      {t('filters.reset')}
                    </button>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="group relative overflow-hidden flex-1 px-6 py-3.5 bg-dark-text text-white"
                    >
                      <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase group-hover:text-white transition-colors duration-500">
                        {t('filters.apply')}
                      </span>
                      <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

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
                      <div className="hidden md:flex items-center gap-4 py-8 lg:py-10">
                        <div className="flex-1 h-px bg-dark-text/6" />
                        <span className="font-sans text-[9px] tracking-[0.4em] text-dark-text/15 uppercase">
                          {String(index + 2).padStart(2, '0')}
                        </span>
                        <div className="flex-1 h-px bg-dark-text/6" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {groupedProducts.length > 0 && (
                <div className="flex flex-col items-center mt-16 md:mt-24">
                  <div className="w-px h-16 md:h-24 bg-gradient-to-b from-bronze/0 via-bronze/30 to-bronze/0" />
                  <p className="font-display text-5xl md:text-6xl font-bold text-dark-text/15 mt-4 leading-none">
                    {String(groupedProducts.length).padStart(2, '0')}
                  </p>
                  <p className="font-sans text-[8px] tracking-[0.4em] text-dark-text/25 uppercase mt-2">
                    {t('filters.products')}
                  </p>
                </div>
              )}

              {groupedProducts.length === 0 && (
                <div className="text-center py-32">
                  <p className="font-sans text-dark-text/40 text-sm tracking-wider uppercase">
                    {t('filters.noResults')}
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
