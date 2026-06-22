'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ACHIEVEMENTS } from '@/lib/data'

const TYPE_MASCOT: Record<string, string> = {
  publication: '/mochi_paper.png',
  conference: '/mochi_mic.png',
  competition: '/mochi_trophy.png',
  recognition: '/mochi_globe.png',
}

const TYPE_ACCENT: Record<string, string> = {
  publication: '#9d7bff',
  conference: '#c4a3ff',
  competition: '#f5c542',
  recognition: '#2ee6a6',
}

type Achievement = typeof ACHIEVEMENTS[number]

function AchievementDialog({ item, onClose }: { item: Achievement; onClose: () => void }) {
  const accent = TYPE_ACCENT[item.type] ?? '#9d7bff'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6,11,36,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative w-full max-w-sm rounded-2xl border p-6"
        style={{ background: 'var(--bg-elevated)', borderColor: `${accent}44` }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg"
          style={{ color: 'var(--text-muted)' }} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
            style={{ background: `${accent}18`, border: `1px solid ${accent}33` }}>
            <img src={TYPE_MASCOT[item.type]} alt="" className="w-10 h-10 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </div>
          <span className="font-mono text-xs tracking-widest uppercase font-semibold" style={{ color: accent }}>
            {item.type}
          </span>
        </div>

        <h3 className="font-bold text-lg leading-snug mb-3" style={{ color: 'var(--text-primary)' }}>
          {item.label}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {item.detail}
        </p>
      </motion.div>
    </div>
  )
}

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<Achievement | null>(null)

  return (
    <>
      <section id="achievements" className="py-20 px-6 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="achievements-heading">
        <div className="mx-auto max-w-content" ref={ref}>
          <div className="mb-10">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
              Achievements
            </span>
            <h2
              id="achievements-heading"
              className="mt-2 font-script text-4xl sm:text-5xl"
              style={{
                background: 'linear-gradient(120deg, #b197fc 0%, #f0c0f8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Proof of work.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((item, i) => {
              const accent = TYPE_ACCENT[item.type] ?? '#9d7bff'
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                  className="flex flex-col gap-3 p-6 rounded-2xl border text-left w-full min-h-[160px] cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(145deg, ${accent}0c, var(--bg-elevated))`,
                    borderColor: `${accent}33`,
                  }}
                  onClick={() => setSelected(item)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}66`
                    e.currentTarget.style.boxShadow = `0 8px 32px ${accent}18`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${accent}33`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  aria-label={`View details: ${item.label}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                      style={{ background: `${accent}18`, border: `1px solid ${accent}33` }}>
                      <img src={TYPE_MASCOT[item.type]} alt="" className="w-8 h-8 object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-md font-semibold"
                      style={{ background: `${accent}18`, color: accent }}>
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-base leading-snug mt-1" style={{ color: 'var(--text-primary)' }}>
                    {item.label}
                  </h3>

                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {item.detail}
                  </p>

                  <div style={{ height: 2, background: `linear-gradient(to right, ${accent}, transparent)`, opacity: 0.5, borderRadius: 1 }} />
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <AchievementDialog item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
