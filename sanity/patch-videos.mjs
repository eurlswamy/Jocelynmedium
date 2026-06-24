import {createClient} from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('SANITY_TOKEN manquant. export SANITY_TOKEN=... puis relancer.')
  process.exit(1)
}

const client = createClient({
  projectId: 'ji3lirnr',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token,
  useCdn: false,
})

const videos = [
  {
    _key: 'vid0',
    titre: 'Jocelyn en direct a la television',
    description: 'Emission en direct a revoir.',
    lien: 'https://www.facebook.com/share/v/19EXTwkeGN/',
  },
  {
    _key: 'vid1',
    titre: 'Rediffusion : passage televise',
    description: 'Un de ses passages a revoir.',
    lien: 'https://www.facebook.com/share/v/1BQRfTSB5p/',
  },
  {
    _key: 'vid2',
    titre: "Jocelyn a l'antenne",
    description: 'Une autre emission a revoir.',
    lien: 'https://www.facebook.com/share/v/1LJXM3pND9/',
  },
]

const res = await client
  .patch('pageMedias')
  .set({
    videosSurtitre: 'A revoir en video',
    videosTitre: 'Jocelyn a la television',
    videos,
  })
  .commit()

console.log('pageMedias patche. videos en base :', res.videos?.length)
