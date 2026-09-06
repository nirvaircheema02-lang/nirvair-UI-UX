import { Eyebrow } from '../ui/Eyebrow'
import type { ComponentType } from 'react'
import { tools, toolsSectionCopy } from '../../lib/site'
import {
  BootstrapLogo,
  ClaudeLogo,
  CssLogo,
  FigmaLogo,
  FigmaMakeLogo,
  FramerLogo,
  GitHubLogo,
  Html5Logo,
  JavaScriptLogo,
  McpLogo,
} from '../ui/BrandLogos'
import { Reveal } from '../ui/Reveal'

type LogoType = ComponentType<{ size?: number; className?: string }>

/**
 * Figma Make ships its own product icon, so it does not reuse the Figma mark.
 * Figma MCP carries the Model Context Protocol mark — accurate, and it keeps
 * two identical Figma logos out of one row.
 */
const LOGOS: Record<string, LogoType> = {
  Figma: FigmaLogo,
  'Figma Make': FigmaMakeLogo,
  Framer: FramerLogo,
  'Claude Code': ClaudeLogo,
  'Figma MCP': McpLogo,
  GitHub: GitHubLogo,
  HTML: Html5Logo,
  CSS: CssLogo,
  'Bootstrap 5': BootstrapLogo,
  JavaScript: JavaScriptLogo,
}

export function ToolsSection() {
  return (
    <section className="border-t border-border bg-canvas py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>
            {toolsSectionCopy.eyebrow}
          </Eyebrow>
          <h2 className="mt-4 max-w-2xl font-sans text-2xl font-medium leading-[1.2] tracking-tight text-ink md:text-3xl">
            {toolsSectionCopy.heading}
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">{toolsSectionCopy.supporting}</p>
        </Reveal>

        {/* Horizontal scroll on mobile, compact static grid from sm up. */}
        {/* On phones the rail scrolls; a right-edge fade signals there is more
            beyond the fold instead of the row looking complete at three chips. */}
        <Reveal delay={0.09} className="relative mt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 bottom-0 top-0 z-10 w-12 bg-gradient-to-l from-canvas to-transparent sm:hidden"
          />
          <ul
            aria-label="Design and build tools"
            className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
            {tools.map((tool) => {
              const Logo = LOGOS[tool]
              return (
                <li
                  key={tool}
                  className="group flex shrink-0 items-center gap-2.5 rounded-lg border border-border bg-surface py-2.5 pl-3 pr-4 transition-colors duration-200 hover:border-accent/30"
                >
                  {/* No badge behind the mark: a tinted disc competes with the
                      logos' own colour and shape. */}
                  {Logo && <Logo size={18} className="shrink-0" />}
                  <span className="whitespace-nowrap text-sm text-ink">{tool}</span>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
