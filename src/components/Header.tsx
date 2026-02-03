// ========================================
// COMPOSANT HEADER PRINCIPAL
// Navigation principale du site Renaissance
// ========================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useLocale } from '../contexts/LocaleContext';
import { getProductsByCollection } from '../lib/shopify';
import { SUPPORTED_LOCALES, isSupportedLocale } from '../lib/i18n';
import type { SupportedLocale } from '../lib/i18n';
import LocaleLink from './LocaleLink';

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

type ActiveMenu = 'heritage' | 'versailles' | 'isis' | 'histoire' | null;

// Extraire le nom de modèle (sans "COLORI X") pour dédupliquer
function getModelName(title: string): string {
  return title.replace(/\s*COLORI\s*\d+/i, '').trim();
}

// Shuffle Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Produits à exclure du mega menu (par titre exact ou partiel)
const MEGA_MENU_EXCLUDED = ['RENAISSANCE XXX COLORI 1'];

// Formater les produits Shopify — TOUJOURS 4 cartes, variées, garanti
function formatProducts(products: ShopifyProduct[], defaultDescription: string): MenuProduct[] {
  if (products.length === 0) return [];

  // Exclure les produits blacklistés
  const filtered = products.filter(p =>
    !MEGA_MENU_EXCLUDED.some(ex => p.title.includes(ex))
  );

  // Shuffle les produits filtrés
  const shuffled = shuffleArray(filtered.length > 0 ? filtered : products);

  // Convertir tous les produits en MenuProduct
  const all: MenuProduct[] = shuffled.map((product) => ({
    name: product.title,
    image: product.images.edges[0]?.node.url || '',
    description: product.description.substring(0, 50) || defaultDescription,
    price: `€${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
    handle: product.handle
  }));

  // Prendre les 4 premiers (ou tous si < 4)
  const result = all.slice(0, 4);

  // GARANTIE : si < 4 produits, dupliquer en boucle pour remplir
  while (result.length < 4) {
    const source = all[result.length % all.length];
    result.push({ ...source });
  }

  return result;
}

// Pages où le header est transparent au top
const TRANSPARENT_PAGES = ['/'];

// URLs des logos
const LOGO_WHITE = 'https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT%20blanc-Photoroom.png';
const LOGO_DARK = 'https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png';

export default function Header() {
  const { t } = useTranslation('common');
  const { locale } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

  // États
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [opticiensOpen, setOpticiensOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();

  // Helper to prefix paths with locale
  const localePath = useCallback((path: string) => {
    return locale === 'fr' ? path : `/${locale}${path}`;
  }, [locale]);

  // Check transparent pages (account for locale prefix)
  const rawPath = locale !== 'fr' && location.pathname.startsWith(`/${locale}`)
    ? location.pathname.slice(locale.length + 1) || '/'
    : location.pathname;
  const isTransparentPage = TRANSPARENT_PAGES.includes(rawPath);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  // Fond toujours blanc flou — texte et logo toujours dark
  const isTransparent = false;

  // Collections (lazy-loaded au hover)
  const [versaillesCollection, setVersaillesCollection] = useState<MenuProduct[]>([]);
  const [heritageCollection, setHeritageCollection] = useState<MenuProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const collectionsFetched = useRef(false);

  // Mobile: hide header on scroll, show on stop/scroll-up
  const [mobileHidden, setMobileHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Effet scroll (throttled via rAF)
  const scrollTicking = useRef(false);
  const handleScroll = useCallback(() => {
    if (scrollTicking.current) return;
    scrollTicking.current = true;
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      setIsMobile(window.innerWidth < 1024);

      const mobile = window.innerWidth < 1024;
      if (mobile) {
        setMobileHidden(false);
      }

      lastScrollY.current = currentY;
      scrollTicking.current = false;
    });
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [handleScroll]);

  // Charger les collections au premier hover sur un menu collection
  const fetchCollections = useCallback(async () => {
    if (collectionsFetched.current) return;
    collectionsFetched.current = true;
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
      collectionsFetched.current = false;
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Fermer le mega menu au changement de page
  useEffect(() => {
    setActiveMenu(null);
  }, [location.pathname]);

  // Bloquer le scroll quand le mega menu est ouvert
  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeMenu]);

  // Handle language change — navigate to the same page with new locale prefix
  const handleLanguageChange = useCallback((langCode: string) => {
    const newLocale = langCode.toLowerCase() as SupportedLocale;
    if (!isSupportedLocale(newLocale)) return;

    // Strip current locale prefix to get the raw path
    let currentPath = location.pathname;
    const currentLocalePrefix = SUPPORTED_LOCALES.find(
      l => l !== 'fr' && currentPath.startsWith(`/${l}/`)
    );
    if (currentLocalePrefix) {
      currentPath = currentPath.slice(currentLocalePrefix.length + 1);
    } else if (locale !== 'fr' && currentPath === `/${locale}`) {
      currentPath = '/';
    }

    // Build new path
    const newPath = newLocale === 'fr' ? (currentPath || '/') : `/${newLocale}${currentPath || '/'}`;
    navigate(newPath);
  }, [locale, location.pathname, navigate]);

  return (
    <>
      {/* Header principal */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: mobileHidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          isTransparent
            ? 'bg-white/70 backdrop-blur-xl border-b border-dark-text/[0.04]'
            : 'bg-white/95 backdrop-blur-xl border-b border-dark-text/[0.06]'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 laptop:px-14 xl:px-20">
          <div className="flex items-center justify-between h-16 sm:h-16 md:h-18 lg:h-20">

            {/* Navigation Desktop Gauche */}
            <nav className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1">
              <NavLink to={localePath('/collections/heritage')} transparent={isTransparent} onMouseEnter={() => { fetchCollections(); setActiveMenu('heritage'); }}>
                {t('nav.heritage')}
              </NavLink>
              <NavLink to={localePath('/collections/versailles')} transparent={isTransparent} onMouseEnter={() => { fetchCollections(); setActiveMenu('versailles'); }}>
                {t('nav.versailles')}
              </NavLink>
              <NavLink to={localePath('/collections/isis')} transparent={isTransparent} onMouseEnter={() => setActiveMenu('isis')}>
                {t('nav.isis')}
              </NavLink>
              <NavLink to={localePath('/shop')} transparent={isTransparent} onMouseEnter={() => setActiveMenu(null)}>{t('nav.explorer')}</NavLink>
              <NavLink to={localePath('/histoire')} transparent={isTransparent} onMouseEnter={() => setActiveMenu('histoire')}>{t('nav.histoire')}</NavLink>
            </nav>

            {/* Logo — Dual crossfade (no flicker) */}
            <div className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
              <LocaleLink to="/">
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
                    loading="eager"
                    fetchpriority="high"
                    className={`h-36 sm:h-36 md:h-40 lg:h-40 xl:h-44 w-auto object-contain transition-opacity duration-700 ${
                      isTransparent ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {/* Logo sombre (scrolled mode) — absolute overlay */}
                  <img
                    src={LOGO_DARK}
                    alt="Renaissance Paris"
                    loading="eager"
                    fetchpriority="high"
                    className={`absolute inset-0 h-36 sm:h-36 md:h-40 lg:h-40 xl:h-44 w-auto object-contain transition-opacity duration-700 ${
                      isTransparent ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                </motion.div>
              </LocaleLink>
            </div>

            {/* Navigation Desktop Droite */}
            <div className="hidden lg:flex items-center gap-3 laptop:gap-4 xl:gap-6 2xl:gap-10 flex-1 justify-end">
              <OpticianDropdown isOpen={opticiensOpen} onToggle={setOpticiensOpen} transparent={isTransparent} />
              <LanguageSelector
                isOpen={languageOpen}
                onToggle={setLanguageOpen}
                currentLang={locale.toUpperCase()}
                languages={SUPPORTED_LANGUAGES}
                onSelect={handleLanguageChange}
                transparent={isTransparent}
              />
              <IconButton onClick={() => setSearchOpen(!searchOpen)} icon="search" transparent={isTransparent} />
              <CartIcon itemCount={itemCount} transparent={isTransparent} localePath={localePath} />
              <LocaleLink
                to="/suivi-commande"
                className={`transition-colors duration-500 ${
                  isTransparent
                    ? 'text-white/90 hover:text-white/50'
                    : 'text-dark-text hover:text-dark-text/50'
                }`}
                title={t('header.orderTracking')}
              >
                <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </LocaleLink>
            </div>

            {/* Navigation Mobile — Hamburger asymétrique 2 lignes */}
            <div className="lg:hidden flex items-center gap-4">
              <CartIcon itemCount={itemCount} transparent={isTransparent} localePath={localePath} />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`relative w-6 h-5 flex flex-col justify-center items-end gap-[6px] transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 ${
                  isTransparent ? 'text-white/90' : 'text-dark-text'
                }`}
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
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
              title={t('megaMenu.versaillesTitle')}
              subtitle={t('megaMenu.versaillesSubtitle')}
              description={t('megaMenu.versaillesDescription')}
              collectionLink={localePath('/collections/versailles')}
              collectionImage="https://renaissance-cdn.b-cdn.net/campgane.png"
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
              title={t('megaMenu.heritageTitle')}
              subtitle={t('megaMenu.heritageSubtitle')}
              description={t('megaMenu.heritageDescription')}
              collectionLink={localePath('/collections/heritage')}
              collectionImage="https://renaissance-cdn.b-cdn.net/packshot%202.png"
              onClose={() => setActiveMenu(null)}
            />
          </MegaMenuWrapper>
        )}
      </AnimatePresence>

      {/* Mega Menu - Isis (Coming Soon) */}
      <AnimatePresence>
        {activeMenu === 'isis' && (
          <MegaMenuWrapper onMouseLeave={() => setActiveMenu(null)}>
            <div className="relative max-w-[1600px] mx-auto px-8 md:px-12 lg:px-16 py-10 lg:py-14 overflow-hidden">
              {/* Lignes diagonales — motif géométrique signature Isis */}
              <div className="absolute inset-0 pointer-events-none opacity-25" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 79px, rgba(255,255,255,0.015) 79px, rgba(255,255,255,0.015) 80px)',
              }} />

              {/* Grain texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: '128px 128px',
                }}
              />

              {/* Halo bronze subtil — signature Isis */}
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-bronze/[0.02] blur-[120px] pointer-events-none" />

              <motion.div
                className="flex items-center gap-12 lg:gap-16 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image avec cadrage luxe */}
                <motion.div
                  className="w-[260px] lg:w-[300px] flex-shrink-0 relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src="https://renaissance-cdn.b-cdn.net/collection%20isis%20comming%20soon.png"
                      alt="Collection Isis"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/10" />
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.25)] pointer-events-none" />
                    {/* Filet lumineux bas */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                  </div>
                </motion.div>

                {/* Contenu éditorial */}
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-sans text-[7px] tracking-[0.5em] text-bronze/30 uppercase font-medium mb-4">
                    {t('megaMenu.isisComingSoon')}
                  </p>
                  <h3 className="font-display text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.85] mb-2">
                    ISIS
                  </h3>
                  <p className="font-display text-lg lg:text-xl font-light italic text-bronze/30 tracking-[-0.02em] mb-6">
                    {t('megaMenu.isisSubtitle')}
                  </p>

                  {/* Séparateur avec point bronze */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-px bg-white/[0.08]" />
                    <div className="w-[3px] h-[3px] bg-bronze/25 rounded-full" />
                  </div>

                  <p className="font-sans text-[11.5px] text-white/20 leading-[2] font-light max-w-md mb-8">
                    {t('megaMenu.isisDescription')}
                  </p>

                  {/* Badge "Bientôt disponible" avec dot pulsant bronze */}
                  <div className="inline-flex items-center gap-3 border border-bronze/15 px-6 py-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bronze/40 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-bronze/50" />
                    </span>
                    <span className="font-sans text-[8px] tracking-[0.35em] font-medium uppercase text-white/25">
                      {t('megaMenu.availableSoon')}
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Ligne décorative bas */}
              <motion.div
                className="flex items-center mt-10 relative z-10"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'center' }}
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-white/[0.06]" />
                <div className="w-1.5 h-1.5 border border-white/[0.08] mx-4" style={{ transform: 'rotate(45deg)' }} />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/[0.06] to-white/[0.06]" />
              </motion.div>
            </div>
          </MegaMenuWrapper>
        )}
      </AnimatePresence>

      {/* Mega Menu - Histoire */}
      <AnimatePresence>
        {activeMenu === 'histoire' && (
          <MegaMenuWrapper onMouseLeave={() => setActiveMenu(null)}>
            <div className="relative max-w-[1600px] mx-auto px-8 md:px-12 lg:px-16 py-10 lg:py-14 overflow-hidden">
              {/* Grain texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: '128px 128px',
                }}
              />

              <motion.div
                className="flex items-center gap-12 lg:gap-16 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image avec cadrage luxe */}
                <motion.div
                  className="w-[260px] lg:w-[300px] flex-shrink-0 relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden group/hero">
                    <img
                      src="https://renaissance-cdn.b-cdn.net/page%20histoire.png"
                      alt={t('megaMenu.ourHistory')}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover/hero:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/10" />
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.25)] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                  </div>
                </motion.div>

                {/* Contenu éditorial */}
                <motion.div
                  className="flex-1 max-w-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-sans text-[7px] tracking-[0.5em] text-white/15 uppercase font-medium mb-4">
                    {t('megaMenu.histoireLabel')}
                  </p>
                  <h3 className="font-display text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.85] mb-2">
                    RENAISSANCE
                  </h3>
                  <p className="font-display text-lg lg:text-xl font-light italic text-white/25 tracking-[-0.02em] mb-6">
                    {t('megaMenu.histoireSubtitle')}
                  </p>

                  {/* Séparateur avec point */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-px bg-white/[0.08]" />
                    <div className="w-[3px] h-[3px] bg-white/[0.12] rounded-full" />
                  </div>

                  <p className="font-sans text-[11.5px] text-white/20 leading-[2] font-light mb-8">
                    {t('megaMenu.histoireDescription')}
                  </p>

                  <div className="flex gap-3">
                    <LocaleLink to="/histoire" onClick={() => setActiveMenu(null)}>
                      <button className="group/btn relative overflow-hidden border border-white/15 px-8 py-3.5 transition-all duration-500 hover:border-white/40">
                        <span className="relative z-10 font-sans text-[8px] tracking-[0.35em] font-medium uppercase text-white/50 group-hover/btn:text-[#0a0a0a] transition-colors duration-500">
                          {t('megaMenu.ourHistory')}
                        </span>
                        <span className="absolute inset-0 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
                      </button>
                    </LocaleLink>
                    <LocaleLink to="/savoir-faire" onClick={() => setActiveMenu(null)}>
                      <button className="group/btn relative overflow-hidden border border-white/[0.08] px-8 py-3.5 transition-all duration-500 hover:border-white/25">
                        <span className="relative z-10 font-sans text-[8px] tracking-[0.35em] font-medium uppercase text-white/30 group-hover/btn:text-[#0a0a0a] transition-colors duration-500">
                          {t('megaMenu.savoirFaire')}
                        </span>
                        <span className="absolute inset-0 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
                      </button>
                    </LocaleLink>
                  </div>
                </motion.div>
              </motion.div>

              {/* Ligne décorative bas */}
              <motion.div
                className="flex items-center mt-10 relative z-10"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'center' }}
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-white/[0.06]" />
                <div className="w-1.5 h-1.5 border border-white/[0.08] mx-4" style={{ transform: 'rotate(45deg)' }} />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/[0.06] to-white/[0.06]" />
              </motion.div>
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
          currentLang={locale.toUpperCase()}
          onLanguageChange={handleLanguageChange}
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

// Wrapper pour Mega Menu — fond noir avec bouton fermer, effet rideau, backdrop
function MegaMenuWrapper({ children, onMouseLeave }: { children: React.ReactNode; onMouseLeave: () => void }) {
  return (
    <>
      {/* Backdrop — couvre toute la page, cliquable pour fermer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm"
        onClick={onMouseLeave}
        aria-hidden="true"
      />

      {/* Menu content */}
      <motion.div
        initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
        animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
        exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-[64px] sm:top-[64px] md:top-[72px] lg:top-[80px] left-0 right-0 z-[90] bg-[#0a0a0a] border-t border-white/[0.04]"
      >
        {/* Gradient lumineux supérieur — ligne de lumière */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Bouton fermer — coin supérieur droit, plus visible */}
        <button
          onClick={onMouseLeave}
          className="absolute top-4 right-5 xl:right-8 z-20 group flex items-center gap-2.5 px-3 py-2 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.15] text-white/40 hover:text-white/80 transition-all duration-300"
          aria-label="Fermer le menu"
        >
          <span className="font-sans text-[8px] tracking-[0.3em] uppercase">
            Fermer
          </span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {children}

        {/* Ombre portée vers le bas — profondeur */}
        <div className="absolute bottom-0 left-0 right-0 h-12 translate-y-full bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      </motion.div>
    </>
  );
}

// Icône de bouton
function IconButton({ onClick, icon, transparent }: { onClick?: () => void; icon: 'search'; transparent?: boolean }) {
  const icons = {
    search: (
      <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  };

  return (
    <button
      onClick={onClick}
      aria-label={icon === 'search' ? 'Rechercher' : icon}
      className={`transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 ${
        transparent
          ? 'text-white/90 hover:text-white/50'
          : 'text-dark-text hover:text-bronze'
      }`}
    >
      {icons[icon]}
    </button>
  );
}

// Icône panier — badge carré
function CartIcon({ itemCount, transparent, localePath }: { itemCount: number; transparent?: boolean; localePath: (path: string) => string }) {
  return (
    <Link
      to={localePath('/cart')}
      aria-label={`Panier${itemCount > 0 ? ` (${itemCount} article${itemCount > 1 ? 's' : ''})` : ''}`}
      className={`relative transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 ${
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
