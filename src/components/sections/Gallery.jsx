import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Eyebrow from '../ui/Eyebrow'
import BlurFade from '../magicui/blur-fade'
import { GALLERY_TABS, GALLERY_ITEMS } from '../../data/gallery'

/**
 * Gallery section — tabbed photo grid with progressive reveals,
 * subtle zoom interactions, and an accessible, smooth Lightbox viewer.
 */
export default function Gallery() {
  const [tab, setTab] = useState(GALLERY_TABS[0])
  const [activeItem, setActiveItem] = useState(null)
  const shouldReduceMotion = useReducedMotion()
  const visibleItems = GALLERY_ITEMS.filter((item) => item.cat === tab)

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveItem(null)
    }
    if (activeItem) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeItem])

  return (
    <section className="day" id="galerie">
      <div className="wrap">
        <BlurFade inView delay={0.05} yOffset={6}>
          <Eyebrow>Galerie</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.12} yOffset={8}>
          <h2 className="title">Les temps forts du ministère, organisés par catégorie.</h2>
        </BlurFade>

        <div className="gtabs">
          {GALLERY_TABS.map((t) => (
            <div
              key={t}
              className={`gtab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setTab(t)}
            >
              {t}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="ggrid"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {visibleItems.map((item) => (
              <div
                className="gitem"
                key={item.caption}
                onClick={() => setActiveItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveItem(item)}
                aria-label={`Agrandir la photo : ${item.caption}`}
              >
                <img src={item.image} alt={item.caption} loading="lazy" />
                <div className="cover-overlay" aria-hidden="true" />
                <span className="view-badge" aria-hidden="true">
                  ✦ Voir
                </span>
                <span className="cap">{item.caption}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              className="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveItem(null)}
            >
              <motion.div
                className="lightbox-content"
                initial={
                  shouldReduceMotion ? { scale: 1, opacity: 0 } : { scale: 0.95, opacity: 0, y: 10 }
                }
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion ? { scale: 1, opacity: 0 } : { scale: 0.95, opacity: 0, y: 8 }
                }
                transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="lightbox-close"
                  onClick={() => setActiveItem(null)}
                  aria-label="Fermer la vue agrandie"
                >
                  ✕
                </button>
                <div className="lightbox-media">
                  <img src={activeItem.image} alt={activeItem.caption} />
                </div>
                <div className="lightbox-body">
                  <h4>{activeItem.caption}</h4>
                  <p>Issia, Côte d'Ivoire · Ministère Didascalie</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
