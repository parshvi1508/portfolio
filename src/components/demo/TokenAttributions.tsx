import type { TokenAttribution } from '@/types/xai'

interface TokenAttributionsProps {
  attributions: TokenAttribution[]
  prediction: string
  confidence: number
}

function tokenStyle(score: number): React.CSSProperties {
  const abs = Math.min(Math.abs(score), 1)
  if (score > 0.05) {
    return {
      backgroundColor: `rgba(46, 230, 166, ${abs * 0.35})`,
      color: '#2ee6a6',
      borderRadius: '4px',
      padding: '1px 4px',
    }
  }
  if (score < -0.05) {
    return {
      backgroundColor: `rgba(255, 92, 122, ${abs * 0.35})`,
      color: '#ff5c7a',
      borderRadius: '4px',
      padding: '1px 4px',
    }
  }
  return { padding: '1px 4px' }
}

export function TokenAttributions({ attributions, prediction, confidence }: TokenAttributionsProps) {
  const sorted = [...attributions].sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
  const top5 = sorted.slice(0, 5)

  return (
    <div className="p-5 rounded-xl border border-border bg-sunken space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted uppercase tracking-widest">
          Token attributions
        </span>
        <span className="font-mono text-xs text-secondary">
          {prediction}{' '}
          <span className="text-accent2">{(confidence * 100).toFixed(1)}%</span>
        </span>
      </div>

      {/* Inline highlighted sentence */}
      <div className="font-mono text-sm leading-relaxed flex flex-wrap gap-1">
        {attributions.map((a) => (
          <span
            key={a.position}
            style={tokenStyle(a.score)}
            title={`Score: ${a.score.toFixed(3)}`}
          >
            {a.token}
          </span>
        ))}
      </div>

      {/* Top 5 token table */}
      <div className="space-y-1.5">
        <span className="font-mono text-xs text-muted">Top 5 tokens</span>
        {top5.map((t) => (
          <div key={t.position} className="flex items-center gap-3">
            <span className="font-mono text-xs text-primary w-24 truncate">{t.token}</span>
            <div className="flex-1 h-1.5 rounded-full bg-elevated overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.abs(t.score) * 100}%`,
                  background: t.score > 0 ? 'var(--success)' : 'var(--danger)',
                }}
              />
            </div>
            <span
              className="font-mono text-xs w-16 text-right"
              style={{ color: t.score > 0 ? 'var(--success)' : 'var(--danger)' }}
            >
              {t.score > 0 ? '+' : ''}{t.score.toFixed(3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
