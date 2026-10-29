import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { profile } from '../../lib/site'

/**
 * About portrait: a second, different still of him in a framed dark card.
 *
 * The reference sets a standing, hand-in-pocket portrait in a dark card with a
 * bright gradient frame at two opposite corners, and a gradient of light that
 * travels across the WHOLE image, background and figure alike, not only the
 * clothes. This follows that, in the site's own colours: the page is white and
 * blue, so the light is white with a cool blue edge instead of the reference's
 * gold, and the frame is the accent blue, brightest at the corner and fading
 * along its arms.
 *
 * Two lights, both soft and both screen-blended so they add light instead of
 * painting a patch:
 *  - a spot that follows the cursor across the whole card;
 *  - a diagonal sheen that sweeps across the card as the page scrolls past it.
 *
 * Touch screens have no hover, so the spot rests upper-left where the stage
 * light sits. Reduced motion gets the still with no drift, no tracking, no sweep.
 */

/** One L-shaped corner: two arms that glow at the corner and fade out. */
function Corner({ at, show, delay }: { at: 'tl' | 'br'; show: boolean; delay: number }) {
  const reduceMotion = useReducedMotion()
  const tl = at === 'tl'
  const arm = tl
    ? 'linear-gradient(to right, #9db4ff 0%, #3157e8 38%, rgba(49,87,232,0) 100%)'
    : 'linear-gradient(to left, #9db4ff 0%, #3157e8 38%, rgba(49,87,232,0) 100%)'
  const armV = tl
    ? 'linear-gradient(to bottom, #9db4ff 0%, #3157e8 38%, rgba(49,87,232,0) 100%)'
    : 'linear-gradient(to top, #9db4ff 0%, #3157e8 38%, rgba(49,87,232,0) 100%)'
  const glow = '0 0 12px rgba(49,87,232,0.55)'
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute h-28 w-28 ${
        tl ? '-left-[7px] -top-[7px]' : '-bottom-[7px] -right-[7px]'
      }`}
      style={{ transformOrigin: tl ? 'top left' : 'bottom right' }}
      initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
      animate={show || reduceMotion ? { scale: 1, opacity: 1 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className={`absolute h-[3px] w-full ${tl ? 'left-0 top-0' : 'bottom-0 right-0'}`}
        style={{ background: arm, boxShadow: glow }}
      />
      <span
        className={`absolute h-full w-[3px] ${tl ? 'left-0 top-0' : 'bottom-0 right-0'}`}
        style={{ background: armV, boxShadow: glow }}
      />
    </motion.span>
  )
}

export function AboutPortrait() {
  const reduceMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { amount: 0.35, once: true })
  const [hover, setHover] = useState(false)

  // The photograph drifts against the frame, and the sheen sweeps across it,
  // as the card crosses the screen.
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [22, -22])
  const sheenX = useTransform(scrollYProgress, [0.1, 0.9], reduceMotion ? [120, 120] : [-10, 110])
  const sheenPos = useMotionTemplate`${sheenX}%`
  const SHEEN =
    'linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.13) 47%, rgba(190,208,255,0.2) 50%, rgba(255,255,255,0.1) 53%, transparent 62%)'

  // Cursor position inside the card, in percent.
  const REST_X = 30
  const REST_Y = 20
  const px = useMotionValue(REST_X)
  const py = useMotionValue(REST_Y)
  const sx = useSpring(px, { stiffness: 90, damping: 20 })
  const sy = useSpring(py, { stiffness: 90, damping: 20 })
  const spot = useMotionTemplate`radial-gradient(ellipse 62% 50% at ${sx}% ${sy}%, rgba(255,255,255,0.26), rgba(176,198,255,0.1) 48%, transparent 74%)`

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return
    const r = innerRef.current?.getBoundingClientRect()
    if (!r) return
    px.set(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)))
    py.set(Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100)))
  }

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-sm"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false)
        px.set(REST_X)
        py.set(REST_Y)
      }}
      onPointerMove={onMove}
    >
      <Corner at="tl" show={inView} delay={0} />
      <Corner at="br" show={inView} delay={0.14} />

      <div
        ref={innerRef}
        className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-[#101114]"
      >
        {/* Static stage light from above and to one side, as in the hero. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 52% at 28% 10%, rgba(200,212,235,0.16), rgba(200,212,235,0.04) 55%, transparent 76%)',
          }}
        />

        {/* Top-aligned and taller than the card, so the crop lands at his
            thighs, like the reference; a little left of centre because the
            figure sits right of centre in the cut-out. */}
        <motion.div
          className="absolute left-1/2 top-0 aspect-[1400/1979] h-[116%] -translate-x-[52.5%]"
          style={{ y: drift }}
          animate={{ scale: hover && !reduceMotion ? 1.025 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/assets/nirvair/about-standing.webp"
            alt={profile.name}
            loading="lazy"
            draggable={false}
            className="h-full w-full select-none"
          />
        </motion.div>

        {/* Light over the WHOLE card: the cursor spot and the scroll sheen. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: spot, mixBlendMode: 'screen' }}
          animate={{ opacity: hover ? 1 : 0.45 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: SHEEN,
            backgroundSize: '260% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: sheenPos,
            mixBlendMode: 'screen',
          }}
        />

        {/* Floor: the cut at his thighs reads as the end of the card. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5"
          style={{ background: 'linear-gradient(to top, #101114, transparent)' }}
        />
      </div>
    </div>
  )
}
