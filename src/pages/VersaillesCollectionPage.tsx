import CollectionPageTemplate from '../components/CollectionPageTemplate';
import type { CollectionPageConfig } from '../components/CollectionPageTemplate';

export default function VersaillesCollectionPage() {
  const config: CollectionPageConfig = {
    collectionId: 'VERSAILLES',
    collectionName: 'Versailles',
    translationPrefix: 'versailles',
    heroImage: 'https://renaissance-cdn.b-cdn.net/campgane.png',
    // Desktop (colonne portrait) + mobile (plein cadre) : vidéo verticale 9:16.
    heroVideo: 'https://renaissance-cdn.b-cdn.net/videos/HERO_16_9_VERSAILLES_web.mp4',
    heroPoster: 'https://renaissance-cdn.b-cdn.net/videos/HERO_16_9_VERSAILLES_poster.jpg',
    heroVideoMobile: 'https://renaissance-cdn.b-cdn.net/videos/HERO_9_16_VERSAILLES_web.mp4',
    heroPosterMobile: 'https://renaissance-cdn.b-cdn.net/videos/HERO_9_16_VERSAILLES_poster.jpg',
    seoUrl: '/collections/versailles',
  };

  return <CollectionPageTemplate config={config} />;
}
