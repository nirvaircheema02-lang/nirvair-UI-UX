import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * Smoke — slow flow-field haze, drawn on a canvas.
 *
 * Wisps of atmosphere carried by a smooth analytic flow field. The brief that
 * matters most here is that it must never ramp, pulse or loop visibly, so the
 * brightness is constant *by construction* rather than by tuning:
 *
 *   every wisp shares ONE life period T and its phase is fixed at i/N, so the
 *   envelope sum is  Σ sin²(π(t/T + i/N)) = N/2  exactly, for any t and any
 *   N >= 2. Total emitted alpha is therefore a constant — no build-up, no
 *   decay, and no seam at any point in time.
 *
 * Constant *emitted* alpha only becomes constant *screen* brightness given two
 * more things, both of which measured as a ~9/255 oscillation at the life
 * period before they were fixed:
 *
 *   - wisps accumulate additively ('lighter'), so screen luminance is linear
 *     in the emitted total. Under plain source-over, overlap composites as
 *     1-(1-a)² and the total sags wherever wisps happen to coincide.
 *   - a wisp's alpha is divided by its own area (GAIN), so the per-life size
 *     lottery cannot change how much light that wisp contributes — only how
 *     thinly it spreads it.
 *
 * A wisp re-seeds at the instant its envelope crosses zero, so the teleport is
 * invisible and nothing has to wrap or reset on screen.
 */

/** Cool near-white. Pure white reads as fog; a touch of blue reads as air. */
const TINT = '208,216,232'

/**
 * Peak alpha of one wisp at full envelope. Measured: over the #101114 hero this
 * puts mean screen luminance at ~25/255 against a 17/255 bare background —
 * clearly present, well under the ~40 ceiling, and never near the headline's
 * contrast.
 */
const BASE_ALPHA = 0.14

/**
 * Wisp geometry, as a fraction of the field's long edge. Kept to a narrow band:
 * the area compensation below holds the light budget whatever size is drawn,
 * but a very small wisp still has to carry its share at a high alpha, which
 * would read as a hard blob rather than haze.
 */
const SIZE_LO = 0.3
const SIZE_SPAN = 0.16
const ASPECT_LO = 1.7
const ASPECT_SPAN = 0.8
/** Mid-range wisp. Gain is REF_AREA/area, so the mean gain is ~1. */
const REF_AREA = (SIZE_LO + SIZE_SPAN / 2) ** 2 * (ASPECT_LO + ASPECT_SPAN / 2)

/** Shared life period, seconds. Must be shared — see the envelope note above. */
const LIFE = 26

/** Flow speed in px/sec. Atmosphere, not smoke: a wisp crosses ~230px a life. */
const SPEED = 9

/** Field wave numbers (1/px) and drift rates (rad/sec). */
const K1 = 0.0018
const K2 = 0.0023
const K3 = 0.0014
const W1 = 0.055
const W2 = 0.041
const W3 = 0.033

/**
 * Haze carries no detail, so full device resolution is wasted fill-rate. A
 * sub-native backing store costs a quarter of the pixels and the browser's
 * upscale only softens it further, which is the look we want anyway.
 */
const DPR_CAP = 1.5
const RENDER_SCALE = 0.6

/** 30fps. At 9px/sec nobody can tell, and it halves the cost of the layer. */
const FRAME_MS = 1000 / 30

const SPRITE = 160

/**
 * Thins the haze through the middle band where the headline and the cut-out
 * portrait live. A fixed per-frame `destination-in` pass rather than per-wisp
 * alpha: being time-invariant it cannot modulate total brightness, and keeping
 * it inside the canvas means the pixels are the finished result rather than
 * depending on CSS mask support.
 */
const RELIEF: ReadonlyArray<readonly [number, number]> = [
  [0, 0.26],
  [0.34, 0.5],
  [0.62, 0.84],
  [1, 1],
]

