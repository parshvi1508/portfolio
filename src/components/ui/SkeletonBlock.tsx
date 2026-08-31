interface SkeletonBlockProps {
  className?: string
  height?: string
}

export function SkeletonBlock({ className, height = 'h-4' }: SkeletonBlockProps) {
  return (
    <div
      className={['rounded shimmer', height, className].filter(Boolean).join(' ')}
      aria-hidden
    />
  )
}
