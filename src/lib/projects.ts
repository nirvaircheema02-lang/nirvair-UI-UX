import type { ProjectMeta } from './types'

export const featuredProjects: ProjectMeta[] = [
  {
    slug: 'market-intelligence',
    title: 'AI-Assisted Market Intelligence',
    positioning:
      'Turning static research reports into a scalable digital intelligence experience — discovery, flexible report depth and downloadable research.',
    capabilities: ['Product UX', 'IA', 'AI Workflow', 'CRO'],
    category: 'flagship',
    route: '/work/market-intelligence',
    cover: '/assets/projects/market-intelligence/v2/rpt-hero-band.webp',
    coverAlt: 'A live Ken Research report page',
  },
  {
    slug: 'design-system',
    title: 'Ken Design System',
    positioning: 'Creating the shared foundations, components and patterns behind a growing digital ecosystem.',
    capabilities: ['Design Systems', 'Components', 'Patterns', 'Governance'],
    category: 'flagship',
    route: '/work/design-system',
    cover: '/assets/projects/design-system/components-buttons.png',
    coverAlt: 'Ken Design System Button component — real component documentation, not a mockup',
    external: 'https://ken-design-system-n26.vercel.app/overview/welcome',
  },
  {
    slug: 'ken-survey',
    title: 'Ken Survey',
    positioning: 'Designing one survey ecosystem for five different research needs — hub, taxonomy and five vertical experiences.',
    capabilities: ['Product UX', 'IA', 'Responsive', 'Data Experience'],
    category: 'flagship',
    route: '/work/ken-survey',
    cover: '/assets/projects/ken-survey/v2/survey-home.webp',
    coverAlt: 'The live Ken Research Survey homepage',
  },
  {
    slug: 'conversion',
    title: 'Conversion & Lead Journeys',
    positioning:
      'Reducing friction between website intent and qualified enquiry — funnel diagnosis, form and verification patterns, and mobile conversion.',
    capabilities: ['Conversion UX', 'Behaviour', 'Forms', 'Mobile'],
    category: 'flagship',
    route: '/work/conversion',
    cover: '/assets/projects/conversion/v2/form-call.webp',
    coverAlt: 'The live Book a Discovery Call journey',
  },
]

export const clientProjects: ProjectMeta[] = [
  {
    slug: 'arjun-realty',
    title: 'Arjun Realty',
    positioning: 'Luxury Real Estate Discovery Experience',
    capabilities: ['UX/UI', 'Responsive Web', 'Property Discovery', 'Lead Generation'],
    category: 'client',
    route: '/work/arjun-realty',
    cover: '/assets/projects/arjun-realty/site-desktop.png',
    coverAlt: 'Arjun Realty website — homepage in a browser window',
    external: 'https://arjunrealty.in/',
  },
  {
    slug: 'amrit-studio',
    title: 'Amrit Studio',
    positioning: 'Image-First Digital Experience for a Photography Brand',
    capabilities: ['Web Design', 'Content Hierarchy', 'Visual Storytelling'],
    category: 'client',
    route: '/work/amrit-studio',
    cover: '/assets/projects/amrit-studio/site-desktop.png',
    coverAlt: 'Amrit Studio website — homepage in a browser window',
    external: 'https://www.amritstudio.in/',
  },
]

// Kept for reference / possible future work-archive page — not rendered as a standalone
// homepage section per the current information architecture.
export const moreWork: (ProjectMeta & { index: string })[] = [
  {
    index: '05',
    slug: 'strategic-consulting',
    title: 'Strategic Consulting Ecosystem',
    positioning: 'UX / IA / Service Design',
    capabilities: [],
    category: 'more',
    route: '/work/design-system#consulting',
    cover: '/assets/projects/consulting/strategic-consulting.png',
    coverAlt: 'Strategic consulting homepage redesign',
    placeholder: true,
  },
  {
    index: '06',
    slug: 'competition-benchmarking',
    title: 'Competition Benchmarking',
    positioning: 'Product UX / Data',
    capabilities: [],
    category: 'more',
    route: '/work/market-intelligence#evidence',
    cover: '/assets/projects/competition-benchmarking/hero-cement-plant.jpg',
    coverAlt: 'Competition benchmarking research — industrial sector coverage',
  },
]

export const allProjects = [...featuredProjects, ...clientProjects]

export function getProjectBySlug(slug: string) {
  return allProjects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const idx = allProjects.findIndex((p) => p.slug === slug)
  if (idx === -1) return allProjects[0]
  return allProjects[(idx + 1) % allProjects.length]
}
