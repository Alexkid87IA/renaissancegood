// ========================================
// UTILITAIRE DE REGROUPEMENT DES PRODUITS PAR MODÈLE
// Regroupe les variantes de couleur sous un même modèle
// ========================================

import { Product } from '../components/ProductCard';

// Type pour un produit groupé avec ses variantes de couleur
export interface GroupedProduct {
  modelName: string;           // Ex: "Renaissance XXXIX"
  mainProduct: Product;        // Produit principal (premier coloris)
  colorVariants: ColorVariant[]; // Tous les coloris disponibles
}

export interface ColorVariant {
  colorNumber: string;         // Ex: "1", "2", "3"
  colorName: string;           // Nom de la couleur (extrait des tags si disponible)
  product: Product;            // Le produit Shopify complet
  handle: string;              // Handle pour navigation
  thumbnail: string | null;    // URL de la première image du produit
}

// ========================================
// EXTRACTION DU NOM DU MODÈLE
// ========================================
/**
 * Extrait le nom du modèle depuis le titre du produit
 * "Renaissance XXXIX Colori 3" → "Renaissance XXXIX"
 */
export function getModelName(title: string): string {
  // Pattern: tout ce qui précède "Colori" ou "colori"
  const match = title.match(/^(.+?)\s+[Cc]olori\s*\d*$/i);
  if (match) {
    return match[1].trim();
  }
  // Si pas de pattern "Colori", retourner le titre complet
  return title;
}

/**
 * Extrait le numéro de coloris depuis le titre
 * "Renaissance XXXIX Colori 3" → "3"
 */
export function getColorNumber(title: string): string {
  const match = title.match(/[Cc]olori\s*(\d+|[IVX]+)$/i);
  if (match) {
    return match[1];
  }
  return '1';
}

/**
 * Extrait le nom de la couleur depuis les tags du produit
 * Cherche des tags comme "Noir", "Écaille", "Or", etc.
 */
export function getColorNameFromTags(tags: string[] | undefined): string | null {
  if (!tags) return null;

  // Liste de couleurs courantes à chercher dans les tags
  const colorKeywords = [
    'noir', 'black', 'écaille', 'tortoise', 'or', 'gold', 'argent', 'silver',
    'bleu', 'blue', 'vert', 'green', 'rouge', 'red', 'rose', 'pink',
    'marron', 'brown', 'beige', 'cristal', 'crystal', 'transparent',
    'havane', 'havana', 'champagne', 'bordeaux', 'burgundy', 'gris', 'grey', 'gray'
  ];

  for (const tag of tags) {
    const tagLower = tag.toLowerCase();
    for (const color of colorKeywords) {
      if (tagLower.includes(color)) {
        return tag;
      }
    }
  }

  return null;
}

// ========================================
// REGROUPEMENT DES PRODUITS
// ========================================
/**
 * Regroupe les produits par modèle
 * Retourne une Map avec le nom du modèle comme clé
 */
export function groupProductsByModel(products: Product[]): Map<string, Product[]> {
  const groups = new Map<string, Product[]>();

  for (const product of products) {
    const modelName = getModelName(product.title);

    if (!groups.has(modelName)) {
      groups.set(modelName, []);
    }
    groups.get(modelName)!.push(product);
  }

  // Trier les variantes par numéro de coloris
  for (const [modelName, variants] of groups) {
    variants.sort((a, b) => {
      const numA = parseInt(getColorNumber(a.title)) || 0;
      const numB = parseInt(getColorNumber(b.title)) || 0;
      return numA - numB;
    });
    groups.set(modelName, variants);
  }

  return groups;
}

/**
 * Extrait l'URL de la première image d'un produit
 */
function getFirstImageUrl(product: Product): string | null {
  if (product.images?.edges?.length > 0) {
    return product.images.edges[0].node.url;
  }
  return null;
}

/**
 * Convertit les produits en liste de produits groupés
 * Retourne un tableau de GroupedProduct pour affichage
 */
