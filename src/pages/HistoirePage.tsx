import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import SectionIndicator from '../components/SectionIndicator';
import { useSectionSnap } from '../hooks/useSectionSnap';

// Import des sections redesignées
import HeroHistoireSection from '../components/histoire/HeroHistoireSection';
import FondateursSection from '../components/histoire/FondateursSection';
import SavoirFaireSection from '../components/histoire/SavoirFaireSection';
import SymbolesSection from '../components/histoire/SymbolesSection';
import ValeursSection from '../components/histoire/ValeursSection';
import SignatureSection from '../components/histoire/SignatureSection';
import EngagementSection from '../components/histoire/EngagementSection';

export default function HistoirePage() {
  const { t } = useTranslation('histoire');

  // Même logique que la home : sections sticky + snap doux.
  useEffect(() => {
    document.documentElement.classList.add('homepage-snap');
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.classList.remove('homepage-snap');
    };
  }, []);

  useSectionSnap(true);

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
      <ValeursSection />
      <SignatureSection />
      <EngagementSection />
      <SectionIndicator />
    </div>
  );
}
