import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';

export default function IsisCollectionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <div className="bg-beige">
      <SEO
        title="Collection Isis"
        description="Découvrez la collection Isis de RENAISSANCE Paris. Des lunettes de luxe audacieuses inspirées de la déesse égyptienne, alliant mystère et raffinement."
        url="/collections/isis"
      />

      <motion.div
        ref={heroRef}
        style={{ scale, opacity }}
        className="h-screen relative lg:sticky lg:top-0 lg:z-10"
      >
        {/* DESKTOP — Split éditorial */}
        <div className="relative h-full overflow-hidden hidden lg:flex">
          {/* Left Panel — Content */}
          <div className="w-[42%] bg-[#0c0c0c] relative flex flex-col justify-center px-12 xl:px-20 2xl:px-28">
            {/* Symbol watermark */}
            <img
              src="https://renaissance-cdn.b-cdn.net/SCARABEE%20SYMBOL.png"
              alt=""
              className="absolute top-1/2 -translate-y-1/2 right-6 w-48 xl:w-56 2xl:w-64 opacity-[0.03] pointer-events-none select-none invert"
            />

            {/* Top label */}
            <div className="absolute top-10 left-12 xl:left-20 2xl:left-28">
              <p className="font-sans text-white/25 text-[9px] tracking-[0.4em] font-medium uppercase">
                Collection III
              </p>
            </div>

            <motion.div
              ref={contentRef}
              variants={stagger}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              <motion.h1 variants={fade} className="font-display text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 tracking-[-0.03em] leading-[0.9]">
                ISIS.
              </motion.h1>
              <motion.p variants={fade} className="font-display text-2xl xl:text-3xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 xl:mb-10">
                Le Scarabée.
              </motion.p>

              <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8 xl:mb-10" />

              <motion.p variants={fade} className="font-sans text-white/35 text-[13px] xl:text-sm leading-[1.9] font-light max-w-md mb-8">
                L'éternité se porte au quotidien. Le Cobra, le Scarabée, l'Œil. Ce qui traverse 5 000 ans ne se porte pas par hasard.
              </motion.p>

              <motion.div variants={fade} className="mb-10 xl:mb-14">
                <span className="inline-block border border-bronze/40 text-bronze text-[8px] px-4 py-1.5 tracking-[0.3em] font-medium uppercase">
                  Bientôt Disponible
                </span>
              </motion.div>

              <motion.div variants={fade}>
                <button
                  onClick={() => {
                    const section = document.querySelector('[data-products-section]');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    En savoir plus
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </motion.div>
            </motion.div>

            {/* Bottom scroll indicator */}
            <div className="absolute bottom-10 left-12 xl:left-20 2xl:left-28 flex items-center gap-3">
              <div className="w-8 h-px bg-white/15" />
              <span className="font-sans text-white/15 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            </div>
          </div>

          {/* Right Panel — Image */}
          <div className="flex-1 relative overflow-hidden">
            <motion.img
              src="https://26.staticbtf.eno.do/v1/91-default/80de95ed4756e81d2e731b5faff6c051/media.jpg"
              alt="Collection Isis"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: imageY }}
            />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0c0c0c] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c0c0c]/20 to-transparent" />
          </div>
        </div>

        {/* MOBILE */}
        <div className="relative h-full overflow-hidden lg:hidden flex flex-col">
          {/* Image top */}
          <div className="relative h-[55%] overflow-hidden">
            <img
              src="https://26.staticbtf.eno.do/v1/91-default/80de95ed4756e81d2e731b5faff6c051/media.jpg"
              alt="Collection Isis"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/40 via-transparent to-[#0c0c0c]" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-24 left-6"
            >
              <p className="text-white/50 text-[9px] tracking-[0.3em] uppercase font-sans font-medium">
                Collection III
              </p>
            </motion.div>
          </div>

          {/* Content bottom */}
          <div className="flex-1 bg-[#0c0c0c] px-6 flex flex-col justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2 tracking-[-0.03em] leading-[0.9]">
                ISIS.
              </h1>
              <p className="font-display text-lg sm:text-xl font-light italic text-white/50 tracking-[-0.02em] mb-5">
                Le Scarabée.
              </p>
              <div className="w-10 h-px bg-white/15 mb-5" />
              <p className="text-white/35 text-sm font-sans leading-relaxed font-light mb-4">
                L'éternité se porte au quotidien.
              </p>
              <span className="inline-block border border-bronze/40 text-bronze text-[8px] px-4 py-1.5 tracking-[0.3em] font-medium uppercase mb-6">
                Bientôt Disponible
              </span>
              <button
                onClick={() => {
                  const section = document.querySelector('[data-products-section]');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden w-full border border-white/15 px-8 py-4 transition-all duration-500 hover:border-bronze/60 active:scale-[0.98]"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  En savoir plus
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

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
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-3">
                Bientôt Disponible.
                <br />
                <span className="font-light italic">Patience.</span>
              </h2>

              <div className="w-12 h-px bg-dark-text/15 mx-auto mt-8 mb-8" />
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <p className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 sm:mb-12">
                La collection ISIS est actuellement en préparation. Découvrez bientôt des montures inspirées
                par les symboles éternels de l'Égypte ancienne, où l'artisanat français rencontre le mystère millénaire.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/collections/versailles"
                  className="group relative overflow-hidden border border-dark-text px-10 py-4 transition-all duration-500"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                    Découvrir Versailles
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
                <Link
                  to="/collections/heritage"
                  className="group relative overflow-hidden border border-dark-text/30 px-10 py-4 transition-all duration-500 hover:border-dark-text"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text/70 group-hover:text-beige transition-colors duration-500">
                    Découvrir Héritage
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
