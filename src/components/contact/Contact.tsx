import { META } from '@/lib/data'

export function Contact() {
  return (
    <footer
      id="contact"
      className="py-20 px-6 border-t"
      style={{ borderColor: 'rgba(232,180,232,0.2)' }}
      aria-label="Contact and footer"
    >
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-12">
          {/* Cursive headline */}
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

          {/* Contact handles grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href={`mailto:${META.email}`}
              className="flex flex-col gap-1 p-4 rounded-xl border transition-all hover:-translate-y-0.5"
              style={{ borderColor: 'rgba(232,180,232,0.2)', background: 'var(--bg-elevated)' }}
            >
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--lavender-pink)' }}>
                Email
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--lavender-white)' }}>
                {META.email}
              </span>
            </a>

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

          {/* Bottom row */}
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
