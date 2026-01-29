import { useEffect } from 'react';
import SEO from '../components/SEO';

// Import des sections redesignées
import HeroHistoireSection from '../components/histoire/HeroHistoireSection';
import FondateursSection from '../components/histoire/FondateursSection';
import SavoirFaireSection from '../components/histoire/SavoirFaireSection';
import SymbolesSection from '../components/histoire/SymbolesSection';
import ValeursSection from '../components/histoire/ValeursSection';
import SignatureSection from '../components/histoire/SignatureSection';
import EngagementSection from '../components/histoire/EngagementSection';

export default function HistoirePage() {
  // Scroll to top au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a0a] relative">
      <SEO
        title="Notre Histoire"
        description="Découvrez l'histoire de RENAISSANCE Paris, maison française de lunettes de luxe. Notre savoir-faire artisanal, nos valeurs et notre engagement pour l'excellence."
        url="/histoire"
      />
      <HeroHistoireSection />
      <FondateursSection />
      <SavoirFaireSection />
      <SymbolesSection />
      <ValeursSection />
      <SignatureSection />
      <EngagementSection />
    </div>
  );
}