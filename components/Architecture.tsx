import { motion } from 'framer-motion'
import { BrainCircuit, Database, Workflow, Bot, Monitor } from 'lucide-react'
import { WaveText } from '@/components/ui/wave-text'

const peripherals = [
  { id: 'models', label: 'MODELS', icon: BrainCircuit, protocol: 'API', position: 'top' },
  { id: 'data', label: 'DATA', icon: Database, protocol: 'STREAM', position: 'left' },
  { id: 'agents', label: 'AGENTS', icon: Bot, protocol: 'gRPC', position: 'right' },
  { id: 'interfaces', label: 'INTERFACES', icon: Monitor, protocol: 'EVENTS', position: 'bottom' },
]

function ConnectionLine({ direction, protocol, index }: { direction: 'vertical' | 'horizontal'; protocol: string; index: number }) {
  const isVertical = direction === 'vertical'
  const viewBox = isVertical ? '0 0 20 100' : '0 0 100 20'
  const line = isVertical
    ? { x1: 10, y1: 0, x2: 10, y2: 100 }
    : { x1: 0, y1: 10, x2: 100, y2: 10 }
  const path = isVertical ? 'M10,0 L10,100' : 'M0,10 L100,10'
  const gradientId = `lineGrad-${index}`
  const flowId = `flowGrad-${index}`

  return (
    <div className={`relative flex items-center justify-center ${isVertical ? 'h-full w-5' : 'w-full h-5'}`}>
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox={viewBox}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1={isVertical ? '0%' : '0%'} y1={isVertical ? '0%' : '0%'} x2={isVertical ? '0%' : '100%'} y2={isVertical ? '100%' : '0%'}>
            <stop offset="0%" stopColor="rgba(255,122,26,0.5)" />
            <stop offset="50%" stopColor="rgba(70,130,180,0.6)" />
            <stop offset="100%" stopColor="rgba(255,122,26,0.5)" />
          </linearGradient>
          <linearGradient id={flowId} x1={isVertical ? '0%' : '0%'} y1={isVertical ? '0%' : '0%'} x2={isVertical ? '0%' : '100%'} y2={isVertical ? '100%' : '0%'}>
            <stop offset="0%" stopColor="rgba(255,122,26,0)" />
            <stop offset="50%" stopColor="rgba(255,122,26,0.9)" />
            <stop offset="100%" stopColor="rgba(70,130,180,0)" />
          </linearGradient>
        </defs>

        {/* Glow line */}
        <line
          x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          className="blur-sm opacity-40"
          vectorEffect="non-scaling-stroke"
        />
        {/* Sharp line */}
        <motion.line
          x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: 'easeInOut' }}
        />
        {/* Flowing dash */}
        <motion.line
          x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
          stroke={`url(#${flowId})`}
          strokeWidth="1.5"
          strokeDasharray="8 24"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0, strokeDashoffset: 0 }}
          whileInView={{ opacity: 1, strokeDashoffset: -32 }}
          viewport={{ once: true }}
          transition={{
            opacity: { delay: 1.5 + index * 0.15, duration: 0.8 },
            strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' },
          }}
        />
        {/* Traveling dot */}
        <motion.circle
          r="3"
          fill="#FF7A1A"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 + index * 0.15 }}
        >
          <animateMotion dur={`${2.5 + index * 0.3}s`} repeatCount="indefinite" path={path} />
        </motion.circle>
      </svg>

      {/* Protocol label */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2 + index * 0.1 }}
        className={`absolute font-mono text-[8px] md:text-[9px] tracking-[0.2em] text-white/15 ${
          isVertical ? 'left-6 top-1/2 -translate-y-1/2' : 'top-5 left-1/2 -translate-x-1/2'
        }`}
      >
        {protocol}
      </motion.span>
    </div>
  )
}

function PeripheralNode({ node, delay }: { node: typeof peripherals[0]; delay: number }) {
  const Icon = node.icon
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center"
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="relative flex flex-col items-center gap-1.5 md:gap-3 rounded-2xl glass-morphism px-3 py-3 md:px-8 md:py-6 border-white/15 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,122,26,0.25)] hover:border-brand/40"
      >
        <Icon className="w-4 h-4 md:w-6 md:h-6 text-brand" strokeWidth={1.2} />
        <span className="font-mono text-[8px] md:text-[11px] tracking-[0.2em] text-white/80">
          {node.label}
        </span>
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand/50" />
      </motion.div>
    </motion.div>
  )
}

export default function Architecture() {
  return (
    <section id="architecture" className="py-24 md:py-40 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-7xl font-light tracking-tight"
          >
            Neural Frame <WaveText className="font-medium">v1.0</WaveText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-mono text-brand/40 text-[11px] tracking-[0.3em] uppercase mt-4"
          >
            The intelligence orchestration layer
          </motion.p>
        </div>

        {/* Cardinal Cross Diagram */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 grid-rows-3 gap-0" style={{ gridTemplateRows: 'auto 1fr auto', gridTemplateColumns: '1fr auto 1fr' }}>
            {/* Row 1: empty | MODELS | empty */}
            <div />
            <PeripheralNode node={peripherals[0]} delay={0.6} />
            <div />

            {/* Row 2: DATA | line-center-line | AGENTS */}
            <div className="flex items-center justify-end">
              <PeripheralNode node={peripherals[1]} delay={0.8} />
            </div>

            {/* Center column: vertical line top + center node + vertical line bottom */}
            <div className="flex flex-col items-center">
              {/* Top vertical line */}
              <div className="w-5 h-10 md:h-20">
                <ConnectionLine direction="vertical" protocol="API" index={0} />
              </div>

              {/* Center row: left line + orchestration + right line */}
              <div className="flex items-center">
                <div className="h-5 w-8 md:w-20">
                  <ConnectionLine direction="horizontal" protocol="STREAM" index={1} />
                </div>

                {/* Central Orchestration Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative flex flex-col items-center justify-center gap-1.5 md:gap-2 w-24 h-24 md:w-40 md:h-40 rounded-full glass-morphism border-brand/40 bg-brand/[0.06] shadow-[0_0_100px_rgba(255,122,26,0.25)] transition-all duration-500 hover:shadow-[0_0_140px_rgba(255,122,26,0.4)]"
                  >
                    <Workflow className="w-6 h-6 md:w-9 md:h-9 text-brand" strokeWidth={1.2} />
                    <span className="font-mono text-[6px] md:text-[11px] font-bold text-brand tracking-[0.15em] md:tracking-[0.25em]">
                      ORCHESTRATION
                    </span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
                  </motion.div>
                  {/* Pulsing rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-brand/25"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-brand/15"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>

                <div className="h-5 w-8 md:w-20">
                  <ConnectionLine direction="horizontal" protocol="gRPC" index={2} />
                </div>
              </div>

              {/* Bottom vertical line */}
              <div className="w-5 h-10 md:h-20">
                <ConnectionLine direction="vertical" protocol="EVENTS" index={3} />
              </div>
            </div>

            <div className="flex items-center justify-start">
              <PeripheralNode node={peripherals[2]} delay={0.8} />
            </div>

            {/* Row 3: empty | INTERFACES | empty */}
            <div />
            <PeripheralNode node={peripherals[3]} delay={1.0} />
            <div />
          </div>
        </div>
      </div>
    </section>
  )
}
