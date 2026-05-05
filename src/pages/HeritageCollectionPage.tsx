import CollectionPageTemplate from '../components/CollectionPageTemplate';
import type { CollectionPageConfig } from '../components/CollectionPageTemplate';

export default function HeritageCollectionPage() {
  const config: CollectionPageConfig = {
    collectionId: 'HERITAGE',
    collectionName: 'Heritage',
    translationPrefix: 'heritage',
    heroImage: 'https://renaissance-cdn.b-cdn.net/Generated%20Image%20January%2029%2C%202026%20-%203_58AM.jpeg',
    seoUrl: '/collections/heritage',
  };

  return <CollectionPageTemplate config={config} />;
}
