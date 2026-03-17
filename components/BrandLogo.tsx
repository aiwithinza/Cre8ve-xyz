import React from 'react'
import { motion } from 'framer-motion'

interface BrandLogoProps {
  className?: string
  iconOnly?: boolean
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md'
}

export default function BrandLogo({ className = '', iconOnly = false, size = 'md' }: BrandLogoProps) {
  const h = size === 'sm' ? 24 : 34

  return (
    <motion.div
      className={`flex items-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {iconOnly ? (
        <Cre8veIcon height={h} />
      ) : (
        <Cre8veWordmark height={h} />
      )}
    </motion.div>
  )
}

/** Full "Cre8ve" wordmark — crescent C + "re" white + gradient 8 + "ve" white */
function Cre8veWordmark({ height }: { height: number }) {
  // viewBox tuned to tightly wrap the logo
  return (
    <svg
      height={height}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <defs>
        <linearGradient id="cre8ve-grad" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#4682B4" />
          <stop offset="60%" stopColor="#FF7A1A" />
          <stop offset="100%" stopColor="#FF7A1A" />
        </linearGradient>
      </defs>

      {/* C — crescent moon */}
      <path
        d="M38 8C20.3 8 6 22.3 6 40s14.3 32 32 32c11.5 0 21.5-6 27.2-15.1C59.5 64.8 50.3 70 40 70c-16.6 0-30-13.4-30-30S23.4 10 40 10c10.3 0 19.5 5.2 25.2 13.1C59.5 14 49.5 8 38 8z"
        fill="url(#cre8ve-grad)"
      />

      {/* r */}
      <text x="68" y="58" fontFamily="var(--font-space-grotesk), 'Space Grotesk', sans-serif" fontSize="46" fontWeight="500" fill="white" letterSpacing="-1">r</text>
      {/* e */}
      <text x="92" y="58" fontFamily="var(--font-space-grotesk), 'Space Grotesk', sans-serif" fontSize="46" fontWeight="500" fill="white" letterSpacing="-1">e</text>

      {/* 8 — gradient filled */}
      <text x="122" y="58" fontFamily="var(--font-space-grotesk), 'Space Grotesk', sans-serif" fontSize="48" fontWeight="700" fill="url(#cre8ve-grad)" letterSpacing="-1">8</text>

      {/* v */}
      <text x="156" y="58" fontFamily="var(--font-space-grotesk), 'Space Grotesk', sans-serif" fontSize="46" fontWeight="500" fill="white" letterSpacing="-1">v</text>
      {/* e */}
      <text x="186" y="58" fontFamily="var(--font-space-grotesk), 'Space Grotesk', sans-serif" fontSize="46" fontWeight="500" fill="white" letterSpacing="-1">e</text>
    </svg>
  )
}

/** Icon-only — just the crescent C */
function Cre8veIcon({ height }: { height: number }) {
  return (
    <svg
      height={height}
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <defs>
        <linearGradient id="cre8ve-icon-grad" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#4682B4" />
          <stop offset="60%" stopColor="#FF7A1A" />
          <stop offset="100%" stopColor="#FF7A1A" />
        </linearGradient>
      </defs>
      <path
        d="M38 8C20.3 8 6 22.3 6 40s14.3 32 32 32c11.5 0 21.5-6 27.2-15.1C59.5 64.8 50.3 70 40 70c-16.6 0-30-13.4-30-30S23.4 10 40 10c10.3 0 19.5 5.2 25.2 13.1C59.5 14 49.5 8 38 8z"
        fill="url(#cre8ve-icon-grad)"
      />
    </svg>
  )
}
