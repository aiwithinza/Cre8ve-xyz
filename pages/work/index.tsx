import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AmbientBackground from '@/components/AmbientBackground'
import CursorGlow from '@/components/CursorGlow'
import { caseStudies } from '@/lib/case-studies'

const categoryColors: Record<string, string> = {
  'ai-agents': 'text-brand',
  infrastructure: 'text-steel',
  automation: 'text-emerald-400',
  interfaces: 'text-violet-400',
}

const stageColors: Record<string, string> = {
  MVP: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Concept: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Production: 'bg-brand/20 text-brand border-brand/30',
}

export default function Work() {
  return (
    <>
      <Head>
        <title>Work | Cre8ve</title>
        <meta name="description" content="Our production pipeline — AI apps and systems currently being built by Cre8ve." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://cre8ve.xyz/work" />
        <meta property="og:title" content="Work | Cre8ve" />
        <meta property="og:description" content="Our production pipeline — AI apps and systems currently being built by Cre8ve." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cre8ve.xyz/work" />
        <meta property="og:image" content="https://cre8ve.xyz/og-image.png" />
      </Head>
      <AmbientBackground />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <span className="font-mono text-brand/60 text-[10px] tracking-[0.4em] uppercase mb-6 block">
              Production Pipeline
            </span>
            <h1 className="font-heading text-5xl md:text-8xl font-light tracking-tight">
              Our Work.
            </h1>
          </motion.div>

          {/* Project Grid */}
          <div className="space-y-8">
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/work/${study.slug}`} className="block group">
                  <div className="glass-morphism rounded-2xl p-8 md:p-12 transition-all duration-500 hover:border-brand/30 hover:shadow-[0_0_60px_rgba(255,122,26,0.1)]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`font-mono text-[10px] tracking-[0.3em] uppercase ${categoryColors[study.category] || 'text-white/40'}`}>
                            {study.category.replace('-', ' ')}
                          </span>
                          <span className={`font-mono text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${stageColors[study.stage]}`}>
                            {study.stage}
                          </span>
                        </div>
                        <h2 className="font-heading text-2xl md:text-4xl font-light tracking-tight mb-4 group-hover:text-brand transition-colors duration-300">
                          {study.title}
                        </h2>
                        <p className="text-white/30 text-sm leading-relaxed max-w-xl">
                          {study.summary}
                        </p>
                        {study.stageNote && (
                          <p className="text-brand/50 text-xs font-mono mt-3 tracking-wide">
                            {study.stageNote}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-5">
                          {study.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[9px] tracking-widest text-white/30 px-3 py-1 rounded-full border border-white/[0.06] uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand/40 group-hover:bg-brand/10 transition-all duration-300">
                          <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-brand group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
