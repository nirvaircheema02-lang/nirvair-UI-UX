export type ProjectMeta = {
  slug: string
  title: string
  positioning: string
  capabilities: string[]
  category: 'flagship' | 'client' | 'more'
  route: string
  cover: string
  coverAlt: string
  external?: string
  placeholder?: boolean
}

export type Snapshot = {
  role: string
  team?: string
  timeline?: string
  scope: string
  platform: string
}

export type MediaItem = {
  src: string
  alt: string
  caption?: string
  placeholder?: boolean
  fit?: 'cover' | 'contain'
  ratio?: string
}
