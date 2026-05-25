import type { Variants } from 'framer-motion';

const easeOut = [0.22, 1, 0.36, 1] as const;

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};
