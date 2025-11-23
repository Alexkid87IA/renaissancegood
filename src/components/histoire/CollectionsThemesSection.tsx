import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const collections = [
  {
    name: 'Héritage',
    symbol: 'Le Trident',
    description: 'Souveraineté et maîtrise. La collection qui incarne la puissance française.',
    edition: '100-300 pièces',
    link: '/collections/heritage'
  },
  {
    name: 'Versailles',
    symbol: 'La Fleur de Lys',
    description: "L'excellence héritée. L'opulence et le raffinement du château.",
    edition: '100-300 pièces',
    link: '/collections/versailles'
  },
  {
    name: 'Isis',
    symbol: 'Ankh • Scarabée • Cobra',
    description: 'La renaissance perpétuelle. Collection en développement.',
    edition: 'Bientôt',
    link: null
  }
];

export default function CollectionsThemesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: false,
    amount: 0.1,
    margin: "0px 0px -10% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="h-screen sticky top-0 z-[60] bg-beige overflow-hidden"
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

        <div className="relative z-10 pt-8 md:pt-12 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">06</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-xs font-medium tracking-[0.3em] uppercase">Les Collections</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[10px] tracking-[0.25em] uppercase">3 Thèmes</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-12">
          <div className="max-w-[1800px] mx-auto w-full">
            <div className="mb-10">
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-6">
                LES COLLECTIONS.
              </h2>
              <p className="font-sans text-xl md:text-2xl text-dark-text/70 font-light leading-[1.5] max-w-2xl">
                Nos collections ne suivent pas les saisons. Elles sont structurées par thèmes symboliques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collections.map((collection, index) => {
                const content = (
                  <div className="border border-bronze/20 bg-dark-text/[0.02] p-8 h-full hover:border-bronze transition-all duration-300">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold">
                          {collection.edition}
                        </span>
                        {!collection.link && (
                          <span className="font-sans text-dark-text/40 text-xs tracking-[0.2em] uppercase">
                            Bientôt
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-4xl md:text-5xl text-dark-text font-bold">
                        {collection.name}
                      </h3>
                      <p className="font-sans text-bronze text-xs tracking-[0.2em] uppercase">
                        {collection.symbol}
                      </p>
                      <p className="font-sans text-dark-text/70 text-base font-light leading-[1.7]">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                );

                return collection.link ? (
                  <Link key={collection.name} to={collection.link}>
                    {content}
                  </Link>
                ) : (
                  <div key={collection.name}>{content}</div>
                );
              })}
            </div>

            <div className="mt-10 border-t border-dark-text/10 pt-8">
              <p className="font-sans text-dark-text/70 text-lg font-light leading-[1.7] italic text-center">
                La rareté n'est pas une stratégie marketing. C'est un engagement.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6 md:pb-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-dark-text/10 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-dark-text text-xl md:text-2xl font-light">06</span>
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