import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import HeritageCollectionPage from './pages/HeritageCollectionPage';
import VersaillesCollectionPage from './pages/VersaillesCollectionPage';
import ProductPage from './pages/ProductPage';
import HistoirePage from './pages/HistoirePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ShopPage from './pages/ShopPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';
import StoreLocatorPage from './pages/StoreLocatorPage';

// Pages légales et service client
import ConfidentialitePage from './pages/ConfidentialitePage';
import RemboursementPage from './pages/RemboursementPage';
import ExpeditionPage from './pages/ExpeditionPage';
import ConditionsUtilisationPage from './pages/ConditionsUtilisationPage';
import CookiesPage from './pages/CookiesPage';
import CGVPage from './pages/CGVPage';
import MentionsLegalesPage from './pages/MentionsLegalesPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import GarantiePage from './pages/GarantiePage';
import GuideTaillesPage from './pages/GuideTaillesPage';
import ManifestePage from './pages/ManifestePage';
import SavoirFairePage from './pages/SavoirFairePage';
import SymbolesPage from './pages/SymbolesPage';

function AppContent() {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');

  return (
    <>
      <div className="relative bg-beige">
        <Header />
        <main className="relative">
          <Routes>
            {/* Pages principales */}
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/heritage" element={<HeritageCollectionPage />} />
            <Route path="/collections/versailles" element={<VersaillesCollectionPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/histoire" element={<HistoirePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
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
          </Routes>
        </main>
        <div className={`relative z-10 ${isProductPage ? 'ml-0 lg:ml-[340px] laptop:ml-[380px] xl:ml-[480px]' : ''}`}>
          <Footer />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <AppContent />
        <CartDrawer />
      </CartProvider>
    </Router>
  );
}

export default App;