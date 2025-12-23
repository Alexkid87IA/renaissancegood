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
      className="py-20 md:py-0 md:min-h-[70vh] lg:min-h-[75vh] xl:min-h-[80vh] relative sticky top-0 z-[70] bg-[#0a0a0a] flex items-center justify-center"
      id="histoire"
    >
      <div className="relative w-full flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12 md:py-16 lg:py-20">

        {/* Lignes décoratives - Hidden on mobile */}
        <div className="hidden md:block absolute top-0 left-1/4 w-px h-24 bg-gradient-to-b from-bronze/30 to-transparent" />
        <div className="hidden md:block absolute top-0 right-1/4 w-px h-24 bg-gradient-to-b from-bronze/30 to-transparent" />

        {/* Contenu */}
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 mb-8 sm:mb-6"
          >
            <div className="w-8 sm:w-6 h-px bg-bronze/50" />
            <span className="font-sans text-bronze text-[10px] sm:text-[9px] md:text-[8px] tracking-[0.3em] sm:tracking-[0.35em] uppercase">
              Notre Histoire
            </span>
            <div className="w-8 sm:w-6 h-px bg-bronze/50" />
          </motion.div>

          {/* Titres */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3 sm:space-y-4 mb-10 sm:mb-16"
          >
            <h2 className="font-display text-[26px] xs:text-[32px] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5.5rem] font-bold text-white tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1] sm:leading-[0.95]">
              LE MONDE OUBLIE.
            </h2>
            <h2 className="font-display text-[26px] xs:text-[32px] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5.5rem] font-bold text-bronze tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1] sm:leading-[0.95]">
              NOUS, ON SE SOUVIENT.
            </h2>
          </motion.div>

          {/* Sous-texte */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-white/50 text-sm sm:text-xs md:text-[0.95625rem] max-w-md sm:max-w-xl mx-auto mb-10 sm:mb-12 font-light leading-relaxed px-2 sm:px-0"
          >
            Renaissance. Un mot pour ceux qui refusent que tout disparaisse. Que les gestes se perdent. Que le beau devienne jetable.
          </motion.p>

          {/* Bouton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/histoire">
              <button className="group relative border-2 border-white/30 text-white px-6 sm:px-8 md:px-12 py-4 sm:py-3.5 md:py-5 font-sans text-[10px] sm:text-[9px] md:text-[8px] tracking-[0.2em] sm:tracking-[0.25em] font-bold overflow-hidden transition-all duration-500 hover:border-bronze hover:text-dark-text active:scale-95">
                <span className="absolute inset-0 bg-bronze translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">DÉCOUVRIR NOTRE HISTOIRE</span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Diamant décoratif en bas */}
        <div className="hidden md:block mt-12 lg:mt-16">
          <div className="w-2 h-2 border border-bronze/40 rotate-45 mx-auto" />
        </div>

      </div>
    </motion.section>
  );
}