import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LocaleLink from '../LocaleLink';

interface CartLineNode {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2?: {
      amount: string;
      currencyCode: string;
    };
    product: {
      id: string;
      title: string;
      handle: string;
      images: {
        edges: Array<{
          node: {
            url: string;
            altText: string | null;
          };
        }>;
      };
      collections?: {
        edges: Array<{
          node: {
            title: string;
          };
        }>;
      };
    };
  };
  cost?: {
    totalAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface CartItemProps {
  node: CartLineNode;
  index: number;
  isLoading: boolean;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

export default function CartItemWithCarousel({ node, index, isLoading, updateQuantity, removeItem }: CartItemProps) {
  const { t } = useTranslation('cart');
  const product = node.merchandise.product;
  const price = parseFloat(node.merchandise.priceV2?.amount || node.cost?.totalAmount?.amount || '0');
  const totalPrice = price * node.quantity;
  const collection = product?.collections?.edges?.[0]?.node?.title || 'Exclusive';

  // États pour le carrousel
  const [allProductImages, setAllProductImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingImages, setLoadingImages] = useState(true);

  // Charger TOUTES les images du produit via GraphQL
  useEffect(() => {
    if (!product?.handle) {
      const fallbackImages = product?.images?.edges?.map(edge => edge.node.url) || [];
      setAllProductImages(fallbackImages);
      setLoadingImages(false);
      return;
    }

    const fetchAllImages = async () => {
      try {
        const response = await fetch(`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
          },
          body: JSON.stringify({
            query: `
              query GetProductImages($handle: String!) {
                product(handle: $handle) {
                  images(first: 10) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              handle: product.handle
            }
          })
        });

        const data = await response.json();
        if (data.data?.product?.images?.edges) {
          const images = data.data.product.images.edges.map((edge: { node: { url: string } }) => edge.node.url);
          setAllProductImages(images);
        }
      } catch {
        const fallbackImages = product.images.edges.map(edge => edge.node.url);
        setAllProductImages(fallbackImages);
      } finally {
        setLoadingImages(false);
      }
    };

    fetchAllImages();
  }, [product?.handle]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allProductImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allProductImages.length) % allProductImages.length);
  };

  const handleThumbnailClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(idx);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-dark-text/5 overflow-hidden mb-4 lg:mb-6"
    >
      {/* MOBILE LAYOUT */}
      <div className="lg:hidden">
        <LocaleLink
          to={`/product/${product?.handle || ''}`}
          className="relative block aspect-[16/9] overflow-hidden bg-neutral-100"
        >
          {loadingImages ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-bronze border-t-transparent rounded-full animate-spin" />
            </div>
          ) : allProductImages[currentImageIndex] ? (
            <img
              src={allProductImages[currentImageIndex]}
              alt={product?.title || 'Produit'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : null}

          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 z-10 pointer-events-none">
            <p className="font-sans text-[7px] tracking-[0.2em] font-bold text-dark-text uppercase">
              {collection}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeItem(node.id); }}
            disabled={isLoading}
            className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm flex items-center justify-center text-dark-text/40 hover:text-dark-text transition-colors disabled:opacity-50 z-10"
            aria-label={t('removeFromCart')}
          >
            <X size={14} />
          </button>

          {!loadingImages && allProductImages.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
              {allProductImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImageIndex(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === currentImageIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {!loadingImages && allProductImages.length > 1 && (
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          )}
        </LocaleLink>

        <div className="px-4 py-4">
          <div className="flex items-start justify-between gap-3 mb-1">
            <LocaleLink to={`/product/${product?.handle || ''}`} className="flex-1 min-w-0">
              <h3 className="font-serif text-lg text-dark-text leading-tight">
                {product?.title || 'Produit'}
              </h3>
            </LocaleLink>
            <p className="font-serif text-lg text-bronze flex-shrink-0">
              {price.toFixed(2)}€
            </p>
          </div>

          {node.merchandise?.title && node.merchandise.title !== 'Default Title' && (
            <p className="font-sans text-[10px] text-dark-text/40 tracking-[0.05em] uppercase mb-3">
              {node.merchandise.title}
            </p>
          )}

          <div className="w-full h-px bg-dark-text/6 my-3" />

          <div className="flex items-center justify-between">
            <div className="flex items-center border border-dark-text/12">
              <button
                type="button"
                onClick={() => {
                  if (node.quantity > 1) updateQuantity(node.id, node.quantity - 1);
                  else removeItem(node.id);
                }}
                disabled={isLoading}
                className="w-9 h-9 flex items-center justify-center hover:bg-beige transition-colors disabled:opacity-50"
                aria-label={t('decreaseQuantity')}
              >
                {node.quantity === 1 ? <X size={13} /> : <Minus size={13} />}
              </button>
              <motion.span
                key={node.quantity}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-9 h-9 flex items-center justify-center font-sans text-sm font-medium border-x border-dark-text/12"
              >
                {node.quantity}
              </motion.span>
              <button
                type="button"
                onClick={() => updateQuantity(node.id, node.quantity + 1)}
                disabled={isLoading}
                className="w-9 h-9 flex items-center justify-center hover:bg-beige transition-colors disabled:opacity-50"
                aria-label={t('increaseQuantity')}
              >
                <Plus size={13} />
              </button>
            </div>

            <div className="text-right">
              <p className="font-sans text-[8px] tracking-[0.15em] text-dark-text/35 uppercase mb-0.5">Total</p>
              <p className="font-serif text-xl font-bold text-dark-text">
                {totalPrice.toFixed(2)}€
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block">
        <div className="flex flex-row">
          <div className="w-[400px] xl:w-[480px] flex-shrink flex flex-col">
            <LocaleLink
              to={`/product/${product?.handle || ''}`}
              className="relative group/image aspect-[4/3] overflow-hidden bg-neutral-100"
            >
              {loadingImages ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-bronze border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {allProductImages.map((img, i) => i === currentImageIndex && (
                    <motion.img
                      key={i}
                      src={img}
                      alt={`${product?.title || 'Produit'} - Image ${i + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </AnimatePresence>
              )}

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 z-10 pointer-events-none">
                <p className="font-sans text-[8px] tracking-[0.2em] font-bold text-dark-text uppercase">
                  {collection}
                </p>
              </div>

              <div className="absolute inset-0 bg-dark-text/0 group-hover/image:bg-dark-text/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-white px-5 py-2.5">
                  <p className="font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text uppercase">
                    {t('viewProduct')}
                  </p>
                </div>
              </div>

              {!loadingImages && allProductImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white w-10 h-10 flex items-center justify-center transition-all duration-200 opacity-0 group-hover/image:opacity-100 z-20"
                    aria-label={t('prevImage')}
                  >
                    <ChevronLeft size={20} className="text-dark-text" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white w-10 h-10 flex items-center justify-center transition-all duration-200 opacity-0 group-hover/image:opacity-100 z-20"
                    aria-label={t('nextImage')}
                  >
                    <ChevronRight size={20} className="text-dark-text" strokeWidth={2} />
                  </button>
                </>
              )}
            </LocaleLink>

            {!loadingImages && allProductImages.length > 1 && (
              <div className="flex bg-white border-t border-dark-text/5">
                {allProductImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => handleThumbnailClick(e, i)}
                    className={`flex-1 aspect-[4/3] transition-all duration-200 overflow-hidden relative ${
                      i === currentImageIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product?.title || 'Produit'} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {i === currentImageIndex && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark-text" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 p-8 flex flex-col">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <LocaleLink to={`/product/${product?.handle || ''}`}>
                    <h3 className="font-serif text-3xl xl:text-4xl text-dark-text mb-3 leading-tight pr-8 hover:text-bronze transition-colors duration-300 cursor-pointer">
                      {product?.title || 'Produit'}
                    </h3>
                  </LocaleLink>
                  {node.merchandise?.title && node.merchandise.title !== 'Default Title' && (
                    <p className="font-sans text-xs text-dark-text/60 mb-2">
                      {t('variant')} <span className="text-dark-text">{node.merchandise.title}</span>
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(node.id)}
                  disabled={isLoading}
                  className="text-dark-text/30 hover:text-dark-text transition-colors disabled:opacity-50 p-2 flex-shrink-0"
                  aria-label={t('removeFromCart')}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6 pb-6 border-b border-dark-text/5">
                <p className="font-sans text-xs text-dark-text/50 mb-2">{t('unitPrice')}</p>
                <p className="font-serif text-2xl text-bronze">
                  {price.toFixed(2)}€
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between flex-wrap gap-4">
              <div className="flex items-center border border-dark-text/20">
                <button
                  type="button"
                  onClick={() => {
                    if (node.quantity > 1) updateQuantity(node.id, node.quantity - 1);
                    else removeItem(node.id);
                  }}
                  disabled={isLoading}
                  className="p-3 hover:bg-beige transition-colors disabled:opacity-50"
                  aria-label={t('decreaseQuantity')}
                >
                  {node.quantity === 1 ? <X size={16} /> : <Minus size={16} />}
                </button>
                <motion.span
                  key={node.quantity}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-6 font-sans text-base font-medium min-w-[60px] text-center"
                >
                  {node.quantity}
                </motion.span>
                <button
                  type="button"
                  onClick={() => updateQuantity(node.id, node.quantity + 1)}
                  disabled={isLoading}
                  className="p-3 hover:bg-beige transition-colors disabled:opacity-50"
                  aria-label={t('increaseQuantity')}
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-right">
                <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">
                  Total
                </p>
                <p className="font-serif text-4xl font-bold text-dark-text">
                  {totalPrice.toFixed(2)}€
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
