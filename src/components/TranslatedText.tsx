// ========================================
// COMPOSANT DE TRADUCTION AUTOMATIQUE
// Wrapper simple pour traduire du texte dynamique inline
// ========================================

import { useAutoTranslate } from '../hooks/useAutoTranslate';

interface TranslatedTextProps {
  children: string | undefined | null;
}

/**
 * Composant qui traduit automatiquement son contenu textuel.
 * Usage: <T>{"Texte en français"}</T>
 * ou: <T>{product.title}</T>
 */
export default function T({ children }: TranslatedTextProps) {
  const translated = useAutoTranslate(children);
  return <>{translated}</>;
}
