import { RefObject } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Hook partagé pour orchestrer l'animation au scroll des sections empilées
 * de la homepage (sticky stacked sections).
 *
 * Appliqué à chaque section, il garantit une transition cohérente façon
 * apple.com / jacquemus.com : scale, opacity, blur et parallax image.
 *
 * Deux progressions distinctes :
 * - `exitProgress` (0→1 pendant que la section quitte le haut) → scale/opacity/blur
 * - `visibleProgress` (0→1 sur tout le temps où la section est visible, 2 viewports)
 *   → parallax image (Y) + zoom cinématique (imageScale)
 *
 * Zoom cinématique : l'image entre à 1.3× et se stabilise à ~1.15× au centre,
 * créant un effet de "settle" premium à chaque transition de section.
 *
 * Respecte prefers-reduced-motion en désactivant les transforms.
 */
export function useStackedScroll(ref: RefObject<HTMLElement>) {
  // Phase de sortie uniquement : pour scale/opacity/blur (la section "disparaît")
  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Plage complète visible (entrée + sortie) : pour le parallax image
  // offset 'start end' = moment où le haut de la section touche le bas du viewport
  // offset 'end start' = moment où le bas de la section touche le haut du viewport
  const { scrollYProgress: visibleProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const reducedMotion = useReducedMotion();

  const scale = useTransform(
    exitProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [1, 0.94]
  );
  const opacity = useTransform(
    exitProgress,
    [0, 0.4, 1],
    reducedMotion ? [1, 1, 1] : [1, 1, 0]
  );
  const blur = useTransform(
    exitProgress,
    [0, 0.6, 1],
    reducedMotion ? [0, 0, 0] : [0, 0, 6]
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  // Parallax image : 40% de range total (de +20% à -20%)
  // Plus dramatique qu'avant (±12%), crée un vrai effet de profondeur
  const imageY = useTransform(
    visibleProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['20%', '-20%']
  );

  // Zoom cinématique : l'image entre zoomée et se stabilise progressivement
  // Entrance (0→0.35) : 1.3 → 1.15 (zoom-settle)
  // Active  (0.35→0.65) : 1.15 → 1.12 (quasi-stable)
  // Exit    (0.65→1) : 1.12 → 1.05 (léger zoom-out final)
  const imageScale = useTransform(
    visibleProgress,
    [0, 0.35, 0.65, 1],
    reducedMotion ? [1, 1, 1, 1] : [1.3, 1.15, 1.12, 1.05]
  );

  return { scrollYProgress: exitProgress, scale, opacity, filter, imageY, imageScale };
}
