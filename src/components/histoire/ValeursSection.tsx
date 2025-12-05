import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const valeurs = [
  {
    title: 'LA LOYAUTÉ',
    description: 'Les opportunistes partent au premier vent. Les loyaux sont encore là au dernier.'
  },
  {
    title: 'LE RESPECT',
    description: 'On se souvient rarement de ce que tu as dit. Toujours de comment tu l\'as dit.'
  },
  {
    title: 'LA PATIENCE',
    description: 'Ce qui vient vite part vite. Ce qui dure se mérite.'
  },
  {
    title: 'LA PAROLE',
    description: 'Avant les contrats, il y avait la poignée de main. Elle suffisait. Elle devrait encore.'
  },
  {
    title: 'LA TRANSMISSION',
    description: 'Nos pères nous ont appris. Nos enfants attendent. Le reste, c\'est du bruit.'
  }
];

export default function ValeursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:sticky lg:top-0 z-50 bg-dark-text overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ?
          { opacity: 1, y: 0 } :
          { opacity: 0, y: 20 }
        }
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="h-full w-full relative flex flex-col"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-text via-dark-text to-dark-text/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,115,85,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 pt-24 md:pt-28 lg:pt-32 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-bronze text-[0.65rem] font-bold tracking-[0.4em] uppercase">05</span>
              <div className="w-5 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-[0.55rem] font-medium tracking-[0.3em] uppercase">Les 5 Piliers</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[7px] tracking-[0.25em] uppercase">Valeurs</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-8 lg:px-12 py-8">
          <div className="max-w-[1400px] mx-auto w-full">
            <div className="text-center mb-12 lg:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-4"
              >
                LES 5 PILIERS
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-sans text-base md:text-lg lg:text-xl text-white/70 font-light leading-[1.6] max-w-2xl mx-auto"
              >
                Cinq valeurs non-négociables. Celles qui définissent un homme.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 xl:gap-6">
              {valeurs.map((valeur, index) => (
                <motion.div
                  key={valeur.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative border border-bronze/30 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-bronze hover:bg-bronze/5 transition-all duration-500 group flex flex-col"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-bronze via-bronze/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="p-5 lg:p-6 flex-1 flex flex-col">
                    <div className="mb-auto">
                      <div className="w-12 h-12 border border-bronze/40 flex items-center justify-center mb-5 group-hover:border-bronze group-hover:bg-bronze/10 transition-all duration-500 relative overflow-hidden">
                        <motion.span
                          className="font-sans text-xl text-bronze font-bold relative z-10"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.3 }}
                        >
                          {index + 1}
                        </motion.span>
                        <motion.div
                          className="absolute inset-0 bg-bronze/20"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <h3 className="font-display text-white text-xs lg:text-sm tracking-[0.2em] uppercase font-bold mb-3 lg:mb-4 group-hover:text-bronze transition-colors duration-500">
                        {valeur.title}
                      </h3>
                    </div>
                    <p className="font-sans text-white/60 text-xs lg:text-sm font-light leading-[1.65] group-hover:text-white/80 transition-colors duration-500">
                      {valeur.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-bronze/20 group-hover:border-bronze transition-colors duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-white text-base md:text-lg font-light">05</span>
                <span className="font-sans text-white/30 text-xs">/</span>
                <span className="font-sans text-white/40 text-xs">09</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-white/30 text-[6px] tracking-[0.4em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-white/20 text-[6px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
