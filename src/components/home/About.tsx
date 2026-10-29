import { Eyebrow } from '../ui/Eyebrow'
import { ArrowUpRight } from 'lucide-react'
import { about, capabilities, profile } from '../../lib/site'
import { ICON_STROKE } from '../ui/icons'
import { AboutPortrait } from '../ui/AboutPortrait'
import { Reveal } from '../ui/Reveal'

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border bg-canvas-alt py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
          <Reveal direction="left">
            <AboutPortrait />
          </Reveal>

          <div>
            <Reveal direction="right">
              <Eyebrow>
                {about.eyebrow}
              </Eyebrow>
              <h2 className="mt-4 max-w-xl font-sans text-3xl font-medium leading-[1.15] tracking-tight text-ink md:text-4xl">
                {about.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.09} className="mt-6 max-w-xl space-y-4">
              {about.bio.map((para) => (
                <p key={para} className="text-lg leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
              {about.stats.map((s) => (
                <div key={s.value}>
                  <p className="font-sans text-2xl font-medium tracking-tight text-ink">{s.value}</p>
                  <p className="mt-1 max-w-[22ch] text-sm text-ink-faint">{s.label}</p>
                </div>
              ))}
            </Reveal>

            {/* career evolution — compact, not a resume */}
            <Reveal delay={0.21} className="mt-12">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                Career evolution
              </p>
              <div className="mt-5">
                {about.timeline.map((t) => (
                  <div
                    key={t.period}
                    className="grid grid-cols-1 gap-1 border-t border-border py-4 sm:grid-cols-[140px_1fr] sm:gap-6"
                  >
                    <p className="text-sm font-medium text-ink">{t.period}</p>
                    <p className="text-ink-soft">{t.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.27} className="mt-12">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                Capabilities
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-2.5">
                {capabilities.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-ink-soft"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* recognition stays deliberately secondary */}
            <Reveal delay={0.33} className="mt-10 border-t border-border pt-6">
              <p className="text-sm text-ink-faint">
                <span className="font-medium text-ink-soft">Recognition</span>
                <span aria-hidden className="mx-2 text-border-strong">
                  ·
                </span>
                {about.recognition.join(' · ')}
              </p>
            </Reveal>

            <Reveal delay={0.39} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
              >
                Resume
                <ArrowUpRight
                  size={15}
                  strokeWidth={ICON_STROKE}
                  className="text-icon transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
              >
                LinkedIn
                <ArrowUpRight
                  size={15}
                  strokeWidth={ICON_STROKE}
                  className="text-icon transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
