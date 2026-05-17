import { motion, useTransform } from 'framer-motion'
import { KineticText } from '@/components/CinematicText'
import { usePIA } from './PIAContext'
import { motionPatterns, motionTokens, useScrollScene, viewportOnce } from '@/hooks/useScrollScene'

export default function CTA() {
  const { open } = usePIA()
  const { ref, scrollYProgress } = useScrollScene<HTMLElement>()
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04])
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -20])
  const buttonGlow = useTransform(scrollYProgress, [0, 0.58, 1], [0.18, 0.46, 0.34])
  const fragments = [
    { cls: 'left-[10%] top-[18%] h-20 w-28', x: [80, 0], y: [-80, 0], rotate: [-20, 0] },
    { cls: 'right-[12%] top-[22%] h-24 w-24', x: [-70, 0], y: [-60, 0], rotate: [18, 0] },
    { cls: 'left-[18%] bottom-[18%] h-16 w-36', x: [65, 0], y: [70, 0], rotate: [14, 0] },
    { cls: 'right-[17%] bottom-[20%] h-20 w-32', x: [-80, 0], y: [76, 0], rotate: [-16, 0] },
  ]

  return (
    <section ref={ref} id="cta" className="py-24 md:py-40 px-6 relative overflow-hidden cinematic-stage cinematic-grid">
      {/* Background Effects */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-brand/[0.05] blur-[140px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] translate-y-1/2 -translate-x-1/2 rounded-full bg-steel/[0.04] blur-[140px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

      {fragments.map((fragment, index) => (
        <motion.div
          key={fragment.cls}
          aria-hidden="true"
          className={`absolute hidden rounded-2xl glass-subtle glass-refraction-edge md:block ${fragment.cls}`}
          initial={{ opacity: 0, x: fragment.x[0], y: fragment.y[0], rotate: fragment.rotate[0] }}
          whileInView={{ opacity: 0.18, x: fragment.x[1], y: fragment.y[1], rotate: fragment.rotate[1] }}
          viewport={viewportOnce}
          transition={{ ...motionPatterns.fragmentConverge, delay: 0.12 + index * 0.12 }}
        />
      ))}

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={motionTokens.reveal}
        >
          {/* Value Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ ...motionTokens.reveal, delay: 0.16 }}
            className="copy-readable text-base md:text-lg font-light max-w-2xl mx-auto mb-16"
          >
            We don&apos;t just build AI. We build AI products people actually download, open, and use every day.
          </motion.p>

          <motion.span
            className="font-mono text-brand/75 text-[10px] tracking-[0.5em] uppercase mb-12 block"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {'// CORE RESOLVED / READY TO SHIP'}
          </motion.span>

          <motion.h2
            style={{ scale: titleScale, y: titleY }}
            className="font-heading text-[clamp(2.5rem,8vw,9rem)] font-light leading-[0.9] tracking-tight mb-20 md:mb-24"
          >
            <KineticText text="LET'S BUILD" delay={0.1} stagger={0.05} />
            <br />
            <span>SOMETHING </span>
            <KineticText text="REAL." className="inline-block text-gradient-brand kinetic-mask font-medium italic" delay={0.38} mode="letter" stagger={0.035} />
          </motion.h2>

          <div className="relative mx-auto inline-flex">
            <motion.div
              aria-hidden="true"
              className="absolute -inset-12 rounded-full border border-brand/20"
              initial={{ opacity: 0, scale: 1.24 }}
              whileInView={{ opacity: 0.55, scale: 1 }}
              viewport={viewportOnce}
              transition={motionPatterns.fragmentConverge}
            />
            <motion.div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-brand blur-3xl"
              style={{ opacity: buttonGlow }}
            />
            <motion.button
              onClick={open}
              whileHover={{ scale: 1.035, boxShadow: "0 0 70px rgba(255,122,26,0.38)" }}
              whileTap={{ scale: 0.97 }}
              transition={motionTokens.quick}
              className="pressable relative px-14 py-6 bg-gradient-brand text-white font-medium rounded-full text-sm tracking-[0.2em] shadow-[0_24px_80px_rgba(255,122,26,0.28)] energy-border"
            >
              START A PROJECT
            </motion.button>
          </div>

          {/* Scarcity micro-copy */}
          <p className="font-mono text-[10px] text-white/46 mt-10 tracking-[0.3em] uppercase">
            Currently accepting new projects
          </p>
        </motion.div>
      </div>

      {/* Decorative Bottom Label */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-[0.02] select-none pointer-events-none"
        style={{ perspective: 1000 }}
      >
        <motion.span
          initial={{ rotateX: 45, y: 100 }}
          whileInView={{ rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="text-[15vw] md:text-[20vw] font-heading font-bold whitespace-nowrap block"
        >
          CRE8VE.XYZ
        </motion.span>
      </motion.div>
    </section>
  )
}
