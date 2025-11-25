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
      className="min-h-[200vh] lg:h-screen sticky top-0 z-[60] pt-32 pb-24 lg:py-0"
    >
      <div className="relative h-full overflow-hidden bg-black">
        <div className="relative h-full flex max-w-[2000px] mx-auto px-6 lg:px-12">
          <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 h-full lg:items-center">

            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-sans text-[#8B7355] text-[9px] tracking-[0.35em] uppercase mb-4 lg:mb-6 font-bold">
                  AMBASSADEURS
                </p>

                <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.85] mb-6 lg:mb-8">
                  ILS PORTENT<br />
                  RENAISSANCE.
                </h2>

                <p className="font-sans text-white/50 text-sm md:text-lg leading-[1.7] mb-8 lg:mb-10 max-w-lg">
                  Artistes, créateurs, visionnaires. Découvrez ceux qui incarnent l'excellence française et partagent nos valeurs d'élégance intemporelle.
                </p>

                <div className="space-y-4 lg:space-y-5 mb-8 lg:mb-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1 h-1 bg-[#8B7355] rounded-full mt-2.5 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-white/90 text-sm font-medium mb-0.5">
                        Authenticité & Excellence
                      </p>
                      <p className="font-sans text-white/40 text-xs leading-relaxed">
                        Des personnalités qui partagent notre vision du luxe authentique
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1 h-1 bg-[#8B7355] rounded-full mt-2.5 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-white/90 text-sm font-medium mb-0.5">
                        Univers & Créativité
                      </p>
                      <p className="font-sans text-white/40 text-xs leading-relaxed">
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
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative flex items-center gap-3 border border-white/10 text-white px-6 lg:px-8 py-3 lg:py-4 font-sans text-[9px] tracking-[0.3em] font-bold overflow-hidden hover:border-white/30 transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    <Instagram className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">SUIVRE L'UNIVERS RENAISSANCE</span>
                  </motion.button>
                </a>

                <p className="font-sans text-white/20 text-[10px] tracking-wider mt-3">
                  @renaissanceeyewear
                </p>
              </motion.div>
            </div>

            <div className="relative w-full mt-16 lg:mt-0">
              <div className="grid grid-cols-2 gap-4 lg:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="aspect-[3/4] group relative overflow-hidden"
                >
                  <img
                    src="https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=800"
                    alt="Renaissance Ambassador"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="aspect-[3/4] group relative overflow-hidden"
                >
                  <img
                    src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=800"
                    alt="Renaissance Product"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="aspect-[3/4] group relative overflow-hidden"
                >
                  <img
                    src="https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=800"
                    alt="Renaissance Product"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="aspect-[3/4] group relative overflow-hidden"
                >
                  <img
                    src="https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=800"
                    alt="Renaissance Ambassador"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
              </div>

              <div className="hidden lg:block relative h-[80vh]">
                <div className="h-full grid grid-cols-3 grid-rows-2 gap-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="col-span-2 row-span-1 group relative overflow-hidden"
                  >
                    <img
                      src="https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=1200"
                      alt="Renaissance Ambassador"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="col-span-1 row-span-1 group relative overflow-hidden"
                  >
                    <img
                      src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=800"
                      alt="Renaissance Product"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="col-span-1 row-span-1 group relative overflow-hidden"
                  >
                    <img
                      src="https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=800"
                      alt="Renaissance Product"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="col-span-2 row-span-1 group relative overflow-hidden"
                  >
                    <img
                      src="https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=1200"
                      alt="Renaissance Ambassador"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
