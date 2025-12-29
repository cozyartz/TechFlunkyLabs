import { motion } from 'framer-motion';
import { Mail, Github, Calendar, ArrowRight } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let's Build <span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto px-2 sm:px-0">
            Ready to bring your idea to life? Let's discuss your project and find the perfect solution.
          </p>
        </motion.div>

        {/* Contact Form with Spamidate Protection */}
        <ContactForm />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Email card */}
          <a
            href="mailto:hello@techflunkylabs.com"
            className="group p-5 sm:p-8 rounded-2xl bg-surface-900/80 border border-surface-800 hover:border-[#a855f7]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          >
            <div className="inline-flex p-3 rounded-xl bg-[#a855f7]/10 mb-4 group-hover:bg-[#a855f7]/20 transition-colors">
              <Mail className="w-6 h-6 text-[#c084fc]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Email Us
            </h3>
            <p className="text-surface-400 mb-4">
              Send us your project details and we'll get back to you within 24 hours.
            </p>
            <span className="inline-flex items-center gap-2 text-[#c084fc] group-hover:text-[#d8b4fe] transition-colors">
              hello@techflunkylabs.com
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* GitHub card */}
          <a
            href="https://github.com/cozyartz"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 sm:p-8 rounded-2xl bg-surface-900/80 border border-surface-800 hover:border-[#a855f7]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          >
            <div className="inline-flex p-3 rounded-xl bg-[#a855f7]/10 mb-4 group-hover:bg-[#a855f7]/20 transition-colors">
              <Github className="w-6 h-6 text-[#c084fc]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              GitHub
            </h3>
            <p className="text-surface-400 mb-4">
              Check out our open source work and see how we build software.
            </p>
            <span className="inline-flex items-center gap-2 text-[#c084fc] group-hover:text-[#d8b4fe] transition-colors">
              @cozyartz
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>

        {/* Alternative Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <p className="text-center text-surface-500 mb-4 text-sm">Or reach out directly:</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="mailto:hello@techflunkylabs.com"
              className="group p-4 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-[#a855f7]/50 transition-all duration-300 text-center"
            >
              <Mail className="w-5 h-5 text-[#c084fc] mx-auto mb-2" />
              <p className="text-sm text-surface-300 group-hover:text-white transition-colors">
                hello@techflunkylabs.com
              </p>
            </a>
            <a
              href="https://github.com/cozyartz"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-[#a855f7]/50 transition-all duration-300 text-center"
            >
              <Github className="w-5 h-5 text-[#c084fc] mx-auto mb-2" />
              <p className="text-sm text-surface-300 group-hover:text-white transition-colors">
                @cozyartz
              </p>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
