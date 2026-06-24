import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { useSectionSnap } from '../hooks/useSectionSnap';

// Import des sections redesignées
import HeroHistoireSection from '../components/histoire/HeroHistoireSection';
import FondateursSection from '../components/histoire/FondateursSection';
import SavoirFaireSection from '../components/histoire/SavoirFaireSection';
import SymbolesSection from '../components/histoire/SymbolesSection';
import SignatureSection from '../components/histoire/SignatureSection';
import EngagementSection from '../components/histoire/EngagementSection';

export default function HistoirePage() {
  const { t } = useTranslation('histoire');

  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
  const { hash } = useLocation();

  useEffect(() => {
    if (!isDesktop) return;
    document.documentElement.classList.add('homepage-snap');
    return () => {
      document.documentElement.classList.remove('homepage-snap');
    };
  }, [isDesktop]);

  // Défilement vers la section ciblée par l'ancre (#fabrication, #symboles) ;
  // sinon, retour en haut de page comme avant. Plusieurs tentatives échelonnées
  // pour rattraper le reflow (chargement de la page lazy + images des sections).
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    // Les sections sont en `sticky top-0` (desktop) : depuis une position plus
    // basse, un scroll relatif ne remonte pas. On remet à zéro, on mesure l'offset
    // absolu, puis on descend. Plusieurs passes pour rattraper le reflow.
    const timers = [120, 400, 800, 1300].map((delay) =>
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        window.scrollTo(0, 0);
        const top = el.getBoundingClientRect().top;
        window.scrollTo({ top, behavior: 'auto' });
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [hash]);

  useSectionSnap(isDesktop);

  return (
    <div className="bg-[#0a0a0a] relative">
      <SEO
        title={t('page.histoire.seoTitle')}
        description={t('page.histoire.seoDescription')}
        url="/histoire"
      />
      <HeroHistoireSection />
      <FondateursSection />
      <SavoirFaireSection />
      <SymbolesSection />
      <SignatureSection />
      <EngagementSection />
    </div>
  );
}
