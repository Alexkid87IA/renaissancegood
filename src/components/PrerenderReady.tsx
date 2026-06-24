import { useEffect } from 'react';

/**
 * Signal de fin de rendu pour le pré-rendu au build (vite-plugin-prerender).
 *
 * Placé DANS le <Suspense> et APRÈS <Routes> : il ne monte qu'au commit du
 * contenu (lazy page + traductions résolus, useSuspense), et son effet passe
 * après ceux des descendants des routes — donc après que react-helmet a posé
 * les balises <title>/meta/canonical/JSON-LD. Le double requestAnimationFrame
 * laisse Helmet vider sa file avant la capture.
 *
 * Hors pré-rendu (navigateur normal), l'événement est simplement ignoré.
 */
export default function PrerenderReady() {
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        document.dispatchEvent(new Event('x-prerender-ready'));
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return null;
}
