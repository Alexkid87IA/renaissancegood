import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function EngagementSection() {
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
      className="min-h-screen sticky top-0 z-[80] bg-dark-text"
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-20">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl laptop:text-5xl xl:text-6xl font-bold text-white mb-6 tracking-[-0.03em] leading-[1.1]">
              L'Engagement
            </h2>
            <p className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold mb-6">
              La Durée
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-16 text-center space-y-6"
          >
            <p className="font-sans text-white text-xl md:text-2xl leading-[1.7] font-light">
              Nous produisons peu. Nous produisons juste.
            </p>
            <p className="font-sans text-white/80 text-lg md:text-xl leading-[1.8] font-light">
              Chaque paire est conçue pour durer 10 ans minimum. Garantie 36 mois.
              Service après-vente avec pièces détachées disponibles. Packaging recyclable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          >
            <div className="text-center space-y-4">
              <div className="inline-block p-8 border border-bronze/30 hover:border-bronze transition-colors duration-500">
                <p className="font-display text-6xl md:text-7xl text-white font-bold tracking-tight">10</p>
                <p className="font-sans text-bronze text-xs tracking-[0.2em] uppercase font-medium mt-2">ANS</p>
              </div>
              <p className="font-sans text-white/70 text-sm tracking-[0.1em] uppercase font-light">
                Durée de vie minimum
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-block p-8 border border-bronze/30 hover:border-bronze transition-colors duration-500">
                <p className="font-display text-6xl md:text-7xl text-white font-bold tracking-tight">36</p>
                <p className="font-sans text-bronze text-xs tracking-[0.2em] uppercase font-medium mt-2">MOIS</p>
              </div>
              <p className="font-sans text-white/70 text-sm tracking-[0.1em] uppercase font-light">
                Garantie constructeur
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-block p-8 border border-bronze/30 hover:border-bronze transition-colors duration-500">
                <p className="font-display text-6xl md:text-7xl text-white font-bold tracking-tight">100</p>
                <p className="font-sans text-bronze text-xs tracking-[0.2em] uppercase font-medium mt-2">%</p>
              </div>
              <p className="font-sans text-white/70 text-sm tracking-[0.1em] uppercase font-light">
                Pièces détachées disponibles
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4 group">
              <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 flex-shrink-0" />
              <p className="font-sans text-white/80 text-base md:text-lg leading-[1.7] font-light">
                <span className="font-semibold text-white">Service après-vente dédié</span> pour l'entretien et les réparations
              </p>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 flex-shrink-0" />
              <p className="font-sans text-white/80 text-base md:text-lg leading-[1.7] font-light">
                <span className="font-semibold text-white">Pièces détachées</span> disponibles pendant toute la durée de vie du produit
              </p>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 flex-shrink-0" />
              <p className="font-sans text-white/80 text-base md:text-lg leading-[1.7] font-light">
                <span className="font-semibold text-white">Packaging éco-responsable</span> entièrement recyclable et minimaliste
              </p>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 flex-shrink-0" />
              <p className="font-sans text-white/80 text-base md:text-lg leading-[1.7] font-light">
                <span className="font-semibold text-white">Ajustements gratuits</span> à vie chez tous nos opticiens partenaires
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto text-center mt-16 pt-12 border-t border-bronze/20"
          >
            <p className="font-sans text-white text-lg md:text-xl leading-[1.8] font-light italic">
              Notre engagement principal n'est pas une cause. C'est la qualité, la durabilité,
              et le respect de ceux qui nous font confiance.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
