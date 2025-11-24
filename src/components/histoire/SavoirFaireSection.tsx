import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '15', unit: 'h', label: 'Par paire', sublabel: 'Fabrication artisanale' },
  { value: '12', unit: '+', label: 'Artisans', sublabel: 'Spécialisés' },
  { value: '100', unit: '%', label: 'Fait main', sublabel: 'Métal épais' }
];

const steps = [
  { number: '01', title: 'Découpe', desc: 'Métal épais de haute qualité' },
  { number: '02', title: 'Façonnage', desc: 'Précision micrométrique' },
  { number: '03', title: 'Gravure laser', desc: 'Symboles et numérotation' },
  { number: '04', title: 'Polissage', desc: 'Multi-passes pour finition miroir' },
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
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-[3] bg-dark-text overflow-hidden"
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

        <div className="relative z-10 pt-6 md:pt-8 lg:pt-12 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="font-sans text-bronze text-xs md:text-sm font-bold tracking-[0.4em] uppercase">03</span>
              <div className="w-6 md:w-8 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase">Le Savoir-Faire</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[10px] tracking-[0.25em] uppercase">Corée du Sud</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 py-8 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1800px] mx-auto w-full">

            <div className="mb-6 md:mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3 md:mb-4" style={{ color: '#FFFFFF' }}>
                LA MAÎTRISE<br />CORÉENNE.
              </h2>
              <p className="font-sans text-base md:text-lg lg:text-xl text-white/70 font-light leading-[1.6] max-w-2xl">
                Nos lunettes sont fabriquées en Corée du Sud. Un choix assumé pour l'exigence, la constance et la précision d'usinage du métal.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 lg:gap-8">

              <div className="lg:col-span-7">
                <div className="relative aspect-video border-2 border-bronze/30 bg-white/[0.02] overflow-hidden group">

                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                    <div className="text-center space-y-3 md:space-y-4 px-4 md:px-8">
                      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto border-2 border-bronze/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-bronze border-b-[10px] border-b-transparent ml-1" />
                      </div>

                      <div>
                        <p className="font-sans text-white text-base md:text-lg font-bold tracking-[0.2em] uppercase mb-2">
                          Vidéo de fabrication
                        </p>
                        <p className="font-sans text-white/50 text-xs md:text-sm font-light">
                          Découvrez le processus artisanal en détail
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-bronze" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-bronze" />
                </div>

                <div className="mt-3 md:mt-4 border-l-2 border-bronze/30 pl-3 md:pl-4">
                  <p className="font-sans text-white/60 text-xs md:text-sm italic leading-[1.6]">
                    15 heures de travail minutieux pour transformer le métal en œuvre d'art portable.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5 md:space-y-6">

                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="border border-bronze/20 bg-white/[0.02] p-3 md:p-4 text-center">
                      <div className="flex items-baseline justify-center gap-0.5 md:gap-1 mb-1.5 md:mb-2">
                        <span className="font-sans text-2xl md:text-3xl text-bronze font-bold">
                          {stat.value}
                        </span>
                        {stat.unit && (
                          <span className="font-sans text-base md:text-lg text-bronze/70 font-bold">
                            {stat.unit}
                          </span>
                        )}
                      </div>
                      <div className="h-px bg-bronze/20 mb-1.5 md:mb-2" />
                      <p className="font-sans text-white text-[10px] md:text-xs tracking-[0.15em] uppercase font-bold mb-0.5 md:mb-1">
                        {stat.label}
                      </p>
                      <p className="font-sans text-white/40 text-[9px] md:text-[10px] leading-tight">
                        {stat.sublabel}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border border-bronze/20 bg-white/[0.02] p-4 md:p-6">
                  <div className="pb-2 md:pb-3 border-b border-white/5 mb-3 md:mb-4">
                    <p className="font-sans text-bronze text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">
                      5 Étapes essentielles
                    </p>
                  </div>

                  <div className="space-y-2.5 md:space-y-3">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2 md:gap-3 group">
                        <div className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 border border-bronze/30 flex items-center justify-center group-hover:bg-bronze/10 transition-colors duration-300">
                          <span className="font-sans text-bronze text-[10px] md:text-xs font-bold">
                            {step.number}
                          </span>
                        </div>
                        <div className="flex-1 pt-0.5 md:pt-1">
                          <p className="font-sans text-white text-xs md:text-sm font-bold mb-0.5">
                            {step.title}
                          </p>
                          <p className="font-sans text-white/50 text-[10px] md:text-xs leading-tight">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-l-2 border-bronze/30 pl-3 md:pl-4">
                  <p className="font-sans text-xs md:text-sm lg:text-base text-white/70 font-light leading-[1.6] italic">
                    La rigueur coréenne transforme le métal en héritage. Précision, patience, perfection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-4 md:pb-6 lg:pb-8 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-white/10 pt-4 md:pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="font-sans text-white text-lg md:text-xl lg:text-2xl font-light">03</span>
                <span className="font-sans text-white/30 text-xs md:text-sm">/</span>
                <span className="font-sans text-white/40 text-xs md:text-sm">08</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <div className="w-px h-8 md:h-12 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-white/30 text-[8px] md:text-[9px] tracking-[0.4em] uppercase">Défiler</span>
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
