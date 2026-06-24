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

// ---------------------------------------------------------------------------
// 1. Singleton pageGlobale (createOrReplace).
//    Valeurs reprises fidelement des initialValue de schemas/pageGlobale.ts.
// ---------------------------------------------------------------------------

const pageGlobale = {
  _id: 'pageGlobale',
  _type: 'pageGlobale',
  // Bloc d'appel final (Seuil)
  seuilSurtitre: 'Pret a franchir le seuil',
  seuilTitre: 'Encore une question,',
  seuilTitreItalique: 'ou pret a reserver ?',
  seuilDescription:
    "Posez-moi votre question par email, ou reservez directement votre creneau. Vous etes recontacte sous 24h pour confirmer, annulation possible jusqu'a 24h avant le rendez-vous.",
  seuilCtaReserver: 'Reserver une consultation',
  seuilCtaQuestion: 'Poser une question',
  seuilMention1: 'Paiement securise par Stripe',
  seuilMention2: 'Confirmation sous 24h',
  seuilMention3: 'Confidentialite absolue',
  // Citation manifeste (accueil)
  antiClichesCitation: 'Je ne vends pas de reves. Des faits verifiables',
  antiClichesCitationItalique: 'au moment meme de la seance.',
  antiClichesSuite: 'Pas de sorts, pas de mise en scene, pas de dependance.',
  antiClichesAuteur: 'Jocelyn Amir Swamy, Medium voyant',
  antiClichesCta1: 'Mon parcours',
  antiClichesCta2: 'Prendre rendez-vous',
  // Pied de page
  footerTitre: 'JOCELYN AMIR',
  footerDescription:
    'Medium voyant a La Reunion. Clairvoyance, clairaudience, tirage de cartes et voyance sur photo. Au cabinet a Saint-Clotilde ou a distance.',
  footerContactTitre: 'Me contacter',
  footerVille: 'Saint-Clotilde',
  footerRegion: 'La Reunion (974)',
  footerTelephone: '+262 692 81 36 06',
  footerEmail: 'contact@jocelynamir.com',
  footerRetrouveTitre: 'On me retrouve',
  footerTv: 'Tele Kreol, mercredis 19h30',
  footerRadio: 'Kreol FM',
  footerSocial: 'Facebook',
  footerCopyright: '{annee} Jocelyn Amir. Tous droits reserves.',
  footerCredit: 'Cree par Fondationstudio.fr',
}

// ---------------------------------------------------------------------------
// 2. Champs a ajouter au singleton pageAccueil existant (patch .set()).
//    Valeurs reprises des initialValue de schemas/pageAccueil.ts.
// ---------------------------------------------------------------------------

const apercuMethodes = [
  {
    _key: 'am0',
    titre: 'Clairvoyance',
    description: 'Des images, des flashs, des scenes liees a votre passe, present ou avenir.',
  },
  {
    _key: 'am1',
    titre: 'Clairaudience',
    description: "Voix, prenoms, phrases courtes captes a l'oreille interieure.",
  },
  {
    _key: 'am2',
    titre: 'Tirage de cartes',
    description: 'Tarots et oracles, en complement, pour structurer les visions.',
  },
  {
    _key: 'am3',
    titre: 'Voyance sur support',
    description: 'Une photo, un courrier, un objet personnel : informations par contact.',
  },
]

const faqQuestions = [
  {
    _key: 'fq0',
    question: 'Comment se deroule une consultation ?',
    reponse:
      "Le plus simplement et naturellement possible. Mon bureau est zen et chaleureux. A vous de vous detendre. La consultation commence rapidement : des choses surprenantes, parfois difficiles a croire, seront dites. C'est normal. Je vous guide, j'eclaire votre chemin, je projette une lumiere sur votre avenir. Rien n'est fige, tout peut evoluer selon vos choix.",
  },
  {
    _key: 'fq1',
    question: "Faut-il preparer quelque chose a l'avance ?",
    reponse:
      'Non. Vous venez tel que vous etes. Vous pouvez apporter une photo ou un document si vous voulez consulter sur une personne ou une situation precise. Sinon, je travaille directement avec vous, sans support.',
  },
  {
    _key: 'fq2',
    question: 'Puis-je consulter a distance ?',
    reponse:
      "Oui. Les consultations telephoniques de 30 minutes sont disponibles. La precision est identique : la voyance ne depend pas de la proximite physique. C'est ideal si vous etes a l'Ile Maurice, en metropole, ou ailleurs.",
  },
  {
    _key: 'fq3',
    question: 'Comment payer ?',
    reponse:
      'Le paiement se fait directement en ligne lors de la reservation, par carte bancaire (Visa, Mastercard, Apple Pay, Google Pay). Paiement 100% securise via Stripe. Une fois le paiement effectue, vous etes recontacte sous 24h pour confirmer votre rendez-vous et convenir du creneau.',
  },
  {
    _key: 'fq4',
    question: 'Puis-je annuler ?',
    reponse:
      "Oui, jusqu'a 24h avant la consultation, sans frais. Au-dela, l'acompte n'est pas remboursable, mais le rendez-vous peut etre reporte une fois si vous me prevenez a temps.",
  },
  {
    _key: 'fq5',
    question: 'Le secret professionnel est-il garanti ?',
    reponse:
      "Absolument. Tout l'entretien est strictement confidentiel. Je n'evoque jamais ce qui se dit en consultation avec qui que ce soit. Mieux vaut consulter seul, pour vous, pour la qualite du travail.",
  },
  {
    _key: 'fq6',
    question: 'Que faire si je suis bouleverse apres la consultation ?',
    reponse:
      "C'est normal. Une consultation provoque des emotions, joyeuses ou tristes : on fait remonter de vieux souvenirs, parfois des epreuves enfouies. Prenez le temps, parlez a un proche. Et soyez vraiment sur de vous avant de prendre rendez-vous.",
  },
  {
    _key: 'fq7',
    question: 'Proposez-vous autre chose que de la voyance ?',
    reponse:
      "Oui. A la suite de nombreuses demandes de consultants souhaitant un suivi regulier, je propose desormais un accompagnement coaching de vie et developpement personnel. Estime de soi, reconversion, relations, gestion des emotions, epanouissement : un espace d'ecoute bienveillant et oriente action. Ce service est complementaire a la voyance, il ne s'y substitue pas, et ne remplace pas non plus un suivi psychologique ou medical.",
  },
]

const pageAccueilPatch = {
  methodesApercuSurtitre: 'Comment je travaille',
  methodesApercuTitre: 'Quatre approches,',
  methodesApercuTitreItalique: 'une heure.',
  methodesApercuDescription:
    'Quatre methodes combinees dans une seule consultation. Pas de predictions floues : des elements concrets et verifiables.',
  apercuMethodes,
  faqQuestions,
}

// ---------------------------------------------------------------------------
// EXECUTION (idempotente)
// ---------------------------------------------------------------------------

async function run() {
  await client
    .transaction()
    .createOrReplace(pageGlobale)
    .patch('pageAccueil', (p) => p.set(pageAccueilPatch))
    .commit()

  console.log('Import termine.')
  console.log('  pageGlobale : createOrReplace effectue.')
  console.log(`  pageAccueil : patch set sur ${Object.keys(pageAccueilPatch).length} champs.`)
  console.log(`    apercuMethodes : ${apercuMethodes.length} items.`)
  console.log(`    faqQuestions   : ${faqQuestions.length} items.`)
}

run().catch((err) => {
  console.error("Echec de l'import :", err.message)
  process.exit(1)
})
