import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import LocaleLink from './LocaleLink';
import { useTranslation } from 'react-i18next';
import { stagger, fade } from './shared';

export default function HistoireSection() {
  const { t } = useTranslation('home');
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <motion.section
      className="sticky top-0 z-[70] overflow-hidden"
      id="histoire"
    >
      {/* DESKTOP */}
      <div className="hidden md:flex h-screen relative">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
            alt="Renaissance Paris - Campagne Trident"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/30" />
        </div>

        {/* Content */}
        <div className="relative w-full max-w-[1600px] mx-auto flex items-center px-12 lg:px-20 xl:px-28">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="w-[55%] flex flex-col justify-center"
          >
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              {t('histoire.label')}
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              {t('histoire.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl lg:text-3xl xl:text-4xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-10">
              {t('histoire.subtitle')}
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-10" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] lg:text-sm xl:text-base leading-[1.9] font-light mb-12 xl:mb-16 max-w-md">
              {t('histoire.description')}
            </motion.p>

            <motion.div variants={fade}>
              <LocaleLink to="/histoire">
                <button className="group relative overflow-hidden border border-white/20 px-10 py-4 transition-all duration-500 hover:border-white/50">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    {t('histoire.cta')}
                  </span>
                  <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </LocaleLink>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE — Éditorial luxe */}
      <div className="md:hidden relative h-[100dvh] bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
            alt="Renaissance Paris - Campagne Trident"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/60" />
        </div>

        <div className="relative h-full flex flex-col justify-end px-7 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-white/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-4"
          >
            {t('histoire.label')}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-[2.6rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88] mb-2"
          >
            {t('histoire.mobileTitle1')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-display text-[2.6rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88]"
          >
            {t('histoire.mobileTitle2')}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-10 h-px bg-white/25 origin-left mt-5 mb-5"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-5"
          >
            <LocaleLink to="/histoire" className="font-display text-[13px] italic text-white/70 tracking-[-0.01em] active:text-white transition-colors duration-300">
              {t('histoire.mobileCta')}
            </LocaleLink>
            <span className="w-px h-3 bg-white/15" />
            <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/35 font-medium">
              {t('histoire.since')}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
