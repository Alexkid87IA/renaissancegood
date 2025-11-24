import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  material: string;
  shape: string;
  images: string[];
  badge?: string;
  gridPosition: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'M2067',
    category: 'OPTICAL | ESSENTIAL',
    collection: 'heritage',
    material: 'Acétate',
    shape: 'Rond',
    images: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    badge: 'NEW RELEASE',
    gridPosition: 'col-span-8 row-span-2'
  },
  {
    id: '2',
    name: 'M3133',
    category: 'OPTICAL | ESSENTIAL',
    collection: 'versailles',
    material: 'Métal',
    shape: 'Hexagonal',
    images: [
      'https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    badge: 'NEW RELEASE',
    gridPosition: 'col-span-4 row-span-2'
  },
  {
    id: '3',
    name: 'H2031',
    category: 'OPTICAL | TITAN',
    collection: 'heritage',
    material: 'Titane',
    shape: 'Rond',
    images: [
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-3 row-span-1'
  },
  {
    id: '4',
    name: 'V2058',
    category: 'OPTICAL | CLASSIC',
    collection: 'versailles',
    material: 'Acétate',
    shape: 'Carré',
    images: [
      'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-9 row-span-1'
  },
  {
    id: '5',
    name: 'H3166',
    category: 'OPTICAL | ESSENTIAL',
    collection: 'heritage',
    material: 'Métal',
    shape: 'Ovale',
    images: [
      'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-5 row-span-2'
  },
  {
    id: '6',
    name: 'I3088',
    category: 'OPTICAL | TITAN',
    collection: 'isis',
    material: 'Titane',
    shape: 'Papillon',
    images: [
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-7 row-span-2'
  },
  {
    id: '7',
    name: 'V2894',
    category: 'OPTICAL | CLASSIC',
    collection: 'versailles',
    material: 'Acétate',
    shape: 'Rond',
    images: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-4 row-span-1'
  },
  {
    id: '8',
    name: 'H2945',
    category: 'OPTICAL | ESSENTIAL',
    collection: 'heritage',
    material: 'Métal',
    shape: 'Ovale',
    images: [
      'https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-8 row-span-1'
  },
  {
    id: '9',
    name: 'V3211',
    category: 'OPTICAL | ESSENTIAL',
    collection: 'versailles',
    material: 'Acétate',
    shape: 'Ovale',
    images: [
      'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-6 row-span-2'
  },
  {
    id: '10',
    name: 'I2456',
    category: 'OPTICAL | CLASSIC',
    collection: 'isis',
    material: 'Titane',
    shape: 'Rond',
    images: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gridPosition: 'col-span-6 row-span-2'
  }
];

interface FilterOption {
  label: string;
  value: string;
}

const collections: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Heritage', value: 'heritage' },
  { label: 'Versailles', value: 'versailles' },
  { label: 'Isis', value: 'isis' }
];

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
  { label: 'Hexagonal', value: 'Hexagonal' },
  { label: 'Papillon', value: 'Papillon' }
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
      <label className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-dark-text uppercase mb-2 sm:mb-3 block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b-2 border-dark-text/20 pb-2 sm:pb-2.5 font-sans text-xs sm:text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6"
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
      className={`group relative cursor-pointer bg-white border border-dark-text/10 overflow-hidden col-span-6 sm:col-span-4 ${product.gridPosition.replace('col-span-', 'md:col-span-')}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/product/${product.id}`} className="block w-full h-full">
        <div className="relative w-full h-full">
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
            <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 bg-dark-text border border-dark-text px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
              <span className="font-sans text-[7px] sm:text-[8px] tracking-[0.3em] font-bold text-white">
                {product.badge}
              </span>
            </div>
          )}

          {product.images.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 flex gap-1.5 sm:gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`View image ${index + 1}`}
                  className={`w-5 h-5 sm:w-6 sm:h-6 border transition-all ${
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

          <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 bg-white/95 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border border-dark-text/10">
            <p className="font-sans text-[7px] sm:text-[8px] tracking-[0.3em] font-bold text-dark-text/70 uppercase mb-1 sm:mb-2">
              {product.category}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-dark-text leading-none">
              {product.name}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CollectionsPage() {
  const location = useLocation();
  const pathCollection = location.pathname.split('/').pop();

  const initialCollection = pathCollection && pathCollection !== 'collections' ? pathCollection : 'all';

  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const newPathCollection = location.pathname.split('/').pop();
    if (newPathCollection && newPathCollection !== 'collections') {
      setSelectedCollection(newPathCollection);
    }
  }, [location.pathname]);

  useEffect(() => {
    let filtered = products;

    if (selectedCollection !== 'all') {
      filtered = filtered.filter(p => p.collection === selectedCollection);
    }
    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(p => p.material === selectedMaterial);
    }
    if (selectedShape !== 'all') {
      filtered = filtered.filter(p => p.shape === selectedShape);
    }

    setFilteredProducts(filtered);
  }, [selectedCollection, selectedMaterial, selectedShape]);

  return (
    <div className="min-h-screen bg-beige">
      <div className="border-b border-dark-text/10 bg-white sticky top-20 z-30">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 laptop:px-12 py-4 sm:py-6 laptop:py-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] font-bold text-dark-text uppercase mb-1.5 sm:mb-2">
                  # RESULTS
                </p>
                <p className="font-display text-2xl sm:text-3xl md:text-4xl laptop:text-5xl font-bold text-dark-text leading-none">
                  {filteredProducts.length}
                </p>
              </div>
              <div className="md:hidden">
                <p className="font-sans text-[8px] tracking-[0.25em] font-bold text-dark-text/50 uppercase">
                  {collections.find(c => c.value === selectedCollection)?.label || 'All'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
              <div className="hidden md:block">
                <FilterSelect
                  label="TYPE"
                  options={[{ label: 'Optical', value: 'optical' }]}
                  value="optical"
                  onChange={() => {}}
                />
              </div>

              <FilterSelect
                label="COLLECTION"
                options={collections}
                value={selectedCollection}
                onChange={setSelectedCollection}
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
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 laptop:px-12 py-6 sm:py-8 md:py-10 laptop:py-12">
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[280px] laptop:auto-rows-[320px] xl:auto-rows-[350px] gap-2 sm:gap-3 laptop:gap-4">
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
    </div>
  );
}
