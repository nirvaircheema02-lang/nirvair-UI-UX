import type { LucideIcon } from 'lucide-react'

type Step = { label: string; purpose?: string; icon?: LucideIcon }

export function SystemMap({ steps, className = '' }: { steps: Step[]; className?: string }) {
  return (
    <div className={`border border-border bg-surface p-6 md:p-12 ${className}`}>
      <div className="flex flex-col lg:hidden">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-canvas-alt text-ink-faint">
                  {Icon ? <Icon size={15} strokeWidth={1.5} /> : <span className="h-2 w-2 rounded-full bg-ink" />}
                </span>
                {i < steps.length - 1 && <span className="w-px flex-1 bg-border-strong" aria-hidden />}
              </div>
              <div className="pb-8 pt-1.5">
                <p className="text-sm font-medium text-ink">{step.label}</p>
                {step.purpose && <p className="mt-1 text-xs text-ink-faint">{step.purpose}</p>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative hidden lg:flex lg:items-start lg:justify-between">
        <div className="absolute left-0 right-0 top-[18px] h-px bg-border-strong" aria-hidden />
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div key={step.label} className="relative z-10 flex flex-col items-center px-1 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-canvas-alt text-ink-faint">
                {Icon ? <Icon size={15} strokeWidth={1.5} /> : <span className="h-2 w-2 rounded-full bg-ink" />}
              </span>
              <p className="mt-3 max-w-[112px] text-sm font-medium text-ink">{step.label}</p>
              {step.purpose && <p className="mt-1 text-xs text-ink-faint">{step.purpose}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
