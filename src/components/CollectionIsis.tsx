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
      className="h-screen sticky top-0 z-50"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-beige hidden md:flex flex-row px-6 md:px-0">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20 md:ml-6">
          <div className="max-w-2xl">
            <div className="mb-6 sm:mb-8">
              <h3 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl laptop:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9] mb-4 sm:mb-6">
                COLLECTION<br />ISIS
              </h3>
              <span className="inline-block bg-dark-text/5 border border-dark-text/15 text-dark-text/50 text-[8px] sm:text-[9px] px-4 sm:px-5 py-2 sm:py-2.5 tracking-[0.25em] font-bold uppercase">
                En Développement
              </span>
            </div>
            <div className="inline-block mb-8 sm:mb-12">
              <p className="font-sans text-bronze text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">
                Cobra • Scarabée • Œil d'Horus
              </p>
              <div className="h-px bg-bronze/20 mt-3" />
            </div>
            <p className="font-sans text-dark-text/70 text-base sm:text-lg md:text-xl laptop:text-xl xl:text-2xl leading-[1.75] mb-8 sm:mb-12 laptop:mb-14 xl:mb-16 font-light">
              Le Cobra : la garde. Le Scarabée : la renaissance. L'Œil : celui qui voit tout.<br />
              Ce qui traverse 5 000 ans ne se porte pas par hasard.
            </p>
            <button className="border-2 border-dark-text/25 px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold text-dark-text/30 cursor-not-allowed">
              BIENTÔT DISPONIBLE
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full md:mr-6">
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80"
            alt="Collection Isis - Egyptian inspiration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* MOBILE VERSION - Completely New Design */}
      <div className="h-screen bg-beige md:hidden relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80"
            alt="Collection Isis - Egyptian inspiration"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-beige/85 via-beige/90 to-beige"></div>
        </div>

        {/* Content */}
        <div className="relative min-h-screen flex flex-col justify-between px-6 pt-24 pb-16">

          {/* Top - Badge and Status */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0 space-y-4"
          >
            <span className="inline-block bg-amber-100/80 border-2 border-amber-900/40 text-amber-900 text-[9px] px-5 py-2.5 tracking-[0.3em] font-bold uppercase shadow-sm">
              En Développement
            </span>
            <div className="inline-block bg-gradient-to-r from-bronze/10 to-transparent pr-8 py-3 -ml-1 pl-1">
              <p className="font-sans text-bronze text-[10px] tracking-[0.35em] font-bold uppercase mb-2.5">
                COBRA • SCARABÉE • ŒIL D'HORUS
              </p>
              <div className="h-0.5 bg-gradient-to-r from-bronze via-bronze/60 to-transparent w-32" />
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
              COLLECTION<br/>ISIS
            </h3>
            <p className="font-sans text-dark-text/70 text-base leading-[1.75] font-light max-w-md">
              Le Cobra : la garde. Le Scarabée : la renaissance. L'Œil : celui qui voit tout.<br />
              Ce qui traverse 5 000 ans ne se porte pas par hasard.
            </p>
          </motion.div>

          {/* Bottom - Visual Element and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex-shrink-0 space-y-6"
          >
            {/* Decorative Image Preview - Non-clickable */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/50 border border-dark-text/10 cursor-not-allowed">
              <img
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80"
                alt="Collection Isis Preview"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-sans text-dark-text/40 text-xs tracking-[0.3em] font-bold uppercase">
                    Coming Soon
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button - Disabled State */}
            <button
              disabled
              className="w-full border-2 border-dark-text/20 px-8 py-5 font-sans text-[10px] tracking-[0.25em] font-bold text-dark-text/30 cursor-not-allowed backdrop-blur-sm bg-beige/60 mb-2"
            >
              BIENTÔT DISPONIBLE
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
