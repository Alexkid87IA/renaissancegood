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
  const { scale, opacity, filter, imageY, imageScale } = useStackedScroll(sectionRef);

  const guarantees = [
    { number: '200+', title: t('reassurance.item1Title'), description: t('reassurance.item1Desc') },
    { number: '0€', title: t('reassurance.item2Title'), description: t('reassurance.item2Desc') },
    { number: '2 ans', title: t('reassurance.item3Title'), description: t('reassurance.item3Desc') },
    { number: '100%', title: t('reassurance.item4Title'), description: t('reassurance.item4Desc') },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity, filter }}
      className="snap-section h-[100dvh] lg:h-screen sticky top-0 z-[90] bg-[#000000] overflow-hidden"
    >

      {/* DESKTOP */}
      <div className="hidden md:block h-full relative overflow-hidden">
        <motion.img
          src="https://renaissance-cdn.b-cdn.net/packshot.png"
          alt="Renaissance Paris - Nos engagements"
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 w-full h-full object-cover object-[66%_center]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#000000]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/82 to-[#000000]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/35 via-transparent to-[#000000]/10" />

        <div className="relative h-full flex items-center px-12 lg:px-20 xl:px-28">
          <div className="relative max-w-2xl">
            <HomeEditorialBlock
              panelRef={ref}
              active={inView}
              index="08"
              label={t('reassurance.label')}
              title={t('reassurance.title')}
              subtitle={t('reassurance.subtitle')}
            >
              <div className="border-y border-white/[0.10]">
              {guarantees.map((item) => (
                <div
                  key={item.title}
                  className="grid grid-cols-[6rem_1fr] gap-6 border-b border-white/[0.08] py-4 last:border-b-0 lg:grid-cols-[7.5rem_1fr]"
                >
                  <p className="font-display text-3xl lg:text-4xl font-bold text-white tracking-normal leading-none">
                    {item.number}
                  </p>
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.25em] text-white/[0.62] uppercase font-medium mb-1.5">
                      {item.title}
                    </p>
                    <p className="font-sans text-xs lg:text-[13px] text-white/[0.64] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            </HomeEditorialBlock>
          </div>
        </div>
      </div>

      {/* MOBILE — fullscreen image + overlay */}
      <div className="md:hidden relative h-full bg-[#000000] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
          <img
            src="https://renaissance-cdn.b-cdn.net/packshot%20copie.png"
            alt="Nos engagements"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#000000]/45" />
          <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-b from-transparent to-[#000000]" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p className="font-sans text-white/50 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
            {t('reassurance.label')}
          </p>
          <h2 className="font-display text-3xl font-bold text-white tracking-[-0.03em] leading-[0.9] mb-1.5">
            {t('reassurance.title')}
            <br />
            <span className="font-light italic tracking-[-0.02em]">{t('reassurance.subtitle')}</span>
          </h2>

          <div className="w-10 h-px bg-white/[0.15] my-6" />

          {/* Stats — 2x2 grid */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-6">
            {guarantees.map((item) => (
              <div key={item.title}>
                <p className="font-display text-2xl font-bold text-white tracking-[-0.02em] leading-none mb-1">
                  {item.number}
                </p>
                <p className="font-sans text-[8px] tracking-[0.25em] text-white/40 uppercase font-medium mb-1">
                  {item.title}
                </p>
                <p className="font-sans text-[11px] text-white/30 font-light">
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
