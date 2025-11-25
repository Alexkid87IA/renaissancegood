import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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
          className="absolute inset-0 w-full h-full object-cover hidden lg:block"
        />
        <img
          src="https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=1440"
          alt="Hero Background Mobile"
          className="absolute inset-0 w-full h-full object-cover lg:hidden"
        />

        <div className="absolute inset-x-0 bottom-0 lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="relative flex flex-col gap-3 p-6 pb-8">
            <button
              onClick={() => navigate('/store-locator')}
              className="w-full bg-white/95 backdrop-blur-sm px-6 py-4 font-sans text-xs tracking-[0.2em] uppercase text-dark-text font-bold hover:bg-white transition-colors"
            >
              Un opticien proche de chez vous
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="w-full bg-dark-text px-6 py-4 font-sans text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-dark-text/90 transition-colors"
            >
              Acheter maintenant
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
