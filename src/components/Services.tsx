import { motion } from 'framer-motion';
import { Bot, Globe, ShoppingCart, Rocket, Shield, Cpu } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI-Powered Platforms',
    description: 'Custom AI solutions using Claude, GPT, and Cloudflare AI. From content generation to intelligent automation.',
    features: ['LLM Integration', 'AI Validation Systems', 'Intelligent Workflows'],
    color: 'primary',
  },
  {
    icon: Globe,
    title: 'Edge-First SaaS',
    description: 'Ultra-fast applications deployed on Cloudflare Workers with D1 databases. Sub-100ms response times globally.',
    features: ['Cloudflare Workers', 'D1 & R2 Storage', 'Global CDN'],
    color: 'accent',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Modern headless commerce with Medusa.js. Complete ownership, no vendor lock-in, infinite customization.',
    features: ['Headless Commerce', 'Custom Storefronts', 'Payment Integration'],
    color: 'primary',
  },
  {
    icon: Rocket,
    title: 'MVP Development',
    description: 'Rapid prototyping and MVP builds. Go from idea to production-ready application in weeks, not months.',
    features: ['Fast Iteration', 'Production Ready', 'Scalable Architecture'],
    color: 'accent',
  },
  {
    icon: Shield,
    title: 'Multi-Tenant Systems',
    description: 'Enterprise-grade multi-tenant architectures with complete data isolation and tenant-specific deployments.',
    features: ['Data Isolation', 'Tenant Routing', 'Custom Domains'],
    color: 'primary',
  },
  {
    icon: Cpu,
    title: 'API Development',
    description: 'RESTful and GraphQL APIs built for performance. Real-time capabilities with WebSockets and SSE.',
    features: ['REST & GraphQL', 'Real-time Events', 'Rate Limiting'],
    color: 'accent',
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
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-xl text-surface-400 max-w-2xl mx-auto">
            Full-stack development expertise across modern web technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${service.color === 'primary' ? 'bg-primary-500/10' : 'bg-accent-500/10'}`}>
                <service.icon className={`w-6 h-6 ${service.color === 'primary' ? 'text-primary-400' : 'text-accent-400'}`} />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-surface-100">
                {service.title}
              </h3>

              <p className="text-surface-400 mb-4">
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
