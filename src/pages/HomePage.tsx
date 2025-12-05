import HeroSection from '../components/HeroSection';
import CollectionHeritage from '../components/CollectionHeritage';
import CollectionVersailles from '../components/CollectionVersailles';
import CollectionIsis from '../components/CollectionIsis';
import CollectionAllFrames from '../components/CollectionAllFrames';
import AmbassadorsHomeSection from '../components/AmbassadorsHomeSection';
import HistoireSection from '../components/HistoireSection';
import TryInStoreSection from '../components/TryInStoreSection';
import FabricationSection from '../components/FabricationSection';
import SymbolesHomeSection from '../components/SymbolesHomeSection';
import ReassuranceSection from '../components/ReassuranceSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CollectionHeritage />
      <CollectionVersailles />
      <CollectionIsis />
      <CollectionAllFrames />
      <AmbassadorsHomeSection />
      <HistoireSection />
      <TryInStoreSection />
      <FabricationSection />
      <SymbolesHomeSection />
      <ReassuranceSection />
    </>
  );
}
