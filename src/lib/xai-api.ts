import type { XAIResponse, XAIError } from '@/types/xai'

const TIMEOUT_MS = 3000

export async function analyzeText(text: string): Promise<XAIResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  const startTime = performance.now()

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    })

    const latencyMs = Math.round(performance.now() - startTime)

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      const err: XAIError = {
        type: res.status >= 500 ? 'server' : 'validation',
        message:
          res.status === 422
            ? 'Input too long. Try a shorter sentence.'
            : `Backend error (${res.status}). Check the GitHub repo for status.`,
      }
      throw err
    }

    const data = await res.json()
    return { ...data, latencyMs } as XAIResponse
  } catch (err) {
    clearTimeout(timeoutId)
    if ((err as Error).name === 'AbortError') {
      const xaiErr: XAIError = {
        type: 'timeout',
        message: 'The model took too long. The API may be cold-starting -- try again in a few seconds.',
      }
      throw xaiErr
    }
    if ((err as XAIError).type) throw err
    const xaiErr: XAIError = {
      type: 'network',
      message: 'Could not reach the API. Check your connection.',
    }
    throw xaiErr
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch('/api/health', { next: { revalidate: 30 } } as RequestInit)
    if (!res.ok) return false
    const data = await res.json()
    return data.online === true
  } catch {
    return false
  }
}
