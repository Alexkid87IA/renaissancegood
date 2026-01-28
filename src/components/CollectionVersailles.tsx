import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CollectionVersailles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const textInView = useInView(textRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.3]);

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => navigate('/collections/versailles'), 800);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen lg:h-screen relative sticky top-0 z-30"
    >
      {/* DESKTOP */}
      <div className="h-full bg-beige hidden md:flex flex-row">

        {/* IMAGE SIDE (left) */}
        <div
          onClick={handleNavigate}
          className="w-full md:w-1/2 h-full cursor-pointer group relative overflow-hidden"
        >
          <img
            src="https://renaissance-cdn.b-cdn.net/VERSAILLES-COLLECTION.jpeg"
            alt="Collection Versailles - Fleur de Lys"
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/10 transition-all duration-700 pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
              <span className="font-sans text-white text-[10px] tracking-[0.3em] font-medium uppercase">
                Découvrir
              </span>
            </div>
          </div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-beige/95 backdrop-blur-md flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border border-bronze/30 border-t-bronze rounded-full animate-spin" />
                <p className="text-dark-text text-[10px] tracking-[0.3em] font-light uppercase">Chargement</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* TEXT SIDE (right) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 lg:p-20 xl:p-28">
          <motion.div
            ref={textRef}
            variants={stagger}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            className="max-w-lg"
          >

            {/* Label */}
            <motion.p variants={fade} className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              Collection
            </motion.p>

            {/* Title */}
            <motion.h3 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[0.9] mb-3">
              VERSAILLES
            </motion.h3>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-[2rem] xl:text-4xl font-light italic text-dark-text/70 tracking-[-0.02em] leading-[1] mb-8">
              La Fleur de Lys.
            </motion.p>

            {/* Line */}
            <motion.div variants={fade} className="w-12 h-px bg-dark-text/15 mb-8" />

            {/* Description */}
            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14">
              Les rois sont partis. Le symbole est resté. La Fleur de Lys. Pour ceux qui construisent. Pas pour ceux qui paradent.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fade}>
              <Link to="/collections/versailles">
                <button className="group relative overflow-hidden border border-dark-text px-10 py-4 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                    Découvrir
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="min-h-[82vh] bg-beige md:hidden relative overflow-hidden">
        <div className="relative h-full flex flex-col px-6 pt-14 pb-6">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-dark-text/30 text-[8px] tracking-[0.4em] font-medium uppercase mb-5 flex-shrink-0"
          >
            Collection Versailles
          </motion.p>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-2"
          >
            <h3 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-dark-text">
              VERSAILLES
            </h3>
            <p className="font-display text-xl font-light italic text-dark-text/60 tracking-[-0.02em] mt-1">
              La Fleur de Lys.
            </p>
          </motion.div>

          {/* Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-3 origin-left"
          >
            <div className="w-10 h-px bg-dark-text/15" />
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-4"
          >
            <div
              onClick={handleNavigate}
              className="relative w-full h-[40vh] overflow-hidden cursor-pointer group active:scale-[0.98] transition-transform duration-200"
            >
              <img
                src="https://renaissance-cdn.b-cdn.net/VERSAILLES-COLLECTION.jpeg"
                alt="Collection Versailles"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-text/15 via-transparent to-transparent pointer-events-none" />
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-beige/95 backdrop-blur-md flex items-center justify-center"
                >
                  <div className="w-8 h-8 border border-bronze/30 border-t-bronze rounded-full animate-spin" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-dark-text/50 text-xs leading-[1.7] font-light mb-5 flex-shrink-0"
          >
            Les rois sont partis. Le symbole est resté. La Fleur de Lys. Pour ceux qui construisent. Pas pour ceux qui paradent.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <button
              onClick={handleNavigate}
              disabled={isLoading}
              className="group relative overflow-hidden w-full border border-dark-text px-6 py-3.5 bg-beige transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
            >
              <span className="relative z-10 font-sans text-[8px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                {isLoading ? 'CHARGEMENT...' : 'DÉCOUVRIR LA COLLECTION'}
              </span>
              {!isLoading && (
                <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
