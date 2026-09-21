import Eyebrow from '../ui/Eyebrow'
import BlurFade from '../magicui/blur-fade'
import { EVENTS } from '../../data/events'

/**
 * Agenda section — upcoming ministry events list with staggered entry reveals.
 */
export default function Agenda() {
  return (
    <section className="day" id="agenda">
      <div className="wrap">
        <BlurFade inView delay={0.05} yOffset={6}>
          <Eyebrow>Agenda</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.12} yOffset={8}>
          <h2 className="title">Les prochains rendez-vous du ministère.</h2>
        </BlurFade>

        <div className="agenda">
          {EVENTS.map((e, idx) => (
            <BlurFade key={e.title} inView delay={0.18 + idx * 0.08} yOffset={8}>
              <div className="erow">
                <div className="datebox">
                  <div className="d">{e.day}</div>
                  <div className="m">{e.month}</div>
                </div>
                <div>
                  <h3>{e.title}</h3>
                  <div className="loc">{e.loc}</div>
                </div>
                <div className="etype">{e.type}</div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
