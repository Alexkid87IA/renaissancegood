import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function CollectionHeritage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="h-screen sticky top-0 z-30"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-beige hidden md:flex flex-row px-6 md:px-0">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20 md:ml-6">
          <div className="max-w-2xl">
            <h3 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl laptop:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 tracking-[-0.03em] leading-[0.9]">
              COLLECTION HÉRITAGE
            </h3>
            <div className="inline-block mb-8 sm:mb-12">
              <p className="font-sans text-bronze text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">
                Symbole : Trident
              </p>
              <div className="h-px bg-bronze/20 mt-3" />
            </div>
            <p className="font-sans text-dark-text/70 text-base sm:text-lg md:text-xl laptop:text-xl xl:text-2xl leading-[1.75] mb-8 sm:mb-12 laptop:mb-14 xl:mb-16 font-light">
              Une collection intemporelle qui incarne la puissance et l'élégance française.
              Le trident symbolise la maîtrise parfaite entre tradition et modernité.
            </p>
            <Link to="/collections/heritage">
              <button className="border-2 border-dark-text/80 px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-beige hover:border-dark-text transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                DÉCOUVRIR
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full md:mr-6">
          <img
            src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=5760"
            alt="Collection Héritage - Trident"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* MOBILE VERSION - STUNNING IMMERSIVE DESIGN */}
      <div ref={contentRef} className="h-full bg-beige md:hidden relative overflow-hidden">
        {/* Animated Background with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
        >
          <div className="absolute inset-0">
            <img
              src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=5760"
              alt="Collection Héritage - Trident"
              className="w-full h-full object-cover opacity-15 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-beige via-beige/95 to-beige"></div>
          </div>
        </motion.div>

        {/* Floating Elements - Decorative */}
        <motion.div
          animate={isInView ? {
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3]
          } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-8 w-32 h-32 bg-bronze/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={isInView ? {
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2]
          } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-48 left-8 w-40 h-40 bg-amber-200/5 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-6 pt-24 pb-8">

          {/* Top - Symbol Badge with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-bronze/10 to-amber-200/10 backdrop-blur-xl border border-bronze/20 rounded-full px-4 py-2.5 shadow-lg">
              <Zap className="w-3.5 h-3.5 text-bronze" strokeWidth={2.5} />
              <span className="text-bronze text-[9px] tracking-[0.3em] uppercase font-bold">
                Symbole : Trident
              </span>
            </div>
          </motion.div>

          {/* Center - Title and Description */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-display text-[3.5rem] leading-[0.9] font-bold tracking-[-0.03em] text-dark-text mb-4">
                COLLECTION<br/>
                <span className="bg-gradient-to-r from-dark-text to-dark-text/60 bg-clip-text text-transparent">
                  HÉRITAGE
                </span>
              </h3>

              <motion.div
                className="w-24 h-[3px] bg-gradient-to-r from-bronze via-amber-200 to-transparent rounded-full mb-6"
                initial={{ width: 0 }}
                animate={isInView ? { width: 96 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-dark-text/75 text-base leading-[1.75] font-light max-w-md"
            >
              Une collection <span className="text-dark-text font-medium">intemporelle</span> qui incarne
              la puissance et l'élégance française. Le trident symbolise la maîtrise
              parfaite entre tradition et modernité.
            </motion.p>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              <div className="bg-dark-text/5 border border-dark-text/10 rounded-full px-3.5 py-1.5">
                <p className="text-dark-text/70 text-[10px] font-sans font-medium">
                  Acétate premium
                </p>
              </div>
              <div className="bg-dark-text/5 border border-dark-text/10 rounded-full px-3.5 py-1.5">
                <p className="text-dark-text/70 text-[10px] font-sans font-medium">
                  Made in Korea
                </p>
              </div>
              <div className="bg-dark-text/5 border border-dark-text/10 rounded-full px-3.5 py-1.5">
                <p className="text-dark-text/70 text-[10px] font-sans font-medium">
                  Garantie 2 ans
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom - Product Card and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex-shrink-0 space-y-5"
          >
            {/* Product Showcase Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-white shadow-2xl shadow-dark-text/10 border border-dark-text/5">
                <img
                  src="https://renaissanceeyewear.fr/cdn/shop/files/XXXXIV_44_C3-2.jpg?v=1741099694&width=5760"
                  alt="Collection Héritage"
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Shine Effect on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%', y: '-100%' }}
                  whileHover={{ x: '100%', y: '100%' }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              {/* Floating Price Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                className="absolute -top-3 -right-3 bg-dark-text text-white rounded-full px-4 py-2 shadow-xl"
              >
                <p className="text-xs font-bold">À partir de 369€</p>
              </motion.div>
            </motion.div>

            {/* CTA Button with Icon */}
            <Link to="/collections/heritage" className="block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-dark-text text-white px-8 py-5 font-sans text-[10px] tracking-[0.25em] uppercase font-bold
                           rounded-xl shadow-2xl shadow-dark-text/30 hover:shadow-dark-text/50 transition-all duration-300
                           flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10">Découvrir la collection</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />

                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-dark-text via-bronze to-dark-text"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
