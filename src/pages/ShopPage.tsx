import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductsByCollection } from '../lib/shopify';

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale?: boolean;
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
  variants?: {
    edges: Array<{
      node: {
        id: string;
        quantityAvailable?: number;
        availableForSale?: boolean;
      };
    }>;
  };
  tags?: string[];
  collections?: {
    edges: Array<{
      node: {
        handle: string;
        title: string;
      };
    }>;
  };
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
      <label className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-dark-text uppercase mb-2 sm:mb-3 block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b-2 border-dark-text/20 pb-1.5 sm:pb-2 font-sans text-xs sm:text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6"
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

// Composant ProductCard - Design cohérent avec les pages collections
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = product.images.edges.map(edge => edge.node.url);
  const currentImage = productImages[currentImageIndex] || productImages[0];
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);
  const category = product.tags?.includes('Solaire') ? 'SOLAIRE' : 'OPTICAL';
  
  // Calculer le stock total de tous les variants
  const totalStock = product.variants?.edges.reduce((total, edge) => {
    return total + (edge.node.quantityAvailable || 0);
  }, 0) || 0;
  
  // Rupture de stock si stock total = 0
  const isOutOfStock = totalStock === 0;

  return (
    <motion.div
      className="group relative bg-white overflow-hidden col-span-full sm:col-span-1 md:col-span-6"
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
        <div className={`relative aspect-[16/9] overflow-hidden bg-beige/20 ${isOutOfStock ? 'opacity-70' : ''}`}>
          <motion.img
            key={currentImageIndex}
            src={currentImage}
            alt={product.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Badge Rupture de stock */}
          {isOutOfStock && (
            <div className="absolute top-4 right-4 bg-bronze/90 px-4 py-2">
              <span className="font-sans text-[8px] tracking-[0.2em] font-bold text-white uppercase">
                Rupture de stock
              </span>
            </div>
          )}

          {/* Badge New Release - seulement si en stock */}
          {index < 2 && !isOutOfStock && (
            <div className="absolute top-4 left-4 bg-dark-text px-4 py-2">
              <span className="font-sans text-[8px] tracking-[0.3em] font-bold text-white">
                NEW RELEASE
              </span>
            </div>
          )}

          {productImages.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-1 z-10">
              {productImages.map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(imgIndex);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  aria-label={`View image ${imgIndex + 1}`}
                  className="p-2 -m-1 cursor-pointer"
                >
                  <span className={`block h-2 rounded-full transition-all ${
                    currentImageIndex === imgIndex
                      ? 'bg-dark-text w-6'
                      : 'bg-dark-text/30 w-2 hover:bg-dark-text/50'
                  }`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 bg-white">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <p className="font-sans text-[9px] tracking-[0.25em] text-dark-text/50 uppercase mb-2">
                {category}
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-dark-text leading-tight mb-1">
                {product.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-dark-text/5">
            <p className="font-sans text-base sm:text-lg font-semibold text-dark-text">
              €{price}
            </p>
            <div className="text-dark-text/40 group-hover:text-dark-text group-hover:translate-x-1 transition-all">
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
    // Si pas de tag solaire, c'est optique par défaut
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

      // Masquer les filtres au scroll vers le bas
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

  // Charger les produits depuis la collection "Toutes Les Lunettes" (handle: solaires)
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // Récupère les produits dans l'ordre manuel défini dans Shopify
        const data = await getProductsByCollection('solaires');
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
    // Filtre par type (Optical/Solaire)
    if (!productMatchesType(product, selectedType)) {
      return false;
    }

    // Filtre par collection (Heritage, Versailles, Isis)
    if (selectedCollection !== 'all') {
      if (!productBelongsToCollection(product, selectedCollection)) {
        return false;
      }
    }

    // Filtre par matériau (basé sur les tags)
    if (selectedMaterial !== 'all') {
      const hasMaterial = product.tags?.some(tag => 
        tag.toLowerCase().includes(selectedMaterial.toLowerCase())
      );
      if (!hasMaterial) {
        return false;
      }
    }

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
                # RESULTS
              </p>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl laptop:text-5xl font-bold text-dark-text leading-none">
                {filteredProducts.length}
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

      {/* Grille de produits */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6 md:gap-4">
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