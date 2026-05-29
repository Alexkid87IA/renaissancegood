// ========================================
// COMPOSANT SEARCH OVERLAY
// Barre de recherche avec filtres
// ========================================

import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import { resizeShopifyImage } from '../../lib/imageUtils';
import { getProducts } from '../../lib/shopify';
import type { Product } from '../ProductCard';
import LocaleLink from '../LocaleLink';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FilterOption {
  label: string;
  value: string;
}

let productPagePreloaded = false;

function preloadProductPage() {
  if (productPagePreloaded) return;
  productPagePreloaded = true;
  void import('../../pages/ProductPage');
}

function normalizeFilterValue(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function productMatchesCollection(product: Product, collectionValue: string): boolean {
  if (collectionValue === 'all') return true;

  const wantedCollection = normalizeFilterValue(collectionValue);
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

function productMatchesAttribute(product: Product, attributeValue: string): boolean {
  if (attributeValue === 'all') return true;

  const wantedAttribute = normalizeFilterValue(attributeValue);
  const productText = normalizeFilterValue([
    product.title,
    product.handle,
    product.description,
    ...(product.tags || []),
  ].join(' '));

  return productText.includes(wantedAttribute);
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const { t } = useTranslation('common');
  const { shopifyLanguage } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const collectionOptions: FilterOption[] = [
    { label: t('search.all'), value: 'all' },
    { label: 'Heritage', value: 'heritage' },
    { label: 'Versailles', value: 'versailles' },
    { label: 'Isis', value: 'isis' },
  ];

  const materialOptions: FilterOption[] = [
    { label: t('search.all'), value: 'all' },
    { label: t('search.acetate'), value: 'acetate' },
    { label: t('search.metal'), value: 'metal' },
    { label: t('search.titanium'), value: 'titane' },
  ];

  const shapeOptions: FilterOption[] = [
    { label: t('search.all'), value: 'all' },
    { label: t('search.round'), value: 'rond' },
    { label: t('search.oval'), value: 'ovale' },
    { label: t('search.square'), value: 'carre' },
    { label: t('search.hexagonal'), value: 'hexagonal' },
    { label: t('search.butterfly'), value: 'papillon' },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const focusHandle = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(focusHandle);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || products.length > 0) return;

    let cancelled = false;
    async function loadSearchProducts() {
      try {
        setLoading(true);
        setLoadError(false);
        const data = await getProducts(shopifyLanguage);
        if (!cancelled) setProducts(data as Product[]);
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadSearchProducts();
    return () => {
      cancelled = true;
    };
  }, [isOpen, products.length, shopifyLanguage]);

  const normalizedQuery = normalizeFilterValue(query.trim());
  const searchResults = useMemo(() => {
    const candidates = products.filter((product) => {
      if (!productMatchesCollection(product, selectedCollection)) return false;
      if (!productMatchesAttribute(product, selectedMaterial)) return false;
      if (!productMatchesAttribute(product, selectedShape)) return false;
      if (!normalizedQuery) return true;

      const haystack = normalizeFilterValue([
        product.title,
        product.handle,
        product.description,
        ...(product.tags || []),
        ...(product.collections?.edges?.map((edge) => edge.node.title) || []),
      ].join(' '));

      return haystack.includes(normalizedQuery);
    });

    return candidates.slice(0, normalizedQuery ? 6 : 4);
  }, [normalizedQuery, products, selectedCollection, selectedMaterial, selectedShape]);

  const handleClose = () => {
    setQuery('');
    setSelectedCollection('all');
    setSelectedMaterial('all');
    setSelectedShape('all');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed top-16 md:top-20 lg:top-24 left-0 right-0 z-[90]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('search.title')}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white border-t border-b border-dark-text/[0.06]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 laptop:px-12 py-6 sm:py-8">
          <div className="flex flex-col gap-6">
            {/* En-tête */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] font-medium text-dark-text uppercase mb-1.5 sm:mb-2">
                  {t('search.title')}
                </p>
                <p className="font-sans text-dark-text/60 text-xs">
                  {t('search.subtitle')}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Fermer la recherche"
                className="text-dark-text/60 hover:text-dark-text transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative border-b border-dark-text/15 focus-within:border-dark-text transition-colors">
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('search.placeholder', { defaultValue: 'Rechercher une monture...' })}
                aria-label={t('search.placeholder', { defaultValue: 'Rechercher une monture...' })}
                className="w-full bg-transparent pb-3 pr-8 font-display text-2xl sm:text-3xl text-dark-text placeholder:text-dark-text/25 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Effacer la recherche"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-dark-text/40 hover:text-dark-text transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filtres */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <FilterSelect
                label={t('search.collection')}
                options={collectionOptions}
                value={selectedCollection}
                onChange={setSelectedCollection}
              />
              <FilterSelect
                label={t('search.material')}
                options={materialOptions}
                value={selectedMaterial}
                onChange={setSelectedMaterial}
              />
              <FilterSelect
                label={t('search.shape')}
                options={shapeOptions}
                value={selectedShape}
                onChange={setSelectedShape}
              />
              <FilterSelect
                label={t('search.lens')}
                options={[{ label: t('search.all'), value: 'all' }]}
                value="all"
                onChange={() => {}}
              />
            </div>

            <div className="min-h-[112px] border-t border-dark-text/[0.06] pt-5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-sans text-[8px] tracking-[0.3em] uppercase font-medium text-dark-text/40">
                  {normalizedQuery ? 'Résultats' : 'Suggestions'}
                </p>
                {!loading && !loadError && (
                  <span className="font-sans text-[10px] text-dark-text/35 tabular-nums">
                    {searchResults.length} / {products.length}
                  </span>
                )}
              </div>

              {loading ? (
                <div className="flex items-center gap-3 py-6">
                  <span className="w-4 h-4 border border-dark-text/15 border-t-dark-text rounded-full animate-spin" />
                  <p className="font-sans text-xs text-dark-text/45">Chargement des créations</p>
                </div>
              ) : loadError ? (
                <p className="font-sans text-xs text-dark-text/45 py-6">
                  Impossible de charger les créations pour le moment.
                </p>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {searchResults.map((product, index) => {
                    const image = product.images.edges[0]?.node.url;
                    const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);

                    return (
                      <LocaleLink
                        key={product.id}
                        to={`/product/${product.handle}`}
                        onClick={handleClose}
                        onMouseEnter={preloadProductPage}
                        onFocus={preloadProductPage}
                        className="group grid grid-cols-[72px_1fr] gap-3 items-center border border-dark-text/[0.06] p-2 hover:border-dark-text/20 transition-colors"
                      >
                        <div className="aspect-square bg-[#f0eeea] overflow-hidden">
                          {image && (
                            <img
                              src={resizeShopifyImage(image, 180)}
                              alt={product.title}
                              loading={index < 4 ? 'eager' : 'lazy'}
                              decoding="async"
                              sizes="72px"
                              className="w-full h-full object-contain bg-[#f5f4f0] p-1.5 transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-sm font-bold text-dark-text leading-tight line-clamp-2">
                            {product.title}
                          </p>
                          <p className="font-sans text-[10px] text-dark-text/45 mt-1">
                            {price} €
                          </p>
                        </div>
                      </LocaleLink>
                    );
                  })}
                </div>
              ) : (
                <p className="font-sans text-xs text-dark-text/45 py-6">
                  Aucun produit trouvé.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-dark-text/[0.06] flex items-center justify-between">
              <p className="font-sans text-dark-text/40 text-xs font-light">
                {t('search.helpText')}
              </p>
              <LocaleLink to="/collections" onClick={handleClose}>
                <button className="group relative overflow-hidden border border-dark-text px-6 py-2.5 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                    {t('search.viewAll')}
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </LocaleLink>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Composant interne pour les selects de filtre
function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-medium text-dark-text uppercase mb-2 sm:mb-3 block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent border-b border-dark-text/15 pb-2 sm:pb-2.5 font-sans text-xs sm:text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-0 bottom-2 sm:bottom-3 pointer-events-none">
          <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="sm:w-[10px] sm:h-[6px]">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
