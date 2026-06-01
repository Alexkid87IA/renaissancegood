import CollectionPageTemplate from '../components/CollectionPageTemplate';
import type { CollectionPageConfig } from '../components/CollectionPageTemplate';

export default function IsisCollectionPage() {
  const config: CollectionPageConfig = {
    collectionId: 'ISIS',
    collectionName: 'Isis',
    translationPrefix: 'isis',
    heroImage: 'https://26.staticbtf.eno.do/v1/91-default/80de95ed4756e81d2e731b5faff6c051/media.jpg',
    seoUrl: '/collections/isis',
    heroVideo: 'https://renaissance-cdn.b-cdn.net/videos/isis-collection-v2.mp4',
    heroPoster: 'https://renaissance-cdn.b-cdn.net/videos/isis-collection-poster.jpg',
  };

  return <CollectionPageTemplate config={config} />;
}
