import { RefObject, useState, useEffect } from 'react';
import { useScroll, useTransform, useReducedMotion, type MotionStyle } from 'framer-motion';

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

export function useStackedScroll(
  ref: RefObject<HTMLElement>,
  mode: 'desktop' | 'mobile' = 'desktop'
) {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();
  const inViewport = mode === 'mobile' ? !isDesktop : isDesktop;
  const active = inViewport && !reducedMotion;

  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: visibleProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(exitProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(exitProgress, [0, 0.4, 1], [1, 1, 0]);
  const blur = useTransform(exitProgress, [0, 0.6, 1], [0, 0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const imageY = useTransform(visibleProgress, [0, 1], ['4%', '-4%']);
  const imageScale = useTransform(
    visibleProgress,
    [0, 0.35, 0.65, 1],
    [1.15, 1.12, 1.1, 1.1]
  );

  const sectionStyle: MotionStyle | undefined = active
    ? { scale, opacity, filter }
    : undefined;

  const imageMotionStyle: MotionStyle | undefined = active
    ? { y: imageY, scale: imageScale }
    : undefined;

  return { sectionStyle, imageMotionStyle, imageY, imageScale, active };
}
