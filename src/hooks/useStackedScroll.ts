import { RefObject, useState, useEffect } from 'react';
import { useScroll, useTransform, useReducedMotion, motionValue } from 'framer-motion';

const ZERO = motionValue(0);

function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return desktop;
}

export function useStackedScroll(ref: RefObject<HTMLElement>) {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();
  const active = isDesktop && !reducedMotion;

  const { scrollYProgress: exitProgress } = useScroll({
    target: active ? ref : undefined,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: visibleProgress } = useScroll({
    target: active ? ref : undefined,
    offset: ['start end', 'end start'],
  });

  const ep = active ? exitProgress : ZERO;
  const vp = active ? visibleProgress : ZERO;

  const scale = useTransform(ep, [0, 1], active ? [1, 0.94] : [1, 1]);
  const opacity = useTransform(ep, [0, 0.4, 1], active ? [1, 1, 0] : [1, 1, 1]);
  const blur = useTransform(ep, [0, 0.6, 1], active ? [0, 0, 6] : [0, 0, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const imageY = useTransform(vp, [0, 1], active ? ['4%', '-4%'] : ['0%', '0%']);
  const imageScale = useTransform(
    vp,
    [0, 0.35, 0.65, 1],
    active ? [1.15, 1.12, 1.1, 1.1] : [1, 1, 1, 1]
  );

  return { scrollYProgress: exitProgress, scale, opacity, filter, imageY, imageScale };
}
