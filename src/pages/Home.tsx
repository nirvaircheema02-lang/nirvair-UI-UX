import { About } from '../components/home/About'
import { ClientWork } from '../components/home/ClientWork'
import { AiWorkflow } from '../components/home/AiWorkflow'
import { FeaturedWork } from '../components/home/FeaturedWork'
import { Hero } from '../components/home/Hero'
import { HowIWork } from '../components/home/HowIWork'
import { Impact } from '../components/home/Impact'
import { ToolsSection } from '../components/home/ToolsSection'

/**
 * Reading order is the narrative:
 * what I designed → what changed → how I think → how I deliver →
 * what I work with → who I am.
 */
export function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ClientWork />
      <Impact />
      <HowIWork />
      <AiWorkflow />
      <ToolsSection />
      <About />
    </>
  )
}
