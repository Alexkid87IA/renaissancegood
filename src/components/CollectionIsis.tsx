import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useStackedScroll } from '../hooks/useStackedScroll';
import CollectionStoryPanel from './CollectionStoryPanel';

const ISIS_IMAGE = '/isis-collection.png';

export default function CollectionIsis() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useLocalizedNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('collections');

  const textInView = useInView(textRef, { once: false, amount: 0.3 });
  const { scale, opacity, filter, imageY, imageScale } = useStackedScroll(sectionRef);

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => navigate('/collections/isis'), 800);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity, filter }}
      className="snap-section h-[100dvh] lg:h-screen sticky top-0 z-40 overflow-hidden"
    >
      {/* DESKTOP */}
      <div className="h-full bg-beige hidden md:flex flex-row">

        {/* TEXT SIDE */}
        <CollectionStoryPanel
          panelRef={textRef}
          active={textInView}
          index="03"
          label={t('isis.label')}
          title="ISIS"
          subtitle={t('isis.subtitle')}
          description={t('isis.description')}
          ctaLabel={t('isis.discover')}
          href="/collections/isis"
        />

        {/* IMAGE SIDE */}
        <div
          onClick={handleNavigate}
          className="w-full md:w-1/2 h-full cursor-pointer group relative overflow-hidden"
        >
          <motion.img
            src={ISIS_IMAGE}
            alt="Collection Isis"
            loading="lazy"
            style={{ y: imageY, scale: imageScale }}
            className="w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/10 transition-all duration-700 pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
              <span className="font-sans text-white text-[10px] tracking-[0.3em] font-medium uppercase">
                {t('isis.discover')}
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
        {/* Image */}
        <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
          <img
            src={ISIS_IMAGE}
            alt="Collection Isis"
            className="w-full h-full object-cover object-[center_35%]"
            loading="lazy"
          />
        </motion.div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-6 pt-20">
          <p className="font-sans text-white/50 text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
            {t('isis.label')}
          </p>
          <div className="flex items-baseline justify-between">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[0.9] text-white mb-1">
                ISIS
              </h3>
              <p className="font-display text-lg font-light italic text-white/50 tracking-[-0.02em]">
                {t('isis.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm italic text-white/50 font-light">
                {isLoading ? '...' : t('isis.discover')}
              </span>
              {!isLoading && (
                <svg className="w-4 h-4 text-white/[0.35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
