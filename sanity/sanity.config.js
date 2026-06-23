import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/index'

// Les pages du site sont des singletons : un seul document par page, jamais
// dupliquable ni supprimable. La liste ci-dessous sert a la fois a construire
// le menu du Studio et a proteger ces documents.
const SINGLETONS = [
  {id: 'pageAccueil', title: 'Accueil'},
  {id: 'pageGlobale', title: 'Textes communs (CTA, pied de page)'},
  {id: 'pageServices', title: 'Services et tarifs'},
  {id: 'pageMethodes', title: 'Mes methodes'},
  {id: 'pageAPropos', title: 'A propos'},
  {id: 'pageMedias', title: 'Medias et presse'},
  {id: 'pageReserver', title: 'Reserver (choix de formule)'},
  {id: 'pageReserverCabinet', title: 'Reserver, une heure'},
  {id: 'pageReserverDistance', title: 'Reserver, 30 minutes'},
  {id: 'pageContact', title: 'Contact'},
  {id: 'pageActualites', title: 'Actualites (page liste)'},
]

const singletonIds = SINGLETONS.map((s) => s.id)

export default defineConfig({
  name: 'default',
  title: 'Jocelyn Amir, Medium',
  projectId: 'ji3lirnr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu du site')
          .items([
            // Une entree de menu par page (singleton).
            ...SINGLETONS.map((s) =>
              S.listItem()
                .id(s.id)
                .title(s.title)
                .child(S.document().schemaType(s.id).documentId(s.id)),
            ),
            S.divider(),
            // Liste repetable : le blog.
            S.listItem()
              .id('actualite')
              .title('Articles et actualites')
              .child(S.documentTypeList('actualite').title('Toutes les actualites')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Protege les singletons : pas de creation, duplication ni suppression.
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => !singletonIds.includes(item.templateId)),
    actions: (prev, {schemaType}) =>
      singletonIds.includes(schemaType)
        ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : prev,
  },
})
