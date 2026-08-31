'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const PHRASES = [
  'Applied AI Engineer',
  'IEEE-published researcher',
  'XAI systems builder',
  'shipping AI that explains itself',
]

export function TypewriterTagline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % PHRASES.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="text-base sm:text-lg font-medium tracking-wide"
          style={{ color: 'var(--lavender-purple)' }}
        >
          {PHRASES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
