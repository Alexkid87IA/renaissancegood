import { useState, useEffect } from 'react';
import { getProducts } from '../lib/shopify';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
        setLoading(false);
        console.error(err);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-900 mx-auto mb-4"></div>
          <p className="text-amber-900 text-lg font-serif">Chargement de la collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center pt-32">
        <div className="text-center text-red-600 font-serif">
          <p className="text-2xl mb-4">⚠️</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-8 pt-32 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-4">
            Collection Renaissance
          </h1>
          <p className="text-lg text-amber-800 font-light max-w-2xl mx-auto">
            Découvrez nos créations symboliques, alliant héritage français et excellence artisanale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {product.images.edges[0] && (
                <div className="relative overflow-hidden h-80">
                  <img
                    src={product.images.edges[0].node.url}
                    alt={product.images.edges[0].node.altText || product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-serif font-semibold text-amber-900 mb-3">
                  {product.title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-2 font-light">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-amber-900">
                    {product.priceRange.minVariantPrice.amount}€
                  </p>
                  <button className="bg-amber-900 text-white px-6 py-2 rounded-full hover:bg-amber-800 transition-colors duration-300 font-serif">
                    Découvrir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}