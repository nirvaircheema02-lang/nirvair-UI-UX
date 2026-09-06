import { Eyebrow } from '../ui/Eyebrow'
import {
  ArrowDown,
  Bot,
  Boxes,
  Code2,
  Eye,
  FileText,
  GitBranch,
  ScanSearch,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { aiWorkflow } from '../../lib/site'
import { IconBadge } from '../ui/IconBadge'
import { FigmaMark, ICON_STROKE } from '../ui/icons'
import { Reveal } from '../ui/Reveal'

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>

const ICONS: Record<string, IconType> = {
  file: FileText,
  route: GitBranch,
  workflow: Workflow,
  agents: Bot,
  system: Boxes,
  figma: FigmaMark as IconType,
  output: ShieldCheck,
  analyze: ScanSearch,
  build: Code2,
  qa: Eye,
}

function StageArrow() {
  return (
    <span
      aria-hidden
      className="relative inline-block h-px w-6 shrink-0 self-start bg-border-strong lg:w-4"
      style={{ marginTop: 34 }}
    >
      <span className="absolute -right-px -top-[3px] h-[7px] w-[7px] rotate-45 border-r border-t border-border-strong" />
    </span>
  )
}

export function AiWorkflow() {
  const { eyebrow, heading, supporting, aura, loop } = aiWorkflow
  const n = loop.cycle.length
  // Percentages for the dashed return path, derived from the equal-width grid
  // so it stays anchored to Build and Repeat at any viewport.
  const returnLeft = ((loop.returnToIndex + 0.5) / n) * 100
  const returnRight = (1 - (n - 0.5) / n) * 100

  return (
    <section className="relative overflow-hidden border-t border-border bg-blue-alt py-24 md:py-32">
      {/* Faint technical grid with a dot at each intersection, faded at the
          edges so it never competes. Pure CSS and fully static: this section
          already carries the page's densest interaction (connectors, the loop
          return path), so the backdrop only supplies depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            // Deliberately fainter than the hero and How-I-Work canvases: this
            // section is the quiet technical one, so its backdrop must sit
            // below them in the hierarchy, not above.
            'radial-gradient(circle at 1px 1px, rgba(17,17,17,0.055) 1px, transparent 1px)',
            'linear-gradient(to right, rgba(17,17,17,0.045) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(17,17,17,0.045) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '52px 52px, 52px 52px, 52px 52px',
          maskImage: 'radial-gradient(ellipse 78% 55% at 50% 32%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 78% 55% at 50% 32%, black 0%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.15] tracking-tight text-ink md:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{supporting}</p>
        </Reveal>

        {/* ── 01 · Project Aura ─────────────────────────────────────────── */}
        <Reveal delay={0.12} className="mt-14">
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-sans text-xl font-medium tracking-tight text-ink md:text-2xl">
                {aura.name}
              </h3>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
                {aura.label}
              </span>
            </div>

            {/* One linear flow. Horizontal from sm up (scrolls when it cannot
                fit, so it never wraps into a row starting with a connector);
                a clean vertical sequence on phones. */}
            <div className="-mx-6 mt-8 overflow-x-auto px-6 pb-1 md:-mx-8 md:px-8 max-sm:mx-0 max-sm:overflow-visible max-sm:px-0">
              <ol className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-stretch sm:gap-0">
                {aura.stages.map((stage, i) => (
                  <li key={stage.name} className="flex shrink-0 sm:items-stretch max-sm:flex-col">
                    {i > 0 && (
                      <>
                        <span className="hidden sm:inline-flex">
                          <StageArrow />
                        </span>
                        <ArrowDown
                          aria-hidden
                          size={15}
                          strokeWidth={ICON_STROKE}
                          className="my-1 ml-4 text-border-strong sm:hidden"
                        />
                      </>
                    )}
                    <div className="group flex items-start gap-3 rounded-xl border border-border bg-surface p-3 transition-colors duration-200 hover:border-accent/35 sm:h-full sm:w-[132px] sm:flex-col sm:gap-0 lg:w-[138px]">
                      <IconBadge icon={ICONS[stage.icon]} size="md" />
                      {/* Stacked beside the icon on phones; `contents` dissolves
                          the wrapper so the desktop column layout is unchanged. */}
                      <div className="min-w-0 sm:contents">
                        <p className="text-[13px] font-medium leading-snug text-ink sm:mt-3">
                          {stage.name}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-ink-faint">
                          {stage.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-7 max-w-3xl border-t border-border pt-5 text-sm leading-relaxed text-ink-soft">
              {aura.note}
            </p>
          </div>
        </Reveal>

        {/* ── 02 · Loop Engineering ─────────────────────────────────────── */}
        <Reveal delay={0.21} className="mt-8">
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-sans text-xl font-medium tracking-tight text-ink md:text-2xl">
                {loop.name}
              </h3>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
                {loop.label}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {loop.agents.map((agent) => (
                <div
                  key={agent.name}
                  className="group rounded-xl border border-border bg-canvas p-5 transition-colors duration-200 hover:border-accent/35"
                >
                  <IconBadge icon={ICONS[agent.icon]} size="md" />
                  <p className="mt-4 font-medium text-ink">{agent.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{agent.detail}</p>
                </div>
              ))}
            </div>

            {/* iteration cycle */}
            <p className="mt-9 text-xs font-medium uppercase tracking-[0.12em] text-ink-faint">
              {loop.microCopy}
            </p>

            {/* desktop: one line with a dashed return path back to Build */}
            <div className="relative mt-5 hidden pb-11 sm:block">
              <span
                aria-hidden
                className="absolute top-[13px] h-px bg-border-strong"
                style={{ left: `${100 / n / 2}%`, right: `${100 / n / 2}%` }}
              />
              <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0,1fr))` }}>
                {loop.cycle.map((step, i) => (
                  <li key={step} className="flex flex-col items-center">
                    <span
                      aria-hidden
                      className={`h-[7px] w-[7px] rounded-full ${
                        i === n - 1 ? 'bg-accent' : 'bg-border-strong'
                      }`}
                      style={{ marginTop: 9.5 }}
                    />
                    <span className="mt-3 px-1 text-center text-[13px] leading-snug text-ink">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              {/* dashed return: Repeat ➞ Build */}
              <span
                aria-hidden
                className="absolute bottom-2 rounded-b-lg border-b border-l border-r border-dashed border-accent/45"
                style={{ left: `${returnLeft}%`, right: `${returnRight}%`, height: 26 }}
              />
              <span
                aria-hidden
                className="absolute bottom-[26px] h-[7px] w-[7px] rotate-45 border-l border-t border-accent/60"
                style={{ left: `calc(${returnLeft}% - 3.5px)` }}
              />
            </div>

            {/* mobile: vertical cycle */}
            <ol className="mt-5 sm:hidden">
              {loop.cycle.map((step, i) => (
                <li key={step} className="flex items-center gap-3 py-1.5">
                  <span
                    aria-hidden
                    className={`h-[7px] w-[7px] shrink-0 rounded-full ${
                      i === n - 1 ? 'bg-accent' : 'bg-border-strong'
                    }`}
                  />
                  <span className="text-sm text-ink">{step}</span>
                  {i === n - 1 && (
                    <span className="text-xs text-accent">↺ back to {loop.cycle[loop.returnToIndex]}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
