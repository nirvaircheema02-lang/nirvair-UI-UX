import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PhoneFrame, ScreenFrame } from '../../components/case-study/ScreenFrame'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'

/**
 * Conversion & Lead Journeys case study.
 *
 * Business figures are user-confirmed approximations and are always shown with
 * "~". Two claims are deliberately NOT made:
 *  1. No visit-to-lead conversion rate. Traffic grew faster than lead volume,
 *     so those totals do not evidence a higher conversion percentage.
 *  2. No sole attribution. Traffic growth is ecosystem context, not a CRO
 *     outcome, and lead growth is not credited to any single form.
 *
 * Screens are real: live captures of the Ken Research lead journeys (forms
 * opened by clicking their CTA — nothing was typed or submitted), plus OTP
 * verification screens from this workspace's auth-redesign project.
 */
const A = '/assets/projects/conversion/v2/'

const CONCERNS = [
  { n: '01', t: 'Discovery', d: 'Is the right next step visible at the moment intent appears?' },
  { n: '02', t: 'Clarity', d: 'Does the visitor understand what happens after they submit?' },
  { n: '03', t: 'Completion', d: 'Is the form asking for the right thing at the right time?' },
  { n: '04', t: 'Qualification', d: 'Is the incoming lead relevant, contactable and useful to follow up?' },
]

/** Friction found in the journeys, kept to the few that mattered most. */
const FRICTION = [
  'The work-email expectation was not obvious until validation failed.',
  'Everything was asked at once, with no sense of how much was left.',
  'Verification felt like an interruption rather than part of the flow.',
  'Success states passed too quickly to confirm what would happen next.',
  'Patterns differed between forms, so each one had to be relearned.',
]

/** Real CTAs, read from the live pages. */
const CTA_CONTEXT = [
  { page: 'Report detail', cta: 'Download sample report · Connect with Consultant' },
  { page: 'Report Store', cta: 'Connect with Consultant' },
  { page: 'Survey', cta: 'Book Strategy Call · Get Pricing & Timeline' },
  { page: 'Homepage', cta: 'Book discovery call' },
]

/** Qualification signals, all present in the live forms. */
const SIGNALS = [
  ['Work Email', 'email@company.com'],
  ['Organisation', 'Company name'],
  ['Your Designation', 'Role'],
  ['Mobile Number', 'Country code + OTP'],
  ['Requirement', 'Business need'],
]

const SYSTEM = [
  ['Fields', 'One input behaviour across every journey'],
  ['Labels', 'Required state and hierarchy read the same way'],
  ['Verification', 'Inline OTP, in the same step'],
  ['Progressive disclosure', 'Optional detail collapsed until wanted'],
  ['Progress', 'Step state visible throughout'],
  ['Consent', 'Stated before the action, not after'],
]

const DELIVERED = [
  { n: '01', t: 'High-intent journey redesigns', d: 'Sample report, discovery call and consultation enquiry.' },
  { n: '02', t: 'Form & qualification patterns', d: 'Field sequencing, work-email expectation, verification and progressive disclosure.' },
  { n: '03', t: 'Mobile conversion UX', d: 'One-column flows with the action and progress state always legible.' },
  { n: '04', t: 'Contextual CTA system', d: 'The next step matches the page a visitor is reading, rather than one universal button.' },
]

