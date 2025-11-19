import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const symbols = [
  {
    name: 'Le Trident',
    description: 'Souveraineté et maîtrise. Trois pointes, trois dimensions : force, vision, justesse.',
    image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: "L'Ankh",
    description: "La clé de vie éternelle. Ce qu'on construit aujourd'hui doit traverser le temps.",
    image: 'https://images.pexels.com/photos/3077867/pexels-photo-3077867.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'La Fleur de Lys',
    description: "L'excellence héritée. Pureté du geste et exigence du détail.",
    image: 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Le Scarabée',
    description: 'La renaissance perpétuelle. Transformation et renouveau constant.',
    image: 'https://images.pexels.com/photos/5912320/pexels-photo-5912320.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Le Cobra',
    description: 'La protection vigilante. Élégant et puissant. Présence affirmée, force contenue.',
    image: 'https://images.pexels.com/photos/34426/snake-rainbow-boa-reptile-scale.jpg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function SymbolesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
      className="min-h-screen sticky top-0 z-40 bg-dark-text"
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-20">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl laptop:text-5xl xl:text-6xl font-bold text-white mb-6 tracking-[-0.03em] leading-[1.1]">
              Les Symboles
            </h2>
            <p className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold mb-6">
              Le Lexique
            </p>
            <p className="font-sans text-white/70 text-lg md:text-xl leading-[1.8] font-light max-w-2xl mx-auto">
              Chaque symbole porte un sens, une histoire, une promesse.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {symbols.map((symbol, index) => (
              <motion.div
                key={symbol.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <img
                  src={symbol.image}
                  alt={symbol.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className={`absolute inset-0 bg-dark-text/90 transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <h3 className="font-display text-2xl md:text-3xl text-white mb-4 tracking-wide">
                      {symbol.name}
                    </h3>
                    <p className="font-sans text-white/80 text-sm md:text-base leading-[1.7] font-light">
                      {symbol.description}
                    </p>
                  </div>
                </div>

                <div className={`absolute inset-0 border-2 border-bronze/0 transition-all duration-500 ${
                  hoveredIndex === index ? 'border-bronze/50' : ''
                }`} />

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-text to-transparent">
                  <p className="font-sans text-white text-sm md:text-base tracking-[0.15em] uppercase font-medium">
                    {symbol.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
