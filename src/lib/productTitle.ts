import { getModelName, getModelArabe } from './productGrouping';

// Insère le chiffre arabe (issu de l'éditorial, comme <ModelTitle> partout)
// entre parenthèses après le numéro de modèle romain, en gardant le reste du
// titre. Ex. « Renaissance XXXIV Colori 3 » -> « Renaissance XXXIV (34) Colori 3 ».
// Si le modèle n'a pas de chiffre éditorial, le titre est laissé tel quel.
export function titleWithArabe(title: string): string {
  if (!title) return title;
  const modelName = getModelName(title);
  const arabe = getModelArabe(modelName);
  if (arabe == null) return title;
  return title.replace(modelName, `${modelName} (${arabe})`);
}
