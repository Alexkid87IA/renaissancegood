import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="h-screen sticky top-0 z-10"
    >
      <div className="relative h-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1764032916/Gemini_Generated_Image_8ftsgv8ftsgv8fts_rqnxed.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover hidden lg:block"
        />
        <img
          src="https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=1440"
          alt="Hero Background Mobile"
          className="absolute inset-0 w-full h-full object-cover lg:hidden"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent hidden lg:block"></div>

        <div className="absolute left-8 bottom-8 hidden lg:block max-w-xl">
          <p className="text-white text-xs tracking-[0.2em] uppercase font-sans mb-2">Nouvelle Collection</p>
          <h1 className="text-white text-5xl font-serif mb-4">L'excellence française</h1>
          <p className="text-white text-sm mb-6 leading-relaxed">
            Des montures d'exception, conçues et fabriquées en France avec un savoir-faire artisanal unique.
          </p>
          <button
            onClick={() => navigate('/collections')}
            className="border-2 border-white px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-white hover:text-dark-text transition-colors"
          >
            Découvrir les collections
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 lg:hidden">
          <div className="bg-white pt-6 pb-8 px-6">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/store-locator')}
                className="w-full border-2 border-dark-text px-6 py-4 font-sans text-xs tracking-[0.2em] uppercase text-dark-text font-bold hover:bg-dark-text hover:text-white transition-colors"
              >
                Un opticien proche de chez vous
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="w-full bg-dark-text px-6 py-4 font-sans text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-dark-text/90 transition-colors"
              >
                Acheter maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
