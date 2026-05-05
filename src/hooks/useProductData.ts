import { useAutoTranslate, useAutoTranslateHtml } from './useAutoTranslate';
import type { Product } from '../types/product';

/**
 * Hook centralisant la logique produit commune entre desktop (ProductSidebar)
 * et mobile (ProductPageMobile) : traductions, vérifications de tags, variante sélectionnée.
 */
export function useProductData(product: Product, selectedColorIndex: number) {
  const translatedName = useAutoTranslate(product.modelName || product.name);
  const translatedDescription = useAutoTranslate(product.description);
  const translatedDescriptionHtml = useAutoTranslateHtml(product.descriptionHtml || null);

  const isNonAdaptable = product.tags?.some(tag =>
    tag.toLowerCase() === 'non-adaptable' ||
    tag.toLowerCase() === 'solaire-uniquement'
  ) ?? false;

  const selectedVariant = product.variants[selectedColorIndex];
  const isOutOfStock = !selectedVariant?.availableForSale;
  const displayPrice = selectedVariant?.price || product.price;

  return {
    translatedName,
    translatedDescription,
    translatedDescriptionHtml,
    isNonAdaptable,
    selectedVariant,
    isOutOfStock,
    displayPrice,
  };
}
