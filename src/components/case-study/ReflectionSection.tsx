import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type ReflectionSectionProps = {
  items: string[]
}

export function ReflectionSection({ items }: ReflectionSectionProps) {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Trade-offs & Learnings" title="What I'd improve next." />
        <div className="mt-12 max-w-2xl space-y-8">
          {items.map((item, i) => (
            <Reveal key={item} delay={i * 0.09} className="flex gap-5">
              <span className="text-sm text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-lg leading-relaxed text-ink-soft">{item}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
