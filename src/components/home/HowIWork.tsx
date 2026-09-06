import { Eyebrow } from '../ui/Eyebrow'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { howIWork, howIWorkIntro } from '../../lib/site'
import { DotField } from '../ui/DotField'
import { Reveal } from '../ui/Reveal'
import { ElectricTimeline } from './ElectricTimeline'
import { useOffsetWithin, useTimelineProgress } from './useTimelineProgress'

/**
 * A step dims until the current reaches it, then holds full strength — so
 * completed steps stay readable and only what's ahead recedes.
 */
function Step({
  progress,
  frac,
  title,
  detail,
  isLast,
  reduceMotion,
}: {
  progress: MotionValue<number>
  frac: number
  title: string
  detail: string
  isLast: boolean
  reduceMotion: boolean
}) {
  const lo = Math.max(0, frac - 0.09)
  const hi = Math.max(lo + 0.001, frac)
  // 0.78 is the floor that keeps the not-yet-reached body copy (#4a4944 on
  // #f4f6f8) at 4.65:1 — above WCAG AA. Anything dimmer makes upcoming steps
  // unreadable rather than merely de-emphasised. The recede still reads,
  // because weight and the timeline head carry it too.
  const opacity = useTransform(progress, [lo, hi], [reduceMotion ? 1 : 0.78, 1])
  const headingWeight = useTransform(progress, [lo, hi], [400, 500])

  return (
    <motion.div style={{ opacity }} className={isLast ? '' : 'pb-11 md:pb-12'}>
      <motion.h3
        style={{ fontWeight: headingWeight }}
        className="font-sans text-lg tracking-tight text-ink md:text-xl"
      >
        {title}
      </motion.h3>
      <p className="mt-2 max-w-md leading-relaxed text-ink-soft">{detail}</p>
    </motion.div>
  )
}

export function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const { geometry, progress, velocity, energy, reduceMotion } = useTimelineProgress(stepsRef)
  // The field spans the whole section but the timeline is measured against the
  // steps column, so the head has to be shifted into section coordinates.
  const stepsOffset = useOffsetWithin(stepsRef, sectionRef)

  return (
    <section
      ref={sectionRef}
      // No overflow-hidden: it makes this section a clipping container, which
      // silently disables the sticky intro (it stops pinning and instead sits
      // permanently 128px low). The dot field has no parallax here, so its
      // wrapper is exactly inset-0 and has nothing to clip.
      className="relative border-t border-border bg-canvas-alt py-24 md:py-32"
    >
      {/* Full-bleed ambient field, behind both columns. Faded only at the
          top and bottom so it does not cut hard against the neighbouring
          sections; left and right run to the edge. */}
      <DotField
        tone="light"
        pointer
        drift={9}
        activation={
          geometry
            ? {
                progress,
                top: geometry.top + stepsOffset.y,
                height: geometry.height,
                x: geometry.x + stepsOffset.x,
              }
            : null
        }
        mask="linear-gradient(to bottom, transparent 0%, black 9%, black 91%, transparent 100%)"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[33%_1fr] md:gap-16">
          <Reveal direction="left" className="md:sticky md:top-32 md:self-start">
            <Eyebrow>
              {howIWorkIntro.eyebrow}
            </Eyebrow>
            <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.15] tracking-tight text-ink md:text-4xl">
              {howIWorkIntro.title}
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-ink-soft">
              {howIWorkIntro.supporting}
            </p>
          </Reveal>

          <div ref={stepsRef} className="relative">
            {geometry && (
              <ElectricTimeline
                geometry={geometry}
                progress={progress}
                velocity={velocity}
                energy={energy}
                reduceMotion={reduceMotion}
              />
            )}

            {howIWork.map((step, i) => (
              <Reveal
                key={step.step}
                delay={i * 0.09}
                className="relative flex gap-5 last:pb-0 md:gap-6"
              >
                <div className="flex w-9 shrink-0 flex-col items-center">
                  {/* invisible anchor — reserves the gutter and gives the
                      timeline its measured start/end points */}
                  <span data-timeline-node aria-hidden className="mt-4 h-2 w-2 shrink-0" />
                </div>
                <div className="flex-1 pt-1.5">
                  <Step
                    progress={progress}
                    frac={geometry ? (geometry.nodes[i]?.frac ?? i / (howIWork.length - 1)) : i / (howIWork.length - 1)}
                    title={step.title}
                    detail={step.detail}
                    isLast={i === howIWork.length - 1}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
