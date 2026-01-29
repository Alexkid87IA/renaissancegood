import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CollectionAllFrames() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, isMobile ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, isMobile ? 1 : 0]);

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
        <div className="w-full md:w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/96a1a738-99de-4d9e-854e-cd8bf2a06b5f.png"
            alt="Nos créations"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20">
          <div className="max-w-2xl">
            <div className="mb-6 sm:mb-8">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[0.9]">
                TOUTES NOS<br />
                <span className="font-light italic">Créations.</span>
              </h3>
            </div>
            <div className="w-12 h-px bg-dark-text/15 mb-8" />
            <p className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14">
              Collections, hors-série et pièces uniques.<br />
              Un seul geste : celui qui refuse l'oubli.
            </p>
            <button
              onClick={handleNavigate}
              disabled={isLoading}
              className="group relative border border-dark-text/60 px-8 sm:px-10 laptop:px-11 py-3 sm:py-3.5 laptop:py-4 font-sans text-[8px] sm:text-[9px] tracking-[0.3em] font-medium text-dark-text hover:bg-dark-text hover:text-white transition-all duration-500 disabled:opacity-50 overflow-hidden"
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

      {/* MOBILE */}
      <div className="md:hidden relative h-screen bg-[#000000] overflow-hidden" onClick={handleNavigate}>
        {/* Image — remontée */}
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/96a1a738-99de-4d9e-854e-cd8bf2a06b5f.png"
            alt="Nos créations"
            className="w-full h-full object-cover object-[center_35%]"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-b from-transparent to-[#000000]" />
        </div>

        {/* Content — bas */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p className="font-sans text-white/50 text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
            Boutique
          </p>
          <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[0.9] text-white mb-1">
            TOUTES NOS
          </h3>
          <p className="font-display text-lg font-light italic text-white/50 tracking-[-0.02em] mb-5">
            Créations.
          </p>
          <button
            disabled={isLoading}
            className="group relative overflow-hidden w-full border border-white/20 px-6 py-4 transition-all duration-500 hover:border-bronze/60 active:scale-[0.98] disabled:opacity-50"
          >
            <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#000000] transition-colors duration-500">
              {isLoading ? 'CHARGEMENT...' : 'VOIR LA BOUTIQUE'}
            </span>
            {!isLoading && (
              <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            )}
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-[#000000]/90 flex items-center justify-center z-10">
            <div className="w-8 h-8 border border-bronze/30 border-t-bronze rounded-full animate-spin" />
          </div>
        )}
      </div>
    </motion.section>
  );
}
