import T from './TranslatedText';
import { getModelArabe } from '../lib/productGrouping';

/**
 * Affiche le nom du modèle suivi de son chiffre arabe entre parenthèses, partout
 * sur le site (cartes, related, variantes). Ex : « Renaissance XL (40) ».
 * Le chiffre vient de l'éditorial ; absent = on n'affiche que le nom.
 */
export default function ModelTitle({ name }: { name: string }) {
  const arabe = getModelArabe(name);
  return (
    <>
      <T>{name}</T>{arabe != null ? ` (${arabe})` : ''}
    </>
  );
}
