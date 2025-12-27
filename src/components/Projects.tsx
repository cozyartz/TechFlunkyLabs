import { motion } from 'framer-motion';
import { ExternalLink, Github, Zap, ShoppingBag, BookOpen, Mail, MapPin, Bot } from 'lucide-react';

const projects = [
  {
    title: 'TechFlunky Marketplace',
    description: 'AI-powered marketplace for validated business blueprints. Buy and sell startup concepts with secure escrow and integrated AI tools.',
    tech: ['Astro', 'Cloudflare Workers', 'D1', 'AI'],
    icon: Zap,
    color: 'from-primary-500 to-primary-600',
    link: 'https://techflunky.com',
    github: 'https://github.com/cozyartz/techflunky',
  },
  {
    title: 'Spamidate',
    description: 'AI-powered email validation API with sub-100ms response times and 99.9% accuracy on Cloudflare Edge.',
    tech: ['TypeScript', 'Cloudflare Workers', 'AI', 'API'],
    icon: Mail,
    color: 'from-accent-500 to-accent-600',
    link: 'https://spamidate.com',
    github: 'https://github.com/cozyartz/spamidate',
  },
  {
    title: 'Nuggsandco',
    description: 'Modern e-commerce platform built with Medusa.js on Cloudflare infrastructure. Headless commerce with complete customization.',
    tech: ['Medusa.js', 'TypeScript', 'PostgreSQL', 'Cloudflare'],
    icon: ShoppingBag,
    color: 'from-green-500 to-green-600',
    link: 'https://nuggsandco.com',
    github: 'https://github.com/cozyartz/nuggsandco',
  },
  {
    title: 'AstroLMS',
    description: 'Learning Management System with AI-powered content generation, multi-tenant architecture, and HIPAA compliance.',
    tech: ['Next.js', 'AI', 'PostgreSQL', 'Multi-tenant'],
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    github: 'https://github.com/cozyartz/AstroLMS',
  },
  {
    title: 'Michigan Spots',
    description: 'Location-based discovery platform for Michigan destinations. Interactive maps and community-driven content.',
    tech: ['TypeScript', 'Astro', 'Maps API', 'D1'],
    icon: MapPin,
    color: 'from-emerald-500 to-emerald-600',
    github: 'https://github.com/cozyartz/michiganspots',
  },
  {
    title: 'RFP AI Assistant',
    description: 'AI-powered RFP response system. Automates proposal generation with intelligent content matching.',
    tech: ['TypeScript', 'Claude AI', 'Cloudflare', 'Workers'],
    icon: Bot,
    color: 'from-purple-500 to-purple-600',
    github: 'https://github.com/cozyartz/RFPai-assistant',
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-24 px-6 bg-surface-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-surface-400 max-w-2xl mx-auto">
            Real applications built for production. Edge-first, AI-powered, and scalable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-surface-900 border border-surface-800 overflow-hidden hover:border-surface-700 transition-all duration-300"
            >
              {/* Gradient header */}
              <div className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <project.icon className="w-12 h-12 text-white/90" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-surface-100">
                  {project.title}
                </h3>

                <p className="text-surface-400 text-sm mb-4">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-surface-800 text-surface-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Site
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-surface-400 hover:text-surface-300 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/cozyartz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-surface-400 hover:text-surface-200 transition-colors"
          >
            <Github className="w-5 h-5" />
            View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
