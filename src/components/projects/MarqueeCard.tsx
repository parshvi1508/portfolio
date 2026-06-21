'use client'

import { useState } from 'react'
import { Tag } from '@/components/ui/Tag'
import { XAIDemoModal } from '@/components/demo/XAIDemoModal'
import type { Project } from '@/lib/data'

const CARD_ACCENT: Record<string, string> = {
  'xai-forensics': 'var(--accent)',
  'renewable-forecasting': '#2ee6a6',
  'lumen-crm': 'var(--lavender-purple)',
  'data-analyst-agent': 'var(--lavender-pink)',
  'anomaly-detection': '#f5c542',
  'studyroom-syncora': '#60a5fa',
}

export function MarqueeCard({ project }: { project: Project }) {
  const [demoOpen, setDemoOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const accent = CARD_ACCENT[project.slug] ?? 'var(--lavender-purple)'

  const primaryLink = project.hasLiveDemo
    ? { label: 'Live demo', action: () => setDemoOpen(true), isButton: true }
    : project.demo
    ? { label: 'Demo', href: project.demo }
    : project.caseStudy
    ? { label: 'Case study', href: project.caseStudy }
    : { label: 'GitHub', href: project.github }

  return (
    <>
      <article
        className="relative flex flex-col justify-between shrink-0 rounded-2xl border overflow-hidden cursor-default"
        style={{
          width: '300px',
          height: '210px',
          padding: '22px',
          background: hovered
            ? `linear-gradient(135deg, var(--bg-elevated) 0%, #0a1234 100%)`
            : 'var(--bg-elevated)',
          borderColor: hovered ? accent : 'rgba(232,180,232,0.2)',
          boxShadow: hovered ? `0 0 28px ${accent}28` : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Color bar top */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: hovered ? accent : 'rgba(177,151,252,0.2)',
            transition: 'background 0.2s',
          }}
          aria-hidden
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-semibold text-sm leading-snug"
              style={{ color: hovered ? accent : 'var(--lavender-white)', transition: 'color 0.2s' }}
            >
              {project.name}
            </h3>
            {project.badge && (
              <span className="shrink-0 font-mono text-[10px] px-1.5 py-0.5 rounded border"
                style={{ color: 'var(--success)', borderColor: 'rgba(46,230,166,0.3)', background: 'rgba(46,230,166,0.08)' }}>
                {project.badge}
              </span>
            )}
            {project.hasLiveDemo && !project.badge && (
              <span className="shrink-0 flex items-center gap-1 font-mono text-[10px] px-1.5 py-0.5 rounded border"
                style={{ color: 'var(--success)', borderColor: 'rgba(46,230,166,0.3)', background: 'rgba(46,230,166,0.08)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Live
              </span>
            )}
          </div>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
            {project.tagline}
          </p>
        </div>

        <div className="flex items-end justify-between gap-2 mt-auto pt-3">
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 3).map((s) => (
              <Tag key={s} small>{s}</Tag>
            ))}
          </div>

          {primaryLink.isButton ? (
            <button
              onClick={primaryLink.action}
              className="shrink-0 text-xs font-medium flex items-center gap-1 transition-opacity hover:opacity-80"
              style={{ color: accent }}
            >
              {primaryLink.label} ↗
            </button>
          ) : (
            <a
              href={(primaryLink as { href: string }).href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-medium flex items-center gap-1 transition-opacity hover:opacity-80"
              style={{ color: accent }}
            >
              {primaryLink.label} ↗
            </a>
          )}
        </div>
      </article>

      {demoOpen && <XAIDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  )
}
