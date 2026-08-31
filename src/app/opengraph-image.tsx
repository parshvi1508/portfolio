import { ImageResponse } from 'next/og'
import { META } from '@/lib/data'

export const runtime = 'edge'
export const alt = META.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#060b24',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontFamily: 'system-ui',
            fontSize: '14px',
            color: '#2ee6a6',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          Applied AI Engineer
        </div>
        <div
          style={{
            fontFamily: 'system-ui',
            fontSize: '72px',
            fontWeight: 600,
            color: '#eff3ff',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}
        >
          {META.name}
        </div>
        <div
          style={{
            fontFamily: 'system-ui',
            fontSize: '24px',
            color: '#a6b3d6',
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          I ship ML systems with the explainability layer baked in.
        </div>
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
            gap: '32px',
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#647199',
          }}
        >
          <span>2.2% MAPE | IEEE 2025</span>
          <span>·</span>
          <span>50+ REST endpoints</span>
          <span>·</span>
          <span>Live XAI demo</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
