import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

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
      className="h-screen sticky top-0 z-[70]"
    >
      {/* DESKTOP VERSION - Unchanged */}
      <div className="relative h-full overflow-hidden hidden lg:block">
        <img
          src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1764032916/Gemini_Generated_Image_8ftsgv8ftsgv8fts_rqnxed.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        <div className="absolute left-8 bottom-8 max-w-xl">
          <p className="text-white text-xs tracking-[0.2em] uppercase font-sans mb-2">Pour que chaque jour compte</p>
          <h1 className="text-white text-5xl font-serif mb-4">Ce qui se porte. Ce qui se transmet.</h1>
          <p className="text-white text-sm mb-6 leading-relaxed">
            Des montures conçues pour durer. Fabriquées par des mains qui savent encore.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/shop')}
              className="bg-white px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase text-dark-text font-bold hover:bg-white/90 transition-colors"
            >
              Découvrir
            </button>
            <button
              onClick={() => navigate('/store-locator')}
              className="border-2 border-white px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-white hover:text-dark-text transition-colors"
            >
              Trouver un opticien
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE VERSION - Completely New Design */}
      <div className="relative h-full overflow-hidden lg:hidden">
        {/* Full Screen Image with proper object positioning */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1764096301/unnamed_6_vh8f2v.jpg"
            alt="Hero Background Mobile"
            className="w-full h-full object-cover object-[center_30%]"
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
        </div>

        {/* Content Container - Centered vertically */}
        <div className="relative h-full flex flex-col justify-between pt-24 pb-8 px-6">

          {/* Top Content - Branding */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <p className="text-white/90 text-[9px] tracking-[0.3em] uppercase font-sans font-bold mb-2">
              RENAISSANCE PARIS
            </p>
            <div className="w-12 h-px bg-white/40"></div>
          </motion.div>

          {/* Center Content - Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 flex flex-col justify-center max-w-sm"
          >
            <h1 className="text-white text-4xl sm:text-5xl font-serif mb-4 leading-[1.1]">
              Fait pour durer.
            </h1>
            <p className="text-white/80 text-sm font-sans leading-relaxed mb-8">
              Des lunettes qu'on garde. Des lunettes qu'on transmet.
            </p>
          </motion.div>

          {/* Bottom Content - CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex-shrink-0 space-y-3"
          >
            <button
              onClick={() => navigate('/shop')}
              className="w-full bg-white text-dark-text px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/95 transition-all duration-300 active:scale-[0.98]"
            >
              Découvrir les collections
            </button>

            <button
              onClick={() => navigate('/store-locator')}
              className="w-full border-2 border-white/80 text-white px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 active:scale-[0.98]"
            >
              Trouver un opticien
            </button>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center pt-4"
            >
              <ChevronDown className="w-5 h-5 text-white/60" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
