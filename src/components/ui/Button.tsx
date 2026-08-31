import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type Variant = 'accent' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: Variant
  size?: Size
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>
type AnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

function classes(variant: Variant, size: Size, extra?: string) {
  const base =
    'inline-flex items-center justify-center gap-2 font-sans font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none select-none'

  const variants: Record<Variant, string> = {
    accent:
      'bg-accent text-[#060b24] hover:bg-accent2 hover:shadow-[0_0_20px_rgba(157,123,255,0.4)] active:scale-[0.98]',
    outline:
      'border border-accent text-accent hover:bg-accent-muted hover:shadow-[0_0_12px_rgba(157,123,255,0.2)] active:scale-[0.98]',
    ghost:
      'text-secondary hover:text-primary hover:bg-elevated active:scale-[0.98]',
  }

  const sizes: Record<Size, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3',
  }

  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(' ')
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'accent', size = 'md', className, children, ...props }, ref) => (
    <button ref={ref} className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  )
)
Button.displayName = 'Button'

export function LinkButton({
  variant = 'accent',
  size = 'md',
  className,
  children,
  ...props
}: AnchorProps) {
  return (
    <a className={classes(variant, size, className)} {...props}>
      {children}
    </a>
  )
}
