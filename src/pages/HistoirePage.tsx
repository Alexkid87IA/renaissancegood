import { useEffect } from 'react';

// Import des nouvelles sections redesignées
import HeroHistoireSection from '../components/histoire/HeroHistoireSection';
import FondateursSection from '../components/histoire/FondateursSection';
import SavoirFaireSection from '../components/histoire/SavoirFaireSection';
import SymbolesSection from '../components/histoire/SymbolesSection';
import ValeursSection from '../components/histoire/ValeursSection';
import CollectionsThemesSection from '../components/histoire/CollectionsThemesSection';
import SignatureSection from '../components/histoire/SignatureSection';
import AmbassadeursSection from '../components/histoire/AmbassadeursSection';
import EngagementSection from '../components/histoire/EngagementSection';

export default function HistoirePage() {
  // Scroll to top au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-beige relative">
      <HeroHistoireSection />
      <ValeursSection />
      <FondateursSection />
      <SavoirFaireSection />
      <SymbolesSection />
      <CollectionsThemesSection />
      <SignatureSection />
      <AmbassadeursSection />
      <EngagementSection />
    </div>
  );
}