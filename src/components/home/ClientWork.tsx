import { clientProjects } from '../../lib/projects'
import { ArjunRealtyMockup } from './ArjunRealtyMockup'
import { BrowserChrome } from '../ui/BrowserChrome'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionHeading } from '../ui/SectionHeading'

export function ClientWork() {
  const [arjunRealty, amritStudio] = clientProjects

  return (
    <section id="client-work" className="scroll-mt-20 border-t border-border bg-canvas-alt py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          compact
          eyebrow="Selected Client Work"
          title="Independent client projects across real estate and photography."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7">
          <ProjectCard
            index="01"
            category="Real Estate"
            title={arjunRealty.title}
            outcome={arjunRealty.positioning}
            capabilities={arjunRealty.capabilities}
            href={arjunRealty.route}
            compact
            visual={<ArjunRealtyMockup />}
          />
          <ProjectCard
            index="02"
            category="Photography"
            title={amritStudio.title}
            outcome={amritStudio.positioning}
            capabilities={amritStudio.capabilities}
            href={amritStudio.route}
            compact
            delay={0.09}
            visual={
              <BrowserChrome
                url="amritstudio.in"
                src={amritStudio.cover}
                alt={amritStudio.coverAlt}
              />
            }
          />
        </div>
      </div>
    </section>
  )
}
