import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createCart, addToCart as addToCartAPI, updateCartItem, removeFromCart as removeFromCartAPI, getCart } from '../lib/shopify';

// Types pour le panier
interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: {
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
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  isCartOpen: boolean;
  itemCount: number;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'renaissance_cart_id';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculer le nombre total d'articles
  const itemCount = cart?.lines.edges.reduce((total, { node }) => total + node.quantity, 0) || 0;

  // Charger le panier au démarrage
  useEffect(() => {
    const loadCart = async () => {
      const savedCartId = localStorage.getItem(CART_ID_KEY);
      
      if (savedCartId) {
        try {
          const existingCart = await getCart(savedCartId);
          if (existingCart) {
            setCart(existingCart);
            return;
          }
        } catch (error) {
          localStorage.removeItem(CART_ID_KEY);
        }
      }
      
      // Créer un nouveau panier si nécessaire
      try {
        const newCart = await createCart();
        setCart(newCart);
        localStorage.setItem(CART_ID_KEY, newCart.id);
      } catch (error) {
      }
    };

    loadCart();
  }, []);

  // Ajouter au panier
  const addToCart = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      let currentCart = cart;

      // Créer un panier si nécessaire
      if (!currentCart) {
        currentCart = await createCart();
        localStorage.setItem(CART_ID_KEY, currentCart.id);
      }

      // Ajouter l'article
      const updatedCart = await addToCartAPI(currentCart.id, variantId, quantity);
      setCart(updatedCart);
      setIsCartOpen(true); // Ouvrir le panier après ajout
    } catch (error) {
      alert('Impossible d\'ajouter l\'article au panier. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mettre à jour la quantité
  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    
    setIsLoading(true);
    try {
      const updatedCart = await updateCartItem(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      alert('Impossible de mettre à jour la quantité. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Supprimer un article
  const removeItem = async (lineId: string) => {
    if (!cart) return;
    
    setIsLoading(true);
    try {
      const updatedCart = await removeFromCartAPI(cart.id, lineId);
      setCart(updatedCart);
    } catch (error) {
      alert('Impossible de supprimer l\'article. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isCartOpen,
        itemCount,
        addToCart,
        updateQuantity,
        removeItem,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personnalisé pour utiliser le panier
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart doit être utilisé à l\'intérieur d\'un CartProvider');
  }
  return context;
}