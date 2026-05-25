// ========================================
// PAGE COLLECTIONS
// Liste des produits groupés par modèle avec filtres par collection
// ========================================

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../contexts/LocaleContext';
import FilterSelect from '../components/FilterSelect';
import GroupedProductCard from '../components/GroupedProductCard';
import { Product } from '../components/ProductCard';
import { getProducts } from '../lib/shopify';
import { getGroupedProducts, GroupedProduct } from '../lib/productGrouping';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

function normalizeFilterValue(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function productMatchesCollection(product: Product, collectionHandle: string): boolean {
  if (collectionHandle === 'all') return true;

  const wantedCollection = normalizeFilterValue(collectionHandle);
  const collectionEdges = product.collections?.edges || [];
  const hasCollection = collectionEdges.some(({ node }) => {
    return normalizeFilterValue(node.handle) === wantedCollection ||
      normalizeFilterValue(node.title) === wantedCollection;
  });

  if (hasCollection) return true;

  const fallbackText = normalizeFilterValue([
    product.title,
    product.handle,
    ...(product.tags || []),
  ].join(' '));

  return fallbackText.includes(wantedCollection);
}

export default function CollectionsPage() {
  const { t } = useTranslation('collections');
  const { t: tc } = useTranslation('common');
  const { shopifyLanguage } = useLocale();
  const location = useLocation();
  const pathCollection = location.pathname.split('/').pop();
  const initialCollection = pathCollection && pathCollection !== 'collections' ? pathCollection : 'all';

  // Configuration des filtres
  const COLLECTIONS = [
    { label: t('filters.all'), value: 'all' },
    { label: 'Heritage', value: 'heritage' },
    { label: 'Versailles', value: 'versailles' },
    { label: 'Isis', value: 'isis' }
  ];

  const MATERIALS = [
    { label: t('filters.all'), value: 'all' },
    { label: t('filters.acetate'), value: 'acetate' },
    { label: t('filters.metal'), value: 'metal' },
    { label: t('filters.titanium'), value: 'titane' }
  ];

  const SHAPES = [
    { label: t('filters.all'), value: 'all' },
    { label: t('filters.round'), value: 'rond' },
    { label: t('filters.oval'), value: 'ovale' },
    { label: t('filters.square'), value: 'carre' },
    { label: t('filters.hexagonal'), value: 'hexagonal' },
    { label: t('filters.butterfly'), value: 'papillon' }
  ];

  // États
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<GroupedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Synchroniser avec l'URL
  useEffect(() => {
    const newPathCollection = location.pathname.split('/').pop();
    if (newPathCollection && newPathCollection !== 'collections') {
      setSelectedCollection(newPathCollection);
    }
  }, [location.pathname]);

  // Charger le catalogue une seule fois, puis filtrer localement.
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await getProducts(shopifyLanguage) as Product[];
        setProducts(fetchedProducts);
      } catch {
        setError(t('errorGeneric'));
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [shopifyLanguage, t]);

  // Filtrer et regrouper les produits
  useEffect(() => {
    let filtered = products.filter(product => productMatchesCollection(product, selectedCollection));

    // Filtrer par material via les tags
    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(product => {
        const tags = product.tags?.map(t => t.toLowerCase()) || [];
        return tags.some(tag => tag.includes(selectedMaterial.toLowerCase()));
      });
    }

    // Filtrer par shape via les tags
    if (selectedShape !== 'all') {
      filtered = filtered.filter(product => {
        const tags = product.tags?.map(t => t.toLowerCase()) || [];
        return tags.some(tag => tag.includes(selectedShape.toLowerCase()));
      });
    }

    // Regrouper par modèle
    const grouped = getGroupedProducts(filtered);
    setGroupedProducts(grouped);
  }, [products, selectedCollection, selectedMaterial, selectedShape]);

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title={t('page.seoTitle')}
        description={t('page.seoDescription')}
        url="/collections"
      />
      <section className="bg-beige pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-10 px-4 sm:px-6 md:px-8 laptop:px-12 border-b border-dark-text/[0.08]">
        <div className="max-w-[1800px] mx-auto">
          <Breadcrumb items={[
            { label: tc('breadcrumb.home'), to: '/' },
            { label: tc('breadcrumb.collections') },
          ]} />

          <div className="mt-7 max-w-3xl">
            <p className="font-sans text-[9px] tracking-[0.42em] uppercase text-bronze font-bold mb-4">
              Renaissance Paris
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-dark-text leading-[0.86] tracking-normal">
              Collections
            </h1>
            <p className="mt-5 font-sans text-sm sm:text-base text-dark-text/58 leading-[1.75]">
              Tous les modèles disponibles, avec leurs coloris, leurs prix et leurs filtres essentiels.
            </p>
          </div>
        </div>
      </section>

      {/* Barre de filtres */}
      <div className="border-b border-dark-text/[0.08] bg-beige/95 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 laptop:px-12 py-5 sm:py-6">
          <div className="flex flex-col gap-6">
            {/* En-tête avec compteur */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] font-bold text-dark-text uppercase mb-1.5 sm:mb-2">
                  {t('filters.models')}
                </p>
                <p className="font-display text-4xl sm:text-5xl laptop:text-6xl font-bold text-dark-text leading-none tracking-normal">
                  {loading ? '\u2014' : groupedProducts.length}
                </p>
              </div>
              <div className="md:hidden">
                <p className="font-sans text-[8px] tracking-[0.25em] font-bold text-dark-text/50 uppercase">
                  {COLLECTIONS.find(c => c.value === selectedCollection)?.label || t('filters.all')}
                </p>
              </div>
            </div>

            {/* Filtres */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-7">
              <div className="hidden md:block">
                <FilterSelect
                  label={t('filters.type')}
                  options={[{ label: t('filters.optical'), value: 'optical' }]}
                  value="optical"
                  onChange={() => {}}
                />
              </div>

              <FilterSelect
                label={t('filters.collection')}
                options={COLLECTIONS}
                value={selectedCollection}
                onChange={setSelectedCollection}
              />

              <FilterSelect
                label={t('filters.material')}
                options={MATERIALS}
                value={selectedMaterial}
                onChange={setSelectedMaterial}
              />

              <FilterSelect
                label={t('filters.shape')}
                options={SHAPES}
                value={selectedShape}
                onChange={setSelectedShape}
              />

              <div className="col-span-2 md:col-span-1">
                <FilterSelect
                  label={t('filters.lens')}
                  options={[{ label: t('filters.all'), value: 'all' }]}
                  value="all"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grille de produits groupés */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 laptop:px-12 py-8 sm:py-10 md:py-12 laptop:py-14">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 gap-y-14">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/9] bg-dark-text/10" />
                <div className="pt-5">
                  <div className="h-3 bg-dark-text/10 w-16 mb-3" />
                  <div className="h-7 bg-dark-text/10 w-44 mb-4" />
                  <div className="h-4 bg-dark-text/10 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="font-sans text-bronze text-sm tracking-wider uppercase mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-sans text-xs tracking-widest uppercase bg-dark-text text-white px-6 py-3 hover:bg-bronze transition-colors"
            >
              {t('retry')}
            </button>
          </div>
        ) : groupedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 gap-y-16">
            {groupedProducts.map((groupedProduct, index) => (
              <GroupedProductCard
                key={groupedProduct.modelName}
                groupedProduct={groupedProduct}
                index={index}
                showNewBadge={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="font-sans text-dark-text/40 text-sm tracking-wider uppercase">
              {t('filters.noResults')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
