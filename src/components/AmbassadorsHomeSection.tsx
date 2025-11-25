import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Instagram } from 'lucide-react';

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
      className="min-h-screen lg:h-screen sticky top-0 z-[60] py-20 lg:py-0"
    >
      <div className="relative h-full overflow-hidden bg-black">
        <div className="relative h-full flex items-center max-w-[2000px] mx-auto px-6 laptop:px-10 lg:px-12">
          <div className="w-full">

            <div className="text-center mb-10 laptop:mb-12 lg:mb-16 mt-16 laptop:mt-12 lg:mt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-4xl md:text-5xl laptop:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-[0.85] mb-5 laptop:mb-6 lg:mb-8">
                  ILS PORTENT<br />
                  RENAISSANCE.
                </h2>

                <p className="font-sans text-white/50 text-sm laptop:text-base leading-[1.7] max-w-2xl mx-auto">
                  Artistes, créateurs, visionnaires. Découvrez ceux qui incarnent l'excellence française.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 laptop:grid-cols-3 lg:grid-cols-4 gap-3 laptop:gap-4 lg:gap-4 mb-10 laptop:mb-12 lg:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-[3/4] group relative overflow-hidden"
              >
                <img
                  src="https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=800"
                  alt="Renaissance Ambassador"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="aspect-[3/4] group relative overflow-hidden"
              >
                <img
                  src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=800"
                  alt="Renaissance Product"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="aspect-[3/4] group relative overflow-hidden"
              >
                <img
                  src="https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=800"
                  alt="Renaissance Product"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="aspect-[3/4] group relative overflow-hidden laptop:hidden lg:block"
              >
                <img
                  src="https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=800"
                  alt="Renaissance Ambassador"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
              </motion.div>
            </div>

            <div className="text-center">
              <a
                href="https://www.instagram.com/renaissanceeyewear"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative flex items-center gap-3 border border-white/10 text-white px-6 laptop:px-7 lg:px-8 py-3 laptop:py-3.5 lg:py-4 font-sans text-[9px] laptop:text-[10px] tracking-[0.3em] font-bold overflow-hidden hover:border-white/30 transition-all duration-300 mx-auto"
                >
                  <span className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  <Instagram className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">SUIVRE L'UNIVERS RENAISSANCE</span>
                </motion.button>
              </a>

              <p className="font-sans text-white/20 text-[10px] laptop:text-xs tracking-wider mt-3 laptop:mt-4">
                @renaissanceeyewear
              </p>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
