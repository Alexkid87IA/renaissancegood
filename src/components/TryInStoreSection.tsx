import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';

export default function TryInStoreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Desktop: parallax scale + fade. Mobile: no transforms.
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, isMobile ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, isMobile ? 1 : 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen relative sticky top-0 z-[60] bg-[#000000]"
    >
      {/* DESKTOP */}
      <div className="h-screen hidden md:flex flex-row">
        {/* Left - Content */}
        <motion.div
          ref={contentRef}
          variants={stagger}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          className="w-1/2 flex items-center justify-center px-16 lg:px-20"
        >
          <div className="max-w-xl">
            <motion.h2 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              ESSAYEZ EN BOUTIQUE.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-4xl xl:text-5xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 md:mb-10">
              Commandez en ligne.
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8 md:mb-10" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 md:mb-14 max-w-lg">
              Essayez nos créations chez l'un de nos 200+ opticiens partenaires. Commandez en ligne, livraison offerte, retours gratuits sous 30 jours.
            </motion.p>

            <motion.div variants={fade} className="flex flex-wrap items-start gap-3 lg:gap-5 mb-10 md:mb-14">
              <Link to="/store-locator">
                <button className="group relative overflow-hidden bg-white border border-white px-6 lg:px-10 py-3 lg:py-4 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.2em] lg:tracking-[0.3em] font-medium uppercase text-[#000000] whitespace-nowrap">
                    Trouver un opticien
                  </span>
                </button>
              </Link>
              <Link to="/shop">
                <button className="group relative overflow-hidden border border-white/20 px-6 lg:px-10 py-3 lg:py-4 transition-all duration-500 hover:border-bronze/60">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.2em] lg:tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#000000] transition-colors duration-500 whitespace-nowrap">
                    Acheter en ligne
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </motion.div>

            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.3em] font-medium uppercase">
              Livraison offerte · Retours 30 jours · Garantie 2 ans
            </motion.p>
          </div>
        </motion.div>

        {/* Right - Image */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/page%20histoire.png"
            alt="Essayez en boutique"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 via-transparent to-[#000000]/20 pointer-events-none" />
        </div>
      </div>

      {/* MOBILE — fullscreen image + overlay text */}
      <div className="md:hidden relative h-screen bg-[#000000] overflow-hidden">
        {/* Fullscreen image */}
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/page%20histoire.png"
            alt="Essayez en boutique"
            className="w-full h-full object-cover object-[center_30%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#000000]/20" />
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-b from-transparent to-[#000000]" />
        </div>

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p className="font-sans text-white/60 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
            Réseau Partenaire
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-1.5">
            ESSAYEZ EN
            <br />BOUTIQUE.
          </h2>
          <p className="font-display text-lg font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-5">
            Commandez en ligne.
          </p>

          <p className="font-sans text-white/35 text-[12px] leading-[1.7] font-light mb-6 max-w-[280px]">
            200+ opticiens partenaires. Livraison offerte, retours gratuits sous 30 jours.
          </p>

          <div className="flex flex-col gap-3 mb-5">
            <Link to="/store-locator">
              <button className="w-full bg-white px-8 py-4">
                <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-[#000000]">
                  Trouver un opticien
                </span>
              </button>
            </Link>
            <Link to="/shop">
              <button className="w-full border border-white/20 px-8 py-4">
                <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/60">
                  Acheter en ligne
                </span>
              </button>
            </Link>
          </div>

          <p className="font-sans text-white/20 text-[8px] tracking-[0.3em] font-medium uppercase">
            Livraison offerte · Retours 30 jours · Garantie 2 ans
          </p>
        </div>
      </div>
    </motion.section>
  );
}
