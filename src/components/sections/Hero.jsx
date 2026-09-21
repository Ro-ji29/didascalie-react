import { motion, useReducedMotion } from 'motion/react'
import Eyebrow from '../ui/Eyebrow'
import BlurFade from '../magicui/blur-fade'

/**
 * Hero section — opening banner with progressive reveals and a subtle, slow-breathing ambient aura.
 */
export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const quickItems = [
    {
      k: "Aujourd'hui",
      title: 'Prière du jour : pour la paix du cœur',
      href: '#prieres',
      label: 'Lire & télécharger',
    },
    {
      k: 'Dernière homélie',
      title: "Comment guérir des blessures de l'âme ?",
      href: '#enseignements',
      label: 'Écouter',
    },
    {
      k: 'Prochain rendez-vous',
      title: "Retraite de l'Avent — 6 décembre",
      href: '#agenda',
      label: "Voir l'agenda",
    },
  ]

  return (
    <section className="night hero" id="accueil">
      {/* Very subtle, slow-moving ambient contemplative aura */}
      {!shouldReduceMotion && (
        <motion.div
          className="hero-ambient-aura"
          animate={{
            y: [-8, 8, -8],
            opacity: [0.06, 0.11, 0.06],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      )}

      <div className="wrap">
        <BlurFade delay={0.05} yOffset={6}>
          <Eyebrow>Prier · Apprendre · Servir</Eyebrow>
        </BlurFade>

        <BlurFade delay={0.15} yOffset={10}>
          <h1>Une mission qui se vit chaque jour, avec vous.</h1>
        </BlurFade>

        <BlurFade delay={0.25} yOffset={10}>
          <p className="sub">
            Le ministère du Père Paul-Marie MBA : des prières à emporter, des enseignements pour
            grandir dans la foi, et une communauté qui avance ensemble — où que vous soyez.
          </p>
        </BlurFade>

        <div className="quickrow">
          {quickItems.map((item, index) => (
            <div key={item.k} className="quickitem">
              <BlurFade delay={0.35 + index * 0.1} yOffset={8}>
                <div className="k">{item.k}</div>
                <h3>{item.title}</h3>
                <a className="go" href={item.href}>
                  {item.label}{' '}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </BlurFade>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
