import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SavoirFaireSection from '../components/histoire/SavoirFaireSection';
import SEO from '../components/SEO';

export default function SavoirFairePage() {
  const { t } = useTranslation('histoire');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-text relative">
      <SEO
        title={t('page.savoirFaire.seoTitle')}
        description={t('page.savoirFaire.seoDescription')}
        url="/savoir-faire"
      />
      <SavoirFaireSection />
    </div>
  );
}
