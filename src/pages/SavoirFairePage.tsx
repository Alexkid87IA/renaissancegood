import { useEffect } from 'react';
import SavoirFaireSection from '../components/histoire/SavoirFaireSection';
import SEO from '../components/SEO';

export default function SavoirFairePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-text relative">
      <SEO
        title="Savoir-Faire"
        description="Découvrez le savoir-faire artisanal RENAISSANCE Paris. Fabrication française, matériaux nobles et techniques d'excellence pour des lunettes de luxe uniques."
        url="/savoir-faire"
      />
      <SavoirFaireSection />
    </div>
  );
}
