import type { ComponentType } from 'react'
import { ICON_STROKE } from './icons'

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>

const DIM = { sm: 28, md: 36, lg: 48 } as const
const GLYPH = { sm: 15, md: 17, lg: 20 } as const

/**
 * The single icon treatment used across the site.
 *
 * Identity icons are neutral by default — accent is reserved for direction and
 * active state (arrows, timeline progress, hover), so it stays meaningful
 * rather than decorating every glyph.
 *
 * Place inside an element with `group` for the hover transition.
 */
export function IconBadge({
  icon: Icon,
  size = 'md',
  className = '',
}: {
  icon?: IconType
  size?: keyof typeof DIM
  className?: string
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[rgba(17,17,17,0.05)] transition-colors duration-200 group-hover:bg-[var(--color-accent-tint)] ${className}`}
      style={{ width: DIM[size], height: DIM[size] }}
    >
      {Icon && (
        <Icon
          size={GLYPH[size]}
          strokeWidth={ICON_STROKE}
          className="text-icon transition-colors duration-200 group-hover:text-accent"
        />
      )}
    </span>
  )
}
