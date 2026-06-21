'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { META } from '@/lib/data'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/#work"
            className="text-sm text-secondary hover:text-primary px-3 py-1.5 rounded-md hover:bg-elevated transition-all"
          >
            Work
          </Link>
          <Link
            href="/#experience"
            className="hidden sm:block text-sm text-secondary hover:text-primary px-3 py-1.5 rounded-md hover:bg-elevated transition-all"
          >
            Experience
          </Link>
          <Link
            href="/#now"
            className="hidden sm:block text-sm text-secondary hover:text-primary px-3 py-1.5 rounded-md hover:bg-elevated transition-all"
          >
            Now
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary px-3 py-1.5 rounded-md hover:bg-elevated transition-all"
          >
            Resume
            <span aria-hidden className="ml-1 text-muted text-xs">↗</span>
          </a>
          <a
            href={META.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center text-sm font-medium px-4 py-2 rounded-lg bg-accent text-[#060b24] hover:bg-accent2 hover:shadow-[0_0_16px_rgba(157,123,255,0.4)] transition-all duration-200 active:scale-[0.98]"
          >
            Book a call
          </a>
        </div>
      </nav>
    </header>
  )
}
