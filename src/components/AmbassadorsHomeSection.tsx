import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const celebrities = [
  {
    name: 'SDM',
    role: 'Artiste',
    model: 'Héritage XXXVIII',
    image: 'https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=800',
  },
  {
    name: 'Artiste 2',
    role: 'Acteur',
    model: 'Versailles I',
    image: 'https://26.staticbtf.eno.do/v1/93-default/6ffd0541cdb16d2fcd844d1d0db54334/media.jpg',
  },
  {
    name: 'Artiste 3',
    role: 'Créateur',
    model: 'Héritage XXXXIV',
    image: 'https://26.staticbtf.eno.do/v1/92-default/3272c50bae44f63ac7a7f3d1dfdba07d/media.jpg',
  },
  {
    name: 'Artiste 4',
    role: 'Musicien',
    model: 'Versailles II',
    image: 'https://26.staticbtf.eno.do/v1/91-default/80de95ed4756e81d2e731b5faff6c051/media.jpg',
  }
];

export default function AmbassadorsHomeSection() {
  return (
    <section className="h-screen sticky top-0 z-[75] bg-[#0a0a0a] flex flex-col">
      
      {/* Header */}
      <div className="pt-20 md:pt-24 lg:pt-28 px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.9]">
            ILS PORTENT{' '}
            <span className="text-bronze">RENAISSANCE.</span>
          </h2>
        </motion.div>
      </div>

      {/* Grid - Prend l'espace restant */}
      <div className="flex-1 flex items-center px-5 md:px-10 lg:px-16 py-8 md:py-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
            {celebrities.map((celeb, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden bg-[#111]"
              >
                {/* Image */}
                <img
                  src={celeb.image}
                  alt={celeb.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Border */}
                <div className="absolute inset-0 border border-white/10 group-hover:border-bronze/50 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <p className="font-sans text-bronze/80 text-[8px] md:text-[9px] tracking-[0.2em] uppercase mb-1">
                    {celeb.model}
                  </p>
                  <h3 className="font-display text-lg md:text-xl lg:text-2xl text-white font-bold leading-tight">
                    {celeb.name}
                  </h3>
                  <p className="font-sans text-white/50 text-xs md:text-sm">
                    {celeb.role}
                  </p>
                </div>

                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-bronze scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pb-8 md:pb-12 lg:pb-16 px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="https://www.instagram.com/renaissanceeyewear"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-white/20 hover:border-bronze/50 px-5 py-3 transition-all duration-300"
          >
            <Instagram className="w-4 h-4 text-white/60 group-hover:text-bronze transition-colors" />
            <span className="font-sans text-white text-[10px] tracking-[0.2em] uppercase">
              @renaissanceeyewear
            </span>
          </a>
          
          <span className="font-sans text-white/30 text-xs hidden sm:block">
            Rejoignez ceux qui transmettent
          </span>
        </motion.div>
      </div>
    </section>
  );
}