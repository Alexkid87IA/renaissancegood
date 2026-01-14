import { useEffect } from 'react';
import ValeursSection from '../components/histoire/ValeursSection';
import SEO from '../components/SEO';

export default function ManifestePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-text relative">
      <SEO
        title="Manifeste"
        description="Découvrez le manifeste RENAISSANCE Paris. Nos valeurs d'excellence, d'authenticité et de savoir-faire français au service de la lunetterie de luxe."
        url="/manifeste"
      />
      <ValeursSection />
    </div>
  );
}
