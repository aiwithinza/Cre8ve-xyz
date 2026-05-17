import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { motionTokens } from '@/hooks/useScrollScene'

const MotionSpan = motion.span

type KineticTextProps = {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  mode?: 'word' | 'letter'
  direction?: 'up' | 'down'
  children?: ReactNode
}

export function KineticText({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.045,
  mode = 'word',
  direction = 'up',
  children,
}: KineticTextProps) {
  const shouldReduceMotion = useReducedMotion()
  const tokens = mode === 'letter' ? Array.from(text) : text.split(' ')
  const usesGradientText = className.includes('text-gradient')
  const hiddenY = direction === 'up' ? '112%' : '-112%'

  return (
    <MotionSpan
      className={className}
      initial={false}
      animate="visible"
      aria-label={text}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {tokens.map((token, index) => (
        <motion.span
          key={`${token}-${index}`}
          aria-hidden="true"
          className={`inline-block overflow-hidden align-bottom [perspective:900px] ${usesGradientText ? 'text-gradient-brand' : ''} ${wordClassName}`}
          variants={{
            hidden: shouldReduceMotion
              ? { opacity: 1, y: '0%', rotateX: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: hiddenY, rotateX: direction === 'up' ? -34 : 34, filter: 'blur(10px)' },
            visible: {
              opacity: 1,
              y: '0%',
              rotateX: 0,
              filter: 'blur(0px)',
              transition: shouldReduceMotion
                ? { duration: 0 }
                : { duration: mode === 'letter' ? 0.62 : 0.86, ease: motionTokens.easeOut },
            },
          }}
        >
          <span className="inline-block">{token === ' ' ? '\u00A0' : token}</span>
          {mode === 'word' && index < tokens.length - 1 ? <span>&nbsp;</span> : null}
        </motion.span>
      ))}
      {children}
    </MotionSpan>
  )
}
