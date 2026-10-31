import { Eyebrow } from '../ui/Eyebrow'
import { ArrowRight, BarChart3, Layers, Users, Zap } from 'lucide-react'
import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { impact, impactCopy } from '../../lib/site'
import { IconBadge } from '../ui/IconBadge'
import { Reveal } from '../ui/Reveal'

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>

const ICONS: Record<string, IconType> = {
  scale: BarChart3,
  consistency: Layers,
  performance: Zap,
  delivery: Users,
}

export function Impact() {
  return (
    <section className="border-t border-border bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>
            {impactCopy.eyebrow}
          </Eyebrow>
          <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.15] tracking-tight text-ink md:text-4xl">
            {impactCopy.heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {impactCopy.supporting}
          </p>
        </Reveal>

        {/* Quadrant: internal rules only, so whitespace does the separating and
            nothing needs a card. */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2">
          {impact.map((item, i) => (
            <Reveal
              key={item.label}
              delay={(i % 2) * 0.06}
              className={[
                'group flex gap-5 py-9 md:gap-6 md:py-12',
                i > 0 ? 'border-t border-border' : '',
                i % 2 === 1 ? 'sm:border-l sm:border-border sm:pl-10 md:pl-14' : 'sm:pr-10 md:pr-14',
                i === 1 ? 'sm:border-t-0' : '',
              ].join(' ')}
            >
              <IconBadge icon={ICONS[item.icon]} size="lg" />

              <div className="min-w-0">
                <h3 className="font-sans text-xl font-medium tracking-tight text-ink md:text-2xl">
                  {item.label}
                </h3>
                <p className="mt-3 max-w-[34ch] leading-relaxed text-ink-soft">{item.detail}</p>

                <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                  <span>{item.from}</span>
                  <ArrowRight
                    size={15}
                    strokeWidth={1.6}
                    className="text-accent transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                  <span className="text-ink">{item.to}</span>
                </p>

                <Link
                  to={item.proof.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Seen in {item.proof.label}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
