type DeviceMockupProps = { src: string; alt: string; className?: string; label?: string }

export function DeviceMockup({ src, alt, className = '', label }: DeviceMockupProps) {
  return (
    <div className={`relative w-full min-w-0 max-w-[150px] shrink sm:max-w-[210px] ${className}`}>
      <div
        className="relative w-full min-w-0 overflow-hidden rounded-[26px] border-[6px] border-ink bg-ink shadow-[0_24px_48px_-18px_rgba(17,17,17,0.4)]"
        style={{ aspectRatio: '9/18.5' }}
      >
        <div
          className="absolute left-1/2 top-0 z-10 h-4 w-16 -translate-x-1/2 rounded-b-lg bg-ink"
          aria-hidden
        />
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
      </div>
      {label && <p className="mt-3 text-center text-sm text-ink-faint">{label}</p>}
    </div>
  )
}
