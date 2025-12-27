import { motion } from 'framer-motion';
import { Bot, Sparkles, Rocket, Users, Code2, MessageSquare } from 'lucide-react';

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
            AI-augmented development means faster delivery without sacrificing quality.
            Here's what makes Tech Flunky Labs different.
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
                Human + AI Partnership
              </h3>
              <p className="text-sm sm:text-base text-surface-300 mb-3 sm:mb-4">
                We use <span className="text-accent-400 font-medium">Claude Code</span> as our AI development partner—not as a replacement for expertise, but as a force multiplier.
                This means we can tackle complex projects faster, maintain higher code quality, and deliver solutions that would take traditional teams weeks in just days.
              </p>
              <p className="text-sm sm:text-base text-surface-400">
                The result? You get senior-level development quality at startup-friendly timelines and costs.
                Every line of code is reviewed by a human who understands your business goals.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 rounded-xl bg-surface-900/50 border border-surface-800"
          >
            <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-primary-400 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-surface-100 mb-2">
              AI Feature Integration
            </h3>
            <p className="text-surface-400 text-xs sm:text-sm">
              We build AI-powered features into your applications—content generation,
              intelligent search, automated workflows, and custom LLM integrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-4 sm:p-6 rounded-xl bg-surface-900/50 border border-surface-800"
          >
            <Code2 className="w-6 sm:w-8 h-6 sm:h-8 text-accent-400 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-surface-100 mb-2">
              LLM API Integration
            </h3>
            <p className="text-surface-400 text-xs sm:text-sm">
              Connect your applications to Claude, GPT-4, Cloudflare AI, or custom models.
              We handle prompt engineering, rate limiting, and cost optimization.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-4 sm:p-6 rounded-xl bg-surface-900/50 border border-surface-800"
          >
            <MessageSquare className="w-6 sm:w-8 h-6 sm:h-8 text-primary-400 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-surface-100 mb-2">
              Conversational Interfaces
            </h3>
            <p className="text-surface-400 text-xs sm:text-sm">
              Build chatbots, AI assistants, and conversational UIs that understand context
              and provide real value to your users.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-4 sm:p-6 rounded-xl bg-surface-900/50 border border-surface-800"
          >
            <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-accent-400 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-surface-100 mb-2">
              Rapid Prototyping
            </h3>
            <p className="text-surface-400 text-xs sm:text-sm">
              Go from idea to working prototype in days, not weeks.
              AI-augmented development means faster iteration without cutting corners.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-4 sm:p-6 rounded-xl bg-surface-900/50 border border-surface-800"
          >
            <Users className="w-6 sm:w-8 h-6 sm:h-8 text-primary-400 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-surface-100 mb-2">
              Direct Communication
            </h3>
            <p className="text-surface-400 text-xs sm:text-sm">
              No account managers or ticket systems. You work directly with the developer
              building your project. Questions get answers in hours, not days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-4 sm:p-6 rounded-xl bg-surface-900/50 border border-surface-800"
          >
            <Bot className="w-6 sm:w-8 h-6 sm:h-8 text-accent-400 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-surface-100 mb-2">
              MCP & Agent Development
            </h3>
            <p className="text-surface-400 text-xs sm:text-sm">
              Build custom MCP servers and AI agents that integrate with your existing tools.
              Extend Claude and other LLMs with your business logic.
            </p>
          </motion.div>
        </div>

        {/* AI models we work with */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-4 sm:p-6 rounded-xl bg-surface-900/30 border border-surface-800"
        >
          <h3 className="text-base sm:text-lg font-semibold text-surface-200 mb-3 sm:mb-4 text-center">
            AI Models & Platforms We Integrate
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              'Claude 3.5 / Opus',
              'GPT-4 / GPT-4o',
              'Cloudflare AI (Llama)',
              'Whisper (Speech)',
              'DALL-E / Stable Diffusion',
              'Embeddings APIs',
              'Custom Fine-tuned Models',
              'RAG Pipelines',
            ].map((model) => (
              <span
                key={model}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-surface-800/50 text-surface-300 text-xs sm:text-sm border border-surface-700"
              >
                {model}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
