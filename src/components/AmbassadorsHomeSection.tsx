import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Instagram } from 'lucide-react';

const ambassadorImages = [
  'https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=800',
  'https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=800',
  'https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=800',
  'https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=800',
  'https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=800',
  'https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=800'
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
      className="min-h-screen laptop:h-screen sticky top-0 z-[60] bg-dark-text"
    >
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-text via-dark-text/95 to-dark-text/90" />

        <div className="relative h-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:mx-6">
          <div className="max-w-[1600px] w-full">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 md:mb-20 lg:mb-24"
            >
              <p className="font-sans text-bronze text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
                Nos Ambassadeurs
              </p>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-[-0.03em] leading-[0.9] mb-8">
                REJOIGNEZ<br />LA FAMILLE.
              </h2>
              <p className="font-sans text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                Suivez l'univers Renaissance et découvrez nos ambassadeurs qui incarnent l'excellence française.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-16 md:mb-20">
              {ambassadorImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image}
                      alt={`Ambassador ${index + 1}`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-bronze/20 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-text/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <a
                href="https://www.instagram.com/renaissanceeyewear"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <button className="flex items-center gap-4 border-2 border-white/40 bg-white/5 backdrop-blur-sm text-white px-10 md:px-12 py-5 md:py-6 font-sans text-[10px] tracking-[0.25em] font-bold hover:bg-white hover:text-dark-text hover:border-white transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                  SUIVEZ-NOUS SUR INSTAGRAM
                </button>
              </a>

              <p className="font-sans text-white/40 text-xs tracking-wider">
                @renaissanceeyewear
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
