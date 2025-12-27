import { motion } from 'framer-motion';
import { ArrowRight, Zap, Cloud, Code2, Server, Bot } from 'lucide-react';
import { Suspense, lazy } from 'react';

// Lazy load the 3D component for better performance
const Logo3D = lazy(() => import('./Logo3D'));

function Logo3DFallback() {
  return (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="w-32 h-32 rounded-2xl bg-black border-2 border-[#e0ff00] flex items-center justify-center animate-pulse">
        <span className="text-[#e0ff00] text-4xl font-bold">TF</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Electric yellow gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e0ff00]/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#e0ff00]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e0ff00]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-[#e0ff00]/30 text-sm text-[#e0ff00] backdrop-blur-sm glitch">
                <Zap className="w-4 h-4" />
                AI-Powered Development Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              We Build
              <span className="gradient-text block text-glow">Edge-First Software</span>
              That Scales
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-surface-400 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              From AI-powered platforms to production infrastructure.
              We deliver complete solutions—code, servers, and everything in between.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#e0ff00] hover:bg-[#f0ff4d] text-black font-bold rounded-xl transition-all duration-300 glow hover:scale-105"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black hover:bg-surface-900 text-[#e0ff00] font-semibold rounded-xl border border-[#e0ff00]/50 transition-all duration-300 hover:scale-105 hover:border-[#e0ff00]"
              >
                View Our Work
              </a>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {[
                { icon: Cloud, label: 'Cloudflare Edge' },
                { icon: Server, label: 'Infrastructure' },
                { icon: Bot, label: 'AI Integration' },
                { icon: Code2, label: 'Full-Stack' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-surface-800 text-sm text-surface-400 hover:border-[#e0ff00]/30 hover:text-[#e0ff00] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right side - 3D Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <Suspense fallback={<Logo3DFallback />}>
              <Logo3D />
            </Suspense>

            {/* Glow effect behind 3D logo */}
            <div className="absolute inset-0 bg-[#e0ff00]/10 blur-3xl rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
