import { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface MobileImageGalleryProps {
  images: string[];
  productName: string;
}

export default function MobileImageGallery({ images, productName }: MobileImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;

    if (info.offset.x > swipeThreshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -swipeThreshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative bg-[#f5f0eb]">
      {/* Main image — tall aspect */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="h-full w-full"
          >
            <img
              src={images[currentIndex]}
              alt={`${productName} - vue ${currentIndex + 1}`}
              className="w-full h-full object-cover select-none"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-[2px] rounded-full transition-all duration-400 ${
                index === currentIndex
                  ? 'bg-dark-text w-6'
                  : 'bg-dark-text/25 w-2'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>

        {/* Image counter */}
        <div className="absolute top-4 right-4 z-10">
          <span className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="px-4 py-3 overflow-x-auto scrollbar-hide bg-white">
        <div className="flex gap-2 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-14 h-14 transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-1 ring-dark-text ring-offset-1'
                  : 'opacity-50'
              }`}
            >
              <img
                src={image}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
