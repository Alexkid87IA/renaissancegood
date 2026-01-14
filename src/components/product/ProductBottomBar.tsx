import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

interface Variant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
  colorName: string;
  image: string | null;
}

interface ProductImage {
  url: string;
  altText: string | null;
}

interface Product {
  id: string;
  name: string;
  modelName?: string;
  collection: string;
  price: string;
  frame: string;
  lens: string;
  colors: { name: string }[];
  variants: Variant[];
  allImages?: ProductImage[];
}

interface ProductBottomBarProps {
  product: Product;
  selectedColorIndex: number;
}

export default function ProductBottomBar({ product, selectedColorIndex }: ProductBottomBarProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    const selectedVariant = product.variants[selectedColorIndex];

    if (!selectedVariant || !selectedVariant.availableForSale) {
      alert('Ce produit n\'est pas disponible');
      return;
    }

    try {
      await addToCart(selectedVariant.id);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  const selectedVariant = product.variants[selectedColorIndex];

  // Obtenir la miniature du produit
  const thumbnailUrl = selectedVariant?.image || product.allImages?.[0]?.url || null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-dark-text/10 z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="px-4 lg:px-8 py-4 flex items-center justify-between gap-4 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Miniature du produit */}
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg border border-dark-text/10 shadow-sm overflow-hidden bg-neutral-50">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={product.modelName || product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-100" />
            )}
          </div>

          {/* Infos produit */}
          <div className="hidden sm:block">
            <p className="font-display text-lg lg:text-xl font-bold text-dark-text leading-tight uppercase">
              {product.modelName || product.name}
            </p>
          </div>
        </div>
        
        {/* Prix et bouton */}
        <div className="flex items-center gap-4 lg:gap-6">
          <span className="font-display text-2xl lg:text-3xl font-bold text-dark-text">
            {selectedVariant?.price || product.price}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant?.availableForSale}
            className={`px-6 lg:px-8 py-3 lg:py-4 font-sans text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
              addedToCart
                ? 'bg-green-600 text-white'
                : 'bg-dark-text text-white hover:bg-dark-text/90'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'AJOUT...' : addedToCart ? 'AJOUTÉ ✓' : 'AJOUTER'}
          </button>
        </div>
      </div>
    </div>
  );
}