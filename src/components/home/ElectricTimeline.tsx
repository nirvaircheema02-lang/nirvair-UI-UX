import { motion, useTransform, type MotionValue } from 'framer-motion'
import { SparkTrail } from './SparkTrail'
import type { Geometry, NodePoint } from './useTimelineProgress'

const LINE_WIDTH = 2
const NODE_SIZE = 9
const HEAD_CORE = 5
const HEAD_GLOW = 22
/** Bright narrow wake immediately behind the head (reference measures ~12x46). */
const TRAIL_W = 11
const TRAIL_H = 46
/** --color-accent #3157e8, as canvas needs numeric channels. */
const ACCENT_RGB: [number, number, number] = [49, 87, 232]

/** Neutral dot with an accent dot that fades in once the current reaches it. */
function TimelineNode({ progress, node }: { progress: MotionValue<number>; node: NodePoint }) {
  const lo = Math.max(0, node.frac - 0.012)
  const hi = Math.max(lo + 0.001, node.frac)
  const opacity = useTransform(progress, [lo, hi], [0, 1])
  const scale = useTransform(progress, [lo, hi], [0.55, 1])

  const base = {
    position: 'absolute' as const,
    left: node.x - NODE_SIZE / 2,
    top: node.y - NODE_SIZE / 2,
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: 9999,
  }

  return (
    <>
      <span style={{ ...base, backgroundColor: 'rgba(17,17,17,0.28)' }} />
      <motion.span className="bg-accent" style={{ ...base, opacity, scale }} />
    </>
  )
}

/**
 * Renders the track, the accent fill, the step nodes and the energised leading
 * edge. All scroll state comes from `useTimelineProgress` so the surrounding
 * copy can react to exactly the same progress value.
 */
export function ElectricTimeline({
  geometry,
  progress,
  velocity,
  energy,
  reduceMotion,
}: {
  geometry: Geometry
  progress: MotionValue<number>
  velocity: MotionValue<number>
  energy: MotionValue<number>
  reduceMotion: boolean
}) {
  const fillPct = useTransform(progress, (v) => `${v * 100}%`)
  const headOpacity = useTransform(progress, [0, 0.015, 0.985, 1], [0, 1, 1, 0])
  const glowOpacity = useTransform(energy, (e) => 0.22 + e * 0.5)
  const glowScale = useTransform(energy, (e) => 0.8 + e * 0.35)
  // The wake sits behind the direction of travel, so it flips when the user
  // scrolls back up. Origin is the head itself, so it pivots in place.
  const trailFlip = useTransform(velocity, (v) => (v >= 0 ? 1 : -1))
  const trailOpacity = useTransform(energy, (e) => Math.min(0.75, e * 0.95))
  const trailScaleY = useTransform(energy, (e) => 0.45 + e * 0.55)

  return (
    <>
      {/* track + fill — no negative z-index: the section background is opaque
          and this container makes no stacking context, so -z-10 would hide the
          track behind it. DOM order already paints this beneath the rows. */}
      <div
        className="pointer-events-none absolute rounded-full"
        aria-hidden
        style={{
          left: geometry.x - LINE_WIDTH / 2,
          top: geometry.top,
          width: LINE_WIDTH,
          height: geometry.height,
          backgroundColor: 'rgba(17,17,17,0.14)',
        }}
      >
        <motion.div
          className="absolute left-0 top-0 w-full rounded-full bg-accent"
          style={{ height: fillPct }}
        />
      </div>

      {/* nodes + leading head */}
      <div
        className="pointer-events-none absolute z-10"
        aria-hidden
        style={{ left: 0, top: 0, width: '100%', height: '100%' }}
      >
        {geometry.nodes.map((node, i) => (
          <TimelineNode key={i} progress={progress} node={node} />
        ))}

        {!reduceMotion && (
          <div
            style={{
              position: 'absolute',
              left: geometry.x,
              top: geometry.top,
              width: 0,
              height: geometry.height,
            }}
          >
            <SparkTrail
              height={geometry.height}
              progress={progress}
              velocity={velocity}
              accent={ACCENT_RGB}
            />

            {/* bright wake trailing the head along the wire */}
            <motion.span
              style={{
                position: 'absolute',
                top: fillPct,
                left: -TRAIL_W / 2,
                marginTop: -TRAIL_H,
                width: TRAIL_W,
                height: TRAIL_H,
                borderRadius: 9999,
                background:
                  'linear-gradient(to top, rgba(49,87,232,0.5) 0%, rgba(49,87,232,0) 100%)',
                filter: 'blur(3px)',
                transformOrigin: 'center bottom',
                opacity: trailOpacity,
                scaleY: trailScaleY,
                scale: trailFlip,
              }}
            />

            <motion.span
              style={{
                position: 'absolute',
                top: fillPct,
                left: -HEAD_GLOW / 2,
                marginTop: -HEAD_GLOW / 2,
                width: HEAD_GLOW,
                height: HEAD_GLOW,
                borderRadius: 9999,
                background:
                  'radial-gradient(circle, rgba(49,87,232,0.55) 0%, rgba(49,87,232,0) 70%)',
                opacity: glowOpacity,
                scale: glowScale,
              }}
            />
            <motion.span
              className="bg-accent"
              style={{
                position: 'absolute',
                top: fillPct,
                left: -HEAD_CORE / 2,
                marginTop: -HEAD_CORE / 2,
                width: HEAD_CORE,
                height: HEAD_CORE,
                borderRadius: 9999,
                opacity: headOpacity,
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
