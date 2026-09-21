import BlurFade from '../magicui/blur-fade'

/**
 * Enhanced site footer with editorial columns, spiritual citation,
 * organized links, and a smooth scroll-to-top micro-interaction.
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="wrap">
        <BlurFade inView delay={0.05} yOffset={8}>
          <div className="footer-main">
            {/* Colonne 1 : Marque & Mission */}
            <div className="footer-brand">
              <a href="#accueil" className="brand">
                <strong>Didascalie</strong>
                <span>Père Paul-Marie MBA</span>
              </a>
              <p className="desc">
                Plateforme d'édification spirituelle et de prière catholique. Retrouvez homélies,
                prières à emporter et retraites pour approfondir votre foi au quotidien.
              </p>
              <div className="footer-verse">
                « Ce que vous avez appris, reçu, entendu et vu en moi, pratiquez-le. »
                <br />
                <span style={{ fontStyle: 'normal', opacity: 0.8 }}>— Ph 4, 9</span>
              </div>
            </div>

            {/* Colonne 2 : Navigation */}
            <div className="footer-col">
              <h4>Le Ministère</h4>
              <ul>
                <li>
                  <a href="#accueil">Accueil</a>
                </li>
                <li>
                  <a href="#pere">Le Père Paul-Marie</a>
                </li>
                <li>
                  <a href="#prieres">Bibliothèque de prières</a>
                </li>
                <li>
                  <a href="#enseignements">Enseignements</a>
                </li>
                <li>
                  <a href="#tv">Didascalie TV</a>
                </li>
                <li>
                  <a href="#agenda">Agenda des retraites</a>
                </li>
              </ul>
            </div>

            {/* Colonne 3 : Ressources & Soutien */}
            <div className="footer-col">
              <h4>Ressources &amp; Don</h4>
              <ul>
                <li>
                  <a href="#boutique">Boutique &amp; Livres</a>
                </li>
                <li>
                  <a href="#galerie">Galerie des temps forts</a>
                </li>
                <li>
                  <a href="#don">Faire un don</a>
                </li>
                <li>
                  <a href="#contact">Demande de messe &amp; prière</a>
                </li>
              </ul>
            </div>

            {/* Colonne 4 : Issia & Présence */}
            <div className="footer-col">
              <h4>Sanctuaire &amp; Contact</h4>
              <div className="footer-contact-item">
                <span className="lbl">Lieu de ministère</span>
                <span className="val">Issia, Côte d'Ivoire</span>
              </div>
              <div className="footer-contact-item">
                <span className="lbl">Sanctuaire marial</span>
                <span className="val">Notre-Dame de la Délivrance</span>
              </div>
              <div className="footer-contact-item">
                <span className="lbl">Contact direct</span>
                <a href="mailto:contact@didascalie-ministry.org" style={{ opacity: 0.9 }}>
                  contact@didascalie-ministry.org
                </a>
              </div>
              <div className="footer-contact-item" style={{ marginTop: '8px' }}>
                <span className="lbl">Réseaux</span>
                <span className="val">YouTube · Facebook · Instagram</span>
              </div>
            </div>
          </div>

          {/* Barre inférieure : Copyright & Remonter */}
          <div className="footer-bottom">
            <div className="footer-copy">
              © {new Date().getFullYear()} Didascalie — Ministère du Père Paul-Marie MBA. Tous
              droits réservés.
            </div>

            <button
              type="button"
              className="scroll-top-btn"
              onClick={scrollToTop}
              aria-label="Remonter en haut de la page"
            >
              <span>↑ Haut de page</span>
            </button>
          </div>
        </BlurFade>
      </div>
    </footer>
  )
}
