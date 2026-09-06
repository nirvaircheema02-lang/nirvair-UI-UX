import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PhoneFrame, ScreenFrame } from '../../components/case-study/ScreenFrame'
import { ScrollShowcase } from '../../components/case-study/ScrollShowcase'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'

/**
 * AI-Assisted Market Intelligence / Report Store case study.
 *
 * Screens are real: live captures of kenresearch.com report and discovery
 * pages, plus the project's own design-exploration and sample-report assets
 * from the repo. Nothing here is a fabricated dashboard, chart or metric.
 *
 * Two deliberate accuracy calls:
 *  1. The version names below are the repo's own artefact names (V0 Lite,
 *     V0.1, V0.2, V1 exist as project folders and asset files). No document
 *     maps a version to a live URL, so they are presented as design-
 *     exploration stages, never as production release history.
 *  2. No business performance figures appear. The repo holds no verified
 *     Report Store metrics, so impact is stated as a transformation.
 */
const A = '/assets/projects/market-intelligence/v2/'

/** The old document-led path and the digital path that replaced it. */
const MANUAL = ['Research', 'Graphics', 'Document production', 'Sample PDF', 'Upload']
const DIGITAL = ['Discover', 'Evaluate', 'Navigate', 'Download', 'Enquire']

const REQUIREMENTS = [
  { n: '01', title: 'Make research discoverable',
    detail: 'Move a visitor from a large catalogue to relevant market intelligence quickly.' },
  { n: '02', title: 'Make reports easier to evaluate',
    detail: 'Surface enough structure and context before asking anyone to download or make contact.' },
  { n: '03', title: 'Design for variable content depth',
    detail: 'Let lighter and richer reports share one system without forcing identical page density.' },
]

/**
 * Design-exploration stages, named after the repo's own artefacts:
 * `V0_lite_report-legacy/`, `V0.2 -for design system/`, `v1-project/`.
 */
const STAGES = [
  { id: 'stage-v0lite', name: 'V0 Lite', level: 'Essential',
    note: 'Identity, top-line figures and a sample-preview card.' },
  { id: 'stage-v01', name: 'V0.1', level: 'Standard',
    note: 'Breadcrumb, structured metadata and dual sample CTAs.' },
  { id: 'stage-v02', name: 'V0.2', level: 'Rich',
    note: 'Chapter navigation and a sticky contents structure.' },
  { id: 'stage-v1', name: 'V1', level: 'Expanded',
    note: 'Full report panel, chaptered reading and deeper exploration.' },
]

const DECISIONS = [
  { t: 'Prioritise the first screen',
    d: 'Region, publication date, market size and both next steps resolve before any scrolling.' },
  { t: 'Structure dense information',
    d: 'A report-details bar and numbered chapters let a reader scan the shape of the research before reading it.' },
  { t: 'Support deeper exploration',
    d: 'Richer content appears progressively down the page rather than crowding the opening viewport.' },
]

const DELIVERED = [
  { n: '01', title: 'Report discovery experience',
    detail: 'A searchable, filterable Report Store for navigating the research catalogue.' },
  { n: '02', title: 'Flexible report-detail system',
    detail: 'Information-depth patterns that support different levels of structured research.' },
  { n: '03', title: 'Interactive digital report',
    detail: 'A web format built for scanning, navigation and pre-download evaluation.' },
  { n: '04', title: 'Downloadable research output',
    detail: 'A report format for deeper reading, internal review and sharing.' },
]

const IMPACT = [
  { from: 'Manual', to: 'More scalable', title: 'Scale',
    detail: 'Reusable digital report structures reduce reliance on one manually assembled presentation model.' },
  { from: 'Catalogue', to: 'Browsable', title: 'Discovery',
    detail: 'Search, filtering and category entry replace a flat list as the way into the research.' },
  { from: 'Static file', to: 'Interactive preview', title: 'Evaluation',
    detail: 'More report context can be judged on the web before a download or an enquiry.' },
  { from: 'One format', to: 'Variable depth', title: 'Flexibility',
    detail: 'The system accommodates reports carrying very different amounts of structured research.' },
]

