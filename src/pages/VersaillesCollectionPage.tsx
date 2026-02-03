import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../contexts/LocaleContext';
import { getProductsByCollection } from '../lib/shopify';
import { getGroupedProducts, GroupedProduct } from '../lib/productGrouping';
import { Product } from '../components/ProductCard';
import GroupedProductCard from '../components/GroupedProductCard';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';

interface FilterOption {
  label: string;
  value: string;
}

function FilterSelect({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label className="font-sans text-[8px] tracking-[0.25em] font-bold text-dark-text uppercase mb-1.5 md:mb-2 block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b-2 border-dark-text/20 pb-1.5 md:pb-2 font-sans text-xs text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-0 bottom-2 sm:bottom-3 pointer-events-none">
          <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="sm:w-[10px] sm:h-[6px]">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function matchesTag(product: Product, tag: string): boolean {
  return product.tags?.some(t => t.toLowerCase() === tag.toLowerCase()) || false;
}

export default function VersaillesCollectionPage() {
  const { t } = useTranslation('collections');
  const { shopifyLanguage } = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const filtersRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

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
    { label: t('filters.hexagonal'), value: 'Hexagonal' }
  ];

  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hideFilters, setHideFilters] = useState(false);
  const lastScrollYRef = useRef(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Charger les produits depuis Shopify au montage du composant
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const shopifyProducts = await getProductsByCollection('VERSAILLES', shopifyLanguage);
        setProducts(shopifyProducts as Product[]);
      } catch (err) {
        setError(t('errorLoading'));
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [shopifyLanguage]);

  // Gérer le masquage des filtres au scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth >= 768) {
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 200) {
          setHideFilters(true);
        } else if (currentScrollY < lastScrollYRef.current) {
          setHideFilters(false);
        }
      } else {
        setHideFilters(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtrer et regrouper les produits par modèle
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

  return (
    <div className="relative bg-beige">
      <SEO
        title={t('versailles.seoTitle')}
        description={t('versailles.seoDescription')}
        url="/collections/versailles"
      />
      <div
        ref={heroRef}
        className="h-screen relative overflow-hidden bg-[#000000]"
      >
        {/* DESKTOP — Géométrique avec clip-path (même layout qu'Isis) */}
        <div className="relative h-full overflow-hidden hidden lg:flex">

          {/* Zone gauche — Contenu */}
          <div className="w-[50%] relative flex flex-col justify-center pl-10 xl:pl-24 2xl:pl-32 pr-8 xl:pr-12 overflow-hidden">

            {/* Ligne diagonale décorative derrière le texte */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ transformOrigin: 'center' }}
            >
              <div className="w-[140%] h-px bg-white/[0.04] rotate-[20deg]" />
            </motion.div>

            {/* Collection number — top */}
            <motion.div
              className="absolute top-10 left-10 xl:left-24 2xl:left-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-sans text-white/25 text-[9px] tracking-[0.4em] font-medium uppercase">
                {t('versailles.collectionNumber')}
              </p>
            </motion.div>

            {/* Contenu texte */}
            <motion.div
              ref={contentRef}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
              }}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="font-display text-[4.5rem] xl:text-[7rem] 2xl:text-[9rem] font-bold text-white tracking-[-0.03em] leading-[0.8] mb-4"
              >
                {t('versailles.heroTitle')}
              </motion.h1>

              <motion.p variants={fade} className="font-display text-lg xl:text-xl 2xl:text-2xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-6 xl:mb-8">
                {t('versailles.heroSubtitle')}
              </motion.p>

              <motion.div variants={fade} className="w-10 h-px bg-white/10 mb-6 xl:mb-8" />

              <motion.p variants={fade} className="font-sans text-white/25 text-xs xl:text-[13px] 2xl:text-sm leading-[2] font-light max-w-xs mb-8 xl:mb-10">
                {t('versailles.heroDescription')}
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
                    {t('versailles.exploreCollection')}
                  </span>
                  <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </motion.div>
            </motion.div>

            {/* Scroll indicator — bottom left */}
            <motion.div
              className="absolute bottom-10 left-10 xl:left-24 2xl:left-32 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
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
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="https://renaissance-cdn.b-cdn.net/campgane.png"
              alt={t('versailles.heroImageAlt')}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: imageY }}
              fetchpriority="high"
            />
            {/* Grille géométrique overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 79px, rgba(255,255,255,0.03) 79px, rgba(255,255,255,0.03) 80px)',
              }}
            />
          </motion.div>

          {/* Ligne décorative bas — losange central */}
          <motion.div
            className="absolute bottom-20 left-[20%] right-[20%] flex items-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex-1 h-px bg-white/[0.06]" />
            <motion.div
              className="w-2 h-2 bg-white/[0.06] mx-3"
              style={{ transform: 'rotate(45deg)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
            />
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
        </div>

        {/* MOBILE — Image clip diagonale + contenu bas */}
        <div className="relative h-full overflow-hidden lg:hidden flex flex-col">

          {/* Image haute avec clip diagonal bas */}
          <motion.div
            className="relative h-[50%] overflow-hidden"
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <img
              src="https://renaissance-cdn.b-cdn.net/campgane.png"
              alt={t('versailles.heroImageAlt')}
              className="w-full h-full object-cover object-center"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

            {/* Collection number */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-24 left-6 font-sans text-white/50 text-[9px] tracking-[0.3em] font-medium uppercase"
            >
              {t('versailles.collectionNumber')}
            </motion.p>
          </motion.div>

          {/* Contenu bas */}
          <div className="flex-1 px-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2 tracking-[-0.03em] leading-[0.85]">
                {t('versailles.heroTitle')}
              </h1>
              <p className="font-display text-lg font-light italic text-white/50 tracking-[-0.02em] mb-4">
                {t('versailles.heroSubtitle')}
              </p>
              <div className="w-8 h-px bg-white/10 mb-4" />
              <p className="text-white/30 text-sm font-sans leading-relaxed font-light mb-6">
                {t('versailles.heroDescription')}
              </p>
              <button
                onClick={() => {
                  const section = document.querySelector('[data-products-section]');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden w-full border border-white/20 px-8 py-4 transition-all duration-500 hover:border-white active:scale-[0.98]"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#000000] transition-colors duration-500">
                  {t('versailles.exploreCollection')}
                </span>
                <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </motion.div>

            {/* Losange décoratif */}
            <motion.div
              className="flex items-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex-1 h-px bg-white/[0.06]" />
              <div className="w-1.5 h-1.5 bg-white/[0.06] mx-2" style={{ transform: 'rotate(45deg)' }} />
              <div className="flex-1 h-px bg-white/[0.06]" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-beige" data-products-section>
        {/* Barre de filtres — fond transparent sur beige */}
        <div className="border-b border-dark-text/8">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 laptop:px-16">
            <div className="py-3 md:py-6">
              <div className="flex items-center justify-between">
                {/* Header éditorial */}
                <div className="flex items-center gap-4">
                  <span className="font-sans text-[10px] tracking-[0.4em] text-bronze font-medium uppercase">
                    {String(loading ? 0 : groupedProducts.length).padStart(2, '0')}
                  </span>
                  <div className="w-8 h-px bg-dark-text/15 hidden sm:block" />
                  <p className="font-sans text-[8px] tracking-[0.3em] font-bold text-dark-text/50 uppercase hidden sm:block">
                    {t('filters.products')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="md:hidden">
                    <p className="font-sans text-[8px] tracking-[0.25em] font-bold text-dark-text/50 uppercase">
                      Versailles
                    </p>
                  </div>
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="md:hidden flex items-center gap-2 px-4 py-2 border border-dark-text/15 text-dark-text"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 4h18M3 12h18M3 20h18" />
                    </svg>
                    <span className="font-sans text-[10px] tracking-[0.2em] font-bold">{t('filters.filtersButton')}</span>
                  </button>
                </div>
              </div>

              <div className="hidden md:grid md:grid-cols-4 gap-4 mt-5">
                <div className="hidden md:block">
                  <FilterSelect
                    label={t('filters.collection')}
                    options={[{ label: 'Versailles', value: 'versailles' }]}
                    value="versailles"
                    onChange={() => {}}
                  />
                </div>

                <FilterSelect
                  label={t('filters.material')}
                  options={materials}
                  value={selectedMaterial}
                  onChange={setSelectedMaterial}
                />

                <FilterSelect
                  label={t('filters.shape')}
                  options={shapes}
                  value={selectedShape}
                  onChange={setSelectedShape}
                />

                <div className="col-span-2 md:col-span-1">
                  <FilterSelect
                    label={t('filters.lens')}
                    options={[{ label: t('filters.all'), value: 'all' }]}
                    value="all"
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {showMobileFilters && (
          <>
            <div
              className="fixed inset-0 bg-dark-text/50 z-50 md:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 bg-white z-50 md:hidden rounded-t-2xl shadow-2xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-sans text-sm tracking-[0.2em] font-bold text-dark-text uppercase">
                    {t('filters.title')}
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <FilterSelect
                    label={t('filters.material')}
                    options={materials}
                    value={selectedMaterial}
                    onChange={setSelectedMaterial}
                  />

                  <FilterSelect
                    label={t('filters.shape')}
                    options={shapes}
                    value={selectedShape}
                    onChange={setSelectedShape}
                  />

                  <FilterSelect
                    label={t('filters.lens')}
                    options={[{ label: t('filters.all'), value: 'all' }]}
                    value="all"
                    onChange={() => {}}
                  />
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedMaterial('all');
                      setSelectedShape('all');
                    }}
                    className="flex-1 px-6 py-3 border-2 border-dark-text/20 font-sans text-xs tracking-[0.2em] font-bold text-dark-text uppercase"
                  >
                    {t('filters.reset')}
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 px-6 py-3 bg-dark-text text-white font-sans text-xs tracking-[0.2em] font-bold uppercase"
                  >
                    {t('filters.apply')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}

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
                      collectionName="Versailles"
                      layout="editorial"
                    />
                    {/* Séparateur entre chaque produit (sauf le dernier) */}
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

              {/* Closer éditorial */}
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
