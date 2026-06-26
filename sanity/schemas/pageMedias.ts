import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageMedias',
  title: 'Page Medias et presse',
  type: 'document',
  groups: [
    {name: 'entete', title: 'En-tete'},
    {name: 'medias', title: 'Presence mediatique'},
    {name: 'videos', title: 'Emissions a revoir (videos)'},
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
      name: 'videosSurtitre',
      title: 'Surtitre du bloc videos',
      type: 'string',
      group: 'videos',
      initialValue: 'A revoir en video',
    }),
    defineField({
      name: 'videosTitre',
      title: 'Titre du bloc videos',
      description: 'Affiche au-dessus des cartes video (ex : Jocelyn a la television).',
      type: 'string',
      group: 'videos',
      initialValue: 'Jocelyn a la television',
    }),
    defineField({
      name: 'videos',
      title: 'Emissions et passages televises',
      description:
        "Liste de videos (lives ou rediffusions Facebook). Chaque carte affiche un titre et un bouton qui ouvre la video dans un nouvel onglet. Pour ajouter une video : copiez le lien de partage Facebook dans le champ Lien.",
      type: 'array',
      group: 'videos',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'titre',
              title: 'Titre de la video',
              description: 'Ex : Emission Tele Kreol, Passage en direct...',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Courte description (optionnel)',
              type: 'string',
            }),
            defineField({
              name: 'lien',
              title: 'Lien de la video (Facebook)',
              description: 'Collez ici le lien de partage de la video Facebook.',
              type: 'url',
            }),
          ],
          preview: {select: {title: 'titre', subtitle: 'lien'}},
        }),
      ],
      initialValue: [
        {
          titre: 'Jocelyn en direct a la television',
          description: 'Emission en direct sur les reseaux de Jocelyn.',
          lien: 'https://www.facebook.com/share/v/19EXTwkeGN/',
        },
        {
          titre: 'Rediffusion : passage televise',
          description: 'Un de ses passages a revoir.',
          lien: 'https://www.facebook.com/share/v/1BQRfTSB5p/',
        },
        {
          titre: 'Jocelyn a l antenne',
          description: 'Une autre emission a revoir.',
          lien: 'https://www.facebook.com/share/v/1LJXM3pND9/',
        },
        {
          titre: 'Jocelyn a la television',
          description: 'Un passage televise a revoir.',
          lien: 'https://www.facebook.com/share/v/18jez5wTEu/',
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
