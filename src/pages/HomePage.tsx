import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection';
import CollectionTriptych from '../components/CollectionTriptych';
import CollectionAllFrames from '../components/CollectionAllFrames';
import HistoireSection from '../components/HistoireSection';
import TryInStoreSection from '../components/TryInStoreSection';
import FabricationSection from '../components/FabricationSection';
import SEO from '../components/SEO';
import { useSectionSnap } from '../hooks/useSectionSnap';

export default function HomePage() {
  const { t } = useTranslation('home');

  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

  useEffect(() => {
    if (!isDesktop) return;
    document.documentElement.classList.add('homepage-snap');
    return () => {
      document.documentElement.classList.remove('homepage-snap');
    };
  }, [isDesktop]);

  useSectionSnap(isDesktop);

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url="/"
      />
      <HeroSection />
      <CollectionTriptych />
      <CollectionAllFrames />
      <TryInStoreSection />
      <HistoireSection />
      <FabricationSection />
    </>
  );
}
