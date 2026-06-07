# Handoff développeur — Transcréation i18n EN/IT/RU/DE/ES + complétion FR

> Note destinée au développeur (et à son assistant Claude Code) pour relecture **en local** avant tout push.

## TL;DR

- Branche : **`seo-doctrine`**. Commit ajouté : **`009458e`** (local, **non poussé**).
- 63 fichiers modifiés : les 6 dossiers `public/locales/{fr,en,it,ru,de,es}/` + `src/components/Header.tsx` + `src/components/header/OpticianDropdown.tsx`.
- Rien d'autre n'a été touché (pas de dépendances, pas de config, pas de logique métier).
- `npx tsc --noEmit -p tsconfig.app.json` → **0 erreur**.

## Ce qui a été fait

1. **FR = source de vérité.** Le français (`public/locales/fr/`) a d'abord été complété/corrigé, puis EN/IT/RU/DE/ES ont été **transcréés** (pas traduits à la machine) à partir de ce FR.
2. **Parité de clés stricte** : chaque langue a exactement les mêmes clés que le FR (0 manquante / 0 en trop), vérifié par flatten récursif sur les 11 namespaces.
3. **Header** : correctif de centrage du logo (les libellés traduits de longueurs différentes décalaient le logo). Colonnes gauche/droite à largeur égale, taille du logo et police/espacement des menus ajustés. **CSS uniquement** (classes Tailwind), aucun changement de structure ni de texte de marque dans le composant.

## Faits/règles appliqués (à NE PAS régresser)

- Entité **Renaissance Eyewear** (jamais « Renaissance Paris » comme entité légale/SEO).
- Domaine `renaissanceeyewear.fr` · mail `contact@renaissanceeyewear.com`.
- **Devise en français partout** : `hero.label = "Pour que chaque jour compte"` et la mention « Devise » dans `legal` restent en français dans toutes les langues.
- Garantie : **constructeur 3 ans** / **légale 2 ans** (la légale = loi française, ne pas la passer à 3).
- **7 symboles** (Trident, Fleur de Lys, Ankh, Scarabée, Cobra, Œil d'Horus, Plaque parisienne).
- **250+** opticiens · fondation **2019** · **Corée** (pas « Corée du Sud »).
- Numéro de série au pont = **identité, pas édition limitée** (l'édition limitée ne concerne que le modèle Ocho, hors de ces fichiers).
- Style : **0 tiret long « — »**, lexique luxe banni (luxury/excellence/premium/timeless/craftsmanship/etc.), glossaire métier (frame/lens/temple/bridge…).

## Vérifier en local

```bash
git checkout seo-doctrine
git log --oneline -1        # doit afficher 009458e
npm install
npm run dev                 # Vite → http://localhost:5173
npx tsc --noEmit -p tsconfig.app.json   # attendu : 0 erreur
```

Pages à contrôler par langue (préfixe `/xx`), p. ex. `http://localhost:5173/en`, `/it`, `/ru`, `/de`, `/es` :
- `/` (home), `/{histoire|story…}`, `/shop`, `/collections/{heritage,versailles,isis}`, `/faq`, `/contact`, `/cart`, pages légales.
- Vérifier surtout le **header** (logo centré dans chaque langue) et les pages **legal** (longues).

### Contrôles rapides (optionnels)

```bash
# parité de clés FR vs une langue (ex. de)
python3 - <<'PY'
import json
def flat(d,p=""):
    o={}
    if isinstance(d,dict):
        for k,v in d.items(): o.update(flat(v,(p+"."+k) if p else k))
    elif isinstance(d,list):
        for i,v in enumerate(d): o.update(flat(v,f"{p}[{i}]"))
    else: o[p]=d
    return o
for f in ["cart","collections","common","contact","faq","histoire","home","legal","product","seo","shop"]:
    F=flat(json.load(open(f"public/locales/fr/{f}.json")))
    E=flat(json.load(open(f"public/locales/de/{f}.json")))
    miss=[k for k in F if k not in E]; extra=[k for k in E if k not in F]
    print(f"{f}: miss={len(miss)} extra={len(extra)}")
PY

# aucun tiret long ne doit ressortir
grep -rl "—" public/locales/ || echo "0 tiret long"
```

## À noter

- **Relecture native recommandée** (RU/DE/ES/IT) pour le ressenti littéraire : la structure, les faits et le glossaire sont carrés, mais le rendu « à l'oreille » mérite une validation humaine par langue avant prod.
- Fichiers parasites présents à la racine et **non inclus** dans le commit : `NOTE-DEV-seo-doctrine.md`, `seo-doctrine.patch` (antérieurs).
- Un patch complet des modifs est fourni : `i18n-transcreation-009458e.patch` (applicable via `git apply` sur la base du commit parent `7738d41`).
