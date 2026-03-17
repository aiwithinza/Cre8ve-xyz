import React from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import BrandLogo from '@/components/BrandLogo'
import { usePIA } from '@/components/PIAContext'
import {
  BrainCircuit, Cpu, Network, Zap, Layers, Cable,
  ArrowRight, Circle,
} from 'lucide-react'

// ─── Shared motion config ───────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

// Plain object factory (not a hook) — safe to call anywhere
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.8, delay, ease: EASE },
})

// ─── Section wrapper ────────────────────────────────────────────────────────
function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-28 md:py-40 px-6 relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  )
}

// ─── Section label ──────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.4em] text-brand/60 uppercase mb-6 block">
      {children}
    </span>
  )
}

// ─── Section heading ────────────────────────────────────────────────────────
function Heading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-heading text-5xl md:text-7xl font-light tracking-tight leading-[0.9] ${className}`}>
      {children}
    </h2>
  )
}

// ─── Divider ────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="border-t border-white/[0.04] my-20" />
}

// ═══════════════════════════════════════════════════════════════════════════
export default function BrandPresentation() {
  const { open: openPIA } = usePIA()
  return (
    <>
      <Head>
        <title>Cre8ve — Brand Guidelines</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="bg-black text-white antialiased min-h-screen">

        {/* ── COVER ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand/[0.05] blur-[160px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-steel/[0.04] blur-[120px]" />
          </div>

          {/* Rotating constellation ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 400 400" className="w-[700px] h-[700px] opacity-[0.06]">
              <circle cx="200" cy="200" r="180" stroke="#FF7A1A" strokeWidth="0.5" fill="none" strokeDasharray="4 8" />
              <circle cx="200" cy="200" r="120" stroke="#4682B4" strokeWidth="0.5" fill="none" strokeDasharray="2 10" />
            </svg>
          </motion.div>

          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <motion.div
              className="flex justify-center mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              <BrandLogo size="md" />
            </motion.div>

            <motion.div
              className="font-mono text-[10px] tracking-[0.5em] text-white/20 uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Brand Guidelines · Version 1.0 · 2026
            </motion.div>

            <h1 className="font-heading text-[clamp(3rem,8vw,8rem)] font-extralight tracking-[-0.04em] leading-[0.85] text-white/90 mb-6">
              BRAND
              <br />
              <span
                className="font-semibold"
                style={{ backgroundImage: 'linear-gradient(135deg,#FF7A1A,#4682B4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } as React.CSSProperties}
              >
                BOOK.
              </span>
            </h1>

            <p className="text-white/30 font-light text-lg max-w-md mx-auto leading-relaxed mt-8">
              A complete system for how Cre8ve looks, speaks, and moves — derived from the production codebase.
            </p>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-brand/40 to-transparent"
            />
          </motion.div>
        </section>

        {/* ── 01 IDENTITY ────────────────────────────────────────────────── */}
        <Section id="identity">
          <motion.div {...reveal()}>
            <Label>01 — Brand Identity</Label>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div {...reveal(0.1)}>
              <Heading>What<br />We Are.</Heading>
              <p className="text-white/40 text-lg font-light leading-relaxed mt-8 max-w-md">
                An AI-native engineering partner. Not an agency. Not a SaaS product. We design and build the neural systems, infrastructure, and interfaces that enterprise-scale organizations run on.
              </p>
            </motion.div>

            <motion.div {...reveal(0.2)} className="space-y-4">
              {[
                { field: 'Brand Name', value: 'Cre8ve' },
                { field: 'Domain', value: 'Cre8ve.xyz' },
                { field: 'Legal Entity', value: 'Cre8ve Intelligence Lab' },
                { field: 'Category', value: 'AI Systems Architecture' },
                { field: 'Badge', value: 'Intelligence Engineered' },
              ].map((row, i) => (
                <motion.div
                  key={row.field}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE }}
                  className="flex items-baseline justify-between py-4 border-b border-white/[0.04]"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase">{row.field}</span>
                  <span className="font-heading text-white/80 text-sm">{row.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Divider />

          {/* Name construction */}
          <motion.div {...reveal(0.1)} className="max-w-3xl">
            <Label>Name Construction</Label>
            <div className="flex items-end gap-0 mb-8">
              {['C', 'r', 'e', '8', 'v', 'e'].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                  className="font-heading text-6xl md:text-9xl font-bold leading-none"
                  style={
                    (letter === 'C' || letter === '8'
                      ? { backgroundImage: 'linear-gradient(135deg,#FF7A1A,#4682B4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
                      : { color: 'rgba(255,255,255,0.15)' }) as React.CSSProperties
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { glyph: '8', title: 'Infinity & Scale', body: 'The numeral 8 on its side is the infinity symbol — referencing endless scale and structural strength.' },
                { glyph: '→', title: 'Systems Thinking', body: 'Replacing "ati" with a numeral signals optimized logic over conventional spelling.' },
                { glyph: '◐', title: 'Visual Anchor', body: 'In the wordmark the "8" is gradient-filled, making it the visual center of gravity.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  {...reveal(0.1 + i * 0.1)}
                  className="glass-morphism rounded-2xl p-6"
                >
                  <span className="font-mono text-brand text-2xl block mb-3">{item.glyph}</span>
                  <h4 className="font-heading text-white/80 font-medium mb-2">{item.title}</h4>
                  <p className="text-white/35 text-sm font-light leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ── 02 COLORS ──────────────────────────────────────────────────── */}
        <Section id="colors" className="bg-[#030303]">
          <motion.div {...reveal()}>
            <Label>02 — Color System</Label>
            <Heading className="mb-16">Colors<span className="text-brand">.</span></Heading>
          </motion.div>

          {/* Primary swatches */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
            {[
              { name: 'Pumpkin Orange', token: 'brand', hex: '#FF7A1A', rgb: '255, 122, 26', role: 'Primary accent', bg: '#FF7A1A', text: 'black' },
              { name: 'Steel Blue', token: 'steel', hex: '#4682B4', rgb: '70, 130, 180', role: 'Secondary accent', bg: '#4682B4', text: 'white' },
              { name: 'Pure Black', token: 'dark', hex: '#000000', rgb: '0, 0, 0', role: 'Background', bg: '#000000', text: 'white', border: true },
              { name: 'Deep Black', token: 'surface', hex: '#060606', rgb: '6, 6, 6', role: 'Card surfaces', bg: '#060606', text: 'white', border: true },
              { name: 'Pure White', token: '—', hex: '#FFFFFF', rgb: '255, 255, 255', role: 'Text & wordmark', bg: '#FFFFFF', text: 'black' },
            ].map((swatch, i) => (
              <motion.div
                key={swatch.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
                className="group cursor-default"
              >
                <div
                  className={`h-36 md:h-48 rounded-2xl mb-3 transition-transform duration-300 group-hover:scale-[1.02] ${swatch.border ? 'border border-white/10' : ''}`}
                  style={{ backgroundColor: swatch.bg }}
                />
                <p className="font-heading text-white/80 text-sm font-medium">{swatch.name}</p>
                <p className="font-mono text-white/30 text-[10px] tracking-widest mt-0.5">{swatch.hex}</p>
                <p className="font-mono text-brand/40 text-[9px] tracking-[0.15em] mt-0.5 uppercase">{swatch.role}</p>
              </motion.div>
            ))}
          </div>

          <Divider />

          {/* Gradients */}
          <motion.div {...reveal(0.1)}>
            <Label>Gradient System</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Brand Gradient (UI)',
                  desc: 'CTA buttons, gradient text, terminal glow',
                  css: 'linear-gradient(135deg, #FF7A1A 0%, #4682B4 100%)',
                  style: { background: 'linear-gradient(135deg, #FF7A1A 0%, #4682B4 100%)' },
                },
                {
                  name: 'Logo Gradient (Mark)',
                  desc: 'Crescent "C" and numeral "8" only',
                  css: 'linear-gradient(180deg, #4682B4 0%, #FF7A1A 100%)',
                  style: { background: 'linear-gradient(180deg, #4682B4 0%, #FF7A1A 100%)' },
                },
              ].map((g, i) => (
                <motion.div key={g.name} {...reveal(0.1 + i * 0.1)} className="glass-morphism rounded-2xl p-6">
                  <div className="h-20 rounded-xl mb-5" style={g.style} />
                  <h4 className="font-heading text-white/80 font-medium mb-1">{g.name}</h4>
                  <p className="text-white/30 text-sm font-light mb-3">{g.desc}</p>
                  <code className="font-mono text-[10px] text-brand/50 tracking-wide">{g.css}</code>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* Opacity scales */}
          <motion.div {...reveal(0.1)}>
            <Label>Opacity Scale — White</Label>
            <div className="space-y-2">
              {[
                { pct: '95%', cls: 'text-white/95', use: 'Hero display text' },
                { pct: '90%', cls: 'text-white/90', use: 'Card titles' },
                { pct: '50%', cls: 'text-white/50', use: 'Secondary button labels' },
                { pct: '40%', cls: 'text-white/40', use: 'Body copy, descriptions' },
                { pct: '30%', cls: 'text-white/30', use: 'Mono metrics, labels' },
                { pct: '20%', cls: 'text-white/20', use: 'Muted / testimonial' },
                { pct: '10%', cls: 'text-white/10', use: 'Dividers, decorative' },
              ].map((row, i) => (
                <motion.div
                  key={row.pct}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="flex items-center gap-4 py-2"
                >
                  <span className="font-mono text-[10px] text-white/20 w-8">{row.pct}</span>
                  <div className="flex-1 h-px" style={{ background: `rgba(255,255,255,${parseInt(row.pct) / 100})` }} />
                  <span className="font-mono text-[10px] text-white/25 text-right w-48 hidden md:block">{row.use}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ── 03 TYPOGRAPHY ──────────────────────────────────────────────── */}
        <Section id="typography">
          <motion.div {...reveal()}>
            <Label>03 — Typography</Label>
          </motion.div>

          {/* Typeface showcase */}
          <div className="space-y-16">
            {[
              {
                token: 'font-heading',
                family: 'Space Grotesk',
                role: 'Display / Headings',
                char: 'Aa',
                sample: 'Intelligence Engineered.',
                weight: 'font-light',
                desc: 'Geometric, architectural, modern. Used for all headlines and display copy.',
              },
              {
                token: 'font-sans',
                family: 'Inter',
                role: 'Body / UI Text',
                char: 'Aa',
                sample: 'We architect advanced neural systems.',
                weight: 'font-light',
                desc: 'Neutral, highly legible, screen-optimized. Default for all body copy.',
              },
              {
                token: 'font-mono',
                family: 'JetBrains Mono',
                role: 'Technical / Labels',
                char: '01',
                sample: 'LLM / RAG / MULTI-AGENT',
                weight: 'font-normal',
                desc: 'Monospace, code-native, precision. Reserved for metrics, tags, and system labels.',
              },
            ].map((face, i) => (
              <motion.div
                key={face.family}
                {...reveal(i * 0.1)}
                className="glass-morphism rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
              >
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-brand/40 uppercase block mb-2">{face.role}</span>
                  <h3 className="font-heading text-white/90 text-2xl font-medium mb-1">{face.family}</h3>
                  <code className="font-mono text-[10px] text-white/25">{face.token}</code>
                  <p className="text-white/30 text-sm font-light mt-3 leading-relaxed">{face.desc}</p>
                </div>
                <div className="md:col-span-2 flex items-center">
                  <span
                    className={`${face.weight} text-white/80 leading-none`}
                    style={{
                      fontFamily: face.family === 'JetBrains Mono' ? '"JetBrains Mono", monospace' : face.family === 'Space Grotesk' ? '"Space Grotesk", sans-serif' : 'Inter, sans-serif',
                      fontSize: 'clamp(2rem, 4vw, 4rem)',
                    }}
                  >
                    {face.sample}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <Divider />

          {/* Type scale */}
          <motion.div {...reveal(0.1)}>
            <Label>Type Scale</Label>
            <div className="space-y-6">
              {[
                { level: 'Hero Display', size: 'clamp(3.5rem,10vw,11rem)', weight: '200 + 600', tracking: '−0.04em', leading: '0.85' },
                { level: 'Section Heading', size: 'text-5xl–8xl', weight: '300', tracking: 'tight', leading: 'tight' },
                { level: 'CTA Display', size: 'clamp(2.5rem,8vw,9rem)', weight: '300 + 500', tracking: 'tight', leading: '0.9' },
                { level: 'Card Title', size: 'text-2xl–3xl', weight: '500', tracking: 'default', leading: 'snug' },
                { level: 'Body', size: 'text-lg–2xl', weight: '300', tracking: 'default', leading: 'relaxed' },
                { level: 'Mono Label', size: '9px–11px', weight: '400', tracking: '0.15em–0.5em', leading: '—' },
              ].map((row, i) => (
                <motion.div
                  key={row.level}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4 border-b border-white/[0.04] text-[11px] font-mono"
                >
                  <span className="text-white/60">{row.level}</span>
                  <span className="text-white/30">{row.size}</span>
                  <span className="text-white/30 hidden md:block">{row.weight}</span>
                  <span className="text-white/30 hidden md:block">{row.tracking}</span>
                  <span className="text-white/30 hidden md:block">{row.leading}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ── 04 LOGO ────────────────────────────────────────────────────── */}
        <Section id="logo" className="bg-[#030303]">
          <motion.div {...reveal()}>
            <Label>04 — Logo System</Label>
            <Heading className="mb-16">The Mark<span className="text-brand">.</span></Heading>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Wordmark on dark */}
            <motion.div {...reveal(0.1)} className="glass-morphism rounded-3xl p-12 flex flex-col items-center justify-center min-h-[280px] gap-6">
              <BrandLogo size="md" />
              <div className="text-center">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase block">Primary Wordmark</span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/15 block mt-1">SVG · viewBox 0 0 320 80 · height 34px</span>
              </div>
            </motion.div>

            {/* Icon mark */}
            <motion.div {...reveal(0.15)} className="glass-morphism rounded-3xl p-12 flex flex-col items-center justify-center min-h-[280px] gap-6">
              <BrandLogo iconOnly size="md" />
              <div className="text-center">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase block">Icon Mark</span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/15 block mt-1">SVG · viewBox 0 0 64 80 · Favicons / Avatars</span>
              </div>
            </motion.div>
          </div>

          {/* Logo anatomy */}
          <motion.div {...reveal(0.2)}>
            <Label>Logo Anatomy</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  part: 'Crescent "C"',
                  gradient: true,
                  detail: 'SVG crescent path. Gradient: Steel Blue (#4682B4) at 0% → Pumpkin Orange (#FF7A1A) at 60–100%. Direction: top → bottom.',
                },
                {
                  part: 'Letterforms "reve"',
                  gradient: false,
                  detail: 'Space Grotesk weight 500. Fill: #FFFFFF. Letter spacing: −1 unit. Size: 46px.',
                },
                {
                  part: 'Numeral "8"',
                  gradient: true,
                  detail: 'Space Grotesk weight 700. Same gradient as crescent. Size: 48px — 2px larger to assert visual weight.',
                },
              ].map((item, i) => (
                <motion.div key={item.part} {...reveal(0.1 + i * 0.1)} className="glass-morphism rounded-2xl p-6">
                  <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center"
                    style={item.gradient
                      ? { background: 'linear-gradient(135deg,#4682B4,#FF7A1A)' }
                      : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Circle className="w-3 h-3 text-white/80" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-heading text-white/80 font-medium mb-2">{item.part}</h4>
                  <p className="text-white/30 text-sm font-light leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* Usage rules */}
          <motion.div {...reveal(0.1)}>
            <Label>Usage Rules</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-heading text-white/60 font-light text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand inline-block" /> Do
                </h4>
                <ul className="space-y-3">
                  {[
                    'Use the wordmark as default in all formal brand contexts',
                    'Use the icon mark for sub-32px applications',
                    'Always render on dark backgrounds (#000 or #050505)',
                    'Animate with a 0.8s opacity fade-in on first render',
                  ].map((rule) => (
                    <li key={rule} className="text-white/40 text-sm font-light flex gap-3">
                      <span className="text-brand/60 font-mono text-[10px] mt-1">→</span> {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading text-white/60 font-light text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-steel inline-block" /> Do Not
                </h4>
                <ul className="space-y-3">
                  {[
                    'Invert the gradient colors',
                    'Recolor the white letterforms',
                    'Stretch or compress the SVG — height prop only',
                    'Add drop shadows to the mark itself',
                    'Place on white/light backgrounds without brand approval',
                  ].map((rule) => (
                    <li key={rule} className="text-white/40 text-sm font-light flex gap-3">
                      <span className="text-steel/60 font-mono text-[10px] mt-1">✕</span> {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* ── 05 ICONOGRAPHY ─────────────────────────────────────────────── */}
        <Section id="iconography">
          <motion.div {...reveal()}>
            <Label>05 — Iconography</Label>
            <Heading className="mb-16">Icons<span className="text-brand">.</span></Heading>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              { Icon: BrainCircuit, label: 'BrainCircuit', capability: 'AI Agents' },
              { Icon: Cpu, label: 'Cpu', capability: 'AI Applications' },
              { Icon: Network, label: 'Network', capability: 'Infrastructure' },
              { Icon: Zap, label: 'Zap', capability: 'Automation' },
              { Icon: Layers, label: 'Layers', capability: 'Interfaces' },
              { Icon: Cable, label: 'Cable', capability: 'Integrations' },
            ].map(({ Icon, label, capability }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="glass-morphism rounded-2xl p-6 flex flex-col items-center gap-4 group cursor-default hover:shadow-[0_0_30px_rgba(255,122,26,0.15)] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand/15 group-hover:border-brand/40 transition-all duration-500">
                  <Icon className="w-7 h-7 text-brand group-hover:scale-110 transition-transform duration-500" strokeWidth={1.4} />
                </div>
                <div className="text-center">
                  <p className="font-mono text-[9px] text-white/30 tracking-widest">{label}</p>
                  <p className="font-heading text-white/50 text-xs mt-1">{capability}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...reveal(0.2)} className="glass-morphism rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Library', value: 'Lucide React' },
              { label: 'Stroke Width', value: '1.4' },
              { label: 'Style', value: 'Thin-line futuristic' },
              { label: 'Fill', value: 'Never — stroke only' },
            ].map((item) => (
              <div key={item.label}>
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase block mb-1">{item.label}</span>
                <span className="font-heading text-white/70 text-sm">{item.value}</span>
              </div>
            ))}
          </motion.div>
        </Section>

        {/* ── 06 MOTION ──────────────────────────────────────────────────── */}
        <Section id="motion" className="bg-[#030303]">
          <motion.div {...reveal()}>
            <Label>06 — Motion & Animation</Label>
            <Heading className="mb-6">Motion<span className="text-brand">.</span></Heading>
            <p className="text-white/30 font-light text-lg max-w-xl mb-16">
              Every animation uses the Cre8ve ease — fast acceleration that settles with high-tension deceleration. Engineered, not springy.
            </p>
          </motion.div>

          {/* Easing demo */}
          <motion.div {...reveal(0.1)} className="glass-morphism rounded-3xl p-8 md:p-12 mb-8">
            <Label>Signature Easing Function</Label>
            <code className="font-mono text-brand text-xl md:text-3xl block mb-6">
              cubic-bezier(0.16, 1, 0.3, 1)
            </code>
            <div className="flex gap-4 flex-wrap">
              {['0.16', '1', '0.3', '1'].map((val, i) => (
                <div key={i} className="glass rounded-lg px-4 py-2">
                  <span className="font-mono text-[10px] text-white/20 block uppercase">{['x1', 'y1', 'x2', 'y2'][i]}</span>
                  <span className="font-mono text-white/60 text-sm">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Named animations */}
          <motion.div {...reveal(0.15)}>
            <Label>Named Animations</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'subtle-drift', duration: '6s infinite', type: 'Ambient', desc: 'Floating: translateY(−10px) translateX(5px) at 50%' },
                { name: 'fade-in-up', duration: '0.6s forwards', type: 'Entrance', desc: 'translateY(24px) → 0, opacity 0 → 1' },
                { name: 'dash-flow', duration: '2s linear ∞', type: 'SVG', desc: 'strokeDashoffset to −24, flowing line effect' },
                { name: 'glow-pulse', duration: '3s ease ∞', type: 'Ambient', desc: 'Box shadow 15px ↔ 50px orange glow' },
                { name: 'shimmer', duration: '2s linear ∞', type: 'Loading', desc: 'backgroundPosition sweep −1000px → 1000px' },
                { name: 'spotlight', duration: '2s · delay 0.75s', type: 'Reveal', desc: 'Scale 0.5 → 1, opacity 0 → 1 with translate' },
              ].map((anim, i) => (
                <motion.div
                  key={anim.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                  className="glass-morphism rounded-2xl p-5 flex gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-brand/60 mt-1.5 shrink-0 animate-pulse" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <code className="font-mono text-brand/80 text-xs">{anim.name}</code>
                      <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">{anim.type}</span>
                    </div>
                    <p className="font-mono text-[10px] text-white/20">{anim.duration}</p>
                    <p className="text-white/35 text-sm font-light mt-1">{anim.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* Principles */}
          <motion.div {...reveal(0.1)}>
            <Label>Animation Principles</Label>
            <div className="space-y-4">
              {[
                { n: '01', rule: 'Every entrance is earned.', detail: 'Elements animate in once (once: true) — they do not loop on scroll.' },
                { n: '02', rule: 'Ambient animations run at low opacity.', detail: 'Floating, pulsing, drifting effects are background-layer — opacity <10% at peak.' },
                { n: '03', rule: 'Interactions are instant-feeling.', detail: 'Scale and glow on hover/tap complete in 300–500ms.' },
                { n: '04', rule: 'Duration scales with content weight.', detail: 'Badge: 0.6s. Hero headline: 1s. Never above 1.2s for content.' },
                { n: '05', rule: 'No layout-shifting animations.', detail: 'All motion is transform-only — translate and scale only.' },
              ].map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-6 py-4 border-b border-white/[0.04]"
                >
                  <span className="font-mono text-[10px] text-brand/30 mt-0.5 w-6 shrink-0">{p.n}</span>
                  <div>
                    <p className="text-white/70 font-heading font-medium text-sm">{p.rule}</p>
                    <p className="text-white/30 text-sm font-light mt-1">{p.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ── 07 UI DESIGN LANGUAGE ──────────────────────────────────────── */}
        <Section id="ui">
          <motion.div {...reveal()}>
            <Label>07 — UI Design Language</Label>
            <Heading className="mb-16">Design Language<span className="text-brand">.</span></Heading>
          </motion.div>

          {/* Glassmorphism */}
          <motion.div {...reveal(0.1)}>
            <Label>Surface Hierarchy</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {[
                { level: 'Level 0 — Base', bg: '#000000', label: 'Body background', cls: 'border border-white/10' },
                { level: 'Level 1 — Surface', bg: 'rgba(6,6,6,0.5)', label: '.glass-morphism · Cards', cls: 'backdrop-blur-xl border border-white/[0.08]' },
                { level: 'Level 2 — Elevated', bg: 'rgba(255,255,255,0.02)', label: '.glass · Navbar / Overlays', cls: 'backdrop-blur-2xl border border-white/[0.06]' },
              ].map((surface, i) => (
                <motion.div
                  key={surface.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className={`rounded-2xl p-8 min-h-[160px] flex flex-col justify-between ${surface.cls}`}
                  style={{ background: surface.bg }}
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] text-brand/40 uppercase">{surface.level}</span>
                  <span className="text-white/30 text-sm font-light">{surface.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Button system */}
          <motion.div {...reveal(0.1)}>
            <Label>Button System</Label>
            <div className="flex flex-wrap gap-4 mb-16">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(255,122,26,0.3)' }}
                whileTap={{ scale: 0.96 }}
                className="px-10 py-4 bg-gradient-brand text-white font-medium rounded-full text-sm tracking-[0.2em] shadow-[0_20px_60px_rgba(255,122,26,0.2)] cursor-pointer"
              >
                START A PROJECT
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.96 }}
                className="px-10 py-4 border border-white/10 text-white/50 font-medium rounded-full text-sm tracking-[0.2em] cursor-pointer transition-colors duration-300"
              >
                VIEW CAPABILITIES
              </motion.button>
              <div className="px-6 py-2 bg-brand/5 border border-brand/20 text-brand/80 font-mono text-[10px] tracking-[0.4em] rounded-full flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Intelligence Engineered
              </div>
            </div>
          </motion.div>

          {/* Effect classes */}
          <motion.div {...reveal(0.15)}>
            <Label>CSS Effect Classes</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { cls: '.text-gradient-brand', desc: '135° Orange → Steel gradient text' },
                { cls: '.gradient-glow', desc: 'Radial orange ambient glow at 8% opacity' },
                { cls: '.gradient-glow-steel', desc: 'Radial steel ambient glow at 6% opacity' },
                { cls: '.glass', desc: 'Ultra-thin glassmorphism (white/2%, blur-2xl)' },
                { cls: '.glass-morphism', desc: 'Standard glassmorphism (surface/50, blur-xl)' },
                { cls: '.particle-bg', desc: '60px grid, white lines at 2.5% opacity' },
                { cls: '.neon-border', desc: 'brand/20 border + 15px orange glow shadow' },
                { cls: '.neon-border-hover', desc: 'Intensifies to brand/40 + 25px glow on hover' },
                { cls: '.noise-overlay', desc: 'SVG fractalNoise texture at 4% opacity' },
                { cls: '.bg-gradient-brand', desc: '135° orange→steel solid gradient fill' },
              ].map((item, i) => (
                <motion.div
                  key={item.cls}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="flex gap-4 py-3 border-b border-white/[0.04]"
                >
                  <code className="font-mono text-brand/60 text-[11px] w-48 shrink-0">{item.cls}</code>
                  <span className="text-white/30 text-sm font-light">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ── 08 VOICE & TONE ────────────────────────────────────────────── */}
        <Section id="voice" className="bg-[#030303]">
          <motion.div {...reveal()}>
            <Label>08 — Voice & Tone</Label>
            <Heading className="mb-16">How We Speak<span className="text-brand">.</span></Heading>
          </motion.div>

          {/* 4 pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { n: '01', name: 'Declarative Authority', yes: 'AI SYSTEMS AT SCALE.', no: 'We help companies scale their AI.' },
              { n: '02', name: 'Technical Precision', yes: 'Fault-tolerant cloud-native environments built for heavy GPU-intensive compute.', no: 'Powerful cloud solutions for your AI needs.' },
              { n: '03', name: 'Cinematic Scale', yes: 'High-fidelity digital infrastructure for the next generation of global enterprises.', no: 'Digital infrastructure for growing companies.' },
              { n: '04', name: 'Quiet Confidence', yes: '99.9% Uptime SLA. $2B+ Data Processed.', no: 'Industry-leading reliability. Massive scale.' },
            ].map((pillar, i) => (
              <motion.div key={pillar.n} {...reveal(i * 0.1)} className="glass-morphism rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-brand/30 text-[10px] tracking-widest">{pillar.n}</span>
                  <h3 className="font-heading text-white/80 font-medium">{pillar.name}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 p-3 rounded-xl bg-brand/5 border border-brand/10">
                    <span className="font-mono text-brand/60 text-[10px] mt-0.5 shrink-0">✓</span>
                    <p className="text-white/60 text-sm font-light">{pillar.yes}</p>
                  </div>
                  <div className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="font-mono text-white/20 text-[10px] mt-0.5 shrink-0">✕</span>
                    <p className="text-white/25 text-sm font-light">{pillar.no}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Divider />

          {/* Vocabulary */}
          <motion.div {...reveal(0.1)}>
            <Label>Brand Vocabulary</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ['Architect', 'Build / Make'],
                ['Neural systems', 'AI tools'],
                ['Infrastructure', 'Setup / Backend'],
                ['Autonomous', 'Automated / Smart'],
                ['Enterprise', 'Business / Client'],
                ['Deploy', 'Launch / Ship'],
                ['Partners', 'Clients / Users'],
                ['Orchestration', 'Management'],
                ['Fault-tolerant', 'Reliable / Stable'],
                ['High-fidelity', 'High-quality'],
                ['Engineered', 'Built / Made'],
                ['Intelligence', 'Smarts / Power'],
              ].map(([use, avoid], i) => (
                <motion.div
                  key={use}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="glass-morphism rounded-xl p-4"
                >
                  <p className="font-heading text-white/80 text-sm font-medium mb-1">{use}</p>
                  <p className="font-mono text-[9px] text-white/20 tracking-widest line-through">{avoid}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ── 09 MESSAGING ───────────────────────────────────────────────── */}
        <Section id="messaging">
          <motion.div {...reveal()}>
            <Label>09 — Messaging Architecture</Label>
            <Heading className="mb-16">The Message<span className="text-brand">.</span></Heading>
          </motion.div>

          {/* Tagline hierarchy */}
          <motion.div {...reveal(0.1)} className="mb-16">
            <Label>Tagline Hierarchy</Label>
            <div className="space-y-3">
              {[
                { tier: 'Hero Badge', copy: 'Intelligence Engineered', size: 'text-sm', opacity: 'text-brand/80' },
                { tier: 'Hero Headline', copy: 'AI SYSTEMS AT SCALE.', size: 'text-2xl md:text-4xl', opacity: 'text-white/90' },
                { tier: 'Sub-Headline', copy: 'We architect advanced neural systems and high-fidelity digital infrastructure for the next generation of global enterprises.', size: 'text-base', opacity: 'text-white/50' },
                { tier: 'Footer', copy: 'Intelligent systems and autonomous infrastructure for the next era of enterprise.', size: 'text-sm', opacity: 'text-white/40' },
                { tier: 'CTA Headline', copy: "LET'S ARCHITECT THE FUTURE.", size: 'text-2xl md:text-4xl', opacity: 'text-white/90' },
                { tier: 'Scarcity', copy: 'Accepting 3 new partners this quarter.', size: 'text-sm', opacity: 'text-white/30' },
              ].map((item, i) => (
                <motion.div
                  key={item.tier}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                  className="flex gap-6 py-5 border-b border-white/[0.04] items-baseline"
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/15 uppercase w-28 shrink-0">{item.tier}</span>
                  <p className={`font-heading ${item.size} ${item.opacity} font-light`}>{item.copy}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Six pillars */}
          <motion.div {...reveal(0.1)}>
            <Label>The Six Capability Pillars</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { n: '01', title: 'AI Agents', desc: 'Autonomous entities designed to execute complex, multi-stage reasoning and task completion.', tags: 'LLM / RAG / MULTI-AGENT' },
                { n: '02', title: 'AI Applications', desc: 'High-fidelity user interfaces powered by proprietary language models and visual intelligence.', tags: 'NEXT.JS / REACT / SWIFT' },
                { n: '03', title: 'Infrastructure', desc: 'Scalable, fault-tolerant cloud-native environments built for heavy GPU-intensive compute.', tags: 'AWS / GCP / KUBERNETES' },
                { n: '04', title: 'Automation', desc: 'End-to-end workflow orchestration layers that eliminate operational friction at scale.', tags: 'PIPELINES / CI-CD / CRON' },
                { n: '05', title: 'Interfaces', desc: 'Minimalistic, hyper-intuitive control planes for seamless human-machine collaboration.', tags: 'DASHBOARDS / APIs / CLI' },
                { n: '06', title: 'Integrations', desc: 'Neural middleware that connects decentralized intelligence to legacy enterprise ecosystems.', tags: 'REST / gRPC / WEBHOOKS' },
              ].map((item, i) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="glass-morphism rounded-2xl p-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-mono text-brand/30 text-[10px] tracking-widest">{item.n}</span>
                    <span className="font-mono text-[9px] text-brand/40 tracking-[0.15em] px-2 py-1 rounded-full border border-brand/20 bg-brand/5">{item.tags}</span>
                  </div>
                  <h4 className="font-heading text-white/85 font-medium text-xl mb-2">{item.title}</h4>
                  <p className="text-white/35 text-sm font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ── 10 DIGITAL PRESENCE ────────────────────────────────────────── */}
        <Section id="presence" className="bg-[#030303]">
          <motion.div {...reveal()}>
            <Label>10 — Digital Presence</Label>
            <Heading className="mb-16">Channels<span className="text-brand">.</span></Heading>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div {...reveal(0.1)} className="space-y-4">
              {[
                { label: 'Website', value: 'cre8ve.xyz' },
                { label: 'Email', value: 'hello@cre8ve.xyz' },
                { label: 'Twitter / X', value: '@cre8vexyz' },
                { label: 'GitHub', value: 'github.com/cre8ve' },
                { label: 'LinkedIn', value: 'linkedin.com/company/cre8ve' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                  className="flex items-center justify-between py-4 border-b border-white/[0.04]"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase">{item.label}</span>
                  <span className="font-heading text-white/60 text-sm">{item.value}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...reveal(0.2)} className="glass-morphism rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <Label>Page Structure Rule</Label>
                <p className="text-white/30 text-sm font-light leading-relaxed mb-6">
                  The public website is restricted to four sections in sequence. No section shall be added without explicit strategic justification.
                </p>
                <div className="space-y-3">
                  {[
                    { n: '1', name: 'Hero', desc: 'Brand statement, constellation, terminal, social proof' },
                    { n: '2', name: 'Capabilities', desc: 'Six-pillar bento grid' },
                    { n: '3', name: 'Architecture', desc: 'System topology diagram' },
                    { n: '4', name: 'CTA', desc: 'Testimonial, headline, email capture' },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-3">
                      <span className="font-mono text-brand/30 text-[10px] w-4 mt-0.5">{s.n}</span>
                      <div>
                        <span className="font-heading text-white/60 text-sm font-medium">{s.name}</span>
                        <span className="text-white/25 text-xs font-light ml-2">{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ── CLOSE ──────────────────────────────────────────────────────── */}
        <section className="py-40 px-6 relative overflow-hidden bg-black text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/[0.05] blur-[140px]" />
          </div>
          <motion.div
            className="relative z-10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <div className="flex justify-center mb-12">
              <BrandLogo size="md" />
            </div>
            <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] font-light leading-[0.88] tracking-tight mb-10">
              ENGINEERED
              <br />
              FOR{' '}
              <span
                className="font-medium italic"
                style={{ backgroundImage: 'linear-gradient(135deg,#FF7A1A,#4682B4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } as React.CSSProperties}
              >
                EXCELLENCE.
              </span>
            </h2>
            <motion.button
              onClick={openPIA}
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(255,122,26,0.3)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-brand text-white font-medium rounded-full text-sm tracking-[0.2em] shadow-[0_20px_60px_rgba(255,122,26,0.2)] cursor-pointer transition-shadow duration-500"
            >
              START A PROJECT <ArrowRight className="w-4 h-4" />
            </motion.button>
            <p className="font-mono text-[10px] text-white/15 tracking-[0.3em] mt-8 uppercase">
              Cre8ve Intelligence Lab · Brand Book v1.0 · 2026
            </p>
          </motion.div>
        </section>

      </div>
    </>
  )
}
