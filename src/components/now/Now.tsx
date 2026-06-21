import { NOW_CONTENT } from '@/lib/data'

export function Now() {
  const items = Object.values(NOW_CONTENT)

  return (
    <section id="now" className="py-24 px-6 border-t border-border/40" aria-labelledby="now-heading">
      <div className="mx-auto max-w-prose">
        <div className="mb-10">
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Now</span>
          <h2
            id="now-heading"
            className="mt-2 text-2xl font-semibold text-primary tracking-[-0.01em]"
          >
            What I am working on this week.
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {items.map((item) => (
            <div key={item.label}>
              <span className="font-mono text-xs text-accent tracking-wider uppercase">
                {item.label}
              </span>
              <p className="mt-2 text-base text-secondary leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
