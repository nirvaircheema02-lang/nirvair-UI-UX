import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'

type StatementSectionProps = {
  id?: string
  eyebrow: string
  statement: ReactNode
  supporting?: ReactNode
  dark?: boolean
}

export function StatementSection({ id, eyebrow, statement, supporting, dark }: StatementSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-b py-24 md:py-32 ${dark ? 'border-dark-border bg-dark text-dark-ink' : 'border-border'}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p
            className={`text-xs font-medium uppercase tracking-[0.14em] ${dark ? 'text-dark-ink-soft' : 'text-ink-faint'}`}
          >
            {eyebrow}
          </p>
          <p
            className={`mt-6 max-w-3xl font-sans text-3xl font-medium leading-[1.2] tracking-tight md:text-5xl ${dark ? 'text-dark-ink' : 'text-ink'}`}
          >
            {statement}
          </p>
          {supporting && (
            <p
              className={`mt-8 max-w-xl text-lg leading-relaxed ${dark ? 'text-dark-ink-soft' : 'text-ink-soft'}`}
            >
              {supporting}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
