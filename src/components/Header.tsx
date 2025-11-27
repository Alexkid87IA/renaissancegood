import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getProductsByCollection } from '../lib/shopify';

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

interface MenuProduct {
  name: string;
  image: string;
  description: string;
  price: string;
  handle: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'heritage' | 'versailles' | 'isis' | null>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');
  const [opticiensOpen, setOpticiensOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();

  const [versaillesCollection, setVersaillesCollection] = useState<MenuProduct[]>([]);
  const [heritageCollection, setHeritageCollection] = useState<MenuProduct[]>([]);
  const [isisCollection, setIsisCollection] = useState<MenuProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const languages = [
    { code: 'FR', label: 'Français' },
    { code: 'EN', label: 'English' },
    { code: 'RU', label: 'Русский' },
    { code: 'IT', label: 'Italiano' },
    { code: 'DE', label: 'Deutsch' },
    { code: 'ES', label: 'Español' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchAllCollections() {
      try {
        setLoadingProducts(true);

        const [versaillesData, heritageData, isisData] = await Promise.all([
          getProductsByCollection('versailles'),
          getProductsByCollection('heritage'),
          getProductsByCollection('isis')
        ]);

        const versaillesProducts = versaillesData.slice(0, 3).map((product: ShopifyProduct) => ({
          name: product.title,
          image: product.images.edges[0]?.node.url || '',
          description: product.description.substring(0, 50) || 'Édition limitée',
          price: `€${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
          handle: product.handle
        }));

        const heritageProducts = heritageData.slice(0, 3).map((product: ShopifyProduct) => ({
          name: product.title,
          image: product.images.edges[0]?.node.url || '',
          description: product.description.substring(0, 50) || 'Fait main',
          price: `€${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
          handle: product.handle
        }));

        const isisProducts = isisData.slice(0, 3).map((product: ShopifyProduct) => ({
          name: product.title,
          image: product.images.edges[0]?.node.url || '',
          description: product.description.substring(0, 50) || 'Collection Isis',
          price: `€${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
          handle: product.handle
        }));

        setVersaillesCollection(versaillesProducts);
        setHeritageCollection(heritageProducts);
        setIsisCollection(isisProducts);

      } catch (error) {
        setVersaillesCollection([]);
        setHeritageCollection([]);
        setIsisCollection([]);
      } finally {
        setLoadingProducts(false);
      }
    }

    fetchAllCollections();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-white backdrop-blur-xl shadow-sm'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 laptop:px-14 xl:px-20">
          <div className="flex items-center justify-between h-14 sm:h-14 md:h-16">
            
            <nav className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1">
              <Link
                to="/shop"
                className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
              >
                BOUTIQUE
              </Link>
              <Link
                to="/collections/heritage"
                onMouseEnter={() => setActiveMenu('heritage')}
                className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
              >
                HÉRITAGE
              </Link>
              <Link
                to="/collections/versailles"
                onMouseEnter={() => setActiveMenu('versailles')}
                className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
              >
                VERSAILLES
              </Link>
              <Link
                to="/collections/isis"
                onMouseEnter={() => setActiveMenu('isis')}
                className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
              >
                ISIS
              </Link>
              <Link
                to="/histoire"
                className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
              >
                HISTOIRE
              </Link>
            </nav>

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
                    src="https://res.cloudinary.com/dwt7u0azs/image/upload/v1761868999/RENAISSANCE_TRANSPARENT_bbe5d805-70e6-4344-856b-1d8534ad9056_ujgcyh.webp"
                    alt="Renaissance Paris"
                    className="h-24 sm:h-28 md:h-28 lg:h-28 laptop:h-28 xl:h-32 w-auto object-contain"
                  />
                </motion.div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1 justify-end">

              <div
                className="relative"
                onMouseEnter={() => setOpticiensOpen(true)}
                onMouseLeave={() => setOpticiensOpen(false)}
              >
                <button
                  className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase whitespace-nowrap"
                >
                  ESSAYEZ CHEZ VOTRE OPTICIEN
                </button>
                <AnimatePresence>
                  {opticiensOpen && (
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

              <div
                className="relative"
                onMouseEnter={() => setLanguageOpen(true)}
                onMouseLeave={() => setLanguageOpen(false)}
              >
                <button className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase">
                  {currentLang}
                </button>
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-3 bg-white shadow-xl border border-dark-text/5 overflow-hidden min-w-[140px]"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setLanguageOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3 font-sans text-xs tracking-wider transition-colors ${
                            currentLang === lang.code
                              ? 'bg-bronze text-white'
                              : 'text-dark-text hover:bg-beige'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-dark-text hover:text-bronze transition-colors duration-300"
              >
                <svg className="w-4 h-4 laptop:w-[18px] laptop:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link to="/cart" className="relative text-dark-text hover:text-bronze transition-colors duration-300">
                <svg className="w-4 h-4 laptop:w-[18px] laptop:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bronze text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button className="text-dark-text hover:text-bronze transition-colors duration-300">
                <svg className="w-4 h-4 laptop:w-[18px] laptop:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <Link to="/cart" className="relative text-dark-text">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bronze text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[56px] sm:top-[56px] md:top-[64px] left-0 right-0 z-[90]"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border-t border-dark-text/5"
            >
              <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-12 laptop:px-14 py-8 md:py-10 lg:py-12 laptop:py-14">
                {loadingProducts ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dark-text"></div>
                    <p className="font-sans text-dark-text/60 text-xs tracking-wider uppercase mt-4">
                      Chargement...
                    </p>
                  </div>
                ) : versaillesCollection.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="font-sans text-dark-text/60 text-sm tracking-wider uppercase">
                      Aucun produit disponible
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 lg:gap-10 laptop:gap-12 xl:gap-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 laptop:gap-8">
                      {versaillesCollection.map((item, index) => (
                        <Link
                          key={item.handle}
                          to={`/product/${item.handle}`}
                          onClick={() => setActiveMenu(null)}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group cursor-pointer"
                          >
                          <div className="aspect-video mb-5 overflow-hidden bg-beige">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <h3 className="font-serif text-sm tracking-[0.12em] text-dark-text mb-2 uppercase">
                            {item.name}
                          </h3>
                          <p className="font-sans text-xs text-dark-text/50 mb-2.5 font-light">{item.description}</p>
                          <p className="font-sans text-sm text-dark-text font-light">{item.price}</p>
                          </motion.div>
                        </Link>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="flex flex-col justify-center lg:pl-8 lg:border-l border-bronze/15"
                    >
                      <h3 className="font-serif text-2xl md:text-3xl text-dark-text mb-4 md:mb-6 leading-[1.2]">
                        La splendeur<br/>de Versailles
                      </h3>
                      <p className="font-sans text-dark-text/60 text-sm leading-relaxed mb-6 md:mb-10 font-light">
                        Inspirée par l'opulence du château, chaque monture capture l'essence du luxe à la française. 
                        Or 24 carats et finitions artisanales d'exception.
                      </p>
                      <Link to="/collections/versailles">
                        <motion.button
                          whileHover={{ x: 4 }}
                          className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] text-dark-text uppercase font-light group"
                        >
                          EXPLORER LA COLLECTION
                          <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mega Menu - Isis */}
      <AnimatePresence>
        {activeMenu === 'isis' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[56px] sm:top-[56px] md:top-[64px] left-0 right-0 z-[90]"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border-t border-dark-text/5"
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mega Menu - Héritage */}
      <AnimatePresence>
        {activeMenu === 'heritage' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[56px] sm:top-[56px] md:top-[64px] left-0 right-0 z-[90]"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border-t border-dark-text/5"
            >
              <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-12 laptop:px-14 py-8 md:py-10 lg:py-12 laptop:py-14">
                {loadingProducts ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dark-text"></div>
                    <p className="font-sans text-dark-text/60 text-xs tracking-wider uppercase mt-4">
                      Chargement...
                    </p>
                  </div>
                ) : heritageCollection.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="font-sans text-dark-text/60 text-sm tracking-wider uppercase">
                      Aucun produit disponible
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 lg:gap-10 laptop:gap-12 xl:gap-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 laptop:gap-8">
                      {heritageCollection.map((item, index) => (
                        <Link
                          key={item.handle}
                          to={`/product/${item.handle}`}
                          onClick={() => setActiveMenu(null)}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group cursor-pointer"
                          >
                          <div className="aspect-video mb-5 overflow-hidden bg-beige">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <h3 className="font-serif text-sm tracking-[0.12em] text-dark-text mb-2 uppercase">
                            {item.name}
                          </h3>
                          <p className="font-sans text-xs text-dark-text/50 mb-2.5 font-light">{item.description}</p>
                          <p className="font-sans text-sm text-dark-text font-light">{item.price}</p>
                          </motion.div>
                        </Link>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="flex flex-col justify-center lg:pl-8 lg:border-l border-bronze/15"
                    >
                      <h3 className="font-serif text-2xl md:text-3xl text-dark-text mb-4 md:mb-6 leading-[1.2]">
                        Un siècle<br/>de savoir-faire
                      </h3>
                      <p className="font-sans text-dark-text/60 text-sm leading-relaxed mb-6 md:mb-10 font-light">
                        Chaque monture perpétue l'excellence artisanale parisienne.
                        Des créations intemporelles façonnées dans nos ateliers.
                      </p>
                      <Link to="/collections/heritage">
                        <motion.button
                          whileHover={{ x: 4 }}
                          className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] text-dark-text uppercase font-light group"
                        >
                          EXPLORER LA COLLECTION
                          <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-full bg-white lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-full pt-20 sm:pt-24 px-6 sm:px-8 pb-12">
              <nav className="flex flex-col space-y-8">
                <div className="space-y-4">
                  <Link
                    to="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-display text-2xl text-dark-text tracking-tight"
                  >
                    Boutique
                  </Link>
                </div>

                <div className="space-y-4">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text/50 font-bold">
                    Collections
                  </p>
                  <Link
                    to="/collections/heritage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-display text-2xl text-dark-text tracking-tight"
                  >
                    Héritage
                  </Link>
                  <Link
                    to="/collections/versailles"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-display text-2xl text-dark-text tracking-tight"
                  >
                    Versailles
                  </Link>
                  <Link
                    to="/collections/isis"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-display text-2xl text-dark-text tracking-tight"
                  >
                    Isis
                  </Link>
                </div>

                <div className="space-y-4">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text/50 font-bold">
                    La Maison
                  </p>
                  <Link
                    to="/histoire"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-display text-2xl text-dark-text tracking-tight"
                  >
                    Histoire
                  </Link>
                  <Link
                    to="/store-locator"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-display text-2xl text-dark-text tracking-tight"
                  >
                    Nos Opticiens
                  </Link>
                </div>

                <div className="border-t border-dark-text/10 pt-6 mt-8">
                  <div className="space-y-3">
                    <Link
                      to="/cart"
                      onClick={() => setMobileMenuOpen(false)}
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

                  <div className="mt-6 pt-6 border-t border-dark-text/10">
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text/50 font-bold mb-3">
                      Langue
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setCurrentLang(lang.code)}
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
        )}
      </AnimatePresence>

      {/* Search Bar Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[56px] sm:top-[56px] md:top-[64px] left-0 right-0 z-[90]"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border-t border-b border-dark-text/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 laptop:px-12 py-6 sm:py-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] font-bold text-dark-text uppercase mb-1.5 sm:mb-2">
                        RECHERCHE
                      </p>
                      <p className="font-sans text-dark-text/60 text-xs">
                        Trouvez votre monture idéale
                      </p>
                    </div>
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="text-dark-text/60 hover:text-dark-text transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="relative">
                      <label className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-dark-text uppercase mb-2 sm:mb-3 block">
                        COLLECTION
                      </label>
                      <div className="relative">
                        <select className="w-full bg-transparent border-b-2 border-dark-text/20 pb-2 sm:pb-2.5 font-sans text-xs sm:text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6">
                          <option value="all">All</option>
                          <option value="heritage">Heritage</option>
                          <option value="versailles">Versailles</option>
                          <option value="isis">Isis</option>
                        </select>
                        <div className="absolute right-0 bottom-2 sm:bottom-3 pointer-events-none">
                          <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="sm:w-[10px] sm:h-[6px]">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-dark-text uppercase mb-2 sm:mb-3 block">
                        MATERIAL
                      </label>
                      <div className="relative">
                        <select className="w-full bg-transparent border-b-2 border-dark-text/20 pb-2 sm:pb-2.5 font-sans text-xs sm:text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6">
                          <option value="all">All</option>
                          <option value="acetate">Acétate</option>
                          <option value="metal">Métal</option>
                          <option value="titanium">Titane</option>
                        </select>
                        <div className="absolute right-0 bottom-2 sm:bottom-3 pointer-events-none">
                          <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="sm:w-[10px] sm:h-[6px]">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-dark-text uppercase mb-2 sm:mb-3 block">
                        SHAPE
                      </label>
                      <div className="relative">
                        <select className="w-full bg-transparent border-b-2 border-dark-text/20 pb-2 sm:pb-2.5 font-sans text-xs sm:text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6">
                          <option value="all">All</option>
                          <option value="round">Rond</option>
                          <option value="oval">Ovale</option>
                          <option value="square">Carré</option>
                          <option value="hexagonal">Hexagonal</option>
                          <option value="butterfly">Papillon</option>
                        </select>
                        <div className="absolute right-0 bottom-2 sm:bottom-3 pointer-events-none">
                          <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="sm:w-[10px] sm:h-[6px]">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-dark-text uppercase mb-2 sm:mb-3 block">
                        LENS
                      </label>
                      <div className="relative">
                        <select className="w-full bg-transparent border-b-2 border-dark-text/20 pb-2 sm:pb-2.5 font-sans text-xs sm:text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6">
                          <option value="all">All</option>
                        </select>
                        <div className="absolute right-0 bottom-2 sm:bottom-3 pointer-events-none">
                          <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="sm:w-[10px] sm:h-[6px]">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-dark-text/10 flex items-center justify-between">
                    <p className="font-sans text-dark-text/60 text-xs">
                      Utilisez les filtres pour affiner votre recherche
                    </p>
                    <Link to="/collections" onClick={() => setSearchOpen(false)}>
                      <motion.button
                        whileHover={{ x: 4 }}
                        className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] text-dark-text uppercase font-medium group"
                      >
                        VOIR TOUS LES PRODUITS
                        <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}