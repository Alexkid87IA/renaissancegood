import { useTranslation } from 'react-i18next';
import CollectionPageTemplate from '../components/CollectionPageTemplate';
import type { CollectionPageConfig } from '../components/CollectionPageTemplate';

export default function VersaillesCollectionPage() {
  const { t } = useTranslation('collections');

  const config: CollectionPageConfig = {
    collectionId: 'VERSAILLES',
    collectionName: 'Versailles',
    translationPrefix: 'versailles',
    heroImage: 'https://renaissance-cdn.b-cdn.net/campgane.png',
    seoUrl: '/collections/versailles',
    extraShapeFilters: [
      { label: t('filters.hexagonal'), value: 'Hexagonal' }
    ],
  };

  return <CollectionPageTemplate config={config} />;
}
