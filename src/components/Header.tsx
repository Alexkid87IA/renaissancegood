// ========================================
// COMPOSANT HEADER PRINCIPAL
// Navigation principale du site Renaissance
//
// Perf principles:
// - Aucun backdrop-blur (solide bg-beige → 0 recalc paint/compose sur scroll)
// - Aucun delayed motion sur le logo (apparition immédiate)
// - transitions ciblées (pas de `transition-all`)
// - Logo 144-176px déborde du header (pattern maison luxe : Hermès, Dior)
//
// Design principles:
// - Bande éditoriale unique : nav left | wordmark center | actions right
// - NavLink avec underline bronze signature (hover + route active)
// - Header fixe h-16/h-20/h-24, logo réduit au scroll (h-44 → h-36)
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
import MegaMenu, { type MenuProduct } from './header/MegaMenu';
import MobileMenu from './header/MobileMenu';
import SearchOverlay from './header/SearchOverlay';
import LanguageSelector, { SUPPORTED_LANGUAGES } from './header/LanguageSelector';
import OpticianDropdown from './header/OpticianDropdown';
import { formatProducts } from './header/headerUtils';

type ActiveMenu = 'heritage' | 'versailles' | 'isis' | 'histoire' | null;

// URL logo (wordmark noir sur fond clair)
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

  // Strip locale prefix pour matcher les routes actives
  const rawPath = locale !== 'fr' && location.pathname.startsWith(`/${locale}`)
    ? location.pathname.slice(locale.length + 1) || '/'
    : location.pathname;

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  // Collections (lazy-loaded au hover)
  const [versaillesCollection, setVersaillesCollection] = useState<MenuProduct[]>([]);
  const [heritageCollection, setHeritageCollection] = useState<MenuProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const collectionsFetched = useRef(false);

  // Hover intent — ref déclaré ici, handlers après fetchCollections
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

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

  // Hover intent — handlers pour ouverture/fermeture douce du mega menu
  const handleMenuEnter = useCallback((menu: ActiveMenu) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (menu === 'heritage' || menu === 'versailles') fetchCollections();
    setActiveMenu(menu);
  }, [fetchCollections]);

  const handleMenuLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  }, []);

  const handleMenuContentEnter = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, []);

  // Fermer le mega menu au changement de page + cleanup timeout
  useEffect(() => {
    setActiveMenu(null);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
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
      {/* Header principal — solid bg beige, no backdrop-blur, no heavy transitions */}
      <motion.header
        initial={false}
        animate={{ y: mobileHidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] bg-beige border-b border-dark-text/[0.08]"
        data-scrolled={scrolled ? 'true' : 'false'}
      >
        {/* Filet bronze top — fine ligne éditoriale signature */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent pointer-events-none" />

        <div className="max-w-[1920px] mx-auto px-5 sm:px-7 md:px-10 lg:px-14 xl:px-20">
          {/* Hauteur fixe du header — le logo (144-176px) déborde
              volontairement au-dessus/dessous : pattern maison luxe classique
              (Hermès, Dior). Le container reste fin, le wordmark respire. */}
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">

            {/* Navigation Desktop Gauche */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-9 2xl:gap-12 flex-1" onMouseLeave={handleMenuLeave}>
              <NavLink to={localePath('/collections/heritage')} rawPath={rawPath} routeMatch="/collections/heritage" onMouseEnter={() => handleMenuEnter('heritage')}>
                {t('nav.heritage')}
              </NavLink>
              <NavLink to={localePath('/collections/versailles')} rawPath={rawPath} routeMatch="/collections/versailles" onMouseEnter={() => handleMenuEnter('versailles')}>
                {t('nav.versailles')}
              </NavLink>
              <NavLink to={localePath('/collections/isis')} rawPath={rawPath} routeMatch="/collections/isis" onMouseEnter={() => handleMenuEnter('isis')}>
                {t('nav.isis')}
              </NavLink>
              <NavLink to={localePath('/shop')} rawPath={rawPath} routeMatch="/shop" onMouseEnter={() => handleMenuEnter(null)}>
                {t('nav.explorer')}
              </NavLink>
              <NavLink to={localePath('/histoire')} rawPath={rawPath} routeMatch="/histoire" onMouseEnter={() => handleMenuEnter('histoire')}>
                {t('nav.histoire')}
              </NavLink>
            </nav>

            {/* Wordmark — taille originale (h-36 → h-44 = 144-176px).
                Déborde du header intentionnellement — le PNG transparent
                laisse voir le contenu en dessous. Au scroll, on réduit
                légèrement pour rester discret. */}
            <LocaleLink
              to="/"
              className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 lg:mx-8 group/logo"
              aria-label="Renaissance Paris"
            >
              <img
                src={LOGO_DARK}
                alt="Renaissance Paris"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className={`w-auto object-contain transition-[height,opacity] duration-500 ease-out group-hover/logo:opacity-75 ${
                  scrolled
                    ? 'h-28 md:h-32 lg:h-32 xl:h-36'
                    : 'h-36 md:h-40 lg:h-40 xl:h-44'
                }`}
              />
            </LocaleLink>

            {/* Navigation Desktop Droite */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-9 flex-1 justify-end">
              <OpticianDropdown isOpen={opticiensOpen} onToggle={setOpticiensOpen} />
              <LanguageSelector
                isOpen={languageOpen}
                onToggle={setLanguageOpen}
                currentLang={locale.toUpperCase()}
                languages={SUPPORTED_LANGUAGES}
                onSelect={handleLanguageChange}
              />

              {/* Séparateur fin vertical entre meta-nav et action icons */}
              <div className="w-px h-4 bg-dark-text/15" aria-hidden="true" />

              <IconButton onClick={() => setSearchOpen(!searchOpen)} icon="search" />
              <CartIcon itemCount={itemCount} localePath={localePath} />
              <LocaleLink
                to="/suivi-commande"
                className="text-dark-text/80 hover:text-bronze transition-colors duration-300"
                title={t('header.orderTracking')}
                aria-label={t('header.orderTracking')}
              >
                <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </LocaleLink>
            </div>

            {/* Navigation Mobile — Hamburger asymétrique 2 lignes */}
            <div className="lg:hidden flex items-center gap-5">
              <CartIcon itemCount={itemCount} localePath={localePath} />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-6 h-5 flex flex-col justify-center items-end gap-[6px] text-dark-text focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2"
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
          <MegaMenuWrapper onMouseLeave={handleMenuLeave} onMouseEnter={handleMenuContentEnter}>
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
          <MegaMenuWrapper onMouseLeave={handleMenuLeave} onMouseEnter={handleMenuContentEnter}>
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
          <MegaMenuWrapper onMouseLeave={handleMenuLeave} onMouseEnter={handleMenuContentEnter}>
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
          <MegaMenuWrapper onMouseLeave={handleMenuLeave} onMouseEnter={handleMenuContentEnter}>
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

// Lien de navigation avec underline bronze animé + indicateur de route active
// - Au hover : underline bronze glisse de left à right (width 0 → 100%)
// - Sur la route active : underline permanent (pas de hover requis) + couleur bronze
function NavLink({
  to,
  children,
  onMouseEnter,
  rawPath,
  routeMatch,
}: {
  to: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  rawPath: string;
  routeMatch: string;
}) {
  const isActive = rawPath === routeMatch || rawPath.startsWith(routeMatch + '/');

  return (
    <Link
      to={to}
      onMouseEnter={onMouseEnter}
      className={`group relative font-sans text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.32em] font-medium uppercase pb-1 transition-colors duration-300 ${
        isActive ? 'text-bronze' : 'text-dark-text hover:text-bronze'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
      {/* Underline — active: w-full permanent, hover: 0 → 100% */}
      <span
        className={`absolute bottom-0 left-0 h-[1.5px] bg-bronze origin-left transition-[transform,width] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
}

// Wrapper pour Mega Menu — fond noir avec bouton fermer, effet rideau, backdrop
function MegaMenuWrapper({ children, onMouseLeave, onMouseEnter }: { children: React.ReactNode; onMouseLeave: () => void; onMouseEnter?: () => void }) {
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
        className="fixed top-16 md:top-20 lg:top-24 left-0 right-0 z-[90] bg-[#0a0a0a] border-t border-white/[0.04]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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

// Icône de bouton générique (recherche, etc.)
function IconButton({ onClick, icon }: { onClick?: () => void; icon: 'search' }) {
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
      className="text-dark-text hover:text-bronze transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2"
    >
      {icons[icon]}
    </button>
  );
}

// Icône panier — badge bronze carré, compteur items
function CartIcon({ itemCount, localePath }: { itemCount: number; localePath: (path: string) => string }) {
  return (
    <Link
      to={localePath('/cart')}
      aria-label={`Panier${itemCount > 0 ? ` (${itemCount} article${itemCount > 1 ? 's' : ''})` : ''}`}
      className="relative text-dark-text hover:text-bronze transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2"
    >
      <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2.5 bg-bronze text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center tabular-nums">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
