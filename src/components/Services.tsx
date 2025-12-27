import { motion } from 'framer-motion';
import { Bot, Globe, ShoppingCart, Server, Shield, Cpu, Container, Cloud, Wrench } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Bot,
    title: 'AI-Powered Development',
    description: 'We build WITH AI, not just about AI. Claude Code powers our workflow for rapid, high-quality development.',
    features: ['Claude Code Integration', 'LLM-Powered Features', 'AI Validation Systems'],
    backContent: 'From prompt engineering to full AI agent development. We integrate Claude, GPT-4, and Cloudflare AI into production applications.',
  },
  {
    icon: Server,
    title: 'Infrastructure & DevOps',
    description: 'Production-grade server setup, Docker containerization, and automated deployments.',
    features: ['VM Setup & Management', 'Docker & Containers', 'CI/CD Pipelines'],
    backContent: 'Ubuntu servers, Docker Compose orchestration, automated backups, and monitoring. We manage the full stack.',
  },
  {
    icon: Globe,
    title: 'Edge-First Applications',
    description: 'Ultra-fast applications on Cloudflare\'s global network. Sub-100ms response times.',
    features: ['Cloudflare Workers', 'D1 & R2 Storage', 'Global CDN'],
    backContent: 'Deploy to 300+ edge locations worldwide. Your users get lightning-fast responses no matter where they are.',
  },
  {
    icon: Container,
    title: 'Docker & Containerization',
    description: 'Containerized applications for consistent deployments. PostgreSQL, Redis, Medusa.js.',
    features: ['Docker Compose', 'Container Orchestration', 'Persistent Storage'],
    backContent: 'Reproducible environments from dev to production. Multi-container applications with proper networking and volumes.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Platforms',
    description: 'Modern headless commerce with Medusa.js on your own infrastructure.',
    features: ['Medusa.js Storefronts', 'Payment Integration', 'Inventory Management'],
    backContent: 'Complete ownership of your e-commerce stack. No monthly fees, no vendor lock-in, infinite customization.',
  },
  {
    icon: Cloud,
    title: 'Multi-Cloud Architecture',
    description: 'Strategic use of multiple cloud providers. Cloudflare for edge, VMs for databases.',
    features: ['Cloudflare Edge', 'Dedicated Servers', 'Hybrid Deployments'],
    backContent: 'Best of both worlds: edge computing for speed, dedicated servers for cost-effective persistent workloads.',
  },
  {
    icon: Shield,
    title: 'Security & Access Control',
    description: 'Zero Trust security with Cloudflare Access, SSL/TLS, and secure tunnels.',
    features: ['Zero Trust Access', 'Cloudflare Tunnels', 'Firewall & UFW'],
    backContent: 'Protect internal tools without VPNs. SSO integration, granular access control, and encrypted connections.',
  },
  {
    icon: Cpu,
    title: 'Database Architecture',
    description: 'PostgreSQL on dedicated servers with Hyperdrive connection pooling.',
    features: ['PostgreSQL Setup', 'Automated Backups', 'Hyperdrive Pooling'],
    backContent: 'Multi-database architectures, automated daily backups, and edge-to-origin connections via Hyperdrive.',
  },
  {
    icon: Wrench,
    title: 'Full-Stack Development',
    description: 'From React frontends to API backends. Modern frameworks deployed production-ready.',
    features: ['React & Astro', 'TypeScript APIs', 'Real-time Features'],
    backContent: 'Astro, Next.js, React with TypeScript. RESTful and GraphQL APIs with WebSocket support.',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group h-[320px] perspective-[1000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 p-6 rounded-2xl bg-surface-900/80 border border-surface-800 hover:border-[#e0ff00]/30 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="inline-flex p-3 rounded-xl mb-4 bg-[#e0ff00]/10">
            <service.icon className="w-6 h-6 text-[#e0ff00]" />
          </div>

          <h3 className="text-xl font-semibold mb-3 text-white">
            {service.title}
          </h3>

          <p className="text-surface-400 mb-4 text-sm">
            {service.description}
          </p>

          <ul className="space-y-2">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-surface-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e0ff00]" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="absolute bottom-4 right-4 text-surface-600 text-xs">
            Hover to flip
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-[#e0ff00]/10 to-surface-900 border border-[#e0ff00]/30 flex flex-col justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <service.icon className="w-10 h-10 text-[#e0ff00] mb-4" />
          <h3 className="text-xl font-semibold mb-4 text-[#e0ff00]">
            {service.title}
          </h3>
          <p className="text-surface-200 text-sm leading-relaxed">
            {service.backContent}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto">
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
            Full-stack development plus infrastructure expertise. Hover the cards to learn more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
