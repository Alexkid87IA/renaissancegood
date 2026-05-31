import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleLink from '../LocaleLink';
import { stagger, fade } from './shared';

export default function EngagementSection() {
  const { t } = useTranslation('histoire');
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.28 });

  const engagements = [
    {
      title: t('engagementSection.engagement1Title'),
      description: t('engagementSection.engagement1Desc'),
      stat: t('engagementSection.engagement1Stat'),
      statLabel: t('engagementSection.engagement1StatLabel')
    },
    {
      title: t('engagementSection.engagement2Title'),
      description: t('engagementSection.engagement2Desc'),
      stat: t('engagementSection.engagement2Stat'),
      statLabel: t('engagementSection.engagement2StatLabel')
    },
    {
      title: t('engagementSection.engagement3Title'),
      description: t('engagementSection.engagement3Desc'),
      stat: t('engagementSection.engagement3Stat'),
      statLabel: t('engagementSection.engagement3StatLabel')
    }
  ];

  return (
    <motion.section className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-[70] bg-[#000000] overflow-hidden">
      {/* DESKTOP */}
      <div className="hidden md:flex h-full bg-[#000000]">
        <div className="w-[46%] h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/portrait.png"
            alt="Renaissance Paris - Engagement"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#000000]/10" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#000000] to-transparent" />
        </div>

        <motion.div
          ref={contentRef}
          variants={stagger}
          initial="hidden"
          animate={contentInView ? 'visible' : 'hidden'}
          className="w-[54%] flex h-full items-center justify-center overflow-hidden px-10 py-24 lg:px-14 xl:px-20"
        >
          <div className="w-full max-w-[43rem]">
            <motion.div variants={fade} className="flex items-center gap-5 mb-6">
              <span className="h-px w-14 bg-bronze/[0.55]" />
              <p className="font-sans text-bronze/[0.65] text-[9px] tracking-[0.42em] font-medium uppercase">
                {t('engagementSection.label')}
              </p>
            </motion.div>

            <motion.h2 variants={fade} className="font-display text-5xl lg:text-[4rem] xl:text-[4.7rem] font-bold text-white tracking-[-0.04em] leading-[0.86] mb-3">
              {t('engagementSection.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-3xl lg:text-[2.55rem] xl:text-[3rem] font-light italic text-white/[0.58] tracking-[-0.03em] leading-none mb-8">
              {t('engagementSection.subtitle')}
            </motion.p>

            <motion.p variants={fade} className="font-sans text-white/[0.58] text-sm xl:text-base leading-[1.9] font-light mb-9 max-w-2xl">
              {t('engagementSection.description')}
            </motion.p>

            <motion.div variants={fade} className="grid grid-cols-3 border-y border-white/[0.10] divide-x divide-white/[0.10] mb-9">
              {engagements.map((e) => (
                <div key={e.title} className="py-6 px-5 first:pl-0 last:pr-0">
                  <p className="font-display text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">
                    {e.stat}
                  </p>
                  <p className="font-sans text-[9px] tracking-[0.24em] text-white/[0.42] uppercase font-medium leading-[1.5]">
                    {e.statLabel}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fade}>
              <LocaleLink to="/shop">
                <button className="group relative overflow-hidden border border-white/[0.18] px-10 py-4 transition-all duration-500 hover:border-bronze/60">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    {t('engagementSection.cta')}
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </LocaleLink>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/portrait.png"
          alt="Renaissance Paris - Engagement"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/52 to-black/12" />

        <div className="relative h-full flex flex-col justify-end px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-bronze/[0.72] text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
              {t('engagementSection.label')}
            </p>
            <h2 className="font-display text-4xl font-bold text-white tracking-[-0.04em] leading-[0.9] mb-2">
              {t('engagementSection.title')}
            </h2>
            <p className="font-display text-2xl font-light italic text-white/65 tracking-[-0.03em] mb-6">
              {t('engagementSection.subtitle')}
            </p>

            <div className="grid grid-cols-3 border-y border-white/[0.12] divide-x divide-white/[0.12] mb-6">
              {engagements.map((e) => (
                <div key={e.title} className="py-4 px-3 first:pl-0 last:pr-0">
                  <p className="font-display text-2xl font-bold text-white tracking-[-0.02em] leading-none mb-1">
                    {e.stat}
                  </p>
                  <p className="font-sans text-[7px] tracking-[0.16em] text-white/40 uppercase font-medium leading-[1.5]">
                    {e.statLabel}
                  </p>
                </div>
              ))}
            </div>

            <LocaleLink to="/shop" className="block w-full">
              <button className="w-full bg-white text-dark-text px-8 py-4 font-sans text-[9px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all duration-300 active:scale-[0.98]">
                {t('engagementSection.cta')}
              </button>
            </LocaleLink>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
