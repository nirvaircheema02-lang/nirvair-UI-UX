import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ScreenFrame } from '../../components/case-study/ScreenFrame'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'

/**
 * Ken Design System case study.
 *
 * Every count on this page is read from the system source in this workspace,
 * not estimated:
 *   tokens      `design-system/tokens/build/tokens.css`  → 286 declarations
 *   components  `core-v2/src/{atoms,molecules,organisms}` → 55 / 56 / 73
 *   templates   `core-v2/src/templates/*.tsx`            → 9, each with a .md
 *   docs        sidecar `.md` files under core-v2/src     → 80
 * No adoption, delivery-speed or time-saved figures appear, because none are
 * documented anywhere in the repo.
 */
const A = '/assets/projects/design-system/v2/'

const NEEDS = [
  { n: '01', title: 'Consistency',
    detail: 'Shared foundations and reusable patterns across a growing number of experiences.' },
  { n: '02', title: 'Scalability',
    detail: 'Stop re-deciding common interface questions for every new product or page.' },
  { n: '03', title: 'Design–development alignment',
    detail: 'One shared reference for how a pattern should look, behave and respond.' },
]

/** The architecture a visitor should grasp in about five seconds. */
const LAYERS = [
  { name: 'Foundations', detail: 'Tokens, typography, colour, spacing and motion rules.',
    examples: ['286 tokens', 'Type scale', 'Colour', 'Spacing'] },
  { name: 'Components', detail: 'Reusable interface building blocks and their states.',
    examples: ['Button', 'Input', 'Card', 'Filter'] },
  { name: 'Patterns', detail: 'Repeatable structures for recurring product workflows.',
    examples: ['Listing page', 'Chapter section', 'Hero', 'Data chart'] },
  { name: 'Product', detail: 'Real Survey, Report Store and report experiences.',
    examples: ['Report Store', 'Report detail', 'Survey'] },
]

/**
 * System scale — component modules per layer, counted from the source
 * directories. Deliberately the conservative number: the barrels export more
 * names (57 / 60 / 83) because some modules export several components.
 */
const SCALE = [
  ['55', 'Atoms'],
  ['56', 'Molecules'],
  ['73', 'Organisms'],
  ['9', 'Patterns'],
] as const

/** Token groups, counted from the built token file. */
const TOKEN_GROUPS = [
  ['Colour', 80], ['Semantic', 57], ['Typography', 28], ['Composition', 20],
  ['Chart', 16], ['Button', 16], ['Variant', 15], ['Motion', 14], ['Spacing', 13],
] as const

/** A real chain from the source: these organisms build the live Report Store. */
const CHAIN = [
  { step: 'Primitive', items: 'FilterCheckbox · FilterChip · FilterSearchInput' },
  { step: 'Component', items: 'FilterAccordion · CheckboxFilterSection · ActiveFilterChip' },
  { step: 'Pattern', items: 'FiltersPanel · ListingToolbar · CardListing' },
  { step: 'Product', items: 'The live Report Store' },
]

const BUILT = [
  { count: '286', label: 'Design tokens',
    detail: 'Colour, semantic, typography, spacing, motion and shadow decisions in one built file.' },
  { count: '184', label: 'Components',
    detail: '55 atoms, 56 molecules and 73 organisms, each with defined states.' },
  { count: '9', label: 'Page templates',
    detail: 'Listing, chapter, hero, data-chart and accordion structures — each with its own doc.' },
  { count: '80', label: 'Component documents',
    detail: 'Sidecar documentation covering what a component is for and when not to use it.' },
]

const IMPACT = [
  { from: 'Repeated decisions', to: 'Shared patterns', title: 'Consistency',
    detail: 'A common visual and interaction language makes separate product experiences feel connected.' },
  { from: 'Page-by-page design', to: 'Reusable blocks', title: 'Scale',
    detail: 'Common interface decisions get reused as the ecosystem grows instead of re-made.' },
  { from: 'Repeated interpretation', to: 'Shared reference', title: 'Delivery',
    detail: 'Design and implementation work from the same definition of a component and its states.' },
  { from: 'One-time UI calls', to: 'Maintainable rules', title: 'Governance',
    detail: 'Documented lifecycle and anti-patterns give the system a base for future evolution.' },
]

