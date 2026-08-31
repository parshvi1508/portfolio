import { LinkButton } from '@/components/ui/Button'
import { META } from '@/lib/data'

export function CTASection() {
  return (
    <section
      className="relative py-28 px-6 overflow-hidden border-t"
      style={{ borderColor: 'rgba(232,180,232,0.2)' }}
      aria-labelledby="cta-heading"
    >
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(177,151,252,0.1) 0%, rgba(6,11,36,0) 65%)',
        }}
      />

      <div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-6">
        <h2
          id="cta-heading"
          className="font-script text-4xl sm:text-5xl leading-tight"
          style={{ color: 'var(--accent2)' }}
        >
          Open to the right role.
        </h2>

        <p className="text-base sm:text-lg max-w-md leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Available for Applied AI, Founding ML, and Forward Deployed Engineer roles. Global remote.
          Ask the assistant below, or book a call.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <LinkButton
            href={META.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="accent"
            size="lg"
          >
            Book a call
          </LinkButton>
          <LinkButton
            href={`mailto:${META.email}`}
            variant="outline"
            size="lg"
          >
            Send an email
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
