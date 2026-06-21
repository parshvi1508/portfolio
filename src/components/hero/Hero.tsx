import Image from 'next/image'
import { StatusPill } from '@/components/ui/StatusPill'
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
      {/* Background radial glow */}
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
          <StatusPill label="Available for Applied AI / FDE roles" />
        </HeroItem>

        {/* Centered photo */}
        <HeroItem>
          <div className="flex justify-center mt-2">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: '0 0 40px rgba(157,123,255,0.5)' }}
                aria-hidden
              />
              <Image
                src="/photo.jpeg"
                alt="Parshvi Jain"
                width={112}
                height={112}
                className="rounded-full border-2 relative z-10"
                style={{ borderColor: 'var(--accent)' }}
                priority
              />
            </div>
          </div>
        </HeroItem>

        {/* Centered name block */}
        <HeroItem>
          <div className="select-none mt-1">
            <div
              className="font-script text-4xl sm:text-5xl font-normal leading-tight"
              style={{ color: 'var(--accent2)' }}
            >
              Hello, I&apos;m
            </div>
            <h1
              id="hero-heading"
              className="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-[-0.02em] leading-[1.0] mt-0"
            >
              <span className="text-primary">Parshvi </span>
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
          <p className="text-lg sm:text-xl text-secondary max-w-lg mx-auto leading-snug mt-1">
            Applied AI engineer. I ship ML systems with the explainability layer baked in.
          </p>
        </HeroItem>

        <HeroItem>
          <p className="text-base text-muted max-w-md mx-auto leading-relaxed">
            IEEE-published renewable energy forecasting (2.2% MAPE). XAI Forensics live below.
            Backend and ML at startups in travel and healthcare AI.
          </p>
        </HeroItem>

        <HeroItem>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <LinkButton href="#work" variant="accent" size="lg">
              See the work
              <span aria-hidden>↓</span>
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
