import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { resizeShopifyImage } from '../../lib/imageUtils';

interface MobileImageGalleryProps {
  images: string[];
  productName: string;
  /** Titre Shopify brut (« Renaissance XXXIV Colori 1 ») : sert à la résolution
   *  CDN Bunny dans resizeShopifyImage, comme sur desktop (ProductPage.tsx).
   *  productName (traduit, sans « Colori ») ne matche pas titleToBunnyUrl. */
  shopifyTitle: string;
}

export default function MobileImageGallery({ images, productName, shopifyTitle }: MobileImageGalleryProps) {
  const { t } = useTranslation('product');
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
            src={resizeShopifyImage(image, 800, shopifyTitle, index)}
            alt={t('gallery.viewAlt', { name: productName, number: index + 1 })}
            className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-300 ease-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchpriority={index === 0 ? 'high' : 'auto'}
            decoding={index === 0 ? 'sync' : 'async'}
            sizes="100vw"
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
              aria-label={t('gallery.goToImage', { number: index + 1 })}
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
                src={resizeShopifyImage(image, 100, shopifyTitle, index)}
                alt={t('gallery.thumbAlt', { number: index + 1 })}
                className="w-full h-full object-contain bg-[#f5f4f0] p-1"
                loading="lazy"
                decoding="async"
                sizes="56px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
