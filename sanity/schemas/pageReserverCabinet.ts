import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageReserverCabinet',
  title: 'Page Reserver (cabinet, une heure)',
  type: 'document',
  fields: [
    defineField({
      name: 'surtitre',
      title: 'Surtitre de la page',
      type: 'string',
      initialValue: 'Reservation, Une heure',
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
        'Le paiement securise valide definitivement votre rendez-vous. Vous indiquez vos coordonnees au moment du reglement et precisez si la seance a lieu au cabinet ou a distance.',
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
      initialValue: 'Une heure (cabinet ou a distance)',
    }),
    defineField({
      name: 'features',
      title: 'Points inclus',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      initialValue: [
        'Quatre methodes combinees en une seule seance',
        'Au cabinet a Saint-Clotilde ou a distance',
        'Photos, courriers ou objets bienvenus',
        'Recap oral a la fin de la seance',
      ],
    }),
    defineField({
      name: 'prix',
      title: 'Prix (en euros)',
      type: 'number',
      initialValue: 120,
    }),
  ],
  preview: {prepare: () => ({title: 'Page Reserver, cabinet'})},
})
