import { motion, useScroll, useTransform } from 'framer-motion'

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 0.6, 0.3, 0.5])
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Brand orange glow — top right */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-brand/[0.03] blur-[180px]"
        style={{ y: y1, opacity: opacity1 }}
      />
      {/* Steel blue glow — bottom left */}
      <motion.div
        className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-steel/[0.025] blur-[160px]"
        style={{ y: y2, opacity: opacity2 }}
      />
      {/* Subtle white center-top glow */}
      <motion.div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.01] blur-[140px]"
        style={{ y: y3 }}
      />
    </div>
  )
}
