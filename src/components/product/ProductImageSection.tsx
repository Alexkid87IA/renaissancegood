import { motion } from 'framer-motion';

function resizeShopifyImage(url: string, width: number): string {
  if (!url || !url.includes('cdn.shopify.com')) return url;
  return url.replace(/(\.\w+)(\?|$)/, `_${width}x$1$2`);
}

interface ProductImageSectionProps {
  imageUrl: string;
  alt: string;
  backgroundColor?: string;
  zIndex?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export default function ProductImageSection({
  imageUrl,
  alt,
  backgroundColor = 'bg-white',
  zIndex = 10,
  onSwipeLeft,
  onSwipeRight
}: ProductImageSectionProps) {
  return (
    <motion.section
      style={{ zIndex }}
      className={`h-screen ${backgroundColor} ml-0 lg:ml-[400px] xl:ml-[480px]`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100 && onSwipeRight) {
          onSwipeRight();
        } else if (info.offset.x < -100 && onSwipeLeft) {
          onSwipeLeft();
        }
      }}
    >
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={resizeShopifyImage(imageUrl, 1200)}
          alt={alt}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
    </motion.section>
  );
}
