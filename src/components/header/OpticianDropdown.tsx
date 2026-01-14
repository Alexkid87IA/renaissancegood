// ========================================
// COMPOSANT OPTICIAN DROPDOWN
// Dropdown pour trouver un opticien
// ========================================

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface OpticianDropdownProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

export default function OpticianDropdown({ isOpen, onToggle }: OpticianDropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button
        className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase whitespace-nowrap"
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
            className="absolute top-full right-0 mt-3 bg-white shadow-xl border border-dark-text/5 overflow-hidden w-[380px] p-8"
          >
            <p className="font-sans text-xs tracking-wider uppercase text-dark-text/60 mb-4">
              Réseau de 200+ opticiens
            </p>
            <p className="font-serif text-2xl text-dark-text mb-6">
              Trouvez votre opticien Renaissance
            </p>
            <Link to="/store-locator">
              <button className="w-full bg-dark-text text-white py-3 font-sans text-xs tracking-widest uppercase hover:bg-bronze transition-colors">
                Localisateur
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
