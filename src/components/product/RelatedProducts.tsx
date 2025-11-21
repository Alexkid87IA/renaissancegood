import { useEffect, useState } from 'react';
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
        
        // Récupérer tous les produits depuis Shopify
        const allProducts = await getProducts();
        
        // Filtrer pour exclure le produit actuel et limiter le nombre
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
      <div className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 laptop:px-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dark-text/20"></div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-24 laptop:py-32 bg-white border-t border-dark-text/10 ml-0 lg:ml-[400px] xl:ml-[480px]">
      <div className="max-w-[1400px] mx-auto px-8 laptop:px-16">
        {/* Titre de la section - Style Renaissance */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl laptop:text-5xl xl:text-6xl font-light text-dark-text mb-4 tracking-tight">
              Vous aimerez peut-être
            </h2>
            <div className="w-12 h-[1px] bg-bronze mx-auto mb-6"></div>
            <p className="font-sans text-xs text-dark-text/50 tracking-[0.2em] uppercase">
              Découvrez notre sélection
            </p>
          </motion.div>
        </div>

        {/* Grille de produits - Design épuré et luxueux */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-8 laptop:gap-10 mb-16">
          {products.map((product, index) => {
            const imageUrl = product.images.edges[0]?.node.url;
            const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.handle}`)}
              >
                {/* Container de la carte */}
                <div className="relative overflow-hidden">
                  {/* Image du produit - Ratio 16:10 adapté aux lunettes */}
                  <div className="aspect-[16/10] bg-neutral-50/50 mb-6 overflow-hidden relative border border-dark-text/5">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-contain p-6 transition-all duration-700 group-hover:scale-110 group-hover:p-4"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          viewBox="0 0 100 50"
                          className="w-24 h-24 text-dark-text/10"
                        >
                          <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="1" />
                          <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="1" />
                          <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    )}

                    {/* Ligne bronze qui apparaît au hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-bronze scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>

                  {/* Informations du produit - Typographie élégante */}
                  <div className="space-y-2 px-1">
                    {/* Nom du produit */}
                    <h3 className="font-display text-xl laptop:text-2xl font-light text-dark-text group-hover:text-bronze transition-colors duration-300 tracking-tight leading-tight">
                      {product.title}
                    </h3>
                    
                    {/* Prix avec divider */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-[1px] bg-dark-text/20 group-hover:bg-bronze group-hover:w-12 transition-all duration-300" />
                      <p className="font-sans text-sm text-dark-text/70 tracking-wide">
                        €{price}
                      </p>
                    </div>

                    {/* Call to action subtil qui apparaît au hover */}
                    <div className="overflow-hidden">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 0, y: 10 }}
                        className="font-sans text-[10px] tracking-[0.2em] uppercase text-bronze opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-2"
                      >
                        Découvrir →
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bouton voir plus - Style Renaissance épuré */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => navigate('/collections/heritage')}
            className="group inline-block relative overflow-hidden"
          >
            <span className="relative z-10 block border border-dark-text px-10 py-4 font-sans text-[10px] tracking-[0.3em] uppercase text-dark-text transition-colors duration-300 group-hover:text-white">
              Explorer la collection
            </span>
            <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}