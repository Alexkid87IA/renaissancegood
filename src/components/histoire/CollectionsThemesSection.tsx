import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const collections = [
  {
    name: 'Les Origines',
    description: 'Là où tout commence. Les stries. La signature.',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1764956302/1d248e53-314b-475b-abd6-d43943737b7b_janoci.jpg'
  },
  {
    name: 'Héritage',
    description: 'Le Trident. Ce qu\'on transmet.',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1764956302/1d248e53-314b-475b-abd6-d43943737b7b_janoci.jpg'
  },
  {
    name: 'Versailles',
    description: 'La Fleur de Lys. Ce qu\'on bâtit.',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1764956302/1d248e53-314b-475b-abd6-d43943737b7b_janoci.jpg'
  },
  {
    name: 'Isis',
    description: 'L\'Ankh, le Scarabée, l\'Œil. Ce qui traverse 5 000 ans.',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1764956302/1d248e53-314b-475b-abd6-d43943737b7b_janoci.jpg'
  }
];

export default function CollectionsThemesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:sticky lg:top-0 z-[60] bg-beige overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-beige to-beige/95" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        <div className="relative z-10 pt-24 md:pt-28 lg:pt-32 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-bronze text-[0.65rem] font-bold tracking-[0.4em] uppercase">06</span>
              <div className="w-5 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-[0.55rem] font-medium tracking-[0.3em] uppercase">Les Collections</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[7px] tracking-[0.25em] uppercase">4 Collections</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-8 lg:px-12 py-8">
          <div className="max-w-[1400px] mx-auto w-full">
            <div className="text-center mb-12 lg:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-text tracking-[-0.03em] leading-[1.05] mb-4"
              >
                Une maison. Quatre collections. Zéro hasard.
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 xl:gap-6 mb-12">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative border border-bronze/30 bg-gradient-to-br from-dark-text/[0.02] to-transparent hover:border-bronze hover:bg-dark-text/[0.03] transition-all duration-500 group"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-bronze via-bronze/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-5 lg:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 border border-bronze/40 flex items-center justify-center group-hover:border-bronze group-hover:bg-bronze/10 transition-all duration-500">
                        <span className="font-sans text-sm text-bronze font-bold">{index + 1}</span>
                      </div>
                      <h3 className="font-sans text-dark-text text-base lg:text-lg tracking-[0.1em] uppercase font-bold group-hover:text-bronze transition-colors duration-500">
                        {collection.name}
                      </h3>
                    </div>
                    <p className="font-sans text-dark-text/60 text-xs lg:text-sm font-light leading-[1.65] group-hover:text-dark-text/80 transition-colors duration-500">
                      {collection.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-bronze/20 group-hover:border-bronze transition-colors duration-500" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center"
            >
              <p className="font-sans text-dark-text/70 text-base md:text-lg lg:text-xl font-light leading-[1.7] italic">
                On ne collectionne pas les modèles. On collectionne les symboles.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 pb-6 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto border-t border-dark-text/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-dark-text text-base md:text-lg font-light">06</span>
                <span className="font-sans text-dark-text/30 text-xs">/</span>
                <span className="font-sans text-dark-text/40 text-xs">09</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
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