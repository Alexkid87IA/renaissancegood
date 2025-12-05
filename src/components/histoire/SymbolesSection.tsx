import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const symbols = [
  {
    name: 'Le Trident',
    subtitle: 'Souveraineté',
    description: "Dans la mythologie grecque, le Trident est l'arme de Poséidon, dieu des mers. Forgé par les Cyclopes, il lui donnait le pouvoir de déchaîner les tempêtes ou de les calmer. Créer ou détruire. D'un seul coup. Les trois pointes représentent les trois temps : passé, présent, futur. Chez Renaissance, c'est la même idée. Ce qu'on a reçu. Ce qu'on porte. Ce qu'on transmet.",
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763855099/WhatsApp_Image_2025-11-21_at_16.20.29_luvmkv.jpg'
  },
  {
    name: 'La Fleur de Lys',
    subtitle: 'Excellence',
    description: "En 496, le roi Clovis reçoit trois fleurs de lys lors de son baptême. Selon la légende, un ange les lui remet. Elles représentent la Trinité : le Père, le Fils, le Saint-Esprit. Et les trois vertus : Foi, Espérance, Charité. Depuis, c'est le symbole des rois de France. Pas un ornement. Une mission. On l'a choisi pour ceux qui construisent. Pas pour ceux qui héritent sans rien faire.",
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_4_xntepe.jpg'
  },
  {
    name: "L'Ankh",
    subtitle: 'Éternité',
    description: "En Égypte ancienne, l'Ankh est le hiéroglyphe qui signifie \"vie\". Les dieux la tenaient dans leurs mains. Ils la plaçaient sous le nez des pharaons pour leur insuffler le souffle éternel. C'était la clé. Pas d'une porte. De l'au-delà. Les pharaons la portaient pour traverser la mort. Elle est toujours là. Eux non.",
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_fpklnf.jpg'
  },
  {
    name: 'Le Scarabée',
    subtitle: 'Renaissance',
    description: "Chaque matin, le scarabée égyptien roule une boule de terre vers la lumière. Les Égyptiens y ont vu le soleil qui renaît à l'aube. Ils en ont fait un dieu : Khépri. Son nom signifie \"celui qui vient à l'existence\". Symbole de renaissance. De transformation. De ce qui revient toujours. On l'a gardé pour la même raison. Renaître. Chaque jour.",
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_2_tp1ac1.jpg'
  },
  {
    name: "L'Œil d'Horus",
    subtitle: 'Vision',
    description: "Horus, fils d'Osiris, affronte son oncle Seth pour venger le meurtre de son père. Le combat dure 80 ans. Seth lui arrache l'œil gauche et le brise en six morceaux. Thot, dieu de la sagesse, le reconstitue et le rend intact. L'Œil d'Horus devient le symbole de ce qui se répare. De ce qui voit au-delà. De la victoire du bien sur le chaos. On le porte pour voir ce que les autres ignorent.",
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
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-40 bg-beige overflow-hidden"
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
        <div className="relative z-10 pt-3 md:pt-4 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-bronze text-[0.65rem] font-bold tracking-[0.4em] uppercase">04</span>
              <div className="w-5 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-[0.55rem] font-medium tracking-[0.3em] uppercase">Le Lexique</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[7px] tracking-[0.25em] uppercase">5 Symboles</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-8 lg:px-12 py-4">
          <div className="max-w-[1600px] mx-auto w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-8">

            {/* LEFT SIDE - Navigation verticale */}
            <div className="lg:w-1/4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0">
              {symbols.map((symbol, index) => (
                <motion.button
                  key={symbol.name}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`flex-shrink-0 lg:flex-shrink group transition-all duration-500 relative ${
                    activeIndex === index ? '' : 'opacity-40 hover:opacity-70'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Indicateur actif */}
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeSymbol"
                      className="absolute inset-0 border border-bronze bg-bronze/5"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-2.5 relative z-10 p-2">
                    {/* Numéro avec bordure dorée */}
                    <div className={`w-10 h-10 border flex items-center justify-center transition-all duration-500 relative overflow-hidden ${
                      activeIndex === index
                        ? 'border-bronze'
                        : 'border-dark-text/10 group-hover:border-bronze/50'
                    }`}>
                      <span className={`font-sans text-sm font-bold transition-colors duration-500 relative z-10 ${
                        activeIndex === index ? 'text-bronze' : 'text-dark-text/30 group-hover:text-bronze/70'
                      }`}>
                        {index + 1}
                      </span>
                      {/* Effet de remplissage au survol */}
                      <div className="absolute inset-0 bg-bronze/10 scale-0 group-hover:scale-100 transition-transform duration-500" />
                    </div>

                    {/* Texte */}
                    <div className="text-left hidden lg:block">
                      <p className={`font-sans text-[0.5rem] tracking-[0.3em] uppercase mb-1 transition-colors duration-500 ${
                        activeIndex === index ? 'text-bronze font-bold' : 'text-dark-text/40 group-hover:text-bronze/70'
                      }`}>
                        {symbol.subtitle}
                      </p>
                      <p className={`font-display text-base font-bold transition-colors duration-500 leading-tight ${
                        activeIndex === index ? 'text-dark-text' : 'text-dark-text/50 group-hover:text-dark-text/70'
                      }`}>
                        {symbol.name}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* CENTER/RIGHT - Symbole actif */}
            <div className="flex-1 flex flex-col lg:flex-row items-center gap-4 lg:gap-6">

              {/* Image du symbole - Grande et centrale */}
              <div className="flex-1 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotateY: 20 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="relative w-full max-w-md aspect-square"
                  >
                    {/* Cadre décoratif extérieur animé */}
                    <motion.div
                      className="absolute -inset-4 border border-bronze/20"
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Container image avec effets */}
                    <div className="relative w-full h-full border-2 border-bronze/40 bg-gradient-to-br from-white/10 to-bronze/5 overflow-hidden group">
                      {/* Effet de lumière qui traverse */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut"
                        }}
                      />

                      <img
                        src={symbols[activeIndex].image}
                        alt={symbols[activeIndex].name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay dégradé pour plus de profondeur */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 via-transparent to-transparent" />
                    </div>

                    {/* Coins décoratifs plus imposants */}
                    <motion.div
                      className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-bronze"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-bronze"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />

                    {/* Petits accents aux autres coins */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-bronze/50" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-bronze/50" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Texte descriptif */}
              <div className="lg:w-2/5 space-y-3">
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
                    className="space-y-3"
                  >
                    {/* Numéro + total */}
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-bronze text-[0.55rem] tracking-[0.3em] uppercase font-bold">
                        Symbole {activeIndex + 1}
                      </span>
                      <div className="w-5 h-px bg-bronze/30" />
                      <span className="font-sans text-dark-text/40 text-[0.55rem] tracking-[0.2em] uppercase">
                        / 5
                      </span>
                    </div>

                    {/* Nom avec effet de révélation */}
                    <motion.h3
                      className="font-display text-2xl md:text-3xl lg:text-[2.5rem] text-dark-text font-bold leading-[1.05] mb-1.5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {symbols[activeIndex].name}
                    </motion.h3>

                    {/* Sous-titre avec ligne décorative */}
                    <motion.div
                      className="flex items-center gap-2.5 mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <div className="h-px w-8 bg-gradient-to-r from-bronze to-transparent" />
                      <p className="font-sans text-bronze text-[0.6rem] tracking-[0.35em] uppercase font-bold">
                        {symbols[activeIndex].subtitle}
                      </p>
                    </motion.div>

                    {/* Description avec bordure dorée imposante */}
                    <motion.div
                      className="border-l-2 border-bronze pl-3 py-2 bg-gradient-to-r from-bronze/5 to-transparent"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <p className="font-sans text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] text-dark-text/90 font-light leading-[1.6]">
                        {symbols[activeIndex].description}
                      </p>
                    </motion.div>

                    {/* Citation avec effet premium */}
                    <motion.div
                      className="pt-3 mt-3 border-t border-bronze/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-bronze via-bronze/50 to-transparent flex-shrink-0" />
                        <p className="font-sans text-dark-text/70 text-[0.65rem] md:text-[0.7rem] italic leading-relaxed">
                          Chaque symbole est gravé au laser dans le métal. Une promesse éternelle qui traverse les générations.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 pb-3 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto border-t border-dark-text/10 pt-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-dark-text text-[0.95rem] md:text-[1.1rem] font-light">04</span>
                <span className="font-sans text-dark-text/30 text-[0.65rem]">/</span>
                <span className="font-sans text-dark-text/40 text-[0.65rem]">08</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-7 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[6px] tracking-[0.4em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-dark-text/20 text-[6px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}