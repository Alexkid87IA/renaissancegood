import HeroSection from '../components/HeroSection';
import CollectionHeritage from '../components/CollectionHeritage';
import CollectionVersailles from '../components/CollectionVersailles';
import CollectionIsis from '../components/CollectionIsis';
import CollectionAllFrames from '../components/CollectionAllFrames';
import HistoireSection from '../components/HistoireSection';
import TryInStoreSection from '../components/TryInStoreSection';
import FabricationSection from '../components/FabricationSection';
import SymbolesHomeSection from '../components/SymbolesHomeSection';
import ReassuranceSection from '../components/ReassuranceSection';
import SEO from '../components/SEO';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Lunettes de Luxe Artisanales"
        description="Découvrez RENAISSANCE Paris, maison française de lunettes de luxe. Savoir-faire artisanal d'exception, matériaux nobles et design intemporel. Créées à Paris avec passion."
        url="/"
      />
      <HeroSection />
      <CollectionHeritage />
      <CollectionVersailles />
      <CollectionIsis />
      <CollectionAllFrames />
      <HistoireSection />
      <TryInStoreSection />
      <FabricationSection />
      <SymbolesHomeSection />
      <ReassuranceSection />
    </>
  );
}
