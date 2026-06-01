import { useEffect } from 'react';
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
import { useSectionSnap } from '../hooks/useSectionSnap';

function MobileDivider() {
  return (
    <div className="lg:hidden relative py-1 bg-[#000000]">
      <div className="flex items-center gap-3 px-7">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <div className="w-1 h-1 bg-bronze/40 rotate-45" />
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>
    </div>
  );
}

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
      <MobileDivider />
      <CollectionHeritage />
      <MobileDivider />
      <CollectionVersailles />
      <MobileDivider />
      <CollectionIsis />
      <MobileDivider />
      <CollectionAllFrames />
      <MobileDivider />
      <TryInStoreSection />
      <MobileDivider />
      <HistoireSection />
      <MobileDivider />
      <FabricationSection />
      <MobileDivider />
      <ReassuranceSection />
    </>
  );
}
