// ============================================================================
// ÉDITORIAL INTERNE DES FICHES PRODUIT — SOURCE UNIQUE DE LA COPY
// ----------------------------------------------------------------------------
// Décision (note vault 2026-06-09_chantier-fiches-produit-architecture.md) :
//   - Tout l'éditorial passe EN INTERNE (ce fichier), versionné.
//   - Shopify ne garde que le COMMERCE : prix, stock, images, coloris.
//   - Clé = nom de modèle (sortie de getModelName), comme productDescriptions.ts.
//   - 3 niveaux, on ne duplique rien : MODÈLE (propre) / COLLECTION / SYMBOLE (partagés).
//
// Règles tenues : lexique luxe interdit même en balise ; aucun fait inventé ;
// la copy par modèle reste `brouillon` tant qu'elle n'est pas validée via le
// skill renaissance-copywriter + Yassin.
// ============================================================================

// ---------------------------------------------------------------------------
// TYPES — l'armature
// ---------------------------------------------------------------------------

/** Langues du site. Le français est la langue maître : toute copy naît en FR,
 *  validée, puis transcréée via les skills renaissance-copywriter-{en,de,es,it,ru}.
 *  Jamais de traduction machine sur la copy de la Maison. */
export type Lang = 'fr' | 'en' | 'de' | 'es' | 'it' | 'ru';

export type CollectionId = 'heritage' | 'versailles' | 'isis';

export type SymboleId =
  | 'trident'
  | 'fleur-de-lys'
  | 'ankh'
  | 'scarabee'
  | 'cobra'
  | 'oeil-horus'
  | 'plaque-parisienne';

/** Matière dominante de la face de la monture. */
export type Matiere = 'titane' | 'acetate';

/** Statut de la copy d'un modèle. `valide` = passé renaissance-copywriter + Yassin. */
export type CopyStatut = 'brouillon' | 'valide';

/** Mesures réelles, PAR MODÈLE (jamais par coloris). En millimètres. */
export interface Dimensions {
  /** Largeur d'un verre (mm). */
  verre: number;
  /** Largeur du pont (mm). */
  pont: number;
  /** Longueur de branche (mm). */
  branche: number;
}

/** Le niveau MODÈLE — ce qu'on remplit fiche par fiche. */
export interface ModelEditorial {
  /** Nom en chiffre romain dominant. Ex : "Renaissance XXXIV". */
  romain: string;
  /** Chiffre arabe affiché entre parenthèses. Ex : 34. */
  arabe: number;
  /** Mention de collaboration, affichée après la parenthèse du titre.
   *  Ex : "x FRENCH CUT" → « Renaissance IV (4) x FRENCH CUT ».
   *  Absent = titre standard. (Décision Yassin 2026-06-12, fiche IV.) */
  collab?: string;
  /** Phrase courte en italique, en tête de fiche. PAR MODÈLE. */
  legende: string;
  /** Texte court, voix doctrine. PAR MODÈLE. */
  description: string;
  /** Forme de la monture (libellé métier court). Ex : "sans cerclage". */
  forme: string;
  /** Matière dominante de la face. */
  matiere: Matiere;
  /** Accepte les verres correcteurs (« Adaptable à votre vue »). */
  adaptable: boolean;
  /** Mesures réelles relevées (eyeforeye + vérif). */
  dimensions: Dimensions;
  /** Aide morphologie, en murmure. Ex : "Convient aux visages moyens." */
  morphologie: string;
  /** Renvoi vers le récit de collection partagé. Absent = hors collection. */
  collection?: CollectionId;
  /** Renvoi vers le symbole partagé. Absent = visage seul (Bible 8.1 :
   *  « une paire sans symbole est complète »). La fiche n'affiche pas le bloc. */
  symbole?: SymboleId;
  /** Tant que `brouillon` : copy non validée, ne pas publier le texte. */
  copyStatut: CopyStatut;
}

/** Le niveau COLLECTION — récit partagé, écrit une fois. */
export interface Collection {
  /** Nom affiché. Ex : "Héritage". */
  nom: string;
  /** Récit court de la collection. Partagé par toutes ses montures. */
  recit: string;
}

/** Le niveau SYMBOLE — partagé, écrit une fois. Textes validés Bible ch.8. */
export interface Symbole {
  /** Nom affiché. Ex : "Le Trident". */
  nom: string;
  /** Mot en étendard (validé Bible). Ex : "Souveraineté". */
  etendard: string;
  /** Définition de l'étendard (validée Bible, reprise telle quelle). */
  definition: string;
  /** Les deux lectures obligatoires : la mémoire / le choix (Bible 8.1). */
  deuxLectures: string;
}

/** Le bloc « Ce qui prouve » — le visage du Credo, IDENTIQUE sur chaque paire. */
export interface ProofBlock {
  label: string;
  texte: string;
}

/** Vue assemblée prête à rendre : modèle + collection + symbole résolus. */
export interface ResolvedEditorial {
  model: ModelEditorial;
  /** Absent quand le modèle est hors collection. */
  collection?: Collection;
  /** Absent quand le modèle porte le visage seul (Bible 8.1). */
  symbole?: Symbole;
  proof: ProofBlock;
  trust: readonly string[];
}

// ---------------------------------------------------------------------------
// TRADUCTIONS — transcréations préparées en avance, par langue.
//   Champs PARTIELS : tout champ absent retombe sur le français (langue maître).
//   On ne remplit une langue qu'à partir du FR validé, via le skill de
//   transcréation dédié. Les noms propres (Héritage, Renaissance) ne bougent pas.
// ---------------------------------------------------------------------------

interface ModelI18n {
  legende?: string;
  description?: string;
  morphologie?: string;
}

interface CollectionI18n {
  recit?: string;
}

