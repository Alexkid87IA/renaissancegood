import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SymbolesSection from '../components/histoire/SymbolesSection';
import SEO from '../components/SEO';

export default function SymbolesPage() {
  const { t } = useTranslation('histoire');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-beige relative">
      <SEO
        title={t('page.symboles.seoTitle')}
        description={t('page.symboles.seoDescription')}
        url="/symboles"
      />
      <SymbolesSection />
    </div>
  );
}
