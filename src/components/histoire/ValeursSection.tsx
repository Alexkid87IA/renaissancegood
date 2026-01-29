import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { stagger, fade } from './shared';
import { useDeviceType } from '../../hooks/useDeviceType';

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
      className="min-h-screen md:h-screen relative sticky top-0 z-50 bg-[#0a0a0a]"
    >
      {/* DESKTOP */}
      <div className="hidden md:flex h-full">
        {/* Left — Image */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/campgane.png"
            alt="Campagne Renaissance - Nos valeurs"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/10" />
        </div>

        {/* Right — Content */}
        <div className="w-1/2 flex items-center px-12 lg:px-16 xl:px-20">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="w-full max-w-2xl"
          >
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-3">
              Nos Valeurs
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.9] mb-2">
              CINQ PILIERS.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl lg:text-3xl xl:text-4xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 lg:mb-10">
              Non-négociables.
            </motion.p>

            <div className="border-t border-white/[0.07]">
              {valeurs.map((valeur, index) => (
                <motion.div
                  key={valeur.title}
                  variants={fade}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group border-b border-white/[0.07] py-4 xl:py-5 cursor-default"
                >
                  {/* Top row: number + title + keyword */}
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="flex items-baseline gap-4">
                      <span className={`font-display text-sm lg:text-base font-bold tracking-[-0.02em] transition-colors duration-500 ${
                        hoveredIndex === index ? 'text-bronze' : 'text-white/20'
                      }`}>
                        {valeur.number}
                      </span>
                      <h3 className="font-display text-lg lg:text-xl xl:text-2xl text-white font-bold tracking-[-0.01em] leading-tight">
                        {valeur.title}
                      </h3>
                    </div>
                    <span className={`font-sans text-[9px] tracking-[0.25em] uppercase font-medium transition-colors duration-500 ${
                      hoveredIndex === index ? 'text-bronze' : 'text-white/15'
                    }`}>
                      {valeur.keyword}
                    </span>
                  </div>
                  {/* Description */}
                  <p className={`font-sans text-xs xl:text-sm leading-[1.7] font-light transition-colors duration-500 pl-8 lg:pl-10 ${
                    hoveredIndex === index ? 'text-white/60' : 'text-white/25'
                  }`}>
                    {valeur.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/campgane.png"
          alt="Campagne Renaissance"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />

        <div className="relative h-full flex flex-col justify-end px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-white/40 text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
              Nos Valeurs
            </p>
            <h2 className="font-display text-3xl font-bold text-white tracking-[-0.02em] leading-[0.9] mb-2">
              CINQ PILIERS.
            </h2>
            <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-5">
              Non-négociables.
            </p>

            <div className="border-t border-white/[0.07]">
              {valeurs.map((valeur, index) => (
                <motion.div
                  key={valeur.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="border-b border-white/[0.07] py-3"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold text-white/20 leading-none flex-shrink-0">
                      {valeur.number}
                    </span>
                    <h3 className="font-display text-base text-white font-bold tracking-[-0.01em] leading-tight">
                      {valeur.title}
                    </h3>
                    <span className="font-sans text-[7px] tracking-[0.2em] text-white/20 uppercase font-medium ml-auto">
                      {valeur.keyword}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
