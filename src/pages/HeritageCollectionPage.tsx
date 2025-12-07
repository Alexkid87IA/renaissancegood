import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProductsByCollection } from '../lib/shopify';

// Interface adaptée pour les produits Shopify
interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale: boolean;
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

interface Product {
  id: string;
  name: string;
  category: string;
  material: string;
  shape: string;
  images: string[];
  badge?: string;
  gridPosition: string;
  price: string;
  handle: string;
}

interface FilterOption {
  label: string;
  value: string;
}

const materials: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Acétate', value: 'Acétate' },
  { label: 'Métal', value: 'Métal' },
  { label: 'Titane', value: 'Titane' }
];

const shapes: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Rond', value: 'Rond' },
  { label: 'Ovale', value: 'Ovale' },
  { label: 'Carré', value: 'Carré' }
];

// Positions de grille pour les produits (répétitif)
const gridPositions = [
  'col-span-8 row-span-2',
  'col-span-4 row-span-2',
  'col-span-5 row-span-1',
  'col-span-7 row-span-1',
  'col-span-6 row-span-2',
  'col-span-6 row-span-2',
  'col-span-8 row-span-1',
  'col-span-4 row-span-1',
  'col-span-5 row-span-2',
  'col-span-7 row-span-2'
];

function FilterSelect({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label className="font-sans text-[8px] tracking-[0.25em] font-bold text-dark-text uppercase mb-1.5 md:mb-2 block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b-2 border-dark-text/20 pb-1.5 md:pb-2 font-sans text-xs text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6"
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

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <motion.div
      className="group relative overflow-hidden col-span-full sm:col-span-1 md:col-span-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={`/product/${product.handle}`}
        className="block cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-beige/20">
          <motion.img
            key={currentImageIndex}
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {product.badge && (
            <div className="absolute top-4 left-4 bg-dark-text px-4 py-2">
              <span className="font-sans text-[8px] tracking-[0.3em] font-bold text-white">
                {product.badge}
              </span>
            </div>
          )}

          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`View image ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    currentImageIndex === index
                      ? 'bg-dark-text w-6'
                      : 'bg-dark-text/30 w-2'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-display text-lg sm:text-xl font-bold text-dark-text leading-tight">
                {product.name}
              </h3>
              <p className="font-sans text-sm sm:text-base font-semibold text-dark-text/70 mt-1">
                {product.price}
              </p>
            </div>
            <div className="text-dark-text/40 group-hover:text-dark-text group-hover:translate-x-1 transition-all ml-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HeritageCollectionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hideFilters, setHideFilters] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Charger les produits depuis Shopify au montage du composant
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        
        // Récupérer les produits de la collection HERITAGE
        const shopifyProducts = await getProductsByCollection('HERITAGE');
        
        // Transformer les produits Shopify en format utilisé par le composant
        const transformedProducts: Product[] = shopifyProducts.map((product: ShopifyProduct, index: number) => ({
          id: product.id,
          name: product.title,
          handle: product.handle,
          category: 'OPTICAL', // Par défaut, peut être enrichi avec des tags Shopify
          material: 'Métal', // Par défaut, peut être enrichi avec des metafields
          shape: 'Rond', // Par défaut, peut être enrichi avec des metafields
          images: product.images.edges.map(edge => edge.node.url),
          price: `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`,
          gridPosition: gridPositions[index % gridPositions.length]
        }));
        
        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
      } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
        setError('Impossible de charger les produits. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Gérer le masquage des filtres au scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Sur desktop seulement, masquer les filtres au scroll vers le bas
      if (window.innerWidth >= 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          setHideFilters(true);
        } else if (currentScrollY < lastScrollY) {
          setHideFilters(false);
        }
      } else {
        setHideFilters(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Filtrer les produits selon les critères sélectionnés
  useEffect(() => {
    let filtered = products;

    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(p => p.material === selectedMaterial);
    }
    if (selectedShape !== 'all') {
      filtered = filtered.filter(p => p.shape === selectedShape);
    }

    setFilteredProducts(filtered);
  }, [selectedMaterial, selectedShape, products]);

  return (
    <div className="bg-beige">
      <div className="relative h-screen overflow-hidden">
        <motion.div
          ref={heroRef}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=5760"
            alt="Collection Héritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-text/80" />
        </motion.div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 pt-32 pb-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-10"
            >
              <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-bold text-white tracking-[-0.04em] leading-[0.85] mb-8 drop-shadow-2xl">
                HÉRITAGE
              </h1>
              <div className="flex items-center justify-center gap-6 mb-10">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-bronze to-bronze" />
                <span className="font-sans text-xs tracking-[0.5em] font-bold text-bronze uppercase">Trident</span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent via-bronze to-bronze" />
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-sans text-white text-xl md:text-2xl leading-[1.8] font-light max-w-3xl mx-auto mb-16 drop-shadow-lg"
            >
              Ce qui se transmet ne se jette pas. Ce qui se respecte ne s'oublie pas.<br />
              <span className="inline-block mt-4 px-6 py-2 bg-bronze/20 backdrop-blur-sm rounded-lg text-[#D4AF37] font-medium drop-shadow-xl">
                Trois pointes. Le passé. Le présent. L'avenir.
              </span>
            </motion.p>

            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              onClick={() => {
                const section = document.querySelector('[data-products-section]');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-12 py-5 bg-white text-dark-text font-sans text-xs tracking-[0.25em] font-bold uppercase hover:bg-bronze hover:text-white transition-all duration-300 shadow-2xl hover:shadow-bronze/20 hover:scale-105"
            >
              Explorer la Collection
            </motion.button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { duration: 0.8, delay: 1.2 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            onClick={() => {
              const section = document.querySelector('[data-products-section]');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="absolute bottom-12 flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <span className="font-sans text-[8px] tracking-[0.4em] font-bold uppercase">Découvrir</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="relative z-20 bg-beige pt-20" data-products-section>
        <motion.div
          ref={filtersRef}
          className="border-b border-dark-text/10 bg-white sticky top-20 z-40 shadow-sm"
          initial={{ y: 0 }}
          animate={{ y: hideFilters ? -200 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 laptop:px-12">
            <div className="py-3 md:py-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="font-sans text-[8px] tracking-[0.3em] font-bold text-dark-text uppercase mb-1">
                    # PRODUCTS
                  </p>
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-dark-text leading-none">
                    {loading ? '...' : filteredProducts.length}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="md:hidden">
                    <p className="font-sans text-[8px] tracking-[0.25em] font-bold text-dark-text/50 uppercase">
                      Heritage
                    </p>
                  </div>
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="md:hidden flex items-center gap-2 px-4 py-2 bg-dark-text text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 4h18M3 12h18M3 20h18" />
                    </svg>
                    <span className="font-sans text-[10px] tracking-[0.2em] font-bold">FILTRES</span>
                  </button>
                </div>
              </div>

              <div className="hidden md:grid md:grid-cols-4 gap-4 mt-5">
                <div className="hidden md:block">
                  <FilterSelect
                    label="COLLECTION"
                    options={[{ label: 'Heritage', value: 'heritage' }]}
                    value="heritage"
                    onChange={() => {}}
                  />
                </div>

                <FilterSelect
                  label="MATERIAL"
                  options={materials}
                  value={selectedMaterial}
                  onChange={setSelectedMaterial}
                />

                <FilterSelect
                  label="SHAPE"
                  options={shapes}
                  value={selectedShape}
                  onChange={setSelectedShape}
                />

                <div className="col-span-2 md:col-span-1">
                  <FilterSelect
                    label="LENS"
                    options={[{ label: 'All', value: 'all' }]}
                    value="all"
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {showMobileFilters && (
          <>
            <div
              className="fixed inset-0 bg-dark-text/50 z-50 md:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 bg-white z-50 md:hidden rounded-t-2xl shadow-2xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-sans text-sm tracking-[0.2em] font-bold text-dark-text uppercase">
                    Filtres
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <FilterSelect
                    label="MATERIAL"
                    options={materials}
                    value={selectedMaterial}
                    onChange={setSelectedMaterial}
                  />

                  <FilterSelect
                    label="SHAPE"
                    options={shapes}
                    value={selectedShape}
                    onChange={setSelectedShape}
                  />

                  <FilterSelect
                    label="LENS"
                    options={[{ label: 'All', value: 'all' }]}
                    value="all"
                    onChange={() => {}}
                  />
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedMaterial('all');
                      setSelectedShape('all');
                    }}
                    className="flex-1 px-6 py-3 border-2 border-dark-text/20 font-sans text-xs tracking-[0.2em] font-bold text-dark-text uppercase"
                  >
                    Réinitialiser
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 px-6 py-3 bg-dark-text text-white font-sans text-xs tracking-[0.2em] font-bold uppercase"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 laptop:px-12 py-6 sm:py-8 md:py-10 laptop:py-12">
          {loading && (
            <div className="text-center py-32">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-dark-text"></div>
              <p className="font-sans text-dark-text/60 text-sm tracking-wider uppercase mt-6">
                Chargement des produits...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-32">
              <p className="font-sans text-red-600 text-sm tracking-wider uppercase mb-4">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="font-sans text-xs tracking-wider uppercase border border-dark-text px-6 py-3 hover:bg-dark-text hover:text-white transition-colors"
              >
                Réessayer
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6 md:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-32">
                  <p className="font-sans text-dark-text/40 text-sm tracking-wider uppercase">
                    No products match your filters
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <section className="relative py-16 sm:py-24 md:py-32 bg-dark-text text-white">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <p className="font-sans text-[9px] tracking-[0.5em] font-bold text-white/40 uppercase mb-8">
                Visite Atelier
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-8 sm:mb-12 leading-[1.1]">
                Découvrez Notre Atelier
              </h2>
              <p className="font-sans text-white/70 text-base sm:text-lg md:text-xl leading-[1.9] font-light max-w-3xl mx-auto">
                Plongez dans l'univers de la création artisanale et découvrez les gestes qui perpétuent notre héritage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-video bg-black/20 border-2 border-white/10 overflow-hidden"
            >
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Découverte de notre atelier"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}