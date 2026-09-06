import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PhoneFrame, ScreenFrame } from '../../components/case-study/ScreenFrame'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Reveal } from '../../components/ui/Reveal'

/**
 * Arjun Realty — independent client project.
 *
 * Every screen is a real capture of the live site at arjunrealty.in (desktop
 * 1440, mobile 390). The enquiry modal was opened by clicking its CTA —
 * nothing was typed and nothing was submitted. All property names, sectors,
 * configurations, services and testimonial framing come from the live site.
 *
 * No traffic, enquiry-volume, conversion or sales figures appear anywhere on
 * this page: none were shared for this engagement, and the live site is the
 * delivery evidence. Nothing here is estimated.
 */
const A = '/assets/projects/arjun-realty/v2/'

/** The three jobs the site had to do, stated compactly rather than as cards. */
const NEEDS = [
  { t: 'Discover', d: 'Help visitors identify the premium developments relevant to them.' },
  { t: 'Trust', d: 'Communicate expertise, curation and credibility before any ask.' },
  { t: 'Act', d: 'Make consultation a natural next step, not a sales interruption.' },
]

const REQUIREMENTS = [
  { n: '01', t: 'Premium without clutter',
    d: 'Create an aspirational visual experience without letting styling overpower information.' },
  { n: '02', t: 'Clear property discovery',
    d: 'Make individual developments easy to identify, compare and explore in depth.' },
  { n: '03', t: 'Trust before the ask',
    d: 'Use advisory positioning, project detail and buyer proof to build confidence ahead of conversion.' },
]

const JOURNEY = [
  { t: 'Discover', d: 'Find relevant premium developments.' },
  { t: 'Evaluate', d: 'Understand location, configuration and project context.' },
  { t: 'Build confidence', d: 'See the expertise and proof behind the recommendation.' },
  { t: 'Consult', d: 'Move into a personalised conversation.' },
]

const DELIVERED = [
  { n: '01', t: 'Digital experience strategy',
    d: 'The overall journey from premium property discovery through to consultation, and the page structure that carries it.' },
  { n: '02', t: 'Premium website experience',
    d: 'The visual and interaction language for Arjun Realty’s digital presence — typography, imagery, spacing and section rhythm.' },
  { n: '03', t: 'Property discovery & enquiry',
    d: 'How developments are presented, how a visitor moves deeper, and how interest converts into a qualified consultation request.' },
  { n: '04', t: 'Responsive experience',
    d: 'The same register across desktop and mobile, with discovery and enquiry legible under thumb reach.' },
]

/** The advisory pillars, exactly as they are labelled on the live site. */
const PROMISE = [
  'Premium Developments',
  'Personalized Support',
  'Seamless Experience',
  'Gurgaon-Focused Expertise',
]

const OUTCOMES = [
  { t: 'Positioning', d: 'A more premium, differentiated digital presence, aligned with the value of the properties Arjun Realty represents.' },
  { t: 'Discovery', d: 'Clearer paths for visitors to explore relevant developments before entering a sales conversation.' },
  { t: 'Trust', d: 'Project information, advisory positioning and buyer proof connected into one coherent experience.' },
  { t: 'Conversion path', d: 'Consultation as a continuation of discovery, rather than an isolated form at the end of the site.' },
]

