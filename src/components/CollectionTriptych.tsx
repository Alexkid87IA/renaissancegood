import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useStackedScroll } from '../hooks/useStackedScroll';
import LocaleLink from './LocaleLink';

interface Panel {
  key: 'isis' | 'versailles' | 'heritage';
  href: string;
  image: string;
}

const PANELS: Panel[] = [
  { key: 'isis', href: '/collections/isis', image: '/home-collections/isis.jpg' },
  { key: 'versailles', href: '/collections/versailles', image: '/home-collections/versailles.jpg' },
  { key: 'heritage', href: '/collections/heritage', image: '/home-collections/heritage.jpg' },
];

// z croissant dans la chaîne globale de l'accueil (Hero 10 → cartes 20/30/40 → boutique 50 → …).
const MOBILE_Z = ['z-20', 'z-30', 'z-40'];

export default function CollectionTriptych() {
  const { t } = useTranslation('collections');
  const sectionRef = useRef<HTMLElement>(null);
  const { sectionStyle } = useStackedScroll(sectionRef);

  return (
    <>
      {/* DESKTOP — triptyque : les 3 collections côte à côte, un seul écran */}
      <motion.section
        ref={sectionRef}
        style={sectionStyle}
        className="snap-section hidden md:block h-[100dvh] lg:h-screen lg:sticky lg:top-0 relative z-20 overflow-hidden bg-[#000000]"
        data-header-theme="dark"
      >
        <div className="h-full flex flex-row">
          {PANELS.map((panel) => (
            <LocaleLink
              key={panel.key}
              to={panel.href}
              className="group relative flex-1 h-full overflow-hidden"
            >
              <motion.img
                src={panel.image}
                alt={t(`${panel.key}.title`)}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/55 via-[#000000]/10 to-[#000000]/15 pointer-events-none" />
              <div className="absolute inset-0 bg-[#000000]/0 group-hover:bg-[#000000]/15 transition-colors duration-700 pointer-events-none" />

              <div className="absolute left-0 right-0 top-[72%] -translate-y-1/2 flex flex-col items-center px-3 pointer-events-none [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
                <p className="font-sans text-white/70 text-[9px] tracking-[0.42em] font-medium uppercase mb-2.5 transition-transform duration-700 group-hover:-translate-y-1">
                  {t(`${panel.key}.label`)}
                </p>
                <h3 className="font-display text-white text-center font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(1.4rem,2.6vw,3.4rem)] transition-transform duration-700 group-hover:-translate-y-1">
                  {t(`${panel.key}.title`)}
                </h3>
              </div>
            </LocaleLink>
          ))}
        </div>
      </motion.section>

      {/* MOBILE — chaque collection plein écran, collante : elle se fige et la suivante monte par-dessus.
          Pas de conteneur : les cartes sont sœurs des autres sections, la chaîne sticky reste continue. */}
      {PANELS.map((panel, i) => (
          <LocaleLink
            key={panel.key}
            to={panel.href}
            className={`md:hidden sticky top-0 block h-[100dvh] overflow-hidden bg-[#000000] ${MOBILE_Z[i]}`}
            data-header-theme="dark"
          >
            <img
              src={panel.image}
              alt={t(`${panel.key}.title`)}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/20 via-transparent to-[#000000]/75 pointer-events-none" />

            <div className="relative h-full flex flex-col items-center text-center justify-end px-7 pb-10">
              <h3 className="font-display text-[2.6rem] sm:text-5xl font-bold tracking-[-0.03em] leading-[0.88] text-white mb-2">
                {t(`${panel.key}.title`)}
              </h3>
              <p className="font-display text-xl font-light italic text-white/60 tracking-[-0.02em] mb-6">
                {t(`${panel.key}.subtitle`)}
              </p>
              <span className="font-display text-[13px] italic text-white/70 tracking-[-0.01em] border-b border-white/30 pb-1.5">
                {t(`${panel.key}.discover`)}
              </span>
            </div>
          </LocaleLink>
      ))}
    </>
  );
}
