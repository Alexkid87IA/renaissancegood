import { useState, useEffect, useRef, type RefObject } from 'react';

export type ZoneTheme = 'light' | 'dark';
export interface HeaderTheme {
  left: ZoneTheme;
  center: ZoneTheme;
  right: ZoneTheme;
}

const DEFAULT: HeaderTheme = { left: 'dark', center: 'dark', right: 'dark' };

/**
 * Header transparent permanent : détecte la tonalité du fond DERRIÈRE le header,
 * par zone (gauche = nav, centre = logo, droite = méta-nav/icônes), afin que
 * chaque zone bascule en blanc (sur sombre) ou sombre (sur clair).
 *
 * Indispensable car certaines sections sont « coupées » (ex. image sombre d'un
 * côté, panneau clair de l'autre) : un thème unique laisserait toujours une
 * moitié illisible.
 *
 * Les sections / colonnes déclarent leur tonalité via `data-header-theme`.
 * Échantillonnage par `elementsFromPoint` au milieu de la bande du header
 * (robuste avec les sections sticky empilées), en ignorant le header lui-même.
 */
export function useHeaderTheme(
  enabled: boolean,
  headerRef: RefObject<HTMLElement>
): HeaderTheme {
  const [theme, setTheme] = useState<HeaderTheme>(DEFAULT);
  const ticking = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setTheme(DEFAULT);
      return;
    }

    const themeAt = (x: number, bandY: number): ZoneTheme => {
      const header = headerRef.current;
      const els = document.elementsFromPoint(x, bandY);
      for (const el of els) {
        if (header && header.contains(el)) continue;
        const tagged = (el as HTMLElement).closest?.(
          '[data-header-theme]'
        ) as HTMLElement | null;
        if (tagged) {
          return tagged.getAttribute('data-header-theme') === 'light'
            ? 'light'
            : 'dark';
        }
      }
      return 'dark';
    };

    const sample = () => {
      ticking.current = false;
      const header = headerRef.current;
      const bandY = (header?.offsetHeight ?? 72) * 0.5;
      const w = window.innerWidth;
      const next: HeaderTheme = {
        left: themeAt(w * 0.14, bandY),
        center: themeAt(w * 0.5, bandY),
        right: themeAt(w * 0.86, bandY),
      };
      setTheme((prev) =>
        prev.left === next.left &&
        prev.center === next.center &&
        prev.right === next.right
          ? prev
          : next
      );
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled, headerRef]);

  return enabled ? theme : DEFAULT;
}
