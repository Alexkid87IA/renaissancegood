import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');
  const [opticiensOpen, setOpticiensOpen] = useState(false);
  const { cartCount } = useCart();

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const versaillesCollection = [
    {
      name: "Versailles Or",
      image: "https://renaissanceeyewear.fr/cdn/shop/files/Renaissance_L_50_Cc1.jpg?v=1741186050&width=2547",
      description: "Plaqué or 24 carats",
      price: "€1,295"
    },
    {
      name: "Versailles Royale",
      image: "https://renaissanceeyewear.fr/cdn/shop/files/XII_12_C3-2.jpg?v=1741187974&width=2423",
      description: "Édition limitée",
      price: "€1,495"
    },
    {
      name: "Versailles Classique",
      image: "https://renaissanceeyewear.fr/cdn/shop/files/XXXXII_42_C3-2.jpg?v=1741187118&width=2656",
      description: "Intemporelle",
      price: "€895"
    }
  ];

  const isisCollection = [
    {
      name: "Isis Émeraude",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop&q=90",
      description: "Vert profond",
      price: "€995"
    },
    {
      name: "Isis Saphir",
      image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=800&fit=crop&q=90",
      description: "Bleu nuit",
      price: "€995"
    },
    {
      name: "Isis Ambre",
      image: "https://images.unsplash.com/photo-1580651315530-3e9369de8e19?w=800&h=800&fit=crop&q=90",
      description: "Havane lumineux",
      price: "€995"
    }
  ];

  const heritageCollection = [
    {
      name: "Héritage 1920",
      image: "https://renaissanceeyewear.fr/cdn/shop/files/PhotoRoom-20240325_172853.png?v=1711630142&width=2000",
      description: "Art Déco",
      price: "€1,195"
    },
    {
      name: "Héritage Parisien",
      image: "https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=5760",
      description: "Esprit Rive Gauche",
      price: "€1,095"
    },
    {
      name: "Héritage Atelier",
      image: "https://renaissanceeyewear.fr/cdn/shop/files/PhotoRoom-20240325_173929.png?v=1711631509&width=2000",
      description: "Fait main",
      price: "€1,295"
    }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-sm'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 laptop:px-14 xl:px-20">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            
            {/* LEFT NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1">
              <a
                href="#heritage"
                onMouseEnter={() => setActiveMenu('heritage')}
                className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
              >
                HÉRITAGE
              </a>
              <a
                href="#versailles"
                onMouseEnter={() => setActiveMenu('versailles')}
                className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
              >
                VERSAILLES
              </a>
              <a
                href="#isis"
                onMouseEnter={() => setActiveMenu('isis')}
                className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
              >
                ISIS
              </a>
              <a
                href="#histoire"
                className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
              >
                HISTOIRE
              </a>
            </nav>

            {/* CENTER LOGO */}
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
                    className="h-24 sm:h-28 md:h-32 lg:h-32 laptop:h-32 xl:h-40 w-auto object-contain"
                  />
                </motion.div>
              </Link>
            </div>

            {/* RIGHT SECTION */}
            <div className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1 justify-end">

              {/* Opticiens */}
              <div
                className="relative hidden laptop:block"
                onMouseEnter={() => setOpticiensOpen(true)}
                onMouseLeave={() => setOpticiensOpen(false)}
              >
                <button
                  className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase whitespace-nowrap"
                >
                  RETROUVEZ-NOUS CHEZ VOTRE OPTICIEN
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
                      <h3 className="font-serif text-2xl text-dark-text mb-4 leading-tight">
                        Renaissance partout<br/>en France
                      </h3>
                      <p className="font-sans text-dark-text/60 text-sm leading-relaxed mb-6 font-light">
                        Nos collections sont distribuées chez plus de 200 opticiens partenaires.
                        Essayez nos montures et bénéficiez de conseils personnalisés.
                      </p>

                      <div className="mb-6 pb-6 border-b border-bronze/15">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="font-serif text-3xl text-bronze">200+</span>
                        </div>
                        <p className="font-sans text-dark-text/50 text-xs leading-relaxed font-light">
                          Opticiens partenaires à votre service
                        </p>
                      </div>

                      <motion.a
                        href="#store-locator"
                        whileHover={{ x: 4 }}
                        className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] text-dark-text uppercase font-light group"
                      >
                        TROUVER L'OPTICIEN LE PLUS PROCHE
                        <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium text-dark-text hover:text-bronze transition-colors duration-300 uppercase"
                >
                  {currentLang}
                </button>
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-3 bg-white shadow-xl border border-dark-text/5 overflow-hidden min-w-[120px]"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setLanguageOpen(false);
                          }}
                          className={`block w-full text-left px-5 py-2.5 font-sans text-[10px] tracking-[0.15em] font-light transition-colors duration-200 ${
                            currentLang === lang.code
                              ? 'bg-dark-text text-white'
                              : 'text-dark-text/70 hover:bg-beige'
                          }`}
                        >
                          {lang.code}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Icons minimalistes */}
              <button className="w-[15px] laptop:w-[16px] xl:w-[17px] 2xl:w-[18px] h-[15px] laptop:h-[16px] xl:h-[17px] 2xl:h-[18px] flex items-center justify-center group">
                <svg className="w-full h-full stroke-dark-text/60 group-hover:stroke-dark-text transition-colors duration-300" fill="none" strokeWidth="1.2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>

              <Link to="/cart" className="w-[15px] laptop:w-[16px] xl:w-[17px] 2xl:w-[18px] h-[15px] laptop:h-[16px] xl:h-[17px] 2xl:h-[18px] flex items-center justify-center group relative">
                <svg className="w-full h-full stroke-dark-text/60 group-hover:stroke-dark-text transition-colors duration-300" fill="none" strokeWidth="1.2" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bronze text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button className="w-[15px] laptop:w-[16px] xl:w-[17px] 2xl:w-[18px] h-[15px] laptop:h-[16px] xl:h-[17px] 2xl:h-[18px] flex items-center justify-center group">
                <svg className="w-full h-full stroke-dark-text/60 group-hover:stroke-dark-text transition-colors duration-300" fill="none" strokeWidth="1.2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-[1px] bg-dark-text transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}/>
                <span className={`w-full h-[1px] bg-dark-text transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}/>
                <span className={`w-full h-[1px] bg-dark-text transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}/>
              </div>
            </button>
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
            className="fixed top-[64px] sm:top-[72px] md:top-[80px] left-0 right-0 z-[90]"
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
                <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 lg:gap-10 laptop:gap-12 xl:gap-16">
                  
                  {/* 3 paires */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 laptop:gap-8">
                    {versaillesCollection.map((item, index) => (
                      <Link
                        key={item.name}
                        to={`/product/${item.name.toLowerCase().replace(/\s/g, '-')}`}
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

                  {/* CTA */}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mega Menu - Isis - BIENTÔT DISPONIBLE */}
      <AnimatePresence>
        {activeMenu === 'isis' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] sm:top-[72px] md:top-[80px] left-0 right-0 z-[90]"
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
            className="fixed top-[64px] sm:top-[72px] md:top-[80px] left-0 right-0 z-[90]"
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
                <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 lg:gap-10 laptop:gap-12 xl:gap-16">
                  
                  {/* 3 paires */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 laptop:gap-8">
                    {heritageCollection.map((item, index) => (
                      <Link
                        key={item.name}
                        to={`/product/${item.name.toLowerCase().replace(/\s/g, '-')}`}
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

                  {/* CTA */}
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
            className="fixed inset-y-0 right-0 z-40 w-full bg-white lg:hidden"
          >
            <div className="flex flex-col h-full pt-20 sm:pt-24 px-6 sm:px-8 pb-8">
              <nav className="flex flex-col space-y-5 sm:space-y-6">
                <a href="#heritage" onClick={() => setMobileMenuOpen(false)} className="font-serif text-lg sm:text-xl text-dark-text uppercase">
                  Héritage
                </a>
                <a href="#versailles" onClick={() => setMobileMenuOpen(false)} className="font-serif text-lg sm:text-xl text-dark-text uppercase">
                  Versailles
                </a>
                <a href="#isis" onClick={() => setMobileMenuOpen(false)} className="font-serif text-lg sm:text-xl text-dark-text uppercase">
                  Isis
                </a>
                <a href="#histoire" onClick={() => setMobileMenuOpen(false)} className="font-serif text-lg sm:text-xl text-dark-text uppercase">
                  Histoire
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}