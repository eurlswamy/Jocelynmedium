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
      initialValue: 'Réservation, 30 minutes par téléphone',
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
        "Le paiement sécurisé valide votre rendez-vous. Vous indiquez vos coordonnées au moment du règlement, Jocelyn vous appelle à l'heure convenue.",
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
      initialValue: 'Par téléphone (30 minutes)',
    }),
    defineField({
      name: 'features',
      title: 'Points inclus',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      initialValue: [
        'Consultation de 30 minutes par téléphone',
        "Jocelyn vous appelle à l'heure du rendez-vous",
        'Mêmes méthodes que le cabinet, en condensé',
        'Aucun déplacement, où que vous soyez',
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
