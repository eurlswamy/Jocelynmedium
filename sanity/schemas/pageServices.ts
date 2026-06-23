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
      initialValue: 'Plusieurs facons de',
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
        'Paiement securise en ligne, Confirmation sous 24h, Annulation jusqu\'a 24h avant.',
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
          surtitre: 'Au cabinet ou a distance',
          titre: 'Une heure',
          duree: '1 heure',
          prix: '120',
          accroche:
            'La consultation complete : au cabinet a Saint-Clotilde ou a distance, au meme tarif. Les quatre methodes combinees, sans precipitation.',
          features: [
            'Au cabinet a Saint-Clotilde ou a distance',
            'Clairvoyance, clairaudience, tirage, support',
            'Photos, courriers, objets bienvenus',
          ],
          tag: 'Recommande',
          labelCta: 'Reserver en ligne',
        },
        {
          surtitre: 'Par telephone, partout',
          titre: '30 minutes',
          duree: '30 min',
          prix: '85',
          accroche:
            "Une seance condensee, uniquement par telephone. Depuis La Reunion, l'Ile Maurice, la metropole ou n'importe ou.",
          features: [
            'Consultation par telephone uniquement',
            'Memes methodes que le cabinet, en condense',
            'Ideal pour les emplois du temps charges',
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
            'Un suivi personnalise pour surmonter les obstacles, retrouver confiance en soi et avancer vers vos objectifs.',
          features: [
            'Ecoute active et empathique, sans jugement',
            'Estime de soi, reconversion, relations',
            'Complement aux consultations de voyance',
          ],
          tag: 'Nouveau',
          labelCta: 'Nous contacter',
        },
        {
          surtitre: 'Suivi dans la duree',
          titre: 'Seances regulieres',
          duree: 'Sur mesure',
          prix: 'Sur mesure',
          accroche:
            'Vous souhaitez consulter plusieurs fois dans l\'annee ? Beneficiez d\'un tarif preferentiel pour un accompagnement suivi.',
          features: [
            'Tarif preferentiel sur vos consultations',
            'Formule au cabinet ou a distance',
            'Devis personnalise selon votre rythme',
          ],
          tag: '',
          labelCta: 'Nous contacter',
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Page Services'})},
})
