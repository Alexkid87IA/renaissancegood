import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MapComponent from '../components/map/MapComponent';
import StoreList from '../components/map/StoreList';
import SearchBar from '../components/map/SearchBar';

// Import des données des opticiens (à créer)
import opticiansData from '../data/opticians.json';

export default function StoreLocatorPage() {
  const [selectedStore, setSelectedStore] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStores, setFilteredStores] = useState(opticiansData);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter stores based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStores(opticiansData);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = opticiansData.filter((store: any) => 
        store.name.toLowerCase().includes(query) ||
        store.city.toLowerCase().includes(query) ||
        store.postalCode.includes(query)
      );
      setFilteredStores(filtered);
    }
  }, [searchQuery]);

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
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 border-b border-dark-text/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Surtitre */}
            <p className="font-sans text-xs text-dark-text/50 tracking-[0.3em] uppercase mb-6">
              Réseau de 200+ opticiens partenaires
            </p>

            {/* Titre principal */}
            <h1 className="font-display text-5xl laptop:text-6xl xl:text-7xl font-light text-dark-text mb-6 tracking-tight">
              Trouvez votre opticien<br />Renaissance
            </h1>

            {/* Ligne bronze */}
            <div className="w-16 h-[1px] bg-bronze mx-auto mb-8"></div>

            {/* Sous-titre */}
            <p className="font-sans text-sm laptop:text-base text-dark-text/60 max-w-2xl mx-auto leading-relaxed mb-12">
              Découvrez nos opticiens partenaires près de chez vous.
              Chaque boutique incarne les valeurs Renaissance : excellence, symbolique et savoir-faire français.
            </p>

            {/* Search Bar */}
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              onGetLocation={getUserLocation}
            />

            {/* Stats */}
            <div className="mt-12 flex justify-center gap-12">
              <div>
                <p className="font-display text-3xl font-light text-dark-text mb-1">
                  {filteredStores.length}
                </p>
                <p className="font-sans text-xs text-dark-text/60 tracking-wider uppercase">
                  Opticiens
                </p>
              </div>
              <div className="w-[1px] bg-dark-text/10"></div>
              <div>
                <p className="font-display text-3xl font-light text-dark-text mb-1">
                  France
                </p>
                <p className="font-sans text-xs text-dark-text/60 tracking-wider uppercase">
                  Métropolitaine
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map + List Section */}
      <section className="py-0">
        <div className="h-[700px] laptop:h-[800px] flex flex-col laptop:flex-row">
          {/* Map */}
          <div className="w-full laptop:w-2/3 h-full">
            <MapComponent 
              stores={filteredStores}
              selectedStore={selectedStore}
              onSelectStore={setSelectedStore}
              userLocation={userLocation}
            />
          </div>

          {/* Store List */}
          <div className="w-full laptop:w-1/3 h-full overflow-y-auto bg-white border-l border-dark-text/10">
            <StoreList 
              stores={filteredStores}
              selectedStore={selectedStore}
              onSelectStore={setSelectedStore}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 border-t border-dark-text/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl laptop:text-4xl font-light text-dark-text mb-6">
              Vous êtes opticien ?
            </h2>
            <p className="font-sans text-sm text-dark-text/60 mb-10 leading-relaxed">
              Rejoignez le réseau Renaissance et proposez à vos clients des lunettes d'exception,
              symboles d'un héritage français et d'une vision unique du luxe.
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="group inline-block relative overflow-hidden"
            >
              <span className="relative z-10 block border border-dark-text px-10 py-4 font-sans text-[10px] tracking-[0.3em] uppercase text-dark-text transition-colors duration-300 group-hover:text-white">
                Devenir partenaire
              </span>
              <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}