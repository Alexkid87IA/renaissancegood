import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const ambassadors = [
  {
    name: 'Sophie Marceau',
    role: 'Actrice & Réalisatrice',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800',
    collection: 'Collection Héritage'
  },
  {
    name: 'Omar Sy',
    role: 'Acteur & Producteur',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    collection: 'Collection Versailles'
  },
  {
    name: 'Léa Seydoux',
    role: 'Actrice',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    collection: 'Collection Isis'
  },
  {
    name: 'Vincent Cassel',
    role: 'Acteur',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800',
    collection: 'Collection Héritage'
  },
  {
    name: 'Marion Cotillard',
    role: 'Actrice',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
    collection: 'Collection Versailles'
  }
];

export default function AmbassadorsHomeSection() {
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
      className="min-h-screen laptop:h-screen sticky top-0 z-[60] bg-beige"
    >
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-beige to-white/30" />

        <div className="relative h-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:mx-6">
          <div className="max-w-[1800px] w-full">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16 lg:mb-20"
            >
              <p className="font-sans text-bronze text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
                Ambassadeurs
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-6">
                NOS<br />AMBASSADEURS
              </h2>
              <p className="font-sans text-dark-text/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Des personnalités qui incarnent l'excellence et l'élégance intemporelle de Renaissance.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12 md:mb-16">
              {ambassadors.map((ambassador, index) => (
                <motion.div
                  key={ambassador.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <img
                      src={ambassador.image}
                      alt={ambassador.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-text/70 via-dark-text/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {ambassador.collection}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="font-display text-lg md:text-xl font-bold text-dark-text mb-1">
                      {ambassador.name}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-dark-text/60">
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
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center"
            >
              <Link to="/histoire">
                <button className="border-2 border-dark-text/20 text-dark-text px-8 md:px-10 py-4 md:py-5 font-sans text-[9px] tracking-[0.25em] font-bold hover:bg-dark-text hover:text-white hover:border-dark-text transition-all duration-500 hover:scale-[1.02]">
                  DÉCOUVRIR NOS AMBASSADEURS
                </button>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
