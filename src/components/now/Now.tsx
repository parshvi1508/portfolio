'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { NOW_CONTENT } from '@/lib/data'

function MicroscopeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 18h8" /><path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14l.5-8.5" />
      <path d="M12 3l2 3-3.5 2L9 5z" />
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

const SVGS: Record<string, React.ReactNode> = {
  Research: <MicroscopeIcon />,
  Shipping: <RocketIcon />,
  Reading: <BookIcon />,
}

const ACCENTS: Record<string, string> = {
  Research: '#9d7bff',
  Shipping: '#2ee6a6',
  Reading: '#c4a3ff',
}

function GlassCard({ item }: { item: { label: string; content: string } }) {
  const accent = ACCENTS[item.label] ?? '#9d7bff'
  return (
    <div
      className="shrink-0 flex flex-col gap-3 rounded-xl p-5"
      style={{
        width: '220px',
        background: 'rgba(157,123,255,0.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(177,151,252,0.18)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${accent}20`, color: accent }}>
          {SVGS[item.label]}
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase font-semibold" style={{ color: accent }}>
          {item.label}
        </span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,190,255,0.75)', lineHeight: '1.6' }}>
        {item.content}
      </p>
    </div>
  )
}

export function Now() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = Object.values(NOW_CONTENT)

  return (
    <section id="now" className="py-24 px-6 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="now-heading">
      <div className="mx-auto max-w-content" ref={ref}>
        <div className="mb-12">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>Now</span>
          <h2
            id="now-heading"
            className="mt-2 font-script text-4xl sm:text-5xl"
            style={{ color: 'var(--lavender-purple)' }}
          >
            What I am building this week.
          </h2>
        </div>

        {/* Laptop frame */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto hidden md:block"
          style={{ maxWidth: '720px' }}
        >
          {/* Screen */}
          <div style={{
            background: 'linear-gradient(160deg, #06071c 0%, #0e0a2a 100%)',
            borderRadius: '14px 14px 0 0',
            border: '2px solid rgba(177,151,252,0.3)',
            borderBottom: 'none',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Browser bar */}
            <div style={{
              height: '30px',
              background: 'rgba(177,151,252,0.07)',
              borderBottom: '1px solid rgba(177,151,252,0.15)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              gap: '6px',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', opacity: 0.7 }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', opacity: 0.7 }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', opacity: 0.7 }} />
              <div style={{
                marginLeft: 8, flex: 1, maxWidth: 240, height: 16, borderRadius: 4,
                background: 'rgba(177,151,252,0.1)', display: 'flex', alignItems: 'center',
                paddingLeft: 8,
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(177,151,252,0.5)' }}>
                  parshvi.now / this week
                </span>
              </div>
            </div>

            {/* Screen content with dot grid */}
            <div style={{
              padding: '28px 20px 28px',
              backgroundImage: 'radial-gradient(rgba(157,123,255,0.12) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              overflow: 'hidden',
            }}>
              {/* Marquee */}
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    width: 'max-content',
                    animation: 'marquee-left 14s linear infinite',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
                  onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
                >
                  {[...items, ...items, ...items].map((item, i) => (
                    <GlassCard key={i} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Laptop base */}
          <div style={{
            height: '16px',
            background: 'linear-gradient(to bottom, rgba(177,151,252,0.2), rgba(177,151,252,0.06))',
            borderRadius: '0 0 3px 3px',
            border: '2px solid rgba(177,151,252,0.2)',
            borderTop: 'none',
          }} />
          <div style={{
            height: '3px',
            background: 'rgba(177,151,252,0.12)',
            borderRadius: '0 0 10px 10px',
            width: '75%',
            margin: '0 auto',
          }} />
        </motion.div>

        {/* Mobile fallback - simple cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {items.map((item, i) => {
            const accent = ACCENTS[item.label] ?? 'var(--accent)'
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                className="relative overflow-hidden flex flex-col gap-4 p-6 rounded-2xl border"
                style={{
                  background: `linear-gradient(135deg, ${accent}10 0%, var(--bg-elevated) 70%)`,
                  borderColor: `${accent}30`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}1a`, border: `1px solid ${accent}28`, color: accent }}>
                    {SVGS[item.label]}
                  </div>
                  <span className="font-mono text-xs tracking-widest uppercase font-semibold" style={{ color: accent }}>
                    {item.label}
                  </span>
                </div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.content}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
