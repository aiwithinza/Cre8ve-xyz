import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AmbientBackground from '@/components/AmbientBackground'
import CursorGlow from '@/components/CursorGlow'
import { caseStudies, CaseStudy } from '@/lib/case-studies'
import { usePIA } from '@/components/PIAContext'

interface Props {
  study: CaseStudy
}

const stageColors: Record<string, string> = {
  MVP: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Concept: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Production: 'bg-brand/20 text-brand border-brand/30',
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: caseStudies.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const study = caseStudies.find((s) => s.slug === params?.slug)
  if (!study) return { notFound: true }
  return { props: { study } }
}

export default function CaseStudyPage({ study }: Props) {
  const { open: openPIA } = usePIA()
  return (
    <>
      <Head>
        <title>{study.title} | Cre8ve</title>
        <meta name="description" content={study.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://cre8ve.xyz/work/${study.slug}`} />
        <meta property="og:title" content={`${study.title} | Cre8ve`} />
        <meta property="og:description" content={study.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://cre8ve.xyz/work/${study.slug}`} />
        <meta property="og:image" content="https://cre8ve.xyz/og-image.png" />
      </Head>
      <AmbientBackground />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-white/30 hover:text-brand transition-colors mb-16 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              BACK TO WORK
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-brand/60 text-[10px] tracking-[0.3em] uppercase">
                {study.category.replace('-', ' ')}
              </span>
              <span className={`font-mono text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${stageColors[study.stage]}`}>
                {study.stage}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-7xl font-light tracking-tight mb-6">
              {study.title}
            </h1>
            <p className="text-white/40 text-lg leading-relaxed max-w-2xl">
              {study.summary}
            </p>
            {study.stageNote && (
              <p className="text-brand/50 text-sm font-mono mt-4 tracking-wide">
                {study.stageNote}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-8">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-widest text-white/30 px-3 py-1 rounded-full border border-white/[0.06] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Purpose */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-mono text-[10px] tracking-[0.3em] text-brand/60 uppercase mb-4">Purpose</h2>
              <div className="glass-morphism rounded-2xl p-8 md:p-10">
                <p className="text-white/50 leading-relaxed">{study.purpose}</p>
              </div>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-mono text-[10px] tracking-[0.3em] text-brand/60 uppercase mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                    className="glass-morphism rounded-xl p-6 border-brand/10"
                  >
                    <p className="text-white/70 text-sm font-medium">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* What's Next */}
            {study.futureUpgrade && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-mono text-[10px] tracking-[0.3em] text-brand/60 uppercase mb-4">What&apos;s Next</h2>
                <div className="glass-morphism rounded-2xl p-8 md:p-10 border-brand/10">
                  <p className="text-white/50 leading-relaxed">{study.futureUpgrade}</p>
                </div>
              </motion.section>
            )}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-24 text-center"
          >
            <p className="font-mono text-[11px] text-white/20 tracking-widest uppercase mb-6">
              Want to collaborate on this project?
            </p>
            <button
              onClick={openPIA}
              className="inline-block px-14 py-6 bg-gradient-brand text-white font-medium rounded-full text-sm tracking-[0.2em] shadow-[0_20px_60px_rgba(255,122,26,0.2)] hover:shadow-[0_0_50px_rgba(255,122,26,0.3)] transition-all duration-500"
            >
              GET IN TOUCH
            </button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
