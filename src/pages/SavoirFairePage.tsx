import { useEffect } from 'react';
import SavoirFaireSection from '../components/histoire/SavoirFaireSection';

export default function SavoirFairePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-text relative">
      <SavoirFaireSection />
    </div>
  );
}
