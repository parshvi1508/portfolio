'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { POSITIONS } from '@/lib/data'

type Position = typeof POSITIONS[number]

function PositionDialog({ pos, onClose }: { pos: Position; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(6,11,36,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative w-full max-w-lg rounded-2xl border p-6 sm:p-8"
        style={{ background: 'var(--bg-elevated)', borderColor: 'rgba(177,151,252,0.4)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)' }} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mb-5">
          <h3 className="font-bold text-xl" style={{ color: 'var(--lavender-white)' }}>{pos.role}</h3>
          <p className="font-mono text-xs mt-2" style={{ color: 'var(--lavender-pink)' }}>
            {pos.org} &middot; {pos.period}
          </p>
        </div>

        <ul className="space-y-3">
          {pos.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-mono mt-1 shrink-0 text-xs" style={{ color: 'var(--lavender-pink)' }}>+</span>
              {b}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export function Positions() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<Position | null>(null)

  return (
    <>
      <section id="positions" className="py-20 px-6 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="positions-heading">
        <div className="mx-auto max-w-content" ref={ref}>
          <div className="mb-10">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
              Positions of Responsibility
            </span>
            <h2
              id="positions-heading"
              className="mt-2 font-script text-4xl sm:text-5xl"
              style={{ color: 'var(--lavender-purple)' }}
            >
              Leading in public.
            </h2>
          </div>

          {/* Staircase layout */}
          <div className="flex flex-col gap-5 relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-4 top-10 bottom-10 w-px hidden sm:block"
              aria-hidden
              style={{ background: 'linear-gradient(to bottom, rgba(177,151,252,0.5), rgba(232,180,232,0.2), transparent)' }}
            />

            {POSITIONS.map((pos, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -48 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
                transition={{ duration: 0.5, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col p-6 rounded-2xl border text-left w-full cursor-pointer group transition-all hover:-translate-y-0.5"
                style={{
                  marginLeft: `${i * 48}px`,
                  background: 'var(--bg-elevated)',
                  borderColor: 'rgba(177,151,252,0.2)',
                  borderLeftColor: 'rgba(177,151,252,0.7)',
                  borderLeftWidth: '3px',
                  position: 'relative',
                }}
                onClick={() => setSelected(pos)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(177,151,252,0.5)'
                  e.currentTarget.style.borderLeftColor = 'rgba(177,151,252,1)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(177,151,252,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(177,151,252,0.2)'
                  e.currentTarget.style.borderLeftColor = 'rgba(177,151,252,0.7)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                aria-label={`View details: ${pos.role} at ${pos.org}`}
              >
                {/* Step dot */}
                <div
                  className="absolute -left-[calc(48px*var(--step)+5px)] top-6 w-2.5 h-2.5 rounded-full hidden sm:block"
                  style={{
                    background: 'var(--lavender-purple)',
                    boxShadow: '0 0 10px rgba(177,151,252,0.6)',
                    left: `calc(-${i * 48 + 4}px)`,
                  }}
                  aria-hidden
                />

                <div className="mb-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-xl" style={{ color: 'var(--lavender-white)' }}>{pos.role}</h3>
                    <span
                      className="font-mono text-[10px] shrink-0 mt-1 px-2 py-0.5 rounded"
                      style={{ background: 'rgba(177,151,252,0.1)', color: 'var(--lavender-pink)', border: '1px solid rgba(177,151,252,0.2)' }}
                    >
                      {i === 0 ? 'Current' : 'Past'}
                    </span>
                  </div>
                  <p className="font-mono text-xs mt-1.5" style={{ color: 'var(--lavender-pink)' }}>
                    {pos.org} &middot; {pos.period}
                  </p>
                </div>

                <p className="text-sm leading-relaxed flex-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'rgba(177,151,252,0.8)' }}>&#8594;</span> {pos.bullets[0]}
                </p>

                <span className="text-xs mt-4 font-mono transition-colors group-hover:opacity-80" style={{ color: 'var(--lavender-pink)' }}>
                  View full role →
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <PositionDialog pos={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
