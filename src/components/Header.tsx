// ========================================
// COMPOSANT HEADER PRINCIPAL
// Navigation principale du site Renaissance
// ========================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getProductsByCollection } from '../lib/shopify';

// Sous-composants
import MegaMenu, { MenuProduct } from './header/MegaMenu';
import MobileMenu from './header/MobileMenu';
import SearchOverlay from './header/SearchOverlay';
import LanguageSelector, { SUPPORTED_LANGUAGES } from './header/LanguageSelector';
import OpticianDropdown from './header/OpticianDropdown';

// Types
interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
}

type ActiveMenu = 'heritage' | 'versailles' | 'isis' | null;

// Configuration des collections
const COLLECTION_CONFIG = {
  versailles: {
    title: 'La splendeur\nde Versailles',
    description: 'Inspirée par l\'opulence du château, chaque monture capture l\'essence du luxe à la française. Or 24 carats et finitions artisanales d\'exception.',
    link: '/collections/versailles'
  },
  heritage: {
    title: 'Un siècle\nde savoir-faire',
    description: 'Chaque monture perpétue l\'excellence artisanale parisienne. Des créations intemporelles façonnées dans nos ateliers.',
    link: '/collections/heritage'
  }
};

// Fonction pour formater les produits Shopify
function formatProducts(products: ShopifyProduct[], defaultDescription: string): MenuProduct[] {
  return products.slice(0, 3).map((product) => ({
    name: product.title,
    image: product.images.edges[0]?.node.url || '',
    description: product.description.substring(0, 50) || defaultDescription,
    price: `€${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
    handle: product.handle
  }));
}

// Pages où le header est transparent au top
const TRANSPARENT_PAGES = ['/'];

// URLs des logos
const LOGO_WHITE = 'https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT%20blanc-Photoroom.png';
const LOGO_DARK = 'https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png';

export default function Header() {
  // États
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');
  const [opticiensOpen, setOpticiensOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  // Header transparent uniquement sur certaines pages
  const isTransparentPage = TRANSPARENT_PAGES.includes(location.pathname);
  const isTransparent = isTransparentPage && !scrolled;

  // Collections
  const [versaillesCollection, setVersaillesCollection] = useState<MenuProduct[]>([]);
  const [heritageCollection, setHeritageCollection] = useState<MenuProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Effet scroll (throttled via rAF)
  const scrollTicking = useRef(false);
  const handleScroll = useCallback(() => {
    if (scrollTicking.current) return;
    scrollTicking.current = true;
    requestAnimationFrame(() => {
      setScrolled(window.scrollY > 20);
      scrollTicking.current = false;
    });
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Charger les collections
  useEffect(() => {
    async function fetchAllCollections() {
      try {
        setLoadingProducts(true);
        const [versaillesData, heritageData] = await Promise.all([
          getProductsByCollection('versailles'),
          getProductsByCollection('heritage')
        ]);

        setVersaillesCollection(formatProducts(versaillesData, 'Édition limitée'));
        setHeritageCollection(formatProducts(heritageData, 'Fait main'));
      } catch {
        setVersaillesCollection([]);
        setHeritageCollection([]);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchAllCollections();
  }, []);

  return (
    <>
      {/* Header principal */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-beige/95 backdrop-blur-xl border-b border-dark-text/[0.06]'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 laptop:px-14 xl:px-20">
          <div className="flex items-center justify-between h-16 sm:h-16 md:h-18 lg:h-20">

            {/* Navigation Desktop Gauche */}
            <nav className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1">
              <NavLink to="/shop" transparent={isTransparent} onMouseEnter={() => setActiveMenu(null)}>BOUTIQUE</NavLink>
              <NavLink to="/collections/heritage" transparent={isTransparent} onMouseEnter={() => setActiveMenu('heritage')}>
                HÉRITAGE
              </NavLink>
              <NavLink to="/collections/versailles" transparent={isTransparent} onMouseEnter={() => setActiveMenu('versailles')}>
                VERSAILLES
              </NavLink>
              <NavLink to="/collections/isis" transparent={isTransparent} onMouseEnter={() => setActiveMenu('isis')}>
                ISIS
              </NavLink>
              <NavLink to="/histoire" transparent={isTransparent} onMouseEnter={() => setActiveMenu(null)}>HISTOIRE</NavLink>
            </nav>

            {/* Logo — Dual crossfade (no flicker) */}
            <div className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
              <Link to="/">
                <motion.div
                  className="relative focus:outline-none block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ opacity: 0.75 }}
                  whileTap={{ opacity: 0.6 }}
                >
                  {/* Logo blanc (transparent mode) */}
                  <img
                    src={LOGO_WHITE}
                    alt="Renaissance Paris"
                    className={`h-36 sm:h-36 md:h-40 lg:h-40 xl:h-44 w-auto object-contain transition-opacity duration-700 ${
                      isTransparent ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {/* Logo sombre (scrolled mode) — absolute overlay */}
                  <img
                    src={LOGO_DARK}
                    alt="Renaissance Paris"
                    className={`absolute inset-0 h-36 sm:h-36 md:h-40 lg:h-40 xl:h-44 w-auto object-contain transition-opacity duration-700 ${
                      isTransparent ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                </motion.div>
              </Link>
            </div>

            {/* Navigation Desktop Droite */}
            <div className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1 justify-end">
              <OpticianDropdown isOpen={opticiensOpen} onToggle={setOpticiensOpen} transparent={isTransparent} />
              <LanguageSelector
                isOpen={languageOpen}
                onToggle={setLanguageOpen}
                currentLang={currentLang}
                languages={SUPPORTED_LANGUAGES}
                onSelect={setCurrentLang}
                transparent={isTransparent}
              />
              <IconButton onClick={() => setSearchOpen(!searchOpen)} icon="search" transparent={isTransparent} />
              <CartIcon itemCount={itemCount} transparent={isTransparent} />
              <IconButton icon="user" transparent={isTransparent} />
            </div>

            {/* Navigation Mobile — Hamburger asymétrique 2 lignes */}
            <div className="lg:hidden flex items-center gap-4">
              <CartIcon itemCount={itemCount} transparent={isTransparent} />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`relative w-6 h-5 flex flex-col justify-center items-end gap-[6px] transition-colors duration-500 focus:outline-none ${
                  isTransparent ? 'text-white/90' : 'text-dark-text'
                }`}
                aria-label="Menu"
              >
                <motion.span
                  className="block h-[1.5px] bg-current origin-right"
                  animate={mobileMenuOpen
                    ? { rotate: -45, width: '100%', y: 0 }
                    : { rotate: 0, width: '100%', y: 0 }
                  }
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="block h-[1.5px] bg-current origin-right"
                  animate={mobileMenuOpen
                    ? { rotate: 45, width: '100%', y: 0 }
                    : { rotate: 0, width: '66.67%', y: 0 }
                  }
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mega Menu - Versailles */}
      <AnimatePresence>
        {activeMenu === 'versailles' && (
          <MegaMenuWrapper onMouseLeave={() => setActiveMenu(null)}>
            <MegaMenu
              products={versaillesCollection}
              loading={loadingProducts}
              title={COLLECTION_CONFIG.versailles.title}
              subtitle="Collection Versailles"
              description={COLLECTION_CONFIG.versailles.description}
              collectionLink={COLLECTION_CONFIG.versailles.link}
              onClose={() => setActiveMenu(null)}
            />
          </MegaMenuWrapper>
        )}
      </AnimatePresence>

      {/* Mega Menu - Héritage */}
      <AnimatePresence>
        {activeMenu === 'heritage' && (
          <MegaMenuWrapper onMouseLeave={() => setActiveMenu(null)}>
            <MegaMenu
              products={heritageCollection}
              loading={loadingProducts}
              title={COLLECTION_CONFIG.heritage.title}
              subtitle="Collection Héritage"
              description={COLLECTION_CONFIG.heritage.description}
              collectionLink={COLLECTION_CONFIG.heritage.link}
              onClose={() => setActiveMenu(null)}
            />
          </MegaMenuWrapper>
        )}
      </AnimatePresence>

      {/* Mega Menu - Isis (Coming Soon) */}
      <AnimatePresence>
        {activeMenu === 'isis' && (
          <MegaMenuWrapper onMouseLeave={() => setActiveMenu(null)}>
            <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-24">
              <div className="flex flex-col items-center justify-center text-center">
                <h3 className="font-display text-3xl md:text-4xl text-dark-text tracking-[-0.02em] mb-4">
                  Collection Isis
                </h3>
                <p className="font-sans text-bronze text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                  Bientôt disponible
                </p>
              </div>
            </div>
          </MegaMenuWrapper>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          itemCount={itemCount}
          languages={SUPPORTED_LANGUAGES}
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
        />
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </AnimatePresence>
    </>
  );
}

// ========================================
// SOUS-COMPOSANTS INTERNES
// ========================================

// Lien de navigation avec underline bronze animé
function NavLink({ to, children, onMouseEnter, transparent }: { to: string; children: React.ReactNode; onMouseEnter?: () => void; transparent?: boolean }) {
  return (
    <Link
      to={to}
      onMouseEnter={onMouseEnter}
      className={`group relative font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.3em] font-medium transition-colors duration-150 uppercase pb-1 ${
        transparent
          ? 'text-white/90 hover:text-white'
          : 'text-dark-text hover:text-bronze'
      }`}
    >
      {children}
      {/* Underline animé */}
      <span className={`absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-200 ease-out ${
        transparent ? 'bg-white/60' : 'bg-bronze'
      }`} />
    </Link>
  );
}

// Wrapper pour Mega Menu — apparition instantanée
function MegaMenuWrapper({ children, onMouseLeave }: { children: React.ReactNode; onMouseLeave: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.08 }}
      className="fixed top-[64px] sm:top-[64px] md:top-[72px] lg:top-[80px] left-0 right-0 z-[90] bg-beige border-t border-dark-text/[0.06]"
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Icône de bouton
function IconButton({ onClick, icon, transparent }: { onClick?: () => void; icon: 'search' | 'user'; transparent?: boolean }) {
  const icons = {
    search: (
      <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    user: (
      <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  };

  return (
    <button
      onClick={onClick}
      className={`transition-colors duration-500 ${
        transparent
          ? 'text-white/90 hover:text-white/50'
          : 'text-dark-text hover:text-bronze'
      }`}
    >
      {icons[icon]}
    </button>
  );
}

// Icône panier — badge carré (pas de rounded-full, cohérent avec le design system sans rayon)
function CartIcon({ itemCount, transparent }: { itemCount: number; transparent?: boolean }) {
  return (
    <Link
      to="/cart"
      className={`relative transition-colors duration-500 ${
        transparent
          ? 'text-white/90 hover:text-white/50'
          : 'text-dark-text hover:text-bronze'
      }`}
    >
      <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2.5 bg-bronze text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
