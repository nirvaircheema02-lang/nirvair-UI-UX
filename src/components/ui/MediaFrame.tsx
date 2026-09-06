import { ImageOff } from 'lucide-react'
import type { MediaItem } from '../../lib/types'

type MediaFrameProps = MediaItem & {
  className?: string
  ratio?: string
  priority?: boolean
  fit?: 'cover' | 'contain'
}

export function MediaFrame({
  src,
  alt,
  caption,
  placeholder,
  className = '',
  ratio,
  priority = false,
  fit = 'cover',
}: MediaFrameProps) {
  if (placeholder) {
    return (
      <figure className={className}>
        <div
          className="relative flex w-full min-w-0 flex-col items-center justify-center gap-3 overflow-hidden border border-dashed border-border-strong bg-canvas-alt px-6 py-24 text-center text-ink-faint"
          style={ratio ? { aspectRatio: ratio } : undefined}
        >
          <ImageOff size={28} strokeWidth={1.25} />
          <p className="max-w-xs text-sm">{alt}</p>
          <code className="text-xs text-ink-faint/70">{src}</code>
        </div>
        {caption && <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className={className}>
      <div
        className={`relative w-full min-w-0 overflow-hidden border border-border ${fit === 'contain' ? 'bg-canvas-alt' : ''}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`h-full w-full ${fit === 'contain' ? 'object-contain p-3 md:p-4' : 'object-cover'}`}
        />
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>}
    </figure>
  )
}
