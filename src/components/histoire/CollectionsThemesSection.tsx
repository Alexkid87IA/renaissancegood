import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const collections = [
  {
    name: 'Héritage',
    symbol: 'Le Trident',
    description: 'Souveraineté et maîtrise. La collection qui incarne la puissance française.',
    edition: '100-300 pièces par référence',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=80',
    link: '/collections/heritage'
  },
  {
    name: 'Versailles',
    symbol: 'La Fleur de Lys',
    description: "L'excellence héritée. L'opulence et le raffinement du château.",
    edition: '100-300 pièces par référence',
    image: 'https://renaissanceeyewear.fr/cdn/shop/files/Renaissance_L_50_Cc1.jpg?v=1741186050&width=1200',
    link: '/collections/versailles'
  },
  {
    name: 'Isis',
    symbol: 'Ankh, Scarabée, Cobra',
    description: 'La renaissance perpétuelle. Collection en développement.',
    edition: 'Bientôt disponible',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80',
    link: null
  }
];

export default function CollectionsThemesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
      className="min-h-screen sticky top-0 z-[60] bg-dark-text"
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
              Les Collections
            </h2>
            <p className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold mb-6">
              Thèmes Symboliques
            </p>
            <p className="font-sans text-white/70 text-lg md:text-xl leading-[1.8] font-light max-w-3xl mx-auto">
              Nos collections ne suivent pas les saisons. Elles sont structurées par thèmes symboliques,
              avec des éditions limitées de 100 à 300 pièces par référence. La rareté n'est pas une stratégie marketing.
              C'est un engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group"
              >
                {collection.link ? (
                  <Link to={collection.link}>
                    <CollectionCard collection={collection} />
                  </Link>
                ) : (
                  <CollectionCard collection={collection} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function CollectionCard({ collection }: { collection: typeof collections[0] }) {
  return (
    <div className="relative overflow-hidden">
      <div className="aspect-[3/4] relative overflow-hidden bg-dark-text/40">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-text via-dark-text/40 to-transparent" />
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-display text-2xl md:text-3xl text-white tracking-wide">
          {collection.name}
        </h3>
        <p className="font-sans text-bronze text-xs tracking-[0.25em] uppercase font-bold">
          {collection.symbol}
        </p>
        <p className="font-sans text-white/70 text-sm md:text-base leading-[1.7] font-light">
          {collection.description}
        </p>
        <p className="font-sans text-white/50 text-xs tracking-[0.15em] uppercase font-medium">
          {collection.edition}
        </p>
      </div>
    </div>
  );
}
