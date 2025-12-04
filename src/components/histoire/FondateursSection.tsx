import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FondateursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-20 bg-beige overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
      </div>

      <div className="relative h-full flex flex-col">

        <div className="pt-6 md:pt-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">02</span>
              <div className="h-px flex-1 max-w-[60px] bg-bronze/20" />
              <span className="font-sans text-dark-text/40 text-xs tracking-[0.3em] uppercase">L'Origine</span>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 flex items-center py-12 md:py-16 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1600px] mx-auto w-full">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 md:mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-dark-text font-bold mb-4 leading-[1.1]">
                Renaissance est<br/>née d'un refus.
              </h2>
              <div className="h-px w-20 bg-bronze mt-6" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group"
              >
                <div className="mb-4">
                  <span className="font-display text-5xl md:text-6xl text-bronze/20 group-hover:text-bronze/40 transition-colors duration-300">01</span>
                </div>
                <h3 className="font-sans text-lg md:text-xl text-dark-text font-medium mb-3 leading-[1.4]">
                  Refus que tout se ressemble.
                </h3>
                <p className="font-sans text-sm md:text-base text-dark-text/60 font-light leading-[1.7]">
                  Les mêmes formes partout. Les mêmes logos. Le même ennui. On a voulu des montures qu'on reconnaît de loin.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group"
              >
                <div className="mb-4">
                  <span className="font-display text-5xl md:text-6xl text-bronze/20 group-hover:text-bronze/40 transition-colors duration-300">02</span>
                </div>
                <h3 className="font-sans text-lg md:text-xl text-dark-text font-medium mb-3 leading-[1.4]">
                  Refus que le travail bien fait disparaisse.
                </h3>
                <p className="font-sans text-sm md:text-base text-dark-text/60 font-light leading-[1.7]">
                  Des usines partout. Plus personne ne sait faire avec ses mains. Nos montures, c'est 15 heures de travail.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group"
              >
                <div className="mb-4">
                  <span className="font-display text-5xl md:text-6xl text-bronze/20 group-hover:text-bronze/40 transition-colors duration-300">03</span>
                </div>
                <h3 className="font-sans text-lg md:text-xl text-dark-text font-medium mb-3 leading-[1.4]">
                  Refus de regarder ailleurs.
                </h3>
                <p className="font-sans text-sm md:text-base text-dark-text/60 font-light leading-[1.7]">
                  On achète. On jette. On recommence. Nos éditions : 100 à 300 pièces. Faites pour qu'on les garde.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="border-t border-dark-text/10 pt-12 md:pt-16"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-bronze flex items-center justify-center">
                    <span className="font-display text-3xl md:text-4xl text-bronze font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-sans text-bronze text-xs tracking-[0.25em] uppercase font-bold mb-1">
                      Les Fondateurs
                    </p>
                    <p className="font-display text-2xl md:text-3xl text-dark-text font-bold">
                      Les 3
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-sans text-base md:text-lg text-dark-text/70 font-light leading-[1.7] max-w-2xl">
                    Nous sommes Les 3. Pas des héritiers. Pas des diplômés. Des gens du métier. On a vu. On a refusé. On a construit.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="pb-6 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1600px] mx-auto border-t border-dark-text/10 pt-4">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-10 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] uppercase">Défiler</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