export function getGroupedProducts(products: Product[]): GroupedProduct[] {
  const groups = groupProductsByModel(products);
  const result: GroupedProduct[] = [];

  for (const [modelName, variants] of groups) {
    const colorVariants: ColorVariant[] = variants.map(product => ({
      colorNumber: getColorNumber(product.title),
      colorName: getColorNameFromTags(product.tags) || `Coloris ${getColorNumber(product.title)}`,
      product,
      handle: product.handle,
      thumbnail: getFirstImageUrl(product)
    }));

    result.push({
      modelName,
      mainProduct: variants[0], // Premier coloris comme produit principal
      colorVariants
    });
  }

  return result;
}

/**
 * Trouve tous les coloris d'un même modèle à partir d'un handle
 */
export function findRelatedColorVariants(
  allProducts: Product[],
  currentHandle: string
): ColorVariant[] {
  // Trouver le produit actuel
  const currentProduct = allProducts.find(p => p.handle === currentHandle);
  if (!currentProduct) return [];

  // Obtenir le nom du modèle
  const modelName = getModelName(currentProduct.title);

  // Trouver tous les produits du même modèle
  const relatedProducts = allProducts.filter(
    p => getModelName(p.title) === modelName
  );

  // Trier par numéro de coloris
  relatedProducts.sort((a, b) => {
    const numA = parseInt(getColorNumber(a.title)) || 0;
    const numB = parseInt(getColorNumber(b.title)) || 0;
    return numA - numB;
  });

  // Convertir en ColorVariant
  return relatedProducts.map(product => ({
    colorNumber: getColorNumber(product.title),
    colorName: getColorNameFromTags(product.tags) || `Coloris ${getColorNumber(product.title)}`,
    product,
    handle: product.handle,
    thumbnail: getFirstImageUrl(product)
  }));
}

/**
 * Palette de couleurs distinctes pour les pastilles
 * Chaque coloris aura une couleur différente basée sur son numéro
 */
const COLOR_PALETTE = [
  '#1a1a1a',      // 1 - Noir
  '#8B4513',      // 2 - Écaille/Havane
  '#D4AF37',      // 3 - Or
  '#C0C0C0',      // 4 - Argent
  '#1E3A5F',      // 5 - Bleu marine
  '#2D5A3D',      // 6 - Vert forêt
  '#722F37',      // 7 - Bordeaux
  '#5D4037',      // 8 - Marron
  '#E8B4B8',      // 9 - Rose
  '#6B6B6B',      // 10 - Gris
];

/**
 * Génère une couleur de pastille basée sur le numéro de coloris
 * Chaque numéro de coloris aura une couleur distincte
 */
export function getColorSwatchStyle(colorNumber: string, colorName: string): React.CSSProperties {
  // Ignorer les noms génériques comme "Coloris X"
  const colorNameLower = colorName.toLowerCase();
  const isGenericName = colorNameLower.startsWith('coloris');

  // Si ce n'est pas un nom générique, essayer de détecter une couleur
  if (!isGenericName) {
    const colorMap: Record<string, string> = {
      'noir': '#1a1a1a',
      'black': '#1a1a1a',
      'écaille': '#8B4513',
      'tortoise': '#8B4513',
      'havane': '#8B4513',
      'havana': '#8B4513',
      'gold': '#D4AF37',
      'doré': '#D4AF37',
      'argent': '#C0C0C0',
      'silver': '#C0C0C0',
      'bleu': '#1E3A5F',
      'blue': '#1E3A5F',
      'vert': '#2D5A3D',
      'green': '#2D5A3D',
      'rouge': '#8B2942',
      'red': '#8B2942',
      'bordeaux': '#722F37',
      'burgundy': '#722F37',
      'rose': '#E8B4B8',
      'pink': '#E8B4B8',
      'marron': '#5D4037',
      'brown': '#5D4037',
      'beige': '#D4C4A8',
      'cristal': '#E8E8E8',
      'crystal': '#E8E8E8',
      'transparent': '#F5F5F5',
      'gris': '#6B6B6B',
      'grey': '#6B6B6B',
      'gray': '#6B6B6B',
      'champagne': '#F7E7CE'
    };

    for (const [key, value] of Object.entries(colorMap)) {
      if (colorNameLower.includes(key)) {
        return { backgroundColor: value };
      }
    }
  }

  // Utiliser la palette basée sur le numéro de coloris
  const num = parseInt(colorNumber) || 1;
  const index = (num - 1) % COLOR_PALETTE.length;
  return { backgroundColor: COLOR_PALETTE[index] };
}
