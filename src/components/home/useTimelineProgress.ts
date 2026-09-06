import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState, type RefObject } from 'react'

export type NodePoint = { x: number; y: number; frac: number }

export type Geometry = {
  x: number
  top: number
  height: number
  nodes: NodePoint[]
}

/** Progress 0 when the list's first node sits this far down the viewport. */
const START_VH = 0.8
/** Progress 1 when the list's last node reaches this far down the viewport. */
const END_VH = 0.35

/**
 * Position of `el` within `container` using layout offsets.
 *
 * Deliberately not getBoundingClientRect: the step rows carry a live
 * translateY from Reveal's entrance animation, so rect-based measurement
 * captures a transient position and leaves the nodes offset by the entrance
 * distance until something happens to re-measure. offsetTop/offsetLeft ignore
 * transforms, so this always yields the settled layout position.
 */
function offsetWithin(el: HTMLElement, container: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== container) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

function measureGeometry(container: HTMLElement): Geometry | null {
  const nodeEls = Array.from(container.querySelectorAll<HTMLElement>('[data-timeline-node]'))
  if (nodeEls.length < 2) return null

  const points = nodeEls.map((el) => {
    const o = offsetWithin(el, container)
    return { x: o.x + el.offsetWidth / 2, y: o.y + el.offsetHeight / 2 }
  })

  const top = points[0].y
  const height = points[points.length - 1].y - top
  if (height <= 0) return null

  return {
    x: points[0].x,
    top,
    height,
    nodes: points.map((p) => ({ x: p.x, y: p.y, frac: (p.y - top) / height })),
  }
}

/**
 * Offset of `innerRef` within `outerRef`, kept current across resizes.
 *
 * Lets a background rendered on the section translate coordinates that were
 * measured against the inner steps column — so a full-width field can still
 * place the activation head exactly on the timeline.
 *
 * `outerRef` must be positioned (relative/absolute), otherwise it is skipped
 * by the offsetParent chain and the walk overshoots to the page origin.
 */
export function useOffsetWithin(
  innerRef: RefObject<HTMLElement | null>,
  outerRef: RefObject<HTMLElement | null>,
): { x: number; y: number } {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const inner = innerRef.current
    const outer = outerRef.current
    if (!inner || !outer) return

    function measure() {
      const next = offsetWithin(inner as HTMLElement, outer as HTMLElement)
      setOffset((prev) => (prev.x === next.x && prev.y === next.y ? prev : next))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(outer)
    ro.observe(inner)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [innerRef, outerRef])

  return offset
}

export type TimelineProgress = {
  geometry: Geometry | null
  progress: MotionValue<number>
  velocity: MotionValue<number>
  energy: MotionValue<number>
  reduceMotion: boolean
}

/**
 * Scroll-driven progress for a vertical timeline, measured from the
 * `[data-timeline-node]` anchors inside `containerRef`.
 *
 * Progress is driven by a manual scroll listener rather than
 * useScroll({ target }) because consumers render inside their own target, so
 * the ref is still null when Framer would try to attach to it.
 */
export function useTimelineProgress(
  containerRef: RefObject<HTMLDivElement | null>,
): TimelineProgress {
  const reduceMotion = useReducedMotion() ?? false
  const [geometry, setGeometry] = useState<Geometry | null>(null)
  const geoRef = useRef<Geometry | null>(null)

  const rawProgress = useMotionValue(0)
  // Light spring — settles fast enough to feel scroll-locked, but takes the
  // step out of wheel/trackpad input so the line never advances in jerks.
  const smoothed = useSpring(rawProgress, { stiffness: 320, damping: 42, mass: 0.25 })
  const progress = reduceMotion ? rawProgress : smoothed

  // The leading edge energises while the line is actually being drawn and
  // settles when the user stops — no autonomous pulsing loop.
  const velocity = useVelocity(progress)
  const energyTarget = useTransform(velocity, (v) => Math.min(1, Math.abs(v) * 2.4))
  const energy = useSpring(energyTarget, { stiffness: 180, damping: 30, mass: 0.3 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function measure() {
      const next = measureGeometry(container as HTMLElement)
      if (!next) return
      geoRef.current = next
      setGeometry((prev) => {
        if (
          prev &&
          prev.x === next.x &&
          prev.top === next.top &&
          prev.height === next.height &&
          prev.nodes.length === next.nodes.length
        ) {
          return prev
        }
        return next
      })
    }

    function updateProgress() {
      const el = containerRef.current
      const g = geoRef.current
      if (!el || !g) return

      // Derive viewport position from the container plus layout offsets rather
      // than reading the rows directly — the rows are mid-transform during the
      // entrance animation, which would skew progress.
      const cTop = el.getBoundingClientRect().top
      const firstY = cTop + g.top
      const lastY = firstY + g.height

      const vh = window.innerHeight
      const startLine = START_VH * vh
      const endLine = END_VH * vh
      const total = lastY - firstY + (startLine - endLine)
      if (total <= 0) return

      rawProgress.set(Math.min(1, Math.max(0, (startLine - firstY) / total)))
    }

    // Measure synchronously: layout is committed by the time this effect runs,
    // and rAF is throttled to ~1fps in hidden/background tabs.
    measure()
    updateProgress()

    let raf = 0
    function scheduleMeasure() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        measure()
        updateProgress()
      })
    }

    const ro = new ResizeObserver(scheduleMeasure)
    ro.observe(container)
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', scheduleMeasure)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', scheduleMeasure)
    }
  }, [containerRef, rawProgress])

  return { geometry, progress, velocity, energy, reduceMotion }
}
