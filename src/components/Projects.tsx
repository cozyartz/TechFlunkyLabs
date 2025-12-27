import { motion } from 'framer-motion';
import { ExternalLink, Github, Zap, ShoppingBag, BookOpen, Mail, Server, Bot, Scissors, Image } from 'lucide-react';

const projects = [
  {
    title: 'Pink 9 to 5',
    description: 'E-commerce platform for a breast cancer non-profit. Medusa.js running on Docker with PostgreSQL, protected by Cloudflare Zero Trust.',
    tech: ['Medusa.js', 'Docker', 'PostgreSQL', 'Zero Trust'],
    icon: ShoppingBag,
    color: 'from-pink-500 to-pink-600',
    link: 'https://pink9to5.org',
    github: 'https://github.com/cozyartz/Pink9to5',
  },
  {
    title: 'Spamidate',
    description: 'AI-powered email validation API with sub-100ms response times and 99.9% accuracy on Cloudflare Edge.',
    tech: ['TypeScript', 'Cloudflare Workers', 'AI', 'API'],
    icon: Mail,
    color: 'from-[#e0ff00] to-[#c8e600]',
    link: 'https://spamidate.com',
    github: 'https://github.com/cozyartz/spamidate',
  },
  {
    title: 'Nuggsandco',
    description: 'Full e-commerce stack with Medusa.js backend on dedicated VM, Cloudflare Pages frontend, and Hyperdrive database connections.',
    tech: ['Medusa.js', 'Docker', 'PostgreSQL', 'Hyperdrive'],
    icon: ShoppingBag,
    color: 'from-green-500 to-green-600',
    link: 'https://nuggsandco.com',
    github: 'https://github.com/cozyartz/nuggsandco',
  },
  {
    title: 'TechFlunky Marketplace',
    description: 'AI-powered marketplace for validated business blueprints. D1 database, R2 storage, and Claude AI integration.',
    tech: ['Astro', 'Cloudflare Workers', 'D1', 'Claude AI'],
    icon: Zap,
    color: 'from-[#e0ff00] to-[#a0b800]',
    link: 'https://techflunky.com',
    github: 'https://github.com/cozyartz/techflunky',
  },
  {
    title: 'Splinterpic',
    description: 'AI-powered business image generation platform. Generate professional lifestyle photos for products and marketing.',
    tech: ['TypeScript', 'AI Image Gen', 'Cloudflare', 'R2'],
    icon: Image,
    color: 'from-orange-500 to-orange-600',
    github: 'https://github.com/cozyartz/splinterpic',
  },
  {
    title: 'AstroLMS',
    description: 'Learning Management System with AI content generation, multi-tenant architecture, and compliance features.',
    tech: ['Next.js', 'Claude AI', 'PostgreSQL', 'Multi-tenant'],
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    github: 'https://github.com/cozyartz/AstroLMS',
  },
  {
    title: 'RFP AI Assistant',
    description: 'AI-powered RFP response system. Automates proposal generation with intelligent content matching and formatting.',
    tech: ['TypeScript', 'Claude AI', 'Cloudflare Workers'],
    icon: Bot,
    color: 'from-purple-500 to-purple-600',
    github: 'https://github.com/cozyartz/RFPai-assistant',
  },
  {
    title: 'CutGlueBuild',
    description: 'Professional AI-powered laser cutting platform for makers. File processing, pricing engine, and order management.',
    tech: ['TypeScript', 'Astro', 'AI', 'Cloudflare'],
    icon: Scissors,
    color: 'from-red-500 to-red-600',
    github: 'https://github.com/cozyartz/cutgluebuild',
  },
  {
    title: 'Production VM Infrastructure',
    description: 'Managed server infrastructure with Docker, PostgreSQL, Redis, automated backups, and Cloudflare Tunnel integration.',
    tech: ['Ubuntu', 'Docker', 'PostgreSQL', 'Tunnels'],
    icon: Server,
    color: 'from-slate-600 to-slate-700',
    github: 'https://github.com/cozyartz/FunkyVM',
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto">
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
            Real applications in production. From edge APIs to dockerized e-commerce backends.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative rounded-2xl bg-surface-900/80 border border-surface-800 overflow-hidden hover:border-[#e0ff00]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(224,255,0,0.05)]"
            >
              {/* Gradient header */}
              <div className={`h-28 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <project.icon className="w-10 h-10 text-white/90 relative z-10" />
                {/* Scan line effect */}
                <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-[#e0ff00] transition-colors">
                  {project.title}
                </h3>

                <p className="text-surface-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded-md bg-black/50 text-surface-300 border border-surface-800"
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
                      className="inline-flex items-center gap-1 text-sm text-[#e0ff00] hover:text-[#f0ff4d] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-surface-400 hover:text-[#e0ff00] transition-colors"
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
            className="inline-flex items-center gap-2 text-surface-400 hover:text-[#e0ff00] transition-colors"
          >
            <Github className="w-5 h-5" />
            View all 50+ projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
