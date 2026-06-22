'use client'

import { useState } from 'react'
import { META } from '@/lib/data'

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText(META.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <footer
      id="contact"
      className="py-20 px-6 border-t"
      style={{ borderColor: 'rgba(232,180,232,0.2)' }}
      aria-label="Contact and footer"
    >
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-12">
          <div>
            <h2
              className="font-script text-4xl sm:text-5xl leading-tight"
              style={{ color: 'var(--accent2)' }}
            >
              Let&apos;s build something interrogatable.
            </h2>
            <p className="mt-3 text-base sm:text-lg max-w-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Because a model nobody can check is a model nobody will use.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className="flex flex-col gap-1 p-4 rounded-xl border"
              style={{ borderColor: 'rgba(232,180,232,0.2)', background: 'var(--bg-elevated)' }}
            >
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
                Email
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--lavender-white)' }}>
                {META.email}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-all hover:opacity-80"
                  style={{ color: copied ? 'var(--success)' : 'var(--accent)' }}
                  aria-label="Copy email address"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <span style={{ color: 'var(--text-muted)' }} className="text-xs">|</span>
                <a
                  href={`mailto:${META.email}`}
                  className="text-xs transition-opacity hover:opacity-80"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Open in mail
                </a>
              </div>
            </div>

            <a
              href={META.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 p-4 rounded-xl border transition-all hover:-translate-y-0.5"
              style={{ borderColor: 'rgba(232,180,232,0.2)', background: 'var(--bg-elevated)' }}
            >
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
                LinkedIn
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--lavender-white)' }}>
                in/parshvi1508
              </span>
            </a>

            <a
              href={META.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 p-4 rounded-xl border transition-all hover:-translate-y-0.5"
              style={{ borderColor: 'rgba(232,180,232,0.2)', background: 'var(--bg-elevated)' }}
            >
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
                GitHub
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--lavender-white)' }}>
                parshvi1508
              </span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 p-4 rounded-xl border transition-all hover:-translate-y-0.5"
              style={{ borderColor: 'rgba(232,180,232,0.2)', background: 'var(--bg-elevated)' }}
            >
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
                Resume
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--lavender-white)' }}>
                Download PDF
              </span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t" style={{ borderColor: 'rgba(232,180,232,0.12)' }}>
            <a
              href={META.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--accent)' }}
            >
              Book a call
              <span aria-hidden>→</span>
            </a>
            <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              Parshvi Jain &copy; 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
