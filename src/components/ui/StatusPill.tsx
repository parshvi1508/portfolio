interface StatusPillProps {
  online?: boolean
  label: string
  className?: string
}

export function StatusPill({ online = true, label, className }: StatusPillProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border',
        online
          ? 'border-success/30 bg-success/10 text-success'
          : 'border-border bg-elevated text-muted',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className={[
          'w-1.5 h-1.5 rounded-full',
          online ? 'bg-success animate-pulse' : 'bg-muted',
        ].join(' ')}
        aria-hidden
      />
      {label}
    </span>
  )
}
