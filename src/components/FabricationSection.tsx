import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';

const FABRICATION_IMAGE = 'https://renaissance-cdn.b-cdn.net/Generated%20Image%20January%2029%2C%202026%20-%205_06AM.jpeg';

const STATS = [
  { value: '8-12', label: 'Artisans par paire' },
  { value: '250', label: 'Étapes de fabrication' },
  { value: '15h', label: 'De travail cumulé' },
  { value: '2', label: 'Pays d\'excellence' },
];

const DETAILS = [
  { label: 'Design', location: 'Paris, France' },
  { label: 'Fabrication', location: 'Corée du Sud' },
  { label: 'Acétate', location: 'Mazzucchelli, Italie' },
];

export default function FabricationSection() {
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
      className="relative sticky top-0 z-[80] bg-[#000000]"
      id="fabrication"
    >
      {/* DESKTOP */}
      <div className="relative h-screen hidden md:block overflow-hidden">
        <img
          src={FABRICATION_IMAGE}
          alt="Renaissance Paris - Fabrication"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#000000]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/70 via-[#000000]/40 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-center px-12 lg:px-20 xl:px-28">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="max-w-xl"
          >
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              Savoir-faire
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-5xl laptop:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              NOTRE
            </motion.h2>
            <motion.p variants={fade} className="font-display text-3xl laptop:text-4xl xl:text-5xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-10">
              Fabrication.
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-10" />
            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] lg:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-12 max-w-md">
              Une paire de Renaissance, c'est 250 étapes. Des mains françaises pour la vision. Des mains coréennes pour la précision. Deux pays. Un seul standard : celui qui dure.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fade} className="flex items-start gap-0 mb-10 xl:mb-12">
              {STATS.map((stat, i) => (
                <div key={stat.label} className={`${i > 0 ? 'border-l border-white/10 pl-6 lg:pl-8' : ''} ${i < STATS.length - 1 ? 'pr-6 lg:pr-8' : ''}`}>
                  <p className="font-display text-2xl lg:text-3xl xl:text-4xl text-white font-bold tracking-tight leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-white/40 text-[7px] lg:text-[8px] tracking-[0.2em] uppercase font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Origin details */}
            <motion.div variants={fade} className="flex items-center gap-6 mb-10 xl:mb-12">
              {DETAILS.map((detail, i) => (
                <div key={detail.label} className={`flex items-center ${i > 0 ? 'border-l border-white/10 pl-6' : ''}`}>
                  <div>
                    <span className="font-sans text-white/60 text-[11px] font-medium">{detail.label}</span>
                    <span className="font-sans text-white/30 text-[11px] font-light"> — {detail.location}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fade}>
              <Link to="/savoir-faire">
                <button className="group relative overflow-hidden border border-white/20 px-10 py-4 transition-all duration-500 hover:border-bronze/60">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#000000] transition-colors duration-500">
                    Voir le processus
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative h-screen bg-[#000000] overflow-hidden">
        <img
          src={FABRICATION_IMAGE}
          alt="Renaissance Paris - Fabrication"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/30 to-[#000000]/90" />

        {/* Content — bas */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p className="font-sans text-white/25 text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
            Savoir-faire
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-1">
            NOTRE
          </h2>
          <p className="font-display text-lg sm:text-xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-6">
            Fabrication.
          </p>

          {/* Stats — 2x2 grid */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-6 mb-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-white font-bold tracking-tight leading-none mb-1.5">
                  {stat.value}
                </p>
                <p className="font-sans text-white/35 text-[8px] tracking-[0.2em] uppercase font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link to="/savoir-faire">
            <button className="group relative overflow-hidden w-full border border-white/20 px-6 py-4 transition-all duration-500 hover:border-bronze/60 active:scale-[0.98]">
              <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#000000] transition-colors duration-500">
                Voir le processus
              </span>
              <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
