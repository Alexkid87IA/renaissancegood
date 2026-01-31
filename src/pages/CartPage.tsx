import { useState, useEffect } from 'react';
import LocaleLink from '../components/LocaleLink';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, X, Shield, Truck, Award, Package, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { cart, isLoading, updateQuantity, removeItem } = useCart();
  const { t } = useTranslation('cart');

  const cartLines = cart?.lines.edges || [];

  const calculateSubtotal = () => {
    if (!cart) return 0;
    return parseFloat(cart.cost.subtotalAmount.amount);
  };

  const subtotal = calculateSubtotal();
  const freeShippingThreshold = 500;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 15;
  const total = subtotal + shipping;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  if (isLoading && !cart) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-8 h-8 border-2 border-bronze border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-sans text-sm text-dark-text/60">{t('loading', { ns: 'common' })}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige pt-32 pb-20 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto px-6 laptop:px-12 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-serif text-5xl laptop:text-6xl xl:text-7xl text-dark-text mb-4 leading-[0.9]">
            {t('title')}
          </h1>
          <div className="flex items-center gap-3">
            <p className="font-sans text-sm text-dark-text/60">
              {t('pieces', { count: cartLines.length })}
            </p>
            {cartLines.length > 0 && (
              <>
                <span className="text-dark-text/20">•</span>
                <p className="font-sans text-sm text-bronze font-medium">
                  {subtotal.toFixed(0)}€
                </p>
              </>
            )}
          </div>
        </motion.div>

        {cartLines.length === 0 ? (
          /* Empty Cart — Premium editorial */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto py-8 sm:py-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left — Image */}
              <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
                <img
                  src="https://renaissance-cdn.b-cdn.net/campgane.png"
                  alt="Renaissance Paris"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 via-transparent to-transparent lg:bg-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#000000] to-transparent hidden lg:block" />
              </div>

              {/* Right — Content */}
              <div className="bg-[#000000] px-8 lg:px-12 py-12 lg:py-0 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <p className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-5">
                    {t('title')}
                  </p>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
                    {t('emptyTitle')}
                  </h2>
                  <p className="font-display text-lg font-light italic text-white/40 tracking-[-0.02em] mb-6">
                    {t('emptySubtitle')}
                  </p>
                  <div className="w-10 h-px bg-white/15 mb-6" />
                  <p className="font-sans text-white/30 text-[13px] leading-[1.8] font-light mb-8 max-w-sm">
                    {t('emptyDesc')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <LocaleLink
                      to="/collections/heritage"
                      className="group relative overflow-hidden border border-white/15 px-8 py-4 transition-all duration-500 hover:border-bronze/60 text-center"
                    >
                      <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                        {t('emptyCollections')}
                      </span>
                      <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </LocaleLink>
                    <LocaleLink
                      to="/shop"
                      className="group relative overflow-hidden border border-white/8 px-8 py-4 transition-all duration-500 hover:border-white/20 text-center"
                    >
                      <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/40 group-hover:text-white/70 transition-colors duration-500">
                        {t('emptyExplore')}
                      </span>
                    </LocaleLink>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-[1fr,420px] xl:grid-cols-[1fr,480px] gap-8 lg:gap-12 xl:gap-16">
            {/* Cart Items */}
            <div className="min-w-0">
              {/* Free Shipping Progress */}
              {subtotal < freeShippingThreshold && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-bronze/20 p-6 mb-8"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-sans text-xs text-dark-text">
                      <span className="font-bold text-bronze">{remainingForFreeShipping.toFixed(0)}€</span> {t('freeShippingRemaining')}
                    </p>
                    <Truck size={18} className="text-bronze" />
                  </div>
                  <div className="w-full bg-dark-text/5 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressToFreeShipping}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-bronze"
                    />
                  </div>
                </motion.div>
              )}

              <AnimatePresence mode="popLayout">
                {cartLines.map(({ node }, index) => (
                  <CartItemWithCarousel
                    key={node.id}
                    node={node}
                    index={index}
                    isLoading={isLoading}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </AnimatePresence>

              {/* Trust Badges - Premium Version */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
              >
                {[
                  {
                    icon: Shield,
                    title: t('trustBadgeWarrantyTitle'),
                    description: t('trustBadgeWarrantyDesc')
                  },
                  {
                    icon: Truck,
                    title: t('trustBadgeShippingTitle'),
                    description: t('trustBadgeShippingDesc')
                  },
                  {
                    icon: Award,
                    title: t('trustBadgeParisTitle'),
                    description: t('trustBadgeParisDesc')
                  },
                  {
                    icon: Package,
                    title: t('trustBadgeCaseTitle'),
                    description: t('trustBadgeCaseDesc')
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                    className="bg-white border border-dark-text/10 p-6 text-center hover:border-bronze/30 transition-all duration-500 group"
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center group-hover:bg-bronze/10 transition-colors duration-500">
                        <item.icon size={24} className="text-bronze" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h4 className="font-sans text-xs tracking-[0.2em] font-bold text-dark-text uppercase mb-3">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs leading-relaxed text-dark-text/60">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary - Sticky Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white border border-dark-text/5 p-8 lg:p-10 sticky top-32">
                <h2 className="font-sans text-[10px] tracking-[0.3em] font-bold text-dark-text uppercase mb-8 pb-4 border-b border-dark-text/10">
                  {t('orderSummary')}
                </h2>

                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-dark-text/60">{t('subtotal')}</span>
                    <span className="font-sans text-lg text-dark-text">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-dark-text/60">{t('shipping')}</span>
                    <span className="font-sans text-lg text-dark-text">
                      {shipping > 0 ? `${shipping.toFixed(2)}€` : (
                        <span className="text-bronze font-medium">{t('shippingFree')}</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-8 pt-6 border-t-2 border-dark-text">
                  <span className="font-serif text-xl text-dark-text">{t('total')}</span>
                  <span className="font-serif text-3xl font-bold text-bronze">
                    {total.toFixed(2)}€
                  </span>
                </div>

                {/* Message de réassurance */}
                <div className="mb-4 p-4 bg-beige border border-bronze/20">
                  <div className="flex items-center gap-2 justify-center text-dark-text/70">
                    <Lock size={14} strokeWidth={2} className="text-bronze" />
                    <p className="font-sans text-xs">
                      {t('securePayment')}
                    </p>
                  </div>
                </div>

                {/* Bouton vers Checkout */}
                <LocaleLink
                  to="/checkout"
                  className="flex items-center justify-center gap-2 w-full bg-dark-text text-white py-5 px-6 text-center font-sans text-[10px] tracking-[0.3em] font-bold hover:bg-bronze transition-all duration-300 mb-4"
                >
                  <span>{t('checkout')}</span>
                </LocaleLink>

                <LocaleLink
                  to="/collections/heritage"
                  className="block w-full text-center py-4 font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text hover:text-bronze transition-colors duration-300 border border-dark-text/20 hover:border-bronze/40"
                >
                  {t('continueShopping')}
                </LocaleLink>

                {/* Trust Indicators */}
                <div className="mt-8 pt-8 border-t border-dark-text/10 space-y-3">
                  <div className="flex items-center gap-3 text-dark-text/60">
                    <Shield size={16} strokeWidth={1.5} className="flex-shrink-0" />
                    <p className="font-sans text-xs">{t('trustSecure')}</p>
                  </div>
                  <div className="flex items-center gap-3 text-dark-text/60">
                    <Truck size={16} strokeWidth={1.5} className="flex-shrink-0" />
                    <p className="font-sans text-xs">{t('trustFreeShipping')}</p>
                  </div>
                  <div className="flex items-center gap-3 text-dark-text/60">
                    <Package size={16} strokeWidth={1.5} className="flex-shrink-0" />
                    <p className="font-sans text-xs">{t('trustPackaging')}</p>
                  </div>
                </div>

                {/* Moyens de paiement */}
                <div className="mt-8 pt-6 border-t border-dark-text/10">
                  <p className="text-[9px] text-dark-text/40 uppercase tracking-[0.15em] text-center mb-4">
                    {t('paymentMethods')}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    {/* Visa */}
                    <div className="h-6 px-2 bg-white border border-dark-text/10 rounded flex items-center justify-center">
                      <span className="text-[9px] font-bold text-[#1A1F71] tracking-wide">VISA</span>
                    </div>
                    {/* Mastercard */}
                    <div className="w-9 h-6 bg-white border border-dark-text/10 rounded flex items-center justify-center">
                      <div className="flex items-center -space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#EB001B]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#F79E1B]"></div>
                      </div>
                    </div>
                    {/* Apple Pay */}
                    <div className="h-6 px-2 bg-black rounded flex items-center justify-center">
                      <span className="text-[9px] font-medium text-white">Pay</span>
                    </div>
                    {/* Google Pay */}
                    <div className="h-6 px-2 bg-white border border-dark-text/10 rounded flex items-center justify-center">
                      <span className="text-[9px] font-medium text-[#5F6368]">G Pay</span>
                    </div>
                    {/* PayPal */}
                    <div className="h-6 px-2 bg-[#0070BA] rounded flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">PayPal</span>
                    </div>
                    {/* CB */}
                    <div className="h-6 px-2 bg-white border border-dark-text/10 rounded flex items-center justify-center">
                      <span className="text-[9px] font-bold text-[#1A4298]">CB</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

/* CartItemWithCarousel Component */
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

function CartItemWithCarousel({ node, index, isLoading, updateQuantity, removeItem }: CartItemProps) {
  const { t } = useTranslation('cart');
  const product = node.merchandise.product;
  const price = parseFloat(node.merchandise.priceV2?.amount || node.cost?.totalAmount?.amount || '0');
  const totalPrice = price * node.quantity;
  const collection = product?.collections?.edges?.[0]?.node?.title || 'Exclusive';

  // États pour le carrousel
  const [allProductImages, setAllProductImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingImages, setLoadingImages] = useState(true);

  // Charger TOUTES les images du produit via GraphQL
  useEffect(() => {
    if (!product?.handle) {
      // Si pas de handle, utiliser les images du panier directement
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
          const images = data.data.product.images.edges.map(edge => edge.node.url);
          setAllProductImages(images);
        }
      } catch (error) {
        // Fallback sur l'image du panier
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
      className="bg-white border border-dark-text/5 overflow-hidden mb-6"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Container with Carousel - Full bleed */}
        <div className="w-full lg:w-[400px] xl:w-[480px] flex-shrink flex flex-col">
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

            {/* Badge Collection */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 z-10 pointer-events-none">
              <p className="font-sans text-[8px] tracking-[0.2em] font-bold text-dark-text uppercase">
                {collection}
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-dark-text/0 group-hover/image:bg-dark-text/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
              <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-white px-5 py-2.5">
                <p className="font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text uppercase">
                  {t('viewProduct')}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
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

          {/* Thumbnails - Style épuré */}
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

        {/* Product Details */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <LocaleLink to={`/product/${product?.handle || ''}`}>
                  <h3 className="font-serif text-2xl lg:text-3xl xl:text-4xl text-dark-text mb-3 leading-tight pr-8 hover:text-bronze transition-colors duration-300 cursor-pointer">
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

            {/* Prix */}
            <div className="mb-6 pb-6 border-b border-dark-text/5">
              <p className="font-sans text-xs text-dark-text/50 mb-2">{t('unitPrice')}</p>
              <p className="font-serif text-2xl text-bronze">
                {price.toFixed(2)}€
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between flex-wrap gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center border border-dark-text/20">
              <button
                type="button"
                onClick={() => {
                  if (node.quantity > 1) {
                    updateQuantity(node.id, node.quantity - 1);
                  } else {
                    removeItem(node.id);
                  }
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

            {/* Total Price */}
            <div className="text-right">
              <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/50 uppercase mb-1">
                Total
              </p>
              <p className="font-serif text-3xl lg:text-4xl font-bold text-dark-text">
                {totalPrice.toFixed(2)}€
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}