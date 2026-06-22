import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import LocaleLink from '../components/LocaleLink';

interface Step {
  n: string;
  t: string;
  d: string;
}

const CDN = 'https://renaissance-cdn.b-cdn.net';

// Photos retouchées (grade léger + grain fin), même traitement desktop/mobile.
const imgDesktop = (n: string) => `${CDN}/fabrication-${n}-43.jpg`;
const imgMobile = (n: string) => `${CDN}/fabrication-${n}-9-16.jpg`;

// Rythme de la mosaïque desktop : hauteur de chaque tuile (en lignes de grille).
// Crée une composition asymétrique, éditoriale, qui se lit en zigzag.
const TILE_SPAN = [22, 14, 18, 26, 16, 20, 15, 24, 18, 14, 22, 17];

export default function FabricationPage() {
  const { t } = useTranslation('home');
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = t('fabricationPage.steps', { returnObjects: true }) as Step[];

  // Mobile : suit l'étape visible dans le carrousel horizontal.
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="bg-[#0a0a0a] text-white" data-header-theme="dark">
      <SEO
        title={t('fabricationPage.seoTitle')}
        description={t('fabricationPage.seoDescription')}
        url="/fabrication"
      />

      {/* ===================== DESKTOP — mosaïque éditoriale ===================== */}
      <div className="hidden md:block">
        {/* En-tête — centré */}
        <header className="px-10 lg:px-16 pt-36 lg:pt-44 pb-14 lg:pb-20 max-w-4xl mx-auto text-center">
          <p className="font-sans text-white/45 text-[9px] tracking-[0.42em] font-medium uppercase mb-7">
            {t('fabricationPage.label')}
          </p>
          <h1 className="font-display font-bold tracking-[-0.01em] leading-[0.84] text-[clamp(3.5rem,7vw,7.5rem)]">
            {t('fabricationPage.title')}
            <span className="block font-light italic text-white/75">{t('fabricationPage.subtitle')}</span>
          </h1>
          <p className="mt-9 max-w-lg mx-auto font-sans text-sm lg:text-base leading-[1.9] font-light text-white/65">
            {t('fabricationPage.intro')}
          </p>
        </header>

        {/* Mur de photos — colonnes asymétriques */}
        <div className="px-6 lg:px-10 pb-10 columns-2 lg:columns-3 xl:columns-4 gap-4 lg:gap-5 [column-fill:_balance]">
          {steps.map((step, i) => (
            <LocaleLink
              key={step.n}
              to="/shop"
              className="group relative mb-4 lg:mb-5 block w-full overflow-hidden rounded-2xl break-inside-avoid"
              style={{ height: `${TILE_SPAN[i % TILE_SPAN.length]}rem` }}
            >
              <img
                src={imgDesktop(step.n)}
                alt={step.t}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
              />
              {/* Voile uniforme : le texte reste lisible quelle que soit la photo */}
              <div className="absolute inset-0 bg-[#000000]/55 transition-colors duration-500 group-hover:bg-[#000000]/70" />
              {/* Numéro — haut à gauche */}
              <p className="absolute top-5 left-5 font-display text-[#d8b88a] text-3xl font-light leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.9)]">
                {step.n}
              </p>
              {/* Titre, grand, centré */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 [text-shadow:0_2px_18px_rgba(0,0,0,0.9)]">
                <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.01em] leading-[1.02]">
                  {step.t}
                </h2>
                {/* Description révélée au survol */}
                <p className="font-sans text-sm leading-snug font-light text-white/0 max-h-0 max-w-[16rem] overflow-hidden transition-all duration-500 group-hover:text-white/80 group-hover:max-h-28 group-hover:mt-3">
                  {step.d}
                </p>
              </div>
            </LocaleLink>
          ))}
        </div>

        {/* Clôture */}
        <section className="px-10 lg:px-16 py-24 text-center border-t border-white/[0.08]">
          <p className="font-display text-4xl lg:text-5xl font-light italic tracking-[-0.02em] leading-[1.1] max-w-2xl mx-auto">
            {t('fabricationPage.closing')}
          </p>
          <LocaleLink
            to="/shop"
            className="group/btn relative overflow-hidden inline-flex items-center justify-center rounded-2xl border border-white/[0.55] px-9 py-4 mt-12 transition-colors duration-500"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
            <span className="relative z-10 font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-white group-hover/btn:text-[#0a0a0a] transition-colors duration-500">
              {t('fabricationPage.cta')}
            </span>
          </LocaleLink>
        </section>
      </div>

      {/* ===================== MOBILE — carrousel horizontal plein écran ===================== */}
      <div className="md:hidden relative h-[100svh] w-full overflow-hidden bg-[#0a0a0a]">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex h-[100svh] w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((step) => (
            <section
              key={step.n}
              className="relative h-full w-screen shrink-0 snap-center overflow-hidden"
            >
              <img
                src={imgMobile(step.n)}
                alt={step.t}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/45 via-[#000000]/15 to-[#000000]/90" />

              <div className="relative h-full flex flex-col justify-end px-8 pb-24 text-center items-center [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]">
                <p className="font-display text-[#d8b88a] text-4xl font-light leading-none mb-3">{step.n}</p>
                <h2 className="font-display text-4xl font-bold tracking-[-0.02em] leading-[0.95] mb-3">
                  {step.t}
                </h2>
                <p className="font-sans text-sm leading-[1.7] font-light text-white/75 max-w-xs">
                  {step.d}
                </p>
              </div>
            </section>
          ))}

          {/* Dernier panneau — clôture + CTA */}
          <section className="relative h-full w-screen shrink-0 snap-center flex flex-col items-center justify-center px-8 text-center bg-[#0a0a0a]">
            <p className="font-display text-3xl font-light italic tracking-[-0.02em] leading-[1.15] max-w-xs">
              {t('fabricationPage.closing')}
            </p>
            <LocaleLink
              to="/shop"
              className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-9 py-4 mt-10 font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-white active:bg-white active:text-[#0a0a0a] transition-colors duration-300"
            >
              {t('fabricationPage.cta')}
            </LocaleLink>
          </section>
        </div>

        {/* Indicateur d'étape + invite à glisser */}
        <div className="pointer-events-none absolute top-24 left-0 right-0 flex flex-col items-center gap-3">
          <p className="font-sans text-white/50 text-[8px] tracking-[0.42em] font-medium uppercase">
            {t('fabricationPage.label')}
          </p>
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-5 bg-white' : 'w-1 bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
