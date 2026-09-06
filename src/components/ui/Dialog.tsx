import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

type DialogProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  variant?: 'sheet' | 'center'
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function Dialog({ open, onClose, title, children, variant = 'sheet' }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const reduceMotion = useReducedMotion()

  // Consumers pass a fresh closure each render, so keying the effect on
  // `onClose` would tear down and re-run it on every state change inside the
  // dialog — re-focusing the close button and stealing focus out of the form
  // mid-typing. Hold it in a ref and depend on `open` alone.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return
    triggerRef.current = document.activeElement
    const panel = panelRef.current
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const [firstEl, lastEl] = [focusable[0], focusable[focusable.length - 1]]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus()
    }
  }, [open])

  const dur = reduceMotion ? 0.01 : 0.32

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]" role="presentation">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={
              variant === 'sheet' ? { opacity: 0, x: 32 } : { opacity: 0, scale: 0.97, y: 8 }
            }
            animate={variant === 'sheet' ? { opacity: 1, x: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={variant === 'sheet' ? { opacity: 0, x: 32 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            className={
              variant === 'sheet'
                ? 'absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-surface shadow-[0_0_60px_-15px_rgba(17,17,17,0.35)] sm:inset-y-3 sm:right-3 sm:rounded-2xl sm:border sm:border-border'
                : 'absolute left-1/2 top-1/2 max-h-[90vh] w-[min(94vw,1100px)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg bg-surface p-2 shadow-[0_20px_60px_-15px_rgba(17,17,17,0.45)]'
            }
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={
                variant === 'sheet'
                  ? 'absolute right-5 top-5 z-10 rounded-full p-1.5 text-ink-faint transition-colors hover:bg-canvas-alt hover:text-ink'
                  : 'absolute right-3 top-3 z-10 rounded-full bg-surface p-1.5 text-ink-faint shadow transition-colors hover:text-ink'
              }
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
