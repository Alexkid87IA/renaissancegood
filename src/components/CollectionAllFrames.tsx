import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CollectionAllFrames() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/shop');
    }, 800);
  };

  return (
    <section className="h-screen relative bg-beige">
      {/* DESKTOP VERSION */}
      <div className="h-full bg-beige hidden md:flex flex-row px-6 md:px-0">
        <div
          onClick={handleNavigate}
          className="w-full md:w-1/2 h-full md:ml-6 cursor-pointer group relative overflow-hidden"
        >
          <img
            src="https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=2687"
            alt="Toutes nos montures Renaissance"
            className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
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

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20 md:mr-6">
          <div className="max-w-2xl">
            <h3 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl laptop:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 tracking-[-0.03em] leading-[0.9]">
              TOUTES NOS<br />MONTURES
            </h3>
            <div className="inline-block mb-8 sm:mb-12">
              <p className="font-sans text-bronze text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">
                Boutique Complète
              </p>
              <div className="h-px bg-bronze/20 mt-3" />
            </div>
            <p className="font-sans text-dark-text/70 text-base sm:text-lg md:text-xl laptop:text-xl xl:text-2xl leading-[1.75] mb-8 sm:mb-12 laptop:mb-14 xl:mb-16 font-light">
              Découvrez l'ensemble de nos créations.<br />
              Chaque monture. Chaque symbole. Chaque histoire.<br />
              Trouvez celle qui vous ressemble.
            </p>
            <Link to="/shop">
              <button className="border-2 border-dark-text/80 px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-beige hover:border-dark-text transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                EXPLORER LA BOUTIQUE
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE VERSION - Completely New Design */}
      <div className="h-screen bg-beige md:hidden relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=2687"
            alt="Toutes nos montures Renaissance"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-beige/80 via-beige/90 to-beige"></div>
        </div>

        {/* Content */}
        <div className="relative min-h-screen flex flex-col justify-between px-6 pt-24 pb-16">

          {/* Top - Badge */}
          <div className="flex-shrink-0">
            <div className="inline-block bg-gradient-to-r from-bronze/10 to-transparent pr-8 py-3 -ml-1 pl-1">
              <p className="font-sans text-bronze text-[10px] tracking-[0.35em] font-bold uppercase mb-2.5">
                BOUTIQUE COMPLÈTE
              </p>
              <div className="h-0.5 bg-gradient-to-r from-bronze via-bronze/60 to-transparent w-32" />
            </div>
          </div>

          {/* Center - Title and Description */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-display text-5xl font-bold mb-6 tracking-[-0.03em] leading-[0.95] text-dark-text">
              TOUTES NOS<br/>MONTURES
            </h3>
            <p className="font-sans text-dark-text/70 text-base leading-[1.75] font-light max-w-md">
              Découvrez l'ensemble de nos créations.<br />
              Chaque monture. Chaque symbole. Chaque histoire.<br />
              Trouvez celle qui vous ressemble.
            </p>
          </div>

          {/* Bottom - CTA and Image */}
          <div className="flex-shrink-0 space-y-6">
            {/* Product Image - Clickable */}
            <div
              onClick={handleNavigate}
              className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm border border-dark-text/10 cursor-pointer group active:scale-[0.98] transition-transform duration-200"
            >
              <img
                src="https://renaissanceeyewear.fr/cdn/shop/files/XXXVIII_38_C3-3.jpg?v=1741187119&width=2687"
                alt="Toutes nos montures"
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Loading Overlay */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-beige/95 backdrop-blur-md flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 border-2 border-bronze/20 rounded-full" />
                      <div className="absolute inset-0 w-12 h-12 border-2 border-bronze border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-dark-text text-xs tracking-[0.3em] font-light uppercase">Chargement</p>
                  </div>
                </motion.div>
              )}

              {/* Hover Indicator */}
              <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/5 transition-all duration-500 pointer-events-none" />
            </div>

            {/* CTA Button */}
            <button
              onClick={handleNavigate}
              disabled={isLoading}
              className="w-full border-2 border-dark-text px-8 py-5 font-sans text-[10px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-beige transition-all duration-300 active:scale-[0.98] backdrop-blur-sm bg-beige/80 shadow-lg mb-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                  </div>
                  CHARGEMENT
                </span>
              ) : (
                'EXPLORER LA BOUTIQUE'
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
