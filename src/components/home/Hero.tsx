import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { heroCopy, profile } from '../../lib/site'
import { AmbientSmoke } from '../ui/_ambient-smoke'
import { HeroFigure } from '../ui/_hero-figure'
import { RevealHeadline } from '../ui/_hero-headline'
import { DotField } from '../ui/DotField'

function HeroPortrait({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const [errored, setErrored] = useState(false)
  const reduceMotion = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springX = useSpring(px, { stiffness: 100, damping: 16, mass: 0.6 })
  const springY = useSpring(py, { stiffness: 100, damping: 16, mass: 0.6 })

  const rotateY = useTransform(springX, [0, 1], [-7, 7])
  const rotateX = useTransform(springY, [0, 1], [6, -6])
  const shiftX = useTransform(springX, [0, 1], [-8, 8])
  const shiftY = useTransform(springY, [0, 1], [-6, 6])

  useEffect(() => {
    const el = containerRef.current
    if (!el || reduceMotion) return

    function handleMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      px.set(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
      py.set(Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)))
    }
    function handleLeave() {
      px.set(0.5)
      py.set(0.5)
    }

    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [containerRef, px, py, reduceMotion])

  if (errored) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center border border-dashed border-dark-border px-6 text-center">
        <div>
          <p className="font-serif text-6xl text-dark-ink-soft/70">NS</p>
          <p className="mt-4 text-xs text-dark-ink-soft/60">
            Portrait cut-out pending final asset
          </p>
        </div>
      </div>
    )
  }

  const fade = 'linear-gradient(to bottom, black 80%, transparent 97%)'

  return (
    <div style={{ perspective: 1000 }}>
      <motion.img
        src="/assets/nirvair/nirvair.png"
        alt={profile.name}
        onError={() => setErrored(true)}
        className="h-full w-full object-contain object-bottom"
        loading="eager"
        style={{
          rotateX,
          rotateY,
          x: shiftX,
          y: shiftY,
          maskImage: fade,
          WebkitMaskImage: fade,
        }}
      />
    </div>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section
      id="main"
      ref={heroRef}
      // The portrait cut fills the first screen outright: the figure is sized
      // against the hero, so a hero shorter than the window leaves him small.
      className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden bg-dark text-dark-ink md:min-h-[65svh]"
    >
      <AmbientSmoke />
      <HeroFigure />
      <DotField tone="dark" pointer parallax={12} drift={9} centerRelief />

      <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* The lit figure sits exactly where this word runs, and pale letters
            across his jacket read as a printing fault, so it fades out before
            it reaches him. */}
        <span
          style={{
            maskImage: 'linear-gradient(to right, black 34%, transparent 64%)',
            WebkitMaskImage: 'linear-gradient(to right, black 34%, transparent 64%)',
          }}
          className="absolute -right-4 bottom-0 font-sans text-[26vw] font-semibold leading-none tracking-tighter text-white/[0.012] md:text-[18vw]"
        >
          DESIGN
        </span>
      </div>

      {/* Equal air above and below the text block, and little of it: the hero
          reads as one composition in one viewport. */}
      <div className="relative mx-auto w-full max-w-6xl flex-1 px-6 py-24 md:pb-24 md:pt-32">
        {/* The figure is a full-bleed layer on desktop, so the grid collapses to
            the text column and the headline keeps its measure. */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_0] md:items-center md:gap-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-dark-ink"
            >
              <span aria-hidden className="h-px w-9 bg-accent" />
              {profile.name} · {heroCopy.eyebrow}
            </motion.p>

            <RevealHeadline
              text={heroCopy.headline}
              breakAfter={['systems', 'scalable']}
              className="mt-6 max-w-[14em] font-sans text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-dark-ink md:text-[2.5rem] lg:text-[3.1rem]"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-md text-base leading-relaxed text-dark-ink-soft"
            >
              {heroCopy.supporting}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-dark-ink px-6 py-3 text-sm font-medium text-dark transition-opacity hover:opacity-85"
              >
                View selected work
                <ArrowDown size={16} />
              </a>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border border-dark-border px-6 py-3 text-sm font-medium text-dark-ink transition-colors hover:border-dark-ink-soft"
              >
                Resume
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Phones get the in-column portrait; the full-bleed figure is desktop only. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-xs md:hidden"
          >
            <HeroPortrait containerRef={heroRef} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
