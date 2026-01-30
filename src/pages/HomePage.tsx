import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection';
import CollectionHeritage from '../components/CollectionHeritage';
import CollectionVersailles from '../components/CollectionVersailles';
import CollectionIsis from '../components/CollectionIsis';
import CollectionAllFrames from '../components/CollectionAllFrames';
import HistoireSection from '../components/HistoireSection';
import TryInStoreSection from '../components/TryInStoreSection';
import FabricationSection from '../components/FabricationSection';
import ReassuranceSection from '../components/ReassuranceSection';
import SEO from '../components/SEO';

export default function HomePage() {
  const { t } = useTranslation('home');

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url="/"
      />
      <HeroSection />
      <CollectionHeritage />
      <CollectionVersailles />
      <CollectionIsis />
      <CollectionAllFrames />
      <TryInStoreSection />
      <HistoireSection />
      <FabricationSection />
      <ReassuranceSection />
    </>
  );
}
