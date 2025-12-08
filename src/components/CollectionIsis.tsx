import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CollectionIsis() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.3]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen lg:h-screen relative sticky top-0 z-40"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-beige hidden md:flex flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20">
          <div className="max-w-2xl">
            <div className="mb-6 sm:mb-8">
              <h3 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl laptop:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9] mb-4 sm:mb-6">
                COLLECTION<br />ISIS
              </h3>
              <span className="inline-block bg-bronze/15 border-2 border-bronze/60 text-bronze text-[8px] sm:text-[9px] px-4 sm:px-5 py-2 sm:py-2.5 tracking-[0.25em] font-bold uppercase shadow-sm">
                Bientôt Disponible
              </span>
            </div>
            <div className="inline-block mb-8 sm:mb-12">
              <p className="font-sans text-bronze text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">
                Cobra • Scarabée • Œil d'Horus
              </p>
              <div className="h-px bg-bronze/20 mt-3" />
            </div>
            <p className="font-sans text-dark-text/70 text-base sm:text-lg md:text-xl laptop:text-xl xl:text-2xl leading-[1.75] mb-8 sm:mb-12 laptop:mb-14 xl:mb-16 font-light">
              Le Cobra : la garde. Le Scarabée : la renaissance. L'Œil : celui qui voit tout. Ce qui traverse 5 000 ans ne se porte pas par hasard.
            </p>
            <button className="border-2 border-dark-text/25 px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold text-dark-text/30 cursor-not-allowed">
              BIENTÔT DISPONIBLE
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full">
          <img
            src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1764956302/1d248e53-314b-475b-abd6-d43943737b7b_janoci.jpg"
            alt="Collection Isis - Egyptian inspiration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* MOBILE VERSION - Compact Design */}
      <div className="min-h-[82vh] bg-beige md:hidden relative overflow-hidden">
        {/* Content */}
        <div className="relative h-full flex flex-col px-5 pt-16 pb-6">

          {/* Top - Status Badge (Compact) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-shrink-0 mb-2"
          >
            <span className="inline-block bg-bronze/15 border border-bronze/60 text-bronze text-[8px] px-3 py-1.5 tracking-[0.25em] font-bold uppercase">
              Bientôt Disponible
            </span>
          </motion.div>

          {/* Badge Symbols (Compact) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex-shrink-0 mb-2"
          >
            <div className="inline-block">
              <p className="font-sans text-bronze text-[8px] tracking-[0.3em] font-bold uppercase">
                COBRA • SCARABÉE • ŒIL D'HORUS
              </p>
              <div className="h-px bg-bronze/30 mt-1 w-32" />
            </div>
          </motion.div>

          {/* Title (Compact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex-shrink-0 mb-3"
          >
            <h3 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-dark-text">
              COLLECTION<br/>ISIS
            </h3>
          </motion.div>

          {/* Product Image - Main Focus (50% space) with Grayscale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex-shrink-0 mb-2"
          >
            <div className="relative w-full h-[42vh] rounded-md overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/30 border border-dark-text/10 cursor-not-allowed">
              <img
                src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1764956302/1d248e53-314b-475b-abd6-d43943737b7b_janoci.jpg"
                alt="Collection Isis Preview"
                className="w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-beige/40 to-transparent">
                <p className="font-sans text-dark-text/50 text-[10px] tracking-[0.3em] font-bold uppercase bg-beige/80 px-4 py-2 rounded">
                  Coming Soon
                </p>
              </div>
            </div>
          </motion.div>

          {/* Description (Compact, 2 lines max) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex-shrink-0 mb-3"
          >
            <p className="font-sans text-dark-text/70 text-xs leading-[1.5] font-light line-clamp-2">
              Le Cobra : la garde. Le Scarabée : la renaissance. L'Œil : celui qui voit tout. Ce qui traverse 5 000 ans ne se porte pas par hasard.
            </p>
          </motion.div>

          {/* CTA Button (Disabled) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex-shrink-0"
          >
            <button
              disabled
              className="w-full border-2 border-dark-text/20 px-6 py-3 font-sans text-[9px] tracking-[0.25em] font-bold text-dark-text/30 cursor-not-allowed bg-beige/60"
            >
              BIENTÔT DISPONIBLE
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
