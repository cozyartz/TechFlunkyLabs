import { motion } from 'framer-motion';

const technologies = [
  {
    category: 'Frontend',
    items: [
      { name: 'Astro', description: 'Static & SSR' },
      { name: 'React', description: 'Interactive UI' },
      { name: 'Next.js', description: 'Full-stack' },
      { name: 'TypeScript', description: 'Type safety' },
      { name: 'Tailwind CSS', description: 'Styling' },
      { name: 'Framer Motion', description: 'Animations' },
    ],
  },
  {
    category: 'Backend & Edge',
    items: [
      { name: 'Cloudflare Workers', description: 'Edge compute' },
      { name: 'Cloudflare D1', description: 'SQLite database' },
      { name: 'Cloudflare R2', description: 'Object storage' },
      { name: 'PostgreSQL', description: 'Relational DB' },
      { name: 'Redis', description: 'Caching' },
      { name: 'Hyperdrive', description: 'DB connection' },
    ],
  },
  {
    category: 'AI & Integrations',
    items: [
      { name: 'Claude AI', description: 'Anthropic' },
      { name: 'Cloudflare AI', description: 'Edge inference' },
      { name: 'OpenAI', description: 'GPT models' },
      { name: 'Stripe', description: 'Payments' },
      { name: 'Medusa.js', description: 'E-commerce' },
      { name: 'GitHub Actions', description: 'CI/CD' },
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
          <p className="text-xl text-surface-400 max-w-2xl mx-auto">
            Modern, battle-tested technologies for production-grade applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="p-6 rounded-2xl bg-surface-900/50 border border-surface-800"
            >
              <h3 className="text-lg font-semibold mb-6 text-surface-200">
                {category.category}
              </h3>

              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-2 border-b border-surface-800 last:border-0"
                  >
                    <span className="font-medium text-surface-100">{item.name}</span>
                    <span className="text-sm text-surface-500">{item.description}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cloudflare partnership highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-xl bg-primary-500/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 8.25L12 4.5L7.5 8.25L12 12L16.5 8.25Z" />
                  <path d="M12 12L7.5 8.25V15.75L12 19.5V12Z" opacity="0.7" />
                  <path d="M12 12V19.5L16.5 15.75V8.25L12 12Z" opacity="0.5" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-surface-100 mb-2">
                Cloudflare-First Architecture
              </h3>
              <p className="text-surface-400">
                Every application we build leverages Cloudflare's global edge network.
                This means sub-100ms response times, 60-80% lower hosting costs, and infinite scalability
                without infrastructure management.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
