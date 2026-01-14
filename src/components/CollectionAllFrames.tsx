import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CollectionAllFrames() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.3]);

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/shop');
    }, 300);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen lg:h-screen relative sticky top-0 z-50"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-white hidden md:flex flex-row">
        <div className="w-full md:w-1/2 h-full">
          <img
            src="https://26.staticbtf.eno.do/v1/104-default/18b06e42d2310c24605161b4c62ef0e3/media.jpg"
            alt="Nos créations - Collection complète"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20">
          <div className="max-w-2xl">
            <div className="mb-6 sm:mb-8">
              <h3 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl laptop:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9] mb-4 sm:mb-6">
                NOS<br />CRÉATIONS
              </h3>
              <span className="inline-block bg-bronze/10 border border-bronze/20 text-bronze text-[8px] sm:text-[9px] px-4 sm:px-5 py-2 sm:py-2.5 tracking-[0.25em] font-bold uppercase">
                Heritage • Versailles • Isis
              </span>
            </div>
            <div className="inline-block mb-8 sm:mb-12">
              <p className="font-sans text-dark-text text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">
                L'excellence Parisienne
              </p>
              <div className="h-px bg-dark-text/20 mt-3" />
            </div>
            <p className="font-sans text-dark-text/70 text-base sm:text-lg md:text-xl laptop:text-xl xl:text-2xl leading-[1.75] mb-8 sm:mb-12 laptop:mb-14 xl:mb-16 font-light">
              Explorez l'intégralité de nos créations. Chaque monture raconte une histoire.<br />
              Des symboles anciens aux lignes modernes. Le savoir-faire parisien dans toute sa splendeur.
            </p>
            <button
              onClick={handleNavigate}
              disabled={isLoading}
              className="group relative border-2 border-dark-text px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold text-dark-text hover:bg-dark-text hover:text-white transition-all duration-500 disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10">
                {isLoading ? 'CHARGEMENT...' : 'VOIR LA BOUTIQUE'}
              </span>
              <motion.div
                className="absolute inset-0 bg-dark-text"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE VERSION - Compact Design */}
      <div className="min-h-[82vh] bg-white md:hidden relative overflow-hidden">
        {/* Content */}
        <div className="relative h-full flex flex-col px-5 pt-16 pb-6">

          {/* Top - Badge (Compact) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-shrink-0 mb-2"
          >
            <span className="inline-block bg-bronze/10 border border-bronze/20 text-bronze text-[8px] px-3 py-1.5 tracking-[0.25em] font-bold uppercase">
              Heritage • Versailles • Isis
            </span>
          </motion.div>

          {/* Title (Compact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex-shrink-0 mb-3"
          >
            <h3 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-dark-text">
              NOS<br/>CRÉATIONS
            </h3>
          </motion.div>

          {/* Product Image - Main Focus (50% space) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex-shrink-0 mb-2"
          >
            <div
              onClick={handleNavigate}
              className="relative w-full h-[42vh] rounded-md overflow-hidden bg-gradient-to-br from-beige/30 to-bronze/10 border border-dark-text/10 cursor-pointer group active:scale-[0.98] transition-transform duration-200"
            >
              <img
                src="https://26.staticbtf.eno.do/v1/104-default/18b06e42d2310c24605161b4c62ef0e3/media.jpg"
                alt="Collection Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 to-transparent"></div>
              {isLoading && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin" />
                    <p className="text-dark-text text-[10px] tracking-[0.3em] font-light uppercase">Chargement</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Description (Compact, 2 lines max) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex-shrink-0 mb-3"
          >
            <p className="font-sans text-dark-text/70 text-xs leading-[1.5] font-light line-clamp-2">
              Explorez l'intégralité de nos créations. Chaque monture raconte une histoire. Des symboles anciens aux lignes modernes.
            </p>
          </motion.div>

          {/* CTA Button (Always visible) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex-shrink-0"
          >
            <button
              onClick={handleNavigate}
              disabled={isLoading}
              className="w-full border-2 border-dark-text px-6 py-3 font-sans text-[9px] tracking-[0.25em] font-bold text-dark-text hover:bg-dark-text hover:text-white transition-all duration-300 active:scale-[0.98] bg-white shadow-md disabled:opacity-50"
            >
              {isLoading ? 'CHARGEMENT...' : 'VOIR LA BOUTIQUE'}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
