# Guide de configuration du pré-rendu pour le SEO

## Pourquoi le pré-rendu ?

Les moteurs de recherche (Google, Bing) exécutent JavaScript mais avec des délais et limitations. Le pré-rendu génère des pages HTML complètes pour les crawlers, améliorant l'indexation et le SEO.

## Options de configuration

### Option 1: Prerender.io (Recommandé)

Service cloud qui intercepte les requêtes des crawlers et renvoie des versions pré-rendues.

**Configuration Netlify (`netlify.toml`):**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Prerender-Token = "YOUR_PRERENDER_TOKEN"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/prerender/:splat"
  status = 200
  force = true
  conditions = {UserAgent = ["googlebot", "bingbot", "baiduspider", "facebookexternalhit", "twitterbot", "linkedinbot"]}
```

**Configuration Vercel (`vercel.json`):**
```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "has": [
        { "type": "header", "key": "User-Agent", "value": ".*bot.*" }
      ],
      "destination": "https://service.prerender.io/:path*"
    }
  ]
}
```

### Option 2: Netlify Pre-rendering

Netlify offre une fonctionnalité intégrée de pré-rendu pour les SPAs.

1. Allez dans Settings > Build & Deploy > Post processing
2. Activez "Prerendering"
3. C'est automatique !

### Option 3: Cloudflare Workers

```javascript
// worker.js
const PRERENDER_TOKEN = 'YOUR_TOKEN';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const userAgent = request.headers.get('User-Agent') || '';
  const isCrawler = /googlebot|bingbot|baiduspider|yandex|facebookexternalhit|twitterbot|linkedin/i.test(userAgent);

  if (isCrawler) {
    const prerenderUrl = `https://service.prerender.io/${request.url}`;
    return fetch(prerenderUrl, {
      headers: { 'X-Prerender-Token': PRERENDER_TOKEN }
    });
  }

  return fetch(request);
}
```

## Ce qui est déjà en place

Le site inclut déjà les optimisations SEO suivantes :

1. **Composant SEO** (`src/components/SEO.tsx`)
   - Balises meta dynamiques
   - Open Graph et Twitter Cards
   - JSON-LD pour Organization, Product, FAQ, Breadcrumb

2. **Sitemap** (`public/sitemap.xml`)
   - Toutes les pages indexables
   - Priorités et fréquences de mise à jour

3. **Lazy loading**
   - Images chargées à la demande
   - Optimisation Cloudinary automatique

4. **react-helmet-async**
   - Meta tags côté client
   - Support SSR si migration vers Next.js

## Test SEO

Utilisez ces outils pour tester le SEO :

- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Facebook Debugger](https://developers.facebook.com/tools/debug)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Soumission sitemap

1. **Google Search Console**: Sitemaps > Ajouter un nouveau sitemap > `https://www.renaissance-paris.com/sitemap.xml`
2. **Bing Webmaster Tools**: Sitemaps > Submit sitemap
