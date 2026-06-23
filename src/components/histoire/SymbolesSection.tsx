import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { stagger, fade } from './shared';

const SYMBOLS_IMAGE = 'https://renaissance-cdn.b-cdn.net/symboles-bg-bw.webp';

export default function SymbolesSection() {
  const { t } = useTranslation('histoire');

  const symbols = [
    { name: t('symbolesSection.symbol1Name'), subtitle: t('symbolesSection.symbol1Subtitle'), description: t('symbolesSection.symbol1Desc') },
    { name: t('symbolesSection.symbol2Name'), subtitle: t('symbolesSection.symbol2Subtitle'), description: t('symbolesSection.symbol2Desc') },
    { name: t('symbolesSection.symbol3Name'), subtitle: t('symbolesSection.symbol3Subtitle'), description: t('symbolesSection.symbol3Desc') },
    { name: t('symbolesSection.symbol4Name'), subtitle: t('symbolesSection.symbol4Subtitle'), description: t('symbolesSection.symbol4Desc') },
    { name: t('symbolesSection.symbol5Name'), subtitle: t('symbolesSection.symbol5Subtitle'), description: t('symbolesSection.symbol5Desc') },
    { name: t('symbolesSection.symbol6Name'), subtitle: t('symbolesSection.symbol6Subtitle'), description: t('symbolesSection.symbol6Desc') },
    { name: t('symbolesSection.symbol7Name'), subtitle: t('symbolesSection.symbol7Subtitle'), description: t('symbolesSection.symbol7Desc') }
  ];
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <motion.section
      id="symboles"
      className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-[40] bg-[#000000] overflow-hidden"
      data-header-theme="dark"
    >
      {/* DESKTOP */}
      <div className="relative h-full overflow-hidden hidden md:block">
        <img
          src={SYMBOLS_IMAGE}
          alt="Renaissance Eyewear · Symboles"
          className="absolute inset-0 w-full h-full object-cover object-[72%_center]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#000000]/12" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/93 via-[#000000]/55 to-transparent" />

        <div className="absolute inset-0 flex items-center px-10 md:px-14 lg:px-16 xl:px-20">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="w-full max-w-[33rem]"
          >
            <motion.p variants={fade} className="font-sans text-bronze/[0.65] text-[9px] tracking-[0.4em] font-medium uppercase mb-3">
              {t('symbolesSection.label')}
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-4xl md:text-[2.9rem] laptop:text-[3.15rem] xl:text-[3.55rem] font-bold text-white tracking-[-0.03em] leading-[0.9] mb-2">
              {t('symbolesSection.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl md:text-[1.75rem] laptop:text-[1.95rem] xl:text-[2.25rem] font-light italic text-white/[0.72] tracking-[-0.02em] leading-[1] mb-5">
              {t('symbolesSection.subtitle')}
            </motion.p>

            <motion.p variants={fade} className="font-sans text-white/[0.6] text-[13px] md:text-sm leading-[1.75] font-light mb-7">
              {t('symbolesSection.description')}
            </motion.p>

            <motion.div variants={fade} className="flex flex-wrap gap-1.5 mb-6">
              {symbols.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveIndex(i)}
                  className={`font-sans text-[8px] tracking-[0.24em] font-medium uppercase px-3 py-2 border transition-all duration-300 ${
                    activeIndex === i
                      ? 'border-white bg-white text-[#0a0a0a]'
                      : 'border-white/[0.25] text-white/55 hover:border-white/50'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </motion.div>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-sans text-[9px] tracking-[0.25em] text-bronze/60 uppercase font-medium mb-2">
                {symbols[activeIndex].subtitle}
              </p>
              <p className="font-display text-lg md:text-xl text-white/80 font-light leading-[1.45]">
                {symbols[activeIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden" data-header-theme="dark">
        <img
          src={SYMBOLS_IMAGE}
          alt="Renaissance Eyewear · Symboles"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/20" />

        <div className="relative h-full flex flex-col items-center text-center justify-end px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-white/40 text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
              {t('symbolesSection.label')}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-white mb-2">
              {t('symbolesSection.title')}
            </h2>
            <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-5">
              {t('symbolesSection.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {symbols.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveIndex(i)}
                  className={`font-sans text-[7px] tracking-[0.25em] font-medium uppercase px-3 py-2 border transition-all duration-300 ${
                    activeIndex === i
                      ? 'border-white bg-white text-dark-text'
                      : 'border-white/20 text-white/50'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <motion.div
              key={`mobile-${activeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-sans text-[8px] tracking-[0.2em] text-white/30 uppercase font-medium mb-1">
                {symbols[activeIndex].subtitle}
              </p>
              <p className="font-sans text-white/60 text-xs leading-[1.7] font-light">
                {symbols[activeIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
