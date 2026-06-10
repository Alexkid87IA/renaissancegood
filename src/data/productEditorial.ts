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
  /** Renvoi vers le récit de collection partagé. */
  collection: CollectionId;
  /** Renvoi vers le symbole partagé. */
  symbole: SymboleId;
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
  collection: Collection;
  symbole: Symbole;
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
    collection: { ...COLLECTIONS[model.collection], ...defined(tr?.collections?.[model.collection]) },
    symbole: { ...SYMBOLES[model.symbole], ...defined(tr?.symboles?.[model.symbole]) },
    proof: { ...PROOF, ...defined(tr?.proof) },
    trust: tr?.trust ?? TRUST,
  };
}
