import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import LocaleLink from './LocaleLink';
import { useTranslation } from 'react-i18next';
import { useStackedScroll } from '../hooks/useStackedScroll';
import HomeEditorialBlock from './HomeEditorialBlock';

export default function HistoireSection() {
  const { t } = useTranslation('home');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: false, amount: 0.3 });
  const { scale, opacity, filter, imageY, imageScale } = useStackedScroll(sectionRef);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity, filter }}
      className="snap-section h-[100dvh] lg:h-screen sticky top-0 z-[70] overflow-hidden"
      id="histoire"
    >
      {/* DESKTOP */}
      <div className="hidden md:flex h-full relative">
        {/* Full-bleed background image */}
        <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
          <img
            src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
            alt="Renaissance Paris - Campagne Trident"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/30" />
        </motion.div>

        {/* Content */}
        <div className="relative w-full max-w-[1600px] mx-auto flex items-center px-12 lg:px-20 xl:px-28">
          <div className="relative w-[55%] max-w-2xl">
            <div
              aria-hidden="true"
              className="absolute -inset-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:76px_76px]"
            />
            <HomeEditorialBlock
              panelRef={contentRef}
              active={contentInView}
              index="06"
              label={t('histoire.label')}
              title={t('histoire.title')}
              subtitle={t('histoire.subtitle')}
              description={t('histoire.description')}
              actions={[{ label: t('histoire.cta'), href: '/histoire' }]}
              meta={t('histoire.since')}
            />
          </div>
        </div>
      </div>

      {/* MOBILE — Éditorial luxe */}
      <div className="md:hidden relative h-full bg-[#0a0a0a] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
          <img
            src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
            alt="Renaissance Paris - Campagne Trident"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/60" />
        </motion.div>

        <div className="relative h-full flex flex-col justify-end px-7 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-white/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-4"
          >
            {t('histoire.label')}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-[2.6rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88] mb-2"
          >
            {t('histoire.mobileTitle1')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-display text-[2.6rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88]"
          >
            {t('histoire.mobileTitle2')}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-10 h-px bg-white/25 origin-left mt-5 mb-5"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
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
