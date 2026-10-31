import { agentProject, featuredProjects } from '../../lib/projects'
import { selectedWorkCopy } from '../../lib/site'
import { AgentPipelineShowcase } from '../case-study/AgentPipelineShowcase'
import { Eyebrow } from '../ui/Eyebrow'
import { ProjectCard } from '../ui/ProjectCard'
import { Reveal } from '../ui/Reveal'
import { KenSurveyShowcase } from '../case-study/KenSurveyShowcase'

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
  return <KenSurveyShowcase />
}

function ConversionVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#e9ebee]">
      <div className="absolute inset-x-[7%] top-[7%] h-px bg-white/80" aria-hidden />
      <div className="absolute left-[9%] top-[9%] w-[61%] overflow-hidden rounded-t-[0.7rem] border border-[#d9dce2] bg-white shadow-[0_22px_45px_-21px_rgba(30,37,55,0.35)] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
        <img
          src="/assets/projects/conversion/v2/form-call.webp"
          alt="Book a Discovery Call form showing progress, contact fields and verification details"
          className="block h-auto w-full"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute bottom-[6%] right-[7%] w-[27%] overflow-hidden rounded-[1.1rem] border-[4px] border-[#22232a] bg-white shadow-[0_24px_36px_-15px_rgba(30,37,55,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2 sm:rounded-[1.4rem] sm:border-[6px]">
        <img
          src="/assets/projects/conversion/v2/m-form.webp"
          alt="Mobile sample report form with clear fields and a single-column layout"
          className="block h-auto w-full"
          loading="lazy"
          decoding="async"
        />
      </div>
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
      title: 'Market Intelligence',
      description: 'Research discovery, flexible reports and downloadable insights.',
      visual: <MarketIntelligenceVisual />,
    },
    {
      index: '02',
      category: 'Design Systems',
      project: designSystem,
      title: 'Ken Design System',
      description: 'Shared components and patterns for a growing product ecosystem.',
      visual: <DesignSystemVisual />,
    },
    {
      index: '03',
      category: 'Product UX',
      project: kenSurvey,
      title: 'Ken Survey',
      description: 'One survey ecosystem for five distinct research needs.',
      visual: <KenSurveyVisual />,
    },
    {
      index: '04',
      category: 'Conversion UX',
      project: conversion,
      title: 'Conversion & Lead Journeys',
      description: 'Simpler forms and enquiry journeys across desktop and mobile.',
      visual: <ConversionVisual />,
    },
    {
      index: '05',
      category: 'AI Agents & Design QA',
      project: agentProject,
      title: 'AI Design Audit & Redesign',
      description: 'Connected agents for design audits, reviewed fixes and verification.',
      visual: <AgentPipelineShowcase />,
    },
  ]

  return (
    <section id="work" className="scroll-mt-24 bg-canvas pb-8 pt-20 md:pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 md:mb-12">
          <Eyebrow>Selected Work</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-sans text-3xl font-medium leading-[1.15] tracking-tight text-ink md:text-4xl">
            {selectedWorkCopy.heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {selectedWorkCopy.supporting}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <ProjectCard
              key={c.project.slug}
              index={c.index}
              category={c.category}
              title={c.title}
              outcome={c.description}
              capabilities={c.project.capabilities}
              href={c.project.route}
              visual={c.visual}
              compact
              summary
              visualClassName="aspect-video"
              ctaLabel="View project"
              delay={(i % 3) * 0.06}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
