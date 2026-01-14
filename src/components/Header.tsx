// ========================================
// COMPOSANT HEADER PRINCIPAL
// Navigation principale du site Renaissance
// ========================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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

  // Collections
  const [versaillesCollection, setVersaillesCollection] = useState<MenuProduct[]>([]);
  const [heritageCollection, setHeritageCollection] = useState<MenuProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Effet scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-white backdrop-blur-xl shadow-sm' : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 laptop:px-14 xl:px-20">
          <div className="flex items-center justify-between h-14 sm:h-14 md:h-16">

            {/* Navigation Desktop Gauche */}
            <nav className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1">
              <NavLink to="/shop">BOUTIQUE</NavLink>
              <NavLink to="/collections/heritage" onMouseEnter={() => setActiveMenu('heritage')}>
                HÉRITAGE
              </NavLink>
              <NavLink to="/collections/versailles" onMouseEnter={() => setActiveMenu('versailles')}>
                VERSAILLES
              </NavLink>
              <NavLink to="/collections/isis" onMouseEnter={() => setActiveMenu('isis')}>
                ISIS
              </NavLink>
              <NavLink to="/histoire">HISTOIRE</NavLink>
            </nav>

            {/* Logo */}
            <div className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
              <Link to="/">
                <motion.div
                  className="focus:outline-none block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ opacity: 0.75 }}
                  whileTap={{ opacity: 0.6 }}
                >
                  <img
                    src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1766502526/6c20430c-e6c7-41d2-b451-8717d92026d9_l19hau.png"
                    alt="Renaissance Paris"
                    className="h-24 sm:h-28 md:h-28 lg:h-28 laptop:h-28 xl:h-32 w-auto object-contain"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Navigation Desktop Droite */}
            <div className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1 justify-end">
              <OpticianDropdown isOpen={opticiensOpen} onToggle={setOpticiensOpen} />
              <LanguageSelector
                isOpen={languageOpen}
                onToggle={setLanguageOpen}
                currentLang={currentLang}
                languages={SUPPORTED_LANGUAGES}
                onSelect={setCurrentLang}
              />
              <IconButton onClick={() => setSearchOpen(!searchOpen)} icon="search" />
              <CartIcon itemCount={itemCount} />
              <IconButton icon="user" />
            </div>

            {/* Navigation Mobile */}
            <div className="lg:hidden flex items-center gap-4">
              <CartIcon itemCount={itemCount} />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-dark-text focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
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
                <h3 className="font-serif text-3xl md:text-4xl text-dark-text mb-4">
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

// Lien de navigation
function NavLink({ to, children, onMouseEnter }: { to: string; children: React.ReactNode; onMouseEnter?: () => void }) {
  return (
    <Link
      to={to}
      onMouseEnter={onMouseEnter}
      className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
    >
      {children}
    </Link>
  );
}

// Wrapper pour Mega Menu
function MegaMenuWrapper({ children, onMouseLeave }: { children: React.ReactNode; onMouseLeave: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed top-[56px] sm:top-[56px] md:top-[64px] left-0 right-0 z-[90]"
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white border-t border-dark-text/5"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Icône de bouton
function IconButton({ onClick, icon }: { onClick?: () => void; icon: 'search' | 'user' }) {
  const icons = {
    search: (
      <svg className="w-4 h-4 laptop:w-[18px] laptop:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    user: (
      <svg className="w-4 h-4 laptop:w-[18px] laptop:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  };

  return (
    <button
      onClick={onClick}
      className="text-dark-text hover:text-bronze transition-colors duration-300"
    >
      {icons[icon]}
    </button>
  );
}

// Icône panier
function CartIcon({ itemCount }: { itemCount: number }) {
  return (
    <Link to="/cart" className="relative text-dark-text hover:text-bronze transition-colors duration-300">
      <svg className="w-4 h-4 laptop:w-[18px] laptop:h-[18px] lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-bronze text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
