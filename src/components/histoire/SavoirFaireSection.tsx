import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '200', unit: '+', label: 'Gestes', sublabel: 'Par paire' },
  { value: '15', unit: 'h', label: 'Temps', sublabel: 'Fabrication' },
  { value: '0', unit: '', label: 'Compromis', sublabel: 'Zéro' }
];

const steps = [
  { number: '01', title: 'Découpe', desc: 'Métal épais de haute qualité' },
  { number: '02', title: 'Façonnage', desc: 'Précision micrométrique' },
  { number: '03', title: 'Équilibrage', desc: 'Tension et poids parfaits' },
  { number: '04', title: 'Polissage', desc: 'Finition miroir multi-passes' },
  { number: '05', title: 'Sertissage', desc: 'Strass signature à la main' }
];

export default function SavoirFaireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="h-screen lg:sticky lg:top-0 z-30 bg-dark-text overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-br from-dark-text via-dark-text to-dark-text/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,115,85,0.08)_0%,transparent_70%)]" />

        <div className="absolute inset-0 opacity-[0.02] hidden lg:block">
          <div className="absolute left-[33%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[66%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        <div className="relative z-10 pt-3 md:pt-4 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-bronze text-[0.65rem] font-bold tracking-[0.4em] uppercase">03</span>
              <div className="w-5 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-[0.55rem] font-medium tracking-[0.3em] uppercase">La Fabrication</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[7px] tracking-[0.25em] uppercase">Corée du Sud</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-6 md:px-8 lg:px-12 py-4">
          <div className="max-w-[1600px] mx-auto w-full">

            <div className="mb-3 md:mb-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-display text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] xl:text-[3.4rem] font-bold text-white tracking-[-0.03em] leading-[0.9] mb-2 md:mb-3"
              >
                FABRIQUÉ EN<br />CORÉE DU SUD.
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-2xl space-y-2"
              >
                <p className="font-sans text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] text-white/70 font-light leading-[1.5]">
                  Ce qui rend une monture belle, c'est ce qu'on ne voit pas. L'équilibre. La tension du métal. Le poids juste. La Corée a construit sa réputation là-dessus. Sur l'invisible. Sur ce qui se sent mais ne se montre pas.
                </p>
                <p className="font-sans text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] text-bronze font-light leading-[1.5] italic">
                  Plus de 200 gestes par paire. Zéro démonstration. Juste le résultat.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4"
            >

              <div className="lg:col-span-4">
                <div className="relative aspect-video border border-bronze/30 bg-white/[0.02] overflow-hidden group">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                    <div className="text-center space-y-1.5 px-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 mx-auto border border-bronze/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[10px] border-l-bronze border-b-[7px] border-b-transparent ml-1" />
                      </div>
                      <div>
                        <p className="font-sans text-white text-[0.65rem] md:text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-0.5">
                          Vidéo de fabrication
                        </p>
                        <p className="font-sans text-bronze text-[0.55rem] md:text-[0.6rem] font-light">
                          En cours de production
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-bronze" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-bronze" />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-2.5 md:space-y-3">
                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                  {stats.map((stat, index) => (
                    <div key={index} className="border border-bronze/20 bg-white/[0.02] p-2 md:p-2.5 text-center">
                      <div className="flex items-baseline justify-center gap-0.5 mb-0.5">
                        <span className="font-sans text-[1rem] md:text-[1.1rem] text-bronze font-bold">
                          {stat.value}
                        </span>
                        {stat.unit && (
                          <span className="font-sans text-[0.65rem] md:text-[0.7rem] text-bronze/70 font-bold">
                            {stat.unit}
                          </span>
                        )}
                      </div>
                      <div className="h-px bg-bronze/20 mb-0.5" />
                      <p className="font-display text-white text-[0.5rem] tracking-[0.15em] uppercase font-bold mb-0.5">
                        {stat.label}
                      </p>
                      <p className="font-sans text-white/40 text-[0.45rem] leading-tight">
                        {stat.sublabel}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border border-bronze/20 bg-white/[0.02] p-2.5 md:p-3">
                  <div className="pb-1.5 border-b border-white/5 mb-2">
                    <p className="font-sans text-bronze text-[0.55rem] tracking-[0.3em] uppercase font-bold">
                      5 Étapes essentielles
                    </p>
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2 group">
                        <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 border border-bronze/30 flex items-center justify-center group-hover:bg-bronze/10 transition-colors duration-300">
                          <span className="font-sans text-bronze text-[0.5rem] md:text-[0.55rem] font-bold">
                            {step.number}
                          </span>
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p className="font-display text-white text-[0.65rem] md:text-[0.7rem] font-bold mb-0.5">
                            {step.title}
                          </p>
                          <p className="font-sans text-white/50 text-[0.55rem] md:text-[0.6rem] leading-tight">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 pb-3 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto border-t border-white/10 pt-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-white text-[0.95rem] md:text-[1.1rem] font-light">03</span>
                <span className="font-sans text-white/30 text-[0.65rem]">/</span>
                <span className="font-sans text-white/40 text-[0.65rem]">09</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-7 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
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
