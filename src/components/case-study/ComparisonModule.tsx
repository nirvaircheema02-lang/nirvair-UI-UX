import { Expand } from 'lucide-react'
import { useState } from 'react'
import type { MediaItem } from '../../lib/types'
import { Dialog } from '../ui/Dialog'
import { MediaFrame } from '../ui/MediaFrame'

type ComparisonItem = MediaItem & { label: string; sublabel?: string }

type ComparisonModuleProps = {
  items: ComparisonItem[]
  ratio?: string
  fit?: 'cover' | 'contain'
}

export function ComparisonModule({ items, ratio = '3/4', fit = 'contain' }: ComparisonModuleProps) {
  const [active, setActive] = useState<ComparisonItem | null>(null)

  return (
    <div
      className="flex snap-x gap-6 overflow-x-auto pb-2 md:grid md:overflow-visible md:pb-0"
      style={{ gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <div key={item.label} className="w-[82%] shrink-0 snap-start md:w-auto">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
            {item.label}
          </p>
          <button
            type="button"
            onClick={() => setActive(item)}
            className="group relative block w-full min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <MediaFrame {...item} ratio={ratio} fit={fit} />
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-ink-faint opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand size={14} />
            </span>
          </button>
          {item.sublabel && <p className="mt-2 text-sm text-ink-soft">{item.sublabel}</p>}
        </div>
      ))}

      <Dialog open={!!active} onClose={() => setActive(null)} title={active?.label ?? 'Expanded view'} variant="center">
        {active && (
          <div className="p-2">
            <img src={active.src} alt={active.alt} className="max-h-[84vh] w-full object-contain" />
            <p className="px-3 py-3 text-sm text-ink-soft">
              <span className="font-medium text-ink">{active.label}</span>
              {active.sublabel ? ` — ${active.sublabel}` : ''}
            </p>
          </div>
        )}
      </Dialog>
    </div>
  )
}
