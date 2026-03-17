import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { usePIA } from '@/components/PIAContext'
import Footer from '@/components/Footer'
import AmbientBackground from '@/components/AmbientBackground'
import CursorGlow from '@/components/CursorGlow'

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function About() {
  const { open: openPIA } = usePIA()
  return (
    <>
      <Head>
        <title>About Us | Cre8ve</title>
        <meta name="description" content="Meet the founders of Cre8ve — Prayaga and Inza. From media intelligence to AI products, building technology that people can actually use." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://cre8ve.xyz/about" />
        <meta property="og:title" content="About Us | Cre8ve" />
        <meta property="og:description" content="Meet the founders of Cre8ve — building AI products for real people." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cre8ve.xyz/about" />
        <meta property="og:image" content="https://cre8ve.xyz/og-image.png" />
      </Head>
      <AmbientBackground />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <span className="font-mono text-brand/60 text-[10px] tracking-[0.4em] uppercase mb-6 block">
              Our Story
            </span>
            <h1 className="font-heading text-5xl md:text-8xl font-light tracking-tight">
              About Us.
            </h1>
          </motion.div>

          {/* Founders */}
          <motion.div
            {...fade}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Prayaga */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass-morphism rounded-2xl overflow-hidden group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/prayaga.jpg"
                    alt="Prayaga — Founder & CEO of Cre8ve"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="p-6 relative -mt-20 z-10">
                  <h3 className="text-xl font-heading font-light tracking-tight text-white/90">Prayaga</h3>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-brand/60 uppercase mt-1">Founder & CEO</p>
                </div>
              </motion.div>

              {/* Inza */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass-morphism rounded-2xl overflow-hidden group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/inza.jpg"
                    alt="Inza — Co-founder & COO of Cre8ve"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="p-6 relative -mt-20 z-10">
                  <h3 className="text-xl font-heading font-light tracking-tight text-white/90">Inza</h3>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-brand/60 uppercase mt-1">Co-Founder & COO</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Story */}
          <div className="space-y-16">
            {/* Opening */}
            <motion.section {...fade} transition={{ duration: 0.8 }}>
              <div className="glass-morphism rounded-2xl p-8 md:p-12">
                <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
                  We didn&apos;t start with AI.<br />
                  We started with <span className="text-white/90">understanding people</span>.
                </p>
                <p className="text-white/40 leading-relaxed mt-6">
                  In 2016, both of us began our careers at Wipro, working on media intelligence systems — analyzing how information flows, how narratives are shaped, and how people interact with digital platforms.
                </p>
                <p className="text-white/40 leading-relaxed mt-4">
                  Over the years, that curiosity evolved into expertise.
                </p>
              </div>
            </motion.section>

            {/* Prayaga */}
            <motion.section {...fade} transition={{ duration: 0.8, delay: 0.1 }}>
              <h2 className="font-mono text-[10px] tracking-[0.3em] text-brand/60 uppercase mb-4">Prayaga</h2>
              <div className="glass-morphism rounded-2xl p-8 md:p-12">
                <p className="text-white/40 leading-relaxed">
                  Prayaga went on to build her career in Canada across marketing, branding, and business development — before coming back to India to lead legacy businesses, media companies, and high-growth brands. From scaling traditional institutions like Neerozhukkil Vaidyasala to driving partnerships at Saina Infotainments, she developed a deep understanding of how businesses grow, position themselves, and create lasting impact.
                </p>
              </div>
            </motion.section>

            {/* Inza */}
            <motion.section {...fade} transition={{ duration: 0.8, delay: 0.1 }}>
              <h2 className="font-mono text-[10px] tracking-[0.3em] text-brand/60 uppercase mb-4">Inza</h2>
              <div className="glass-morphism rounded-2xl p-8 md:p-12">
                <p className="text-white/40 leading-relaxed">
                  At the same time, Inza moved into product marketing and emerging technologies — working closely with startups and Web3 ecosystems in the MENA region, building communities, designing growth systems, and helping products scale from zero to thousands of users.
                </p>
              </div>
            </motion.section>

            {/* Convergence */}
            <motion.section {...fade} transition={{ duration: 0.8, delay: 0.1 }}>
              <div className="glass-morphism rounded-2xl p-8 md:p-12 border-brand/10">
                <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light mb-6">
                  Different paths.<br />
                  One shared realization.
                </p>
                <p className="text-white/40 leading-relaxed">
                  Technology is evolving faster than people can keep up.
                </p>
                <p className="text-white/40 leading-relaxed mt-4">
                  AI is powerful — but for most people, it&apos;s still complicated, fragmented, and inaccessible.
                </p>
              </div>
            </motion.section>

            {/* Why Cre8ve */}
            <motion.section {...fade} transition={{ duration: 0.8, delay: 0.1 }}>
              <h2 className="font-mono text-[10px] tracking-[0.3em] text-brand/60 uppercase mb-4">Why Cre8ve</h2>
              <div className="glass-morphism rounded-2xl p-8 md:p-12">
                <p className="text-white/60 text-lg leading-relaxed font-light mb-6">
                  That&apos;s why we built Cre8ve.
                </p>
                <p className="text-white/40 leading-relaxed">
                  Not as another AI company.<br />
                  But as a <span className="text-white/70">bridge</span>.
                </p>
                <p className="text-white/40 leading-relaxed mt-4">
                  Cre8ve exists to turn complex intelligence into usable systems — products that feel natural, intuitive, and actually useful in everyday life.
                </p>
                <p className="text-white/40 leading-relaxed mt-4">
                  Today, we are building a new generation of AI applications — from career tools to intelligent assistants — designed for real people, not just technical users.
                </p>
              </div>
            </motion.section>

            {/* Closing */}
            <motion.section {...fade} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="text-center py-8">
                <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light italic">
                  Because the future of AI isn&apos;t just about what it can do.<br />
                  It&apos;s about how easily people can use it.
                </p>
              </div>
            </motion.section>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="font-mono text-[11px] text-white/20 tracking-widest uppercase mb-6">
              Want to work with us?
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
