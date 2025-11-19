import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const valeurs = [
  {
    title: 'LA JUSTESSE',
    description: 'Chaque mot vrai. Chaque geste nécessaire. Chaque matière juste.'
  },
  {
    title: 'LE RESPECT',
    description: 'On ne traite personne comme un chiffre.'
  },
  {
    title: 'LE SILENCE',
    description: "La vraie élégance, c'est ne pas forcer l'attention."
  },
  {
    title: 'LA TRANSMISSION',
    description: "On construit pour que dans 20 ans, quelqu'un hérite d'une paire et la garde."
  },
  {
    title: 'LA MAÎTRISE',
    description: 'On ne fait pas vite. On fait bien.'
  }
];

export default function ValeursSection() {
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
      className="min-h-screen sticky top-0 z-50 bg-beige"
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
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl laptop:text-5xl xl:text-6xl font-bold text-dark-text mb-6 tracking-[-0.03em] leading-[1.1]">
              Les Valeurs
            </h2>
            <p className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold mb-6">
              Les 5 Piliers
            </p>
            <p className="font-sans text-dark-text/70 text-lg md:text-xl leading-[1.8] font-light max-w-2xl mx-auto">
              Cinq piliers non-négociables qui guident chaque décision.
            </p>
          </motion.div>

          <div className="space-y-12 mt-16">
            {valeurs.map((valeur, index) => (
              <motion.div
                key={valeur.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="border-l-4 border-bronze/30 pl-8 py-6 hover:border-bronze transition-colors duration-500"
              >
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl laptop:text-3xl xl:text-4xl font-bold text-dark-text mb-3 tracking-[-0.02em]">
                  {valeur.title}
                </h3>
                <p className="font-sans text-dark-text/70 text-base md:text-lg leading-[1.8] font-light max-w-3xl">
                  {valeur.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
