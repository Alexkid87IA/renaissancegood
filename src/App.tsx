import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './contexts/CartContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { isSupportedLocale, LOCALE_TO_SHOPIFY } from './lib/i18n';
import type { SupportedLocale } from './lib/i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CookieBanner from './components/CookieBanner';
import NewsletterPopup from './components/NewsletterPopup';
import ScrollToTop from './components/ScrollToTop';
import NavigationProgress from './components/NavigationProgress';
import LangLayout from './components/LangLayout';
import ErrorBoundary from './components/ErrorBoundary';

// Auto-reload on stale chunk after deployment
// Forces a cache-busting reload by appending a timestamp query param
function lazyWithRetry(importFn: () => Promise<any>) {
  return lazy(() =>
    importFn().catch(() => {
      const key = '_reload_stale';
      const retryCount = Number(sessionStorage.getItem(key) || '0');
      if (retryCount < 2) {
        sessionStorage.setItem(key, String(retryCount + 1));
        // Force cache-busting by adding a unique query param
        const url = window.location.href.split('?')[0];
        window.location.href = `${url}?_r=${Date.now()}`;
        return new Promise(() => {});
      }
      sessionStorage.removeItem(key);
      throw new Error('Failed to load page after retries');
    })
  );
}

// Lazy load all pages for code splitting
const HomePage = lazyWithRetry(() => import('./pages/HomePage'));
const CollectionsPage = lazyWithRetry(() => import('./pages/CollectionsPage'));
const HeritageCollectionPage = lazyWithRetry(() => import('./pages/HeritageCollectionPage'));
const VersaillesCollectionPage = lazyWithRetry(() => import('./pages/VersaillesCollectionPage'));
const IsisCollectionPage = lazyWithRetry(() => import('./pages/IsisCollectionPage'));
const ProductPage = lazyWithRetry(() => import('./pages/ProductPage'));
const HistoirePage = lazyWithRetry(() => import('./pages/HistoirePage'));
const CartPage = lazyWithRetry(() => import('./pages/CartPage'));
const ShopPage = lazyWithRetry(() => import('./pages/ShopPage'));
const BlogPage = lazyWithRetry(() => import('./pages/BlogPage'));
const BlogArticlePage = lazyWithRetry(() => import('./pages/BlogArticlePage'));
const StoreLocatorPage = lazyWithRetry(() => import('./pages/StoreLocatorPage'));
const CheckoutPage = lazyWithRetry(() => import('./pages/CheckoutPage'));
const CheckoutConfirmationPage = lazyWithRetry(() => import('./pages/CheckoutConfirmationPage'));

// Pages légales et service client (lazy loaded)
const ConfidentialitePage = lazyWithRetry(() => import('./pages/ConfidentialitePage'));
const RemboursementPage = lazyWithRetry(() => import('./pages/RemboursementPage'));
const ExpeditionPage = lazyWithRetry(() => import('./pages/ExpeditionPage'));
const ConditionsUtilisationPage = lazyWithRetry(() => import('./pages/ConditionsUtilisationPage'));
const CookiesPage = lazyWithRetry(() => import('./pages/CookiesPage'));
const CGVPage = lazyWithRetry(() => import('./pages/CGVPage'));
const MentionsLegalesPage = lazyWithRetry(() => import('./pages/MentionsLegalesPage'));
const FAQPage = lazyWithRetry(() => import('./pages/FAQPage'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const GarantiePage = lazyWithRetry(() => import('./pages/GarantiePage'));
const GuideTaillesPage = lazyWithRetry(() => import('./pages/GuideTaillesPage'));
const SuiviCommandePage = lazyWithRetry(() => import('./pages/SuiviCommandePage'));
const ManifestePage = lazyWithRetry(() => import('./pages/ManifestePage'));
const SavoirFairePage = lazyWithRetry(() => import('./pages/SavoirFairePage'));
const SymbolesPage = lazyWithRetry(() => import('./pages/SymbolesPage'));
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage'));

// Loading component for Suspense
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin mx-auto mb-4" />
        <p className="font-sans text-xs tracking-[0.2em] text-dark-text/50 uppercase">Chargement</p>
      </div>
    </div>
  );
}

