'use client'

import { useState, useEffect, useRef } from 'react'
import type { XAIResponse, XAIDemoState, XAIError } from '@/types/xai'
import { analyzeText, checkHealth } from '@/lib/xai-api'
import { DEMO_PREFILL } from '@/lib/data'
import { Button } from '@/components/ui/Button'
import { SkeletonLoader } from './SkeletonLoader'
import { TokenAttributions } from './TokenAttributions'
import { Counterfactual } from './Counterfactual'
import { ModelDivergence } from './ModelDivergence'

export function XAIDemo() {
  const [text, setText] = useState(DEMO_PREFILL)
  const [state, setState] = useState<XAIDemoState>('idle')
  const [result, setResult] = useState<XAIResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState<boolean | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    checkHealth().then(setIsOnline)
  }, [])

  async function handleAnalyze() {
    if (!text.trim() || state === 'loading') return
    setState('loading')
    setResult(null)
    setError(null)

    try {
      const data = await analyzeText(text.trim())
      setResult(data)
      setState('success')
    } catch (err) {
      const xaiErr = err as XAIError
      setError(xaiErr.message ?? 'Something went wrong.')
      setState(xaiErr.type === 'timeout' ? 'timeout' : 'error')
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
    if (state !== 'idle') {
      setState('idle')
      setResult(null)
      setError(null)
    }
  }

  return (
    <section
      id="xai-demo"
      className="py-24 px-6 border-t border-border/40"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto max-w-content">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h2
              id="demo-heading"
              className="text-lg font-semibold text-primary tracking-[-0.01em]"
            >
              Live demo -- XAI Forensics
            </h2>
            <span
              className={[
                'inline-flex items-center gap-1.5 font-mono text-xs px-2 py-1 rounded border',
                isOnline === null
                  ? 'text-muted border-border'
                  : isOnline
                  ? 'text-success border-success/30 bg-success/10'
                  : 'text-muted border-border bg-elevated',
              ].join(' ')}
              aria-live="polite"
            >
              <span
                className={[
                  'w-1.5 h-1.5 rounded-full',
                  isOnline === null
                    ? 'bg-muted'
                    : isOnline
                    ? 'bg-success animate-pulse'
                    : 'bg-muted',
                ].join(' ')}
                aria-hidden
              />
              {isOnline === null ? 'checking' : isOnline ? 'online' : 'offline'}
            </span>
          </div>
          <a
            href="https://github.com/parshvi1508/xai-forensics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors font-mono"
          >
            View source ↗
          </a>
        </div>

        {/* Demo card */}
        <div className="rounded-2xl border border-border bg-elevated p-6 sm:p-8 space-y-6">
          {/* Input */}
          <div className="space-y-3">
            <label htmlFor="xai-input" className="font-mono text-xs text-muted uppercase tracking-widest block">
              Input text
            </label>
            <textarea
              id="xai-input"
              ref={textareaRef}
              value={text}
              onChange={handleInputChange}
              rows={3}
              placeholder="Type a sentence to analyze..."
              className="w-full bg-sunken border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted font-mono resize-none focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all"
            />
            <div className="flex items-center justify-between">
              <Button
                onClick={handleAnalyze}
                disabled={!text.trim() || state === 'loading'}
                variant="accent"
                size="md"
                aria-label="Analyze text with XAI Forensics"
              >
                {state === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden />
                    Analyzing...
                  </>
                ) : (
                  'Analyze'
                )}
              </Button>
              {state === 'success' && result && (
                <span className="font-mono text-xs text-muted">
                  Analyzed in <span className="text-accent2">{result.latencyMs}ms</span>
                </span>
              )}
            </div>
          </div>

          {/* Results */}
          {state === 'loading' && <SkeletonLoader />}

          {(state === 'error' || state === 'timeout') && error && (
            <div
              className="p-4 rounded-xl border border-danger/30 bg-danger/10 text-sm text-danger font-mono"
              role="alert"
            >
              {error}
            </div>
          )}

          {state === 'success' && result && (
            <div className="space-y-4">
              <TokenAttributions
                attributions={result.attributions}
                prediction={result.prediction}
                confidence={result.confidence}
              />
              <Counterfactual result={result.counterfactual} />
              <ModelDivergence divergence={result.divergence} />
            </div>
          )}
        </div>

        {/* Caption */}
        <p className="mt-6 text-sm text-muted leading-relaxed max-w-prose font-mono border-l-2 border-border pl-4">
          Why this matters: most XAI tools surface attention weights as explanations. Attention is
          not faithful (Jain &amp; Wallace, 2019). This tool uses LIME perturbation +
          counterfactual removal + cross-model divergence instead.
        </p>
      </div>
    </section>
  )
}
