import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useTranslation } from 'react-i18next';

export default function CollectionAllFrames() {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation('home');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/shop');
    }, 300);
  };

  return (
    <motion.section
      className="min-h-screen lg:h-screen relative z-50"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-white hidden md:flex flex-row">
        <div className="w-full md:w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/96a1a738-99de-4d9e-854e-cd8bf2a06b5f.png"
            alt="Nos créations"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20">
          <div className="max-w-2xl">
            <div className="mb-6 sm:mb-8">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[0.9]">
                {t('allFrames.title')}<br />
                <span className="font-light italic">{t('allFrames.subtitle')}</span>
              </h3>
            </div>
            <div className="w-12 h-px bg-dark-text/15 mb-8" />
            <p className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14">
              {t('allFrames.description')}
            </p>
            <button
              onClick={handleNavigate}
              disabled={isLoading}
              className="group relative border border-dark-text/60 px-8 sm:px-10 laptop:px-11 py-3 sm:py-3.5 laptop:py-4 font-sans text-[8px] sm:text-[9px] tracking-[0.3em] font-medium text-dark-text hover:bg-dark-text hover:text-white transition-all duration-500 disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10">
                {isLoading ? t('allFrames.loading') : t('allFrames.cta')}
              </span>
              <motion.div
                className="absolute inset-0 bg-dark-text"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE — Éditorial luxe */}
      <div className="md:hidden relative h-[100dvh] bg-[#000000] overflow-hidden" onClick={handleNavigate}>
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/96a1a738-99de-4d9e-854e-cd8bf2a06b5f.png"
            alt="Nos créations"
            className="w-full h-full object-cover object-[center_35%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-[#000000]/60" />
        </div>

        <div className="relative h-full flex flex-col justify-end px-7 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-white/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-4"
          >
            {t('allFrames.mobileLabel')}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-[2.6rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88] mb-2"
          >
            {t('allFrames.mobileTitle')}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-display text-[2.6rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88]"
          >
            {t('allFrames.mobileSubtitle')}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-10 h-px bg-white/25 origin-left mt-5 mb-5"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-5"
          >
            <span className="font-display text-[13px] italic text-white/70 tracking-[-0.01em]">
              {isLoading ? '...' : t('allFrames.mobileCta')}
            </span>
            <span className="w-px h-3 bg-white/15" />
            <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/35 font-medium">
              {t('allFrames.mobileTag')}
            </span>
          </motion.div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-[#000000]/90 flex items-center justify-center z-10">
            <div className="w-8 h-8 border border-bronze/30 border-t-bronze rounded-full animate-spin" />
          </div>
        )}
      </div>
    </motion.section>
  );
}
