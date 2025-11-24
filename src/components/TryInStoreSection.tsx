import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const mainCities = [
  { name: 'Paris', left: '49%', top: '25%' },
  { name: 'Lyon', left: '55%', top: '48%' },
  { name: 'Marseille', left: '56%', top: '70%' },
  { name: 'Bordeaux', left: '35%', top: '48%' },
  { name: 'Lille', left: '48%', top: '15%' },
  { name: 'Toulouse', left: '42%', top: '63%' }
];

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
      className="min-h-screen laptop:h-screen sticky top-0 z-45 bg-white"
    >
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-beige/10 to-beige/20" />

        <div className="relative h-full grid grid-cols-1 lg:grid-cols-2">

          <div className="flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-20 lg:py-12">
            <div className="max-w-xl w-full">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-sans text-bronze text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
                  Réseau National
                </p>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-8">
                  ESSAYER<br />EN BOUTIQUE.
                </h2>
                <p className="font-sans text-dark-text/70 text-base md:text-lg leading-relaxed mb-8">
                  Renaissance s'essaie, se touche, se vit. Découvrez l'expérience dans l'un
                  de nos 200+ opticiens partenaires à travers la France.
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4 group">
                    <div className="w-2 h-2 bg-bronze rotate-45 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="font-sans text-dark-text text-sm font-semibold mb-1">
                        Essayage personnalisé
                      </p>
                      <p className="font-sans text-dark-text/60 text-sm leading-relaxed">
                        Nos opticiens partenaires vous conseillent sur la collection qui vous correspond
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-2 h-2 bg-bronze rotate-45 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="font-sans text-dark-text text-sm font-semibold mb-1">
                        Ajustement sur mesure
                      </p>
                      <p className="font-sans text-dark-text/60 text-sm leading-relaxed">
                        Un réglage professionnel pour un confort optimal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-2 h-2 bg-bronze rotate-45 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="font-sans text-dark-text text-sm font-semibold mb-1">
                        Service premium
                      </p>
                      <p className="font-sans text-dark-text/60 text-sm leading-relaxed">
                        Accompagnement complet et garantie 2 ans
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/store-locator" className="flex-1">
                    <button className="w-full border-2 border-dark-text bg-dark-text text-white px-8 py-5 font-sans text-[10px] tracking-[0.25em] font-bold hover:bg-white hover:text-dark-text transition-all duration-500">
                      TROUVER VOTRE OPTICIEN
                    </button>
                  </Link>
                </div>

                <p className="font-sans text-dark-text/40 text-xs text-center sm:text-left tracking-wider mt-6">
                  200+ opticiens partenaires en France métropolitaine
                </p>

              </motion.div>

            </div>
          </div>

          <div className="relative flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full max-w-md aspect-square"
            >
              <div className="absolute inset-0 bg-beige/20 rounded-full blur-3xl" />

              <div className="relative w-full h-full">
                <svg viewBox="0 0 500 600" className="w-full h-full">
                  <path
                    d="M250 50 L450 150 L450 450 L250 550 L50 450 L50 150 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-dark-text/20"
                  />
                  <path
                    d="M150 200 C150 200, 200 150, 250 150 C300 150, 350 200, 350 250 C350 300, 300 350, 250 350 C200 350, 150 300, 150 250 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-bronze/30"
                  />
                  <path
                    d="M200 250 C200 220, 220 200, 250 200 C280 200, 300 220, 300 250 C300 280, 280 350, 250 380 C220 350, 200 280, 200 250 Z"
                    fill="currentColor"
                    className="text-bronze/10"
                  />
                  <path
                    d="M220 250 C220 230, 233 215, 250 215 C267 215, 280 230, 280 250 C280 265, 250 300, 250 300 C250 300, 220 265, 220 250 Z"
                    fill="currentColor"
                    className="text-bronze"
                  />
                </svg>

                {mainCities.map((city, index) => (
                  <motion.div
                    key={city.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: city.left, top: city.top }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-bronze rounded-full animate-ping opacity-75" />
                      <div className="relative w-3 h-3 bg-bronze rounded-full group-hover:scale-150 transition-transform" />
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <p className="font-sans text-dark-text text-[10px] font-semibold">
                          {city.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center">
                <p className="font-sans text-dark-text/30 text-[9px] tracking-[0.3em] uppercase">
                  France Métropolitaine
                </p>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
