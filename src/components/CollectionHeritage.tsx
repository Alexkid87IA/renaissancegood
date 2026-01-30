import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleLink from './LocaleLink';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { stagger, fade } from './shared';

export default function CollectionHeritage() {
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useLocalizedNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('collections');

  const textInView = useInView(textRef, { once: true, amount: 0.3 });

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => navigate('/collections/heritage'), 800);
  };

  return (
    <motion.section
      className="min-h-screen lg:h-screen sticky top-0 z-20"
    >
      {/* DESKTOP */}
      <div className="h-full bg-beige hidden md:flex flex-row">

        {/* TEXT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 lg:p-20 xl:p-28">
          <motion.div
            ref={textRef}
            variants={stagger}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            className="max-w-lg"
          >

            {/* Label */}
            <motion.p variants={fade} className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              {t('heritage.label')}
            </motion.p>

            {/* Title */}
            <motion.h3 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[0.9] mb-3">
              {t('heritage.title')}
            </motion.h3>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-[2rem] xl:text-4xl font-light italic text-dark-text/70 tracking-[-0.02em] leading-[1] mb-8">
              {t('heritage.subtitle')}
            </motion.p>

            {/* Line */}
            <motion.div variants={fade} className="w-12 h-px bg-dark-text/15 mb-8" />

            {/* Description */}
            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14">
              {t('heritage.description')}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fade}>
              <LocaleLink to="/collections/heritage">
                <button className="group relative overflow-hidden border border-dark-text px-10 py-4 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                    {t('heritage.discover')}
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </LocaleLink>
            </motion.div>

          </motion.div>
        </div>

        {/* IMAGE SIDE */}
        <div
          onClick={handleNavigate}
          className="w-full md:w-1/2 h-full cursor-pointer group relative overflow-hidden"
        >
          <img
            src="https://renaissance-cdn.b-cdn.net/packshot%20collection%20heritage.png"
            alt="Collection Héritage - Trident"
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/10 transition-all duration-700 pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
              <span className="font-sans text-white text-[10px] tracking-[0.3em] font-medium uppercase">
                {t('heritage.discover')}
              </span>
            </div>
          </div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-beige/95 backdrop-blur-md flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border border-bronze/30 border-t-bronze rounded-full animate-spin" />
                <p className="text-dark-text text-[10px] tracking-[0.3em] font-light uppercase">{t('loading', { ns: 'common' })}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative h-[100dvh] bg-[#000000] overflow-hidden" onClick={handleNavigate}>
        {/* Image — sans overlay */}
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/packshot%20collection%20heritage.png"
            alt="Collection Héritage"
            className="w-full h-full object-cover object-[center_35%]"
            loading="lazy"
          />
        </div>

        {/* Content — centré verticalement */}
        <div className="relative h-full flex flex-col justify-center px-6 pt-20">
          <p className="font-sans text-white/50 text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
            {t('heritage.label')}
          </p>
          <div className="flex items-baseline justify-between">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[0.9] text-white mb-1">
                {t('heritage.title')}
              </h3>
              <p className="font-display text-lg font-light italic text-white/50 tracking-[-0.02em]">
                {t('heritage.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm italic text-white/50 font-light">
                {isLoading ? '...' : t('heritage.discover')}
              </span>
              {!isLoading && (
                <svg className="w-4 h-4 text-white/35" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#000000]/90 flex items-center justify-center z-10"
          >
            <div className="w-8 h-8 border border-bronze/30 border-t-bronze rounded-full animate-spin" />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
