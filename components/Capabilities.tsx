import { motion, type MotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { BrainCircuit, Cable, Cpu, Layers, Network, Zap, type LucideIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { motionPatterns, motionTokens, viewportOnce } from '@/hooks/useScrollScene'

type CapabilityScene = {
  num: string
  title: string
  action: string
  desc: string
  explainer: string
  icon: LucideIcon
  tags: string[]
  motif: 'devices' | 'rails' | 'agents' | 'wireframe' | 'infrastructure' | 'routes'
  color: 'brand' | 'steel'
}

const capabilityScenes: CapabilityScene[] = [
  {
    num: '01',
    title: 'AI Applications',
    action: 'Build Apps',
    desc: 'Full-stack AI products shaped from first prompt to App Store launch.',
    explainer: 'We design and build AI-powered web and mobile apps from concept to launch.',
    icon: Cpu,
    tags: ['MOBILE', 'WEB', 'API'],
    motif: 'devices',
    color: 'brand',
  },
  {
    num: '02',
    title: 'Intelligent Automation',
    action: 'Automate Work',
    desc: 'Operational workflows compressed into reliable, self-moving systems.',
    explainer: 'We turn repeated operational work into reliable AI-assisted workflows.',
    icon: Zap,
    tags: ['WORKFLOWS', 'PIPELINES', 'BOTS'],
    motif: 'rails',
    color: 'steel',
  },
  {
    num: '03',
    title: 'AI Agents',
    action: 'Deploy Agents',
    desc: 'Autonomous workers that reason, plan, and execute multi-step tasks.',
    explainer: 'We create agents that can reason, plan, call tools, and complete multi-step tasks.',
    icon: BrainCircuit,
    tags: ['LLM', 'RAG', 'MULTI-AGENT'],
    motif: 'agents',
    color: 'brand',
  },
  {
    num: '04',
    title: 'Product Design',
    action: 'Design Products',
    desc: 'Interfaces for AI products that feel obvious, fast, and human.',
    explainer: 'We shape AI interfaces so everyday users understand and trust the product.',
    icon: Layers,
    tags: ['UI/UX', 'PROTOTYPING', 'RESEARCH'],
    motif: 'wireframe',
    color: 'steel',
  },
  {
    num: '05',
    title: 'Infrastructure',
    action: 'Scale Systems',
    desc: 'Cloud-native foundations for models, data, real-time events, and scale.',
    explainer: 'We build the backend, deployment, and model-serving foundations needed to scale.',
    icon: Network,
    tags: ['AWS', 'GCP', 'KUBERNETES'],
    motif: 'infrastructure',
    color: 'brand',
  },
  {
    num: '06',
    title: 'Integrations',
    action: 'Connect Tools',
    desc: 'Clean API routes that connect AI into the systems teams already use.',
    explainer: 'We connect AI systems into CRMs, databases, websites, Slack, APIs, and internal tools.',
    icon: Cable,
    tags: ['REST', 'WEBHOOKS', 'SDKs'],
    motif: 'routes',
    color: 'steel',
  },
]

const PHASE_COUNT = capabilityScenes.length

function phaseFade(index: number) {
  const center = index / (PHASE_COUNT - 1)
  if (index === 0) return { input: [0, 0.08, 0.18], output: [1, 1, 0] }
  if (index === PHASE_COUNT - 1) return { input: [0.82, 0.92, 1], output: [0, 1, 1] }
  return { input: [Math.max(0, center - 0.18), center, Math.min(1, center + 0.18)], output: [0, 1, 0] }
}

function PhaseLabel({ scene, index, progress }: { scene: CapabilityScene; index: number; progress: MotionValue<number> }) {
  const { input, output } = phaseFade(index)
  const active = useTransform(progress, input, output)
  const scale = useTransform(active, [0, 1], [0.96, 1])

  return (
    <motion.div
      className="grid grid-cols-[2.5rem_1fr] items-center gap-3 border-b border-white/[0.05] py-4 last:border-b-0"
      style={{ opacity: useTransform(active, [0, 1], [0.32, 1]), scale }}
    >
      <span className="font-mono text-[10px] tracking-[0.24em] text-brand/70">{scene.num}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/62">{scene.title}</span>
    </motion.div>
  )
}

function MotifLayer({ scene, index, progress }: { scene: CapabilityScene; index: number; progress: MotionValue<number> }) {
  const { input, output } = phaseFade(index)
  const opacity = useTransform(progress, input, output)
  const scale = useTransform(progress, input, index === 0 ? [1, 1, 0.94] : index === PHASE_COUNT - 1 ? [0.94, 1, 1] : [0.94, 1, 0.94])
  const rotate = useTransform(progress, input, index % 2 === 0 ? [-4, 0, 4] : [4, 0, -4])
  const isSteel = scene.color === 'steel'
  const accent = isSteel ? 'bg-steel' : 'bg-brand'
  const softGlow = isSteel ? 'bg-steel/20' : 'bg-brand/20'
  const border = isSteel ? 'border-steel/35' : 'border-brand/35'

  return (
    <motion.div className="absolute inset-0" style={{ opacity, scale, rotate }}>
      {scene.motif === 'devices' && (
        <div className="absolute inset-0">
          <div className={`absolute left-[18%] top-[22%] h-36 w-24 rounded-2xl border ${border} bg-white/[0.025] shadow-[0_0_60px_rgba(255,122,26,0.1)]`} />
          <div className={`absolute right-[14%] top-[28%] h-28 w-44 rounded-2xl border ${border} bg-white/[0.025]`} />
          <div className={`absolute bottom-[18%] left-[32%] h-20 w-52 rounded-2xl border ${border} bg-white/[0.025]`} />
        </div>
      )}

      {scene.motif === 'rails' && (
        <div className="absolute inset-0">
          {[20, 38, 56, 74].map((top, railIndex) => (
            <span key={top} className="phase-pulse-line absolute left-[10%] h-px w-[80%]" style={{ top: `${top}%`, animationDelay: `${railIndex * 0.22}s` }} />
          ))}
          <div className={`absolute left-[18%] top-[34%] h-16 w-16 rounded-2xl ${softGlow} blur-xl`} />
          <div className={`absolute right-[20%] top-[54%] h-20 w-20 rounded-2xl ${softGlow} blur-xl`} />
        </div>
      )}

      {scene.motif === 'agents' && (
        <div className="absolute inset-0">
          {[0, 1, 2, 3, 4].map((node) => (
            <span
              key={node}
              className={`absolute h-4 w-4 rounded-full ${accent} shadow-[0_0_34px_rgba(255,122,26,0.42)]`}
              style={{
                left: `${22 + Math.sin(node * 1.3) * 24 + 28}%`,
                top: `${22 + Math.cos(node * 1.1) * 24 + 28}%`,
              }}
            />
          ))}
          <div className="absolute inset-[18%] rounded-full border border-white/[0.08]" />
          <div className="absolute inset-[28%] rounded-full border border-brand/20" />
        </div>
      )}

      {scene.motif === 'wireframe' && (
        <div className="absolute inset-0">
          <div className={`absolute left-[14%] top-[20%] h-[58%] w-[72%] rounded-[2rem] border ${border} bg-white/[0.018]`}>
            <div className="absolute left-6 right-6 top-8 h-2 rounded-full bg-white/[0.08]" />
            <div className="absolute left-6 top-16 h-28 w-36 rounded-2xl border border-white/[0.07]" />
            <div className="absolute right-6 top-16 h-10 w-44 rounded-xl border border-white/[0.07]" />
            <div className="absolute bottom-8 left-6 right-6 h-16 rounded-2xl border border-white/[0.07]" />
          </div>
        </div>
      )}

      {scene.motif === 'infrastructure' && (
        <div className="absolute inset-0">
          {[0, 1, 2].map((layer) => (
            <div
              key={layer}
              className={`absolute left-[22%] h-20 w-[56%] rounded-2xl border ${border} bg-white/[0.025]`}
              style={{ top: `${24 + layer * 17}%`, transform: `translateX(${layer % 2 ? 18 : -18}px)` }}
            />
          ))}
          <div className="absolute inset-x-[28%] bottom-[18%] h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
        </div>
      )}

      {scene.motif === 'routes' && (
        <div className="absolute inset-0">
          {[18, 32, 50, 68].map((top, routeIndex) => (
            <div key={top} className="absolute left-[16%] flex w-[68%] items-center gap-3" style={{ top: `${top}%` }}>
              <span className={`h-2.5 w-2.5 rounded-full ${accent}`} />
              <span className="phase-pulse-line relative h-px flex-1" style={{ animationDelay: `${routeIndex * 0.18}s` }} />
              <span className="font-mono text-[8px] tracking-[0.22em] text-white/28">API</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

const REEL_TILE_STRIDE = 84

function GlobeReelTile({ scene, index, progress }: { scene: CapabilityScene; index: number; progress: MotionValue<number> }) {
  const Icon = scene.icon
  const center = index / (PHASE_COUNT - 1)
  const window = 0.18
  const fadeIn = Math.max(0, center - window)
  const fadeOut = Math.min(1, center + window)
  const isSteel = scene.color === 'steel'

  const opacityRange = index === 0 ? [1, 1, 0.32] : index === PHASE_COUNT - 1 ? [0.32, 1, 1] : [0.32, 1, 0.32]
  const tileOpacity = useTransform(progress, [fadeIn, center, fadeOut], opacityRange)
  const tileScale = useTransform(progress, [fadeIn, center, fadeOut], [0.92, 1, 0.92])
  const tileBlur = useTransform(progress, [fadeIn, center, fadeOut], ['blur(3px)', 'blur(0px)', 'blur(3px)'])
  const tileY = useTransform(progress, (p) => (index - p * (PHASE_COUNT - 1)) * REEL_TILE_STRIDE)

  return (
    <div className="absolute left-1/2 top-1/2 w-[min(72%,260px)] -translate-x-1/2 -translate-y-1/2">
      <motion.div
        data-capability-tile={scene.num}
        style={{ opacity: tileOpacity, scale: tileScale, filter: tileBlur, y: tileY }}
        className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-black/45 px-4 py-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      >
        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${isSteel ? 'border-steel/40 bg-steel/[0.08]' : 'border-brand/40 bg-brand/[0.08]'}`}>
          <Icon className={`h-4 w-4 ${isSteel ? 'text-steel' : 'text-brand'}`} strokeWidth={1.4} />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-brand/72">{scene.num}</span>
          <span className="font-heading text-[15px] font-medium leading-tight text-white">{scene.action}</span>
        </div>
      </motion.div>
    </div>
  )
}

function CapabilityGlobeReel({ progress, scenes }: { progress: MotionValue<number>; activeIndex: number; scenes: CapabilityScene[] }) {
  return (
    <div className="absolute inset-0 z-[5] overflow-hidden">
      {scenes.map((scene, index) => (
        <GlobeReelTile key={scene.num} scene={scene} index={index} progress={progress} />
      ))}
    </div>
  )
}

function CenteredCapabilityGlobe({
  progress,
  activeIndex,
  scenes,
}: {
  progress: MotionValue<number>
  activeIndex: number
  scenes: CapabilityScene[]
}) {
  const coreScale = useTransform(progress, [0, 0.5, 1], [0.9, 1.08, 0.96])
  const coreRotate = useTransform(progress, [0, 0.5, 1], [-4, 0, 4])
  const ringRotate = useTransform(progress, [0, 1], [-22, 26])
  const inverseRingRotate = useTransform(ringRotate, (value) => -value)
  const activeScene = scenes[activeIndex]

  return (
    <div
      data-capability-core
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(82vw,620px)] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="cinematic-foreground-haze absolute inset-[-18%]" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[2%] rounded-full border border-brand/[0.18] shadow-[0_0_100px_rgba(255,122,26,0.16)]"
        style={{ rotate: ringRotate }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[13%] rounded-full border border-steel/[0.2]"
        style={{ rotate: inverseRingRotate }}
      />
      <motion.div
        style={{ scale: coreScale, rotate: coreRotate }}
        className="absolute inset-[13%] overflow-hidden rounded-[2.5rem] glass-prismatic glass-refraction-edge soft-depth-shadow"
      >
        <div className="absolute inset-0 cinematic-grid opacity-[0.18]" />

        <div className="absolute inset-0 opacity-50">
          {scenes.map((scene, index) => (
            <MotifLayer key={scene.num} scene={scene} index={index} progress={progress} />
          ))}
        </div>

        <div className="absolute inset-x-8 top-8 z-10 flex items-center justify-between border-b border-white/[0.07] pb-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-white/42">CRE8VE CORE</span>
          <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_22px_rgba(255,122,26,0.72)]" />
        </div>

        <CapabilityGlobeReel progress={progress} activeIndex={activeIndex} scenes={scenes} />

        <div className="absolute bottom-8 left-8 right-8 z-10">
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-steel" style={{ scaleX: progress }} />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.22em] text-white/40">
            <span>{activeScene.num}</span>
            <span className="text-brand/72">{activeScene.action}</span>
            <span>{scenes[PHASE_COUNT - 1].num}</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function CapabilitySequenceRail({ progress, scenes }: { progress: MotionValue<number>; scenes: CapabilityScene[] }) {
  const leftRailY = useTransform(progress, [0, 1], [-80, 140])

  return (
    <div className="pointer-events-none absolute left-6 top-1/2 z-10 hidden w-[min(26vw,280px)] -translate-y-1/2 md:block lg:left-12">
      <motion.div data-capability-rail style={{ y: leftRailY }} className="pointer-events-auto rounded-3xl glass-subtle p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-brand/68">capability sequence</span>
        <div className="mt-6">
          {scenes.map((scene, index) => (
            <PhaseLabel key={scene.num} scene={scene} index={index} progress={progress} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function CapabilityExplainer({ scene }: { scene: CapabilityScene }) {
  const Icon = scene.icon

  return (
    <motion.div
      key={scene.num}
      data-capability-phase-detail={scene.num}
      initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={motionPatterns.coreMorph}
      className="absolute bottom-28 right-6 z-20 hidden w-[min(86vw,360px)] md:block lg:bottom-32 lg:right-12"
    >
      <div className="glass-prismatic glass-refraction-edge prismatic-sheen rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand/72">
              {scene.num} / {scene.action}
            </span>
            <h3 className="mt-2 font-heading text-xl font-medium tracking-tight text-white">{scene.title}</h3>
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand/30 bg-brand/[0.08] shadow-[0_0_24px_rgba(255,122,26,0.18)]">
            <Icon className="h-4 w-4 text-brand" strokeWidth={1.3} />
          </div>
        </div>
        <p className="copy-readable mt-3 text-[13px] leading-relaxed text-white/72">{scene.explainer}</p>
      </div>
    </motion.div>
  )
}

function CapabilityCoreScene({ progress }: { progress: MotionValue<number> }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(progress, 'change', (latest) => {
    const next = Math.min(PHASE_COUNT - 1, Math.max(0, Math.round(latest * (PHASE_COUNT - 1))))
    if (next !== activeIndex) setActiveIndex(next)
  })

  const activeScene = capabilityScenes[activeIndex]

  return (
    <div className="relative h-full min-h-screen w-full">
      <CapabilitySequenceRail progress={progress} scenes={capabilityScenes} />
      <CenteredCapabilityGlobe progress={progress} activeIndex={activeIndex} scenes={capabilityScenes} />
      <CapabilityExplainer scene={activeScene} />
    </div>
  )
}

function MobilePhaseList() {
  return (
    <div className="mt-12 grid gap-4 md:hidden">
      {capabilityScenes.map((scene) => {
        const Icon = scene.icon
        return (
          <div key={scene.num} className="glass-panel glass-refraction-edge rounded-3xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-[0.28em] text-brand/70">{scene.num}</span>
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.28em] text-brand/80">{scene.action}</span>
                <h3 className="mt-2 font-heading text-2xl text-white">{scene.title}</h3>
              </div>
              <Icon className="h-5 w-5 text-brand" strokeWidth={1.25} />
            </div>
            <p className="copy-readable mt-4 text-sm leading-relaxed">{scene.explainer}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {scene.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-white/56">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Capabilities() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="capabilities" className="relative cinematic-stage cinematic-grid">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[860px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.055] blur-[150px]" />
        <div className="absolute bottom-[8%] right-0 h-[680px] w-[680px] translate-x-1/3 rounded-full bg-steel/[0.05] blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 md:pt-36">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={motionTokens.reveal}
          className="font-mono text-[10px] uppercase tracking-[0.42em] text-brand/72"
        >
          {'// one core, six system states'}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...motionTokens.reveal, delay: 0.08 }}
          className="mt-5 max-w-4xl font-heading text-5xl font-light tracking-tight text-white md:text-8xl"
        >
          Capabilities become one product engine.
        </motion.h2>
      </div>

      <div ref={sceneRef} data-capabilities-scene className="relative z-10 px-6 md:h-[500vh]">
        <div className="hidden md:sticky md:top-0 md:block md:h-screen">
          <CapabilityCoreScene progress={scrollYProgress} />
        </div>
        <div className="mx-auto max-w-7xl pb-24">
          <MobilePhaseList />
        </div>
      </div>
    </section>
  )
}
