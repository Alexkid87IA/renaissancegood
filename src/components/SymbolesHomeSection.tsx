import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const symbols = [
  {
    name: 'Le Trident',
    subtitle: 'Souveraineté',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763855099/WhatsApp_Image_2025-11-21_at_16.20.29_luvmkv.jpg'
  },
  {
    name: 'La Fleur de Lys',
    subtitle: 'Excellence',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_4_xntepe.jpg'
  },
  {
    name: 'Le Cobra',
    subtitle: 'Protection',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_3_zmql9v.jpg'
  },
  {
    name: "L'Ankh",
    subtitle: 'Éternité',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_fpklnf.jpg'
  },
  {
    name: 'Le Scarabée',
    subtitle: 'Renaissance',
    image: 'https://res.cloudinary.com/dafo6bvhc/image/upload/v1763850148/WhatsApp_Image_2025-11-21_at_16.19.41_2_tp1ac1.jpg'
  }
];

export default function SymbolesHomeSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <p className="font-sans text-[#8B7355] text-[9px] tracking-[0.35em] uppercase mb-6 font-bold">
            Nos Symboles
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#2C2C2C] tracking-tight leading-[0.95] mb-6">
            Cinq Symboles,<br />
            Une Signature Éternelle.
          </h2>
          <p className="font-sans text-[#2C2C2C]/60 text-base md:text-lg leading-[1.7] max-w-2xl mx-auto">
            Gravés dans le métal, ces symboles millénaires incarnent les valeurs de Renaissance.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
          {symbols.map((symbol, index) => (
            <motion.div
              key={symbol.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="aspect-square relative overflow-hidden border-2 border-[#8B7355]/20 hover:border-[#8B7355] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3EF] to-white" />

                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img
                    src={symbol.image}
                    alt={symbol.name}
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-sans text-white text-xs tracking-[0.25em] uppercase font-bold mb-1">
                    {symbol.subtitle}
                  </p>
                  <p className="font-display text-white text-sm font-bold">
                    {symbol.name}
                  </p>
                </div>
              </div>

              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            className="group relative inline-flex items-center gap-3 border-2 border-[#2C2C2C] px-10 py-4 font-sans text-[10px] tracking-[0.3em] uppercase text-[#2C2C2C] font-bold overflow-hidden hover:border-[#8B7355] transition-all duration-500"
          >
            <span className="absolute inset-0 bg-[#8B7355] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Découvrir leur histoire
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
