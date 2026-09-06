import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type ProblemSectionProps = {
  userProblem: { title: string; detail: ReactNode }
  systemProblem: { title: string; detail: ReactNode }
}

export function ProblemSection({ userProblem, systemProblem }: ProblemSectionProps) {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="The Problem" title="Two problems, not one." />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
          <Reveal direction="left">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              User problem
            </p>
            <h3 className="mt-4 text-2xl font-medium tracking-tight text-ink">{userProblem.title}</h3>
            <div className="mt-4 max-w-md text-ink-soft [&_p]:leading-relaxed">{userProblem.detail}</div>
          </Reveal>
          <Reveal direction="right" delay={0.12}>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              Business / system problem
            </p>
            <h3 className="mt-4 text-2xl font-medium tracking-tight text-ink">{systemProblem.title}</h3>
            <div className="mt-4 max-w-md text-ink-soft [&_p]:leading-relaxed">{systemProblem.detail}</div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
