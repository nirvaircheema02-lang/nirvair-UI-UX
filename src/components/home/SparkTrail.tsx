import { type MotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  ttl: number
  size: number
  alpha: number
}

/** Width of the emitter strip, centred on the line. Sparks hug the wire. */
const STRIP_W = 26
const MAX_PARTICLES = 30
/** Below this |velocity| the current is considered at rest and stops emitting. */
const EMIT_THRESHOLD = 0.035

/**
 * Canvas spark emitter for the leading edge of the progress line.
 *
 * Mirrors the reference behaviour measured on ashwingupta.dev/experience:
 * tiny 1-2px specks that trail *behind* the travelling head, hugging the line
 * within a few pixels, and which exist only while the line is being drawn —
 * the canvas is cleared and the RAF loop parks itself as soon as scrolling
 * stops, so nothing animates at rest.
 */
export function SparkTrail({
  height,
  progress,
  velocity,
  accent,
}: {
  height: number
  progress: MotionValue<number>
  velocity: MotionValue<number>
  accent: [number, number, number]
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(STRIP_W * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${STRIP_W}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const [ar, ag, ab] = accent
    let particles: Particle[] = []
    let raf = 0
    let running = false
    let last = 0

    function frame(now: number) {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016
      last = now

      const v = velocity.get()
      const speed = Math.abs(v)
      const headY = progress.get() * height
      // Sparks lag behind the direction of travel.
      const trailDir = v >= 0 ? -1 : 1

      if (speed > EMIT_THRESHOLD && particles.length < MAX_PARTICLES) {
        const intensity = Math.min(1, speed * 2.6)
        const count = intensity > 0.55 ? 2 : 1
        for (let i = 0; i < count; i++) {
          particles.push({
            x: STRIP_W / 2 + (Math.random() - 0.5) * 5,
            y: headY + trailDir * Math.random() * 6,
            vx: (Math.random() - 0.5) * 9,
            vy: trailDir * (18 + Math.random() * 70),
            life: 0,
            ttl: 0.3 + Math.random() * 0.45,
            size: Math.random() < 0.72 ? 1 : 1.7,
            alpha: 0.28 + intensity * 0.42,
          })
        }
      }

      ctx!.clearRect(0, 0, STRIP_W, height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += dt
        if (p.life >= p.ttl) {
          particles.splice(i, 1)
          continue
        }
        p.x += p.vx * dt
        p.y += p.vy * dt
        // Drift back toward the wire so sparks never stray far from the line.
        p.vx *= 0.9
        const fade = 1 - p.life / p.ttl
        ctx!.globalAlpha = p.alpha * fade * fade
        ctx!.fillStyle = `rgb(${ar},${ag},${ab})`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1

      if (speed > EMIT_THRESHOLD || particles.length) {
        raf = requestAnimationFrame(frame)
      } else {
        // Nothing left to draw — park the loop so the section is genuinely
        // static at rest rather than burning frames on an empty canvas.
        running = false
        last = 0
        ctx!.clearRect(0, 0, STRIP_W, height)
      }
    }

    function kick() {
      if (running) return
      running = true
      last = 0
      raf = requestAnimationFrame(frame)
    }

    const unsub = velocity.on('change', (v: number) => {
      if (Math.abs(v) > EMIT_THRESHOLD) kick()
    })

    return () => {
      unsub()
      cancelAnimationFrame(raf)
      running = false
      particles = []
    }
  }, [height, progress, velocity, accent])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        left: -STRIP_W / 2,
        top: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
