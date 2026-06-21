import CollectionPageTemplate from '../components/CollectionPageTemplate';
import type { CollectionPageConfig } from '../components/CollectionPageTemplate';

export default function IsisCollectionPage() {
  const config: CollectionPageConfig = {
    collectionId: 'ISIS',
    collectionName: 'Isis',
    translationPrefix: 'isis',
    heroImage: 'https://26.staticbtf.eno.do/v1/91-default/80de95ed4756e81d2e731b5faff6c051/media.jpg',
    seoUrl: '/collections/isis',
    // Desktop : colonne portrait -> vidéo verticale 9:16. Mobile : bande
    // horizontale -> vidéo paysage 16:9.
    heroVideo: 'https://renaissance-cdn.b-cdn.net/videos/HERO_9_16_ISIS_web.mp4',
    heroPoster: 'https://renaissance-cdn.b-cdn.net/videos/HERO_9_16_ISIS_poster.jpg',
    heroVideoMobile: 'https://renaissance-cdn.b-cdn.net/videos/HERO_16_9_ISIS_web.mp4',
    heroPosterMobile: 'https://renaissance-cdn.b-cdn.net/videos/HERO_16_9_ISIS_poster.jpg',
  };

  return <CollectionPageTemplate config={config} />;
}
