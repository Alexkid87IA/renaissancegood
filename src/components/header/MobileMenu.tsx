// ========================================
// COMPOSANT MOBILE MENU
// Menu de navigation pour mobile — vertical stagger
// ========================================

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Language {
  code: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
  languages: Language[];
  currentLang: string;
  onLanguageChange: (code: string) => void;
}

// Animation container — stagger vertical
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};

// Animation items — fade up
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 }
  }
};

export default function MobileMenu({
  isOpen,
  onClose,
  itemCount,
  languages,
  currentLang,
  onLanguageChange
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[150] w-full bg-beige lg:hidden overflow-y-auto"
    >
      {/* Bouton fermer */}
      <motion.div
        className="fixed top-5 right-5 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <button
          onClick={onClose}
          className="text-dark-text/30 hover:text-dark-text transition-colors duration-500"
          aria-label="Fermer le menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>

      <motion.div
        className="flex flex-col min-h-full pt-16 px-6 sm:px-8 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Logo */}
        <motion.div className="mb-12" variants={itemVariants}>
          <img
            src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png"
            alt="Renaissance Paris"
            className="h-6 w-auto object-contain"
          />
        </motion.div>

        <nav className="flex flex-col">
          {/* Boutique */}
          <motion.div variants={itemVariants}>
            <Link
              to="/shop"
              onClick={onClose}
              className="block font-display text-2xl text-dark-text tracking-[-0.02em] mb-8"
            >
              Boutique
            </Link>
          </motion.div>

          {/* Separator */}
          <motion.div variants={itemVariants}>
            <div className="w-12 h-px bg-dark-text/10 mb-8" />
          </motion.div>

          {/* Collections */}
          <motion.div className="mb-8" variants={itemVariants}>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-dark-text/30 font-medium mb-6">
              Collections
            </p>
            <div className="space-y-5">
              <AnimatePresence>
                {['heritage', 'versailles', 'isis'].map((collection, i) => (
                  <motion.div
                    key={collection}
                    variants={itemVariants}
                    custom={i}
                  >
                    <Link
                      to={`/collections/${collection}`}
                      onClick={onClose}
                      className="group flex items-center gap-4"
                    >
                      <span className="font-display text-2xl text-dark-text tracking-[-0.02em] group-hover:text-bronze transition-colors duration-500">
                        {collection === 'heritage' ? 'Héritage' : collection.charAt(0).toUpperCase() + collection.slice(1)}
                      </span>
                      <span className="w-0 group-hover:w-6 h-px bg-bronze transition-all duration-500" />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Separator */}
          <motion.div variants={itemVariants}>
            <div className="w-12 h-px bg-dark-text/10 mb-8" />
          </motion.div>

          {/* La Maison */}
          <motion.div className="mb-8" variants={itemVariants}>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-dark-text/30 font-medium mb-6">
              La Maison
            </p>
            <div className="space-y-5">
              <Link
                to="/histoire"
                onClick={onClose}
                className="group flex items-center gap-4"
              >
                <span className="font-display text-2xl text-dark-text tracking-[-0.02em] group-hover:text-bronze transition-colors duration-500">
                  Histoire
                </span>
                <span className="w-0 group-hover:w-6 h-px bg-bronze transition-all duration-500" />
              </Link>
              <Link
                to="/store-locator"
                onClick={onClose}
                className="group flex items-center gap-4"
              >
                <span className="font-display text-2xl text-dark-text tracking-[-0.02em] group-hover:text-bronze transition-colors duration-500">
                  Nos Opticiens
                </span>
                <span className="w-0 group-hover:w-6 h-px bg-bronze transition-all duration-500" />
              </Link>
            </div>
          </motion.div>

          {/* Separator */}
          <motion.div variants={itemVariants}>
            <div className="w-12 h-px bg-dark-text/10 mb-8" />
          </motion.div>

          {/* Section du bas */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-dark-text group"
            >
              <span className="font-sans text-[13px] font-light tracking-wide group-hover:text-bronze transition-colors duration-500">
                Mon Panier
              </span>
              {itemCount > 0 && (
                <span className="bg-bronze text-white text-[8px] font-medium w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="flex items-center justify-between w-full py-2 text-dark-text group">
              <span className="font-sans text-[13px] font-light tracking-wide group-hover:text-bronze transition-colors duration-500">
                Mon Compte
              </span>
              <svg className="w-4 h-4 text-dark-text/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </motion.div>

          {/* Sélection de langue */}
          <motion.div className="mt-10 pt-8 border-t border-dark-text/[0.06]" variants={itemVariants}>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-dark-text/30 font-medium mb-4">
              Langue
            </p>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`py-2.5 px-3 text-center border transition-all duration-300 ${
                    currentLang === lang.code
                      ? 'border-dark-text bg-dark-text text-beige'
                      : 'border-dark-text/10 text-dark-text/40 hover:border-dark-text/30 hover:text-dark-text/60'
                  }`}
                >
                  <span className="font-sans text-[10px] tracking-[0.2em]">{lang.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </nav>
      </motion.div>
    </motion.div>
  );
}
