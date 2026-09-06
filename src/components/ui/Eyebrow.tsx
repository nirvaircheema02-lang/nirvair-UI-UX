import type { ReactNode } from 'react'

/**
 * The section eyebrow — the small label that sits above a section heading.
 *
 * One treatment across the whole portfolio, switching only on the surface it
 * sits on: the brand accent on light and neutral-white grounds, plain white on
 * dark ones. The accent is deliberately NOT used on dark: #3157e8 on #101114
 * measures 3.3:1, below the 4.5:1 AA threshold for text this size.
 *
 * This is distinct from the caption/metadata label (text-ink-faint on light,
 * text-dark-ink-soft on dark), which stays quieter by design.
 */
type EyebrowProps = {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

export function Eyebrow({ children, tone = 'light', className = '' }: EyebrowProps) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.16em] ${
        tone === 'dark' ? 'text-dark-ink' : 'text-accent'
      } ${className}`}
    >
      {children}
    </p>
  )
}
