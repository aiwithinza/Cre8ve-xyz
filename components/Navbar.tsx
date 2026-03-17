import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import BrandLogo from './BrandLogo'
import { motion, AnimatePresence } from 'framer-motion'
import { usePIA } from './PIAContext'

const links = [
  { href: '/work', label: 'WORK' },
  { href: '/about', label: 'ABOUT US' },
  { href: '/#capabilities', label: 'CAPABILITIES' },
  { href: '/#architecture', label: 'ARCHITECTURE' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { open: openPIA } = usePIA()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 py-6">
        <div className={`
          mx-auto transition-all duration-700 ease-in-out
          ${scrolled
            ? 'max-w-4xl glass-morphism rounded-full px-4 shadow-2xl shadow-black/50 border-white/10'
            : 'max-w-7xl px-6'
          }
        `}>
          <nav className="h-14 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <BrandLogo iconOnly={scrolled} className="scale-90" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-[10px] tracking-[0.25em] text-white/40 hover:text-brand transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={openPIA}
                className="font-mono text-[10px] tracking-[0.2em] px-6 py-2.5 bg-gradient-brand text-white font-semibold rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,122,26,0.3)] transition-all duration-300 shadow-[0_0_20px_rgba(255,122,26,0.15)] energy-border hover-pulse"
              >
                START A PROJECT
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-12">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-lg tracking-[0.3em] text-white/40 hover:text-brand transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setMobileOpen(false); openPIA(); }}
                className="px-10 py-5 bg-gradient-brand text-white font-medium rounded-full text-sm tracking-[0.1em] energy-border hover-pulse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 }}
              >
                START A PROJECT
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
