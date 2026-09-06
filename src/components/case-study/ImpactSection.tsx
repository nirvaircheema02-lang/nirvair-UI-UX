import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type ImpactItem = {
  title: string
  detail: string
  icon?: LucideIcon
  from?: string
  to?: string
}

type ImpactSectionProps = {
  items: ImpactItem[]
  eyebrow?: string
  title?: string
}

export function ImpactSection({ items, eyebrow = 'Impact', title = 'What changed.' }: ImpactSectionProps) {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal
                key={item.title}
                delay={(i % 2) * 0.06}
                className={i % 2 === 1 ? 'lg:mt-10' : ''}
              >
                {Icon ? (
                  <Icon size={20} strokeWidth={1.5} className="text-ink-faint" />
                ) : (
                  <span className="font-sans text-sm text-ink-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
                <h3 className="mt-4 text-lg font-medium tracking-tight text-ink md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-ink-soft">
                  {item.detail}
                </p>
                {item.from && item.to && (
                  <p className="mt-4 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.08em] text-ink-faint">
                    <span>{item.from}</span>
                    <ArrowRight size={11} aria-hidden />
                    <span className="text-ink">{item.to}</span>
                  </p>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
