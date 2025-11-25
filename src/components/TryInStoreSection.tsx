import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

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
      className="h-screen sticky top-0 z-[80] bg-white"
    >
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-beige/10 to-beige/20" />

        <div className="relative h-full flex items-center justify-center px-6 laptop:px-16 py-20 laptop:py-16">
          <div className="max-w-2xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl sm:text-5xl laptop:text-6xl lg:text-7xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-4 laptop:mb-6">
                ESSAYER EN<br />BOUTIQUE.
              </h2>
              <p className="font-sans text-dark-text/70 text-sm laptop:text-base leading-[1.6] mb-8 laptop:mb-12 px-4 laptop:px-0">
                Renaissance s'essaie, se touche, se vit. Découvrez l'expérience dans l'un
                de nos 200+ opticiens partenaires à travers la France.
              </p>

              <div className="grid md:grid-cols-3 gap-6 laptop:gap-8 mb-8 laptop:mb-12 max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-2.5 h-2.5 laptop:w-3 laptop:h-3 bg-bronze rotate-45 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <p className="font-sans text-dark-text text-sm laptop:text-[15px] font-semibold mb-1.5">
                      Essayage personnalisé
                    </p>
                    <p className="font-sans text-dark-text/60 text-xs laptop:text-[14px] leading-[1.6] px-2 laptop:px-0">
                      Nos opticiens partenaires vous conseillent sur la collection qui vous correspond
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-2.5 h-2.5 laptop:w-3 laptop:h-3 bg-bronze rotate-45 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <p className="font-sans text-dark-text text-sm laptop:text-[15px] font-semibold mb-1.5">
                      Ajustement sur mesure
                    </p>
                    <p className="font-sans text-dark-text/60 text-xs laptop:text-[14px] leading-[1.6] px-2 laptop:px-0">
                      Un réglage professionnel pour un confort optimal
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-2.5 h-2.5 laptop:w-3 laptop:h-3 bg-bronze rotate-45 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <p className="font-sans text-dark-text text-sm laptop:text-[15px] font-semibold mb-1.5">
                      Service premium
                    </p>
                    <p className="font-sans text-dark-text/60 text-xs laptop:text-[14px] leading-[1.6] px-2 laptop:px-0">
                      Accompagnement complet et garantie 2 ans
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/store-locator">
                <button className="border-2 border-dark-text bg-dark-text text-white px-8 laptop:px-12 py-4 laptop:py-5 font-sans text-[10px] laptop:text-[11px] tracking-[0.25em] font-bold hover:bg-white hover:text-dark-text transition-all duration-500">
                  TROUVER VOTRE OPTICIEN
                </button>
              </Link>

              <p className="font-sans text-dark-text/40 text-xs laptop:text-[13px] text-center tracking-wider mt-6 laptop:mt-8">
                200+ opticiens partenaires en France métropolitaine
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
