import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';

// Lazy load all pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
const HeritageCollectionPage = lazy(() => import('./pages/HeritageCollectionPage'));
const VersaillesCollectionPage = lazy(() => import('./pages/VersaillesCollectionPage'));
const IsisCollectionPage = lazy(() => import('./pages/IsisCollectionPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const HistoirePage = lazy(() => import('./pages/HistoirePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const StoreLocatorPage = lazy(() => import('./pages/StoreLocatorPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const CheckoutConfirmationPage = lazy(() => import('./pages/CheckoutConfirmationPage'));

// Pages légales et service client (lazy loaded)
const ConfidentialitePage = lazy(() => import('./pages/ConfidentialitePage'));
const RemboursementPage = lazy(() => import('./pages/RemboursementPage'));
const ExpeditionPage = lazy(() => import('./pages/ExpeditionPage'));
const ConditionsUtilisationPage = lazy(() => import('./pages/ConditionsUtilisationPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const CGVPage = lazy(() => import('./pages/CGVPage'));
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GarantiePage = lazy(() => import('./pages/GarantiePage'));
const GuideTaillesPage = lazy(() => import('./pages/GuideTaillesPage'));
const SuiviCommandePage = lazy(() => import('./pages/SuiviCommandePage'));
const ManifestePage = lazy(() => import('./pages/ManifestePage'));
const SavoirFairePage = lazy(() => import('./pages/SavoirFairePage'));
const SymbolesPage = lazy(() => import('./pages/SymbolesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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

function AppContent() {
  const location = useLocation();
  const isCheckout = location.pathname.startsWith('/checkout');

  return (
    <>
      <div className="relative bg-beige">
        {!isCheckout && <Header />}
        <main className="relative">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Pages principales */}
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/heritage" element={<HeritageCollectionPage />} />
              <Route path="/collections/versailles" element={<VersaillesCollectionPage />} />
              <Route path="/collections/isis" element={<IsisCollectionPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/histoire" element={<HistoirePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/confirmation" element={<CheckoutConfirmationPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:handle" element={<BlogArticlePage />} />
              <Route path="/opticiens" element={<StoreLocatorPage />} />
              <Route path="/store-locator" element={<StoreLocatorPage />} />

              {/* Pages service client */}
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/garantie" element={<GarantiePage />} />
              <Route path="/guide-tailles" element={<GuideTaillesPage />} />
              <Route path="/livraison" element={<ExpeditionPage />} />
              <Route path="/suivi-commande" element={<SuiviCommandePage />} />

              {/* Pages magazine/histoire */}
              <Route path="/manifeste" element={<ManifestePage />} />
              <Route path="/manifesto" element={<ManifestePage />} />
              <Route path="/savoir-faire" element={<SavoirFairePage />} />
              <Route path="/symboles" element={<SymbolesPage />} />

              {/* Pages légales */}
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
              <Route path="/confidentialite" element={<ConfidentialitePage />} />
              <Route path="/cgv" element={<CGVPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/remboursement" element={<RemboursementPage />} />
              <Route path="/expedition" element={<ExpeditionPage />} />
              <Route path="/conditions-utilisation" element={<ConditionsUtilisationPage />} />

              {/* 404 - Catch all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        {!isCheckout && (
          <div className="relative z-10">
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <CartProvider>
          <AppContent />
          <CartDrawer />
          <CookieBanner />
        </CartProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
