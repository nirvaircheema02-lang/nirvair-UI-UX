import { motion, useReducedMotion } from 'framer-motion'
import { Fragment } from 'react'

/**
 * Headline treatment lifted from the second reference.
 *
 * Two things carry that hero's type: the words arrive one at a time, coming
 * out of a blur rather than sliding in, and one phrase of the line breaks into
 * an italic serif against the heavy sans — "Designing what's next." beside the
 * bold name. The full stop is picked out in the accent colour, the way theirs
 * is red.
 *
 * The copy is untouched; this only splits it for presentation. The heading
 * keeps its full text as the accessible name so a screen reader does not hear
 * the words one by one.
 */
const ITALIC = new Set(['simple,'])

/** Words after which the line breaks on desktop. Width alone cannot give the
 *  three even lines wanted here: "simple," sets narrower in italic serif, so any
 *  measure wide enough for line one also lets "digital" climb onto line two. */
export function RevealHeadline({
  text,
  className,
  breakAfter = [],
}: {
  text: string
  className?: string
  breakAfter?: string[]
}) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  return (
    <h1 aria-label={text} className={className}>
      {words.map((word, i) => {
        const last = i === words.length - 1
        const italic = ITALIC.has(word)
        const body = last && word.endsWith('.') ? word.slice(0, -1) : word
        return (
          <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-visible">
            <motion.span
              className={`inline-block ${
                italic ? 'font-serif font-normal italic tracking-[-0.02em]' : ''
              }`}
              initial={reduceMotion ? false : { opacity: 0, y: 22, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                delay: reduceMotion ? 0 : 0.15 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {body}
              {last && word.endsWith('.') && <span className="text-accent">.</span>}
            </motion.span>
            {!last && ' '}
          </span>
          {breakAfter.includes(word) && <br aria-hidden className="hidden md:inline" />}
          </Fragment>
        )
      })}
    </h1>
  )
}
