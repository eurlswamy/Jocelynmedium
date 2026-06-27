import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageAccueil',
  title: "Page d'accueil",
  type: 'document',
  groups: [
    {name: 'hero', title: 'Banniere (haut de page)'},
    {name: 'intro', title: 'Qui je suis'},
    {name: 'discretion', title: 'Discretion'},
    {name: 'medias', title: 'Medias et presse'},
    {name: 'methodesApercu', title: 'Apercu des methodes (accueil)'},
    {name: 'faqHeader', title: 'FAQ (en-tete)'},
    {name: 'faqQuestions', title: 'FAQ (questions et reponses)'},
  ],
  fields: [
    // HERO
    defineField({
      name: 'heroBadge',
      title: 'Surtitre de la banniere',
      description: "Petit texte affiche tout en haut de la page d'accueil, au-dessus du grand titre.",
      type: 'string',
      group: 'hero',
      initialValue: 'Médium voyant, La Réunion, depuis 1994',
    }),
    defineField({
      name: 'heroTitre',
      title: 'Grand titre de la banniere',
      description: "Premier mot du grand titre affiche en haut de la page d'accueil.",
      type: 'string',
      group: 'hero',
      initialValue: 'Voir',
    }),
    defineField({
      name: 'heroTitreItalique',
      title: 'Grand titre, partie en italique',
      description: 'Suite du grand titre, affichee en italique juste apres le premier mot.',
      type: 'string',
      group: 'hero',
      initialValue: 'au-delà',
    }),
    defineField({
      name: 'heroTitreSuite',
      title: 'Grand titre, fin de phrase',
      description: 'Fin du grand titre, affichee apres la partie en italique.',
      type: 'string',
      group: 'hero',
      initialValue: ' des portes du visible.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Court resume de la banniere',
      description: 'Paragraphe affiche sous le grand titre, en haut de la page.',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Trente ans de pratique. Quatre méthodes combinées. Une heure de consultation pour des informations concrètes, pas des prédictions floues.',
    }),
    defineField({
      name: 'heroCta1',
      title: 'Texte du bouton principal',
      description: 'Libelle du premier bouton dans la banniere.',
      type: 'string',
      group: 'hero',
      initialValue: 'Réserver une consultation',
    }),
    defineField({
      name: 'heroCta2',
      title: 'Texte du bouton secondaire',
      description: 'Libelle du second bouton dans la banniere.',
      type: 'string',
      group: 'hero',
      initialValue: 'Mon parcours',
    }),

    // INTRO
    defineField({
      name: 'introSurtitre',
      title: 'Surtitre (section Qui je suis)',
      description: 'Petit texte au-dessus du titre de la section de presentation.',
      type: 'string',
      group: 'intro',
      initialValue: 'Qui je suis',
    }),
    defineField({
      name: 'introTitre',
      title: 'Titre (section Qui je suis)',
      description: 'Titre principal de la section de presentation.',
      type: 'string',
      group: 'intro',
      initialValue: "Je m'appelle Jocelyn.",
    }),
    defineField({
      name: 'introTitreItalique',
      title: 'Titre en italique (section Qui je suis)',
      description: 'Partie du titre affichee en italique.',
      type: 'string',
      group: 'intro',
      initialValue: 'Médium depuis 1994',
    }),
    defineField({
      name: 'introDescription',
      title: 'Texte de presentation',
      description: 'Paragraphe de presentation affiche dans la section Qui je suis.',
      type: 'text',
      rows: 4,
      group: 'intro',
      initialValue:
        "Je vous reçois à Saint-Clotilde, à La Réunion. Je vous accompagne aussi par téléphone et en visio, où que vous soyez dans l'Océan Indien. Au cours d'une consultation d'une heure, je combine quatre approches : clairvoyance, clairaudience, tirage de cartes, et voyance sur photo ou document.",
    }),
    defineField({
      name: 'introStats',
      title: 'Chiffres cles',
      description: 'Les quatre chiffres affiches dans la section de presentation.',
      type: 'array',
      group: 'intro',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'valeur', title: 'Valeur', type: 'string'}),
            defineField({name: 'label', title: 'Legende', type: 'string'}),
          ],
          preview: {select: {title: 'valeur', subtitle: 'label'}},
        }),
      ],
      initialValue: [
        {valeur: '30+', label: 'Années de pratique'},
        {valeur: '4', label: 'Méthodes combinées'},
        {valeur: '1h', label: 'Par consultation'},
        {valeur: '15 ans', label: "À l'antenne TV"},
      ],
    }),

    // DISCRETION
    defineField({
      name: 'discretionSurtitre',
      title: 'Surtitre (section Discretion)',
      type: 'string',
      group: 'discretion',
      initialValue: 'Votre visite vous appartient',
    }),
    defineField({
      name: 'discretionTitre',
      title: 'Titre (section Discretion)',
      type: 'string',
      group: 'discretion',
      initialValue: 'Venez en toute',
    }),
    defineField({
      name: 'discretionTitreItalique',
      title: 'Titre en italique (section Discretion)',
      type: 'string',
      group: 'discretion',
      initialValue: 'discrétion.',
    }),
    defineField({
      name: 'discretionPiliers',
      title: 'Piliers de discretion',
      description: 'Les trois garanties affichees dans la section Discretion.',
      type: 'array',
      group: 'discretion',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'titre', title: 'Titre', type: 'string'}),
            defineField({name: 'texte', title: 'Texte', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'titre'}},
        }),
      ],
      initialValue: [
        {
          titre: 'Anonymat total',
          texte:
            'Personne ne sait que vous avez consulté. Vos coordonnées restent strictement privées, jamais transmises ni conservées.',
        },
        {
          titre: 'Confidentialité absolue',
          texte:
            'Ce qui est dit dans la séance reste entre vous et Jocelyn. Aucun enregistrement, aucune note conservée après la consultation.',
        },
        {
          titre: 'Sans jugement',
          texte:
            'Venez avec vos doutes, vos peurs, vos questions les plus intimes. Ce que vous portez ne sera jamais minimisé ni commenté en dehors.',
        },
      ],
    }),

    // MEDIAS
    defineField({
      name: 'mediasSurtitre',
      title: 'Surtitre (section Medias et presse)',
      type: 'string',
      group: 'medias',
      initialValue: 'Médias et presse',
    }),
    defineField({
      name: 'mediasTitre',
      title: 'Titre (section Medias et presse)',
      type: 'string',
      group: 'medias',
      initialValue: 'Trente ans',
    }),
    defineField({
      name: 'mediasTitreItalique',
      title: 'Titre en italique (section Medias et presse)',
      type: 'string',
      group: 'medias',
      initialValue: 'sous les projecteurs.',
    }),
    defineField({
      name: 'mediasDescription',
      title: 'Texte (section Medias et presse)',
      type: 'text',
      rows: 3,
      group: 'medias',
      initialValue:
        'Présence hebdomadaire à la télévision réunionnaise depuis quinze ans. Une carrière médiatique construite sur la durée.',
    }),

    // APERCU DES METHODES (page d'accueil, section "Comment je travaille")
    defineField({
      name: 'methodesApercuSurtitre',
      title: 'Surtitre (apercu des methodes)',
      description: "Petit texte au-dessus du titre de la section apercu des methodes, sur la page d'accueil.",
      type: 'string',
      group: 'methodesApercu',
      initialValue: 'Comment je travaille',
    }),
    defineField({
      name: 'methodesApercuTitre',
      title: 'Titre (apercu des methodes)',
      description: "Titre de la section apercu des methodes sur la page d'accueil.",
      type: 'string',
      group: 'methodesApercu',
      initialValue: 'Quatre approches,',
    }),
    defineField({
      name: 'methodesApercuTitreItalique',
      title: 'Titre en italique (apercu des methodes)',
      description: 'Partie du titre affichee en italique.',
      type: 'string',
      group: 'methodesApercu',
      initialValue: 'une heure.',
    }),
    defineField({
      name: 'methodesApercuDescription',
      title: 'Texte (apercu des methodes)',
      description: 'Paragraphe sous le titre de la section apercu des methodes.',
      type: 'text',
      rows: 3,
      group: 'methodesApercu',
      initialValue:
        'Quatre méthodes combinées dans une seule consultation. Pas de prédictions floues : des éléments concrets et vérifiables.',
    }),
    defineField({
      name: 'apercuMethodes',
      title: 'Les quatre methodes (apercu)',
      description: "Les quatre methodes affichees en apercu sur la page d'accueil. Le titre et la description sont editables ; les icones restent cote code.",
      type: 'array',
      group: 'methodesApercu',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'titre', title: 'Titre', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'titre'}},
        }),
      ],
      initialValue: [
        {
          titre: 'Clairvoyance',
          description: 'Des images, des flashs, des scènes liées à votre passé, présent ou avenir.',
        },
        {
          titre: 'Clairaudience',
          description: "Voix, prénoms, phrases courtes captés à l'oreille intérieure.",
        },
        {
          titre: 'Tirage de cartes',
          description: 'Tarots et oracles, en complément, pour structurer les visions.',
        },
        {
          titre: 'Voyance sur support',
          description: 'Une photo, un courrier, un objet personnel : informations par contact.',
        },
      ],
    }),

    // FAQ HEADER
    defineField({
      name: 'faqSurtitre',
      title: 'Surtitre (section FAQ)',
      type: 'string',
      group: 'faqHeader',
      initialValue: 'Avant de prendre rendez-vous',
    }),
    defineField({
      name: 'faqTitre',
      title: 'Titre (section FAQ)',
      type: 'string',
      group: 'faqHeader',
      initialValue: 'Vos questions,',
    }),
    defineField({
      name: 'faqTitreItalique',
      title: 'Titre en italique (section FAQ)',
      type: 'string',
      group: 'faqHeader',
      initialValue: 'mes réponses.',
    }),

    // FAQ : liste des questions et reponses
    defineField({
      name: 'faqQuestions',
      title: 'Questions et reponses',
      description: 'Les questions affichees dans la FAQ de la page d\'accueil. Vous pouvez en ajouter, en retirer ou en reordonner.',
      type: 'array',
      group: 'faqQuestions',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string'}),
            defineField({name: 'reponse', title: 'Reponse', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
      initialValue: [
        {
          question: 'Comment se déroule une consultation ?',
          reponse:
            "Le plus simplement et naturellement possible. Mon bureau est zen et chaleureux. À vous de vous détendre. La consultation commence rapidement : des choses surprenantes, parfois difficiles à croire, seront dites. C'est normal. Je vous guide, j'éclaire votre chemin, je projette une lumière sur votre avenir. Rien n'est figé, tout peut évoluer selon vos choix.",
        },
        {
          question: "Faut-il préparer quelque chose à l'avance ?",
          reponse:
            'Non. Vous venez tel que vous êtes. Vous pouvez apporter une photo ou un document si vous voulez consulter sur une personne ou une situation précise. Sinon, je travaille directement avec vous, sans support.',
        },
        {
          question: 'Puis-je consulter à distance ?',
          reponse:
            "Oui. Les consultations téléphoniques de 30 minutes sont disponibles. La précision est identique : la voyance ne dépend pas de la proximité physique. C'est idéal si vous êtes à l'Île Maurice, en métropole, ou ailleurs.",
        },
        {
          question: 'Comment payer ?',
          reponse:
            'Le paiement se fait directement en ligne lors de la réservation, par carte bancaire (Visa, Mastercard, Apple Pay, Google Pay). Paiement 100% sécurisé via Stripe. Une fois le paiement effectué, vous êtes recontacté sous 24h pour confirmer votre rendez-vous et convenir du créneau.',
        },
        {
          question: 'Puis-je annuler ?',
          reponse:
            "Oui, jusqu'à 24h avant la consultation, sans frais. Au-delà, l'acompte n'est pas remboursable, mais le rendez-vous peut être reporté une fois si vous me prévenez à temps.",
        },
        {
          question: 'Le secret professionnel est-il garanti ?',
          reponse:
            "Absolument. Tout l'entretien est strictement confidentiel. Je n'évoque jamais ce qui se dit en consultation avec qui que ce soit. Mieux vaut consulter seul, pour vous, pour la qualité du travail.",
        },
        {
          question: 'Que faire si je suis bouleversé après la consultation ?',
          reponse:
            "C'est normal. Une consultation provoque des émotions, joyeuses ou tristes : on fait remonter de vieux souvenirs, parfois des épreuves enfouies. Prenez le temps, parlez à un proche. Et soyez vraiment sûr de vous avant de prendre rendez-vous.",
        },
        {
          question: 'Proposez-vous autre chose que de la voyance ?',
          reponse:
            "Oui. À la suite de nombreuses demandes de consultants souhaitant un suivi régulier, je propose désormais un accompagnement coaching de vie et développement personnel. Estime de soi, reconversion, relations, gestion des émotions, épanouissement : un espace d'écoute bienveillant et orienté action. Ce service est complémentaire à la voyance, il ne s'y substitue pas, et ne remplace pas non plus un suivi psychologique ou médical.",
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: "Page d'accueil"})},
})
