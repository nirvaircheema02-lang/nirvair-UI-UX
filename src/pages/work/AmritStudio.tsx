import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PhoneFrame, ScreenFrame } from '../../components/case-study/ScreenFrame'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Reveal } from '../../components/ui/Reveal'

/**
 * Amrit Studio — independent client project.
 *
 * Every screen is a real capture of the live site at amritstudio.in (desktop 1440,
 * mobile 390); the four full photographs are the studio's own images, the same ones
 * the live category cards use. No form was filled in and nothing was submitted.
 *
 * Claim discipline:
 *  - Figures like 500+, 120+ albums and "Since 1990" are the STUDIO's published
 *    claims, shown as content the design presents. They are never framed as
 *    results of this work, and they are attributed on the page.
 *  - The only outcome stated is client-reported and explicitly labelled as
 *    untracked. No percentage is given, because none exists.
 *  - The responsive section claims only what was measured at 390px. The live
 *    "Get In Touch" panel does not survive that breakpoint, so mobile access to
 *    the phone and branch addresses is deliberately NOT claimed anywhere here.
 */
const A = '/assets/projects/amrit-studio/v2/'

/** A verbatim string from the live site, under the screen that shows it. */
function Evidence({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <p className={`mt-3 text-xs leading-relaxed ${dark ? 'text-dark-ink-soft' : 'text-ink-faint'}`}>
      <span
        className={`font-semibold uppercase tracking-[0.14em] ${dark ? 'text-dark-ink' : 'text-accent'}`}
      >
        On the site
      </span>
      <span className={`mx-2 ${dark ? 'text-white/25' : 'text-border-strong'}`} aria-hidden>
        ·
      </span>
      {children}
    </p>
  )
}

const PRIORITIES = [
  { n: '01', t: 'Discover', d: 'Help a visitor planning one specific occasion recognise their own moment fast.' },
  { n: '02', t: 'Experience', d: 'Let the studio’s real photography, not copy, carry the argument about quality.' },
  { n: '03', t: 'Trust', d: 'Put the studio’s history, its client voices and its physical presence inside the journey.' },
]

/**
 * The journey, anchored to the site's own labels so each station is checkable.
 * "Since 1990" is the studio's own line on /about; the rest are real buttons.
 */
const JOURNEY = [
  { t: 'Discover', label: 'Explore Gallery', d: 'Choose the kind of moment you are planning.' },
  { t: 'Explore', label: 'View Album', d: 'Open a named client’s album and judge the work.' },
  { t: 'Trust', label: 'Since 1990', d: 'Meet the founder, the studio and its client voices.' },
  { t: 'Book', label: 'Send Message', d: 'One form, asking for the occasion in the words already used to browse.' },
]

const DELIVERED = [
  { n: '01', t: 'Experience strategy', d: 'The journey from photography discovery through to enquiry, and the page order that carries it.' },
  { n: '02', t: 'Service architecture', d: 'Several kinds of shoot resolved into four recognisable entry points, consistent from homepage to enquiry form.' },
  { n: '03', t: 'Visual portfolio system', d: 'An image-led way to present each category, with named client albums behind it.' },
  { n: '04', t: 'Booking & contact journey', d: 'Discovery and trust connected to one enquiry form that asks for the occasion in the same terms.' },
  { n: '05', t: 'Responsive experience', d: 'The same register on a phone, with the photography kept full width and the enquiry form usable at 390.' },
]

const IMPACT = [
  { t: 'Service clarity', d: 'Four recognisable entry points replace one undifferentiated portfolio, so a visitor can find their own occasion.' },
  { t: 'Visual confidence', d: 'Real albums, named by client, let someone judge the work before speaking to anyone.' },
  { t: 'Trust in the journey', d: 'A founder since 1990, client voices and two real branches sit inside the path, not on a page nobody reaches.' },
  { t: 'A shorter path to contact', d: 'Enquiry follows discovery instead of waiting at the end of the site, so the visitor reaches the form already knowing what to ask for.' },
]

