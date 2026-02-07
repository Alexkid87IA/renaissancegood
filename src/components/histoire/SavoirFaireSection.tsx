import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleLink from '../LocaleLink';
import { stagger, fade } from './shared';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function SavoirFaireSection() {
  const { t } = useTranslation('histoire');
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { isMobile } = useDeviceType();

  return (
    <motion.section
      className="min-h-[85vh] md:h-screen relative z-30 bg-[#0a0a0a]"
    >
      {/* DESKTOP */}
      <div className="hidden md:flex h-full">
        {/* Left — Image */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/atelier.png"
            alt="Atelier de fabrication Renaissance"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/10" />
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
              {t('savoirFaireSection.label')}
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.9] mb-3">
              {t('savoirFaireSection.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl lg:text-3xl xl:text-4xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 lg:mb-10">
              {t('savoirFaireSection.subtitle')}
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8 lg:mb-10" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] lg:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14 max-w-md">
              {t('savoirFaireSection.description')}
            </motion.p>

            <motion.div variants={fade} className="flex items-start gap-0 mb-10 xl:mb-14">
              <div className="pr-6 lg:pr-8">
                <p className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">200+</p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-white/30 uppercase font-medium">{t('savoirFaireSection.stat1Label')}</p>
              </div>
              <div className="border-l border-white/10 pl-6 lg:pl-8 pr-6 lg:pr-8">
                <p className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">15h</p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-white/30 uppercase font-medium">{t('savoirFaireSection.stat2Label')}</p>
              </div>
              <div className="border-l border-white/10 pl-6 lg:pl-8">
                <p className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">0</p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-white/30 uppercase font-medium">{t('savoirFaireSection.stat3Label')}</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/atelier.png"
          alt="Atelier de fabrication Renaissance"
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
              {t('savoirFaireSection.label')}
            </p>
            <h2 className="font-display text-3xl font-bold text-white tracking-[-0.02em] leading-[0.9] mb-2">
              {t('savoirFaireSection.title')}
            </h2>
            <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-5">
              {t('savoirFaireSection.subtitle')}
            </p>

            <div className="flex gap-0 mb-6">
              <div className="pr-5">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">200+</p>
                <p className="font-sans text-[8px] tracking-[0.2em] text-white/30 uppercase">{t('savoirFaireSection.mobileStat1Label')}</p>
              </div>
              <div className="border-l border-white/10 pl-5 pr-5">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">15h</p>
                <p className="font-sans text-[8px] tracking-[0.2em] text-white/30 uppercase">{t('savoirFaireSection.mobileStat2Label')}</p>
              </div>
              <div className="border-l border-white/10 pl-5">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">0</p>
                <p className="font-sans text-[8px] tracking-[0.2em] text-white/30 uppercase">{t('savoirFaireSection.mobileStat3Label')}</p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
