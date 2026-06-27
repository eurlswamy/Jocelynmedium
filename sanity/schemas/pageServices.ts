import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageServices',
  title: 'Page Services',
  type: 'document',
  fields: [
    defineField({
      name: 'surtitre',
      title: 'Surtitre de la page',
      description: 'Petit texte au-dessus du titre, en haut de la page Services.',
      type: 'string',
      initialValue: 'Formules de consultation',
    }),
    defineField({
      name: 'titre',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'Plusieurs façons de',
    }),
    defineField({
      name: 'titreItalique',
      title: 'Titre en italique',
      type: 'string',
      initialValue: 'vous accompagner.',
    }),
    defineField({
      name: 'description',
      title: 'Court resume de la page',
      type: 'text',
      rows: 3,
      initialValue:
        "Paiement sécurisé en ligne, Confirmation sous 24h, Annulation jusqu'à 24h avant.",
    }),
    defineField({
      name: 'formules',
      title: 'Formules detaillees',
      description: 'Les quatre formules de consultation affichees en cartes.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'surtitre', title: 'Surtitre de la carte', type: 'string'}),
            defineField({name: 'titre', title: 'Titre de la carte', type: 'string'}),
            defineField({name: 'duree', title: 'Duree', type: 'string'}),
            defineField({name: 'prix', title: 'Prix (texte affiche)', type: 'string'}),
            defineField({name: 'accroche', title: 'Phrase de presentation', type: 'text', rows: 3}),
            defineField({
              name: 'features',
              title: 'Points inclus',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
            defineField({name: 'tag', title: 'Etiquette (ex : Recommande)', type: 'string'}),
            defineField({name: 'labelCta', title: 'Texte du bouton', type: 'string'}),
          ],
          preview: {select: {title: 'titre', subtitle: 'prix'}},
        }),
      ],
      initialValue: [
        {
          surtitre: 'Au cabinet ou à distance',
          titre: 'Une heure',
          duree: '1 heure',
          prix: '120',
          accroche:
            'La consultation complète : au cabinet à Saint-Clotilde ou à distance, au même tarif. Les quatre méthodes combinées, sans précipitation.',
          features: [
            'Au cabinet à Saint-Clotilde ou à distance',
            'Clairvoyance, clairaudience, tirage, support',
            'Photos, courriers, objets bienvenus',
          ],
          tag: 'Recommandé',
          labelCta: 'Réserver en ligne',
        },
        {
          surtitre: 'Par téléphone, partout',
          titre: '30 minutes',
          duree: '30 min',
          prix: '85',
          accroche:
            "Une séance condensée, uniquement par téléphone. Depuis La Réunion, l'Île Maurice, la métropole ou n'importe où.",
          features: [
            'Consultation par téléphone uniquement',
            'Mêmes méthodes que le cabinet, en condensé',
            'Idéal pour les emplois du temps chargés',
          ],
          tag: '',
          labelCta: 'Reserver en ligne',
        },
        {
          surtitre: 'Accompagnement personnel',
          titre: 'Coaching de vie',
          duree: 'Sur mesure',
          prix: 'Sur mesure',
          accroche:
            'Un suivi personnalisé pour surmonter les obstacles, retrouver confiance en soi et avancer vers vos objectifs.',
          features: [
            'Écoute active et empathique, sans jugement',
            'Estime de soi, reconversion, relations',
            'Complément aux consultations de voyance',
          ],
          tag: 'Nouveau',
          labelCta: 'Nous contacter',
        },
        {
          surtitre: 'Suivi dans la durée',
          titre: 'Séances régulières',
          duree: 'Sur mesure',
          prix: 'Sur mesure',
          accroche:
            "Vous souhaitez consulter plusieurs fois dans l'année ? Bénéficiez d'un tarif préférentiel pour un accompagnement suivi.",
          features: [
            'Tarif préférentiel sur vos consultations',
            'Formule au cabinet ou à distance',
            'Devis personnalisé selon votre rythme',
          ],
          tag: '',
          labelCta: 'Nous contacter',
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Page Services'})},
})
