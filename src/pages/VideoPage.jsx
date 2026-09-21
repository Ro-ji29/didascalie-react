import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BlurFade from '../components/magicui/blur-fade'
import { fetchYouTubeVideos, formatVideoDate } from '../services/youtube'

export default function VideoPage() {
  const { videoId } = useParams()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchYouTubeVideos(18)
      .then((videos) => {
        if (!active) return

        const selected = videos.find((item) => item.id === videoId)
        setVideo(selected ?? null)
        setLoading(false)
      })
      .catch(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [videoId])

  if (loading) {
    return (
      <main className="tv-page">
        <div className="wrap tv-shell">
          <p className="tv-state">Chargement de la vidéo…</p>
        </div>
      </main>
    )
  }

  if (!video) {
    return (
      <main className="tv-page">
        <div className="wrap tv-shell">
          <div className="tv-empty-state">
            <h1>Vidéo introuvable</h1>
            <Link to="/didascalie-tv" className="tv-back-link">
              ← Retour à Didascalie TV
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="tv-page">
      <div className="wrap tv-shell">
        <BlurFade inView delay={0.05} yOffset={8}>
          <div className="tv-header tv-header-detail">
            <div>
              <span className="tv-kicker">Didascalie TV</span>
              <h1>{video.title}</h1>
            </div>
            <Link to="/didascalie-tv" className="tv-back-link">
              ← Retour à Didascalie TV
            </Link>
          </div>
        </BlurFade>

        <div className="tv-player-wrap">
          <iframe
            className="tv-player"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="tv-details">
          <div className="tv-info-block">
            <div className="tv-detail-label">Date</div>
            <div>{formatVideoDate(video.publishedAt)}</div>
          </div>
          <div className="tv-info-block">
            <div className="tv-detail-label">Description</div>
            <p>{video.description}</p>
          </div>
          <a className="tv-yt-link" href={video.url} target="_blank" rel="noreferrer">
            Voir sur YouTube
          </a>
        </div>
      </div>
    </main>
  )
}
