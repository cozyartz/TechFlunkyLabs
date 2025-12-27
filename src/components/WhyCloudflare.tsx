import { motion } from 'framer-motion';
import { Zap, DollarSign, Globe, Shield, Database, Lock, Gauge, Server } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Sub-100ms Global Response',
    description: 'Code runs at 300+ edge locations worldwide. Your users get lightning-fast responses no matter where they are.',
  },
  {
    icon: DollarSign,
    title: '60-80% Cost Reduction',
    description: 'No idle servers burning money. Pay only for what you use with generous free tiers for most services.',
  },
  {
    icon: Globe,
    title: 'Built-in Global CDN',
    description: 'Static assets cached at the edge automatically. No CDN configuration needed—it just works.',
  },
  {
    icon: Shield,
    title: 'Zero Trust Security',
    description: 'Cloudflare Access protects internal tools without VPNs. SSO integration and granular access control.',
  },
  {
    icon: Database,
    title: 'Edge Databases (D1)',
    description: 'SQLite at the edge with automatic replication. Combine with Hyperdrive for PostgreSQL connection pooling.',
  },
  {
    icon: Lock,
    title: 'Cloudflare Tunnels',
    description: 'Expose internal services securely without opening firewall ports. Perfect for admin panels and APIs.',
  },
  {
    icon: Gauge,
    title: 'Infinite Scalability',
    description: 'Handle traffic spikes automatically. No capacity planning, no load balancer configuration.',
  },
  {
    icon: Server,
    title: 'Hybrid Architecture Ready',
    description: 'Edge Workers connect seamlessly to your VMs via Hyperdrive and Tunnels. Best of both worlds.',
  },
];

const cloudflareProducts = [
  { name: 'Workers', desc: 'Serverless compute at the edge' },
  { name: 'Pages', desc: 'Full-stack web applications' },
  { name: 'D1', desc: 'SQLite database at the edge' },
  { name: 'R2', desc: 'S3-compatible object storage' },
  { name: 'KV', desc: 'Key-value storage' },
  { name: 'Durable Objects', desc: 'Stateful edge compute' },
  { name: 'Queues', desc: 'Message queuing' },
  { name: 'Hyperdrive', desc: 'Database connection pooling' },
  { name: 'Access', desc: 'Zero Trust authentication' },
  { name: 'Tunnels', desc: 'Secure origin connections' },
  { name: 'AI', desc: 'LLM inference at the edge' },
  { name: 'Images', desc: 'Image optimization & delivery' },
];

export default function WhyCloudflare() {
  return (
    <section id="cloudflare" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#14b8a6]/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#2dd4bf]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 8.25L12 4.5L7.5 8.25L12 12L16.5 8.25Z" />
                <path d="M12 12L7.5 8.25V15.75L12 19.5V12Z" opacity="0.7" />
                <path d="M12 12V19.5L16.5 15.75V8.25L12 12Z" opacity="0.5" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why We Build on <span className="text-[#2dd4bf]">Cloudflare</span>
          </h2>
          <p className="text-lg sm:text-xl text-surface-400 max-w-3xl mx-auto px-2 sm:px-0">
            Cloudflare is our edge platform of choice. Here's why we recommend it for every client—and use it for all our own infrastructure.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="p-3 sm:p-5 rounded-xl bg-surface-900/50 border border-surface-800"
            >
              <benefit.icon className="w-5 sm:w-6 h-5 sm:h-6 text-[#2dd4bf] mb-2 sm:mb-3" />
              <h3 className="font-semibold text-surface-100 mb-1 sm:mb-2 text-sm sm:text-base">{benefit.title}</h3>
              <p className="text-xs sm:text-sm text-surface-400 line-clamp-3 sm:line-clamp-none">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Products we use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-[#14b8a6]/10 to-[#0d9488]/10 border border-[#14b8a6]/20"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-surface-100">
            Cloudflare Products We Deploy
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {cloudflareProducts.map((product) => (
              <div
                key={product.name}
                className="p-2 sm:p-3 rounded-lg bg-surface-900/50 border border-surface-800"
              >
                <div className="font-medium text-surface-100 text-sm sm:text-base">{product.name}</div>
                <div className="text-xs text-surface-500 hidden sm:block">{product.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hybrid architecture callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-surface-400 max-w-2xl mx-auto">
            <span className="text-surface-200 font-medium">Cloudflare + Dedicated Servers = Best of Both Worlds.</span>
            {' '}We use Cloudflare for edge computing, CDN, and security while running PostgreSQL and Docker containers on dedicated VMs for cost-effective, persistent workloads.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
