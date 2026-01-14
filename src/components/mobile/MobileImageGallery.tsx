import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileImageGalleryProps {
  images: string[];
  productName: string;
}

export default function MobileImageGallery({ images, productName }: MobileImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [lastTap, setLastTap] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;

    if (info.offset.x > swipeThreshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -swipeThreshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTap;

    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      if (isZoomed) {
        setScale(1);
        setIsZoomed(false);
      } else {
        setScale(2);
        setIsZoomed(true);
      }

      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }

    setLastTap(now);
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            drag={!isZoomed ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="h-full w-full"
          >
            <motion.img
              src={images[currentIndex]}
              alt={`${productName} - vue ${currentIndex + 1}`}
              className="w-full h-full object-cover select-none"
              animate={{ scale }}
              transition={{ duration: 0.3 }}
              onClick={handleDoubleTap}
              style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
            />
          </motion.div>
        </AnimatePresence>

        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-10"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-5 h-5 text-dark-text" />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-10"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-5 h-5 text-dark-text" />
          </button>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-dark-text scale-105'
                  : 'border-dark-text/20'
              }`}
            >
              <img
                src={image}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