export function Conversion() {
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

          <div className="mt-8 grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-ink"
              >
                CRO · Product UX · Lead journeys
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 max-w-2xl font-sans text-4xl font-medium leading-[1.1] tracking-tight text-dark-ink md:text-5xl"
              >
                Removing friction between intent and qualified leads.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 max-w-xl leading-relaxed text-dark-ink-soft"
              >
                A conversion-focused redesign across the highest-intent journeys — funnel
                diagnosis, form and verification patterns, responsive UX and experimentation, aimed
                at lead quality as much as lead volume.
              </motion.p>

              <motion.dl
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-7 sm:grid-cols-3"
              >
                {[
                  ['Role', 'Senior Product / UX Designer'],
                  ['Scope', 'CRO · UX strategy · Forms · Experimentation'],
                  ['Platform', 'Web · Mobile web'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-medium uppercase tracking-[0.14em] text-dark-ink-soft">
                      {k}
                    </dt>
                    <dd className="mt-1.5 leading-snug text-dark-ink">{v}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ScreenFrame
                src={`${A}form-call.webp`}
                alt="The live Book a Discovery Call form — step 1 of 3, contact details with work email and mobile"
                url="kenresearch.com"
                tone="dark"
                elevation="floating"
                priority
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── 02 · Business context ─────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Business context</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
                As digital reach grew, every conversion decision mattered more.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.12} className="space-y-5 text-lg leading-relaxed">
              <p className="text-ink-soft">
                Monthly visits grew from roughly 35–45K to around 200K, and monthly lead volume
                from roughly 700–1,000 to more than 2,100–2,200.
              </p>
              <p className="text-ink">
                At that scale, small points of friction across high-intent journeys stop being
                cosmetic. They compound.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-14 grid grid-cols-1 items-center gap-8 border-y border-ink/15 py-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Before</p>
              <dl className="mt-5 space-y-5">
                {[['~35–45K', 'Monthly visits'], ['~700–1,000', 'Monthly leads']].map(([v, l]) => (
                  <div key={l}>
                    <dd className="font-sans text-3xl font-medium leading-none tracking-tight text-ink-soft md:text-4xl">
                      {v}
                    </dd>
                    <dt className="mt-2 text-sm text-ink-faint">{l}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <ArrowRight size={22} strokeWidth={1.5} className="hidden shrink-0 text-accent md:block" aria-hidden />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Current</p>
              <dl className="mt-5 space-y-5">
                {[['~200K', 'Monthly visits'], ['~2.1–2.2K+', 'Monthly leads']].map(([v, l]) => (
                  <div key={l}>
                    <dd className="font-sans text-3xl font-medium leading-none tracking-tight text-ink md:text-4xl">
                      {v}
                    </dd>
                    <dt className="mt-2 text-sm text-ink-faint">{l}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={0.18} className="mt-6">
            <p className="max-w-3xl text-sm leading-relaxed text-ink-faint">
              Approximate, user-confirmed business scale — roughly <span className="text-ink-soft">~5×</span> traffic
              and <span className="text-ink-soft">~2.5×</span> lead volume. Traffic growth reflects the wider growth of
              the digital ecosystem, not the conversion work alone. Because traffic grew faster than
              lead volume, these totals are not evidence of a higher visit-to-lead rate, and none is
              claimed here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 03 · The challenge ────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="The challenge"
            title="More traffic did not automatically mean better conversion quality."
            supporting="Visitors arrived through reports, consulting, surveys and research content with very different levels of intent. The task was not to capture more submissions — it was to reduce friction while improving the relevance of the leads reaching business teams."
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-ink/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {CONCERNS.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.09}>
                <p className="text-sm font-medium text-accent">{c.n}</p>
                <h3 className="mt-2.5 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {c.t}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Friction diagnosis ───────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Friction diagnosis"
            title="The biggest problems were small moments in the journey."
          />
          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <Reveal>
              <ScreenFrame
                src={`${A}form-sample.webp`}
                alt="The live sample-report form — full name, work email, organisation, designation, mobile number, requirement and a collapsed optional-details section"
                url="kenresearch.com · sample report"
                elevation="floating"
                label="The sample-report journey as it runs today"
              />
            </Reveal>
            <Reveal delay={0.12} className="space-y-0">
              {FRICTION.map((f, i) => (
                <div key={f} className="flex gap-4 border-t border-ink/15 py-5 first:border-t-0 first:pt-0">
                  <span className="shrink-0 text-sm font-medium text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="leading-relaxed text-ink">{f}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 05 · Prioritisation + the three journeys ──────────────────── */}
      <section className="border-t border-border bg-cool-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Prioritisation"
            title="Fix the highest-intent journeys first."
            supporting="Foundational friction before experimentation — there is no point testing variants of a step that is unclear in both."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { n: '01', t: 'Sample report', d: 'The highest-volume evaluation step — a visitor judging whether the research fits.' },
              { n: '02', t: 'Discovery call', d: 'A three-step enquiry, opening on contact details and consent.' },
              { n: '03', t: 'Talk to a consultant', d: 'Contextual enquiry from report, consulting and survey pages.' },
            ].map((j, i) => (
              <Reveal key={j.n} delay={i * 0.09} className="border-t-2 border-ink pt-5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-sm font-medium text-accent">{j.n}</span>
                  <h3 className="font-sans text-xl font-medium tracking-tight text-ink">{j.t}</h3>
                </div>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{j.d}</p>
              </Reveal>
            ))}
          </div>

          {/* Contextual CTA — the next step matches the page. */}
          <Reveal delay={0.18} className="mt-14 border-t border-ink/15 pt-10">
            <Eyebrow>Contextual next step</Eyebrow>
            <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {CTA_CONTEXT.map((c) => (
                <div key={c.page} className="flex flex-wrap items-baseline gap-x-3 border-t border-ink/15 py-3">
                  <span className="w-28 shrink-0 text-sm text-ink-faint">{c.page}</span>
                  <ArrowRight size={13} strokeWidth={1.8} className="shrink-0 text-accent" aria-hidden />
                  <span className="min-w-0 text-sm text-ink">{c.cta}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
              Rather than one universal button, the action matches what the visitor is reading —
              read from the live pages.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 06 · Qualification & verification ─────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Lead quality"
            title="More leads mattered. Better leads mattered more."
            supporting="As volume grew, relevance became as important as submission count. Verification and business-context fields help reduce low-intent and non-business enquiries — including a portion of student submissions — and improve contact validity, routing the form toward its intended B2B audience."
          />

          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Reveal direction="left">
              <Eyebrow>Signals collected</Eyebrow>
              <dl className="mt-6 space-y-0">
                {SIGNALS.map(([k, v]) => (
                  <div key={k} className="flex flex-wrap items-baseline gap-x-3 border-t border-ink/15 py-3.5">
                    <dt className="w-40 shrink-0 font-sans text-sm font-medium text-ink">{k}</dt>
                    <dd className="min-w-0 text-sm text-ink-soft">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 max-w-md leading-relaxed text-ink">
                The aim was never fewer fields. It was the right fields, in the right order, at the
                moment they make sense.
              </p>
            </Reveal>
            <Reveal direction="right" delay={0.12}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <ScreenFrame
                src={`${A}otp-collect.webp`}
                alt="Inline OTP verification — the code is entered in the same step, without leaving the flow"
                elevation="raised"
                label="Inline OTP — verification inside the same step"
              />
              <ScreenFrame
                src={`${A}otp-error.webp`}
                alt="OTP error state — invalid code handled inline with the field"
                elevation="raised"
                emphasis="secondary"
                label="Error state — handled in place, not on a new screen"
              />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink-faint">
                Verification screens from this project’s auth work, where the inline OTP pattern was
                specified and QA’d — the same pattern the lead forms use. A documented outcome of
                that pass: input, OTP slots and the action button share one 48px control height,
                verified in the built UI.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 07 · Shared conversion system ─────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Systemisation"
            title="The optimisation became a reusable conversion language."
            supporting="Once a pattern was resolved in one journey, it stopped being re-decided in the next."
          />
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEM.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.09} className="border-t border-ink/15 py-4">
                <p className="font-sans text-sm font-medium text-ink">{k}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 · Mobile ───────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Mobile UX"
            title="High intent should not become high effort on mobile."
            supporting="Real captures at 390 × 844. One column, the action reachable, and the same field order as desktop so nothing has to be relearned."
          />
          <div className="mx-auto mt-12 grid max-w-lg grid-cols-2 items-center gap-6 sm:gap-10">
            <Reveal>
              <PhoneFrame
                src={`${A}m-cta.webp`}
                alt="A report page on mobile, with the sample-report action in view"
                label="Intent"
              />
            </Reveal>
            <Reveal delay={0.12} className="translate-y-8">
              <PhoneFrame
                src={`${A}m-form.webp`}
                alt="The sample-report form on a 390px-wide mobile viewport"
                label="Form"
                emphasis="secondary"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 09 · Experimentation ──────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Experimentation"
            title="Fix known friction first. Test what remains uncertain."
          />
          <Reveal delay={0.12} className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div className="border-t border-ink/15 pt-6">
              <Eyebrow>Open question</Eyebrow>
              <p className="mt-4 font-sans text-xl font-medium leading-snug tracking-tight text-ink">
                Single-page form, or a stepped flow?
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                A shorter form asks less at once. A stepped flow shows progress and lets
                qualification arrive after commitment. Both live journeys resolved differently — the
                sample report stayed single-page with optional detail collapsed, the discovery call
                became a three-step flow with a progress bar.
              </p>
            </div>
            <div className="border-t border-ink/15 pt-6">
              <Eyebrow>Where it stands</Eyebrow>
              <p className="mt-4 leading-relaxed text-ink">
                The two shipped journeys are the live comparison, and each fits its context: quick
                evaluation versus a considered enquiry.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                No experiment result is reported here — no verified test outcome was available for
                this project, and inventing a winner would make the rest of the page less
                trustworthy.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 10 · What we delivered ────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="What we delivered"
            title="A conversion system across the highest-intent journeys."
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERED.map((d, i) => (
              <Reveal key={d.n} delay={i * 0.09} className="border-t border-ink/15 pt-6">
                <p className="text-sm font-medium text-accent">{d.n}</p>
                <h3 className="mt-2.5 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {d.t}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{d.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 · Business impact ──────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Business impact</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-4xl">
              More reach. More leads. Better qualification.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal direction="left">
              <div className="space-y-8">
                {[
                  ['~5×', 'Monthly traffic scale', '~35–45K → ~200K'],
                  ['~2.5×', 'Monthly lead volume', '~700–1,000 → ~2.1–2.2K+'],
                ].map(([big, label, range]) => (
                  <div key={label} className="border-t border-ink/15 pt-6 first:border-t-0 first:pt-0">
                    <p className="font-sans text-6xl font-medium leading-none tracking-tight text-ink md:text-7xl">
                      {big}
                    </p>
                    <p className="mt-4 font-sans text-lg font-medium tracking-tight text-ink">
                      {label}
                    </p>
                    <p className="mt-1 text-sm text-ink-faint">{range}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-ink-faint">
                Approximate before → current business scale. Ecosystem growth and conversion work
                both contributed; neither figure is attributed to the redesign alone.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.12}>
              <div className="space-y-0">
                {[
                  { t: 'Qualification', f: 'Low-context submissions', to: 'Verified business enquiries',
                    d: 'Work-email expectation, inline OTP and business-context fields reduce low-intent and non-business enquiries and improve contact validity.' },
                  { t: 'Consistency', f: 'Different forms', to: 'Shared conversion patterns',
                    d: 'One field, label, verification and progress language across every high-intent journey.' },
                  { t: 'Mobile', f: 'Desktop-led journeys', to: 'Clearer responsive conversion',
                    d: 'The same order and the same action, reachable on a 390px screen.' },
                ].map((it) => (
                  <div key={it.t} className="border-t border-ink/15 py-7 first:border-t-0 first:pt-0">
                    <div className="flex flex-wrap items-baseline gap-2 text-sm">
                      <span className="text-ink-faint">{it.f}</span>
                      <ArrowRight size={13} strokeWidth={1.8} className="text-accent" aria-hidden />
                      <span className="font-medium text-ink">{it.to}</span>
                    </div>
                    <h3 className="mt-3 font-sans text-xl font-medium tracking-tight text-ink">
                      {it.t}
                    </h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-ink-soft">{it.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="mt-12 border-t border-ink/15 pt-8">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-lg font-medium tracking-tight text-ink">
              {['More traffic', 'Clearer journeys', 'Better qualification', 'More actionable leads'].map(
                (s, i, arr) => (
                  <span key={s} className="flex items-center gap-3">
                    {s}
                    {i < arr.length - 1 && (
                      <ArrowRight size={15} strokeWidth={1.8} className="text-accent" aria-hidden />
                    )}
                  </span>
                ),
              )}
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
                Conversion was not a single form problem.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09} className="max-w-2xl space-y-6 text-lg leading-relaxed">
              <p className="text-ink">
                The strongest improvements came from treating CTA context, field sequencing,
                verification, feedback and mobile behaviour as one connected journey rather than
                optimising screens in isolation.
              </p>
              <p className="text-ink-soft">
                As traffic and lead volume scaled, the definition of success shifted too — from
                collecting more submissions toward collecting enquiries that were relevant, verified
                and actually actionable.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