export function ArjunRealty() {
  return (
    <div>
      {/* ── 01 · Hero — light editorial, so the dark product screen carries it ── */}
      <header className="border-b border-border bg-canvas-alt pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-accent"
              >
                Arjun Realty · Client work · Responsive web
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 font-sans text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-5xl"
              >
                Designing a premium property experience from discovery to consultation.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft"
              >
                A complete digital experience for a Gurugram property consultancy — designed to help
                buyers and investors discover premium developments, build confidence in the brand and
                move naturally toward personalised consultation.
              </motion.p>

            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ScreenFrame
                src={`${A}hero.webp`}
                alt="Arjun Realty homepage — dark navy hero, serif headline, and Enquire Now and Schedule Consultation calls to action"
                url="arjunrealty.in"
                elevation="floating"
                priority
              />
            </motion.div>
          </div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-ink/15 pt-7 sm:grid-cols-4 lg:mt-14"
          >
            {[
              ['Role', 'Product / UX Designer'],
              ['Scope', 'UX strategy · UI design · Responsive'],
              ['Industry', 'Luxury real estate'],
              ['Platform', 'Responsive web'],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">{k}</dt>
                <dd className="mt-1.5 text-sm leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </header>

      {/* ── 02 · Client context ────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Client context</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
                Luxury real estate sells more than a floor plan.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09}>
              <p className="max-w-xl text-lg leading-relaxed text-ink">
                For a premium property consultancy, the website had to communicate more than the
                developments on offer. It needed to create aspiration, make high-value opportunities
                easier to explore, establish Arjun Realty as a credible advisor, and open a clear path
                into personalised consultation.
              </p>
              <dl className="mt-9 divide-y divide-border border-t border-border">
                {NEEDS.map((n) => (
                  <div key={n.t} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4 sm:grid-cols-[8rem_1fr]">
                    <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                      {n.t}
                    </dt>
                    <dd className="text-sm leading-relaxed text-ink-soft">{n.d}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · The challenge ─────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>The challenge</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              Balance aspiration with decision-making clarity.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Premium real-estate experiences drift easily into the decorative. The challenge was to
              hold a high-end visual character while still helping visitors understand properties,
              judge relevance and move confidently toward an enquiry.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {REQUIREMENTS.map((r, i) => (
              <Reveal key={r.n} delay={i * 0.09} className="bg-canvas-alt p-7">
                <p className="font-sans text-sm font-medium tabular-nums text-accent">{r.n}</p>
                <h3 className="mt-3 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {r.t}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{r.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Experience strategy ───────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Experience strategy</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              From aspiration to confident enquiry.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              One journey, four moves. Every section of the site was placed to advance a visitor from
              one to the next rather than to fill the page.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-14">
            <ol className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {JOURNEY.map((s, i) => (
                <li key={s.t} className="relative border-t border-ink/15 pt-5">
                  {i < JOURNEY.length - 1 && (
                    <ArrowRight
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden
                      className="absolute -top-2 right-0 hidden translate-x-1/2 bg-surface text-accent lg:block"
                    />
                  )}
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 font-sans text-xl font-medium tracking-tight text-ink">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── 05 · Property discovery ────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-end md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Property discovery</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
                Make the property the starting point.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09}>
              <p className="max-w-xl leading-relaxed text-ink-soft">
                Rather than presenting the homepage as a generic listings catalogue, the experience
                gives a small set of curated developments clear visual priority — each with its
                location, configuration and category on the card, and a single way in.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-12">
            <ScreenFrame
              src={`${A}discovery.webp`}
              alt="Featured Developments on the Arjun Realty homepage — two curated development cards, each with imagery, name, description, location, configuration and an Explore Project action"
              url="arjunrealty.in"
              elevation="raised"
              label="Homepage · Featured developments"
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-14">
            <Reveal direction="left" delay={0.09}>
              <h3 className="font-sans text-xl font-medium leading-snug tracking-tight text-ink">
                And a real evaluation layer behind it.
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                One action per card keeps the homepage calm. The weight sits on the project page it
                opens, where a visitor can actually judge the opportunity: status, location,
                configuration, indicative pricing and a specification panel, with the two next steps —
                register interest, or organise a site visit — held together at the end of that block.
              </p>
            </Reveal>
            <Reveal direction="right" delay={0.18}>
              <ScreenFrame
                src={`${A}project-detail.webp`}
                alt="Westin Residences project page — status, location, configuration, indicative pricing, a six-field specification panel, and Express Your Interest and Organize Site Visit actions"
                url="arjunrealty.in/westin-residences"
                emphasis="secondary"
                label="Project page · Evaluation layer"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 06 · Trust & conversion ────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Trust &amp; conversion</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              Discovery and trust needed to work together.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              A property purchase is a long, high-value decision. Proof had to sit inside the journey,
              close to the point where a visitor decides whether to start a conversation.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-10">
            <Reveal direction="left" delay={0.09}>
              <ScreenFrame
                src={`${A}trust.webp`}
                alt="A testimonial card from the live site — buyer photograph, name, a verified-buyer and city attribution, a five-star rating and the quote"
                elevation="flat"
                label="Trust · Buyer and NRI proof"
              />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                Testimonials are attributed by name, buyer type and city — including NRI buyers
                purchasing remotely. That audience is why the site carries NRI support as a named
                service and an international dialling code on every phone field. The advisory promise
                below sits above the enquiry on the page, so credibility is established before the ask.
              </p>
              <ul className="mt-7 divide-y divide-border border-t border-border">
                {PROMISE.map((t) => (
                  <li key={t} className="py-3 text-sm font-medium tracking-tight text-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal direction="right" delay={0.18} className="md:max-w-[26rem]">
              <ScreenFrame
                src={`${A}modal.webp`}
                alt="Request a Consultation modal — name, mobile number with country selector, email address, message and a consent checkbox above the Express Your Interest action"
                elevation="flat"
                label="Consultation · Available from any page"
              />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                The enquiry itself stays short — name, mobile, email and requirement — with consent
                stated above the action rather than buried after it. A persistent Enquire Now means
                the conversation can start from wherever interest appears.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24} className="mt-10 border-t border-border pt-7">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-lg font-medium tracking-tight text-ink">
              {['Interest', 'Confidence', 'Conversation'].map((s, i, arr) => (
                <span key={s} className="flex items-center gap-3">
                  {s}
                  {i < arr.length - 1 && (
                    <ArrowRight size={15} strokeWidth={1.8} className="text-accent" aria-hidden />
                  )}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 07 · Key design decisions ──────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Key design decisions</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              Designing for a high-consideration decision.
            </h2>
          </Reveal>

          <div className="mt-12 border-t border-border">
            <Reveal className="grid grid-cols-1 gap-8 border-b border-border py-10 md:grid-cols-[7rem_1fr] md:items-start md:gap-10">
              <p className="font-sans text-sm font-medium tabular-nums text-accent">01</p>
              <div>
                <h3 className="font-sans text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
                  Premium without becoming decorative
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                  Large editorial typography, controlled spacing and strong property imagery create
                  the aspiration. Underneath, every development card holds a fixed order — image,
                  tier, name, one line of description, three facts, one action — so the styling never
                  gets in the way of scanning.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="grid grid-cols-1 gap-8 border-b border-border py-10 md:grid-cols-[7rem_1fr] md:items-start md:gap-10">
              <p className="font-sans text-sm font-medium tabular-nums text-accent">02</p>
              <div>
                <h3 className="font-sans text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
                  Property first
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                  Curated developments are the primary exploration layer, placed above the promise and
                  consultation blocks. A visitor can evaluate the opportunity before anything asks them
                  to enter a sales conversation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="grid grid-cols-1 gap-8 py-10 md:grid-cols-[7rem_1fr] md:items-start md:gap-10">
              <p className="font-sans text-sm font-medium tabular-nums text-accent">03</p>
              <div>
                <h3 className="font-sans text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
                  Contextual consultation
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                  Consultation appears where interest is formed — beside a development, at the end of a
                  project page, and always in the header — so the next step matches what the visitor is
                  looking at rather than waiting in a single form at the bottom of the site.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 08 · Responsive experience ─────────────────────────────────── */}
      <section className="border-t border-border bg-cool-alt py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Responsive experience</Eyebrow>
            <h2 className="mt-4 max-w-xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              The same premium register, under thumb reach.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1.55fr_0.75fr] md:items-center md:gap-12">
            <Reveal direction="left" delay={0.09}>
              <ScreenFrame
                src={`${A}consult.webp`}
                alt="The consultation section on desktop — advisory positioning and a list of services on the left, the Request a Consultation form on the right"
                url="arjunrealty.in"
                elevation="raised"
                label="Desktop · 1440"
              />
            </Reveal>
            <Reveal direction="right" delay={0.18} className="mx-auto w-full max-w-[220px] md:max-w-none">
              <PhoneFrame
                src={`${A}consult-mobile.webp`}
                alt="The same consultation form on a 390px screen — one column, full-width fields and a full-width Express Your Interest action"
                label="Mobile · 390"
              />
            </Reveal>
          </div>

          <Reveal delay={0.24} className="mt-10 grid grid-cols-1 gap-x-12 gap-y-5 border-t border-border pt-7 sm:grid-cols-2">
            {[
              ['Hierarchy collapses, it doesn’t compress', 'The two-column split becomes one column in reading order — context first, then the form.'],
              ['The form becomes the screen', 'Fields, country selector, consent and action run full width at full size rather than scaling down.'],
              ['Imagery keeps its weight', 'Property photography stays large enough to carry the aspiration the desktop layout creates.'],
              ['Nothing depends on hover', 'Every card and action is reachable by tap; hover only adds emphasis, never information.'],
            ].map(([t, d]) => (
              <div key={t}>
                <h3 className="font-sans text-sm font-medium tracking-tight text-ink">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 09 · What we delivered ─────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>What we delivered</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              A complete digital foundation for property discovery and consultation.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2">
            {DELIVERED.map((d, i) => (
              <Reveal key={d.n} delay={i * 0.09} className="border-t border-ink/15 pt-6">
                <p className="font-sans text-sm font-medium tabular-nums text-accent">{d.n}</p>
                <h3 className="mt-3 font-sans text-xl font-medium tracking-tight text-ink">{d.t}</h3>
                <p className="mt-2.5 max-w-md leading-relaxed text-ink-soft">{d.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 · Outcome ───────────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Outcome</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
                From a property website to a discovery-to-enquiry journey.
              </h2>
              <p className="mt-8 border-t border-ink/15 pt-7 font-sans text-lg font-medium leading-relaxed tracking-tight text-ink-faint">
                Property browsing
                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  className="mx-2.5 inline-block align-[-2px] text-accent"
                  aria-hidden
                />
                <span className="text-ink">Guided discovery and consultation</span>
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.09}>
              <dl className="divide-y divide-border border-t border-border">
                {OUTCOMES.map((o) => (
                  <div key={o.t} className="py-5">
                    <dt className="font-sans text-base font-medium tracking-tight text-ink">
                      {o.t}
                    </dt>
                    <dd className="mt-1.5 max-w-xl leading-relaxed text-ink-soft">{o.d}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-7 max-w-xl text-sm leading-relaxed text-ink-faint">
                No traffic, enquiry-volume or sales figures are claimed here — none were shared for
                this engagement. The live site is the delivery evidence.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 11 · Reflection ────────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
            <Reveal direction="left">
              <Eyebrow>Reflection</Eyebrow>
              <h2 className="mt-4 font-sans text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl">
                Premium design works best when it improves confidence.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09} className="max-w-2xl space-y-6 text-lg leading-relaxed">
              <p className="text-ink">
                High-consideration experiences need aspiration and clarity at the same time. Strong
                imagery creates the interest; hierarchy, proof and an obvious next step are what make
                the experience useful.
              </p>
              <p className="text-ink-soft">
                Designing it end to end also made it possible to treat brand, discovery and conversion
                as one connected journey rather than as separate website sections handed off to each
                other.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
