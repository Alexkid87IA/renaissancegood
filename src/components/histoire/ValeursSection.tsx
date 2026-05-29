import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ValeursSection() {
  const { t } = useTranslation('histoire');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const valeurs = [
    {
      title: t('valeursSection.valeur1Title'),
      description: t('valeursSection.valeur1Desc'),
      keyword: t('valeursSection.valeur1Keyword')
    },
    {
      title: t('valeursSection.valeur2Title'),
      description: t('valeursSection.valeur2Desc'),
      keyword: t('valeursSection.valeur2Keyword')
    },
    {
      title: t('valeursSection.valeur3Title'),
      description: t('valeursSection.valeur3Desc'),
      keyword: t('valeursSection.valeur3Keyword')
    },
    {
      title: t('valeursSection.valeur4Title'),
      description: t('valeursSection.valeur4Desc'),
      keyword: t('valeursSection.valeur4Keyword')
    },
    {
      title: t('valeursSection.valeur5Title'),
      description: t('valeursSection.valeur5Desc'),
      keyword: t('valeursSection.valeur5Keyword')
    }
  ];

  return (
    <motion.section className="snap-section h-[100dvh] lg:h-screen sticky top-0 z-50 bg-[#000000] overflow-hidden">
      {/* DESKTOP */}
      <div className="hidden md:block h-full relative bg-[#000000]">
        <img
          src="https://renaissance-cdn.b-cdn.net/campgane.png"
          alt="Campagne Renaissance - Nos valeurs"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#000000]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/72 to-[#000000]/35" />

        <div className="relative z-10 flex h-full flex-col justify-center px-10 pt-28 pb-10 lg:px-14 xl:px-20">
          <div className="max-w-5xl">
            <div className="flex items-center gap-5 mb-5">
              <span className="h-px w-14 bg-bronze/[0.55]" />
              <p className="font-sans text-bronze/[0.65] text-[9px] tracking-[0.42em] font-medium uppercase">
                {t('valeursSection.label')}
              </p>
            </div>
            <h2 className="font-display text-5xl lg:text-[4.5rem] xl:text-[5.6rem] font-bold text-white tracking-[-0.04em] leading-[0.84] mb-2">
              {t('valeursSection.title')}
            </h2>
            <p className="font-display text-3xl lg:text-[2.8rem] xl:text-[3.3rem] font-light italic text-white/[0.58] tracking-[-0.03em] leading-none">
              {t('valeursSection.subtitle')}
            </p>
          </div>

          <div className="mt-9 grid grid-cols-5 gap-3 xl:gap-4">
            {valeurs.map((valeur, index) => (
              <div
                key={valeur.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={[
                  'group min-h-[15rem] border border-white/[0.12] bg-white/[0.035] p-5 xl:p-6 transition-all duration-500',
                  hoveredIndex === index ? 'border-bronze/[0.55] bg-bronze/[0.08]' : 'hover:border-white/[0.28]'
                ].join(' ')}
              >
                <p className={[
                  'font-sans text-[8px] tracking-[0.24em] uppercase font-medium mb-5 transition-colors duration-500',
                  hoveredIndex === index ? 'text-bronze' : 'text-white/[0.28]'
                ].join(' ')}>
                  {valeur.keyword}
                </p>
                <h3 className="font-display text-2xl xl:text-[1.75rem] text-white font-bold tracking-[-0.02em] leading-[0.95] mb-5">
                  {valeur.title}
                </h3>
                <p className="font-sans text-[12px] xl:text-[13px] leading-[1.7] font-light text-white/[0.58]">
                  {valeur.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/campgane.png"
          alt="Campagne Renaissance"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/96 via-black/72 to-black/30" />

        <div className="relative h-full overflow-y-auto px-6 pt-24 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="font-sans text-bronze/[0.72] text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
            {t('valeursSection.label')}
          </p>
          <h2 className="font-display text-4xl font-bold text-white tracking-[-0.04em] leading-[0.9] mb-2">
            {t('valeursSection.title')}
          </h2>
          <p className="font-display text-2xl font-light italic text-white/65 tracking-[-0.03em] mb-6">
            {t('valeursSection.subtitle')}
          </p>

          <div className="space-y-3">
            {valeurs.map((valeur) => (
              <div key={valeur.title} className="border border-white/[0.12] bg-white/[0.04] p-4">
                <p className="font-sans text-[7px] tracking-[0.22em] text-bronze/[0.72] uppercase font-medium mb-2">
                  {valeur.keyword}
                </p>
                <h3 className="font-display text-xl text-white font-bold tracking-[-0.02em] leading-tight mb-2">
                  {valeur.title}
                </h3>
                <p className="font-sans text-xs leading-[1.6] text-white/[0.58]">
                  {valeur.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
