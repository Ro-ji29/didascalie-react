import Eyebrow from '../ui/Eyebrow'
import BlurFade from '../magicui/blur-fade'
import { Link } from 'react-router-dom'

const PLACEHOLDER_CARDS = Array.from({ length: 4 })

/**
 * Shop section — editorial placeholder grid for future book covers.
 */
export default function Shop() {
  return (
    <section className="night" id="boutique">
      <div className="wrap">
        <BlurFade inView delay={0.05} yOffset={6}>
          <Eyebrow>Boutique</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.12} yOffset={8}>
          <h2 className="title">
            Livres et objets, séparés du reste pour un vrai parcours d'achat.
          </h2>
        </BlurFade>

        <div className="shopgrid">
          {PLACEHOLDER_CARDS.map((_, idx) => (
            <BlurFade key={idx} inView delay={0.18 + idx * 0.08} yOffset={10}>
              <article className="prod prod-placeholder" aria-label="Couverture de livre à venir">
                <div className="cover cover-placeholder" aria-hidden="true">
                  <span className="cover-line cover-line--wide" />
                  <span className="cover-line cover-line--medium" />
                  <span className="cover-line cover-line--short" />
                </div>
              </article>
            </BlurFade>
          ))}
        </div>

        <div className="shop-actions">
          <Link to="/boutique" className="shop-toggle">
            Voir plus
          </Link>
        </div>
      </div>
    </section>
  )
}
