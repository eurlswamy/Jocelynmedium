import {createClient} from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('ERREUR : la variable SANITY_TOKEN est absente. Definissez-la avant de lancer le script (export SANITY_TOKEN="...").')
  process.exit(1)
}

const client = createClient({
  projectId: 'ji3lirnr',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token,
  useCdn: false,
})

// Tirets longs a normaliser (cadratin = 8212, demi-cadratin = 8211), sans les ecrire en clair.
const LONG_DASHES = new RegExp(`[${String.fromCharCode(8212)}${String.fromCharCode(8211)}]`, 'g')

// Convertit du markdown simple en blocs Portable Text.
// Paragraphes separes par double saut de ligne. Lignes commencant par "- " => puces.
// Le gras markdown (**...**) est nettoye en texte simple.
function markdownToBlocks(markdown) {
  const blocks = []
  let bi = 0
  let si = 0
  const rawParas = markdown.split(/\n\s*\n/)

  for (const para of rawParas) {
    const trimmed = para.trim()
    if (!trimmed) continue

    const lines = trimmed.split('\n').map((l) => l.trim())
    const isList = lines.every((l) => l.startsWith('- '))

    if (isList) {
      for (const line of lines) {
        const text = cleanText(line.replace(/^-\s+/, ''))
        blocks.push({
          _type: 'block',
          _key: `b${bi++}`,
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          markDefs: [],
          children: [{_type: 'span', _key: `s${si++}`, text, marks: []}],
        })
      }
    } else {
      const text = cleanText(lines.join(' '))
      blocks.push({
        _type: 'block',
        _key: `b${bi++}`,
        style: 'normal',
        markDefs: [],
        children: [{_type: 'span', _key: `s${si++}`, text, marks: []}],
      })
    }
  }
  return blocks
}

// Retire le gras markdown et normalise les tirets longs en virgule.
function cleanText(s) {
  return s.replace(/\*\*/g, '').replace(LONG_DASHES, ', ').trim()
}

// ---------------------------------------------------------------------------
// SINGLETONS (reprend fidelement les initialValue des schemas)
// ---------------------------------------------------------------------------

