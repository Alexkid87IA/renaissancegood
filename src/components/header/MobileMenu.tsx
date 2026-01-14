// ========================================
// COMPOSANT MOBILE MENU
// Menu de navigation pour mobile
// ========================================

import { motion } from 'framer-motion';
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
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[150] w-full bg-white lg:hidden overflow-y-auto"
    >
      {/* Bouton fermer */}
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-12 h-12 bg-dark-text/5 hover:bg-dark-text/10 transition-colors"
          aria-label="Fermer le menu"
        >
          <svg className="w-6 h-6 text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col min-h-full pt-20 sm:pt-24 px-6 sm:px-8 pb-12">
        <nav className="flex flex-col space-y-8">
          {/* Boutique */}
          <div className="space-y-4">
            <Link
              to="/shop"
              onClick={onClose}
              className="block font-display text-2xl text-dark-text tracking-tight"
            >
              Boutique
            </Link>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text/50 font-bold">
              Collections
            </p>
            <Link
              to="/collections/heritage"
              onClick={onClose}
              className="block font-display text-2xl text-dark-text tracking-tight"
            >
              Héritage
            </Link>
            <Link
              to="/collections/versailles"
              onClick={onClose}
              className="block font-display text-2xl text-dark-text tracking-tight"
            >
              Versailles
            </Link>
            <Link
              to="/collections/isis"
              onClick={onClose}
              className="block font-display text-2xl text-dark-text tracking-tight"
            >
              Isis
            </Link>
          </div>

          {/* La Maison */}
          <div className="space-y-4">
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text/50 font-bold">
              La Maison
            </p>
            <Link
              to="/histoire"
              onClick={onClose}
              className="block font-display text-2xl text-dark-text tracking-tight"
            >
              Histoire
            </Link>
            <Link
              to="/store-locator"
              onClick={onClose}
              className="block font-display text-2xl text-dark-text tracking-tight"
            >
              Nos Opticiens
            </Link>
          </div>

          {/* Section du bas */}
          <div className="border-t border-dark-text/10 pt-6 mt-8">
            <div className="space-y-3">
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center justify-between py-3 text-dark-text"
              >
                <span className="font-sans text-sm tracking-wide">Mon Panier</span>
                {itemCount > 0 && (
                  <span className="bg-bronze text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button className="flex items-center justify-between w-full py-3 text-dark-text">
                <span className="font-sans text-sm tracking-wide">Mon Compte</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>

            {/* Sélection de langue */}
            <div className="mt-6 pt-6 border-t border-dark-text/10">
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text/50 font-bold mb-3">
                Langue
              </p>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`py-2 px-3 text-center border transition-colors ${
                      currentLang === lang.code
                        ? 'border-dark-text bg-dark-text text-white'
                        : 'border-dark-text/20 text-dark-text'
                    }`}
                  >
                    <span className="font-sans text-xs tracking-wider">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </motion.div>
  );
}
