import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleLink from '../LocaleLink';
import { stagger, fade } from './shared';

export default function SavoirFaireSection() {
  const { t } = useTranslation('histoire');
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.28 });

  return (
    <motion.section id="fabrication" className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-30 bg-[#000000] overflow-hidden">
      {/* DESKTOP */}
      <div className="hidden md:block relative h-full overflow-hidden bg-[#000000]">
        <img
          src="https://renaissance-cdn.b-cdn.net/atelier-bw.webp"
          alt="Atelier de fabrication Renaissance"
          className="absolute inset-0 w-full h-full object-cover object-[right_center]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#000000]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/95 via-[#000000]/68 to-transparent" />

        <motion.div
          ref={contentRef}
          variants={stagger}
          initial="hidden"
          animate={contentInView ? 'visible' : 'hidden'}
          className="absolute inset-0 flex h-full items-center justify-start px-10 py-24 lg:px-14 xl:px-20"
        >
          <div className="w-full max-w-[43rem]">
            <motion.div variants={fade} className="flex items-center gap-5 mb-6">
              <p className="font-sans text-bronze/[0.65] text-[9px] tracking-[0.42em] font-medium uppercase">
                {t('savoirFaireSection.label')}
              </p>
            </motion.div>

            <motion.h2 variants={fade} className="font-display text-5xl lg:text-[4.1rem] xl:text-[4.8rem] font-bold text-white tracking-[-0.04em] leading-[0.86] mb-3">
              {t('savoirFaireSection.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-3xl lg:text-[2.55rem] xl:text-[3rem] font-light italic text-white/[0.58] tracking-[-0.03em] leading-none mb-8">
              {t('savoirFaireSection.subtitle')}
            </motion.p>

            <motion.p variants={fade} className="font-sans text-white/[0.58] text-sm xl:text-base leading-[1.9] font-light mb-9 max-w-2xl">
              {t('savoirFaireSection.description')}
            </motion.p>

            <motion.div variants={fade} className="grid grid-cols-3 border-y border-white/[0.10] divide-x divide-white/[0.10]">
              <div className="py-6 pr-6">
                <p className="font-display text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">{t('savoirFaireSection.stat1Value')}</p>
                <p className="font-sans text-[9px] tracking-[0.24em] text-white/[0.42] uppercase font-medium leading-[1.5]">{t('savoirFaireSection.stat1Label')}</p>
              </div>
              <div className="py-6 px-6">
                <p className="font-display text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">{t('savoirFaireSection.stat2Value')}</p>
                <p className="font-sans text-[9px] tracking-[0.24em] text-white/[0.42] uppercase font-medium leading-[1.5]">{t('savoirFaireSection.stat2Label')}</p>
              </div>
              <div className="py-6 pl-6">
                <p className="font-display text-4xl xl:text-5xl font-bold text-white tracking-[-0.02em] leading-none mb-2">{t('savoirFaireSection.stat3Value')}</p>
                <p className="font-sans text-[9px] tracking-[0.24em] text-white/[0.42] uppercase font-medium leading-[1.5]">{t('savoirFaireSection.stat3Label')}</p>
              </div>
            </motion.div>

            <motion.div variants={fade} className="mt-9 flex justify-start">
              <LocaleLink to="/fabrication">
                <button className="group relative overflow-hidden rounded-2xl border border-white/[0.45] px-9 py-4 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white group-hover:text-[#0a0a0a] transition-colors duration-500">
                    {t('savoirFaireSection.cta')}
                  </span>
                  <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </LocaleLink>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/atelier-bw.webp"
          alt="Atelier de fabrication Renaissance"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/52 to-black/10" />

        <div className="relative h-full flex flex-col items-center text-center justify-end px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-bronze/[0.72] text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
              {t('savoirFaireSection.label')}
            </p>
            <h2 className="font-display text-4xl font-bold text-white tracking-[-0.04em] leading-[0.9] mb-2">
              {t('savoirFaireSection.title')}
            </h2>
            <p className="font-display text-2xl font-light italic text-white/65 tracking-[-0.03em] mb-6">
              {t('savoirFaireSection.subtitle')}
            </p>

            <div className="grid grid-cols-3 border-y border-white/[0.12] divide-x divide-white/[0.12]">
              <div className="py-4 pr-3">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">{t('savoirFaireSection.stat1Value')}</p>
                <p className="font-sans text-[7px] tracking-[0.18em] text-white/40 uppercase leading-[1.5]">{t('savoirFaireSection.mobileStat1Label')}</p>
              </div>
              <div className="py-4 px-3">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">{t('savoirFaireSection.stat2Value')}</p>
                <p className="font-sans text-[7px] tracking-[0.18em] text-white/40 uppercase leading-[1.5]">{t('savoirFaireSection.mobileStat2Label')}</p>
              </div>
              <div className="py-4 pl-3">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">{t('savoirFaireSection.stat3Value')}</p>
                <p className="font-sans text-[7px] tracking-[0.18em] text-white/40 uppercase leading-[1.5]">{t('savoirFaireSection.mobileStat3Label')}</p>
              </div>
            </div>

            <LocaleLink to="/fabrication" className="mt-7 inline-flex">
              <button className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-7 py-3 font-sans text-[9px] tracking-[0.24em] font-medium uppercase text-white active:bg-white active:text-[#0a0a0a] transition-colors duration-300">
                <span>{t('savoirFaireSection.cta')}</span>
              </button>
            </LocaleLink>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
