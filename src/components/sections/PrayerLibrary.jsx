import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Headphones } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import Chip from '../ui/Chip'
import Pill from '../ui/Pill'
import BlurFade from '../magicui/blur-fade'
import useCategoryFilter from '../../hooks/useCategoryFilter'
import { PRAYERS, PRAYER_FILTERS } from '../../data/prayers'

/**
 * Prayer library section — filterable list of prayers with PDF/audio access.
 */
export default function PrayerLibrary() {
  const { active, setActive, filtered } = useCategoryFilter(PRAYERS, {
    defaultKey: 'all',
    matchKey: 'cat',
  })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="night prayer-library" id="prieres">
      <div className="wrap">
        <BlurFade inView delay={0.05} yOffset={6}>
          <Eyebrow>Bibliothèque</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.12} yOffset={8}>
          <h2 className="title">Des prières à lire, écouter et emporter avec vous.</h2>
        </BlurFade>
        <BlurFade inView delay={0.18} yOffset={8}>
          <p className="lede">
            Chaque prière est disponible en texte imprimable et en version audio, pour prier chez
            vous, en route, ou en communauté.
          </p>
        </BlurFade>

        <div className="filterbar">
          {PRAYER_FILTERS.map((f) => (
            <Chip key={f.key} active={active === f.key} onClick={() => setActive(f.key)}>
              {f.label}
            </Chip>
          ))}
        </div>

        <div className="plist">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {filtered.map((p) => (
                <div className="prow" key={p.title}>
                  <div>
                    <h3>{p.title}</h3>
                    <span className="tag">{p.tag}</span>
                    <p className="desc">{p.desc}</p>
                  </div>
                  <div className="actions">
                    <Pill>PDF</Pill>
                    <Pill solid>
                      <Headphones size={15} strokeWidth={2} aria-hidden="true" />
                      <span>Audio</span>
                    </Pill>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
