import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2 } from 'lucide-react';
import MobileImageGallery from './MobileImageGallery';
import MobileProductInfo from './MobileProductInfo';
import MobileAccordion from './MobileAccordion';
import MobileBottomBar from './MobileBottomBar';
import MobileFabricationSection from './MobileFabricationSection';
import MobileRelatedProducts from './MobileRelatedProducts';

interface Variant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
}

interface Product {
  id: string;
  name: string;
  collection: string;
  badge?: string;
  price: string;
  frame: string;
  lens: string;
  colors: { name: string }[];
  dimensions: {
    lens: string;
    bridge: string;
    temple: string;
  };
  description: string;
  descriptionHtml?: string;
  variants: Variant[];
  images?: string[];
}

interface ProductPageMobileProps {
  product: Product;
}

export default function ProductPageMobile({ product }: ProductPageMobileProps) {
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const handleShare = async () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Découvrez ${product.name} sur Renaissance`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    }
  };

  const accordionSections = [
    {
      title: 'DESCRIPTION',
      content: (
        <div
          className="font-sans text-sm text-dark-text/70 leading-relaxed description-content"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
        />
      ),
    },
    {
      title: 'CADRE & VERRES',
      content: (
        <div className="space-y-3">
          <div>
            <span className="font-sans text-xs tracking-wider font-bold text-dark-text uppercase block mb-1">
              CADRE
            </span>
            <span className="font-sans text-sm text-dark-text/70">{product.frame}</span>
          </div>
          <div>
            <span className="font-sans text-xs tracking-wider font-bold text-dark-text uppercase block mb-1">
              VERRES
            </span>
            <span className="font-sans text-sm text-dark-text/70">{product.lens}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'DIMENSIONS',
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-sans text-xs text-dark-text/60">Largeur des verres</span>
            <span className="font-sans text-sm text-dark-text font-medium">{product.dimensions.lens}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-sans text-xs text-dark-text/60">Largeur du pont</span>
            <span className="font-sans text-sm text-dark-text font-medium">{product.dimensions.bridge}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-sans text-xs text-dark-text/60">Longueur des branches</span>
            <span className="font-sans text-sm text-dark-text font-medium">{product.dimensions.temple}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-dark-text/10 h-[60px] flex items-center justify-between px-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Retour"
        >
          <ChevronLeft className="w-6 h-6 text-dark-text" />
        </button>

        <h1 className="font-display text-base font-light text-dark-text tracking-tight absolute left-1/2 -translate-x-1/2">
          {product.name}
        </h1>

        <button
          onClick={handleShare}
          className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Partager"
        >
          <Share2 className="w-5 h-5 text-dark-text" />
        </button>
      </motion.header>

      <div className="pt-[60px]">
        <MobileImageGallery
          images={product.images || []}
          productName={product.name}
        />

        <MobileProductInfo
          product={product}
          selectedColorIndex={selectedColorIndex}
          onColorChange={setSelectedColorIndex}
        />

        <MobileAccordion sections={accordionSections} defaultOpen={0} />

        <MobileFabricationSection frame={product.frame} lens={product.lens} />

        <MobileRelatedProducts currentProductId={product.id} limit={4} />
      </div>

      <MobileBottomBar
        selectedVariant={product.variants[selectedColorIndex]}
        productPrice={product.price}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .description-content p {
          margin-bottom: 0.75rem;
        }
        .description-content p:last-child {
          margin-bottom: 0;
        }
        .description-content strong,
        .description-content b {
          font-weight: 600;
          color: rgb(26, 26, 26);
        }
        .description-content ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin: 0.75rem 0;
        }
        .description-content li {
          margin-bottom: 0.5rem;
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}
