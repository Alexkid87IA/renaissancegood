import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { X } from 'lucide-react';

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

export default function SymbolesHomeSection() {
  const navigate = useNavigate();
  const [selectedSymbol, setSelectedSymbol] = useState<number | null>(null);

  return (
    <section className="relative z-[95] py-16 laptop:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-4 laptop:px-8 md:px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 laptop:mb-14 md:mb-16 lg:mb-24"
        >
          <p className="font-sans text-[#8B7355] text-[8px] laptop:text-[10px] md:text-[9px] tracking-[0.3em] md:tracking-[0.35em] uppercase mb-3 laptop:mb-5 md:mb-4 lg:mb-6 font-bold">
            Nos Symboles
          </p>
          <h2 className="font-display text-2xl laptop:text-5xl md:text-4xl lg:text-7xl font-bold text-[#2C2C2C] tracking-tight leading-[1.2] lg:leading-[0.95] mb-3 laptop:mb-5 md:mb-4 lg:mb-6">
            Cinq Symboles,<br />
            Une Signature Éternelle.
          </h2>
          <p className="font-sans text-[#2C2C2C]/60 text-xs laptop:text-sm md:text-sm lg:text-lg leading-[1.6] lg:leading-[1.7] max-w-2xl mx-auto">
            Gravés dans le métal, ces symboles millénaires incarnent les valeurs de Renaissance.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 laptop:gap-5 md:gap-4 lg:gap-6 mb-8 laptop:mb-10 md:mb-10 lg:mb-12">
          {symbols.map((symbol, index) => (
            <motion.div
              key={symbol.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedSymbol(index)}
              className="group relative w-[calc(50%-6px)] laptop:w-[calc(33.333%-13px)] md:w-[calc(33.333%-11px)] lg:w-[calc(20%-19.2px)] cursor-pointer"
            >
              <div className="aspect-square relative overflow-hidden bg-[#1a1a1a] border-[3px] laptop:border-4 border-[#8B7355]/30 hover:border-[#8B7355] transition-all duration-500 shadow-lg hover:shadow-2xl">

                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOEI3MzU1IiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

                <div className="absolute inset-0 p-1">
                  <img
                    src={symbol.image}
                    alt={symbol.name}
                    className="w-full h-full object-cover filter brightness-110 group-hover:brightness-125 group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 laptop:p-6 md:p-5 lg:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                  <p className="font-sans text-[#8B7355] text-[9px] laptop:text-[11px] md:text-[10px] lg:text-xs tracking-[0.3em] uppercase font-bold mb-1 laptop:mb-1.5 md:mb-1.5 drop-shadow-lg">
                    {symbol.subtitle}
                  </p>
                  <p className="font-display text-white text-sm laptop:text-lg md:text-base lg:text-lg font-bold drop-shadow-lg">
                    {symbol.name}
                  </p>
                </div>
              </div>

              <div className="absolute -top-1.5 laptop:-top-2 -left-1.5 laptop:-left-2 w-4 laptop:w-5 h-4 laptop:h-5 border-t-[2px] laptop:border-t-[3px] border-l-[2px] laptop:border-l-[3px] border-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-1.5 laptop:-bottom-2 -right-1.5 laptop:-right-2 w-4 laptop:w-5 h-4 laptop:h-5 border-b-[2px] laptop:border-b-[3px] border-r-[2px] laptop:border-r-[3px] border-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/histoire')}
            className="group relative inline-flex items-center justify-center gap-3 border-2 border-[#2C2C2C] px-8 laptop:px-10 md:px-10 py-3 laptop:py-4 md:py-4 font-sans text-[8px] laptop:text-[10px] md:text-[10px] tracking-[0.25em] laptop:tracking-[0.3em] md:tracking-[0.3em] uppercase text-[#2C2C2C] font-bold overflow-hidden hover:border-[#8B7355] transition-all duration-500 w-auto"
          >
            <span className="absolute inset-0 bg-[#8B7355] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500 whitespace-nowrap">
              Découvrir leur histoire
            </span>
          </button>
        </motion.div>

      </div>

      <AnimatePresence>
        {selectedSymbol !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSymbol(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full md:max-w-4xl bg-beige md:border-4 border-[#8B7355] shadow-2xl rounded-t-3xl md:rounded-none max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-20 bg-beige/95 backdrop-blur-sm md:hidden">
                <div className="flex items-center justify-center py-3">
                  <div className="w-12 h-1.5 bg-[#8B7355]/30 rounded-full" />
                </div>
              </div>

              <button
                onClick={() => setSelectedSymbol(null)}
                className="absolute top-16 right-4 z-10 w-10 h-10 bg-[#8B7355] hover:bg-[#6d5a44] text-white flex items-center justify-center transition-colors duration-300 md:top-4 md:right-4 md:w-12 md:h-12 md:border-2 md:border-beige rounded-full md:rounded-none shadow-lg"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative h-64 md:h-auto md:aspect-square bg-[#1a1a1a] border-b-2 md:border-b-0 md:border-r-4 border-[#8B7355]/30">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOEI3MzU1IiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                  <img
                    src={symbols[selectedSymbol].image}
                    alt={symbols[selectedSymbol].name}
                    className="w-full h-full object-contain md:object-cover p-6 md:p-8"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 md:from-black/60 via-transparent to-transparent" />
                </div>

                <div className="md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center space-y-4 md:space-y-6 pb-8">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="font-sans text-[#8B7355] text-[9px] md:text-xs tracking-[0.3em] md:tracking-[0.35em] uppercase font-bold mb-1.5 md:mb-3"
                    >
                      {symbols[selectedSymbol].subtitle}
                    </motion.p>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-[#2C2C2C] mb-3 md:mb-6 leading-tight"
                    >
                      {symbols[selectedSymbol].name}
                    </motion.h3>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border-l-3 md:border-l-4 border-[#8B7355] pl-3 md:pl-6 py-2 md:py-4 bg-gradient-to-r from-[#8B7355]/5 to-transparent"
                  >
                    <p className="font-sans text-sm md:text-xl text-[#2C2C2C]/90 font-light leading-[1.6] md:leading-[1.75]">
                      {symbols[selectedSymbol].description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="hidden md:block pt-6 mt-6 border-t-2 border-[#8B7355]/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-12 bg-gradient-to-b from-[#8B7355] via-[#8B7355]/50 to-transparent flex-shrink-0" />
                      <p className="font-sans text-[#2C2C2C]/70 text-base italic leading-relaxed">
                        Chaque symbole est gravé au laser dans le métal. Une promesse éternelle qui traverse les générations.
                      </p>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      setSelectedSymbol(null);
                      navigate('/histoire');
                    }}
                    className="group relative inline-flex items-center justify-center gap-3 border-2 border-[#2C2C2C] px-6 md:px-8 py-4 md:py-4 font-sans text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase text-[#2C2C2C] font-bold overflow-hidden hover:border-[#8B7355] active:scale-95 transition-all duration-300 w-full"
                  >
                    <span className="absolute inset-0 bg-[#8B7355] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                      Découvrir tous les symboles
                    </span>
                  </motion.button>
                </div>
              </div>

              <div className="hidden md:block absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-[#8B7355]" />
              <div className="hidden md:block absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-[#8B7355]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
