import CollectionPageTemplate from '../components/CollectionPageTemplate';
import type { CollectionPageConfig } from '../components/CollectionPageTemplate';

export default function HeritageCollectionPage() {
  const config: CollectionPageConfig = {
    collectionId: 'HERITAGE',
    collectionName: 'Heritage',
    translationPrefix: 'heritage',
    heroImage: 'https://renaissance-cdn.b-cdn.net/Generated%20Image%20January%2029%2C%202026%20-%203_58AM.jpeg',
    // Desktop (colonne portrait) + mobile (plein cadre) : vidéo verticale 9:16.
    heroVideo: 'https://renaissance-cdn.b-cdn.net/videos/HERO_16_9_HERITAGE_web.mp4',
    heroPoster: 'https://renaissance-cdn.b-cdn.net/videos/HERO_16_9_HERITAGE_poster.jpg',
    heroVideoMobile: 'https://renaissance-cdn.b-cdn.net/videos/HERO_9_16_HERITAGE_web.mp4',
    heroPosterMobile: 'https://renaissance-cdn.b-cdn.net/videos/HERO_9_16_HERITAGE_poster.jpg',
    seoUrl: '/collections/heritage',
  };

  return <CollectionPageTemplate config={config} />;
}