export function MarketIntelligence() {
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

          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-ink"
              >
                Market intelligence · Product UX · System design
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 font-sans text-4xl font-medium leading-[1.08] tracking-tight text-dark-ink md:text-5xl"
              >
                Turning static research reports into a scalable digital intelligence experience.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 max-w-md leading-relaxed text-dark-ink-soft"
              >
                A redesigned report ecosystem spanning discovery, structured report pages, multiple
                information-depth formats and downloadable research.
              </motion.p>
            </div>

            {/* The report hero band rather than a full viewport capture: the
                complete report page is the deep-dive screen in section 06, so
                the opening shows a different crop of it, not the same one. */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <ScreenFrame
                src={`${A}rpt-hero-band.webp`}
                alt="A live Ken Research report page — full-bleed hero, market summary, sample-report and consultant actions"
                url="kenresearch.com/industry-reports"
                tone="dark"
                elevation="floating"
                priority
              />
            </motion.div>
          </div>

          {/* Metadata inline, as on every other case study, rather than a
              separate band below the fold. */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-12 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-white/15 pt-7 sm:grid-cols-3 lg:mt-14"
          >
            {[
              ['Role', 'Senior Product / UX Designer'],
              ['Scope', 'Product UX · IA · Responsive · Design systems'],
              ['Platform', 'Web · Downloadable reports'],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-dark-ink-soft">{k}</dt>
                <dd className="mt-1.5 text-sm leading-snug text-dark-ink">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </header>


      {/* ── 02 · Before ───────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Before</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
                Research was valuable. The delivery model was still document-led.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.12} className="space-y-5 text-lg leading-relaxed">
              <p className="text-ink-soft">
                Reports were assembled through a largely manual production workflow — research
                content moving through graphics and document production before being published as a
                downloadable file.
              </p>
              <p className="text-ink">
                The opportunity was not to redesign the PDF. It was to rethink how research is
                discovered, evaluated and consumed digitally before anyone downloads anything.
              </p>
            </Reveal>
          </div>

          {/* Editorial transformation, not a four-card process diagram. */}
          <Reveal delay={0.15} className="mt-16 grid grid-cols-1 items-center gap-8 border-t border-ink/15 pt-12 md:grid-cols-[1fr_auto_1fr] md:gap-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                Document-led
              </p>
              <ul className="mt-4 space-y-2">
                {MANUAL.map((m) => (
                  <li key={m} className="font-sans text-lg leading-snug text-ink-soft">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <ArrowRight size={22} strokeWidth={1.5} className="hidden shrink-0 text-accent md:block" aria-hidden />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                Digital product experience
              </p>
              <ul className="mt-4 space-y-2">
                {DIGITAL.map((d) => (
                  <li key={d} className="font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 03 · The challenge ────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="The challenge"
            title={
              <>
                One catalogue.
                <br className="hidden sm:block" /> Very different levels of report depth.
              </>
            }
            supporting="The experience had to work across a large research catalogue while supporting reports that vary significantly in structure and available data. A single rigid template would feel empty for lighter reports and constrained for richer ones."
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-ink/15 pt-12 md:grid-cols-3">
            {REQUIREMENTS.map((r, i) => (
              <Reveal key={r.n} delay={i * 0.09}>
                <p className="text-sm font-medium text-accent">{r.n}</p>
                <h3 className="mt-2.5 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {r.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{r.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Report discovery ─────────────────────────────────────── */}
      <section className="border-t border-border bg-cool-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Report discovery"
            title="Turning a report catalogue into a browsable product experience."
            supporting="Report type and industry facets carry live counts, so the scale of the catalogue is visible while it is being narrowed."
          />
          <Reveal delay={0.12} className="mt-12">
            <ScreenFrame
              src={`${A}rs-discovery.webp`}
              alt="The Report Store — a filter panel with report type and industry facets carrying counts, beside featured research"
              url="kenresearch.com/report-store"
              elevation="floating"
              label="Filter panel — report type, industries and counts, beside featured research"
            />
          </Reveal>
          <Reveal delay={0.18} className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
            <ScreenFrame
              src={`${A}rs-results.webp`}
              alt="Report Store results — cards carrying industry, region and publication date"
              elevation="raised"
              emphasis="secondary"
              label="Results — industry, region and publication date on every card"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg leading-relaxed text-ink">
                Each result answers the three questions a research buyer screens on first: what
                industry, which region, how recent.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                That turns a long catalogue into something scannable without opening a single
                report.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 05 · Information depth + design stages ────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Information depth"
            title="Not every report needed the same amount of interface."
            supporting="Some reports carry only what is needed to evaluate them. Others hold deep chapter structure, segmentation and long-form research. Rather than forcing one fixed template, the work explored progressively richer report experiences."
          />

          {/* Measured, not asserted: live report pages differ by ~3x in length. */}
          <Reveal delay={0.09} className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-y border-ink/15 py-6">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              Live report page length
            </span>
            {[
              ['GCC Dental Equipment', '8,400px'],
              ['Qatar Stability Chambers', '14,500px'],
              ['APAC Agricultural Robots', '21,400px'],
              ['Malaysia Packaging', '23,300px'],
            ].map(([n, v]) => (
              <span key={n} className="text-sm text-ink-soft">
                {n} <span className="font-medium text-ink">{v}</span>
              </span>
            ))}
          </Reveal>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-faint">
            Stage names below are this project’s own design-exploration artefacts. No document maps
            a stage to a production release, so they are shown as explorations of depth — not as a
            release history.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((s, i) => (
              <Reveal key={s.id} delay={0.05 * i} className="min-w-0">
                <ScreenFrame
                  src={`${A}${s.id}.webp`}
                  alt={`${s.name} report-detail design exploration — ${s.note}`}
                  elevation="raised"
                  emphasis="secondary"
                  hover
                />
                <div className="mt-3.5 flex items-baseline gap-2.5">
                  <span className="font-sans text-sm font-medium text-ink">{s.name}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {s.level}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.note}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-10">
            <p className="max-w-2xl leading-relaxed text-ink-soft">
              Information depth increases as structured report content becomes richer — the same
              model exposing more or fewer layers, rather than one version being better than
              another.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 06 · V1 deep dive ─────────────────────────────────────────── */}
      <section className="border-t border-border bg-blue-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="V1 deep dive"
            title="Making dense research easier to navigate and evaluate."
          />
          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            <Reveal>
              <ScreenFrame
                src={`${A}rpt-hero.webp`}
                alt="A live report page — region and date badges, market summary with size and CAGR, download-sample and consultant actions, and a report-details metadata bar"
                url="kenresearch.com/industry-reports"
                elevation="floating"
              />
            </Reveal>
            <Reveal delay={0.12} className="space-y-7 lg:pt-2">
              {DECISIONS.map((d) => (
                <div key={d.t} className="border-t border-ink/15 pt-5 first:border-t-0 first:pt-0">
                  <h3 className="font-sans text-lg font-medium tracking-tight text-ink">{d.t}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{d.d}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* The single long-scroll showcase on this page. */}
          <Reveal delay={0.15} className="mt-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              A full report page, scrollable in place
            </p>
            <ScrollShowcase
              src={`${A}rpt-longpage.webp`}
              alt="A complete live report page from hero through chapters to enquiry"
              url="kenresearch.com/industry-reports"
              height={460}
            />
          </Reveal>
        </div>
      </section>

      {/* ── 07 · Web vs downloaded report ─────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Two consumption modes"
            title="Same research. Different consumption context."
            supporting="The web experience supports quick evaluation and navigation. The downloadable report supports deeper reading, internal sharing and offline review."
          />
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <ScreenFrame
                src={`${A}rpt-structure.webp`}
                alt="The web report experience — chapter navigation and scannable sections"
                url="kenresearch.com"
                elevation="floating"
              />
              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                {['Scan', 'Navigate', 'Evaluate', 'Explore'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface px-3.5 py-1 text-sm text-ink"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              {/* The real sample-report pages from the project, as a paper stack. */}
              {/* Three across is ~110px a page on a phone. Below sm the stack
                  becomes a scroll strip so each page stays readable. */}
              <div className="-mx-6 flex items-end gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
                {['pdf-1', 'pdf-2', 'pdf-3'].map((p, i) => (
                  <div
                    key={p}
                    className={`w-[58%] shrink-0 sm:w-auto sm:min-w-0 sm:flex-1 sm:shrink ${i === 1 ? 'sm:-translate-y-4' : ''}`}
                    style={{ transform: `rotate(${i === 0 ? -1.2 : i === 2 ? 1.2 : 0}deg)` }}
                  >
                    <img
                      src={`${A}${p}.webp`}
                      alt={`Sample report page ${i + 1} from the downloadable research output`}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full rounded-sm border border-border-strong bg-surface shadow-[0_24px_50px_-28px_rgba(17,17,17,0.45)]"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                {['Read deeply', 'Share', 'Review offline', 'Preserve format'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface px-3.5 py-1 text-sm text-ink"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="mt-12 max-w-2xl text-lg leading-relaxed text-ink">
            <p>One information model. Different consumption behaviour.</p>
          </Reveal>
        </div>
      </section>

      {/* ── 08 · Responsive ───────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Responsive experience"
            title="Dense market intelligence, adapted for smaller screens."
            supporting="Desktop stays the primary reading context. On mobile the report keeps its identity, metadata and next step above the fold, and the catalogue stays filterable."
          />
          <div className="mx-auto mt-12 grid max-w-xl grid-cols-2 items-center gap-6 sm:gap-10">
            <Reveal>
              <PhoneFrame
                src={`${A}rpt-mobile.webp`}
                alt="A live report page on a 390px-wide mobile viewport"
                label="Report detail"
              />
            </Reveal>
            <Reveal delay={0.12} className="translate-y-8">
              <PhoneFrame
                src={`${A}rs-mobile.webp`}
                alt="The Report Store on a 390px-wide mobile viewport"
                label="Report discovery"
                emphasis="secondary"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 09 · The system underneath ────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="System thinking"
            title="A reusable structure beneath different report experiences."
            supporting="One information model. Each stage exposes more or fewer of its layers, depending on what the research actually contains."
          />
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <Reveal direction="left">
              <ol className="space-y-0">
                {[
                  'Report discovery',
                  'Report identity',
                  'Summary & market context',
                  'Structured sections',
                  'Chapter navigation',
                  'Download · sample · enquiry',
                ].map((layer, i, arr) => (
                  <li key={layer} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {i < arr.length - 1 && <span className="h-10 w-px bg-border-strong" aria-hidden />}
                    </div>
                    <span className="pb-4 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                      {layer}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal direction="right" delay={0.12}>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                Layers exposed by stage
              </p>
              <div className="mt-5 space-y-0">
                {[
                  { s: 'V0 Lite', bars: 2 },
                  { s: 'V0.1', bars: 3 },
                  { s: 'V0.2', bars: 5 },
                  { s: 'V1', bars: 6 },
                ].map((row) => (
                  <div key={row.s} className="flex items-center gap-5 border-t border-ink/15 py-4">
                    <span className="w-20 shrink-0 font-sans text-sm font-medium text-ink">
                      {row.s}
                    </span>
                    <div className="flex flex-1 gap-1.5" aria-hidden>
                      {Array.from({ length: 6 }, (_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < row.bars ? 'bg-ink' : 'bg-ink/12'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="w-16 shrink-0 text-right text-sm text-ink-faint">
                      {row.bars} / 6
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink-faint">
                Indicative of the layers each exploration surfaces, based on the design artefacts in
                this project — not a production configuration.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 10 · What we delivered ────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="What we delivered"
            title="A connected report experience, not a single redesigned page."
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERED.map((d, i) => (
              <Reveal key={d.n} delay={i * 0.09} className="border-t border-ink/15 pt-6">
                <p className="text-sm font-medium text-accent">{d.n}</p>
                <h3 className="mt-2.5 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {d.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{d.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 · Product impact ───────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Product impact</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
              From manually assembled reports to a more scalable digital intelligence system.
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
              Stated qualitatively: no verified post-launch performance data was available for this
              project, and none has been estimated here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 12 · Reflection ──────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
            <Reveal direction="left">
              <Eyebrow>Reflection</Eyebrow>
              <h2 className="mt-4 font-sans text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl">
                The interface had to adapt to the research, not the other way around.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09} className="max-w-2xl space-y-6 text-lg leading-relaxed">
              <p className="text-ink">
                A scalable report system should not force every piece of research into the same
                visual density. The stronger move was to establish a shared information model, then
                let the interface expand or simplify with the depth of the content.
              </p>
              <p className="text-ink-soft">
                It also shifted what the website is for — from distributing report files to helping
                someone discover, understand and evaluate research before taking the next step.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
