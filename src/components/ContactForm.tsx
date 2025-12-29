import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle, Mail } from 'lucide-react';

interface ValidationResult {
  isValid: boolean;
  severity: string;
  score: number;
  checks: {
    syntax?: { passed: boolean; message: string };
    domain?: { passed: boolean; message: string };
    disposable?: { passed: boolean; message: string };
    mxRecords?: { passed: boolean; message: string };
  };
  recommendations: string[];
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [emailValidation, setEmailValidation] = useState<ValidationResult | null>(null);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Debounce email validation
  const validateEmail = async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailValidation(null);
      return;
    }

    setIsValidatingEmail(true);
    try {
      const response = await fetch('/api/validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setEmailValidation(result);
    } catch (error) {
      console.error('Email validation error:', error);
      setEmailValidation(null);
    } finally {
      setIsValidatingEmail(false);
    }
  };

  // Debounced email validation
  let emailTimeout: NodeJS.Timeout;
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });

    clearTimeout(emailTimeout);
    emailTimeout = setTimeout(() => {
      validateEmail(email);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email first
    if (!emailValidation?.isValid) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Check for disposable emails
    if (!emailValidation.checks.disposable?.passed) {
      setErrorMessage('Disposable email addresses are not allowed');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setEmailValidation(null);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEmailValidationColor = () => {
    if (!emailValidation) return 'border-surface-800';
    if (!emailValidation.isValid) return 'border-red-500';
    if (emailValidation.score >= 90) return 'border-green-500';
    if (emailValidation.score >= 70) return 'border-yellow-500';
    return 'border-orange-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-8 p-6 sm:p-8 rounded-2xl bg-surface-900/80 border border-surface-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[#e0ff00]/10">
          <Mail className="w-5 h-5 text-[#e0ff00]" />
        </div>
        <h3 className="text-xl font-semibold text-white">Send us a message</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-surface-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-surface-800 text-white placeholder-surface-500 focus:border-[#e0ff00] focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>

        {/* Email with Spamidate validation */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-surface-300 mb-2">
            Email * {emailValidation && (
              <span className={`ml-2 text-xs ${emailValidation.isValid ? 'text-green-500' : 'text-red-500'}`}>
                Score: {emailValidation.score}/100
              </span>
            )}
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-3 rounded-xl bg-black/50 border ${getEmailValidationColor()} text-white placeholder-surface-500 focus:border-[#e0ff00] focus:outline-none transition-colors`}
              placeholder="your@email.com"
            />
            {isValidatingEmail && (
              <Loader2 className="absolute right-3 top-3.5 w-5 h-5 text-[#e0ff00] animate-spin" />
            )}
            {!isValidatingEmail && emailValidation && (
              <div className="absolute right-3 top-3.5">
                {emailValidation.isValid ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {emailValidation && !emailValidation.isValid && (
            <p className="mt-2 text-sm text-red-400">
              {emailValidation.recommendations[0] || 'Email validation failed'}
            </p>
          )}
          {emailValidation && !emailValidation.checks.disposable?.passed && (
            <p className="mt-2 text-sm text-yellow-400">
              ⚠️ Disposable email detected. Please use a permanent email address.
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-surface-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-surface-800 text-white placeholder-surface-500 focus:border-[#e0ff00] focus:outline-none transition-colors"
            placeholder="How can we help?"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-surface-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-surface-800 text-white placeholder-surface-500 focus:border-[#e0ff00] focus:outline-none transition-colors resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Success message */}
        {submitStatus === 'success' && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
            ✓ Message sent successfully! We'll get back to you within 24 hours.
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || !emailValidation?.isValid || !emailValidation.checks.disposable?.passed}
          className="w-full px-6 py-3 rounded-xl bg-[#e0ff00] text-black font-semibold hover:bg-[#c8e600] disabled:bg-surface-800 disabled:text-surface-500 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>

        {/* Spamidate badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-surface-500">
          <Shield className="w-3 h-3" />
          Protected by{' '}
          <a
            href="https://spamidate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e0ff00] hover:text-[#f0ff4d] transition-colors"
          >
            Spamidate
          </a>
        </div>
      </form>
    </motion.div>
  );
}

function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
