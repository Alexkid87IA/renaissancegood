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
    <section className="py-20 sm:py-24 md:py-32 laptop:py-40 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 laptop:px-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-bronze font-bold mb-4 sm:mb-6">
            Nos Ambassadeurs
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl laptop:text-7xl font-bold text-dark-text mb-6 sm:mb-8 leading-[1.1]">
            Ils portent Renaissance
          </h2>
          <p className="font-sans text-dark-text/60 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Des personnalités qui incarnent l'élégance, la créativité et l'excellence à la française.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-6">
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
          className="text-center mt-16 sm:mt-20"
        >
          <p className="font-sans text-dark-text/50 text-sm italic max-w-2xl mx-auto leading-relaxed">
            Ces portraits célèbrent l'alliance entre l'artisanat d'exception et les visages qui font rayonner
            la culture française à travers le monde.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
