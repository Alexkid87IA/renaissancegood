import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FabricationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen laptop:h-screen sticky top-0 z-[25]"
      id="fabrication"
    >
      <div className="relative min-h-screen laptop:h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761874713/61822c99-1122-400c-aa3a-317de2674d17_zodmfx.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-dark-text/95 via-dark-text/80 to-dark-text/65" />

        <div className="relative min-h-screen laptop:h-full flex items-center px-6 sm:px-8 md:px-12 lg:px-16 laptop:px-20 max-w-[1920px] mx-auto py-20 laptop:py-0 md:ml-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-[-0.03em] leading-[0.95]">
                FABRICATION
              </h2>

              <div className="space-y-4 laptop:space-y-5 mb-6 laptop:mb-8 xl:mb-10">
                <p className="font-sans text-white text-sm sm:text-base md:text-lg laptop:text-lg xl:text-2xl leading-[1.7] font-light max-w-2xl">
                  Une paire de Renaissance, c'est 250 étapes. Des mains françaises pour la vision. Des mains coréennes pour la précision. Deux pays. Un seul standard : celui qui dure.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 laptop:gap-6 xl:gap-8 pt-2 laptop:pt-3">
                  <div className="space-y-1.5">
                    <p className="font-display text-[2rem] sm:text-[2.25rem] md:text-4xl laptop:text-4xl xl:text-6xl text-white font-bold tracking-tight">8-12</p>
                    <p className="font-sans text-white/70 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase leading-[1.5] font-medium">
                      Artisans<br/>par paire
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-display text-[2rem] sm:text-[2.25rem] md:text-4xl laptop:text-4xl xl:text-6xl text-white font-bold tracking-tight">250</p>
                    <p className="font-sans text-white/70 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase leading-[1.5] font-medium">
                      Étapes de<br/>fabrication
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-display text-[2rem] sm:text-[2.25rem] md:text-4xl laptop:text-4xl xl:text-6xl text-white font-bold tracking-tight whitespace-nowrap">8-15h</p>
                    <p className="font-sans text-white/70 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase leading-[1.5] font-medium">
                      De travail<br/>cumulé
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-display text-[2rem] sm:text-[2.25rem] md:text-4xl laptop:text-4xl xl:text-6xl text-white font-bold tracking-tight">2</p>
                    <p className="font-sans text-white/70 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase leading-[1.5] font-medium">
                      Pays, un<br/>standard
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 laptop:space-y-2 xl:space-y-2.5 mb-6 laptop:mb-8 xl:mb-10 max-w-2xl">
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 flex-shrink-0 group-hover:bg-white transition-colors" />
                  <p className="font-sans text-white text-xs sm:text-[13px] md:text-sm laptop:text-sm xl:text-lg leading-[1.55] font-light">
                    <span className="font-semibold text-white">Dessinées à Paris.</span> Chaque ligne, chaque courbe.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 flex-shrink-0 group-hover:bg-white transition-colors" />
                  <p className="font-sans text-white text-xs sm:text-[13px] md:text-sm laptop:text-sm xl:text-lg leading-[1.55] font-light">
                    <span className="font-semibold text-white">Usinées en Corée.</span> Là où la précision est une religion.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 flex-shrink-0 group-hover:bg-white transition-colors" />
                  <p className="font-sans text-white text-xs sm:text-[13px] md:text-sm laptop:text-sm xl:text-lg leading-[1.55] font-light">
                    <span className="font-semibold text-white">Acétate Mazzucchelli. Acier haute résistance.</span> Pas de compromis.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 flex-shrink-0 group-hover:bg-white transition-colors" />
                  <p className="font-sans text-white text-xs sm:text-[13px] md:text-sm laptop:text-sm xl:text-lg leading-[1.55] font-light">
                    <span className="font-semibold text-white">Un strass sur la branche gauche.</span> Notre signature. Discrète.
                  </p>
                </div>
              </div>

              <button className="border-2 border-white/30 text-white px-6 sm:px-8 laptop:px-10 xl:px-12 py-3 sm:py-3.5 laptop:py-4 xl:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold hover:bg-white hover:text-dark-text hover:border-white transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                VOIR LE PROCESSUS
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
