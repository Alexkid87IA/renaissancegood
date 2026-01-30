import { motion } from 'framer-motion';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import { Store } from '../../types/store';

interface StoreListProps {
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store | null) => void;
  searchQuery: string;
}

export default function StoreList({ stores, selectedStore, onSelectStore, searchQuery }: StoreListProps) {
  if (stores.length === 0) {
    return (
      <div className="p-8 lg:p-10 flex flex-col items-center justify-center h-full">
        <div className="w-10 h-px bg-dark-text/10 mb-6" />
        <p className="font-sans text-sm text-dark-text/50 mb-2 text-center">
          Aucun opticien trouvé pour "{searchQuery}"
        </p>
        <p className="font-sans text-xs text-dark-text/30 text-center">
          Essayez avec une autre ville ou code postal
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <p className="font-sans text-[8px] tracking-[0.3em] font-bold text-dark-text uppercase mb-1">
          # Opticiens
        </p>
        <p className="font-display text-3xl lg:text-4xl font-bold text-dark-text leading-none mb-2">
          {stores.length}
        </p>
        <p className="font-sans text-xs text-dark-text/40 tracking-wider">
          {searchQuery ? `résultat${stores.length > 1 ? 's' : ''} pour "${searchQuery}"` : 'partenaires disponibles'}
        </p>
      </div>

      <div className="w-full h-px bg-dark-text/10 mb-6" />

      {/* Store List */}
      <div className="space-y-3">
        {stores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.5) }}
            onClick={() => onSelectStore(store)}
            className={`group cursor-pointer border transition-all duration-500 ${
              selectedStore?.id === store.id
                ? 'border-bronze bg-bronze/5'
                : 'border-dark-text/8 hover:border-bronze/40 bg-white'
            }`}
          >
            <div className="p-5 lg:p-6">
              {/* Store Name */}
              <h3 className="font-display text-base lg:text-lg font-bold text-dark-text mb-3 group-hover:text-bronze transition-colors duration-500 leading-tight">
                {store.name}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-2.5 mb-2.5">
                <MapPin className="w-3.5 h-3.5 text-bronze flex-shrink-0 mt-0.5" />
                <div className="font-sans text-xs text-dark-text/60 leading-relaxed">
                  <p>{store.address}</p>
                  <p>{store.postalCode} {store.city}</p>
                </div>
              </div>

              {/* Phone (if available) */}
              {store.phone && (
                <div className="flex items-center gap-2.5 mb-3">
                  <Phone className="w-3.5 h-3.5 text-bronze" />
                  <a
                    href={`tel:${store.phone}`}
                    className="font-sans text-xs text-dark-text/60 hover:text-bronze transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {store.phone}
                  </a>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-dark-text/8">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/btn relative overflow-hidden flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-dark-text/15 transition-all duration-500 hover:border-dark-text"
                >
                  <ExternalLink className="w-3.5 h-3.5 relative z-10 transition-colors duration-500 group-hover/btn:text-white" />
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.2em] font-medium uppercase transition-colors duration-500 group-hover/btn:text-white">
                    Y aller
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
                </a>

                {selectedStore?.id === store.id && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStore(null);
                    }}
                    className="px-4 py-2.5 bg-bronze text-white font-sans text-[9px] tracking-[0.2em] font-medium uppercase transition-opacity duration-300 hover:opacity-80"
                  >
                    Sur la carte
                  </motion.button>
                )}
              </div>

              {/* Commercial (optional info) */}
              {store.commercial && (
                <div className="mt-3 pt-3 border-t border-dark-text/5">
                  <p className="font-sans text-[9px] text-dark-text/30 tracking-[0.2em] uppercase">
                    Contact : {store.commercial}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
