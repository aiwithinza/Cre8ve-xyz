import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AmbientBackground from '@/components/AmbientBackground'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 | Cre8ve</title>
        <meta name="description" content="Page not found." />
      </Head>
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10 min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="font-mono text-brand/40 text-[10px] tracking-[0.4em] uppercase mb-6 block">
            Error 404
          </span>
          <h1 className="font-heading text-6xl md:text-9xl font-light tracking-tight mb-6">
            Lost in space.
          </h1>
          <p className="text-white/30 text-sm mb-12 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-10 py-4 bg-gradient-brand text-white font-medium rounded-full text-sm tracking-[0.2em] shadow-[0_20px_60px_rgba(255,122,26,0.2)] hover:shadow-[0_0_50px_rgba(255,122,26,0.3)] transition-all duration-500"
          >
            GO HOME
          </Link>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
