import { motion, useInView } from 'framer-motion';
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
  },
  { 
    name: 'Le Cobra', 
    subtitle: 'Protection', 
    description: 'La protection vigilante. Élégant et puissant. Présence affirmée, force contenue.',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_3_zmql9v.jpg'
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
      className="min-h-screen lg:sticky lg:top-0 z-[40] relative bg-beige overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full relative flex flex-col"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-beige to-beige/95" />
        
        {/* Grid décoratif */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        {/* HEADER */}
        <div className="relative z-10 pt-6 md:pt-8 px-6 md:px-12 lg:px-16">
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

        {/* CONTENU PRINCIPAL */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-6 lg:py-4">
          <div className="max-w-[1800px] mx-auto w-full">
            
            {/* Titre */}
            <div className="mb-6 lg:mb-8">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-3">
                LES <span className="text-bronze">SYMBOLES.</span>
              </h2>
              <p className="font-sans text-base md:text-lg text-dark-text/70 font-light leading-[1.5] max-w-xl">
                Chaque symbole porte un sens, une histoire, une promesse.
              </p>
            </div>

            {/* Grid des symboles */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {symbols.map((symbol, index) => (
                <motion.div
                  key={symbol.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className={`group cursor-pointer ${activeIndex === index ? 'ring-2 ring-bronze' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="relative aspect-square overflow-hidden bg-dark-text/5 border border-dark-text/10 hover:border-bronze/50 transition-all duration-500">
                    <img
                      src={symbol.image}
                      alt={symbol.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-text/80 via-dark-text/20 to-transparent" />
                    
                    {/* Contenu overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                      <p className="font-sans text-bronze text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold mb-0.5">
                        {symbol.subtitle}
                      </p>
                      <h3 className="font-display text-white text-sm md:text-base lg:text-lg font-bold leading-tight">
                        {symbol.name}
                      </h3>
                    </div>

                    {/* Coins décoratifs */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-bronze/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-bronze/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description du symbole actif */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 lg:mt-8 border-l-2 border-bronze/50 pl-6 max-w-2xl"
            >
              <p className="font-display text-xl md:text-2xl text-dark-text font-light leading-relaxed">
                {symbols[activeIndex].description}
              </p>
            </motion.div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 pb-4 md:pb-6 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-dark-text/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-dark-text text-lg md:text-xl font-light">04</span>
                <span className="font-sans text-dark-text/30 text-sm">/</span>
                <span className="font-sans text-dark-text/40 text-sm">07</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[8px] tracking-[0.3em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-dark-text/20 text-[8px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}