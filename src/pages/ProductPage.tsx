// ========================================
// PAGE PRODUIT
// Affiche un produit avec navigation entre les variantes de couleur
// ========================================

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, getProducts } from '../lib/shopify';
import { useDeviceType } from '../hooks/useDeviceType';
import { findRelatedColorVariants, getModelName, ColorVariant, getColorSwatchStyle } from '../lib/productGrouping';
import ProductSidebar from '../components/product/ProductSidebar';
import ProductImageSection from '../components/product/ProductImageSection';
import ProductCraftSection from '../components/product/ProductCraftSection';
import ProductBottomBar from '../components/product/ProductBottomBar';
import ProductImageNavigation from '../components/product/ProductImageNavigation';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductPageMobile from '../components/mobile/ProductPageMobile';
import { Product as ShopifyProductType } from '../components/ProductCard';
import SEO from '../components/SEO';

// Interface pour les images
interface ProductImage {
  url: string;
  altText: string | null;
}

// Interface pour les produits Shopify
interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags?: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: ProductImage;
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
        image: ProductImage | null;
      };
    }>;
  };
}

// Interface pour les variantes avec image
interface Variant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
  colorName: string;
  image: string | null;
}

// Interface pour le produit formaté
interface Product {
  id: string;
  name: string;
  modelName: string;
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
  allImages: ProductImage[];
  variants: Variant[];
  tags?: string[];
}

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Variantes de couleur (autres produits du même modèle)
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([]);
  const [selectedColorVariantIndex, setSelectedColorVariantIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Charger le produit et ses variantes de couleur
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

        // Charger le produit actuel
        const shopifyProduct: ShopifyProduct = await getProduct(id);

        if (!shopifyProduct) {
          setError('Produit non trouvé');
          setLoading(false);
          return;
        }

        // Charger tous les produits pour trouver les variantes de couleur
        const allProducts = await getProducts() as ShopifyProductType[];
        const relatedVariants = findRelatedColorVariants(allProducts, id);
        setColorVariants(relatedVariants);

        // Trouver l'index de la variante actuelle
        const currentIndex = relatedVariants.findIndex(v => v.handle === id);
        setSelectedColorVariantIndex(currentIndex >= 0 ? currentIndex : 0);

        // Extraire toutes les images
        const allImages: ProductImage[] = shopifyProduct.images.edges.map(edge => ({
          url: edge.node.url,
          altText: edge.node.altText
        }));

        // Extraire les variantes internes (tailles, etc.)
        const variants: Variant[] = shopifyProduct.variants.edges.map(edge => {
          const colorOption = edge.node.selectedOptions.find(
            opt => opt.name.toLowerCase() === 'color' ||
                   opt.name.toLowerCase() === 'couleur' ||
                   opt.name.toLowerCase() === 'colour'
          );
          const colorName = colorOption?.value || edge.node.title;

          return {
            id: edge.node.id,
            title: edge.node.title,
            price: `€${parseFloat(edge.node.priceV2.amount).toFixed(2)}`,
            availableForSale: edge.node.availableForSale,
            colorName: colorName,
            image: edge.node.image?.url || null
          };
        });

        const colors = variants.map(v => ({ name: v.colorName }));
        const modelName = getModelName(shopifyProduct.title);

        const formattedProduct: Product = {
          id: shopifyProduct.id,
          name: shopifyProduct.title,
          modelName: modelName,
          collection: shopifyProduct.tags?.[0] || 'OPTICAL',
          badge: 'NEW RELEASE',
          price: `€${parseFloat(shopifyProduct.priceRange.minVariantPrice.amount).toFixed(2)}`,
          frame: colors[0]?.name || 'Default',
          lens: 'Clear Lens',
          colors: colors,
          dimensions: {
            lens: '51mm',
            bridge: '20mm',
            temple: '145mm'
          },
          description: shopifyProduct.description || 'Découvrez ce modèle unique de la collection Renaissance.',
          descriptionHtml: shopifyProduct.descriptionHtml || shopifyProduct.description,
          allImages: allImages,
          variants: variants,
          tags: shopifyProduct.tags || []
        };

        setProduct(formattedProduct);
      } catch (err) {
        setError('Impossible de charger le produit. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // Gérer le changement de variante de couleur (navigation vers un autre produit)
  const handleColorVariantChange = (index: number) => {
    const variant = colorVariants[index];
    if (variant && variant.handle !== id) {
      navigate(`/product/${variant.handle}`);
    }
    setSelectedColorVariantIndex(index);
  };

  // Images à afficher
  const displayImages = useMemo(() => {
    if (!product) return [];

    const selectedVariant = product.variants[selectedColorIndex];
    if (!selectedVariant) return product.allImages.map(img => img.url);

    const selectedColorName = selectedVariant.colorName.toLowerCase().trim();

    // Filtrer par alt text
    const filteredByAltText = product.allImages.filter(img => {
      if (!img.altText) return false;
      const altLower = img.altText.toLowerCase().trim();
      return altLower.includes(selectedColorName) ||
             selectedColorName.includes(altLower) ||
             altLower.split(' ').some(word => word === selectedColorName) ||
             altLower.split('-').some(word => word.trim() === selectedColorName);
    });

    if (filteredByAltText.length > 0) {
      return filteredByAltText.map(img => img.url);
    }

    // Utiliser l'image de la variante
    if (selectedVariant.image) {
      const otherColorNames = product.variants
        .filter((_, idx) => idx !== selectedColorIndex)
        .map(v => v.colorName.toLowerCase().trim());

      const neutralImages = product.allImages.filter(img => {
        if (!img.altText) return true;
        const altLower = img.altText.toLowerCase().trim();
        const belongsToOtherColor = otherColorNames.some(otherColor =>
          altLower.includes(otherColor) ||
          altLower.split(' ').some(word => word === otherColor)
        );
        return !belongsToOtherColor;
      });

      const variantImageUrl = selectedVariant.image;
      const otherUrls = neutralImages
        .map(img => img.url)
        .filter(url => url !== variantImageUrl);

      return [variantImageUrl, ...otherUrls];
    }

    // Fallback
    const otherColorNames = product.variants
      .filter((_, idx) => idx !== selectedColorIndex)
      .map(v => v.colorName.toLowerCase().trim());

    const genericImages = product.allImages.filter(img => {
      if (!img.altText) return true;
      const altLower = img.altText.toLowerCase().trim();
      const belongsToOtherColor = otherColorNames.some(otherColor =>
        altLower.includes(otherColor)
      );
      return !belongsToOtherColor;
    });

    if (genericImages.length === 0) {
      return product.allImages.map(img => img.url);
    }

    return genericImages.map(img => img.url);
  }, [product, selectedColorIndex]);

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

  // Version mobile avec sélecteur de couleurs
  if (isMobile) {
    const mobileProduct = {
      ...product,
      images: displayImages
    };
    return (
      <ProductPageMobile
        product={mobileProduct}
        colorVariants={colorVariants}
        selectedColorVariantIndex={selectedColorVariantIndex}
        onColorVariantChange={handleColorVariantChange}
      />
    );
  }

  // Extraire le prix numérique pour le SEO
  const priceForSEO = product?.price?.replace('€', '').trim() || '0';
  const mainImageForSEO = displayImages[0] || product?.allImages?.[0]?.url || '';

  return (
    <div className="bg-white min-h-screen">
      {/* SEO avec données structurées produit */}
      {product && (
        <SEO
          title={product.modelName || product.name}
          description={product.description?.substring(0, 160) || `Découvrez ${product.modelName || product.name}, une création d'exception de la collection RENAISSANCE Paris.`}
          image={mainImageForSEO}
          url={`/product/${id}`}
          type="product"
          product={{
            name: product.modelName || product.name,
            description: product.description || '',
            price: priceForSEO,
            currency: 'EUR',
            image: mainImageForSEO,
            availability: product.variants?.[0]?.availableForSale ? 'InStock' : 'OutOfStock',
            sku: id || '',
            brand: 'RENAISSANCE Paris',
          }}
        />
      )}

      <div className="relative">
        {/* Fixed Sidebar avec sélecteur de couleurs */}
        <ProductSidebar
          product={product}
          selectedColorIndex={selectedColorIndex}
          onColorChange={setSelectedColorIndex}
          colorVariants={colorVariants}
          selectedColorVariantIndex={selectedColorVariantIndex}
          onColorVariantChange={handleColorVariantChange}
        />

        {/* Image Navigation */}
        {displayImages.length > 0 && (
          <ProductImageNavigation
            images={displayImages}
            productName={product.name}
          />
        )}

        {/* Scrolling Content - Sections qui se superposent */}
        <div className="lg:ml-[340px] laptop:ml-[380px] xl:ml-[480px]">
          {displayImages.length > 0 ? (
            <>
              {displayImages.map((imageUrl, index) => (
                <section
                  key={`${selectedColorVariantIndex}-${index}`}
                  data-image-section
                  data-image-index={index}
                  className="w-full aspect-[4/3] lg:aspect-auto lg:min-h-screen sticky top-0 overflow-hidden"
                  style={{ zIndex: 10 + index * 10 }}
                >
                  <img
                    src={imageUrl}
                    alt={`${product.modelName} - vue ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </section>
              ))}
            </>
          ) : (
            <section className="h-screen sticky top-0 z-10 overflow-hidden flex items-center justify-center bg-neutral-50">
              <div className="text-center">
                <p className="font-sans text-dark-text/40 text-sm">Aucune image disponible</p>
              </div>
            </section>
          )}

          {/* Section Craft qui se superpose aux images */}
          <div className="sticky top-0" style={{ zIndex: 10 + displayImages.length * 10 }}>
            <ProductCraftSection />
          </div>
        </div>
      </div>

      {/* Section produits similaires */}
      <RelatedProducts currentProductId={product.id} limit={4} />

      <ProductBottomBar product={product} selectedColorIndex={selectedColorIndex} />
    </div>
  );
}
