import { motion } from 'framer-motion';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

interface StoreListProps {
  stores: any[];
  selectedStore: any | null;
  onSelectStore: (store: any) => void;
  searchQuery: string;
}

export default function StoreList({ stores, selectedStore, onSelectStore, searchQuery }: StoreListProps) {
  if (stores.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="font-sans text-sm text-dark-text/60 mb-4">
          Aucun opticien trouvé pour "{searchQuery}"
        </p>
        <p className="font-sans text-xs text-dark-text/40">
          Essayez avec une autre ville ou code postal
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 laptop:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-light text-dark-text mb-2">
          Nos opticiens{searchQuery ? ' trouvés' : ''}
        </h2>
        <p className="font-sans text-xs text-dark-text/50 tracking-wider uppercase">
          {stores.length} résultat{stores.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Store List */}
      <div className="space-y-4">
        {stores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onSelectStore(store)}
            className={`group cursor-pointer border transition-all duration-300 ${
              selectedStore?.id === store.id
                ? 'border-bronze bg-bronze/5'
                : 'border-dark-text/10 hover:border-bronze/50 bg-white'
            }`}
          >
            <div className="p-6">
              {/* Store Name */}
              <h3 className="font-display text-lg font-semibold text-dark-text mb-3 group-hover:text-bronze transition-colors">
                {store.name}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <div className="font-sans text-sm text-dark-text/70 leading-relaxed">
                  <p>{store.address}</p>
                  <p>{store.postalCode} {store.city}</p>
                </div>
              </div>

              {/* Phone (if available) */}
              {store.phone && (
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="w-4 h-4 text-bronze" />
                  <a 
                    href={`tel:${store.phone}`}
                    className="font-sans text-sm text-dark-text/70 hover:text-bronze transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {store.phone}
                  </a>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-dark-text/10">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-dark-text/20 hover:bg-dark-text hover:text-white hover:border-dark-text transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-sans text-[10px] tracking-wider uppercase">
                    Y aller
                  </span>
                </a>

                {selectedStore?.id === store.id && (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStore(null);
                    }}
                    className="px-4 py-2 bg-bronze text-white font-sans text-[10px] tracking-wider uppercase"
                  >
                    Voir sur la carte
                  </motion.button>
                )}
              </div>

              {/* Commercial (optional info) */}
              {store.commercial && (
                <div className="mt-3 pt-3 border-t border-dark-text/5">
                  <p className="font-sans text-[10px] text-dark-text/40 tracking-wider uppercase">
                    Contact: {store.commercial}
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