import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_collection: string;
  selected_frame: string;
  selected_lens: string;
  selected_color: string;
  price: string;
  quantity: number;
  image_url: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setIsLoading(false);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('€', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-dark-text font-sans text-sm">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-8 laptop:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-5xl laptop:text-6xl font-bold text-dark-text mb-3 leading-[0.95]">
            Panier
          </h1>
          <p className="font-sans text-sm text-dark-text/60 mb-12">
            {cartItems.length} {cartItems.length === 1 ? 'article' : 'articles'}
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center py-20"
          >
            <p className="font-sans text-dark-text/60 mb-8">Votre panier est vide</p>
            <Link
              to="/collections"
              className="inline-block bg-dark-text text-white px-8 py-4 font-sans text-[10px] tracking-[0.3em] font-bold hover:bg-dark-text/90 transition-colors duration-200"
            >
              DÉCOUVRIR NOS COLLECTIONS
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 laptop:gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-dark-text/10 pb-8 mb-8 last:border-b-0"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-32 laptop:w-40 h-32 laptop:h-40 bg-neutral-50 flex-shrink-0 flex items-center justify-center p-4">
                        <svg viewBox="0 0 100 50" className="w-full h-full text-dark-text">
                          <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                          <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                          <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between mb-3">
                          <div>
                            <p className="font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text/50 uppercase mb-1">
                              {item.product_collection}
                            </p>
                            <h3 className="font-display text-2xl laptop:text-3xl font-bold text-dark-text mb-2">
                              {item.product_name}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-dark-text/40 hover:text-dark-text transition-colors"
                            aria-label="Retirer du panier"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex gap-4 text-xs">
                            <span className="font-sans text-dark-text/60">Monture:</span>
                            <span className="font-sans text-dark-text">{item.selected_frame}</span>
                          </div>
                          <div className="flex gap-4 text-xs">
                            <span className="font-sans text-dark-text/60">Verres:</span>
                            <span className="font-sans text-dark-text">{item.selected_lens}</span>
                          </div>
                          <div className="flex gap-4 text-xs">
                            <span className="font-sans text-dark-text/60">Couleur:</span>
                            <span className="font-sans text-dark-text">{item.selected_color}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-dark-text/20">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-neutral-50 transition-colors"
                              aria-label="Diminuer la quantité"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-4 font-sans text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-neutral-50 transition-colors"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-sans text-lg laptop:text-xl font-semibold text-dark-text">
                              {item.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="border border-dark-text/10 p-8 sticky top-32">
                <h2 className="font-sans text-[10px] tracking-[0.3em] font-bold text-dark-text uppercase mb-6">
                  Récapitulatif
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-dark-text/10">
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-dark-text/60">Sous-total</span>
                    <span className="font-sans text-sm text-dark-text">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-dark-text/60">Livraison</span>
                    <span className="font-sans text-sm text-dark-text">
                      {shipping > 0 ? `€${shipping.toFixed(2)}` : 'Gratuite'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="font-sans text-base font-bold text-dark-text">Total</span>
                  <span className="font-sans text-xl font-bold text-dark-text">€{total.toFixed(2)}</span>
                </div>

                <button className="w-full bg-dark-text text-white px-6 py-4 font-sans text-[10px] tracking-[0.3em] font-bold hover:bg-dark-text/90 transition-colors duration-200 mb-4">
                  COMMANDER
                </button>

                <Link
                  to="/collections"
                  className="block text-center font-sans text-xs text-dark-text/60 hover:text-dark-text transition-colors"
                >
                  Continuer mes achats
                </Link>

                <div className="mt-8 pt-8 border-t border-dark-text/10">
                  <p className="font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text/50 uppercase mb-3">
                    Avantages
                  </p>
                  <ul className="space-y-2 text-xs text-dark-text/70">
                    <li>• Livraison gratuite dès €500</li>
                    <li>• Retours sous 30 jours</li>
                    <li>• Garantie 2 ans</li>
                    <li>• Étui de luxe offert</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
