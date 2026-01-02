import { motion } from 'framer-motion';
import { Bot, Search, FileCode, Rocket, Shield, Repeat, Cpu } from 'lucide-react';

const processSteps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Scope',
    description: 'A focused call to understand your mission, constraints, and success metrics. Expect questions about your users, content, and ops—not just features.',
  },
  {
    number: '02',
    icon: FileCode,
    title: 'Architecture Sketch',
    description: 'A simple diagram of how edge, databases, AI, and any hardware fit together, with tradeoffs explained in plain language.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Pilot Build',
    description: 'A small, paid pilot: a working slice of your product (a resource finder, donation flow, check-in device, or internal tool) shipped quickly so you can see value before committing big.',
  },
  {
    number: '04',
    icon: Shield,
    title: 'Production Hardening',
    description: 'Tests, monitoring, and resilience work—backups, observability, and rollout plans—so your app can handle real traffic and real life.',
  },
  {
    number: '05',
    icon: Repeat,
    title: 'Ongoing Partnership',
    description: 'Optional retainer for improvements, experiments, and new features as your organization or product evolves.',
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg sm:text-xl text-surface-400 max-w-3xl mx-auto px-2 sm:px-0">
            Human + AI + Hardware
          </p>
        </motion.div>

        {/* Main explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-accent-500/10 to-primary-500/10 border border-accent-500/20"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl bg-accent-500/20 flex items-center justify-center">
                <Bot className="w-7 sm:w-9 h-7 sm:h-9 text-accent-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-surface-100 mb-2 sm:mb-3">
                AI as a Force Multiplier
              </h3>
              <p className="text-sm sm:text-base text-surface-300 mb-3 sm:mb-4">
                TechFlunky Labs uses AI as a <span className="text-accent-400 font-medium">force multiplier</span>—not a replacement for senior engineering.
                Claude Code powers our workflow, letting us tackle complex projects faster and maintain higher code quality.
              </p>
              <p className="text-sm sm:text-base text-surface-400">
                The result? You get senior-level development quality at startup-friendly timelines and costs.
                Every line of code is reviewed by a human who understands your business goals.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Process steps */}
        <div className="relative mb-12 sm:mb-16">
          {/* Connecting line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e0ff00]/50 via-[#e0ff00]/20 to-transparent hidden md:block" />

          <div className="space-y-6 sm:space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-4 sm:gap-6"
              >
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 rounded-xl bg-surface-900 border-2 border-[#e0ff00]/30 flex items-center justify-center">
                  <step.icon className="w-6 sm:w-7 h-6 sm:h-7 text-[#e0ff00]" />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-[#e0ff00]/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#e0ff00] font-mono text-sm">{step.number}</span>
                    <h3 className="text-lg sm:text-xl font-semibold text-surface-100">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-surface-400 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hardware callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-4 sm:p-6 rounded-xl bg-surface-900/30 border border-surface-800"
        >
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-6 h-6 text-[#e0ff00]" />
            <h3 className="text-base sm:text-lg font-semibold text-surface-200">
              Hardware Experience
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              'Raspberry Pi',
              'ESP32',
              'Onion Omega2+',
              'Flight Controllers',
              'Commercial Drones',
              'Ham Radio',
              'Sensor Networks',
              'Access Control',
            ].map((item) => (
              <span
                key={item}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-surface-800/50 text-surface-300 text-xs sm:text-sm border border-surface-700"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
