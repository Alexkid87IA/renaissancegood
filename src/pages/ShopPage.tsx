import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../lib/shopify';

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
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
  tags?: string[];
}

// Générer une position de grille ÉQUILIBRÉE (pas trop grand, pas trop petit)
function getGridPosition(index: number): string {
  const patterns = [
    'col-span-8 row-span-2',  // Grand horizontal (66%)
    'col-span-4 row-span-2',  // Moyen vertical (33%)
    'col-span-6 row-span-1',  // Moyen horizontal (50%)
    'col-span-6 row-span-1',  // Moyen horizontal (50%)
    'col-span-5 row-span-2',  // Moyen+ (42%)
    'col-span-7 row-span-2',  // Large vertical (58%)
    'col-span-4 row-span-1',  // Petit horizontal (33%)
    'col-span-8 row-span-1',  // Large horizontal (66%)
    'col-span-6 row-span-2',  // Moyen carré (50%)
    'col-span-6 row-span-2',  // Moyen carré (50%)
  ];
  return patterns[index % patterns.length];
}

// Composant FilterSelect pour les filtres
function FilterSelect({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: Array<{ label: string; value: string }>;
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

// Composant ProductCard avec le nouveau design amélioré
function ProductCard({ product, index }: { product: Product; index: number }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extraire toutes les images du produit
  const productImages = product.images.edges.map(edge => edge.node.url);
  const currentImage = productImages[currentImageIndex] || productImages[0];
  
  // Prix formaté
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);
  
  // Catégorie (tu peux utiliser les tags Shopify)
  const category = product.tags?.[0] || 'OPTICAL | ESSENTIAL';
  
  // Position dans la grille (ÉQUILIBRÉE)
  const gridPosition = getGridPosition(index);

  return (
    <motion.div
      className={`group relative cursor-pointer bg-white border border-dark-text/10 overflow-hidden ${gridPosition}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      onClick={() => navigate(`/product/${product.handle}`)}
    >
      <div className="relative w-full h-full">
        {/* Image du produit */}
        <motion.img
          key={currentImageIndex}
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Badge "NEW" plus discret et plus petit */}
        {index < 2 && (
          <div className="absolute top-4 left-4 bg-dark-text/90 backdrop-blur-sm px-3 py-1.5">
            <span className="font-sans text-[7px] tracking-[0.3em] font-bold text-white">
              NEW RELEASE
            </span>
          </div>
        )}

        {/* Vraies miniatures des images (au lieu d'icônes) */}
        {productImages.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {productImages.map((imgUrl, imgIndex) => (
              <button
                key={imgIndex}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex(imgIndex);
                }}
                aria-label={`View image ${imgIndex + 1}`}
                className={`w-12 h-12 border-2 transition-all overflow-hidden ${
                  currentImageIndex === imgIndex
                    ? 'border-dark-text ring-2 ring-dark-text/30'
                    : 'border-white/80 hover:border-dark-text opacity-80 hover:opacity-100'
                }`}
              >
                {/* Afficher la vraie miniature de l'image */}
                <img
                  src={imgUrl}
                  alt={`View ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Overlay qui s'affiche au hover - Design homogène avec les collections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6"
        >
          <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-white/70 uppercase mb-2">
            {category}
          </p>
          <h3 className="font-display text-2xl laptop:text-3xl font-light text-white tracking-tight leading-tight mb-3">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-sans text-lg text-white tracking-wide">
              €{price}
            </p>
            <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-white/80 border border-white/30 px-4 py-2">
              Voir le détail
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');

  // Scroll vers le haut au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Charger les produits
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Impossible de charger la collection');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    if (selectedType !== 'all' && selectedType !== 'optical') return false;
    // Tu peux ajouter d'autres filtres basés sur les tags Shopify ici
    return true;
  });

  // État de chargement
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

  // État d'erreur
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
      {/* Barre de filtres sticky en haut */}
      <div className="border-b border-dark-text/10 bg-white sticky top-20 z-30">
        <div className="max-w-[1800px] mx-auto px-8 laptop:px-12 py-6 laptop:py-8">
          <div className="grid grid-cols-6 gap-3 md:gap-6 laptop:gap-8 xl:gap-12">
            {/* Compteur de résultats */}
            <div className="col-span-1 flex flex-col justify-end">
              <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-dark-text uppercase mb-3">
                # RESULTS
              </p>
              <p className="font-display text-4xl laptop:text-5xl font-bold text-dark-text leading-none">
                {filteredProducts.length}
              </p>
            </div>

            {/* Filtres */}
            <FilterSelect
              label="TYPE"
              options={[
                { label: 'All', value: 'all' },
                { label: 'Optical', value: 'optical' },
                { label: 'Sun', value: 'sun' }
              ]}
              value={selectedType}
              onChange={setSelectedType}
            />

            <FilterSelect
              label="COLLECTION"
              options={[
                { label: 'All', value: 'all' },
                { label: 'Heritage', value: 'heritage' },
                { label: 'Versailles', value: 'versailles' },
                { label: 'Isis', value: 'isis' }
              ]}
              value={selectedCollection}
              onChange={setSelectedCollection}
            />

            <FilterSelect
              label="MATERIAL"
              options={[
                { label: 'All', value: 'all' },
                { label: 'Acétate', value: 'acetate' },
                { label: 'Métal', value: 'metal' },
                { label: 'Titane', value: 'titanium' }
              ]}
              value={selectedMaterial}
              onChange={setSelectedMaterial}
            />

            <FilterSelect
              label="SHAPE"
              options={[
                { label: 'All', value: 'all' },
                { label: 'Rond', value: 'round' },
                { label: 'Ovale', value: 'oval' },
                { label: 'Carré', value: 'square' }
              ]}
              value="all"
              onChange={() => {}}
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

      {/* Grille de produits masonry */}
      <div className="max-w-[1800px] mx-auto px-8 laptop:px-12 py-10 laptop:py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-sans text-dark-text/40 text-sm tracking-wider uppercase">
              Aucun produit disponible pour le moment
            </p>
            <p className="font-sans text-xs text-dark-text/30 mt-4">
              Notre collection arrive bientôt
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-12 auto-rows-[280px] laptop:auto-rows-[320px] xl:auto-rows-[350px] gap-3 laptop:gap-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
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