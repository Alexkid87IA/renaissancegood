import { useEffect } from 'react';
import SymbolesSection from '../components/histoire/SymbolesSection';

export default function SymbolesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-beige relative">
      <SymbolesSection />
    </div>
  );
}
