import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../../lib/shopify';
import { getModelName } from '../../lib/productGrouping';

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

interface MobileRelatedProductsProps {
  currentProductId: string;
  limit?: number;
}

export default function MobileRelatedProducts({ currentProductId, limit = 5 }: MobileRelatedProductsProps) {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRelatedProducts() {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const filteredProducts = allProducts
          .filter((p: Product) => p.id !== currentProductId)
          .slice(0, limit);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Erreur lors du chargement des produits similaires:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRelatedProducts();
  }, [currentProductId, limit]);

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b border-dark-text/20"></div>
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="bg-white">
      {/* Separator */}
      <div className="mx-6">
        <div className="h-px bg-dark-text/8" />
      </div>

      <div className="px-6 py-12">
        {/* Header — same as desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-sans text-[8px] tracking-[0.35em] text-dark-text/30 uppercase mb-3 font-medium">
              Poursuivre l'exploration
            </p>
            <h2 className="font-display text-2xl font-bold text-dark-text tracking-[-0.03em] leading-[0.9]">
              VOUS AIMEREZ
              <br />
              <span className="font-light italic tracking-[-0.02em]">aussi</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-sans text-[8px] tracking-[0.2em] text-dark-text/35 uppercase"
          >
            Tout voir &rarr;
          </Link>
        </motion.div>

        {/* Featured — premier produit mis en avant */}
        {products.length > 0 && (() => {
          const featured = products[0];
          const imageUrl = featured.images.edges[0]?.node.url;
          const secondImageUrl = featured.images.edges[1]?.node.url;
          const price = parseFloat(featured.priceRange.minVariantPrice.amount).toFixed(0);
          const modelName = getModelName(featured.title);
          const category = featured.tags?.some(t =>
            t.toLowerCase() === 'solaire' || t.toLowerCase() === 'sun'
          ) ? 'Solaire' : 'Optique';

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <Link to={`/product/${featured.handle}`} className="block">
                <div className="relative overflow-hidden bg-[#f5f4f0] aspect-[16/9]">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="font-sans text-[8px] tracking-[0.2em] text-dark-text/25 font-medium">
                      01
                    </span>
                  </div>
                </div>
                <div className="pt-4 flex items-start justify-between">
                  <div>
                    <p className="font-sans text-[7px] tracking-[0.25em] text-dark-text/30 uppercase mb-1">
                      {category}
                    </p>
                    <h3 className="font-display text-lg font-bold text-dark-text uppercase tracking-[-0.01em] leading-tight">
                      {modelName}
                    </h3>
                  </div>
                  <p className="font-sans text-dark-text/45 text-sm mt-1">
                    {price}&nbsp;€
                  </p>
                </div>
                <div className="mt-4 h-px bg-dark-text/5" />
              </Link>
            </motion.div>
          );
        })()}

        {/* Grid — 2x2 pour les 4 suivants */}
        <div className="grid grid-cols-2 gap-3">
          {products.slice(1).map((product, index) => {
            const imageUrl = product.images.edges[0]?.node.url;
            const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);
            const modelName = getModelName(product.title);
            const category = product.tags?.some(t =>
              t.toLowerCase() === 'solaire' || t.toLowerCase() === 'sun'
            ) ? 'Solaire' : 'Optique';

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/product/${product.handle}`} className="block">
                  <div className="relative overflow-hidden bg-[#f5f4f0] aspect-[4/3]">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="font-sans text-[8px] tracking-[0.2em] text-dark-text/25 font-medium">
                        {String(index + 2).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="pt-3">
                    <p className="font-sans text-[7px] tracking-[0.25em] text-dark-text/30 uppercase mb-1">
                      {category}
                    </p>
                    <h3 className="font-display text-sm font-bold text-dark-text uppercase tracking-[-0.01em] leading-tight">
                      {modelName}
                    </h3>
                    <p className="font-sans text-dark-text/45 text-xs mt-1">
                      {price}&nbsp;€
                    </p>
                  </div>
                  <div className="mt-3 h-px bg-dark-text/5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => navigate('/shop')}
            className="group relative overflow-hidden border border-dark-text w-full py-4"
          >
            <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-white transition-colors duration-500">
              Explorer la collection
            </span>
            <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
