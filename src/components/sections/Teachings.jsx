import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Search } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import Chip from '../ui/Chip'
import BlurFade from '../magicui/blur-fade'
import { TEACHINGS, TEACHING_FILTERS } from '../../data/teachings'

/**
 * Teachings section — searchable, filterable grid of homily cards.
 */
export default function Teachings() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [query, setQuery] = useState('')
  const shouldReduceMotion = useReducedMotion()

  const visible = TEACHINGS.filter((t) => {
    const matchesFilter = activeFilter === 'Tous' || t.tag === activeFilter
    const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <section className="day" id="enseignements">
      <div className="wrap">
        <BlurFade inView delay={0.05} yOffset={6}>
          <Eyebrow>Enseignements</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.12} yOffset={8}>
          <h2 className="title">Des homélies classées par thème, pas juste par date.</h2>
        </BlurFade>
        <BlurFade inView delay={0.18} yOffset={8}>
          <p className="lede">
            Retrouvez facilement un enseignement sur ce que vous traversez aujourd'hui.
          </p>
        </BlurFade>

        <div className="search">
          <Search size={18} strokeWidth={1.8} aria-hidden="true" />
          <input
            type="text"
            placeholder="Rechercher un enseignement…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="filterbar">
          {TEACHING_FILTERS.map((f) => (
            <Chip key={f} active={activeFilter === f} onClick={() => setActiveFilter(f)}>
              {f}
            </Chip>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${query}`}
            className="tgrid"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {visible.map((t) => (
              <div className="tcard" key={t.title}>
                <div className="frame" />
                <h3>{t.title}</h3>
                <div className="meta">
                  {t.tag} · {t.duration}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
