import { useEffect } from 'react';

/**
 * Signal de fin de rendu pour le pré-rendu au build (scripts/prerender.mjs).
 *
 * Placé DANS le <Suspense> et APRÈS <Routes> : il ne monte qu'au commit du
 * contenu (lazy page + traductions résolus, useSuspense), et son effet passe
 * après ceux des descendants des routes — donc après que react-helmet a posé
 * les balises <title>/meta/canonical/JSON-LD. Le double requestAnimationFrame
 * laisse Helmet vider sa file avant la capture.
 *
 * On pose un attribut persistant sur <html> : le script de pré-rendu le sonde
 * (page.waitForSelector('html[data-prerender-ready]')), plus fiable qu'un
 * événement one-shot. Hors pré-rendu (navigateur normal), c'est inerte.
 */
export default function PrerenderReady() {
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-prerender-ready', 'true');
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
