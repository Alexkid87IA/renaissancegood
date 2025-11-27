import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crown } from 'lucide-react';

export default function CollectionVersailles() {
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
      className="h-screen sticky top-0 z-40"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-beige hidden md:flex flex-row px-6 md:px-0">
        <div className="w-full md:w-1/2 h-full md:ml-6">
          <img
            src="https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=2687"
            alt="Collection Versailles - Fleur de Lys"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20 md:mr-6">
          <div className="max-w-2xl">
            <h3 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl laptop:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 tracking-[-0.03em] leading-[0.9]">
              COLLECTION<br />VERSAILLES
            </h3>
            <div className="inline-block mb-8 sm:mb-12">
              <p className="font-sans text-bronze text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">
                Symbole : Fleur de Lys
              </p>
              <div className="h-px bg-bronze/20 mt-3" />
            </div>
            <p className="font-sans text-dark-text/70 text-base sm:text-lg md:text-xl laptop:text-xl xl:text-2xl leading-[1.75] mb-8 sm:mb-12 laptop:mb-14 xl:mb-16 font-light">
              L'essence même de la royauté française. Chaque détail évoque la splendeur
              du Château de Versailles et l'héritage de nos rois.
            </p>
            <Link to="/collections/versailles">
              <button className="border-2 border-dark-text/80 px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-beige hover:border-dark-text transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                DÉCOUVRIR
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE VERSION - ROYAL LUXURY DESIGN */}
      <div ref={contentRef} className="h-full bg-beige md:hidden relative overflow-hidden">
        {/* Animated Background with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
        >
          <div className="absolute inset-0">
            <img
              src="https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=2687"
              alt="Collection Versailles - Fleur de Lys"
              className="w-full h-full object-cover opacity-15 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-beige via-beige/95 to-beige"></div>
          </div>
        </motion.div>

        {/* Royal Floating Orbs */}
        <motion.div
          animate={isInView ? {
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15]
          } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 left-12 w-36 h-36 bg-amber-300/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={isInView ? {
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1]
          } : {}}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-40 right-8 w-44 h-44 bg-yellow-200/10 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-6 pt-24 pb-8">

          {/* Top - Royal Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-100/30 to-yellow-100/20 backdrop-blur-xl border-2 border-amber-300/30 rounded-full px-4 py-2.5 shadow-xl">
              <Crown className="w-3.5 h-3.5 text-amber-600" strokeWidth={2.5} />
              <span className="text-amber-700 text-[9px] tracking-[0.3em] uppercase font-bold">
                Symbole : Fleur de Lys
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
                <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text text-transparent">
                  VERSAILLES
                </span>
              </h3>

              <motion.div
                className="w-24 h-[3px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full mb-6 shadow-lg shadow-amber-300/50"
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
              L'<span className="text-dark-text font-medium">essence royale</span> de la France.
              Chaque détail évoque la splendeur du Château de Versailles et l'héritage
              majestueux de nos rois.
            </motion.p>

            {/* Royal Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              <div className="bg-amber-50/80 border border-amber-200/50 rounded-full px-3.5 py-1.5 shadow-sm">
                <p className="text-amber-800 text-[10px] font-sans font-medium">
                  Édition limitée
                </p>
              </div>
              <div className="bg-amber-50/80 border border-amber-200/50 rounded-full px-3.5 py-1.5 shadow-sm">
                <p className="text-amber-800 text-[10px] font-sans font-medium">
                  Finitions dorées
                </p>
              </div>
              <div className="bg-amber-50/80 border border-amber-200/50 rounded-full px-3.5 py-1.5 shadow-sm">
                <p className="text-amber-800 text-[10px] font-sans font-medium">
                  Made in Korea
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
            {/* Product Showcase Card with Golden Glow */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-gradient-to-br from-white to-amber-50/30 shadow-2xl shadow-amber-900/10 border-2 border-amber-200/30">
                {/* Golden Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/10 via-transparent to-yellow-200/10 group-hover:opacity-75 transition-opacity duration-500" />

                <img
                  src="https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=2687"
                  alt="Collection Versailles"
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700 relative z-10"
                />

                {/* Animated Shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-100/30 to-transparent"
                  initial={{ x: '-100%', y: '-100%' }}
                  whileHover={{ x: '100%', y: '100%' }}
                  transition={{ duration: 1 }}
                />
              </div>

              {/* Floating Price Badge - Royal Style */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2, type: "spring", bounce: 0.5 }}
                className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-full px-4 py-2 shadow-2xl shadow-amber-900/40 border-2 border-amber-300"
              >
                <p className="text-xs font-bold">À partir de 399€</p>
              </motion.div>
            </motion.div>

            {/* Royal CTA Button */}
            <Link to="/collections/versailles" className="block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white px-8 py-5 font-sans text-[10px] tracking-[0.25em] uppercase font-bold
                           rounded-xl shadow-2xl shadow-amber-900/40 hover:shadow-amber-900/60 transition-all duration-300
                           flex items-center justify-center gap-3 group relative overflow-hidden border border-amber-400/30"
              >
                <span className="relative z-10">Découvrir la royauté</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />

                {/* Golden Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.7 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
