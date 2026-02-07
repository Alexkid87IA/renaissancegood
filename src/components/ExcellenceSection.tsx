import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ExcellenceSection() {
  const { t } = useTranslation('home');

  const pillars = [
    { number: '01', title: t('excellence.pillar1Title'), description: t('excellence.pillar1Desc') },
    { number: '02', title: t('excellence.pillar2Title'), description: t('excellence.pillar2Desc') },
    { number: '03', title: t('excellence.pillar3Title'), description: t('excellence.pillar3Desc') },
    { number: '04', title: t('excellence.pillar4Title'), description: t('excellence.pillar4Desc') },
    { number: '05', title: t('excellence.pillar5Title'), description: t('excellence.pillar5Desc') },
  ];
  return (
    <motion.section
      className="min-h-screen lg:h-screen relative z-20 bg-white"
    >
      <div className="min-h-full py-12 lg:py-0 lg:h-full flex flex-col md:flex-row px-6 md:px-0">
        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden group md:ml-6">
          <motion.img
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="https://renaissanceeyewear.fr/cdn/shop/files/IMG_8129.jpg?v=1743714393&width=1440"
            alt="L'Excellence Renaissance"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-beige/5 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-beige/5 to-transparent pointer-events-none" />

          <div className="relative max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 md:mb-16"
            >
              <p className="font-sans text-bronze text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
                {t('excellence.label')}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark-text tracking-[-0.03em] leading-[0.9] mb-6">
                {t('excellence.title')}
              </h2>
              <p className="font-sans text-dark-text/60 text-base md:text-lg leading-[1.75] font-light">
                {t('excellence.description')}
              </p>
            </motion.div>

            <div className="space-y-10 md:space-y-12">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative"
                >
                  <div className="flex items-start gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="font-display text-5xl md:text-6xl text-bronze/15 leading-none group-hover:text-bronze/25 transition-colors duration-700">
                        {pillar.number}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="w-12 h-px bg-bronze/30 mb-4 group-hover:w-20 transition-all duration-700" />
                      <h3 className="font-sans text-dark-text text-[11px] tracking-[0.25em] uppercase font-bold mb-3 leading-tight">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-dark-text/60 text-sm leading-[1.8] font-light">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute -left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-bronze/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 md:mt-16"
            >
              <div className="inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-bronze rotate-45" />
                <p className="font-sans text-dark-text/40 text-xs tracking-[0.3em] uppercase">
                  Renaissance Paris
                </p>
                <div className="w-2 h-2 bg-bronze rotate-45" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
