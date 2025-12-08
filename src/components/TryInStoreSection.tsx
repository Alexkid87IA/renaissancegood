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
      className="min-h-screen md:h-screen relative sticky top-0 z-[80] bg-white"
    >
      <div className="relative min-h-screen md:h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-beige/10 to-beige/20" />

        <div className="relative min-h-screen md:h-full flex items-center justify-center px-4 sm:px-6 laptop:px-16 py-16 sm:py-20 laptop:py-16">
          <div className="max-w-6xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl laptop:text-6xl lg:text-7xl font-bold text-dark-text tracking-[-0.03em] leading-[1.1] mb-4 sm:mb-6 laptop:mb-8">
                <span className="block">ESSAYEZ EN BOUTIQUE.</span>
                <span className="block">COMMANDEZ EN LIGNE.</span>
              </h2>
              <p className="font-sans text-dark-text/70 text-sm sm:text-base laptop:text-lg leading-[1.6] mb-8 sm:mb-10 laptop:mb-12 px-2 sm:px-4 laptop:px-0 max-w-3xl mx-auto">
                Découvrez nos lunettes chez nos opticiens partenaires ou commandez directement en ligne.<br className="hidden sm:block" />
                Livraison offerte, retours gratuits sous 30 jours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 laptop:gap-10 mb-8 sm:mb-10 laptop:mb-12 max-w-5xl mx-auto">
                <div className="flex flex-col items-center gap-3 sm:gap-4 group">
                  <div className="w-4 h-4 laptop:w-5 laptop:h-5 bg-bronze rotate-45 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <p className="font-sans text-dark-text text-base laptop:text-lg font-semibold mb-1.5 sm:mb-2">
                      En boutique
                    </p>
                    <p className="font-sans text-dark-text/60 text-xs sm:text-sm laptop:text-base leading-[1.6] px-2 laptop:px-0">
                      Essayage personnalisé, conseils d'experts, ajustements immédiats. 200+ opticiens partenaires.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 sm:gap-4 group">
                  <div className="w-4 h-4 laptop:w-5 laptop:h-5 bg-bronze rotate-45 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <p className="font-sans text-dark-text text-base laptop:text-lg font-semibold mb-1.5 sm:mb-2">
                      En ligne
                    </p>
                    <p className="font-sans text-dark-text/60 text-xs sm:text-sm laptop:text-base leading-[1.6] px-2 laptop:px-0">
                      Livraison rapide et sécurisée, paiement en plusieurs fois, satisfait ou remboursé 30 jours.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 sm:gap-4 group">
                  <div className="w-4 h-4 laptop:w-5 laptop:h-5 bg-bronze rotate-45 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <p className="font-sans text-dark-text text-base laptop:text-lg font-semibold mb-1.5 sm:mb-2">
                      Notre engagement
                    </p>
                    <p className="font-sans text-dark-text/60 text-xs sm:text-sm laptop:text-base leading-[1.6] px-2 laptop:px-0">
                      Garantie 2 ans. Service client réactif. Qualité Renaissance, où que vous soyez.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 laptop:gap-6 px-2">
                <Link to="/store-locator" className="w-full sm:w-auto">
                  <button className="w-full border-2 border-dark-text bg-dark-text text-white px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[10px] laptop:text-[11px] tracking-[0.25em] font-bold hover:bg-white hover:text-dark-text transition-all duration-500">
                    TROUVER UN OPTICIEN
                  </button>
                </Link>
                <Link to="/shop" className="w-full sm:w-auto">
                  <button className="w-full border-2 border-dark-text bg-white text-dark-text px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[10px] laptop:text-[11px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-white transition-all duration-500">
                    ACHETER EN LIGNE
                  </button>
                </Link>
              </div>

              <p className="font-sans text-dark-text/40 text-[10px] sm:text-xs laptop:text-sm text-center tracking-wider mt-6 sm:mt-8 laptop:mt-10 px-4">
                Livraison offerte en France • Retours gratuits sous 30 jours • Garantie 2 ans
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
