export interface TokenAttribution {
  token: string
  score: number
  position: number
}

export interface CounterfactualResult {
  original: string
  modified: string
  originalLabel: string
  modifiedLabel: string
  originalConfidence: number
  modifiedConfidence: number
  changedTokens: string[]
}

export interface ModelPrediction {
  model: string
  label: string
  confidence: number
}

export interface ModelDivergence {
  modelA: ModelPrediction
  modelB: ModelPrediction
  agreementScore: number
  interpretation: string
  divergentTokens: string[]
}

export interface XAIResponse {
  prediction: string
  confidence: number
  latencyMs: number
  attributions: TokenAttribution[]
  counterfactual: CounterfactualResult
  divergence: ModelDivergence
}

export type XAIDemoState = 'idle' | 'loading' | 'success' | 'error' | 'timeout'

export interface XAIError {
  type: 'timeout' | 'network' | 'server' | 'validation'
  message: string
}
