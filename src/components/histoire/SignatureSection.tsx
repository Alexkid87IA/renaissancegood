import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleLink from '../LocaleLink';
import { stagger, fade } from './shared';

export default function SignatureSection() {
  const { t } = useTranslation('histoire');
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <motion.section
      className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-[60] bg-beige overflow-hidden"
      data-header-theme="light"
    >
      {/* DESKTOP */}
      <div className="h-full bg-beige hidden md:flex flex-row">
        {/* TEXT SIDE — left */}
        <div className="w-full md:w-1/2 flex h-full items-start justify-center overflow-y-auto px-10 pt-28 pb-8 md:px-14 lg:px-16 xl:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="w-full max-w-[31rem]"
          >
            <motion.p variants={fade} className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-3">
              {t('signatureSection.label')}
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl md:text-[2.9rem] laptop:text-[3.15rem] xl:text-[3.55rem] font-bold tracking-[-0.03em] leading-[0.9] mb-2">
              {t('signatureSection.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl md:text-[1.75rem] laptop:text-[1.95rem] xl:text-[2.25rem] font-light italic text-dark-text/70 tracking-[-0.02em] leading-[1] mb-5">
              {t('signatureSection.subtitle')}
            </motion.p>


            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] md:text-sm leading-[1.75] font-light mb-8 xl:mb-10">
              {t('signatureSection.description')}
            </motion.p>

            <motion.div variants={fade}>
              <LocaleLink to="/shop">
                <button className="group relative overflow-hidden rounded-2xl border border-dark-text/[0.45] px-9 py-4 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                    {t('signatureSection.cta')}
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </LocaleLink>
            </motion.div>
          </motion.div>
        </div>

        {/* IMAGE SIDE — right */}
        <div className="w-full md:w-1/2 h-full relative overflow-hidden group" data-header-theme="dark">
          <img
            src="https://renaissance-cdn.b-cdn.net/packshot-2.webp"
            alt="Renaissance Eyewear - Le Secret"
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/10 transition-all duration-700 pointer-events-none" />
        </div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden" data-header-theme="dark">
        <img
          src="https://renaissance-cdn.b-cdn.net/packshot-2.webp"
          alt="Renaissance Eyewear - Le Secret"
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
              {t('signatureSection.label')}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-white mb-2">
              {t('signatureSection.title')}
            </h2>
            <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-5">
              {t('signatureSection.subtitle')}
            </p>
            <p className="font-sans text-white/50 text-xs leading-[1.7] font-light mb-6">
              {t('signatureSection.mobileDescription')}
            </p>
            <LocaleLink to="/shop" className="block">
              <button className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-7 py-3 font-sans text-[9px] tracking-[0.24em] font-medium uppercase text-white active:bg-white active:text-[#0a0a0a] transition-colors duration-300">
                <span>{t('signatureSection.cta')}</span>
              </button>
            </LocaleLink>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
