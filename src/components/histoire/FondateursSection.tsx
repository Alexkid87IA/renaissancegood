import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const refusStories = [
  {
    number: "01",
    title: "Le luxe uniformisé",
    statement: "QUAND TOUT SE RESSEMBLE",
    description: "Refus de voir le luxe devenir une industrie où tout finit par se ressembler. Renaissance crée des pièces uniques, reconnaissables par leur symbole.",
    symbolImage: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763855099/WhatsApp_Image_2025-11-21_at_16.20.29_luvmkv.jpg'
  },
  {
    number: "02",
    title: "L'oubli artisanal",
    statement: "QUAND LA MACHINE REMPLACE L'HOMME",
    description: "Refus que le geste artisanal disparaisse. 15 heures de travail par monture. Chaque pièce porte la marque de l'artisan.",
    symbolImage: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_4_xntepe.jpg'
  },
  {
    number: "03",
    title: "L'uniformité",
    statement: "QUAND RIEN NE DURE",
    description: "Refus de l'uniformité et de l'éphémère. Éditions limitées 100-300 pièces. Fait pour traverser les générations.",
    symbolImage: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_fpklnf.jpg'
  }
];

export default function FondateursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeRefus, setActiveRefus] = useState(0);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-30 bg-beige overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{ willChange: 'opacity, transform' }}
        className="h-full w-full relative flex flex-col"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-beige to-beige/95" />

        <div className="absolute inset-0 opacity-[0.03] hidden lg:block">
          <div className="absolute left-[25%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[75%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        <motion.div
          key={activeRefus}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,115,85,0.3)_0%,transparent_50%)]"
        />

        <div className="relative z-10 pt-6 md:pt-8 lg:pt-12 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="font-sans text-bronze text-xs md:text-sm font-bold tracking-[0.4em] uppercase">02</span>
              <div className="w-6 md:w-8 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase">L'Origine</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[10px] tracking-[0.25em] uppercase">Les 3 • 2019</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 py-8">
          <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col lg:flex-row gap-6 lg:gap-12">

            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible justify-start lg:justify-start pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none">
              {refusStories.map((refus, index) => (
                <button
                  key={index}
                  onClick={() => setActiveRefus(index)}
                  className={`flex-shrink-0 group transition-all duration-300 snap-center ${
                    activeRefus === index ? '' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className={`w-14 h-14 md:w-16 md:h-16 border-2 flex items-center justify-center transition-all duration-300 ${
                      activeRefus === index
                        ? 'border-bronze bg-bronze/5 scale-105'
                        : 'border-dark-text/10 group-hover:border-bronze/30'
                    }`}>
                      <span className={`font-sans text-xl md:text-2xl font-bold transition-colors duration-300 ${
                        activeRefus === index ? 'text-bronze' : 'text-dark-text/30'
                      }`}>
                        {refus.number}
                      </span>
                    </div>

                    <div className="text-left hidden lg:block">
                      <p className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                        activeRefus === index ? 'text-bronze font-bold' : 'text-dark-text/40'
                      }`}>
                        Refus
                      </p>
                      <p className={`font-sans text-sm font-light transition-colors duration-300 mt-1 ${
                        activeRefus === index ? 'text-dark-text' : 'text-dark-text/50'
                      }`}>
                        {refus.title}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

              <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRefus}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="relative w-full max-w-md aspect-square"
                  >
                    <div className="absolute -inset-4 md:-inset-6 border border-bronze/10 hidden md:block" />

                    <div className="relative w-full h-full border-2 border-bronze/30 bg-white/5 overflow-hidden">
                      <img
                        src={refusStories[activeRefus].symbolImage}
                        alt={refusStories[activeRefus].title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                      />
                    </div>

                    <div className="absolute -top-2 -left-2 w-5 h-5 md:w-6 md:h-6 border-t-2 border-l-2 border-bronze" />
                    <div className="absolute -bottom-2 -right-2 w-5 h-5 md:w-6 md:h-6 border-b-2 border-r-2 border-bronze" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRefus}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="space-y-5 md:space-y-6"
                  >
                    <div>
                      <p className="font-sans text-bronze text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold mb-2 md:mb-3">
                        Renaissance est née d'un refus
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-dark-text font-bold leading-[1.1] tracking-tight">
                        {refusStories[activeRefus].statement}
                      </h3>
                    </div>

                    <div className="border-l-2 border-bronze/30 pl-4 md:pl-6">
                      <p className="font-sans text-base md:text-lg lg:text-xl text-dark-text/80 font-light leading-[1.7]">
                        {refusStories[activeRefus].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-dark-text/10"
                >
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-bronze flex items-center justify-center">
                        <span className="font-display text-xl md:text-2xl text-bronze font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-sans text-dark-text/50 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                          Les Fondateurs
                        </p>
                        <p className="font-display text-xl md:text-2xl text-bronze font-bold">
                          Les 3
                        </p>
                      </div>
                    </div>

                    <p className="font-sans text-sm md:text-base text-dark-text/70 font-light leading-[1.7]">
                      Pas trois héritiers. Pas trois diplômés. Trois hommes du métier qui ont vu de l'intérieur l'industrie se dégrader. Et qui ont décidé de faire autrement.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-4 md:pb-6 lg:pb-8 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-dark-text/10 pt-4 md:pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="font-sans text-dark-text text-lg md:text-xl lg:text-2xl font-light">02</span>
                <span className="font-sans text-dark-text/30 text-xs md:text-sm">/</span>
                <span className="font-sans text-dark-text/40 text-xs md:text-sm">08</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <div className="w-px h-8 md:h-12 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[8px] md:text-[9px] tracking-[0.4em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-dark-text/20 text-[9px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
