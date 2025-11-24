import HeroSection from '../components/HeroSection';
import ExcellenceSection from '../components/ExcellenceSection';
import CollectionHeritage from '../components/CollectionHeritage';
import CollectionVersailles from '../components/CollectionVersailles';
import CollectionIsis from '../components/CollectionIsis';
import AmbassadorsHomeSection from '../components/AmbassadorsHomeSection';
import HistoireSection from '../components/HistoireSection';
import TryInStoreSection from '../components/TryInStoreSection';
import FabricationSection from '../components/FabricationSection';
import ReassuranceSection from '../components/ReassuranceSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExcellenceSection />
      <CollectionHeritage />
      <CollectionVersailles />
      <CollectionIsis />
      <AmbassadorsHomeSection />
      <HistoireSection />
      <TryInStoreSection />
      <FabricationSection />
      <ReassuranceSection />
    </>
  );
}
