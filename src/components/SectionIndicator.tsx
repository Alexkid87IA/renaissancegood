import { useEffect, useState, useCallback } from 'react';

/**
 * Navigation éditoriale — numéros Playfair Display italic sur le côté droit.
 *
 * Détecte le fond de la section active :
 * - Sections `bg-beige` / `bg-white` → texte dark-text (noir)
 * - Tout le reste (noir, images, bronze) → texte blanc
 *
 * Override possible : ajouter `data-indicator-theme="dark"` ou `"light"`
 * sur une `.snap-section` pour forcer le thème.
 */

function detectSectionTheme(el: Element): 'light' | 'dark' {
  // Override explicite via data-attribute
  const override = el.getAttribute('data-indicator-theme');
  if (override === 'light' || override === 'dark') return override;

  // Auto-detect depuis les classes CSS du conteneur
  const cls = el.className;
  if (cls.includes('bg-beige') || cls.includes('bg-white')) return 'light';
  return 'dark';
}

export default function SectionIndicator() {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const updateTheme = useCallback((index: number) => {
    const sections = document.querySelectorAll('.snap-section');
    const section = sections[index];
    if (section) setTheme(detectSectionTheme(section));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    let tries = 0;
    const waitForApi = () => {
      const api = window.__renaissanceSnap;
      if (api && api.getPositions().length > 0) {
        const idx = api.getCurrentIndex();
        setCount(api.getPositions().length);
        setActive(idx);
        updateTheme(idx);
        setReady(true);
        return;
      }
      if (tries++ < 120) {
        rafId = requestAnimationFrame(waitForApi);
      }
    };
    waitForApi();

    const onScroll = () => {
      const api = window.__renaissanceSnap;
      if (!api) return;
      const idx = api.getCurrentIndex();
      setActive(idx);
      updateTheme(idx);
      const len = api.getPositions().length;
      if (len !== count) setCount(len);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTheme]);

  if (!ready || count === 0) return null;

  const handleClick = (index: number) => {
    window.__renaissanceSnap?.snapTo(index);
  };

  const isLight = theme === 'light';

  return (
    <nav
      aria-label="Navigation des sections"
      className="fixed right-8 xl:right-12 top-1/2 -translate-y-1/2 z-[95] hidden lg:flex flex-col items-end gap-5"
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        const num = String(i + 1).padStart(2, '0');
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            aria-label={`Aller à la section ${i + 1}`}
            aria-current={isActive ? 'true' : undefined}
            className="group py-1 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4"
          >
            <span
              className={`font-display text-[17px] italic tabular-nums select-none transition-all duration-500 ease-out ${
                isActive
                  ? isLight
                    ? 'text-dark-text'
                    : 'text-white'
                  : isLight
                    ? 'text-dark-text/20 group-hover:text-dark-text/50'
                    : 'text-white/25 group-hover:text-white/50'
              }`}
            >
              {num}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
