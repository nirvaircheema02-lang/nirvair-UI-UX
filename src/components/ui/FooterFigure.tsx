import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'
import { profile } from '../../lib/site'

/**
 * A quiet portrait in the footer's empty right half.
 *
 * Deliberately lighter than the hero: his real cut-out, dimmed, dissolving into
 * the page at its top and bottom, with the same warm side light the hero uses.
 * That light is a drop-shadow thrown to his LEFT (the side the hero lights), so
 * it traces his own silhouette without a pre-rendered mask. Two things drive it:
 * the scroll, which brings it up as the footer arrives (calm at rest, as in the
 * reference), and the cursor, which moves the source a few pixels across him.
 * Both stay subtle; neither is in the reference's footage, which shows no
 * cursor, so the pointer part is kept small and is desktop-only.
 */
export function FooterFigure() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const arrive = useSpring(useTransform(scrollYProgress, [0.2, 0.9], [0, 1]), {
    stiffness: 90,
    damping: 24,
  })

  const px = useMotionValue(0)
  const spx = useSpring(px, { stiffness: 70, damping: 20 })
  useEffect(() => {
    if (reduceMotion) return
    const move = (e: PointerEvent) => px.set((e.clientX / window.innerWidth - 0.5) * 2)
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [px, reduceMotion])

  const offset = useTransform(spx, [-1, 1], [-9, -3])
  const alpha = useTransform(arrive, [0, 1], [0.08, 0.34])
  const spread = useTransform(arrive, [0, 1], [3, 8])
  const filter = useMotionTemplate`drop-shadow(${offset}px 0px ${spread}px rgba(255,166,104,${alpha}))`
  const opacity = useTransform(arrive, [0, 1], [0.3, 0.52])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-[3%] hidden w-[38%] md:block"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 20%, black 52%, transparent 86%), linear-gradient(to right, transparent 0%, black 30%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 20%, black 52%, transparent 86%), linear-gradient(to right, transparent 0%, black 30%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    >
      <motion.img
        src="/assets/nirvair/nirvair.png"
        alt={profile.name}
        loading="lazy"
        className="absolute bottom-0 right-0 h-[96%] w-auto max-w-none select-none object-contain"
        style={{ filter, opacity }}
      />
    </div>
  )
}
