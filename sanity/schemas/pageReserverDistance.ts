import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageReserverDistance',
  title: 'Page Reserver (a distance, 30 minutes)',
  type: 'document',
  fields: [
    defineField({
      name: 'surtitre',
      title: 'Surtitre de la page',
      type: 'string',
      initialValue: 'Reservation, 30 minutes par telephone',
    }),
    defineField({
      name: 'titre',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'Confirmez et reglez votre seance',
    }),
    defineField({
      name: 'descriptionPaiement',
      title: 'Texte sur le paiement',
      type: 'text',
      rows: 3,
      initialValue:
        "Le paiement securise valide votre rendez-vous. Vous indiquez vos coordonnees au moment du reglement, Jocelyn vous appelle a l'heure convenue.",
    }),
    defineField({
      name: 'labelFormule',
      title: 'Libelle de la formule',
      type: 'string',
      initialValue: 'Formule selectionnee',
    }),
    defineField({
      name: 'detailFormule',
      title: 'Detail de la formule',
      type: 'string',
      initialValue: 'Par telephone (30 minutes)',
    }),
    defineField({
      name: 'features',
      title: 'Points inclus',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      initialValue: [
        'Consultation de 30 minutes par telephone',
        "Jocelyn vous appelle a l'heure du rendez-vous",
        'Memes methodes que le cabinet, en condense',
        'Aucun deplacement, ou que vous soyez',
      ],
    }),
    defineField({
      name: 'prix',
      title: 'Prix (en euros)',
      type: 'number',
      initialValue: 85,
    }),
  ],
  preview: {prepare: () => ({title: 'Page Reserver, a distance'})},
})
