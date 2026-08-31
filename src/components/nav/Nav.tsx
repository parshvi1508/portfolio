'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { META } from '@/lib/data'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

const NAV_LINKS = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#work', label: 'Work' },
  { href: '/#now', label: 'Now' },
  { href: '/resume.pdf', label: 'Resume', external: true },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    setIsDark(stored !== 'light')
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-border/60'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className="mx-auto max-w-content px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-mono text-sm font-semibold text-primary tracking-wider hover:text-accent transition-colors"
          aria-label="Parshvi Jain home"
        >
          PJ
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="text-sm text-secondary hover:text-primary px-3 py-1.5 rounded-md hover:bg-elevated transition-all"
            >
              {l.label}
              {l.external && <span aria-hidden className="ml-1 text-muted text-xs">↗</span>}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-1 p-2 rounded-md text-secondary hover:text-primary hover:bg-elevated transition-all"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href={META.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center text-sm font-medium px-4 py-2 rounded-lg bg-accent text-[#060b24] hover:bg-accent2 hover:shadow-[0_0_16px_rgba(157,123,255,0.4)] transition-all duration-200 active:scale-[0.98]"
          >
            Book a call
          </a>
        </div>

        {/* Mobile: theme toggle + book + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-md text-secondary hover:text-primary transition-colors"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href={META.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-accent text-[#060b24] hover:bg-accent2 transition-all"
          >
            Book a call
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-md text-secondary hover:text-primary transition-colors"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div
          className="sm:hidden border-t px-6 py-4 flex flex-col gap-1"
          style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-secondary hover:text-primary px-3 py-2 rounded-md hover:bg-elevated transition-all"
            >
              {l.label}
              {l.external && <span aria-hidden className="ml-1 text-muted text-xs">↗</span>}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
