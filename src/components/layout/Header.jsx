import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'motion/react'
import { NAV_LINKS } from '../../data/navigation'

/**
 * Sticky site header with smooth scroll transition, animated mobile drawer,
 * and a subtle editorial scroll progress indicator.
 *
 * @param {{ navOpen: boolean, setNavOpen: Function }} props
 */
export default function Header({ navOpen, setNavOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="headbar">
        <a href="#accueil" className="brand">
          <strong>Didascalie</strong>
          <span>Père Paul-Marie MBA</span>
        </a>

        <button
          className="navtoggle"
          aria-label={navOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={navOpen}
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Navigation */}
        <nav className="mainnav desktop-only">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {navOpen && (
          <motion.nav
            key="mobile-nav"
            className="mainnav mobile-drawer"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setNavOpen(false)}>
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Subtle editorial scroll progress line */}
      {!shouldReduceMotion && (
        <motion.div
          className="scroll-progress-bar"
          style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
