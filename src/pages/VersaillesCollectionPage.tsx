import CollectionPageTemplate from '../components/CollectionPageTemplate';
import type { CollectionPageConfig } from '../components/CollectionPageTemplate';

export default function VersaillesCollectionPage() {
  const config: CollectionPageConfig = {
    collectionId: 'VERSAILLES',
    collectionName: 'Versailles',
    translationPrefix: 'versailles',
    heroImage: 'https://renaissance-cdn.b-cdn.net/campgane.png',
    heroVideo: 'https://renaissance-cdn.b-cdn.net/videos/versailles-collection-v2.mp4',
    heroPoster: 'https://renaissance-cdn.b-cdn.net/videos/renaissance-collection-poster.jpg',
    seoUrl: '/collections/versailles',
  };

  return <CollectionPageTemplate config={config} />;
}
