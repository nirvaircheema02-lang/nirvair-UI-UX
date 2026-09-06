import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BarChart3, Compass, Send, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PhoneFrame, ScreenFrame } from '../../components/case-study/ScreenFrame'
import { ScrollShowcase } from '../../components/case-study/ScrollShowcase'
import { Snapshot } from '../../components/case-study/Snapshot'
import { ICON_STROKE } from '../../components/ui/icons'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'

/**
 * Ken Survey case study.
 *
 * Every screenshot is a real capture of the live kenresearch.com survey
 * ecosystem at 1440x900 and 390x844, re-encoded for the web. No interface is
 * fabricated — the mockups change how a real screen is presented, never what
 * it shows.
 *
 * No business performance figures appear here. The repo holds no verified
 * Survey metrics, so impact is stated qualitatively rather than invented. The
 * only survey numbers in the workspace live in a design-system demo file and
 * are dummy content.
 */
const A = '/assets/projects/ken-survey/v2/'

/** One eyebrow treatment for the page, so the label reads as a section cue. */
/** The five research needs, numbered as the live selector numbers them. */
const VERTICALS = [
  { n: '01', name: 'Employee Engagement', img: 'v-employee', slug: 'employee-engagement-survey',
    line: 'What drives your people.' },
  { n: '02', name: 'Customer Satisfaction', img: 'v-csat', slug: 'customer-satisfaction-survey',
    line: 'What customers really think.' },
  { n: '03', name: "Dealer's Voice", img: 'v-dealers', slug: 'dealers-voice-survey',
    line: 'What channel partners say.' },
  { n: '04', name: 'Customer Demand & Pain Point', img: 'v-cndp', slug: 'cndp-survey',
    line: 'What the market is asking for.' },
  { n: '05', name: 'Brand Perception', img: 'v-brand', slug: 'brand-perception-survey',
    line: 'How the brand is seen.' },
]

/** The live "Our Approach" module — Ken's service model, not a design process. */
const PHASES = [
  { n: '01', name: 'Plan & Align', icon: Compass },
  { n: '02', name: 'Deploy & Collect', icon: Send },
  { n: '03', name: 'Analyze & Compare', icon: BarChart3 },
  { n: '04', name: 'Visualize & Act', icon: Sparkles },
]

const OBJECTIVES = [
  { n: '01', title: 'Make the offering understandable',
    detail: 'Help a visitor identify which survey answers the question they actually have.' },
  { n: '02', title: 'Create a reusable experience system',
    detail: 'Shared structures and patterns, without every vertical feeling identical.' },
  { n: '03', title: 'Keep long-form research scannable',
    detail: 'Balance explanation, methodology, evidence and conversion across 8,000px pages.' },
]

/** Concrete design output — counts of what was built, not performance. */
const DELIVERED = [
  { count: '5', label: 'Specialised survey verticals',
    detail: 'Brand Perception · Customer Satisfaction · Dealer’s Voice · Employee Engagement · CNDP' },
  { count: '1', label: 'Survey discovery experience',
    detail: 'A central way to understand, filter and explore the survey library.' },
  { count: '1', label: 'Shared responsive system',
    detail: 'Reusable patterns, hierarchy and responsive behaviour across the ecosystem.' },
]

const IMPACT = [
  { n: '01', title: 'Discoverability',
    detail: 'Dedicated survey experiences give the offering distinct digital entry points, one per business need.' },
  { n: '02', title: 'Service clarity',
    detail: 'The difference between employee, customer, dealer, demand and brand research is legible without a single generic survey proposition.' },
  { n: '03', title: 'Acquisition path',
    detail: 'Every vertical carries the same enquiry actions — strategy call, pricing and timeline, consultant — so interest has somewhere to go at any scroll depth.' },
  { n: '04', title: 'Scale',
    detail: 'A reusable structure means an additional survey experience extends the system rather than restarting it.' },
]

