type IconProps = { size?: number; className?: string }

/** Consistent stroke weight for every lucide icon on the site. */
export const ICON_STROKE = 1.6

export function FigmaMark({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M9 2h6a3 3 0 0 1 0 6H9V2Z M9 8h4.5a3 3 0 1 1 0 6H9V8Z M9 14h3a3 3 0 1 1-3 3v-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
