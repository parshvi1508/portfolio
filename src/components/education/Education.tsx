'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EDUCATION } from '@/lib/data'

export function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="py-20 px-6 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="edu-heading">
      <div className="mx-auto max-w-prose" ref={ref}>
        <div className="mb-10">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
            Education
          </span>
          <h2
            id="edu-heading"
            className="mt-2 font-script text-4xl"
            style={{ color: 'var(--lavender-purple)' }}
          >
            Two degrees, in parallel.
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute left-0 top-2 bottom-2 w-px hidden sm:block"
            style={{ background: 'rgba(232,180,232,0.3)' }}
            aria-hidden
          />

          <div className="space-y-8">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                className="sm:pl-8 relative"
              >
                {/* Timeline dot: gold for IIT Madras, lavender-pink for others */}
                <div
                  className="hidden sm:block absolute left-0 top-2 w-2.5 h-2.5 rounded-full -translate-x-[5px] border-2"
                  style={{
                    background: edu.prestige ? '#f5c542' : 'var(--lavender-pink)',
                    borderColor: 'var(--bg)',
                    boxShadow: edu.prestige
                      ? '0 0 10px rgba(245,197,66,0.5)'
                      : '0 0 8px rgba(232,180,232,0.4)',
                  }}
                  aria-hidden
                />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <h3
                      className="font-semibold text-base"
                      style={{ color: edu.prestige ? '#f5c542' : 'var(--lavender-white)' }}
                    >
                      {edu.institution}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--lavender-purple)' }}>
                      {edu.degree}
                    </p>
                    {edu.detail && (
                      <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>
                        {edu.detail}
                      </p>
                    )}
                  </div>
                  <p className="font-mono text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>
                    {edu.period}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
