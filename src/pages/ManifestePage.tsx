import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ValeursSection from '../components/histoire/ValeursSection';
import SEO from '../components/SEO';

export default function ManifestePage() {
  const { t } = useTranslation('histoire');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-text relative">
      <SEO
        title={t('page.manifeste.seoTitle')}
        description={t('page.manifeste.seoDescription')}
        url="/manifeste"
      />
      <ValeursSection />
    </div>
  );
}
