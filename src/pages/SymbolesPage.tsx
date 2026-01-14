import { useEffect } from 'react';
import SymbolesSection from '../components/histoire/SymbolesSection';
import SEO from '../components/SEO';

export default function SymbolesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-beige relative">
      <SEO
        title="Symboles"
        description="Découvrez les symboles qui inspirent RENAISSANCE Paris. Scarabée, fleur de lys et croix de Malte : des emblèmes chargés d'histoire pour des lunettes uniques."
        url="/symboles"
      />
      <SymbolesSection />
    </div>
  );
}
