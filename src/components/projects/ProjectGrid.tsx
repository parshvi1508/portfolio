'use client'

import { useState } from 'react'
import { PROJECTS } from '@/lib/data'
import type { Project } from '@/lib/data'
import { MarqueeCard } from './MarqueeCard'
import { ProjectDialog } from './ProjectDialog'

const ROW1 = PROJECTS.slice(0, Math.ceil(PROJECTS.length / 2))
const ROW2 = PROJECTS.slice(Math.ceil(PROJECTS.length / 2))

export function ProjectGrid() {
  const [dialogProject, setDialogProject] = useState<Project | null>(null)

  return (
    <>
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
            Things I built.
          </h2>
        </div>

        <div
          className="relative w-full mb-5"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div
            className="flex gap-5 w-max"
            style={{ animation: 'marquee-left 28s linear infinite' }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {[...ROW1, ...ROW1].map((project, i) => (
              <MarqueeCard key={`r1-${i}`} project={project} onOpen={setDialogProject} />
            ))}
          </div>
        </div>

        <div
          className="relative w-full"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div
            className="flex gap-5 w-max"
            style={{ animation: 'marquee-right 32s linear infinite' }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {[...ROW2, ...ROW2].map((project, i) => (
              <MarqueeCard key={`r2-${i}`} project={project} onOpen={setDialogProject} />
            ))}
          </div>
        </div>
      </section>

      {dialogProject && (
        <ProjectDialog project={dialogProject} onClose={() => setDialogProject(null)} />
      )}
    </>
  )
}
