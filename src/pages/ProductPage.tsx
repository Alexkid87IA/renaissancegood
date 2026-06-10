// ========================================
// PAGE PRODUIT
// Affiche un produit avec navigation entre les variantes de couleur
// ========================================

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../contexts/LocaleContext';
import { getProduct, getProducts } from '../lib/shopify';
import { useDeviceType } from '../hooks/useDeviceType';
import { findRelatedColorVariants, getModelName, ColorVariant } from '../lib/productGrouping';
import ProductSidebar from '../components/product/ProductSidebar';
import ProductBottomBar from '../components/product/ProductBottomBar';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductPageMobile from '../components/mobile/ProductPageMobile';
import { Product as ShopifyProductType } from '../components/ProductCard';
import SEO from '../components/SEO';
import { resizeShopifyImage } from '../lib/imageUtils';
import { Product, ProductVariant, ProductImage } from '../types/product';
import Breadcrumb from '../components/Breadcrumb';
import { getModelEditorial } from '../data/productEditorial';

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
  const [productCollection, setProductCollection] = useState<{ handle: string; title: string } | null>(null);
  const { t: tc } = useTranslation('common');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Charger le produit et ses variantes de couleur
  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      if (!id) {
        setError(t('notFound'));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setColorVariants([]);
        setProductCollection(null);

        // L'index global sert uniquement aux coloris apparentés: on le lance
        // tout de suite, mais on ne bloque pas le rendu de la fiche produit.
        const allProductsPromise = (getProducts(shopifyLanguage) as Promise<ShopifyProductType[]>)
          .catch(() => [] as ShopifyProductType[]);
        const shopifyProduct = await getProduct(id, shopifyLanguage);

        if (cancelled) return;
        if (!shopifyProduct) {
          setError(t('notFound'));
          setLoading(false);
          return;
        }

        // Extraire toutes les images
        const allImages: ProductImage[] = shopifyProduct.images.edges.map(edge => ({
          url: edge.node.url,
          altText: edge.node.altText
        }));

        // Extraire les variantes internes (tailles, etc.)
        const variants: ProductVariant[] = shopifyProduct.variants.edges.map(edge => {
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

        const colors = variants.map(v => ({ name: v.colorName || '' }));
        const modelName = getModelName(shopifyProduct.title);

        // Éditorial interne (productEditorial.ts) : dimensions réelles par modèle.
        // Fallback sur les valeurs historiques tant que la fiche n'est pas remplie.
        const editorial = getModelEditorial(modelName);
        const dimensions = editorial
          ? {
              lens: `${editorial.model.dimensions.verre}mm`,
              bridge: `${editorial.model.dimensions.pont}mm`,
              temple: `${editorial.model.dimensions.branche}mm`,
            }
          : { lens: '51mm', bridge: '20mm', temple: '145mm' };

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
          dimensions,
          description: shopifyProduct.description || t('defaultDescription'),
          descriptionHtml: shopifyProduct.descriptionHtml || shopifyProduct.description,
          allImages: allImages,
          variants: variants,
          tags: shopifyProduct.tags || []
        };

        const knownCollections = ['heritage', 'versailles', 'isis'];
        const primaryCollection = shopifyProduct.collections?.edges
          ?.map((edge) => edge.node)
          ?.find((collection) => knownCollections.includes(collection.handle));
        if (primaryCollection) setProductCollection(primaryCollection);

        setProduct(formattedProduct);

        void allProductsPromise.then((allProducts) => {
          if (cancelled || allProducts.length === 0) return;
          const relatedVariants = findRelatedColorVariants(allProducts, id);
          setColorVariants(relatedVariants);

          const currentIndex = relatedVariants.findIndex(v => v.handle === id);
          setSelectedColorVariantIndex(currentIndex >= 0 ? currentIndex : 0);
        });
      } catch {
        if (!cancelled) setError(t('loadError'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      cancelled = true;
    };
  }, [id, shopifyLanguage, t]);

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
    const images = product.allImages || [];
    if (!selectedVariant) return images.map(img => img.url);

    const selectedColorName = (selectedVariant.colorName || '').toLowerCase().trim();

    // Filtrer par alt text
    const filteredByAltText = images.filter(img => {
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
        .map(v => (v.colorName || '').toLowerCase().trim());

      const neutralImages = images.filter(img => {
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
      .map(v => (v.colorName || '').toLowerCase().trim());

    const genericImages = images.filter(img => {
      if (!img.altText) return true;
      const altLower = img.altText.toLowerCase().trim();
      const belongsToOtherColor = otherColorNames.some(otherColor =>
        altLower.includes(otherColor)
      );
      return !belongsToOtherColor;
    });

    if (genericImages.length === 0) {
      return images.map(img => img.url);
    }

    return genericImages.map(img => img.url);
  }, [product, selectedColorIndex]);

  useEffect(() => {
    if (displayImages.length === 0) return;
    const links: HTMLLinkElement[] = [];

    for (const [index, imageUrl] of displayImages.slice(0, 2).entries()) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resizeShopifyImage(imageUrl, 1200, product?.name, index);
      link.fetchPriority = index === 0 ? 'high' : 'auto';
      document.head.appendChild(link);
      links.push(link);
    }

    return () => {
      for (const link of links) link.remove();
    };
  }, [displayImages, product?.name]);

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
  }, [displayImages, product?.name]);

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
  }, [displayImages, product?.name]);

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
            {error || t('notFound')}
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

  // Extraire le prix numérique pour le SEO
  const priceForSEO = product?.price?.replace('€', '').trim() || '0';
  const mainImageForSEO = displayImages[0] || product?.allImages?.[0]?.url || '';
  const productSeo = product ? (
    <SEO
      title={product.modelName || product.name}
      description={product.description?.substring(0, 160) || t('seoDescription', { name: product.modelName || product.name })}
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
        brand: 'Renaissance Eyewear',
      }}
    />
  ) : null;

  // Version mobile avec sélecteur de couleurs
  if (isMobile) {
    const mobileProduct = {
      ...product,
      images: displayImages
    };
    return (
      <>
        {productSeo}
        <ProductPageMobile
          product={mobileProduct}
          colorVariants={colorVariants}
          selectedColorVariantIndex={selectedColorVariantIndex}
          onColorVariantChange={handleColorVariantChange}
        />
      </>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* SEO avec données structurées produit */}
      {productSeo}

      {/* Breadcrumb */}
      <div className="pt-6 pb-2 px-6 md:px-12 lg:px-16">
        <Breadcrumb items={[
          { label: tc('breadcrumb.home'), to: '/' },
          ...(productCollection ? [{
            label: productCollection.title,
            to: `/collections/${productCollection.handle}`
          }] : [{ label: tc('breadcrumb.shop'), to: '/shop' }]),
          { label: product?.modelName || product?.name || '' },
        ]} />
      </div>

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
                  src={resizeShopifyImage(imageUrl, 1200, product.name, index)}
                  alt={t('gallery.viewAlt', { name: product.modelName, number: index + 1 })}
                  className="w-full block"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchpriority={index === 0 ? 'high' : 'auto'}
                  decoding={index === 0 ? 'sync' : 'async'}
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) calc(100vw - 440px), calc(100vw - 500px)"
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
            <div className="pointer-events-auto inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xl rounded-full shadow-lg shadow-black/[0.08] border border-dark-text/[0.08] px-3 py-2">
              {displayImages.map((thumbUrl, thumbIndex) => (
                <button
                  key={thumbIndex}
                  onClick={() => scrollToImage(thumbIndex)}
                  className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                    activeImageIndex === thumbIndex
                      ? 'ring-[1.5px] ring-dark-text ring-offset-1 w-11 h-11'
                      : 'opacity-50 hover:opacity-80 w-9 h-9'
                  }`}
                  aria-label={t('gallery.imageLabel', { number: thumbIndex + 1 })}
                >
                  <img
                    src={resizeShopifyImage(thumbUrl, 100, product.name, thumbIndex)}
                    alt={t('gallery.modelThumbAlt', { name: product.modelName, number: thumbIndex + 1 })}
                    className="w-full h-full object-contain bg-[#f5f4f0] p-1"
                    loading="lazy"
                    decoding="async"
                    sizes="44px"
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

      {/* Related products */}
      <RelatedProducts currentProductId={product.id} limit={6} />

      <ProductBottomBar product={product} selectedColorIndex={selectedColorIndex} visible={showBottomBar} />
    </div>
  );
}
