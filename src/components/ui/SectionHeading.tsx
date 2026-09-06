import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  supporting?: ReactNode
  align?: 'left' | 'center'
  /** Lower-hierarchy heading for secondary sections. */
  compact?: boolean
  /** Surface the heading sits on. The eyebrow is the accent on light grounds
      and white on dark ones. 'muted' is kept for the rare in-section sub-label. */
  eyebrowTone?: 'accent' | 'dark' | 'muted'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  supporting,
  align = 'left',
  compact = false,
  eyebrowTone = 'accent',
  className = '',
}: SectionHeadingProps) {
  return (
    <Reveal className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow &&
        (eyebrowTone === 'muted' ? (
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
            {eyebrow}
          </p>
        ) : (
          <Eyebrow tone={eyebrowTone === 'dark' ? 'dark' : 'light'} className="mb-4">
            {eyebrow}
          </Eyebrow>
        ))}
      <h2
        className={`font-sans font-medium leading-[1.15] tracking-tight text-ink ${
          compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl lg:text-[2.75rem]'
        }`}
      >
        {title}
      </h2>
      {supporting && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed ${
            eyebrowTone === 'dark' ? 'text-dark-ink-soft' : 'text-ink-soft'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {supporting}
        </p>
      )}
    </Reveal>
  )
}
