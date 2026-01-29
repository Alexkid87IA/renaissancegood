import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';

export default function HistoireSection() {
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

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, isMobile ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, isMobile ? 1 : 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="relative sticky top-0 z-[70] overflow-hidden"
      id="histoire"
    >
      {/* DESKTOP */}
      <div className="hidden md:flex h-screen relative">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
            alt="Renaissance Paris - Campagne Trident"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/30" />
        </div>

        {/* Content */}
        <div className="relative w-full max-w-[1600px] mx-auto flex items-center px-12 lg:px-20 xl:px-28">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="w-[55%] flex flex-col justify-center"
          >
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              Notre Histoire
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              LE MONDE OUBLIE.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl lg:text-3xl xl:text-4xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-10">
              Nous, on se souvient.
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-10" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] lg:text-sm xl:text-base leading-[1.9] font-light mb-12 xl:mb-16 max-w-md">
              Renaissance. Un mot pour ceux qui refusent que tout disparaisse. Que les gestes se perdent. Que le beau devienne jetable.
            </motion.p>

            <motion.div variants={fade}>
              <Link to="/histoire">
                <button className="group relative overflow-hidden border border-white/20 px-10 py-4 transition-all duration-500 hover:border-white/50">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    Découvrir notre histoire
                  </span>
                  <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative min-h-screen flex flex-col">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
            alt="Renaissance Paris - Campagne Trident"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-[#0a0a0a]/20" />
        </div>

        {/* Content at bottom */}
        <div className="relative flex-1 flex flex-col justify-end px-6 pb-12 pt-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-white/30 text-[8px] tracking-[0.4em] font-medium uppercase mb-5"
          >
            Notre Histoire
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2"
          >
            <h2 className="font-display text-3xl font-bold text-white tracking-[-0.03em] leading-[0.95]">
              LE MONDE OUBLIE.
            </h2>
            <p className="font-display text-xl font-light italic text-white/50 tracking-[-0.02em] mt-1">
              Nous, on se souvient.
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 origin-left"
          >
            <div className="w-10 h-px bg-white/15" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <p className="font-sans text-white/40 text-xs leading-[1.7] font-light max-w-xs">
              Renaissance. Un mot pour ceux qui refusent que tout disparaisse. Que les gestes se perdent. Que le beau devienne jetable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/histoire">
              <button className="group relative overflow-hidden w-full border border-white/20 px-7 py-3.5 transition-all duration-500 active:scale-[0.98]">
                <span className="relative z-10 font-sans text-[8px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  Découvrir notre histoire
                </span>
                <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