interface SymboleI18n {
  nom?: string;
  etendard?: string;
  definition?: string;
  deuxLectures?: string;
}

interface ProofI18n {
  label?: string;
  texte?: string;
}

export interface EditorialTranslations {
  models?: Record<string, ModelI18n>;
  collections?: Partial<Record<CollectionId, CollectionI18n>>;
  symboles?: Partial<Record<SymboleId, SymboleI18n>>;
  proof?: ProofI18n;
  trust?: readonly string[];
}

// ---------------------------------------------------------------------------
// CONSTANTES PARTAGÉES — écrites une fois, jamais dupliquées
// ---------------------------------------------------------------------------

/**
 * « Ce qui prouve » — R + cristal + numéro au pont. Le visage du Credo :
 * constant sur chaque monture (cf. Credo « La signature et les symboles »).
 * Source : maquette XXXIV (validée comme structure de référence).
 */
export const PROOF: ProofBlock = {
  label: 'La signature',
  texte:
    "Le R dans le verre, pour celui d'en face. Le cristal en bout de branche, " +
    "derrière l'oreille. Connu du seul porteur. Et au pont, un numéro : " +
    "il n'existera qu'une fois.",
};

/**
 * Confiance, en murmure. Faits tenus (commit 9fbfa : retour 14j, garantie
 * constructeur 3 ans ; fabrication Corée). « 250+ opticiens » = preuve sociale
 * reformulée (note de chantier). À garder sobre, jamais en argument qui crie.
 */
export const TRUST: readonly string[] = [
  'Retour sous 14 jours',
  'Garantie constructeur 3 ans',
  'Dessinée à Paris, fabriquée en Corée',
  'Paiement sécurisé',
  '250+ opticiens',
];

// ---------------------------------------------------------------------------
// COLLECTIONS — récits partagés
//   heritage = Trident ; versailles = Fleur de lys ; isis = ankh/scarabée/cobra/œil
//   Seul `heritage` est rempli (brouillon, maquette) ; les autres = TODO.
// ---------------------------------------------------------------------------

export const COLLECTIONS: Record<CollectionId, Collection> = {
  heritage: {
    nom: 'Héritage',
    // BROUILLON (maquette) — à valider via renaissance-copywriter.
    recit:
      "Ce qui nous précède nous construit. Héritage rassemble les montures qui " +
      "portent le Trident. Des formes qui traversent les modes sans jamais s'y soumettre.",
  },
  versailles: {
    nom: 'Versailles',
    recit: '', // TODO — récit à écrire (chapitre Fleur de lys).
  },
  isis: {
    nom: 'Isis',
    recit: '', // TODO — récit à écrire (chapitre égyptien).
  },
};

// ---------------------------------------------------------------------------
// SYMBOLES — textes partagés. Étendards + définitions repris tels quels de la
// Bible ch.8.2–8.8 (validés, affichés en boutique). `deuxLectures` : trident
// rempli depuis Bible 8.2 ; les autres = TODO (à dériver de leur section Bible).
// ---------------------------------------------------------------------------

export const SYMBOLES: Record<SymboleId, Symbole> = {
  trident: {
    nom: 'Le Trident',
    etendard: 'Souveraineté',
    definition:
      "L'équilibre entre hier, aujourd'hui et demain. L'ancrage dans ce qui fonde, " +
      'ce qui construit, ce qui perdure.',
    deuxLectures:
      "La mémoire y lit les générations : trois pointes, un seul manche. " +
      'Le choix y lit le refus du remplaçable.',
  },
  'fleur-de-lys': {
    nom: 'La Fleur de lys',
    etendard: 'Maîtrise',
    definition:
      "L'héritage français. La noblesse d'un geste transmis, la fierté d'une origine assumée.",
    deuxLectures: '', // TODO — Bible 8.3.
  },
  ankh: {
    nom: "L'Ankh",
    etendard: 'Éternité',
    definition:
      'Le souffle qui relie. Ce qui connecte ceux qui construisent à ceux qui continueront.',
    deuxLectures: '', // TODO — Bible 8.4.
  },
  scarabee: {
    nom: 'Le Scarabée',
    etendard: 'Renaissance',
    definition:
      'Le passage et la transformation. Ce qui traverse les épreuves, ce qui renaît plus fort.',
    deuxLectures: '', // TODO — Bible 8.5.
  },
  cobra: {
    nom: 'Le Cobra',
    etendard: 'Protection',
    definition: "L'éveil silencieux. Celui qui voit avant d'être vu.",
    deuxLectures: '', // TODO — Bible 8.6.
  },
  'oeil-horus': {
    nom: "L'Œil d'Horus",
    etendard: 'Lucidité',
    definition:
      "L'œil qui ne se ferme jamais. Brisé puis rendu entier, il voit ce que les autres " +
      'regardent sans voir.',
    deuxLectures: '', // TODO — Bible 8.7.
  },
  'plaque-parisienne': {
    nom: 'La plaque parisienne',
    etendard: 'Appartenance',
    definition:
      "La rue qu'on ne trouve sur aucune carte. Paris gravé dans l'or, " +
      "l'adresse que chacun emporte où il va.",
    deuxLectures: '', // TODO — Bible 8.8.
  },
};

// ---------------------------------------------------------------------------
// MODELS — le niveau propre à chaque monture.
//   XXXIV = exemple/armature rempli (faits sourcés, copy en brouillon).
//   Les 44 autres modèles : à remplir par lots de 2-3, fiche par fiche.
// ---------------------------------------------------------------------------