// All application routes (shared between prefixed and non-prefixed)
function AppRoutes() {
  return (
    <>
      {/* Pages principales */}
      <Route index element={<HomePage />} />
      <Route path="collections" element={<CollectionsPage />} />
      <Route path="collections/heritage" element={<HeritageCollectionPage />} />
      <Route path="collections/versailles" element={<VersaillesCollectionPage />} />
      <Route path="collections/isis" element={<IsisCollectionPage />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="histoire" element={<HistoirePage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="checkout/confirmation" element={<CheckoutConfirmationPage />} />
      <Route path="shop" element={<ShopPage />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="blog/:handle" element={<BlogArticlePage />} />
      <Route path="opticiens" element={<StoreLocatorPage />} />
      <Route path="store-locator" element={<StoreLocatorPage />} />

      {/* Pages service client */}
      <Route path="faq" element={<FAQPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="garantie" element={<GarantiePage />} />
      <Route path="guide-tailles" element={<GuideTaillesPage />} />
      <Route path="livraison" element={<ExpeditionPage />} />  {/* canonical: /livraison */}
      <Route path="suivi-commande" element={<SuiviCommandePage />} />

      {/* Pages magazine/histoire */}
      <Route path="manifeste" element={<ManifestePage />} />
      <Route path="manifesto" element={<ManifestePage />} />
      <Route path="savoir-faire" element={<SavoirFairePage />} />
      <Route path="symboles" element={<SymbolesPage />} />

      {/* Pages légales */}
      <Route path="mentions-legales" element={<MentionsLegalesPage />} />
      <Route path="confidentialite" element={<ConfidentialitePage />} />
      <Route path="cgv" element={<CGVPage />} />
      <Route path="cookies" element={<CookiesPage />} />
      <Route path="remboursement" element={<RemboursementPage />} />
      {/* /expedition redirects handled by /livraison route above */}
      <Route path="conditions-utilisation" element={<ConditionsUtilisationPage />} />

      {/* 404 - Catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const { i18n } = useTranslation();

  // Clear stale-reload flag on successful load
  useEffect(() => {
    sessionStorage.removeItem('_reload_stale');
  }, []);

  // Check for checkout path with or without lang prefix
  const pathParts = location.pathname.split('/').filter(Boolean);
  const isCheckout = pathParts.includes('checkout');

  // Derive locale from URL so Header/Footer (outside Routes) get the correct locale
  const locale: SupportedLocale = useMemo(() => {
    const firstSegment = pathParts[0];
    if (firstSegment && isSupportedLocale(firstSegment)) return firstSegment;
    return 'fr';
  }, [location.pathname]);

  // Keep i18n in sync at top level
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  const topLevelLocale = useMemo(() => ({
    locale,
    shopifyLanguage: LOCALE_TO_SHOPIFY[locale],
  }), [locale]);

  return (
    <LocaleProvider value={topLevelLocale}>
      <div className="relative bg-beige">
        {/* Skip navigation link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-dark-text focus:text-white focus:px-6 focus:py-3 focus:font-sans focus:text-sm focus:tracking-wide"
        >
          Aller au contenu principal
        </a>
        {!isCheckout && <Header />}
        <main id="main-content" className="relative">
          <ErrorBoundary fallbackLevel="page">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Non-prefixed routes (French default) */}
                <Route element={<LangLayout />}>
                  {AppRoutes()}
                </Route>

                {/* Language-prefixed routes */}
                <Route path=":lang" element={<LangLayout />}>
                  {AppRoutes()}
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        {!isCheckout && (
          <div className="relative z-10">
            <Footer />
          </div>
        )}
      </div>
      <NewsletterPopup />
    </LocaleProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <NavigationProgress />
          <CartProvider>
            <AppContent />
            <CartDrawer />
            <CookieBanner />
          </CartProvider>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
