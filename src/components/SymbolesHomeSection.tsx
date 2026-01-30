import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

const symbols = [
  {
    name: 'Le Trident',
    subtitle: 'Pouvoir',
    description: 'Trois pointes : force, vision, justesse. Celui qui tient le trident ne suit pas. Il trace.',
    image: 'https://renaissance-cdn.b-cdn.net/TRIDENT%20SYMBOL.png'
  },
  {
    name: 'La Fleur de Lys',
    subtitle: 'Exigence',
    description: "Le symbole de ceux qui ne lâchent rien. Chaque détail compte. Chaque geste aussi.",
    image: 'https://renaissance-cdn.b-cdn.net/FLEUR%20DE%20LYS%20SYMBOL.png'
  },
  {
    name: 'Le Cobra',
    subtitle: 'Protection',
    description: 'Élégant. Dangereux. Le cobra ne menace pas. Il veille.',
    image: 'https://renaissance-cdn.b-cdn.net/COBRA%20SYMBOL.png'
  },
  {
    name: "L'Ankh",
    subtitle: 'Éternité',
    description: "La clé de vie des pharaons. Ce qu'on construit bien traverse le temps.",
    image: 'https://renaissance-cdn.b-cdn.net/ANKH%20SYMBOL.png'
  },
  {
    name: 'Le Scarabée',
    subtitle: 'Renaissance',
    description: 'Chaque matin, il renaît. Comme nous. Comme tout ce qui refuse de mourir.',
    image: 'https://renaissance-cdn.b-cdn.net/SCARABEE%20SYMBOL.png'
  }
];

export default function SymbolesHomeSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section
      ref={sectionRef}
      className="relative z-[100]"
      // Height = enough vertical space to scroll through all symbols
      // 300vh gives comfortable scroll room for 5 cards
      style={{ height: '300vh' }}
    >
      {/* Sticky container — stays in view while user scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="h-full flex flex-col">
          {/* Header — compact pour maximiser l'espace des cartes */}
          <div className="max-w-[1800px] mx-auto w-full px-6 sm:px-10 md:px-12 lg:px-16 pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-5 lg:pb-6 flex-shrink-0">
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.35em] text-white/30 uppercase mb-2 font-medium">
                  Gravés dans le métal
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[-0.03em] leading-[0.9]">
                  Cinq symboles.{' '}
                  <span className="font-light italic tracking-[-0.01em]">Une promesse.</span>
                </h2>
              </div>
              <p className="hidden sm:block font-sans text-white/35 text-xs lg:text-sm leading-[1.6] max-w-sm flex-shrink-0">
                Des signes qui parlent depuis des millénaires. On ne les a pas inventés. On les porte.
              </p>
            </div>
          </div>

          {/* Horizontal track — driven by vertical scroll */}
          <div className="flex-1 min-h-0 px-6 sm:px-10 md:px-12 lg:px-16 pb-2 sm:pb-3">
            <motion.div
              className="flex gap-1 sm:gap-1.5 lg:gap-2 h-full"
              style={{ x, willChange: 'transform' }}
            >
              {symbols.map((symbol, index) => (
                <div
                  key={symbol.name}
                  className="flex-shrink-0 h-full w-[70vw] sm:w-[45vw] lg:w-[35vw] xl:w-[28vw] max-w-[520px]"
                >
                  <SymbolCard
                    symbol={symbol}
                    index={index}
                    isHovered={hoveredIndex === index}
                    onHover={() => setHoveredIndex(index)}
                    onLeave={() => setHoveredIndex(null)}
                  />
                </div>
              ))}

              {/* CTA card at the end */}
              <div
                className="flex-shrink-0 h-full flex items-center w-[60vw] sm:w-[35vw] lg:w-[24vw] max-w-[360px]"
              >
                <div className="px-4 sm:px-6">
                  <p className="font-sans text-[9px] tracking-[0.3em] text-white/30 uppercase mb-6 font-medium">
                    05 symboles
                  </p>
                  <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-[-0.02em] mb-8">
                    Chaque gravure
                    <br />
                    <span className="font-light italic">raconte.</span>
                  </p>
                  <button
                    onClick={() => navigate('/histoire')}
                    className="group relative overflow-hidden border border-white/30 px-8 sm:px-10 py-3.5 sm:py-4"
                  >
                    <span className="relative z-10 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-medium uppercase text-white group-hover:text-black transition-colors duration-500">
                      Leur histoire
                    </span>
                    <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="flex-shrink-0 px-6 sm:px-10 md:px-12 lg:px-16 pb-4 sm:pb-5">
            <div className="max-w-[1800px] mx-auto">
              <div className="h-px bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white/40"
                  style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================
// CARTE SYMBOLE
// ========================================

function SymbolCard({
  symbol,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  symbol: typeof symbols[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="group cursor-pointer h-full flex flex-col"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image — fills all available height, full black bg, no frame */}
      <div className="relative flex-1 min-h-0 overflow-hidden bg-black">
        <img
          src={symbol.image}
          alt={symbol.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />

        {/* Overlay au hover */}
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Description révélée au hover */}
        <div className={`absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="font-sans text-white/85 text-xs sm:text-sm lg:text-base leading-[1.65] font-light">
            {symbol.description}
          </p>
        </div>

        {/* Numéro discret */}
        <div className="absolute top-4 sm:top-5 right-4 sm:right-5">
          <span className={`font-sans text-[10px] sm:text-xs text-white/15 font-medium tracking-wider transition-colors duration-500 ${
            isHovered ? 'text-white/35' : ''
          }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Infos sous l'image */}
      <div className="pt-4 sm:pt-5 pb-1 flex-shrink-0">
        <p className={`font-sans text-[8px] sm:text-[9px] tracking-[0.25em] text-white/30 uppercase font-medium mb-1 transition-colors duration-500 ${
          isHovered ? 'text-white/50' : ''
        }`}>
          {symbol.subtitle}
        </p>
        <h3 className={`font-display text-sm sm:text-base lg:text-lg font-bold text-white leading-tight tracking-[-0.01em] transition-all duration-500 ${
          isHovered ? 'translate-x-1' : ''
        }`}>
          {symbol.name}
        </h3>
      </div>

      {/* Ligne animée */}
      <div className="h-px bg-white/10 relative overflow-hidden flex-shrink-0">
        <div className={`absolute inset-y-0 left-0 bg-white/40 transition-all duration-700 ease-out ${
          isHovered ? 'w-full' : 'w-0'
        }`} />
      </div>
    </div>
  );
}
