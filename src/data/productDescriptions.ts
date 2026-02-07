// ========================================
// DESCRIPTIONS DES 34 MODÈLES DU CATALOGUE
// Mapping modelName (normalisé en minuscules) → description
// ========================================

const descriptions: Record<string, string> = {
  'renaissance li':
    "La noblesse ne s'invente pas, elle se porte. Architecture Rimless libérée de tout contour, verres taillés en Diamond Cut capturant la lumière comme un joyau. Sur la charnière, la Fleur de Lys en argent ancre le regard dans une histoire qui nous précède. Pour ceux qui avancent sans bruit.",

  'renaissance xxxxiv':
    "La transmission d'une force. Le Trident s'affine ici pour devenir une signature incisive, traversant le métal pour s'ancrer dans le verre. Arêtes vives, titane plaqué or : chaque détail répond à une intention. Une monture construite pour durer, pas pour une saison.",

  'renaissance xxxiv':
    "L'emprise sur le réel. Trois griffes de métal – le Trident – saisissent le verre avec fermeté. C'est la force de ce qui construit. La monture s'efface pour laisser place à la justesse de la structure. Une pièce technique qui respecte le matériau et celui qui la porte.",

  'renaissance xxxii':
    "L'angle de décision. Une forme hexagonale étirée, sans contour, où le verre règne en maître. Le Trident vient signer la tempe, rappelant que l'élégance peut être tranchante. Une monture pour les esprits qui ne cherchent pas l'approbation.",

  'renaissance xxxxiii':
    "La précision du détail. Petit calibre, grand impact. Une forme hexagonale compacte, cerclée de métal ciselé. C'est la lunette de précision par excellence. Discrète pour ceux qui regardent, évidente pour ceux qui savent.",

  'renaissance xxxx':
    "L'hybride parfait. Entre le rond et le carré, l'octogone adouci. Un cerclage métal qui encadre le regard sans l'alourdir. L'élégance technique pour le quotidien, façonnée pour traverser les époques.",

  'renaissance xxxix':
    "L'Aviateur, élevé au rang d'art. Nous avons ôté la monture pour ne garder que l'essence : le verre et le symbole. La Fleur de Lys en relief maintient la structure avec la précision d'un orfèvre. Une silhouette aérienne qui pèse tout le poids de l'histoire.",

  'renaissance xxxxi':
    "Le minimalisme royal. Une forme rectangulaire pure, tenue par la seule force de l'emblème français. Les charnières articulées en Fleur de Lys transforment cette monture technique en une pièce de transmission. La clarté absolue.",

  'renaissance xxxxii':
    "La légèreté suspendue. Une structure sans bord, aux verres teintés, maintenue par un pont ouvragé. C'est comme porter un filtre sur le réel. Aérien, précieux, et conçu pour ne jamais peser.",

  'renaissance xxxviii':
    "Structure apparente. Le squelette métallique de la lunette devient son atout esthétique. Forme angulaire, double pont fin. Une mécanique de précision qui habille le regard sans le masquer.",

  'renaissance xxxvii':
    "Vision unifiée. Ce masque mono-écran traverse le visage d'un trait unique, sans frontière. La Fleur de Lys trône au centre, gardienne d'une vision claire. C'est l'armure moderne de ceux qui regardent le monde en face, sans le diviser.",

  'renaissance xii':
    "Certaines adresses ne sont pas sur les cartes. 'Avenue de la Renaissance' gravée sur la branche : plus qu'un nom, un point de repère. Acétate massif, charnières or. Ce n'est pas un logo, c'est une destination. Celle de ceux qui sont arrivés.",

  'renaissance l':
    "La justesse de la ligne. Une forme géométrique sculptée dans la masse où chaque courbe a sa raison. Pas de superflu. La plaque dorée sur la branche est le passeport de ceux qui ne se perdent jamais. L'élégance radicale.",

  'renaissance xxx':
    "L'autorité naturelle. Large, rectangulaire, impérieuse. Les coins coupés structurent le visage avec maîtrise. La gravure latérale signe l'appartenance à un cercle qui ne dit pas son nom. Le poids du pouvoir, porté avec légèreté.",

  'renaissance xxii':
    "Ligne d'horizon. Le haut de la monture est une ligne droite parfaite. Un coup de sabre. Masque en acétate massif, noir absolu. La plaque or verrouille le style. Pour ceux qui regardent droit devant, sans jamais dévier.",

  'renaissance xx':
    "Géométrie sacrée. L'octogone en acétate épais. Huit côtés pour définir une personnalité complexe. C'est une pièce d'architecte posée sur le nez. Les angles disent ce que les courbes n'osent pas. L'intelligence du design au service du style.",

  'renaissance xix':
    "Ce qui traverse les épreuves. La forme Pantos est un classique qui renaît ici plus fort. Titane plaqué or, gravure subtile sur le verre. C'est le fil invisible entre le style d'hier et l'exigence de demain.",

  'renaissance xxxiii':
    "L'équilibre du vide. Structure Rimless maintenue par la seule tension du Trident. Les bords du verre, facettés en diagonale, créent un jeu de lumière unique à chaque mouvement. L'art de briller sans éblouir.",

  'renaissance xxxv':
    "L'éveil silencieux. Une face en acétate massif, dense et protectrice, soudainement percée par l'or du Trident à la charnière. Le contraste absolu entre la matière brute et le métal précieux. Une présence qui protège sans menacer.",

  'renaissance xxix':
    "Le classique, ancré. La forme pilote trouve ici une nouvelle dimension grâce au Trident en relief. Ni rétro, ni futuriste : juste. Fabriquée avec la patience des artisans, elle incarne la maîtrise du temps et la froideur de ceux qui gardent la tête froide.",

  'renaissance xxxvi':
    "Occupation de l'espace. Carrée. Oversize. Dentelée. Cette monture refuse la discrétion. Les bords des verres sont taillés comme du cristal brut. Le Trident sur la branche avertit : ici, on ne joue pas. La force de ceux qui n'ont plus rien à prouver.",

  'renaissance xxvii':
    "La coupe franche. Un aviateur aux angles coupés, durcis, masculins. Le Trident scelle la monture comme une signature au bas d'un contrat. Une géométrie de fer pour un regard d'acier. Titane plaqué or blanc pour une finition inaltérable.",

  'renaissance xiii':
    "Le pilote urbain. Nous avons étiré l'aviateur pour le rendre rectangulaire, dynamique. La gravure Renaissance court sur le double pont comme une frise antique. Pour ceux qui tracent leur propre ligne.",

  'renaissance xviii':
    "La force tranquille. Un carré aux coins arrondis, rassurant mais imposant. La triple barre sur la charnière rappelle les codes de la mécanique de précision. Une monture qui installe une présence immédiate, sans effort.",

  'renaissance xi':
    "La solidité de la nature. Six côtés, aucun hasard. L'hexagone est la forme la plus stable qui soit. Les branches striées signent la main de l'artisan. Une monture qui ne subit pas le temps, elle le traverse.",

  'renaissance xiv':
    "Le détail invisible. Une forme aviateur angulaire dont les branches sont travaillées comme des cordes de marine en or. La robustesse rencontre la finesse. Visible seulement pour ceux qui s'approchent vraiment.",

  'renaissance xvii':
    "La rigueur du geste. Une forme rectangulaire stricte, sublimée par un Diamond Cut sur tout le pourtour. Le Trident en or rose apporte la seule touche de chaleur sur cette architecture de glace. La froideur apparente cache la chaleur d'un héritage.",

  'renaissance xvi':
    "Le cercle parfait. Ovale pur, sans monture. Le verre est roi. La branche torsadée apporte une touche 'câble' vintage, remise au goût du jour. Juste. Comme tout ce qui dure.",

  'renaissance viii x ocho':
    "La signature. Le 8 n'est pas un chiffre, c'est le Ocho de Renaissance. La rencontre de deux identités fortes gravée dans l'acétate massif. Angles taillés, plaque or qui scelle la branche : tout est là. Édition limitée à 100 pièces.",

  'renaissance vi':
    "L'évidence. Une forme douce, universelle, sublimée par la qualité du plaqué or 18Kt. C'est l'objet qu'on transmet parce qu'il a été conçu pour durer, fruit de la patience de nos artisans.",

  'renaissance french cut iv':
    "Le geste précis. Masque plat, verre unique. Le détail qui tue ? La découpe en 'larme' au bas du verre et les embouts bordeaux. La fusion de deux signatures pour un regard unique. L'audace, dans le respect de la tradition.",

  'renaissance iii':
    "Rebelle par essence. Un aviateur qui a refusé les courbes. Angles coupés, double pont droit. C'est la version brute de la lunette pilote. Construit pour durer, porté pour marquer.",

  'renaissance ii':
    "Rondeur stricte. Un cercle parfait en métal fin. Pas d'artifice, juste la pureté de la ligne et la qualité du titane. Une monture qui ne demande rien, qui ne prouve rien. Elle est.",

  'renaissance ix':
    "La corde d'or. Une barre frontale travaillée en torsade relie les deux verres. C'est le bijou qui habille le front. Le détail qu'on remarque quand on vous parle dans les yeux. L'élégance du détail.",
};

/**
 * Récupère la description d'un modèle par son nom
 * La recherche est insensible à la casse
 */
export function getProductDescription(modelName: string): string | null {
  const key = modelName.toLowerCase().trim();
  return descriptions[key] || null;
}
