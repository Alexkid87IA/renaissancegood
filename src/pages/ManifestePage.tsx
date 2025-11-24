import { useEffect } from 'react';
import ValeursSection from '../components/histoire/ValeursSection';

export default function ManifestePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-text relative">
      <ValeursSection />
    </div>
  );
}
