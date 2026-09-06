import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'

type DecisionSectionProps = {
  index: string
  question: string
  children: ReactNode
  media?: ReactNode
}

export function DecisionSection({ index, question, children, media }: DecisionSectionProps) {
  return (
    <div className="border-t border-border py-16 first:border-t-0 md:py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
        <Reveal direction="left">
          <span className="text-sm text-ink-faint">Decision {index}</span>
          <h3 className="mt-3 font-sans text-2xl font-medium leading-tight tracking-tight text-ink">
            {question}
          </h3>
        </Reveal>
        <Reveal direction="right" delay={0.09}>
          <div className="max-w-2xl text-lg leading-relaxed text-ink-soft [&_p]:mt-4 [&_p:first-child]:mt-0">
            {children}
          </div>
          {media && <div className="mt-10">{media}</div>}
        </Reveal>
      </div>
    </div>
  )
}
