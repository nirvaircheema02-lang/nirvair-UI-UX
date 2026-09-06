import type { MediaItem } from '../../lib/types'
import { MediaFrame } from './MediaFrame'

type PDFSpreadProps = {
  pages: MediaItem[]
  className?: string
}

export function PDFSpread({ pages, className = '' }: PDFSpreadProps) {
  return (
    <div className={`flex min-w-0 snap-x gap-5 overflow-x-auto px-1 pb-3 pt-1 ${className}`}>
      {pages.map((page, i) => (
        <div
          key={page.src}
          className="w-[62%] shrink-0 snap-start sm:w-[38%] md:w-[30%]"
          style={{ transform: i % 2 === 0 ? 'rotate(-0.6deg)' : 'rotate(0.6deg)' }}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-x-1.5 -bottom-1.5 -z-10 h-full rounded-sm border border-border bg-surface"
            />
            <MediaFrame
              {...page}
              ratio="3/4"
              fit="contain"
              className="[&>div]:shadow-[0_20px_40px_-20px_rgba(17,17,17,0.3)]"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