/** Stable per-wisp variation — same wisp, same life, same character. */
function hash(a: number, b: number, salt: number) {
  const n = Math.sin(a * 127.1 + b * 311.7 + salt * 74.7) * 43758.5453
  return n - Math.floor(n)
}

/**
 * Steps of the x and y strip permutations. Both must be coprime with every
 * value countFor can return (12/16/22) or the permutation collapses onto fewer
 * strips and leaves bands of the frame permanently empty.
 */
const STRIDE_X = 7
const STRIDE_Y = 5

function countFor(width: number) {
  if (width < 768) return 12
  if (width < 1200) return 16
  return 22
}

/** Soft lobed blob, baked once. Scaled and rotated per wisp at draw time. */
function makeSprite() {
  const c = document.createElement('canvas')
  c.width = SPRITE
  c.height = SPRITE
  const g = c.getContext('2d')
  if (!g) return c

  // Three offset lobes rather than one disc: a single radial gradient reads as
  // a dot however soft it is, while overlapping lobes give a torn edge — which
  // is what makes it read as atmosphere at this very low contrast.
  const lobes: ReadonlyArray<readonly [number, number, number]> = [
    [0.5, 0.5, 0.46],
    [0.36, 0.44, 0.3],
    [0.64, 0.57, 0.33],
  ]
  for (const [cx, cy, r] of lobes) {
    const grad = g.createRadialGradient(
      cx * SPRITE,
      cy * SPRITE,
      0,
      cx * SPRITE,
      cy * SPRITE,
      r * SPRITE,
    )
    grad.addColorStop(0, `rgba(${TINT},0.55)`)
    grad.addColorStop(0.42, `rgba(${TINT},0.22)`)
    grad.addColorStop(0.72, `rgba(${TINT},0.06)`)
    grad.addColorStop(1, `rgba(${TINT},0)`)
    g.fillStyle = grad
    g.fillRect(0, 0, SPRITE, SPRITE)
  }
  return c
}

