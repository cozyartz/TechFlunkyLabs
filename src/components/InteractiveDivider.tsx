import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

const HeroCubes = lazy(() => import('./HeroCubes'));

export default function InteractiveDivider() {
  return (
    <section className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Interactive cube grid */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <HeroCubes />
      </Suspense>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center px-4 sm:px-6"
        >
          <p className="text-surface-500 text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">
            <span className="hidden sm:inline">Hover</span>
            <span className="sm:hidden">Touch</span> to reveal
          </p>
          <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Building <span className="gradient-text">Block by Block</span>
          </h3>
        </motion.div>
      </div>

      {/* Top and bottom gradients for smooth blend */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-b from-black to-transparent z-[5]" />
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-black to-transparent z-[5]" />
    </section>
  );
}
