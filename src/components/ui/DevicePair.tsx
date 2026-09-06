import type { ReactNode } from 'react'

type DevicePairProps = {
  desktop: ReactNode
  mobile: ReactNode
  desktopLabel?: string
  mobileLabel?: string
  className?: string
}

export function DevicePair({
  desktop,
  mobile,
  desktopLabel = 'Desktop',
  mobileLabel = 'Mobile',
  className = '',
}: DevicePairProps) {
  return (
    <div className={`grid min-w-0 gap-8 sm:grid-cols-[1fr_auto] sm:items-start ${className}`}>
      <div className="min-w-0">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
          {desktopLabel}
        </p>
        {desktop}
      </div>
      <div className="w-full min-w-0 sm:w-[210px]">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
          {mobileLabel}
        </p>
        {mobile}
      </div>
    </div>
  )
}
