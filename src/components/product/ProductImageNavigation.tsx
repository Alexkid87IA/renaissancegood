import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProductImageNavigationProps {
  images: string[];
  productName: string;
}

export default function ProductImageNavigation({ images, productName }: ProductImageNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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

  // Détecter si on a scrollé au-delà de la dernière image
  useEffect(() => {
    const checkVisibility = () => {
      const imageElements = document.querySelectorAll('[data-image-section]');
      if (imageElements.length === 0) return;

      const lastImage = imageElements[imageElements.length - 1];
      const lastImageRect = lastImage.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Masquer la navigation si la dernière image est complètement au-dessus du viewport
      const shouldHide = lastImageRect.bottom < windowHeight * 0.3;
      setIsVisible(!shouldHide);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [images]);

  // Fonction pour scroller vers une image spécifique
  const scrollToImage = (index: number) => {
    const imageElements = document.querySelectorAll('[data-image-section]');
    if (imageElements.length === 0) return;

    // Calculer la position de scroll basée sur la hauteur de chaque section
    const viewportHeight = window.innerHeight;
    // Chaque image fait environ 100vh, donc on scroll à index * viewportHeight
    // On ajoute un petit offset pour centrer l'image
    const targetScroll = index * viewportHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    setActiveIndex(index);
  };

  // Navigation précédent/suivant pour les touches clavier
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

  // Calculer le centre de la zone de contenu (après la sidebar)
  // Sidebar: lg=340px, laptop=380px, xl=480px
  // Centre = sidebar + (viewport - sidebar) / 2 = (viewport + sidebar) / 2

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 z-50 left-0 right-0 lg:left-[340px] laptop:left-[380px] xl:left-[480px] flex justify-center pointer-events-none"
        >
          {/* Container minimaliste */}
          <div className="pointer-events-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/10 border border-dark-text/10 p-2">
            <div className="flex items-center gap-2">
              {images.map((imageUrl, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div
                    className={`relative w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 ${
                      activeIndex === index
                        ? 'ring-2 ring-dark-text ring-offset-2'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${productName} - vue ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}