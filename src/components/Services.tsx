import { motion } from 'framer-motion';
import { Bot, Globe, ShoppingCart, Server, Shield, Cpu, Container, Cloud, Wrench } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI-Powered Development',
    description: 'We build WITH AI, not just about AI. Claude Code powers our workflow for rapid, high-quality development with intelligent automation.',
    features: ['Claude Code Integration', 'LLM-Powered Features', 'AI Validation Systems'],
    color: 'primary',
  },
  {
    icon: Server,
    title: 'Infrastructure & DevOps',
    description: 'Production-grade server setup, Docker containerization, and automated deployments. We manage the complexity so you don\'t have to.',
    features: ['VM Setup & Management', 'Docker & Containers', 'CI/CD Pipelines'],
    color: 'accent',
  },
  {
    icon: Globe,
    title: 'Edge-First Applications',
    description: 'Ultra-fast applications on Cloudflare\'s global network. Sub-100ms response times with 60-80% lower hosting costs.',
    features: ['Cloudflare Workers', 'D1 & R2 Storage', 'Global CDN'],
    color: 'primary',
  },
  {
    icon: Container,
    title: 'Docker & Containerization',
    description: 'Containerized applications for consistent deployments. PostgreSQL, Redis, Medusa.js, and custom services running reliably.',
    features: ['Docker Compose', 'Container Orchestration', 'Persistent Storage'],
    color: 'accent',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Platforms',
    description: 'Modern headless commerce with Medusa.js on your own infrastructure. Complete ownership, no vendor lock-in, infinite customization.',
    features: ['Medusa.js Storefronts', 'Payment Integration', 'Inventory Management'],
    color: 'primary',
  },
  {
    icon: Cloud,
    title: 'Multi-Cloud Architecture',
    description: 'Strategic use of multiple cloud providers. Cloudflare for edge, dedicated VMs for databases, and hybrid architectures.',
    features: ['Cloudflare Edge', 'Dedicated Servers', 'Hybrid Deployments'],
    color: 'accent',
  },
  {
    icon: Shield,
    title: 'Security & Access Control',
    description: 'Zero Trust security with Cloudflare Access, SSL/TLS, firewall configuration, and secure tunnels for private services.',
    features: ['Zero Trust Access', 'Cloudflare Tunnels', 'Firewall & UFW'],
    color: 'primary',
  },
  {
    icon: Cpu,
    title: 'Database Architecture',
    description: 'PostgreSQL on dedicated servers with Hyperdrive connection pooling. Automated backups, replication, and high availability.',
    features: ['PostgreSQL Setup', 'Automated Backups', 'Hyperdrive Pooling'],
    color: 'accent',
  },
  {
    icon: Wrench,
    title: 'Full-Stack Development',
    description: 'From React frontends to API backends. Astro, Next.js, TypeScript, and modern frameworks deployed production-ready.',
    features: ['React & Astro', 'TypeScript APIs', 'Real-time Features'],
    color: 'primary',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What We <span className="gradient-text">Build & Manage</span>
          </h2>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto">
            Full-stack development plus infrastructure expertise. We handle everything from code to servers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-6 rounded-2xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${service.color === 'primary' ? 'bg-primary-500/10' : 'bg-accent-500/10'}`}>
                <service.icon className={`w-6 h-6 ${service.color === 'primary' ? 'text-primary-400' : 'text-accent-400'}`} />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-surface-100">
                {service.title}
              </h3>

              <p className="text-surface-400 mb-4 text-sm">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-surface-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${service.color === 'primary' ? 'bg-primary-400' : 'bg-accent-400'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
