# CHANTIER — Centralisation médias, catalogue & fiches produit
**Renaissance Eyewear · repo `renaissance-seo` · branche `seo-doctrine`**
_Dossier de reprise — autoportant. Rédigé pour être redonné tel quel afin de lancer le traitement._

---

## 0. Contexte & règles de travail (à respecter)

- **Stack** : Vite + React + TypeScript + Tailwind. Dev : `npm run dev` → http://localhost:5173 (tourne sur la machine de Yassin).
- **Multilingue** : fr/en/it/ru/de/es. i18n déjà fait et **validé** (`public/locales/`). **Ne pas y toucher sauf demande explicite.** FR = source de vérité.
- **Doctrine de marque** : vault `~/Documents/cerveau yass renaissance/...` (Credo, Bible v1.0). Skills dispo : `renaissance-copywriter` (+ variantes langues), `renaissance-cabinet`, `ghost-optics`.
- **Règles** :
  - Aucun commit ni push sans « validé » écrit de Yassin.
  - `tsc --noEmit` doit rester à **0 erreur**.
  - Montrer le rendu / le diff avant validation.
  - Voix-opérateur : réponses courtes, une idée à la fois, challenge sur le fond.

---

## 1. Architecture média (état des lieux)

Les médias proviennent de **5 hébergements** ; un seul est réellement maîtrisé (Bunny).

| Host | Rôle | Contrôle |
|---|---|---|
| `renaissance-cdn.b-cdn.net` (Bunny CDN, storage zone `renaissance-images`) | Entrepôt principal (~77 réfs) | ✅ |
| `26.staticbtf.eno.do` | Médias d'un éditeur tiers (8 réfs) | ⚠️ Non |
| `images.pexels.com` | **Stock gratuit** (5 réfs — « ambassadeurs » page Histoire) | ❌ |
| `renaissanceeyewear.fr/cdn/shop` (Shopify) | 1 photo (SDM) | ✅ |
| `res.cloudinary.com` | OG-image (partage social) | ✅ |
| `/public` (local repo) | poster hero, favicon, isis-collection… | ✅ |

**Logique images produit (déjà en place) :** tout passe par `src/lib/imageUtils.ts → resizeShopifyImage(url, width, productTitle, imageIndex)`.
- Si l'URL contient `b-cdn.net` → renvoyée telle quelle **(actuellement SANS paramètre de taille — c'est le gap perf à corriger)**.
- Sinon, si le titre produit correspond à un dossier Bunny (`titleToBunnyUrl` → `/products/{modèle}/{vue}.jpg`, 156 variantes mappées) → renvoie l'URL **Bunny** (priorité Bunny).
- Sinon, si `cdn.shopify.com` → ajoute la largeur, renvoie l'URL Shopify (repli).

**Répartition cible des responsabilités :**
- **Shopify** = données commerciales : tailles/variantes, stock (`availableForSale`), prix, « adaptable à la vue ».
- **Bunny** = toutes les photos.
- **Couche maison (i18n / config)** = descriptions produit (réécriture à venir) + gamme complète de couleurs par modèle.

---

## 2. Bunny Optimizer — ACTIVÉ ✅

Pull zone `renaissance-cdn` (id 5228378). Add-on **Bunny Optimizer activé** ($9.5/mois). Cochés : **WebP image compression**, **Dynamic image API**, **Smart image optimization**, Minify CSS/JS.

Conséquences :
- Toutes les images Bunny sont **déjà servies en WebP automatiquement** (sans changer les URLs).
- Le **redimensionnement** se déclenche via paramètres d'URL : `?width=800&quality=82` (+ `srcset` pour le responsive + Retina).
- **Zoom net** : Bunny ne fait que réduire, jamais agrandir au-delà de l'original → pour le zoom produit, uploader des **originaux haute résolution** (≈ 2500–3000px), puis servir `?width=2400&quality=90` au zoom.

---

## 3. Décisions prises

