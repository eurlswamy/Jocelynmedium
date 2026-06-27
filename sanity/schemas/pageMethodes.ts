import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageMethodes',
  title: 'Page Methodes',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Banniere (haut de page)'},
    {name: 'liste', title: 'Methodes'},
    {name: 'citation', title: 'Citation finale'},
  ],
  fields: [
    defineField({
      name: 'heroSurtitre',
      title: 'Surtitre de la banniere',
      type: 'string',
      group: 'hero',
      initialValue: 'Méthodes de travail',
    }),
    defineField({
      name: 'heroTitre',
      title: 'Titre de la banniere',
      type: 'string',
      group: 'hero',
      initialValue: 'Quatre voies,',
    }),
    defineField({
      name: 'heroTitreItalique',
      title: 'Titre en italique',
      type: 'string',
      group: 'hero',
      initialValue: 'une lecture.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Court resume de la banniere',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue: 'Cliquez sur une méthode pour en découvrir le fonctionnement.',
    }),
    defineField({
      name: 'methodes',
      title: 'Les methodes',
      description: 'Les quatre approches de travail, presentees en cartes.',
      type: 'array',
      group: 'liste',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'numeral', title: 'Numero (chiffre romain)', type: 'string'}),
            defineField({name: 'teaser', title: 'Accroche courte (ex : Je vois.)', type: 'string'}),
            defineField({name: 'titre', title: 'Nom de la methode', type: 'string'}),
            defineField({name: 'definition', title: 'Definition courte', type: 'text', rows: 2}),
            defineField({name: 'description', title: 'Description detaillee', type: 'text', rows: 4}),
            defineField({
              name: 'exemples',
              title: 'Exemples',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
          ],
          preview: {select: {title: 'titre', subtitle: 'teaser'}},
        }),
      ],
      initialValue: [
        {
          numeral: 'I',
          teaser: 'Je vois.',
          titre: 'Clairvoyance',
          definition:
            "La capacité à percevoir des images, des scènes et des flashs visuels liés au passé, au présent ou à l'avenir.",
          description: '',
          exemples: [],
        },
        {
          numeral: 'II',
          teaser: "J'entends.",
          titre: 'Clairaudience',
          definition: '',
          description: '',
          exemples: [],
        },
        {
          numeral: 'III',
          teaser: 'Je lis.',
          titre: 'Tirage de cartes',
          definition: '',
          description: '',
          exemples: [],
        },
        {
          numeral: 'IV',
          teaser: 'Je capte.',
          titre: 'Voyance sur support',
          definition: '',
          description: '',
          exemples: [],
        },
      ],
    }),
    defineField({
      name: 'citationTexte',
      title: 'Texte de la citation finale',
      type: 'text',
      rows: 3,
      group: 'citation',
      initialValue:
        "Je ne choisis pas d'utiliser une méthode plutôt qu'une autre. Elles s'activent naturellement, selon ce que la séance demande.",
    }),
    defineField({
      name: 'citationAuteur',
      title: 'Auteur de la citation',
      type: 'string',
      group: 'citation',
      initialValue: 'Jocelyn Amir',
    }),
  ],
  preview: {prepare: () => ({title: 'Page Methodes'})},
})
