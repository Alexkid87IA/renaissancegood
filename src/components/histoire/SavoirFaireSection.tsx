import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function SavoirFaireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { isMobile } = useDeviceType();

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
      className="min-h-[85vh] md:h-screen relative sticky top-0 z-30 bg-[#0a0a0a]"
    >
      {/* DESKTOP */}
      <div className="hidden md:flex h-full">
        {/* Left — Image */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/atelier.png"
            alt="Atelier de fabrication Renaissance"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/10" />
        </div>

        {/* Right — Content */}
        <motion.div
          ref={contentRef}
          variants={stagger}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          className="w-1/2 flex items-center justify-center px-12 lg:px-16 xl:px-20"
        >
          <div className="max-w-lg">
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              Fabrication
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.9] mb-3">
              FABRIQUÉ EN CORÉE DU SUD.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl lg:text-3xl xl:text-4xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 lg:mb-10">
              200 gestes. Zéro compromis.
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8 lg:mb-10" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] lg:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14 max-w-md">
              Ce qui rend une monture belle, c'est ce qu'on ne voit pas. L'équilibre. La tension du métal. Le poids juste. Plus de 200 gestes par paire. Zéro démonstration. Juste le résultat.
            </motion.p>

            <motion.div variants={fade} className="flex items-start gap-0 mb-10 xl:mb-14">
              <div className="pr-6 lg:pr-8">
                <p className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">200+</p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-white/30 uppercase font-medium">Gestes par paire</p>
              </div>
              <div className="border-l border-white/10 pl-6 lg:pl-8 pr-6 lg:pr-8">
                <p className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">15h</p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-white/30 uppercase font-medium">De fabrication</p>
              </div>
              <div className="border-l border-white/10 pl-6 lg:pl-8">
                <p className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">0</p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-white/30 uppercase font-medium">Compromis</p>
              </div>
            </motion.div>

            <motion.div variants={fade}>
              <Link to="/savoir-faire">
                <button className="group relative overflow-hidden border border-white/20 px-10 py-4 transition-all duration-500 hover:border-bronze/60">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    Notre savoir-faire
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/atelier.png"
          alt="Atelier de fabrication Renaissance"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative h-full flex flex-col justify-end px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-white/40 text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
              Fabrication
            </p>
            <h2 className="font-display text-3xl font-bold text-white tracking-[-0.02em] leading-[0.9] mb-2">
              FABRIQUÉ EN CORÉE DU SUD.
            </h2>
            <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-5">
              200 gestes. Zéro compromis.
            </p>

            <div className="flex gap-0 mb-6">
              <div className="pr-5">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">200+</p>
                <p className="font-sans text-[8px] tracking-[0.2em] text-white/30 uppercase">Gestes</p>
              </div>
              <div className="border-l border-white/10 pl-5 pr-5">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">15h</p>
                <p className="font-sans text-[8px] tracking-[0.2em] text-white/30 uppercase">Fabrication</p>
              </div>
              <div className="border-l border-white/10 pl-5">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">0</p>
                <p className="font-sans text-[8px] tracking-[0.2em] text-white/30 uppercase">Compromis</p>
              </div>
            </div>

            <Link to="/savoir-faire" className="block w-full">
              <button className="w-full bg-white text-dark-text px-8 py-4 font-sans text-[9px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all duration-300 active:scale-[0.98]">
                Notre savoir-faire
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
