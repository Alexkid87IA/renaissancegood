import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const details = [
  { title: 'Strass signature', description: 'Serti à la main sur la branche gauche' },
  { title: 'Gravures laser', description: "Ultra-précises, invisibles à l'œil nu" },
  { title: 'Numérotation', description: 'Individuelle de chaque pièce' }
];

export default function SignatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-[7] bg-dark-text overflow-hidden"
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
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">07</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-xs font-medium tracking-[0.3em] uppercase">Le Détail Qui Parle</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[10px] tracking-[0.25em] uppercase">3 Détails</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-12">
          <div className="max-w-[1800px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-16 items-center">
              
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-6">
                    LA SIGNATURE.
                  </h2>
                  <p className="font-sans text-xl md:text-2xl text-white/70 font-light leading-[1.5] max-w-2xl">
                    Un strass discret sur la branche gauche. Des gravures fines visibles seulement de près. Une signature pour les initiés.
                  </p>
                </div>

                <div className="border-l-2 border-bronze/30 pl-8">
                  <p className="font-sans text-lg md:text-xl text-white/80 font-light leading-[1.6] italic">
                    Renaissance n'est pas fait pour crier. C'est fait pour être reconnu par ceux qui savent.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="border border-bronze/20 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
                  <div className="space-y-5">
                    <div className="pb-4 border-b border-white/5">
                      <p className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold">Les 3 Détails</p>
                    </div>

                    <div className="space-y-4">
                      {details.map((detail, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 flex-shrink-0 border border-bronze/30 flex items-center justify-center">
                            <span className="font-sans text-bronze text-sm font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-sans text-white font-bold text-sm mb-1">{detail.title}</h4>
                            <p className="font-sans text-white/70 text-sm font-light leading-[1.6]">
                              {detail.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <p className="font-sans text-white/50 text-xs leading-[1.7] font-light italic">
                        Chaque détail est une promesse de qualité et d'authenticité
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6 md:pb-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-white text-xl md:text-2xl font-light">07</span>
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