const singletons = [
  {
    _id: 'pageAccueil',
    _type: 'pageAccueil',
    heroBadge: 'Medium voyant, La Reunion, Depuis 1994',
    heroTitre: 'Voir',
    heroTitreItalique: 'au-dela',
    heroTitreSuite: ' des portes du visible.',
    heroDescription:
      'Trente ans de pratique. Quatre methodes combinees. Une heure de consultation pour des informations concretes, pas des predictions floues.',
    heroCta1: 'Reserver une consultation',
    heroCta2: 'Mon parcours',
    introSurtitre: 'Qui je suis',
    introTitre: "Je m'appelle Jocelyn.",
    introTitreItalique: 'Medium depuis 1994',
    introDescription:
      "Je vous recois a Saint-Clotilde, a La Reunion. Je vous accompagne aussi par telephone et en visio, ou que vous soyez dans l'Ocean Indien. Au cours d'une consultation d'une heure, je combine quatre approches : clairvoyance, clairaudience, tirage de cartes, et voyance sur photo ou document.",
    introStats: [
      {_key: 'st0', valeur: '30+', label: 'Annees de pratique'},
      {_key: 'st1', valeur: '4', label: 'Methodes combinees'},
      {_key: 'st2', valeur: '1h', label: 'Par consultation'},
      {_key: 'st3', valeur: '15 ans', label: "A l'antenne TV"},
    ],
    discoverBadge: 'Explorer le site',
    discoverTitre: 'Cinq seuils',
    discoverTitreItalique: 'a franchir.',
    discoverDescription:
      'Chaque page approfondit un aspect de la pratique : ce que je propose, comment je travaille, qui je suis, et comment me contacter.',
    discoverCartes: [
      {
        _key: 'dc0',
        numeral: 'I',
        surtitre: 'Services et tarifs',
        titre: 'Deux formules',
        description:
          'Une heure au cabinet ou a distance (120 euros), ou 30 minutes par telephone (85 euros).',
      },
      {
        _key: 'dc1',
        numeral: 'II',
        surtitre: 'Methodes',
        titre: 'Quatre approches',
        description:
          'Clairvoyance, clairaudience, tirage de cartes, voyance sur photo. Quatre approches combinees en une heure.',
      },
      {
        _key: 'dc2',
        numeral: 'III',
        surtitre: 'A propos',
        titre: 'Trente ans de pratique',
        description:
          'Plus jeune medium de France a 23 ans. Festival de Cannes. Emission Tele Kreol depuis 15 ans.',
      },
      {
        _key: 'dc3',
        numeral: 'IV',
        surtitre: 'Temoignages',
        titre: "Ce qu'ils en disent",
        description: 'Des centaines de consultations. Quelques voix recueillies avec leur accord.',
      },
      {
        _key: 'dc4',
        numeral: 'V',
        surtitre: 'Contact',
        titre: 'Reserver une consultation',
        description:
          "Paiement securise en ligne. Confirmation sous 24h. Annulation jusqu'a 24h avant.",
      },
    ],
    servicesSurtitre: 'Formules de consultation',
    servicesTitre: 'Plusieurs facons de',
    servicesTitreItalique: 'vous accompagner.',
    servicesSousTitre:
      'Paiement securise en ligne, Confirmation sous 24h, Annulation jusqu\'a 24h avant',
    discretionSurtitre: 'Votre visite vous appartient',
    discretionTitre: 'Venez en toute',
    discretionTitreItalique: 'discretion.',
    discretionPiliers: [
      {
        _key: 'dp0',
        titre: 'Anonymat total',
        texte:
          'Personne ne sait que vous avez consulte. Vos coordonnees restent strictement privees, jamais transmises ni conservees.',
      },
      {
        _key: 'dp1',
        titre: 'Confidentialite absolue',
        texte:
          'Ce qui est dit dans la seance reste entre vous et Jocelyn. Aucun enregistrement, aucune note conservee apres la consultation.',
      },
      {
        _key: 'dp2',
        titre: 'Sans jugement',
        texte:
          'Venez avec vos doutes, vos peurs, vos questions les plus intimes. Ce que vous portez ne sera jamais minimise ni commente en dehors.',
      },
    ],
    mediasSurtitre: 'Medias et presse',
    mediasTitre: 'Trente ans',
    mediasTitreItalique: 'sous les projecteurs.',
    mediasDescription:
      'Presence hebdomadaire a la television reunionnaise depuis quinze ans. Une carriere mediatique construite sur la duree.',
    avisSurtitre: 'Temoignages video',
    avisTitre: "Ce qu'en disent",
    avisTitreItalique: "celles et ceux que j'ai accompagnes.",
    faqSurtitre: 'Avant de prendre rendez-vous',
    faqTitre: 'Vos questions,',
    faqTitreItalique: 'mes reponses.',
  },
  {
    _id: 'pageServices',
    _type: 'pageServices',
    surtitre: 'Formules de consultation',
    titre: 'Plusieurs facons de',
    titreItalique: 'vous accompagner.',
    description: 'Paiement securise en ligne, Confirmation sous 24h, Annulation jusqu\'a 24h avant.',
    formules: [
      {
        _key: 'f0',
        surtitre: 'Au cabinet ou a distance',
        titre: 'Une heure',
        duree: '1 heure',
        prix: '120',
        accroche:
          'La consultation complete : au cabinet a Saint-Clotilde ou a distance, au meme tarif. Les quatre methodes combinees, sans precipitation.',
        features: [
          'Au cabinet a Saint-Clotilde ou a distance',
          'Clairvoyance, clairaudience, tirage, support',
          'Photos, courriers, objets bienvenus',
        ],
        tag: 'Recommande',
        labelCta: 'Reserver en ligne',
      },
      {
        _key: 'f1',
        surtitre: 'Par telephone, partout',
        titre: '30 minutes',
        duree: '30 min',
        prix: '85',
        accroche:
          "Une seance condensee, uniquement par telephone. Depuis La Reunion, l'Ile Maurice, la metropole ou n'importe ou.",
        features: [
          'Consultation par telephone uniquement',
          'Memes methodes que le cabinet, en condense',
          'Ideal pour les emplois du temps charges',
        ],
        tag: '',
        labelCta: 'Reserver en ligne',
      },
      {
        _key: 'f2',
        surtitre: 'Accompagnement personnel',
        titre: 'Coaching de vie',
        duree: 'Sur mesure',
        prix: 'Sur mesure',
        accroche:
          'Un suivi personnalise pour surmonter les obstacles, retrouver confiance en soi et avancer vers vos objectifs.',
        features: [
          'Ecoute active et empathique, sans jugement',
          'Estime de soi, reconversion, relations',
          'Complement aux consultations de voyance',
        ],
        tag: 'Nouveau',
        labelCta: 'Nous contacter',
      },
      {
        _key: 'f3',
        surtitre: 'Suivi dans la duree',
        titre: 'Seances regulieres',
        duree: 'Sur mesure',
        prix: 'Sur mesure',
        accroche:
          "Vous souhaitez consulter plusieurs fois dans l'annee ? Beneficiez d'un tarif preferentiel pour un accompagnement suivi.",
        features: [
          'Tarif preferentiel sur vos consultations',
          'Formule au cabinet ou a distance',
          'Devis personnalise selon votre rythme',
        ],
        tag: '',
        labelCta: 'Nous contacter',
      },
    ],
  },
  {
    _id: 'pageMethodes',
    _type: 'pageMethodes',
    heroSurtitre: 'Methodes de travail',
    heroTitre: 'Quatre voies,',
    heroTitreItalique: 'une lecture.',
    heroDescription: 'Cliquez sur une methode pour en decouvrir le fonctionnement.',
    methodes: [
      {
        _key: 'm0',
        numeral: 'I',
        teaser: 'Je vois.',
        titre: 'Clairvoyance',
        definition:
          "La capacite a percevoir des images, des scenes et des flashs visuels lies au passe, au present ou a l'avenir.",
        description: '',
        exemples: [],
      },
      {
        _key: 'm1',
        numeral: 'II',
        teaser: "J'entends.",
        titre: 'Clairaudience',
        definition: '',
        description: '',
        exemples: [],
      },
      {
        _key: 'm2',
        numeral: 'III',
        teaser: 'Je lis.',
        titre: 'Tirage de cartes',
        definition: '',
        description: '',
        exemples: [],
      },
      {
        _key: 'm3',
        numeral: 'IV',
        teaser: 'Je capte.',
        titre: 'Voyance sur support',
        definition: '',
        description: '',
        exemples: [],
      },
    ],
    citationTexte:
      "Je ne choisis pas d'utiliser une methode plutot qu'une autre. Elles s'activent naturellement, selon ce que la seance demande.",
    citationAuteur: 'Jocelyn Amir',
  },
  {
    _id: 'pageAPropos',
    _type: 'pageAPropos',
    frise: [
      'Debut, Prix presse a Marseille',
      'Prix meilleur voyant, Grenoble',
      'Prix meilleur voyant medium, Creteil',
      'Festival de Cannes, deux editions',
      'Emission hebdo, Tele Kreol',
      'Medium et coach, Saint-Clotilde',
    ],
    bioParagraphes: [],
    bioCitation: "On n'echappe pas a son destin mediatique.",
    croyancesTitre: 'Ce en quoi je crois',
    croyances: [
      {_key: 'c0', titre: 'Precision', texte: 'Des elements verifiables, pas des banalites.'},
      {_key: 'c1', titre: 'Honnetete', texte: 'Je dis ce que je vois. Ni plus, ni moins.'},
      {_key: 'c2', titre: 'Liberte', texte: "Rien n'est fige. Vos choix restent les votres."},
    ],
    coachingSurtitre: 'Une demarche complementaire',
    coachingTitre: 'Coach de vie et developpement personnel.',
    coachingTitreItalique: '',
    coachingDescription: '',
    coachingLabelCta: 'Nous contacter',
    coachingPiliers: [
      {_key: 'cp0', titre: 'Ecoute sans jugement', texte: ''},
      {_key: 'cp1', titre: 'Objectifs concrets', texte: ''},
      {_key: 'cp2', titre: 'Complementaire a la voyance', texte: ''},
    ],
  },
  {
    _id: 'pageMedias',
    _type: 'pageMedias',
    surtitre: 'Agenda permanent',
    titre: 'Presence mediatique',
    titreItalique: 'reguliere.',
    medias: [
      {
        _key: 'md0',
        label: 'TV',
        nom: 'Tele Kreol',
        description:
          'En direct depuis 2010, Jocelyn repond aux questions des telespectateurs reunionnais sur la mediumnite et la voyance.',
        frequence: 'Chaque mercredi',
        lieu: '19h30, La Reunion',
      },
      {
        _key: 'md1',
        label: 'Radio',
        nom: 'Kreol FM',
        description:
          'Des emissions consacrees a la spiritualite, aux traditions reunionnaises et a la voyance.',
        frequence: 'Interventions regulieres',
        lieu: 'La Reunion',
      },
    ],
    nationaleSurtitre: 'Presence nationale',
    nationaleTitre: 'Du Festival de Cannes',
    nationaleTitreItalique: 'aux plateaux tele.',
    nationaleDescription:
      "Present au Festival de Cannes en 2000 et 2001, une reconnaissance nationale de sa pratique. Aujourd'hui, Jocelyn continue de passer regulierement a la television.",
    distinctions: [
      {_key: 'di0', annee: '1994', label: 'Prix de la presse et des medias', lieu: 'Marseille'},
      {_key: 'di1', annee: '1996', label: 'Prix du public du meilleur voyant', lieu: 'Grenoble'},
      {_key: 'di2', annee: '1997', label: 'Prix du meilleur voyant medium', lieu: 'Creteil'},
      {_key: 'di3', annee: '2000', label: 'Festival de Cannes', lieu: 'Cannes'},
      {_key: 'di4', annee: '2001', label: '2e Festival de Cannes', lieu: 'Cannes'},
    ],
    labelCta1: 'Mon parcours complet',
    labelCta2: 'Reserver',
  },
  {
    _id: 'pageReserver',
    _type: 'pageReserver',
    surtitre: 'Reservation en ligne',
    titre: 'Choisissez votre formule.',
    titreItalique: '',
    banniereTitre: 'La reservation se fait exclusivement en ligne.',
    banniereTexte:
      'Les messages et appels ne permettent pas de bloquer un creneau. Choisissez votre formule ci-dessous pour acceder au formulaire et au paiement securise.',
    formules: [
      {
        _key: 'rf0',
        surtitre: 'Au cabinet ou a distance',
        titre: 'Une heure',
        description:
          'Une heure complete, dans mon bureau zen a Saint-Clotilde ou a distance, au meme tarif. Les quatre methodes combinees sans precipitation.',
        features: [
          "Consultation d'une heure pleine, au cabinet ou a distance",
          'Quatre methodes combinees en une seance',
          'Photos, courriers ou objets bienvenus',
          'Recap oral a la fin de la seance',
        ],
        duree: '1 heure',
        prix: '120',
        labelCta: 'Reserver en ligne',
      },
      {
        _key: 'rf1',
        surtitre: 'Par telephone, partout',
        titre: '30 minutes',
        description:
          "Trente minutes par telephone, depuis La Reunion, l'Ile Maurice, la metropole ou n'importe ou.",
        features: [
          'Consultation de 30 minutes par telephone uniquement',
          "Jocelyn vous appelle a l'heure du rendez-vous",
          'Memes methodes que le cabinet, en condense',
          'Aucun deplacement, ou que vous soyez',
        ],
        duree: '30 minutes',
        prix: '85',
        labelCta: 'Reserver en ligne',
      },
    ],
    regulieresSurtitre: 'Suivi dans la duree',
    regulieresTitre: 'Seances regulieres, tarif preferentiel',
    regulieresDescription:
      "Vous souhaitez consulter plusieurs fois dans l'annee ? Un tarif preferentiel s'applique pour un accompagnement suivi, au cabinet ou a distance. Le detail se fait sur devis, selon votre rythme.",
    regulieresLabelCta: 'Demander un devis',
    autreSurtitre: 'Autre demande',
    autreTitre: 'Coaching de vie ou question specifique ?',
    autreDescription:
      'Pour un accompagnement coaching, une question avant de reserver, ou toute autre demande, contactez directement Jocelyn.',
    autreLabelContact: 'Envoyer un message',
    autreLabelTel: 'Appeler',
    noteFooter:
      "Paiement securise. Apres le reglement, vous etes recontacte sous 24h pour confirmer votre rendez-vous. Annulation possible jusqu'a 24h avant.",
  },
  {
    _id: 'pageReserverCabinet',
    _type: 'pageReserverCabinet',
    surtitre: 'Reservation, Une heure',
    titre: 'Confirmez et reglez votre seance',
    descriptionPaiement:
      'Le paiement securise valide definitivement votre rendez-vous. Vous indiquez vos coordonnees au moment du reglement et precisez si la seance a lieu au cabinet ou a distance.',
    labelFormule: 'Formule selectionnee',
    detailFormule: 'Une heure (cabinet ou a distance)',
    features: [
      'Quatre methodes combinees en une seule seance',
      'Au cabinet a Saint-Clotilde ou a distance',
      'Photos, courriers ou objets bienvenus',
      'Recap oral a la fin de la seance',
    ],
    prix: 120,
  },
  {
    _id: 'pageReserverDistance',
    _type: 'pageReserverDistance',
    surtitre: 'Reservation, 30 minutes par telephone',
    titre: 'Confirmez et reglez votre seance',
    descriptionPaiement:
      "Le paiement securise valide votre rendez-vous. Vous indiquez vos coordonnees au moment du reglement, Jocelyn vous appelle a l'heure convenue.",
    labelFormule: 'Formule selectionnee',
    detailFormule: 'Par telephone (30 minutes)',
    features: [
      'Consultation de 30 minutes par telephone',
      "Jocelyn vous appelle a l'heure du rendez-vous",
      'Memes methodes que le cabinet, en condense',
      'Aucun deplacement, ou que vous soyez',
    ],
    prix: 85,
  },
  {
    _id: 'pageContact',
    _type: 'pageContact',
    enteteSurtitre: 'Contact',
    enteteTitre: 'Ecrivez a Jocelyn.',
    enteteTitreItalique: '',
    enteteDescription:
      'Une question avant de reserver ? Reponse sous 24h. La reservation, elle, se fait en ligne.',
    reservationSurtitre: 'Reserver maintenant',
    reservationTitre: 'Choisissez votre formule.',
    reservationOption1: 'Une heure, cabinet ou a distance, 120 euros',
    reservationOption2: '30 min, par telephone, 85 euros',
    coordEmail: 'contact@jocelynamir.com',
    coordTelephone: '+262 692 81 36 06',
    coordVille: 'Saint-Clotilde',
    coordRegion: 'La Reunion (974)',
    confidentialiteTitre: 'Confidentialite garantie.',
    confidentialiteTexte:
      "Tout ce que vous partagez reste strictement entre nous. Aucune information n'est transmise a un tiers.",
  },
  {
    _id: 'pageActualites',
    _type: 'pageActualites',
    labelFiltrer: 'Filtrer par',
    labelTrier: 'Trier par date',
    messageVide: 'Aucun article dans cette categorie.',
    labelAutresArticles: 'Autres articles',
    labelCtaReserver: 'Reserver une consultation',
    labelCtaQuestion: 'Poser une question',
  },
]

