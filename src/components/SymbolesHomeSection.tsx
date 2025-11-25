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
    <section className="relative z-[95] py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16 lg:mb-24"
        >
          <p className="font-sans text-[#8B7355] text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.35em] uppercase mb-3 md:mb-4 lg:mb-6 font-bold">
            Nos Symboles
          </p>
          <h2 className="font-display text-2xl md:text-4xl lg:text-7xl font-bold text-[#2C2C2C] tracking-tight leading-[1.2] lg:leading-[0.95] mb-3 md:mb-4 lg:mb-6">
            Cinq Symboles,<br />
            Une Signature Éternelle.
          </h2>
          <p className="font-sans text-[#2C2C2C]/60 text-xs md:text-sm lg:text-lg leading-[1.6] lg:leading-[1.7] max-w-2xl mx-auto">
            Gravés dans le métal, ces symboles millénaires incarnent les valeurs de Renaissance.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-10 lg:mb-12">
          {symbols.map((symbol, index) => (
            <motion.div
              key={symbol.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative w-[calc(50%-6px)] md:w-[calc(33.333%-11px)] lg:w-[calc(20%-19.2px)]"
            >
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#F5F3EF] to-white border-2 border-[#8B7355]/10 hover:border-[#8B7355] transition-all duration-500">

                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-5 lg:p-8">
                  <img
                    src={symbol.image}
                    alt={symbol.name}
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#2C2C2C] to-transparent">
                  <p className="font-sans text-[#8B7355] text-[7px] md:text-[8px] lg:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase font-bold mb-0.5 md:mb-1">
                    {symbol.subtitle}
                  </p>
                  <p className="font-display text-white text-xs md:text-sm lg:text-base font-bold">
                    {symbol.name}
                  </p>
                </div>
              </div>

              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            className="group relative inline-flex items-center justify-center gap-3 border-2 border-[#2C2C2C] px-8 md:px-10 py-3 md:py-4 font-sans text-[8px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase text-[#2C2C2C] font-bold overflow-hidden hover:border-[#8B7355] transition-all duration-500 w-auto"
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
