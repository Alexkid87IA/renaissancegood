import { motion } from 'framer-motion';

export default function IsisCollectionPage() {
  return (
    <div className="bg-beige">
      <div className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Collection Isis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-text/80" />
        </motion.div>

        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 pt-24 sm:pt-32 pb-16 sm:pb-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-6 sm:mb-10"
            >
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-[-0.04em] leading-[0.85] mb-6 sm:mb-8 drop-shadow-2xl">
                ISIS
              </h1>
              <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-10">
                <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-bronze to-bronze" />
                <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] font-bold text-bronze uppercase">Scarabée</span>
                <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-bronze to-bronze" />
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-sans text-white text-base sm:text-xl md:text-2xl leading-[1.6] sm:leading-[1.8] font-light max-w-3xl mx-auto mb-10 sm:mb-16 drop-shadow-lg px-4"
            >
              L'éternité se porte au quotidien.
            </motion.p>

            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              onClick={() => {
                const section = document.querySelector('[data-products-section]');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-dark-text font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-bold uppercase hover:bg-bronze hover:text-white transition-all duration-300 shadow-2xl hover:shadow-bronze/20 hover:scale-105"
            >
              Explorer la Collection
            </motion.button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { duration: 0.8, delay: 1.2 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            onClick={() => {
              const section = document.querySelector('[data-products-section]');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="absolute bottom-12 flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <span className="font-sans text-[8px] tracking-[0.4em] font-bold uppercase">Découvrir</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="relative z-20 bg-beige" data-products-section>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-20 sm:py-32 md:py-40">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-8 sm:mb-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-bronze" fill="currentColor">
                  <path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 Z M50 20 C40 20 35 25 35 35 L35 45 C35 50 38 53 43 53 L57 53 C62 53 65 50 65 45 L65 35 C65 25 60 20 50 20 Z M35 60 C30 60 25 65 25 70 L25 75 C25 80 30 85 35 85 L65 85 C70 85 75 80 75 75 L75 70 C75 65 70 60 65 60 L35 60 Z"/>
                </svg>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark-text tracking-[-0.02em] leading-[0.9] mb-6 sm:mb-8">
                Bientôt Disponible
              </h2>

              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-dark-text/20 to-dark-text/20" />
                <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-bold text-dark-text/60 uppercase">Coming Soon</span>
                <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-dark-text/20 to-dark-text/20" />
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <p className="font-sans text-base sm:text-lg md:text-xl text-dark-text/70 leading-[1.7] sm:leading-[1.8] font-light mb-10 sm:mb-12">
                La collection ISIS est actuellement en préparation. Découvrez bientôt des montures inspirées
                par les symboles éternels de l'Égypte ancienne, où l'artisanat français rencontre le mystère millénaire.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/collections/versailles"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-dark-text text-white font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-bold uppercase hover:bg-bronze transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Découvrir Versailles
                </a>
                <a
                  href="/collections/heritage"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-dark-text text-dark-text font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-bold uppercase hover:bg-dark-text hover:text-white transition-all duration-300"
                >
                  Découvrir Heritage
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 sm:mt-32 md:mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12"
          >
            <div className="text-center">
              <div className="mb-4 sm:mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-bronze" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-dark-text mb-3 sm:mb-4">
                Design Unique
              </h3>
              <p className="font-sans text-sm sm:text-base text-dark-text/60 leading-relaxed">
                Des montures inspirées par les symboles sacrés de l'Égypte ancienne
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 sm:mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-bronze" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-dark-text mb-3 sm:mb-4">
                Qualité Supérieure
              </h3>
              <p className="font-sans text-sm sm:text-base text-dark-text/60 leading-relaxed">
                Fabriqué en France avec les meilleurs matériaux
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 sm:mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-bronze" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-dark-text mb-3 sm:mb-4">
                Édition Limitée
              </h3>
              <p className="font-sans text-sm sm:text-base text-dark-text/60 leading-relaxed">
                Une collection exclusive et numérotée
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
