# Renaissance — i18n langues (suite `seo-doctrine`)

Nouveau lot **transcréation EN/IT/RU/DE/ES + complétion FR + centrage header**, en **1 commit** posé sur la branche `seo-doctrine` au-dessus du lot précédent. Fourni en patch : **`i18n-transcreation-009458e.patch`** (63 fichiers).

## Appliquer

Branche `seo-doctrine` déjà à jour des 3 commits SEO précédents (parent = `7738d41`). Poser le patch à la racine, puis :

```bash
git checkout seo-doctrine
git apply --3way i18n-transcreation-009458e.patch
```

Vérifier : `npm run dev` (rendu par langue) et `npx tsc --noEmit -p tsconfig.app.json` → **0 erreur**.
`package-lock.json` / `.env` hors patch (volontaire).

## Ce que le patch change

- **Toutes les langues** (`public/locales/{en,it,ru,de,es}/`) : les 11 namespaces transcréés depuis le FR validé (home, histoire, collections, product, common, seo, shop, faq, contact, cart, legal). Parité de clés stricte avec le FR (0 manquante / 0 en trop).
- **FR** complété : `breadcrumb` (clés manquantes utilisées par les composants), garantie **constructeur 3 ans / légale 2 ans**, **7 symboles** dans legal/mentions, **250+** opticiens, **Corée**, cristal en bout de branche, **devise rétablie** (« Pour que chaque jour compte », remplace « Silence Stylé »).
- **Header** (`Header.tsx`, `OpticianDropdown.tsx`) : logo recentré (colonnes gauche/droite à largeur égale), taille logo + police/espacement menus ajustés pour équilibrer toutes les langues. CSS uniquement.

## SEO par langue

Le **SEO de contenu/meta est transcréé dans les 5 langues** (il vit dans les locales) :
- `seo.json` : title + meta-description de chaque page.
- blocs `seoTitle`/`seoDescription` internes (`histoire`, `collections`, `contact`, et dans `legal` : `garantie`, `expedition`, `guideTailles`).
- `common.seo` (`defaultTitle`, `defaultDescription`, `orgDescription` JSON-LD) → balises + données structurées localisées via `t()`.

**Hors de ce lot** (à vérifier côté code, pas dans le patch) : `hreflang`/alternates, `sitemap.xml` multilingue, canonical/`og:url` par locale, `index.html`. Confirmer que le composant SEO lit bien ces clés pour les langues non-FR.

## Règles tenues (ne pas régresser)

Entité **Renaissance Eyewear** (jamais « Renaissance Paris »), mail `contact@renaissanceeyewear.com`, **devise en français** dans toutes les langues, **0 tiret long « — »**, lexique luxe banni, glossaire métier (frame/lens/temple/bridge…), fondation **2019**.

## À noter

- **Pas encore poussé** : à valider en local d'abord.
- Relecture native conseillée (RU/DE/ES/IT) pour le ressenti — structure et faits OK.
- Fichiers parasites à la racine non inclus : `NOTE-DEV-seo-doctrine.md`, `seo-doctrine.patch` (lot précédent).
