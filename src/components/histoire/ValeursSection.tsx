import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { stagger, fade } from './shared';

const valeurs = [
  {
    number: '01',
    title: 'La Justesse',
    description: 'Chaque mot vrai. Chaque geste nécessaire. Chaque matière juste.',
    keyword: 'Vérité'
  },
  {
    number: '02',
    title: 'Le Respect',
    description: 'On ne traite personne comme un chiffre. Ni client, ni partenaire, ni artisan.',
    keyword: 'Dignité'
  },
  {
    number: '03',
    title: 'Le Silence',
    description: "La vraie élégance, c'est ne pas forcer l'attention. Être reconnu par ceux qui savent.",
    keyword: 'Discrétion'
  },
  {
    number: '04',
    title: 'La Transmission',
    description: "On construit pour que dans 20 ans, quelqu'un hérite d'une paire et la garde.",
    keyword: 'Héritage'
  },
  {
    number: '05',
    title: 'La Maîtrise',
    description: 'On ne fait pas vite. On fait bien. Le temps est un allié, pas un ennemi.',
    keyword: 'Excellence'
  }
];

export default function ValeursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      className="h-screen relative sticky top-0 z-50 bg-[#0a0a0a]"
    >
      {/* DESKTOP */}
      <div className="hidden md:flex h-full items-center">
        <div className="w-full max-w-[1600px] mx-auto px-12 lg:px-20 xl:px-28">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
          >
            {/* Header — compact manifesto */}
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-3">
              Nos Valeurs
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.9] mb-2">
              CINQ PILIERS.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-[2rem] xl:text-4xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 lg:mb-10">
              Non-négociables.
            </motion.p>

            {/* Values as full-width editorial rows — compact */}
            <div className="border-t border-white/[0.07]">
              {valeurs.map((valeur, index) => (
                <motion.div
                  key={valeur.title}
                  variants={fade}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group border-b border-white/[0.07] py-3.5 lg:py-4 cursor-default"
                >
                  <div className="flex items-center gap-6 lg:gap-10">
                    {/* Number */}
                    <div className="flex-shrink-0 w-12 lg:w-16">
                      <span className={`font-display text-3xl lg:text-4xl xl:text-5xl font-bold leading-none tracking-[-0.03em] transition-colors duration-500 ${
                        hoveredIndex === index ? 'text-white' : 'text-white/15'
                      }`}>
                        {valeur.number}
                      </span>
                    </div>

                    {/* Title + keyword + description inline */}
                    <div className="flex-1 flex items-center justify-between gap-6">
                      <div className="flex-1 flex items-baseline gap-6">
                        <h3 className="font-display text-lg lg:text-xl xl:text-2xl text-white font-bold tracking-[-0.01em] leading-tight flex-shrink-0">
                          {valeur.title}
                        </h3>
                        <p className={`font-sans text-xs xl:text-sm leading-[1.6] font-light transition-all duration-500 max-w-md ${
                          hoveredIndex === index ? 'text-white/60' : 'text-white/25'
                        }`}>
                          {valeur.description}
                        </p>
                      </div>

                      {/* Keyword + bronze line */}
                      <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                        <span className={`font-sans text-[9px] tracking-[0.25em] uppercase font-medium transition-colors duration-500 ${
                          hoveredIndex === index ? 'text-bronze' : 'text-white/20'
                        }`}>
                          {valeur.keyword}
                        </span>
                        <div className={`h-px bg-bronze transition-all duration-700 ease-out ${
                          hoveredIndex === index ? 'w-12' : 'w-0'
                        }`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative h-screen flex items-center overflow-hidden">
        <div className="w-full px-6 py-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-white/30 text-[8px] tracking-[0.4em] font-medium uppercase mb-5"
          >
            Nos Valeurs
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2"
          >
            <h2 className="font-display text-3xl font-bold text-white tracking-[-0.02em] leading-[0.9]">
              CINQ PILIERS.
            </h2>
            <p className="font-display text-xl font-light italic text-white/50 tracking-[-0.02em] mt-1">
              Non-négociables.
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 origin-left"
          >
            <div className="w-10 h-px bg-white/15" />
          </motion.div>

          <div className="border-t border-white/[0.07]">
            {valeurs.map((valeur, index) => (
              <motion.div
                key={valeur.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-white/[0.07] py-5"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-2xl font-bold text-white/15 leading-none flex-shrink-0 w-8">
                    {valeur.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <h3 className="font-display text-lg text-white font-bold tracking-[-0.01em] leading-tight">
                        {valeur.title}
                      </h3>
                      <span className="font-sans text-[7px] tracking-[0.2em] text-white/20 uppercase font-medium">
                        {valeur.keyword}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-white/40 leading-[1.7] font-light">
                      {valeur.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
