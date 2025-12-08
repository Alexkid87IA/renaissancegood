import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function CollectionVersailles() {
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
      navigate('/collections/versailles');
    }, 800);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen lg:h-screen relative sticky top-0 z-30"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-beige hidden md:flex flex-row">
        <div
          onClick={handleNavigate}
          className="w-full md:w-1/2 h-full cursor-pointer group relative overflow-hidden"
        >
          <img
            src="https://26.staticbtf.eno.do/v1/103-default/6438d7ab4a0133318c4426ad47aee221/media.jpg"
            alt="Collection Versailles - Fleur de Lys"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/5 transition-all duration-700 pointer-events-none" />

          {/* Loading overlay */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-beige/95 backdrop-blur-md flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-bronze/20 rounded-full" />
                  <div className="absolute inset-0 w-16 h-16 border-2 border-bronze border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-dark-text text-sm tracking-[0.3em] font-light uppercase">Chargement</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20">
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
              Les rois sont partis. Le symbole est resté.<br />
              La Fleur de Lys. Pour ceux qui construisent. Pas pour ceux qui paradent.
            </p>
            <Link to="/collections/versailles">
              <button className="border-2 border-dark-text/80 px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-beige hover:border-dark-text transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                DÉCOUVRIR
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE VERSION - Compact Design */}
      <div className="min-h-[82vh] bg-beige md:hidden relative overflow-hidden">
        {/* Content */}
        <div className="relative h-full flex flex-col px-5 pt-16 pb-6">

          {/* Top - Badge (Compact) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-shrink-0 mb-2"
          >
            <div className="inline-block">
              <p className="font-sans text-bronze text-[8px] tracking-[0.3em] font-bold uppercase">
                SYMBOLE : FLEUR DE LYS
              </p>
              <div className="h-px bg-bronze/30 mt-1 w-24" />
            </div>
          </motion.div>

          {/* Title (Compact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex-shrink-0 mb-3"
          >
            <h3 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-dark-text">
              COLLECTION<br/>VERSAILLES
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
              className="relative w-full h-[42vh] rounded-md overflow-hidden bg-white/30 border border-dark-text/10 cursor-pointer group active:scale-[0.98] transition-transform duration-200"
            >
              <img
                src="https://26.staticbtf.eno.do/v1/103-default/6438d7ab4a0133318c4426ad47aee221/media.jpg"
                alt="Collection Versailles"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Loading Overlay */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-beige/95 backdrop-blur-md flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 border-2 border-bronze/20 rounded-full" />
                      <div className="absolute inset-0 w-10 h-10 border-2 border-bronze border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-dark-text text-[10px] tracking-[0.3em] font-light uppercase">Chargement</p>
                  </div>
                </motion.div>
              )}

              {/* Hover Indicator */}
              <div className="absolute inset-0 bg-dark-text/0 group-active:bg-dark-text/5 transition-all duration-300 pointer-events-none" />
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
              Les rois sont partis. Le symbole est resté. La Fleur de Lys. Pour ceux qui construisent. Pas pour ceux qui paradent.
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
              className="w-full border-2 border-dark-text px-6 py-3 font-sans text-[9px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-beige transition-all duration-300 active:scale-[0.98] bg-beige shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 border border-current border-t-transparent rounded-full animate-spin" />
                  </div>
                  CHARGEMENT
                </span>
              ) : (
                'DÉCOUVRIR LA COLLECTION'
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
