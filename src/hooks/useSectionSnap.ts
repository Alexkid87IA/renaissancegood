import { useEffect } from 'react';

/**
 * Snap JS custom qui force "1 molette = 1 section" dans les deux directions.
 *
 * Pourquoi pas CSS scroll-snap natif ? Sur trackpad macOS, la combinaison
 * `mandatory` + `scroll-snap-stop: always` bloque le scroll up (le navigateur
 * re-snape à la section courante avant que le geste puisse la quitter).
 *
 * Ce hook intercepte les wheel events, verrouille le scroll pendant l'animation,
 * et scroll programmatiquement à la section suivante/précédente.
 *
 * Supporte aussi la navigation clavier : ↑/↓, Page Up/Down, Home/End, Espace.
 *
 * Touch (mobile) n'est pas intercepté — il utilise le scroll natif + le CSS
 * `scroll-snap: proximity` comme aide douce.
 *
 * Expose via `window.__renaissanceSnap` :
 * - `snapTo(index)` pour que d'autres composants (indicator) puissent déclencher
 * - `getCurrentIndex()` pour lire l'état courant
 * - `getPositions()` pour connaître le nombre de sections
 */

// Signature globale partagée entre useSectionSnap (writer) et
// SectionIndicator (reader). Attachée à window pour éviter un contexte React
// supplémentaire.
declare global {
  interface Window {
    __renaissanceSnap?: {
      snapTo: (index: number) => void;
      getCurrentIndex: () => number;
      getPositions: () => number[];
    };
  }
}

export function useSectionSnap(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Somme les offsetTop en remontant la chaîne offsetParent pour obtenir
    // la position réelle dans le document (marche même pour sticky + wrappers).
    const docTop = (el: HTMLElement): number => {
      let top = 0;
      let current: HTMLElement | null = el;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return top;
    };

    let positions: number[] = [];
    let locked = false;
    let unlockTimer: number | null = null;

    const refresh = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('.snap-section')
      );
      positions = sections.map(docTop);
    };

    // "Current" = la dernière section dont le haut est au-dessus (ou à) la
    // position de scroll actuelle. Logique simple et prédictible.
    const getCurrentIndex = (): number => {
      if (positions.length === 0) return 0;
      const scrollY = window.scrollY;
      const tolerance = 10;
      let current = 0;
      for (let i = 0; i < positions.length; i++) {
        if (positions[i] <= scrollY + tolerance) {
          current = i;
        } else {
          break;
        }
      }
      return current;
    };

    const snapTo = (index: number) => {
      if (positions.length === 0) refresh();
      if (index < 0 || index >= positions.length) return;
      locked = true;
      window.scrollTo({ top: positions[index], behavior: 'smooth' });
      if (unlockTimer !== null) window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, 900);
    };

    const onWheel = (e: WheelEvent) => {
      // Zoom pinch (Ctrl + wheel) → laisser passer
      if (e.ctrlKey) return;
      // Ignore micro-deltas (jitter trackpad)
      if (Math.abs(e.deltaY) < 4) return;

      // Tue toujours le scroll natif pour éviter l'inertie macOS qui fight
      e.preventDefault();

      if (locked) return;
      if (positions.length === 0) refresh();
      if (positions.length === 0) return;

      const current = getCurrentIndex();
      const direction = e.deltaY > 0 ? 1 : -1;
      const next = current + direction;
      if (next < 0 || next >= positions.length) return;
      snapTo(next);
    };

    // Navigation clavier : flèches, page up/down, home/end, espace
    const onKeyDown = (e: KeyboardEvent) => {
      // Ne pas hijacker la saisie dans les inputs/textareas
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
      }

      if (positions.length === 0) refresh();
      if (positions.length === 0) return;

      const current = getCurrentIndex();
      let next = current;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          next = current + 1;
          break;
        case 'ArrowUp':
        case 'PageUp':
          next = current - 1;
          break;
        case ' ':
          // Espace = page suivante (ou précédente avec Shift)
          next = current + (e.shiftKey ? -1 : 1);
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = positions.length - 1;
          break;
        default:
          return;
      }

      if (locked) {
        e.preventDefault();
        return;
      }
      if (next < 0 || next >= positions.length) return;
      e.preventDefault();
      snapTo(next);
    };

    // Mesure initiale (rAF pour être sûr que le layout est prêt)
    requestAnimationFrame(refresh);
    window.addEventListener('resize', refresh);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    // Expose l'API pour que SectionIndicator puisse déclencher des snaps
    window.__renaissanceSnap = {
      snapTo,
      getCurrentIndex,
      getPositions: () => positions,
    };

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', refresh);
      if (unlockTimer !== null) window.clearTimeout(unlockTimer);
      delete window.__renaissanceSnap;
    };
  }, [enabled]);
}
