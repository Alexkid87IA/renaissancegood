import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import LocaleLink from './LocaleLink';
import { useTranslation } from 'react-i18next';
import { useStackedScroll } from '../hooks/useStackedScroll';
import HomeEditorialBlock from './HomeEditorialBlock';

const FABRICATION_IMAGE = 'https://renaissance-cdn.b-cdn.net/try-in-store.jpg';

export default function FabricationSection() {
  const { t } = useTranslation('home');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { sectionStyle, imageMotionStyle } = useStackedScroll(sectionRef);

  const STATS = [
    { value: '6-8', label: t('fabrication.stat1') },
    { value: '100+', label: t('fabrication.stat2') },
    { value: '15h', label: t('fabrication.stat3') },
    { value: '3', label: t('fabrication.stat4') },
  ];
  const DETAILS = [
    { label: t('fabrication.detail1Label'), location: t('fabrication.detail1Location') },
    { label: t('fabrication.detail2Label'), location: t('fabrication.detail2Location') },
    { label: t('fabrication.detail3Label'), location: t('fabrication.detail3Location') },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={sectionStyle}
      className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-[80] bg-[#000000] overflow-hidden"
      id="fabrication"
    >
      {/* DESKTOP */}
      <div className="relative h-full hidden md:block overflow-hidden">
        <motion.img
          src={FABRICATION_IMAGE}
          alt="Renaissance Paris - Fabrication"
          style={imageMotionStyle}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#2a1708]/[0.10] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#000000]/[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/[0.88] via-[#000000]/[0.46] to-[#000000]/0" />
        <div className="absolute left-0 top-0 h-full w-[56%] bg-gradient-to-r from-[#000000]/[0.68] via-[#000000]/[0.34] to-transparent" />

        {/* Content */}
        <div className="relative h-full overflow-y-auto px-12 pt-28 pb-10 lg:px-20 lg:pt-32 xl:px-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative max-w-2xl">
            <HomeEditorialBlock
              panelRef={contentRef}
              active={contentInView}
              index="07"
              label={t('fabrication.label')}
              title={t('fabrication.title')}
              subtitle={t('fabrication.subtitle')}
            >
              <div
                data-fabrication-reading-panel
                className="relative w-[min(48rem,calc(100vw-8rem))] border border-white/[0.14] bg-[#060504]/[0.58] px-6 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.44)] backdrop-blur-[1px]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-bronze/[0.70] via-white/[0.18] to-transparent" />
                <p className="max-w-[42rem] font-sans text-[15px] xl:text-base leading-[1.85] font-light text-white/[0.84]">
                  {t('fabrication.description')}
                </p>

                <div className="mt-6 grid grid-cols-4 border-y border-white/[0.12]">
                  {STATS.map((stat, i) => (
                    <div key={stat.label} className={`${i > 0 ? 'border-l border-white/[0.10] pl-5 lg:pl-6' : 'pr-5 lg:pr-6'} py-5`}>
                      <p className="font-display text-3xl lg:text-4xl xl:text-[2.8rem] text-white font-bold tracking-normal leading-none mb-2">
                        {stat.value}
                      </p>
                      <p className="font-sans text-white/[0.72] text-[8px] lg:text-[9px] tracking-[0.22em] uppercase font-medium leading-[1.55]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-3">
                  {DETAILS.map((detail) => (
                    <p key={detail.label} className="font-sans text-[11px] leading-relaxed tracking-[0.04em] text-white/[0.62]">
                      <span className="block text-[8px] tracking-[0.28em] uppercase text-bronze/[0.85]">{detail.label}</span>
                      <span className="font-light">{detail.location}</span>
                    </p>
                  ))}
                </div>

                <LocaleLink
                  to="/savoir-faire"
                  className="mt-6 inline-flex min-w-[14rem] items-center justify-center border border-white/[0.28] px-7 py-4 font-sans text-[9px] tracking-[0.28em] font-medium uppercase text-white/[0.88] transition-all duration-500 hover:border-bronze/70 hover:text-bronze"
                >
                  {t('fabrication.cta')}
                </LocaleLink>
              </div>
            </HomeEditorialBlock>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative h-full bg-[#000000] overflow-hidden">
        <motion.img
          src={FABRICATION_IMAGE}
          alt="Renaissance Paris - Fabrication"
          style={imageMotionStyle}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#160e07]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/30 to-[#000000]/90" />

        {/* Content — bas */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p className="font-sans text-white/40 text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
            {t('fabrication.label')}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-1">
            {t('fabrication.title')}
          </h2>
          <p className="font-display text-lg sm:text-xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-6">
            {t('fabrication.subtitle')}
          </p>

          {/* Stats — 2x2 grid */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-6 mb-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-white font-bold tracking-tight leading-none mb-1.5">
                  {stat.value}
                </p>
                <p className="font-sans text-white/50 text-[8px] tracking-[0.2em] uppercase font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <LocaleLink to="/savoir-faire">
            <button className="group relative overflow-hidden w-full border border-white/20 px-6 py-4 transition-all duration-500 hover:border-bronze/60 active:scale-[0.98]">
              <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#000000] transition-colors duration-500">
                {t('fabrication.cta')}
              </span>
              <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </LocaleLink>
        </div>
      </div>
    </motion.section>
  );
}
