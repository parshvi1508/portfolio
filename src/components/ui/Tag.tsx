interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'highlight' | 'badge'
  small?: boolean
}

export function Tag({ children, variant = 'default', small }: TagProps) {
  const base = `inline-flex items-center font-mono rounded border ${small ? 'text-[10px] px-1.5 py-px' : 'text-xs px-2 py-0.5'}`

  const variants = {
    default: 'border-border bg-elevated text-secondary',
    highlight: 'border-accent/30 bg-accent-muted text-accent2',
    badge: 'border-success/30 bg-success/10 text-success font-medium',
  }

  return <span className={`${base} ${variants[variant]}`}>{children}</span>
}
