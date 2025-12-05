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
      className="h-screen sticky top-0 z-[70]"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-white hidden md:flex flex-row px-6 md:px-0">
        <div className="w-full md:w-1/2 h-full md:ml-6">
          <img
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=80"
            alt="Nos créations - Collection complète"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20 md:mr-6">
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

      {/* MOBILE VERSION */}
      <div className="h-screen bg-white md:hidden relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=80"
            alt="Nos créations - Collection complète"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/95 to-white"></div>
        </div>

        {/* Content */}
        <div className="relative min-h-screen flex flex-col justify-between px-6 pt-24 pb-16">

          {/* Top - Badge and Category */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0 space-y-4"
          >
            <span className="inline-block bg-bronze/10 border-2 border-bronze/20 text-bronze text-[9px] px-5 py-2.5 tracking-[0.3em] font-bold uppercase shadow-sm">
              Heritage • Versailles • Isis
            </span>
            <div className="inline-block bg-gradient-to-r from-dark-text/5 to-transparent pr-8 py-3 -ml-1 pl-1">
              <p className="font-sans text-dark-text text-[10px] tracking-[0.35em] font-bold uppercase mb-2.5">
                L'EXCELLENCE PARISIENNE
              </p>
              <div className="h-0.5 bg-gradient-to-r from-dark-text via-dark-text/60 to-transparent w-32" />
            </div>
          </motion.div>

          {/* Center - Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h3 className="font-display text-5xl font-bold mb-6 tracking-[-0.03em] leading-[0.95] text-dark-text">
              NOS<br/>CRÉATIONS
            </h3>
            <p className="font-sans text-dark-text/70 text-base leading-[1.75] font-light max-w-md">
              Explorez l'intégralité de nos créations. Chaque monture raconte une histoire.<br />
              Des symboles anciens aux lignes modernes. Le savoir-faire parisien dans toute sa splendeur.
            </p>
          </motion.div>

          {/* Bottom - Visual Element and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex-shrink-0 space-y-6"
          >
            {/* Decorative Image Preview */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-beige/50 to-bronze/10 border border-dark-text/10">
              <img
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=80"
                alt="Collection Preview"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 to-transparent"></div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleNavigate}
              disabled={isLoading}
              className="w-full border-2 border-dark-text px-8 py-5 font-sans text-[10px] tracking-[0.25em] font-bold text-dark-text active:bg-dark-text active:text-white transition-all duration-300 disabled:opacity-50 mb-2"
            >
              {isLoading ? 'CHARGEMENT...' : 'VOIR LA BOUTIQUE'}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
