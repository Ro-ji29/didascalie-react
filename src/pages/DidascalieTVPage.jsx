import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Play } from 'lucide-react'
import BlurFade from '../components/magicui/blur-fade'
import { fetchYouTubeVideos, formatVideoDate } from '../services/youtube'

export default function DidascalieTVPage() {
  const shouldReduceMotion = useReducedMotion()
  const [videos, setVideos] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchYouTubeVideos(18)
      .then((result) => {
        if (active) {
          setVideos(result)
          setLoading(false)
        }
      })
      .catch(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const filteredVideos = useMemo(() => {
    const value = query.trim().toLowerCase()

    if (!value) return videos

    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(value) || video.description.toLowerCase().includes(value)
    )
  }, [query, videos])

  return (
    <main className="tv-page">
      <div className="wrap tv-shell">
        <BlurFade inView delay={0.05} yOffset={8}>
          <div className="tv-header">
            <div>
              <span className="tv-kicker">Didascalie TV</span>
              <h1>Didascalie TV</h1>
            </div>
            <Link to="/" className="tv-back-link">
              ← Retour à l'accueil
            </Link>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1} yOffset={10}>
          <p className="tv-intro">
            Retrouvez les enseignements, réflexions et contenus du Père Paul Marie.
          </p>
        </BlurFade>

        <BlurFade inView delay={0.14} yOffset={10}>
          <label className="tv-search" aria-label="Rechercher une vidéo">
            <span>Recherche</span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Chercher une vidéo…"
            />
          </label>
        </BlurFade>

        {loading ? (
          <p className="tv-state">Chargement des vidéos…</p>
        ) : filteredVideos.length === 0 ? (
          <p className="tv-state">Aucune vidéo ne correspond à votre recherche.</p>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              className="tv-grid"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {filteredVideos.map((video, index) => (
                <motion.article
                  key={video.id}
                  layout
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: index * 0.04 }}
                  className="tv-card"
                >
                  <Link
                    to={`/didascalie-tv/${video.id}`}
                    className="tv-thumbnail-wrap"
                    aria-label={`Regarder la vidéo : ${video.title}`}
                  >
                    <img src={video.thumbnail} alt={video.title} className="tv-thumbnail" />
                    <span className="tv-play-badge" aria-hidden="true">
                      <Play size={22} strokeWidth={2.2} fill="currentColor" />
                    </span>
                  </Link>
                  <div className="tv-card-body">
                    <Link to={`/didascalie-tv/${video.id}`} className="tv-card-title">
                      {video.title}
                    </Link>
                    <div className="tv-card-meta">{formatVideoDate(video.publishedAt)}</div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </main>
  )
}
