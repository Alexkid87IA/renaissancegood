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
    once: false,
    amount: 0.1,
    margin: "0px 0px -10% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="h-screen sticky top-0 z-30 bg-dark-text overflow-hidden"
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
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-text via-dark-text to-dark-text/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,115,85,0.08)_0%,transparent_70%)]" />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute left-[33%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[66%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        {/* HEADER */}
        <div className="relative z-10 pt-8 md:pt-12 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">03</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-xs font-medium tracking-[0.3em] uppercase">Le Savoir-Faire</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[10px] tracking-[0.25em] uppercase">Corée du Sud</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-8 overflow-y-auto">
          <div className="max-w-[1800px] mx-auto w-full">
            
            {/* Titre */}
            <div className="mb-10">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-4">
                LA MAÎTRISE<br />CORÉENNE.
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/70 font-light leading-[1.6] max-w-2xl">
                Nos lunettes sont fabriquées en Corée du Sud. Un choix assumé pour l'exigence, la constance et la précision d'usinage du métal.
              </p>
            </div>

            {/* Grid layout : Vidéo + Stats + Process */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              
              {/* LEFT - Vidéo de fabrication (grande zone) */}
              <div className="lg:col-span-7">
                <div className="relative aspect-video border-2 border-bronze/30 bg-white/[0.02] overflow-hidden group">
                  
                  {/* Placeholder pour la vidéo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                    <div className="text-center space-y-4 px-8">
                      {/* Icon vidéo */}
                      <div className="w-20 h-20 mx-auto border-2 border-bronze/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-bronze border-b-8 border-b-transparent ml-1" />
                      </div>
                      
                      <div>
                        <p className="font-sans text-white text-lg font-bold tracking-[0.2em] uppercase mb-2">
                          Vidéo de fabrication
                        </p>
                        <p className="font-sans text-white/50 text-sm font-light">
                          Découvrez le processus artisanal en détail
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remplace cette div par ta vidéo quand prête :
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    poster="URL_DE_TON_POSTER"
                  >
                    <source src="URL_DE_TA_VIDEO" type="video/mp4" />
                  </video>
                  */}

                  {/* Accents décoratifs */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-bronze" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-bronze" />
                </div>

                {/* Caption sous la vidéo */}
                <div className="mt-4 border-l-2 border-bronze/30 pl-4">
                  <p className="font-sans text-white/60 text-sm italic leading-[1.6]">
                    15 heures de travail minutieux pour transformer le métal en œuvre d'art portable.
                  </p>
                </div>
              </div>

              {/* RIGHT - Stats + Process */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Stats compactes */}
                <div className="grid grid-cols-3 gap-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="border border-bronze/20 bg-white/[0.02] p-4 text-center">
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="font-sans text-3xl text-bronze font-bold">
                          {stat.value}
                        </span>
                        {stat.unit && (
                          <span className="font-sans text-lg text-bronze/70 font-bold">
                            {stat.unit}
                          </span>
                        )}
                      </div>
                      <div className="h-px bg-bronze/20 mb-2" />
                      <p className="font-sans text-white text-xs tracking-[0.15em] uppercase font-bold mb-1">
                        {stat.label}
                      </p>
                      <p className="font-sans text-white/40 text-[10px] leading-tight">
                        {stat.sublabel}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Les 5 étapes */}
                <div className="border border-bronze/20 bg-white/[0.02] p-6">
                  <div className="pb-3 border-b border-white/5 mb-4">
                    <p className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold">
                      5 Étapes essentielles
                    </p>
                  </div>

                  <div className="space-y-3">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <div className="w-8 h-8 flex-shrink-0 border border-bronze/30 flex items-center justify-center group-hover:bg-bronze/10 transition-colors duration-300">
                          <span className="font-sans text-bronze text-xs font-bold">
                            {step.number}
                          </span>
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="font-sans text-white text-sm font-bold mb-0.5">
                            {step.title}
                          </p>
                          <p className="font-sans text-white/50 text-xs leading-tight">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Citation finale */}
                <div className="border-l-2 border-bronze/30 pl-4">
                  <p className="font-sans text-sm md:text-base text-white/70 font-light leading-[1.6] italic">
                    La rigueur coréenne transforme le métal en héritage. Précision, patience, perfection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 pb-6 md:pb-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-white text-xl md:text-2xl font-light">03</span>
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