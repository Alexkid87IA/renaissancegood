import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface RelatedProductsProps {
  currentProductId: string;
  limit?: number;
}

export default function RelatedProducts({ currentProductId, limit = 4 }: RelatedProductsProps) {
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
      <section className="py-20 lg:py-32 bg-beige ml-0 lg:ml-[340px] laptop:ml-[380px] xl:ml-[480px]">
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-bronze/20 border-t-bronze rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="pt-0 pb-16 lg:pb-24 xl:pb-32 bg-beige ml-0 lg:ml-[340px] laptop:ml-[380px] xl:ml-[480px]">
      <div className="px-5 sm:px-8 lg:px-12 xl:px-20 pt-16 lg:pt-24 xl:pt-32">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <p className="font-sans text-bronze text-[9px] sm:text-[10px] tracking-[0.3em] font-bold uppercase mb-4">
            Sélection
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95]">
            VOUS AIMEREZ AUSSI
          </h2>
        </motion.div>

        {/* Grille de produits */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => {
            const imageUrl = product.images.edges[0]?.node.url;
            const secondImageUrl = product.images.edges[1]?.node.url;
            const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);
            const modelName = getModelName(product.title);

            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/product/${product.handle}`)}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                  {imageUrl && (
                    <>
                      <img
                        src={imageUrl}
                        alt={product.title}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                          secondImageUrl ? 'group-hover:opacity-0' : 'group-hover:scale-105'
                        }`}
                      />
                      {secondImageUrl && (
                        <img
                          src={secondImageUrl}
                          alt={`${product.title} - vue 2`}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500"
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Infos */}
                <div>
                  <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-dark-text mb-1 group-hover:text-bronze transition-colors duration-300 leading-tight uppercase">
                    {modelName}
                  </h3>
                  <p className="font-sans text-sm text-dark-text/60">
                    {price} €
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bouton voir plus */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 lg:mt-16 text-center"
        >
          <button
            onClick={() => navigate('/shop')}
            className="border-2 border-dark-text/80 px-10 py-4 font-sans text-[10px] tracking-[0.25em] font-bold uppercase hover:bg-dark-text hover:text-beige transition-all duration-500"
          >
            Voir toute la collection
          </button>
        </motion.div>
      </div>
    </section>
  );
}
