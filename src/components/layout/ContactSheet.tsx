import { Eyebrow } from '../ui/Eyebrow'
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { contactCopy, profile } from '../../lib/site'
import { Dialog } from '../ui/Dialog'

type Status = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleClose() {
    onClose()
    window.setTimeout(() => setStatus('idle'), 300)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const company = String(form.get('company') || '').trim()
    const message = String(form.get('message') || '').trim()

    const nextErrors: Record<string, string> = {}
    if (!name) nextErrors.name = 'Please add your name.'
    if (!email || !EMAIL_RE.test(email)) nextErrors.email = 'Please add a valid email.'
    if (!message) nextErrors.message = 'Let me know what you’d like to discuss.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    const subject = `Portfolio enquiry from ${name}`
    const bodyLines = [message, '', `Name: ${name}`, `Email: ${email}`]
    if (company) bodyLines.push(`Company: ${company}`)
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`

    window.setTimeout(() => {
      try {
        window.location.href = mailto
        setStatus('success')
      } catch {
        setStatus('error')
      }
    }, 500)
  }

  return (
    <Dialog open={open} onClose={handleClose} title={contactCopy.heading} variant="sheet">
      <div className="flex h-full flex-col px-8 py-10 md:px-10">
        <Eyebrow>
          {contactCopy.heading}
        </Eyebrow>
        <h2 className="mt-4 font-sans text-2xl font-medium leading-tight tracking-tight text-ink md:text-3xl">
          Tell me what you&rsquo;re working on.
        </h2>
        <p className="mt-3 text-ink-soft">{contactCopy.supporting}</p>

        {status === 'success' ? (
          <div className="mt-10 flex flex-1 flex-col items-start">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas">
              <Check size={20} />
            </div>
            <p className="mt-5 max-w-sm text-lg text-ink">{contactCopy.success}</p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-8 text-sm font-medium text-ink underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-5">
            <div>
              <label htmlFor="cs-name" className="text-sm font-medium text-ink">
                Name
              </label>
              <input
                id="cs-name"
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'cs-name-error' : undefined}
                className="mt-2 w-full border border-border bg-canvas px-4 py-2.5 text-ink outline-none transition-colors focus:border-accent"
              />
              {errors.name && (
                <p id="cs-name-error" className="mt-1.5 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cs-email" className="text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="cs-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'cs-email-error' : undefined}
                className="mt-2 w-full border border-border bg-canvas px-4 py-2.5 text-ink outline-none transition-colors focus:border-accent"
              />
              {errors.email && (
                <p id="cs-email-error" className="mt-1.5 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cs-company" className="text-sm font-medium text-ink">
                Company <span className="text-ink-faint">(optional)</span>
              </label>
              <input
                id="cs-company"
                name="company"
                type="text"
                autoComplete="organization"
                className="mt-2 w-full border border-border bg-canvas px-4 py-2.5 text-ink outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="cs-message" className="text-sm font-medium text-ink">
                What would you like to discuss?
              </label>
              <textarea
                id="cs-message"
                name="message"
                rows={4}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'cs-message-error' : undefined}
                className="mt-2 w-full resize-none border border-border bg-canvas px-4 py-2.5 text-ink outline-none transition-colors focus:border-accent"
              />
              {errors.message && (
                <p id="cs-message-error" className="mt-1.5 text-sm text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            {status === 'error' && (
              <p role="alert" className="text-sm text-red-600">
                {contactCopy.error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-canvas transition-opacity hover:opacity-85 disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Opening email…
                </>
              ) : (
                'Send message'
              )}
            </button>
          </form>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-8">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            {profile.email}
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            LinkedIn
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </Dialog>
  )
}
