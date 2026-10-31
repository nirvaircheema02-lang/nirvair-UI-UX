import { motion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { AgentPipelineShowcase } from '../../components/case-study/AgentPipelineShowcase'

/**
 * Audit Agent + Fix & Redesign Agent case study.
 *
 * Everything here is read from the two agents' own repositories (their
 * ARCHITECTURE docs, READMEs and saved run) — nothing is estimated. The page
 * states one saved run exactly as the agent recorded it, including the part
 * that was not verified, and it carries no speed or accuracy claim because
 * none was measured.
 */

/** The end-to-end loop, with the two human decisions marked. */
const FLOW: { label: string; detail: string; gate?: boolean }[] = [
  { label: 'Page URL', detail: 'One live page, or a whole site, plus an explicit mode.' },
  { label: 'Audit Agent', detail: 'Measures the page against the Ken Design System.' },
  { label: 'Fix Plan', detail: 'Every finding, with its evidence and the rule it breaks.' },
  { label: 'Human review', detail: 'A person marks each finding Fix or leaves it.', gate: true },
  { label: 'Fix & Redesign Agent', detail: 'Applies only what was marked Fix.' },
  { label: 'React preview', detail: 'Runnable source and a local URL, measured before anyone is asked to look.' },
  { label: 'Human approval', detail: 'Gate G2. Always a person’s decision.', gate: true },
]

const LAYERS = [
  {
    code: 'A',
    name: 'Site audit master',
    nodes: 'Site Mapper · Template Classifier · Dispatcher · Consolidator',
    job: 'Full-site runs only. Decides what to audit, pauses at a Scope Gate, fans pages out to workers and folds the results back together.',
  },
  {
    code: 'B',
    name: 'Page audit agent',
    nodes:
      'Page Analyzer · Component Detector · DS Matcher · Compliance Auditor · Visual Verifier · New Component Evaluator · Coverage & QA',
    job: 'One instance per page. Captures the rendered page, finds every component, names its design-system family and measures it against that component’s own source.',
  },
  {
    code: 'C',
    name: 'Result and Figma',
    nodes: 'Audit data · standalone HTML report · local dashboard · Figma plan',
    job: 'Downstream only. Publishes what the audit proved and never changes a finding.',
  },
  {
    code: 'D',
    name: 'Design-system core',
    nodes: 'Reader · Registry · Tokens · Components · States and rules · Version',
    job: 'The single source of design-system truth. Read once per run and shared by every worker, so all pages see the same registry.',
  },
]

const PRINCIPLES = [
  {
    title: 'Measure, never guess',
    detail:
      'The default mode makes zero model calls. Colour, size, spacing and radius come from computed styles and the design system’s own source. What cannot be proven is reported as Needs review or Unverified, with the reason, and is never scored.',
  },
  {
    title: 'Account for every element',
    detail:
      'A final coverage stage builds its own manifest of the rendered page. Each item ends as audited, excluded with a reason, needs review, or capture failed. The gate passes only when nothing is unaccounted for.',
  },
  {
    title: 'Bound every loop',
    detail:
      'Recovery is capped at two attempts per item. A failure is classified, retried and escalated, never silently dropped, and the graph stays acyclic inside a run.',
  },
  {
    title: 'Keep humans at the decisions',
    detail:
      'Gates pause the graph for scope, publishing and final approval. The agents prepare the decision; they do not take it.',
  },
]

const EDGES = [
  ['sequential', 'One stage hands to the next.'],
  ['conditional', 'A matched component goes to compliance, an unmatched one to evaluation.'],
  ['fan-out / fan-in', 'Pages run in bounded parallel and merge back.'],
  ['gate', 'The graph stops until a human decides.'],
  ['error', 'Classified, retried, then escalated.'],
  ['feedback', 'Written to shared state for the next run, not looped inside this one.'],
]

const COVERAGE = ['Audited', 'Excluded with reason', 'Needs review', 'Capture failed']

const STAGES = [
  { id: 'R1', name: 'Resolve', detail: 'Finds the audit run, validates the Fix Plan and loads the design system.' },
  { id: 'R2', name: 'Capture', detail: 'Records the original page, read-only, at desktop and phone widths.' },
  { id: 'C2', name: 'Map', detail: 'Maps each finding to the element and section it belongs to.' },
  { id: 'G1', name: 'Scope', detail: 'Resolves scope conflicts when needed. Selected sections and full page both change only approved findings.' },
  { id: 'B1', name: 'Behaviour', detail: 'Records how the original behaves: hover, click, input, scroll, sticky. Nothing is clicked that could submit.' },
  { id: 'RV', name: 'Resolve targets', detail: 'Turns each missing expectation into a verified target, a preserved property, or a named gap.' },
  { id: 'R3 · R4 · R5', name: 'Plan · apply · compare', detail: 'Plans the edits, applies them and compares with the original. The current configuration uses one planning pass; preview corrections have a separate bounded budget.' },
  { id: 'R6', name: 'Component review', detail: 'Reports components the design system does not have. Building them is switched off.' },
  { id: 'R7', name: 'Assemble', detail: 'Writes the run record and a static snapshot, kept as reference only.' },
  { id: 'R8', name: 'React preview', detail: 'Generates, builds, serves and verifies the running preview, with a bounded correction loop.' },
]

const CHECKS = [
  ['Scope', 'Rendered sections equal the set derived independently from the Fix Plan and audit data.'],
  ['Content', 'Every original text, link and image survives, and section height stays within 10%.'],
  ['Design-system fixes', 'Each fix is read back from the rendered preview with computed styles, never assumed from the code.'],
  ['Interactions', 'Hover, click, input and scroll behaviour is probed on both pages and compared.'],
  ['Design and state fidelity', 'Default, hover and focus styles of the original are captured once and compared. Only an authorised change may differ.'],
  ['Runtime', 'Checks runtime errors, network behavior and horizontal overflow at desktop and phone widths.'],
]

const GUARDRAILS = [
  'Read-only on the live site: non-GET requests and analytics are aborted, and links and submit controls are never clicked.',
  'The audit repository is never written to. The two agents are linked by one config path.',
  'The current deterministic mode answers stage judgments automatically. Session and API providers are separate options; final approval remains a human decision.',
  'The preview records runtime and network checks, with unresolved requirements reported before approval.',
  'If a preview cannot be built or measured, the run fails with the reason. It never falls back to static HTML.',
]

const NOT_REPRODUCED =
  'Scroll-linked paths, calculators, and accordions that render answers only on click cannot be derived from a snapshot. They are listed as not reproduced, and a hand-written override can close the gap.'

export function AgentPipeline() {
  return (
    <div>
      {/* ── 01 · Hero ─────────────────────────────────────────────────── */}
      <header className="overflow-hidden border-b border-border bg-canvas-alt pb-12 pt-24 md:pt-28">
        <div className="mx-auto max-w-6xl px-6">
          <Link to="/" className="inline-flex min-h-6 items-center gap-2 text-sm text-ink-faint hover:text-ink"><ArrowLeft size={14} aria-hidden /> Back to Home</Link>
          <div className="mt-7 grid items-center gap-7 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <Eyebrow>AI agents · Design systems · Design QA</Eyebrow>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-4 font-sans text-4xl font-medium leading-[1.06] tracking-tight text-ink md:text-5xl">
                From design audit<br className="hidden sm:block" /> to a reviewed fix.
              </motion.h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">Two connected agents turn design-system evidence into a reviewed fix plan, a measured React preview and an editable Figma handoff.</p>
              <a href="#walkthroughs" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Explore the walkthroughs <ArrowDown size={16} aria-hidden /></a>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="h-[260px] sm:h-[340px] lg:h-[370px]"><AgentPipelineShowcase /></motion.div>
          </div>
          <dl className="mt-8 hidden grid-cols-3 gap-8 border-t border-border pt-6 lg:grid">
            {[['Role', 'Designed and directed the system'], ['Scope', 'Agent architecture · Design rules · Verification'], ['Built with', 'Claude Code · Playwright · React · TypeScript']].map(([label, value]) => <div key={label}><dt className="text-xs uppercase tracking-[0.14em] text-ink-faint">{label}</dt><dd className="mt-2 text-sm text-ink">{value}</dd></div>)}
          </dl>
        </div>
      </header>

      <section id="walkthroughs" className="scroll-mt-24 border-b border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Explore the system" title="See the decisions behind the agents." supporting="Two interactive guides connect the architecture, review decisions and saved evidence. Open either guide to explore its workflow." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { name: 'Audit Agent', claudeHref: 'https://claude.ai/artifact/TXSUg9uGuMPgXoV8frJc3L#purpose', image: 'audit-system', href: '/demos/ai-agents/audit/index.html#architecture', detail: 'Follow a page from browser evidence through design-system checks, recovery and a reviewable report.', date: 'Source snapshot · 8 October 2026' },
              { name: 'Fix & Redesign Agent', claudeHref: 'https://claude.ai/artifact/MpRDFGjJ2zieSwHKQQm7gQ', image: 'redesign-system', href: '/demos/ai-agents/redesign/index.html#workflow', detail: 'Explore selected-section and full-page scopes, measured corrections, human approval and the Figma export.', date: 'Source snapshot · 31 October 2026' },
            ].map((guide, i) => <Reveal key={guide.name} delay={i * 0.08} className="flex flex-col overflow-hidden rounded-xl border border-border">
              <a href={guide.href} target="_blank" rel="noreferrer" className="block bg-canvas-alt p-4 focus-visible:outline-2 focus-visible:outline-accent" aria-label={`Explore ${guide.name} workflow in a new tab`}>
                <img src={`/assets/projects/agent-pipeline/${guide.image}.png`} alt={`Actual ${guide.name} system diagram captured from its interactive guide`} className="aspect-[16/11] w-full rounded-md bg-white object-contain" loading="lazy" decoding="async" />
              </a>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-ink-faint">{guide.date}</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight text-ink">{guide.name}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{guide.detail}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-5">
                  <a href={guide.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent">Open interactive walkthrough <ArrowUpRight size={16} aria-hidden /></a>
                  <a href={guide.claudeHref} target="_blank" rel="noreferrer" aria-label={`View ${guide.name} on Claude in a new tab`} className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft underline decoration-border underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent">View on Claude <ArrowUpRight size={14} aria-hidden /></a>
                </div>
              </div>
            </Reveal>)}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-faint">These are interactive explanations of the system. The examples and controls do not execute an audit or change a live website.</p>
        </div>
      </section>

      {/* ── 02 · Problem ──────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
                A design system only holds if every page keeps matching it.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.12} className="space-y-5 text-lg leading-relaxed">
              <p className="text-ink-soft">
                Checking a live page against a design system by eye is slow, differs from reviewer
                to reviewer, and cannot be repeated the same way next quarter. A fix made on that
                basis is just as hard to trust.
              </p>
              <p className="text-ink">
                The aim was a process where every claim about a page is measured, every gap is
                named, and a redesign is only presented once it has been checked against the
                original.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · The loop ─────────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="The whole loop"
            title="Two agents, two human decisions."
            supporting="The audit produces evidence. A person decides what to fix. The second agent builds only that, and a second decision closes the loop."
          />
          <ol className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-7 lg:gap-2">
            {FLOW.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="min-w-0">
                <li
                  className={`relative h-full list-none border p-4 ${
                    s.gate ? 'border-accent bg-white' : 'border-ink/15 bg-surface'
                  }`}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                      s.gate ? 'text-accent' : 'text-ink-faint'
                    }`}
                  >
                    {s.gate ? 'Human decision' : 'Agent step'}
                  </p>
                  <p className="mt-2 font-sans text-base font-medium leading-snug tracking-tight text-ink">
                    {s.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.detail}</p>
                  {i < FLOW.length - 1 && (
                    <>
                      <ArrowRight
                        size={14}
                        className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-accent lg:block"
                        aria-hidden
                      />
                      <ArrowDown
                        size={14}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-accent lg:hidden"
                        aria-hidden
                      />
                    </>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 04 · Audit Agent ──────────────────────────────────────────── */}
      <section className="border-t border-border bg-cool-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Agent one · Audit"
            title="A graph of small stages, each with one job."
            supporting="The Audit Agent is a typed graph, not one long prompt. A run is either a single page or a full site, set explicitly by the caller. The system never guesses the mode from the shape of the URL."
          />

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-cols-2">
            {LAYERS.map((l, i) => (
              <Reveal key={l.code} delay={i * 0.07} className="min-w-0 bg-surface p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-2xl font-medium text-accent">{l.code}</span>
                  <h3 className="font-sans text-lg font-medium tracking-tight text-ink">{l.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-faint">{l.nodes}</p>
                <p className="mt-3 leading-relaxed text-ink-soft">{l.job}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h3 className="font-sans text-xl font-medium tracking-tight text-ink">
                Inside one page audit
              </h3>
              <ol className="mt-6 space-y-3 text-ink-soft">
                {[
                  ['Page Analyzer', 'expands disclosures, waits for the page to settle, and splits it into sections.'],
                  ['Component Detector', 'uses DOM and rendered evidence together, never an ARIA role alone.'],
                  ['DS Matcher', 'names the design-system family before judging how well it is styled.'],
                  ['Compliance Auditor', 'compares the exact element B2 found against the component’s own source.'],
                  ['Visual Verifier', 'checks completeness and attaches layout and accessibility facts.'],
                  ['New Component Evaluator', 'handles a pattern no family covers: a candidate, never an auto-approval.'],
                  ['Coverage and QA', 'rebuilds its own manifest and loops until nothing is unaccounted for.'],
                ].map(([n, d], i) => (
                  <li key={n} className="flex gap-4">
                    <span className="mt-0.5 w-6 shrink-0 text-sm font-medium text-accent">B{i + 1}</span>
                    <span>
                      <span className="font-medium text-ink">{n}</span> {d}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="font-sans text-xl font-medium tracking-tight text-ink">
                Six kinds of connection
              </h3>
              <dl className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
                {EDGES.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 py-3">
                    <dt className="text-sm font-medium text-ink">{k}</dt>
                    <dd className="text-sm leading-relaxed text-ink-soft">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-ink-faint">
                Where a stage could be a judgment call, the default mode does the measurable part
                in code and reports the rest as needing review.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 05 · Principles ───────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="How it earns trust"
            title="Four rules the agents are not allowed to bend."
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-ink/15 pt-12 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <h3 className="font-sans text-xl font-medium leading-snug tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{p.detail}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="mt-14 border-t border-ink/15 pt-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              Coverage gate: every item on the page ends in exactly one state
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {COVERAGE.map((c) => (
                <li key={c} className="border border-ink/20 px-4 py-2 text-sm text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── 06 · Fix & Redesign ───────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Agent two · Fix & Redesign"
            title="Apply only what a person approved, and keep everything else as it was."
            supporting="The agent reads a reviewed Fix Plan and starts from two inputs: the run and a mode. Selected sections renders only the sections that hold a Fix finding, each complete. Full page renders every page-specific section in order."
          />
          <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2">
            {STAGES.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.04} className="min-w-0 bg-surface p-5">
                <li className="list-none">
                  <p className="text-sm font-medium text-accent">{s.id}</p>
                  <p className="mt-1.5 font-sans text-base font-medium tracking-tight text-ink">
                    {s.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-faint">
              The stages run as a file-backed state machine with one bounded plan, apply and compare
              loop. It does not use the Audit Agent’s graph engine and does not run pages in
              parallel.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 07 · Verification ─────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Verification before approval"
            title="Nothing is claimed that was not measured."
            supporting="Before the approval gate asks anyone to look, the running preview is checked in a real browser. Every check ends as verified, failed or unverified, and the three are never merged."
          />
          <dl className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
            {CHECKS.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.04}>
                <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
                  <dt className="flex items-center gap-2 font-sans text-base font-medium text-ink">
                    <Check size={15} className="text-accent" aria-hidden />
                    {k}
                  </dt>
                  <dd className="leading-relaxed text-ink-soft">{v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h3 className="font-sans text-xl font-medium tracking-tight text-ink">
                A regression becomes feedback, inside one budget.
              </h3>
              <p className="mt-4 leading-relaxed text-ink-soft">
                If the preview drifts from the original, the failure is written up as the element,
                state, viewport, expected value and observed value. It goes back to the generator or
                the planner, is re-rendered and rechecked. The correction budget is bounded, saved to disk and restored on resume.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                The result is Pass, Fail or Incomplete. A required check that cannot be verified prevents Pass and is shown with its reason. Human approval is recorded separately from that result.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-sans text-xl font-medium tracking-tight text-ink">
                What a saved run actually says
              </h3>
              <div className="mt-4 border border-ink/15 bg-canvas p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                  Deals and IPO Consulting page · saved run
                </p>
                <p className="mt-3 font-sans text-3xl font-medium tracking-tight text-ink">
                  10 of 26 <span className="text-lg text-ink-soft">findings verified</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  The preview verdict was Pass and the run was awaiting approval. The other 16
                  findings are listed with their reasons, not counted as fixed.
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-faint">{NOT_REPRODUCED}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal><Eyebrow>From preview to handoff</Eyebrow><h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-ink">The reviewed page,<br />ready for Figma.</h2></Reveal>
          <Reveal className="space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>The React preview remains the source. Once it is built, the agent prepares a bundle for a session to create editable layers in the audit project’s Figma file.</p>
            <p>The handoff is compared with the rendered preview. Token matches are recorded, and unsupported states or unmatched values remain visible as limitations.</p>
            <a href="/demos/ai-agents/redesign/index.html#figma" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent hover:underline">Explore the Figma handoff <ArrowUpRight size={16} aria-hidden /></a>
          </Reveal>
        </div>
      </section>

      {/* ── 08 · Guardrails ───────────────────────────────────────────── */}
      <section className="border-t border-border bg-cool-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Guardrails</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
                Built to be safe to point at a real site.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <ul className="space-y-4">
                {GUARDRAILS.map((g) => (
                  <li key={g} className="flex gap-3 leading-relaxed text-ink-soft">
                    <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 09 · Where it sits ────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Where it sits</Eyebrow>
              <h2 className="mt-4 font-sans text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl">
                One of several agent workflows around the same design system.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09} className="max-w-2xl space-y-5 text-lg leading-relaxed">
              <p className="text-ink">
                Both agents read the Ken Design System from Project Aura’s workspace and never copy
                it. Project Aura sets the rules for how work is routed and built. Loop Engineering
                is the build-side loop, for matching a reference screen.
              </p>
              <p className="text-ink-soft">
                These two agents sit on the other side: they check a page that already exists.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-base font-medium text-accent hover:underline"
              >
                See the AI workflow overview
                <ArrowRight size={15} aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 10 · Reflection ───────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
            <Reveal direction="left">
              <Eyebrow>Reflection</Eyebrow>
              <h2 className="mt-4 font-sans text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl">
                The designer’s job moved from drawing the fix to defining what counts as proof.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09} className="max-w-2xl space-y-6 text-lg leading-relaxed">
              <p className="text-ink">
                The useful design work was in the rules: which property is measured against which
                source, what “preserved” has to mean, when an agent must stop and report instead of
                passing. The interface of these agents is their report, and it is only as honest as
                those rules.
              </p>
              <p className="text-ink-soft">
                No speed or accuracy figures are claimed here. None were measured, so none are
                estimated.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
