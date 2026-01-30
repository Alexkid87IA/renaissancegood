import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import LocaleLink from './LocaleLink';
import { useTranslation } from 'react-i18next';
import { stagger, fade } from './shared';

export default function TryInStoreSection() {
  const { t } = useTranslation('home');
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <motion.section
      className="min-h-screen relative z-[60] bg-[#000000]"
    >
      {/* DESKTOP */}
      <div className="h-screen hidden md:flex flex-row">
        {/* Left - Content */}
        <motion.div
          ref={contentRef}
          variants={stagger}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          className="w-1/2 flex items-center justify-center px-16 lg:px-20"
        >
          <div className="max-w-xl">
            <motion.h2 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              {t('tryInStore.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-4xl xl:text-5xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 md:mb-10">
              {t('tryInStore.subtitle')}
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8 md:mb-10" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 md:mb-14 max-w-lg">
              {t('tryInStore.description')}
            </motion.p>

            <motion.div variants={fade} className="flex flex-wrap items-start gap-3 lg:gap-5 mb-10 md:mb-14">
              <LocaleLink to="/store-locator">
                <button className="group relative overflow-hidden bg-white border border-white px-6 lg:px-10 py-3 lg:py-4 transition-all duration-500">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.2em] lg:tracking-[0.3em] font-medium uppercase text-[#000000] whitespace-nowrap">
                    {t('tryInStore.cta')}
                  </span>
                </button>
              </LocaleLink>
              <LocaleLink to="/shop">
                <button className="group relative overflow-hidden border border-white/20 px-6 lg:px-10 py-3 lg:py-4 transition-all duration-500 hover:border-bronze/60">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.2em] lg:tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#000000] transition-colors duration-500 whitespace-nowrap">
                    {t('tryInStore.ctaShop')}
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </LocaleLink>
            </motion.div>

            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.3em] font-medium uppercase">
              {t('tryInStore.guarantees')}
            </motion.p>
          </div>
        </motion.div>

        {/* Right - Image */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/page%20histoire.png"
            alt="Essayez en boutique"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 via-transparent to-[#000000]/20 pointer-events-none" />
        </div>
      </div>

      {/* MOBILE — Éditorial luxe */}
      <div className="md:hidden relative h-[100dvh] bg-[#000000] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/page%20histoire.png"
            alt="Essayez en boutique"
            className="w-full h-full object-cover object-[center_30%]"
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
            {t('tryInStore.label')}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-[2.6rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88] mb-2"
          >
            {t('tryInStore.mobileTitle1')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-display text-[2.6rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88]"
          >
            {t('tryInStore.mobileTitle2')}
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
            <LocaleLink to="/store-locator" className="font-display text-[13px] italic text-white/70 tracking-[-0.01em] active:text-white transition-colors duration-300">
              {t('tryInStore.cta')}
            </LocaleLink>
            <span className="w-px h-3 bg-white/15" />
            <LocaleLink to="/shop" className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/35 font-medium active:text-white/60 transition-colors duration-300">
              {t('tryInStore.ctaShop')}
            </LocaleLink>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
