import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="h-screen sticky top-0 z-10"
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
          <p className="text-white text-xs tracking-[0.2em] uppercase font-sans mb-2">Portez l'intemporel</p>
          <h1 className="text-white text-5xl font-serif mb-4">Des lunettes d'exceptions</h1>
          <p className="text-white text-sm mb-6 leading-relaxed">
            Des montures merveilleuses, conçues et fabriquées avec un savoir-faire artisanal unique.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/shop')}
              className="bg-white px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase text-dark-text font-bold hover:bg-white/90 transition-colors"
            >
              Acheter maintenant
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

      {/* MOBILE VERSION - PREMIUM EXPERIENCE */}
      <div className="relative h-full overflow-hidden lg:hidden">
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: scrollY * 0.5 }}
        >
          <img
            src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1764096301/unnamed_6_vh8f2v.jpg"
            alt="Hero Background Mobile"
            className="w-full h-[120%] object-cover object-center"
          />

          {/* Multi-layer Gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60"></div>
        </motion.div>

        {/* Premium Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')]"></div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-between px-6 pt-28 pb-10">

          {/* Top Section - Animated Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" strokeWidth={2} />
              <span className="text-white/90 text-[9px] tracking-[0.25em] uppercase font-bold">
                Collection 2025
              </span>
            </div>
          </motion.div>

          {/* Center Section - Hero Content */}
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-white text-[3.5rem] sm:text-6xl font-serif leading-[0.95] tracking-tight mb-5">
                L'excellence<br/>
                <span className="text-white/80">parisienne</span>
              </h1>

              <motion.div
                className="w-20 h-[2px] bg-gradient-to-r from-amber-200 to-transparent mb-6"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, delay: 1 }}
              />

              <p className="text-white/75 text-base font-sans leading-[1.7] max-w-sm">
                Chaque monture incarne un siècle de savoir-faire artisanal français,
                <span className="text-white font-medium"> sublimé par l'excellence moderne</span>
              </p>
            </motion.div>

            {/* Stats Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-2.5"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <p className="text-white text-xs font-sans">
                  <span className="font-bold">250</span>
                  <span className="text-white/60 ml-1">étapes</span>
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <p className="text-white text-xs font-sans">
                  <span className="font-bold">8-15h</span>
                  <span className="text-white/60 ml-1">de travail</span>
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <p className="text-white text-xs font-sans">
                  <span className="font-bold">2 ans</span>
                  <span className="text-white/60 ml-1">garantie</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section - Premium CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex-shrink-0 space-y-3.5"
          >
            <motion.button
              onClick={() => navigate('/shop')}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-dark-text px-8 py-4.5 font-sans text-[10px] tracking-[0.25em] uppercase font-bold
                         shadow-2xl shadow-black/30 hover:shadow-white/20 transition-all duration-300
                         relative overflow-hidden group"
            >
              <span className="relative z-10">Découvrir les collections</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-50 to-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={() => navigate('/store-locator')}
              whileTap={{ scale: 0.98 }}
              className="w-full border-2 border-white/90 text-white px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase font-bold
                         backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              Trouver un opticien
            </motion.button>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center pt-6 pb-2"
            >
              <p className="text-white/40 text-[8px] tracking-[0.3em] uppercase mb-2">Défiler</p>
              <ChevronDown className="w-4 h-4 text-white/50" strokeWidth={2} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
