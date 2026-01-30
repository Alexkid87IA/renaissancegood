import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { stagger, fade } from './shared';

export default function CollectionIsis() {
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const { t } = useTranslation('collections');

  return (
    <motion.section
      className="min-h-screen lg:h-screen sticky top-0 z-40"
    >
      {/* DESKTOP */}
      <div className="h-full bg-beige hidden md:flex flex-row">

        {/* TEXT SIDE */}
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
              {t('isis.label')}
            </motion.p>

            {/* Title */}
            <motion.h3 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[0.9] mb-3">
              ISIS
            </motion.h3>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-[2rem] xl:text-4xl font-light italic text-dark-text/70 tracking-[-0.02em] leading-[1] mb-8">
              {t('isis.subtitle')}
            </motion.p>

            {/* Status badge */}
            <motion.div variants={fade} className="mb-8">
              <span className="inline-block border border-dark-text/15 text-dark-text/40 text-[8px] px-4 py-1.5 tracking-[0.3em] font-medium uppercase">
                {t('isis.availableSoon')}
              </span>
            </motion.div>

            {/* Line */}
            <motion.div variants={fade} className="w-12 h-px bg-dark-text/15 mb-8" />

            {/* Description */}
            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14">
              {t('isis.description')}
            </motion.p>

            {/* CTA - disabled */}
            <motion.div variants={fade}>
              <button className="border border-dark-text/15 px-10 py-4 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text/30 cursor-not-allowed">
                {t('isis.availableSoon')}
              </button>
            </motion.div>

          </motion.div>
        </div>

        {/* IMAGE SIDE */}
        <div className="w-full md:w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/collection%20isis%20comming%20soon.png"
            alt="Collection Isis - Egyptian inspiration"
            className="w-full h-full object-cover grayscale-[30%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/15 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative h-[100dvh] bg-[#000000] overflow-hidden">
        {/* Image — avec overlay */}
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/collection%20isis%20comming%20soon.png"
            alt="Collection Isis"
            className="w-full h-full object-cover object-[center_35%] grayscale-[30%] opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#000000]/30" />
        </div>

        {/* Gradient localisé derrière le texte */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/40 to-transparent pointer-events-none" />

        {/* Content — centré verticalement */}
        <div className="relative h-full flex flex-col justify-center px-6 pt-20" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0px 30px rgba(0,0,0,0.7)' }}>
          <p className="font-sans text-white/50 text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
            {t('isis.label')}
          </p>
          <div className="flex items-baseline justify-between">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[0.9] text-white mb-1">
                ISIS
              </h3>
              <p className="font-display text-lg font-light italic text-white/50 tracking-[-0.02em]">
                {t('isis.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
              <span className="font-sans text-[8px] tracking-[0.2em] font-medium uppercase text-white/50">
                {t('isis.comingSoon')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
