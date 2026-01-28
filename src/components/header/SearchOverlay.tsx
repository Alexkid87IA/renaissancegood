// ========================================
// COMPOSANT SEARCH OVERLAY
// Barre de recherche avec filtres
// ========================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed top-[56px] sm:top-[56px] md:top-[64px] left-0 right-0 z-[90]"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white border-t border-b border-dark-text/[0.06]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 laptop:px-12 py-6 sm:py-8">
          <div className="flex flex-col gap-6">
            {/* En-tête */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] font-medium text-dark-text uppercase mb-1.5 sm:mb-2">
                  RECHERCHE
                </p>
                <p className="font-sans text-dark-text/60 text-xs">
                  Trouvez votre monture idéale
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-dark-text/60 hover:text-dark-text transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filtres */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <FilterSelect label="COLLECTION" options={['All', 'Heritage', 'Versailles', 'Isis']} />
              <FilterSelect label="MATERIAL" options={['All', 'Acétate', 'Métal', 'Titane']} />
              <FilterSelect label="SHAPE" options={['All', 'Rond', 'Ovale', 'Carré', 'Hexagonal', 'Papillon']} />
              <FilterSelect label="LENS" options={['All']} />
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-dark-text/[0.06] flex items-center justify-between">
              <p className="font-sans text-dark-text/40 text-xs font-light">
                Utilisez les filtres pour affiner votre recherche
              </p>
              <Link to="/collections" onClick={onClose}>
                <button className="group relative overflow-hidden border border-dark-text px-6 py-2.5 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                    Voir tous les produits
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Composant interne pour les selects de filtre
function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="relative">
      <label className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-medium text-dark-text uppercase mb-2 sm:mb-3 block">
        {label}
      </label>
      <div className="relative">
        <select className="w-full bg-transparent border-b border-dark-text/15 pb-2 sm:pb-2.5 font-sans text-xs sm:text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6">
          {options.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
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
