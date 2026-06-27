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
      initialValue: 'Réservation, Une heure',
    }),
    defineField({
      name: 'titre',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'Confirmez et réglez votre séance',
    }),
    defineField({
      name: 'descriptionPaiement',
      title: 'Texte sur le paiement',
      type: 'text',
      rows: 3,
      initialValue:
        'Le paiement sécurisé valide définitivement votre rendez-vous. Vous indiquez vos coordonnées au moment du règlement et précisez si la séance a lieu au cabinet ou à distance.',
    }),
    defineField({
      name: 'labelFormule',
      title: 'Libelle de la formule',
      type: 'string',
      initialValue: 'Formule sélectionnée',
    }),
    defineField({
      name: 'detailFormule',
      title: 'Detail de la formule',
      type: 'string',
      initialValue: 'Une heure (cabinet ou à distance)',
    }),
    defineField({
      name: 'features',
      title: 'Points inclus',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      initialValue: [
        'Quatre méthodes combinées en une seule séance',
        'Au cabinet à Saint-Clotilde ou à distance',
        'Photos, courriers ou objets bienvenus',
        'Récap oral à la fin de la séance',
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
