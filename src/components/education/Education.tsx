'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { EDUCATION } from '@/lib/data'

type EduEntry = typeof EDUCATION[number]

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function EduDialog({ edu, onClose }: { edu: EduEntry; onClose: () => void }) {
  const accent = edu.prestige ? '#f5c542' : '#b197fc'

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
        className="relative w-full max-w-lg rounded-2xl border overflow-hidden"
        style={{ background: 'var(--bg-elevated)', borderColor: `${accent}44` }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={edu.institution}
      >
        <div style={{
          height: '90px',
          background: edu.prestige ? 'linear-gradient(160deg, #2a1e00 0%, #1a1000 100%)' : 'linear-gradient(160deg, #160d38 0%, #08103a 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: '24px',
            fontSize: '52px', fontWeight: 800, letterSpacing: '-0.04em',
            color: 'transparent', WebkitTextStroke: `1px ${accent}`, opacity: 0.1, userSelect: 'none',
          }}>
            {edu.prestige ? 'IIT' : 'ABES'}
          </div>
          {edu.prestige && (
            <span className="absolute bottom-4 left-6 font-mono text-[10px] px-2 py-0.5 rounded font-semibold"
              style={{ background: 'rgba(245,197,66,0.2)', color: '#f5c542', border: '1px solid rgba(245,197,66,0.4)' }}>
              IIT Madras
            </span>
          )}
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg"
          style={{ color: 'var(--text-muted)', background: 'rgba(0,0,0,0.3)' }} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-6 flex flex-col gap-5">
          <div>
            <h3 className="font-bold text-lg leading-snug" style={{ color: edu.prestige ? '#f5c542' : 'var(--lavender-white)' }}>
              {edu.institution}
            </h3>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{edu.degree} &middot; {edu.period}</p>
            {edu.detail && <p className="text-sm mt-0.5" style={{ color: accent }}>{edu.detail}</p>}
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'var(--text-muted)' }}>
              Core Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {edu.coursework.map((c) => (
                <span key={c} className="font-mono text-xs px-2.5 py-1 rounded-lg"
                  style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}28` }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'var(--text-muted)' }}>
              Highlights
            </p>
            <ul className="space-y-1.5">
              {edu.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: accent, flexShrink: 0 }}>+</span> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function EduCard({ edu, delay, onOpen }: { edu: EduEntry; delay: number; onOpen: (e: EduEntry) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px' })

  const accent = edu.prestige ? '#f5c542' : '#b197fc'
  const bg = edu.prestige
    ? 'linear-gradient(160deg, #2a1e00 0%, #1a1000 100%)'
    : 'linear-gradient(160deg, #160d38 0%, #08103a 100%)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="shrink-0 rounded-2xl border overflow-hidden cursor-pointer group"
      style={{
        width: '340px',
        scrollSnapAlign: 'center',
        borderColor: edu.prestige ? 'rgba(245,197,66,0.45)' : 'rgba(177,151,252,0.25)',
        background: 'var(--bg-elevated)',
        boxShadow: edu.prestige ? '0 0 40px rgba(245,197,66,0.1)' : '0 0 20px rgba(177,151,252,0.06)',
      }}
      onClick={() => onOpen(edu)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(edu)}
      aria-label={`View details: ${edu.institution}`}
    >
      {/* Header */}
      <div style={{ height: '100px', background: bg, padding: '20px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div aria-hidden style={{
          position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px',
          borderRadius: '50%', background: edu.prestige ? 'rgba(245,197,66,0.18)' : 'rgba(177,151,252,0.15)',
          filter: 'blur(28px)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: '20px',
          fontSize: '42px', fontWeight: 800, letterSpacing: '-0.04em',
          color: 'transparent', WebkitTextStroke: `1px ${accent}`, opacity: 0.08,
          whiteSpace: 'nowrap', overflow: 'hidden', userSelect: 'none',
        }}>
          {edu.prestige ? 'IIT' : 'ABES'}
        </div>
        {edu.prestige ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, delay: delay + 0.15 }}
            className="font-mono text-[10px] px-2 py-0.5 rounded font-semibold w-fit"
            style={{ background: 'rgba(245,197,66,0.2)', color: '#f5c542', border: '1px solid rgba(245,197,66,0.4)' }}
          >
            IIT Madras
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, delay: delay + 0.15 }}
            className="font-mono text-[10px] px-2 py-0.5 rounded font-semibold w-fit"
            style={{ background: 'rgba(177,151,252,0.15)', color: '#b197fc', border: '1px solid rgba(177,151,252,0.4)' }}
          >
            ABES Engineering
          </motion.span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.35, delay: delay + 0.1 }}
          className="font-bold text-base leading-snug"
          style={{ color: edu.prestige ? '#f5c542' : 'var(--lavender-white)' }}
        >
          {edu.institution}
        </motion.h3>

        {/* Degree + period chips */}
        <div className="flex flex-wrap gap-1.5">
          {[edu.degree, edu.period, ...(edu.detail ? [edu.detail] : [])].map((chip, ci) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.3, delay: delay + 0.18 + ci * 0.07 }}
              className="font-mono text-xs px-2 py-0.5 rounded-lg"
              style={{
                background: ci === 0 ? `${accent}18` : 'rgba(255,255,255,0.04)',
                color: ci === 0 ? accent : 'var(--text-muted)',
                border: `1px solid ${ci === 0 ? `${accent}33` : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              {chip}
            </motion.span>
          ))}
        </div>

        {/* Coursework preview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3, delay: delay + 0.35 }}
        >
          <p className="font-mono text-[9px] tracking-widest uppercase mb-1.5 font-semibold" style={{ color: 'var(--text-muted)' }}>
            Coursework
          </p>
          <div className="flex flex-wrap gap-1">
            {edu.coursework.slice(0, 4).map((c) => (
              <span key={c} className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}22` }}>
                {c}
              </span>
            ))}
            {edu.coursework.length > 4 && (
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ color: 'var(--text-muted)' }}>
                +{edu.coursework.length - 4} more
              </span>
            )}
          </div>
        </motion.div>

        <p className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-mono" style={{ color: accent }}>
          Click for details →
        </p>
      </div>
    </motion.div>
  )
}

export function Education() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<EduEntry | null>(null)

  function scroll(dir: 'left' | 'right') {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' })
  }

  return (
    <>
      <section id="education" className="py-20 px-6 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="edu-heading">
        <div className="mx-auto max-w-content">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
                Education
              </span>
              <h2
                id="edu-heading"
                className="mt-2 font-script text-4xl sm:text-5xl"
                style={{ color: 'var(--lavender-purple)' }}
              >
                Where the foundations were built.
              </h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')}
                className="p-2 rounded-lg border transition-colors hover:text-primary"
                style={{ borderColor: 'rgba(232,180,232,0.2)', color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}
                aria-label="Scroll left">
                <ChevronLeft />
              </button>
              <button onClick={() => scroll('right')}
                className="p-2 rounded-lg border transition-colors hover:text-primary"
                style={{ borderColor: 'rgba(232,180,232,0.2)', color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}
                aria-label="Scroll right">
                <ChevronRight />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {EDUCATION.map((edu, i) => (
              <EduCard key={i} edu={edu} delay={i * 0.12} onOpen={setSelected} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <EduDialog edu={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
