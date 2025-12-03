import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../lib/shopify';
import { useDeviceType } from '../hooks/useDeviceType';
import ProductSidebar from '../components/product/ProductSidebar';
import ProductImageSection from '../components/product/ProductImageSection';
import ProductCraftSection from '../components/product/ProductCraftSection';
import ProductBottomBar from '../components/product/ProductBottomBar';
import ProductImageNavigation from '../components/product/ProductImageNavigation';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductPageMobile from '../components/mobile/ProductPageMobile';

// Interface pour les produits Shopify
interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
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
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
}

// Interface pour les variantes
interface Variant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
}

// Interface pour le produit formaté utilisé par les composants
interface Product {
  id: string;
  name: string;
  collection: string;
  badge?: string;
  price: string;
  frame: string;
  lens: string;
  colors: Array<{ name: string }>;
  dimensions: {
    lens: string;
    bridge: string;
    temple: string;
  };
  description: string;
  descriptionHtml?: string;
  images: string[];
  variants: Variant[];
}

export default function ProductPage() {
  const { id } = useParams(); // 'id' est en fait le 'handle' du produit
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour naviguer vers une image spécifique
  const scrollToImage = (index: number) => {
    const imageElement = document.querySelector(`[data-image-index="${index}"]`);
    if (imageElement) {
      imageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Fonctions de navigation pour le swipe
  const handleSwipeLeft = (currentIndex: number) => {
    const nextIndex = currentIndex < (product?.images.length || 0) - 1 ? currentIndex + 1 : 0;
    scrollToImage(nextIndex);
  };

  const handleSwipeRight = (currentIndex: number) => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : (product?.images.length || 0) - 1;
    scrollToImage(prevIndex);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Charger le produit depuis Shopify
  useEffect(() => {
    async function loadProduct() {
      if (!id) {
        setError('Produit non trouvé');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Récupérer le produit depuis Shopify avec son handle
        const shopifyProduct: ShopifyProduct = await getProduct(id);

        if (!shopifyProduct) {
          setError('Produit non trouvé');
          setLoading(false);
          return;
        }

        // Extraire les variantes avec leurs IDs Shopify
        const variants: Variant[] = shopifyProduct.variants.edges.map(edge => ({
          id: edge.node.id,
          title: edge.node.title,
          price: `€${parseFloat(edge.node.priceV2.amount).toFixed(2)}`,
          availableForSale: edge.node.availableForSale
        }));

        // Extraire les noms pour l'affichage (couleurs/variantes)
        const colors = variants.map(v => ({ name: v.title }));

        // Extraire les images
        const images = shopifyProduct.images.edges.map(edge => edge.node.url);

        // Formater le produit pour les composants
        const formattedProduct: Product = {
          id: shopifyProduct.id,
          name: shopifyProduct.title,
          collection: 'OPTICAL', // Par défaut - peut être enrichi avec des tags
          badge: 'NEW RELEASE', // Par défaut - peut être enrichi avec des metafields
          price: `€${parseFloat(shopifyProduct.priceRange.minVariantPrice.amount).toFixed(2)}`,
          frame: colors[0]?.name || 'Default',
          lens: 'Clear Lens', // Par défaut - peut être enrichi
          colors: colors,
          dimensions: {
            lens: '51mm', // Par défaut - peut être enrichi avec des metafields
            bridge: '20mm',
            temple: '145mm'
          },
          description: shopifyProduct.description || 'Découvrez ce modèle unique de la collection Renaissance.',
          descriptionHtml: shopifyProduct.descriptionHtml || shopifyProduct.description,
          images: images,
          variants: variants
        };

        setProduct(formattedProduct);
      } catch (err) {
        console.error('Erreur lors du chargement du produit:', err);
        setError('Impossible de charger le produit. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-dark-text mb-6"></div>
          <p className="font-sans text-dark-text/60 text-sm tracking-wider uppercase">
            Chargement du produit...
          </p>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error || !product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-8">
          <p className="font-sans text-dark-text text-sm tracking-wider uppercase mb-6">
            {error || 'Produit non trouvé'}
          </p>
          <button
            onClick={() => navigate('/collections/heritage')}
            className="font-sans text-xs tracking-wider uppercase border border-dark-text px-6 py-3 hover:bg-dark-text hover:text-white transition-colors"
          >
            Retour aux collections
          </button>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return <ProductPageMobile product={product} />;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Structure principale avec sidebar fixe sur desktop */}
      <div className="relative pb-24">
        {/* Fixed Sidebar - Desktop uniquement */}
        <ProductSidebar
          product={product}
          selectedColorIndex={selectedColorIndex}
          onColorChange={setSelectedColorIndex}
        />

        {/* Image Navigation avec Thumbnails */}
        {product.images && product.images.length > 0 && (
          <ProductImageNavigation
            images={product.images}
            productName={product.name}
          />
        )}

        {/* Scrolling Content */}
        <div className="lg:ml-[340px] laptop:ml-[380px] xl:ml-[480px]">
          {/* Gallery de toutes les images du produit */}
          {product.images && product.images.length > 0 ? (
            <div className="space-y-0">
              {product.images.map((imageUrl, index) => (
                <div
                  key={index}
                  data-image-section
                  data-image-index={index}
                  className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-neutral-50"
                >
                  <img
                    src={imageUrl}
                    alt={`${product.name} - vue ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            // Images par défaut si pas d'images disponibles
            <div className="space-y-0">
              <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-neutral-50">
                <img
                  src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Hero view"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-neutral-50">
                <img
                  src="https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Front view"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          <ProductCraftSection />
        </div>
      </div>

      {/* Section "Vous aimerez peut-être" - PLEINE LARGEUR (après la sidebar) */}
      <RelatedProducts currentProductId={product.id} limit={4} />

      <ProductBottomBar product={product} selectedColorIndex={selectedColorIndex} />
    </div>
  );
}