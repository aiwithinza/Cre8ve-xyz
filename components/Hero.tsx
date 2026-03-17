import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, Command, ArrowRight, Terminal } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { WaveText } from '@/components/ui/wave-text'

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
  const sectionRef = useRef<HTMLElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [promptText, setPromptText] = useState('')
  const fullPrompt = 'Designing AI products people actually want to use...'

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isTyping) {
      let i = 0
      const type = () => {
        if (i <= fullPrompt.length) {
          setPromptText(fullPrompt.slice(0, i))
          i++
          timeout = setTimeout(type, 50 + Math.random() * 50)
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
      className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden px-6 bg-black"
    >

      {/* Constellation Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] opacity-[0.7]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1, rotate: 360 }}
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
              stroke="rgba(255,122,26,0.3)"
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
              fill={i % 3 === 0 ? "rgba(255,122,26,0.5)" : "rgba(70,130,180,0.4)"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                delay: 1.5 + i * 0.08,
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl pt-20">
        {/* Heading — specific value prop */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading tracking-[-0.04em] leading-[0.85] mb-12 text-[clamp(3rem,9vw,9.5rem)]"
        >
          <span className="font-extralight text-white/95">WE BUILD AI</span>
          <br />
          <WaveText className="font-semibold">THAT PEOPLE USE.</WaveText>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/40 text-lg md:text-2xl max-w-2xl mx-auto mb-16 font-light leading-relaxed"
        >
          We design and develop AI-powered applications and automation systems that solve real problems — intuitive products built for everyday users, not just engineers.
        </motion.p>

        {/* Dynamic AI Prompt Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto mb-16 relative"
        >
          {/* Outer glow and border */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-brand/50 via-steel/30 to-brand/50 rounded-2xl opacity-50 blur-[2px] animate-shimmer" />
          
          {/* Glass terminal container */}
          <div className="relative glass-morphism rounded-2xl p-2 md:p-3 overflow-hidden flex flex-col backdrop-blur-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 px-3 pb-2 border-b border-white/5 mb-3">
              <Terminal className="w-3.5 h-3.5 text-white/40" />
              <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Cre8ve.AI / Terminal</span>
              <div className="ml-auto flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-brand/40 animate-pulse" />
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 md:py-3 bg-white/[0.02] rounded-xl border border-white/[0.03]">
              <Sparkles className="w-4 h-4 text-brand animate-pulse shrink-0" />
              <div className="flex-1 text-left font-mono text-xs md:text-sm tracking-wide text-white/80 min-h-[24px] flex items-center">
                {promptText}
                <motion.div 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-brand ml-1 inline-block"
                />
              </div>
              <motion.button
                aria-label="Submit prompt"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shrink-0 flex items-center justify-center p-2 rounded-lg bg-gradient-brand text-white shadow-[0_0_15px_rgba(255,122,26,0.2)] hover:shadow-[0_0_25px_rgba(255,122,26,0.4)] transition-all duration-300 group hover-pulse"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
            
            <div className="mt-3 flex justify-between items-center px-2">
              <span className="font-mono text-[9px] text-white/20 tracking-widest">PRESS <Command className="w-2.5 h-2.5 inline mx-1 -mt-0.5" /> + ENTER</span>
              <div className="flex gap-2">
                {['Design', 'Build', 'Launch'].map(tag => (
                  <span key={tag} className="font-mono text-[9px] tracking-widest text-brand/60 px-2 py-0.5 rounded-full border border-brand/20 bg-brand/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 mt-20"
        >
          {[
            { value: '3', label: 'AI Products in Pipeline' },
            { value: 'MVP', label: 'to Market' },
            { value: '✦', label: 'Founder-Led Studio' },
          ].map((stat, i) => (
            <div key={stat.label} className={`flex items-center gap-6 ${i > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6' : ''}`}>
              <div className="text-center sm:text-left">
                <span className="font-mono text-white/55 text-xs tracking-widest block">{stat.value}</span>
                <span className="font-mono text-white/40 text-[9px] tracking-[0.2em] uppercase">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1.5, duration: 1 }}
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
