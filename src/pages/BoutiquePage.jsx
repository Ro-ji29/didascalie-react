import { Link } from 'react-router-dom'
import BlurFade from '../components/magicui/blur-fade'
import { BOOK_SOURCES } from '../data/book-sources'

const PLACEHOLDER_CARDS = Array.from({ length: 4 })

export default function BoutiquePage() {
  return (
    <main className="boutique-page">
      <div className="wrap boutique-shell">
        <BlurFade inView delay={0.05} yOffset={8}>
          <div className="boutique-page-header">
            <div>
              <span className="boutique-page-kicker">Boutique</span>
              <h1>Livres</h1>
            </div>
            <Link to="/" className="boutique-back-link">
              ← Retour à l'accueil
            </Link>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1} yOffset={10}>
          <section className="boutique-catalogue" aria-labelledby="boutique-catalogue-title">
            <div className="boutique-section-heading">
              <span className="boutique-page-kicker">Sélection</span>
              <h2 id="boutique-catalogue-title">Les livres</h2>
              <p>Le catalogue complet sera progressivement disponible ici.</p>
            </div>
            <div className="shopgrid boutique-placeholder-grid">
              {PLACEHOLDER_CARDS.map((_, index) => (
                <article className="prod prod-placeholder" key={index} aria-label="Livre à venir">
                  <div className="cover cover-placeholder" aria-hidden="true">
                    <span className="cover-line cover-line--wide" />
                    <span className="cover-line cover-line--medium" />
                    <span className="cover-line cover-line--short" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </BlurFade>

        <BlurFade inView delay={0.16} yOffset={10}>
          <section className="book-sources" aria-labelledby="book-sources-title">
            <div className="boutique-section-heading">
              <span className="boutique-page-kicker">Disponibilité</span>
              <h2 id="book-sources-title">Où se procurer les livres ?</h2>
              <p>Pour acheter ou obtenir un livre, consultez le point de vente de votre région.</p>
            </div>
            <div className="book-sources-grid">
              {BOOK_SOURCES.map((source) => (
                <article className="book-source" key={source.location}>
                  <h3>{source.location}</h3>
                  {source.contacts?.map((contact) => (
                    <div key={contact} className="book-source-contact">
                      {contact}
                    </div>
                  ))}
                  {source.note && <p>{source.note}</p>}
                </article>
              ))}
            </div>
          </section>
        </BlurFade>
      </div>
    </main>
  )
}
