'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CERTIFICATIONS } from '@/lib/data'

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certifications" className="py-16 px-6 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="certs-heading">
      <div className="mx-auto max-w-content" ref={ref}>
        <div className="mb-8">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
            Certifications
          </span>
          <h2
            id="certs-heading"
            className="mt-2 text-xl font-semibold tracking-[-0.01em]"
            style={{ color: 'var(--lavender-white)' }}
          >
            Credentials.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.span
              key={cert}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.06, ease: 'easeOut' }}
              className="px-4 py-2 rounded-full text-sm font-medium border"
              style={{
                background: 'rgba(177,151,252,0.08)',
                borderColor: 'rgba(177,151,252,0.3)',
                color: 'var(--lavender-white)',
              }}
            >
              {cert}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
