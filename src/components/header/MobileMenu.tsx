// ========================================
// COMPOSANT MOBILE MENU
// Menu de navigation pour mobile — fond noir, fullscreen
// ========================================

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package } from 'lucide-react';

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

// Overlay animation
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

// Container stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Item fade up
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
};

const COLLECTIONS = [
  { slug: 'heritage', label: 'Héritage', subtitle: 'Le Trident' },
  { slug: 'versailles', label: 'Versailles', subtitle: 'La Fleur de Lys' },
  { slug: 'isis', label: 'Isis', subtitle: 'Bientôt' },
];

const MAISON_LINKS = [
  { to: '/histoire', label: 'Notre Histoire' },
  { to: '/savoir-faire', label: 'Savoir-Faire' },
  { to: '/store-locator', label: 'Nos Opticiens' },
];

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
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[150] w-full bg-[#000000] lg:hidden overflow-y-auto"
    >
      {/* Header bar — close button */}
      <div className="relative flex items-center justify-center px-6 h-20">
        <img
          src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT%20blanc-Photoroom.png"
          alt="Renaissance Paris"
          className="h-28 w-auto object-contain opacity-80"
        />
        <button
          onClick={onClose}
          className="absolute right-6 text-white/40 hover:text-white transition-colors duration-300"
          aria-label="Fermer le menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <motion.div
        className="flex flex-col px-6 pt-4 pb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Boutique — main CTA */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            to="/shop"
            onClick={onClose}
            className="group flex items-center justify-between py-3 border-b border-white/8"
          >
            <span className="font-display text-3xl font-bold text-white tracking-[-0.02em]">
              BOUTIQUE
            </span>
            <svg className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Collections */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-white/25 font-medium mb-4">
            Collections
          </p>
          <div className="space-y-1">
            {COLLECTIONS.map((collection) => (
              <Link
                key={collection.slug}
                to={collection.slug === 'isis' ? '#' : `/collections/${collection.slug}`}
                onClick={collection.slug === 'isis' ? undefined : onClose}
                className="group flex items-center justify-between py-2.5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-xl text-white tracking-[-0.01em] group-hover:text-white/70 transition-colors duration-300">
                    {collection.label}
                  </span>
                  <span className="font-sans text-[9px] text-white/20 font-light italic">
                    {collection.subtitle}
                  </span>
                </div>
                {collection.slug !== 'isis' && (
                  <span className="w-0 group-hover:w-4 h-px bg-white/30 transition-all duration-500" />
                )}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants}>
          <div className="w-8 h-px bg-white/10 mb-8" />
        </motion.div>

        {/* La Maison */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-white/25 font-medium mb-4">
            La Maison
          </p>
          <div className="space-y-1">
            {MAISON_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="group flex items-center justify-between py-2.5"
              >
                <span className="font-display text-xl text-white tracking-[-0.01em] group-hover:text-white/70 transition-colors duration-300">
                  {link.label}
                </span>
                <span className="w-0 group-hover:w-4 h-px bg-white/30 transition-all duration-500" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants}>
          <div className="w-8 h-px bg-white/10 mb-6" />
        </motion.div>

        {/* Panier + Compte */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          <Link
            to="/cart"
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2.5 py-3 border border-white/15 hover:border-white/30 transition-all duration-300"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-white/50" />
            <span className="font-sans text-[9px] tracking-[0.2em] text-white/50 uppercase">
              Panier
            </span>
            {itemCount > 0 && (
              <span className="bg-white text-[#000000] text-[8px] font-bold w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            to="/suivi-commande"
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2.5 py-3 border border-white/15 hover:border-white/30 transition-all duration-300"
          >
            <Package className="w-3.5 h-3.5 text-white/50" />
            <span className="font-sans text-[9px] tracking-[0.2em] text-white/50 uppercase">
              Suivi
            </span>
          </Link>
        </motion.div>

        {/* Langue */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`py-2 px-4 border transition-all duration-300 ${
                  currentLang === lang.code
                    ? 'border-white/40 text-white'
                    : 'border-white/8 text-white/25 hover:text-white/50 hover:border-white/20'
                }`}
              >
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase">{lang.code}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
