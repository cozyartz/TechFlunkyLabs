import { Github, Mail, ExternalLink } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'AI Development', href: '#services' },
    { label: 'Infrastructure & DevOps', href: '#services' },
    { label: 'E-Commerce Platforms', href: '#services' },
    { label: 'Edge Applications', href: '#services' },
  ],
  resources: [
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Why Cloudflare', href: '#cloudflare' },
    { label: 'Tech Stack', href: '#stack' },
    { label: 'Projects', href: '#work' },
  ],
  company: [
    { label: 'GitHub', href: 'https://github.com/cozyartz', external: true },
    { label: 'Contact', href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-surface-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center font-bold text-white text-sm">
                TF
              </div>
              <span className="font-semibold text-lg text-surface-100">
                Tech Flunky Labs
              </span>
            </a>
            <p className="text-surface-400 mb-4 max-w-sm text-sm">
              AI-powered development and infrastructure. From edge applications to Docker deployments,
              we build and manage production-grade systems on modern cloud infrastructure.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/cozyartz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface-500 hover:text-surface-300 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@techflunkylabs.com"
                className="text-surface-500 hover:text-surface-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-surface-200 mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-surface-400 hover:text-surface-200 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-surface-200 mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-surface-400 hover:text-surface-200 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-surface-200 mb-4">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-surface-400 hover:text-surface-200 transition-colors text-sm"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-surface-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-surface-500">
            &copy; {new Date().getFullYear()} Tech Flunky Labs. All rights reserved.
          </p>
          <p className="text-sm text-surface-500">
            Built with Astro + Claude Code &middot; Deployed on Cloudflare
          </p>
        </div>
      </div>
    </footer>
  );
}
