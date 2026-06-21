export type Actualite = {
  slug: string;
  date: string;
  annee: number; // année de référence, pour le tri chronologique
  tag: string;
  tagColor: string;
  image: string;
  titre: string;
  resume: string;
  contenu: string;
};

export const ACTUALITES: Actualite[] = [
  {
    slug: "coaching-de-vie-disponible",
    date: "2026",
    annee: 2026,
    tag: "Coaching",
    tagColor: "#C57B5C",
    image: "/images/backgrounds/seuil-bg.webp",
    titre: "Coaching de vie disponible",
    resume:
      "À la suite de nombreuses demandes, je propose désormais un accompagnement coaching de vie en complément de mes consultations.",
    contenu: `À la suite de nombreuses demandes de consultants qui souhaitaient un suivi régulier au-delà des séances de voyance, j'ai décidé de formaliser une activité que j'exercais déjà de manière naturelle depuis des années : le coaching de vie.

Ce n'est pas un remplacement de la consultation médiumnique. C'est un complément. Là où la voyance éclaire le chemin, le coaching donne les outils pour l'emprunter.

**Ce que couvre le coaching de vie :**

- Confiance et estime de soi
- Reconversion professionnelle
- Gestion des émotions et du stress
- Relations familiales et amoureuses
- Accompagnement dans l'épanouissement personnel

Le premier échange est un entretien gratuit de 20 minutes pour définir ensemble vos objectifs et voir si la démarche vous correspond. Contactez-moi directement pour en savoir plus.`,
  },
  {
    slug: "tele-kreol-emission-hebdomadaire",
    date: "Chaque mercredi · 19h30",
    annee: 2025,
    tag: "Émissions",
    tagColor: "#1B7A8F",
    image: "/images/backgrounds/medias-bg.webp",
    titre: "Télé Kréol, émission hebdomadaire",
    resume:
      "Depuis plus de quinze ans, je réponds en direct aux questions des téléspectateurs réunionnais sur la médiumité et la voyance.",
    contenu: `Depuis 2010, chaque mercredi soir à 19h30, je suis présent sur le plateau de Télé Kréol pour répondre en direct aux questions des téléspectateurs réunionnais.

Cette émission est née d'une rencontre avec l'équipe de la chaîne, quelques mois après mon installation à La Réunion. Je ne cherchais pas à m'exposer médiatiquement, mais le bouche à oreille avait fait son travail, et les demandes étaient là.

**Ce qu'on y aborde :**

Tout. Les questions sentimentales, professionnelles, familiales, les deuils, les inquiétudes du quotidien. Les gens appellent en direct, je reçois les informations et je réponds avec ce que je perçois. Pas de mise en scène, pas de script.

Quinze ans après, le format n'a pas changé. L'audience non plus. C'est ce qui me convient le mieux : une pratique directe, sans artifice.`,
  },
  {
    slug: "kreol-fm-spiritualite-voyance",
    date: "Régulier",
    annee: 2024,
    tag: "Émissions",
    tagColor: "#C9A961",
    image: "/images/backgrounds/seuil-bg.webp",
    titre: "Kréol FM, spiritualité et voyance",
    resume:
      "Des interventions régulières sur Kréol FM consacrées à la spiritualité et aux traditions réunionnaises.",
    contenu: `En parallèle de l'émission télévisée sur Télé Kréol, j'interviens régulièrement sur Kréol FM, l'une des radios les plus écoutées de l'île.

Ces émissions prennent une forme différente : plus longues, plus approfondies. On y parle de spiritualité au sens large, des traditions réunionnaises, de la relation à l'invisible, des pratiques de voyance et de médiumité dans notre contexte culturel.

La radio permet une autre qualité d'écoute. Les auditeurs appellent, posent des questions, partagent leurs expériences. C'est un espace d'échange que j'apprécie particulièrement.`,
  },
  {
    slug: "festival-de-cannes",
    date: "2000 · 2001",
    annee: 2001,
    tag: "Médias",
    tagColor: "#2D3142",
    image: "/images/backgrounds/medias-bg.webp",
    titre: "Festival de Cannes",
    resume:
      "Deux participations consécutives au Festival de Cannes en 2000 et 2001.",
    contenu: `En 2000, puis en 2001, j'ai participé au Festival de Cannes. Deux années consécutives qui ont marqué une étape dans ma carrière médiatique.

Ces participations faisaient suite aux distinctions obtenues à Grenoble en 1996 et à Créteil en 1997. La reconnaissance nationale s'était construite progressivement, et Cannes en était l'aboutissement logique pour cette période.

Ce que j'en retiens surtout : la diversité des personnes rencontrées, venues de milieux très différents, toutes avec la même question fondamentale : comprendre ce qui se passe dans leur vie, ce qui les attend, ce qu'elles portent.

Ce besoin de clarté est universel. Il ne dépend pas du milieu social, de la culture, de l'âge. C'est ce que ces deux années à Cannes m'ont confirmé.`,
  },
  {
    slug: "prix-meilleur-voyant-medium",
    date: "1996 · 1997",
    annee: 1997,
    tag: "Distinctions",
    tagColor: "#B87333",
    image: "/images/backgrounds/seuil-bg.webp",
    titre: "Prix du meilleur voyant médium",
    resume:
      "Prix du public du meilleur voyant à Grenoble en 1996, puis Prix du meilleur voyant médium à Créteil en 1997.",
    contenu: `En 1996 à Grenoble, puis en 1997 à Créteil, j'ai reçu deux distinctions consacrées par le public : Prix du public du meilleur voyant, puis Prix du meilleur voyant médium.

Ces reconnaissances sont arrivées tôt dans ma carrière, deux et trois ans après mes débuts à Marseille en 1994. Elles ont confirmé quelque chose que je savais déjà : que la précision prime sur le spectacle.

Les gens ne viennent pas voir un numéro. Ils viennent chercher des réponses vraies, des informations qu'ils peuvent vérifier. C'est ce que j'ai toujours cherché à donner.

Ces prix m'ont ouvert des portes, le Festival de Cannes notamment, mais ne m'ont pas changé dans ma façon de travailler. La pratique reste la même : écouter ce qui se transmet et le dire clairement.`,
  },
];

export const TAGS = ["Tout", "Émissions", "Distinctions", "Coaching", "Médias"];
