// ========================================
// COMPOSANT OPTICIAN DROPDOWN
// Dropdown pour trouver un opticien
// ========================================

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface OpticianDropdownProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  transparent?: boolean;
}

export default function OpticianDropdown({ isOpen, onToggle, transparent }: OpticianDropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button
        className={`font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium transition-colors duration-500 uppercase whitespace-nowrap ${
          transparent
            ? 'text-white/90 hover:text-white/50'
            : 'text-dark-text hover:text-bronze'
        }`}
      >
        ESSAYEZ CHEZ VOTRE OPTICIEN
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-3 bg-white border border-dark-text/[0.08] overflow-hidden w-[380px] p-8"
          >
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text/30 font-medium mb-4">
              Réseau de 200+ opticiens
            </p>
            <p className="font-display text-xl text-dark-text tracking-[-0.02em] mb-6">
              Trouvez votre opticien Renaissance
            </p>
            <Link to="/store-locator">
              <button className="group relative overflow-hidden w-full border border-dark-text py-3 transition-all duration-500">
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                  Localisateur
                </span>
                <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
