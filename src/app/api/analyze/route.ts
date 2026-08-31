import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_XAI_API_URL

export async function POST(req: NextRequest) {
  if (!API_URL) {
    return NextResponse.json({ error: 'API not configured' }, { status: 503 })
  }

  let body: { text?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.text || typeof body.text !== 'string' || body.text.trim().length === 0) {
    return NextResponse.json({ error: 'text is required' }, { status: 422 })
  }

  if (body.text.length > 2000) {
    return NextResponse.json({ error: 'Input too long' }, { status: 422 })
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const upstream = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: body.text.trim() }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    const data = await upstream.json()

    return NextResponse.json(data, { status: upstream.status })
  } catch (err) {
    clearTimeout(timeoutId)
    if ((err as Error).name === 'AbortError') {
      return NextResponse.json({ error: 'Upstream timeout' }, { status: 504 })
    }
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
  }
}
