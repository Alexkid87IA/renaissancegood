import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import LocaleLink from './LocaleLink';
import { useTranslation } from 'react-i18next';
import { useStackedScroll } from '../hooks/useStackedScroll';
import HomeEditorialBlock from './HomeEditorialBlock';

// Desktop : homme lisant le Renaissance Times (campagne Versailles, Bunny 22 juin 2026). Mobile : image historique.
const HISTOIRE_IMAGE_DESKTOP = 'https://renaissance-cdn.b-cdn.net/histoire-desktop.jpg';
const HISTOIRE_IMAGE_MOBILE = 'https://renaissance-cdn.b-cdn.net/histoire-mobile.jpg';

export default function HistoireSection() {
  const { t } = useTranslation('home');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { sectionStyle, imageMotionStyle } = useStackedScroll(sectionRef);

  return (
    <motion.section
      ref={sectionRef}
      style={sectionStyle}
      className="snap-section h-[100dvh] lg:h-screen sticky top-0 z-[70] bg-[#000000] overflow-hidden"
      id="histoire"
      data-header-theme="dark"
    >
      {/* DESKTOP — image plein cadre, degrade noir depuis la gauche */}
      <div className="relative h-full hidden md:block overflow-hidden">
        <motion.img
          src={HISTOIRE_IMAGE_DESKTOP}
          alt="Né d'un refus - Renaissance Eyewear"
          style={imageMotionStyle}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/[0.55] to-[#000000]/0 pointer-events-none" />
        <div className="absolute left-0 top-0 h-full w-[64%] bg-gradient-to-r from-[#000000]/[0.72] via-[#000000]/[0.38] to-transparent pointer-events-none" />

        <div className="relative h-full flex items-center px-12 lg:px-20 xl:px-24">
          <HomeEditorialBlock
            panelRef={contentRef}
            active={contentInView}
            index="06"
            label={t('histoire.label')}
            title={t('histoire.title')}
            subtitle={t('histoire.subtitle')}
            decorLines={false}
            description={t('histoire.description')}
            actions={[{ label: t('histoire.cta'), href: '/histoire' }]}
            meta={t('histoire.since')}
          />
        </div>
      </div>

      {/* MOBILE — Éditorial luxe */}
      <div className="md:hidden relative h-full bg-[#000000] overflow-hidden">
        <motion.div className="absolute inset-0" style={imageMotionStyle}>
          <img
            src={HISTOIRE_IMAGE_MOBILE}
            alt="Né d'un refus - Renaissance Eyewear"
            className="w-full h-full object-cover object-[center_30%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/20 via-[#000000]/35 to-[#000000]/[0.92]" />
        </motion.div>

        <div className="relative h-full flex flex-col items-center text-center justify-end px-7 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-white/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-4"
          >
            {t('histoire.label')}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-[2.6rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88] mb-2"
          >
            {t('histoire.mobileTitle1')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-display text-[2.6rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88] mb-7"
          >
            {t('histoire.mobileTitle2')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <LocaleLink to="/histoire" className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-7 py-3 font-sans text-[9px] tracking-[0.24em] font-medium uppercase text-white hover:bg-white hover:text-[#0a0a0a] active:bg-white active:text-[#0a0a0a] transition-colors duration-300">
              {t('histoire.mobileCta')}
            </LocaleLink>
            <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/[0.45] font-medium">
              {t('histoire.since')}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
