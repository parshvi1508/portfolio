'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tag } from '@/components/ui/Tag'
import { XAIDemoModal } from '@/components/demo/XAIDemoModal'
import type { Project } from '@/lib/data'

interface ProjectCardProps {
  project: Project
  index: number
}

const TILT_ANGLES = [-1.5, 1, -0.8, 1.2, -1, 0.7]

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [demoOpen, setDemoOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const tilt = TILT_ANGLES[index % TILT_ANGLES.length]

  return (
    <>
      <article
        className="group relative flex flex-col gap-4 p-6 rounded-2xl border cursor-default"
        style={{
          background: 'linear-gradient(145deg, var(--bg-elevated) 0%, #0a1128 100%)',
          borderColor: hovered ? 'rgba(177,151,252,0.55)' : 'rgba(232,180,232,0.22)',
          transform: hovered ? 'rotate(0deg) translateY(-4px)' : `rotate(${tilt}deg)`,
          boxShadow: hovered
            ? '0 16px 48px rgba(177,151,252,0.18), 0 2px 8px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.25)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.2s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full"
          style={{
            background: hovered
              ? 'linear-gradient(90deg, var(--lavender-purple), var(--lavender-pink))'
              : 'rgba(177,151,252,0.2)',
            transition: 'background 0.25s ease',
          }}
          aria-hidden
        />

        {/* Badges */}
        {project.badge && (
          <span className="absolute top-4 right-4 font-mono text-xs text-success border border-success/30 bg-success/10 px-2 py-0.5 rounded">
            {project.badge}
          </span>
        )}
        {project.hasLiveDemo && !project.badge && (
          <span className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-xs text-success border border-success/30 bg-success/10 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden />
            Live
          </span>
        )}

        <div className="flex flex-col gap-2 pt-2">
          <h3
            className="font-semibold text-base leading-snug transition-colors"
            style={{ color: hovered ? 'var(--lavender-purple)' : 'var(--lavender-white)' }}
          >
            {project.name}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.slice(0, 4).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        {/* Action links */}
        <div className="flex flex-wrap items-center gap-3 mt-1">
          {project.hasLiveDemo && (
            <button
              onClick={() => setDemoOpen(true)}
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: 'var(--lavender-purple)' }}
            >
              Try live demo
              <span aria-hidden>↗</span>
            </button>
          )}
          {project.caseStudy && (
            <Link
              href={project.caseStudy}
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: 'var(--accent)' }}
              aria-label={`Read ${project.name} case study`}
            >
              Case study
              <span aria-hidden>→</span>
            </Link>
          )}
          {project.demo && !project.hasLiveDemo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: 'var(--lavender-purple)' }}
            >
              Demo
              <span aria-hidden>↗</span>
            </a>
          )}
          {project.paper && (
            <a
              href={project.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              IEEE paper
              <span aria-hidden>↗</span>
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm transition-colors ml-auto"
            style={{ color: 'var(--text-muted)' }}
            aria-label={`GitHub: ${project.name}`}
          >
            GitHub
            <span aria-hidden>↗</span>
          </a>
        </div>
      </article>

      {demoOpen && <XAIDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  )
}
