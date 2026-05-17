import { motion, useTransform } from 'framer-motion'
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { KineticText } from '@/components/CinematicText'
import { motionPatterns, motionTokens, useScrollScene, viewportOnce } from '@/hooks/useScrollScene'

export default function VideoShowcase() {
  const { ref, scrollYProgress } = useScrollScene<HTMLElement>()
  const copyY = useTransform(scrollYProgress, [0, 0.55, 1], [70, 0, -70])
  const robotX = useTransform(scrollYProgress, [0, 0.5, 1], [90, 0, -30])
  const robotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.96])
  const panelY = useTransform(scrollYProgress, [0, 1], [120, -120])
  const sourceLockY = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const stageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2.5, 0, 1.5])
  const orbitScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.78, 1, 1.08])

  return (
    <section ref={ref} data-spline-section className="relative min-h-[100svh] w-full overflow-hidden cinematic-stage cinematic-grid">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#FF7A1A"
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent z-[3]" />
      <div className="absolute inset-x-0 bottom-0 h-36 depth-fade z-[3]" />
      <div className="cinematic-foreground-haze absolute inset-y-0 right-0 z-[2] hidden w-1/2 md:block" />

      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <motion.div
          style={{ y: copyY }}
          className="flex-1 p-8 md:p-20 relative z-10 flex flex-col justify-center min-h-[50svh] md:min-h-[100svh]"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            className="font-mono text-brand/75 text-[11px] tracking-[0.4em] uppercase mb-6 block"
          >
            {'// How We Work'}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0.2, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={motionTokens.reveal}
            className="font-heading text-5xl md:text-7xl lg:text-9xl font-light tracking-tight"
          >
            <KineticText text="Architecture" delay={0.12} />
            <br />
            <span className="text-gradient-brand kinetic-mask">in Motion</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ ...motionTokens.reveal, delay: 0.14 }}
            className="mt-8 text-lg md:text-xl copy-readable max-w-md font-light leading-relaxed"
          >
            From raw ideas to production-ready AI systems.
            We architect, build, and ship — with precision at every layer.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
          transition={{ ...motionTokens.reveal, delay: 0.28 }}
            className="mt-10 w-full max-w-sm rounded-2xl glass-panel glass-refraction-edge p-4 prismatic-sheen"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="font-mono text-[9px] tracking-[0.28em] text-white/45 uppercase">core pickup</span>
              <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_18px_rgba(255,122,26,0.8)]" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {['SOURCE', 'SCENE', 'SYSTEM'].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ ...motionPatterns.orbitalLabel, delay: 0.38 + index * 0.08 }}
                  className="rounded-xl border border-brand/15 bg-brand/[0.05] px-3 py-2 text-center font-mono text-[9px] tracking-[0.18em] text-brand/75"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right content — Spline 3D */}
        <motion.div
          style={{ x: robotX, scale: robotScale, rotate: stageRotate }}
          className="flex-1 relative min-h-[50svh] md:min-h-[100svh] md:translate-x-16"
        >
          <div className="absolute inset-0 spline-stage-shell" />
          <div className="absolute inset-8 z-[4] hidden rounded-[2rem] border border-white/[0.04] md:block" />
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/15 shadow-[0_0_90px_rgba(255,122,26,0.16)]"
            style={{ scale: orbitScale }}
          />
          <div className="absolute inset-x-6 top-10 z-20 flex items-center justify-between rounded-2xl glass-subtle px-4 py-3 md:hidden">
            <span className="font-mono text-[9px] tracking-[0.24em] text-white/48 uppercase">3D sync</span>
            <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_18px_rgba(255,122,26,0.7)]" />
          </div>
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="relative z-10 w-full h-full min-h-[50svh] md:min-h-[100svh]"
          />
          <motion.div
            style={{ y: panelY }}
            className="absolute right-6 top-24 z-20 hidden w-56 rounded-2xl glass-subtle glass-refraction-edge p-4 md:block"
          >
            <span className="font-mono text-[9px] tracking-[0.28em] text-white/38 uppercase">camera sync</span>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand to-steel"
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              />
            </div>
          </motion.div>
          <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 rounded-full glass-subtle px-5 py-2 font-mono text-[9px] tracking-[0.28em] text-white/48 uppercase md:block">
            core object becomes product architecture
          </div>
          <motion.div
            style={{ y: sourceLockY }}
            className="absolute left-8 top-28 z-20 hidden w-44 rounded-2xl glass-subtle p-4 md:block"
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.26em] text-brand/70">source lock</span>
            <p className="mt-3 font-mono text-[9px] leading-relaxed tracking-[0.12em] text-white/42">
              terminal signal preserved through spatial scene
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
