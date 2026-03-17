import { motion } from 'framer-motion'
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { WaveText } from "@/components/ui/wave-text"

export default function VideoShowcase() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#FF7A1A"
      />

      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-20 relative z-10 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-brand/60 text-[11px] tracking-[0.4em] uppercase mb-6 block"
          >
            {'// How We Work'}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-7xl lg:text-9xl font-light tracking-tight"
          >
            Architecture
            <br />
            <WaveText>in Motion</WaveText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-lg md:text-xl text-white/40 max-w-md font-light leading-relaxed"
          >
            From raw ideas to production-ready AI systems.
            We architect, build, and ship — with precision at every layer.
          </motion.p>
        </div>

        {/* Right content — Spline 3D */}
        <div className="flex-1 relative translate-x-16 md:translate-x-24">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