export function AmritStudio() {
  const reduceMotion = useReducedMotion()
  const rise = (y: number) => (reduceMotion ? { opacity: 0 } : { opacity: 0, y })

  return (
    <div>
      {/* ── 01 · Hero — the one dark photographic stage ─────────────────── */}
      <header className="relative overflow-hidden bg-dark pb-14 pt-28 text-dark-ink md:pb-16 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 text-sm text-dark-ink-soft transition-colors hover:text-dark-ink"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <div>
              <motion.p
                initial={rise(12)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.05 }}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-ink"
              >
                Amrit Studio · Client work · Responsive web
              </motion.p>
              <motion.h1
                initial={rise(20)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.12 }}
                className="mt-4 font-sans text-4xl font-medium leading-[1.08] tracking-tight text-dark-ink md:text-5xl"
              >
                Designing a visual-first photography experience from inspiration to booking.
              </motion.h1>
              <motion.p
                initial={rise(16)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.2 }}
                className="mt-5 max-w-md text-lg leading-relaxed text-dark-ink-soft"
              >
                The design of a complete responsive website for a two-branch studio in Uttar Pradesh
                and Uttarakhand — so visitors can find the kind of shoot they are planning, judge the
                work by looking at it, and reach the studio while that interest is still warm.
              </motion.p>
            </div>

            <motion.div
              initial={rise(24)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ScreenFrame
                src={`${A}hero.webp`}
                alt="Amrit Studio homepage — full-bleed photography behind the studio positioning line and a Capture Your Story call to action"
                url="amritstudio.in"
                tone="dark"
                elevation="floating"
                priority
              />
            </motion.div>
          </div>

          <motion.dl
            initial={rise(16)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.3 }}
            className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-white/15 pt-6 sm:grid-cols-4 lg:mt-12"
          >
            {[
              ['Role', 'Product / UX Designer'],
              ['Scope', 'UX strategy · UI design · Responsive'],
              ['Industry', 'Photography & videography'],
              ['Platform', 'Responsive web'],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-dark-ink-soft">{k}</dt>
                <dd className="mt-1.5 text-sm leading-snug text-dark-ink">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </header>

      {/* ── 02 · Client context & the challenge ─────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Client context</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
                One studio. Many different moments to capture.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09}>
              <p className="max-w-xl text-lg leading-relaxed text-ink">
                Amrit Studio has been photographing weddings since 1990, and now also covers
                pre-wedding, maternity and baby shoots alongside cinematic videography and albums.
                A visitor arrives planning one specific occasion, not browsing a studio in general.
              </p>
              <figure className="mt-6 border-l border-accent/30 pl-5">
                <blockquote className="font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  “In the last 30 years, we have captured more than 1000 weddings and countless
                  precious moments across Uttar Pradesh and beyond.”
                </blockquote>
                <figcaption className="mt-2.5 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                  Amrit Studio · About · Achievements
                </figcaption>
              </figure>
              <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">
                The difficulty was never the work. Photography sites drift easily into beautiful
                galleries with no guidance, and this one had to give that breadth a structure while
                still leaving the images room to do what only they can do.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {PRIORITIES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.09} className="bg-canvas-alt p-7">
                <p className="font-sans text-sm font-medium tabular-nums text-accent">{p.n}</p>
                <h3 className="mt-3 font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  {p.t}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · Experience strategy — the spine, drawn once ─────────────── */}
      <section className="border-t border-border bg-surface py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Experience strategy</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              From visual inspiration to booking confidence.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Four moves, each anchored to something the visitor actually clicks or reads on the
              finished site.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-12">
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
                  <h3 className="font-sans text-xl font-medium tracking-tight text-ink">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.d}</p>
                  <p className="mt-3 font-sans text-sm font-medium tracking-tight text-accent">
                    “{s.label}”
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-xs leading-relaxed text-ink-faint">
              Quoted strings are the live site’s own button and section labels.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 04 · Service discovery ──────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-end md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Service discovery</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
                Different moments needed clear entry points.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09}>
              <p className="max-w-xl leading-relaxed text-ink-soft">
                Instead of one undifferentiated portfolio, the homepage opens on four categories.
                Each card is a photograph from that category, its name, the volume the studio
                publishes for it, and a single way in — so the choice is made by looking, not reading.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-12">
            <ScreenFrame
              className="mx-auto max-w-5xl"
              src={`${A}discovery.webp`}
              alt="Stories We've Captured on the homepage — four category cards for Weddings, Pre-Wedding, Maternity and Baby Shoot, each a photograph with a name and a volume figure"
              url="amritstudio.in"
              elevation="raised"
            />
            <Evidence>
              each card carries a “MOST POPULAR” badge, the category name, and its own count.
            </Evidence>
          </Reveal>

          <Reveal delay={0.21} className="mt-8 border-t border-border pt-6">
            <p className="max-w-2xl text-xs leading-relaxed text-ink-faint">
              Category volumes shown on the cards — 120+ albums, 85+ sessions, 60+ shoots,
              45+ sessions — are figures the studio publishes on its own site.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 05 · The work — the page's second dark moment, and its loudest ─ */}
      <section className="border-t border-dark-border bg-dark py-16 text-dark-ink md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow tone="dark">Visual experience</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-dark-ink md:text-[2.5rem]">
              The portfolio had to carry the proof.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-ink-soft">
              Photography is the only evidence that matters to someone choosing a studio, so the
              interface steps back and lets it run at full size.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric band of the studio's own photographs, bleeding past the
            column on both edges so the images are the composition, not decoration.
            Rows are height-constrained: at natural height this band alone ran
            longer than a viewport. */}
        <div className="mt-12 overflow-hidden">
          <div className="mx-auto max-w-[92rem] px-3 sm:px-6">
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              <Reveal className="col-span-7 h-40 sm:h-52 md:h-56 lg:h-80 xl:h-[26rem]">
                <img
                  src={`${A}photo-wedding.webp`}
                  alt="Wedding photography by Amrit Studio — a bride in red and gold, close-up"
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full rounded-sm object-cover object-[50%_35%]"
                />
              </Reveal>
              <Reveal delay={0.09} className="col-span-5 h-40 sm:h-52 md:h-56 lg:h-80 xl:h-[26rem]">
                <img
                  src={`${A}photo-prewed.webp`}
                  alt="Pre-wedding photography by Amrit Studio — a couple at dusk"
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full rounded-sm object-cover"
                />
              </Reveal>
              <Reveal delay={0.15} className="col-span-5 h-40 sm:h-52 md:h-56 lg:h-80 xl:h-[26rem]">
                <img
                  src={`${A}photo-newborn.webp`}
                  alt="Baby photography by Amrit Studio — a newborn asleep"
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full rounded-sm object-cover"
                />
              </Reveal>
              <Reveal delay={0.21} className="col-span-7 h-40 sm:h-52 md:h-56 lg:h-80 xl:h-[26rem]">
                <img
                  src={`${A}photo-maternity.webp`}
                  alt="Maternity photography by Amrit Studio — parents holding their newborn in backlight"
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full rounded-sm object-cover"
                />
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-14">
            <Reveal direction="left">
              <h3 className="font-sans text-xl font-medium leading-snug tracking-tight text-dark-ink">
                And a gallery that names its clients.
              </h3>
              <p className="mt-3 leading-relaxed text-dark-ink-soft">
                Behind the wedding category sits a real gallery rather than an anonymous grid: six
                albums, each titled with the couple it belongs to and showing how many photographs it
                holds, so a visitor can see whose wedding they are looking at before opening it.
              </p>
            </Reveal>
            <Reveal direction="right" delay={0.12}>
              <ScreenFrame
                src={`${A}albums.webp`}
                alt="The Wedding Albums gallery — six albums, each titled with the client couple's name, a photo count and a View Album link"
                url="amritstudio.in/Services/weddings"
                tone="dark"
                elevation="raised"
              />
              <Evidence tone="dark">
                “GURPREET SINGH &amp; SIMRAN KAUR · 6 Photos · View Album →”
              </Evidence>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 06 · Building trust ─────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Trust</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              Beautiful work creates interest. Trust turns it into intent.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              A shoot is booked months ahead and cannot be re-run, so the studio’s credibility had to
              sit inside the journey rather than on a page nobody reaches.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-start md:gap-12">
            <Reveal direction="left" delay={0.09}>
              <ScreenFrame
                src={`${A}founder.webp`}
                alt="Meet the Founder on the About page — a photograph of the founder, his name, the line Founder & Lead Photographer since 1990, and a signature"
                url="amritstudio.in/about"
                elevation="raised"
              />
              <Evidence>“FOUNDER &amp; LEAD PHOTOGRAPHER · SINCE 1990”, signed.</Evidence>
            </Reveal>
            <Reveal direction="right" delay={0.18}>
              <dl className="divide-y divide-border border-t border-border">
                {[
                  ['A named person, not a brand', 'The About page puts Sardar Paramjeet Singh — Founder & Lead Photographer, credited with over 30 years behind the lens — his photograph and his signature behind the work.'],
                  ['Client voices in their own language', 'Testimonials run in the Hinglish clients actually write in, each tagged with the kind of shoot it came from, so the praise is attached to a service rather than floating free.'],
                  ['A studio you could walk into', 'Two branch addresses, an email and opening hours are published rather than hidden behind a form — real presence for a purchase people make locally.'],
                ].map(([t, d]) => (
                  <div key={t} className="py-5">
                    <dt className="font-sans text-base font-medium tracking-tight text-ink">{t}</dt>
                    <dd className="mt-1.5 leading-relaxed text-ink-soft">{d}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.24} className="mt-10 grid grid-cols-1 gap-8 border-t border-border pt-8 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-12">
            <ScreenFrame
              src={`${A}voices.webp`}
              alt="The testimonial section — client cards each with a name, the kind of shoot booked, a rating and a quote"
              elevation="flat"
              emphasis="secondary"
            />
            <p className="max-w-md text-sm leading-relaxed text-ink-faint">
              Every figure this page repeats — 120+ albums, more than 1000 weddings, since 1990 —
              is a claim Amrit Studio publishes about itself, shown here as content the design
              presents. None of it is a measurement of this project.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 07 · From interest to booking ───────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-14">
            <Reveal direction="left">
              <Eyebrow>Booking journey</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
                Make the next step easy when confidence is highest.
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                Once someone has seen the right category and enough real work, the enquiry should
                read as a continuation rather than a fresh start. So the form asks for the occasion
                using the same four moments the homepage sorts by, and carries a country selector,
                because families booking a wedding at home are not always in the country.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-faint">
                The continuity here is vocabulary, not state — the selection is not carried over from
                the card, and one label still differs between the two surfaces: the homepage card
                reads <span className="text-ink-soft">Weddings</span>, the form’s option reads{' '}
                <span className="text-ink-soft">Wedding</span>.
              </p>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-lg font-medium tracking-tight text-ink">
                {['Discover', 'Explore', 'Trust', 'Book'].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-3">
                    {s}
                    {i < arr.length - 1 && (
                      <ArrowRight size={15} strokeWidth={1.8} className="text-accent" aria-hidden />
                    )}
                  </span>
                ))}
              </p>
            </Reveal>
            <Reveal direction="right" delay={0.12}>
              <ScreenFrame
                src={`${A}contact.webp`}
                alt="The Send Us a Message enquiry form beside Get In Touch — name, email, mobile with a country selector, subject, an Event Type selector and a message, above a Send Message action"
                url="amritstudio.in/contact"
                elevation="raised"
              />
              <Evidence>
                the Event Type selector offers Wedding, Pre-Wedding, Maternity and Baby Shoot.
              </Evidence>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 08 · Responsive experience ──────────────────────────────────── */}
      <section className="border-t border-border bg-cool-alt py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Responsive experience</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              The same visual storytelling, built for smaller screens.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Photography is browsed in short, image-led sessions on a phone. The mobile layout keeps
              the pictures at full width and the enquiry within reach, so the journey from looking to
              asking survives the smaller screen.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 md:mx-auto md:max-w-3xl">
            <Reveal direction="left" delay={0.09} className="mx-auto w-full max-w-[255px]">
              <PhoneFrame
                src={`${A}m-discovery.webp`}
                alt="The category cards at 390px — stacked one per row, each photograph running the full width of the screen"
                label="Discover · 390"
              />
            </Reveal>
            <Reveal direction="right" delay={0.18} className="mx-auto w-full max-w-[255px]">
              <PhoneFrame
                src={`${A}m-form.webp`}
                alt="The enquiry form at 390px — labelled fields in two-up pairs, the country selector, and the Send Message action"
                label="Book · 390"
              />
            </Reveal>
          </div>

          <Reveal delay={0.24} className="mt-12 grid grid-cols-1 gap-x-12 gap-y-5 border-t border-border pt-7 sm:grid-cols-2">
            {[
              ['Photography keeps its scale', 'Category cards go one per row rather than shrinking into a grid, so each image still reads as a photograph.'],
              ['The choice stays a picture', 'Selecting a service on a phone is still done by looking at the work rather than reading a list of names.'],
              ['The enquiry stays usable', 'Every control measures 46–52px tall at 390px — comfortably tappable. The fields stay two-up at about 135px each rather than reflowing one per row: it works, but it is the part I would take further.'],
            ].map(([t, d]) => (
              <div key={t}>
                <h3 className="font-sans text-sm font-medium tracking-tight text-ink">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 09 · What we delivered, and what changed ────────────────────── */}
      <section className="border-t border-border bg-surface py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>What we delivered</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
              A complete digital experience from service discovery to booking.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERED.map((d, i) => (
              <Reveal key={d.n} delay={i * 0.09} className="border-t border-ink/15 pt-5">
                <p className="font-sans text-sm font-medium tabular-nums text-accent">{d.n}</p>
                <h3 className="mt-2.5 font-sans text-lg font-medium tracking-tight text-ink">{d.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 · Outcome ────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas-alt py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
            <Reveal direction="left">
              <Eyebrow>Outcome</Eyebrow>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
                From a photography website to a discovery-to-booking experience.
              </h2>
              <p className="mt-8 border-t border-ink/15 pt-7 font-sans text-lg font-medium leading-relaxed tracking-tight text-ink-faint">
                See the work
                <ArrowRight size={16} strokeWidth={1.8} className="mx-2.5 inline-block align-[-2px] text-accent" aria-hidden />
                Build confidence
                <ArrowRight size={16} strokeWidth={1.8} className="mx-2.5 inline-block align-[-2px] text-accent" aria-hidden />
                <span className="text-ink">Book</span>
              </p>

              <div className="mt-8 border-t border-ink/15 pt-7">
                <p className="font-sans text-lg font-medium leading-snug tracking-tight text-ink">
                  After launch, the studio reported more form enquiries and more booking calls.
                </p>
                <p className="mt-3 max-w-md text-xs leading-relaxed text-ink-faint">
                  Client-reported outcome. Not tracked in analytics, so no figure or percentage is
                  given here — and no single change is credited with it.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.09}>
              <dl className="divide-y divide-border border-t border-border">
                {IMPACT.map((o) => (
                  <div key={o.t} className="py-5">
                    <dt className="font-sans text-base font-medium tracking-tight text-ink">{o.t}</dt>
                    <dd className="mt-1.5 max-w-xl leading-relaxed text-ink-soft">{o.d}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 11 · Reflection ─────────────────────────────────────────────── */}
      <section className="border-t border-border bg-canvas py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
            <Reveal direction="left">
              <Eyebrow>Reflection</Eyebrow>
              <h2 className="mt-4 font-sans text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl">
                For a photography brand, the interface should frame the work.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.09} className="max-w-2xl space-y-6 text-lg leading-relaxed">
              <p className="text-ink">
                Visual portfolios work best when the imagery creates the emotion and the interface
                quietly helps someone find the right service, build confidence and take the next step.
                Every decision here was a decision about how much interface to remove.
              </p>
              <p className="text-ink-soft">
                The change that mattered most was not adding more calls to action. It was making the
                enquiry feel like the natural end of looking and trusting — so that by the time the
                form appears, the visitor already knows what they want to ask for.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
