import { motion } from 'framer-motion'
import { WaveText } from '@/components/ui/wave-text'
import { usePIA } from './PIAContext'

export default function CTA() {
  const { open } = usePIA()

  return (
    <section id="cta" className="py-24 md:py-40 px-6 relative overflow-hidden bg-black">
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

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Value Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white/20 text-base md:text-lg font-light max-w-2xl mx-auto mb-16"
          >
            We don&apos;t just build AI. We build AI products people actually download, open, and use every day.
          </motion.p>

          <motion.span
            className="font-mono text-brand/60 text-[10px] tracking-[0.5em] uppercase mb-12 block"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* // READY FOR INITIALIZATION */}
          </motion.span>

          <h2 className="font-heading text-[clamp(2.5rem,8vw,9rem)] font-light leading-[0.9] tracking-tight mb-20 md:mb-24">
            LET&apos;S BUILD
            <br />
            SOMETHING <WaveText className="font-medium italic">REAL.</WaveText>
          </h2>

          <motion.button
            onClick={open}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,122,26,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-14 py-6 bg-gradient-brand text-white font-medium rounded-full transition-all duration-500 text-sm tracking-[0.2em] shadow-[0_20px_60px_rgba(255,122,26,0.2)] energy-border hover-pulse"
          >
            START A PROJECT
          </motion.button>

          {/* Scarcity micro-copy */}
          <p className="font-mono text-[10px] text-white/30 mt-10 tracking-[0.3em] uppercase">
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
