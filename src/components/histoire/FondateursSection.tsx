import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FondateursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: false,
    amount: 0.1,
    margin: "0px 0px -10% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-20 bg-beige overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full relative flex flex-col"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-beige to-beige/95" />
        
        {/* Grid décoratif */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        {/* HEADER */}
        <div className="relative z-10 pt-6 md:pt-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">02</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-xs font-medium tracking-[0.3em] uppercase">L'Origine</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[10px] tracking-[0.25em] uppercase">Les 3 • 2019</p>
            </div>
          </div>
        </div>

        {/* CONTENU PRINCIPAL */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-6 lg:py-4">
          <div className="max-w-[1800px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
              
              {/* GAUCHE - Texte */}
              <div className="space-y-5 order-2 lg:order-1">
                
                {/* Titre */}
                <div>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-3">
                    NÉE D'UN <span className="text-bronze">REFUS.</span>
                  </h2>
                  
                  {/* Les 3 refus */}
                  <div className="flex gap-3">
                    <div className="w-0.5 bg-gradient-to-b from-bronze to-bronze/10 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="font-display text-sm md:text-base text-dark-text/70 font-light">Refus que tout se ressemble.</p>
                      <p className="font-display text-sm md:text-base text-dark-text/70 font-light">Refus que le travail bien fait disparaisse.</p>
                      <p className="font-display text-sm md:text-base text-dark-text/70 font-light">Refus de regarder ailleurs.</p>
                    </div>
                  </div>
                </div>

                {/* Box Les 3 */}
                <div className="border border-dark-text/10 bg-white/30 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border-2 border-bronze flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-xl text-bronze font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-sans text-bronze text-[9px] tracking-[0.2em] uppercase font-bold mb-0.5">Les Fondateurs</p>
                      <p className="font-sans text-sm text-dark-text/70 font-light leading-snug">
                        Pas trois héritiers. Pas trois diplômés.
                        <span className="text-dark-text font-medium"> Trois hommes du métier.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DROITE - Image avec hauteur contrôlée */}
              <div className="order-1 lg:order-2 flex items-center justify-center">
                <div className="relative w-full max-w-md lg:max-w-none lg:h-[55vh]">
                  {/* Cadre décoratif */}
                  <div className="absolute -inset-2 border border-bronze/10 hidden lg:block" />
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-bronze hidden lg:block" />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-bronze hidden lg:block" />
                  
                  {/* Image */}
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full w-full overflow-hidden">
                    <img
                      src="https://26.staticbtf.eno.do/v1/106-default/95a5f4f8ed2bc82a4fe05bac8a7efdff/media.jpg"
                      alt="Les 3 fondateurs de Renaissance"
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Overlay bas */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-dark-text/40 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2">
                      <p className="font-sans text-bronze text-[8px] tracking-[0.2em] uppercase font-bold">Depuis</p>
                      <p className="font-display text-lg text-dark-text font-bold">2019</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 pb-4 md:pb-6 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-dark-text/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-dark-text text-lg md:text-xl font-light">02</span>
                <span className="font-sans text-dark-text/30 text-sm">/</span>
                <span className="font-sans text-dark-text/40 text-sm">07</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[8px] tracking-[0.3em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-dark-text/20 text-[8px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}