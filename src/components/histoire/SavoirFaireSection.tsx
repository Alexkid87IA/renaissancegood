import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SavoirFaireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const processes = [
    {
      name: 'Découpe CNC',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Polissage Multi-Passes',
      image: 'https://images.pexels.com/photos/175709/pexels-photo-175709.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Gravure Laser',
      image: 'https://images.pexels.com/photos/256219/pexels-photo-256219.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Sertissage du Strass',
      image: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen sticky top-0 z-30 bg-beige"
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-20">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl laptop:text-5xl xl:text-6xl font-bold text-dark-text mb-6 tracking-[-0.03em] leading-[1.1]">
              La Maîtrise Coréenne
            </h2>
            <p className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold">
              Le Savoir-Faire
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12 text-center space-y-6"
          >
            <p className="font-sans text-dark-text text-base md:text-lg laptop:text-lg xl:text-xl leading-[1.8] font-light">
              Nos lunettes sont fabriquées en Corée du Sud. Un choix assumé pour l'exigence,
              la constance et la précision d'usinage du métal.
            </p>
            <p className="font-sans text-dark-text/70 text-sm md:text-base laptop:text-base xl:text-lg leading-[1.8] font-light">
              La rigueur coréenne en matière de tolérances et de finitions métalliques est reconnue mondialement.
              Chaque paire traverse 8 à 15 heures de fabrication cumulées, touchée par 8 à 12 artisans spécialisés.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 laptop:gap-6 mb-10 laptop:mb-12"
          >
            {processes.map((process, index) => (
              <motion.div
                key={process.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="relative group overflow-hidden"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={process.image}
                    alt={process.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/20 transition-colors duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-text/90 to-transparent">
                  <p className="font-sans text-white text-sm md:text-base tracking-[0.15em] uppercase font-medium">
                    {process.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="font-sans text-dark-text/80 text-sm md:text-base laptop:text-base xl:text-lg leading-[1.8] font-light">
              Métal épais. Gravures laser ultra-précises. Sertissage du strass signature sur la branche gauche.
              Polissage multi-passes. Rien n'est laissé au hasard.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
