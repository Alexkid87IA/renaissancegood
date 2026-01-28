import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';

export default function SavoirFaireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

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
      <div className="hidden md:block relative h-full overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
          alt="Fabrication Renaissance - Corée du Sud"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/70 to-[#0a0a0a]/40" />

        <div className="relative h-full flex items-center px-12 lg:px-20 xl:px-28">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="max-w-xl"
          >
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              Fabrication
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.9] mb-3">
              FABRIQUÉ EN CORÉE DU SUD.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-[2rem] xl:text-4xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8">
              200 gestes. Zéro compromis.
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14 max-w-md">
              Ce qui rend une monture belle, c'est ce qu'on ne voit pas. L'équilibre. La tension du métal. Le poids juste. Plus de 200 gestes par paire. Zéro démonstration. Juste le résultat.
            </motion.p>

            <motion.div variants={fade} className="flex items-start gap-0 mb-10 xl:mb-14">
              <div className="pr-6 md:pr-8">
                <p className="font-display text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">200+</p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-white/30 uppercase font-medium">Gestes par paire</p>
              </div>
              <div className="border-l border-white/10 pl-6 md:pl-8 pr-6 md:pr-8">
                <p className="font-display text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">15h</p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-white/30 uppercase font-medium">De fabrication</p>
              </div>
              <div className="border-l border-white/10 pl-6 md:pl-8">
                <p className="font-display text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">0</p>
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
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative min-h-[85vh] overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
          alt="Fabrication Renaissance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/80 to-[#0a0a0a]/95" />

        <div className="relative flex flex-col justify-end px-6 pt-20 pb-10 min-h-[85vh]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-white/30 text-[8px] tracking-[0.4em] font-medium uppercase mb-5"
          >
            Fabrication
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2"
          >
            <h2 className="font-display text-3xl font-bold text-white tracking-[-0.02em] leading-[0.9]">
              FABRIQUÉ EN CORÉE DU SUD.
            </h2>
            <p className="font-display text-xl font-light italic text-white/50 tracking-[-0.02em] mt-1">
              200 gestes. Zéro compromis.
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 origin-left"
          >
            <div className="w-10 h-px bg-white/15" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-white/40 text-xs leading-[1.7] font-light mb-6"
          >
            Ce qui rend une monture belle, c'est ce qu'on ne voit pas. L'équilibre. La tension du métal. Le poids juste.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-0 mb-8"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/savoir-faire">
              <button className="group relative overflow-hidden w-full border border-white/20 px-6 py-3.5 transition-all duration-300 active:scale-[0.98] hover:border-bronze/60">
                <span className="relative z-10 font-sans text-[8px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  Notre savoir-faire
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
