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
    <section className="relative z-[95] py-16 laptop:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-4 laptop:px-8 md:px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 laptop:mb-14 md:mb-16 lg:mb-24"
        >
          <p className="font-sans text-[#8B7355] text-[8px] laptop:text-[10px] md:text-[9px] tracking-[0.3em] md:tracking-[0.35em] uppercase mb-3 laptop:mb-5 md:mb-4 lg:mb-6 font-bold">
            Nos Symboles
          </p>
          <h2 className="font-display text-2xl laptop:text-5xl md:text-4xl lg:text-7xl font-bold text-[#2C2C2C] tracking-tight leading-[1.2] lg:leading-[0.95] mb-3 laptop:mb-5 md:mb-4 lg:mb-6">
            Cinq Symboles,<br />
            Une Signature Éternelle.
          </h2>
          <p className="font-sans text-[#2C2C2C]/60 text-xs laptop:text-sm md:text-sm lg:text-lg leading-[1.6] lg:leading-[1.7] max-w-2xl mx-auto">
            Gravés dans le métal, ces symboles millénaires incarnent les valeurs de Renaissance.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 laptop:gap-5 md:gap-4 lg:gap-6 mb-8 laptop:mb-10 md:mb-10 lg:mb-12">
          {symbols.map((symbol, index) => (
            <motion.div
              key={symbol.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative w-[calc(50%-6px)] laptop:w-[calc(33.333%-13px)] md:w-[calc(33.333%-11px)] lg:w-[calc(20%-19.2px)]"
            >
              <div className="aspect-square relative overflow-hidden bg-[#1a1a1a] border-[3px] laptop:border-4 border-[#8B7355]/30 hover:border-[#8B7355] transition-all duration-500 shadow-lg hover:shadow-2xl">

                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOEI3MzU1IiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

                <div className="absolute inset-0 flex items-center justify-center p-6 laptop:p-10 md:p-8 lg:p-10">
                  <img
                    src={symbol.image}
                    alt={symbol.name}
                    className="w-full h-full object-contain filter brightness-110 group-hover:brightness-125 group-hover:scale-110 transition-all duration-700 drop-shadow-2xl"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 laptop:p-6 md:p-5 lg:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                  <p className="font-sans text-[#8B7355] text-[9px] laptop:text-[11px] md:text-[10px] lg:text-xs tracking-[0.3em] uppercase font-bold mb-1 laptop:mb-1.5 md:mb-1.5 drop-shadow-lg">
                    {symbol.subtitle}
                  </p>
                  <p className="font-display text-white text-sm laptop:text-lg md:text-base lg:text-lg font-bold drop-shadow-lg">
                    {symbol.name}
                  </p>
                </div>
              </div>

              <div className="absolute -top-1.5 laptop:-top-2 -left-1.5 laptop:-left-2 w-4 laptop:w-5 h-4 laptop:h-5 border-t-[2px] laptop:border-t-[3px] border-l-[2px] laptop:border-l-[3px] border-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-1.5 laptop:-bottom-2 -right-1.5 laptop:-right-2 w-4 laptop:w-5 h-4 laptop:h-5 border-b-[2px] laptop:border-b-[3px] border-r-[2px] laptop:border-r-[3px] border-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            className="group relative inline-flex items-center justify-center gap-3 border-2 border-[#2C2C2C] px-8 laptop:px-10 md:px-10 py-3 laptop:py-4 md:py-4 font-sans text-[8px] laptop:text-[10px] md:text-[10px] tracking-[0.25em] laptop:tracking-[0.3em] md:tracking-[0.3em] uppercase text-[#2C2C2C] font-bold overflow-hidden hover:border-[#8B7355] transition-all duration-500 w-auto"
          >
            <span className="absolute inset-0 bg-[#8B7355] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500 whitespace-nowrap">
              Découvrir leur histoire
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