export const MODELS: Record<string, ModelEditorial> = {
  // ── ARMATURE DE RÉFÉRENCE ──────────────────────────────────────────────
  'Renaissance XXXIV': {
    romain: 'Renaissance XXXIV',
    arabe: 34,
    // BROUILLON (maquette) — à valider via renaissance-copywriter.
    legende: "Trois griffes. Le verre ne tient qu'à elles.",
    // VALIDÉE (maquette + passe renaissance-copywriter, Yassin 2026-06-09).
    // « rimless » = vocabulaire métier lunetier, gardé (skill + maquette).
    description:
      "L'emprise sur le réel. Le Trident sort du métal et entre dans le verre : " +
      "il le serre, il le porte. Rimless. Rien autour, juste les trois " +
      "pointes et ce qu'elles agrippent.",
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures réelles (note de chantier ligne 102 + maquette XXXIV).
    dimensions: { verre: 54, pont: 17, branche: 140 },
    morphologie: 'Convient aux visages moyens.',
    collection: 'heritage',
    symbole: 'trident',
    copyStatut: 'valide',
  },

  // ── LOT 1 (2026-06-12) ─────────────────────────────────────────────────
  'Renaissance II': {
    romain: 'Renaissance II',
    arabe: 2,
    // BROUILLON — passé renaissance-copywriter, en attente de validation Yassin.
    legende: "Un cercle de métal fin. Rien d'autre à déclarer.",
    // Faits : photos dossier 02 (stries pont/tenons/branches, R sur verre,
    // strass) + réponses Yassin 2026-06-12 (stries = détail voulu simple,
    // premiers modèles, sans signification).
    description:
      'La rondeur stricte. Un fil de métal ferme le cercle, et des stries ' +
      'noires courent du pont au départ des branches. Du détail voulu simple, ' +
      'depuis les premières heures de la Maison. Pas de symbole : le R sur le ' +
      'verre, le strass au bout. Le visage seul suffit.',
    forme: 'ronde cerclée',
    // Matière : ancienne description + fiche Shopify (titane plaqué or 18KT).
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (_MESURES EYEFOREYE, double relevé concordant).
    dimensions: { verre: 51, pont: 20, branche: 140 },
    morphologie: 'Convient aux visages fins à moyens.',
    // Visage seul : ni collection, ni symbole (Bible 8.1).
    // Copy validée par Yassin le 2026-06-12 (rendu localhost contrôlé).
    copyStatut: 'valide',
  },

  'Renaissance III': {
    romain: 'Renaissance III',
    arabe: 3,
    // BROUILLON — passé renaissance-copywriter, travaillé avec Yassin le 2026-06-12.
    legende: "L'aviateur, repris angle par angle.",
    // Faits : photos dossier 03 (angles, double pont, charnières striées).
    // « double pont » = terme métier validé par Yassin (équivalents imposés en
    // transcréation : double bridge, Doppelsteg, doble puente, doppio ponte,
    // двойной мост). Seul le Coloris 1 est en vente (décision Yassin 2026-06-12,
    // photos C2/C3 marquées d'un R incrusté, sans original).
    description:
      'Une silhouette que tout le monde connaît. Les courbes deviennent des ' +
      'angles, le verre tombe net. Double pont. Aux charnières, le métal est ' +
      'strié. Il ne reste rien à adoucir.',
    forme: 'aviateur double pont',
    // Matière : ancienne description + fiche Shopify (titane plaqué or 18KT).
    matiere: 'titane',
    adaptable: true,
    // Mesures données par Yassin le 2026-06-12 (III absente d'eyeforeye).
    dimensions: { verre: 59, pont: 18, branche: 145 },
    morphologie: 'Convient aux visages moyens à larges.',
    // Visage seul : ni collection, ni symbole (Bible 8.1).
    // Copy validée par Yassin le 2026-06-12.
    copyStatut: 'valide',
  },

  // ── LOT 2 (2026-06-12) ─────────────────────────────────────────────────
  // Clé = titre Shopify (« Renaissance x FRENCH CUT IV Colori n » → getModelName).
  'Renaissance x FRENCH CUT IV': {
    // Titre affiché « Renaissance IV (4) x FRENCH CUT » (décision Yassin 2026-06-12).
    romain: 'Renaissance IV',
    arabe: 4,
    collab: 'x FRENCH CUT',
    // Copy validée par Yassin le 2026-06-12 (rendu localhost contrôlé,
    // version larme précisée + titre collab insécable).
    legende: 'Un seul verre. Deux noms gravés dedans.',
    // Faits : photos dossier 04 (verre unique ligne haute droite, gravure
    // « RENAISSANCE X FRENCHCUT » sur le verre, larme noire au bas du verre
    // droit, branches double câble torsadé, embouts bordeaux acétate
    // Mazzucchelli confirmés Yassin 2026-06-12). Décision Yassin 2026-06-12
    // (brouillon IV) : première collaboration de la Maison ; le mot « masque »
    // n'apparaît jamais ; la larme = clin d'œil au tatouage, portée sur le
    // verre au lieu de la peau, sens : ce qui renaît après l'épreuve.
    description:
      'La première collaboration de la Maison. Un seul verre, les deux noms ' +
      'gravés dans le dégradé, les branches en deux câbles torsadés ' +
      "jusqu'au bordeaux. Au bas du verre, une larme. C'est celle qu'on " +
      "tatoue sous l'œil, pour une perte ou une épreuve traversée. Ici, " +
      'elle est posée sur le verre au lieu de la peau. Elle ne raconte pas ' +
      "la chute. Elle dit qu'on est resté debout. Elle dit ce qui renaît.",
    forme: 'verre unique',
    // Matière : confirmée Yassin 2026-06-12 (+ filet Shopify « Titane plaqué or 18Kt »).
    matiere: 'titane',
    // Tag Shopify « non-adaptable » (relevé 2026-06-12, les 3 coloris en ligne).
    adaptable: false,
    // eyeforeye cassée sur ce modèle (valeurs brutes 150/150/X, fichier
    // _MESURES EYEFOREYE 2026-06-11). Décision Yassin (note 2026-06-12) :
    // 150 (largeur du verre unique) · 12 (pont) · 150 (branches).
    dimensions: { verre: 150, pont: 12, branche: 150 },
    // Déduction verre unique 150 mm, confirmée Yassin 2026-06-12.
    morphologie: 'Convient aux visages moyens à larges.',
    // Collab hors collections et hors symboles : visage seul (Bible 8.1).
    copyStatut: 'valide',
  },

  'Renaissance VI': {
    romain: 'Renaissance VI',
    arabe: 6,
    // Copy validée par Yassin le 2026-06-12.
    legende: "Le pont est strié. C'est lui qu'on retient.",
    // Faits : photos dossier 06 (aviateur aux coins taillés, cerclé entier,
    // double pont à bloc strié noir, stries aux départs de branches,
    // gravure « RENAISSANCE CE 18KT » en branche, R sur le verre).
    // Décisions Yassin 2026-06-12 : photos font foi (l'ancienne description
    // « forme douce » ne décrit pas ce modèle) ; C2 or franc.
    description:
      "L'aviateur, les coins taillés net. Double pont : celui du bas porte " +
      "des stries noires, les mêmes qu'au départ des branches. " +
      'RENAISSANCE et 18KT gravés dans la branche. Le R sur le verre fait ' +
      'le reste.',
    forme: 'aviateur cerclé double pont',
    // Matière : titane plaqué or rose, confirmé Yassin 2026-06-12.
    matiere: 'titane',
    // Aucun tag restrictif sur Shopify (VI Colori 2, seul coloris en ligne).
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 + gravure branche « VI 59□16-145 »
    // (6 C2 DETAIL.jpg) : deux sources concordantes.
    dimensions: { verre: 59, pont: 16, branche: 145 },
    // Décision Yassin 2026-06-12.
    morphologie: 'Convient aux visages moyens. Les visages fins la portent oversize.',
    // Visage seul : ni collection, ni symbole (Bible 8.1).
    copyStatut: 'valide',
  },

  // Clé = titre Shopify (« Renaissance VIII x OCHO Colori n » → getModelName).
  'Renaissance VIII x OCHO': {
    // Titre affiché « Renaissance VIII (8) x OCHO » (gabarit collab, cf. IV).
    romain: 'Renaissance VIII',
    arabe: 8,
    collab: 'x OCHO',
    // Copy validée par Yassin le 2026-06-12.
    legende: "Le 8 d'un côté. Le R de l'autre.",
    // Faits : photos dossier 08 (acétate épais rectangulaire, coins cassés net,
    // monogramme 8 à la charnière, gravures « RENAISSANCE CE 18/300 » C1 et
    // « 188/300 » C2). Décisions Yassin 2026-06-12 (brouillon VIII) : collab
    // avec le rappeur SDM, Ocho est sa marque, logo redessiné par la Maison
    // (le 8 sur une branche, le R dans l'écriture d'Ocho sur l'autre) ;
    // 300 exemplaires, 100 par coloris, comptés d'un seul fil ; verres unis
    // foncés = signature de l'invité (même décision que le masque IV) ;
    // acétate Mazzucchelli confirmé. « Une des premières collabs rappeur x
    // lunetier » : invérifiable, ne s'écrit pas (Credo : se prouve, ne
    // s'annonce pas). Jamais « édition limitée ».
    description:
      "La rencontre avec SDM. Son 8, le signe d'Ocho, scelle une branche ; " +
      "le R de Renaissance répond sur l'autre, dessiné dans l'écriture " +
      "d'Ocho. L'acétate Mazzucchelli, épais, taillé droit, les coins " +
      'cassés net. Trois cents exemplaires, numérotés à la branche, cent ' +
      'par coloris. Le reste se tait.',
    forme: 'rectangulaire',
    matiere: 'acetate',
    // Aucun tag restrictif sur Shopify (relevé 2026-06-12).
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (« VIII (COLLAB SDM / OCHO) »).
    dimensions: { verre: 57, pont: 19, branche: 142 },
    // Déduction verre 57, confirmée Yassin 2026-06-12.
    morphologie: 'Convient aux visages moyens à larges.',
    // Collab hors collections et hors symboles : visage seul (Bible 8.1).
    copyStatut: 'valide',
  },
};

