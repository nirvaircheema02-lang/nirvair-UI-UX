type LaptopFrameProps = {
  url: string
  src: string
  alt: string
  className?: string
}

export function LaptopFrame({ url, src, alt, className = '' }: LaptopFrameProps) {
  return (
    <div className={`mx-auto w-full min-w-0 ${className}`}>
      <div className="relative w-full min-w-0 overflow-hidden rounded-t-xl border border-b-0 border-border-strong bg-surface shadow-[0_40px_80px_-30px_rgba(17,17,17,0.35)]">
        <div className="flex shrink-0 items-center gap-3 border-b border-border bg-canvas-alt px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </div>
          <div className="mx-auto w-full max-w-xs truncate rounded-full bg-surface px-4 py-1.5 text-center text-[11px] text-ink-faint">
            {url}
          </div>
        </div>
        <div className="aspect-[16/10] w-full overflow-hidden bg-canvas-alt">
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-contain" />
        </div>
      </div>
      <div aria-hidden className="relative">
        <div className="h-[10px] rounded-b-md border border-t-0 border-border-strong bg-gradient-to-b from-canvas-alt to-border" />
        <div className="mx-auto -mt-px h-[3px] w-1/4 rounded-b-xl bg-border-strong" />
      </div>
    </div>
  )
}
