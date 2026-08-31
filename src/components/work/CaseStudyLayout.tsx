import Link from 'next/link'
import { Nav } from '@/components/nav/Nav'
import { Tag } from '@/components/ui/Tag'
import { Contact } from '@/components/contact/Contact'

interface Decision {
  readonly title: string
  readonly content: string
}

interface CaseStudyData {
  name: string
  tagline: string
  problem: string
  approach: string
  decisions: readonly Decision[]
  results: readonly string[]
  wouldDoDifferently: readonly string[]
  stack: readonly string[]
  github?: string
  demo?: string
  paper?: string
}

interface CaseStudyLayoutProps {
  data: CaseStudyData
}

export function CaseStudyLayout({ data }: CaseStudyLayoutProps) {
  return (
    <>
      <Nav />
      <main className="px-6 pb-24">
        <div className="mx-auto max-w-prose pt-16">
          {/* Back link */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary font-mono transition-colors mb-10"
          >
            <span aria-hidden>←</span>
            All work
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {data.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-primary tracking-[-0.02em] leading-tight mb-4">
              {data.name}
            </h1>
            <p className="text-lg text-secondary leading-snug">{data.tagline}</p>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-6">
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-accent hover:text-accent2 transition-colors"
                >
                  GitHub ↗
                </a>
              )}
              {data.demo && (
                <a
                  href={data.demo}
                  className="text-sm font-mono text-accent hover:text-accent2 transition-colors"
                >
                  Live demo ↗
                </a>
              )}
              {data.paper && (
                <a
                  href={data.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-accent hover:text-accent2 transition-colors"
                >
                  Paper ↗
                </a>
              )}
            </div>
          </div>

          {/* Problem */}
          <Section label="Problem">
            <p className="text-base text-secondary leading-relaxed">{data.problem}</p>
          </Section>

          {/* Approach */}
          <Section label="Approach">
            <p className="text-base text-secondary leading-relaxed">{data.approach}</p>
          </Section>

          {/* Decisions */}
          <Section label="Decisions I would defend">
            <div className="space-y-5">
              {data.decisions.map((d, i) => (
                <div key={i} className="p-5 rounded-xl border border-border bg-elevated">
                  <h3 className="text-sm font-semibold text-primary mb-2">
                    <span className="text-accent font-mono mr-2">{i + 1}.</span>
                    {d.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">{d.content}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Results */}
          <Section label="Results">
            <ul className="space-y-2">
              {data.results.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                  <span className="text-success font-mono mt-0.5 shrink-0">+</span>
                  {r}
                </li>
              ))}
            </ul>
          </Section>

          {/* What I'd do differently */}
          <Section label="What I would do differently">
            <ul className="space-y-2">
              {data.wouldDoDifferently.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                  <span className="text-muted font-mono mt-0.5 shrink-0">{i + 1}.</span>
                  {r}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>
      <Contact />
    </>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-4">
        {label}
      </span>
      {children}
    </div>
  )
}
