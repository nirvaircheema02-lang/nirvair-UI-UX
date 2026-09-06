type BrowserChromeProps = {
  url: string
  src: string
  alt: string
  className?: string
}

export function BrowserChrome({ url, src, alt, className = '' }: BrowserChromeProps) {
  return (
    <div className={`flex h-full w-full flex-col border border-border-strong bg-surface ${className}`}>
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-canvas-alt px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
        </div>
        <div className="flex-1 truncate rounded-full bg-surface px-3 py-1 text-center text-[11px] text-ink-faint">
          {url}
        </div>
      </div>
      <div className="flex flex-1 items-start justify-center overflow-hidden bg-canvas-alt">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-contain object-top" />
      </div>
    </div>
  )
}
