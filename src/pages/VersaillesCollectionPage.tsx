import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  material: string;
  shape: string;
  images: string[];
  badge?: string;
  gridPosition: string;
}

const versaillesProducts: Product[] = [
  {
    id: 'v1',
    name: 'V2058',
    category: 'OPTICAL | CLASSIC',
    material: 'Acétate',
    shape: 'Carré',
    images: [
      'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    badge: 'ROYALE',
    gridPosition: 'col-span-7 row-span-2'
  },
  {
    id: 'v2',
    name: 'V2894',
    category: 'OPTICAL | CLASSIC',
    material: 'Acétate',
    shape: 'Rond',
    images: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-5 row-span-2'
  },
  {
    id: 'v3',
    name: 'V3211',
    category: 'OPTICAL | ESSENTIAL',
    material: 'Acétate',
    shape: 'Ovale',
    images: [
      'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-4 row-span-1'
  },
  {
    id: 'v4',
    name: 'V4576',
    category: 'OPTICAL | ESSENTIAL',
    material: 'Métal',
    shape: 'Hexagonal',
    images: [
      'https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    badge: 'NEW RELEASE',
    gridPosition: 'col-span-8 row-span-1'
  },
  {
    id: 'v5',
    name: 'V5329',
    category: 'OPTICAL | TITAN',
    material: 'Titane',
    shape: 'Ovale',
    images: [
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-6 row-span-2'
  },
  {
    id: 'v6',
    name: 'V6847',
    category: 'OPTICAL | CLASSIC',
    material: 'Métal',
    shape: 'Rond',
    images: [
      'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-6 row-span-2'
  }
];

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
  { label: 'Carré', value: 'Carré' },
  { label: 'Hexagonal', value: 'Hexagonal' }
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
        to={`/product/${product.id}`}
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
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-4 border border-dark-text/10">
          <p className="font-sans text-[8px] tracking-[0.3em] font-bold text-dark-text/70 uppercase mb-2">
            {product.category}
          </p>
          <h3 className="font-display text-4xl font-bold tracking-tight text-dark-text leading-none">
            {product.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function VersaillesCollectionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(versaillesProducts);

  useEffect(() => {
    let filtered = versaillesProducts;

    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(p => p.material === selectedMaterial);
    }
    if (selectedShape !== 'all') {
      filtered = filtered.filter(p => p.shape === selectedShape);
    }

    setFilteredProducts(filtered);
  }, [selectedMaterial, selectedShape]);

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
            src="https://images.unsplash.com/photo-1577803645773-f96470509666?w=1600&q=80"
            alt="Collection Versailles"
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

              <h1 className="font-display text-6xl font-bold text-dark-text tracking-[-0.04em] leading-[0.9] mb-12">
                VERSAILLES
              </h1>

              <div className="space-y-8 mb-16">
                <div className="h-px bg-dark-text/10" />
                <p className="font-sans text-dark-text/70 text-lg leading-[1.8] font-light">
                  L'essence de la royauté française. Luxe, majesté et raffinement intemporel inspirés du château de Versailles.
                </p>
                <div className="h-px bg-dark-text/10" />
              </div>

              <div className="space-y-8">
                <div className="flex items-baseline gap-4">
                  <p className="font-display text-5xl font-bold text-dark-text">
                    {versaillesProducts.length}
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
                  {filteredProducts.length}
                </p>
              </div>

              <FilterSelect
                label="COLLECTION"
                options={[{ label: 'Versailles', value: 'versailles' }]}
                value="versailles"
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
                Expérience Exclusive
              </p>
              <h2 className="font-display text-7xl font-bold mb-12 leading-[1.1]">
                Découvrez Versailles en Boutique
              </h2>
              <p className="font-sans text-white/70 text-xl leading-[1.9] font-light max-w-3xl mx-auto">
                Essayez la collection complète dans nos boutiques et bénéficiez des conseils personnalisés de nos experts. Une expérience unique vous attend.
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
                title="Découverte de nos boutiques"
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
