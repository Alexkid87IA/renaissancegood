import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageNavigationProps {
  images: string[];
  productName: string;
}

export default function ProductImageNavigation({ images, productName }: ProductImageNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Détecter quelle image est visible avec l'Intersection Observer
  useEffect(() => {
    const imageElements = document.querySelectorAll('[data-image-section]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-image-index') || '0');
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-15% 0px -15% 0px'
      }
    );

    imageElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      imageElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [images]);

  // Fonction pour scroller vers une image spécifique
  const scrollToImage = (index: number) => {
    const imageElement = document.querySelector(`[data-image-index="${index}"]`);
    if (imageElement) {
      imageElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      setActiveIndex(index);
    }
  };

  // Navigation précédent/suivant
  const goToPrevious = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
    scrollToImage(newIndex);
  };

  const goToNext = () => {
    const newIndex = activeIndex < images.length - 1 ? activeIndex + 1 : 0;
    scrollToImage(newIndex);
  };

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Boutons de navigation overlay sur les côtés (desktop et mobile) */}
      <motion.button
        onClick={goToPrevious}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white backdrop-blur-md rounded-full shadow-xl flex items-center justify-center border border-dark-text/10 transition-all"
        title="Image précédente (←)"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-dark-text" />
      </motion.button>

      <motion.button
        onClick={goToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white backdrop-blur-md rounded-full shadow-xl flex items-center justify-center border border-dark-text/10 transition-all"
        title="Image suivante (→)"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-dark-text" />
      </motion.button>

      {/* Navigation principale avec thumbnails - Au-dessus de la barre de prix */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-20 sm:bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1rem)] sm:max-w-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Container principal */}
          <div className="bg-beige/95 backdrop-blur-md border border-bronze/20 rounded-full shadow-2xl">
            <div className="flex items-center gap-1 px-2 md:px-3 py-2">
              {/* Bouton Précédent - masqué sur mobile car il y a les boutons overlay */}
              <motion.button
                onClick={goToPrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex w-8 h-8 items-center justify-center rounded-full bg-white/40 hover:bg-white/60 transition-all duration-200 group"
                title="Image précédente (←)"
              >
                <ChevronLeft className="w-4 h-4 text-dark-text group-hover:text-bronze transition-colors" />
              </motion.button>

              {/* Séparateur */}
              <div className="hidden sm:block w-px h-6 bg-bronze/30 mx-1" />

              {/* Thumbnails */}
              <div className="flex items-center gap-1.5 md:gap-2 px-1 md:px-2">
                {images.map((imageUrl, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToImage(index)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                    title={`Photo ${index + 1}`}
                  >
                    {/* Thumbnail */}
                    <div
                      className={`relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                        activeIndex === index
                          ? 'ring-2 ring-bronze shadow-lg'
                          : 'ring-1 ring-dark-text/10 opacity-40 hover:opacity-70'
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`${productName} - vue ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay gradient pour image active */}
                      {activeIndex === index && (
                        <motion.div
                          layoutId="activeImageGlow"
                          className="absolute inset-0 bg-gradient-to-t from-bronze/20 to-transparent"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Séparateur */}
              <div className="hidden sm:block w-px h-6 bg-bronze/30 mx-1" />

              {/* Bouton Suivant - masqué sur mobile car il y a les boutons overlay */}
              <motion.button
                onClick={goToNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex w-8 h-8 items-center justify-center rounded-full bg-white/40 hover:bg-white/60 transition-all duration-200 group"
                title="Image suivante (→)"
              >
                <ChevronRight className="w-4 h-4 text-dark-text group-hover:text-bronze transition-colors" />
              </motion.button>

              {/* Séparateur */}
              <div className="hidden sm:block w-px h-6 bg-bronze/30 mx-1" />

              {/* Compteur */}
              <div className="px-2 md:px-3">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-sans text-[10px] md:text-xs tracking-[0.15em] text-dark-text font-semibold"
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                  <span className="text-dark-text/40 mx-0.5 md:mx-1">/</span>
                  {String(images.length).padStart(2, '0')}
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Indication touches clavier (visible au hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/60 uppercase bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-dark-text/10">
                Utilisez ← → pour naviguer
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Indicateur latéral minimaliste (optionnel) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
        <div className="flex flex-col gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToImage(index)}
              className="group relative"
              title={`Photo ${index + 1}`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-bronze scale-150'
                    : 'bg-dark-text/20 hover:bg-dark-text/40 scale-100 hover:scale-125'
                }`}
              />
              
              {/* Tooltip au hover */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-dark-text/90 text-white px-2 py-1 rounded text-[10px] font-sans tracking-wider whitespace-nowrap">
                  Photo {index + 1}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}