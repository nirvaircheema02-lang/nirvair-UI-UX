import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'
import { profile } from '../../lib/site'
import { HEAD_PATH, LIGHT_FROM, LIGHT_TO, STEP } from './heroClip'

/**
 * Hero figure — the editorial portrait cut, rebuilt from the second reference.
 *
 * That reference does two things the grid-column portrait never did. The
 * figure is big and close, bled past the right edge and cropped by the bottom
 * of the frame, so he reads as a person in the room rather than a cut-out
 * pasted into a column. And the portrait is alive: a blink, a slight turn of
 * the head, a smile that settles. So this layer sits outside the content grid
 * and is sized against the hero, and what fills it is a short clip of his real
 * photograph.
 *
 * The clip was generated from the photo with the frame locked. It is made to
 * sit in this layer without seams:
 *  - its backdrop measures (16,18,21) against the page's (16,17,20), so no
 *    panel edge shows; a short mask on both side edges removes the rest.
 *  - the generator's mark sits in the bottom-right corner, inside the last 3%
 *    of the frame. The frame is made 5% taller than the hero and anchored to
 *    the top, so that strip falls below the hero's overflow-hidden edge.
 *
 * The clip is a pose being taken: it starts with his arms down, in a different
 * stance, and ends in the crossed-arms photograph, which is also the static
 * hero image, so nothing jumps when it stops. It plays once and holds its last
 * frame. Reduced motion shows that settled pose as a still.
 *
 * THE LIGHT. In the reference the light comes from one side: the near edge of
 * the hair and jacket glow hot, a maroon spill sits on the backdrop beside
 * her, and the far side falls off into shadow. It is not a tint on the face.
 * Two pre-rendered layers carry that here, both cut from his own silhouette
 * (fitted to the clip at 93.5% overlap, scale 1.00): the body, which never
 * moves, and the head, which does. The head layer follows the clip's measured
 * head offset (HEAD_PATH) so the rim stays on the turban through the tilt.
 * Their strength rides the page scroll, as it does in the reference: calm at
 * rest, hottest as he scrolls out, settling again.
 */
/** First frame (shown while the clip loads) and the settled pose (reduced motion). */
const POSTER = '/assets/nirvair/hero-portrait-poster.webp'
const FINAL = '/assets/nirvair/hero-portrait-final.webp'

function headOffset(t: number): [number, number] {
  const f = Math.min(Math.max(t / STEP, 0), HEAD_PATH.length - 1)
  const i = Math.floor(f)
  const j = Math.min(i + 1, HEAD_PATH.length - 1)
  const k = f - i
  return [
    HEAD_PATH[i][0] + (HEAD_PATH[j][0] - HEAD_PATH[i][0]) * k,
    HEAD_PATH[i][1] + (HEAD_PATH[j][1] - HEAD_PATH[i][1]) * k,
  ]
}

/**
 * `inline` is the phone layout: the same clip and light, but in the document
 * flow under the copy instead of a full-bleed layer behind it, framed so he
 * stands centred with the generator's mark cropped off the bottom.
 */
