import Eyebrow from '../ui/Eyebrow'
import BlurFade from '../magicui/blur-fade'

const TIMELINE_STEPS = [
  { yr: '2002', desc: 'Ordination sacerdotale.' },
  { yr: 'Burkina Faso', desc: 'Responsable de la Communauté des Béatitudes.' },
  {
    yr: 'Abidjan & Issia',
    desc: 'Responsable des Béatitudes et recteur du sanctuaire marial diocésain Notre-Dame de la Délivrance.',
  },
  {
    yr: 'Aujourd’hui',
    desc: 'Docteur en théologie dogmatique, auteur, et prédicateur de retraites en Afrique et à l’international.',
  },
]

/**
 * "Le Père" section — biography and timeline of Père Paul-Marie MBA.
 */
export default function LePere() {
  return (
    <section className="day" id="pere">
      <div className="wrap">
        <BlurFade inView delay={0.05} yOffset={6}>
          <Eyebrow>Le Père</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.12} yOffset={8}>
          <h2 className="title">
            Un parcours au service de l'Évangile, de l'Afrique de l'Ouest à aujourd'hui.
          </h2>
        </BlurFade>

        <div className="pere-grid">
          <BlurFade inView delay={0.18} yOffset={10}>
            <div className="portrait">
              <img
                src="/images/gallery/492524271_2393638071020543_245802308009930249_n.jpg"
                alt="Père Paul-Marie MBA en mission"
              />
            </div>
          </BlurFade>

          <div className="bio">
            <BlurFade inView delay={0.2} yOffset={8}>
              <p>
                Prêtre depuis 2002, le Père Paul-Marie MBA est d'origine gabonaise. Après avoir
                rencontré le Seigneur par le Renouveau charismatique, il rejoint la Communauté des
                Béatitudes, dont il deviendra responsable au Burkina Faso puis en Côte d'Ivoire.
              </p>
              <p>
                Docteur en théologie dogmatique et spécialiste de Saint Jean Eudes, il est auteur de
                plusieurs traités spirituels et prédicateur de retraites en Afrique et au-delà.
              </p>
            </BlurFade>

            <div className="timeline">
              {TIMELINE_STEPS.map((step, idx) => (
                <BlurFade key={step.yr} inView delay={0.25 + idx * 0.08} yOffset={6}>
                  <div className="tlrow">
                    <div className="yr">{step.yr}</div>
                    <div className="desc">{step.desc}</div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
