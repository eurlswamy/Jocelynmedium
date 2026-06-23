import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'actualite',
  title: 'Article (actualite)',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: "Titre de l'article",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: "Identifiant d'URL",
      description: "Adresse de l'article sur le site. Cliquez sur Generer a partir du titre.",
      type: 'slug',
      options: {source: 'titre', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date affichee',
      description: 'Texte libre affiche comme date (ex : Chaque mercredi, 19h30).',
      type: 'string',
    }),
    defineField({
      name: 'annee',
      title: 'Annee (pour le tri)',
      description: 'Nombre servant a classer les articles du plus recent au plus ancien.',
      type: 'number',
    }),
    defineField({
      name: 'tag',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          {title: 'Emissions', value: 'Emissions'},
          {title: 'Distinctions', value: 'Distinctions'},
          {title: 'Coaching', value: 'Coaching'},
          {title: 'Medias', value: 'Medias'},
        ],
      },
    }),
    defineField({
      name: 'tagColor',
      title: 'Couleur de la categorie',
      description: 'Code couleur hexadecimal (ex : #C9A24B) pour la pastille.',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: "Image de l'article",
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'resume',
      title: 'Court resume',
      description: "Texte affiche sous le titre dans la liste et en haut de l'article.",
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contenu',
      title: "Contenu de l'article",
      description: "Le texte complet de l'article, avec mise en forme.",
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'statut',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          {title: 'Publie', value: 'publie'},
          {title: 'Brouillon', value: 'brouillon'},
          {title: 'Archive', value: 'archive'},
        ],
      },
      initialValue: 'publie',
    }),
  ],
  preview: {select: {title: 'titre', subtitle: 'tag'}},
})
