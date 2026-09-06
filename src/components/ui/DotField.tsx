import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * Ambient coordinate-dot field.
 *
 * One <canvas> rather than a DOM grid: a 1440x900 field is ~1,300 points, and
 * as elements that would be 1,300 nodes the browser has to lay out and
 * composite. Canvas keeps it at a single node and one paint.
 *
 * The loop is demand-driven — it parks itself the moment nothing is moving, so
 * a settled hero costs zero frames. Parallax deliberately never redraws: it is
 * a transform on the wrapper, handed to the compositor.
 */

export type ActivationSource = {
  /** 0..1 head position along the track. */
  progress: MotionValue<number>
  /** Track start, in the field's own pixel space. */
  top: number
  height: number
  /** Track axis, so activation follows the head rather than the whole row. */
  x: number
}

type DotFieldProps = {
  tone: 'dark' | 'light'
  /** Pointer repulsion: dots are pushed clear of the cursor. Fine pointers only. */
  pointer?: boolean
  /** Max parallax travel in px (applied as a transform, both directions). */
  parallax?: number
  /** Dots near this head warm to the accent, then ease back. */
  activation?: ActivationSource | null
  /** Ambient horizontal drift in px/sec. 0 disables it. */
  drift?: number
  /** CSS mask, to fade the field into the section instead of ending square. */
  mask?: string
  /** Thins the field where the section's own content sits (hero). */
  centerRelief?: boolean
  className?: string
}

const DPR_CAP = 2
/**
 * Pointer repulsion, measured off the reference: within ~150px of the cursor
 * the field empties out and the displaced dots pile into a ring at 180-240px,
 * then flow back when the cursor leaves. It is a positional effect, not a
 * brightness one.
 */
const POINTER_RADIUS = 230
/**
 * A dot is pushed this fraction of its remaining distance to the radius, so
 * the push is strongest dead-centre and reaches zero exactly at the rim. The
 * cleared radius is therefore RADIUS x PUSH — about 143px, matching the
 * reference's measured ~150px void, with the displaced dots gathering
 * between there and 230px.
 */
const PUSH = 0.62
/** Per-frame approach rate — the same easing carries the push and the return. */
const PUSH_EASE = 0.16
/** Grid overscan, so dots pushed past an edge are replaced from outside it. */
const MARGIN_CELLS = 3
const ACT_RADIUS = 118
/**
 * Brightness swing per dot, and how slowly it cycles. The reference pairs its
 * ~9.4px/sec drift with clear per-dot brightness variation (mean change of
 * 9-15 on peaks of 20-62), so drift alone would read as a sliding texture.
 */
const TWINKLE = 0.18
const TWINKLE_SPEED = 0.55

/** Alpha ranges are the brief's 4-7%, with a few marker points a touch above. */
const TONE = {
  dark: { rgb: '255,255,255', min: 0.045, max: 0.075, marker: 0.105 },
  light: { rgb: '17,17,17', min: 0.05, max: 0.085, marker: 0.11 },
} as const

/** 2px reads as a deliberate coordinate point; 1px reads as sensor noise. */
const DOT = 2

const ACCENT_RGB = '49,87,232'
/** Peak accent alpha for an activated dot — reinforcement, never a light show. */
const ACT_ALPHA = 0.4

/** Density and travel drop on smaller screens: less to paint, less to distract. */
function metricsFor(width: number) {
  if (width < 768) return { spacing: 56, parallaxScale: 0.3, allowPointer: false }
  if (width < 1024) return { spacing: 44, parallaxScale: 0.65, allowPointer: true }
  return { spacing: 34, parallaxScale: 1, allowPointer: true }
}

