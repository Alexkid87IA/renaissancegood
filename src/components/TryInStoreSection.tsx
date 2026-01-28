import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';

export default function TryInStoreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-[85vh] md:h-screen relative sticky top-0 z-[60] bg-[#0a0a0a]"
    >
      <div className="h-full flex items-center justify-center px-6 md:px-16 py-16 md:py-0">
        <motion.div
          ref={contentRef}
          variants={stagger}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          className="max-w-2xl w-full text-center"
        >

          {/* Title */}
          <motion.h2 variants={fade} className="font-display text-3xl sm:text-4xl md:text-5xl laptop:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
            ESSAYEZ EN BOUTIQUE.
          </motion.h2>
          <motion.p variants={fade} className="font-display text-xl sm:text-2xl md:text-3xl laptop:text-4xl xl:text-5xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 md:mb-10">
            Commandez en ligne.
          </motion.p>

          {/* Line */}
          <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-8 md:mb-10" />

          {/* Description */}
          <motion.p variants={fade} className="font-sans text-white/40 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 md:mb-14 max-w-lg mx-auto">
            Essayez nos créations chez l'un de nos 200+ opticiens partenaires. Commandez en ligne, livraison offerte, retours gratuits sous 30 jours.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fade} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-10 md:mb-14">
            <Link to="/store-locator" className="w-full sm:w-auto">
              <button className="group relative overflow-hidden w-full sm:w-auto bg-white border border-white px-10 py-4 transition-all duration-500">
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-[#0a0a0a]">
                  Trouver un opticien
                </span>
              </button>
            </Link>
            <Link to="/shop" className="w-full sm:w-auto">
              <button className="group relative overflow-hidden w-full sm:w-auto border border-white/20 px-10 py-4 transition-all duration-500 hover:border-bronze/60">
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  Acheter en ligne
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </Link>
          </motion.div>

          {/* Guarantees */}
          <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.3em] font-medium uppercase">
            Livraison offerte · Retours 30 jours · Garantie 2 ans
          </motion.p>

        </motion.div>
      </div>
    </motion.section>
  );
}
