import { Twitter, Github, Linkedin } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { usePIA } from './PIAContext'

const socials = [
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/cre8vexyz' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/cre8ve' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/cre8ve' },
]

const footerLinks = {
  Product: [
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'Architecture', href: '/#architecture' },
    { label: 'Work', href: '/work' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Start a Project', href: '#', isPIA: true },
  ],
} as const

export default function Footer() {
  const { open: openPIA } = usePIA()
  return (
    <footer className="py-20 border-t border-white/[0.04] px-6">
      <div className="max-w-7xl mx-auto">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <BrandLogo size="sm" />
            </div>
            <p className="font-mono text-[11px] text-white/40 leading-relaxed max-w-[200px]">
              AI products for real people.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {'isPIA' in link && link.isPIA ? (
                      <button
                        onClick={openPIA}
                        className="font-mono text-[11px] text-white/40 hover:text-brand transition-colors duration-200"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="font-mono text-[11px] text-white/40 hover:text-brand transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect Column */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-5">Connect</h4>
            <div className="flex items-center space-x-4 mb-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/20 hover:text-brand transition-colors duration-200"
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <a
              href="mailto:hello@cre8ve.xyz"
              className="font-mono text-[11px] text-white/40 hover:text-brand transition-colors duration-200"
            >
              hello@cre8ve.xyz
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[11px] text-white/40">
            &copy; {new Date().getFullYear()} Cre8ve Intelligence Lab. All rights reserved.
          </span>
          <span className="font-mono text-[11px] text-white/10">
            Built with purpose.
          </span>
        </div>
      </div>
    </footer>
  )
}
