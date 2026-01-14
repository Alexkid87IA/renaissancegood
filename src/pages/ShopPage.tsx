// ========================================
// PAGE BOUTIQUE
// Liste des produits groupés par modèle avec filtres
// ========================================

import { useState, useEffect } from 'react';
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
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll vers le haut au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Gérer le masquage des filtres au scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHideFilters(true);
      } else if (currentScrollY < lastScrollY) {
        setHideFilters(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      {/* Barre de filtres sticky */}
      <motion.div
        className="border-b border-dark-text/10 bg-white sticky top-16 sm:top-20 z-30 shadow-sm"
        initial={{ y: 0 }}
        animate={{ y: hideFilters ? -200 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
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
      </motion.div>

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
