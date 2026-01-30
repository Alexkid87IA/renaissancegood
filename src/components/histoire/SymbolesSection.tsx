import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { stagger, fade } from './shared';
import { useDeviceType } from '../../hooks/useDeviceType';

const symbols = [
  {
    name: 'Le Trident',
    subtitle: 'Souveraineté',
    description: 'Trois pointes, trois dimensions : force, vision, justesse. Le symbole du pouvoir maîtrisé.',
    image: 'https://renaissance-cdn.b-cdn.net/TRIDENT%20SYMBOL.png'
  },
  {
    name: 'La Fleur de Lys',
    subtitle: 'Excellence',
    description: "L'excellence héritée. Pureté du geste et exigence du détail.",
    image: 'https://renaissance-cdn.b-cdn.net/FLEUR%20DE%20LYS%20SYMBOL.png'
  },
  {
    name: "L'Ankh",
    subtitle: 'Éternité',
    description: "La clé de vie éternelle. Ce qu'on construit aujourd'hui doit traverser le temps.",
    image: 'https://renaissance-cdn.b-cdn.net/ANKH%20SYMBOL.png'
  },
  {
    name: 'Le Scarabée',
    subtitle: 'Renaissance',
    description: 'La renaissance perpétuelle. Transformation et renouveau constant.',
    image: 'https://renaissance-cdn.b-cdn.net/SCARABEE%20SYMBOL.png'
  },
  {
    name: 'Le Cobra',
    subtitle: 'Protection',
    description: 'La protection vigilante. Élégant et puissant. Présence affirmée, force contenue.',
    image: 'https://renaissance-cdn.b-cdn.net/COBRA%20SYMBOL.png'
  }
];

export default function SymbolesSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { isMobile } = useDeviceType();

  return (
    <motion.section
      className="min-h-screen lg:h-screen relative z-[40] bg-beige"
    >
      {/* DESKTOP */}
      <div className="h-full bg-beige hidden md:flex flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 lg:p-20 xl:p-28">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="max-w-lg"
          >
            <motion.p variants={fade} className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              Nos Symboles
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[0.9] mb-3">
              CINQ SYMBOLES.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-[2rem] xl:text-4xl font-light italic text-dark-text/70 tracking-[-0.02em] leading-[1] mb-8">
              Gravés dans le métal.
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-dark-text/15 mb-8" />

            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10">
              Chaque symbole porte un sens, une histoire, une promesse. Des signes qui parlent depuis des millénaires. On ne les a pas inventés. On les porte.
            </motion.p>

            <motion.div variants={fade} className="flex flex-wrap gap-2 mb-8">
              {symbols.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveIndex(i)}
                  className={`font-sans text-[9px] tracking-[0.3em] font-medium uppercase px-4 py-2.5 border transition-all duration-300 ${
                    activeIndex === i
                      ? 'border-dark-text bg-dark-text text-beige'
                      : 'border-dark-text/15 text-dark-text/50 hover:border-dark-text/40'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </motion.div>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-sans text-[9px] tracking-[0.25em] text-dark-text/30 uppercase font-medium mb-2">
                {symbols[activeIndex].subtitle}
              </p>
              <p className="font-display text-xl md:text-2xl text-dark-text/70 font-light leading-relaxed">
                {symbols[activeIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/96a1a738-99de-4d9e-854e-cd8bf2a06b5f.png"
            alt="Renaissance Paris - Symboles"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/96a1a738-99de-4d9e-854e-cd8bf2a06b5f.png"
          alt="Renaissance Paris - Symboles"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="relative h-full flex flex-col justify-end px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-white/40 text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
              Nos Symboles
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-white mb-2">
              CINQ SYMBOLES.
            </h2>
            <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-5">
              Gravés dans le métal.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {symbols.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveIndex(i)}
                  className={`font-sans text-[7px] tracking-[0.25em] font-medium uppercase px-3 py-2 border transition-all duration-300 ${
                    activeIndex === i
                      ? 'border-white bg-white text-dark-text'
                      : 'border-white/20 text-white/50'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <motion.div
              key={`mobile-${activeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-sans text-[8px] tracking-[0.2em] text-white/30 uppercase font-medium mb-1">
                {symbols[activeIndex].subtitle}
              </p>
              <p className="font-sans text-white/60 text-xs leading-[1.7] font-light">
                {symbols[activeIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
