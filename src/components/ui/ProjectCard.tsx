import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

type ProjectCardProps = {
  index: string
  category: string
  title: string
  outcome: string
  capabilities: string[]
  href: string
  visual: ReactNode
  visualClassName?: string
  delay?: number
  compact?: boolean
  summary?: boolean
  ctaLabel?: string
  external?: boolean
}

export function ProjectCard({
  index,
  category,
  title,
  outcome,
  capabilities,
  href,
  visual,
  visualClassName = '',
  delay = 0,
  compact = false,
  summary = false,
  external = false,
  ctaLabel,
}: ProjectCardProps) {
  const content = (
    <>
      <div className={`overflow-hidden ${visualClassName || 'aspect-[16/10]'}`}>
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02]">
          {visual}
        </div>
      </div>

      <div className={`flex flex-1 flex-col border-t border-border ${summary ? 'px-5 py-4' : compact ? 'p-5 md:p-6' : 'p-6 md:p-7'}`}>
        {!summary && <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          {index} / {category}
        </p>}
        <h3
          className={`${summary ? '' : 'mt-3'} font-sans font-medium tracking-tight text-ink ${summary ? 'text-lg leading-6' : compact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}
        >
          {title}
        </h3>
        <p className={`mt-2 max-w-md text-ink-soft ${summary ? 'text-sm leading-5' : ''}`}>{outcome}</p>

        <div className={`mt-auto ${summary ? 'pt-3' : 'pt-6'} ${ctaLabel ? '' : 'flex items-end justify-between'}`}>
          {!summary && <p className="max-w-xs text-sm text-ink-faint">{capabilities.join(' · ')}</p>}
          <span className={summary ? 'flex items-center justify-between text-sm font-medium text-accent' : ctaLabel ? 'mt-5 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-accent' : 'inline-flex'}>
          {ctaLabel}
          <ArrowUpRight
            size={20}
            strokeWidth={1.6}
            aria-hidden="true"
            className="shrink-0 text-icon transition-all duration-200 group-hover:-translate-y-[3px] group-hover:translate-x-[3px] group-hover:text-accent group-focus-visible:-translate-y-[3px] group-focus-visible:translate-x-[3px] group-focus-visible:text-accent"
          />
          </span>
        </div>
      </div>
    </>
  )

  const className =
    'group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface outline-none transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[0_14px_36px_-22px_rgba(17,17,17,0.35)] focus-visible:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'

  return (
    <Reveal delay={delay} className="h-full">
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {content}
        </a>
      ) : (
        <Link to={href} className={className}>
          {content}
        </Link>
      )}
    </Reveal>
  )
}
