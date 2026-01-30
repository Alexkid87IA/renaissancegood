import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { stagger, fade } from './shared';

export default function ReassuranceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useTranslation('home');

  const guarantees = [
    { number: '200+', title: t('reassurance.item1Title'), description: t('reassurance.item1Desc') },
    { number: '0€', title: t('reassurance.item2Title'), description: t('reassurance.item2Desc') },
    { number: '2 ans', title: t('reassurance.item3Title'), description: t('reassurance.item3Desc') },
    { number: '100%', title: t('reassurance.item4Title'), description: t('reassurance.item4Desc') },
  ];

  return (
    <section className="sticky top-0 z-[90] bg-beige">

      {/* DESKTOP — layout 2 colonnes : texte à gauche, image à droite */}
      <div className="hidden md:flex">
        {/* Left — Content */}
        <div className="w-1/2 flex items-center justify-center px-10 lg:px-16 xl:px-20 py-24 lg:py-32">
          <motion.div
            ref={ref}
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="max-w-xl"
          >
            <motion.div variants={fade} className="mb-12 lg:mb-16">
              <p className="font-sans text-[9px] tracking-[0.35em] text-dark-text/30 uppercase mb-4 font-medium">
                {t('reassurance.label')}
              </p>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-text tracking-[-0.03em] leading-[0.9]">
                {t('reassurance.title')}
                <br />
                <span className="font-light italic tracking-[-0.02em]">{t('reassurance.subtitle')}</span>
              </h2>
            </motion.div>

            <motion.div variants={fade} className="w-12 h-px bg-dark-text/15 mb-12 lg:mb-16" />

            {/* Grille 2x2 centrée */}
            <div className="grid grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 lg:gap-y-12">
              {guarantees.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fade}
                  className="text-center"
                >
                  <p className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-dark-text tracking-[-0.02em] leading-none mb-2">
                    {item.number}
                  </p>
                  <p className="font-sans text-[9px] lg:text-[10px] tracking-[0.25em] text-dark-text/30 uppercase font-medium mb-2">
                    {item.title}
                  </p>
                  <p className="font-sans text-xs lg:text-sm text-dark-text/50 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — Image */}
        <div className="w-1/2 relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/packshot.png"
            alt="Renaissance Paris - Nos engagements"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* MOBILE — fullscreen image + overlay */}
      <div className="md:hidden relative h-screen bg-[#000000] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/packshot%20copie.png"
            alt="Nos engagements"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#000000]/45" />
          <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-b from-transparent to-[#000000]" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p className="font-sans text-white/50 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
            {t('reassurance.label')}
          </p>
          <h2 className="font-display text-3xl font-bold text-white tracking-[-0.03em] leading-[0.9] mb-1.5">
            {t('reassurance.title')}
            <br />
            <span className="font-light italic tracking-[-0.02em]">{t('reassurance.subtitle')}</span>
          </h2>

          <div className="w-10 h-px bg-white/15 my-6" />

          {/* Stats — 2x2 grid */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-6">
            {guarantees.map((item) => (
              <div key={item.title}>
                <p className="font-display text-2xl font-bold text-white tracking-[-0.02em] leading-none mb-1">
                  {item.number}
                </p>
                <p className="font-sans text-[8px] tracking-[0.25em] text-white/40 uppercase font-medium mb-1">
                  {item.title}
                </p>
                <p className="font-sans text-[11px] text-white/30 font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
