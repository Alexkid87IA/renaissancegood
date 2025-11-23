import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const valeurs = [
  { title: 'LA JUSTESSE', description: 'Chaque mot vrai. Chaque geste nécessaire. Chaque matière juste.' },
  { title: 'LE RESPECT', description: 'On ne traite personne comme un chiffre.' },
  { title: 'LE SILENCE', description: "La vraie élégance, c'est ne pas forcer l'attention." },
  { title: 'LA TRANSMISSION', description: "On construit pour que dans 20 ans, quelqu'un hérite d'une paire et la garde." },
  { title: 'LA MAÎTRISE', description: 'On ne fait pas vite. On fait bien.' }
];

export default function ValeursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: false,
    amount: 0.1,
    margin: "0px 0px -10% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="h-screen sticky top-0 z-50 bg-dark-text overflow-hidden"
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
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
        </div>

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

        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-12">
          <div className="max-w-[1800px] mx-auto w-full">
            <div className="mb-10">
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-6">
                LES VALEURS.
              </h2>
              <p className="font-sans text-xl md:text-2xl text-white/70 font-light leading-[1.5] max-w-2xl">
                Cinq piliers non-négociables qui guident chaque décision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {valeurs.map((valeur, index) => (
                <div
                  key={valeur.title}
                  className="border border-bronze/20 bg-white/[0.02] p-6 hover:border-bronze transition-all duration-300"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 border border-bronze/30 flex items-center justify-center mb-4">
                      <span className="font-sans text-2xl text-bronze font-bold">{index + 1}</span>
                    </div>
                    <h3 className="font-sans text-white text-sm tracking-[0.2em] uppercase font-bold mb-3">
                      {valeur.title}
                    </h3>
                  </div>
                  <p className="font-sans text-white/70 text-sm font-light leading-[1.6]">
                    {valeur.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="font-sans text-white/70 text-lg md:text-xl font-light leading-[1.7] italic text-center max-w-3xl mx-auto">
                Ces valeurs ne sont pas des slogans. Ce sont des engagements quotidiens.
              </p>
            </div>
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
    </section>
  );
}