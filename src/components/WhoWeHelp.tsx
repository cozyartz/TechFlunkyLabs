import { motion } from 'framer-motion';
import { Heart, Rocket, Cpu } from 'lucide-react';

const audiences = [
  {
    icon: Heart,
    title: 'Nonprofits & Small Orgs',
    description: 'Donation flows, resource hubs, and automation without enterprise agency bloat. We understand mission-driven work and build tools that let you focus on impact.',
    color: 'from-pink-500/20 to-purple-500/20',
    borderColor: 'border-pink-500/30',
    iconBg: 'bg-pink-500/20',
    iconColor: 'text-pink-400',
  },
  {
    icon: Rocket,
    title: 'Indie SaaS Founders & Small Teams',
    description: 'Ready to harden your infrastructure and ship new features fast. We help you move from prototype to production without hiring a DevOps team.',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Cpu,
    title: 'Makers, Labs & R&D Teams',
    description: 'Experimenting with drones, Raspberry Pi, ESP32, and Onion Omega2+ boards. We bridge physical spaces with the web and make hardware talk to your stack.',
    color: 'from-[#e0ff00]/20 to-green-500/20',
    borderColor: 'border-[#e0ff00]/30',
    iconBg: 'bg-[#e0ff00]/20',
    iconColor: 'text-[#e0ff00]',
  },
];

export default function WhoWeHelp() {
  return (
    <section id="who-we-help" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Who We <span className="gradient-text">Partner With</span>
          </h2>
          <p className="text-lg sm:text-xl text-surface-400 max-w-3xl mx-auto px-2 sm:px-0">
            TechFlunky Labs works best with teams who need real software—not committees, not roadmaps that never ship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${audience.color} border ${audience.borderColor} hover:scale-[1.02] transition-all duration-300`}
            >
              <div className={`inline-flex p-3 rounded-xl ${audience.iconBg} mb-4`}>
                <audience.icon className={`w-7 h-7 ${audience.iconColor}`} />
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                {audience.title}
              </h3>

              <p className="text-surface-300 text-sm sm:text-base leading-relaxed">
                {audience.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
