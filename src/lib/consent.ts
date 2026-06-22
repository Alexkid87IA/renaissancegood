// Robinet à consentement (RGPD).
// Aucun traceur non essentiel ne se charge tant que le visiteur n'a pas accepté.
// Au déploiement : brancher le pixel / les stats dans src/lib/analytics.ts (loadAnalytics).

export type ConsentValue = 'accepted' | 'refused';

const STORAGE_KEY = 'cookie-consent';
const EVENT = 'renaissance:consentchange';

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'accepted' || v === 'refused' ? v : null;
}

/** Le visiteur a-t-il accepté les traceurs non essentiels ? */
export function hasConsent(): boolean {
  return getConsent() === 'accepted';
}

/** Enregistre le choix et prévient les abonnés (le bandeau appelle ceci). */
export function setConsent(value: ConsentValue): void {
  localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(EVENT, { detail: value }));
}

/** S'abonner aux changements de choix. Renvoie une fonction de désabonnement. */
export function onConsentChange(cb: (value: ConsentValue) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<ConsentValue>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
