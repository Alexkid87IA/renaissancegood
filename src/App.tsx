import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileWarning from './components/MobileWarning';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import HeritageCollectionPage from './pages/HeritageCollectionPage';
import VersaillesCollectionPage from './pages/VersaillesCollectionPage';
import ProductPage from './pages/ProductPage';
import HistoirePage from './pages/HistoirePage';
import CartPage from './pages/CartPage';

function AppContent() {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');

  return (
    <>
      <MobileWarning />
      <div className="relative bg-beige">
        <Header />
        <main className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/heritage" element={<HeritageCollectionPage />} />
            <Route path="/collections/versailles" element={<VersaillesCollectionPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/histoire" element={<HistoirePage />} />
            <Route path="/cart" element={<CartPage />} />
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
      <AppContent />
    </Router>
  );
}

export default App;
