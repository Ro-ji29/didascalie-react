export const CHANNEL_ID = 'UCUlnBfkZAW3v4jrzgD76IsA'
export const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

export const FALLBACK_VIDEOS = [
  {
    id: '5IBp8Z7RpLQ',
    title: 'COMMENT GUÉRIR DES BLESSURES DE L’ÂME ?  Père Paul Marie MBA',
    publishedAt: '2026-07-22T14:44:12+00:00',
    description: 'COMMENT GUÉRIR DES BLESSURES DE L’ÂME ?  Père Paul Marie MBA',
    thumbnail: 'https://i2.ytimg.com/vi/5IBp8Z7RpLQ/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=5IBp8Z7RpLQ',
  },
  {
    id: '0RAj5FwCCEg',
    title: 'COMMENT SAUVER SON COUPLE DANS LES MOMENTS DE CRISE ? – Père Paul Marie MBA',
    publishedAt: '2026-07-18T16:14:45+00:00',
    description:
      'Les crises ne sont pas une fatalité. Découvrez, avec le Père Paul Marie MBA, des conseils inspirés de la Parole de Dieu pour surmonter les épreuves, restaurer le dialogue, pardonner et reconstruire un couple solide avec le Christ au centre de votre foyer.',
    thumbnail: 'https://i1.ytimg.com/vi/0RAj5FwCCEg/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=0RAj5FwCCEg',
  },
  {
    id: 'EF6_YzYZzCM',
    title: 'LES OBSTACLES SPIRITUELS QUI BLOQUENT LE MARIAGE - Père Paul Marie MBA',
    publishedAt: '2026-07-04T11:10:04+00:00',
    description: 'LES OBSTACLES SPIRITUELS QUI BLOQUENT LE MARIAGE - Père Paul Marie MBA',
    thumbnail: 'https://i2.ytimg.com/vi/EF6_YzYZzCM/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=EF6_YzYZzCM',
  },
  {
    id: 'Y7vTcsHvtxY',
    title: 'LA FAMILLE MOULE DE DIEU POUR LA PERSONNE HUMAINE – Père Paul Marie MBA',
    publishedAt: '2026-04-13T18:31:04+00:00',
    description: 'LA FAMILLE MOULE DE DIEU POUR LA PERSONNE HUMAINE – Père Paul Marie MBA',
    thumbnail: 'https://i2.ytimg.com/vi/Y7vTcsHvtxY/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=Y7vTcsHvtxY',
  },
  {
    id: 'xFxvvNSsy88',
    title: "SANS L'AMOUR, JE NE SUIS RIEN - Père Paul Marie Mba",
    publishedAt: '2026-03-24T21:58:28+00:00',
    description: "SANS L'AMOUR, JE NE SUIS RIEN - Père Paul Marie Mba",
    thumbnail: 'https://i2.ytimg.com/vi/xFxvvNSsy88/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=xFxvvNSsy88',
  },
  {
    id: 'bQ8tS6BWyv4',
    title: "L'AMOUR DE DIEU NE TOMBE JAMAIS À COURT - Père Paul Marie MBA",
    publishedAt: '2026-02-15T19:24:43+00:00',
    description: "L'AMOUR DE DIEU NE TOMBE JAMAIS À COURT - Père Paul Marie MBA",
    thumbnail: 'https://i2.ytimg.com/vi/bQ8tS6BWyv4/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=bQ8tS6BWyv4',
  },
]

function normalizeVideo(entry) {
  const id =
    entry.querySelector('yt\:videoId, videoId')?.textContent?.trim() ||
    entry
      .querySelector('id')
      ?.textContent?.trim()
      .replace(/^yt:video:/, '') ||
    ''

  const title = entry.querySelector('title')?.textContent?.trim() || 'Vidéo Didascalie'
  const publishedAt =
    entry.querySelector('published')?.textContent?.trim() || new Date().toISOString()
  const description =
    entry.querySelector('media\:description, description')?.textContent?.trim() ||
    'Enseignement du Père Paul Marie MBA.'
  const thumbnail =
    entry.querySelector('media\:thumbnail, thumbnail')?.getAttribute('url') ||
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

  return {
    id,
    title,
    publishedAt,
    description,
    thumbnail,
    url: `https://www.youtube.com/watch?v=${id}`,
  }
}

export function parseYouTubeFeed(xmlText) {
  if (!xmlText) return []

  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlText, 'application/xml')
  const parserError = xml.querySelector('parsererror')

  if (parserError) {
    throw new Error('Impossible de lire le flux YouTube.')
  }

  const entries = Array.from(xml.querySelectorAll('entry'))
  return entries.map(normalizeVideo).filter((video) => video.id)
}

export async function fetchYouTubeVideos(limit = 12) {
  try {
    const response = await fetch(YOUTUBE_FEED_URL, {
      headers: {
        Accept: 'application/xml, text/xml, application/rss+xml',
      },
    })

    if (!response.ok) {
      throw new Error(`Le flux YouTube a renvoyé ${response.status}.`)
    }

    const xmlText = await response.text()
    const videos = parseYouTubeFeed(xmlText)
    return videos.slice(0, limit)
  } catch (error) {
    console.warn('Impossible de charger les vidéos YouTube, usage du fallback local.', error)
    return FALLBACK_VIDEOS.slice(0, limit)
  }
}

export function formatVideoDate(dateString) {
  if (!dateString) return 'Date indisponible'

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}