// ---------------------------------------------------------------------------
// ACTUALITES (depuis site/src/lib/actualites-data.ts)
// ---------------------------------------------------------------------------

const actualitesRaw = [
  {
    slug: 'coaching-de-vie-disponible',
    date: '2026',
    annee: 2026,
    tag: 'Coaching',
    tagColor: '#C57B5C',
    titre: 'Coaching de vie disponible',
    resume:
      'A la suite de nombreuses demandes, je propose desormais un accompagnement coaching de vie en complement de mes consultations.',
    contenu: `A la suite de nombreuses demandes de consultants qui souhaitaient un suivi regulier au-dela des seances de voyance, j'ai decide de formaliser une activite que j'exercais deja de maniere naturelle depuis des annees : le coaching de vie.

Ce n'est pas un remplacement de la consultation mediumnique. C'est un complement. La ou la voyance eclaire le chemin, le coaching donne les outils pour l'emprunter.

**Ce que couvre le coaching de vie :**

- Confiance et estime de soi
- Reconversion professionnelle
- Gestion des emotions et du stress
- Relations familiales et amoureuses
- Accompagnement dans l'epanouissement personnel

Le premier echange est un entretien gratuit de 20 minutes pour definir ensemble vos objectifs et voir si la demarche vous correspond. Contactez-moi directement pour en savoir plus.`,
  },
  {
    slug: 'tele-kreol-emission-hebdomadaire',
    date: 'Chaque mercredi, 19h30',
    annee: 2025,
    tag: 'Emissions',
    tagColor: '#1B7A8F',
    titre: 'Tele Kreol, emission hebdomadaire',
    resume:
      'Depuis plus de quinze ans, je reponds en direct aux questions des telespectateurs reunionnais sur la mediumnite et la voyance.',
    contenu: `Depuis 2010, chaque mercredi soir a 19h30, je suis present sur le plateau de Tele Kreol pour repondre en direct aux questions des telespectateurs reunionnais.

Cette emission est nee d'une rencontre avec l'equipe de la chaine, quelques mois apres mon installation a La Reunion. Je ne cherchais pas a m'exposer mediatiquement, mais le bouche a oreille avait fait son travail, et les demandes etaient la.

**Ce qu'on y aborde :**

Tout. Les questions sentimentales, professionnelles, familiales, les deuils, les inquietudes du quotidien. Les gens appellent en direct, je recois les informations et je reponds avec ce que je percois. Pas de mise en scene, pas de script.

Quinze ans apres, le format n'a pas change. L'audience non plus. C'est ce qui me convient le mieux : une pratique directe, sans artifice.`,
  },
  {
    slug: 'kreol-fm-spiritualite-voyance',
    date: 'Regulier',
    annee: 2024,
    tag: 'Emissions',
    tagColor: '#C9A961',
    titre: 'Kreol FM, spiritualite et voyance',
    resume:
      'Des interventions regulieres sur Kreol FM consacrees a la spiritualite et aux traditions reunionnaises.',
    contenu: `En parallele de l'emission televisee sur Tele Kreol, j'interviens regulierement sur Kreol FM, l'une des radios les plus ecoutees de l'ile.

Ces emissions prennent une forme differente : plus longues, plus approfondies. On y parle de spiritualite au sens large, des traditions reunionnaises, de la relation a l'invisible, des pratiques de voyance et de mediumnite dans notre contexte culturel.

La radio permet une autre qualite d'ecoute. Les auditeurs appellent, posent des questions, partagent leurs experiences. C'est un espace d'echange que j'apprecie particulierement.`,
  },
  {
    slug: 'festival-de-cannes',
    date: '2000, 2001',
    annee: 2001,
    tag: 'Medias',
    tagColor: '#2D3142',
    titre: 'Festival de Cannes',
    resume: 'Deux participations consecutives au Festival de Cannes en 2000 et 2001.',
    contenu: `En 2000, puis en 2001, j'ai participe au Festival de Cannes. Deux annees consecutives qui ont marque une etape dans ma carriere mediatique.

Ces participations faisaient suite aux distinctions obtenues a Grenoble en 1996 et a Creteil en 1997. La reconnaissance nationale s'etait construite progressivement, et Cannes en etait l'aboutissement logique pour cette periode.

Ce que j'en retiens surtout : la diversite des personnes rencontrees, venues de milieux tres differents, toutes avec la meme question fondamentale : comprendre ce qui se passe dans leur vie, ce qui les attend, ce qu'elles portent.

Ce besoin de clarte est universel. Il ne depend pas du milieu social, de la culture, de l'age. C'est ce que ces deux annees a Cannes m'ont confirme.`,
  },
  {
    slug: 'prix-meilleur-voyant-medium',
    date: '1996, 1997',
    annee: 1997,
    tag: 'Distinctions',
    tagColor: '#B87333',
    titre: 'Prix du meilleur voyant medium',
    resume:
      'Prix du public du meilleur voyant a Grenoble en 1996, puis Prix du meilleur voyant medium a Creteil en 1997.',
    contenu: `En 1996 a Grenoble, puis en 1997 a Creteil, j'ai recu deux distinctions consacrees par le public : Prix du public du meilleur voyant, puis Prix du meilleur voyant medium.

Ces reconnaissances sont arrivees tot dans ma carriere, deux et trois ans apres mes debuts a Marseille en 1994. Elles ont confirme quelque chose que je savais deja : que la precision prime sur le spectacle.

Les gens ne viennent pas voir un numero. Ils viennent chercher des reponses vraies, des informations qu'ils peuvent verifier. C'est ce que j'ai toujours cherche a donner.

Ces prix m'ont ouvert des portes, le Festival de Cannes notamment, mais ne m'ont pas change dans ma facon de travailler. La pratique reste la meme : ecouter ce qui se transmet et le dire clairement.`,
  },
]

