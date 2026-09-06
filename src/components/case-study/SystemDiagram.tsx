import { ArrowRight, ArrowDown } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

type SystemDiagramProps = {
  steps: string[]
  direction?: 'horizontal' | 'vertical'
}

export function SystemDiagram({ steps, direction = 'horizontal' }: SystemDiagramProps) {
  if (direction === 'vertical') {
    return (
      <Reveal className="flex flex-col items-start gap-3">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-start gap-3">
            <span className="border border-border bg-canvas-alt px-4 py-2.5 text-sm text-ink">
              {step}
            </span>
            {i < steps.length - 1 && <ArrowDown size={16} className="ml-4 text-ink-faint" />}
          </div>
        ))}
      </Reveal>
    )
  }

  return (
    <Reveal className="flex flex-wrap items-center gap-x-3 gap-y-4">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-3">
          <span className="border border-border bg-canvas-alt px-4 py-2.5 text-sm text-ink">
            {step}
          </span>
          {i < steps.length - 1 && <ArrowRight size={16} className="shrink-0 text-ink-faint" />}
        </span>
      ))}
    </Reveal>
  )
}
