import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function SignatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { isMobile } = useDeviceType();

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
        {/* TEXT SIDE — left */}
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

        {/* IMAGE SIDE — right */}
        <div className="w-full md:w-1/2 h-full relative overflow-hidden group">
          <img
            src="https://renaissance-cdn.b-cdn.net/packshot%202.png"
            alt="Renaissance Paris - Le Secret"
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/10 transition-all duration-700 pointer-events-none" />
        </div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/packshot%202.png"
          alt="Renaissance Paris - Le Secret"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative h-full flex flex-col justify-end px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-white/40 text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
              La Signature
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-white mb-2">
              ZÉRO LOGO.
            </h2>
            <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-5">
              Juste toi et ce que tu sais.
            </p>
            <p className="font-sans text-white/50 text-xs leading-[1.7] font-light mb-6">
              Branche gauche. Un strass. Plus petit qu'une tête d'épingle. Des symboles gravés dans le métal. Un numéro unique. Comme toi.
            </p>
            <Link to="/shop" className="block">
              <button className="w-full bg-white text-dark-text px-8 py-4 font-sans text-[9px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all duration-300 active:scale-[0.98]">
                Découvrir le secret
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
