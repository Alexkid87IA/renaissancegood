import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, Shield, Truck, Award, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { cart, isLoading, updateQuantity, removeItem } = useCart();

  const cartLines = cart?.lines.edges || [];

  const calculateSubtotal = () => {
    if (!cart) return 0;
    return parseFloat(cart.cost.subtotalAmount.amount);
  };

  const subtotal = calculateSubtotal();
  const freeShippingThreshold = 500;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 15;
  const total = cart ? parseFloat(cart.cost.totalAmount.amount) + shipping : 0;
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
          <p className="font-sans text-sm text-dark-text/60">Chargement de votre panier...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 laptop:px-12 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-serif text-5xl laptop:text-6xl xl:text-7xl text-dark-text mb-4 leading-[0.9]">
            Votre Panier
          </h1>
          <div className="flex items-center gap-3">
            <p className="font-sans text-sm text-dark-text/60">
              {cartLines.length} {cartLines.length === 1 ? 'pièce d\'exception' : 'pièces d\'exception'}
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
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <div className="bg-white border border-dark-text/5 p-12 laptop:p-16">
              <div className="w-20 h-20 mx-auto mb-8 opacity-20">
                <svg viewBox="0 0 100 50" className="w-full h-full text-dark-text">
                  <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                  <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h2 className="font-serif text-3xl text-dark-text mb-4">
                Votre panier est vide
              </h2>
              <p className="font-sans text-dark-text/60 mb-10 leading-relaxed">
                Découvrez nos collections d'exception et trouvez la monture<br />
                qui révélera votre style unique.
              </p>
              <Link
                to="/collections/heritage"
                className="inline-block bg-dark-text text-white px-10 py-5 font-sans text-[10px] tracking-[0.3em] font-bold hover:bg-bronze transition-all duration-300"
              >
                DÉCOUVRIR NOS COLLECTIONS
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-[1fr,420px] xl:grid-cols-[1fr,480px] gap-8 lg:gap-12 xl:gap-16">
            {/* Cart Items */}
            <div>
              {/* Free Shipping Progress */}
              {subtotal < freeShippingThreshold && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-bronze/20 p-6 mb-8"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-sans text-xs text-dark-text">
                      <span className="font-bold text-bronze">{remainingForFreeShipping.toFixed(0)}€</span> restants pour la livraison gratuite
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
                    title: 'Garantie 3 ans',
                    description: 'Protection complète contre les défauts de fabrication et la casse accidentelle'
                  },
                  { 
                    icon: Truck, 
                    title: 'Livraison suivie',
                    description: 'Expédition sécurisée avec suivi en temps réel, livrée en 2-4 jours ouvrés'
                  },
                  { 
                    icon: Award, 
                    title: 'Création Parisienne',
                    description: 'Designé dans nos ateliers parisiens avec une attention méticuleuse aux détails'
                  },
                  { 
                    icon: Package, 
                    title: 'Étui luxe offert',
                    description: 'Chaque paire accompagnée d\'un étui premium et d\'un chiffon en microfibre'
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
                  Récapitulatif
                </h2>

                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-dark-text/60">Sous-total</span>
                    <span className="font-sans text-lg text-dark-text">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-dark-text/60">Livraison</span>
                    <span className="font-sans text-lg text-dark-text">
                      {shipping > 0 ? `${shipping.toFixed(2)}€` : (
                        <span className="text-bronze font-medium">Gratuite</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-8 pt-6 border-t-2 border-dark-text">
                  <span className="font-serif text-xl text-dark-text">Total</span>
                  <span className="font-serif text-3xl font-bold text-bronze">
                    {total.toFixed(2)}€
                  </span>
                </div>

                {/* MODIFICATION ICI : Bouton redirige vers /checkout au lieu de cart.checkoutUrl */}
                <Link
                  to="/checkout"
                  className="block w-full bg-dark-text text-white py-5 px-6 text-center font-sans text-[10px] tracking-[0.3em] font-bold hover:bg-bronze transition-all duration-300 mb-4"
                >
                  FINALISER LA COMMANDE
                </Link>

                <Link
                  to="/collections/heritage"
                  className="block w-full text-center py-4 font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text hover:text-bronze transition-colors duration-300 border border-dark-text/20 hover:border-bronze/40"
                >
                  CONTINUER MES ACHATS
                </Link>

                {/* Trust Indicators */}
                <div className="mt-8 pt-8 border-t border-dark-text/10 space-y-3">
                  <div className="flex items-center gap-3 text-dark-text/60">
                    <Shield size={16} strokeWidth={1.5} className="flex-shrink-0" />
                    <p className="font-sans text-xs">Paiement 100% sécurisé</p>
                  </div>
                  <div className="flex items-center gap-3 text-dark-text/60">
                    <Truck size={16} strokeWidth={1.5} className="flex-shrink-0" />
                    <p className="font-sans text-xs">Livraison gratuite dès 500€</p>
                  </div>
                  <div className="flex items-center gap-3 text-dark-text/60">
                    <Package size={16} strokeWidth={1.5} className="flex-shrink-0" />
                    <p className="font-sans text-xs">Emballage premium inclus</p>
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
interface CartItemProps {
  node: any;
  index: number;
  isLoading: boolean;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

function CartItemWithCarousel({ node, index, isLoading, updateQuantity, removeItem }: CartItemProps) {
  const product = node.merchandise.product;
  const price = parseFloat(node.merchandise.price?.amount || node.cost?.totalAmount?.amount || '0');
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
        {/* Image Container with Carousel */}
        <div className="w-full lg:w-[400px] xl:w-[480px] flex-shrink-0 bg-beige flex flex-col">
          <Link 
            to={`/product/${product?.handle || ''}`}
            className="relative group/image flex-1 min-h-[300px] lg:min-h-[400px] flex items-center justify-center overflow-hidden"
          >
            {loadingImages ? (
              <div className="w-8 h-8 border-2 border-bronze border-t-transparent rounded-full animate-spin" />
            ) : (
              <AnimatePresence mode="wait">
                {allProductImages.map((img, i) => i === currentImageIndex && (
                  <motion.img
                    key={i}
                    src={img}
                    alt={`${product?.title || 'Produit'} - Image ${i + 1}`}
                    className="w-full h-full object-contain p-8 cursor-pointer"
                    style={{ aspectRatio: '4/3' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </AnimatePresence>
            )}

            {/* Badge Collection */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 border border-dark-text/10 z-10 pointer-events-none">
              <p className="font-sans text-[8px] tracking-[0.2em] font-bold text-dark-text uppercase">
                Collection {collection}
              </p>
            </div>

            {/* Hover overlay avec texte "Voir le produit" */}
            <div className="absolute inset-0 bg-dark-text/0 group-hover/image:bg-dark-text/5 transition-colors duration-300 flex items-center justify-center pointer-events-none">
              <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-white/95 px-4 py-2 border border-dark-text/10">
                <p className="font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text uppercase">
                  Voir le produit
                </p>
              </div>
            </div>

            {/* Navigation Arrows - Visibles seulement s'il y a plusieurs images */}
            {!loadingImages && allProductImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 z-20 border border-dark-text/10"
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={18} className="text-dark-text" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 z-20 border border-dark-text/10"
                  aria-label="Image suivante"
                >
                  <ChevronRight size={18} className="text-dark-text" strokeWidth={2.5} />
                </button>

                {/* Indicateurs de position */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {allProductImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => handleThumbnailClick(e, i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentImageIndex
                          ? 'bg-bronze w-8'
                          : 'bg-white/60 hover:bg-white/90 w-2'
                      }`}
                      aria-label={`Aller à l'image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </Link>

          {/* Thumbnails - Affichés seulement s'il y a plusieurs images */}
          {!loadingImages && allProductImages.length > 1 && (
            <div className="flex gap-2 p-4 bg-white border-t border-dark-text/5 overflow-x-auto">
              {allProductImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => handleThumbnailClick(e, i)}
                  className={`flex-shrink-0 w-20 aspect-[4/3] bg-beige border-2 transition-all duration-200 overflow-hidden ${
                    i === currentImageIndex
                      ? 'border-bronze ring-1 ring-bronze/20'
                      : 'border-transparent hover:border-dark-text/20'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product?.title || 'Produit'} thumbnail ${i + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
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
                <Link to={`/product/${product?.handle || ''}`}>
                  <h3 className="font-serif text-2xl lg:text-3xl xl:text-4xl text-dark-text mb-3 leading-tight pr-8 hover:text-bronze transition-colors duration-300 cursor-pointer">
                    {product?.title || 'Produit'}
                  </h3>
                </Link>
                {node.merchandise?.title && node.merchandise.title !== 'Default Title' && (
                  <p className="font-sans text-xs text-dark-text/60 mb-2">
                    Variante : <span className="text-dark-text">{node.merchandise.title}</span>
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeItem(node.id)}
                disabled={isLoading}
                className="text-dark-text/30 hover:text-dark-text transition-colors disabled:opacity-50 p-2 flex-shrink-0"
                aria-label="Retirer du panier"
              >
                <X size={20} />
              </button>
            </div>

            {/* Prix */}
            <div className="mb-6 pb-6 border-b border-dark-text/5">
              <p className="font-sans text-xs text-dark-text/50 mb-2">Prix unitaire</p>
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
                aria-label="Diminuer la quantité"
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
                aria-label="Augmenter la quantité"
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