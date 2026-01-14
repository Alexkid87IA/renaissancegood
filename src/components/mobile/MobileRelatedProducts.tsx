import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../../lib/shopify';

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
}

interface MobileRelatedProductsProps {
  currentProductId: string;
  limit?: number;
}

export default function MobileRelatedProducts({ currentProductId, limit = 4 }: MobileRelatedProductsProps) {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dark-text/20"></div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white border-t border-dark-text/10">
      <div className="px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl font-light text-dark-text mb-2 tracking-tight text-center">
            Vous aimerez peut-être
          </h2>
          <div className="w-10 h-[1px] bg-bronze mx-auto"></div>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide px-6 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex gap-4">
          {products.map((product, index) => {
            const imageUrl = product.images.edges[0]?.node.url;
            const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => {
                  navigate(`/product/${product.handle}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="bg-neutral-50/30 aspect-[4/3] mb-3 overflow-hidden border border-dark-text/5">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 active:scale-95 transition-transform duration-200"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg viewBox="0 0 100 50" className="w-20 h-20 text-dark-text/10">
                        <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="1" />
                        <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="1" />
                        <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-lg font-light text-dark-text tracking-tight leading-tight">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-[1px] bg-dark-text/20" />
                    <p className="font-sans text-sm text-dark-text/70">€{price}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-4 px-6">
        <p className="font-sans text-xs text-dark-text/50">
          {products.length} / {products.length}
        </p>
      </div>
    </section>
  );
}
