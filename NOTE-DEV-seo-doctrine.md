# Renaissance — patch `seo-doctrine`

Lot de corrections **SEO + contenu de marque + i18n**, regroupées dans **3 commits** : le fichier **`seo-doctrine.patch`** (≈48 fichiers).

## Appliquer

Poser `seo-doctrine.patch` à la racine du projet, puis :

```bash
git checkout main && git pull
git checkout -b seo-doctrine
git am < seo-doctrine.patch      # applique les 3 commits ; sinon : git apply --3way seo-doctrine.patch
```

Vérifier : `npm run dev` (rendu) et `npm run build`. `tsc --noEmit` passe à 0 erreur.
`package-lock.json` et `.env` ne sont pas dans le patch (volontaire).

## Ce que le patch change

- **Entité SEO** unifiée en « Renaissance Eyewear » : balises `index.html`, JSON-LD `SEO.tsx` (`foundingDate: 2019`), `alt`/`aria`, libellés. Le wordmark « RENAISSANCE ·PARIS· » est inchangé.
- `index.html` : title + description réécrits, `keywords` supprimée, `robots: noindex, follow` (staging), canonical + og:url → `https://renaissanceeyewear.fr/`.
- **Traductions FR** (`public/locales/fr/`) : home, seo, common, collections, product, shop, contact, cart, legal, faq, histoire — lexique purgé, retours **14 jours**, mail **contact@renaissanceeyewear.com**.
- **Slug** `/savoir-faire` → **`/atelier`** : route `App.tsx`, liens, `sitemap.xml`, + redirection **301** dans `netlify.toml`.
- **Page histoire** : 7 symboles (`SymbolesSection`), valeurs « quatre fibres + Transmission », stats fabrication corrigées.
- **Composants** : footer (250+, © Eyewear), sections fabrication, header (logo recentré).
- **Typo** : passage à **Bodoni Moda** (`index.html` + `tailwind.config.js`), retrait de Playfair / Cormorant / DM Sans.
- **Email** `emails/welcome-fr.html` : code promo WELCOME10 / -10 % retiré.
- **Style** : suppression des tirets longs « — » dans les textes.
- **i18n (commits 2 et 3)** : clés manquantes résolues — `isis.discover`, `reassurance.description`, `noProducts`, `breadcrumb.home/blog`, `notFound` (plus aucune clé brute affichée à l'écran).

`src/data/opticians.json` et les autres langues (en/de/es/it/ru) ne sont pas touchés (lots séparés).
