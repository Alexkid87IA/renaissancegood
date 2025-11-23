import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const engagements = [
  { title: 'Durabilité', description: "On construit pour durer. Pas pour être jeté après deux saisons." },
  { title: 'Traçabilité', description: "Tu sais d'où viennent tes lunettes. Fabrication, matériaux, tout est transparent." },
  { title: 'Équité', description: "On paie nos partenaires correctement. On respecte nos opticiens." }
];

export default function EngagementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: false,
    amount: 0.1,
    margin: "0px 0px -10% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="h-screen sticky top-0 z-[80] bg-beige overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-beige to-beige/95" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        <div className="relative z-10 pt-8 md:pt-12 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">08</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-xs font-medium tracking-[0.3em] uppercase">L'Engagement</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[10px] tracking-[0.25em] uppercase">Responsabilité</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-12">
          <div className="max-w-[1800px] mx-auto w-full">
            
            <div className="mb-12">
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-6">
                L'ENGAGEMENT.
              </h2>
              <p className="font-sans text-xl md:text-2xl text-dark-text/70 font-light leading-[1.5] max-w-3xl">
                Renaissance ne fabrique pas de la fast fashion. Chaque paire est une promesse de durabilité, de traçabilité et d'équité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {engagements.map((engagement, index) => (
                <div
                  key={engagement.title}
                  className="border border-bronze/20 bg-dark-text/[0.02] p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-bronze rotate-45" />
                    <h3 className="font-sans text-dark-text text-sm tracking-[0.2em] uppercase font-bold">
                      {engagement.title}
                    </h3>
                  </div>
                  <p className="font-sans text-dark-text/70 text-base font-light leading-[1.7]">
                    {engagement.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Citation finale */}
            <div className="border-l-2 border-bronze/30 pl-8 max-w-3xl mx-auto">
              <p className="font-sans text-2xl md:text-3xl text-dark-text font-light leading-[1.4] italic mb-6">
                Renaissance, c'est un projet à contre-courant.
              </p>
              <p className="font-sans text-lg text-dark-text/70 font-light leading-[1.7]">
                Contre la fast fashion. Contre l'uniformité. Contre l'oubli. On restaure ce qui mérite de l'être. On crée ce qui manque. Et on le fait avec les bons codes, le bon respect, et la bonne conscience.
              </p>
            </div>

            {/* Signature finale */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4">
                <div className="w-2 h-2 bg-bronze rotate-45" />
                <p className="font-display text-4xl md:text-5xl lg:text-6xl text-dark-text font-bold tracking-tight">
                  Renaissance.
                </p>
                <div className="w-2 h-2 bg-bronze rotate-45" />
              </div>
              <p className="font-sans text-dark-text/40 text-xs tracking-[0.3em] uppercase mt-3">
                Paris • 2019-2025
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6 md:pb-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-dark-text/10 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-dark-text text-xl md:text-2xl font-light">08</span>
                <span className="font-sans text-dark-text/30 text-sm">/</span>
                <span className="font-sans text-dark-text/40 text-sm">08</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-12 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] uppercase">Fin</span>
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