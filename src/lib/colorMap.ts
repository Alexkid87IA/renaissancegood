// ========================================
// UTILITAIRE POUR LA GESTION DES COULEURS
// Centralise la logique de conversion des noms de couleurs en valeurs CSS
// ========================================

// Map de toutes les couleurs supportées
const colorMap: Record<string, string> = {
  // Métalliques
  'gold': '#D4AF37',
  'or': '#D4AF37',
  'doré': '#D4AF37',
  'golden': '#D4AF37',
  'silver': '#C0C0C0',
  'argent': '#C0C0C0',
  'argenté': '#C0C0C0',
  'bronze': '#CD7F32',
  'copper': '#B87333',
  'cuivre': '#B87333',
  'rose gold': '#B76E79',
  'or rose': '#B76E79',
  'gunmetal': '#2C3539',
  'gun metal': '#2C3539',
  'anthracite': '#383838',
  'champagne': '#F7E7CE',
  'platinum': '#E5E4E2',
  'platine': '#E5E4E2',
  'chrome': '#DBE4EB',
  'titanium': '#878681',
  'titane': '#878681',

  // Basiques
  'black': '#1a1a1a',
  'noir': '#1a1a1a',
  'matte black': '#28282B',
  'noir mat': '#28282B',
  'shiny black': '#0a0a0a',
  'noir brillant': '#0a0a0a',
  'white': '#FFFFFF',
  'blanc': '#FFFFFF',
  'ivory': '#FFFFF0',
  'ivoire': '#FFFFF0',
  'cream': '#FFFDD0',
  'crème': '#FFFDD0',

  // Écaille/Havana
  'tortoise': '#8B4513',
  'écaille': '#8B4513',
  'havana': '#663300',
  'havane': '#663300',
  'tortoiseshell': '#704214',
  'amber': '#FFBF00',
  'ambre': '#FFBF00',

  // Bleus
  'blue': '#4169E1',
  'bleu': '#4169E1',
  'navy': '#000080',
  'marine': '#000080',
  'navy blue': '#000080',
  'bleu marine': '#000080',
  'cobalt': '#0047AB',
  'royal blue': '#4169E1',
  'bleu royal': '#4169E1',
  'light blue': '#ADD8E6',
  'bleu clair': '#ADD8E6',
  'turquoise': '#40E0D0',

  // Rouges/Roses
  'red': '#B22222',
  'rouge': '#B22222',
  'burgundy': '#722F37',
  'bordeaux': '#722F37',
  'wine': '#722F37',
  'maroon': '#800000',
  'pink': '#FFC0CB',
  'rose': '#FFC0CB',
  'coral': '#FF7F50',
  'corail': '#FF7F50',

  // Verts
  'green': '#228B22',
  'vert': '#228B22',
  'olive': '#808000',
  'khaki': '#C3B091',
  'kaki': '#C3B091',
  'forest green': '#228B22',
  'vert forêt': '#228B22',
  'emerald': '#50C878',
  'émeraude': '#50C878',

  // Marrons
  'brown': '#8B4513',
  'marron': '#8B4513',
  'chocolate': '#7B3F00',
  'chocolat': '#7B3F00',
  'caramel': '#FFD59A',
  'cognac': '#9A463D',
  'tan': '#D2B48C',
  'beige': '#F5F5DC',

  // Violets
  'purple': '#800080',
  'violet': '#8B00FF',
  'mauve': '#E0B0FF',
  'lavender': '#E6E6FA',
  'lavande': '#E6E6FA',

  // Gris
  'grey': '#808080',
  'gray': '#808080',
  'gris': '#808080',
  'charcoal': '#36454F',
  'slate': '#708090',
  'ardoise': '#708090',
};

// Couleur par défaut Renaissance (bronze)
const DEFAULT_COLOR = '#8b7355';

/**
 * Convertit un nom de couleur en valeur CSS hexadécimale
 * @param colorName - Le nom de la couleur (ex: "Gold", "Noir Mat", etc.)
 * @returns La valeur hexadécimale correspondante
 */
export function getColorFromName(colorName: string): string {
  const lowerName = colorName.toLowerCase().trim();

  // Recherche exacte
  if (colorMap[lowerName]) {
    return colorMap[lowerName];
  }

  // Recherche partielle (pour des noms comme "Matte Gold", "Rose Gold Frame", etc.)
  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerName.includes(key) || key.includes(lowerName)) {
      return value;
    }
  }

  return DEFAULT_COLOR;
}

/**
 * Détermine si une couleur est claire (pour ajuster le contraste du texte)
 * @param hexColor - La couleur en format hexadécimal (avec ou sans #)
 * @returns true si la couleur est claire, false sinon
 */
export function isLightColor(hexColor: string): boolean {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Formule de luminosité perçue
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 180;
}

/**
 * Retourne le style CSS pour l'effet brillant métallique
 */
export const metallicGradient = 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)';

/**
 * Exporte la map de couleurs pour usage externe si nécessaire
 */
export { colorMap, DEFAULT_COLOR };
