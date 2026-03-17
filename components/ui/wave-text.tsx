import { motion } from 'framer-motion'

interface WaveTextProps {
  children: React.ReactNode
  className?: string
}

export function WaveText({ children, className = '' }: WaveTextProps) {
  return (
    <motion.span
      className={`inline-block text-gradient-brand ${className}`}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: [0, -4, 0, 3, 0],
      }}
      transition={{
        opacity: { duration: 1 },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      {children}
    </motion.span>
  )
}
