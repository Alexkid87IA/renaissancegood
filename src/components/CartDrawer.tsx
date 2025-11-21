import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Shield, Truck, X } from 'lucide-react';

export default function CartDrawer() {
  const { cart, isCartOpen, isLoading, itemCount, updateQuantity, removeItem, closeCart } = useCart();

  const cartLines = cart?.lines.edges || [];
  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay sombre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Tiroir du panier */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-beige shadow-2xl z-[200] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-dark-text/10">
              <div>
                <h2 className="font-serif text-3xl text-dark-text leading-none mb-2">
                  Votre Panier
                </h2>
                <p className="font-sans text-xs text-dark-text/60">
                  {itemCount} {itemCount > 1 ? 'pièces' : 'pièce'} d'exception
                </p>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-dark-text/5 rounded-full transition-colors"
                aria-label="Fermer le panier"
              >
                <X size={24} className="text-dark-text" />
              </button>
            </div>

            {/* Barre progression livraison gratuite */}
            {cartLines.length > 0 && subtotal < freeShippingThreshold && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-b border-bronze/20 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-sans text-[10px] text-dark-text">
                    <span className="font-bold text-bronze">{remainingForFreeShipping.toFixed(0)}€</span> restants pour la livraison gratuite
                  </p>
                  <Truck size={14} className="text-bronze" />
                </div>
                <div className="w-full bg-dark-text/5 h-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-bronze"
                  />
                </div>
              </motion.div>
            )}

            {/* Contenu du panier */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartLines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 mb-6 rounded-full bg-white border border-dark-text/10 flex items-center justify-center">
                    <svg viewBox="0 0 100 50" className="w-16 h-8 text-dark-text/20">
                      <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                      <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                      <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-dark-text mb-2">
                    Votre panier est vide
                  </h3>
                  <p className="font-sans text-dark-text/60 text-sm mb-6 leading-relaxed">
                    Découvrez nos collections d'exception
                  </p>
                  <Link
                    to="/collections/heritage"
                    onClick={closeCart}
                    className="font-sans text-[10px] tracking-[0.3em] uppercase bg-dark-text text-white px-8 py-4 hover:bg-bronze transition-all duration-300"
                  >
                    DÉCOUVRIR
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartLines.map(({ node }) => {
                    const product = node.merchandise.product;
                    const imageUrl = product.images.edges[0]?.node.url || '';
                    const price = parseFloat(node.merchandise.priceV2.amount);
                    const collection = product.productType || 'Heritage';

                    return (
                      <motion.div
                        key={node.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="bg-white border border-dark-text/5 p-4 hover:border-dark-text/10 transition-colors"
                      >
                        <div className="flex gap-4">
                          {/* Image avec badge collection */}
                          <Link
                            to={`/product/${product.handle}`}
                            onClick={closeCart}
                            className="flex-shrink-0 relative group"
                          >
                            <div className="w-28 h-20 bg-beige flex items-center justify-center overflow-hidden">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={product.title}
                                  className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <svg viewBox="0 0 100 50" className="w-20 h-10 text-dark-text/20">
                                  <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                                  <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                                  <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="2" />
                                </svg>
                              )}
                            </div>
                            {/* Badge collection mini */}
                            <div className="absolute top-1 left-1 bg-white/95 px-1.5 py-0.5 border border-dark-text/10">
                              <p className="font-sans text-[7px] tracking-[0.15em] font-bold text-dark-text uppercase">
                                {collection}
                              </p>
                            </div>
                          </Link>

                          {/* Infos produit */}
                          <div className="flex-1 min-w-0 flex flex-col">
                            <Link
                              to={`/product/${product.handle}`}
                              onClick={closeCart}
                              className="block mb-2"
                            >
                              <h3 className="font-serif text-base text-dark-text leading-tight hover:text-bronze transition-colors line-clamp-2">
                                {product.title}
                              </h3>
                            </Link>
                            
                            {node.merchandise.title !== 'Default Title' && (
                              <p className="font-sans text-[10px] text-dark-text/50 mb-2">
                                {node.merchandise.title}
                              </p>
                            )}

                            {/* Prix et contrôles */}
                            <div className="mt-auto flex items-center justify-between">
                              <p className="font-serif text-lg text-bronze font-medium">
                                {price.toFixed(2)}€
                              </p>

                              {/* Sélecteur de quantité compact */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    if (node.quantity > 1) {
                                      updateQuantity(node.id, node.quantity - 1);
                                    } else {
                                      removeItem(node.id);
                                    }
                                  }}
                                  disabled={isLoading}
                                  className="w-7 h-7 border border-dark-text/20 flex items-center justify-center hover:bg-beige transition-colors disabled:opacity-50"
                                  aria-label="Diminuer la quantité"
                                >
                                  {node.quantity === 1 ? (
                                    <X size={12} className="text-dark-text" />
                                  ) : (
                                    <span className="text-xs">−</span>
                                  )}
                                </button>
                                <span className="w-6 text-center font-sans text-sm font-medium">
                                  {node.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(node.id, node.quantity + 1)}
                                  disabled={isLoading}
                                  className="w-7 h-7 border border-dark-text/20 flex items-center justify-center hover:bg-beige transition-colors disabled:opacity-50"
                                  aria-label="Augmenter la quantité"
                                >
                                  <span className="text-xs">+</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer avec total et actions */}
            {cartLines.length > 0 && cart && (
              <div className="border-t border-dark-text/10 bg-white p-6 space-y-4">
                {/* Mini trust badges */}
                <div className="flex items-center justify-center gap-4 pb-4 border-b border-dark-text/5">
                  <div className="flex items-center gap-1.5">
                    <Shield size={12} className="text-bronze" />
                    <span className="font-sans text-[9px] text-dark-text/60">Garantie 3 ans</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={12} className="text-bronze" />
                    <span className="font-sans text-[9px] text-dark-text/60">Livraison suivie</span>
                  </div>
                </div>

                {/* Sous-total */}
                <div className="flex items-baseline justify-between pb-4">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-dark-text/60">
                    Sous-total
                  </span>
                  <span className="font-serif text-2xl text-dark-text">
                    {subtotal.toFixed(2)}€
                  </span>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  {/* Bouton Checkout */}
                  <a
                    href={cart.checkoutUrl}
                    className="block w-full bg-dark-text text-white text-center font-sans text-[10px] tracking-[0.3em] uppercase py-4 hover:bg-bronze transition-all duration-300"
                  >
                    FINALISER LA COMMANDE
                  </a>

                  {/* Bouton Voir le panier complet */}
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="block w-full border border-dark-text text-dark-text text-center font-sans text-[10px] tracking-[0.3em] uppercase py-4 hover:bg-dark-text hover:text-white transition-all duration-300"
                  >
                    VOIR LE PANIER COMPLET
                  </Link>
                </div>

                <p className="font-sans text-[9px] text-dark-text/40 text-center leading-relaxed">
                  Les taxes et frais de livraison seront calculés à l'étape suivante
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}