export function HeroFigure({ inline = false }: { inline?: boolean }) {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const headRef = useRef<HTMLImageElement>(null)
  const bodyRef = useRef<HTMLImageElement>(null)
  // 0 until the pose has landed, 1 once it has. The rim is cut from his settled
  // silhouette, so before then it would hang on a body that is not there yet.
  const gate = useMotionValue(reduceMotion ? 1 : 0)

  // One frame loop keeps the light layers on the figure as the clip plays.
  useEffect(() => {
    if (reduceMotion) return
    let raf = 0
    // The rim follows the frame that is ON SCREEN rather than currentTime.
    let shown = 0
    const hasFrameCb = 'requestVideoFrameCallback' in HTMLVideoElement.prototype
    const v0 = videoRef.current
    const onFrame = (_now: number, meta: { mediaTime: number }) => {
      shown = meta.mediaTime
      v0?.requestVideoFrameCallback?.(onFrame)
    }
    v0?.requestVideoFrameCallback?.(onFrame)
    const tick = () => {
      const v = videoRef.current
      const h = headRef.current
      const b = bodyRef.current
      if (v) {
        const t = hasFrameCb ? shown : v.currentTime
        gate.set(Math.min(Math.max((t - LIGHT_FROM) / (LIGHT_TO - LIGHT_FROM), 0), 1))
        // The whole figure drifts a little before it settles, so both layers
        // ride the measured offset, not only the head.
        const [x, y] = headOffset(t)
        const tf = `translate(${x}%, ${y}%)`
        if (h) h.style.transform = tf
        if (b) b.style.transform = tf
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduceMotion, gate])

  // THE LIGHT FOLLOWS THE SCROLL, NOT A TIMER. In the reference it rises
  // steadily while the page scrolls (warmth 0.97 to 1.38 over about a second of
  // continuous scroll), peaks, then eases as the portrait leaves. Here: dim at
  // rest, hottest a third of the way out of the hero, settling as he goes.
  // Brightness is applied to the light layers only. Putting it on the clip is
  // what turned his skin yellow.
  const { scrollY } = useScroll()
  const bloomRaw = useTransform(scrollY, [0, 320, 780], [0, 1, 0])
  const bloom = useSpring(bloomRaw, { stiffness: 110, damping: 24 })
  const bloomOpacity = useTransform(bloom, [0, 1], [0.42, 1])
  const lightOpacity = useTransform([bloomOpacity, gate], ([a, g]: number[]) => a * g)
  const lightBoost = useTransform(bloom, [0, 1], [
    'brightness(1) saturate(1)',
    'brightness(1.6) saturate(1.15)',
  ])

  const frame = 'h-full w-full object-contain object-right'
  const layer =
    'pointer-events-none absolute inset-0 h-full w-full select-none object-fill'

  return (
    <div
      aria-hidden
      className={
        inline
          ? 'pointer-events-none relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden'
          : 'pointer-events-none absolute inset-0 overflow-hidden'
      }
      style={{ containerType: 'size' }}
    >
      <motion.div
        className="absolute aspect-video"
        style={inline ? {
          height: '108cqh',
          top: 0,
          // His face sits at ~84% of the clip's width; put it on the column's centre line.
          left: 'calc(50cqw - 161cqh)',
          maskImage: 'linear-gradient(to bottom, transparent, black 14%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 14%)',
        } : {
          // Sized against the hero's HEIGHT, so he is the same size on every
          // window, and set to the scale of a person in the room (turban ~9% of the
          // width), not a near close-up.
          // The frame sits 5% below the hero's bottom edge: that is what
          // pushes the generator's mark, in the frame's last 3%, out of view.
          // Right offset puts his face at ~75% of the width, level with the
          // headline column rather than against the edge.
          height: '91cqh',
          bottom: '-5cqh',
          right: 'calc(25cqw - 25.9cqh)',
          // Every free edge dissolves. The clip's backdrop is a flat (16,18,21);
          // the smoke behind the hero runs lighter than that, so a hard edge
          // would show as a panel. He ends at 96% of the frame, so the right
          // dissolve starts just past him; the top dissolves above his head.
          // (The bottom is cropped by the hero itself.)
          maskImage:
            'linear-gradient(to right, transparent, black 14%, black 95%, transparent), linear-gradient(to bottom, transparent, black 16%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 14%, black 95%, transparent), linear-gradient(to bottom, transparent, black 16%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        {reduceMotion ? (
          <img src={FINAL} alt={profile.name} className={frame} />
        ) : (
          <video
            ref={videoRef}
            src="/assets/nirvair/hero-portrait.mp4"
            poster={POSTER}
            autoPlay
            muted
            playsInline
            preload="auto"
            className={frame}
          />
        )}

        {/* The side light. Screen-blended so it adds light rather than paint. */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: lightOpacity, filter: lightBoost, mixBlendMode: 'screen' }}
        >
          <img
            ref={bodyRef}
            src="/assets/nirvair/hero-light-body.webp"
            alt=""
            className={layer}
          />
          <img
            ref={headRef}
            src="/assets/nirvair/hero-light-head.webp"
            alt=""
            className={layer}
          />
        </motion.div>
      </motion.div>

      {/* Reading scrim. It sits above him on purpose: the reference lets the
          figure fall away into the dark on the headline side rather than
          ending at a hard edge. Desktop only: on a phone he sits under the copy. */}
      {!inline && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgb(16,17,20) 0%, rgba(16,17,20,0.94) 30%, rgba(16,17,20,0.62) 48%, rgba(16,17,20,0.22) 62%, rgba(16,17,20,0) 76%)',
          }}
        />
      )}
    </div>
  )
}
