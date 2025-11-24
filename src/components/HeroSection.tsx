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
      className="h-screen sticky top-0 z-10"
    >
      <div className="relative h-full overflow-hidden">
        <img
          src="https://renaissanceeyewear.fr/cdn/shop/files/PLV_1.jpg?v=1708709809&width=1440"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <img
            src="https://res.cloudinary.com/dwt7u0azs/image/upload/v1761869118/544a79bc-362a-4590-b886-c24fe1289595_oxdko3.png"
            alt="Renaissance Logo"
            className="w-[85%] sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl h-auto drop-shadow-[0_10px_80px_rgba(0,0,0,1)] filter brightness-110"
          />
        </div>
      </div>
    </motion.section>
  );
}
