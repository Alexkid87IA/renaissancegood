import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function CollectionHeritage() {
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
      className="h-screen sticky top-0 z-30"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-beige hidden md:flex flex-row px-6 md:px-0">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20 md:ml-6">
          <div className="max-w-2xl">
            <h3 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl laptop:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 tracking-[-0.03em] leading-[0.9]">
              COLLECTION HÉRITAGE
            </h3>
            <div className="inline-block mb-8 sm:mb-12">
              <p className="font-sans text-bronze text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">
                Symbole : Trident
              </p>
              <div className="h-px bg-bronze/20 mt-3" />
            </div>
            <p className="font-sans text-dark-text/70 text-base sm:text-lg md:text-xl laptop:text-xl xl:text-2xl leading-[1.75] mb-8 sm:mb-12 laptop:mb-14 xl:mb-16 font-light">
              Une collection intemporelle qui incarne la puissance et l'élégance française.
              Le trident symbolise la maîtrise parfaite entre tradition et modernité.
            </p>
            <Link to="/collections/heritage">
              <button className="border-2 border-dark-text/80 px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-beige hover:border-dark-text transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                DÉCOUVRIR
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full md:mr-6">
          <img
            src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=5760"
            alt="Collection Héritage - Trident"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* MOBILE VERSION - Completely New Design */}
      <div className="h-full bg-beige md:hidden relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=5760"
            alt="Collection Héritage - Trident"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-beige/80 via-beige/90 to-beige"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-6 pt-24 pb-8">

          {/* Top - Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="inline-block">
              <p className="font-sans text-bronze text-[9px] tracking-[0.3em] font-bold uppercase mb-2">
                Symbole : Trident
              </p>
              <div className="h-px bg-bronze/30 w-16" />
            </div>
          </motion.div>

          {/* Center - Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h3 className="font-display text-5xl font-bold mb-6 tracking-[-0.03em] leading-[0.95] text-dark-text">
              COLLECTION<br/>HÉRITAGE
            </h3>
            <p className="font-sans text-dark-text/70 text-base leading-[1.75] font-light max-w-md">
              Une collection intemporelle qui incarne la puissance et l'élégance française.
              Le trident symbolise la maîtrise parfaite entre tradition et modernité.
            </p>
          </motion.div>

          {/* Bottom - CTA and Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex-shrink-0 space-y-6"
          >
            {/* Product Image */}
            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm border border-dark-text/10">
              <img
                src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=5760"
                alt="Collection Héritage"
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* CTA Button */}
            <Link to="/collections/heritage" className="block">
              <button className="w-full border-2 border-dark-text px-8 py-4 font-sans text-[10px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-beige transition-all duration-300 active:scale-[0.98]">
                DÉCOUVRIR LA COLLECTION
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
