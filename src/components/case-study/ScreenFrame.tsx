import type { ReactNode } from 'react'

/**
 * Browser frame for a real product screenshot.
 *
 * The image keeps its natural aspect ratio — no fixed `ratio` and no
 * object-contain. Forcing captures into a ratio was what letterboxed and
 * shrank the screens on the previous version of this page.
 */
type ScreenFrameProps = {
  src: string
  alt: string
  /** Address shown in the chrome. Omit for a frame with no URL bar. */
  url?: string
  /** Caption under the frame. */
  label?: ReactNode
  tone?: 'light' | 'dark'
  elevation?: 'flat' | 'raised' | 'floating'
  emphasis?: Emphasis
  /** Subtle lift on hover, for gallery items. */
  hover?: boolean
  priority?: boolean
  className?: string
}

const SHADOW = {
  flat: '',
  raised: 'shadow-[0_18px_40px_-24px_rgba(17,17,17,0.35)]',
  floating: 'shadow-[0_44px_90px_-40px_rgba(17,17,17,0.5)]',
} as const

/**
 * Depth scale. Emphasis is carried by opacity alone — never blur, which would
 * hide the product UI the case study exists to show.
 */
const EMPHASIS = {
  primary: 'opacity-100',
  secondary: 'opacity-[0.88]',
  supporting: 'opacity-[0.72]',
} as const

export type Emphasis = keyof typeof EMPHASIS

export function ScreenFrame({
  src,
  alt,
  url,
  label,
  tone = 'light',
  elevation = 'raised',
  emphasis = 'primary',
  hover = false,
  priority = false,
  className = '',
}: ScreenFrameProps) {
  const dark = tone === 'dark'
  return (
    <figure className={`min-w-0 ${className}`}>
      <div
        className={`overflow-hidden rounded-lg border transition-all duration-300 ${
          dark ? 'border-white/15 bg-white/5' : 'border-border-strong bg-surface'
        } ${SHADOW[elevation]} ${EMPHASIS[emphasis]} ${
          hover ? 'hover:-translate-y-1 hover:opacity-100 hover:shadow-[0_30px_60px_-30px_rgba(17,17,17,0.4)]' : ''
        }`}
      >
        {url && (
          <div
            className={`flex items-center gap-2.5 border-b px-3 py-2 ${
              dark ? 'border-white/10 bg-white/[0.06]' : 'border-border bg-canvas-alt'
            }`}
          >
            <div className="flex shrink-0 gap-1.5" aria-hidden>
              <span className={`h-2 w-2 rounded-full ${dark ? 'bg-white/25' : 'bg-ink/15'}`} />
              <span className={`h-2 w-2 rounded-full ${dark ? 'bg-white/25' : 'bg-ink/15'}`} />
              <span className={`h-2 w-2 rounded-full ${dark ? 'bg-white/25' : 'bg-ink/15'}`} />
            </div>
            <span
              className={`min-w-0 flex-1 truncate rounded-full px-3 py-1 text-center text-[11px] ${
                dark ? 'bg-white/10 text-white/55' : 'bg-surface text-ink-faint'
              }`}
            >
              {url}
            </span>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      {label && (
        <figcaption
          className={`mt-3 text-xs font-medium uppercase tracking-[0.14em] ${
            dark ? 'text-dark-ink-soft' : 'text-ink-faint'
          }`}
        >
          {label}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * Phone frame sized by its container rather than capped at a fixed width, so
 * the UI inside stays large enough to actually read.
 */
export function PhoneFrame({
  src,
  alt,
  label,
  emphasis = 'primary',
  fadeTone = 'light',
  className = '',
}: {
  src: string
  alt: string
  label?: ReactNode
  emphasis?: Emphasis
  /** The fade at the foot must match the surface behind the phone, or it
      shows as a pale smear on a dark section. */
  fadeTone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div
        className={`relative overflow-hidden rounded-[1.75rem] border-[7px] border-ink bg-ink shadow-[0_30px_60px_-28px_rgba(17,17,17,0.55)] transition-opacity duration-300 ${EMPHASIS[emphasis]}`}
      >
        <span
          className="absolute left-1/2 top-0 z-10 h-[14px] w-[86px] -translate-x-1/2 rounded-b-xl bg-ink"
          aria-hidden
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full rounded-[1.35rem]"
        />
        {/* A viewport capture ends wherever the fold was; fading it out reads
            as the page continuing rather than the screenshot being clipped. */}
        <span
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-[1.35rem] bg-gradient-to-t to-transparent ${
            fadeTone === 'dark' ? 'from-[#101114]' : 'from-surface'
          }`}
          aria-hidden
        />
      </div>
      {label && (
        <figcaption className="mt-3 text-center text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
          {label}
        </figcaption>
      )}
    </figure>
  )
}
