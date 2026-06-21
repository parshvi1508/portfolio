'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { POSITIONS } from '@/lib/data'

export function Positions() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="positions" className="py-20 px-6 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="positions-heading">
      <div className="mx-auto max-w-prose" ref={ref}>
        <div className="mb-10">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
            Positions of Responsibility
          </span>
          <h2
            id="positions-heading"
            className="mt-2 font-script text-4xl"
            style={{ color: 'var(--lavender-purple)' }}
          >
            Leading in public.
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px hidden sm:block"
            style={{ background: 'rgba(232,180,232,0.3)' }}
            aria-hidden
          />

          <div className="space-y-10">
            {POSITIONS.map((pos, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                className="sm:pl-8 relative"
              >
                {/* Timeline dot */}
                <div
                  className="hidden sm:block absolute left-0 top-2 w-2.5 h-2.5 rounded-full -translate-x-[5px] border-2"
                  style={{
                    background: 'var(--lavender-pink)',
                    borderColor: 'var(--bg)',
                    boxShadow: '0 0 8px rgba(232,180,232,0.4)',
                  }}
                  aria-hidden
                />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                  <div>
                    <h3 className="font-semibold text-base" style={{ color: 'var(--lavender-white)' }}>
                      {pos.role}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--lavender-purple)' }}>
                      {pos.org}
                    </p>
                  </div>
                  <p className="font-mono text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>
                    {pos.period}
                  </p>
                </div>

                <ul className="space-y-2">
                  {pos.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span className="font-mono mt-1 shrink-0 text-xs" style={{ color: 'var(--lavender-pink)' }}>
                        +
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
