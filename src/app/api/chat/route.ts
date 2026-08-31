import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/data'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: 'Chat not configured' }, { status: 503 })
  }

  let body: { messages?: Array<{ role: 'user' | 'assistant'; content: string }> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const messages = body.messages
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages required' }, { status: 422 })
  }

  const lastMessage = messages[messages.length - 1]
  if (!lastMessage?.content || lastMessage.content.length > 500) {
    return NextResponse.json({ error: 'Message too long or empty' }, { status: 422 })
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: CHATBOT_SYSTEM_PROMPT },
        ...messages.slice(-6),
      ],
      max_tokens: 300,
      temperature: 0.6,
    })

    const text = completion.choices[0]?.message?.content ?? ''
    return NextResponse.json({ reply: text })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
