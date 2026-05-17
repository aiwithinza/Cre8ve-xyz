import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles, Command, ArrowRight, Terminal } from 'lucide-react'
import { useState, useEffect } from 'react'
import { KineticText } from '@/components/CinematicText'
import { motionPatterns, motionTokens, useScrollScene } from '@/hooks/useScrollScene'

// Constellation nodes for neural network background
const constellationNodes = [
  { cx: 50, cy: 30, r: 2 }, { cx: 20, cy: 50, r: 1.5 }, { cx: 80, cy: 45, r: 2 },
  { cx: 35, cy: 70, r: 1.5 }, { cx: 65, cy: 25, r: 1.8 }, { cx: 15, cy: 30, r: 1.2 },
  { cx: 85, cy: 70, r: 1.5 }, { cx: 45, cy: 55, r: 2 }, { cx: 70, cy: 60, r: 1.2 },
  { cx: 25, cy: 80, r: 1.5 }, { cx: 55, cy: 75, r: 1.8 }, { cx: 90, cy: 35, r: 1.2 },
  { cx: 10, cy: 65, r: 1.5 }, { cx: 40, cy: 40, r: 1.2 }, { cx: 75, cy: 85, r: 1.5 },
  { cx: 60, cy: 15, r: 1.8 }, { cx: 30, cy: 20, r: 1.2 }, { cx: 50, cy: 90, r: 1.5 },
]

// Constellation connections
const constellationLines = [
  [0, 4], [0, 7], [1, 5], [1, 13], [2, 4], [2, 8], [3, 9], [3, 7],
  [4, 15], [5, 16], [6, 8], [6, 14], [7, 10], [8, 11], [9, 12],
  [10, 14], [11, 2], [13, 16], [15, 11], [12, 1], [17, 10], [17, 3],
]

