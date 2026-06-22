// Chargement des traceurs — UNIQUEMENT après consentement (voir consent.ts).
//
// AU DÉPLOIEMENT : coller ici le snippet du pixel / des stats (Meta Pixel, GA,
// Plausible, Matomo…). Cette fonction n'est appelée QUE si le visiteur a accepté.
// Doctrine (Bible 12.4 / 12.7) : pas de pixel de revente ni d'audience achetée —
// privilégier un outil de mesure respectueux (cookieless) pour améliorer le site.

let loaded = false;

export function loadAnalytics(): void {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;

  // --- À REMPLIR AU DÉPLOIEMENT ---
  // Exemple (à activer le jour venu) :
  //   const s = document.createElement('script');
  //   s.src = 'https://.../script.js';
  //   s.defer = true;
  //   document.head.appendChild(s);
  // Tant que ce bloc est vide, rien ne se charge — le robinet est prêt, fermé.
}
