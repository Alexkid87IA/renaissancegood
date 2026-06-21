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
export type Lang = 'fr' | 'en' | 'de' | 'es' | 'it' | 'ru' | 'tr';

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
    // VALIDÉ 2026-06-21 (Yassin) — fleur de lys (Bible 8.3). Reformulé pour
    // retirer l'implication « fabrication française » : les montures sont
    // produites en Corée (fait assumé, cf. titane). La frenchité reste portée
    // par le symbole (la fleur de France) et la posture « on a appris le geste »,
    // jamais par un atelier français.
    recit:
      'La fleur de France, sans le trône. Sur nos montures, elle ne dit pas ' +
      "un rang reçu : trois pétales, une seule attache, le lien qu'on choisit. " +
      'Personne ne nous a faits nobles. On a appris le geste.',
  },
  isis: {
    nom: 'Isis',
    // VALIDÉ 2026-06-21 (Yassin) — chapitre égyptien (Bible 8.4 à 8.7). Mapping
    // des 4 étendards dans l'ordre : relie=ankh, renaît=scarabée, veille=cobra,
    // voit=œil d'Horus. Chute = thème survivance (Bible 8.9). « Une civilisation »
    // plutôt que « L'Égypte » nommée (décision Yassin).
    recit:
      "Une civilisation s'efface, ses signes tiennent encore. Isis réunit les " +
      "quatre : l'ankh, le scarabée, le cobra, l'œil d'Horus. Sculptés dans le " +
      'métal, ils disent ce qui relie, ce qui renaît, ce qui veille, ce qui ' +
      'voit. Ce qui traverse le temps.',
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
      "La fleur de France. La noblesse n'est pas dans le sang, mais dans la main : on la reconnaît à ce qu'un homme sait faire, jamais à d'où il vient.",
    // Bible 8.3, repris pour la fiche XXXVII (2026-06-20).
    deuxLectures:
      'La mémoire y lit la fleur de France, celle des ateliers qui ' +
      'travaillaient pour les palais. Le choix y lit trois pétales tenus par ' +
      "une seule attache : ce qu'on devient sans titre.",
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
    // Bible 8.5, repris pour la fiche LVIII (2026-06-21).
    deuxLectures:
      'La mémoire y lit la renaissance, notre nom dit par une autre ' +
      "civilisation. Le choix y lit la lenteur tenue : on avance chaque jour.",
  },
  cobra: {
    nom: 'Le Cobra',
    etendard: 'Protection',
    definition: "L'éveil silencieux. Celui qui voit avant d'être vu.",
    // Bible 8.6, repris pour la fiche LX (2026-06-21).
    deuxLectures:
      'La mémoire y lit le gardien du seuil. Le choix y lit l\'éveil ' +
      "silencieux : celui qui voit avant d'être vu.",
  },
  'oeil-horus': {
    nom: "L'Œil d'Horus",
    etendard: 'Lucidité',
    definition:
      "L'œil qui ne se ferme jamais. Brisé puis rendu entier, il voit ce que les autres " +
      'regardent sans voir.',
    // Bible 8.7, repris pour la fiche LV (2026-06-21).
    deuxLectures:
      'La mémoire y lit le gardien qui veille. Le choix y lit la lucidité : ' +
      'voir vraiment, pendant que les autres regardent.',
  },
  'plaque-parisienne': {
    nom: 'La plaque parisienne',
    etendard: 'Appartenance',
    definition:
      "La rue qu'on ne trouve sur aucune carte. Paris gravé dans l'or, " +
      "l'adresse que chacun emporte où il va.",
    // Bible 8.8, reformulé avec Yassin le 2026-06-20 : français naturel, sans
    // le procédé « la mémoire / le choix » ; le sens de l'appartenance, direct.
    deuxLectures:
      'Depuis 1844, chaque rue de Paris porte sa plaque. Celle-ci ne nomme ' +
      "pas une rue, mais ceux qui en sont.",
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

  'Renaissance IX': {
    romain: 'Renaissance IX',
    arabe: 9,
    // Copy validée par Yassin le 2026-06-12.
    legende: "Une corde d'or, tendue d'un verre à l'autre.",
    // Faits : photos dossier 09 (9 C1 FACE : aviateur cerclé, barre frontale
    // torsadée en corde, pont strié de noir dessous, liseré noir au tour des
    // verres, embouts acétate bordeaux ; 9 C1 DETAIL : « RENAISSANCE » gravé
    // dans la barre frontale, blocs striés noirs aux côtés, R sur le verre ;
    // 9 C1 TROIS-QUARTS : branches en deux câbles torsadés).
    // Décisions Yassin 2026-06-12 : titane plaqué or 18KT confirmé ;
    // le noir se dit sans nommer la technique, « liseré noir » pour le tour
    // des verres ; verre 61 = « Convient aux visages larges. »
    description:
      'Le fil tourné en corde. La torsade court au front, d\'un verre à ' +
      "l'autre, au-dessus d'un pont strié de noir. RENAISSANCE gravé dans " +
      'la barre, sous la corde. Un liseré noir suit le tour des verres. ' +
      "Les branches, deux câbles torsadés, jusqu'à l'embout bordeaux.",
    forme: 'aviateur cerclé double pont',
    matiere: 'titane',
    // Aucun tag restrictif sur Shopify (relevé 2026-06-12, « Renaissance IX
    // Colori 1 », seul coloris en ligne).
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (relevé IX C1).
    dimensions: { verre: 61, pont: 14, branche: 145 },
    // Décision Yassin 2026-06-12 (verre 61, au-dessus du repère 59).
    morphologie: 'Convient aux visages larges.',
    // Visage seul : ni collection, ni symbole (Bible 8.1).
    copyStatut: 'valide',
  },

  'Renaissance X': {
    romain: 'Renaissance X',
    arabe: 10,
    // Copy validée par Yassin le 2026-06-12.
    legende: 'La couleur, sans le cadre.',
    // Faits : photos dossier 10 (10 C3 FACE : rimless, verres carrés adoucis
    // dégradé jaune orangé, pont courbé strié en or rosé, blocs striés de
    // noir aux côtés, R sur le verre ; 10 C3 TROIS-QUARTS : branches en deux
    // câbles torsadés argentés, embouts acétate bordeaux, strass au bout).
    // Décisions Yassin 2026-06-12 : titane plaqué or 18KT confirmé ;
    // lecture C3 confirmée (métal or rosé, câbles argentés, embouts
    // bordeaux) ; le « miel » du brouillon était un effet du verre orangé.
    description:
      'Le verre nu. Il tient par le pont courbé, en or rosé, et par deux ' +
      "blocs striés de noir sur les côtés. Les branches, deux câbles " +
      "d'argent torsadés, jusqu'à l'embout bordeaux. Le verre fait le reste.",
    forme: 'rimless',
    matiere: 'titane',
    // Aucun tag restrictif sur Shopify (« Renaissance X Colori 3 » créé le
    // 2026-06-12, seul coloris en ligne sur eyeforeye, relevé 2026-06-11).
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (relevé « X C3 », seul coloris publié).
    dimensions: { verre: 58, pont: 16, branche: 145 },
    // Décision Yassin 2026-06-12 : verre 58 rangé avec le repère 59.
    morphologie: 'Convient aux visages moyens à larges.',
    // Visage seul : ni collection, ni symbole (Bible 8.1).
    copyStatut: 'valide',
  },

  'Renaissance XI': {
    romain: 'Renaissance XI',
    arabe: 11,
    // Copy validée par Yassin le 2026-06-20.
    legende: 'Huit angles, aucune courbe.',
    // Faits : photos dossier 11 (FACE C1 à C5 en taille 51 + 53 C1 : octogone
    // aplati, huit côtés, angles coupés francs, cerclage métal fin, pont droit ;
    // DETAIL : stries aux charnières et au départ de branche, RENAISSANCE gravé
    // sur la ligne du haut, R sur le verre, strass au bout). Forme confirmée
    // octogonale (et non hexagonale) par Yassin + lecture directe de la photo.
    // La petite gravure en œil sur un verre = logo distributeur Eye For Eye
    // (décision Yassin 2026-06-10), pas un symbole de Maison.
    description:
      "L'octogone tenu net. Le métal trace huit côtés, chaque angle coupé " +
      'franc. Aux charnières, des stries serrent le cerclage, les mêmes ' +
      'courent sur la branche. RENAISSANCE gravé sur la ligne du haut.',
    forme: 'octogonal cerclé',
    // Matière : titane plaqué or 18KT confirmé par Yassin le 2026-06-20.
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11. La XI existe en DEUX tailles, vendues comme
    // variantes Shopify (51 / 53) : verre 51 ou 53, même pont 21, même branche
    // 140. Valeur de base 51 ; le bloc Dimensions affiche le verre de la taille
    // sélectionnée (51 ou 53) via verreParTaille (ProductSidebar / ProductPageMobile).
    dimensions: { verre: 51, pont: 21, branche: 140 },
    morphologie: 'Convient aux visages fins à moyens.',
    // Visage seul : ni collection, ni symbole (Bible 8.1).
    copyStatut: 'valide',
  },

  'Renaissance XII': {
    romain: 'Renaissance XII',
    arabe: 12,
    // Copy validée par Yassin le 2026-06-20.
    legende: 'Une adresse vissée sur la branche.',
    // Faits : photos dossier 12 (FACE C1/C2/C3 : rectangulaire massif, acétate
    // taillé dans la masse, coins du haut en biseau, pont plein, verres presque
    // carrés ; TROIS-QUARTS : plaque parisienne « AVENUE DE LA RENAISSANCE »
    // vissée sur la branche avec « XII » au cartouche, marquage interne
    // « RENAISSANCE CE 18KT PGX », R sur le verre, strass au bout).
    // Décisions Yassin 2026-06-20 : acétate Mazzucchelli confirmé et dit en
    // clair ; branches du C2 noires (le bleu vu de face est un reflet) ;
    // symbole plaque parisienne affirmé sur la fiche. 3 coloris actifs sur
    // Shopify (C1 noir, C2 cristal à branches noires, C3 ambre à branches écaille).
    description:
      "L'acétate Mazzucchelli pris dans la masse, coupé droit. Les coins du " +
      'haut sont taillés en biais. Sur la branche, une plaque d\'or porte une ' +
      'adresse : Avenue de la Renaissance. Le numéro douze est gravé dessus. ' +
      "Elle n'est sur aucune carte.",
    forme: 'rectangulaire',
    matiere: 'acetate',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (relevés C2 et C3 concordants : 55·21·145).
    dimensions: { verre: 55, pont: 21, branche: 145 },
    morphologie: 'Convient aux visages moyens à larges.',
    // Symbole : la plaque parisienne · Appartenance (Bible 8.8). Pas une
    // collection : le seul symbole qui voyage. La XII est la première fiche
    // à le porter (deuxLectures rempli ce jour).
    symbole: 'plaque-parisienne',
    copyStatut: 'valide',
  },

  'Renaissance XIII': {
    romain: 'Renaissance XIII',
    arabe: 13,
    // Copy validée par Yassin le 2026-06-20.
    legende: "Le carré de l'aviateur, deux ponts.",
    // Faits : photos dossier 13 (FACE C1 : aviateur étiré au carré, dit
    // navigateur ; double pont, la barre du haut porte « RENAISSANCE CE 18KT »
    // gravé, le pont du bas est plus fin ; côtés striés ; R sur le verre,
    // logo œil Eye For Eye sur l'autre verre, « MADE IN KOREA » en branche).
    // Décisions Yassin 2026-06-20 : titane plaqué or 18KT confirmé ; forme
    // « navigateur double pont » pour la distinguer de la III ; chute sur le
    // visage seul. Un seul coloris en vente sur Shopify (Colori 1, 609 €) ;
    // les 6 autres coloris de la photothèque ne sont pas en ligne.
    description:
      'La barre du haut porte le nom, gravé dans le métal. Dessous, un ' +
      'second pont, plus fin. Aux côtés, le métal est strié. Pas de symbole : ' +
      'le R sur le verre, le strass au bout. Le visage seul suffit.',
    forme: 'navigateur double pont',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (relevés C3, C6, C7 concordants : 57·17·140).
    dimensions: { verre: 57, pont: 17, branche: 140 },
    morphologie: 'Convient aux visages moyens à larges.',
    // Visage seul : ni collection, ni symbole (Bible 8.1).
    copyStatut: 'valide',
  },

  'Renaissance XIV': {
    romain: 'Renaissance XIV',
    arabe: 14,
    // Copy validée par Yassin le 2026-06-20.
    legende: "L'aviateur aux angles francs.",
    // Faits : photos dossier 14 (FACE C1/C2/C3 : aviateur, le bas du verre
    // descend en angles coupés nets, pas en goutte ; double pont, deux barres
    // fines ; TROIS-QUARTS : branches en deux câbles métalliques torsadés
    // façon corde, du bloc strié à l'embout noir ; gravure « RENAISSANCE CE
    // 18KT », « MADE IN KOREA », R sur le verre, logo œil Eye For Eye sur
    // l'autre). Le signe du modèle = les branches tressées (la IX a la corde
    // au front, pas aux branches ; ne pas confondre, mêmes cotes 61·14·145).
    // Décisions Yassin 2026-06-20 : titane plaqué or 18KT ; chute sur le R,
    // pas sur « le visage seul suffit ».
    description:
      'Le bas du verre coupé net. Deux ponts fins, les branches tournées en ' +
      'corde. Le R sur le verre fait le reste.',
    forme: 'aviateur double pont',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (relevés C1, C2, C3 concordants : 61·14·145,
    // cote identique à la IX, montures distinctes).
    dimensions: { verre: 61, pont: 14, branche: 145 },
    morphologie: 'Convient aux visages larges.',
    // Visage seul : ni collection, ni symbole (Bible 8.1). Trois coloris en
    // vente sur Shopify (C1, C2, C3 à 539 € ; C1 et C3 créés le 2026-06-20,
    // photos uploadées depuis le PC, stock 2 chacun).
    copyStatut: 'valide',
  },

  'Renaissance XVI': {
    romain: 'Renaissance XVI',
    arabe: 16,
    // Copy validée par Yassin le 2026-06-20.
    legende: 'Un ovale rimless, taillé en diamond cut.',
    // Faits : photos dossier 16 (FACE/DETAIL/TROIS-QUARTS C1/C2/C3 : ovale
    // rimless, le bord du verre taillé en diamond cut sur TOUT le tour, pas
    // seulement le haut ; pont court strié ; branches en double barre torsadée
    // façon câble ; gravure « RENAISSANCE CE 18KT », « MADE IN KOREA », R sur
    // le verre, logo œil Eye For Eye sur l'autre, strass au bout).
    // Décisions Yassin 2026-06-20 : titane plaqué or 18KT ; « diamond cut » et
    // « double barre torsadée » adoubés (vocabulaire métier) ; chute sur le R.
    description:
      "Le verre n'a pas de cadre. Son bord est taillé en diamond cut, tout " +
      'le tour. Le pont est strié. Les branches : double barre torsadée. ' +
      'Le R sur le verre fait le reste.',
    forme: 'ovale rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (relevé C3 : 59·16·145).
    dimensions: { verre: 59, pont: 16, branche: 145 },
    morphologie: 'Convient aux visages moyens à larges.',
    // Visage seul : ni collection, ni symbole (Bible 8.1). Deux coloris en
    // vente sur Shopify (C3 709 € en stock, C2 759 € en rupture) ; C1 archivé.
    copyStatut: 'valide',
  },

  'Renaissance XVII': {
    romain: 'Renaissance XVII',
    arabe: 17,
    // Copy validée par Yassin le 2026-06-20.
    legende: 'Taillée tout autour, comme une pierre.',
    // Faits : photos dossier 17 (FACE/PROFIL/DETAIL C1 à C8 ouvertes). Forme
    // rectangulaire à coins coupés net, rimless, bord du verre taillé en diamond
    // cut sur TOUT le tour (du pont au bas du verre) ; attache verre-branche en
    // double boucle lisse ; gravure « RENAISSANCE CE 18KT », « MADE IN KOREA »,
    // R sur le verre, strass au bout.
    // Verdict Yassin/agent 2026-06-20 : aucun trident (l'ancienne pub Shopify
    // l'annonçait à tort) -> visage seul. Chute sur la taille, pas sur le R :
    // c'est elle qui fait le caractère du modèle.
    description:
      'La taille à la place du cadre. Des facettes en pointe courent tout ' +
      'le tour du verre, du pont au bas. Rimless. La lumière joue sur chaque arête.',
    forme: 'rectangulaire rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 58·17·140 (5 coloris relevés identiques).
    dimensions: { verre: 58, pont: 17, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    // Visage seul : ni collection, ni symbole (Bible 8.1). Quatre coloris en
    // vente sur Shopify (C1 809 €, C2 809 € en rupture, C3 759 €, C4 759 €) ;
    // les dossiers photo C5 à C8 ne sont pas au catalogue.
    copyStatut: 'valide',
  },

  'Renaissance XVIII': {
    romain: 'Renaissance XVIII',
    arabe: 18,
    // Copy validée par Yassin le 2026-06-20.
    legende: 'Un carré qui se tient droit.',
    // Faits : photos dossier 18 (FACE/TROIS-QUARTS/DETAIL C1 à C4). Carré
    // cerclé, coins juste adoucis ; fil de métal fin tout le tour ; double barre
    // au pont ; bloc de lignes serrées à l'attache des branches ; gravure
    // « RENAISSANCE CE 18KT », « MADE IN KOREA », R sur le verre, strass au bout.
    // Verdict 2026-06-20 : aucun symbole (l'« œil » du verre = logo Eye For Eye,
    // pas Isis, décision Yassin 2026-06-10) -> visage seul. On ne compte pas les
    // barres (l'ancienne pub disait « triple », le brouillon « quatre »).
    description:
      'Le carré, les coins juste adoucis. Un fil de métal en fait le tour, ' +
      'deux barres au-dessus du nez. Pas de symbole : le R sur le verre, ' +
      'le strass au bout. Le visage seul suffit.',
    forme: 'carré cerclé',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 48·18·140 (4 coloris relevés identiques).
    dimensions: { verre: 48, pont: 18, branche: 140 },
    morphologie: 'Pour les visages fins.',
    // Visage seul : ni collection, ni symbole (Bible 8.1). Sur Shopify, seul le
    // C4 était en vente (539 €) ; C3 créé ce jour (Eye For Eye a les 4 coloris,
    // C1/C2 en PGX photochromique laissés en attente). Verre 48 = visages fins.
    copyStatut: 'valide',
  },

  'Renaissance XIX': {
    romain: 'Renaissance XIX',
    arabe: 19,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Le rond, et les stries qui ferment le pont.',
    // Faits : photos dossier 19 (FACE/TROIS-QUARTS/DETAIL C1 à C4). Cercle rond,
    // cerclé, métal fin plaqué or ; deux barres striées au pont, le même trait à
    // la tempe ; gravure « RENAISSANCE CE 18KT », « MADE IN KOREA », R sur le
    // verre, strass au bout. Aucun symbole -> visage seul. Mot « pantos » écarté
    // (loi de langue : non adoubé, on dit « le rond »).
    description:
      'Le cercle, en métal fin. Deux barres striées ferment le pont, ' +
      'le même trait revient à la tempe. Pas de symbole : le R sur le verre, ' +
      'le strass au bout. Le visage seul suffit.',
    forme: 'rond cerclé',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 49·18·140 (4 coloris relevés identiques).
    dimensions: { verre: 49, pont: 18, branche: 140 },
    morphologie: 'Pour les visages fins à moyens.',
    // Visage seul (Bible 8.1). PGX au relevé sur C1/C2 (à clarifier, sans effet
    // sur la fiche). Dispo Shopify à revérifier.
    copyStatut: 'valide',
  },

  'Renaissance XX': {
    romain: 'Renaissance XX',
    arabe: 20,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Huit côtés taillés net dans l\'acétate.',
    // Faits : photos dossier 20 (FACE/TROIS-QUARTS/DETAIL, 3 coloris). Octogone
    // taillé épais dans l'acétate, huit côtés ; un trait d'or entre dans la
    // branche (Bible 7.2 : l'acétate porte l'or quelque part). Le chevron d'or
    // de la branche est un motif, pas un symbole (Bible 8.1) -> visage seul.
    description:
      "L'octogone, taillé épais dans l'acétate. Huit côtés serrent le verre, " +
      "aucun ne plie. Sur la branche, un trait d'or entre dans la matière. " +
      'Pas de symbole : le visage seul.',
    forme: 'octogonal',
    matiere: 'acetate',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (table normalisée, ordre brut variable) :
    // 49·23·145.
    dimensions: { verre: 49, pont: 23, branche: 145 },
    morphologie: 'Pour les visages fins à moyens.',
    // Visage seul (Bible 8.1). 3 coloris ACTIFS sur Shopify (C1/C2/C3, 489 €,
    // sous le plancher doctrine 529 € -> à trancher comme II/III/VI). Gravure
    // « 18KT » non lisible sur photos (acétate + trait d'or confirmés).
    copyStatut: 'valide',
  },

  'Renaissance XXI': {
    romain: 'Renaissance XXI',
    arabe: 21,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Un rectangle d\'acétate, la branche en marches.',
    // Faits : photos dossier 21 (FACE/TROIS-QUARTS/DETAIL, 5 coloris + 1 portée).
    // Rectangle d'acétate épais, coins du bas taillés net ; la branche descend
    // par marches, un V de métal s'y loge ; étiquette laser « XXI 53 » sur le
    // verre. Aucun symbole (le V et la barre = dessin de forme) -> visage seul.
    description:
      "L'angle, tenu. Un rectangle d'acétate épais, les coins du bas taillés " +
      "net. Sur le côté, la branche descend par marches, un V de métal s'y " +
      'loge. Pas de symbole : le visage seul.',
    forme: 'rectangulaire',
    matiere: 'acetate',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 53·20·145.
    dimensions: { verre: 53, pont: 20, branche: 145 },
    morphologie: 'Pour les visages moyens.',
    // Visage seul (Bible 8.1). C3 et C5 activés sur Shopify le 2026-06-21 (stock
    // 0, à la demande de Yassin) -> la fiche s'affiche, coloris en rupture.
    // 489 € sous le plancher doctrine 529 € (à trancher). Finitions variables.
    copyStatut: 'valide',
  },

  'Renaissance XXX': {
    romain: 'Renaissance XXX',
    arabe: 30,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Une adresse de Paris, vissée sur la tempe.',
    // Faits : photos dossier 30 (plaque « AVENUE DE LA RENAISSANCE » gravée dans
    // l'or, cartouche « XXX », prise dans la branche — vue 30 C1 PROFIL.jpg,
    // 30 C4 TROIS-QUARTS.png). Rectangle d'acétate épais, coins coupés net.
    // Symbole plaque parisienne (Bible 8.8) -> bloc SYMBOLES partagé, pas de
    // collection (le symbole qui voyage). Lexique de l'ancienne pub (autorité,
    // pouvoir) écarté.
    description:
      "L'adresse qu'on emporte. Avenue de la Renaissance, gravée dans l'or, " +
      "prise dans la branche. Autour, un rectangle d'acétate épais, coins " +
      "coupés net. Le verre se loge dans la matière et s'y tient.",
    forme: 'rectangulaire',
    matiere: 'acetate',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 55·19·145 (sans drapeau PGX).
    dimensions: { verre: 55, pont: 19, branche: 145 },
    morphologie: 'Pour les visages moyens.',
    // Symbole plaque parisienne (Bible 8.8) ; pas de collection. Sur Shopify :
    // C1/C2 actifs (529 €, pile au plancher doctrine). C4 à part ou variante du
    // C1 : à trancher.
    symbole: 'plaque-parisienne',
    copyStatut: 'valide',
  },

  'Renaissance XXII': {
    romain: 'Renaissance XXII',
    arabe: 22,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Le haut tenu droit, le verre nu en bas.',
    // Faits : photos dossier 22 (FACE/TROIS-QUARTS/DETAIL, 3 coloris). Grande
    // face rectangulaire en acétate, sommet droit fermé par une barre de métal ;
    // le bas du verre est dégagé, tenu par un fil de métal. Aucun symbole (le
    // chevron de branche = construction, Bible 8.1) -> visage seul.
    description:
      'Le front droit. Une barre de métal ferme le haut ; en bas, la matière ' +
      "s'arrête et un fil tient le verre nu. Pas de symbole : le visage seul.",
    forme: 'rectangulaire',
    matiere: 'acetate',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 58·15·143 (aucun PGX).
    dimensions: { verre: 58, pont: 15, branche: 143 },
    morphologie: 'Pour les visages moyens à larges.',
    // Visage seul (Bible 8.1). 3 coloris actifs Shopify à 489 € (sous le
    // plancher doctrine 529 € -> à trancher comme II/III/VI/XX).
    copyStatut: 'valide',
  },

  'Renaissance XXVII': {
    romain: 'Renaissance XXVII',
    arabe: 27,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Le navigateur carré, tenu par trois pointes.',
    // Faits : photos dossier 27 (3 coloris, FACE/TROIS-QUARTS/PROFIL). À chaque
    // tempe, trois pointes sortent du métal et tiennent le verre (pas de fil de
    // cerclage côté tempe) = le Trident (Bible 8.2). Titane plaqué or 18KT
    // (« RENAISSANCE CE 18KT TITANIUM » gravé). Navigateur carré, double pont.
    description:
      'Le signe d\'abord. À chaque tempe, trois pointes sortent du métal et ' +
      'tiennent le verre : le Trident porte la monture, il ne la décore pas. ' +
      'Puis la ligne, un navigateur carré, double pont droit, le bas du verre ' +
      'coupé net.',
    forme: 'navigateur double pont',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 59·17·145 (3 coloris identiques).
    dimensions: { verre: 59, pont: 17, branche: 145 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'heritage',
    symbole: 'trident',
    copyStatut: 'valide',
  },

  'Renaissance XXIX': {
    romain: 'Renaissance XXIX',
    arabe: 29,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'La goutte du pilote, tenue par trois pointes.',
    // Faits : photos dossier 29 (3 coloris). Trois pointes par tempe tiennent le
    // verre = le Trident (Bible 8.2). Titane plaqué or 18KT (« 18KT TITANIUM »
    // gravé). Forme goutte de pilote, haut coupé franc, deux barres au pont.
    description:
      'Le trident d\'abord. Trois pointes à chaque tempe sortent du métal et ' +
      'tiennent le verre. Dessous, la goutte du pilote, le haut coupé franc, ' +
      'deux barres droites au pont. Trois pointes, une seule main.',
    forme: 'aviateur double pont',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 58·15·145 (relevé C1/C3 ; C2 supposé idem).
    dimensions: { verre: 58, pont: 15, branche: 145 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'heritage',
    symbole: 'trident',
    copyStatut: 'valide',
  },

  'Renaissance XXXII': {
    romain: 'Renaissance XXXII',
    arabe: 32,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Trois dents mordent le verre, il ne bouge plus.',
    // Faits : photos dossier 32 (FACE C2/C3/C6/C7). Trois pointes par tempe
    // entrent dans le bord du verre et le tiennent = le Trident (Bible 8.2),
    // même famille que la XXXIV. Rimless, pourtour taillé en facettes (diamond
    // cut). Chevrons au pont et épi de branche = construction, pas symbole.
    description:
      'La prise par la tempe. Le Trident plante trois pointes dans le bord du ' +
      'verre et le tient. Rimless. Le pourtour est taillé en facettes, chaque ' +
      'angle prend le jour.',
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 58·17·140 (2 coloris relevés ; aucun PGX).
    dimensions: { verre: 58, pont: 17, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'heritage',
    symbole: 'trident',
    copyStatut: 'valide',
  },

  'Renaissance XXXVI': {
    romain: 'Renaissance XXXVI',
    arabe: 36,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Le grand carré rimless, tenu par le trident.',
    // Faits : photos dossier 36 (C1/C2/C3, FACE/PROFIL/TROIS-QUARTS). Grand
    // verre carré rimless ; à chaque tempe, trois pointes sortent du métal et
    // pincent le verre = le Trident (Bible 8.2). Chevrons pont/branche =
    // construction. Trident vu à la tempe (et non « sur la branche » de l'ancienne pub).
    description:
      'La place prise. Un grand verre carré, sans rien autour. Rimless. ' +
      'Le trident sort du métal et pince le verre à la tempe, trois pointes ' +
      'de chaque côté.',
    forme: 'carré rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 56·17·140 (C1/C3 relevés ; C2 supposé idem).
    dimensions: { verre: 56, pont: 17, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'heritage',
    symbole: 'trident',
    copyStatut: 'valide',
  },

  'Renaissance XXXVII': {
    romain: 'Renaissance XXXVII',
    arabe: 37,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'La fleur de lys aux deux tempes, un verre entre elles.',
    // Faits : photos dossier 37 (3 coloris). À chaque tempe, une pièce sculptée
    // symétrique (volutes + pointe) tient le verre et le relie à la branche =
    // fleur de lys stylisée (chapitre Versailles, Bible 8.3). Aux tempes, pas au
    // centre (le centre porte le pont strié). Forme large rimless, haut droit.
    description:
      'La maîtrise sans titre. La fleur de lys tient le verre à chaque ' +
      'tempe. Rimless, le haut tiré droit, le regard passe entier.',
    forme: 'rectangulaire rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 63·13·135 (3 coloris identiques).
    dimensions: { verre: 63, pont: 13, branche: 135 },
    // Verre 63 au-delà du dernier repère (59 = moyens à larges) -> larges.
    morphologie: 'Pour les visages larges.',
    collection: 'versailles',
    symbole: 'fleur-de-lys',
    copyStatut: 'valide',
  },

  'Renaissance XXXVIII': {
    romain: 'Renaissance XXXVIII',
    arabe: 38,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: "Deux ponts l'un sur l'autre, le métal à nu.",
    // Faits : photos dossier 38 (4 coloris, FACE/TROIS-QUARTS). Double pont
    // strié, coins taillés net, fil de métal autour du verre ; stries du pont
    // bas jusqu'à la branche. Aucun symbole -> visage seul. ATTENTION : les
    // pièces colorées sont des CLIPS solaires amovibles, pas les verres (verres
    // clairs) ; non décrits tant que la question "vendu avec clips ?" n'est pas tranchée.
    description:
      'Le métal à nu. Deux ponts superposés, les coins taillés net, les ' +
      "stries courent jusqu'à la branche. Pas de symbole : le R sur le verre suffit.",
    forme: 'rectangulaire double pont',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 54·20·140 (C2/C3/C4 relevés ; C1 supposé idem).
    dimensions: { verre: 54, pont: 20, branche: 140 },
    morphologie: 'Pour les visages moyens.',
    copyStatut: 'valide',
  },

  'Renaissance XXXIX': {
    romain: 'Renaissance XXXIX',
    arabe: 39,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'La fleur de lys tient le verre, une autre veille au pont.',
    // Faits : photos dossier 39 (5 coloris, FACE/TROIS-QUARTS). La fleur de lys
    // est sculptée aux deux coins et agrippe le verre nu (mounts rimless) ; une
    // autre fleur dressée au pont (finition variable selon coloris). Chapitre
    // Versailles (Bible 8.3). Forme rimless.
    description:
      'La maîtrise du geste. La fleur de lys agrippe le verre nu, trois ' +
      'volutes à chaque coin. Rimless. Au pont, une autre veille.',
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 57·16·140 (5 coloris identiques).
    dimensions: { verre: 57, pont: 16, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'versailles',
    symbole: 'fleur-de-lys',
    copyStatut: 'valide',
  },

  // Shopify renommé le 2026-06-21 : « XXXX » -> « XL » (romain additif corrigé,
  // les 3 coloris). Clé et titre désormais en romain standard.
  'Renaissance XL': {
    romain: 'Renaissance XL',
    arabe: 40,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Six angles fins, et pas un qui force la voix.',
    // Faits : photos dossier 40 - XL (C1/C2/C3, FACE/TROIS-QUARTS). SIX côtés
    // par verre comptés sur les 3 faces (hexagone, et non octogone comme
    // l'ancienne pub). Fil de titane, anneau ouvert qui accroche la branche
    // près de la tempe. Aucun symbole -> visage seul.
    description:
      'Six côtés tirés au fil de titane, le cercle fermé net. Près de la ' +
      "tempe, un anneau ouvert accroche la branche. Pas de symbole : le R sur " +
      'le verre suffit.',
    forme: 'hexagonal',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (ligne « XXXX ») : 56·18·140.
    dimensions: { verre: 56, pont: 18, branche: 140 },
    morphologie: 'Pour les visages moyens.',
    copyStatut: 'valide',
  },

  // Shopify renommé le 2026-06-21 : « XXXXIII » -> « XLIII ».
  'Renaissance XLIII': {
    romain: 'Renaissance XLIII',
    arabe: 43,
    // Copy intégrée 2026-06-20 (relecture Yassin sur le rendu localhost).
    legende: 'Un rectangle de métal fin, les stries noircies près de la charnière.',
    // Faits : photos dossier 43 - XLIII (4 coloris, FACE/TROIS-QUARTS). Cerclage
    // fin, rectangle aux coins du bas coupés net ; près de la charnière, des
    // lignes gravées aux creux noircis (construction, pas un symbole, Bible 8.1).
    // L'« œil » sur le verre = logo Eye For Eye. Visage seul.
    description:
      'Le visage suffit. Un fil de métal ferme le rectangle, les coins du bas ' +
      'coupés net. Près de la charnière, des lignes noircies courent dans le ' +
      'métal. Posé, droit, sans rien à déclarer.',
    forme: 'rectangulaire',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 54·18·140.
    dimensions: { verre: 54, pont: 18, branche: 140 },
    morphologie: 'Pour les visages moyens.',
    copyStatut: 'valide',
  },

  // Shopify renommé le 2026-06-21 : « XXXXII » -> « XLII ».
  'Renaissance XLII': {
    romain: 'Renaissance XLII',
    arabe: 42,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: 'Le bord du verre taillé à vif, tout le tour.',
    // Faits : photos dossier 42 (4 coloris, FACE/TROIS-QUARTS). Verre rimless,
    // bord taillé à vif sur tout le tour (dents serrées, irrégulier - PAS un
    // diamond cut net) ; pont strié. Aucun symbole -> visage seul.
    description:
      'Rien ne cercle le verre. Son bord est taillé à vif tout le tour, en ' +
      'dents serrées qui prennent la lumière. Rimless. Le pont est strié. ' +
      'Pas de symbole : le visage seul.',
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (ligne « XXXXII ») : 56·17·140 (1 coloris relevé).
    dimensions: { verre: 56, pont: 17, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    copyStatut: 'valide',
  },

  'Renaissance L': {
    romain: 'Renaissance L',
    arabe: 50,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: "L'acétate coupé net, l'adresse en or sur la branche.",
    // Faits : photos dossier 50 - L (3 coloris). Plaque d'or « AVENUE DE LA
    // RENAISSANCE » prise dans la branche (symbole plaque parisienne, Bible 8.8)
    // ; acétate épais, coins coupés net. Pas de collection (le symbole qui
    // voyage). « pans coupés »/« charnière double bras » convertis en clair.
    description:
      "L'adresse qu'on emporte. Un acétate épais, les coins coupés net. Sur " +
      "la branche, une plaque d'or : Avenue de la Renaissance, la rue qu'aucune " +
      'carte ne porte.',
    forme: 'rectangulaire',
    matiere: 'acetate',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 51·21·138 (3 coloris identiques).
    dimensions: { verre: 51, pont: 21, branche: 138 },
    morphologie: 'Pour les visages fins à moyens.',
    // Symbole plaque parisienne (Bible 8.8) ; pas de collection. Coloris à
    // branches d'une teinte différente de la face (C2 écaille, C3 noires).
    symbole: 'plaque-parisienne',
    copyStatut: 'valide',
  },

  'Renaissance XLIV': {
    romain: 'Renaissance XLIV',
    arabe: 44,
    // Copy intégrée 2026-06-21 (relecture Yassin). Shopify renommé XXXXIV->XLIV.
    legende: 'Le verre suspendu entre les pointes du trident.',
    // Faits : photos dossier 44 - XLIV (C1/C3/C5/C6). Trident : trois pointes
    // sculptées à chaque coin entrent dans le verre et le tiennent (rimless).
    // Gravure « RENAISSANCE Cé 18KT TITANIUM » lue (C1/C5). Pont gravé d'arêtes.
    description:
      'L\'ancrage. De chaque côté, le trident sort du métal et entre dans le ' +
      'verre, il le porte seul. Rimless. Un pont gravé d\'arêtes, le verre ' +
      'suspendu entre les pointes.',
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 (ligne « XXXXIV ») : 57·17·140 (3 relevés identiques).
    dimensions: { verre: 57, pont: 17, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'heritage',
    symbole: 'trident',
    copyStatut: 'valide',
  },

  'Renaissance LII': {
    romain: 'Renaissance LII',
    arabe: 52,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: 'Une barre droite au-dessus du regard, tout s\'aligne dessous.',
    // Faits : photos dossier 52 - LII (4 coloris). Ligne pilote tenue au carré,
    // barre plate au front + fil de métal au pont dessous. AUCUN symbole sculpté
    // -> visage seul. NB : Shopify classe LII en « Collection ISIS » à tort
    // (aucun ankh/scarabée/cobra/œil d'Horus ; l'« œil » du verre = logo Eye For
    // Eye) -> à reclasser côté Shopify (décision Yassin).
    description:
      'La ligne pilote, tenue au carré. Une barre plate court d\'un côté à ' +
      "l'autre, un fil de métal ferme le pont dessous. Pas de symbole : le R " +
      'sur le verre, le strass au bout. Le visage seul suffit.',
    forme: 'navigateur double pont',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 59·17·145 (4 coloris identiques).
    dimensions: { verre: 59, pont: 17, branche: 145 },
    morphologie: 'Pour les visages moyens à larges.',
    copyStatut: 'valide',
  },

  'Renaissance LI': {
    romain: 'Renaissance LI',
    arabe: 51,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: 'La fleur de lys aux tempes, le bord du verre taillé en facettes.',
    // Faits : photos dossier 51 - LI (3 coloris). À chaque tempe, une pièce
    // sculptée (volutes + élément central) tient le verre sans cadre = fleur de
    // lys (chapitre Versailles) ; la copy Shopify de la Maison dit déjà « La
    // Fleur de Lys ». Bord du verre taillé en facettes. NB design à vérifier
    // (Bible 8.1 « une forme à nous » : l'agent note une proximité avec un
    // joaillier connu).
    description:
      'La fleur de lys tient la tempe, des deux côtés. De là part le verre, ' +
      'sans cadre. Rimless. Le bord taillé en facettes, la lumière s\'y casse.',
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 56·17·140 (3 coloris identiques ; distinct
    // du XI taille 51 qui mesure 51).
    dimensions: { verre: 56, pont: 17, branche: 140 },
    morphologie: 'Pour les visages moyens.',
    collection: 'versailles',
    symbole: 'fleur-de-lys',
    copyStatut: 'valide',
  },

  'Renaissance LIII': {
    romain: 'Renaissance LIII',
    arabe: 53,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: 'Le nom gravé en haut du verre, il faut s\'approcher pour le lire.',
    // Faits : photos dossier 53 - LIII (5 coloris). Rectangle au fil fin ; pont
    // et double barre portent les mêmes lignes serrées (construction, pas un
    // symbole). AUCUN symbole -> visage seul. NB : Shopify classe LIII en
    // « Collection ISIS » + « Carré » à tort (forme rectangulaire, aucun signe
    // isiaque) -> à reclasser côté Shopify (décision Yassin).
    description:
      'Un rectangle au fil fin. Le pont et la double barre portent les mêmes ' +
      'lignes serrées dans le métal. Pas de symbole : le R sur le verre, le ' +
      'strass au bout. Le visage seul suffit.',
    forme: 'rectangulaire',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 58·17·140 (distinct du XI taille 53).
    dimensions: { verre: 58, pont: 17, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    copyStatut: 'valide',
  },

  'Renaissance LIV': {
    romain: 'Renaissance LIV',
    arabe: 54,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: 'Une plaque au-dessus de chaque verre, comme une enseigne.',
    // Faits : photos dossier 54 - LIV (4 coloris). Demi-cerclé (le cercle tient
    // le haut, un fil tend le bas — « nylor », dit en clair) ; plaque gravée
    // RENAISSANCE posée en sourcil ; octogone adouci, pont strié. Le « nylor »
    // est de la construction, pas un symbole (Bible 8.1) -> visage seul.
    description:
      'Le nom d\'abord. RENAISSANCE gravé dans une plaque, posée en sourcil ' +
      'sur chaque verre. Le cercle tient le haut, le bas reste nu. Un octogone ' +
      'adouci, un pont strié.',
    forme: 'octogonal',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 54·19·145.
    dimensions: { verre: 54, pont: 19, branche: 145 },
    morphologie: 'Pour les visages moyens.',
    copyStatut: 'valide',
  },

  'Renaissance LV': {
    romain: 'Renaissance LV',
    arabe: 55,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: "L'œil d'Horus, ajouré dans la branche.",
    // Faits : photos dossier 55 - LV (3 coloris). L'œil d'Horus est découpé
    // (ajouré) dans le métal des deux branches = symbole Isis (Bible 8.7),
    // distinct du R (verre gauche) et du logo Eye For Eye (verre droit). Rimless,
    // bord du verre taillé en facettes (diamond cut). « 18KT TITANIUM » gravé.
    description:
      "L'œil qui veille. Sur chaque branche, l'œil d'Horus est découpé dans " +
      'le métal. Rimless. Le bord du verre est taillé en facettes, la lumière ' +
      "s'y casse.",
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 58·18·145 (3 coloris identiques).
    dimensions: { verre: 58, pont: 18, branche: 145 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'isis',
    symbole: 'oeil-horus',
    copyStatut: 'valide',
  },

  'Renaissance LVI': {
    romain: 'Renaissance LVI',
    arabe: 56,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: "Huit côtés taillés net, le jour qui s'accroche au bas du verre.",
    // Faits : photos dossier 56 - LVI (3 coloris). Octogone étiré rimless ; bord
    // bas extérieur taillé en gradins/chevrons ; pointe en relief à chaque coin ;
    // double barre striée au pont. La « pyramide » (tag Shopify) et la frise de
    // hiéroglyphes ne sont PAS des symboles maîtres (Bible 8.1) -> visage seul.
    description:
      "L'octogone tenu sans cadre. Les verres tombent en huit côtés, le bord " +
      'bas taillé en gradins qui accrochent le jour. Rimless. Une pointe en ' +
      'relief ferme chaque coin.',
    forme: 'octogonal rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 60·18·145. Verre 60 > 59 -> larges.
    dimensions: { verre: 60, pont: 18, branche: 145 },
    morphologie: 'Pour les visages larges.',
    copyStatut: 'valide',
  },

  'Renaissance LVII': {
    romain: 'Renaissance LVII',
    arabe: 57,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: "L'adresse en clair, et la même en hiéroglyphes.",
    // Faits : photos dossier 57 - LVII (3 coloris). Petit rectangle cerclé,
    // angles coupés, titane plaqué or + branches acétate noir. Porte DEUX fois
    // l'adresse : « Avenue de la Renaissance » en lettres sur la branche, et la
    // même redite en hiéroglyphes à la charnière. C'est la plaque parisienne
    // redite (Bible 8.8, « déjà redite en hiéroglyphes ») -> symbole qui voyage,
    // pas Isis, pas de collection.
    description:
      'La même rue, deux fois. Avenue de la Renaissance sur la branche, en ' +
      'lettres ; à la charnière, la même adresse redite en hiéroglyphes. Un ' +
      'petit rectangle cerclé, les angles coupés.',
    forme: 'rectangulaire',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 54·20·145.
    dimensions: { verre: 54, pont: 20, branche: 145 },
    morphologie: 'Pour les visages moyens.',
    symbole: 'plaque-parisienne',
    copyStatut: 'valide',
  },

  'Renaissance LVIII': {
    romain: 'Renaissance LVIII',
    arabe: 58,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: 'Un scarabée posé à la charnière, et il ne repart pas.',
    // Faits : photos dossier 58 - LVIII (3 coloris). Acétate épais, coins du
    // haut coupés net ; à la charnière, un scarabée pressé dans le métal, vu de
    // dessus comme un sceau, sans pierre = symbole Isis (Bible 8.5).
    description:
      "Le sceau d'abord. L'acétate est taillé épais, les coins du haut coupés " +
      'net. À la charnière, un scarabée pressé dans le métal, vu de dessus, ' +
      'comme un cachet. Le reste se tait.',
    forme: 'rectangulaire',
    matiere: 'acetate',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 55·19·145.
    dimensions: { verre: 55, pont: 19, branche: 145 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'isis',
    symbole: 'scarabee',
    copyStatut: 'valide',
  },

  'Renaissance LX': {
    romain: 'Renaissance LX',
    arabe: 60,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: 'Un cobra à chaque tempe, il mord le verre et le garde.',
    // Faits : photos dossier 60 - LX (3 coloris). À chaque tempe une tête de
    // cobra dressée, de profil, mord le bord du verre ; corps en écailles sur la
    // branche ; pierre sertie sur le crâne = symbole Isis (Bible 8.6, dressé et
    // de profil, conforme). Quatre griffes + morsure tiennent le verre (comptées).
    description:
      'La garde silencieuse. À chaque tempe, une tête de cobra mord le bord ' +
      'du verre, son corps en écailles court le long de la branche. Une pierre ' +
      'brille sur sa tête. Il ne menace pas, il veille.',
    forme: 'rond cerclé',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 57·20·138 (3 coloris identiques).
    dimensions: { verre: 57, pont: 20, branche: 138 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'isis',
    symbole: 'cobra',
    copyStatut: 'valide',
  },

  'Renaissance LXI': {
    romain: 'Renaissance LXI',
    arabe: 61,
    // Copy intégrée 2026-06-21 (relecture Yassin sur le rendu localhost).
    legende: "Le verre facetté, les branches d'acétate qui portent l'or.",
    // Faits : photos dossier 61 - LXI (4 coloris). Rimless, verre facetté tout
    // le tour (diamond cut) ; combiné métal plaqué or 18KT + branches acétate
    // (gravure « RENAISSANCE CE 18KT »). La frise de hiéroglyphes sur la branche
    // est gravée en surface (décoration), PAS l'ankh sobre de Bible 8.4 et pas
    // une construction porteuse -> aucun symbole, visage seul. Tag Shopify
    // « Ankh » à revoir (décision Yassin).
    description:
      'La taille à vif. Le verre tient seul, facetté sur tout son tour, ' +
      'chaque angle rend la lumière. Rimless. Deux boucles de métal le serrent, ' +
      "des branches d'acétate portent l'or. Pas de symbole : le visage seul.",
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 56·18·145 (4 coloris identiques).
    dimensions: { verre: 56, pont: 18, branche: 145 },
    morphologie: 'Pour les visages moyens.',
    copyStatut: 'valide',
  },

  'Renaissance XXXV': {
    romain: 'Renaissance XXXV',
    arabe: 35,
    // Copy intégrée 2026-06-21 (photos du dossier 35 retrouvées, re-prep).
    legende: "Le trident mord le verre, dans une face d'acétate.",
    // Faits : photos dossier 35 - XXXV (3 coloris). Trois pointes de métal à
    // chaque coin mordent l'acétate et tiennent le verre = le Trident (Bible
    // 8.2), net sur le C3 cristal. Combiné : face acétate pleine, branches
    // titane gravées de chevrons (construction). Gravure « 18KT TITANIUM ».
    description:
      'Le trident sort du métal et prend le verre. Trois pointes à chaque ' +
      'coin, qui mordent et qui portent. Une face droite, pleine, taillée d\'un ' +
      'bloc. Les branches filent en titane, gravées jusqu\'au bout.',
    forme: 'rectangulaire',
    matiere: 'acetate',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 53·21·140 (3 coloris ; C2 = PGX).
    dimensions: { verre: 53, pont: 21, branche: 140 },
    morphologie: 'Pour les visages fins à moyens.',
    collection: 'heritage',
    symbole: 'trident',
    copyStatut: 'valide',
  },

  'Renaissance XXXIII': {
    romain: 'Renaissance XXXIII',
    arabe: 33,
    // Copy intégrée 2026-06-21 (mesures données par Yassin : XXXIII absente du
    // relevé eyeforeye).
    legende: 'Le bord taillé à vif, le trident pour le pincer.',
    // Faits : photos dossier 33 - XXXIII. Rimless, bord du verre taillé en
    // petites dents (facettes) ; à la tempe, trois pointes sortent du métal et
    // serrent le verre = le Trident (Bible 8.2). L'« œil » sur le verre = logo
    // Eye For Eye. Sur Shopify : C3 actif (659 €), C1/C2 archivés.
    description:
      'La prise sur le verre. Le bord taillé en petites dents, la lumière s\'y ' +
      'accroche. Rimless. À la tempe, trois pointes sortent du métal et serrent ' +
      'le verre.',
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures données par Yassin le 2026-06-21 : 56·17·140 (absente du relevé eyeforeye).
    dimensions: { verre: 56, pont: 17, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'heritage',
    symbole: 'trident',
    copyStatut: 'valide',
  },

  'Renaissance LIX': {
    romain: 'Renaissance LIX',
    arabe: 59,
    // Copy intégrée 2026-06-21. Symbole = COBRA, confirmé par Yassin (il connaît
    // le design) ; la lecture photo de l'agent voyait une tête de félin, classée
    // cobra sur sa décision. Chapitre Isis (Bible 8.6).
    legende: 'Le cobra à chaque tempe, et le verre sans cadre.',
    // Faits : photos dossier 59 - LIX (3 coloris). À chaque tempe, une tête de
    // cobra sculptée saisit le verre et le porte ; une pierre sertie ; rimless,
    // double pont strié. L'« œil » sur le verre = logo Eye For Eye.
    description:
      'La garde sans cadre. À chaque tempe, le cobra sculpté saisit le verre ' +
      'et le porte. Rimless. Double pont, une pierre prise dans le métal.',
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures eyeforeye 2026-06-11 : 55·18·140 (3 coloris ; PGX).
    dimensions: { verre: 55, pont: 18, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'isis',
    symbole: 'cobra',
    copyStatut: 'valide',
  },

  'Renaissance XLI': {
    romain: 'Renaissance XLI',
    arabe: 41,
    // Copy intégrée 2026-06-21 (mesures données par Yassin ; XLI absente du
    // relevé eyeforeye). Shopify renommé XXXXI->XLI.
    legende: 'La fleur de lys fait la charnière et tient le verre.',
    // Faits : photos dossier 41 - XLI (3 coloris). À chaque bout, une fleur de
    // lys sculptée articule la branche et porte le verre sans cadre = chapitre
    // Versailles (Bible 8.3). Rimless, bas du verre taillé en facettes.
    description:
      'La fleur de lys tient le verre. Une à chaque bout, sculptée dans le ' +
      'métal, elle articule la branche et le porte. Rimless. Le bas du verre ' +
      "taillé en facettes, la lumière s'y prend.",
    forme: 'rimless',
    matiere: 'titane',
    adaptable: true,
    // Mesures données par Yassin le 2026-06-21 : 56·17·140 (absente du relevé eyeforeye).
    dimensions: { verre: 56, pont: 17, branche: 140 },
    morphologie: 'Pour les visages moyens à larges.',
    collection: 'versailles',
    symbole: 'fleur-de-lys',
    copyStatut: 'valide',
  },
};

// ---------------------------------------------------------------------------
// TRANSLATIONS — le contenu transcréé, langue par langue.
//   À remplir UNIQUEMENT depuis du FR validé, via les skills
//   renaissance-copywriter-{en,de,es,it,ru}. Vide = le site affiche le FR.
// ---------------------------------------------------------------------------

export const TRANSLATIONS: Partial<Record<Exclude<Lang, 'fr'>, EditorialTranslations>> = {
  "en": {
    "models": {
      "Renaissance XXXIV": {
        "legende": "Three claws. Nothing else holds the lens.",
        "description": "A grip on the real. The Trident comes out of the metal and into the lens: it holds it, it carries it. Rimless. Nothing around, just three points and what they grasp.",
        "morphologie": "Fits medium faces."
      },
      "Renaissance II": {
        "legende": "A circle of thin metal. Nothing else to declare.",
        "description": "Roundness, kept strict. A thread of metal closes the circle, and black grooves run from the bridge to where the temples begin. A detail meant to be simple, from the first hours of the House. No symbol: the R on the lens, the crystal at the tip. The face alone is enough.",
        "morphologie": "Suits narrow to medium faces."
      },
      "Renaissance III": {
        "legende": "The aviator, redrawn angle by angle.",
        "description": "A silhouette everyone knows. The curves become angles, the lens falls clean. Double bridge. At the hinges, the metal is grooved. Nothing left to soften.",
        "morphologie": "Suits medium to wide faces."
      },
      "Renaissance x FRENCH CUT IV": {
        "legende": "A single lens. Two names engraved in it.",
        "description": "The first collaboration of the House. A single lens, both names engraved in the gradient, the temples two cables twisted down to bordeaux tips. At the bottom of the lens, a teardrop. The one tattooed under the eye, for a loss, or a trial you lived through. Here it rests on the lens instead of the skin. It does not tell of the fall. It says you stayed standing. It says what is reborn.",
        "morphologie": "Fits medium to wide faces."
      },
      "Renaissance VI": {
        "legende": "The bridge is grooved. That's the part you remember.",
        "description": "An aviator, corners cut clean. Double bridge: the lower one carries black grooves, the same ones found where the temples begin. RENAISSANCE and 18KT engraved on the temple. The R on the lens does the rest.",
        "morphologie": "Suits medium faces. Narrow faces wear it oversize."
      },
      "Renaissance VIII x OCHO": {
        "legende": "The 8 on one side. The R on the other.",
        "description": "The meeting with SDM. His 8, the sign of Ocho, seals one temple; the R of Renaissance answers on the other, drawn in Ocho's own hand. Mazzucchelli acetate, thick, cut straight, the corners broken clean. Three hundred pairs, each numbered on the temple, one hundred per coloris. The rest keeps quiet.",
        "morphologie": "Fits medium to wide faces."
      },
      "Renaissance IX": {
        "legende": "A cord of gold, strung from one lens to the other.",
        "description": "Wire turned into cord. The twist runs across the brow, lens to lens, above a bridge scored with black. RENAISSANCE engraved in the bar, beneath the cord. A thin black line follows the rim of each lens. The temples, two twisted cables, down to the burgundy tips.",
        "morphologie": "Suits wide faces."
      },
      "Renaissance X": {
        "legende": "The color, without the frame.",
        "description": "The bare lens. It holds on by the curved bridge, rose gold, and by two black-grooved blocks at the sides. The temples, two twisted silver cables, run to a burgundy tip. The lens does the rest.",
        "morphologie": "Suits medium to wide faces."
      },
      "Renaissance XI": {
        "legende": "Eight angles, not a single curve.",
        "description": "The octagon held clean. The metal traces eight sides, every angle cut sharp. At the hinges, grooves grip the rim, the same ones run along the temple. RENAISSANCE engraved along the top line.",
        "morphologie": "Suits narrow to medium faces."
      },
      "Renaissance XII": {
        "legende": "An address screwed onto the temple.",
        "description": "Mazzucchelli acetate taken from the block, cut straight. The top corners are angled off. On the temple, a gold plate carries an address: Avenue de la Renaissance. The number twelve is engraved on it. It is on no map.",
        "morphologie": "Suits medium to wide faces."
      },
      "Renaissance XIII": {
        "legende": "The aviator squared off, two bridges.",
        "description": "The top bar carries the name, engraved in the metal. Beneath it, a second bridge, thinner. At the sides, the metal is grooved. No symbol: the R on the lens, the crystal at the tip. The face alone is enough.",
        "morphologie": "Suits medium to wide faces."
      },
      "Renaissance XIV": {
        "legende": "The aviator with clean angles.",
        "description": "The bottom of the lens cut clean. Two thin bridges, the temples turned into cord. The R on the lens does the rest.",
        "morphologie": "Suits wide faces."
      },
      "Renaissance XVI": {
        "legende": "An oval rimless, cut in diamond cut.",
        "description": "The lens has no frame. Its edge is cut in diamond cut, all the way around. The bridge is grooved. The temples: twisted double bar. The R on the lens does the rest.",
        "morphologie": "Suits medium to wide faces."
      },
      "Renaissance XVII": {
        "legende": "Cut all around, like a stone.",
        "description": "The cut in place of the frame. Pointed facets run all the way around the lens, from the bridge to the bottom. Rimless. The light plays on every ridge.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XVIII": {
        "legende": "A square that holds itself straight.",
        "description": "The square, the corners just softened. A thread of metal runs around it, two bars above the nose. No symbol: the R on the lens, the crystal at the tip. The face alone is enough.",
        "morphologie": "For narrow faces."
      },
      "Renaissance XIX": {
        "legende": "The round, and the grooves that close the bridge.",
        "description": "The circle, in thin metal. Two grooved bars close the bridge, the same line returns at the temple. No symbol: the R on the lens, the crystal at the tip. The face alone is enough.",
        "morphologie": "For narrow to medium faces."
      },
      "Renaissance XX": {
        "legende": "Eight sides cut clean in the acetate.",
        "description": "The octagon, cut thick in the acetate. Eight sides grip the lens, none of them bend. On the temple, a line of gold enters the material. No symbol: the face alone.",
        "morphologie": "For narrow to medium faces."
      },
      "Renaissance XXI": {
        "legende": "A rectangle of acetate, the temple in steps.",
        "description": "The angle, held. A rectangle of thick acetate, the bottom corners cut clean. On the side, the temple steps down, a metal V set into it. No symbol: the face alone.",
        "morphologie": "For medium faces."
      },
      "Renaissance XXII": {
        "legende": "The top held straight, the bare lens below.",
        "description": "The straight brow. A bar of metal closes the top; below, the material stops and a thread holds the bare lens. No symbol: the face alone.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XXVII": {
        "legende": "The square navigator, held by three points.",
        "description": "The sign first. At each temple, three points come out of the metal and hold the lens: the Trident carries the frame, it does not decorate it. Then the line, a square navigator, straight double bridge, the bottom of the lens cut clean.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XXIX": {
        "legende": "The pilot's teardrop, held by three points.",
        "description": "The Trident first. Three points at each temple come out of the metal and hold the lens. Below, the pilot's teardrop, the top cut clean, two straight bars at the bridge. Three points, a single hand.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XXX": {
        "legende": "An address in Paris, screwed onto the temple.",
        "description": "The address you carry with you. Avenue de la Renaissance, engraved in gold, set into the temple. Around it, a rectangle of thick acetate, corners cut clean. The lens settles into the material and holds there.",
        "morphologie": "For medium faces."
      },
      "Renaissance XXXII": {
        "legende": "Three teeth bite the lens, it no longer moves.",
        "description": "The grip at the temple. The Trident drives three points into the edge of the lens and holds it. Rimless. The rim is cut in facets, every angle takes the light.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XXXIII": {
        "legende": "The edge cut raw, the Trident to pinch it.",
        "description": "The grip on the lens. The edge cut in small teeth, the light catches on it. Rimless. At the temple, three points come out of the metal and grip the lens.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XXXV": {
        "legende": "The Trident bites the lens, in a face of acetate.",
        "description": "The Trident comes out of the metal and takes the lens. Three points at each corner, that bite and that carry. A straight face, full, cut from one block. The temples run on in titanium, engraved all the way to the tip.",
        "morphologie": "For narrow to medium faces."
      },
      "Renaissance XXXVI": {
        "legende": "The big square rimless, held by the Trident.",
        "description": "The place taken. A big square lens, nothing around it. Rimless. The Trident comes out of the metal and pinches the lens at the temple, three points on each side.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XXXVII": {
        "legende": "The Fleur de lys at both temples, a lens between them.",
        "description": "Mastery without a title. The Fleur de lys holds the lens at each temple. Rimless, the top drawn straight, the gaze passes through whole.",
        "morphologie": "For wide faces."
      },
      "Renaissance XXXVIII": {
        "legende": "Two bridges one above the other, the metal bare.",
        "description": "The bare metal. Two stacked bridges, the corners cut clean, the grooves run all the way to the temple. No symbol: the R on the lens is enough.",
        "morphologie": "For medium faces."
      },
      "Renaissance XXXIX": {
        "legende": "The Fleur de lys holds the lens, another watches at the bridge.",
        "description": "Mastery of the gesture. The Fleur de lys grips the bare lens, three scrolls at each corner. Rimless. At the bridge, another keeps watch.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XL": {
        "legende": "Six fine angles, and not one that raises its voice.",
        "description": "Six sides drawn in titanium wire, the circle closed clean. Near the temple, an open ring catches the temple arm. No symbol: the R on the lens is enough.",
        "morphologie": "For medium faces."
      },
      "Renaissance XLI": {
        "legende": "The Fleur de lys makes the hinge and holds the lens.",
        "description": "The Fleur de lys holds the lens. One at each end, sculpted in the metal, it works the temple and carries the lens. Rimless. The bottom of the lens cut in facets, the light catches in it.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XLII": {
        "legende": "The edge of the lens cut raw, all the way around.",
        "description": "Nothing frames the lens. Its edge is cut raw all the way around, in tight teeth that take the light. Rimless. The bridge is grooved. No symbol: the face alone.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance XLIII": {
        "legende": "A rectangle of thin metal, the grooves blackened near the hinge.",
        "description": "The face is enough. A thread of metal closes the rectangle, the bottom corners cut clean. Near the hinge, blackened lines run through the metal. Set down, straight, with nothing to declare.",
        "morphologie": "For medium faces."
      },
      "Renaissance XLIV": {
        "legende": "The lens suspended between the points of the Trident.",
        "description": "The anchor. On each side, the Trident comes out of the metal and into the lens, it carries it alone. Rimless. A bridge engraved with ridges, the lens suspended between the points.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance L": {
        "legende": "The acetate cut clean, the address in gold on the temple.",
        "description": "The address you carry with you. Thick acetate, the corners cut clean. On the temple, a gold plate: Avenue de la Renaissance, the street no map carries.",
        "morphologie": "For narrow to medium faces."
      },
      "Renaissance LI": {
        "legende": "The Fleur de lys at the temples, the edge of the lens cut in facets.",
        "description": "The Fleur de lys holds the temple, on both sides. From there the lens runs out, without a frame. Rimless. The edge cut in facets, the light breaks on it.",
        "morphologie": "For medium faces."
      },
      "Renaissance LII": {
        "legende": "A straight bar above the gaze, everything lines up beneath it.",
        "description": "The pilot line, held square. A flat bar runs from one side to the other, a thread of metal closes the bridge below. No symbol: the R on the lens, the crystal at the tip. The face alone is enough.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance LIII": {
        "legende": "The name engraved at the top of the lens, you have to come close to read it.",
        "description": "A rectangle on a thin thread. The bridge and the double bar carry the same tight lines in the metal. No symbol: the R on the lens, the crystal at the tip. The face alone is enough.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance LIV": {
        "legende": "A plate above each lens, like a sign.",
        "description": "The name first. RENAISSANCE engraved in a plate, set as a brow over each lens. The circle holds the top, the bottom stays bare. A softened octagon, a grooved bridge.",
        "morphologie": "For medium faces."
      },
      "Renaissance LV": {
        "legende": "The Eye of Horus, cut open in the temple.",
        "description": "The eye that keeps watch. On each temple, the Eye of Horus is cut out of the metal. Rimless. The edge of the lens is cut in facets, the light breaks on it.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance LVI": {
        "legende": "Eight sides cut clean, the light catching at the bottom of the lens.",
        "description": "The octagon held without a frame. The lenses fall in eight sides, the bottom edge cut in steps that catch the light. Rimless. A raised point closes each corner.",
        "morphologie": "For wide faces."
      },
      "Renaissance LVII": {
        "legende": "The address in plain words, and the same in hieroglyphs.",
        "description": "The same street, twice. Avenue de la Renaissance on the temple, in letters; at the hinge, the same address said again in hieroglyphs. A small rimmed rectangle, the angles cut.",
        "morphologie": "For medium faces."
      },
      "Renaissance LVIII": {
        "legende": "A scarab set at the hinge, and it does not leave.",
        "description": "The seal first. The acetate is cut thick, the top corners cut clean. At the hinge, a scarab pressed into the metal, seen from above, like a stamp. The rest keeps quiet.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance LIX": {
        "legende": "The cobra at each temple, and the lens without a frame.",
        "description": "The watch without a frame. At each temple, the sculpted cobra seizes the lens and carries it. Rimless. Double bridge, a stone set in the metal.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance LX": {
        "legende": "A cobra at each temple, it bites the lens and keeps it.",
        "description": "The silent guard. At each temple, a cobra's head bites the edge of the lens, its scaled body running along the temple. A stone shines on its head. It does not threaten, it keeps watch.",
        "morphologie": "For medium to wide faces."
      },
      "Renaissance LXI": {
        "legende": "The faceted lens, the acetate temples that carry the gold.",
        "description": "The raw cut. The lens holds on its own, faceted all the way around, every angle returns the light. Rimless. Two loops of metal grip it, acetate temples carry the gold. No symbol: the face alone.",
        "morphologie": "For medium faces."
      }
    },
    "collections": {
      "heritage": {
        "recit": "What comes before us builds us. Héritage gathers the frames that carry the Trident. Shapes that pass through trends without ever bowing to them."
      },
      "versailles": {
        "recit": "The flower of France, without the throne. On our frames it speaks no rank handed down: three petals, one fastening, the bond you choose. No one made us noble. We learned the gesture."
      },
      "isis": {
        "recit": "A civilisation fades, its signs still hold. Isis brings the four together: the ankh, the scarab, the cobra, the Eye of Horus. Cut into the metal, they say what binds, what is reborn, what watches, what sees. What crosses time."
      }
    },
    "symboles": {
      "trident": {
        "nom": "The Trident",
        "etendard": "Sovereignty",
        "definition": "The balance of yesterday, today, and tomorrow. An anchor in what founds, what builds, what lasts.",
        "deuxLectures": "Memory reads generations in it: three points, a single shaft. Choice reads the refusal of the replaceable."
      }
    },
    "proof": {
      "label": "The signature",
      "texte": "The R in the lens, for the person across from you. The crystal at the temple tip, behind the ear. Known to the wearer alone. And on the bridge, a number: it will exist only once."
    },
    "trust": [
      "14-day returns",
      "3-year manufacturer warranty",
      "Designed in Paris, made in Korea",
      "Secure payment",
      "250+ opticians"
    ]
  },
  "de": {
    "models": {
      "Renaissance XXXIV": {
        "legende": "Drei Krallen. Nur an ihnen hält das Glas.",
        "description": "Der Griff nach dem Wirklichen. Der Dreizack tritt aus dem Metall und dringt ins Glas: er hält es fest, er trägt es. Rimless. Nichts darum herum, nur die drei Spitzen und das, was sie packen.",
        "morphologie": "Für mittelgroße Gesichter."
      },
      "Renaissance II": {
        "legende": "Ein Kreis aus feinem Metall. Sonst nichts zu deklarieren.",
        "description": "Die strenge Rundung. Ein Faden aus Metall schließt den Kreis, und schwarze Rillen laufen vom Steg bis zum Ansatz der Bügel. Ein Detail, bewusst einfach gehalten, seit den ersten Stunden des Hauses. Kein Symbol: das R auf dem Glas, der Kristall an der Bügelspitze. Das Gesicht allein genügt.",
        "morphologie": "Geeignet für schmale bis mittlere Gesichter."
      },
      "Renaissance III": {
        "legende": "Der Aviator, Winkel für Winkel neu gefasst.",
        "description": "Eine Silhouette, die jeder kennt. Die Kurven werden zu Winkeln, das Glas fällt sauber ab. Doppelsteg. An den Scharnieren ist das Metall geriffelt. Es bleibt nichts mehr zu mildern.",
        "morphologie": "Geeignet für mittlere bis breite Gesichter."
      },
      "Renaissance x FRENCH CUT IV": {
        "legende": "Ein einziges Glas. Zwei Namen darin graviert.",
        "description": "Die erste Zusammenarbeit des Hauses. Ein einziges Glas, beide Namen in den Verlauf graviert, die Bügel zwei verdrillte Kabel bis in die bordeauxroten Spitzen. Unten am Glas eine Träne. Es ist die, die man sich unter das Auge tätowieren lässt, für einen Verlust oder eine durchstandene Prüfung. Hier liegt sie auf dem Glas statt auf der Haut. Sie erzählt nicht vom Fall. Sie sagt, dass man aufrecht geblieben ist. Sie sagt, was wiedergeboren wird.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance VI": {
        "legende": "Der Steg ist gerillt. Ihn vergisst man nicht.",
        "description": "Die Pilotenform, die Ecken scharf geschnitten. Doppelsteg: der untere trägt schwarze Rillen, dieselben wie am Bügelansatz. RENAISSANCE und 18KT, in den Bügel graviert. Das R auf dem Glas erledigt den Rest.",
        "morphologie": "Passt zu mittleren Gesichtern. Schmale Gesichter tragen sie oversize."
      },
      "Renaissance VIII x OCHO": {
        "legende": "Die 8 auf der einen Seite. Das R auf der anderen.",
        "description": "Die Begegnung mit SDM. Seine 8, das Zeichen von Ocho, besiegelt den einen Bügel; das R von Renaissance antwortet auf dem anderen, gezeichnet in der Schrift von Ocho. Das Mazzucchelli-Acetat, dick, gerade geschnitten, die Ecken sauber gebrochen. Dreihundert Exemplare, nummeriert am Bügel, hundert pro Coloris. Der Rest schweigt.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance IX": {
        "legende": "Eine Kordel aus Gold, gespannt von Glas zu Glas.",
        "description": "Der Draht zur Kordel gedreht. Die Windung läuft über die Stirn, von Glas zu Glas, über einem schwarz gerillten Steg. RENAISSANCE in die Leiste graviert, unter der Kordel. Eine schwarze Linie fasst die Gläser ein. Die Bügel: zwei gedrehte Kabel, bis zur bordeauxroten Bügelspitze.",
        "morphologie": "Für breite Gesichter."
      },
      "Renaissance X": {
        "legende": "Die Farbe, ohne den Rand.",
        "description": "Das nackte Glas. Gehalten vom gebogenen Steg in Roségold und von zwei schwarz gerillten Blöcken an den Seiten. Die Bügel: zwei gedrehte Silberkabel, bis zum Bügelende in Bordeaux. Das Glas macht den Rest.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XI": {
        "legende": "Acht Winkel, keine einzige Kurve.",
        "description": "Das Achteck, sauber gehalten. Das Metall zieht acht Seiten, jeder Winkel scharf geschnitten. An den Scharnieren fassen Rillen das Gestell, dieselben laufen über den Bügel. RENAISSANCE, in die obere Linie graviert.",
        "morphologie": "Geeignet für schmale bis mittlere Gesichter."
      },
      "Renaissance XII": {
        "legende": "Eine Adresse, auf den Bügel geschraubt.",
        "description": "Das Mazzucchelli-Acetat aus dem Block genommen, gerade geschnitten. Die oberen Ecken schräg getrennt. Auf dem Bügel trägt eine Goldplakette eine Adresse: Avenue de la Renaissance. Die Zwölf ist darauf graviert. Sie steht auf keiner Karte.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XIII": {
        "legende": "Das Quadrat des Aviators, zwei Stege.",
        "description": "Die obere Leiste trägt den Namen, ins Metall graviert. Darunter ein zweiter Steg, feiner. An den Seiten ist das Metall gerillt. Kein Symbol: das R auf dem Glas, der Kristall an der Bügelspitze. Das Gesicht allein genügt.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XIV": {
        "legende": "Der Aviator mit scharfen Winkeln.",
        "description": "Der untere Glasrand sauber geschnitten. Zwei feine Stege, die Bügel zur Kordel gedreht. Das R auf dem Glas erledigt den Rest.",
        "morphologie": "Für breite Gesichter."
      },
      "Renaissance XVI": {
        "legende": "Ein randloses Oval, in Diamond Cut geschliffen.",
        "description": "Das Glas hat keinen Rand. Sein Saum ist in Diamond Cut geschliffen, rundherum. Der Steg ist gerillt. Die Bügel: zwei gedrehte Stränge. Das R auf dem Glas erledigt den Rest.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XVII": {
        "legende": "Geschliffen rundherum, wie ein Stein.",
        "description": "Der Schliff an der Stelle des Rands. Spitze Facetten laufen rund um das Glas, vom Steg bis nach unten. Rimless. Das Licht spielt auf jeder Kante.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XVIII": {
        "legende": "Ein Quadrat, das aufrecht steht.",
        "description": "Das Quadrat, die Ecken nur leicht gemildert. Ein Faden aus Metall fasst es ein, zwei Leisten über der Nase. Kein Symbol: das R auf dem Glas, der Kristall an der Bügelspitze. Das Gesicht allein genügt.",
        "morphologie": "Für schmale Gesichter."
      },
      "Renaissance XIX": {
        "legende": "Das Runde, und die Rillen, die den Steg schließen.",
        "description": "Der Kreis, aus feinem Metall. Zwei gerillte Leisten schließen den Steg, derselbe Strich kehrt an der Schläfe wieder. Kein Symbol: das R auf dem Glas, der Kristall an der Bügelspitze. Das Gesicht allein genügt.",
        "morphologie": "Für schmale bis mittlere Gesichter."
      },
      "Renaissance XX": {
        "legende": "Acht Seiten, sauber aus dem Acetat geschnitten.",
        "description": "Das Achteck, dick aus dem Acetat geschnitten. Acht Seiten fassen das Glas, keine gibt nach. Auf dem Bügel dringt ein Goldstrich in das Material. Kein Symbol: das Gesicht allein.",
        "morphologie": "Für schmale bis mittlere Gesichter."
      },
      "Renaissance XXI": {
        "legende": "Ein Rechteck aus Acetat, der Bügel in Stufen.",
        "description": "Der Winkel, gehalten. Ein Rechteck aus dickem Acetat, die unteren Ecken sauber geschnitten. An der Seite fällt der Bügel in Stufen ab, ein V aus Metall sitzt darin. Kein Symbol: das Gesicht allein.",
        "morphologie": "Für mittlere Gesichter."
      },
      "Renaissance XXII": {
        "legende": "Oben gerade gehalten, unten das nackte Glas.",
        "description": "Die gerade Stirn. Eine Leiste aus Metall schließt nach oben ab; unten endet das Material, und ein Faden hält das nackte Glas. Kein Symbol: das Gesicht allein.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XXVII": {
        "legende": "Der quadratische Navigator, gehalten von drei Spitzen.",
        "description": "Das Zeichen zuerst. An jeder Schläfe treten drei Spitzen aus dem Metall und halten das Glas: der Dreizack trägt die Fassung, er schmückt sie nicht. Dann die Linie, ein quadratischer Navigator, gerader Doppelsteg, der untere Glasrand sauber geschnitten.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XXIX": {
        "legende": "Der Tropfen des Piloten, gehalten von drei Spitzen.",
        "description": "Der Dreizack zuerst. Drei Spitzen an jeder Schläfe treten aus dem Metall und halten das Glas. Darunter der Tropfen des Piloten, oben scharf geschnitten, zwei gerade Leisten am Steg. Drei Spitzen, eine einzige Hand.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XXX": {
        "legende": "Eine Pariser Adresse, an die Schläfe geschraubt.",
        "description": "Die Adresse, die man mitnimmt. Avenue de la Renaissance, ins Gold graviert, in den Bügel gefasst. Darum ein Rechteck aus dickem Acetat, die Ecken sauber geschnitten. Das Glas bettet sich ins Material und hält darin.",
        "morphologie": "Für mittlere Gesichter."
      },
      "Renaissance XXXII": {
        "legende": "Drei Zähne beißen ins Glas, es bewegt sich nicht mehr.",
        "description": "Der Griff an der Schläfe. Der Dreizack schlägt drei Spitzen in den Glasrand und hält es fest. Rimless. Der Saum ist facettiert geschliffen, jeder Winkel fängt das Licht.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XXXIII": {
        "legende": "Der Rand scharf geschliffen, der Dreizack, um ihn zu fassen.",
        "description": "Der Griff nach dem Glas. Der Rand in kleinen Zähnen geschliffen, das Licht hängt sich daran. Rimless. An der Schläfe treten drei Spitzen aus dem Metall und fassen das Glas.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XXXV": {
        "legende": "Der Dreizack beißt ins Glas, in einer Front aus Acetat.",
        "description": "Der Dreizack tritt aus dem Metall und nimmt das Glas. Drei Spitzen an jeder Ecke, die beißen und die tragen. Eine gerade Front, voll, aus einem Block geschnitten. Die Bügel ziehen in Titan davon, graviert bis zur Spitze.",
        "morphologie": "Für schmale bis mittlere Gesichter."
      },
      "Renaissance XXXVI": {
        "legende": "Das große randlose Quadrat, gehalten vom Dreizack.",
        "description": "Der eingenommene Platz. Ein großes quadratisches Glas, nichts darum herum. Rimless. Der Dreizack tritt aus dem Metall und kneift das Glas an der Schläfe, drei Spitzen auf jeder Seite.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XXXVII": {
        "legende": "Die Lilie an beiden Schläfen, ein Glas dazwischen.",
        "description": "Die Meisterschaft ohne Titel. Die Lilie hält das Glas an jeder Schläfe. Rimless, oben gerade gezogen, der Blick geht ganz hindurch.",
        "morphologie": "Für breite Gesichter."
      },
      "Renaissance XXXVIII": {
        "legende": "Zwei Stege übereinander, das Metall blank.",
        "description": "Das blanke Metall. Zwei Stege übereinander, die Ecken sauber geschnitten, die Rillen laufen bis zum Bügel. Kein Symbol: das R auf dem Glas genügt.",
        "morphologie": "Für mittlere Gesichter."
      },
      "Renaissance XXXIX": {
        "legende": "Die Lilie hält das Glas, eine andere wacht am Steg.",
        "description": "Die Meisterschaft der Geste. Die Lilie greift das nackte Glas, drei Voluten an jeder Ecke. Rimless. Am Steg wacht eine andere.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XL": {
        "legende": "Sechs feine Winkel, und keiner, der die Stimme hebt.",
        "description": "Sechs Seiten, gezogen aus einem Faden aus Titan, der Kreis sauber geschlossen. Nahe der Schläfe fasst ein offener Ring den Bügel. Kein Symbol: das R auf dem Glas genügt.",
        "morphologie": "Für mittlere Gesichter."
      },
      "Renaissance XLI": {
        "legende": "Die Lilie bildet das Scharnier und hält das Glas.",
        "description": "Die Lilie hält das Glas. Eine an jedem Ende, ins Metall gearbeitet, sie führt den Bügel und trägt es. Rimless. Der untere Glasrand facettiert geschliffen, das Licht fängt sich daran.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XLII": {
        "legende": "Der Glasrand scharf geschliffen, rundherum.",
        "description": "Nichts fasst das Glas ein. Sein Rand ist scharf geschliffen, rundherum, in dichten Zähnen, die das Licht fangen. Rimless. Der Steg ist gerillt. Kein Symbol: das Gesicht allein.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance XLIII": {
        "legende": "Ein Rechteck aus feinem Metall, die Rillen am Scharnier geschwärzt.",
        "description": "Das Gesicht genügt. Ein Faden aus Metall schließt das Rechteck, die unteren Ecken sauber geschnitten. Nahe dem Scharnier laufen geschwärzte Linien durchs Metall. Gesetzt, gerade, ohne etwas zu deklarieren.",
        "morphologie": "Für mittlere Gesichter."
      },
      "Renaissance XLIV": {
        "legende": "Das Glas, aufgehängt zwischen den Spitzen des Dreizacks.",
        "description": "Die Verankerung. Auf jeder Seite tritt der Dreizack aus dem Metall und dringt ins Glas, er trägt es allein. Rimless. Ein Steg, in Kanten graviert, das Glas aufgehängt zwischen den Spitzen.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance L": {
        "legende": "Das Acetat sauber geschnitten, die Adresse in Gold auf dem Bügel.",
        "description": "Die Adresse, die man mitnimmt. Ein dickes Acetat, die Ecken sauber geschnitten. Auf dem Bügel eine Goldplakette: Avenue de la Renaissance, die Straße, die keine Karte trägt.",
        "morphologie": "Für schmale bis mittlere Gesichter."
      },
      "Renaissance LI": {
        "legende": "Die Lilie an den Schläfen, der Glasrand in Facetten geschliffen.",
        "description": "Die Lilie hält die Schläfe, auf beiden Seiten. Von dort geht das Glas aus, ohne Rand. Rimless. Der Rand in Facetten geschliffen, das Licht bricht sich daran.",
        "morphologie": "Für mittlere Gesichter."
      },
      "Renaissance LII": {
        "legende": "Eine gerade Leiste über dem Blick, alles richtet sich darunter aus.",
        "description": "Die Pilotenlinie, im Quadrat gehalten. Eine flache Leiste läuft von einer Seite zur anderen, ein Faden aus Metall schließt den Steg darunter. Kein Symbol: das R auf dem Glas, der Kristall an der Bügelspitze. Das Gesicht allein genügt.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance LIII": {
        "legende": "Der Name oben ins Glas graviert, man muss näher treten, um ihn zu lesen.",
        "description": "Ein Rechteck am feinen Faden. Der Steg und die Doppelleiste tragen dieselben dichten Linien im Metall. Kein Symbol: das R auf dem Glas, der Kristall an der Bügelspitze. Das Gesicht allein genügt.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance LIV": {
        "legende": "Eine Plakette über jedem Glas, wie ein Schild.",
        "description": "Der Name zuerst. RENAISSANCE in eine Plakette graviert, als Braue über jedes Glas gesetzt. Der Kreis hält oben, unten bleibt es nackt. Ein gemildertes Achteck, ein gerillter Steg.",
        "morphologie": "Für mittlere Gesichter."
      },
      "Renaissance LV": {
        "legende": "Das Auge des Horus, durchbrochen im Bügel.",
        "description": "Das Auge, das wacht. Auf jedem Bügel ist das Auge des Horus aus dem Metall geschnitten. Rimless. Der Glasrand ist in Facetten geschliffen, das Licht bricht sich daran.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance LVI": {
        "legende": "Acht Seiten sauber geschnitten, das Licht, das sich unten am Glas hält.",
        "description": "Das Achteck, gehalten ohne Rand. Die Gläser fallen in acht Seiten, der untere Rand in Stufen geschliffen, die das Licht fangen. Rimless. Eine erhabene Spitze schließt jede Ecke.",
        "morphologie": "Für breite Gesichter."
      },
      "Renaissance LVII": {
        "legende": "Die Adresse im Klartext, und dieselbe in Hieroglyphen.",
        "description": "Dieselbe Straße, zweimal. Avenue de la Renaissance auf dem Bügel, in Lettern; am Scharnier dieselbe Adresse, wiederholt in Hieroglyphen. Ein kleines gefasstes Rechteck, die Winkel geschnitten.",
        "morphologie": "Für mittlere Gesichter."
      },
      "Renaissance LVIII": {
        "legende": "Ein Skarabäus am Scharnier gesetzt, und er geht nicht wieder fort.",
        "description": "Das Siegel zuerst. Das Acetat ist dick geschnitten, die oberen Ecken sauber getrennt. Am Scharnier ein Skarabäus, ins Metall gepresst, von oben gesehen, wie ein Stempel. Der Rest schweigt.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance LIX": {
        "legende": "Die Kobra an jeder Schläfe, und das Glas ohne Rand.",
        "description": "Die Wache ohne Rand. An jeder Schläfe ergreift die gearbeitete Kobra das Glas und trägt es. Rimless. Doppelsteg, ein Stein im Metall gefasst.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance LX": {
        "legende": "Eine Kobra an jeder Schläfe, sie beißt ins Glas und hält es.",
        "description": "Die stille Wache. An jeder Schläfe beißt ein Kobrakopf in den Glasrand, ihr Körper aus Schuppen läuft den Bügel entlang. Ein Stein glänzt auf ihrem Kopf. Sie droht nicht, sie wacht.",
        "morphologie": "Für mittlere bis breite Gesichter."
      },
      "Renaissance LXI": {
        "legende": "Das Glas facettiert, die Bügel aus Acetat, die das Gold tragen.",
        "description": "Der Schliff, scharf. Das Glas hält allein, facettiert rundherum, jeder Winkel gibt das Licht zurück. Rimless. Zwei Metallschlaufen fassen es, Bügel aus Acetat tragen das Gold. Kein Symbol: das Gesicht allein.",
        "morphologie": "Für mittlere Gesichter."
      }
    },
    "collections": {
      "heritage": {
        "recit": "Was uns vorausgeht, baut uns. Héritage versammelt die Fassungen, die den Dreizack tragen. Formen, die durch die Moden gehen, ohne sich ihnen je zu beugen."
      },
      "versailles": {
        "recit": "Die Blume Frankreichs, ohne den Thron. Auf unseren Fassungen spricht sie nicht von einem ererbten Rang: drei Blütenblätter, ein einziger Halt, das Band, das man wählt. Niemand hat uns adelig gemacht. Wir haben die Geste gelernt."
      },
      "isis": {
        "recit": "Eine Zivilisation verlischt, ihre Zeichen halten noch. Isis vereint die vier: das Ankh, den Skarabäus, die Kobra, das Auge des Horus. Ins Metall gearbeitet, sagen sie, was verbindet, was wiederkehrt, was wacht, was sieht. Was die Zeit durchquert."
      }
    },
    "symboles": {
      "trident": {
        "nom": "Der Dreizack",
        "etendard": "Souveränität",
        "definition": "Das Gleichgewicht zwischen Gestern, Heute und Morgen. Die Verankerung in dem, was gründet, was baut, was bleibt.",
        "deuxLectures": "Das Gedächtnis liest darin die Generationen: drei Spitzen, ein einziger Schaft. Die Wahl liest darin die Absage an das Ersetzbare."
      }
    },
    "proof": {
      "label": "Die Signatur",
      "texte": "Das R im Glas, für das Gegenüber. Der Kristall an der Bügelspitze, hinter dem Ohr. Nur dem Träger bekannt. Und auf dem Steg eine Nummer: Es gibt sie kein zweites Mal."
    },
    "trust": [
      "Rückgabe innerhalb von 14 Tagen",
      "3 Jahre Herstellergarantie",
      "Entworfen in Paris, gefertigt in Korea",
      "Sichere Zahlung",
      "Über 250 Optiker"
    ]
  },
  "es": {
    "models": {
      "Renaissance XXXIV": {
        "legende": "Tres garras. La lente solo se sostiene en ellas.",
        "description": "El dominio sobre lo real. El Tridente sale del metal y entra en la lente: la aprieta, la lleva. Rimless. Nada alrededor, solo las tres puntas y lo que aferran.",
        "morphologie": "Para rostros medianos."
      },
      "Renaissance II": {
        "legende": "Un círculo de metal fino. Nada más que declarar.",
        "description": "La redondez estricta. Un hilo de metal cierra el círculo, y unas estrías negras corren del puente al arranque de las patillas. Un detalle que se quiso sencillo, desde las primeras horas de la Casa. Sin símbolo: la R en la lente, el cristal en la punta. El rostro solo basta.",
        "morphologie": "Conviene a los rostros de finos a medios."
      },
      "Renaissance III": {
        "legende": "El aviador, retomado ángulo a ángulo.",
        "description": "Una silueta que todo el mundo conoce. Las curvas se vuelven ángulos, la lente cae en seco. Doble puente. En las bisagras, el metal está estriado. No queda nada que suavizar.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance x FRENCH CUT IV": {
        "legende": "Una sola lente. Dos nombres grabados dentro.",
        "description": "La primera colaboración de la Casa. Una sola lente, los dos nombres grabados en el degradado, las patillas en dos cables trenzados hasta el burdeos. En la parte baja de la lente, una lágrima. La que se tatúa bajo el ojo, por una pérdida o una prueba superada. Aquí va sobre la lente, no sobre la piel. No cuenta la caída. Dice que uno siguió en pie. Dice lo que renace.",
        "morphologie": "Indicada para rostros de medianos a anchos."
      },
      "Renaissance VI": {
        "legende": "El puente está estriado. Es el que se recuerda.",
        "description": "El aviador, con los ángulos tallados en seco. Doble puente: el de abajo lleva estrías negras, las mismas que en el arranque de las patillas. RENAISSANCE y 18KT grabados en la patilla. La R en la lente hace el resto.",
        "morphologie": "Conviene a los rostros medianos. Los rostros finos la llevan oversize."
      },
      "Renaissance VIII x OCHO": {
        "legende": "El 8 a un lado. La R al otro.",
        "description": "El encuentro con SDM. Su 8, el signo de Ocho, sella una patilla; la R de Renaissance responde en la otra, dibujada con la letra de Ocho. El acetato Mazzucchelli, grueso, tallado recto, las esquinas rotas en seco. Trescientos ejemplares, numerados en la patilla, cien por coloris. El resto calla.",
        "morphologie": "Para rostros de medios a anchos."
      },
      "Renaissance IX": {
        "legende": "Una cuerda de oro, tendida de una lente a otra.",
        "description": "El hilo, vuelto cuerda. El trenzado recorre el frente, de una lente a otra, sobre un puente estriado de negro. RENAISSANCE grabado en la barra, bajo la cuerda. Un ribete negro sigue el contorno de las lentes. Las patillas, dos cables trenzados, hasta el terminal burdeos.",
        "morphologie": "Para rostros anchos."
      },
      "Renaissance X": {
        "legende": "El color, sin el marco.",
        "description": "La lente desnuda. Se sostiene por el puente curvado, de oro rosado, y por dos bloques con estrías negras a los lados. Las patillas, dos cables de plata trenzados, hasta el terminal burdeos. La lente hace el resto.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XI": {
        "legende": "Ocho ángulos, ninguna curva.",
        "description": "El octógono mantenido nítido. El metal traza ocho lados, cada ángulo cortado a filo. En las bisagras, unas estrías aprietan el aro, las mismas corren por la patilla. RENAISSANCE grabado en la línea de arriba.",
        "morphologie": "Conviene a los rostros de finos a medios."
      },
      "Renaissance XII": {
        "legende": "Una dirección atornillada en la patilla.",
        "description": "El acetato Mazzucchelli tomado de la masa, cortado recto. Las esquinas de arriba están talladas al bies. En la patilla, una placa de oro lleva una dirección: Avenue de la Renaissance. El número doce va grabado encima. No está en ningún mapa.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XIII": {
        "legende": "El cuadrado del aviador, dos puentes.",
        "description": "La barra de arriba lleva el nombre, grabado en el metal. Debajo, un segundo puente, más fino. A los lados, el metal está estriado. Sin símbolo: la R en la lente, el cristal en la punta. El rostro solo basta.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XIV": {
        "legende": "El aviador de ángulos en seco.",
        "description": "La parte baja de la lente cortada en seco. Dos puentes finos, las patillas vueltas cuerda. La R en la lente hace el resto.",
        "morphologie": "Para rostros anchos."
      },
      "Renaissance XVI": {
        "legende": "Un óvalo rimless, tallado en diamond cut.",
        "description": "La lente no tiene marco. Su borde está tallado en diamond cut, todo el contorno. El puente está estriado. Las patillas: doble barra trenzada. La R en la lente hace el resto.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XVII": {
        "legende": "Tallada todo alrededor, como una piedra.",
        "description": "La talla en lugar del marco. Unas facetas en punta corren por todo el contorno de la lente, del puente a la parte baja. Rimless. La luz juega en cada arista.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XVIII": {
        "legende": "Un cuadrado que se sostiene erguido.",
        "description": "El cuadrado, las esquinas apenas suavizadas. Un hilo de metal le da la vuelta, dos barras encima de la nariz. Sin símbolo: la R en la lente, el cristal en la punta. El rostro solo basta.",
        "morphologie": "Para rostros finos."
      },
      "Renaissance XIX": {
        "legende": "El redondo, y las estrías que cierran el puente.",
        "description": "El círculo, en metal fino. Dos barras estriadas cierran el puente, el mismo trazo vuelve en la sien. Sin símbolo: la R en la lente, el cristal en la punta. El rostro solo basta.",
        "morphologie": "Para rostros de finos a medios."
      },
      "Renaissance XX": {
        "legende": "Ocho lados tallados en seco en el acetato.",
        "description": "El octógono, tallado grueso en el acetato. Ocho lados aprietan la lente, ninguno cede. En la patilla, un trazo de oro entra en la materia. Sin símbolo: el rostro solo.",
        "morphologie": "Para rostros de finos a medios."
      },
      "Renaissance XXI": {
        "legende": "Un rectángulo de acetato, la patilla en escalones.",
        "description": "El ángulo, sostenido. Un rectángulo de acetato grueso, las esquinas de abajo talladas en seco. En el lado, la patilla baja por escalones, una V de metal se aloja en ella. Sin símbolo: el rostro solo.",
        "morphologie": "Para rostros medianos."
      },
      "Renaissance XXII": {
        "legende": "La parte alta mantenida recta, la lente desnuda abajo.",
        "description": "El frente recto. Una barra de metal cierra la parte de arriba; abajo, la materia se detiene y un hilo sostiene la lente desnuda. Sin símbolo: el rostro solo.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XXVII": {
        "legende": "El navegador cuadrado, sostenido por tres puntas.",
        "description": "El signo primero. En cada sien, tres puntas salen del metal y sostienen la lente: el Tridente lleva la montura, no la adorna. Luego la línea, un navegador cuadrado, doble puente recto, la parte baja de la lente cortada en seco.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XXIX": {
        "legende": "La gota del piloto, sostenida por tres puntas.",
        "description": "El tridente primero. Tres puntas en cada sien salen del metal y sostienen la lente. Debajo, la gota del piloto, la parte de arriba cortada en seco, dos barras rectas en el puente. Tres puntas, una sola mano.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XXX": {
        "legende": "Una dirección de París, atornillada en la sien.",
        "description": "La dirección que uno se lleva. Avenue de la Renaissance, grabada en el oro, tomada en la patilla. Alrededor, un rectángulo de acetato grueso, esquinas cortadas en seco. La lente se aloja en la materia y se sostiene en ella.",
        "morphologie": "Para rostros medianos."
      },
      "Renaissance XXXII": {
        "legende": "Tres dientes muerden la lente, ya no se mueve.",
        "description": "La presa por la sien. El Tridente clava tres puntas en el borde de la lente y la sostiene. Rimless. El contorno está tallado en facetas, cada ángulo toma la luz.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XXXIII": {
        "legende": "El borde tallado a filo, el tridente para pellizcarlo.",
        "description": "La presa sobre la lente. El borde tallado en dientes pequeños, la luz se prende en ellos. Rimless. En la sien, tres puntas salen del metal y aprietan la lente.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XXXV": {
        "legende": "El tridente muerde la lente, en una cara de acetato.",
        "description": "El tridente sale del metal y toma la lente. Tres puntas en cada esquina, que muerden y que sostienen. Una cara recta, plena, tallada de un bloque. Las patillas siguen en titanio, grabadas hasta el final.",
        "morphologie": "Para rostros de finos a medios."
      },
      "Renaissance XXXVI": {
        "legende": "El gran cuadrado rimless, sostenido por el tridente.",
        "description": "El lugar tomado. Una gran lente cuadrada, sin nada alrededor. Rimless. El tridente sale del metal y pellizca la lente en la sien, tres puntas a cada lado.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XXXVII": {
        "legende": "La fleur de lys en las dos sienes, una lente entre ellas.",
        "description": "La maestría sin título. La fleur de lys sostiene la lente en cada sien. Rimless, la parte de arriba tirada recta, la mirada pasa entera.",
        "morphologie": "Para rostros anchos."
      },
      "Renaissance XXXVIII": {
        "legende": "Dos puentes uno sobre otro, el metal al desnudo.",
        "description": "El metal al desnudo. Dos puentes superpuestos, las esquinas talladas en seco, las estrías corren hasta la patilla. Sin símbolo: la R en la lente basta.",
        "morphologie": "Para rostros medianos."
      },
      "Renaissance XXXIX": {
        "legende": "La fleur de lys sostiene la lente, otra vela en el puente.",
        "description": "La maestría del gesto. La fleur de lys aferra la lente desnuda, tres volutas en cada esquina. Rimless. En el puente, otra vela.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XL": {
        "legende": "Seis ángulos finos, y ni uno que fuerce la voz.",
        "description": "Seis lados tirados con hilo de titanio, el círculo cerrado en seco. Cerca de la sien, un anillo abierto engancha la patilla. Sin símbolo: la R en la lente basta.",
        "morphologie": "Para rostros medianos."
      },
      "Renaissance XLI": {
        "legende": "La fleur de lys hace la bisagra y sostiene la lente.",
        "description": "La fleur de lys sostiene la lente. Una en cada extremo, esculpida en el metal, articula la patilla y la lleva. Rimless. La parte baja de la lente tallada en facetas, la luz se prende en ella.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XLII": {
        "legende": "El borde de la lente tallado a filo, todo el contorno.",
        "description": "Nada cerca la lente. Su borde está tallado a filo todo el contorno, en dientes apretados que toman la luz. Rimless. El puente está estriado. Sin símbolo: el rostro solo.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance XLIII": {
        "legende": "Un rectángulo de metal fino, las estrías ennegrecidas cerca de la bisagra.",
        "description": "El rostro basta. Un hilo de metal cierra el rectángulo, las esquinas de abajo cortadas en seco. Cerca de la bisagra, unas líneas ennegrecidas corren por el metal. Puesto, recto, sin nada que declarar.",
        "morphologie": "Para rostros medianos."
      },
      "Renaissance XLIV": {
        "legende": "La lente suspendida entre las puntas del tridente.",
        "description": "El anclaje. A cada lado, el tridente sale del metal y entra en la lente, la lleva solo. Rimless. Un puente grabado en aristas, la lente suspendida entre las puntas.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance L": {
        "legende": "El acetato cortado en seco, la dirección en oro en la patilla.",
        "description": "La dirección que uno se lleva. Un acetato grueso, las esquinas cortadas en seco. En la patilla, una placa de oro: Avenue de la Renaissance, la calle que ningún mapa lleva.",
        "morphologie": "Para rostros de finos a medios."
      },
      "Renaissance LI": {
        "legende": "La fleur de lys en las sienes, el borde de la lente tallado en facetas.",
        "description": "La fleur de lys sostiene la sien, a los dos lados. De ahí parte la lente, sin marco. Rimless. El borde tallado en facetas, la luz se rompe en él.",
        "morphologie": "Para rostros medianos."
      },
      "Renaissance LII": {
        "legende": "Una barra recta sobre la mirada, todo se alinea debajo.",
        "description": "La línea piloto, mantenida en cuadrado. Una barra plana corre de un lado a otro, un hilo de metal cierra el puente debajo. Sin símbolo: la R en la lente, el cristal en la punta. El rostro solo basta.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance LIII": {
        "legende": "El nombre grabado en lo alto de la lente, hay que acercarse para leerlo.",
        "description": "Un rectángulo de hilo fino. El puente y la doble barra llevan las mismas líneas apretadas en el metal. Sin símbolo: la R en la lente, el cristal en la punta. El rostro solo basta.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance LIV": {
        "legende": "Una placa sobre cada lente, como un rótulo.",
        "description": "El nombre primero. RENAISSANCE grabado en una placa, puesta a modo de ceja sobre cada lente. El círculo sostiene la parte de arriba, la de abajo queda desnuda. Un octógono suavizado, un puente estriado.",
        "morphologie": "Para rostros medianos."
      },
      "Renaissance LV": {
        "legende": "El ojo de Horus, calado en la patilla.",
        "description": "El ojo que vela. En cada patilla, el ojo de Horus está calado en el metal. Rimless. El borde de la lente está tallado en facetas, la luz se rompe en él.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance LVI": {
        "legende": "Ocho lados tallados en seco, el día que se prende en la parte baja de la lente.",
        "description": "El octógono sostenido sin marco. Las lentes caen en ocho lados, el borde de abajo tallado en gradas que prenden el día. Rimless. Una punta en relieve cierra cada esquina.",
        "morphologie": "Para rostros anchos."
      },
      "Renaissance LVII": {
        "legende": "La dirección en claro, y la misma en jeroglíficos.",
        "description": "La misma calle, dos veces. Avenue de la Renaissance en la patilla, en letras; en la bisagra, la misma dirección repetida en jeroglíficos. Un pequeño rectángulo cerclado, los ángulos cortados.",
        "morphologie": "Para rostros medianos."
      },
      "Renaissance LVIII": {
        "legende": "Un escarabajo posado en la bisagra, y no se va.",
        "description": "El sello primero. El acetato está tallado grueso, las esquinas de arriba cortadas en seco. En la bisagra, un escarabajo prensado en el metal, visto desde arriba, como un cuño. El resto calla.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance LIX": {
        "legende": "El cobra en cada sien, y la lente sin marco.",
        "description": "La guardia sin marco. En cada sien, el cobra esculpido toma la lente y la lleva. Rimless. Doble puente, una piedra prendida en el metal.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance LX": {
        "legende": "Un cobra en cada sien, muerde la lente y la guarda.",
        "description": "La guardia silenciosa. En cada sien, una cabeza de cobra muerde el borde de la lente, su cuerpo en escamas corre a lo largo de la patilla. Una piedra brilla en su cabeza. No amenaza, vela.",
        "morphologie": "Para rostros de medianos a anchos."
      },
      "Renaissance LXI": {
        "legende": "La lente facetada, las patillas de acetato que llevan el oro.",
        "description": "La talla a filo. La lente se sostiene sola, facetada en todo su contorno, cada ángulo devuelve la luz. Rimless. Dos lazos de metal la aprietan, unas patillas de acetato llevan el oro. Sin símbolo: el rostro solo.",
        "morphologie": "Para rostros medianos."
      }
    },
    "collections": {
      "heritage": {
        "recit": "Lo que nos precede nos construye. Héritage reúne las monturas que llevan el Tridente. Formas que atraviesan las modas sin someterse nunca a ellas."
      },
      "versailles": {
        "recit": "La flor de Francia, sin el trono. En nuestras monturas no dice un rango recibido: tres pétalos, un solo amarre, el lazo que uno elige. Nadie nos hizo nobles. Aprendimos el gesto."
      },
      "isis": {
        "recit": "Una civilización se borra, sus signos aún resisten. Isis reúne los cuatro: el ankh, el escarabajo, el cobra, el ojo de Horus. Esculpidos en el metal, dicen lo que une, lo que renace, lo que vela, lo que ve. Lo que atraviesa el tiempo."
      }
    },
    "symboles": {
      "trident": {
        "nom": "El Tridente",
        "etendard": "Soberanía",
        "definition": "El equilibrio entre ayer, hoy y mañana. El anclaje en lo que funda, lo que construye, lo que perdura.",
        "deuxLectures": "La memoria lee en él las generaciones: tres puntas, una sola asta. La elección lee en él el rechazo de lo reemplazable."
      }
    },
    "proof": {
      "label": "La firma",
      "texte": "La R en la lente, para quien está enfrente. El cristal en la punta de la patilla, detrás de la oreja. Solo lo conoce quien la lleva. Y en el puente, un número: solo existirá una vez."
    },
    "trust": [
      "Devolución en 14 días",
      "Garantía del fabricante de 3 años",
      "Diseñada en París, fabricada en Corea",
      "Pago seguro",
      "Más de 250 ópticos"
    ]
  },
  "it": {
    "models": {
      "Renaissance XXXIV": {
        "legende": "Tre griffe. La lente si regge solo su di loro.",
        "description": "La presa sul reale. Il Tridente esce dal metallo ed entra nella lente: la stringe, la porta. Rimless. Niente intorno, solo le tre punte e ciò che afferrano.",
        "morphologie": "Adatta ai visi medi."
      },
      "Renaissance II": {
        "legende": "Un cerchio di metallo sottile. Nient'altro da dichiarare.",
        "description": "La rotondità rigorosa. Un filo di metallo chiude il cerchio, e strie nere corrono dal ponte all'attacco delle aste. Un dettaglio voluto semplice, fin dalle prime ore della Maison. Nessun simbolo: la R sulla lente, il cristallo in punta. Il volto, da solo, basta.",
        "morphologie": "Adatta ai visi da sottili a medi."
      },
      "Renaissance III": {
        "legende": "L'aviator, ripreso angolo per angolo.",
        "description": "Una silhouette che tutti conoscono. Le curve diventano angoli, la lente scende netta. Doppio ponte. Alle cerniere, il metallo è striato. Non resta niente da addolcire.",
        "morphologie": "Adatta ai visi da medi a larghi."
      },
      "Renaissance x FRENCH CUT IV": {
        "legende": "Una sola lente. Due nomi incisi dentro.",
        "description": "La prima collaborazione della Maison. Una sola lente, i due nomi incisi nella sfumatura, le aste in due cavi ritorti fino al bordeaux. In basso sulla lente, una lacrima. È quella che si tatua sotto l'occhio, per una perdita o una prova attraversata. Qui è posata sulla lente invece che sulla pelle. Non racconta la caduta. Dice che si è rimasti in piedi. Dice ciò che rinasce.",
        "morphologie": "Adatta ai visi da medi a larghi."
      },
      "Renaissance VI": {
        "legende": "Il ponte è striato. Nella memoria resta lui.",
        "description": "L'aviator, gli angoli tagliati netti. Doppio ponte: quello in basso porta strie nere, le stesse dell'attacco delle aste. RENAISSANCE e 18KT incisi sull'asta. La R sulla lente fa il resto.",
        "morphologie": "Adatta ai visi medi. I visi sottili la portano oversize."
      },
      "Renaissance VIII x OCHO": {
        "legende": "L'8 da un lato. La R dall'altro.",
        "description": "L'incontro con SDM. Il suo 8, il segno di Ocho, sigilla un'asta; la R di Renaissance risponde sull'altra, disegnata nella grafia di Ocho. L'acetato Mazzucchelli, spesso, tagliato dritto, gli angoli spezzati di netto. Trecento esemplari, numerati sull'asta, cento per coloris. Il resto tace.",
        "morphologie": "Adatta ai visi da medi a larghi."
      },
      "Renaissance IX": {
        "legende": "Una corda d'oro, tesa da una lente all'altra.",
        "description": "Il filo ritorto in corda. Il torciglione corre lungo il frontale, da una lente all'altra, sopra un ponte striato di nero. RENAISSANCE inciso nella barra, sotto la corda. Un filetto nero segue il contorno delle lenti. Le aste, due cavi ritorti, fino al terminale bordeaux.",
        "morphologie": "Adatta ai visi larghi."
      },
      "Renaissance X": {
        "legende": "Il colore, senza la cornice.",
        "description": "La lente nuda. Si regge sul ponte curvo, in oro rosa, e su due blocchi striati di nero ai lati. Le aste, due cavi d'argento ritorti, fino al terminale bordeaux. La lente fa il resto.",
        "morphologie": "Adatta ai visi da medi a larghi."
      },
      "Renaissance XI": {
        "legende": "Otto angoli, nessuna curva.",
        "description": "L'ottagono tenuto netto. Il metallo traccia otto lati, ogni angolo tagliato di netto. Alle cerniere, delle strie stringono la cerchiatura, le stesse corrono lungo l'asta. RENAISSANCE inciso sulla linea in alto.",
        "morphologie": "Adatta ai visi da sottili a medi."
      },
      "Renaissance XII": {
        "legende": "Un indirizzo avvitato sull'asta.",
        "description": "L'acetato Mazzucchelli preso nel pieno, tagliato dritto. Gli angoli in alto sono tagliati in obliquo. Sull'asta, una placca d'oro porta un indirizzo: Avenue de la Renaissance. Il numero dodici vi è inciso sopra. Non è su nessuna mappa.",
        "morphologie": "Adatta ai visi da medi a larghi."
      },
      "Renaissance XIII": {
        "legende": "Il quadrato dell'aviator, due ponti.",
        "description": "La barra in alto porta il nome, inciso nel metallo. Sotto, un secondo ponte, più sottile. Ai lati, il metallo è striato. Nessun simbolo: la R sulla lente, il cristallo in punta. Il volto, da solo, basta.",
        "morphologie": "Adatta ai visi da medi a larghi."
      },
      "Renaissance XIV": {
        "legende": "L'aviator dagli angoli netti.",
        "description": "Il fondo della lente tagliato netto. Due ponti sottili, le aste ritorte in corda. La R sulla lente fa il resto.",
        "morphologie": "Adatta ai visi larghi."
      },
      "Renaissance XVI": {
        "legende": "Un ovale rimless, tagliato in diamond cut.",
        "description": "La lente non ha cornice. Il suo bordo è tagliato in diamond cut, tutt'intorno. Il ponte è striato. Le aste: doppia barra ritorta. La R sulla lente fa il resto.",
        "morphologie": "Adatta ai visi da medi a larghi."
      },
      "Renaissance XVII": {
        "legende": "Tagliata tutt'intorno, come una pietra.",
        "description": "Il taglio al posto della cornice. Delle faccette a punta corrono tutt'intorno alla lente, dal ponte al fondo. Rimless. La luce gioca su ogni spigolo.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XVIII": {
        "legende": "Un quadrato che sta dritto.",
        "description": "Il quadrato, gli angoli appena addolciti. Un filo di metallo ne fa il giro, due barre sopra il naso. Nessun simbolo: la R sulla lente, il cristallo in punta. Il volto, da solo, basta.",
        "morphologie": "Per i visi sottili."
      },
      "Renaissance XIX": {
        "legende": "Il tondo, e le strie che chiudono il ponte.",
        "description": "Il cerchio, in metallo sottile. Due barre striate chiudono il ponte, lo stesso tratto torna alla tempia. Nessun simbolo: la R sulla lente, il cristallo in punta. Il volto, da solo, basta.",
        "morphologie": "Per i visi da sottili a medi."
      },
      "Renaissance XX": {
        "legende": "Otto lati tagliati netti nell'acetato.",
        "description": "L'ottagono, tagliato spesso nell'acetato. Otto lati stringono la lente, nessuno cede. Sull'asta, un tratto d'oro entra nella materia. Nessun simbolo: il volto, da solo.",
        "morphologie": "Per i visi da sottili a medi."
      },
      "Renaissance XXI": {
        "legende": "Un rettangolo d'acetato, l'asta a gradini.",
        "description": "L'angolo, tenuto. Un rettangolo d'acetato spesso, gli angoli in basso tagliati netti. Sul lato, l'asta scende a gradini, una V di metallo vi si annida. Nessun simbolo: il volto, da solo.",
        "morphologie": "Per i visi medi."
      },
      "Renaissance XXII": {
        "legende": "L'alto tenuto dritto, la lente nuda in basso.",
        "description": "La fronte dritta. Una barra di metallo chiude l'alto; in basso, la materia si ferma e un filo regge la lente nuda. Nessun simbolo: il volto, da solo.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XXVII": {
        "legende": "Il navigatore quadrato, tenuto da tre punte.",
        "description": "Il segno, prima. A ogni tempia, tre punte escono dal metallo e tengono la lente: il Tridente porta la montatura, non la decora. Poi la linea, un navigatore quadrato, doppio ponte dritto, il fondo della lente tagliato netto.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XXIX": {
        "legende": "La goccia del pilota, tenuta da tre punte.",
        "description": "Il tridente, prima. Tre punte a ogni tempia escono dal metallo e tengono la lente. Sotto, la goccia del pilota, l'alto tagliato netto, due barre dritte al ponte. Tre punte, una sola mano.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XXX": {
        "legende": "Un indirizzo di Parigi, avvitato sulla tempia.",
        "description": "L'indirizzo che si porta con sé. Avenue de la Renaissance, incisa nell'oro, presa nell'asta. Intorno, un rettangolo d'acetato spesso, angoli tagliati netti. La lente si annida nella materia e vi si tiene.",
        "morphologie": "Per i visi medi."
      },
      "Renaissance XXXII": {
        "legende": "Tre denti mordono la lente, non si muove più.",
        "description": "La presa dalla tempia. Il Tridente pianta tre punte nel bordo della lente e la tiene. Rimless. Il contorno è tagliato a faccette, ogni angolo prende la luce.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XXXIII": {
        "legende": "Il bordo tagliato a vivo, il tridente per stringerlo.",
        "description": "La presa sulla lente. Il bordo tagliato a piccoli denti, la luce vi si aggrappa. Rimless. Alla tempia, tre punte escono dal metallo e stringono la lente.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XXXV": {
        "legende": "Il tridente morde la lente, in un frontale d'acetato.",
        "description": "Il tridente esce dal metallo e prende la lente. Tre punte a ogni angolo, che mordono e che portano. Un frontale dritto, pieno, tagliato d'un blocco. Le aste filano in titanio, incise fino in punta.",
        "morphologie": "Per i visi da sottili a medi."
      },
      "Renaissance XXXVI": {
        "legende": "Il grande quadrato rimless, tenuto dal tridente.",
        "description": "Il posto preso. Una grande lente quadrata, senza niente intorno. Rimless. Il tridente esce dal metallo e stringe la lente alla tempia, tre punte da ogni lato.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XXXVII": {
        "legende": "Il giglio alle due tempie, una lente in mezzo.",
        "description": "La maestria senza titolo. Il giglio tiene la lente a ogni tempia. Rimless, l'alto tirato dritto, lo sguardo passa intero.",
        "morphologie": "Per i visi larghi."
      },
      "Renaissance XXXVIII": {
        "legende": "Due ponti l'uno sull'altro, il metallo nudo.",
        "description": "Il metallo nudo. Due ponti sovrapposti, gli angoli tagliati netti, le strie corrono fino all'asta. Nessun simbolo: la R sulla lente basta.",
        "morphologie": "Per i visi medi."
      },
      "Renaissance XXXIX": {
        "legende": "Il giglio tiene la lente, un altro veglia al ponte.",
        "description": "La maestria del gesto. Il giglio afferra la lente nuda, tre volute a ogni angolo. Rimless. Al ponte, un altro veglia.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XL": {
        "legende": "Sei angoli sottili, e nessuno che alzi la voce.",
        "description": "Sei lati tirati con il filo di titanio, il cerchio chiuso netto. Vicino alla tempia, un anello aperto aggancia l'asta. Nessun simbolo: la R sulla lente basta.",
        "morphologie": "Per i visi medi."
      },
      "Renaissance XLI": {
        "legende": "Il giglio fa la cerniera e tiene la lente.",
        "description": "Il giglio tiene la lente. Uno a ogni estremità, scolpito nel metallo, articola l'asta e la porta. Rimless. Il fondo della lente tagliato a faccette, la luce vi si prende.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XLII": {
        "legende": "Il bordo della lente tagliato a vivo, tutt'intorno.",
        "description": "Niente cerchia la lente. Il suo bordo è tagliato a vivo tutt'intorno, a denti fitti che prendono la luce. Rimless. Il ponte è striato. Nessun simbolo: il volto, da solo.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance XLIII": {
        "legende": "Un rettangolo di metallo sottile, le strie annerite vicino alla cerniera.",
        "description": "Il volto basta. Un filo di metallo chiude il rettangolo, gli angoli in basso tagliati netti. Vicino alla cerniera, delle linee annerite corrono nel metallo. Posato, dritto, senza niente da dichiarare.",
        "morphologie": "Per i visi medi."
      },
      "Renaissance XLIV": {
        "legende": "La lente sospesa tra le punte del tridente.",
        "description": "L'ancoraggio. Da ogni lato, il tridente esce dal metallo ed entra nella lente, la porta da solo. Rimless. Un ponte inciso di spigoli, la lente sospesa tra le punte.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance L": {
        "legende": "L'acetato tagliato netto, l'indirizzo in oro sull'asta.",
        "description": "L'indirizzo che si porta con sé. Un acetato spesso, gli angoli tagliati netti. Sull'asta, una placca d'oro: Avenue de la Renaissance, la via che nessuna mappa porta.",
        "morphologie": "Per i visi da sottili a medi."
      },
      "Renaissance LI": {
        "legende": "Il giglio alle tempie, il bordo della lente tagliato a faccette.",
        "description": "Il giglio tiene la tempia, da entrambi i lati. Da lì parte la lente, senza cornice. Rimless. Il bordo tagliato a faccette, la luce vi si spezza.",
        "morphologie": "Per i visi medi."
      },
      "Renaissance LII": {
        "legende": "Una barra dritta sopra lo sguardo, sotto si allinea tutto.",
        "description": "La linea pilota, tenuta al quadrato. Una barra piatta corre da un lato all'altro, un filo di metallo chiude il ponte sotto. Nessun simbolo: la R sulla lente, il cristallo in punta. Il volto, da solo, basta.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance LIII": {
        "legende": "Il nome inciso in alto sulla lente, bisogna avvicinarsi per leggerlo.",
        "description": "Un rettangolo dal filo sottile. Il ponte e la doppia barra portano le stesse linee fitte nel metallo. Nessun simbolo: la R sulla lente, il cristallo in punta. Il volto, da solo, basta.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance LIV": {
        "legende": "Una placca sopra ogni lente, come un'insegna.",
        "description": "Il nome, prima. RENAISSANCE inciso in una placca, posata a sopracciglio su ogni lente. Il cerchio tiene l'alto, il basso resta nudo. Un ottagono addolcito, un ponte striato.",
        "morphologie": "Per i visi medi."
      },
      "Renaissance LV": {
        "legende": "L'occhio di Horus, traforato nell'asta.",
        "description": "L'occhio che veglia. Su ogni asta, l'occhio di Horus è traforato nel metallo. Rimless. Il bordo della lente è tagliato a faccette, la luce vi si spezza.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance LVI": {
        "legende": "Otto lati tagliati netti, la luce che si aggrappa al fondo della lente.",
        "description": "L'ottagono tenuto senza cornice. Le lenti scendono in otto lati, il bordo in basso tagliato a gradini che catturano la luce. Rimless. Una punta in rilievo chiude ogni angolo.",
        "morphologie": "Per i visi larghi."
      },
      "Renaissance LVII": {
        "legende": "L'indirizzo in chiaro, e lo stesso in geroglifici.",
        "description": "La stessa via, due volte. Avenue de la Renaissance sull'asta, in lettere; alla cerniera, lo stesso indirizzo ridetto in geroglifici. Un piccolo rettangolo cerchiato, gli angoli tagliati.",
        "morphologie": "Per i visi medi."
      },
      "Renaissance LVIII": {
        "legende": "Uno scarabeo posato alla cerniera, e non riparte.",
        "description": "Il sigillo, prima. L'acetato è tagliato spesso, gli angoli in alto tagliati netti. Alla cerniera, uno scarabeo premuto nel metallo, visto dall'alto, come un timbro. Il resto tace.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance LIX": {
        "legende": "Il cobra a ogni tempia, e la lente senza cornice.",
        "description": "La guardia senza cornice. A ogni tempia, il cobra scolpito afferra la lente e la porta. Rimless. Doppio ponte, una pietra presa nel metallo.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance LX": {
        "legende": "Un cobra a ogni tempia, morde la lente e la custodisce.",
        "description": "La guardia silenziosa. A ogni tempia, una testa di cobra morde il bordo della lente, il suo corpo a squame corre lungo l'asta. Una pietra brilla sulla sua testa. Non minaccia, veglia.",
        "morphologie": "Per i visi da medi a larghi."
      },
      "Renaissance LXI": {
        "legende": "La lente sfaccettata, le aste d'acetato che portano l'oro.",
        "description": "Il taglio a vivo. La lente si tiene da sola, sfaccettata su tutto il suo contorno, ogni angolo restituisce la luce. Rimless. Due anelli di metallo la stringono, delle aste d'acetato portano l'oro. Nessun simbolo: il volto, da solo.",
        "morphologie": "Per i visi medi."
      }
    },
    "collections": {
      "heritage": {
        "recit": "Ciò che ci precede ci costruisce. Héritage riunisce le montature che portano il Tridente. Forme che attraversano le mode senza mai piegarsi."
      },
      "versailles": {
        "recit": "Il fiore di Francia, senza il trono. Sulle nostre montature non dice un rango ricevuto: tre petali, un solo aggancio, il legame che si sceglie. Nessuno ci ha fatti nobili. Abbiamo imparato il gesto."
      },
      "isis": {
        "recit": "Una civiltà si cancella, i suoi segni reggono ancora. Isis riunisce i quattro: l'ankh, lo scarabeo, il cobra, l'occhio di Horus. Scolpiti nel metallo, dicono ciò che lega, ciò che rinasce, ciò che veglia, ciò che vede. Ciò che attraversa il tempo."
      }
    },
    "symboles": {
      "trident": {
        "nom": "Il Tridente",
        "etendard": "Sovranità",
        "definition": "L'equilibrio tra ieri, oggi e domani. Il radicamento in ciò che fonda, ciò che costruisce, ciò che dura.",
        "deuxLectures": "La memoria vi legge le generazioni: tre punte, un solo manico. La scelta vi legge il rifiuto del sostituibile."
      }
    },
    "proof": {
      "label": "La firma",
      "texte": "La R sulla lente, per chi sta di fronte. Il cristallo in punta d'asta, dietro l'orecchio. Noto solo a chi porta. E sul ponte, un numero: esisterà una volta sola."
    },
    "trust": [
      "Reso entro 14 giorni",
      "Garanzia del produttore: 3 anni",
      "Disegnata a Parigi, fabbricata in Corea",
      "Pagamento sicuro",
      "Oltre 250 ottici"
    ]
  },
  "ru": {
    "models": {
      "Renaissance XXXIV": {
        "legende": "Три когтя. Линза держится только на них.",
        "description": "Хватка за реальность. Трезубец выходит из металла и входит в линзу: сжимает её, несёт её. Безободковая оправа. Вокруг ничего, только три зубца и то, во что они вцепились.",
        "morphologie": "Подходит для лиц среднего размера."
      },
      "Renaissance II": {
        "legende": "Тонкий круг металла. Больше заявлять нечего.",
        "description": "Строгая округлость. Нить металла замыкает круг, и чёрные бороздки бегут от переносицы к началу заушников. Деталь, задуманная простой, с первых часов Дома. Без символа: R на линзе, кристалл на конце. Одного лица достаточно.",
        "morphologie": "Подходит узким и средним лицам."
      },
      "Renaissance III": {
        "legende": "Авиатор, перечерченный угол за углом.",
        "description": "Силуэт, который знают все. Изгибы становятся углами, линза срезана чётко. Двойной мост. На шарнирах металл рифлёный. Смягчать больше нечего.",
        "morphologie": "Подходит для средних и широких лиц."
      },
      "Renaissance x FRENCH CUT IV": {
        "legende": "Одна линза. Внутри выгравированы два имени.",
        "description": "Первая совместная работа Дома. Одна линза, оба имени выгравированы прямо в градиенте, заушники сплетены в два витых троса и уходят в бордовый на наконечниках. У нижнего края линзы застыла слеза. Та самая, что татуируют под глазом: знак потери или пройденного испытания. Здесь она легла на линзу, а не на кожу. Она не рассказывает о падении. Она говорит, что ты устоял. Она говорит о том, что рождается заново.",
        "morphologie": "Подходит для лиц от среднего до широкого."
      },
      "Renaissance VI": {
        "legende": "Мост рифлёный. Его и запоминают.",
        "description": "Авиатор, углы срезаны чётко. Двойной мост: на нижнем чёрные бороздки, те же, что и у начала заушников. RENAISSANCE и 18KT выгравированы на заушнике. R на линзе делает остальное.",
        "morphologie": "Подходит для лиц среднего размера. На узких лицах она сидит оверсайз."
      },
      "Renaissance VIII x OCHO": {
        "legende": "8 с одной стороны. R с другой.",
        "description": "Встреча с SDM. Его 8, знак Ocho, запечатывает один заушник. R Renaissance отвечает на другом, выведенный почерком Ocho. Толстый ацетат Mazzucchelli, прямой срез, углы сколоты начисто. Триста экземпляров, номер на заушнике, по сто в каждом цвете. Остальное молчит.",
        "morphologie": "Подходит для лиц от средних до широких."
      },
      "Renaissance IX": {
        "legende": "Золотой шнур, натянутый от линзы к линзе.",
        "description": "Нить, свитая в шнур. Витки бегут по верху оправы, от линзы к линзе, над мостом с чёрными бороздками. RENAISSANCE выгравировано на планке, под шнуром. Чёрный кант повторяет контур линз. Заушники, два витых троса, до бордового наконечника.",
        "morphologie": "Подходит для широких лиц."
      },
      "Renaissance X": {
        "legende": "Цвет, без рамы.",
        "description": "Голая линза. Её держат изогнутый мост из розового золота и два блока с чёрными бороздками по бокам. Заушники, два витых серебряных троса, до бордового наконечника. Остальное делает линза.",
        "morphologie": "Подходит для средних и широких лиц."
      },
      "Renaissance XI": {
        "legende": "Восемь углов, ни одного изгиба.",
        "description": "Восьмиугольник, удержанный чётко. Металл прочерчивает восемь сторон, каждый угол срезан начисто. На шарнирах бороздки сжимают ободок, те же бегут по заушнику. RENAISSANCE выгравировано по верхней линии.",
        "morphologie": "Подходит узким и средним лицам."
      },
      "Renaissance XII": {
        "legende": "Адрес, привинченный к заушнику.",
        "description": "Ацетат Mazzucchelli, взятый из массива, срезан прямо. Верхние углы скошены. На заушнике золотая пластина несёт адрес: Avenue de la Renaissance. На ней выгравирован номер двенадцать. Этой улицы нет ни на одной карте.",
        "morphologie": "Подходит для средних и широких лиц."
      },
      "Renaissance XIII": {
        "legende": "Квадрат авиатора, два моста.",
        "description": "Верхняя планка несёт имя, выгравированное в металле. Под ней второй мост, тоньше. По бокам металл рифлёный. Без символа: R на линзе, кристалл на конце. Одного лица достаточно.",
        "morphologie": "Подходит для средних и широких лиц."
      },
      "Renaissance XIV": {
        "legende": "Авиатор с чёткими углами.",
        "description": "Низ линзы срезан начисто. Два тонких моста, заушники свиты в шнур. R на линзе делает остальное.",
        "morphologie": "Подходит для широких лиц."
      },
      "Renaissance XVI": {
        "legende": "Овал без ободка, в огранке diamond cut.",
        "description": "У линзы нет оправы. Её край огранён в diamond cut, по всему контуру. Мост рифлёный. Заушники: двойная витая планка. R на линзе делает остальное.",
        "morphologie": "Подходит для средних и широких лиц."
      },
      "Renaissance XVII": {
        "legende": "Огранена по всему контуру, как камень.",
        "description": "Огранка вместо оправы. Острые грани бегут по всему контуру линзы, от моста к низу. Безободковая оправа. Свет играет на каждом ребре.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XVIII": {
        "legende": "Квадрат, который держится прямо.",
        "description": "Квадрат, углы лишь слегка смягчены. Нить металла обводит его кругом, две планки над переносицей. Без символа: R на линзе, кристалл на конце. Одного лица достаточно.",
        "morphologie": "Для узких лиц."
      },
      "Renaissance XIX": {
        "legende": "Круг и бороздки, что замыкают мост.",
        "description": "Круг, из тонкого металла. Две рифлёные планки замыкают мост, тот же штрих возвращается у виска. Без символа: R на линзе, кристалл на конце. Одного лица достаточно.",
        "morphologie": "Для узких и средних лиц."
      },
      "Renaissance XX": {
        "legende": "Восемь сторон, срезанных начисто в ацетате.",
        "description": "Восьмиугольник, вырезанный толсто из ацетата. Восемь сторон сжимают линзу, ни одна не гнётся. На заушнике золотой штрих входит в материал. Без символа: одно лицо.",
        "morphologie": "Для узких и средних лиц."
      },
      "Renaissance XXI": {
        "legende": "Прямоугольник из ацетата, заушник ступенями.",
        "description": "Угол, удержанный. Прямоугольник из толстого ацетата, нижние углы срезаны начисто. Сбоку заушник спускается ступенями, в него вписан металлический V. Без символа: одно лицо.",
        "morphologie": "Для средних лиц."
      },
      "Renaissance XXII": {
        "legende": "Верх держится прямо, внизу линза голая.",
        "description": "Прямой лоб. Металлическая планка замыкает верх; внизу материал обрывается, и нить держит голую линзу. Без символа: одно лицо.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XXVII": {
        "legende": "Квадратный навигатор, удержанный тремя зубцами.",
        "description": "Сначала знак. У каждого виска три зубца выходят из металла и держат линзу: Трезубец несёт оправу, а не украшает её. Затем линия, квадратный навигатор, прямой двойной мост, низ линзы срезан начисто.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XXIX": {
        "legende": "Капля пилота, удержанная тремя зубцами.",
        "description": "Сначала трезубец. По три зубца у каждого виска выходят из металла и держат линзу. Под ними капля пилота, верх срезан начисто, две прямые планки на мосту. Три зубца, одна рука.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XXX": {
        "legende": "Адрес Парижа, привинченный к виску.",
        "description": "Адрес, который носят с собой. Avenue de la Renaissance, выгравированная в золоте, взята в заушник. Вокруг толстый прямоугольник из ацетата, углы срезаны начисто. Линза входит в материал и держится в нём.",
        "morphologie": "Для средних лиц."
      },
      "Renaissance XXXII": {
        "legende": "Три зуба впиваются в линзу, и она замирает.",
        "description": "Хватка от виска. Трезубец вонзает три зубца в край линзы и держит её. Безободковая оправа. Контур огранён в грани, каждый угол ловит свет.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XXXIII": {
        "legende": "Край огранён начисто, трезубец, чтобы зажать его.",
        "description": "Хватка за линзу. Край огранён мелкими зубьями, свет на нём цепляется. Безободковая оправа. У виска три зубца выходят из металла и сжимают линзу.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XXXV": {
        "legende": "Трезубец впивается в линзу, в ацетатной оправе.",
        "description": "Трезубец выходит из металла и берёт линзу. Три зубца у каждого угла, они впиваются и держат. Прямая оправа, цельная, вырезанная из массива. Заушники уходят титаном, выгравированы до самого конца.",
        "morphologie": "Для узких и средних лиц."
      },
      "Renaissance XXXVI": {
        "legende": "Большой квадрат без ободка, удержанный трезубцем.",
        "description": "Захваченное место. Большая квадратная линза, вокруг ничего. Безободковая оправа. Трезубец выходит из металла и зажимает линзу у виска, по три зубца с каждой стороны.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XXXVII": {
        "legende": "Лилия у обоих висков, линза между ними.",
        "description": "Мастерство без титула. Лилия держит линзу у каждого виска. Безободковая оправа, верх вытянут прямо, взгляд проходит целиком.",
        "morphologie": "Для широких лиц."
      },
      "Renaissance XXXVIII": {
        "legende": "Два моста один над другим, металл обнажён.",
        "description": "Обнажённый металл. Два моста наложены друг на друга, углы срезаны начисто, бороздки бегут до заушника. Без символа: R на линзе достаточно.",
        "morphologie": "Для средних лиц."
      },
      "Renaissance XXXIX": {
        "legende": "Лилия держит линзу, другая бережёт мост.",
        "description": "Мастерство жеста. Лилия вцепляется в голую линзу, три завитка у каждого угла. Безободковая оправа. На мосту бережёт другая.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XL": {
        "legende": "Шесть тонких углов, и ни один не повышает голос.",
        "description": "Шесть сторон, вытянутых нитью титана, круг замкнут чётко. У виска открытое кольцо подхватывает заушник. Без символа: R на линзе достаточно.",
        "morphologie": "Для средних лиц."
      },
      "Renaissance XLI": {
        "legende": "Лилия служит шарниром и держит линзу.",
        "description": "Лилия держит линзу. По одной на каждом конце, изваянная в металле, она образует шарнир и несёт её. Безободковая оправа. Низ линзы огранён в грани, свет в нём ловится.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XLII": {
        "legende": "Край линзы огранён начисто, по всему контуру.",
        "description": "Линзу ничто не обводит. Её край огранён начисто по всему контуру, мелкими зубьями, что ловят свет. Безободковая оправа. Мост рифлёный. Без символа: одно лицо.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance XLIII": {
        "legende": "Прямоугольник из тонкого металла, бороздки зачернены у шарнира.",
        "description": "Лица достаточно. Нить металла замыкает прямоугольник, нижние углы срезаны начисто. У шарнира зачернённые линии бегут в металле. Спокойный, прямой, заявлять нечего.",
        "morphologie": "Для средних лиц."
      },
      "Renaissance XLIV": {
        "legende": "Линза подвешена между зубцами трезубца.",
        "description": "Якорь. С каждой стороны трезубец выходит из металла и входит в линзу, он несёт её один. Безободковая оправа. Мост выгравирован рёбрами, линза подвешена между зубцами.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance L": {
        "legende": "Ацетат срезан начисто, золотой адрес на заушнике.",
        "description": "Адрес, который носят с собой. Толстый ацетат, углы срезаны начисто. На заушнике золотая пластина: Avenue de la Renaissance, улица, которой нет ни на одной карте.",
        "morphologie": "Для узких и средних лиц."
      },
      "Renaissance LI": {
        "legende": "Лилия у висков, край линзы огранён в грани.",
        "description": "Лилия держит висок, с обеих сторон. От неё расходится линза, без оправы. Безободковая оправа. Край огранён в грани, свет в нём дробится.",
        "morphologie": "Для средних лиц."
      },
      "Renaissance LII": {
        "legende": "Прямая планка над взглядом, всё под ней выравнивается.",
        "description": "Линия пилота, удержанная квадратом. Плоская планка бежит от края до края, нить металла замыкает мост под ней. Без символа: R на линзе, кристалл на конце. Одного лица достаточно.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance LIII": {
        "legende": "Имя выгравировано вверху линзы, надо подойти, чтобы прочесть.",
        "description": "Прямоугольник из тонкой нити. Мост и двойная планка несут те же тесные линии в металле. Без символа: R на линзе, кристалл на конце. Одного лица достаточно.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance LIV": {
        "legende": "Пластина над каждой линзой, как вывеска.",
        "description": "Сначала имя. RENAISSANCE выгравировано на пластине, посаженной бровью над каждой линзой. Ободок держит верх, низ остаётся голым. Смягчённый восьмиугольник, рифлёный мост.",
        "morphologie": "Для средних лиц."
      },
      "Renaissance LV": {
        "legende": "Око Гора, прорезанное в заушнике.",
        "description": "Око, что бережёт. На каждом заушнике око Гора прорезано в металле. Безободковая оправа. Край линзы огранён в грани, свет в нём дробится.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance LVI": {
        "legende": "Восемь сторон, срезанных начисто, свет цепляется за низ линзы.",
        "description": "Восьмиугольник, удержанный без оправы. Линзы спадают восемью сторонами, нижний край огранён ступенями, что ловят свет. Безободковая оправа. Рельефный зубец замыкает каждый угол.",
        "morphologie": "Для широких лиц."
      },
      "Renaissance LVII": {
        "legende": "Адрес открыто, и тот же иероглифами.",
        "description": "Та же улица, дважды. Avenue de la Renaissance на заушнике, буквами; у шарнира тот же адрес повторён иероглифами. Маленький прямоугольник в ободке, углы срезаны.",
        "morphologie": "Для средних лиц."
      },
      "Renaissance LVIII": {
        "legende": "Скарабей лёг у шарнира, и он не уходит.",
        "description": "Сначала печать. Ацетат вырезан толсто, верхние углы срезаны начисто. У шарнира скарабей вдавлен в металл, виден сверху, как оттиск. Остальное молчит.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance LIX": {
        "legende": "Кобра у каждого виска, и линза без оправы.",
        "description": "Стража без оправы. У каждого виска изваянная кобра берёт линзу и несёт её. Безободковая оправа. Двойной мост, камень взят в металл.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance LX": {
        "legende": "Кобра у каждого виска, она кусает линзу и хранит её.",
        "description": "Безмолвная стража. У каждого виска голова кобры кусает край линзы, её тело в чешуе бежит вдоль заушника. Камень горит на её голове. Она не угрожает, она бережёт.",
        "morphologie": "Для средних и широких лиц."
      },
      "Renaissance LXI": {
        "legende": "Огранённая линза, ацетатные заушники, что несут золото.",
        "description": "Огранка начисто. Линза держится одна, огранена по всему контуру, каждый угол отдаёт свет. Безободковая оправа. Две металлические петли сжимают её, ацетатные заушники несут золото. Без символа: одно лицо.",
        "morphologie": "Для средних лиц."
      }
    },
    "collections": {
      "heritage": {
        "recit": "То, что было до нас, строит нас. Héritage собирает оправы, несущие Трезубец. Формы, которые проходят сквозь моду и никогда ей не подчиняются."
      },
      "versailles": {
        "recit": "Цветок Франции, без трона. На наших оправах он говорит не о полученном звании: три лепестка, одно крепление, связь, которую выбирают. Никто не делал нас знатными. Мы выучили жест."
      },
      "isis": {
        "recit": "Цивилизация стирается, её знаки держатся ещё. Isis собирает четыре: анх, скарабей, кобра, око Гора. Высеченные в металле, они говорят о том, что связывает, что возрождается, что бережёт, что видит. О том, что проходит сквозь время."
      }
    },
    "symboles": {
      "trident": {
        "nom": "Трезубец",
        "etendard": "Суверенитет",
        "definition": "Равновесие между вчера, сегодня и завтра. Опора на то, что лежит в основании, что строит, что остаётся.",
        "deuxLectures": "Память читает в нём поколения: три зубца, одна рукоять. Выбор читает в нём отказ от заменимого."
      }
    },
    "proof": {
      "label": "Подпись",
      "texte": "R на линзе, для того, кто напротив. Кристалл на конце заушника, за ухом. О нём знает только владелец. И на переносице номер: второго не будет."
    },
    "trust": [
      "Возврат в течение 14 дней",
      "Гарантия производителя 3 года",
      "Создана в Париже, изготовлена в Корее",
      "Защищённая оплата",
      "250+ салонов оптики"
    ]
  },
  "tr": {
    "models": {
      "Renaissance XXXIV": {
        "legende": "Üç pençe. Cam yalnızca onlara tutunur.",
        "description": "Gerçeğin üstündeki tutuş. Trident metalden çıkar ve camın içine girer: sıkar, taşır. Rimless. Çevresinde hiçbir şey yok; yalnızca üç uç ve tuttukları.",
        "morphologie": "Orta yüzlere uygun."
      },
      "Renaissance II": {
        "legende": "İnce metalden bir halka. Söylenecek başka şey yok.",
        "description": "Katı yuvarlaklık. İnce bir metal teli halkayı kapatır; köprüden sapların başladığı yere kadar siyah çizgiler iner. Sade olması istenmiş bir detay, Maison'un ilk günlerinden beri. Sembol yok: cam üzerinde R, ucunda kristal. Yüzün kendisi yeter.",
        "morphologie": "İnce ve orta yüzlere uygun."
      },
      "Renaissance III": {
        "legende": "Aviator, açı açı yeniden çizildi.",
        "description": "Herkesin tanıdığı bir hat. Kıvrımlar açıya döner, cam temiz iner. Çift köprü. Menteşelerde metal çizgili. Yumuşatılacak hiçbir şey kalmadı.",
        "morphologie": "Orta ve geniş yüzlere uygun."
      },
      "Renaissance x FRENCH CUT IV": {
        "legende": "Tek bir cam. İçine kazınmış iki isim.",
        "description": "Maison'un ilk ortak çalışması. Tek bir cam, iki isim degradenin içine kazınmış, saplar bordoya kadar inen iki bükümlü kablo. Camın altında bir damla. Bir kaybın ya da atlatılmış bir sınavın ardından gözün altına yapılan o damla. Burada teninin değil camın üzerinde duruyor. Düşüşü anlatmaz. Ayakta kaldığını söyler. Yeniden doğanı söyler.",
        "morphologie": "Orta ve geniş yüzlere uygun."
      },
      "Renaissance VI": {
        "legende": "Köprü çizgili. Akılda kalan o.",
        "description": "Aviator, köşeleri temiz kesilmiş. Çift köprü: alttaki siyah çizgiler taşır, aynıları sapların başladığı yerde de var. Sapta RENAISSANCE ve 18KT kazınmış. Camdaki R gerisini yapar.",
        "morphologie": "Orta yüzlere uygun. İnce yüzler onu daha geniş taşır."
      },
      "Renaissance VIII x OCHO": {
        "legende": "Bir yanda 8. Diğer yanda R.",
        "description": "SDM ile karşılaşma. Onun 8'i, Ocho'nun işareti, bir sapı mühürler; Renaissance'ın R'si diğer sapta yanıt verir, Ocho'nun el yazısıyla çizilmiş. Mazzucchelli asetat, kalın, düz kesilmiş, köşeleri temiz kırılmış. Üç yüz çift, sapta numaralı, her coloris için yüz tane. Gerisi susar.",
        "morphologie": "Orta ve geniş yüzlere uygun."
      },
      "Renaissance IX": {
        "legende": "Altın bir ip, bir camdan diğerine gerilmiş.",
        "description": "İpe dönmüş tel. Büküm alında koşar, camdan cama, siyah çizgili bir köprünün üstünde. İpin altında, bara RENAISSANCE kazınmış. İnce bir siyah hat camların çevresini izler. Saplar, iki bükümlü kablo, bordo uca kadar.",
        "morphologie": "Geniş yüzlere uygun."
      },
      "Renaissance X": {
        "legende": "Renk, çerçeve olmadan.",
        "description": "Çıplak cam. Pembe altın eğri köprüye ve yanlardaki iki siyah çizgili bloğa tutunur. Saplar, iki bükümlü gümüş kablo, bordo uca kadar iner. Gerisini cam yapar.",
        "morphologie": "Orta ve geniş yüzlere uygun."
      },
      "Renaissance XI": {
        "legende": "Sekiz açı, tek bir kıvrım yok.",
        "description": "Sekizgen, temiz tutulmuş. Metal sekiz kenar çizer, her açı keskin kesilmiş. Menteşelerde çizgiler çerçeveyi sıkar, aynıları sapta da koşar. Üst hat boyunca RENAISSANCE kazınmış.",
        "morphologie": "İnce ve orta yüzlere uygun."
      },
      "Renaissance XII": {
        "legende": "Sapa vidalanmış bir adres.",
        "description": "Mazzucchelli asetat, kütleden alınmış, düz kesilmiş. Üst köşeler eğik kesilmiş. Sapta, altından bir levha bir adres taşır: Avenue de la Renaissance. Üstüne on iki numara kazınmış. Hiçbir haritada yok.",
        "morphologie": "Orta ve geniş yüzlere uygun."
      },
      "Renaissance XIII": {
        "legende": "Aviator'ün kare hali, iki köprü.",
        "description": "Üstteki bar ismi taşır, metale kazınmış. Altında, ikinci bir köprü, daha ince. Yanlarda metal çizgili. Sembol yok: cam üzerinde R, ucunda kristal. Yüzün kendisi yeter.",
        "morphologie": "Orta ve geniş yüzlere uygun."
      },
      "Renaissance XIV": {
        "legende": "Açıları temiz aviator.",
        "description": "Camın altı temiz kesilmiş. İki ince köprü, saplar ipe dönmüş. Camdaki R gerisini yapar.",
        "morphologie": "Geniş yüzlere uygun."
      },
      "Renaissance XVI": {
        "legende": "Diamond Cut'la kesilmiş oval bir Rimless.",
        "description": "Camın çerçevesi yok. Kenarı Diamond Cut'la kesilmiş, tüm çevresi boyunca. Köprü çizgili. Saplar: bükümlü çift bar. Camdaki R gerisini yapar.",
        "morphologie": "Orta ve geniş yüzlere uygun."
      },
      "Renaissance XVII": {
        "legende": "Bir taş gibi, tüm çevresi kesilmiş.",
        "description": "Çerçevenin yerinde kesim. Sivri yüzler camın tüm çevresinde koşar, köprüden alta kadar. Rimless. Işık her sırtta oynar.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance XVIII": {
        "legende": "Dik duran bir kare.",
        "description": "Kare, köşeleri sadece yumuşatılmış. Bir metal teli çevresini dolaşır, burnun üstünde iki bar. Sembol yok: cam üzerinde R, ucunda kristal. Yüzün kendisi yeter.",
        "morphologie": "İnce yüzler için."
      },
      "Renaissance XIX": {
        "legende": "Yuvarlak, ve köprüyü kapatan çizgiler.",
        "description": "Halka, ince metalden. İki çizgili bar köprüyü kapatır, aynı çizgi şakakta geri döner. Sembol yok: cam üzerinde R, ucunda kristal. Yüzün kendisi yeter.",
        "morphologie": "İnce ve orta yüzler için."
      },
      "Renaissance XX": {
        "legende": "Asetatta temiz kesilmiş sekiz kenar.",
        "description": "Sekizgen, asetatta kalın kesilmiş. Sekiz kenar camı sıkar, hiçbiri bükülmez. Sapta, bir altın çizgi malzemenin içine girer. Sembol yok: yalnızca yüz.",
        "morphologie": "İnce ve orta yüzler için."
      },
      "Renaissance XXI": {
        "legende": "Asetattan bir dikdörtgen, sap basamak basamak.",
        "description": "Tutulmuş açı. Kalın asetattan bir dikdörtgen, alt köşeleri temiz kesilmiş. Yanda, sap basamak basamak iner, içine metal bir V oturur. Sembol yok: yalnızca yüz.",
        "morphologie": "Orta yüzler için."
      },
      "Renaissance XXX": {
        "legende": "Paris'ten bir adres, şakağa vidalanmış.",
        "description": "Yanında taşıdığın adres. Avenue de la Renaissance, altına kazınmış, sapın içine alınmış. Çevresinde, kalın asetattan bir dikdörtgen, köşeleri temiz kesilmiş. Cam malzemeye oturur ve orada durur.",
        "morphologie": "Orta yüzler için."
      },
      "Renaissance XXII": {
        "legende": "Üst dik tutulmuş, altta çıplak cam.",
        "description": "Düz alın. Metal bir bar üstü kapatır; altta, malzeme biter ve bir tel çıplak camı tutar. Sembol yok: yalnızca yüz.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance XXVII": {
        "legende": "Kare navigatör, üç uçla tutulmuş.",
        "description": "Önce işaret. Her şakakta, üç uç metalden çıkar ve camı tutar: Trident çerçeveyi taşır, süslemez. Sonra hat, bir kare navigatör, düz çift köprü, camın altı temiz kesilmiş.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance XXIX": {
        "legende": "Pilotun damlası, üç uçla tutulmuş.",
        "description": "Önce Trident. Her şakaktaki üç uç metalden çıkar ve camı tutar. Altında, pilotun damlası, üstü temiz kesilmiş, köprüde iki düz bar. Üç uç, tek bir el.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance XXXII": {
        "legende": "Üç diş camı ısırır, artık kımıldamaz.",
        "description": "Şakaktan tutuş. Trident üç ucu camın kenarına sürer ve tutar. Rimless. Çevre yüzlerle kesilmiş, her açı ışığı alır.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance XXXVI": {
        "legende": "Büyük kare Rimless, Trident'le tutulmuş.",
        "description": "Alınmış yer. Büyük bir kare cam, çevresinde hiçbir şey yok. Rimless. Trident metalden çıkar ve camı şakaktan kıstırır, her yanda üç uç.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance XXXVII": {
        "legende": "İki şakakta Fleur de lys, aralarında bir cam.",
        "description": "Unvansız ustalık. Fleur de lys camı her şakaktan tutar. Rimless, üst düz çekilmiş, bakış olduğu gibi geçer.",
        "morphologie": "Geniş yüzler için."
      },
      "Renaissance XXXVIII": {
        "legende": "Üst üste iki köprü, metal çıplak.",
        "description": "Çıplak metal. Üst üste binmiş iki köprü, köşeler temiz kesilmiş, çizgiler sapa kadar koşar. Sembol yok: camdaki R yeter.",
        "morphologie": "Orta yüzler için."
      },
      "Renaissance XXXIX": {
        "legende": "Fleur de lys camı tutar, bir başkası köprüde bekler.",
        "description": "Elin ustalığı. Fleur de lys çıplak camı kavrar, her köşede üç kıvrım. Rimless. Köprüde, bir başkası bekler.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance XL": {
        "legende": "Altı ince açı, hiçbiri sesini yükseltmez.",
        "description": "Altı kenar titanyum telle çekilmiş, halka temiz kapatılmış. Şakağın yakınında, açık bir halka sapı yakalar. Sembol yok: camdaki R yeter.",
        "morphologie": "Orta yüzler için."
      },
      "Renaissance XLIII": {
        "legende": "İnce metalden bir dikdörtgen, menteşe yakınında karartılmış çizgiler.",
        "description": "Yüz yeter. Bir metal teli dikdörtgeni kapatır, alt köşeler temiz kesilmiş. Menteşe yakınında, karartılmış çizgiler metalin içinde koşar. Konmuş, düz, söyleyecek bir şeyi olmadan.",
        "morphologie": "Orta yüzler için."
      },
      "Renaissance XLII": {
        "legende": "Camın kenarı çiğden kesilmiş, tüm çevresi.",
        "description": "Hiçbir şey camı çevrelemez. Kenarı tüm çevresi boyunca çiğden kesilmiş, ışığı alan sık dişlerle. Rimless. Köprü çizgili. Sembol yok: yalnızca yüz.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance L": {
        "legende": "Asetat temiz kesilmiş, sapta altından adres.",
        "description": "Yanında taşıdığın adres. Kalın bir asetat, köşeleri temiz kesilmiş. Sapta, altından bir levha: Avenue de la Renaissance, hiçbir haritanın taşımadığı sokak.",
        "morphologie": "İnce ve orta yüzler için."
      },
      "Renaissance XLIV": {
        "legende": "Cam, Trident'in uçları arasında asılı.",
        "description": "Tutunuş. Her yandan, Trident metalden çıkar ve camın içine girer, onu tek başına taşır. Rimless. Sırtlarla kazınmış bir köprü, cam uçların arasında asılı.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance LII": {
        "legende": "Bakışın üstünde düz bir bar, altında her şey hizalanır.",
        "description": "Pilot hattı, kareye tutulmuş. Düz bir bar bir yandan diğerine koşar, altta bir metal teli köprüyü kapatır. Sembol yok: cam üzerinde R, ucunda kristal. Yüzün kendisi yeter.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance LI": {
        "legende": "Şakaklarda Fleur de lys, camın kenarı yüzlerle kesilmiş.",
        "description": "Fleur de lys şakağı tutar, iki yandan. Oradan cam çıkar, çerçevesiz. Rimless. Kenar yüzlerle kesilmiş, ışık üstünde kırılır.",
        "morphologie": "Orta yüzler için."
      },
      "Renaissance LIII": {
        "legende": "İsim camın üstüne kazınmış, okumak için yaklaşmak gerek.",
        "description": "İnce telden bir dikdörtgen. Köprü ve çift bar metalde aynı sık çizgileri taşır. Sembol yok: cam üzerinde R, ucunda kristal. Yüzün kendisi yeter.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance LIV": {
        "legende": "Her camın üstünde bir levha, bir tabela gibi.",
        "description": "Önce isim. RENAISSANCE bir levhaya kazınmış, her camın üstüne kaş gibi konmuş. Halka üstü tutar, alt çıplak kalır. Yumuşatılmış bir sekizgen, çizgili bir köprü.",
        "morphologie": "Orta yüzler için."
      },
      "Renaissance LV": {
        "legende": "Œil d'Horus, sapta oyularak açılmış.",
        "description": "Bekleyen göz. Her sapta, Œil d'Horus metalden oyulmuş. Rimless. Camın kenarı yüzlerle kesilmiş, ışık üstünde kırılır.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance LVI": {
        "legende": "Sekiz kenar temiz kesilmiş, ışık camın altına tutunur.",
        "description": "Çerçevesiz tutulmuş sekizgen. Camlar sekiz kenarda iner, alt kenar ışığı yakalayan basamaklarla kesilmiş. Rimless. Her köşeyi kabartma bir uç kapatır.",
        "morphologie": "Geniş yüzler için."
      },
      "Renaissance LVII": {
        "legende": "Adres açıkça, ve aynısı hiyerogliflerle.",
        "description": "Aynı sokak, iki kez. Avenue de la Renaissance sapta, harflerle; menteşede, aynı adres hiyerogliflerle yinelenmiş. Küçük çerçeveli bir dikdörtgen, açıları kesilmiş.",
        "morphologie": "Orta yüzler için."
      },
      "Renaissance LVIII": {
        "legende": "Menteşeye konmuş bir scarabée, ve geri gitmez.",
        "description": "Önce mühür. Asetat kalın kesilmiş, üst köşeler temiz. Menteşede, metale bastırılmış bir scarabée, yukarıdan bir mühür gibi görünür. Gerisi susar.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance LX": {
        "legende": "Her şakakta bir cobra, camı ısırır ve korur.",
        "description": "Sessiz nöbet. Her şakakta, bir cobra başı camın kenarını ısırır, pullu gövdesi sap boyunca koşar. Başında bir taş parlar. Tehdit etmez, bekler.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance LXI": {
        "legende": "Cam yüzlerle kesilmiş, asetat saplar altını taşır.",
        "description": "Çiğden kesim. Cam tek başına durur, tüm çevresi yüzlerle kesilmiş, her açı ışığı verir. Rimless. İki metal halka onu sıkar, asetat saplar altını taşır. Sembol yok: yalnızca yüz.",
        "morphologie": "Orta yüzler için."
      },
      "Renaissance XXXV": {
        "legende": "Trident camı ısırır, asetat bir yüzün içinde.",
        "description": "Trident metalden çıkar ve camı alır. Her köşede üç uç, ısırır ve taşır. Düz, dolu bir yüz, tek bir bloktan kesilmiş. Saplar titanyumda uzar, uca kadar kazınmış.",
        "morphologie": "İnce ve orta yüzler için."
      },
      "Renaissance XXXIII": {
        "legende": "Kenar çiğden kesilmiş, Trident onu kıstırır.",
        "description": "Camın üstündeki tutuş. Kenar küçük dişlerle kesilmiş, ışık üstüne tutunur. Rimless. Şakakta, üç uç metalden çıkar ve camı sıkar.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance LIX": {
        "legende": "Her şakakta cobra, ve cam çerçevesiz.",
        "description": "Çerçevesiz nöbet. Her şakakta, oyulmuş cobra camı kavrar ve taşır. Rimless. Çift köprü, metale alınmış bir taş.",
        "morphologie": "Orta ve geniş yüzler için."
      },
      "Renaissance XLI": {
        "legende": "Fleur de lys menteşeyi yapar ve camı tutar.",
        "description": "Fleur de lys camı tutar. Her uçta bir tane, metale oyulmuş, sapı eklemler ve camı taşır. Rimless. Camın altı yüzlerle kesilmiş, ışık üstüne tutunur.",
        "morphologie": "Orta ve geniş yüzler için."
      }
    },
    "collections": {
      "heritage": {
        "recit": "Bizden önce gelen, bizi kuran. Héritage, Trident taşıyan çerçeveleri bir araya getirir. Modaların içinden geçen, ama hiçbirine boyun eğmeyen hatlar."
      },
      "versailles": {
        "recit": "Fransa'nın çiçeği, tahtsız. Çerçevelerimizde, alınmış bir unvanı söylemez: üç yaprak, tek bir bağ, seçtiğin bağ. Kimse bizi soylu doğurmadı. O eli öğrendik."
      },
      "isis": {
        "recit": "Bir uygarlık silinir, işaretleri hâlâ ayakta. Isis dördünü bir araya getirir: Ankh, scarabée, cobra, Œil d'Horus. Metale oyulmuş, bağlayanı söylerler, yeniden doğanı, gözeteni, göreni. Zamanı aşanı."
      }
    }
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
