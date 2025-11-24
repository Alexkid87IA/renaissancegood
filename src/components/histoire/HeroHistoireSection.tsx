import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HeroHistoireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-[1] bg-dark-text overflow-hidden"
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
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        <div className="relative z-10 pt-6 md:pt-8 lg:pt-12 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="font-sans text-bronze text-xs md:text-sm font-bold tracking-[0.4em] uppercase">01</span>
              <div className="w-6 md:w-8 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase">Manifeste</span>
            </div>

            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[10px] tracking-[0.25em] uppercase">Paris • 2019 • Les 3</p>
              <p className="font-mono text-white/20 text-[9px] tracking-wider mt-1">48°51'24"N 2°21'04"E</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 py-8 md:py-12">
          <div className="max-w-[1800px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 md:gap-8 lg:gap-16 items-center">

              <div className="lg:col-span-4 space-y-6 md:space-y-8 lg:space-y-10">

                <div className="space-y-4 md:space-y-6">
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-[-0.03em] leading-[0.95]">
                    UN MOT<br />OUBLIÉ.
                  </h1>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-1 h-16 md:h-20 bg-bronze flex-shrink-0 mt-1" />
                    <div className="space-y-2 md:space-y-3">
                      <p className="font-sans text-base md:text-lg lg:text-xl xl:text-2xl font-light text-white/80 tracking-[-0.01em] leading-[1.3]">
                        Un mot trop grand pour ceux qui n'ont rien à dire.
                      </p>
                      <p className="font-sans text-base md:text-lg lg:text-xl xl:text-2xl font-light text-bronze tracking-[-0.01em] leading-[1.3]">
                        Mais parfait pour ceux qui ont quelque chose à restaurer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-bronze/20 bg-white/[0.02] backdrop-blur-sm p-4 md:p-6 lg:p-8">
                  <div className="space-y-4 md:space-y-5">
                    <div className="pb-3 md:pb-4 border-b border-white/5">
                      <p className="font-sans text-bronze text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">L'ADN Renaissance</p>
                    </div>

                    <div className="space-y-2 md:space-y-3 font-sans text-xs md:text-sm">
                      <div className="flex justify-between items-baseline gap-4">
                        <span className="text-white/40 tracking-[0.15em] uppercase text-[10px] md:text-xs">Fondation</span>
                        <span className="text-white/90 font-light text-xs md:text-sm">2019, Paris</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <span className="text-white/40 tracking-[0.15em] uppercase text-[10px] md:text-xs">Fondateurs</span>
                        <span className="text-white/90 font-light text-xs md:text-sm">Les 3</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <span className="text-white/40 tracking-[0.15em] uppercase text-[10px] md:text-xs">Distribution</span>
                        <span className="text-white/90 font-light text-xs md:text-sm">200+ opticiens</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <span className="text-white/40 tracking-[0.15em] uppercase text-[10px] md:text-xs">Collections</span>
                        <span className="text-white/90 font-light text-xs md:text-sm">3 thèmes symboliques</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <span className="text-white/40 tracking-[0.15em] uppercase text-[10px] md:text-xs">Symboles</span>
                        <span className="text-white/90 font-light text-xs md:text-sm">5 icônes</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <span className="text-white/40 tracking-[0.15em] uppercase text-[10px] md:text-xs">Fabrication</span>
                        <span className="text-white/90 font-light text-xs md:text-sm">Corée du Sud</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <span className="text-white/40 tracking-[0.15em] uppercase text-[10px] md:text-xs">Éditions</span>
                        <span className="text-white/90 font-light text-xs md:text-sm">100-300 pièces</span>
                      </div>
                    </div>

                    <div className="pt-3 md:pt-4 border-t border-white/5">
                      <p className="font-sans text-white/50 text-[11px] md:text-xs leading-[1.7] font-light italic">
                        Renaissance n'est pas fait pour crier. C'est fait pour être reconnu par ceux qui savent.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-bronze rotate-45" />
                  <div>
                    <p className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold tracking-tight">
                      Renaissance.
                    </p>
                    <p className="font-sans text-white/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mt-1">Paris • Eyewear</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,115,85,0.15)_0%,transparent_60%)] blur-3xl" />

                <div className="relative z-10">
                  <div className="absolute -inset-4 md:-inset-6 border border-bronze/10 pointer-events-none hidden lg:block" />

                  <div className="relative aspect-[4/3]">
                    <img
                      src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt="Renaissance Eyewear"
                      loading="lazy"
                      className="w-full h-full object-contain"
                      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                    />
                  </div>

                  <div className="mt-4 md:mt-6 flex items-center justify-between px-1 md:px-2">
                    <div className="space-y-1">
                      <p className="font-sans text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase">Philosophie</p>
                      <p className="font-sans text-white text-sm md:text-base lg:text-lg font-light">Restaurer le passé</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-sans text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase">Approche</p>
                      <p className="font-sans text-bronze text-sm md:text-base lg:text-lg font-light">Silence stylé</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-4 md:pb-6 lg:pb-8 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-white/10 pt-4 md:pt-5">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 md:gap-3">
                <span className="font-sans text-white text-lg md:text-xl lg:text-2xl font-light">01</span>
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
    </section>
  );
}