export function DesignSystem() {
  return (
    <div>
      {/* ── 01 · Hero — light editorial, dark system canvas ────────────── */}
      <header className="border-b border-border bg-canvas-alt pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-accent"
              >
                Design system · Product infrastructure · Systems thinking
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 font-sans text-4xl font-medium leading-[1.1] tracking-tight text-ink md:text-5xl"
              >
                Building a shared design language for a growing product ecosystem.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft"
              >
                A scalable foundation of design tokens, reusable components and product patterns,
                built to bring consistency and speed across Ken Research’s digital ecosystem.
              </motion.p>

              <motion.dl
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/15 pt-7 sm:grid-cols-3"
              >
                {[
                  ['Role', 'Senior Product / UX Designer'],
                  ['Scope', 'Design systems · UX/UI · Components · Governance'],
                  ['Platform', 'Web'],
                ].map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                      {k}
                    </dt>
                    <dd className="mt-1.5 leading-snug text-ink">{v}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            {/* Dark system canvas — real boards from the system, curated. This
                is the page's one strong dark moment, and what distinguishes it
                from the other flagship case studies' dark heroes. */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl bg-dark p-5 shadow-[0_44px_90px_-40px_rgba(17,17,17,0.5)] md:p-7"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-dark-ink-soft">
                The system
              </p>
              <div className="mt-4 space-y-3">
                {[
                  ['frag-type', 'Type scale from the design system'],
                  ['frag-buttons', 'Button component and its states'],
                ].map(([f, alt]) => (
                  <img
                    key={f}
                    src={`${A}${f}.webp`}
                    alt={alt}
                    loading="eager"
                    decoding="async"
                    className="block h-auto w-full rounded-md border border-white/10"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── 02 · Context ──────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Context</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
                A growing product ecosystem needed a shared design language.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.12} className="space-y-5 text-lg leading-relaxed">
              <p className="text-ink-soft">
                As the digital ecosystem expanded, more pages, products and workflows meant the
                same interface decisions were being made again in each new place.
              </p>
              <p className="text-ink">
                The opportunity was to move from solving patterns page by page to a shared system
                that could improve consistency, reuse and scale.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-ink/15 pt-12 md:grid-cols-3">
            {NEEDS.map((n, i) => (
              <Reveal key={n.n} delay={i * 0.09}>
                <p className="text-sm font-medium text-accent">{n.n}</p>
                <h3 className="mt-2.5 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {n.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{n.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · System at a glance ───────────────────────────────────── */}
      <section className="border-t border-border bg-cool-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="System at a glance"
            title="From foundations to real product experiences."
            supporting="Four layers, each one building on the last. The architecture matters more than the vocabulary used to describe it."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {LAYERS.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.09} className="relative">
                <div className="flex h-full flex-col border-t-2 border-ink pt-5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-sm font-medium text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-sans text-xl font-medium tracking-tight text-ink">
                      {l.name}
                    </h3>
                  </div>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{l.detail}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {l.examples.map((e) => (
                      <li
                        key={e}
                        className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-ink"
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < LAYERS.length - 1 && (
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    className="absolute -right-3 top-6 hidden text-accent lg:block"
                    aria-hidden
                  />
                )}
              </Reveal>
            ))}
          </div>
          {/* System scale — depth of the system, kept visually subordinate to
              the architecture above it and never mixed into Impact. */}
          <Reveal delay={0.18} className="mt-14 border-t border-ink/15 pt-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <Eyebrow>System scale</Eyebrow>
              <span className="text-sm text-ink-soft">
                Atomic structure: atoms → molecules → organisms
              </span>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {SCALE.map(([count, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-sans text-4xl font-medium leading-none tracking-tight text-ink md:text-5xl">
                    {count}
                  </dd>
                  <p className="mt-2.5 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                    {label}
                  </p>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-faint">
              Component modules counted from the system source. These describe the depth of the
              system, not its performance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 04 · Foundations ──────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Foundations"
            title="Shared decisions before shared components."
            supporting="286 token declarations in one built file — the decisions every component inherits rather than restates."
          />
          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
            <Reveal className="space-y-5">
              <ScreenFrame
                src={`${A}ds-type-spec.webp`}
                alt="The design system type scale — sizes, weights and line heights"
                elevation="raised"
                label="Type scale"
              />
            </Reveal>
            <Reveal delay={0.12} className="space-y-8">
              <ScreenFrame
                src={`${A}ds-color-spec.webp`}
                alt="Colour foundations — palette and semantic colour roles"
                elevation="raised"
                emphasis="secondary"
                label="Colour and semantic roles"
              />
              <div>
                <Eyebrow>Token groups</Eyebrow>
                <div className="mt-5 space-y-0">
                  {TOKEN_GROUPS.map(([name, count]) => (
                    <div
                      key={name}
                      className="flex items-center gap-4 border-t border-ink/15 py-2.5"
                    >
                      <span className="w-28 shrink-0 text-sm text-ink">{name}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                        <div className="h-full rounded-full bg-ink" style={{ width: `${(count / 80) * 100}%` }} />
                      </div>
                      <span className="w-8 shrink-0 text-right text-sm tabular-nums text-ink-soft">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-ink-faint">
                  Counted from the built token file, not estimated.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 05 · Components → patterns ────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Components & patterns"
            title="Reusable components were only the beginning."
            supporting="A component on its own is an object. The value appears when components combine into a structure a product can reuse whole."
          />

          {/* A real chain, taken from the component source. */}
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-4">
            {CHAIN.map((c, i) => (
              <Reveal key={c.step} delay={i * 0.09} className="relative">
                <div className="h-full rounded-lg border border-border bg-surface p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {c.step}
                  </p>
                  <p className="mt-3 font-sans leading-snug text-ink">{c.items}</p>
                </div>
                {i < CHAIN.length - 1 && (
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-accent md:block"
                    aria-hidden
                  />
                )}
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <ScreenFrame
                src={`${A}ds-buttons.webp`}
                alt="Button component variants and states in the design system"
                elevation="raised"
                label="Component — variants and states"
              />
            </Reveal>
            <Reveal delay={0.12}>
              <ScreenFrame
                src={`${A}ds-pattern.webp`}
                alt="A documented product pattern assembled from system components"
                elevation="raised"
                emphasis="secondary"
                label="Pattern — components assembled into a reusable structure"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 06 · Product adoption ─────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="In product"
            title="The system became valuable when it moved into real products."
            supporting="The clearest evidence is naming: organisms in the source are the modules on the live pages."
          />
          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
            <Reveal direction="left">
              <div className="space-y-0">
                {[
                  ['ReportStoreHero', 'Report Store'],
                  ['FiltersPanel · ListingToolbar', 'Report Store filtering'],
                  ['ReportHeroSection · ScopeOfReport', 'Report detail'],
                  ['SampleReportPreview', 'Sample-report flow'],
                  ['SurveyCard · TabStrip', 'Survey experiences'],
                ].map(([comp, product]) => (
                  <div key={comp} className="border-t border-ink/15 py-4">
                    <p className="font-sans text-sm font-medium text-ink">{comp}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
                      <ArrowRight size={13} strokeWidth={1.8} className="shrink-0 text-accent" aria-hidden />
                      {product}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink-faint">
                Component names read from <code className="text-ink-soft">core-v2/src/organisms</code>.
              </p>
            </Reveal>
            <Reveal direction="right" delay={0.12} className="space-y-6">
              <ScreenFrame
                src="/assets/projects/market-intelligence/v2/rs-discovery.webp"
                alt="The live Report Store — the filter panel and listing built from system components"
                url="kenresearch.com/report-store"
                elevation="floating"
                label="Report Store — FiltersPanel and CardListing in production"
              />
              <ScreenFrame
                src="/assets/projects/ken-survey/v2/survey-selector.webp"
                alt="The live Survey hub — the five-way selector built from system components"
                url="kenresearch.com/survey"
                elevation="raised"
                emphasis="secondary"
                label="Survey hub — TabStrip and card patterns in production"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 07 · Governance ───────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Governance"
            title="A design system needs rules for how it evolves."
            supporting="Documentation sits beside the code rather than in a separate place that drifts — every template carries its own document, and 80 component sidecars record intent."
          />
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch">
            {['Define', 'Document', 'Use', 'Review', 'Evolve'].map((s, i, arr) => (
              <Reveal key={s} delay={i * 0.09} className="flex flex-1 items-center gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-1 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                    {s}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <span className="hidden h-px w-6 shrink-0 bg-border-strong sm:block" aria-hidden />
                )}
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap gap-x-3 gap-y-2.5 border-t border-ink/15 pt-8">
            {[
              'Component reference',
              'Component lifecycle',
              'Anti-patterns',
              'Composition grammar',
              'Charts & tables',
              'Responsive rules',
            ].map((d) => (
              <span
                key={d}
                className="rounded-full border border-border bg-surface px-3.5 py-1 text-sm text-ink"
              >
                {d}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 08 · What we built ────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="What we built"
            title="A reusable foundation for consistent product delivery."
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {BUILT.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.09} className="border-t border-ink/15 pt-6">
                <p className="font-sans text-5xl font-medium leading-none tracking-tight text-ink">
                  {b.count}
                </p>
                <h3 className="mt-4 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {b.label}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{b.detail}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-10">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-faint">
              Counted directly from the system source — the built token file and the component,
              template and documentation directories. These are the size of what was built, not
              performance measures.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 09 · System impact ────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>System impact</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
              From repeated UI decisions to a shared product language.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.09} className="border-t border-ink/15 pt-6">
                <div className="flex flex-wrap items-baseline gap-2 text-sm">
                  <span className="text-ink-faint">{it.from}</span>
                  <ArrowRight size={13} strokeWidth={1.8} className="text-accent" aria-hidden />
                  <span className="font-medium text-ink">{it.to}</span>
                </div>
                <h3 className="mt-4 font-sans text-xl font-medium leading-snug tracking-tight text-ink">
                  {it.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{it.detail}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-12">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-faint">
              Stated qualitatively: no verified adoption, delivery-speed or time-saved data was
              available for this project, and none has been estimated here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 10 · Reflection ──────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
            <Reveal direction="left">
              <Eyebrow>Reflection</Eyebrow>
              <h2 className="mt-4 font-sans text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl">
                The value was not the number of components.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09} className="max-w-2xl space-y-6 text-lg leading-relaxed">
              <p className="text-ink">
                The measure of the system was never how many components it held, but whether the
                foundations and patterns made real product decisions more consistent, reusable and
                easier to scale.
              </p>
              <p className="text-ink-soft">
                It becomes most valuable when components, product patterns, documentation and
                implementation evolve together — a system that documents itself but is never used
                is just a catalogue.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
