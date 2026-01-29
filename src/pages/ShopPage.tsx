// ========================================
// PAGE BOUTIQUE
// Liste des produits groupés par modèle avec filtres
// ========================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductsByCollection } from '../lib/shopify';
import { getGroupedProducts, GroupedProduct } from '../lib/productGrouping';
import FilterSelect from '../components/FilterSelect';
import GroupedProductCard from '../components/GroupedProductCard';
import { Product } from '../components/ProductCard';
import SEO from '../components/SEO';

// Fonction helper pour vérifier si un produit appartient à une collection
function productBelongsToCollection(product: Product, collectionHandle: string): boolean {
  if (!product.collections?.edges) return false;
  return product.collections.edges.some(
    edge => edge.node.handle.toLowerCase() === collectionHandle.toLowerCase()
  );
}

// Fonction helper pour vérifier le type de produit (Optical/Solaire)
function productMatchesType(product: Product, type: string): boolean {
  if (type === 'all') return true;
  if (type === 'sun' || type === 'solaire') {
    return product.tags?.some(tag =>
      tag.toLowerCase() === 'solaire' || tag.toLowerCase() === 'sun'
    ) || false;
  }
  if (type === 'optical' || type === 'optique') {
    const isSolaire = product.tags?.some(tag =>
      tag.toLowerCase() === 'solaire' || tag.toLowerCase() === 'sun'
    );
    return !isSolaire;
  }
  return true;
}

