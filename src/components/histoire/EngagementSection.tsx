import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleLink from '../LocaleLink';
import { stagger, fade } from './shared';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function EngagementSection() {
  const { t } = useTranslation('histoire');
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { isMobile } = useDeviceType();

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
    <motion.section
      className="min-h-screen md:h-screen relative z-[70] bg-[#0a0a0a]"
    >
      {/* DESKTOP */}
      <div className="hidden md:flex h-full">
        {/* Left — Image */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/portrait.png"
            alt="Renaissance Paris - Engagement"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]" />
        </div>

        {/* Right — Content */}
        <motion.div
          ref={contentRef}
          variants={stagger}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          className="w-1/2 flex items-center justify-center px-12 lg:px-16 xl:px-20"
        >
          <div className="max-w-lg">
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              {t('engagementSection.label')}
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              {t('engagementSection.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl lg:text-3xl xl:text-4xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 lg:mb-10">
              {t('engagementSection.subtitle')}
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8 lg:mb-10" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] lg:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-12 max-w-md">
              {t('engagementSection.description')}
            </motion.p>

            {/* Engagements */}
            <div className="flex gap-0 mb-10 xl:mb-12">
              {engagements.map((e, index) => (
                <motion.div
                  key={e.title}
                  variants={fade}
                  className={`${index > 0 ? 'border-l border-white/[0.07] pl-5 lg:pl-6' : ''} ${index < engagements.length - 1 ? 'pr-5 lg:pr-6' : ''}`}
                >
                  <p className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-[-0.02em] leading-none mb-1">
                    {e.stat}
                  </p>
                  <p className="font-sans text-[8px] lg:text-[9px] tracking-[0.2em] text-white/30 uppercase font-medium">
                    {e.statLabel}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={fade}>
              <LocaleLink to="/shop">
                <button className="group relative overflow-hidden border border-white/20 px-10 py-4 transition-all duration-500 hover:border-bronze/60">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative h-full flex flex-col justify-end px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-white/40 text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
              {t('engagementSection.label')}
            </p>
            <h2 className="font-display text-3xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-2">
              {t('engagementSection.title')}
            </h2>
            <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-5">
              {t('engagementSection.subtitle')}
            </p>

            <div className="flex gap-0 mb-6">
              {engagements.map((e, index) => (
                <div
                  key={e.title}
                  className={`${index > 0 ? 'border-l border-white/[0.07] pl-4' : ''} ${index < engagements.length - 1 ? 'pr-4' : ''}`}
                >
                  <p className="font-display text-xl font-bold text-white tracking-[-0.02em] leading-none mb-1">
                    {e.stat}
                  </p>
                  <p className="font-sans text-[7px] tracking-[0.15em] text-white/30 uppercase font-medium">
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
