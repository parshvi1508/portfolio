'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ACHIEVEMENTS } from '@/lib/data'

const TYPE_ICON: Record<string, string> = {
  publication: 'P',
  conference: 'C',
  competition: 'T',
  recognition: 'R',
}

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" className="py-20 px-6 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="achievements-heading">
      <div className="mx-auto max-w-content" ref={ref}>
        <div className="mb-10">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
            Achievements
          </span>
          <h2
            id="achievements-heading"
            className="mt-2 font-script text-4xl"
            style={{ color: 'var(--lavender-purple)' }}
          >
            Numbers that mean something.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
              className="flex items-start gap-4 p-5 rounded-xl border"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'rgba(232,180,232,0.25)',
              }}
            >
              <span
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-semibold"
                style={{
                  background: 'rgba(177,151,252,0.15)',
                  color: 'var(--lavender-purple)',
                  border: '1px solid rgba(177,151,252,0.3)',
                }}
              >
                {TYPE_ICON[item.type] ?? 'A'}
              </span>
              <div>
                <p className="font-semibold text-sm leading-snug" style={{ color: 'var(--lavender-purple)' }}>
                  {item.label}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
