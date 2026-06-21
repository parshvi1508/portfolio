import { EXPERIENCE } from '@/lib/data'
import { Tag } from '@/components/ui/Tag'

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6 border-t" style={{ borderColor: 'rgba(232,180,232,0.2)' }} aria-labelledby="exp-heading">
      <div className="mx-auto max-w-prose">
        <div className="mb-10">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
            Experience
          </span>
          <h2 id="exp-heading" className="mt-2 font-script text-4xl" style={{ color: 'var(--lavender-purple)' }}>
            Where I have shipped.
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px hidden sm:block"
            style={{ background: 'rgba(232,180,232,0.3)' }}
            aria-hidden
          />

          <div className="space-y-10">
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="sm:pl-8 relative">
                {/* Timeline dot */}
                <div
                  className="hidden sm:block absolute left-0 top-2 w-2.5 h-2.5 rounded-full -translate-x-[5px] border-2"
                  style={{
                    background: 'var(--lavender-pink)',
                    borderColor: 'var(--bg)',
                    boxShadow: '0 0 8px rgba(232,180,232,0.4)',
                  }}
                  aria-hidden
                />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-base" style={{ color: 'var(--lavender-white)' }}>
                        {job.company}
                      </h3>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--lavender-purple)' }}>{job.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{job.period}</p>
                    <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{job.location}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-3">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span className="font-mono mt-1 shrink-0 text-xs" style={{ color: 'var(--lavender-pink)' }}>+</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
