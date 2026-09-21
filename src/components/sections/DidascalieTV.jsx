import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Eyebrow from '../ui/Eyebrow'
import BlurFade from '../magicui/blur-fade'
import { fetchYouTubeVideos, formatVideoDate } from '../../services/youtube'

/**
 * Didascalie TV section — preview of the latest videos on the home page.
 */
export default function DidascalieTV() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchYouTubeVideos(3).then(setVideos)
  }, [])

  return (
    <section className="night" id="tv">
      <div className="wrap">
        <BlurFade inView delay={0.05} yOffset={6}>
          <Eyebrow>Didascalie TV</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.12} yOffset={8}>
          <h2 className="title">Les derniers enseignements du Père Paul Marie.</h2>
        </BlurFade>
        <BlurFade inView delay={0.18} yOffset={8}>
          <p className="lede">
            Des contenus accessibles directement depuis la chaîne officielle, sélectionnés pour vous
            guider dans votre parcours spirituel.
          </p>
        </BlurFade>

        <div className="tv-preview-grid">
          {videos.map((video, idx) => (
            <BlurFade key={video.id} inView delay={0.22 + idx * 0.08} yOffset={10}>
              <Link to={`/didascalie-tv/${video.id}`} className="tv-preview-card">
                <div className="tv-preview-thumb-wrap">
                  <img className="tv-preview-thumb" src={video.thumbnail} alt={video.title} />
                  <span className="tv-preview-play">▶</span>
                </div>
                <div className="tv-preview-body">
                  <h3>{video.title}</h3>
                  <div className="meta">{formatVideoDate(video.publishedAt)}</div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>

        <div className="tv-more-row">
          <Link to="/didascalie-tv" className="pill solid">
            Voir plus
          </Link>
        </div>
      </div>
    </section>
  )
}
