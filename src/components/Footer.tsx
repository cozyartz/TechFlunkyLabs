import { Github, Mail, ExternalLink } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Edge-First Web & APIs', href: '#services' },
    { label: 'AI & MCP Agents', href: '#services' },
    { label: 'E-Commerce & Payments', href: '#services' },
    { label: 'Connected Hardware & IoT', href: '#services' },
  ],
  resources: [
    { label: 'Who We Help', href: '#who-we-help' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Projects', href: '#work' },
    { label: 'About', href: '#about' },
  ],
  company: [
    { label: 'GitHub', href: 'https://github.com/cozyartz', external: true },
    { label: 'Contact', href: '#contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-black relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-black border-2 border-[#e0ff00] flex items-center justify-center font-bold text-[#e0ff00] text-sm group-hover:bg-[#e0ff00] group-hover:text-black transition-all duration-300">
                TF
              </div>
              <span className="font-bold text-lg text-white group-hover:text-[#e0ff00] transition-colors">
                TechFlunky Labs
              </span>
            </a>
            <p className="text-surface-400 mb-4 max-w-sm text-sm">
              Edge, AI, and hardware for real-world products. A tiny development studio that ships
              Cloudflare-native apps, AI agents, and connected hardware prototypes.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/cozyartz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface-500 hover:text-[#e0ff00] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@techflunkylabs.com"
                className="text-surface-500 hover:text-[#e0ff00] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-surface-400 hover:text-[#e0ff00] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-surface-400 hover:text-[#e0ff00] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-surface-400 hover:text-[#e0ff00] transition-colors text-sm"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>

            {/* Legal links */}
            <h4 className="font-semibold text-white mt-6 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-surface-400 hover:text-[#e0ff00] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-surface-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-surface-500">
            &copy; {new Date().getFullYear()} TechFlunky Labs. All rights reserved.
          </p>
          <p className="text-sm text-surface-500">
            Built with <span className="text-[#e0ff00]">Astro + Three.js + Claude Code</span> &middot; Deployed on Cloudflare
          </p>
        </div>
      </div>
    </footer>
  );
}
