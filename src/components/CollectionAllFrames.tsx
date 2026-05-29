import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useStackedScroll } from '../hooks/useStackedScroll';
import { useTranslation } from 'react-i18next';
import CollectionStoryPanel from './CollectionStoryPanel';

export default function CollectionAllFrames() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation('home');
  const [isLoading, setIsLoading] = useState(false);
  const { scale, opacity, filter, imageY, imageScale } = useStackedScroll(sectionRef);
  const textInView = useInView(textRef, { once: false, amount: 0.3 });

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/shop');
    }, 300);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity, filter }}
      className="snap-section h-[100dvh] lg:h-screen sticky top-0 z-50 overflow-hidden"
      data-indicator-theme="light"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-white hidden md:flex flex-row">
        <div className="w-full md:w-1/2 h-full relative overflow-hidden">
          <motion.img
            src="https://renaissance-cdn.b-cdn.net/96a1a738-99de-4d9e-854e-cd8bf2a06b5f.png"
            alt="Nos créations"
            style={{ y: imageY, scale: imageScale }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <CollectionStoryPanel
          panelRef={textRef}
          active={textInView}
          index="04"
          label={t('allFrames.mobileLabel')}
          title={t('allFrames.title')}
          subtitle={t('allFrames.subtitle')}
          description={t('allFrames.description')}
          ctaLabel={isLoading ? t('allFrames.loading') : t('allFrames.cta')}
          onClick={handleNavigate}
          disabled={isLoading}
        />
      </div>

      {/* MOBILE — Éditorial luxe */}
      <div className="md:hidden relative h-full bg-[#000000] overflow-hidden" onClick={handleNavigate}>
        <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
          <img
            src="https://renaissance-cdn.b-cdn.net/96a1a738-99de-4d9e-854e-cd8bf2a06b5f.png"
            alt="Nos créations"
            className="w-full h-full object-cover object-[center_35%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-[#000000]/60" />
        </motion.div>

        <div className="relative h-full flex flex-col justify-end px-7 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-white/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-4"
          >
            {t('allFrames.mobileLabel')}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-[2.6rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88] mb-2"
          >
            {t('allFrames.mobileTitle')}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-display text-[2.6rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88]"
          >
            {t('allFrames.mobileSubtitle')}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-10 h-px bg-white/25 origin-left mt-5 mb-5"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
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