export function KenSurvey() {
  return (
    <div>
      {/* ── 01 · Hero ─────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-dark pb-16 pt-28 text-dark-ink md:pb-20 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 text-sm text-dark-ink-soft transition-colors hover:text-dark-ink"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-dark-ink"
          >
            Survey experience · Product UX · Responsive web
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 max-w-3xl font-sans text-4xl font-medium leading-[1.1] tracking-tight text-dark-ink md:text-5xl"
          >
            Designing one survey ecosystem for five different research needs.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-xl leading-relaxed text-dark-ink-soft"
          >
            A structured digital experience that helps businesses discover and understand survey
            solutions across employees, customers, dealers, market demand and brand perception.
          </motion.p>

          {/* The hero band of the live homepage rather than the full viewport
              capture: the composition now clears a 900px viewport, and the
              product UI stays large. No supporting screens — the verticals are
              shown properly, and larger, two sections down. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-4xl"
          >
            <ScreenFrame
              src={`${A}survey-home-band.webp`}
              alt="The live Ken Research Survey homepage — “Survey Consulting that shapes critical decisions”"
              url="kenresearch.com/survey"
              tone="dark"
              elevation="floating"
              priority
            />
          </motion.div>
        </div>
      </header>

      <Snapshot
        role="Senior Product / UX Designer"
        scope="UX · UI · Responsive design · System thinking"
        platform="Web · Mobile web"
      />

      {/* ── 02 · Context ──────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Context</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
                The survey capability needed a clearer digital entry point.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.12} className="space-y-5 text-lg leading-relaxed">
              <p className="text-ink-soft">
                Ken Research already supported businesses with research and decision-making
                services. Survey solutions covered several distinct needs.
              </p>
              <p className="text-ink">
                What the digital experience needed was a clearer way to explain the offering, help
                visitors identify the right survey type, and move from interest to enquiry.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · The challenge ────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="The challenge"
            title={
              <>
                Five different research needs.
                <br className="hidden sm:block" /> One coherent experience.
              </>
            }
            supporting="Employee engagement, customer satisfaction, dealer feedback, customer needs and brand perception each answer a different business question. Those differences had to stay clear while the whole still read as one ecosystem."
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-ink/15 pt-12 md:grid-cols-3">
            {OBJECTIVES.map((o, i) => (
              <Reveal key={o.n} delay={i * 0.09}>
                <p className="text-sm font-medium text-accent">{o.n}</p>
                <h3 className="mt-2.5 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {o.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{o.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · The ecosystem — the five verticals, nothing else ──────── */}
      <section className="border-t border-border bg-cool-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="The ecosystem"
            title={
              <>
                One system.
                <br className="hidden sm:block" /> Five research needs.
              </>
            }
            supporting="Five distinct survey experiences, built on one shared structure."
          />

          {/* Three across then two: at five columns each page renders ~205px
              wide — 14% of its real width, where nothing is readable. */}
          <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((v, i) => (
              <Reveal key={v.slug} delay={0.04 * i} className="min-w-0">
                <ScreenFrame
                  src={`${A}${v.img}.webp`}
                  alt={`${v.name} survey page on the live Ken Research site`}
                  elevation="raised"
                  emphasis="secondary"
                  hover
                />
                <div className="mt-3.5 flex items-baseline gap-2.5">
                  <span className="text-sm font-medium text-accent">{v.n}</span>
                  <span className="font-sans text-sm font-medium leading-snug text-ink">
                    {v.name}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{v.line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 · Key design decision ──────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Key design decision"
            title={
              <>
                Shared structure.
                <br className="hidden sm:block" /> Different stories.
              </>
            }
            supporting="A scalable system could not mean copying the same page five times. Shared patterns create the consistency; hierarchy and storytelling still reflect each vertical’s research objective."
          />

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <ScreenFrame
                src={`${A}survey-selector.webp`}
                alt="The live vertical selector on the Survey hub, showing Dealer’s Voice active with tabs 01–05 across the bottom"
                url="kenresearch.com/survey"
                elevation="floating"
                label="Shared pattern — the five-way selector on the hub"
              />
            </Reveal>
            <Reveal delay={0.12}>
              <ScreenFrame
                src={`${A}explore-other.webp`}
                alt="The “Explore Other Surveys” module at the foot of a vertical page, with a tab bar switching between the other survey types"
                elevation="floating"
                emphasis="secondary"
                label="Same pattern, reused as cross-navigation on every vertical"
              />
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 border-t border-ink/15 pt-12 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
            <Reveal direction="left">
              <Eyebrow>Shared → vertical</Eyebrow>
            </Reveal>
            <Reveal direction="right" delay={0.09} className="space-y-5 text-lg leading-relaxed">
              <p className="text-ink">
                One switch, learned once. It appears on the hub as the 01–05 selector and again at
                the foot of every vertical as “Explore Other Surveys”.
              </p>
              <p className="text-ink-soft">
                Underneath it, each vertical runs the same spine — positioning, why it matters,
                method, evidence, FAQs, related surveys — while the argument inside every slot is
                written for its own audience.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 06 · Discovery ────────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Discovery"
            title="Making the survey offering easier to explore."
            supporting="The hub introduces the category and the five research needs. The library takes a visitor deeper — the same five names become the filter that turns a vague need into a category."
          />
          <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            <Reveal>
              <ScreenFrame
                src={`${A}survey-library.webp`}
                alt="The survey library page — a dark hero over a filter panel with survey-category facets and a grid of survey cards showing duration and question count"
                url="kenresearch.com/survey-all"
                elevation="floating"
              />
            </Reveal>
            <Reveal delay={0.12} className="space-y-6">
              <div>
                <Eyebrow>Facets in the live filter</Eyebrow>
                <ul className="mt-4 space-y-2.5">
                  {['Brand Perception', 'C-SAT', "Dealer's Voice", 'Employee Engagement', 'CNDP'].map(
                    (c) => (
                      <li key={c} className="flex items-baseline gap-3 text-ink">
                        <span
                          className="h-1 w-1 shrink-0 translate-y-[-3px] rounded-full bg-accent"
                          aria-hidden
                        />
                        {c}
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <p className="border-t border-ink/15 pt-6 leading-relaxed text-ink-soft">
                Each card carries the two things a buyer compares before committing — how long it
                takes and how many questions it asks.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 07 · Vertical deep dive ───────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Vertical deep dive"
            title="Brand Perception: one system, adapted to one question."
          />
          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            <Reveal>
              <ScreenFrame
                src={`${A}bp-home.webp`}
                alt="Brand Perception survey page hero — “What your customers think isn’t a mystery, it’s a signal”"
                url="kenresearch.com/brand-perception-survey"
                elevation="floating"
              />
            </Reveal>
            <Reveal delay={0.12} className="space-y-7 lg:pt-2">
              {[
                { t: 'Positioning', d: 'The page opens on the business question, not the product name — “what your customers think isn’t a mystery, it’s a signal”.' },
                { t: 'Content hierarchy', d: 'Research depth breaks into named sections — why it matters, pain points, method, evidence — so a long page can be scanned progressively.' },
                { t: 'Conversion path', d: 'Pricing and timeline actions stay available through the scroll without interrupting the research narrative.' },
              ].map((p) => (
                <div key={p.t} className="border-t border-ink/15 pt-5 first:border-t-0 first:pt-0">
                  <h3 className="font-sans text-lg font-medium tracking-tight text-ink">{p.t}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{p.d}</p>
                </div>
              ))}
              <ScreenFrame
                src={`${A}bp-method.webp`}
                alt="The “How We Do It” module on the Brand Perception page, describing a seven-step approach"
                elevation="raised"
                emphasis="secondary"
                label="Method module — the same slot, vertical-specific content"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 08 · The survey approach — compact strip ───────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <Eyebrow>The survey approach</Eyebrow>
            <span className="text-sm text-ink-faint">
              Ken Research’s four-phase service model — product content, not a design process.
            </span>
          </Reveal>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch">
            {PHASES.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={p.name} delay={i * 0.09} className="flex flex-1 items-center gap-4">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Icon size={17} strokeWidth={ICON_STROKE} className="shrink-0 text-icon" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-accent">{p.n}</p>
                      <p className="mt-0.5 font-sans text-sm font-medium leading-snug text-ink">
                        {p.name}
                      </p>
                    </div>
                  </div>
                  {i < PHASES.length - 1 && (
                    <span className="hidden h-px w-6 shrink-0 bg-border-strong sm:block" aria-hidden />
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 09 · Responsive ───────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Responsive experience"
            title={
              <>
                Designed as a system,
                <br className="hidden sm:block" /> not a desktop template.
              </>
            }
            supporting="Real captures at 390 × 844. The shared structure had to stay clear on a screen a fifth of the width."
          />

          {/* One primary, two quieter companions at different heights with a
              controlled overlap — sized so the group clears one viewport. */}
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 items-center gap-4 sm:gap-6 lg:grid-cols-[0.78fr_1fr_0.78fr] lg:gap-2">
            <Reveal delay={0.09} className="lg:translate-y-8">
              <PhoneFrame
                src={`${A}m-employee.webp`}
                alt="Employee Engagement survey page on a 390px-wide mobile viewport"
                label="Employee Engagement"
                emphasis="secondary"
              />
            </Reveal>
            <Reveal className="col-span-2 mx-auto w-2/3 sm:w-1/2 lg:z-10 lg:col-span-1 lg:mx-0 lg:w-full lg:-translate-y-3">
              <PhoneFrame
                src={`${A}m-brand.webp`}
                alt="Brand Perception survey page on a 390px-wide mobile viewport"
                label="Brand Perception"
              />
            </Reveal>
            <Reveal delay={0.18} className="lg:translate-y-12">
              <PhoneFrame
                src={`${A}m-dealers.webp`}
                alt="Dealer’s Voice survey page on a 390px-wide mobile viewport"
                label="Dealer’s Voice"
                emphasis="secondary"
              />
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed lg:mt-14">
            <p className="text-ink">
              The five-way switch changes most: a horizontal tab row becomes a scrollable strip, so
              a visitor can still move between research needs without a menu.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 10 · Long-scroll showcase — the only one on the page ───────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Depth"
            title="A vertical page, end to end."
            supporting="Every vertical runs past 8,000 pixels. The full Brand Perception page, scrollable in place."
          />
          <Reveal delay={0.12} className="mt-12">
            <ScrollShowcase
              src={`${A}bp-longpage.webp`}
              alt="The complete Brand Perception survey page from hero to cross-navigation"
              url="kenresearch.com/brand-perception-survey"
              height={560}
            />
          </Reveal>
        </div>
      </section>

      {/* ── 11 · What we delivered ────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="What we delivered"
            title="A dedicated, reusable survey experience ecosystem."
          />
          {/* Counts of delivered output, labelled as such — deliberately not
              framed as performance. */}
          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
            {DELIVERED.map((d, i) => (
              <Reveal key={d.label} delay={i * 0.09} className="border-t border-ink/15 pt-6">
                <p className="font-sans text-6xl font-medium leading-none tracking-tight text-ink">
                  {d.count}
                </p>
                <h3 className="mt-4 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {d.label}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{d.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12 · Business / product impact ────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Business / product impact</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
              From a service offering to a clearer digital acquisition experience.
            </h2>
          </Reveal>

          {/* No verified performance data exists for this project, so the
              change is stated as a transformation rather than a number. */}
          <Reveal delay={0.12} className="mt-12 grid grid-cols-1 items-center gap-6 border-y border-ink/15 py-10 md:grid-cols-[1fr_auto_1fr] md:gap-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                The need
              </p>
              <p className="mt-3 font-sans text-xl font-medium leading-snug tracking-tight text-ink-soft">
                A survey offering that was hard to tell apart and harder to navigate.
              </p>
            </div>
            <ArrowRight
              size={22}
              strokeWidth={1.5}
              className="hidden shrink-0 text-accent md:block"
              aria-hidden
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                After
              </p>
              <p className="mt-3 font-sans text-xl font-medium leading-snug tracking-tight text-ink">
                Dedicated discovery paths across five distinct research needs.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((it, i) => (
              <Reveal key={it.n} delay={i * 0.09}>
                <p className="text-sm font-medium text-accent">{it.n}</p>
                <h3 className="mt-2.5 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {it.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{it.detail}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-12">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-faint">
              Stated qualitatively: no verified post-launch performance data was available for this
              project, and none has been estimated here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 13 · Reflection ──────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
            <Reveal direction="left">
              <Eyebrow>Reflection</Eyebrow>
              <h2 className="mt-4 font-sans text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl">
                Consistency did not mean making every page identical.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09} className="max-w-2xl space-y-6 text-lg leading-relaxed">
              <p className="text-ink">
                The strongest system was not the one that made every vertical look the same. It was
                the one with enough shared structure for consistency, and enough room for each
                research question to tell its own story.
              </p>
              <p className="text-ink-soft">
                Naming carried more weight than layout — satisfaction, engagement and perception sit
                close enough that visual design alone could not separate them. Discovery, content
                structure and conversion had to be designed as one connected experience.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
