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
      <label className="font-sans text-[9px] tracking-[0.3em] font-bold text-dark-text uppercase mb-3 block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b-2 border-dark-text/20 pb-2 font-sans text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-0 bottom-3 pointer-events-none">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
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
      className={`group relative bg-white border border-dark-text/10 overflow-hidden ${product.gridPosition}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <Link
        to={`/product/${product.handle}`}
        className="relative w-full h-full block cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.img
          key={currentImageIndex}
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {product.badge && (
          <div className="absolute top-6 left-6 bg-dark-text border border-dark-text px-4 py-2">
            <span className="font-sans text-[8px] tracking-[0.3em] font-bold text-white">
              {product.badge}
            </span>
          </div>
        )}

        {product.images.length > 1 && (
          <div className="absolute bottom-6 left-6 flex gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                aria-label={`View image ${index + 1}`}
                className={`w-6 h-6 border transition-all ${
                  currentImageIndex === index
                    ? 'border-dark-text bg-dark-text'
                    : 'border-dark-text/40 bg-white/90 hover:border-dark-text hover:bg-white'
                }`}
              >
                {currentImageIndex !== index && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-full h-full p-1"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/5 transition-colors duration-500" />

        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-white/90 backdrop-blur-sm px-6 py-3 border border-dark-text/10">
            <p className="font-sans text-[10px] tracking-[0.3em] font-bold text-dark-text">
              VOIR DÉTAILS
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 right-6">
          <div className="bg-white/95 backdrop-blur-sm px-6 py-3 border border-dark-text/10">
            <p className="font-sans text-xs text-dark-text/60 mb-1">{product.category}</p>
            <p className="font-display text-2xl font-bold text-dark-text">{product.name}</p>
            <p className="font-sans text-sm text-dark-text/70 mt-2">{product.price}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HeritageCollectionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
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
      <div className="relative h-screen overflow-hidden flex">
        <motion.div
          ref={heroRef}
          className="relative w-2/3 h-full"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1600&q=80"
            alt="Collection Héritage"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
        </motion.div>

        <motion.div
          className="relative w-1/3 h-full bg-beige flex items-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="px-16 py-12">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="font-sans text-[9px] tracking-[0.5em] font-bold text-dark-text/30 uppercase mb-8">
                Collection
              </p>

              <h1 className="font-display text-7xl font-bold text-dark-text tracking-[-0.04em] leading-[0.9] mb-12">
                HÉRITAGE
              </h1>

              <div className="space-y-8 mb-16">
                <div className="h-px bg-dark-text/10" />
                <p className="font-sans text-dark-text/70 text-lg leading-[1.8] font-light">
                  Tradition, puissance et élégance. Le savoir-faire français transmis de génération en génération.
                </p>
                <div className="h-px bg-dark-text/10" />
              </div>

              <div className="space-y-8">
                <div className="flex items-baseline gap-4">
                  <p className="font-display text-5xl font-bold text-dark-text">
                    {loading ? '...' : products.length}
                  </p>
                  <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-dark-text/40 uppercase">
                    Modèles
                  </p>
                </div>
                <div className="flex items-baseline gap-4">
                  <p className="font-display text-5xl font-bold text-dark-text">3</p>
                  <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-dark-text/40 uppercase">
                    Matériaux
                  </p>
                </div>
                <div className="flex items-baseline gap-4">
                  <p className="font-display text-5xl font-bold text-dark-text">FR</p>
                  <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-dark-text/40 uppercase">
                    Origine
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-16 left-1/3 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            <p className="font-sans text-[8px] tracking-[0.4em] font-bold text-dark-text/40 uppercase">
              Découvrir
            </p>
            <div className="w-[1px] h-20 bg-gradient-to-b from-dark-text/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-20 bg-beige pt-20">
        <div className="border-b border-dark-text/10 bg-white sticky top-20 z-40 shadow-sm">
          <div className="max-w-[1800px] mx-auto px-8 laptop:px-12 py-6 laptop:py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 laptop:grid-cols-5 gap-6 laptop:gap-8 xl:gap-12">
              <div className="col-span-2 md:col-span-1 flex flex-col justify-end">
                <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-dark-text uppercase mb-3">
                  # PRODUCTS
                </p>
                <p className="font-display text-5xl font-bold text-dark-text leading-none">
                  {loading ? '...' : filteredProducts.length}
                </p>
              </div>

              <FilterSelect
                label="COLLECTION"
                options={[{ label: 'Heritage', value: 'heritage' }]}
                value="heritage"
                onChange={() => {}}
              />

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
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-8 laptop:px-12 py-10 laptop:py-12">
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
              <div className="grid grid-cols-12 auto-rows-[280px] laptop:auto-rows-[320px] xl:auto-rows-[350px] gap-3 laptop:gap-4">
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

        <section className="relative py-32 bg-dark-text text-white">
          <div className="max-w-[1400px] mx-auto px-12">
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
              <h2 className="font-display text-7xl font-bold mb-12 leading-[1.1]">
                Découvrez Notre Atelier
              </h2>
              <p className="font-sans text-white/70 text-xl leading-[1.9] font-light max-w-3xl mx-auto">
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