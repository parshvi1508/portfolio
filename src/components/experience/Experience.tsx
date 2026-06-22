'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EXPERIENCE } from '@/lib/data'

type Exp = typeof EXPERIENCE[number]

const COMPANY_ACCENT: Record<string, string> = {
  Trurism: '#2ee6a6',
  'MedEvidences AI': '#7b9fff',
  NextHive: '#f5c542',
}

const COMPANY_BG: Record<string, string> = {
  Trurism: 'linear-gradient(160deg, #00261a 0%, #001a12 100%)',
  'MedEvidences AI': 'linear-gradient(160deg, #0a1030 0%, #050818 100%)',
  NextHive: 'linear-gradient(160deg, #26200a 0%, #191400 100%)',
}

function ExperienceDialog({ exp, onClose }: { exp: Exp; onClose: () => void }) {
  const accent = COMPANY_ACCENT[exp.company] ?? '#9d7bff'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(6,11,36,0.92)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative w-full max-w-lg rounded-2xl border overflow-hidden"
        style={{ background: 'var(--bg-elevated)', borderColor: `${accent}44` }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header band */}
        <div style={{ height: '88px', background: COMPANY_BG[exp.company] ?? 'var(--bg-sunken)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: '24px',
            fontSize: '48px', fontWeight: 800, letterSpacing: '-0.04em',
            color: 'transparent', WebkitTextStroke: `1px ${accent}`, opacity: 0.08,
            userSelect: 'none', whiteSpace: 'nowrap',
          }}>
            {exp.company}
          </div>
          <div aria-hidden style={{
            position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px',
            borderRadius: '50%', background: `${accent}22`, filter: 'blur(32px)',
          }} />
          <div className="absolute bottom-4 left-6">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded font-semibold"
              style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
              {exp.period}
            </span>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg"
          style={{ color: 'var(--text-muted)', background: 'rgba(0,0,0,0.3)' }} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-xl" style={{ color: accent }}>{exp.company}</h3>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{exp.role} &middot; {exp.location}</p>
          </div>

          <ul className="space-y-3">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-mono mt-1 shrink-0 text-xs" style={{ color: accent }}>+</span>
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t" style={{ borderColor: `${accent}22` }}>
            {exp.stack.map((s) => (
              <span key={s} className="font-mono text-xs px-2 py-0.5 rounded"
                style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}28` }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ExperienceCard({ exp, onOpen }: { exp: Exp; onOpen: (e: Exp) => void }) {
  const accent = COMPANY_ACCENT[exp.company] ?? '#9d7bff'
  const bg = COMPANY_BG[exp.company] ?? 'var(--bg-elevated)'

  return (
    <button
      className="rounded-2xl border overflow-hidden text-left cursor-pointer group transition-all hover:-translate-y-1 w-full"
      style={{
        background: 'var(--bg-elevated)',
        borderColor: `${accent}33`,
        boxShadow: `0 0 24px ${accent}0a`,
      }}
      onClick={() => onOpen(exp)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accent}66`
        e.currentTarget.style.boxShadow = `0 8px 32px ${accent}1a`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${accent}33`
        e.currentTarget.style.boxShadow = `0 0 24px ${accent}0a`
      }}
      aria-label={`View experience: ${exp.company}`}
    >
      {/* Header band */}
      <div style={{ height: '88px', background: bg, position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: '20px',
          fontSize: '38px', fontWeight: 800, letterSpacing: '-0.04em',
          color: 'transparent', WebkitTextStroke: `1px ${accent}`, opacity: 0.1,
          userSelect: 'none', whiteSpace: 'nowrap',
        }}>
          {exp.company}
        </div>
        <div aria-hidden style={{
          position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px',
          borderRadius: '50%', background: `${accent}1a`, filter: 'blur(28px)',
        }} />
        <div className="absolute bottom-4 left-5">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded font-semibold"
            style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
            {exp.period}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="font-bold text-base leading-snug" style={{ color: 'var(--lavender-white)' }}>{exp.role}</h3>
          <p className="text-sm mt-0.5 font-mono" style={{ color: accent }}>{exp.company}</p>
        </div>

        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {exp.bullets[0]}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {exp.stack.slice(0, 4).map((s) => (
            <span key={s} className="font-mono text-[10px] px-1.5 py-0.5 rounded"
              style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}28` }}>
              {s}
            </span>
          ))}
          {exp.stack.length > 4 && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ color: 'var(--text-muted)' }}>
              +{exp.stack.length - 4}
            </span>
          )}
        </div>

        <p className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accent }}>
          Full story →
        </p>
      </div>
    </button>
  )
}

export function Experience() {
  const [dialogExp, setDialogExp] = useState<Exp | null>(null)
  const items = [...EXPERIENCE]

  return (
    <>
      <section id="experience" className="py-20 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="exp-heading">
        <div className="px-6 mx-auto max-w-content mb-10">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
            Experience
          </span>
          <h2 id="exp-heading" className="mt-2 font-script text-4xl sm:text-5xl" style={{ color: 'var(--lavender-purple)' }}>
            Where I have shipped.
          </h2>
        </div>

        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} onOpen={setDialogExp} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {dialogExp && <ExperienceDialog exp={dialogExp} onClose={() => setDialogExp(null)} />}
      </AnimatePresence>
    </>
  )
}
