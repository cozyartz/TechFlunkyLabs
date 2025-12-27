import { motion } from 'framer-motion';
import { Mail, Github, Calendar, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-surface-900/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl text-surface-400 max-w-2xl mx-auto">
            Ready to bring your idea to life? Let's discuss your project and find the perfect solution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Email card */}
          <a
            href="mailto:hello@techflunkylabs.com"
            className="group p-8 rounded-2xl bg-surface-900 border border-surface-800 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="inline-flex p-3 rounded-xl bg-primary-500/10 mb-4">
              <Mail className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-surface-100">
              Email Us
            </h3>
            <p className="text-surface-400 mb-4">
              Send us your project details and we'll get back to you within 24 hours.
            </p>
            <span className="inline-flex items-center gap-2 text-primary-400 group-hover:text-primary-300 transition-colors">
              hello@techflunkylabs.com
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* GitHub card */}
          <a
            href="https://github.com/cozyartz"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 rounded-2xl bg-surface-900 border border-surface-800 hover:border-accent-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="inline-flex p-3 rounded-xl bg-accent-500/10 mb-4">
              <Github className="w-6 h-6 text-accent-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-surface-100">
              GitHub
            </h3>
            <p className="text-surface-400 mb-4">
              Check out our open source work and see how we build software.
            </p>
            <span className="inline-flex items-center gap-2 text-accent-400 group-hover:text-accent-300 transition-colors">
              @cozyartz
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-8 rounded-2xl animated-border text-center"
        >
          <Calendar className="w-8 h-8 text-primary-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-surface-100">
            Schedule a Discovery Call
          </h3>
          <p className="text-surface-400 mb-6 max-w-lg mx-auto">
            30 minutes to discuss your project, explore solutions, and see if we're a good fit.
            No obligations, just conversation.
          </p>
          <a
            href="mailto:hello@techflunkylabs.com?subject=Discovery%20Call%20Request"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-xl transition-all duration-300 glow hover:scale-105"
          >
            Book a Call
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
