import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';

export default function SignatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.3]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen lg:h-screen relative sticky top-0 z-[60] bg-beige"
    >
      {/* DESKTOP */}
      <div className="h-full bg-beige hidden md:flex flex-row">
        {/* IMAGE SIDE — left */}
        <div className="w-full md:w-1/2 h-full relative overflow-hidden group">
          <img
            src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
            alt="Renaissance Paris - Le Secret"
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/10 transition-all duration-700 pointer-events-none" />
        </div>

        {/* TEXT SIDE — right */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 lg:p-20 xl:p-28">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="max-w-lg"
          >
            <motion.p variants={fade} className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              La Signature
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[0.9] mb-3">
              ZÉRO LOGO.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-[2rem] xl:text-4xl font-light italic text-dark-text/70 tracking-[-0.02em] leading-[1] mb-8">
              Juste toi et ce que tu sais.
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-dark-text/15 mb-8" />

            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14">
              Branche gauche. Un strass. Plus petit qu'une tête d'épingle. Approche-toi. Des symboles apparaissent. Gravés dans le métal. Retourne la pièce. Un numéro. Gravé pour toi. Il n'existera qu'une fois. Comme toi.
            </motion.p>

            <motion.div variants={fade}>
              <Link to="/shop">
                <button className="group relative overflow-hidden border border-dark-text px-10 py-4 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                    Découvrir le secret
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-dark-text/30 text-[8px] tracking-[0.4em] font-medium uppercase mb-5 flex-shrink-0"
          >
            La Signature
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-2"
          >
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-dark-text">
              ZÉRO LOGO.
            </h2>
            <p className="font-display text-xl font-light italic text-dark-text/60 tracking-[-0.02em] mt-1">
              Juste toi et ce que tu sais.
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-3 origin-left"
          >
            <div className="w-10 h-px bg-dark-text/15" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-4"
          >
            <div className="relative w-full h-[40vh] overflow-hidden">
              <img
                src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
                alt="Renaissance Paris - Le Secret"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-text/15 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-dark-text/50 text-xs leading-[1.7] font-light mb-5 flex-shrink-0"
          >
            Branche gauche. Un strass. Plus petit qu'une tête d'épingle. Des symboles gravés dans le métal. Un numéro unique. Il n'existera qu'une fois. Comme toi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <Link to="/shop">
              <button className="group relative overflow-hidden w-full border border-dark-text px-6 py-3.5 bg-beige transition-all duration-300 active:scale-[0.98]">
                <span className="relative z-10 font-sans text-[8px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                  Découvrir le secret
                </span>
                <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
