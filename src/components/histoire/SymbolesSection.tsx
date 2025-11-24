import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const symbols = [
  { 
    name: 'Le Trident', 
    subtitle: 'Souveraineté', 
    description: 'Trois pointes, trois dimensions : force, vision, justesse. Le symbole du pouvoir maîtrisé.',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763855099/WhatsApp_Image_2025-11-21_at_16.20.29_luvmkv.jpg'
  },
  { 
    name: 'La Fleur de Lys', 
    subtitle: 'Excellence', 
    description: "L'excellence héritée. Pureté du geste et exigence du détail.",
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_4_xntepe.jpg'
  },
  { 
    name: 'Le Cobra', 
    subtitle: 'Protection', 
    description: 'La protection vigilante. Élégant et puissant. Présence affirmée, force contenue.',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_3_zmql9v.jpg'
  },
  { 
    name: "L'Ankh", 
    subtitle: 'Éternité', 
    description: "La clé de vie éternelle. Ce qu'on construit aujourd'hui doit traverser le temps.",
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_fpklnf.jpg'
  },
  { 
    name: 'Le Scarabée', 
    subtitle: 'Renaissance', 
    description: 'La renaissance perpétuelle. Transformation et renouveau constant.',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_2_tp1ac1.jpg'
  }
];

export default function SymbolesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInView = useInView(sectionRef, { 
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });
  
  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-[4] bg-beige overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? 
          { opacity: 1, y: 0 } : 
          { opacity: 0, y: 20 }
        }
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1]
        }}
        className="h-full w-full relative flex flex-col"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-beige to-beige/95" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute left-[25%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[75%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        {/* Radial glow behind active symbol */}
        <motion.div 
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,115,85,0.3)_0%,transparent_50%)]" 
        />

        {/* HEADER */}
        <div className="relative z-10 pt-8 md:pt-12 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">04</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-xs font-medium tracking-[0.3em] uppercase">Le Lexique</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[10px] tracking-[0.25em] uppercase">5 Symboles</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-8">
          <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* LEFT SIDE - Navigation verticale */}
            <div className="lg:w-1/4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {symbols.map((symbol, index) => (
                <button
                  key={symbol.name}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 lg:flex-shrink group transition-all duration-500 ${
                    activeIndex === index ? '' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Numéro */}
                    <div className={`w-12 h-12 border flex items-center justify-center transition-all duration-500 ${
                      activeIndex === index 
                        ? 'border-bronze bg-bronze/5' 
                        : 'border-dark-text/10'
                    }`}>
                      <span className={`font-sans text-lg font-bold transition-colors duration-500 ${
                        activeIndex === index ? 'text-bronze' : 'text-dark-text/30'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Texte */}
                    <div className="text-left hidden lg:block">
                      <p className={`font-sans text-xs tracking-[0.2em] uppercase mb-1 transition-colors duration-500 ${
                        activeIndex === index ? 'text-bronze' : 'text-dark-text/40'
                      }`}>
                        {symbol.subtitle}
                      </p>
                      <p className={`font-display text-xl font-bold transition-colors duration-500 ${
                        activeIndex === index ? 'text-dark-text' : 'text-dark-text/50'
                      }`}>
                        {symbol.name}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* CENTER/RIGHT - Symbole actif */}
            <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* Image du symbole - Grande et centrale */}
              <div className="flex-1 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="relative w-full max-w-lg aspect-square"
                  >
                    {/* Cadre décoratif extérieur */}
                    <div className="absolute -inset-8 border border-bronze/10" />
                    
                    {/* Container image */}
                    <div className="relative w-full h-full border-2 border-bronze/30 bg-white/5 overflow-hidden">
                      <img 
                        src={symbols[activeIndex].image} 
                        alt={symbols[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Petit accent en coin */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-bronze" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-bronze" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Texte descriptif */}
              <div className="lg:w-2/5 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1
                    }}
                    className="space-y-6"
                  >
                    {/* Numéro + total */}
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold">
                        Symbole {activeIndex + 1}
                      </span>
                      <div className="w-8 h-px bg-bronze/30" />
                      <span className="font-sans text-dark-text/40 text-xs tracking-[0.2em] uppercase">
                        / 5
                      </span>
                    </div>

                    {/* Nom */}
                    <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-dark-text font-bold leading-[0.95]">
                      {symbols[activeIndex].name}
                    </h3>

                    {/* Sous-titre */}
                    <p className="font-sans text-bronze text-sm tracking-[0.3em] uppercase">
                      {symbols[activeIndex].subtitle}
                    </p>

                    {/* Description */}
                    <div className="border-l-2 border-bronze/30 pl-6">
                      <p className="font-sans text-lg md:text-xl text-dark-text/80 font-light leading-[1.7]">
                        {symbols[activeIndex].description}
                      </p>
                    </div>

                    {/* Citation */}
                    <div className="pt-4 border-t border-dark-text/10">
                      <p className="font-sans text-dark-text/50 text-sm italic">
                        Chaque symbole est gravé dans le métal. Une promesse éternelle.
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 pb-6 md:pb-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-dark-text/10 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-dark-text text-xl md:text-2xl font-light">04</span>
                <span className="font-sans text-dark-text/30 text-sm">/</span>
                <span className="font-sans text-dark-text/40 text-sm">08</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-12 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-dark-text/20 text-[9px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}