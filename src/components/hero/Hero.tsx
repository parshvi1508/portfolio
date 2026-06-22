import Image from 'next/image'
import { LinkButton } from '@/components/ui/Button'
import { META } from '@/lib/data'
import { HeroAnimated, HeroItem } from './HeroAnimated'
import { TypewriterTagline } from './TypewriterTagline'

export function Hero() {
  return (
    <section
      className="relative flex flex-col items-center text-center pt-20 pb-28 px-6 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(157,123,255,0.18) 0%, transparent 70%)',
        }}
      />

      <HeroAnimated>
        <HeroItem>
          <div className="flex justify-center mt-2">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: '0 0 80px rgba(157,123,255,0.6)' }}
                aria-hidden
              />
              <Image
                src="/photo.jpeg"
                alt="Parshvi Jain"
                width={200}
                height={200}
                className="rounded-full border-2 relative z-10 object-cover"
                style={{ borderColor: 'var(--accent)', aspectRatio: '1 / 1' }}
                priority
              />
            </div>
          </div>
        </HeroItem>

        <HeroItem>
          <div className="select-none mt-1">
            <div
              className="font-script text-4xl sm:text-5xl mb-2"
              style={{
                background: 'linear-gradient(120deg, #b197fc 0%, #f0c0f8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Hello, I&apos;m
            </div>
            <h1
              id="hero-heading"
              className="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-[-0.02em] leading-[1.0]"
            >
              <span style={{ color: 'var(--text-primary)' }}>Parshvi </span>
              <span
                style={{
                  background: 'linear-gradient(90deg, #9d7bff 0%, #c4a3ff 40%, #76ffb4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Jain
              </span>
            </h1>
          </div>
        </HeroItem>

        <HeroItem>
          <TypewriterTagline />
        </HeroItem>

        <HeroItem>
          <p className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
            I got obsessed with the gap between &ldquo;the model said so&rdquo; and &ldquo;here&rsquo;s why&rdquo;
            &mdash; and spent the last year building my way into it. IEEE-published, production-tested,
            and the person who asks &ldquo;but can we verify that?&rdquo; in every design review.
          </p>
        </HeroItem>

        <HeroItem>
          <div className="flex flex-col items-center gap-1 mt-1">
            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              Ghaziabad, India &middot; Open to remote / relocation
            </p>
            <p className="font-mono text-xs" style={{ color: 'var(--lavender-pink)' }}>
              Open to Applied AI &middot; ML Engineer &middot; FDE roles
            </p>
          </div>
        </HeroItem>

        <HeroItem>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <LinkButton href="#work" variant="accent" size="lg">
              See the work
              <span aria-hidden> ↓</span>
            </LinkButton>
            <LinkButton
              href={META.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              Book a call
            </LinkButton>
          </div>
        </HeroItem>
      </HeroAnimated>
    </section>
  )
}
