'use client'

import { PROJECTS } from '@/lib/data'
import { MarqueeCard } from './MarqueeCard'

const ROW1 = PROJECTS.slice(0, Math.ceil(PROJECTS.length / 2))
const ROW2 = PROJECTS.slice(Math.ceil(PROJECTS.length / 2))

export function ProjectGrid() {
  return (
    <section id="work" className="py-24 overflow-hidden" aria-labelledby="work-heading">
      <div className="px-6 mx-auto max-w-content mb-10">
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
          Selected work
        </span>
        <h2
          id="work-heading"
          className="mt-2 font-script text-4xl"
          style={{ color: 'var(--lavender-purple)' }}
        >
          Projects that ship.
        </h2>
      </div>

      {/* Row 1: scrolls left */}
      <div
        className="relative w-full mb-5 group/row1"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <div
          className="flex gap-5 w-max"
          style={{
            animation: 'marquee-left 28s linear infinite',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {[...ROW1, ...ROW1].map((project, i) => (
            <MarqueeCard key={`r1-${i}`} project={project} />
          ))}
        </div>
      </div>

      {/* Row 2: scrolls right */}
      <div
        className="relative w-full"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <div
          className="flex gap-5 w-max"
          style={{
            animation: 'marquee-right 32s linear infinite',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {[...ROW2, ...ROW2].map((project, i) => (
            <MarqueeCard key={`r2-${i}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