1. **Centraliser tous les médias sur Bunny** (storage zone `renaissance-images`). Upload **via le dashboard Bunny par Yassin** (aucun secret partagé) ; moi je renomme proprement + repointe le code.
2. **Optimizer activé** → on uploade les **originaux**, je gère `?width`/`srcset`/qualité dans le code.
3. **Descriptions produit = couche maison séparée** (i18n `public/locales/`), réécrites à la voix de la marque ; Shopify ne sert plus que le technique. _Pré-requis : sortir « taille / adaptable à la vue » dans des champs structurés Shopify (variantes/métachamps/tags), pas dans le texte._
4. **Système rupture de stock** : conception validée (cf. §6), **décision UX au clic reportée** (à traiter avec l'import montures + réécriture descriptions).
5. **Pexels** : à supprimer (pas de migration de stock).

---

## 4. Plan par phases

### Phase A — Perf images (aucun upload requis)
- Modifier `resizeShopifyImage()` pour que les URLs **Bunny** reçoivent aussi `?width=`/`quality=` (aujourd'hui seules les URLs Shopify sont redimensionnées).
- Ajouter `srcset` + tailles responsives (incl. Retina) sur les `<img>`.
- Variante zoom produit : `?width=2400&quality=90`.
- Créer `src/config/assets.ts` = **source unique** de toutes les URLs d'images (fini l'éparpillement dans ~40 fichiers).
- Vérif : `tsc --noEmit` à 0, montrer le diff + le rendu avant validation.

### Phase B — Rapatriement sur Bunny (upload Yassin via dashboard)
À uploader dans la storage zone `renaissance-images` :
- **2 fichiers locaux lourds** (originaux ou versions optimisées) : `hero-poster.png` (9,7 Mo) → `hero-poster.webp` ; `isis-collection.png` (6,6 Mo) → `isis-collection.webp`. _(versions WebP −98% déjà générées : dossier `bunny-upload/`)._
- **8 images `staticbtf.eno.do`** (fondateurs, thèmes, ambassadeurs placeholders) → noms propres.
- Optionnel : SDM (Shopify) + OG-image (Cloudinary) pour tout centraliser.
Puis je repointe le code vers Bunny.

### Phase C — Nettoyage `/public`
- Supprimer les résidus : `screenshot-2025-11-01/14/24.png` (fichiers vides 20 o), `Capture d'écran …` (~5 Mo), `capture_d'écran_…`.
- Retirer la section **Pexels** (« ambassadeurs » Histoire) → remplacer par de vrais visuels.

### Phase D — Import montures + descriptions (gros chantier, plus tard)
- Importer/compléter le catalogue (cf. §5) : ajouter les couleurs manquantes, marquer les ruptures.
- Réécrire les descriptions produit à la voix de la marque (skills `renaissance-copywriter`), en 6 langues, dans la couche i18n.
- Brancher le **système rupture** (§6) et trancher l'UX au clic.
- Régler les anomalies (§7).

---

## 5. CATALOGUE MAÎTRE (référence)

Croisement de 3 sources : **eyeforeye** (distributeur — dimensions + couleurs), **site/Bunny** (photos déjà présentes), **Shopify** (publié).
Dimensions = **Calibre / Nez / Branches** (mm). Matière = libellé distributeur (à confirmer vs titane maison).

> ⚠️ **eyeforeye n'est PAS exhaustif** : c'est une vue distributeur (une couleur affichée seule ≠ couleur unique ; les autres sont en rupture chez lui). La vraie référence = l'**union** des sources.

| Modèle | Cal/Nez/Br (mm) | Matière (distrib.) | Couleurs eyeforeye | Couleurs site (photos) | Shopify |
|---|---|---|---|---|---|
| II | 51 / 20 / 140 | Métal | C1 C2 C3 | C1 C2 C3 | ✓ |
| III | ⚠ erreur source | — | — | C1 | ✓ |
| IV | ⚠ erreur source | — | C1 C2 C3 | C1 C2 C3 | ✓ |
| VI | 59 / 16 / 145 | Métal | C2 | C2 | ✓ |
| VII | 57 / 18 / 145 | Acétate/métal | C3 | C2 C3 | — |
| VIII | ⚠ erreur source | — | — | C1 C2 C3 | ✓ |
| VIII-COLLAB | 57 / 19 / 142 | Acétate | C3 | — | ✓ |
| IX | 61 / 14 / 145 | Métal | C1 | C1 | ✓ |
| X | 58 / 16 / 145 | Métal | C3 | — | — |
| XI-T51 | 51 / 21 / 140 | Métal | C3 C4 C5 | C1 C2 C3 C4 C5 | ✓ |
| XI-T53 | 53 / 21 / 140 | Métal | C1 C3 C5 C6 | C1 C2 C3 | ✓ |
| XII | 55 / 21 / 145 | Acétate/métal | C2 C3 | C1 C2 C3 | ✓ |
| XIII | 57 / 17 / 140 | Métal | C3 C6 C7 | C1 C2 C3 C4 | ✓ |
| XIV | 61 / 14 / 145 | Métal | C1 C2 C3 | C1 C2 C3 | ✓ |
| XVI | ⚠ erreur source | — | — | C1 C2 C3 | ✓ |
| XVII | 58 / 17 / 140 | Métal | C1 C3 C4 C6 C8 | C1 C2 C3 C4 | ✓ |
| XVIII | 48 / 18 / 140 | Métal | C1 C2 C3 C4 | C1 C2 C3 C4 | ✓ |
| XIX | 49 / 18 / 140 | Métal | C1 C2 C3 C4 | C1 C2 C3 C4 | ✓ |
| XX | 49 / 23 / 145 | Acétate | C1 C2 C3 | C1 C2 C3 | ✓ |
| XXI | 53 / 20 / 145 | Acétate | C3 C5 | C1 C2 C3 C4 C5 | ✓ |
| XXII | 58 / 15 / 143 | Acétate | C2 C3 | C1 C2 C3 | ✓ |
| XXIII | 52 / 21 / 140 | Métal | C2 C3 | — | — |
| XXIV | 57 / 17 / 140 | Métal | C4 | — | — |
| XXV | 54 / 18 / 140 | Métal | C2 C3 | — | — |
| XXVI | 53 / 21 / 140 | Métal | C3 C4 | — | — |
| XXVII | 59 / 17 / 145 | Métal | C1 C2 C3 | C1 C2 C3 | ✓ |
| XXVIII | 57 / 17 / 140 | Métal | C1 C3 C4 | — | — |
| XXIX | 58 / 15 / 145 | Métal | C1 C3 | C1 C2 C3 | ✓ |
| XXX | 55 / 19 / 145 | Métal | C1 C4 | C1 C2 | ✓ |
| XXXI | 59 / 14 / 140 | Métal | C1 C3 | — | — |
| XXXII | 58 / 17 / 140 | Métal | C1 C6 C7 | C1 C2 C3 C4 C6 C7 | ✓ |
| XXXIII | ⚠ erreur source | — | — | C1 C2 C3 | ✓ |
| XXXIV | 54 / 17 / 140 | Métal | C1 C3 C4 | C1 C2 C3 C4 | ✓ |
| XXXV | 53 / 21 / 140 | Acétate/métal | C1 C2 C3 | C1 C2 C3 | ✓ |
| XXXVI | 56 / 17 / 140 | Métal | C1 C3 | C1 C2 C3 | ✓ |
| XXXVII | 63 / 13 / 135 | Métal | C1 C2 C3 | C1 C2 C3 | ✓ |
| XXXVIII | 54 / 20 / 140 | Métal | C2 C3 C4 | C1 C2 C3 C4 | ✓ |
| XXXIX | 57 / 16 / 140 | Métal | C1 C2 C3 C4 C5 | C1 C2 C3 C4 C5 | ✓ |
| XXXX | 56 / 18 / 140 | Métal | C1 | C1 C2 C3 | ✓ |
| XXXXI | ⚠ erreur source | — | — | C1 C2 C3 | ✓ |
| XXXXII | 56 / 17 / 140 | Métal | C3 | C1 C2 C3 C4 | ✓ |
| XXXXIII | 54 / 18 / 140 | Métal | C1 C4 | C1 C2 C3 C4 | ✓ |
| XXXXIV | 57 / 17 / 140 | Métal | C4 C5 C6 | C1 C2 C3 C4 C5 C6 | ✓ |
| L | 51 / 21 / 138 | Acétate/métal | C1 C2 C3 | C1 C2 C3 | ✓ |
| LI | 56 / 17 / 140 | Métal | C1 C2 C3 | C2 C3 | ✓ |
| LII | 59 / 17 / 145 | Titane | C1 C2 C3 C4 | C1 C2 C3 C4 | ✓ |
| LIII | 58 / 18 / 145 | Titane | C1 C2 C3 C4 C5 | C1 C2 C3 C4 C5 | ✓ |
| LIV | 54 / 19 / 145 | Titane | C1 C2 C3 C4 | C1 C2 C3 C4 | ✓ |
| LV | 58 / 18 / 145 | Titane | C1 C2 C3 | C1 C2 C3 | ✓ |
| LVI | 60 / 18 / 145 | Titane | C3 | C1 C2 C3 | ✓ |
| LVII | 54 / 20 / 145 | Acétate/métal | C1 C2 C3 | C1 C2 C3 | ✓ |
| LVIII | 55 / 19 / 145 | Plastique | C1 C2 C3 | C1 C3 | ✓ |
| LIX | 55 / 18 / 140 | Titane | C1 C2 C3 | C1 C2 C3 | ✓ |
| LX | 57 / 20 / 138 | Titane | C1 C2 C3 | C1 C2 C3 | ✓ |
| LXI | 56 / 18 / 145 | Titane | C1 C2 C3 C4 | C1 C2 C3 C4 | ✓ |

### Actions catalogue déduites

**① 23 couleurs présentes chez eyeforeye SANS photo sur le site (liste de prise de vue / upload) :**
VIII-COLLAB C3, X C3, XI-T53 C5, XI-T53 C6, XIII C6, XIII C7, XVII C6, XVII C8, XXIII C2, XXIII C3, XXIV C4, XXV C2, XXV C3, XXVI C3, XXVI C4, XXVIII C1, XXVIII C3, XXVIII C4, XXX C4, XXXI C1, XXXI C3, LI C1, LVIII C2

**② Modèles que le site possède (photos) mais absents d'eyeforeye (preuve de non-exhaustivité) :**
III, VIII, XVI, XXXIII, XXXXI

**③ Modèles chez eyeforeye absents du site (discontinués / à arbitrer : archive ou non) :**
XXXI, XXVIII, XXVI, XXV, XXIV, XXIII, X

---

## 6. Système « rupture de stock » (conception validée, UX à trancher)

Chaque monture affiche **toute sa gamme de couleurs**. Statut par pastille, calculé depuis 2 sources :

| État | Condition | Affichage |
|---|---|---|
| **Disponible** | variante Shopify + `availableForSale = true` | pastille normale, ajout panier actif |
| **En rupture** | variante Shopify + `availableForSale = false` | pastille visible mais atténuée, marquée « rupture », bouton désactivé |
| **Hors catalogue actif** | couleur dans la couche maison mais aucune variante Shopify vendable | affichée, marquée indisponible / sur commande |

**Sources** : gamme complète de couleurs → couche maison (config, alimentée par §5) ; stock temps réel → Shopify (`availableForSale`). Pas de double saisie.

**À TRANCHER (reporté)** — comportement au clic sur une couleur en rupture :
- (a) bouton désactivé + « En rupture » ;
- (b) « Me prévenir » (liste d'attente — nécessite Shopify back-in-stock ou Klaviyo) ;
- (c) « Sur commande / nous consulter ».

---

## 7. Anomalies à traiter

- **Monture I** : publiée sur Shopify mais **aucune photo Bunny**. Seule du catalogue actif dans ce cas → à shooter en priorité.
- **Monture VII** : photos sur Bunny (`VII-Colori-2/3`) mais **pas au catalogue Shopify actif** (orphelin / dépublié) → clarifier.
- **Monture IV** : dimensions aberrantes côté eyeforeye (**calibre 150 / nez 0**) → récupérer les vraies cotes.
- **XX / XXI / XXII** : libellés calibre/branches **inversés** sur eyeforeye — corrigés dans le tableau §5, mais à vérifier.
- **Matières** : eyeforeye étiquette « Métal / Acétate / Plastique » ; la marque communique **titane + plaqué or 18KT + acétate Mazzucchelli**. Réconcilier matière par modèle.
- **Numérotation** : romain de I à LXI (61), **non continue**. Numéros sans modèle au catalogue actif : V, X, XV, XXIII–XXVI, XXVIII, XXXI, XXXXV–XXXXIX (certains **discontinués** — ont existé, désormais archivés/dépubliés côté Shopify Admin, invisibles via le connecteur Storefront).
- Convention d'écriture maison : les 40 s'écrivent `XXXX` (pas `XL`) — ex. XXXXIV = 44.

---

## 8. Livrables déjà produits (dossier de session)

- `inventaire-medias.html` / `.md` — inventaire visuel de tous les médias par host.
- `catalogue-renaissance.html` — catalogue maître visuel (matrice couleur croisée).
- `bunny-upload/` — `hero-poster.webp`, `isis-collection.webp` (versions allégées) + `MANIFESTE-upload.md`.
- **Ce dossier** : `CHANTIER-medias-catalogue.md`.

---

## 8bis. ⚠️ PERFORMANCE — à lire AVANT de poser le plan d'implémentation

L'architecture du §1/§3 est un **brouillon non mesuré**. Avant d'écrire la moindre ligne, faire un **diagnostic de perf réel** et laisser les chiffres décider. Trois niveaux à distinguer :

**✅ Solide — gain de perf réel, aucun risque :** `?width`/`srcset`/WebP sur les images Bunny. Sur un site de lunettes l'image = ~80% du poids → c'est LE levier. À faire sans hésiter.

**◽ Neutre pour la perf — maintenabilité, pas vitesse :** `src/config/assets.ts` (source unique des URLs). Ne ralentit ni n'accélère la navigation. À garder pour la propreté du code, mais ne pas le justifier par la perf.

**⛔ Risque de RALENTISSEMENT si mal fait — vigilance n°1 :** mettre les **descriptions dans l'i18n**. Si on charge 150 montures × 6 langues dans le bundle global → premier chargement alourdi → navigation plus lente.
- **Prévention obligatoire : lazy-load.** Charger la description d'une monture uniquement à l'ouverture de sa fiche (namespace i18n par produit/route, ou fichier par produit en import dynamique). Jamais tout d'un coup.
- Si le lazy-load n'est pas tenable proprement, réévaluer l'option (métachamps Shopify multilingues, MDX par produit lazy-importé, CMS léger) **avant** de s'engager.

**Diagnostic de perf à lancer EN PREMIER (avant tout code) :**
1. `npm run build` → inspecter la **taille du bundle** (et la répartition par chunk).
2. Vérifier si les **routes sont déjà en lazy-loading** (`React.lazy`/`Suspense` / dynamic import) — sinon, probable premier gros levier.
3. **Waterfall réseau** d'une navigation type (home → collection → fiche) : nb de requêtes, images non dimensionnées, appels Shopify bloquants.
4. **Lighthouse** (mobile + desktop) : LCP, TBT, poids total, images mal dimensionnées.
5. Vérifier la **stratégie de fetch Shopify** (re-fetch à chaque navigation ? cache ? prefetch ?) — goulot possible indépendant des images.

> Règle : **mesurer d'abord, architecturer ensuite.** Le plan d'implémentation se pose APRÈS ce diagnostic, pas avant. Et : `assets.ts` = maintenabilité (neutre perf) ; descriptions i18n = uniquement si lazy-loadées.

---

## 9. Première action quand on reprend
Dire « on attaque la Phase A » (perf images, sans upload) — ou indiquer une autre phase. Rien n'est lancé tant que ce n'est pas dit.