// ---------------------------------------------------------------------------
// TRANSLATIONS — le contenu transcréé, langue par langue.
//   À remplir UNIQUEMENT depuis du FR validé, via les skills
//   renaissance-copywriter-{en,de,es,it,ru}. Vide = le site affiche le FR.
// ---------------------------------------------------------------------------

export const TRANSLATIONS: Partial<Record<Exclude<Lang, 'fr'>, EditorialTranslations>> = {
  // Transcréé depuis le FR validé (skill renaissance-copywriter-en, 2026-06-10).
  en: {
    models: {
      'Renaissance XXXIV': {
        legende: 'Three claws. Nothing else holds the lens.',
        description:
          'A grip on the real. The Trident comes out of the metal and into the lens: ' +
          'it holds it, it carries it. Rimless. Nothing around, just three points and what they grasp.',
        morphologie: 'Fits medium faces.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-en, 2026-06-12).
      'Renaissance II': {
        legende: 'A circle of thin metal. Nothing else to declare.',
        description:
          'Roundness, kept strict. A thread of metal closes the circle, and black grooves ' +
          'run from the bridge to where the temples begin. A detail meant to be simple, ' +
          'from the first hours of the House. No symbol: the R on the lens, the crystal ' +
          'at the tip. The face alone is enough.',
        morphologie: 'Suits narrow to medium faces.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-en, 2026-06-12).
      'Renaissance III': {
        legende: 'The aviator, redrawn angle by angle.',
        description:
          'A silhouette everyone knows. The curves become angles, the lens falls clean. ' +
          'Double bridge. At the hinges, the metal is grooved. Nothing left to soften.',
        morphologie: 'Suits medium to wide faces.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-en, 2026-06-12).
      'Renaissance x FRENCH CUT IV': {
        legende: 'A single lens. Two names engraved in it.',
        description:
          'The first collaboration of the House. A single lens, both names ' +
          'engraved in the gradient, the temples two cables twisted down to ' +
          'bordeaux tips. At the bottom of the lens, a teardrop. The one ' +
          'tattooed under the eye, for a loss, or a trial you lived through. ' +
          'Here it rests on the lens instead of the skin. It does not tell of ' +
          'the fall. It says you stayed standing. It says what is reborn.',
        morphologie: 'Fits medium to wide faces.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-en, 2026-06-12).
      'Renaissance VI': {
        legende: "The bridge is grooved. That's the part you remember.",
        description:
          'An aviator, corners cut clean. Double bridge: the lower one carries ' +
          'black grooves, the same ones found where the temples begin. ' +
          'RENAISSANCE and 18KT engraved on the temple. The R on the lens ' +
          'does the rest.',
        morphologie: 'Suits medium faces. Narrow faces wear it oversize.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-en, 2026-06-12).
      'Renaissance VIII x OCHO': {
        legende: 'The 8 on one side. The R on the other.',
        description:
          'The meeting with SDM. His 8, the sign of Ocho, seals one temple; ' +
          "the R of Renaissance answers on the other, drawn in Ocho's own " +
          'hand. Mazzucchelli acetate, thick, cut straight, the corners ' +
          'broken clean. Three hundred pairs, each numbered on the temple, ' +
          'one hundred per coloris. The rest keeps quiet.',
        morphologie: 'Fits medium to wide faces.',
      },
    },
    collections: {
      heritage: {
        recit:
          'What comes before us builds us. Héritage gathers the frames that carry the Trident. ' +
          'Shapes that pass through trends without ever bowing to them.',
      },
    },
    symboles: {
      trident: {
        nom: 'The Trident',
        etendard: 'Sovereignty',
        definition:
          'The balance of yesterday, today, and tomorrow. An anchor in what founds, ' +
          'what builds, what lasts.',
        deuxLectures:
          'Memory reads generations in it: three points, a single shaft. ' +
          'Choice reads the refusal of the replaceable.',
      },
    },
    proof: {
      label: 'The signature',
      texte:
        'The R in the lens, for the person across from you. The crystal at the temple tip, ' +
        'behind the ear. Known to the wearer alone. And on the bridge, a number: it will exist only once.',
    },
    trust: [
      '14-day returns',
      '3-year manufacturer warranty',
      'Designed in Paris, made in Korea',
      'Secure payment',
      '250+ opticians',
    ],
  },
  // Transcréé depuis le FR validé (skill renaissance-copywriter-de, 2026-06-10).
  de: {
    models: {
      'Renaissance XXXIV': {
        legende: 'Drei Krallen. Nur an ihnen hält das Glas.',
        description:
          'Der Griff nach dem Wirklichen. Der Dreizack tritt aus dem Metall und dringt ins Glas: ' +
          'er hält es fest, er trägt es. Rimless. Nichts darum herum, nur die drei Spitzen und das, was sie packen.',
        morphologie: 'Für mittelgroße Gesichter.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-de, 2026-06-12).
      'Renaissance II': {
        legende: 'Ein Kreis aus feinem Metall. Sonst nichts zu deklarieren.',
        description:
          'Die strenge Rundung. Ein Faden aus Metall schließt den Kreis, und schwarze ' +
          'Rillen laufen vom Steg bis zum Ansatz der Bügel. Ein Detail, bewusst einfach ' +
          'gehalten, seit den ersten Stunden des Hauses. Kein Symbol: das R auf dem Glas, ' +
          'der Kristall an der Bügelspitze. Das Gesicht allein genügt.',
        morphologie: 'Geeignet für schmale bis mittlere Gesichter.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-de, 2026-06-12).
      'Renaissance III': {
        legende: 'Der Aviator, Winkel für Winkel neu gefasst.',
        description:
          'Eine Silhouette, die jeder kennt. Die Kurven werden zu Winkeln, das Glas ' +
          'fällt sauber ab. Doppelsteg. An den Scharnieren ist das Metall geriffelt. ' +
          'Es bleibt nichts mehr zu mildern.',
        morphologie: 'Geeignet für mittlere bis breite Gesichter.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-de, 2026-06-12).
      'Renaissance x FRENCH CUT IV': {
        legende: 'Ein einziges Glas. Zwei Namen darin graviert.',
        description:
          'Die erste Zusammenarbeit des Hauses. Ein einziges Glas, beide Namen ' +
          'in den Verlauf graviert, die Bügel zwei verdrillte Kabel bis in die ' +
          'bordeauxroten Spitzen. Unten am Glas eine Träne. Es ist die, die ' +
          'man sich unter das Auge tätowieren lässt, für einen Verlust oder ' +
          'eine durchstandene Prüfung. Hier liegt sie auf dem Glas statt auf ' +
          'der Haut. Sie erzählt nicht vom Fall. Sie sagt, dass man aufrecht ' +
          'geblieben ist. Sie sagt, was wiedergeboren wird.',
        morphologie: 'Für mittlere bis breite Gesichter.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-de, 2026-06-12).
      'Renaissance VI': {
        legende: 'Der Steg ist gerillt. Ihn vergisst man nicht.',
        description:
          'Die Pilotenform, die Ecken scharf geschnitten. Doppelsteg: der ' +
          'untere trägt schwarze Rillen, dieselben wie am Bügelansatz. ' +
          'RENAISSANCE und 18KT, in den Bügel graviert. Das R auf dem Glas ' +
          'erledigt den Rest.',
        morphologie: 'Passt zu mittleren Gesichtern. Schmale Gesichter tragen sie oversize.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-de, 2026-06-12).
      'Renaissance VIII x OCHO': {
        legende: 'Die 8 auf der einen Seite. Das R auf der anderen.',
        description:
          'Die Begegnung mit SDM. Seine 8, das Zeichen von Ocho, besiegelt ' +
          'den einen Bügel; das R von Renaissance antwortet auf dem anderen, ' +
          'gezeichnet in der Schrift von Ocho. Das Mazzucchelli-Acetat, dick, ' +
          'gerade geschnitten, die Ecken sauber gebrochen. Dreihundert ' +
          'Exemplare, nummeriert am Bügel, hundert pro Coloris. Der Rest ' +
          'schweigt.',
        morphologie: 'Für mittlere bis breite Gesichter.',
      },
    },
    collections: {
      heritage: {
        recit:
          'Was uns vorausgeht, baut uns. Héritage versammelt die Fassungen, die den Dreizack tragen. ' +
          'Formen, die durch die Moden gehen, ohne sich ihnen je zu beugen.',
      },
    },
    symboles: {
      trident: {
        nom: 'Der Dreizack',
        etendard: 'Souveränität',
        definition:
          'Das Gleichgewicht zwischen Gestern, Heute und Morgen. Die Verankerung in dem, ' +
          'was gründet, was baut, was bleibt.',
        deuxLectures:
          'Das Gedächtnis liest darin die Generationen: drei Spitzen, ein einziger Schaft. ' +
          'Die Wahl liest darin die Absage an das Ersetzbare.',
      },
    },
    proof: {
      label: 'Die Signatur',
      texte:
        'Das R im Glas, für das Gegenüber. Der Kristall an der Bügelspitze, hinter dem Ohr. ' +
        'Nur dem Träger bekannt. Und auf dem Steg eine Nummer: Es gibt sie kein zweites Mal.',
    },
    trust: [
      'Rückgabe innerhalb von 14 Tagen',
      '3 Jahre Herstellergarantie',
      'Entworfen in Paris, gefertigt in Korea',
      'Sichere Zahlung',
      'Über 250 Optiker',
    ],
  },
  // Transcréé depuis le FR validé (skill renaissance-copywriter-es, 2026-06-10).
  es: {
    models: {
      'Renaissance XXXIV': {
        legende: 'Tres garras. La lente solo se sostiene en ellas.',
        description:
          'El dominio sobre lo real. El Tridente sale del metal y entra en la lente: ' +
          'la aprieta, la lleva. Rimless. Nada alrededor, solo las tres puntas y lo que aferran.',
        morphologie: 'Para rostros medianos.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-es, 2026-06-12).
      'Renaissance II': {
        legende: 'Un círculo de metal fino. Nada más que declarar.',
        description:
          'La redondez estricta. Un hilo de metal cierra el círculo, y unas estrías negras ' +
          'corren del puente al arranque de las patillas. Un detalle que se quiso sencillo, ' +
          'desde las primeras horas de la Casa. Sin símbolo: la R en la lente, el cristal ' +
          'en la punta. El rostro solo basta.',
        morphologie: 'Conviene a los rostros de finos a medios.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-es, 2026-06-12).
      'Renaissance III': {
        legende: 'El aviador, retomado ángulo a ángulo.',
        description:
          'Una silueta que todo el mundo conoce. Las curvas se vuelven ángulos, ' +
          'la lente cae en seco. Doble puente. En las bisagras, el metal está ' +
          'estriado. No queda nada que suavizar.',
        morphologie: 'Para rostros de medianos a anchos.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-es, 2026-06-12).
      'Renaissance x FRENCH CUT IV': {
        legende: 'Una sola lente. Dos nombres grabados dentro.',
        description:
          'La primera colaboración de la Casa. Una sola lente, los dos nombres ' +
          'grabados en el degradado, las patillas en dos cables trenzados hasta ' +
          'el burdeos. En la parte baja de la lente, una lágrima. La que se ' +
          'tatúa bajo el ojo, por una pérdida o una prueba superada. Aquí va ' +
          'sobre la lente, no sobre la piel. No cuenta la caída. Dice que uno ' +
          'siguió en pie. Dice lo que renace.',
        morphologie: 'Indicada para rostros de medianos a anchos.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-es, 2026-06-12).
      'Renaissance VI': {
        legende: 'El puente está estriado. Es el que se recuerda.',
        description:
          'El aviador, con los ángulos tallados en seco. Doble puente: el de ' +
          'abajo lleva estrías negras, las mismas que en el arranque de las ' +
          'patillas. RENAISSANCE y 18KT grabados en la patilla. La R en la ' +
          'lente hace el resto.',
        morphologie: 'Conviene a los rostros medianos. Los rostros finos la llevan oversize.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-es, 2026-06-12).
      'Renaissance VIII x OCHO': {
        legende: 'El 8 a un lado. La R al otro.',
        description:
          'El encuentro con SDM. Su 8, el signo de Ocho, sella una patilla; ' +
          'la R de Renaissance responde en la otra, dibujada con la letra de ' +
          'Ocho. El acetato Mazzucchelli, grueso, tallado recto, las esquinas ' +
          'rotas en seco. Trescientos ejemplares, numerados en la patilla, ' +
          'cien por coloris. El resto calla.',
        morphologie: 'Para rostros de medios a anchos.',
      },
    },
    collections: {
      heritage: {
        recit:
          'Lo que nos precede nos construye. Héritage reúne las monturas que llevan el Tridente. ' +
          'Formas que atraviesan las modas sin someterse nunca a ellas.',
      },
    },
    symboles: {
      trident: {
        nom: 'El Tridente',
        etendard: 'Soberanía',
        definition:
          'El equilibrio entre ayer, hoy y mañana. El anclaje en lo que funda, ' +
          'lo que construye, lo que perdura.',
        deuxLectures:
          'La memoria lee en él las generaciones: tres puntas, una sola asta. ' +
          'La elección lee en él el rechazo de lo reemplazable.',
      },
    },
    proof: {
      label: 'La firma',
      texte:
        'La R en la lente, para quien está enfrente. El cristal en la punta de la patilla, ' +
        'detrás de la oreja. Solo lo conoce quien la lleva. Y en el puente, un número: solo existirá una vez.',
    },
    trust: [
      'Devolución en 14 días',
      'Garantía del fabricante de 3 años',
      'Diseñada en París, fabricada en Corea',
      'Pago seguro',
      'Más de 250 ópticos',
    ],
  },
  // Transcréé depuis le FR validé (skill renaissance-copywriter-it, 2026-06-10).
  it: {
    models: {
      'Renaissance XXXIV': {
        legende: 'Tre griffe. La lente si regge solo su di loro.',
        description:
          'La presa sul reale. Il Tridente esce dal metallo ed entra nella lente: ' +
          'la stringe, la porta. Rimless. Niente intorno, solo le tre punte e ciò che afferrano.',
        morphologie: 'Adatta ai visi medi.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-it, 2026-06-12).
      'Renaissance II': {
        legende: "Un cerchio di metallo sottile. Nient'altro da dichiarare.",
        description:
          'La rotondità rigorosa. Un filo di metallo chiude il cerchio, e strie nere ' +
          "corrono dal ponte all'attacco delle aste. Un dettaglio voluto semplice, fin " +
          'dalle prime ore della Maison. Nessun simbolo: la R sulla lente, il cristallo ' +
          'in punta. Il volto, da solo, basta.',
        morphologie: 'Adatta ai visi da sottili a medi.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-it, 2026-06-12).
      // « aviator » = lessico occhialeria (la forme), « aviatore » désignerait le pilote.
      'Renaissance III': {
        legende: "L'aviator, ripreso angolo per angolo.",
        description:
          'Una silhouette che tutti conoscono. Le curve diventano angoli, la lente ' +
          'scende netta. Doppio ponte. Alle cerniere, il metallo è striato. ' +
          'Non resta niente da addolcire.',
        morphologie: 'Adatta ai visi da medi a larghi.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-it, 2026-06-12).
      'Renaissance x FRENCH CUT IV': {
        legende: 'Una sola lente. Due nomi incisi dentro.',
        description:
          'La prima collaborazione della Maison. Una sola lente, i due nomi ' +
          'incisi nella sfumatura, le aste in due cavi ritorti fino al ' +
          "bordeaux. In basso sulla lente, una lacrima. È quella che si tatua " +
          "sotto l'occhio, per una perdita o una prova attraversata. Qui è " +
          'posata sulla lente invece che sulla pelle. Non racconta la caduta. ' +
          'Dice che si è rimasti in piedi. Dice ciò che rinasce.',
        morphologie: 'Adatta ai visi da medi a larghi.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-it, 2026-06-12).
      'Renaissance VI': {
        legende: 'Il ponte è striato. Nella memoria resta lui.',
        description:
          "L'aviator, gli angoli tagliati netti. Doppio ponte: quello in " +
          "basso porta strie nere, le stesse dell'attacco delle aste. " +
          "RENAISSANCE e 18KT incisi sull'asta. La R sulla lente fa il resto.",
        morphologie: 'Adatta ai visi medi. I visi sottili la portano oversize.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-it, 2026-06-12).
      'Renaissance VIII x OCHO': {
        legende: "L'8 da un lato. La R dall'altro.",
        description:
          "L'incontro con SDM. Il suo 8, il segno di Ocho, sigilla un'asta; " +
          "la R di Renaissance risponde sull'altra, disegnata nella grafia " +
          "di Ocho. L'acetato Mazzucchelli, spesso, tagliato dritto, gli " +
          'angoli spezzati di netto. Trecento esemplari, numerati ' +
          "sull'asta, cento per coloris. Il resto tace.",
        morphologie: 'Adatta ai visi da medi a larghi.',
      },
    },
    collections: {
      heritage: {
        recit:
          'Ciò che ci precede ci costruisce. Héritage riunisce le montature che portano il Tridente. ' +
          'Forme che attraversano le mode senza mai piegarsi.',
      },
    },
    symboles: {
      trident: {
        nom: 'Il Tridente',
        etendard: 'Sovranità',
        definition:
          "L'equilibrio tra ieri, oggi e domani. Il radicamento in ciò che fonda, " +
          'ciò che costruisce, ciò che dura.',
        deuxLectures:
          'La memoria vi legge le generazioni: tre punte, un solo manico. ' +
          'La scelta vi legge il rifiuto del sostituibile.',
      },
    },
    proof: {
      label: 'La firma',
      texte:
        "La R sulla lente, per chi sta di fronte. Il cristallo in punta d'asta, dietro l'orecchio. " +
        'Noto solo a chi porta. E sul ponte, un numero: esisterà una volta sola.',
    },
    trust: [
      'Reso entro 14 giorni',
      'Garanzia del produttore: 3 anni',
      'Disegnata a Parigi, fabbricata in Corea',
      'Pagamento sicuro',
      'Oltre 250 ottici',
    ],
  },
  // Transcréé depuis le FR validé (skill renaissance-copywriter-ru, 2026-06-10).
  ru: {
    models: {
      'Renaissance XXXIV': {
        legende: 'Три когтя. Линза держится только на них.',
        description:
          'Хватка за реальность. Трезубец выходит из металла и входит в линзу: ' +
          'сжимает её, несёт её. Безободковая оправа. Вокруг ничего, только три зубца и то, во что они вцепились.',
        morphologie: 'Подходит для лиц среднего размера.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-ru, 2026-06-12).
      'Renaissance II': {
        legende: 'Тонкий круг металла. Больше заявлять нечего.',
        description:
          'Строгая округлость. Нить металла замыкает круг, и чёрные бороздки бегут ' +
          'от переносицы к началу заушников. Деталь, задуманная простой, с первых ' +
          'часов Дома. Без символа: R на линзе, кристалл на конце. Одного лица достаточно.',
        morphologie: 'Подходит узким и средним лицам.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-ru, 2026-06-12).
      'Renaissance III': {
        legende: 'Авиатор, перечерченный угол за углом.',
        description:
          'Силуэт, который знают все. Изгибы становятся углами, линза срезана чётко. ' +
          'Двойной мост. На шарнирах металл рифлёный. Смягчать больше нечего.',
        morphologie: 'Подходит для средних и широких лиц.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-ru, 2026-06-12).
      'Renaissance x FRENCH CUT IV': {
        legende: 'Одна линза. Внутри выгравированы два имени.',
        description:
          'Первая совместная работа Дома. Одна линза, оба имени выгравированы ' +
          'прямо в градиенте, заушники сплетены в два витых троса и уходят в ' +
          'бордовый на наконечниках. У нижнего края линзы застыла слеза. Та ' +
          'самая, что татуируют под глазом: знак потери или пройденного ' +
          'испытания. Здесь она легла на линзу, а не на кожу. Она не ' +
          'рассказывает о падении. Она говорит, что ты устоял. Она говорит о ' +
          'том, что рождается заново.',
        morphologie: 'Подходит для лиц от среднего до широкого.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-ru, 2026-06-12).
      'Renaissance VI': {
        legende: 'Мост рифлёный. Его и запоминают.',
        description:
          'Авиатор, углы срезаны чётко. Двойной мост: на нижнем чёрные ' +
          'бороздки, те же, что и у начала заушников. RENAISSANCE и 18KT ' +
          'выгравированы на заушнике. R на линзе делает остальное.',
        morphologie: 'Подходит для лиц среднего размера. На узких лицах она сидит оверсайз.',
      },
      // Transcréé depuis le FR validé (skill renaissance-copywriter-ru, 2026-06-12).
      'Renaissance VIII x OCHO': {
        legende: '8 с одной стороны. R с другой.',
        description:
          'Встреча с SDM. Его 8, знак Ocho, запечатывает один заушник. ' +
          'R Renaissance отвечает на другом, выведенный почерком Ocho. ' +
          'Толстый ацетат Mazzucchelli, прямой срез, углы сколоты начисто. ' +
          'Триста экземпляров, номер на заушнике, по сто в каждом цвете. ' +
          'Остальное молчит.',
        morphologie: 'Подходит для лиц от средних до широких.',
      },
    },
    collections: {
      heritage: {
        recit:
          'То, что было до нас, строит нас. Héritage собирает оправы, несущие Трезубец. ' +
          'Формы, которые проходят сквозь моду и никогда ей не подчиняются.',
      },
    },
    symboles: {
      trident: {
        nom: 'Трезубец',
        etendard: 'Суверенитет',
        definition:
          'Равновесие между вчера, сегодня и завтра. Опора на то, что лежит в основании, ' +
          'что строит, что остаётся.',
        deuxLectures:
          'Память читает в нём поколения: три зубца, одна рукоять. ' +
          'Выбор читает в нём отказ от заменимого.',
      },
    },
    proof: {
      label: 'Подпись',
      texte:
        'R на линзе, для того, кто напротив. Кристалл на конце заушника, за ухом. ' +
        'О нём знает только владелец. И на переносице номер: второго не будет.',
    },
    trust: [
      'Возврат в течение 14 дней',
      'Гарантия производителя 3 года',
      'Создана в Париже, изготовлена в Корее',
      'Защищённая оплата',
      '250+ салонов оптики',
    ],
  },
};

// ---------------------------------------------------------------------------
// RÉSOLUTION — assemble modèle + collection + symbole + constantes partagées.
// ---------------------------------------------------------------------------

/** Garde les seules clés réellement renseignées (pas de chaîne vide). */
function defined<T extends object>(obj: T | undefined): Partial<T> {
  if (!obj) return {};
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && v.length > 0) (out as Record<string, unknown>)[k] = v;
  }
  return out;
}

/**
 * Récupère l'éditorial assemblé d'un modèle par son nom (sortie de getModelName).
 * `lang` : langue d'affichage ; tout champ non transcréé retombe sur le français.
 * Retourne null si le modèle n'a pas encore de fiche éditoriale interne
 * (pendant la migration, on retombe alors sur l'ancien câblage Shopify).
 */
export function getModelEditorial(modelName: string, lang: string = 'fr'): ResolvedEditorial | null {
  const model = MODELS[modelName];
  if (!model) return null;
  const tr = lang !== 'fr' ? TRANSLATIONS[lang as Exclude<Lang, 'fr'>] : undefined;
  return {
    model: { ...model, ...defined(tr?.models?.[modelName]) },
    collection: model.collection
      ? { ...COLLECTIONS[model.collection], ...defined(tr?.collections?.[model.collection]) }
      : undefined,
    symbole: model.symbole
      ? { ...SYMBOLES[model.symbole], ...defined(tr?.symboles?.[model.symbole]) }
      : undefined,
    proof: { ...PROOF, ...defined(tr?.proof) },
    trust: tr?.trust ?? TRUST,
  };
}
