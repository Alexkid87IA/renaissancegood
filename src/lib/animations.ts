/**
 * Presets d'animation Framer Motion réutilisables à travers le site.
 * Usage : <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" />
 */

/** Standard fade-in avec léger mouvement vers le haut */
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Fade-in rapide pour les formulaires/checkout */
export const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

/** Stagger container — animer les enfants avec un délai entre chacun */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/** Transition par défaut utilisée sur la plupart des sections homepage */
export const defaultTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

/** Viewport settings pour whileInView */
export const viewportOnce = { once: true } as const;
