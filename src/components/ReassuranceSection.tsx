import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useStackedScroll } from '../hooks/useStackedScroll';
import HomeEditorialBlock from './HomeEditorialBlock';

export default function ReassuranceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const { t } = useTranslation('home');
  const { sectionStyle, imageMotionStyle, active } = useStackedScroll(sectionRef);

  const guarantees = [
    { title: t('reassurance.item1Title'), description: t('reassurance.item1Desc') },
    { title: t('reassurance.item2Title'), description: t('reassurance.item2Desc') },
    { title: t('reassurance.item3Title'), description: t('reassurance.item3Desc') },
    { title: t('reassurance.item4Title'), description: t('reassurance.item4Desc') },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={sectionStyle}
      className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-[90] bg-[#000000] overflow-hidden"
    >

      {/* DESKTOP */}
      <div className="hidden md:block h-full relative overflow-hidden">
        <motion.img
          src="https://renaissance-cdn.b-cdn.net/packshot.png"
          alt="Renaissance Paris - Nos engagements"
          style={active ? { ...imageMotionStyle, filter: 'grayscale(1) sepia(0.08) saturate(0.88) contrast(1.06) brightness(1.08)' } : { filter: 'grayscale(1) sepia(0.08) saturate(0.88) contrast(1.06) brightness(1.08)' }}
          className="absolute inset-0 w-full h-full object-cover object-[66%_center]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#000000]/[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/[0.52] to-[#000000]/0" />
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(circle_at_22%_42%,rgba(139,115,85,0.18),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-[#000000]/45 to-transparent" />

        <div className="relative h-full flex items-center px-12 lg:px-20 xl:px-28">
          <div className="relative max-w-[46rem]">
            <HomeEditorialBlock
              panelRef={ref}
              active={inView}
              index="08"
              label={t('reassurance.label')}
              title={t('reassurance.title')}
              subtitle={t('reassurance.subtitle')}
              description={t('reassurance.description')}
            >
              <div className="max-w-[44rem] border-y border-white/[0.12]">
                {guarantees.map((item) => (
                  <div
                    key={item.title}
                    className="group grid grid-cols-[11rem_1fr] items-start gap-8 border-b border-white/[0.10] py-[1.125rem] last:border-b-0 lg:grid-cols-[13rem_1fr]"
                  >
                    <p className="font-sans text-[9px] tracking-[0.28em] text-bronze/[0.76] uppercase font-medium leading-[1.7] transition-colors duration-500 group-hover:text-bronze">
                      {item.title}
                    </p>
                    <p className="max-w-xl font-sans text-[13px] lg:text-sm text-white/[0.64] leading-[1.75] font-light transition-colors duration-500 group-hover:text-white/[0.80]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </HomeEditorialBlock>
          </div>
        </div>
      </div>

      {/* MOBILE — fullscreen image + overlay */}
      <div className="md:hidden relative h-full bg-[#000000] overflow-hidden">
        <motion.div className="absolute inset-0" style={imageMotionStyle}>
          <img
            src="https://renaissance-cdn.b-cdn.net/packshot%20copie.png"
            alt="Nos engagements"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#000000]/[0.48]" />
          <div className="absolute bottom-0 left-0 right-0 h-[76%] bg-gradient-to-b from-transparent via-[#000000]/70 to-[#000000]" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p className="font-sans text-bronze/[0.72] text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
            {t('reassurance.label')}
          </p>
          <h2 className="font-display text-4xl font-bold text-white tracking-[-0.04em] leading-[0.9] mb-2">
            {t('reassurance.title')}
            <br />
            <span className="font-light italic text-white/[0.74] tracking-[-0.03em]">{t('reassurance.subtitle')}</span>
          </h2>
          <p className="font-sans text-xs text-white/[0.58] leading-[1.7] font-light mt-5 max-w-sm">
            {t('reassurance.description')}
          </p>

          <div className="mt-6 border-t border-white/[0.12]">
            {guarantees.map((item) => (
              <div key={item.title} className="border-b border-white/[0.10] py-3.5">
                <p className="font-sans text-[8px] tracking-[0.24em] text-bronze/[0.72] uppercase font-medium mb-1.5">
                  {item.title}
                </p>
                <p className="font-sans text-[11px] text-white/[0.58] leading-[1.55] font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
