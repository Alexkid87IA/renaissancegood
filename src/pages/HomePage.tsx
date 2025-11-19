import HeroSection from '../components/HeroSection';
import CollectionHeritage from '../components/CollectionHeritage';
import CollectionVersailles from '../components/CollectionVersailles';
import CollectionIsis from '../components/CollectionIsis';
import HistoireSection from '../components/HistoireSection';
import FabricationSection from '../components/FabricationSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CollectionHeritage />
      <CollectionVersailles />
      <CollectionIsis />
      <HistoireSection />
      <FabricationSection />
    </>
  );
}
