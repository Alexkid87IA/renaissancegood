import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CollectionIsis() {
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
      <div className="h-full bg-beige flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20">
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
                Ankh • Scarabée • Cobra
              </p>
              <div className="h-px bg-bronze/20 mt-3" />
            </div>
            <p className="font-sans text-dark-text/70 text-base sm:text-lg md:text-xl laptop:text-xl xl:text-2xl leading-[1.75] mb-8 sm:mb-12 laptop:mb-14 xl:mb-16 font-light">
              Une fusion audacieuse entre l'héritage égyptien millénaire et l'excellence
              du design français. Des symboles sacrés réinterprétés avec modernité.
            </p>
            <button className="border-2 border-dark-text/25 px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold text-dark-text/30 cursor-not-allowed">
              BIENTÔT DISPONIBLE
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-[50vh] sm:h-64 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80"
            alt="Collection Isis - Egyptian inspiration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.section>
  );
}
