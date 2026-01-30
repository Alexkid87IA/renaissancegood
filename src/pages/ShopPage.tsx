// ========================================
// PAGE EXPLORER
// Parcourir toutes les créations Renaissance
// ========================================

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useLocale } from '../contexts/LocaleContext';
import { getProducts } from '../lib/shopify';
import { getGroupedProducts, getModelName, GroupedProduct } from '../lib/productGrouping';
import GroupedProductCard from '../components/GroupedProductCard';
import { Product } from '../components/ProductCard';
import SEO from '../components/SEO';

const KNOWN_COLLECTIONS = ['heritage', 'versailles', 'isis'];

type UniversTab = 'tout' | 'heritage' | 'versailles' | 'isis' | 'hors-serie';

function belongsToCollection(product: Product, handle: string): boolean {
  return product.collections?.edges?.some(
    edge => edge.node.handle.toLowerCase() === handle
  ) || false;
}

function isHorsSerie(product: Product): boolean {
  if (!product.collections?.edges) return true;
  return !product.collections.edges.some(
    edge => KNOWN_COLLECTIONS.includes(edge.node.handle.toLowerCase())
  );
}

function matchesTag(product: Product, tag: string): boolean {
  return product.tags?.some(t => t.toLowerCase() === tag.toLowerCase()) || false;
}