/** Stable per-dot variation — same dot keeps its character across frames. */
function hash(i: number, j: number, salt: number) {
  const n = Math.sin(i * 127.1 + j * 311.7 + salt * 74.7) * 43758.5453
  return n - Math.floor(n)
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

export function DotField({
  tone,
  pointer = false,
  parallax = 0,
  activation = null,
  drift = 0,
  mask,
  centerRelief = false,
  className = '',
}: DotFieldProps) {
  const reduceMotion = useReducedMotion() ?? false
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const parallaxRaw = useMotionValue(0)
  const parallaxY = useSpring(parallaxRaw, { stiffness: 110, damping: 26, mass: 0.4 })

  // Activation reads from a MotionValue, so it must not re-run the effect on
  // every scroll frame. Latest values live in a ref the loop samples. Declared
  // above the draw effect so the ref is populated before the first paint.
  const activationRef = useRef(activation)
  useEffect(() => {
    activationRef.current = activation
  })

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const palette = TONE[tone]
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    let width = 0
    let height = 0
    let spacing = 34
    let cols = 0
    let rows = 0
    let parallaxScale = 1
    let pointerOn = false
    /** Per-dot eased activation, so dots return gently rather than snapping. */
    let act = new Float32Array(0)
    /** Per-dot eased repulsion offset. Held per dot rather than recomputed
        each frame so the return journey eases too, instead of snapping back
        the instant the cursor moves out of range. */
    let offX = new Float32Array(0)
    let offY = new Float32Array(0)

    // Smoothed pointer, in canvas space. NaN = pointer not over the field.
    let px = Number.NaN
    let py = Number.NaN
    let tx = Number.NaN
    let ty = Number.NaN
    // Influence envelope, so the field eases out when the cursor leaves rather
    // than dropping its reaction in a single frame.
    let strength = 0

    let raf = 0
    let running = false
    /** Drift and twinkle are time-based, so the loop cannot park while they
        run. It parks when the section scrolls out of view instead. */
    const driftOn = drift > 0 && !reduceMotion
    let onScreen = true
    const t0 = performance.now()

    function edgeRelief(nx: number, ny: number) {
      if (!centerRelief) return 1
      // Content lives in the middle band; keep the field to the periphery so
      // headline and portrait never read against texture.
      const d = Math.max(Math.abs(nx - 0.5) * 2, Math.abs(ny - 0.5) * 2)
      // Floor stays high enough that the grid still reads as a grid across the
      // whole hero — dropping it near zero left the centre visually empty and
      // the field looked like stray specks at the edges rather than a field.
      return 0.62 + 0.38 * smoothstep(0.28, 0.98, d)
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      const a = activationRef.current
      const headY = a && !reduceMotion ? a.top + a.progress.get() * a.height : Number.NaN
      const headX = a ? a.x : Number.NaN
      const headLive = Number.isFinite(headY)

      const pointerLive = pointerOn && Number.isFinite(px) && strength > 0.01
      let settled = true

      // The field translates right forever. `frac` is the sub-cell offset and
      // `base` the number of whole cells travelled, so a dot's identity is
      // (slot - base): it keeps its character as it crosses the screen, and a
      // new one enters from the left. Nothing ever resets visibly.
      const elapsed = (performance.now() - t0) / 1000
      const travelled = driftOn ? elapsed * drift : 0
      const frac = travelled % spacing
      const base = Math.floor(travelled / spacing)

      const origin = -MARGIN_CELLS * spacing
      for (let j = 0; j < rows; j++) {
        const by = origin + j * spacing
        for (let i = 0; i < cols; i++) {
          const bx = origin + i * spacing + frac

          // Identity travels with the dot; only `cols` are ever on screen at
          // once, so identity mod cols gives each a stable state slot that
          // follows it across the wrap without any array shuffling.
          const ident = i - base
          const v = hash(ident, j, 1)
          let alpha = palette.min + v * (palette.max - palette.min)
          const isMarker = hash(ident, j, 2) > 0.9
          if (isMarker) alpha = palette.marker

          if (driftOn) {
            const phase = hash(ident, j, 3) * Math.PI * 2
            alpha *= 1 + TWINKLE * Math.sin(elapsed * TWINKLE_SPEED + phase)
          }

          alpha *= edgeRelief(bx / width, by / height)

          const idx = j * cols + (((ident % cols) + cols) % cols)

          // Repulsion: push away from the cursor, along the cursor->dot vector.
          let tox = 0
          let toy = 0
          if (pointerLive) {
            const vx = bx - px
            const vy = by - py
            const dist = Math.hypot(vx, vy)
            if (dist < POINTER_RADIUS) {
              const push = (POINTER_RADIUS - dist) * PUSH * strength
              if (dist > 0.001) {
                tox = (vx / dist) * push
                toy = (vy / dist) * push
              } else {
                // Dot sits exactly under the cursor: no direction to push
                // along, so pick one rather than dividing by zero.
                tox = push
              }
            }
          }
          const cx = offX[idx] ?? 0
          const cy = offY[idx] ?? 0
          const nx2 = cx + (tox - cx) * PUSH_EASE
          const ny2 = cy + (toy - cy) * PUSH_EASE
          offX[idx] = nx2
          offY[idx] = ny2
          const dx = nx2
          const dy = ny2
          if (Math.abs(nx2 - tox) > 0.05 || Math.abs(ny2 - toy) > 0.05) settled = false

          // Displaced dots lift slightly so the moving ones stay legible; the
          // lift decays with the offset, so it returns on its own.
          const moved = Math.hypot(nx2, ny2)
          if (moved > 0.5) alpha *= 1 + Math.min(0.45, moved / 150)

          // Activation: target is a radial falloff around the moving head, so
          // dots warm as it arrives and cool as it leaves.
          let target = 0
          if (headLive) {
            // Measured from the displaced position: a dot pushed aside by the
            // cursor should stop being "near the head", not keep glowing where
            // it no longer is.
            const dist = Math.hypot(headX - (bx + dx), headY - (by + dy))
            if (dist < ACT_RADIUS) {
              const f = 1 - dist / ACT_RADIUS
              target = f * f
            }
          }
          const cur = act[idx] ?? 0
          // Warms quicker than it cools: arriving reads as activation,
          // leaving reads as a settle rather than a switch-off.
          const next = cur + (target - cur) * (target > cur ? 0.14 : 0.05)
          act[idx] = next
          if (Math.abs(next - target) > 0.004) settled = false

          const size = isMarker ? DOT + 0.5 : DOT
          const x = bx + dx
          const y = by + dy

          if (next > 0.01) {
            // Cross-fade neutral -> accent so nothing pops.
            ctx!.fillStyle = `rgba(${palette.rgb},${alpha * (1 - next)})`
            ctx!.fillRect(x, y, size, size)
            ctx!.fillStyle = `rgba(${ACCENT_RGB},${ACT_ALPHA * next})`
            ctx!.fillRect(x - 0.3, y - 0.3, size + 0.6, size + 0.6)
          } else {
            ctx!.fillStyle = `rgba(${palette.rgb},${alpha})`
            ctx!.fillRect(x, y, size, size)
          }

          // Coordinate ticks give the field its technical read without lines.
          if (isMarker) {
            ctx!.fillStyle = `rgba(${palette.rgb},${alpha * 0.5})`
            ctx!.fillRect(x - 2.5, y + 0.5, 7, 1)
            ctx!.fillRect(x + 0.5, y - 2.5, 1, 7)
          }
        }
      }

      return settled
    }

    function frame() {
      const settled = draw()

      const over = Number.isFinite(tx)
      if (over) {
        // Track the cursor quickly — the softness comes from the per-dot
        // easing, so smoothing here too would just read as lag.
        px = Number.isFinite(px) ? px + (tx - px) * 0.45 : tx
        py = Number.isFinite(py) ? py + (ty - py) * 0.45 : ty
      }
      // Rises quicker than it falls: arriving should feel immediate, leaving
      // should feel like the field settling rather than switching off.
      strength += ((over ? 1 : 0) - strength) * (over ? 0.22 : 0.08)
      if (!over && strength < 0.01) {
        strength = 0
        px = Number.NaN
        py = Number.NaN
      }

      const pointerSettled =
        (!over && strength === 0) ||
        (over && strength > 0.99 && Math.abs(tx - px) < 0.3 && Math.abs(ty - py) < 0.3)

      // Drift never settles by definition; visibility is what parks it.
      if (settled && pointerSettled && !driftOn) {
        running = false
        return
      }
      if (!onScreen) {
        running = false
        return
      }
      raf = requestAnimationFrame(frame)
    }

    function wake() {
      if (reduceMotion) {
        draw()
        return
      }
      if (running || !onScreen) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    function resize() {
      const rect = wrap!.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const m = metricsFor(window.innerWidth)
      spacing = m.spacing
      parallaxScale = m.parallaxScale
      pointerOn = pointer && m.allowPointer && fine && !reduceMotion

      width = Math.ceil(rect.width)
      height = Math.ceil(rect.height)
      cols = Math.ceil(width / spacing) + 1 + MARGIN_CELLS * 2
      rows = Math.ceil(height / spacing) + 1 + MARGIN_CELLS * 2
      act = new Float32Array(cols * rows)
      offX = new Float32Array(cols * rows)
      offY = new Float32Array(cols * rows)

      const dpr = Math.min(DPR_CAP, window.devicePixelRatio || 1)
      canvas!.width = Math.ceil(width * dpr)
      canvas!.height = Math.ceil(height * dpr)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      draw()
    }

    function onPointerMove(e: PointerEvent) {
      if (!pointerOn) return
      const rect = canvas!.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left - POINTER_RADIUS &&
        e.clientX <= rect.right + POINTER_RADIUS &&
        e.clientY >= rect.top - POINTER_RADIUS &&
        e.clientY <= rect.bottom + POINTER_RADIUS
      if (!inside) {
        if (Number.isFinite(tx)) {
          tx = Number.NaN
          ty = Number.NaN
          wake()
        }
        return
      }
      tx = e.clientX - rect.left
      ty = e.clientY - rect.top
      wake()
    }

    function onScroll() {
      if (parallax > 0 && !reduceMotion) {
        const rect = wrap!.getBoundingClientRect()
        if (rect.height > 0) {
          const t = Math.min(1, Math.max(-1, -rect.top / rect.height))
          parallaxRaw.set(t * parallax * parallaxScale)
        }
      }
      if (activationRef.current && !reduceMotion) wake()
    }

    resize()
    onScroll()

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen) wake()
      },
      { rootMargin: '120px' },
    )
    io.observe(wrap)
    if (driftOn) wake()

    const ro = new ResizeObserver(() => resize())
    ro.observe(wrap)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [tone, pointer, parallax, drift, centerRelief, reduceMotion, parallaxRaw])

  // Overhang so parallax travel never exposes the container edge.
  const pad = parallax > 0 && !reduceMotion ? parallax + 4 : 0

  return (
    <motion.div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        top: -pad,
        bottom: -pad,
        left: 0,
        right: 0,
        y: reduceMotion ? 0 : parallaxY,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </motion.div>
  )
}
