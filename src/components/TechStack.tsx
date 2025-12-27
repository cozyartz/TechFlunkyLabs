import { motion } from 'framer-motion';

const technologies = [
  {
    category: 'Frontend & Frameworks',
    items: [
      { name: 'Astro', description: 'Static & SSR sites' },
      { name: 'React', description: 'Interactive UI' },
      { name: 'Next.js', description: 'Full-stack apps' },
      { name: 'TypeScript', description: 'Type safety' },
      { name: 'Tailwind CSS', description: 'Utility styling' },
      { name: 'Framer Motion', description: 'Animations' },
    ],
  },
  {
    category: 'Edge & Serverless',
    items: [
      { name: 'Cloudflare Workers', description: 'Edge compute' },
      { name: 'Cloudflare Pages', description: 'Static hosting' },
      { name: 'Cloudflare D1', description: 'Edge SQLite' },
      { name: 'Cloudflare R2', description: 'Object storage' },
      { name: 'Cloudflare KV', description: 'Key-value store' },
      { name: 'Hyperdrive', description: 'DB pooling' },
    ],
  },
  {
    category: 'Infrastructure & VMs',
    items: [
      { name: 'Ubuntu Server', description: 'Linux VMs' },
      { name: 'Docker', description: 'Containers' },
      { name: 'Docker Compose', description: 'Orchestration' },
      { name: 'PostgreSQL', description: 'Primary database' },
      { name: 'Redis', description: 'Cache & queues' },
      { name: 'Nginx', description: 'Reverse proxy' },
    ],
  },
  {
    category: 'Security & Networking',
    items: [
      { name: 'Cloudflare Access', description: 'Zero Trust auth' },
      { name: 'Cloudflare Tunnels', description: 'Secure origins' },
      { name: 'UFW Firewall', description: 'Server security' },
      { name: 'Fail2ban', description: 'Intrusion prevention' },
      { name: 'SSL/TLS', description: 'Encryption' },
      { name: 'SSH Keys', description: 'Secure access' },
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      { name: 'Claude Code', description: 'AI development' },
      { name: 'Claude API', description: 'LLM integration' },
      { name: 'Cloudflare AI', description: 'Edge inference' },
      { name: 'OpenAI', description: 'GPT models' },
      { name: 'GitHub Actions', description: 'CI/CD pipelines' },
      { name: 'Cron Jobs', description: 'Scheduled tasks' },
    ],
  },
  {
    category: 'E-Commerce & Payments',
    items: [
      { name: 'Medusa.js', description: 'Headless commerce' },
      { name: 'Stripe', description: 'Payments' },
      { name: 'Stripe Connect', description: 'Marketplaces' },
      { name: 'Webhooks', description: 'Event handling' },
      { name: 'Inventory APIs', description: 'Stock management' },
      { name: 'Order Fulfillment', description: 'Shipping integration' },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto">
            From edge serverless to bare-metal VMs. We choose the right tool for each job.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.05 }}
              className="p-6 rounded-2xl bg-surface-900/50 border border-surface-800"
            >
              <h3 className="text-lg font-semibold mb-5 text-surface-200">
                {category.category}
              </h3>

              <div className="space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-2 border-b border-surface-800 last:border-0"
                  >
                    <span className="font-medium text-surface-100 text-sm">{item.name}</span>
                    <span className="text-xs text-surface-500">{item.description}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hybrid Architecture highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">Edge</div>
              <p className="text-surface-400 text-sm">
                Cloudflare Workers for APIs, Pages for static sites, D1 for edge data
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-400 mb-2">+</div>
              <p className="text-surface-400 text-sm">
                Connected via Hyperdrive & Tunnels for secure, fast communication
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">Origin</div>
              <p className="text-surface-400 text-sm">
                Dedicated VMs running PostgreSQL, Redis, Docker containers
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
