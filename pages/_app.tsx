import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { PIAProvider } from '@/components/PIAContext'
import PIAChatbot from '@/components/PIAChatbot'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PIAProvider>
      <div className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <Component {...pageProps} />
        <PIAChatbot />
        <Analytics />
      </div>
    </PIAProvider>
  )
}
