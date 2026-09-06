import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useState, type ReactNode } from 'react'

/**
 * Scroll reveal: content resolves into focus as it enters the viewport.
 *
 * The timing is taken from measuring two Framer references rather than guessed
 * — saastify (translateY 50px, 1170ms spring, 200ms stagger) and nakula
 * (blur(10px) -> 0, 1000ms, cubic-bezier(0,0,0,1), 50ms stagger). This combines
 * the two: the blur gives the soft "develops into focus" quality, the rise
 * gives the sense of arrival, and the long ease-out lets both settle rather
 * than snap.
 *
 * Everything is gated on prefers-reduced-motion: no travel, no blur, no delay.
 */
type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right'
  distance?: number
  /** @deprecated use `distance` — kept for backward compatibility */
  y?: number
  /** Opt out of the blur where it would be costly or unwanted. */
  blur?: boolean
  id?: string
}

const DURATION = 0.9
const EASE = [0.16, 1, 0.3, 1] as const
const BLUR_PX = 8

export function Reveal({
  children,
  delay = 0,
  className,
  direction = 'up',
  distance,
  y,
  blur = true,
  id,
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const [settled, setSettled] = useState(false)

  // Horizontal offset must not exceed the page gutter (px-6 = 24px): a larger
  // value leaves a direction="right" element overhanging the viewport in its
  // hidden state, which widens the layout viewport on phones and visibly
  // shifts the fixed header until the element is scrolled past. Vertical travel
  // is unconstrained because a transform never affects scroll width.
  const offset = distance ?? y ?? (direction === 'up' ? 32 : 24)
  const withBlur = blur && !reduceMotion

  const hidden = {
    opacity: 0,
    x: reduceMotion ? 0 : direction === 'left' ? -offset : direction === 'right' ? offset : 0,
    y: reduceMotion ? 0 : direction === 'up' ? offset : 0,
    filter: withBlur ? `blur(${BLUR_PX}px)` : 'none',
  }

  const variants: Variants = {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: withBlur ? 'blur(0px)' : 'none',
      transition: {
        duration: reduceMotion ? 0 : DURATION,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      },
    },
  }

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={variants}
      onAnimationComplete={() => setSettled(true)}
      // Even blur(0px) keeps a compositing surface alive for the element and
      // everything inside it. Once the reveal has finished the filter has no
      // job left, so drop it and let large screenshots render normally.
      style={settled ? { filter: 'none' } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}
