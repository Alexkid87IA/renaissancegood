import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { stagger, fade } from './shared';

export default function HeroHistoireSection() {
  const { t } = useTranslation('histoire');
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <motion.section className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-10 overflow-hidden bg-[#000000]">
      {/* DESKTOP */}
      <div className="relative h-full overflow-hidden hidden lg:block">
        <img
          src="https://renaissance-cdn.b-cdn.net/campagne-trident.webp"
          alt="Renaissance Eyewear - Notre Histoire"
          className="absolute inset-0 w-full h-full object-cover object-[center_42%]"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-[#000000]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/90 via-[#000000]/42 to-[#000000]/5" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#000000] via-[#000000]/55 to-transparent" />

        <div className="absolute inset-0 flex items-end px-10 xl:px-16 2xl:px-24 pb-14 xl:pb-20 pt-28">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? 'visible' : 'hidden'}
            className="max-w-[76rem]"
          >
            <motion.p variants={fade} className="font-sans text-bronze/[0.72] text-[9px] tracking-[0.44em] font-medium uppercase mb-5">
              {t('heroHistoire.label')}
            </motion.p>

            <motion.h1 variants={fade} className="font-display text-6xl xl:text-8xl 2xl:text-[8.5rem] font-bold text-white tracking-[-0.04em] leading-[0.84] mb-6">
              {t('heroHistoire.title')}
              <br />
              <span className="font-light italic text-white/[0.78]">{t('heroHistoire.subtitle')}</span>
            </motion.h1>

            <motion.div variants={fade} className="flex items-start gap-8 max-w-3xl">
              <p className="font-sans text-white/[0.68] text-sm xl:text-base leading-[1.9] font-light">
                {t('heroHistoire.description')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="relative h-full overflow-hidden lg:hidden">
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/campagne-trident.webp"
            alt="Renaissance Eyewear - Notre Histoire"
            className="w-full h-full object-cover object-[center_30%]"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/88" />
        </div>

        <div className="relative h-full flex flex-col justify-end pb-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-sm mb-6"
          >
            <p className="font-sans text-bronze/[0.72] text-[8px] tracking-[0.38em] uppercase mb-4">
              {t('heroHistoire.label')}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 tracking-[-0.04em] leading-[0.88]">
              {t('heroHistoire.mobileTitle')}
              <br />
              <span className="font-light italic text-white/[0.78]">{t('heroHistoire.mobileSubtitle')}</span>
            </h1>
            <p className="text-white/72 text-sm font-sans leading-relaxed mb-8">
              {t('heroHistoire.mobileDescription')}
            </p>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
