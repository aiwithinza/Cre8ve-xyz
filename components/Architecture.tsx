import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { BrainCircuit, Database, Workflow, Bot, Monitor } from 'lucide-react'
import { WaveText } from '@/components/ui/wave-text'
import { motionPatterns, motionTokens, useScrollScene, viewportOnce } from '@/hooks/useScrollScene'

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
        viewport={viewportOnce}
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
      viewport={viewportOnce}
      transition={{ ...motionTokens.reveal, delay }}
      className="flex items-center justify-center"
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={motionTokens.quick}
        className="relative flex flex-col items-center gap-1.5 md:gap-3 rounded-2xl glass-panel px-3 py-3 md:px-8 md:py-6 border-white/15 transition-[box-shadow,border-color,transform] duration-300 hover:shadow-[0_0_60px_rgba(255,122,26,0.28)] hover:border-brand/45 prismatic-sheen"
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
  const { ref, scrollYProgress } = useScrollScene<HTMLElement>()
  const shouldReduceMotion = useReducedMotion()
  const diagramY = useTransform(scrollYProgress, [0, 0.5, 1], [90, 0, -70])
  const diagramScale = useTransform(scrollYProgress, [0, 0.48, 1], [0.88, 1, 0.96])
  const shardRotate = useTransform(scrollYProgress, [0, 1], [-18, 22])
  const orbitalOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.15, 0.55, 0.22])

  return (
    <section ref={ref} id="architecture" className="py-24 md:py-40 overflow-hidden relative cinematic-stage cinematic-grid">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/[0.1]"
          style={{ opacity: orbitalOpacity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-steel/[0.12]"
          style={{ opacity: orbitalOpacity }}
        />
        {[
          'left-[8%] top-[18%] h-20 w-36',
          'right-[9%] top-[24%] h-24 w-28',
          'bottom-[18%] left-[13%] h-28 w-24',
          'bottom-[20%] right-[15%] h-16 w-40',
        ].map((className, index) => (
          <motion.div
            key={className}
            className={`absolute hidden rounded-2xl glass-subtle glass-refraction-edge md:block ${className}`}
            initial={{ opacity: 0, y: 80, scale: 0.86 }}
            whileInView={{ opacity: 0.16, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ ...motionTokens.reveal, delay: 0.25 + index * 0.12 }}
            style={{ rotate: shardRotate }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={motionTokens.reveal}
            className="font-heading text-5xl md:text-7xl font-light tracking-tight"
          >
            Core Orchestrates <WaveText className="font-medium">v1.0</WaveText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.24, ease: motionTokens.easeOut }}
            className="font-mono text-brand/72 text-[11px] tracking-[0.3em] uppercase mt-4"
          >
            The capability core resolves into architecture
          </motion.p>
        </div>

        {/* Cardinal Cross Diagram */}
        <motion.div
          className="max-w-3xl mx-auto"
          style={{ y: diagramY, scale: diagramScale }}
        >
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
                  viewport={viewportOnce}
                  transition={{ ...motionPatterns.coreMorph, duration: 0.95 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -inset-8 rounded-full bg-[conic-gradient(from_0deg,rgba(255,122,26,0.22),transparent_34%,rgba(70,130,180,0.2),transparent_70%,rgba(255,122,26,0.22))] blur-2xl"
                    animate={shouldReduceMotion ? { opacity: 0.35 } : { rotate: 360, opacity: [0.25, 0.5, 0.25] }}
                    transition={{ rotate: { duration: 18, repeat: Infinity, ease: 'linear' }, opacity: { duration: 4, repeat: Infinity } }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={motionTokens.quick}
                    className="relative flex flex-col items-center justify-center gap-1.5 md:gap-2 w-24 h-24 md:w-40 md:h-40 rounded-full glass-prismatic glass-refraction-edge border-brand/45 bg-brand/[0.07] shadow-[0_0_120px_rgba(255,122,26,0.28)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_150px_rgba(255,122,26,0.42)]"
                  >
                    <Workflow className="w-6 h-6 md:w-9 md:h-9 text-brand" strokeWidth={1.2} />
                    <span className="font-mono text-[6px] md:text-[11px] font-bold text-brand tracking-[0.15em] md:tracking-[0.25em]">
                      CORE ROUTER
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...motionTokens.reveal, delay: 0.35 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-3 rounded-2xl glass-subtle glass-refraction-edge p-3"
        >
          {['source', 'capability', 'architecture'].map((label, index) => (
            <span
              key={label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-3 text-center font-mono text-[8px] uppercase tracking-[0.24em] text-white/48 md:text-[10px]"
            >
              {String(index + 1).padStart(2, '0')} / {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
