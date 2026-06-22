import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import LocaleLink from './LocaleLink';
import { useTranslation } from 'react-i18next';
import { useStackedScroll } from '../hooks/useStackedScroll';
import HomeEditorialBlock from './HomeEditorialBlock';

// Desktop : photo groupe (campagne 2K24, Bunny 22 juin 2026). Mobile : image historique.
const TRY_IMAGE_DESKTOP = 'https://renaissance-cdn.b-cdn.net/try-in-store-desktop.jpg';
const TRY_IMAGE_MOBILE = 'https://renaissance-cdn.b-cdn.net/try-in-store.jpg';

export default function TryInStoreSection() {
  const { t } = useTranslation('home');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { sectionStyle, imageMotionStyle } = useStackedScroll(sectionRef);

  // Engagements fusionnés depuis l'ancienne section Réassurance.
  const ENGAGEMENTS = [
    { title: t('reassurance.item1Title'), desc: t('reassurance.item1Desc') },
    { title: t('reassurance.item2Title'), desc: t('reassurance.item2Desc') },
    { title: t('reassurance.item3Title'), desc: t('reassurance.item3Desc') },
    { title: t('reassurance.item4Title'), desc: t('reassurance.item4Desc') },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={sectionStyle}
      className="snap-section h-[100dvh] lg:h-screen sticky top-0 z-[60] bg-[#000000] overflow-hidden"
      data-header-theme="dark"
    >
      {/* DESKTOP — image plein cadre, degrade noir depuis la gauche */}
      <div className="relative h-full hidden md:block overflow-hidden">
        <motion.img
          src={TRY_IMAGE_DESKTOP}
          alt="Essayez en boutique"
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
            index="05"
            title={t('tryInStore.title')}
            subtitle={t('tryInStore.subtitle')}
            titleSize="md"
            decorLines={false}
            description={t('tryInStore.description')}
            actions={[
              { label: t('tryInStore.cta'), href: '/opticiens' },
              { label: t('tryInStore.ctaShop'), href: '/shop', variant: 'secondary' },
            ]}
          >
            <div className="grid grid-cols-2 gap-x-10 gap-y-7">
              {ENGAGEMENTS.map((e) => (
                <div key={e.title}>
                  <p className="font-sans text-[11px] tracking-[0.24em] text-bronze/[0.80] uppercase font-medium mb-2 leading-[1.5]">
                    {e.title}
                  </p>
                  <p className="font-sans text-base lg:text-[17px] text-white/[0.72] leading-snug font-light">
                    {e.desc}
                  </p>
                </div>
              ))}
            </div>
          </HomeEditorialBlock>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative h-full bg-[#000000] overflow-hidden">
        <motion.div className="absolute inset-0" style={imageMotionStyle}>
          <img
            src={TRY_IMAGE_MOBILE}
            alt="Essayez en boutique"
            className="w-full h-full object-cover object-[center_30%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/20 via-[#000000]/35 to-[#000000]/[0.92]" />
        </motion.div>

        <div className="relative h-full flex flex-col items-center text-center justify-end px-7 pb-12">
          <p className="font-sans text-white/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-3">
            {t('tryInStore.label')}
          </p>
          <h2 className="font-display text-[2.4rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88]">
            {t('tryInStore.mobileTitle1')}
          </h2>
          <p className="font-display text-[2.4rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88] mb-5">
            {t('tryInStore.mobileTitle2')}
          </p>

          <div className="grid grid-cols-2 gap-x-5 gap-y-4 mb-6 w-full">
            {ENGAGEMENTS.map((e) => (
              <div key={e.title}>
                <p className="font-sans text-[9px] tracking-[0.22em] text-bronze/[0.78] uppercase font-medium mb-1">
                  {e.title}
                </p>
                <p className="font-sans text-[13px] text-white/[0.68] leading-snug font-light">
                  {e.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 w-full">
            <LocaleLink to="/opticiens" className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-5 py-3.5 font-sans text-[8.5px] tracking-[0.22em] font-medium uppercase text-white hover:bg-white hover:text-[#0a0a0a] active:bg-white active:text-[#0a0a0a] transition-colors duration-300">
              {t('tryInStore.cta')}
            </LocaleLink>
            <LocaleLink to="/shop" className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-5 py-3.5 font-sans text-[8.5px] tracking-[0.22em] font-medium uppercase text-white hover:bg-white hover:text-[#0a0a0a] active:bg-white active:text-[#0a0a0a] transition-colors duration-300">
              {t('tryInStore.ctaShop')}
            </LocaleLink>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
