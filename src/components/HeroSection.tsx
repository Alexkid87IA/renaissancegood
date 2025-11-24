import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="h-screen relative z-10"
    >
      <div className="relative h-full overflow-hidden">
        <img
          src="https://renaissanceeyewear.fr/cdn/shop/files/PLV_1.jpg?v=1708709809&width=1440"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </motion.section>
  );
}
