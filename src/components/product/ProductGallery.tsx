import { motion } from 'framer-motion';

function resizeShopifyImage(url: string, width: number): string {
  if (!url || !url.includes('cdn.shopify.com')) return url;
  return url.replace(/(\.\w+)(\?|$)/, `_${width}x$1$2`);
}

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
              src={resizeShopifyImage(image.url, 1200)}
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
