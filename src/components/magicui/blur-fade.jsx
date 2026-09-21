import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * BlurFade — Magic UI component for subtle, editorial fade & blur entrance animations.
 * Automatically respects user's prefers-reduced-motion preference.
 */
export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.45,
  delay = 0,
  yOffset = 8,
  inView = false,
  inViewMargin = '-35px',
  blur = '4px',
}) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin, amount: 0.2 })
  const isInView = !inView || inViewResult
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)')
    const handleChange = (event) => setIsMobile(event.matches)

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const motionY = isMobile ? Math.min(yOffset, 5) : yOffset
  const mobileTiming =
    yOffset >= 9
      ? { delayScale: 0.72, duration: Math.max(duration, 0.64) }
      : yOffset >= 7
        ? { delayScale: 0.7, duration: Math.max(duration, 0.58) }
        : { delayScale: 0.65, duration: Math.max(duration, 0.52) }
  const motionDelay = isMobile ? Math.min(delay * mobileTiming.delayScale, 0.34) : delay
  const motionDuration = isMobile ? mobileTiming.duration : duration
  const motionBlur = isMobile ? '0px' : blur

  const defaultVariants = {
    hidden: {
      y: shouldReduceMotion ? 0 : motionY,
      opacity: 0,
      filter: shouldReduceMotion ? 'none' : `blur(${motionBlur})`,
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
  }

  const combinedVariants = variant || defaultVariants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      exit="hidden"
      variants={combinedVariants}
      transition={{
        delay: shouldReduceMotion ? 0 : 0.04 + motionDelay,
        duration: shouldReduceMotion ? 0.15 : motionDuration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