export default function ShopPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<GroupedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [hideFilters, setHideFilters] = useState(false);
  const lastScrollYRef = useRef(0);
  const ticking = useRef(false);

  // Scroll vers le haut au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Gérer le masquage des filtres au scroll
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 200) {
        setHideFilters(true);
      } else if (currentScrollY < lastScrollYRef.current) {
        setHideFilters(false);
      }
      lastScrollYRef.current = currentScrollY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Charger les produits depuis Shopify
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProductsByCollection('solaires');
        setProducts(data);
      } catch (err) {
        setError('Impossible de charger la collection');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filtrer et regrouper les produits
  useEffect(() => {
    // D'abord filtrer les produits
    const filteredProducts = products.filter(product => {
      if (!productMatchesType(product, selectedType)) return false;
      if (selectedCollection !== 'all') {
        if (!productBelongsToCollection(product, selectedCollection)) return false;
      }
      if (selectedMaterial !== 'all') {
        const hasMaterial = product.tags?.some(tag =>
          tag.toLowerCase().includes(selectedMaterial.toLowerCase())
        );
        if (!hasMaterial) return false;
      }
      return true;
    });

    // Ensuite regrouper par modèle
    const grouped = getGroupedProducts(filteredProducts);
    setGroupedProducts(grouped);
  }, [products, selectedType, selectedCollection, selectedMaterial]);

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-dark-text mb-6"></div>
          <p className="font-sans text-dark-text/60 text-sm tracking-wider uppercase">
            Chargement de la collection...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center pt-20">
        <div className="text-center max-w-md px-8">
          <p className="font-sans text-dark-text text-sm tracking-wider uppercase mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="font-sans text-xs tracking-wider uppercase border border-dark-text px-6 py-3 hover:bg-dark-text hover:text-white transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title="Boutique - Toutes nos lunettes"
        description="Explorez toute la collection RENAISSANCE Paris. Lunettes de vue et solaires de luxe, fabriquées artisanalement en France. Trouvez la monture qui vous correspond."
        url="/shop"
      />

      {/* HERO */}
      <div className="h-screen relative overflow-hidden">
        {/* DESKTOP — Split éditorial */}
        <div className="relative h-full overflow-hidden hidden lg:flex">
          {/* Left Panel — Content */}
          <div className="w-[42%] bg-[#000000] relative flex flex-col justify-center px-12 xl:px-20 2xl:px-28">
            {/* Top label */}
            <div className="absolute top-10 left-12 xl:left-20 2xl:left-28">
              <p className="font-sans text-white/25 text-[9px] tracking-[0.4em] font-medium uppercase">
                Boutique
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <h1 className="font-display text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 tracking-[-0.03em] leading-[0.9]">
                NOS CRÉATIONS.
              </h1>
              <p className="font-display text-2xl xl:text-3xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 xl:mb-10">
                Chaque pièce a une histoire.
              </p>

              <div className="w-12 h-px bg-white/15 mb-8 xl:mb-10" />

              <p className="font-sans text-white/35 text-[13px] xl:text-sm leading-[1.9] font-light max-w-md mb-10 xl:mb-12">
                Collections, hors-série et pièces uniques. Un seul geste : celui qui refuse l'oubli.
              </p>

              <button
                onClick={() => {
                  const section = document.querySelector('[data-products-section]');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  Explorer
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </motion.div>

            {/* Bottom scroll indicator */}
            <div className="absolute bottom-10 left-12 xl:left-20 2xl:left-28 flex items-center gap-3">
              <div className="w-8 h-px bg-white/15" />
              <span className="font-sans text-white/15 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            </div>
          </div>

          {/* Right Panel — Image */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="https://renaissance-cdn.b-cdn.net/page%20histoire.png"
              alt="Renaissance Paris - Boutique"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000000] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000000]/20 to-transparent" />
          </div>
        </div>

        {/* MOBILE */}
        <div className="relative h-full overflow-hidden lg:hidden bg-[#000000]">
          {/* Image — plein écran */}
          <div className="absolute inset-0">
            <img
              src="https://renaissance-cdn.b-cdn.net/page%20histoire.png"
              alt="Renaissance Paris - Boutique"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-b from-transparent to-[#000000]" />
          </div>

          {/* Label top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-24 left-6 z-10"
          >
            <p className="text-white/50 text-[9px] tracking-[0.3em] uppercase font-sans font-medium">
              Boutique
            </p>
          </motion.div>

          {/* Content — bas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 px-6 pb-8 z-10"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-1 tracking-[-0.03em] leading-[0.9]">
              NOS CRÉATIONS.
            </h1>
            <p className="font-display text-lg font-light italic text-white/50 tracking-[-0.02em] mb-5">
              Chaque pièce a une histoire.
            </p>
            <button
              onClick={() => {
                const section = document.querySelector('[data-products-section]');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden w-full border border-white/20 px-8 py-4 transition-all duration-500 hover:border-bronze/60 active:scale-[0.98]"
            >
              <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                Explorer
              </span>
              <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Barre de filtres */}
      <div
        className="border-b border-dark-text/10 bg-white sticky top-16 sm:top-20 z-30 shadow-sm"
        data-products-section
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 laptop:px-12 py-4 sm:py-6 laptop:py-8">
          <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-6 laptop:gap-8 xl:gap-12">
            {/* Compteur de résultats */}
            <div className="col-span-6 sm:col-span-4 md:col-span-2 flex flex-col justify-end">
              <p className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-dark-text uppercase mb-2 sm:mb-3">
                # MODÈLES
              </p>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl laptop:text-5xl font-bold text-dark-text leading-none">
                {groupedProducts.length}
              </p>
            </div>

            {/* Filtres */}
            <div className="col-span-6 sm:col-span-4 md:col-span-2">
              <FilterSelect
                label="TYPE"
                options={[
                  { label: 'Tous', value: 'all' },
                  { label: 'Optique', value: 'optical' },
                  { label: 'Solaire', value: 'sun' }
                ]}
                value={selectedType}
                onChange={setSelectedType}
              />
            </div>

            <div className="col-span-6 sm:col-span-4 md:col-span-2">
              <FilterSelect
                label="COLLECTION"
                options={[
                  { label: 'Toutes', value: 'all' },
                  { label: 'Héritage', value: 'heritage' },
                  { label: 'Versailles', value: 'versailles' },
                  { label: 'Isis', value: 'isis' }
                ]}
                value={selectedCollection}
                onChange={setSelectedCollection}
              />
            </div>

            <div className="col-span-6 sm:col-span-4 md:col-span-2">
              <FilterSelect
                label="MATÉRIAU"
                options={[
                  { label: 'Tous', value: 'all' },
                  { label: 'Acétate', value: 'acetate' },
                  { label: 'Métal', value: 'metal' },
                  { label: 'Titane', value: 'titanium' }
                ]}
                value={selectedMaterial}
                onChange={setSelectedMaterial}
              />
            </div>

            <div className="col-span-6 sm:col-span-4 md:col-span-2 hidden md:block">
              <FilterSelect
                label="FORME"
                options={[
                  { label: 'Toutes', value: 'all' },
                  { label: 'Rond', value: 'round' },
                  { label: 'Ovale', value: 'oval' },
                  { label: 'Carré', value: 'square' }
                ]}
                value="all"
                onChange={() => {}}
              />
            </div>

            <div className="col-span-6 sm:col-span-4 md:col-span-2 hidden md:block">
              <FilterSelect
                label="VERRE"
                options={[{ label: 'Tous', value: 'all' }]}
                value="all"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grille de produits groupés */}
      <div className="max-w-[1800px] mx-auto px-8 laptop:px-12 py-10 laptop:py-12">
        {groupedProducts.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-sans text-dark-text/40 text-sm tracking-wider uppercase">
              Aucun produit disponible pour le moment
            </p>
            <p className="font-sans text-xs text-dark-text/30 mt-4">
              Notre collection arrive bientôt
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6 md:gap-4">
            {groupedProducts.map((groupedProduct, index) => (
              <GroupedProductCard
                key={groupedProduct.modelName}
                groupedProduct={groupedProduct}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section CTA */}
      <section className="py-20 px-8 border-t border-dark-text/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl laptop:text-4xl font-light text-dark-text mb-6">
              Une création sur mesure ?
            </h2>
            <p className="font-sans text-sm text-dark-text/60 mb-10 leading-relaxed">
              Nous proposons un service de personnalisation pour créer la monture qui vous ressemble.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="group inline-block relative overflow-hidden"
            >
              <span className="relative z-10 block border border-dark-text px-10 py-4 font-sans text-[10px] tracking-[0.3em] uppercase text-dark-text transition-colors duration-300 group-hover:text-white">
                Nous contacter
              </span>
              <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
