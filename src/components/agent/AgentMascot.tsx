'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { MASCOT_MESSAGES } from '@/lib/data'

type MochiState = 'default' | 'wave' | 'think' | 'code' | 'salute' | 'celebrate' | 'sleep'

const MOCHI_IMAGES: Record<MochiState, string> = {
  default: '/mochi_default.png',
  wave: '/mochi_wave.png',
  think: '/mochi_think.png',
  code: '/mochi_code.png',
  salute: '/mochi_salute.png',
  celebrate: '/mochi_party.png',
  sleep: '/mochi_sleep.png',
}

const ANIM_CLASS: Record<MochiState, string> = {
  default: 'animate-float',
  wave: 'animate-wave',
  think: 'animate-look',
  code: 'animate-float-slow',
  salute: 'animate-float',
  celebrate: 'animate-celebrate',
  sleep: 'animate-float-slow opacity-50',
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SLEEP_AFTER_MS = 45_000
const MESSAGE_INTERVAL_MS = 12_000

export function AgentMascot() {
  const [mochiState, setMochiState] = useState<MochiState>('default')
  const [sectionState, setSectionState] = useState<MochiState>('default')
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Parshvi's portfolio assistant. Ask me anything: projects, experience, research, or how to get in touch.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [showBubble, setShowBubble] = useState(false)

  const sleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const messageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const resetSleepTimer = useCallback(() => {
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current)
    sleepTimerRef.current = setTimeout(() => {
      if (!chatOpen) {
        setMochiState('sleep')
        setShowBubble(false)
      }
    }, SLEEP_AFTER_MS)
  }, [chatOpen])

  const wakeUp = useCallback(() => {
    setMochiState((prev) => {
      if (prev === 'sleep') return sectionState
      return prev
    })
    resetSleepTimer()
  }, [resetSleepTimer, sectionState])

  useEffect(() => {
    window.addEventListener('mousemove', wakeUp, { passive: true })
    window.addEventListener('keydown', wakeUp, { passive: true })
    resetSleepTimer()
    return () => {
      window.removeEventListener('mousemove', wakeUp)
      window.removeEventListener('keydown', wakeUp)
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current)
    }
  }, [wakeUp, resetSleepTimer])

  // IntersectionObserver: section-based state
  useEffect(() => {
    const SECTION_MAP: Record<string, MochiState> = {
      work: 'code',
      projects: 'code',
      contact: 'wave',
      now: 'think',
      achievements: 'default',
      positions: 'default',
      education: 'default',
      experience: 'default',
    }

    const observers: IntersectionObserver[] = []

    Object.entries(SECTION_MAP).forEach(([id, state]) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSectionState(state)
            setMochiState((prev) => (prev !== 'sleep' && prev !== 'celebrate' && prev !== 'salute' ? state : prev))
          }
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Footer visible = sleep
  useEffect(() => {
    const footer = document.getElementById('contact')
    if (!footer) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !chatOpen) {
          setMochiState('sleep')
          setShowBubble(false)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(footer)
    return () => obs.disconnect()
  }, [chatOpen])

  // Resume salute
  useEffect(() => {
    const resumeLinks = document.querySelectorAll('a[href="/resume.pdf"]')
    function onEnter() {
      setMochiState('salute')
      setTimeout(() => setMochiState(sectionState), 2000)
    }
    resumeLinks.forEach((el) => el.addEventListener('mouseenter', onEnter))
    return () => resumeLinks.forEach((el) => el.removeEventListener('mouseenter', onEnter))
  }, [sectionState])

  // Speech bubble
  useEffect(() => {
    if (chatOpen || mochiState === 'sleep') return
    messageTimerRef.current = setTimeout(() => {
      setMessageIndex((i) => (i + 1) % MASCOT_MESSAGES.length)
      setShowBubble(true)
      setTimeout(() => setShowBubble(false), 3500)
    }, MESSAGE_INTERVAL_MS)
    return () => { if (messageTimerRef.current) clearTimeout(messageTimerRef.current) }
  }, [messageIndex, mochiState, chatOpen])

  useEffect(() => {
    if (chatOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatOpen])

  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 100)
  }, [chatOpen])

  function handleToggleChat() {
    setChatOpen((prev) => !prev)
    setShowBubble(false)
    if (!chatOpen) {
      setMochiState('wave')
      setTimeout(() => setMochiState(sectionState), 1200)
    }
    resetSleepTimer()
  }

  async function handleSend() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
        setMochiState('celebrate')
        setTimeout(() => setMochiState(sectionState), 1500)
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Something went wrong. Try again.' }])
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Could not reach the server.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isBubbleVisible = (showBubble && !chatOpen) || (mochiState === 'sleep' && !chatOpen)
  const bubbleText = mochiState === 'sleep' ? 'z z z' : MASCOT_MESSAGES[messageIndex]

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {chatOpen && (
        <div
          className="w-[calc(100vw-2rem)] sm:w-[340px] max-h-[480px] flex flex-col rounded-2xl border border-border bg-elevated shadow-[0_8px_48px_rgba(0,0,0,0.5)] overflow-hidden"
          role="dialog"
          aria-label="Chat with Parshvi's portfolio assistant"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-sunken shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden />
              <span className="font-mono text-xs text-primary font-medium">Portfolio Assistant</span>
            </div>
            <button
              onClick={handleToggleChat}
              className="text-muted hover:text-primary transition-colors p-1 rounded-md hover:bg-elevated"
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={[
                    'max-w-[85%] text-sm leading-relaxed px-3 py-2 rounded-xl',
                    msg.role === 'user'
                      ? 'bg-accent text-[#060b24] font-medium rounded-br-sm'
                      : 'bg-sunken text-secondary border border-border rounded-bl-sm',
                  ].join(' ')}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-sunken border border-border px-3 py-2 rounded-xl rounded-bl-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 p-3 border-t border-border bg-sunken shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about projects, skills..."
              maxLength={500}
              className="flex-1 bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors font-sans"
              aria-label="Chat input"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="shrink-0 bg-accent text-[#060b24] rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent2 disabled:opacity-40 disabled:pointer-events-none transition-all"
              aria-label="Send message"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L1 7l5 2 2 5 5-13z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mascot row */}
      <div className="flex flex-col items-center gap-2">
        {isBubbleVisible && (
          <div className="relative">
            <div className="bg-elevated border border-border rounded-xl px-3 py-2 text-xs font-mono text-secondary max-w-[160px] text-center shadow-lg whitespace-nowrap">
              {bubbleText}
            </div>
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-elevated border-r border-b border-border rotate-45"
              aria-hidden
            />
          </div>
        )}

        <button
          onClick={handleToggleChat}
          className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-full"
          aria-label={chatOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
          onMouseEnter={() => {
            if (mochiState !== 'celebrate' && mochiState !== 'sleep') {
              setMochiState('wave')
            }
          }}
          onMouseLeave={() => {
            if (mochiState === 'wave') setMochiState(sectionState)
          }}
        >
          {chatOpen && (
            <span
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ boxShadow: '0 0 20px rgba(157,123,255,0.5)' }}
              aria-hidden
            />
          )}
          <div className={`transition-all duration-300 ${ANIM_CLASS[mochiState]}`}>
            <Image
              src={MOCHI_IMAGES[mochiState]}
              alt="Portfolio assistant"
              width={72}
              height={72}
              className="select-none drop-shadow-lg"
              priority={false}
            />
          </div>
        </button>
      </div>
    </div>
  )
}
