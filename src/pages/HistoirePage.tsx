import { useEffect } from 'react';
import HeroHistoireSection from '../components/histoire/HeroHistoireSection';
import FondateursSection from '../components/histoire/FondateursSection';
import SavoirFaireSection from '../components/histoire/SavoirFaireSection';
import SymbolesSection from '../components/histoire/SymbolesSection';
import ValeursSection from '../components/histoire/ValeursSection';
import CollectionsThemesSection from '../components/histoire/CollectionsThemesSection';
import SignatureSection from '../components/histoire/SignatureSection';
import EngagementSection from '../components/histoire/EngagementSection';

export default function HistoirePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-beige">
      <HeroHistoireSection />
      <FondateursSection />
      <SavoirFaireSection />
      <SymbolesSection />
      <ValeursSection />
      <CollectionsThemesSection />
      <SignatureSection />
      <EngagementSection />
    </div>
  );
}
