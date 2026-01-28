import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';

export default function HistoireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="relative sticky top-0 z-[70] bg-beige overflow-hidden"
      id="histoire"
    >
      {/* DESKTOP */}
      <div className="hidden md:flex h-screen relative">

        {/* Content — two-column */}
        <div className="relative w-full max-w-[1600px] mx-auto flex items-center px-12 lg:px-20 xl:px-28 py-12 lg:py-16">

          {/* Left column — editorial content */}
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="w-[50%] pr-12 lg:pr-16 xl:pr-24 flex flex-col justify-center"
          >
            {/* Label */}
            <motion.p variants={fade} className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              Notre Histoire
            </motion.p>

            {/* Title */}
            <motion.h2 variants={fade} className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-3">
              LE MONDE OUBLIE.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-xl lg:text-2xl xl:text-3xl font-light italic text-dark-text/60 tracking-[-0.02em] leading-[1] mb-8">
              Nous, on se souvient.
            </motion.p>

            {/* Line */}
            <motion.div variants={fade} className="w-12 h-px bg-dark-text/15 mb-8" />

            {/* Description */}
            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] lg:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14 max-w-md">
              Renaissance. Un mot pour ceux qui refusent que tout disparaisse. Que les gestes se perdent. Que le beau devienne jetable.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fade}>
              <Link to="/histoire">
                <button className="group relative overflow-hidden border border-dark-text px-10 py-4 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                    Découvrir notre histoire
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[50%] flex items-center justify-center relative h-full py-8"
          >
            <div className="relative h-full w-full max-w-[480px] mx-auto">
              {/* Frame behind the image */}
              <div className="absolute -inset-3 lg:-inset-4 bg-dark-text/[0.03] border border-dark-text/[0.06] rounded-sm" />

              {/* Image */}
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
                  alt="Renaissance Paris - Campagne Trident"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />

                {/* Subtle edge vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-beige/25 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-beige/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Logo R — top-left corner */}
              <img
                src="https://renaissance-cdn.b-cdn.net/LOGO%20R%20TRANSPARENT.png"
                alt=""
                className="absolute top-0 left-0 w-24 h-24 lg:w-36 lg:h-36 xl:w-44 xl:h-44 object-contain opacity-15 pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative py-16 px-6">

        <div className="relative flex flex-col items-center text-center">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-dark-text/30 text-[8px] tracking-[0.4em] font-medium uppercase mb-5"
          >
            Notre Histoire
          </motion.p>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2"
          >
            <h2 className="font-display text-2xl font-bold text-dark-text tracking-[-0.03em] leading-[1]">
              LE MONDE OUBLIE.
            </h2>
            <p className="font-display text-lg font-light italic text-dark-text/60 tracking-[-0.02em] mt-1">
              Nous, on se souvient.
            </p>
          </motion.div>

          {/* Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 origin-center"
          >
            <div className="w-10 h-px bg-dark-text/15" />
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 w-full"
          >
            <div className="relative w-full max-w-[260px] mx-auto">
              {/* Frame */}
              <div className="absolute -inset-2 bg-dark-text/[0.03] border border-dark-text/[0.06] rounded-sm" />

              {/* Image */}
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <img
                  src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
                  alt="Renaissance Paris - Campagne Trident"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-beige/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Logo R — top-left corner */}
              <img
                src="https://renaissance-cdn.b-cdn.net/LOGO%20R%20TRANSPARENT.png"
                alt=""
                className="absolute top-0 left-0 w-16 h-16 object-contain opacity-15 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <p className="font-sans text-dark-text/50 text-xs leading-[1.7] font-light max-w-xs mx-auto">
              Renaissance. Un mot pour ceux qui refusent que tout disparaisse. Que les gestes se perdent. Que le beau devienne jetable.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/histoire">
              <button className="group relative overflow-hidden border border-dark-text px-7 py-3 transition-all duration-500 active:scale-[0.98]">
                <span className="relative z-10 font-sans text-[8px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                  Découvrir notre histoire
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
