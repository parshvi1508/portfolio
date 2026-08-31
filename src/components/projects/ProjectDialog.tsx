'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tag } from '@/components/ui/Tag'
import { XAIDemoModal } from '@/components/demo/XAIDemoModal'
import type { Project } from '@/lib/data'

const CARD_ACCENT: Record<string, string> = {
  'xai-forensics': '#9d7bff',
  'renewable-forecasting': '#2ee6a6',
  'lumen-crm': '#b197fc',
  'data-analyst-agent': '#e8b4e8',
  'elearning-ism': '#f5c542',
  'studyroom-syncora': '#60a5fa',
}

function PhoneMockup({ slug, accent, tilt = false }: { slug: string; accent: string; tilt?: boolean }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      style={{
        transform: tilt ? 'rotate(-12deg) translateX(-20px) translateY(20px)' : 'none',
        zIndex: tilt ? 0 : 1,
        position: 'relative',
        width: '160px',
        flexShrink: 0,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: '160px',
          height: '300px',
          borderRadius: '28px',
          border: `2px solid ${accent}`,
          background: '#08103a',
          boxShadow: `0 0 40px ${accent}30, 0 20px 60px rgba(0,0,0,0.5)`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '48px',
          height: '10px',
          borderRadius: '6px',
          background: '#03061a',
          zIndex: 2,
        }} aria-hidden />

        {/* Screen content */}
        <div style={{ position: 'absolute', inset: 0, paddingTop: '28px' }}>
          {!imgError ? (
            <Image
              src={`/projects/${slug}.png`}
              alt={`${slug} screenshot`}
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              onError={() => setImgError(true)}
              sizes="160px"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${accent}22 0%, #08103a 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '36px', opacity: 0.3 }}>~</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface Props {
  project: Project
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: Props) {
  const [demoOpen, setDemoOpen] = useState(false)
  const accent = CARD_ACCENT[project.slug] ?? '#9d7bff'

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        style={{ background: 'rgba(6,11,36,0.88)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        {/* Dialog */}
        <div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border"
          style={{
            background: 'var(--bg-elevated)',
            borderColor: `${accent}44`,
            boxShadow: `0 0 80px ${accent}20`,
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
        >
          {/* Ghost background name */}
          <div
            aria-hidden
            className="absolute top-4 left-0 right-0 select-none pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
          >
            <div
              style={{
                fontSize: 'clamp(60px, 12vw, 120px)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: 'transparent',
                WebkitTextStroke: `1px ${accent}`,
                opacity: 0.07,
                whiteSpace: 'nowrap',
                paddingLeft: '24px',
                userSelect: 'none',
              }}
            >
              {project.name}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg transition-colors hover:bg-bg-sunken"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="relative z-10 p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                {project.badge && (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{ color: 'var(--success)', borderColor: 'rgba(46,230,166,0.3)', background: 'rgba(46,230,166,0.08)' }}>
                    {project.badge}
                  </span>
                )}
                {project.hasLiveDemo && (
                  <span className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{ color: 'var(--success)', borderColor: 'rgba(46,230,166,0.3)', background: 'rgba(46,230,166,0.08)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse inline-block" />
                    Live
                  </span>
                )}
              </div>
              <h2
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ color: accent }}
              >
                {project.name}
              </h2>
              <p className="mt-2 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.tagline}
              </p>
            </div>

            {/* Main layout: phones left, bento right */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Phone mockups */}
              <div
                className="flex items-end justify-center"
                style={{ minHeight: '280px', position: 'relative', flexShrink: 0 }}
              >
                <PhoneMockup slug={project.slug} accent={accent} tilt />
                <PhoneMockup slug={project.slug} accent={accent} />
              </div>

              {/* Right bento */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                {/* Metric card */}
                {project.metric && (
                  <div
                    className="col-span-full p-4 rounded-xl border"
                    style={{ background: `${accent}0d`, borderColor: `${accent}33` }}
                  >
                    <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: accent }}>
                      Key metric
                    </p>
                    <p className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                      {project.metric}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div
                  className="col-span-full p-4 rounded-xl border"
                  style={{ borderColor: 'rgba(232,180,232,0.15)', background: 'var(--bg-sunken)' }}
                >
                  <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--lavender-pink)' }}>
                    About
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                </div>

                {/* Stack */}
                <div
                  className="p-4 rounded-xl border"
                  style={{ borderColor: 'rgba(232,180,232,0.15)', background: 'var(--bg-sunken)' }}
                >
                  <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--lavender-pink)' }}>
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div
                  className="p-4 rounded-xl border flex flex-col gap-2"
                  style={{ borderColor: 'rgba(232,180,232,0.15)', background: 'var(--bg-sunken)' }}
                >
                  <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--lavender-pink)' }}>
                    Links
                  </p>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                      style={{ color: accent }}>
                      GitHub ↗
                    </a>
                  )}
                  {project.vercelDemo && (
                    <a href={project.vercelDemo} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                      style={{ color: accent }}>
                      Live demo ↗
                    </a>
                  )}
                  {project.demo && !project.vercelDemo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                      style={{ color: accent }}>
                      Demo ↗
                    </a>
                  )}
                  {project.paper && (
                    <a href={project.paper} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--success)' }}>
                      IEEE Paper ↗
                    </a>
                  )}
                  {project.caseStudy && (
                    <a href={project.caseStudy}
                      className="text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--text-secondary)' }}>
                      Case study →
                    </a>
                  )}
                  {project.hasLiveDemo && (
                    <button
                      onClick={() => setDemoOpen(true)}
                      className="text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity text-left"
                      style={{ color: 'var(--success)' }}
                    >
                      Run in-page demo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {demoOpen && <XAIDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  )
}
