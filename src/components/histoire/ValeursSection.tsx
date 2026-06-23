import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ValeursSection() {
  const { t } = useTranslation('histoire');

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
    <motion.section className="snap-section h-[100dvh] lg:h-screen lg:sticky lg:top-0 z-50 bg-[#000000] overflow-hidden">
      {/* DESKTOP */}
      <div className="hidden md:block h-full relative bg-[#000000]">
        <img
          src="https://renaissance-cdn.b-cdn.net/campagne-valeurs.webp"
          alt="Campagne Renaissance - Nos valeurs"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#000000]/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-[#000000]/46" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/82 via-transparent to-[#000000]/30" />

        <div className="relative z-10 flex h-full items-center px-10 pt-28 pb-10 lg:px-14 xl:px-20">
          <div className="grid w-full grid-cols-[0.92fr_1.08fr] items-start gap-12 xl:gap-16">
            <div className="max-w-[33rem] pt-3">
              <div className="flex items-center gap-5 mb-6">
              <p className="font-sans text-bronze/[0.65] text-[9px] tracking-[0.42em] font-medium uppercase">
                {t('valeursSection.label')}
              </p>
              </div>
              <h2 className="font-display text-5xl lg:text-[4.4rem] xl:text-[5.2rem] font-bold text-white tracking-[-0.04em] leading-[0.84] mb-3">
                {t('valeursSection.title')}
              </h2>
              <p className="font-display text-3xl lg:text-[2.65rem] xl:text-[3rem] font-light italic text-white/[0.6] tracking-[-0.03em] leading-none">
                {t('valeursSection.subtitle')}
              </p>
            </div>

            <div className="border-y border-white/[0.12]">
              {valeurs.map((valeur, i) => {
                const isCrown = i === valeurs.length - 1;
                return (
                <div
                  key={valeur.title}
                  className={`group grid grid-cols-[13rem_1fr] gap-8 border-b border-white/[0.10] py-4 last:border-b-0 xl:grid-cols-[15rem_1fr] xl:py-5 ${isCrown ? 'mt-2 border-t border-t-bronze/40 border-b-0' : ''}`}
                >
                  <div>
                    <p className={`font-sans text-[8px] tracking-[0.28em] uppercase font-medium mb-2 ${isCrown ? 'text-bronze' : 'text-bronze/[0.72]'}`}>
                      {isCrown ? 'La couronne' : valeur.keyword}
                    </p>
                    <h3 className={`font-display text-2xl xl:text-[1.85rem] font-bold tracking-[-0.02em] leading-[0.95] ${isCrown ? 'text-bronze' : 'text-white'}`}>
                      {valeur.title}
                    </h3>
                  </div>
                  <p className="font-sans text-[13px] xl:text-sm leading-[1.75] font-light text-white/[0.62] transition-colors duration-500 group-hover:text-white/[0.82]">
                    {valeur.description}
                  </p>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="h-screen md:hidden relative overflow-hidden">
        <img
          src="https://renaissance-cdn.b-cdn.net/campagne-valeurs.webp"
          alt="Renaissance - Né d'un refus"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/96 via-black/72 to-black/30" />

        <div className="relative h-full overflow-y-auto text-center px-6 pt-24 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="font-sans text-bronze/[0.72] text-[8px] tracking-[0.4em] font-medium uppercase mb-4">
            {t('valeursSection.label')}
          </p>
          <h2 className="font-display text-4xl font-bold text-white tracking-[-0.04em] leading-[0.9] mb-2">
            {t('valeursSection.title')}
          </h2>
          <p className="font-display text-2xl font-light italic text-white/65 tracking-[-0.03em] mb-6">
            {t('valeursSection.subtitle')}
          </p>

          <div className="border-y border-white/[0.12]">
            {valeurs.map((valeur, i) => {
              const isCrown = i === valeurs.length - 1;
              return (
              <div key={valeur.title} className={`border-b border-white/[0.10] py-4 last:border-b-0 ${isCrown ? 'mt-2 border-t border-t-bronze/40 border-b-0' : ''}`}>
                <p className={`font-sans text-[7px] tracking-[0.22em] uppercase font-medium mb-2 ${isCrown ? 'text-bronze' : 'text-bronze/[0.72]'}`}>
                  {isCrown ? 'La couronne' : valeur.keyword}
                </p>
                <h3 className={`font-display text-xl font-bold tracking-[-0.02em] leading-tight mb-2 ${isCrown ? 'text-bronze' : 'text-white'}`}>
                  {valeur.title}
                </h3>
                <p className="font-sans text-xs leading-[1.6] text-white/[0.58]">
                  {valeur.description}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