export default function Hero() {
  const { ref: sectionRef, scrollYProgress } = useScrollScene<HTMLElement>({
    offset: ['start start', 'end start'],
  })
  const shouldReduceMotion = useReducedMotion()
  const [isTyping, setIsTyping] = useState(false)
  const [promptText, setPromptText] = useState('')
  const fullPrompt = 'Designing AI products people actually want to use...'
  const headlineY = useTransform(scrollYProgress, [0, 0.52], [0, -92])
  const terminalY = useTransform(scrollYProgress, [0, 0.45], [0, -38])
  const constellationScale = useTransform(scrollYProgress, [0, 0.48], [1, 0.82])
  const constellationOpacity = useTransform(scrollYProgress, [0, 0.5], [0.44, 0.12])
  const sourceLineScale = useTransform(scrollYProgress, [0.04, 0.56], [0.12, 1])
  const bootShards = [
    'top-[18%] left-[8%] w-28 h-12 rotate-[-12deg]',
    'top-[18%] right-[10%] w-24 h-10 rotate-[10deg]',
    'bottom-[20%] left-[12%] w-20 h-20 rotate-[24deg]',
    'bottom-[18%] right-[16%] w-32 h-12 rotate-[-18deg]',
  ]
  const bootStages = ['SIGNAL', 'MODEL', 'INTERFACE']

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isTyping) {
      let i = 0
      const type = () => {
        if (i <= fullPrompt.length) {
          setPromptText(fullPrompt.slice(0, i))
          i++
          timeout = setTimeout(type, 42 + (i % 5) * 9)
        } else {
          setTimeout(() => setIsTyping(false), 2000)
        }
      }
      type()
    } else {
      setPromptText('')
      timeout = setTimeout(() => setIsTyping(true), 1500)
    }
    return () => clearTimeout(timeout)
  }, [isTyping])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-start md:justify-center items-center overflow-hidden px-6 cinematic-stage cinematic-grid scanline-overlay"
    >
      <div className="absolute inset-x-0 bottom-0 h-40 depth-fade pointer-events-none z-[2]" />

      {/* Constellation Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] opacity-[0.48]"
          initial={{ opacity: 0.35, scale: 0.92 }}
          animate={shouldReduceMotion ? { opacity: 0.34, scale: 1 } : { opacity: 0.48, scale: 1, rotate: 360 }}
          style={{ scale: constellationScale, opacity: constellationOpacity }}
          transition={{
            opacity: { duration: 2, delay: 0.5 },
            scale: { duration: 2, delay: 0.5 },
            rotate: { duration: 120, repeat: Infinity, ease: "linear" }
          }}
        >
          {/* Connection Lines */}
          {constellationLines.map(([a, b], i) => (
            <motion.line
              key={`line-${i}`}
              x1={constellationNodes[a].cx}
              y1={constellationNodes[a].cy}
              x2={constellationNodes[b].cx}
              y2={constellationNodes[b].cy}
              stroke="rgba(255,122,26,0.18)"
              strokeWidth="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 + i * 0.05 }}
            />
          ))}
          {/* Nodes */}
          {constellationNodes.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={i % 3 === 0 ? "rgba(255,122,26,0.34)" : "rgba(70,130,180,0.26)"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                delay: 0.65 + i * 0.05,
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.svg>
      </div>

      {/* Dropping glass fragments */}
      {bootShards.map((className, index) => (
        <motion.div
          key={className}
          aria-hidden="true"
          className={`absolute hidden md:block rounded-2xl glass-subtle pointer-events-none ${className}`}
          initial={{ opacity: 0, y: -80, scale: 0.84 }}
          animate={shouldReduceMotion ? { opacity: 0.16, y: 0, scale: 1 } : { opacity: [0, 0.22, 0.12], y: 0, scale: 1 }}
          transition={{ duration: 1.25, delay: 0.32 + index * 0.12, ease: motionTokens.easeOut }}
        />
      ))}

      <div className="absolute inset-x-0 top-[58%] hidden justify-center md:flex">
        <motion.div
          aria-hidden="true"
          className="h-px w-[min(68vw,820px)] origin-left bg-gradient-to-r from-transparent via-brand/45 to-transparent"
          style={{ scaleX: sourceLineScale }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl pt-44 pb-12 md:pt-28 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...motionPatterns.bootReveal, delay: 0.08 }}
          className="mx-auto mb-7 hidden md:flex w-fit items-center gap-3 rounded-full glass-subtle px-4 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_18px_rgba(255,122,26,0.8)]" />
          <span className="font-mono text-[10px] tracking-[0.34em] text-white/45 uppercase">System boot / cinematic interface</span>
        </motion.div>

        {/* Heading — specific value prop */}
        <motion.h1
          initial={{ opacity: 0.42, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: headlineY }}
          transition={{ ...motionPatterns.bootReveal, delay: 0.12 }}
          aria-label="We build AI that people use."
          className="font-heading tracking-[-0.03em] md:tracking-[-0.035em] leading-[0.86] md:leading-[0.84] mb-8 md:mb-8 text-[clamp(2.55rem,12vw,5.2rem)] md:text-[clamp(3rem,7.4vw,7.5rem)]"
        >
          <KineticText text="WE BUILD AI" className="block font-extralight text-white/95" delay={0.16} stagger={0.055} />
          <br />
          <KineticText
            text="THAT PEOPLE USE."
            className="block font-semibold text-gradient-brand kinetic-mask"
            delay={0.34}
            stagger={0.018}
            mode="letter"
            direction="down"
          />
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...motionTokens.reveal, delay: 0.3 }}
          className="copy-readable text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-10 font-light leading-relaxed"
        >
          We design and develop AI-powered applications and automation systems that solve real problems — intuitive products built for everyday users, not just engineers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...motionTokens.reveal, delay: 0.46 }}
          className="mx-auto mb-6 hidden max-w-lg grid-cols-3 gap-2 2xl:grid"
        >
          {bootStages.map((stage, index) => (
            <div key={stage} className="glass-subtle rounded-xl px-3 py-2 text-left">
              <span className="block font-mono text-[8px] tracking-[0.26em] text-white/34">0{index + 1}</span>
              <span className="mt-1 block font-mono text-[9px] tracking-[0.18em] text-brand/70">{stage}</span>
            </div>
          ))}
        </motion.div>

        {/* Dynamic AI Prompt Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          style={{ y: terminalY }}
          transition={{ ...motionPatterns.bootReveal, delay: 0.52 }}
          className="w-full max-w-2xl mx-auto mb-10 md:mb-12 relative"
        >
          {/* Outer glow and border */}
          <div className="absolute -inset-[1px] rounded-2xl opacity-60 blur-[2px] source-orbit" />
          
          {/* Glass terminal container */}
          <div className="relative glass-prismatic prismatic-sheen rounded-2xl p-2 md:p-3 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-3 pb-2 border-b border-white/5 mb-3">
              <Terminal className="w-3.5 h-3.5 text-white/40" />
              <span className="font-mono text-[10px] text-white/42 tracking-widest uppercase">Cre8ve Core / Terminal</span>
              <div className="ml-auto flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-brand/40 animate-pulse" />
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 md:py-3 bg-white/[0.02] rounded-xl border border-white/[0.03]">
              <Sparkles className="w-4 h-4 text-brand animate-pulse shrink-0" />
              <div className="flex-1 text-left font-mono text-xs md:text-sm tracking-wide text-white/86 min-h-[24px] flex items-center">
                {promptText}
                <motion.div 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-brand ml-1 inline-block"
                />
              </div>
              <motion.button
                aria-label="Submit prompt"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={motionTokens.quick}
                className="pressable shrink-0 flex items-center justify-center p-2 rounded-lg bg-gradient-brand text-white shadow-[0_0_15px_rgba(255,122,26,0.2)] hover:shadow-[0_0_25px_rgba(255,122,26,0.4)] group"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
            
            <div className="mt-3 flex justify-between items-center px-2">
              <span className="font-mono text-[9px] text-white/34 tracking-widest">PRESS <Command className="w-2.5 h-2.5 inline mx-1 -mt-0.5" /> + ENTER</span>
              <div className="flex gap-2">
                {['Design', 'Build', 'Launch'].map(tag => (
                  <span key={tag} className="font-mono text-[9px] tracking-widest text-brand/75 px-2 py-0.5 rounded-full border border-brand/25 bg-brand/[0.07]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            aria-hidden="true"
            className="mx-auto mt-5 hidden h-16 w-px bg-gradient-to-b from-brand/70 via-steel/40 to-transparent md:block"
            style={{ scaleY: sourceLineScale, transformOrigin: 'top' }}
          />
          <span className="mt-2 hidden justify-center font-mono text-[8px] uppercase tracking-[0.3em] text-white/24 md:flex">
            core handoff
          </span>
        </motion.div>

        {/* Social Proof Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.82, ease: motionTokens.easeOut }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 mt-12 md:mt-14"
        >
          {[
            { value: '3', label: 'AI Products in Pipeline' },
            { value: 'MVP', label: 'to Market' },
            { value: 'LIVE', label: 'Founder-Led Studio' },
          ].map((stat, i) => (
            <div key={stat.label} className={`flex items-center gap-6 ${i > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6' : ''}`}>
              <div className="text-center sm:text-left">
                <span className="font-mono text-white/70 text-xs tracking-widest block">{stat.value}</span>
                <span className="font-mono text-white/48 text-[9px] tracking-[0.2em] uppercase">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1.05, duration: 0.7, ease: motionTokens.easeOut }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  )
}
