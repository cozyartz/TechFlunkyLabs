import { motion } from 'framer-motion';
import { Bot, Globe, ShoppingCart, Server, Shield, Cpu, Container, Cloud, Wrench, Database } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Globe,
    title: 'Edge-First Web & APIs',
    description: 'Build fast, resilient apps on Cloudflare Workers, Pages, D1, R2, KV, and Hyperdrive—sub-100ms global responses.',
    features: ['Marketing Sites & Dashboards', 'REST/GraphQL APIs', 'Background Jobs & Cron'],
    backContent: 'Deploy to 300+ edge locations worldwide. Auto-scaling, built-in security, and lightning-fast responses no matter where your users are. No cold starts.',
    featured: true,
  },
  {
    icon: Bot,
    title: 'AI & MCP Agent Development',
    description: 'Design AI systems that actually plug into your business, not just chatbots.',
    features: ['Claude & GPT Integrations', 'Custom MCP Servers', 'RAG for Docs & Policies'],
    backContent: 'Connect CRMs, ticketing, data stores, and hardware to LLMs. Retrieval-augmented generation for knowledge bases. Real business value, not demos.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & Payments',
    description: 'Ship commerce flows that fit your business instead of forcing you into a template.',
    features: ['Headless Medusa.js', 'Stripe & Subscriptions', 'Donor Funnels'],
    backContent: 'Complete ownership of your stack. No monthly platform fees. Works for digital products, physical goods, and hybrid nonprofit/commercial offerings.',
  },
  {
    icon: Server,
    title: 'Data & Infrastructure',
    description: 'Production-grade infrastructure without a DevOps department.',
    features: ['Dockerized Apps', 'PostgreSQL & Redis', 'Automated Backups'],
    backContent: 'Managed Ubuntu servers, secure reverse proxies, Cloudflare Tunnels, and zero-trust access. Monitoring and resilience built in.',
  },
  {
    icon: Cpu,
    title: 'Connected Hardware & IoT',
    description: 'Bring the physical world online with affordable, hackable hardware.',
    features: ['Raspberry Pi & ESP32', 'Sensor Data Streaming', 'Drone Integrations'],
    backContent: 'Rapid prototyping with Onion Omega2+ boards and flight control stacks. Location check-ins, access control, mapping, imaging, and field data collection.',
  },
  {
    icon: Container,
    title: 'Docker & Containerization',
    description: 'Containerized applications for consistent deployments. PostgreSQL, Redis, Medusa.js.',
    features: ['Docker Compose', 'Container Orchestration', 'Persistent Storage'],
    backContent: 'Reproducible environments from dev to production. Multi-container applications with proper networking and volumes.',
  },
  {
    icon: Cloud,
    title: 'Multi-Cloud Architecture',
    description: 'Strategic use of multiple cloud providers. Cloudflare for edge, VMs for databases.',
    features: ['Cloudflare Edge', 'Dedicated Servers', 'Hybrid Deployments'],
    backContent: 'Best of both worlds: edge computing for speed, dedicated servers for cost-effective persistent workloads. 60-80% lower hosting costs.',
  },
  {
    icon: Shield,
    title: 'Security & Access Control',
    description: 'Zero Trust security with Cloudflare Access, SSL/TLS, and secure tunnels.',
    features: ['Zero Trust Access', 'Cloudflare Tunnels', 'Firewall & UFW'],
    backContent: 'Protect internal tools without VPNs. SSO integration, granular access control, and encrypted connections.',
  },
  {
    icon: Database,
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

  const handleInteraction = () => {
    setIsFlipped(!isFlipped);
  };

  const isFeatured = service.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group h-[280px] sm:h-[320px] perspective-[1000px] cursor-pointer ${isFeatured ? 'ring-2 ring-[#e0ff00]/30 rounded-2xl' : ''}`}
      onClick={handleInteraction}
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
          className={`absolute inset-0 p-6 rounded-2xl bg-surface-900/80 border ${isFeatured ? 'border-[#e0ff00]/50' : 'border-surface-800'} hover:border-[#e0ff00]/30 transition-colors`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`inline-flex p-3 rounded-xl mb-4 ${isFeatured ? 'bg-[#e0ff00]/20 glow-subtle' : 'bg-[#e0ff00]/10'}`}>
            <service.icon className="w-6 h-6 text-[#e0ff00]" />
          </div>

          {isFeatured && (
            <span className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold bg-[#e0ff00] text-black rounded-md">
              Featured
            </span>
          )}

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
            <span className="hidden sm:inline">Hover</span>
            <span className="sm:hidden">Tap</span> to flip
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
          <p className="text-surface-200 text-sm leading-relaxed mb-4">
            {service.backContent}
          </p>
          {service.link && (
            <a
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#e0ff00] hover:text-[#f0ff4d] transition-colors mt-auto"
            >
              Learn More →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 relative">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            What We <span className="gradient-text">Build & Manage</span>
          </h2>
          <p className="text-lg sm:text-xl text-surface-400 max-w-3xl mx-auto px-4 sm:px-0">
            Full-stack development plus infrastructure expertise. <span className="hidden sm:inline">Hover</span><span className="sm:hidden">Tap</span> the cards to learn more.
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
