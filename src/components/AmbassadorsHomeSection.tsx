import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Instagram } from 'lucide-react';

const ambassadorImages = [
  {
    url: 'https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=1200',
    layout: 'col-span-2 row-span-2'
  },
  {
    url: 'https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=800',
    layout: 'col-span-1 row-span-1'
  },
  {
    url: 'https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=800',
    layout: 'col-span-1 row-span-1'
  },
  {
    url: 'https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=800',
    layout: 'col-span-1 row-span-1'
  },
  {
    url: 'https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=800',
    layout: 'col-span-1 row-span-1'
  },
  {
    url: 'https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=800',
    layout: 'col-span-2 row-span-1'
  }
];

export default function AmbassadorsHomeSection() {
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
      className="min-h-screen laptop:h-screen sticky top-0 z-[60]"
    >
      <div className="relative h-full overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bronze/5 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bronze/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bronze/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative h-full grid lg:grid-cols-2 gap-0">

          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-20 lg:py-12 md:ml-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-8">
                <p className="font-sans text-bronze text-[10px] tracking-[0.3em] uppercase font-bold">
                  Ambassadeurs
                </p>
                <div className="h-px bg-bronze/30 mt-3 w-16" />
              </div>

              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl laptop:text-8xl xl:text-9xl font-bold text-white tracking-[-0.03em] leading-[0.85] mb-10 lg:mb-12">
                ILS PORTENT<br />
                RENAISSANCE.
              </h2>

              <p className="font-sans text-white/60 text-lg md:text-xl lg:text-2xl leading-[1.7] mb-12 lg:mb-16 max-w-xl font-light">
                Artistes, créateurs, visionnaires. Découvrez ceux qui incarnent
                l'excellence française et partagent nos valeurs d'élégance intemporelle.
              </p>

              <div className="space-y-8 mb-12 lg:mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-1 h-1 bg-bronze rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-white text-base font-medium mb-1">
                      Authenticité & Excellence
                    </p>
                    <p className="font-sans text-white/50 text-sm leading-relaxed">
                      Des personnalités qui partagent notre vision du luxe authentique
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-1 h-1 bg-bronze rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-white text-base font-medium mb-1">
                      Univers & Créativité
                    </p>
                    <p className="font-sans text-white/50 text-sm leading-relaxed">
                      Plongez dans l'univers Renaissance à travers leurs regards
                    </p>
                  </div>
                </motion.div>
              </div>

              <a
                href="https://www.instagram.com/renaissanceeyewear"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
              >
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative flex items-center gap-4 border border-bronze/30 bg-bronze/5 backdrop-blur-sm text-white px-10 py-5 font-sans text-[10px] tracking-[0.25em] font-bold overflow-hidden hover:border-bronze/60 transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-bronze/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <Instagram className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  <span className="relative z-10">SUIVRE L'UNIVERS RENAISSANCE</span>
                </motion.button>
              </a>

              <p className="font-sans text-white/30 text-xs tracking-wider mt-4">
                @renaissanceeyewear
              </p>
            </motion.div>
          </div>

          <div className="relative h-full min-h-[400px] lg:min-h-0 px-6 pb-20 lg:pb-0 lg:px-0 md:mr-6">
            <div className="h-full grid grid-cols-4 grid-rows-3 gap-2 md:gap-3">
              {ambassadorImages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${item.layout} group cursor-pointer relative overflow-hidden`}
                >
                  <div className="absolute inset-0">
                    <img
                      src={item.url}
                      alt={`Renaissance Ambassador ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-bronze/20 mix-blend-overlay opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
                  </div>

                  <div className="absolute inset-0 border border-white/5 group-hover:border-bronze/30 transition-colors duration-500" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
