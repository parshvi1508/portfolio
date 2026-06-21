import type { CounterfactualResult } from '@/types/xai'

interface CounterfactualProps {
  result: CounterfactualResult
}

function labelColor(label: string) {
  const l = label.toLowerCase()
  if (l === 'positive') return 'text-success'
  if (l === 'negative') return 'text-danger'
  return 'text-secondary'
}

export function Counterfactual({ result }: CounterfactualProps) {
  return (
    <div className="p-5 rounded-xl border border-border bg-sunken space-y-4">
      <span className="font-mono text-xs text-muted uppercase tracking-widest">
        Counterfactual
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Original */}
        <div className="p-4 rounded-lg border border-border bg-elevated">
          <span className="font-mono text-xs text-muted block mb-2">Original</span>
          <p className="text-sm text-primary leading-relaxed">{result.original}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className={`font-mono text-xs font-medium ${labelColor(result.originalLabel)}`}>
              {result.originalLabel}
            </span>
            <span className="font-mono text-xs text-muted">
              {(result.originalConfidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Counterfactual */}
        <div className="p-4 rounded-lg border border-accent/30 bg-accent-muted">
          <span className="font-mono text-xs text-accent block mb-2">Counterfactual</span>
          <p className="text-sm text-primary leading-relaxed">{result.modified}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className={`font-mono text-xs font-medium ${labelColor(result.modifiedLabel)}`}>
              {result.modifiedLabel}
            </span>
            <span className="font-mono text-xs text-muted">
              {(result.modifiedConfidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {result.changedTokens.length > 0 && (
        <div className="text-xs text-muted font-mono">
          Tokens removed:{' '}
          {result.changedTokens.map((t) => (
            <span key={t} className="text-danger mx-0.5">
              [{t}]
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
