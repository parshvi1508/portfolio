import type { ModelDivergence as ModelDivergenceType } from '@/types/xai'

interface ModelDivergenceProps {
  divergence: ModelDivergenceType
}

function ConfidenceBar({
  label,
  prediction,
  confidence,
  color,
}: {
  label: string
  prediction: string
  confidence: number
  color: string
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted">{label}</span>
        <span className="font-mono text-xs" style={{ color }}>
          {prediction} {(confidence * 100).toFixed(1)}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-elevated overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${confidence * 100}%`, background: color }}
        />
      </div>
    </div>
  )
}

export function ModelDivergence({ divergence }: ModelDivergenceProps) {
  const agreementPct = Math.round(divergence.agreementScore * 100)
  const isDisagreement = agreementPct < 70

  return (
    <div className="p-5 rounded-xl border border-border bg-sunken space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted uppercase tracking-widest">
          Model divergence
        </span>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded border"
          style={{
            color: isDisagreement ? 'var(--danger)' : 'var(--success)',
            borderColor: isDisagreement ? 'rgba(255,92,122,0.3)' : 'rgba(46,230,166,0.3)',
            background: isDisagreement ? 'rgba(255,92,122,0.1)' : 'rgba(46,230,166,0.1)',
          }}
        >
          {agreementPct}% agreement
        </span>
      </div>

      <div className="space-y-3">
        <ConfidenceBar
          label={divergence.modelA.model}
          prediction={divergence.modelA.label}
          confidence={divergence.modelA.confidence}
          color="var(--accent)"
        />
        <ConfidenceBar
          label={divergence.modelB.model}
          prediction={divergence.modelB.label}
          confidence={divergence.modelB.confidence}
          color="var(--accent2)"
        />
      </div>

      <p className="text-xs text-secondary italic leading-relaxed">
        {divergence.interpretation}
      </p>

      {divergence.divergentTokens.length > 0 && (
        <div className="text-xs text-muted font-mono">
          Divergent tokens:{' '}
          {divergence.divergentTokens.map((t) => (
            <span key={t} className="text-accent2 mx-0.5">
              [{t}]
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
