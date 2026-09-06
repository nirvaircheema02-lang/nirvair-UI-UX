import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { MediaItem } from '../../lib/types'
import { MediaFrame } from '../ui/MediaFrame'

type CaseStudyHeroProps = {
  eyebrow: string
  title: string
  statement: string
  hero: MediaItem
}

export function CaseStudyHero({ eyebrow, title, statement, hero }: CaseStudyHeroProps) {
  return (
    <header className="pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <Link
          to="/"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-ink"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to Home
        </Link>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-5 max-w-4xl font-sans text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl"
        >
          {statement}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-16 max-w-6xl px-6"
      >
        <MediaFrame {...hero} priority />
      </motion.div>
    </header>
  )
}
