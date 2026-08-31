'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

interface HeroAnimatedProps {
  children: React.ReactNode
  className?: string
}

export function HeroAnimated({ children, className = 'flex flex-col gap-5' }: HeroAnimatedProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function HeroItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={item}>{children}</motion.div>
}
