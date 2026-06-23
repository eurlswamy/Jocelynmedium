import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageMedias',
  title: 'Page Medias et presse',
  type: 'document',
  groups: [
    {name: 'entete', title: 'En-tete'},
    {name: 'medias', title: 'Presence mediatique'},
    {name: 'nationale', title: 'Presence nationale'},
    {name: 'distinctions', title: 'Distinctions'},
    {name: 'cta', title: 'Boutons'},
  ],
  fields: [
    defineField({
      name: 'surtitre',
      title: 'Surtitre de la page',
      type: 'string',
      group: 'entete',
      initialValue: 'Agenda permanent',
    }),
    defineField({
      name: 'titre',
      title: 'Titre de la page',
      type: 'string',
      group: 'entete',
      initialValue: 'Presence mediatique',
    }),
    defineField({
      name: 'titreItalique',
      title: 'Titre en italique',
      type: 'string',
      group: 'entete',
      initialValue: 'reguliere.',
    }),
    defineField({
      name: 'medias',
      title: 'Apparitions regulieres',
      description: 'Les emissions et interventions media regulieres.',
      type: 'array',
      group: 'medias',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Type (ex : TV, Radio)', type: 'string'}),
            defineField({name: 'nom', title: 'Nom du media', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({name: 'frequence', title: 'Frequence', type: 'string'}),
            defineField({name: 'lieu', title: 'Lieu / horaire', type: 'string'}),
          ],
          preview: {select: {title: 'nom', subtitle: 'label'}},
        }),
      ],
      initialValue: [
        {
          label: 'TV',
          nom: 'Tele Kreol',
          description:
            'En direct depuis 2010, Jocelyn repond aux questions des telespectateurs reunionnais sur la mediumnite et la voyance.',
          frequence: 'Chaque mercredi',
          lieu: '19h30, La Reunion',
        },
        {
          label: 'Radio',
          nom: 'Kreol FM',
          description:
            'Des emissions consacrees a la spiritualite, aux traditions reunionnaises et a la voyance.',
          frequence: 'Interventions regulieres',
          lieu: 'La Reunion',
        },
      ],
    }),
    defineField({
      name: 'nationaleSurtitre',
      title: 'Surtitre (presence nationale)',
      type: 'string',
      group: 'nationale',
      initialValue: 'Presence nationale',
    }),
    defineField({
      name: 'nationaleTitre',
      title: 'Titre (presence nationale)',
      type: 'string',
      group: 'nationale',
      initialValue: 'Du Festival de Cannes',
    }),
    defineField({
      name: 'nationaleTitreItalique',
      title: 'Titre en italique (presence nationale)',
      type: 'string',
      group: 'nationale',
      initialValue: 'aux plateaux tele.',
    }),
    defineField({
      name: 'nationaleDescription',
      title: 'Texte (presence nationale)',
      type: 'text',
      rows: 3,
      group: 'nationale',
      initialValue:
        "Present au Festival de Cannes en 2000 et 2001, une reconnaissance nationale de sa pratique. Aujourd'hui, Jocelyn continue de passer regulierement a la television.",
    }),
    defineField({
      name: 'distinctions',
      title: 'Distinctions et prix',
      description: 'La liste des prix et reconnaissances, par annee.',
      type: 'array',
      group: 'distinctions',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'annee', title: 'Annee', type: 'string'}),
            defineField({name: 'label', title: 'Intitule', type: 'string'}),
            defineField({name: 'lieu', title: 'Lieu', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'annee'}},
        }),
      ],
      initialValue: [
        {annee: '1994', label: 'Prix de la presse et des medias', lieu: 'Marseille'},
        {annee: '1996', label: 'Prix du public du meilleur voyant', lieu: 'Grenoble'},
        {annee: '1997', label: 'Prix du meilleur voyant medium', lieu: 'Creteil'},
        {annee: '2000', label: 'Festival de Cannes', lieu: 'Cannes'},
        {annee: '2001', label: '2e Festival de Cannes', lieu: 'Cannes'},
      ],
    }),
    defineField({
      name: 'labelCta1',
      title: 'Texte du bouton 1',
      type: 'string',
      group: 'cta',
      initialValue: 'Mon parcours complet',
    }),
    defineField({
      name: 'labelCta2',
      title: 'Texte du bouton 2',
      type: 'string',
      group: 'cta',
      initialValue: 'Reserver',
    }),
  ],
  preview: {prepare: () => ({title: 'Page Medias et presse'})},
})