export function AmbientSmoke({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion() ?? false
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const sprite = makeSprite()
    /** Rebuilt on resize; multiplied in as the final pass of every frame. */
    let relief: HTMLCanvasElement | null = null

    let width = 0
    let height = 0
    let count = 0
    /** Backing-store scale: DPR, capped, times the sub-native render scale. */
    let scale = 1
    let x = new Float64Array(0)
    let y = new Float64Array(0)
    let rot = new Float64Array(0)
    let size = new Float64Array(0)
    let aspect = new Float64Array(0)
    /** Per-wisp alpha compensation, REF_AREA / this wisp's area. */
    let gain = new Float64Array(0)
    /** Life index a wisp was last seeded for; -1 forces a seed on next draw. */
    let life = new Int32Array(0)

    /**
     * Accumulated seconds. Advanced only by frames we actually draw, so an
     * off-screen pause freezes the field instead of skipping it forward — the
     * wisps are exactly where they were when it scrolls back into view.
     */
    let clock = 0
    let last = 0
    let raf = 0
    let running = false
    let onScreen = true
    /** Priming is a one-off; later resizes must not restart the field. */
    let primed = false

    function seed(i: number, k: number) {
      // Stratified spawn, not a free random one. The *emitted* light is
      // constant by construction, but the share of it that lands on-canvas
      // wanders if wisps happen to clump or sit off-frame. One wisp per strip
      // pins coverage even at every instant.
      //
      // The strides matter as much as the stratification: a wisp's phase is
      // i/count, so assigning strip = i would make position a function of
      // phase — the bright wisps would always be the middle ones and would
      // march across the frame once per life, which measured as a 17/255
      // swing. Striding scatters consecutive (and therefore similarly bright)
      // wisps across the frame instead.
      const m = 0.1
      const sx = (((i * STRIDE_X + k * 3) % count) + hash(i, k, 1)) / count
      const sy = (((i * STRIDE_Y + k * 11) % count) + hash(i, k, 2)) / count
      x[i] = (sx * (1 + 2 * m) - m) * width
      y[i] = (sy * (1 + 2 * m) - m) * height
      const unit = Math.max(width, height)
      const s = SIZE_LO + hash(i, k, 3) * SIZE_SPAN
      const asp = ASPECT_LO + hash(i, k, 4) * ASPECT_SPAN
      size[i] = unit * s
      aspect[i] = asp
      gain[i] = REF_AREA / (s * s * asp)
      rot[i] = hash(i, k, 5) * Math.PI * 2
      life[i] = k
    }

    /** Envelope for wisp i at the current clock. Phase is fixed at i/count. */
    function envelope(i: number) {
      const u = clock / LIFE + i / count
      const s = Math.sin(Math.PI * u)
      // sin²: zero at birth and death, so a re-seed is never visible, and the
      // sum across evenly-spaced phases is exactly count/2 at any instant.
      return s * s
    }

    /** Transport only — no drawing, so it can also be run to prime the field. */
    function simulate(dt: number) {
      for (let i = 0; i < count; i++) {
        const k = Math.floor(clock / LIFE + i / count)
        if ((life[i] ?? -1) !== k) seed(i, k)
        if (dt <= 0) continue

        const px = x[i] ?? 0
        const py = y[i] ?? 0

        // v = perpendicular gradient of a scalar potential
        //   Psi = sin(p)cos(q) + 0.7 sin(r)
        // with each term divided through by its own wave number so both
        // contribute at a similar speed. Taking the perpendicular gradient
        // keeps the field swirling instead of draining into sinks, which is
        // what stops the wisps bunching into clumps over several minutes.
        const p = K1 * px + W1 * clock
        const q = K2 * py - W2 * clock
        const r = K3 * (px * 0.62 + py * 0.78) - W3 * clock
        const vx = -Math.sin(p) * Math.sin(q) + 0.7 * 0.78 * Math.cos(r)
        const vy = -Math.cos(p) * Math.cos(q) - 0.7 * 0.62 * Math.cos(r)

        x[i] = px + vx * SPEED * dt
        y[i] = py + vy * SPEED * dt

        // Align the wisp to the current it is riding — smoke reads as smoke
        // when its long axis follows the flow. Eased, and wrapped to the
        // shortest arc so it never spins the long way round.
        const target = Math.atan2(vy, vx)
        const d = target - (rot[i] ?? 0)
        const wrapped = Math.atan2(Math.sin(d), Math.cos(d))
        rot[i] = (rot[i] ?? 0) + wrapped * Math.min(1, dt * 0.5)
      }
    }

    function paint() {
      ctx!.clearRect(0, 0, width, height)
      // Additive: haze adds light, and it keeps screen luminance linear in the
      // emitted total, which is what makes the constant-brightness guarantee
      // survive all the way to the pixels. Peak accumulated alpha stays well
      // under 1, so nothing clips back into non-linearity.
      ctx!.globalCompositeOperation = 'lighter'

      for (let i = 0; i < count; i++) {
        const h = size[i] ?? 0
        const w = h * (aspect[i] ?? 1)
        ctx!.globalAlpha = BASE_ALPHA * envelope(i) * (gain[i] ?? 1)
        ctx!.translate(x[i] ?? 0, y[i] ?? 0)
        ctx!.rotate(rot[i] ?? 0)
        ctx!.drawImage(sprite, -w / 2, -h / 2, w, h)
        ctx!.setTransform(scale, 0, 0, scale, 0, 0)
      }

      ctx!.globalAlpha = 1
      if (relief) {
        ctx!.globalCompositeOperation = 'destination-in'
        ctx!.drawImage(relief, 0, 0, width, height)
        ctx!.globalCompositeOperation = 'source-over'
      }
    }

    function draw(dt: number) {
      simulate(dt)
      paint()
    }

    /**
     * Wisps spawn on an even grid but the flow then carries some of them
     * part-way off-frame, so the field is brighter in its first seconds than
     * in its steady state — measured as a 26 -> 19 decay over the first 14s,
     * which is precisely the brightness ramp this effect exists to avoid.
     * Running one full life of transport before the first visible frame means
     * the hero opens already settled.
     */
    function prime() {
      const dt = FRAME_MS / 1000
      for (let t = 0; t < LIFE; t += dt) {
        clock += dt
        simulate(dt)
      }
    }

    function makeRelief() {
      const c = document.createElement('canvas')
      c.width = Math.max(1, Math.ceil(width))
      c.height = Math.max(1, Math.ceil(height))
      const g = c.getContext('2d')
      if (!g) return null
      // Ellipse wider than it is tall, nudged above centre: the headline and
      // the portrait both sit in that band.
      const rx = (1.18 * c.width) / 2
      const ry = (0.92 * c.height) / 2
      g.translate(c.width / 2, 0.48 * c.height)
      g.scale(rx / ry, 1)
      const grad = g.createRadialGradient(0, 0, 0, 0, 0, ry)
      for (const [stop, a] of RELIEF) grad.addColorStop(stop, `rgba(0,0,0,${a})`)
      g.fillStyle = grad
      g.fillRect(-c.width * 2, -c.height * 2, c.width * 4, c.height * 4)
      return c
    }

    function frame(now: number) {
      if (!onScreen) {
        running = false
        return
      }
      raf = requestAnimationFrame(frame)
      if (last && now - last < FRAME_MS) return
      // Clamped so a backgrounded tab resumes without a jump in the field.
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 30
      last = now
      clock += dt
      draw(dt)
    }

    function wake() {
      if (reduceMotion || running || !onScreen) return
      running = true
      last = 0
      raf = requestAnimationFrame(frame)
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const prevW = width
      const prevH = height
      width = Math.ceil(rect.width)
      height = Math.ceil(rect.height)

      const next = countFor(window.innerWidth)
      if (next !== count) {
        count = next
        x = new Float64Array(count)
        y = new Float64Array(count)
        rot = new Float64Array(count)
        size = new Float64Array(count)
        aspect = new Float64Array(count)
        gain = new Float64Array(count)
        life = new Int32Array(count).fill(-1)
      } else if (prevW > 0 && prevH > 0) {
        // Keep the field where it is across a plain resize: re-seeding mid-life
        // would pop, because the envelope is not zero at that moment.
        const sx = width / prevW
        const sy = height / prevH
        const su = Math.max(sx, sy)
        for (let i = 0; i < count; i++) {
          x[i] = (x[i] ?? 0) * sx
          y[i] = (y[i] ?? 0) * sy
          size[i] = (size[i] ?? 0) * su
        }
      }

      const dpr = Math.min(DPR_CAP, window.devicePixelRatio || 1)
      scale = dpr * RENDER_SCALE
      canvas!.width = Math.max(1, Math.ceil(width * scale))
      canvas!.height = Math.max(1, Math.ceil(height * scale))
      // No style width/height: the element is sized by `absolute inset-0`, and
      // writing inline sizes here would fight that and loop the ResizeObserver.
      ctx!.setTransform(scale, 0, 0, scale, 0, 0)

      relief = makeRelief()
      if (!primed) {
        primed = true
        prime()
      }
      draw(0)
    }

    resize()

    // Observe the parent, not the canvas. Setting canvas.width/height sets the
    // element's *intrinsic* size, so observing the canvas and resizing it in
    // the callback is a feedback loop — wherever CSS does not pin the size it
    // shrinks a little on every pass (measured: 1440x800 collapsing to 10x9).
    // `absolute inset-0` sizes us from the positioned parent anyway.
    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas.parentElement ?? canvas)
    window.addEventListener('resize', resize)

    let io: IntersectionObserver | null = null
    if (!reduceMotion) {
      io = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry?.isIntersecting ?? true
          if (onScreen) wake()
        },
        { rootMargin: '120px' },
      )
      io.observe(canvas)
      wake()
    }

    return () => {
      cancelAnimationFrame(raf)
      running = false
      io?.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 block h-full w-full ${className}`}
    />
  )
}