const actualites = actualitesRaw.map((a) => ({
  _id: `actualite-${a.slug}`,
  _type: 'actualite',
  titre: a.titre,
  slug: {_type: 'slug', current: a.slug},
  date: a.date,
  annee: a.annee,
  tag: a.tag,
  tagColor: a.tagColor,
  resume: a.resume,
  contenu: markdownToBlocks(a.contenu),
  statut: 'publie',
}))

// ---------------------------------------------------------------------------
// TEMOIGNAGES (depuis site/src/components/sections/Avis.tsx)
// ---------------------------------------------------------------------------

const temoignagesRaw = [
  {
    nom: 'Sandrine M.',
    lieu: 'Saint-Denis, La Reunion',
    note: 5,
    texte:
      "Jocelyn a une approche tres professionnelle et bienveillante. J'avais des doutes au depart, et il m'a donne des informations precises que personne ne pouvait connaitre. Je recommande vivement.",
    date: 'Il y a 2 mois',
    duree: '1:42',
    accentHex: '#1B7A8F',
  },
  {
    nom: 'Christophe L.',
    lieu: 'Saint-Pierre, La Reunion',
    note: 5,
    texte:
      'Consultation par telephone tres fluide. Aucun jugement, juste une vraie ecoute. Les elements donnes se sont verifies dans les semaines qui ont suivi. Merci pour cette honnetete qui change.',
    date: 'Il y a 3 mois',
    duree: '2:08',
    accentHex: '#C9A961',
  },
  {
    nom: 'Emilie R.',
    lieu: 'Port-Louis, Ile Maurice',
    note: 5,
    texte:
      "J'ai consulte a distance depuis Maurice. Aussi precis qu'en presentiel. Jocelyn ne dit pas ce qu'on a envie d'entendre, il dit ce qu'il voit. C'est rare et precieux.",
    date: 'Il y a 6 mois',
    duree: '1:25',
    accentHex: '#C57B5C',
  },
  {
    nom: 'Patrick D.',
    lieu: 'Saint-Clotilde, La Reunion',
    note: 5,
    texte:
      "Ambiance zen au cabinet, aucune mise en scene. On sent quelqu'un qui maitrise vraiment son sujet depuis longtemps. Les conseils donnes m'ont fait gagner du temps et de l'argent, comme promis.",
    date: 'Il y a 1 mois',
    duree: '2:31',
    accentHex: '#1B7A8F',
  },
  {
    nom: 'Nadia B.',
    lieu: 'Le Tampon, La Reunion',
    note: 5,
    texte:
      "Une consultation qui m'a apaisee. Jocelyn m'a parle avec franchise mais sans jamais me brusquer. Plusieurs choses qu'il a vues se sont confirmees depuis. Merci pour cette clarte.",
    date: 'Il y a 4 mois',
    duree: '1:58',
    accentHex: '#B87333',
  },
]

const temoignages = temoignagesRaw.map((t, i) => ({
  _id: `temoignage-0${i + 1}`,
  _type: 'temoignage',
  nom: t.nom,
  lieu: t.lieu,
  note: t.note,
  texte: t.texte,
  date: t.date,
  duree: t.duree,
  accentHex: t.accentHex,
  statut: 'publie',
}))

// ---------------------------------------------------------------------------
// EXECUTION
// ---------------------------------------------------------------------------

async function run() {
  const docs = [...singletons, ...actualites, ...temoignages]
  let tx = client.transaction()
  for (const doc of docs) {
    tx = tx.createOrReplace(doc)
  }
  await tx.commit()

  console.log('Import termine.')
  console.log(`  Singletons   : ${singletons.length}`)
  console.log(`  Actualites   : ${actualites.length}`)
  console.log(`  Temoignages  : ${temoignages.length}`)
  console.log(`  TOTAL        : ${docs.length} documents crees/remplaces.`)
}

run().catch((err) => {
  console.error("Echec de l'import :", err.message)
  process.exit(1)
})
