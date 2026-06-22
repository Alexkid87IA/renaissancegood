import { lazy, Suspense, useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import StoreList from '../components/map/StoreList';
import SearchBar from '../components/map/SearchBar';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { Store } from '../types/store';

// Import des données des opticiens
import opticiansData from '../data/opticians.json';

// Codes pays DOM-TOM
const DOM_TOM_CODES = ['GUA', 'MTQ', 'GUF', 'REU'];

const MapComponent = lazy(() => import('../components/map/MapComponent'));
const MAP_PLACEHOLDER_MARKERS = [
  ['18%', '28%'],
  ['31%', '54%'],
  ['43%', '35%'],
  ['56%', '63%'],
  ['68%', '26%'],
  ['78%', '48%'],
  ['86%', '68%'],
];

function MapLoadingState({ count, loading, onEnable }: { count: number; loading: boolean; onEnable?: () => void }) {
  const { t } = useTranslation('contact');
  return (
    <>
      <div className="relative h-full min-h-[50vh] lg:min-h-0 overflow-hidden bg-[#ece8df]" aria-live="polite">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(rgba(26,26,26,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.055) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_42%,rgba(139,115,85,0.16),transparent_28%),radial-gradient(circle_at_72%_55%,rgba(26,26,26,0.08),transparent_30%)]" />

        {MAP_PLACEHOLDER_MARKERS.map(([left, top], index) => (
          <span
            key={`${left}-${top}`}
            className="absolute h-3 w-3 rounded-full border border-bronze/50 bg-beige shadow-[0_0_0_6px_rgba(139,115,85,0.08)]"
            style={{
              left,
              top,
              animation: `mapMarkerPulse 2.4s ease-in-out ${index * 120}ms infinite`,
            }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-[340px] text-center">
            <div className="mx-auto mb-5 h-10 w-10 rounded-full border border-dark-text/[0.15] flex items-center justify-center">
              {loading ? (
                <span className="h-5 w-5 rounded-full border border-dark-text/20 border-t-dark-text animate-spin" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-bronze" />
              )}
            </div>
            <p className="font-sans text-[9px] tracking-[0.34em] uppercase font-bold text-bronze mb-3">
              {t('map.label')}
            </p>
            <p className="font-display text-3xl font-bold text-dark-text leading-none tracking-normal mb-3 tabular-nums">
              {count}
            </p>
            {onEnable && !loading ? (
              <>
                <p className="font-sans text-xs text-dark-text/50 leading-[1.7] mb-5">
                  {t('map.notice')}
                </p>
                <button
                  type="button"
                  onClick={onEnable}
                  className="inline-flex items-center justify-center rounded-2xl border border-dark-text/40 px-8 py-3.5 font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-dark-text transition-colors duration-300 hover:bg-dark-text hover:text-beige"
                >
                  {t('map.show')}
                </button>
              </>
            ) : (
              <p className="font-sans text-xs text-dark-text/50 leading-[1.7]">
                {loading ? t('map.loading') : t('map.external')}
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mapMarkerPulse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
          50% { transform: translate3d(0, -2px, 0) scale(1.15); opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default function StoreLocatorPage() {
  const { t } = useTranslation('contact');
  const navigate = useLocalizedNavigate();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  // Cliquer pour afficher la carte : Mapbox n'est contacté qu'après action volontaire (RGPD).
  const [mapEnabled, setMapEnabled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });
  const mapRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculer le nombre d'opticiens par pays
  const countryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};

    (opticiansData as Store[]).forEach((store) => {
      const country = store.country;

      // Grouper les DOM-TOM ensemble
      if (DOM_TOM_CODES.includes(country)) {
        counts['DOM-TOM'] = (counts['DOM-TOM'] || 0) + 1;
      } else {
        counts[country] = (counts[country] || 0) + 1;
      }
    });

    return counts;
  }, []);

  // Filtrer les opticiens par pays ET par recherche
  const filteredStores = useMemo(() => {
    let filtered: Store[] = [...(opticiansData as Store[])];

    // Filtre par pays
    if (selectedCountry !== 'ALL') {
      if (selectedCountry === 'DOM-TOM') {
        filtered = filtered.filter((store) => DOM_TOM_CODES.includes(store.country));
      } else {
        filtered = filtered.filter((store) => store.country === selectedCountry);
      }
    }

    // Filtre par recherche texte
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((store) =>
        store.name.toLowerCase().includes(query) ||
        store.city.toLowerCase().includes(query) ||
        store.postalCode.includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCountry]);

  // Plus de chargement auto au scroll : clic explicite, géoloc ou sélection d'un opticien (actions volontaires).
  const shouldLoadMap = mapEnabled || userLocation !== null || selectedStore !== null;

  // Get user's location
  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Geolocation error silently handled
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title={t('storeLocatorPage.seo.title')}
        description={t('storeLocatorPage.seo.description', { count: opticiansData.length })}
        url="/opticiens"
      />

      {/* HERO — Split éditorial */}
      <div className="h-[100dvh] lg:h-screen relative overflow-hidden">
        {/* DESKTOP */}
        <div className="relative h-full overflow-hidden hidden lg:flex">
          {/* Left Panel — Content */}
          <div className="w-[42%] bg-[#000000] relative flex flex-col justify-center px-12 xl:px-20 2xl:px-28">
            {/* Top label */}
            <div className="absolute top-10 left-12 xl:left-20 2xl:left-28">
              <p className="font-sans text-bronze/[0.68] text-[9px] tracking-[0.4em] font-medium uppercase">
                {t('storeLocatorPage.hero.label')}
              </p>
            </div>

            <motion.div
              ref={contentRef}
              variants={stagger}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              <motion.h1 variants={fade} className="font-display text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 tracking-[-0.03em] leading-[0.9]">
                {t('storeLocatorPage.hero.titleLine1')}
                <br />{t('storeLocatorPage.hero.titleLine2')}
              </motion.h1>
              <motion.p variants={fade} className="font-display text-2xl xl:text-3xl font-light italic text-white/[0.68] tracking-[-0.02em] leading-[1] mb-8 xl:mb-10">
                {t('storeLocatorPage.hero.subtitle')}
              </motion.p>

              <motion.p variants={fade} className="mt-8 xl:mt-10 font-sans text-white/[0.62] text-[13px] xl:text-sm leading-[1.9] font-light max-w-md mb-8">
                {t('storeLocatorPage.hero.description')}
              </motion.p>

              {/* Stats inline */}
              <motion.div variants={fade} className="flex items-center gap-6 mb-10 xl:mb-14">
                <div>
                  <p className="font-display text-3xl xl:text-4xl font-bold text-white leading-none">
                    {opticiansData.length}+
                  </p>
                  <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/[0.52] mt-1">
                    {t('storeLocatorPage.hero.opticians')}
                  </p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="font-display text-3xl xl:text-4xl font-bold text-white leading-none">
                    {Object.keys(countryCounts).length}
                  </p>
                  <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/[0.52] mt-1">
                    {t('storeLocatorPage.hero.countries')}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fade}>
                <button
                  onClick={() => {
                    const section = document.querySelector('[data-search-section]');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group/btn relative overflow-hidden inline-flex items-center justify-center rounded-2xl border border-white/[0.55] px-10 py-4 transition-colors duration-500"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white group-hover/btn:text-[#0a0a0a] transition-colors duration-500">
                    {t('storeLocatorPage.hero.cta')}
                  </span>
                </button>
              </motion.div>
            </motion.div>

          </div>

          {/* Right Panel — Image */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="https://renaissance-cdn.b-cdn.net/opticiens-hero.webp"
              alt="Renaissance Eyewear - Opticiens partenaires"
              className="absolute inset-0 w-full h-full object-cover"
              fetchpriority="high"
            />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000000] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000000]/20 to-transparent" />
          </div>
        </div>

        {/* MOBILE */}
        <div className="relative h-full overflow-hidden lg:hidden flex flex-col">
          {/* Image top */}
          <div className="relative h-[50%] overflow-hidden">
            <img
              src="https://renaissance-cdn.b-cdn.net/opticiens-hero.webp"
              alt="Renaissance Eyewear - Opticiens partenaires"
              className="w-full h-full object-cover object-center"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-[#000000]" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-24 left-6"
            >
              <p className="text-white/50 text-[9px] tracking-[0.3em] uppercase font-sans font-medium">
                {t('storeLocatorPage.hero.label')}
              </p>
            </motion.div>
          </div>

          {/* Content bottom */}
          <div className="flex-1 bg-[#000000] px-6 flex flex-col justify-center items-center text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2 tracking-[-0.03em] leading-[0.9]">
                {t('storeLocatorPage.hero.titleLine1')}
                <br />{t('storeLocatorPage.hero.titleLine2')}
              </h1>
              <p className="font-display text-lg sm:text-xl font-light italic text-white/[0.68] tracking-[-0.02em] mb-6">
                {t('storeLocatorPage.hero.subtitle')}
              </p>

              {/* Stats mobile */}
              <div className="flex items-center justify-center gap-5 mb-6">
                <div>
                  <p className="font-display text-2xl font-bold text-white leading-none">{opticiansData.length}+</p>
                  <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-white/[0.52] mt-1">{t('storeLocatorPage.hero.opticians')}</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="font-display text-2xl font-bold text-white leading-none">{Object.keys(countryCounts).length}</p>
                  <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-white/[0.52] mt-1">{t('storeLocatorPage.hero.countries')}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  const section = document.querySelector('[data-search-section]');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-9 py-3.5 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white active:bg-white active:text-[#0a0a0a] transition-colors duration-300"
              >
                {t('storeLocatorPage.hero.cta')}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR SECTION */}
      <section className="bg-beige relative border-b border-dark-text/[0.06]" data-search-section>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10">
            <div className="hidden lg:flex items-center gap-6 shrink-0">
              <h2 className="font-display text-lg font-bold text-dark-text tracking-[-0.02em]">
                {t('storeLocatorPage.search.title')}
              </h2>
              <div className="w-px h-5 bg-dark-text/10" />
              <p className="font-sans text-dark-text/[0.35] text-[11px] leading-[1.7] font-light">
                {filteredStores.length > 1
                  ? t('storeLocatorPage.search.resultsCountPlural', { count: filteredStores.length, countries: Object.keys(countryCounts).length })
                  : t('storeLocatorPage.search.resultsCount', { count: filteredStores.length, countries: Object.keys(countryCounts).length })
                }
              </p>
            </div>
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onGetLocation={getUserLocation}
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                countryCounts={countryCounts}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAP + LIST SECTION */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-start">
          {/* Map */}
          <div ref={mapRef} className="w-full lg:w-[65%] h-[50vh] lg:h-[calc(100vh-6rem)] lg:sticky lg:top-24">
            {shouldLoadMap ? (
              <Suspense fallback={<MapLoadingState count={filteredStores.length} loading />}>
                <MapComponent
                  stores={filteredStores}
                  selectedStore={selectedStore}
                  onSelectStore={setSelectedStore}
                  userLocation={userLocation}
                />
              </Suspense>
            ) : (
              <MapLoadingState count={filteredStores.length} loading={false} onEnable={() => setMapEnabled(true)} />
            )}
          </div>

          {/* Store List */}
          <div className="w-full lg:w-[35%] bg-white border-l border-dark-text/10">
            <StoreList
              stores={filteredStores}
              selectedStore={selectedStore}
              onSelectStore={setSelectedStore}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 sm:py-32 md:py-40 px-6 md:px-12 border-t border-dark-text/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            ref={ctaRef}
            variants={stagger}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              {t('storeLocatorPage.cta.label')}
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-3">
              {t('storeLocatorPage.cta.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-xl sm:text-2xl font-light italic text-dark-text/40 tracking-[-0.02em] mb-8">
              {t('storeLocatorPage.cta.subtitle')}
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-dark-text/[0.15] mx-auto mb-8" />

            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 sm:mb-12">
              {t('storeLocatorPage.cta.description')}
            </motion.p>

            <motion.div variants={fade}>
              <button
                onClick={() => navigate('/contact')}
                className="group relative overflow-hidden border border-dark-text px-10 py-4 transition-all duration-500"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                  {t('storeLocatorPage.cta.button')}
                </span>
                <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
