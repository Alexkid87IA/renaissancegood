import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleLink from '../components/LocaleLink';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';

export default function IsisCollectionPage() {
  const { t } = useTranslation('collections');
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <div className="relative bg-beige">
      <SEO
        title={t('isis.seoTitle')}
        description={t('isis.seoDescription')}
        url="/collections/isis"
      />

      <div
        ref={heroRef}
        className="h-screen relative overflow-hidden bg-[#000000]"
      >
        {/* DESKTOP — Géométrique avec clip-path */}
        <div className="relative h-full overflow-hidden hidden lg:flex">

          {/* Zone gauche — Contenu */}
          <div className="w-[50%] relative flex flex-col justify-center pl-10 xl:pl-24 2xl:pl-32 pr-8 xl:pr-12 overflow-hidden">

            {/* Ligne diagonale décorative derrière le texte */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ transformOrigin: 'center' }}
            >
              <div className="w-[140%] h-px bg-white/[0.04] rotate-[20deg]" />
            </motion.div>

            {/* Collection number — top */}
            <motion.div
              className="absolute top-10 left-10 xl:left-24 2xl:left-32 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-sans text-bronze/40 text-[9px] tracking-[0.4em] font-medium uppercase">
                {t('isis.collectionNumber')}
              </p>
            </motion.div>

            {/* Badge Bientôt disponible — top right */}
            <motion.div
              className="absolute top-10 right-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="inline-block border border-bronze/40 text-bronze text-[8px] px-4 py-1.5 tracking-[0.3em] font-medium uppercase">
                {t('isis.availableSoon')}
              </span>
            </motion.div>

            {/* Contenu texte */}
            <motion.div
              ref={contentRef}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
              }}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="font-display text-[4.5rem] xl:text-[7rem] 2xl:text-[9rem] font-bold text-white tracking-[-0.03em] leading-[0.8] mb-4"
              >
                {t('isis.heroTitle')}
              </motion.h1>

              <motion.p variants={fade} className="font-display text-lg xl:text-xl 2xl:text-2xl font-light italic text-bronze/50 tracking-[-0.02em] leading-[1] mb-6 xl:mb-8">
                {t('isis.heroSubtitle')}
              </motion.p>

              <motion.div variants={fade} className="w-10 h-px bg-white/10 mb-6 xl:mb-8" />

              <motion.p variants={fade} className="font-sans text-white/25 text-xs xl:text-[13px] 2xl:text-sm leading-[2] font-light max-w-xs mb-8 xl:mb-10">
                {t('isis.heroDescription')}
              </motion.p>

              <motion.div variants={fade}>
                <button
                  onClick={() => {
                    const section = document.querySelector('[data-products-section]');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    {t('isis.learnMore')}
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </motion.div>
            </motion.div>

            {/* Scroll indicator — bottom left */}
            <motion.div
              className="absolute bottom-10 left-10 xl:left-24 2xl:left-32 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="w-8 h-px bg-white/15" />
              <span className="font-sans text-white/15 text-[9px] tracking-[0.3em] uppercase">{t('scroll')}</span>
            </motion.div>
          </div>

          {/* Zone droite — Image avec clip-path trapèze */}
          <motion.div
            className="w-[50%] relative overflow-hidden"
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="https://26.staticbtf.eno.do/v1/91-default/80de95ed4756e81d2e731b5faff6c051/media.jpg"
              alt={t('isis.heroImageAlt')}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: imageY }}
              fetchpriority="high"
            />
            {/* Grille géométrique overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 79px, rgba(255,255,255,0.03) 79px, rgba(255,255,255,0.03) 80px)',
              }}
            />
          </motion.div>

          {/* Ligne décorative bas — losange central */}
          <motion.div
            className="absolute bottom-20 left-[20%] right-[20%] flex items-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex-1 h-px bg-white/[0.06]" />
            <motion.div
              className="w-2 h-2 bg-white/[0.06] mx-3"
              style={{ transform: 'rotate(45deg)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
            />
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
        </div>

        {/* MOBILE — Image clip diagonale + contenu bas */}
        <div className="relative h-full overflow-hidden lg:hidden flex flex-col">

          {/* Image haute avec clip diagonal bas */}
          <motion.div
            className="relative h-[50%] overflow-hidden"
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <img
              src="https://26.staticbtf.eno.do/v1/91-default/80de95ed4756e81d2e731b5faff6c051/media.jpg"
              alt={t('isis.heroImageAlt')}
              className="w-full h-full object-cover object-center"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

            {/* Collection number */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-24 left-6 font-sans text-bronze/40 text-[9px] tracking-[0.3em] font-medium uppercase"
            >
              {t('isis.collectionNumber')}
            </motion.p>
          </motion.div>

          {/* Contenu bas */}
          <div className="flex-1 px-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2 tracking-[-0.03em] leading-[0.85]">
                {t('isis.heroTitle')}
              </h1>
              <p className="font-display text-lg font-light italic text-bronze/50 tracking-[-0.02em] mb-4">
                {t('isis.heroSubtitle')}
              </p>
              <div className="w-8 h-px bg-white/10 mb-4" />
              <p className="text-white/25 text-sm font-sans leading-relaxed font-light mb-4">
                {t('isis.heroDescriptionShort')}
              </p>
              <span className="inline-block border border-bronze/40 text-bronze text-[8px] px-4 py-1.5 tracking-[0.3em] font-medium uppercase mb-6">
                {t('isis.availableSoon')}
              </span>
              <button
                onClick={() => {
                  const section = document.querySelector('[data-products-section]');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden w-full border border-white/15 px-8 py-4 transition-all duration-500 hover:border-bronze/60 active:scale-[0.98]"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  {t('isis.learnMore')}
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </motion.div>

            {/* Losange décoratif */}
            <motion.div
              className="flex items-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex-1 h-px bg-white/[0.06]" />
              <div className="w-1.5 h-1.5 bg-white/[0.06] mx-2" style={{ transform: 'rotate(45deg)' }} />
              <div className="flex-1 h-px bg-white/[0.06]" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-beige" data-products-section>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-20 sm:py-32 md:py-40">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8 sm:mb-12">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-3">
                {t('isis.comingSoonTitle')}
                <br />
                <span className="font-light italic">{t('isis.comingSoonSubtitle')}</span>
              </h2>

              <div className="w-12 h-px bg-dark-text/15 mx-auto mt-8 mb-8" />
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <p className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 sm:mb-12">
                {t('isis.comingSoonDescription')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <LocaleLink
                  to="/collections/versailles"
                  className="group relative overflow-hidden border border-dark-text px-10 py-4 transition-all duration-500"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                    {t('isis.discoverVersailles')}
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </LocaleLink>
                <LocaleLink
                  to="/collections/heritage"
                  className="group relative overflow-hidden border border-dark-text/30 px-10 py-4 transition-all duration-500 hover:border-dark-text"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text/70 group-hover:text-beige transition-colors duration-500">
                    {t('isis.discoverHeritage')}
                  </span>
                  <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </LocaleLink>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
