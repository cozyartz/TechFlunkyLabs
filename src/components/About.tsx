import { motion } from 'framer-motion';
import { MapPin, Plane, Radio, Wrench, Cloud, Cpu } from 'lucide-react';

const credentials = [
  { icon: Cloud, label: 'Cloud-Native Stacks', detail: 'Cloudflare, Docker, Postgres, Redis' },
  { icon: Plane, label: 'Commercial Drone Pilot', detail: 'FAA Part 107 Certified' },
  { icon: Radio, label: 'Ham Radio Operator', detail: 'Licensed Amateur Radio' },
  { icon: Wrench, label: 'Makerspace Owner', detail: 'Battle Creek, Michigan' },
];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e0ff00]/5 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">TechFlunky Labs</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-5 gap-8 items-start"
        >
          {/* Main bio */}
          <div className="md:col-span-3 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-900/80 border border-surface-800">
              <p className="text-surface-200 text-base sm:text-lg leading-relaxed mb-4">
                TechFlunky Labs is led by <span className="text-[#e0ff00] font-medium">Andrea Cozart-Lundin</span>, a full-stack engineer, commercial drone pilot, ham radio operator, and makerspace owner in Battle Creek, Michigan.
              </p>

              <p className="text-surface-300 text-base leading-relaxed mb-4">
                This background means comfort with both cloud-native stacks (Cloudflare, Docker, Postgres, Redis) and field-tested hardware (Raspberry Pi, ESP32, Onion Omega2+, flight controllers).
              </p>

              <p className="text-surface-400 text-base leading-relaxed">
                Experience building AI-powered platforms, mapping tools, SaaS experiments, and nonprofit infrastructure that survive real-world constraints.
              </p>
            </div>

            {/* Location badge */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-900/50 border border-surface-800 w-fit">
              <MapPin className="w-5 h-5 text-[#e0ff00]" />
              <span className="text-surface-300">Battle Creek, Michigan</span>
            </div>
          </div>

          {/* Credentials grid */}
          <div className="md:col-span-2 space-y-4">
            {credentials.map((cred, index) => (
              <motion.div
                key={cred.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-[#e0ff00]/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#e0ff00]/10 flex items-center justify-center">
                    <cred.icon className="w-5 h-5 text-[#e0ff00]" />
                  </div>
                  <div>
                    <h3 className="text-surface-200 font-medium text-sm">{cred.label}</h3>
                    <p className="text-surface-500 text-xs">{cred.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 p-4 sm:p-6 rounded-xl bg-surface-900/30 border border-surface-800"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-surface-500" />
            <h3 className="text-sm font-medium text-surface-500 uppercase tracking-wider">
              Daily Drivers
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              'Cloudflare Workers',
              'Astro',
              'React',
              'TypeScript',
              'PostgreSQL',
              'Docker',
              'Claude Code',
              'Medusa.js',
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-surface-800/50 text-surface-400 text-xs sm:text-sm border border-surface-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
