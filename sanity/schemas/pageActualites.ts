import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pageActualites',
  title: 'Page Actualites (libelles)',
  type: 'document',
  fields: [
    defineField({
      name: 'labelFiltrer',
      title: 'Libelle du filtre',
      description: 'Texte affiche devant le menu de filtre par categorie.',
      type: 'string',
      initialValue: 'Filtrer par',
    }),
    defineField({
      name: 'labelTrier',
      title: 'Libelle du tri',
      description: 'Texte affiche devant le menu de tri.',
      type: 'string',
      initialValue: 'Trier par date',
    }),
    defineField({
      name: 'messageVide',
      title: 'Message quand aucun article',
      description: 'Texte affiche quand la categorie ne contient aucun article.',
      type: 'string',
      initialValue: 'Aucun article dans cette categorie.',
    }),
    defineField({
      name: 'labelAutresArticles',
      title: 'Titre de la liste secondaire',
      type: 'string',
      initialValue: 'Autres articles',
    }),
    defineField({
      name: 'labelCtaReserver',
      title: 'Texte du bouton Reserver (dans un article)',
      type: 'string',
      initialValue: 'Reserver une consultation',
    }),
    defineField({
      name: 'labelCtaQuestion',
      title: 'Texte du bouton Question (dans un article)',
      type: 'string',
      initialValue: 'Poser une question',
    }),
  ],
  preview: {prepare: () => ({title: 'Page Actualites (libelles)'})},
})
