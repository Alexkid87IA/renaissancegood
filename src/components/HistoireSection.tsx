import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function HistoireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
      className="h-screen sticky top-0 z-[70] bg-[#fafaf8]"
      id="histoire"
    >
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12">
        
        {/* Lignes décoratives */}
        <div className="absolute top-0 left-1/4 w-px h-24 bg-gradient-to-b from-bronze/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-24 bg-gradient-to-b from-bronze/20 to-transparent" />

        {/* Contenu */}
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-bronze/40" />
            <span className="font-sans text-bronze text-[10px] tracking-[0.4em] uppercase">
              Notre Histoire
            </span>
            <div className="w-8 h-px bg-bronze/40" />
          </motion.div>

          {/* Titres */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-2 sm:space-y-4 mb-12 sm:mb-16"
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-dark-text tracking-[-0.04em] leading-[0.9]">
              UN MOT OUBLIÉ.
            </h2>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-bronze tracking-[-0.04em] leading-[0.9]">
              UN MOT TROP GRAND.
            </h2>
          </motion.div>

          {/* Sous-texte */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-dark-text/50 text-base md:text-lg max-w-xl mx-auto mb-10 sm:mb-12 font-light leading-relaxed"
          >
            Renaissance. Un mot qui évoque le renouveau, l'excellence, 
            et la beauté intemporelle de l'artisanat français.
          </motion.p>

          {/* Bouton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/histoire">
              <button className="group relative border-2 border-dark-text text-dark-text px-10 sm:px-12 py-4 sm:py-5 font-sans text-[10px] tracking-[0.25em] font-bold overflow-hidden transition-all duration-500 hover:text-white">
                <span className="absolute inset-0 bg-dark-text translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">DÉCOUVRIR NOTRE HISTOIRE</span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Diamant décoratif en bas */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-2 h-2 border border-bronze/30 rotate-45" />
        </div>
      </div>
    </motion.section>
  );
}