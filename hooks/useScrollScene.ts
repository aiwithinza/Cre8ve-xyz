import { useRef } from 'react'
import { useScroll } from 'framer-motion'

type UseScrollConfig = NonNullable<Parameters<typeof useScroll>[0]>

export const motionTokens = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.77, 0, 0.175, 1] as const,
  springSoft: { type: 'spring', duration: 0.72, bounce: 0.16 } as const,
  springTight: { type: 'spring', duration: 0.42, bounce: 0.08 } as const,
  reveal: { duration: 0.82, ease: [0.16, 1, 0.3, 1] as const },
  quick: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const },
}

export const motionPatterns = {
  bootReveal: { duration: 0.86, ease: motionTokens.easeOut },
  cameraPush: { duration: 1.1, ease: motionTokens.easeInOut },
  coreMorph: { type: 'spring', duration: 0.78, bounce: 0.08 } as const,
  orbitalLabel: { duration: 0.54, ease: motionTokens.easeOut },
  fragmentConverge: { duration: 0.95, ease: motionTokens.easeOut },
}

export const viewportOnce = {
  once: true,
  margin: '-12% 0px -12% 0px',
} as const

export function useScrollScene<T extends HTMLElement>(options?: Pick<UseScrollConfig, 'offset'>) {
  const ref = useRef<T>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options?.offset ?? ['start end', 'end start'],
  })

  return { ref, scrollYProgress }
}
