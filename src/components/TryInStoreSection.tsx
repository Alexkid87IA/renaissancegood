import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import LocaleLink from './LocaleLink';
import { useTranslation } from 'react-i18next';
import { useStackedScroll } from '../hooks/useStackedScroll';
import HomeEditorialBlock from './HomeEditorialBlock';

const WARM_IMAGE_FILTER = 'grayscale(1) sepia(0.16) saturate(0.82) contrast(1.08) brightness(0.86)';

export default function TryInStoreSection() {
  const { t } = useTranslation('home');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { sectionStyle, imageMotionStyle, active } = useStackedScroll(sectionRef);

  return (
    <motion.section
      ref={sectionRef}
      style={sectionStyle}
      className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-[60] bg-[#000000] overflow-hidden"
    >
      {/* DESKTOP */}
      <div className="h-full hidden md:flex flex-row">
        {/* Left - Content */}
        <div className="relative w-1/2 overflow-hidden bg-black flex items-center justify-center px-12 lg:px-20 xl:px-24">
          <HomeEditorialBlock
            panelRef={contentRef}
            active={contentInView}
            index="05"
            label={t('tryInStore.label')}
            title={t('tryInStore.title')}
            subtitle={t('tryInStore.subtitle')}
            description={t('tryInStore.description')}
            actions={[
              { label: t('tryInStore.cta'), href: '/store-locator' },
              { label: t('tryInStore.ctaShop'), href: '/shop', variant: 'secondary' },
            ]}
            meta={t('tryInStore.guarantees')}
          />
        </div>

        {/* Right - Image */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <motion.img
            src="https://renaissance-cdn.b-cdn.net/try-in-store.jpg"
            alt="Essayez en boutique"
            style={active ? { ...imageMotionStyle, filter: WARM_IMAGE_FILTER } : { filter: WARM_IMAGE_FILTER }}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#160e07]/25 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 via-transparent to-[#000000]/20 pointer-events-none" />
        </div>
      </div>

      {/* MOBILE — Éditorial luxe */}
      <div className="md:hidden relative h-full bg-[#000000] overflow-hidden">
        <motion.div className="absolute inset-0" style={imageMotionStyle}>
          <img
            src="https://renaissance-cdn.b-cdn.net/try-in-store.jpg"
            alt="Essayez en boutique"
            style={{ filter: WARM_IMAGE_FILTER }}
            className="w-full h-full object-cover object-[center_30%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#160e07]/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-[#000000]/60" />
        </motion.div>

        <div className="relative h-full flex flex-col justify-end px-7 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-white/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-4"
          >
            {t('tryInStore.label')}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-[2.6rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88] mb-2"
          >
            {t('tryInStore.mobileTitle1')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-display text-[2.6rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88]"
          >
            {t('tryInStore.mobileTitle2')}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-10 h-px bg-white/25 origin-left mt-5 mb-5"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-5"
          >
            <LocaleLink to="/store-locator" className="font-display text-[13px] italic text-white/70 tracking-[-0.01em] active:text-white transition-colors duration-300">
              {t('tryInStore.cta')}
            </LocaleLink>
            <span className="w-px h-3 bg-white/[0.15]" />
            <LocaleLink to="/shop" className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/[0.45] font-medium active:text-white/60 transition-colors duration-300">
              {t('tryInStore.ctaShop')}
            </LocaleLink>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
