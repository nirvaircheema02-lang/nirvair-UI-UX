import type { MediaItem } from '../../lib/types'
import { MediaFrame } from '../ui/MediaFrame'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type EvidenceSectionProps = {
  title?: string
  supporting?: string
  items: MediaItem[]
}

export function EvidenceSection({
  title = 'What existed before.',
  supporting,
  items,
}: EvidenceSectionProps) {
  return (
    <section id="evidence" className="scroll-mt-24 border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Evidence" title={title} supporting={supporting} />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.src} delay={(i % 2) * 0.08}>
              <MediaFrame {...item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
