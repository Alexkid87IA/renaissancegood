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
      className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-[60] bg-[#0a0a0a] overflow-hidden"
      data-header-theme="light"
    >
      {/* DESKTOP */}
      <div className="hidden md:block relative h-full overflow-hidden bg-[#0a0a0a]">
        <img
          src="/histoire/signature-detail-bw.webp"
          alt="Renaissance Eyewear - le R et le cristal en bout de branche"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay : sombre en bas-gauche pour le texte, le haut-droite reste clair (strass + header) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(10,10,10,0.96)_0%,rgba(10,10,10,0.6)_34%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.82)_0%,transparent_38%)]" />

        <motion.div
          ref={contentRef}
          variants={stagger}
          initial="hidden"
          animate={contentInView ? 'visible' : 'hidden'}
          className="absolute inset-0 flex h-full items-end justify-start px-10 pb-16 md:px-14 lg:px-16 lg:pb-20 xl:px-20"
        >
          <div className="w-full max-w-[31rem]">
            <motion.p variants={fade} className="font-sans text-bronze/[0.7] text-[9px] tracking-[0.4em] font-medium uppercase mb-3">
              {t('signatureSection.label')}
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl md:text-[2.9rem] laptop:text-[3.15rem] xl:text-[3.55rem] font-bold text-white tracking-[-0.03em] leading-[0.9] mb-2">
              {t('signatureSection.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl md:text-[1.75rem] laptop:text-[1.95rem] xl:text-[2.25rem] font-light italic text-white/70 tracking-[-0.02em] leading-[1] mb-5">
              {t('signatureSection.subtitle')}
            </motion.p>

            <motion.p variants={fade} className="font-sans text-white/[0.62] text-[13px] md:text-sm leading-[1.75] font-light mb-8 xl:mb-10">
              {t('signatureSection.description')}
            </motion.p>

            <motion.div variants={fade}>
              <LocaleLink to="/shop">
                <button className="group relative overflow-hidden rounded-2xl border border-white/[0.45] px-9 py-4 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white group-hover:text-[#0a0a0a] transition-colors duration-500">
                    {t('signatureSection.cta')}
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
          src="/histoire/signature-detail-bw-mobile.webp"
          alt="Renaissance Eyewear - le R et le cristal en bout de branche"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.65)_0%,rgba(10,10,10,0.55)_30%,rgba(10,10,10,0.16)_48%,transparent_60%)]" />

        <div className="relative h-full flex flex-col items-center text-center justify-end px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-bronze/[0.72] text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
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
