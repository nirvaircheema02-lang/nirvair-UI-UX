import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'

type OutcomeItem = { title: string; detail: string }

type ProblemOutcomeProps = {
  problem: ReactNode
  outcomes: OutcomeItem[]
}

export function ProblemOutcome({ problem, outcomes }: ProblemOutcomeProps) {
  return (
    <section className="border-t border-border py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
          <Reveal direction="left">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              The Problem
            </p>
            <div className="mt-5 max-w-md text-xl leading-relaxed text-ink [&_p]:mt-4 [&_p:first-child]:mt-0">
              {problem}
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.12}>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              Outcome
            </p>
            <div className="mt-5 space-y-5">
              {outcomes.map((o) => (
                <div key={o.title} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                  <p className="font-medium text-ink">{o.title}</p>
                  <p className="mt-1 text-ink-soft">{o.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
