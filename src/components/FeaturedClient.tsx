import { motion } from 'framer-motion';
import { Heart, ExternalLink, Zap, FileText, TrendingUp } from 'lucide-react';

export default function FeaturedClient() {
  return (
    <section id="featured-client" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      {/* Subtle pink gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-sm text-pink-400 mb-6">
            <Heart className="w-4 h-4" />
            Featured Client
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Pink 9 to 5
          </h2>
          <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto">
            Survivor-Led Nonprofit Stack
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - description */}
            <div>
              <p className="text-surface-200 text-base sm:text-lg leading-relaxed mb-6">
                <a href="https://pink9to5.org" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">Pink 9 to 5</a> is a Michigan-based nonprofit supporting breast cancer patients, survivors, and caregivers from diagnosis through recovery.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-pink-400" />
                  </div>
                  <p className="text-surface-300 text-sm sm:text-base">
                    Designed and built a fast, accessible content site with clear paths to resources, donations, and newsletter growth.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-pink-400" />
                  </div>
                  <p className="text-surface-300 text-sm sm:text-base">
                    Created a flexible content model so the team can launch new guides, blog posts, and campaigns without touching code.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-pink-400" />
                  </div>
                  <p className="text-surface-300 text-sm sm:text-base">
                    Tuned performance and SEO around key phrases like workplace advocacy, survivor resources, and healthcare support—helping the organization reach more people who need help.
                  </p>
                </div>
              </div>

              <a
                href="https://pink9to5.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 font-semibold rounded-xl border border-pink-500/30 transition-all duration-300"
              >
                Visit pink9to5.org
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Right side - testimonial */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 text-pink-500/30 text-6xl font-serif">"</div>
              <blockquote className="relative p-6 sm:p-8 rounded-2xl bg-surface-900/80 border border-surface-700">
                <p className="text-surface-200 text-base sm:text-lg italic leading-relaxed mb-6">
                  TechFlunky Labs translates messy, emotional real-world problems into calm, functional tools. We can focus on our mission instead of wrestling with our website.
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-surface-200 font-medium">Pink 9 to 5</p>
                    <p className="text-surface-500 text-sm">Founder</p>
                  </div>
                </footer>
              </blockquote>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 text-pink-500/30 text-6xl font-serif rotate-180">"</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
