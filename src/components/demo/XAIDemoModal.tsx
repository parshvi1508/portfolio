'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const XAIDemo = dynamic(
  () => import('@/components/demo/XAIDemo').then((m) => ({ default: m.XAIDemo })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-24 text-sm text-muted font-mono">
        Loading demo...
      </div>
    ),
  }
)

interface XAIDemoModalProps {
  onClose: () => void
}

export function XAIDemoModal({ onClose }: XAIDemoModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(6,11,36,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="XAI Forensics live demo"
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-[#0e1838] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-elevated border border-border text-muted hover:text-primary hover:border-accent/50 transition-all"
          aria-label="Close demo"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <XAIDemo />
      </div>
    </div>
  )
}
