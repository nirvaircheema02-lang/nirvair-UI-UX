import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { footerCopy, profile } from '../../lib/site'
import { Reveal } from '../ui/Reveal'
import { ContactSheet } from './ContactSheet'

function scrollToTop() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
}

export function Footer() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <footer className="border-t border-dark-border bg-dark text-dark-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-ink">
            {footerCopy.eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl font-sans text-4xl font-medium leading-[1.1] tracking-tight text-dark-ink md:text-6xl">
            {footerCopy.headline}
            <br />
            <span className="text-dark-ink-soft">{footerCopy.subhead}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center gap-2 bg-dark-ink px-6 py-3 text-sm font-medium text-dark transition-opacity hover:opacity-85"
          >
            Start a conversation
            <ArrowUpRight size={16} />
          </button>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-1.5 text-dark-ink-soft transition-colors hover:text-dark-ink"
          >
            Email
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-dark-ink-soft transition-colors hover:text-dark-ink"
          >
            LinkedIn
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-dark-ink-soft transition-colors hover:text-dark-ink"
          >
            Resume
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-dark-border pt-8 text-sm text-dark-ink-soft sm:flex-row sm:items-center">
          <p>{profile.name} — Senior Product / UX Designer</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-dark-ink-soft transition-colors hover:text-dark-ink"
            >
              Back to top
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
            <span className="text-dark-ink-soft/70">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>

      <ContactSheet open={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  )
}
