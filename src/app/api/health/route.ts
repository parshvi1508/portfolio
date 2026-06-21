import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_XAI_API_URL

export async function GET() {
  if (!API_URL) {
    return NextResponse.json({ online: false }, { status: 200 })
  }

  try {
    const res = await fetch(`${API_URL}/health`, {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(3000),
    })
    return NextResponse.json({ online: res.ok }, { status: 200 })
  } catch {
    return NextResponse.json({ online: false }, { status: 200 })
  }
}
