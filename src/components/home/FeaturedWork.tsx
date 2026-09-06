import { Eyebrow } from '../ui/Eyebrow'
import { featuredProjects } from '../../lib/projects'
import { selectedWorkCopy } from '../../lib/site'
import { ProjectCard } from '../ui/ProjectCard'
import { Reveal } from '../ui/Reveal'

const MI = '/assets/projects/market-intelligence/'
const DS = '/assets/projects/design-system/'

function MarketIntelligenceVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-canvas-alt p-4">
      <img
        src={`${MI}report-store-discovery.png`}
        alt="Ken Research Report Store — live discovery hero"
        className="h-full w-full object-contain"
        loading="eager"
      />
      <div className="absolute bottom-3 right-3 w-[20%] min-w-[56px] overflow-hidden rounded-sm border border-border shadow-[0_8px_20px_-8px_rgba(17,17,17,0.25)]">
        <img
          src={`${MI}v1-sample-slide-1.png`}
          alt="Sample report PDF page"
          className="aspect-[3/4] w-full object-cover object-top"
          loading="eager"
        />
      </div>
    </div>
  )
}

function DesignSystemVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-cool-alt p-4">
      <img
        src={`${DS}components-buttons.png`}
        alt="Ken Design System — real Button component documentation"
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  )
}

function KenSurveyVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-canvas-alt p-4">
      <img
        src="/assets/projects/ken-survey/survey-hero.png"
        alt="Ken Survey homepage, live product"
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  )
}

function ConversionVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-blue-alt p-4">
      <img
        src={`${MI}v01-cta-metadata-crop.png`}
        alt="Report detail page — structured metadata and sample-report CTA, the conversion decision this project shipped"
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  )
}

export function FeaturedWork() {
  const [marketIntelligence, designSystem, kenSurvey, conversion] = featuredProjects

  const cards = [
    {
      index: '01',
      category: 'Product Design',
      project: marketIntelligence,
      visual: <MarketIntelligenceVisual />,
    },
    {
      index: '02',
      category: 'Design Systems',
      project: designSystem,
      visual: <DesignSystemVisual />,
    },
    {
      index: '03',
      category: 'Product UX',
      project: kenSurvey,
      visual: <KenSurveyVisual />,
    },
    {
      index: '04',
      category: 'Conversion UX',
      project: conversion,
      visual: <ConversionVisual />,
    },
  ]

  return (
    <section id="work" className="scroll-mt-24 bg-canvas py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 md:mb-20">
          <Eyebrow>
            Selected Work
          </Eyebrow>
          <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.15] tracking-tight text-ink md:text-4xl">
            {selectedWorkCopy.heading}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">{selectedWorkCopy.supporting}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7">
          {cards.map((c, i) => (
            <ProjectCard
              key={c.project.slug}
              index={c.index}
              category={c.category}
              title={c.project.title}
              outcome={c.project.positioning}
              capabilities={c.project.capabilities}
              href={c.project.route}
              visual={c.visual}
              delay={(i % 2) * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
