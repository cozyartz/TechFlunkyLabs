import { motion } from 'framer-motion';
import { ArrowRight, Zap, Cloud, Code2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-800/80 border border-surface-700 text-sm text-surface-200 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-primary-400" />
            AI-Powered Development Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          We Build
          <span className="gradient-text block">Edge-First Software</span>
          That Scales
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-surface-300 max-w-2xl mx-auto mb-10"
        >
          From AI-powered platforms to lightning-fast SaaS applications.
          We deliver production-ready solutions on Cloudflare's global edge network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-xl transition-all duration-300 glow hover:scale-105"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-8 py-4 bg-surface-800 hover:bg-surface-700 text-surface-100 font-semibold rounded-xl border border-surface-700 transition-all duration-300 hover:scale-105"
          >
            View Our Work
          </a>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            { icon: Cloud, label: 'Cloudflare Edge' },
            { icon: Code2, label: 'TypeScript' },
            { icon: Zap, label: 'AI Integration' },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-900/50 border border-surface-800 text-sm text-surface-400"
            >
              <Icon className="w-4 h-4" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
