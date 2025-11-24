import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, X } from 'lucide-react';

const valeurs = [
  {
    title: 'LA JUSTESSE',
    description: 'Chaque mot vrai. Chaque geste nécessaire. Chaque matière juste.',
    icon: '⚖️'
  },
  {
    title: 'LE RESPECT',
    description: 'On ne traite personne comme un chiffre.',
    icon: '🤝'
  },
  {
    title: 'LE SILENCE',
    description: "La vraie élégance, c'est ne pas forcer l'attention.",
    icon: '🔇'
  },
  {
    title: 'LA TRANSMISSION',
    description: "On construit pour que dans 20 ans, quelqu'un hérite d'une paire et la garde.",
    icon: '🔄'
  },
  {
    title: 'LA MAÎTRISE',
    description: 'On ne fait pas vite. On fait bien.',
    icon: '✋'
  }
];

const accepted = [
  { title: 'Le luxe uniformisé', desc: 'Réinventer avec authenticité' },
  { title: "L'oubli artisanal", desc: 'Préserver le savoir-faire' },
  { title: "L'uniformité", desc: 'Célébrer la singularité' }
];

const refus = [
  { title: 'Le luxe uniformisé', desc: "Tout se ressemble. Même logos, mêmes codes, même ennui." },
  { title: "L'oubli artisanal", desc: "Des machines partout. Plus personne ne sait faire avec ses mains." },
  { title: "L'uniformité", desc: "Tout le monde porte la même chose. On ne regarde plus." }
];

export default function ValeursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showRefus, setShowRefus] = useState(false);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-20 bg-dark-text overflow-hidden"
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

        <div className="relative z-10 pt-8 md:pt-12 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">05</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-xs font-medium tracking-[0.3em] uppercase">Les 5 Piliers</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[10px] tracking-[0.25em] uppercase">Valeurs</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-start px-6 md:px-12 lg:px-16 py-8 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1800px] mx-auto w-full">
            <div className="mb-8 md:mb-12 pt-8 md:pt-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6"
              >
                LES VALEURS.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-sans text-xl md:text-2xl text-white/70 font-light leading-[1.6] max-w-2xl"
              >
                Cinq piliers non-négociables qui guident chaque décision.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-12">
              {valeurs.map((valeur, index) => (
                <motion.div
                  key={valeur.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative border-2 border-bronze/30 bg-gradient-to-br from-white/[0.03] to-transparent p-6 hover:border-bronze hover:bg-bronze/5 transition-all duration-500 group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bronze via-bronze/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="mb-5">
                    <div className="w-16 h-16 border-2 border-bronze/40 flex items-center justify-center mb-5 group-hover:border-bronze group-hover:bg-bronze/10 transition-all duration-500 relative overflow-hidden">
                      <motion.span
                        className="font-sans text-3xl text-bronze font-bold relative z-10"
                        whileHover={{ scale: 1.2, rotate: 5 }}
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
                    <h3 className="font-sans text-white text-base md:text-lg tracking-[0.25em] uppercase font-bold mb-3 group-hover:text-bronze transition-colors duration-500">
                      {valeur.title}
                    </h3>
                  </div>
                  <p className="font-sans text-white/70 text-sm md:text-base font-light leading-[1.7] group-hover:text-white/90 transition-colors duration-500">
                    {valeur.description}
                  </p>

                  <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-bronze/20 group-hover:border-bronze transition-colors duration-500" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="border-t-2 border-white/10 pt-10"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                    CE QU'ON REFUSE.
                  </h3>
                  <p className="font-sans text-white/60 text-base md:text-lg">
                    Nos anti-valeurs. Ce contre quoi on se bat.
                  </p>
                </div>

                <button
                  onClick={() => setShowRefus(!showRefus)}
                  className="px-6 py-3 border-2 border-bronze/40 hover:border-bronze hover:bg-bronze/10 transition-all duration-300 flex items-center gap-3 group"
                >
                  <span className="font-sans text-white text-sm tracking-[0.2em] uppercase font-bold">
                    {showRefus ? 'Masquer' : 'Révéler'}
                  </span>
                  <motion.div
                    animate={{ rotate: showRefus ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-5 h-5 text-bronze" />
                  </motion.div>
                </button>
              </div>

              <motion.div
                initial={false}
                animate={{ height: showRefus ? 'auto' : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 pt-6">
                  {refus.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={showRefus ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative border-2 border-red-900/40 bg-gradient-to-br from-red-950/20 to-transparent p-6 group hover:border-red-700 transition-all duration-500"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 border-2 border-red-800/50 flex items-center justify-center flex-shrink-0 group-hover:border-red-700 transition-colors duration-500">
                          <X className="w-5 h-5 text-red-700 group-hover:text-red-500 transition-colors duration-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-sans text-red-400 text-xs tracking-[0.3em] uppercase font-bold mb-2">
                            REFUS {String(index + 1).padStart(2, '0')}
                          </p>
                          <h4 className="font-sans text-white text-base md:text-lg font-bold mb-2">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                      <p className="font-sans text-white/60 text-sm leading-[1.7] italic">
                        {item.desc}
                      </p>

                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-900/40 group-hover:border-red-700 transition-colors duration-500" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12 border-l-4 border-bronze pl-8 py-6 bg-gradient-to-r from-bronze/5 to-transparent"
            >
              <p className="font-sans text-white/80 text-lg md:text-xl lg:text-2xl font-light leading-[1.8] italic">
                Ces valeurs ne sont pas des slogans. Ce sont des engagements quotidiens, gravés dans chaque paire que nous créons.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 pb-6 md:pb-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-white text-xl md:text-2xl font-light">05</span>
                <span className="font-sans text-white/30 text-sm">/</span>
                <span className="font-sans text-white/40 text-sm">08</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-12 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-white/30 text-[9px] tracking-[0.4em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-white/20 text-[9px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
