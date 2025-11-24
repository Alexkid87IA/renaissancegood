import { motion } from 'framer-motion';

const ambassadors = [
  {
    name: 'Sophie Marceau',
    role: 'Actrice & Réalisatrice',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200',
    collection: 'Collection Héritage'
  },
  {
    name: 'Omar Sy',
    role: 'Acteur & Producteur',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200',
    collection: 'Collection Versailles'
  },
  {
    name: 'Léa Seydoux',
    role: 'Actrice',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    collection: 'Collection Isis'
  },
  {
    name: 'Vincent Cassel',
    role: 'Acteur',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1200',
    collection: 'Collection Héritage'
  },
  {
    name: 'Marion Cotillard',
    role: 'Actrice',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1200',
    collection: 'Collection Versailles'
  }
];

export default function AmbassadeursSection() {
  return (
    <section className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-[80] bg-white overflow-hidden">
      <div className="h-full w-full relative flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-beige/10" />

        <div className="relative z-10 pt-8 md:pt-12 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">08</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-xs font-medium tracking-[0.3em] uppercase">Ambassadeurs</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[10px] tracking-[0.25em] uppercase">Ils portent Renaissance</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-8 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1600px] mx-auto w-full">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl laptop:text-7xl font-bold text-dark-text mb-4 sm:mb-6 leading-[1.1]">
                Ils portent Renaissance
              </h2>
              <p className="font-sans text-dark-text/60 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                Des personnalités qui incarnent l'élégance, la créativité et l'excellence à la française.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-6 mb-10">
              {ambassadors.map((ambassador, index) => (
                <motion.div
                  key={ambassador.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-beige mb-4">
                    <img
                      src={ambassador.image}
                      alt={ambassador.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-text/80 via-dark-text/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/80 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {ambassador.collection}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-dark-text mb-1">
                      {ambassador.name}
                    </h3>
                    <p className="font-sans text-sm text-dark-text/60">
                      {ambassador.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <p className="font-sans text-dark-text/50 text-sm italic max-w-2xl mx-auto leading-relaxed">
                Ces portraits célèbrent l'alliance entre l'artisanat d'exception et les visages qui font rayonner
                la culture française à travers le monde.
              </p>
            </motion.div>

          </div>
        </div>

        <div className="relative z-10 pb-6 md:pb-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-dark-text/10 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-dark-text text-xl md:text-2xl font-light">08</span>
                <span className="font-sans text-dark-text/30 text-sm">/</span>
                <span className="font-sans text-dark-text/40 text-sm">09</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-12 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
