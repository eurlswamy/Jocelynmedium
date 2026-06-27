import {createClient} from '@sanity/client'

// Ré-applique en base toutes les valeurs de contenu francais AVEC leurs accents.
// Reprend la structure de import.mjs / patch-videos.mjs, accents corriges.

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('ERREUR : SANITY_TOKEN absent. export SANITY_TOKEN="..." puis relancer.')
  process.exit(1)
}

const client = createClient({
  projectId: 'ji3lirnr',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token,
  useCdn: false,
})

const singletons = [
  {
    _id: 'pageAccueil',
    _type: 'pageAccueil',
    heroBadge: 'Médium voyant, La Réunion, depuis 1994',
    heroTitre: 'Voir',
    heroTitreItalique: 'au-delà',
    heroTitreSuite: ' des portes du visible.',
    heroDescription:
      'Trente ans de pratique. Quatre méthodes combinées. Une heure de consultation pour des informations concrètes, pas des prédictions floues.',
    heroCta1: 'Réserver une consultation',
    heroCta2: 'Mon parcours',
    introSurtitre: 'Qui je suis',
    introTitre: "Je m'appelle Jocelyn.",
    introTitreItalique: 'Médium depuis 1994',
    introDescription:
      "Je vous reçois à Saint-Clotilde, à La Réunion. Je vous accompagne aussi par téléphone et en visio, où que vous soyez dans l'Océan Indien. Au cours d'une consultation d'une heure, je combine quatre approches : clairvoyance, clairaudience, tirage de cartes, et voyance sur photo ou document.",
    introStats: [
      {_key: 'st0', valeur: '30+', label: 'Années de pratique'},
      {_key: 'st1', valeur: '4', label: 'Méthodes combinées'},
      {_key: 'st2', valeur: '1h', label: 'Par consultation'},
      {_key: 'st3', valeur: '15 ans', label: "À l'antenne TV"},
    ],
    discoverBadge: 'Explorer le site',
    discoverTitre: 'Cinq seuils',
    discoverTitreItalique: 'à franchir.',
    discoverDescription:
      'Chaque page approfondit un aspect de la pratique : ce que je propose, comment je travaille, qui je suis, et comment me contacter.',
    discoverCartes: [
      {
        _key: 'dc0',
        numeral: 'I',
        surtitre: 'Services et tarifs',
        titre: 'Deux formules',
        description:
          'Une heure au cabinet ou à distance (120 euros), ou 30 minutes par téléphone (85 euros).',
      },
      {
        _key: 'dc1',
        numeral: 'II',
        surtitre: 'Méthodes',
        titre: 'Quatre approches',
        description:
          'Clairvoyance, clairaudience, tirage de cartes, voyance sur photo. Quatre approches combinées en une heure.',
      },
      {
        _key: 'dc2',
        numeral: 'III',
        surtitre: 'À propos',
        titre: 'Trente ans de pratique',
        description:
          'Plus jeune médium de France à 23 ans. Festival de Cannes. Émission Télé Kreol depuis 15 ans.',
      },
      {
        _key: 'dc3',
        numeral: 'IV',
        surtitre: 'Témoignages',
        titre: "Ce qu'ils en disent",
        description: 'Des centaines de consultations. Quelques voix recueillies avec leur accord.',
      },
      {
        _key: 'dc4',
        numeral: 'V',
        surtitre: 'Contact',
        titre: 'Réserver une consultation',
        description:
          "Paiement sécurisé en ligne. Confirmation sous 24h. Annulation jusqu'à 24h avant.",
      },
    ],
    servicesSurtitre: 'Formules de consultation',
    servicesTitre: 'Plusieurs façons de',
    servicesTitreItalique: 'vous accompagner.',
    servicesSousTitre:
      "Paiement sécurisé en ligne, Confirmation sous 24h, Annulation jusqu'à 24h avant",
    discretionSurtitre: 'Votre visite vous appartient',
    discretionTitre: 'Venez en toute',
    discretionTitreItalique: 'discrétion.',
    discretionPiliers: [
      {
        _key: 'dp0',
        titre: 'Anonymat total',
        texte:
          'Personne ne sait que vous avez consulté. Vos coordonnées restent strictement privées, jamais transmises ni conservées.',
      },
      {
        _key: 'dp1',
        titre: 'Confidentialité absolue',
        texte:
          'Ce qui est dit dans la séance reste entre vous et Jocelyn. Aucun enregistrement, aucune note conservée après la consultation.',
      },
      {
        _key: 'dp2',
        titre: 'Sans jugement',
        texte:
          'Venez avec vos doutes, vos peurs, vos questions les plus intimes. Ce que vous portez ne sera jamais minimisé ni commenté en dehors.',
      },
    ],
    mediasSurtitre: 'Médias et presse',
    mediasTitre: 'Trente ans',
    mediasTitreItalique: 'sous les projecteurs.',
    mediasDescription:
      'Présence hebdomadaire à la télévision réunionnaise depuis quinze ans. Une carrière médiatique construite sur la durée.',
    avisSurtitre: 'Témoignages vidéo',
    avisTitre: "Ce qu'en disent",
    avisTitreItalique: "celles et ceux que j'ai accompagnés.",
    faqSurtitre: 'Avant de prendre rendez-vous',
    faqTitre: 'Vos questions,',
    faqTitreItalique: 'mes réponses.',
    methodesApercuSurtitre: 'Comment je travaille',
    methodesApercuTitre: 'Quatre approches,',
    methodesApercuTitreItalique: 'une heure.',
    methodesApercuDescription:
      'Quatre méthodes combinées dans une seule consultation. Pas de prédictions floues : des éléments concrets et vérifiables.',
    apercuMethodes: [
      {
        _key: 'am0',
        titre: 'Clairvoyance',
        description: 'Des images, des flashs, des scènes liées à votre passé, présent ou avenir.',
      },
      {
        _key: 'am1',
        titre: 'Clairaudience',
        description: "Voix, prénoms, phrases courtes captés à l'oreille intérieure.",
      },
      {
        _key: 'am2',
        titre: 'Tirage de cartes',
        description: 'Tarots et oracles, en complément, pour structurer les visions.',
      },
      {
        _key: 'am3',
        titre: 'Voyance sur support',
        description: 'Une photo, un courrier, un objet personnel : informations par contact.',
      },
    ],
    faqQuestions: [
      {
        _key: 'fq0',
        question: 'Comment se déroule une consultation ?',
        reponse:
          "Le plus simplement et naturellement possible. Mon bureau est zen et chaleureux. À vous de vous détendre. La consultation commence rapidement : des choses surprenantes, parfois difficiles à croire, seront dites. C'est normal. Je vous guide, j'éclaire votre chemin, je projette une lumière sur votre avenir. Rien n'est figé, tout peut évoluer selon vos choix.",
      },
      {
        _key: 'fq1',
        question: "Faut-il préparer quelque chose à l'avance ?",
        reponse:
          'Non. Vous venez tel que vous êtes. Vous pouvez apporter une photo ou un document si vous voulez consulter sur une personne ou une situation précise. Sinon, je travaille directement avec vous, sans support.',
      },
      {
        _key: 'fq2',
        question: 'Puis-je consulter à distance ?',
        reponse:
          "Oui. Les consultations téléphoniques de 30 minutes sont disponibles. La précision est identique : la voyance ne dépend pas de la proximité physique. C'est idéal si vous êtes à l'Île Maurice, en métropole, ou ailleurs.",
      },
      {
        _key: 'fq3',
        question: 'Comment payer ?',
        reponse:
          'Le paiement se fait directement en ligne lors de la réservation, par carte bancaire (Visa, Mastercard, Apple Pay, Google Pay). Paiement 100% sécurisé via Stripe. Une fois le paiement effectué, vous êtes recontacté sous 24h pour confirmer votre rendez-vous et convenir du créneau.',
      },
      {
        _key: 'fq4',
        question: 'Puis-je annuler ?',
        reponse:
          "Oui, jusqu'à 24h avant la consultation, sans frais. Au-delà, l'acompte n'est pas remboursable, mais le rendez-vous peut être reporté une fois si vous me prévenez à temps.",
      },
      {
        _key: 'fq5',
        question: 'Le secret professionnel est-il garanti ?',
        reponse:
          "Absolument. Tout l'entretien est strictement confidentiel. Je n'évoque jamais ce qui se dit en consultation avec qui que ce soit. Mieux vaut consulter seul, pour vous, pour la qualité du travail.",
      },
      {
        _key: 'fq6',
        question: 'Que faire si je suis bouleversé après la consultation ?',
        reponse:
          "C'est normal. Une consultation provoque des émotions, joyeuses ou tristes : on fait remonter de vieux souvenirs, parfois des épreuves enfouies. Prenez le temps, parlez à un proche. Et soyez vraiment sûr de vous avant de prendre rendez-vous.",
      },
      {
        _key: 'fq7',
        question: 'Proposez-vous autre chose que de la voyance ?',
        reponse:
          "Oui. À la suite de nombreuses demandes de consultants souhaitant un suivi régulier, je propose désormais un accompagnement coaching de vie et développement personnel. Estime de soi, reconversion, relations, gestion des émotions, épanouissement : un espace d'écoute bienveillant et orienté action. Ce service est complémentaire à la voyance, il ne s'y substitue pas, et ne remplace pas non plus un suivi psychologique ou médical.",
      },
    ],
  },
  {
    _id: 'pageServices',
    _type: 'pageServices',
    surtitre: 'Formules de consultation',
    titre: 'Plusieurs façons de',
    titreItalique: 'vous accompagner.',
    description: "Paiement sécurisé en ligne, Confirmation sous 24h, Annulation jusqu'à 24h avant.",
    formules: [
      {
        _key: 'f0',
        surtitre: 'Au cabinet ou à distance',
        titre: 'Une heure',
        duree: '1 heure',
        prix: '120',
        accroche:
          'La consultation complète : au cabinet à Saint-Clotilde ou à distance, au même tarif. Les quatre méthodes combinées, sans précipitation.',
        features: [
          'Au cabinet à Saint-Clotilde ou à distance',
          'Clairvoyance, clairaudience, tirage, support',
          'Photos, courriers, objets bienvenus',
        ],
        tag: 'Recommandé',
        labelCta: 'Réserver en ligne',
      },
      {
        _key: 'f1',
        surtitre: 'Par téléphone, partout',
        titre: '30 minutes',
        duree: '30 min',
        prix: '85',
        accroche:
          "Une séance condensée, uniquement par téléphone. Depuis La Réunion, l'Île Maurice, la métropole ou n'importe où.",
        features: [
          'Consultation par téléphone uniquement',
          'Mêmes méthodes que le cabinet, en condensé',
          'Idéal pour les emplois du temps chargés',
        ],
        tag: '',
        labelCta: 'Réserver en ligne',
      },
      {
        _key: 'f2',
        surtitre: 'Accompagnement personnel',
        titre: 'Coaching de vie',
        duree: 'Sur mesure',
        prix: 'Sur mesure',
        accroche:
          'Un suivi personnalisé pour surmonter les obstacles, retrouver confiance en soi et avancer vers vos objectifs.',
        features: [
          'Écoute active et empathique, sans jugement',
          'Estime de soi, reconversion, relations',
          'Complément aux consultations de voyance',
        ],
        tag: 'Nouveau',
        labelCta: 'Nous contacter',
      },
      {
        _key: 'f3',
        surtitre: 'Suivi dans la durée',
        titre: 'Séances régulières',
        duree: 'Sur mesure',
        prix: 'Sur mesure',
        accroche:
          "Vous souhaitez consulter plusieurs fois dans l'année ? Bénéficiez d'un tarif préférentiel pour un accompagnement suivi.",
        features: [
          'Tarif préférentiel sur vos consultations',
          'Formule au cabinet ou à distance',
          'Devis personnalisé selon votre rythme',
        ],
        tag: '',
        labelCta: 'Nous contacter',
      },
    ],
  },
  {
    _id: 'pageMethodes',
    _type: 'pageMethodes',
    heroSurtitre: 'Méthodes de travail',
    heroTitre: 'Quatre voies,',
    heroTitreItalique: 'une lecture.',
    heroDescription: 'Cliquez sur une méthode pour en découvrir le fonctionnement.',
    methodes: [
      {
        _key: 'm0',
        numeral: 'I',
        teaser: 'Je vois.',
        titre: 'Clairvoyance',
        definition:
          "La capacité à percevoir des images, des scènes et des flashs visuels liés au passé, au présent ou à l'avenir.",
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
      "Je ne choisis pas d'utiliser une méthode plutôt qu'une autre. Elles s'activent naturellement, selon ce que la séance demande.",
    citationAuteur: 'Jocelyn Amir',
  },
  {
    _id: 'pageAPropos',
    _type: 'pageAPropos',
    frise: [
      'Début, Prix presse à Marseille',
      'Prix meilleur voyant, Grenoble',
      'Prix meilleur voyant médium, Créteil',
      'Festival de Cannes, deux éditions',
      'Émission hebdo, Télé Kreol',
      'Médium et coach, Saint-Clotilde',
    ],
    bioParagraphes: [],
    bioCitation: "On n'échappe pas à son destin médiatique.",
    croyancesTitre: 'Ce en quoi je crois',
    croyances: [
      {_key: 'c0', titre: 'Précision', texte: 'Des éléments vérifiables, pas des banalités.'},
      {_key: 'c1', titre: 'Honnêteté', texte: 'Je dis ce que je vois. Ni plus, ni moins.'},
      {_key: 'c2', titre: 'Liberté', texte: "Rien n'est figé. Vos choix restent les vôtres."},
    ],
    coachingSurtitre: 'Une démarche complémentaire',
    coachingTitre: 'Coach de vie et développement personnel.',
    coachingTitreItalique: '',
    coachingDescription: '',
    coachingLabelCta: 'Nous contacter',
    coachingPiliers: [
      {_key: 'cp0', titre: 'Écoute sans jugement', texte: ''},
      {_key: 'cp1', titre: 'Objectifs concrets', texte: ''},
      {_key: 'cp2', titre: 'Complémentaire à la voyance', texte: ''},
    ],
  },
  {
    _id: 'pageMedias',
    _type: 'pageMedias',
    surtitre: 'Agenda permanent',
    titre: 'Présence médiatique',
    titreItalique: 'régulière.',
    medias: [
      {
        _key: 'md0',
        label: 'TV',
        nom: 'Télé Kreol',
        description:
          'En direct depuis 2010, Jocelyn répond aux questions des téléspectateurs réunionnais sur la médiumnité et la voyance.',
        frequence: 'Chaque mercredi',
        lieu: '19h30, La Réunion',
      },
      {
        _key: 'md1',
        label: 'Radio',
        nom: 'Kreol FM',
        description:
          'Des émissions consacrées à la spiritualité, aux traditions réunionnaises et à la voyance.',
        frequence: 'Interventions régulières',
        lieu: 'La Réunion',
      },
    ],
    videosSurtitre: 'À revoir en vidéo',
    videosTitre: 'Jocelyn à la télévision',
    videos: [
      {
        _key: 'vid0',
        titre: 'Jocelyn en direct à la télévision',
        description: 'Émission en direct à revoir.',
        lien: 'https://www.facebook.com/share/v/19EXTwkeGN/',
      },
      {
        _key: 'vid1',
        titre: 'Rediffusion : passage télévisé',
        description: 'Un de ses passages à revoir.',
        lien: 'https://www.facebook.com/share/v/1BQRfTSB5p/',
      },
      {
        _key: 'vid2',
        titre: "Jocelyn à l'antenne",
        description: 'Une autre émission à revoir.',
        lien: 'https://www.facebook.com/share/v/1LJXM3pND9/',
      },
      {
        _key: 'vid3',
        titre: 'Jocelyn à la télévision',
        description: 'Un passage télévisé à revoir.',
        lien: 'https://www.facebook.com/share/v/18jez5wTEu/',
      },
    ],
    nationaleSurtitre: 'Présence nationale',
    nationaleTitre: 'Du Festival de Cannes',
    nationaleTitreItalique: 'aux plateaux télé.',
    nationaleDescription:
      "Présent au Festival de Cannes en 2000 et 2001, une reconnaissance nationale de sa pratique. Aujourd'hui, Jocelyn continue de passer régulièrement à la télévision.",
    distinctions: [
      {_key: 'di0', annee: '1994', label: 'Prix de la presse et des médias', lieu: 'Marseille'},
      {_key: 'di1', annee: '1996', label: 'Prix du public du meilleur voyant', lieu: 'Grenoble'},
      {_key: 'di2', annee: '1997', label: 'Prix du meilleur voyant médium', lieu: 'Créteil'},
      {_key: 'di3', annee: '2000', label: 'Festival de Cannes', lieu: 'Cannes'},
      {_key: 'di4', annee: '2001', label: '2e Festival de Cannes', lieu: 'Cannes'},
    ],
    labelCta1: 'Mon parcours complet',
    labelCta2: 'Réserver',
  },
  {
    _id: 'pageReserver',
    _type: 'pageReserver',
    surtitre: 'Réservation en ligne',
    titre: 'Choisissez votre formule.',
    titreItalique: '',
    banniereTitre: 'La réservation se fait exclusivement en ligne.',
    banniereTexte:
      'Les messages et appels ne permettent pas de bloquer un créneau. Choisissez votre formule ci-dessous pour accéder au formulaire et au paiement sécurisé.',
    formules: [
      {
        _key: 'rf0',
        surtitre: 'Au cabinet ou à distance',
        titre: 'Une heure',
        description:
          'Une heure complète, dans mon bureau zen à Saint-Clotilde ou à distance, au même tarif. Les quatre méthodes combinées sans précipitation.',
        features: [
          "Consultation d'une heure pleine, au cabinet ou à distance",
          'Quatre méthodes combinées en une séance',
          'Photos, courriers ou objets bienvenus',
          'Récap oral à la fin de la séance',
        ],
        duree: '1 heure',
        prix: '120',
        labelCta: 'Réserver en ligne',
      },
      {
        _key: 'rf1',
        surtitre: 'Par téléphone, partout',
        titre: '30 minutes',
        description:
          "Trente minutes par téléphone, depuis La Réunion, l'Île Maurice, la métropole ou n'importe où.",
        features: [
          'Consultation de 30 minutes par téléphone uniquement',
          "Jocelyn vous appelle à l'heure du rendez-vous",
          'Mêmes méthodes que le cabinet, en condensé',
          'Aucun déplacement, où que vous soyez',
        ],
        duree: '30 minutes',
        prix: '85',
        labelCta: 'Réserver en ligne',
      },
    ],
    regulieresSurtitre: 'Suivi dans la durée',
    regulieresTitre: 'Séances régulières, tarif préférentiel',
    regulieresDescription:
      "Vous souhaitez consulter plusieurs fois dans l'année ? Un tarif préférentiel s'applique pour un accompagnement suivi, au cabinet ou à distance. Le détail se fait sur devis, selon votre rythme.",
    regulieresLabelCta: 'Demander un devis',
    autreSurtitre: 'Autre demande',
    autreTitre: 'Coaching de vie ou question spécifique ?',
    autreDescription:
      'Pour un accompagnement coaching, une question avant de réserver, ou toute autre demande, contactez directement Jocelyn.',
    autreLabelContact: 'Envoyer un message',
    autreLabelTel: 'Appeler',
    noteFooter:
      "Paiement sécurisé. Après le règlement, vous êtes recontacté sous 24h pour confirmer votre rendez-vous. Annulation possible jusqu'à 24h avant.",
  },
  {
    _id: 'pageReserverCabinet',
    _type: 'pageReserverCabinet',
    surtitre: 'Réservation, Une heure',
    titre: 'Confirmez et réglez votre séance',
    descriptionPaiement:
      'Le paiement sécurisé valide définitivement votre rendez-vous. Vous indiquez vos coordonnées au moment du règlement et précisez si la séance a lieu au cabinet ou à distance.',
    labelFormule: 'Formule sélectionnée',
    detailFormule: 'Une heure (cabinet ou à distance)',
    features: [
      'Quatre méthodes combinées en une seule séance',
      'Au cabinet à Saint-Clotilde ou à distance',
      'Photos, courriers ou objets bienvenus',
      'Récap oral à la fin de la séance',
    ],
    prix: 120,
  },
  {
    _id: 'pageReserverDistance',
    _type: 'pageReserverDistance',
    surtitre: 'Réservation, 30 minutes par téléphone',
    titre: 'Confirmez et réglez votre séance',
    descriptionPaiement:
      "Le paiement sécurisé valide votre rendez-vous. Vous indiquez vos coordonnées au moment du règlement, Jocelyn vous appelle à l'heure convenue.",
    labelFormule: 'Formule sélectionnée',
    detailFormule: 'Par téléphone (30 minutes)',
    features: [
      'Consultation de 30 minutes par téléphone',
      "Jocelyn vous appelle à l'heure du rendez-vous",
      'Mêmes méthodes que le cabinet, en condensé',
      'Aucun déplacement, où que vous soyez',
    ],
    prix: 85,
  },
  {
    _id: 'pageContact',
    _type: 'pageContact',
    enteteSurtitre: 'Contact',
    enteteTitre: 'Écrivez à Jocelyn.',
    enteteTitreItalique: '',
    enteteDescription:
      'Une question avant de réserver ? Réponse sous 24h. La réservation, elle, se fait en ligne.',
    reservationSurtitre: 'Réserver maintenant',
    reservationTitre: 'Choisissez votre formule.',
    reservationOption1: 'Une heure, cabinet ou à distance, 120 euros',
    reservationOption2: '30 min, par téléphone, 85 euros',
    coordEmail: 'contact@jocelynamir.com',
    coordTelephone: '+262 692 81 36 06',
    coordVille: 'Saint-Clotilde',
    coordRegion: 'La Réunion (974)',
    confidentialiteTitre: 'Confidentialité garantie.',
    confidentialiteTexte:
      "Tout ce que vous partagez reste strictement entre nous. Aucune information n'est transmise à un tiers.",
  },
  {
    _id: 'pageActualites',
    _type: 'pageActualites',
    labelFiltrer: 'Filtrer par',
    labelTrier: 'Trier par date',
    messageVide: 'Aucun article dans cette catégorie.',
    labelAutresArticles: 'Autres articles',
    labelCtaReserver: 'Réserver une consultation',
    labelCtaQuestion: 'Poser une question',
  },
  {
    _id: 'pageGlobale',
    _type: 'pageGlobale',
    seuilSurtitre: 'Prêt à franchir le seuil',
    seuilTitre: 'Encore une question,',
    seuilTitreItalique: 'ou prêt à réserver ?',
    seuilDescription:
      "Posez-moi votre question par email, ou réservez directement votre créneau. Vous êtes recontacté sous 24h pour confirmer, annulation possible jusqu'à 24h avant le rendez-vous.",
    seuilCtaReserver: 'Réserver une consultation',
    seuilCtaQuestion: 'Poser une question',
    seuilMention1: 'Paiement sécurisé par Stripe',
    seuilMention2: 'Confirmation sous 24h',
    seuilMention3: 'Confidentialité absolue',
    antiClichesCitation: 'Je ne vends pas de rêves. Des faits vérifiables',
    antiClichesCitationItalique: 'au moment même de la séance.',
    antiClichesSuite: 'Pas de sorts, pas de mise en scène, pas de dépendance.',
    antiClichesAuteur: 'Jocelyn Amir Swamy, Médium voyant',
    antiClichesCta1: 'Mon parcours',
    antiClichesCta2: 'Prendre rendez-vous',
    footerTitre: 'JOCELYN AMIR',
    footerDescription:
      'Médium voyant à La Réunion. Clairvoyance, clairaudience, tirage de cartes et voyance sur photo. Au cabinet à Saint-Clotilde ou à distance.',
    footerContactTitre: 'Me contacter',
    footerVille: 'Saint-Clotilde',
    footerRegion: 'La Réunion (974)',
    footerTelephone: '+262 692 81 36 06',
    footerEmail: 'contact@jocelynamir.com',
    footerRetrouveTitre: 'On me retrouve',
    footerTv: 'Télé Kreol, mercredis 19h30',
    footerRadio: 'Kreol FM',
    footerSocial: 'Facebook',
    footerCopyright: '{annee} Jocelyn Amir. Tous droits réservés.',
    footerCredit: 'Créé par Fondationstudio.fr',
  },
]

// ---------------------------------------------------------------------------
// ACTUALITES : on ne touche qu'aux champs texte simples (titre, resume, date),
// via patch.set pour ne pas reconstruire le Portable Text du contenu.
// ---------------------------------------------------------------------------

const actualitesPatch = [
  {
    _id: 'actualite-coaching-de-vie-disponible',
    titre: 'Coaching de vie disponible',
    resume:
      'À la suite de nombreuses demandes, je propose désormais un accompagnement coaching de vie en complément de mes consultations.',
  },
  {
    _id: 'actualite-tele-kreol-emission-hebdomadaire',
    titre: 'Télé Kreol, émission hebdomadaire',
    resume:
      'Depuis plus de quinze ans, je réponds en direct aux questions des téléspectateurs réunionnais sur la médiumnité et la voyance.',
  },
  {
    _id: 'actualite-kreol-fm-spiritualite-voyance',
    titre: 'Kreol FM, spiritualité et voyance',
    resume:
      'Des interventions régulières sur Kreol FM consacrées à la spiritualité et aux traditions réunionnaises.',
  },
  {
    _id: 'actualite-festival-de-cannes',
    titre: 'Festival de Cannes',
    resume: 'Deux participations consécutives au Festival de Cannes en 2000 et 2001.',
  },
  {
    _id: 'actualite-prix-meilleur-voyant-medium',
    titre: 'Prix du meilleur voyant médium',
    resume:
      'Prix du public du meilleur voyant à Grenoble en 1996, puis Prix du meilleur voyant médium à Créteil en 1997.',
  },
]

async function run() {
  // 1) Singletons : createOrReplace (le doc complet, accents corriges)
  let tx = client.transaction()
  for (const doc of singletons) {
    tx = tx.createOrReplace(doc)
  }
  await tx.commit()
  console.log(`Singletons corrigés : ${singletons.length}`)

  // 2) Actualites : patch.set partiel (titre + resume), contenu inchange
  for (const a of actualitesPatch) {
    const {_id, ...fields} = a
    await client.patch(_id).set(fields).commit()
  }
  console.log(`Actualités corrigées : ${actualitesPatch.length}`)

  console.log('Patch accents terminé.')
}

run().catch((err) => {
  console.error('Échec du patch :', err.message)
  process.exit(1)
})
