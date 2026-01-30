import { useState, useRef, useCallback } from 'react';
import { PanInfo } from 'framer-motion';

function resizeShopifyImage(url: string, width: number): string {
  if (!url || !url.includes('cdn.shopify.com')) return url;
  return url.replace(/(\.\w+)(\?|$)/, `_${width}x$1$2`);
}

interface MobileImageGalleryProps {
  images: string[];
  productName: string;
}

export default function MobileImageGallery({ images, productName }: MobileImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold && currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (diff < -threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex, images.length]);

  return (
    <div className="relative bg-[#f5f0eb]">
      {/* Main image — all images rendered, only one visible */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={resizeShopifyImage(image, 800)}
            alt={`${productName} - vue ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-300 ease-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}

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
                src={resizeShopifyImage(image, 100)}
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
