import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MapComponent from './map/MapComponent';
import opticiansData from '../data/opticians.json';

export default function TryInStoreSection() {
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
      className="min-h-screen laptop:h-screen sticky top-0 z-[80] bg-white"
    >
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-beige/10 to-beige/20" />

        <div className="relative h-full grid grid-cols-1 laptop:grid-cols-[55%_45%] lg:grid-cols-2">

          <div className="flex flex-col items-center justify-center px-6 sm:px-8 laptop:px-10 md:px-12 lg:px-16 py-12 sm:py-16 laptop:py-16 lg:py-12">
            <div className="max-w-xl laptop:max-w-lg w-full">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-sans text-bronze text-[9px] sm:text-[10px] laptop:text-[11px] tracking-[0.3em] uppercase mb-3 sm:mb-4 laptop:mb-6 font-bold">
                  Réseau National
                </p>
                <h2 className="font-display text-3xl sm:text-4xl laptop:text-5xl md:text-6xl lg:text-7xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-4 sm:mb-5 laptop:mb-7 lg:mb-8">
                  ESSAYER<br />EN BOUTIQUE.
                </h2>
                <p className="font-sans text-dark-text/70 text-sm sm:text-base laptop:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 laptop:mb-7 lg:mb-8">
                  Renaissance s'essaie, se touche, se vit. Découvrez l'expérience dans l'un
                  de nos 200+ opticiens partenaires à travers la France.
                </p>

                <div className="space-y-4 sm:space-y-5 laptop:space-y-5 lg:space-y-6 mb-6 sm:mb-7 laptop:mb-9 lg:mb-10">
                  <div className="flex items-start gap-2.5 sm:gap-3 laptop:gap-4 group">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-bronze rotate-45 mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="font-sans text-dark-text text-xs sm:text-sm laptop:text-[15px] font-semibold mb-0.5 sm:mb-1">
                        Essayage personnalisé
                      </p>
                      <p className="font-sans text-dark-text/60 text-xs sm:text-sm laptop:text-[14px] leading-relaxed">
                        Nos opticiens partenaires vous conseillent sur la collection qui vous correspond
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3 laptop:gap-4 group">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-bronze rotate-45 mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="font-sans text-dark-text text-xs sm:text-sm laptop:text-[15px] font-semibold mb-0.5 sm:mb-1">
                        Ajustement sur mesure
                      </p>
                      <p className="font-sans text-dark-text/60 text-xs sm:text-sm laptop:text-[14px] leading-relaxed">
                        Un réglage professionnel pour un confort optimal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3 laptop:gap-4 group">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-bronze rotate-45 mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="font-sans text-dark-text text-xs sm:text-sm laptop:text-[15px] font-semibold mb-0.5 sm:mb-1">
                        Service premium
                      </p>
                      <p className="font-sans text-dark-text/60 text-xs sm:text-sm laptop:text-[14px] leading-relaxed">
                        Accompagnement complet et garantie 2 ans
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/store-locator" className="flex-1">
                    <button className="w-full border-2 border-dark-text bg-dark-text text-white px-6 sm:px-8 py-3.5 sm:py-4 laptop:py-4 lg:py-5 font-sans text-[9px] sm:text-[10px] laptop:text-[11px] tracking-[0.25em] font-bold hover:bg-white hover:text-dark-text transition-all duration-500">
                      TROUVER VOTRE OPTICIEN
                    </button>
                  </Link>
                </div>

                <p className="font-sans text-dark-text/40 text-[10px] sm:text-xs laptop:text-[13px] text-center sm:text-left tracking-wider mt-4 sm:mt-5 laptop:mt-6">
                  200+ opticiens partenaires en France métropolitaine
                </p>

              </motion.div>

            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[300px] sm:h-[400px] laptop:h-full"
          >
            <MapComponent
              stores={opticiansData}
              selectedStore={null}
              onSelectStore={() => {}}
              userLocation={null}
              initialCenter={[2.5, 46.5]}
              initialZoom={5.5}
              disableAutoBounds={true}
            />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
