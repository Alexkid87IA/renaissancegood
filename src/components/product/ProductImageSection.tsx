import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity, zIndex }}
      className={`h-screen sticky top-0 ${backgroundColor} ml-0 lg:ml-[400px] xl:ml-[480px]`}
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
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
    </motion.section>
  );
}
