import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Capabilities from '@/components/Capabilities'
import Architecture from '@/components/Architecture'
import VideoShowcase from '@/components/VideoShowcase'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AmbientBackground from '@/components/AmbientBackground'
import CursorGlow from '@/components/CursorGlow'

export default function Home() {
  return (
    <>
      <Head>
        <title>Cre8ve | AI App Development & Intelligent Automation</title>
        <meta
          name="description"
          content="Cre8ve builds AI-powered applications and automation systems that real people actually use. From AI resume builders to intelligent assistants — custom AI development, done right."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://cre8ve.xyz" />
        <meta property="og:title" content="Cre8ve | AI App Development & Intelligent Automation" />
        <meta property="og:description" content="Custom AI app development and intelligent automation. We build AI products designed for real people — not just technical users." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cre8ve.xyz" />
        <meta property="og:image" content="https://cre8ve.xyz/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cre8ve | AI App Development & Intelligent Automation" />
        <meta name="twitter:description" content="Custom AI app development and intelligent automation. We build AI products designed for real people — not just technical users." />
        <meta name="twitter:image" content="https://cre8ve.xyz/og-image.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cre8ve",
              url: "https://cre8ve.xyz",
              logo: "https://cre8ve.xyz/og-image.png",
              description: "AI app development company building intelligent applications and automation systems.",
              email: "hello@cre8ve.xyz",
              sameAs: [
                "https://twitter.com/cre8vexyz",
                "https://github.com/cre8ve",
                "https://linkedin.com/company/cre8ve",
              ],
            }),
          }}
        />
      </Head>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
      >
        Skip to content
      </a>
      <AmbientBackground />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <VideoShowcase />
        <div className="section-divider" />
        <Capabilities />
        <div className="section-divider" />
        <Architecture />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
