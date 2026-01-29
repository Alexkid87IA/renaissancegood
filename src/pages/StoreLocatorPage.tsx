import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MapComponent from '../components/map/MapComponent';
import StoreList from '../components/map/StoreList';
import SearchBar from '../components/map/SearchBar';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';

// Import des données des opticiens
import opticiansData from '../data/opticians.json';

// Codes pays DOM-TOM
const DOM_TOM_CODES = ['GUA', 'MTQ', 'GUF', 'REU'];

export default function StoreLocatorPage() {
  const [selectedStore, setSelectedStore] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculer le nombre d'opticiens par pays
  const countryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};

    opticiansData.forEach((store: any) => {
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
    let filtered = [...opticiansData] as any[];

    // Filtre par pays
    if (selectedCountry !== 'ALL') {
      if (selectedCountry === 'DOM-TOM') {
        filtered = filtered.filter((store: any) => DOM_TOM_CODES.includes(store.country));
      } else {
        filtered = filtered.filter((store: any) => store.country === selectedCountry);
      }
    }

    // Filtre par recherche texte
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((store: any) =>
        store.name.toLowerCase().includes(query) ||
        store.city.toLowerCase().includes(query) ||
        store.postalCode.includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCountry]);

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
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title="Trouver un Opticien Partenaire"
        description={`Trouvez l'un de nos ${opticiansData.length}+ opticiens partenaires RENAISSANCE Paris près de chez vous. Essayez nos lunettes de luxe et bénéficiez de conseils personnalisés.`}
        url="/opticiens"
      />

      {/* HERO — Split éditorial */}
      <div className="h-screen relative overflow-hidden">
        {/* DESKTOP */}
        <div className="relative h-full overflow-hidden hidden lg:flex">
          {/* Left Panel — Content */}
          <div className="w-[42%] bg-[#000000] relative flex flex-col justify-center px-12 xl:px-20 2xl:px-28">
            {/* Top label */}
            <div className="absolute top-10 left-12 xl:left-20 2xl:left-28">
              <p className="font-sans text-white/25 text-[9px] tracking-[0.4em] font-medium uppercase">
                Réseau Partenaire
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
                TROUVEZ VOTRE
                <br />OPTICIEN.
              </motion.h1>
              <motion.p variants={fade} className="font-display text-2xl xl:text-3xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 xl:mb-10">
                L'excellence près de chez vous.
              </motion.p>

              <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8 xl:mb-10" />

              <motion.p variants={fade} className="font-sans text-white/35 text-[13px] xl:text-sm leading-[1.9] font-light max-w-md mb-8">
                Chaque boutique incarne les valeurs Renaissance : excellence, symbolique et savoir-faire français.
              </motion.p>

              {/* Stats inline */}
              <motion.div variants={fade} className="flex items-center gap-6 mb-10 xl:mb-14">
                <div>
                  <p className="font-display text-3xl xl:text-4xl font-bold text-white leading-none">
                    {opticiansData.length}+
                  </p>
                  <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/30 mt-1">
                    Opticiens
                  </p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="font-display text-3xl xl:text-4xl font-bold text-white leading-none">
                    {Object.keys(countryCounts).length}
                  </p>
                  <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/30 mt-1">
                    Pays
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fade}>
                <button
                  onClick={() => {
                    const section = document.querySelector('[data-search-section]');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    Rechercher un opticien
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </motion.div>
            </motion.div>

            {/* Bottom scroll indicator */}
            <div className="absolute bottom-10 left-12 xl:left-20 2xl:left-28 flex items-center gap-3">
              <div className="w-8 h-px bg-white/15" />
              <span className="font-sans text-white/15 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            </div>
          </div>

          {/* Right Panel — Image */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="https://renaissance-cdn.b-cdn.net/packshot%20copie.png"
              alt="Renaissance Paris - Opticiens partenaires"
              className="absolute inset-0 w-full h-full object-cover"
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
              src="https://renaissance-cdn.b-cdn.net/packshot%20copie.png"
              alt="Renaissance Paris - Opticiens partenaires"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-[#000000]" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-24 left-6"
            >
              <p className="text-white/50 text-[9px] tracking-[0.3em] uppercase font-sans font-medium">
                Réseau Partenaire
              </p>
            </motion.div>
          </div>

          {/* Content bottom */}
          <div className="flex-1 bg-[#000000] px-6 flex flex-col justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2 tracking-[-0.03em] leading-[0.9]">
                TROUVEZ VOTRE
                <br />OPTICIEN.
              </h1>
              <p className="font-display text-lg sm:text-xl font-light italic text-white/50 tracking-[-0.02em] mb-5">
                L'excellence près de chez vous.
              </p>
              <div className="w-10 h-px bg-white/15 mb-5" />

              {/* Stats mobile */}
              <div className="flex items-center gap-5 mb-6">
                <div>
                  <p className="font-display text-2xl font-bold text-white leading-none">{opticiansData.length}+</p>
                  <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-white/30 mt-1">Opticiens</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="font-display text-2xl font-bold text-white leading-none">{Object.keys(countryCounts).length}</p>
                  <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-white/30 mt-1">Pays</p>
                </div>
              </div>

              <button
                onClick={() => {
                  const section = document.querySelector('[data-search-section]');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-white text-dark-text px-8 py-4 font-sans text-[9px] tracking-[0.3em] font-medium uppercase hover:bg-white/90 transition-all duration-300 active:scale-[0.98]"
              >
                Rechercher un opticien
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR SECTION */}
      <section className="bg-[#000000] relative" data-search-section>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-12 mb-8 lg:mb-10">
            <div className="mb-6 lg:mb-0">
              <p className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-3">
                Localiser
              </p>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-[-0.03em] leading-[0.95]">
                Rechercher un opticien
              </h2>
            </div>
            <div className="hidden lg:block w-px h-10 bg-white/10" />
            <p className="font-sans text-white/25 text-[12px] lg:text-[13px] leading-[1.7] font-light max-w-md">
              {filteredStores.length} opticien{filteredStores.length > 1 ? 's' : ''} partenaires dans {Object.keys(countryCounts).length} pays
            </p>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onGetLocation={getUserLocation}
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
            countryCounts={countryCounts}
          />
        </div>
      </section>

      {/* MAP + LIST SECTION */}
      <section>
        <div className="flex flex-col lg:flex-row lg:h-[80vh]">
          {/* Map */}
          <div className="w-full lg:w-[65%] h-[50vh] lg:h-full">
            <MapComponent
              stores={filteredStores}
              selectedStore={selectedStore}
              onSelectStore={setSelectedStore}
              userLocation={userLocation}
            />
          </div>

          {/* Store List */}
          <div className="w-full lg:w-[35%] lg:h-full lg:overflow-y-auto bg-white border-l border-dark-text/10">
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
              Devenir partenaire
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-3">
              Vous êtes opticien ?
            </motion.h2>
            <motion.p variants={fade} className="font-display text-xl sm:text-2xl font-light italic text-dark-text/40 tracking-[-0.02em] mb-8">
              Rejoignez l'excellence.
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-dark-text/15 mx-auto mb-8" />

            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 sm:mb-12">
              Rejoignez le réseau Renaissance et proposez à vos clients des lunettes d'exception,
              symboles d'un héritage français et d'une vision unique du luxe.
            </motion.p>

            <motion.div variants={fade}>
              <button
                onClick={() => window.location.href = '/contact'}
                className="group relative overflow-hidden border border-dark-text px-10 py-4 transition-all duration-500"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                  Devenir partenaire
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