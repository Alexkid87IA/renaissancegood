// ========================================
// PAGE PRODUIT
// Affiche un produit avec navigation entre les variantes de couleur
// ========================================

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../contexts/LocaleContext';
import { getProduct, getProducts } from '../lib/shopify';
import { useDeviceType } from '../hooks/useDeviceType';
import { findRelatedColorVariants, getModelName, ColorVariant, getColorSwatchStyle } from '../lib/productGrouping';
import ProductSidebar from '../components/product/ProductSidebar';
import ProductBottomBar from '../components/product/ProductBottomBar';
import RelatedProducts from '../components/product/RelatedProducts';
import ColorVariantsSection from '../components/product/ColorVariantsSection';
import ProductPageMobile from '../components/mobile/ProductPageMobile';
import { Product as ShopifyProductType } from '../components/ProductCard';
import SEO from '../components/SEO';

function resizeShopifyImage(url: string, width: number): string {
  if (!url || !url.includes('cdn.shopify.com')) return url;
  return url.replace(/(\.\w+)(\?|$)/, `_${width}x$1$2`);
}

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
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation('product');
  const { shopifyLanguage } = useLocale();
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
        setError(t('notFound', { ns: 'common' }));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Charger le produit actuel
        const shopifyProduct: ShopifyProduct = await getProduct(id, shopifyLanguage);

        if (!shopifyProduct) {
          setError(t('notFound', { ns: 'common' }));
          setLoading(false);
          return;
        }

        // Charger tous les produits pour trouver les variantes de couleur
        const allProducts = await getProducts(shopifyLanguage) as ShopifyProductType[];
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
          badge: '',
          price: `€${parseFloat(shopifyProduct.priceRange.minVariantPrice.amount).toFixed(2)}`,
          frame: colors[0]?.name || 'Default',
          lens: 'Clear Lens',
          colors: colors,
          dimensions: {
            lens: '51mm',
            bridge: '20mm',
            temple: '145mm'
          },
          description: shopifyProduct.description || t('defaultDescription'),
          descriptionHtml: shopifyProduct.descriptionHtml || shopifyProduct.description,
          allImages: allImages,
          variants: variants,
          tags: shopifyProduct.tags || []
        };

        setProduct(formattedProduct);
      } catch (err) {
        setError(t('loadError'));
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id, shopifyLanguage]);

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

  // Refs pour synchroniser le scroll du panneau info avec le scroll de la galerie
  const galleryRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);

  // Track active image index for thumbnail navigation
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const sections = gallery.querySelectorAll<HTMLElement>('[data-image-index]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-image-index') || '0');
            setActiveImageIndex(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => { sections.forEach((el) => observer.unobserve(el)); };
  }, [displayImages]);

  const scrollToImage = useCallback((index: number) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const sections = gallery.querySelectorAll<HTMLElement>('[data-image-index]');
    const target = sections[index];
    if (!target) return;

    // Each sticky section stacks at top:0, so scroll to cumulative offset
    const galleryTop = gallery.getBoundingClientRect().top + window.scrollY;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += sections[i].offsetHeight;
    }
    window.scrollTo({ top: galleryTop + offset, behavior: 'smooth' });
  }, []);

  // Auto-scroll du panneau produit quand l'utilisateur scrolle les images
  useEffect(() => {
    const panel = infoPanelRef.current;
    const gallery = galleryRef.current;
    if (!panel || !gallery) return;

    const onScroll = () => {
      const overflow = panel.scrollHeight - panel.clientHeight;
      if (overflow <= 0) return;

      const galleryRect = gallery.getBoundingClientRect();
      const scrollRange = gallery.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const progress = Math.max(0, Math.min(1, -galleryRect.top / scrollRange));
      panel.scrollTop = progress * overflow;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [displayImages]);

  // Afficher la bottom bar dès que le prix dans la sidebar disparaît du viewport
  const [showBottomBar, setShowBottomBar] = useState(false);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const priceEl = priceRef.current;
    if (!priceEl) return;

    const onScroll = () => {
      const rect = priceEl.getBoundingClientRect();
      // Le prix est hors écran quand son bas est au-dessus du viewport
      setShowBottomBar(rect.bottom < 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [product]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-dark-text mb-6"></div>
          <p className="font-sans text-dark-text/60 text-sm tracking-wider uppercase">
            {t('loadingProduct')}
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
            {error || t('notFound', { ns: 'common' })}
          </p>
          <button
            onClick={() => navigate('/collections/heritage')}
            className="font-sans text-xs tracking-wider uppercase border border-dark-text px-6 py-3 hover:bg-dark-text hover:text-white transition-colors"
          >
            {t('backToCollections')}
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

      {/* Two-column layout: Gallery (left) + Product Info (right) */}
      <div className="lg:grid lg:grid-cols-[1fr,440px] xl:grid-cols-[1fr,500px]">

        {/* Left Column: Image Gallery — sticky z-index scroll effect */}
        <div ref={galleryRef} className="relative">
          {displayImages.length > 0 ? (
            displayImages.map((imageUrl, index) => (
              <section
                key={`${selectedColorVariantIndex}-${index}`}
                className="w-full sticky top-0 overflow-hidden"
                style={{ zIndex: 10 + index * 10 }}
                data-image-index={index}
              >
                <img
                  src={resizeShopifyImage(imageUrl, 1200)}
                  alt={`${product.modelName} - vue ${index + 1}`}
                  className="w-full block"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </section>
            ))
          ) : (
            <div className="aspect-square flex items-center justify-center">
              <p className="font-sans text-dark-text/40 text-sm">{t('noImage')}</p>
            </div>
          )}
        </div>

        {/* Thumbnail navigation — fixed bottom, left column only */}
        {displayImages.length > 1 && (
          <div className="fixed bottom-6 z-50 left-0 lg:right-[440px] xl:right-[500px] right-0 flex justify-center pointer-events-none">
            <div className="pointer-events-auto inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xl rounded-full shadow-lg shadow-black/8 border border-dark-text/8 px-3 py-2">
              {displayImages.map((thumbUrl, thumbIndex) => (
                <button
                  key={thumbIndex}
                  onClick={() => scrollToImage(thumbIndex)}
                  className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                    activeImageIndex === thumbIndex
                      ? 'ring-[1.5px] ring-dark-text ring-offset-1 w-11 h-11'
                      : 'opacity-50 hover:opacity-80 w-9 h-9'
                  }`}
                  aria-label={`Image ${thumbIndex + 1}`}
                >
                  <img
                    src={resizeShopifyImage(thumbUrl, 100)}
                    alt={`${product.modelName} - miniature ${thumbIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Right Column: Product Info (sticky on desktop, scroll synced) */}
        <div ref={infoPanelRef} className="border-t lg:border-t-0 lg:border-l border-dark-text/10 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <ProductSidebar
            product={product}
            selectedColorIndex={selectedColorIndex}
            onColorChange={setSelectedColorIndex}
            colorVariants={colorVariants}
            selectedColorVariantIndex={selectedColorVariantIndex}
            onColorVariantChange={handleColorVariantChange}
            priceRef={priceRef}
          />
        </div>
      </div>

      {/* Section autres coloris */}
      <ColorVariantsSection
        colorVariants={colorVariants}
        selectedColorVariantIndex={selectedColorVariantIndex}
        onColorVariantChange={handleColorVariantChange}
        currentHandle={id}
      />

      {/* Related products */}
      <RelatedProducts currentProductId={product.id} limit={4} />

      <ProductBottomBar product={product} selectedColorIndex={selectedColorIndex} visible={showBottomBar} />
    </div>
  );
}
