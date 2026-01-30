import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getProducts } from '../../lib/shopify';
import { getModelName } from '../../lib/productGrouping';
import LocaleLink from '../LocaleLink';
import { useLocalizedNavigate } from '../../hooks/useLocalizedNavigate';

function resizeShopifyImage(url: string, width: number): string {
  if (!url || !url.includes('cdn.shopify.com')) return url;
  return url.replace(/(\.\w+)(\?|$)/, `_${width}x$1$2`);
}

interface Product {
  id: string;
  handle: string;
  title: string;
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

interface RelatedProductsProps {
  currentProductId: string;
  limit?: number;
}

export default function RelatedProducts({ currentProductId, limit = 4 }: RelatedProductsProps) {
  const { t } = useTranslation('product');
  const navigate = useLocalizedNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadRelatedProducts() {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const filteredProducts = allProducts
          .filter((p: Product) => p.id !== currentProductId)
          .slice(0, limit);
        setProducts(filteredProducts);
      } catch {
        // Related products loading error silently handled
      } finally {
        setLoading(false);
      }
    }
    loadRelatedProducts();
  }, [currentProductId, limit]);

  if (loading) {
    return (
      <section className="py-24 lg:py-32 bg-white">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border border-dark-text/10 border-t-dark-text/60 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  // Premier produit = mise en avant, les autres en grille
  const featured = products[0];
  const rest = products.slice(1);

  return (
    <section className="bg-white">
      {/* Séparateur haut */}
      <div className="mx-6 sm:mx-10 lg:mx-14 xl:mx-20">
        <div className="h-px bg-dark-text/10" />
      </div>

      <div className="px-6 sm:px-10 lg:px-14 xl:px-20 py-20 sm:py-24 lg:py-32 xl:py-40">
        {/* En-tête éditorial */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 sm:mb-16 lg:mb-20"
        >
          <div>
            <p className="font-sans text-[9px] tracking-[0.35em] text-dark-text/35 uppercase mb-4 font-medium">
              {t('related.continueExploring')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-dark-text tracking-[-0.03em] leading-[0.9]">
              {t('related.youWillLove')}
              <br />
              <span className="font-light italic tracking-[-0.02em]">{t('related.also')}</span>
            </h2>
          </div>
          <LocaleLink
            to="/shop"
            className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase hover:text-dark-text transition-colors duration-500 self-start sm:self-auto"
          >
            {t('related.viewAll')}
          </LocaleLink>
        </motion.div>

        {/* Produit mis en avant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6 sm:mb-8"
        >
          <ProductCard
            product={featured}
            index={0}
            isHovered={hoveredIndex === 0}
            onHover={() => setHoveredIndex(0)}
            onLeave={() => setHoveredIndex(null)}
            featured
          />
        </motion.div>

        {/* Grille secondaire */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 lg:gap-6">
          {rest.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <ProductCard
                product={product}
                index={index + 1}
                isHovered={hoveredIndex === index + 1}
                onHover={() => setHoveredIndex(index + 1)}
                onLeave={() => setHoveredIndex(null)}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20 lg:mt-24 flex justify-center"
        >
          <button
            onClick={() => navigate('/shop')}
            className="group relative overflow-hidden border border-dark-text px-12 sm:px-16 py-4 sm:py-5"
          >
            <span className="relative z-10 font-sans text-[9px] sm:text-[10px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-white transition-colors duration-500">
              {t('related.exploreCollection')}
            </span>
            <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ========================================
// CARTE PRODUIT
// ========================================

function ProductCard({
  product,
  index,
  isHovered,
  onHover,
  onLeave,
  featured = false,
}: {
  product: Product;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  featured?: boolean;
}) {
  const imageUrl = product.images.edges[0]?.node.url;
  const secondImageUrl = product.images.edges[1]?.node.url;
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);
  const modelName = getModelName(product.title);
  const category = product.tags?.some(t =>
    t.toLowerCase() === 'solaire' || t.toLowerCase() === 'sun'
  ) ? 'Solaire' : 'Optique';

  return (
    <LocaleLink
      to={`/product/${product.handle}`}
      className="group block"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-[#f5f4f0] ${
        featured ? 'aspect-[21/9]' : 'aspect-[4/3]'
      }`}>
        {imageUrl && (
          <>
            <img
              src={resizeShopifyImage(imageUrl, 800)}
              alt={product.title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                isHovered
                  ? secondImageUrl ? 'opacity-0 scale-[1.02]' : 'scale-[1.04]'
                  : 'opacity-100 scale-100'
              }`}
            />
            {secondImageUrl && (
              <img
                src={resizeShopifyImage(secondImageUrl, 800)}
                alt={`${product.title} - vue 2`}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
                }`}
              />
            )}
          </>
        )}

        {/* Overlay subtil au hover */}
        <div className={`absolute inset-0 bg-dark-text/[0.03] transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Numéro discret */}
        <div className="absolute top-4 sm:top-5 left-4 sm:left-5">
          <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/25 font-medium">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Infos produit */}
      <div className={`pt-5 sm:pt-6 ${featured ? 'flex items-start justify-between' : ''}`}>
        <div>
          <p className={`font-sans text-[8px] sm:text-[9px] tracking-[0.25em] text-dark-text/30 uppercase mb-2 transition-colors duration-500 ${
            isHovered ? 'text-dark-text/50' : ''
          }`}>
            {category}
          </p>
          <h3 className={`font-display font-bold text-dark-text leading-tight uppercase tracking-[-0.01em] transition-all duration-500 ${
            featured ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-base sm:text-lg lg:text-xl'
          } ${isHovered ? 'translate-x-1' : ''}`}>
            {modelName}
          </h3>
        </div>

        <p className={`font-sans text-dark-text/50 transition-all duration-500 ${
          featured ? 'text-base sm:text-lg mt-1' : 'text-sm mt-1.5'
        } ${isHovered ? 'text-dark-text/80' : ''}`}>
          {price}&nbsp;€
        </p>
      </div>

      {/* Ligne d'accentuation animée */}
      <div className="mt-4 sm:mt-5 h-px bg-dark-text/5 relative overflow-hidden">
        <div className={`absolute inset-y-0 left-0 bg-dark-text/30 transition-all duration-700 ease-out ${
          isHovered ? 'w-full' : 'w-0'
        }`} />
      </div>
    </LocaleLink>
  );
}
