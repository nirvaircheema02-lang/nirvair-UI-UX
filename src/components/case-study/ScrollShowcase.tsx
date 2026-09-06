import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * A long page shown inside a browser frame you can scroll through in place.
 *
 * Scrolling is enabled on fine pointers only. On touch it stays a fixed crop,
 * because a tall inner scroller inside a scrolling page is a trap on a phone —
 * and the page still communicates depth from the crop plus the progress rail.
 *
 * Scroll chaining is deliberately left at the browser default, so reaching
 * either end hands the scroll back to the page instead of trapping it.
 */
export function ScrollShowcase({
  src,
  alt,
  url,
  height = 460,
}: {
  src: string
  alt: string
  url: string
  height?: number
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  // Client-only SPA, so this can be resolved at init rather than in an effect.
  const [interactive] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || !interactive) return
    function onScroll() {
      const max = el!.scrollHeight - el!.clientHeight
      setProgress(max > 0 ? el!.scrollTop / max : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [interactive])

  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-lg border border-border-strong bg-surface shadow-[0_40px_80px_-40px_rgba(17,17,17,0.45)]">
        <div className="flex items-center gap-2.5 border-b border-border bg-canvas-alt px-3 py-2">
          <div className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
          </div>
          <span className="min-w-0 flex-1 truncate rounded-full bg-surface px-3 py-1 text-center text-[11px] text-ink-faint">
            {url}
          </span>
          {interactive && (
            <span className="hidden shrink-0 text-[11px] text-ink-faint sm:block">
              scroll inside ↓
            </span>
          )}
        </div>

        <div
          ref={scrollerRef}
          tabIndex={interactive ? 0 : -1}
          role={interactive ? 'region' : undefined}
          aria-label={interactive ? `${alt} — scrollable preview` : undefined}
          className={`relative bg-surface ${
            interactive ? 'overflow-y-auto' : 'overflow-hidden'
          } [scrollbar-width:thin]`}
          style={{ height, scrollBehavior: reduceMotion ? 'auto' : undefined }}
        >
          <img src={src} alt={alt} loading="lazy" decoding="async" className="block h-auto w-full" />
        </div>

        {interactive && (
          <div className="h-[3px] w-full bg-border" aria-hidden>
            <div
              className="h-full bg-accent transition-[width] duration-150"
              style={{ width: `${Math.max(4, progress * 100)}%` }}
            />
          </div>
        )}
      </div>
    </figure>
  )
}
