import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ProductImageSectionProps {
  imageUrl: string;
  alt: string;
  backgroundColor?: string;
  zIndex?: number;
}

export default function ProductImageSection({
  imageUrl,
  alt,
  backgroundColor = 'bg-white',
  zIndex = 10
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
    >
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.section>
  );
}