export default function ShopPage() {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation('shop');
  const { shopifyLanguage } = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<UniversTab>('tout');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await getProducts(shopifyLanguage);
        if (!cancelled) setProducts(data as Product[]);
      } catch {
        if (!cancelled) setError('Une erreur est survenue');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [shopifyLanguage]); // ← t retiré : sa référence change au chargement du namespace et relançait l'effet

  // Single-pass tab counts — avoid calling getGroupedProducts 5 times
  const tabCounts = useMemo(() => {
    const buckets: Record<UniversTab, Set<string>> = {
      tout: new Set(),
      heritage: new Set(),
      versailles: new Set(),
      isis: new Set(),
      'hors-serie': new Set(),
    };

    for (const p of products) {
      const model = getModelName(p.title);
      buckets.tout.add(model);

      let inKnown = false;
      if (belongsToCollection(p, 'heritage')) { buckets.heritage.add(model); inKnown = true; }
      if (belongsToCollection(p, 'versailles')) { buckets.versailles.add(model); inKnown = true; }
      if (belongsToCollection(p, 'isis')) { buckets.isis.add(model); inKnown = true; }
      if (!inKnown) buckets['hors-serie'].add(model);
    }

    return {
      tout: buckets.tout.size,
      heritage: buckets.heritage.size,
      versailles: buckets.versailles.size,
      isis: buckets.isis.size,
      'hors-serie': buckets['hors-serie'].size,
    };
  }, [products]);

  const groupedProducts: GroupedProduct[] = useMemo(() => {
    let filtered = products;

    if (activeTab === 'heritage') filtered = filtered.filter(p => belongsToCollection(p, 'heritage'));
    else if (activeTab === 'versailles') filtered = filtered.filter(p => belongsToCollection(p, 'versailles'));
    else if (activeTab === 'isis') filtered = filtered.filter(p => belongsToCollection(p, 'isis'));
    else if (activeTab === 'hors-serie') filtered = filtered.filter(p => isHorsSerie(p));

    if (selectedMaterial !== 'all') filtered = filtered.filter(p => matchesTag(p, selectedMaterial));
    if (selectedShape !== 'all') filtered = filtered.filter(p => matchesTag(p, selectedShape));

    return getGroupedProducts(filtered);
  }, [products, activeTab, selectedMaterial, selectedShape]);

  const tabs: { key: UniversTab; label: string }[] = [
    { key: 'tout', label: t('filterAll') },
    { key: 'heritage', label: t('tabHeritage') },
    { key: 'versailles', label: t('tabVersailles') },
    { key: 'isis', label: 'Isis' },
    { key: 'hors-serie', label: t('horsSerie') },
  ];

  const materials = [
    { label: t('filterAll'), value: 'all' },
    { label: t('acetate'), value: 'Acétate' },
    { label: t('metal'), value: 'Métal' },
    { label: t('titanium'), value: 'Titane' },
  ];

  const shapes = [
    { label: t('filterAll'), value: 'all' },
    { label: t('round'), value: 'Rond' },
    { label: t('square'), value: 'Carré' },
    { label: t('oval'), value: 'Ovale' },
  ];

  const hasActiveFilters = selectedMaterial !== 'all' || selectedShape !== 'all';

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-8 h-8 border border-dark-text/15 border-t-dark-text/60 rounded-full animate-spin mx-auto mb-6" />
          <p className="font-sans text-[9px] tracking-[0.3em] text-dark-text/40 uppercase font-medium">
            {t('loading', { ns: 'common' })}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center pt-20">
        <div className="text-center max-w-md px-8">
          <p className="font-sans text-dark-text/60 text-sm tracking-wider mb-8">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="group relative inline-flex overflow-hidden border border-dark-text px-8 py-3"
          >
            <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text group-hover:text-white transition-colors duration-500">
              {t('retry', { ns: 'common' })}
            </span>
            <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title="Explorer - Toutes nos lunettes"
        description="Explorez toute la collection RENAISSANCE Paris. Lunettes de vue et solaires de luxe, fabriquées artisanalement en France."
        url="/shop"
      />

      {/* ─── HERO ─── */}
      <div className="h-screen relative">
        {/* Desktop */}
        <div className="relative h-full overflow-hidden hidden lg:block">
          <img
            src="https://renaissance-cdn.b-cdn.net/Generated%20Image%20January%2029%2C%202026%20-%205_06AM.jpeg"
            alt="Renaissance Paris - Explorer"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="absolute left-8 bottom-8 max-w-xl" style={{ filter: 'drop-shadow(0 2px 20px rgba(0,0,0,0.8)) drop-shadow(0 4px 40px rgba(0,0,0,0.5))' }}>
            <p className="text-white text-xs tracking-[0.2em] uppercase font-sans mb-2">{t('heroLabel')}</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-[-0.03em] leading-[0.95]">
              {t('heroTitle')}<br />
              <span className="font-light italic">{t('heroSubtitle')}</span>
            </h1>
            <p className="text-white text-sm mb-6 leading-relaxed">{t('heroDescription')}</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase text-dark-text font-bold hover:bg-white/90 transition-colors"
              >
                {t('heroExplore')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/store-locator')}
                className="border-2 border-white px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-white hover:text-dark-text transition-colors"
              >
                {t('heroFindOptician')}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="relative h-full overflow-hidden lg:hidden">
          <div className="absolute inset-0">
            <motion.img
              src="https://renaissance-cdn.b-cdn.net/Generated%20Image%20January%2029%2C%202026%20-%205_06AM.jpeg"
              alt="Renaissance Paris - Explorer"
              className="w-full h-full object-cover object-[center_30%]"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#000000]/70 to-transparent" />
          </div>
          <div className="relative h-full flex flex-col justify-end px-7 pb-14">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="mb-5">
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="font-sans text-white/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-4">
                {t('heroLabel')}
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1 }} className="font-display text-[2.6rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88] mb-2">
                {t('heroTitle')}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.15 }} className="font-display text-[2.6rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88]">
                {t('heroSubtitle')}
              </motion.p>
            </motion.div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1.4 }} className="w-10 h-px bg-white/25 origin-left mb-5" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.6 }} className="flex items-center gap-5">
              <button type="button" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="font-display text-[13px] italic text-white/70 tracking-[-0.01em] active:text-white transition-colors duration-300">
                {t('heroExplore')}
              </button>
              <span className="w-px h-3 bg-white/15" />
              <button type="button" onClick={() => navigate('/store-locator')} className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/35 font-medium active:text-white/60 transition-colors duration-300">
                {t('heroOpticians')}
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.2 }} className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-1.5">
                <span className="w-px h-5 bg-gradient-to-b from-transparent to-white/30" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── BARRE FILTRES STICKY ─── */}
      <div id="products" className="sticky top-16 sm:top-20 z-30 bg-beige border-b border-dark-text/[0.06]">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 laptop:px-16">

          {/* Desktop */}
          <div className="hidden md:flex items-center h-12">
            <nav className="flex items-center">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-4 h-12 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                    activeTab === tab.key
                      ? 'text-dark-text font-medium'
                      : 'text-dark-text/30 hover:text-dark-text/55'
                  }`}
                >
                  {tab.label}
                  {tabCounts[tab.key] > 0 && (
                    <span className={`ml-1.5 text-[8px] tabular-nums ${activeTab === tab.key ? 'text-dark-text/35' : 'text-dark-text/15'}`}>
                      {tabCounts[tab.key]}
                    </span>
                  )}
                  <span className={`absolute bottom-0 left-4 right-4 h-[1.5px] bg-dark-text transition-transform duration-200 origin-left ${
                    activeTab === tab.key ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </button>
              ))}
            </nav>

            <span className="w-px h-4 bg-dark-text/8 mx-4 shrink-0" />

            <div className="flex items-center">
              <span className="font-sans text-[7px] tracking-[0.35em] uppercase text-dark-text/20 font-medium mr-2">{t('material')}</span>
              {materials.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  onClick={() => setSelectedMaterial(m.value)}
                  className={`px-2.5 py-1 font-sans text-[10px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                    selectedMaterial === m.value ? 'text-dark-text font-medium' : 'text-dark-text/25 hover:text-dark-text/50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <span className="w-px h-4 bg-dark-text/8 mx-3 shrink-0" />

            <div className="flex items-center">
              <span className="font-sans text-[7px] tracking-[0.35em] uppercase text-dark-text/20 font-medium mr-2">{t('shape')}</span>
              {shapes.map((s) => (
                <button
                  type="button"
                  key={s.value}
                  onClick={() => setSelectedShape(s.value)}
                  className={`px-2.5 py-1 font-sans text-[10px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                    selectedShape === s.value ? 'text-dark-text font-medium' : 'text-dark-text/25 hover:text-dark-text/50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <span className="ml-auto font-sans text-[9px] text-dark-text/20 tracking-[0.15em] uppercase tabular-nums shrink-0">
              {groupedProducts.length} {t('models', { count: groupedProducts.length })}
            </span>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <div className="flex items-center py-2 overflow-x-auto scrollbar-hide -mx-4 px-4 gap-0.5">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative whitespace-nowrap px-3 py-2 font-sans text-[10px] tracking-[0.15em] uppercase shrink-0 transition-colors duration-200 ${
                    activeTab === tab.key ? 'text-dark-text font-medium' : 'text-dark-text/30'
                  }`}
                >
                  {tab.label}
                  <span className={`absolute bottom-0 left-3 right-3 h-[1.5px] bg-dark-text transition-transform duration-200 origin-left ${
                    activeTab === tab.key ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className={`ml-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 border transition-colors duration-200 ${
                  hasActiveFilters || mobileFiltersOpen ? 'border-dark-text/25 text-dark-text' : 'border-dark-text/8 text-dark-text/35'
                }`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-sans text-[9px] tracking-[0.15em] uppercase font-medium">Filtres</span>
                {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-bronze" />}
              </button>
            </div>

            {mobileFiltersOpen && (
              <div className="border-t border-dark-text/[0.04] py-4 space-y-4">
                <div>
                  <p className="font-sans text-[7px] tracking-[0.35em] uppercase text-dark-text/20 font-medium mb-2">{t('material')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {materials.map((m) => (
                      <button
                        type="button"
                        key={m.value}
                        onClick={() => setSelectedMaterial(m.value)}
                        className={`px-3 py-1.5 border font-sans text-[10px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                          selectedMaterial === m.value ? 'border-dark-text/25 text-dark-text font-medium' : 'border-dark-text/6 text-dark-text/25'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-sans text-[7px] tracking-[0.35em] uppercase text-dark-text/20 font-medium mb-2">{t('shape')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {shapes.map((s) => (
                      <button
                        type="button"
                        key={s.value}
                        onClick={() => setSelectedShape(s.value)}
                        className={`px-3 py-1.5 border font-sans text-[10px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                          selectedShape === s.value ? 'border-dark-text/25 text-dark-text font-medium' : 'border-dark-text/6 text-dark-text/25'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => { setSelectedMaterial('all'); setSelectedShape('all'); }}
                    className="font-sans text-[9px] tracking-[0.15em] uppercase text-dark-text/35 underline underline-offset-4 decoration-dark-text/10"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── GRILLE PRODUITS ─── */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 laptop:px-16 pt-10 md:pt-14 pb-16 md:pb-24">
        {groupedProducts.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-12 h-px bg-dark-text/8 mx-auto mb-8" />
            <p className="font-display text-2xl font-light text-dark-text/35 mb-3">{t('noProducts')}</p>
            <p className="font-sans text-[11px] tracking-[0.12em] text-dark-text/20 mb-8">{t('adjustFilters')}</p>
            <button
              type="button"
              onClick={() => { setActiveTab('tout'); setSelectedMaterial('all'); setSelectedShape('all'); }}
              className="font-sans text-[9px] tracking-[0.15em] uppercase text-dark-text/35 underline underline-offset-4 decoration-dark-text/10 hover:text-dark-text/55 transition-colors"
            >
              Voir tout
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8 lg:gap-y-14">
            {groupedProducts.map((groupedProduct, index) => (
              <GroupedProductCard
                key={groupedProduct.modelName}
                groupedProduct={groupedProduct}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* ─── CTA FINALE ─── */}
      <section className="py-20 md:py-28 px-8 border-t border-dark-text/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-dark-text/20 font-medium mb-6">Renaissance Paris</p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-dark-text tracking-[-0.02em] leading-[0.95] mb-3">
              {t('customTitle')}
            </h2>
            <div className="w-10 h-px bg-dark-text/10 mx-auto my-6" />
            <p className="font-sans text-[13px] text-dark-text/40 mb-10 leading-[1.8] font-light max-w-lg mx-auto">
              {t('customDescription')}
            </p>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="group relative inline-flex overflow-hidden border border-dark-text px-10 py-4"
            >
              <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text group-hover:text-white transition-colors duration-500 font-medium">
                {t('customCta')}
              </span>
              <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
