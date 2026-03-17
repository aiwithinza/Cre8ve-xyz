import { motion } from 'framer-motion'
import { BrainCircuit, Cpu, Network, Zap, Layers, Cable, type LucideIcon } from 'lucide-react'
import { useCallback, useRef } from 'react'

const iconMap: Record<string, LucideIcon> = { BrainCircuit, Cpu, Network, Zap, Layers, Cable }

const capabilities = [
  {
    num: '01',
    title: 'AI Applications',
    desc: 'Full-stack AI app development — from concept and design to App Store and Play Store deployment.',
    icon: 'Cpu',
    tags: 'MOBILE / WEB / API',
  },
  {
    num: '02',
    title: 'Intelligent Automation',
    desc: 'Custom AI workflows that automate repetitive tasks, reduce manual effort, and scale operations.',
    icon: 'Zap',
    tags: 'WORKFLOWS / PIPELINES / BOTS',
  },
  {
    num: '03',
    title: 'AI Agents',
    desc: 'Autonomous AI agents that reason, plan, and execute multi-step tasks without constant human input.',
    icon: 'BrainCircuit',
    tags: 'LLM / RAG / MULTI-AGENT',
  },
  {
    num: '04',
    title: 'Product Design',
    desc: 'User-centered design for AI products — interfaces that feel natural, intuitive, and useful.',
    icon: 'Layers',
    tags: 'UI/UX / PROTOTYPING / RESEARCH',
  },
  {
    num: '05',
    title: 'Infrastructure',
    desc: 'Cloud-native backend architecture optimized for AI workloads, model serving, and real-time data.',
    icon: 'Network',
    tags: 'AWS / GCP / KUBERNETES',
  },
  {
    num: '06',
    title: 'Integrations',
    desc: 'Connect AI capabilities to existing tools and platforms through clean APIs and middleware.',
    icon: 'Cable',
    tags: 'REST / WEBHOOKS / SDKs',
  },
]

function CapabilityCard({ item, index }: { item: typeof capabilities[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = iconMap[item.icon]
  const isHero = index === 0

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30, scale: isHero ? 0.95 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.015 }}
      viewport={{ once: true }}
      transition={{ duration: isHero ? 1 : 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="glass-morphism p-8 md:p-10 rounded-3xl group relative overflow-hidden h-full flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_80px_-20px_rgba(255,122,26,0.3)] transition-all duration-500 border border-white/[0.08]"
    >
      {/* Gradient neon border on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden z-20">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-steel to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-brand/50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-steel/50 to-transparent" />
      </div>

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,122,26,0.08), transparent 40%)',
        }}
      />

      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-brand/15 transition-colors duration-500" />

      {/* Hero card: animated shimmer sweep */}
      {isHero && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,122,26,0.04) 45%, rgba(70,130,180,0.04) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Hero card: subtle grid pattern */}
      {isHero && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Top row: number + icon */}
        <div className="flex justify-between items-start mb-4">
          <span className="font-mono text-brand/30 text-[10px] tracking-widest group-hover:text-brand/60 transition-colors">
            {item.num}
          </span>
          <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand/15 group-hover:border-brand/40 group-hover:shadow-[0_0_30px_rgba(255,122,26,0.2)] transition-all duration-500">
            {Icon && (
              <Icon
                className={`${isHero ? 'w-7 h-7 md:w-8 md:h-8' : 'w-6 h-6 md:w-7 md:h-7'} text-brand group-hover:scale-110 transition-transform duration-500`}
                strokeWidth={1.4}
              />
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="border-b border-white/[0.04] mb-5" />

        {/* Content */}
        <div className="mt-auto">
          <h3 className={`font-heading font-medium mb-3 text-white/90 group-hover:text-white transition-colors ${isHero ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
            {item.title}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors">
            {item.desc}
          </p>
          <span className="font-mono text-[9px] text-brand/30 tracking-[0.15em] mt-6 inline-block px-3 py-1.5 rounded-full border border-brand/20 bg-brand/5 group-hover:border-brand/40 group-hover:text-brand group-hover:shadow-[0_0_15px_rgba(255,122,26,0.1)] transition-all duration-500">
            {item.tags}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-40 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/3 -translate-y-1/4 bg-brand/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/4 translate-y-1/4 bg-steel/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 md:mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-heading text-5xl md:text-8xl font-light tracking-tight mb-6"
            >
              Capabilities <span className="text-brand">.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/40 text-lg md:text-xl font-light leading-relaxed"
            >
              We turn complex AI into products and systems that work — from concept to deployment.
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-mono text-brand/30 text-[10px] tracking-[0.2em] mt-4 block"
            >
              From idea to app store — end to end
            </motion.span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 md:gap-8 auto-rows-[minmax(300px,auto)]">
          {capabilities.map((item, i) => {
            let colSpan = 'md:col-span-3 lg:col-span-4';
            let rowSpan = 'row-span-1';

            if (i === 0 || i === 3) {
              colSpan = 'md:col-span-6 lg:col-span-8';
              rowSpan = 'row-span-1';
            } else if (i === 4 || i === 5) {
              colSpan = 'md:col-span-3 lg:col-span-6';
            }

            return (
              <div key={item.num} className={`${colSpan} ${rowSpan} h-full`}>
                <CapabilityCard item={item} index={i} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
