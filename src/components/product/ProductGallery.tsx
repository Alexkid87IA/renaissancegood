import { motion } from 'framer-motion';

interface ProductImage {
  url: string;
  alt: string;
  backgroundColor?: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  return (
    <div className="space-y-0">
      {images.map((image, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={`relative min-h-screen ${image.backgroundColor || 'bg-white'} flex items-center justify-center`}
        >
          <div className="w-full h-screen flex items-center justify-center p-8 lg:p-16">
            <img
              src={image.url}
              alt={image.alt}
              className="max-w-full max-h-[85vh] object-contain"
              loading="lazy"
            />
          </div>
        </motion.section>
      ))}
    </div>
  );
}
