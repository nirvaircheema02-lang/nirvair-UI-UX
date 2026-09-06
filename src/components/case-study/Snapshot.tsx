import type { Snapshot as SnapshotType } from '../../lib/types'
import { Reveal } from '../ui/Reveal'

export function Snapshot(props: SnapshotType) {
  const rows: [string, string | undefined][] = [
    ['Role', props.role],
    ['Team', props.team],
    ['Timeline', props.timeline],
    ['Scope', props.scope],
    ['Platform', props.platform],
  ]

  return (
    <section className="border-y border-border py-10">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-wrap gap-x-12 gap-y-6">
          {rows
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                  {label}
                </p>
                <p className="mt-1.5 text-ink">{value}</p>
              </div>
            ))}
        </Reveal>
      </div>
    </section>
  )
}
