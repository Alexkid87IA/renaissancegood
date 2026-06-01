import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useStackedScroll } from '../hooks/useStackedScroll';
import CollectionStoryPanel from './CollectionStoryPanel';

export default function CollectionHeritage() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useLocalizedNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('collections');

  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const { sectionStyle, imageMotionStyle } = useStackedScroll(sectionRef);

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => navigate('/collections/heritage'), 800);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={sectionStyle}
      className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-20 overflow-hidden"
    >
      {/* DESKTOP */}
      <div className="h-full bg-beige hidden md:flex flex-row">

        {/* TEXT SIDE */}
        <CollectionStoryPanel
          panelRef={textRef}
          active={textInView}
          index="01"
          label={t('heritage.label')}
          title={t('heritage.title')}
          subtitle={t('heritage.subtitle')}
          description={t('heritage.description')}
          ctaLabel={t('heritage.discover')}
          href="/collections/heritage"
        />

        {/* IMAGE SIDE */}
        <div
          onClick={handleNavigate}
          className="w-full md:w-1/2 h-full cursor-pointer group relative overflow-hidden"
        >
          <motion.img
            src="https://renaissance-cdn.b-cdn.net/packshot%20collection%20heritage.png"
            alt="Collection Héritage - Trident"
            loading="lazy"
            style={imageMotionStyle}
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
      <div className="md:hidden relative h-full bg-[#000000] overflow-hidden" onClick={handleNavigate}>
        <motion.div className="absolute inset-0" style={imageMotionStyle}>
          <img
            src="https://renaissance-cdn.b-cdn.net/packshot%20collection%20heritage.png"
            alt="Collection Héritage"
            className="w-full h-full object-cover object-[center_35%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/20 via-transparent to-[#000000]/70" />
        </motion.div>

        <div className="relative h-full flex flex-col justify-end px-7 pb-14">
          <p className="font-sans text-white/50 text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
            {t('heritage.label')}
          </p>
          <h3 className="font-display text-[2.6rem] sm:text-5xl font-bold tracking-[-0.03em] leading-[0.88] text-white mb-2">
            {t('heritage.title')}
          </h3>
          <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-5">
            {t('heritage.subtitle')}
          </p>
          <div className="w-10 h-px bg-white/20 mb-5" />
          <div className="flex items-center gap-2">
            <span className="font-display text-[13px] italic text-white/70 tracking-[-0.01em]">
              {isLoading ? '...' : t('heritage.discover')}
            </span>
            {!isLoading && (
              <svg className="w-4 h-4 text-white/[0.35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
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
