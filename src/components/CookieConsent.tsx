import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check, Shield } from 'lucide-react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = 'tf-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'tf-cookie-preferences';

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);

    // Dispatch custom event for analytics initialization
    window.dispatchEvent(new CustomEvent('cookieConsentUpdate', { detail: prefs }));
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    saveConsent(defaultPreferences);
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-surface-900 border border-surface-700 rounded-2xl shadow-2xl overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#e0ff00]/5 via-transparent to-[#e0ff00]/5 pointer-events-none" />

              <div className="relative p-6">
                {!showPreferences ? (
                  // Main consent view
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#e0ff00]/10 border border-[#e0ff00]/30 flex items-center justify-center">
                        <Cookie className="w-6 h-6 text-[#e0ff00]" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-1">Cookie Preferences</h3>
                      <p className="text-surface-400 text-sm leading-relaxed">
                        We use cookies to enhance your experience and analyze site traffic.
                        By clicking "Accept All", you consent to our use of cookies.
                        Read our <a href="/privacy" className="text-[#e0ff00] hover:underline">Privacy Policy</a> for more information.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                      <button
                        onClick={() => setShowPreferences(true)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-surface-300 hover:text-white border border-surface-700 hover:border-surface-600 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Customize
                      </button>
                      <button
                        onClick={acceptNecessary}
                        className="px-4 py-2.5 text-sm font-medium text-surface-300 hover:text-white bg-surface-800 hover:bg-surface-700 rounded-lg transition-colors"
                      >
                        Necessary Only
                      </button>
                      <button
                        onClick={acceptAll}
                        className="px-4 py-2.5 text-sm font-medium bg-[#e0ff00] text-black hover:bg-[#c8e600] rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Accept All
                      </button>
                    </div>
                  </div>
                ) : (
                  // Preferences view
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#e0ff00]/10 border border-[#e0ff00]/30 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-[#e0ff00]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">Cookie Preferences</h3>
                          <p className="text-surface-500 text-sm">Manage your cookie settings</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPreferences(false)}
                        className="p-2 text-surface-400 hover:text-white hover:bg-surface-800 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      {/* Necessary Cookies */}
                      <div className="flex items-center justify-between p-4 bg-surface-800/50 rounded-xl border border-surface-700">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">Necessary Cookies</h4>
                            <span className="px-2 py-0.5 text-xs bg-[#e0ff00]/20 text-[#e0ff00] rounded-full">Required</span>
                          </div>
                          <p className="text-surface-400 text-sm mt-1">
                            Essential for the website to function. Cannot be disabled.
                          </p>
                        </div>
                        <div className="w-12 h-6 bg-[#e0ff00] rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-75">
                          <div className="w-4 h-4 bg-black rounded-full" />
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-center justify-between p-4 bg-surface-800/50 rounded-xl border border-surface-700">
                        <div className="flex-1">
                          <h4 className="font-medium text-white">Analytics Cookies</h4>
                          <p className="text-surface-400 text-sm mt-1">
                            Help us understand how visitors interact with our website.
                          </p>
                        </div>
                        <button
                          onClick={() => togglePreference('analytics')}
                          className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.analytics
                              ? 'bg-[#e0ff00] justify-end'
                              : 'bg-surface-600 justify-start'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full transition-colors ${
                            preferences.analytics ? 'bg-black' : 'bg-surface-400'
                          }`} />
                        </button>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-center justify-between p-4 bg-surface-800/50 rounded-xl border border-surface-700">
                        <div className="flex-1">
                          <h4 className="font-medium text-white">Marketing Cookies</h4>
                          <p className="text-surface-400 text-sm mt-1">
                            Used to deliver personalized advertisements and track campaigns.
                          </p>
                        </div>
                        <button
                          onClick={() => togglePreference('marketing')}
                          className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.marketing
                              ? 'bg-[#e0ff00] justify-end'
                              : 'bg-surface-600 justify-start'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full transition-colors ${
                            preferences.marketing ? 'bg-black' : 'bg-surface-400'
                          }`} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-surface-700">
                      <a href="/privacy" className="text-sm text-surface-400 hover:text-[#e0ff00] transition-colors">
                        View Privacy Policy
                      </a>
                      <div className="flex gap-3">
                        <button
                          onClick={acceptNecessary}
                          className="px-4 py-2.5 text-sm font-medium text-surface-300 hover:text-white bg-surface-800 hover:bg-surface-700 rounded-lg transition-colors"
                        >
                          Necessary Only
                        </button>
                        <button
                          onClick={savePreferences}
                          className="px-4 py-2.5 text-sm font-medium bg-[#e0ff00] text-black hover:bg-[#c8e600] rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export a helper hook for other components to check consent
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const checkConsent = () => {
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setConsent(JSON.parse(savedPrefs));
      }
    };

    checkConsent();

    const handleUpdate = (e: CustomEvent<CookiePreferences>) => {
      setConsent(e.detail);
    };

    window.addEventListener('cookieConsentUpdate', handleUpdate as EventListener);
    return () => window.removeEventListener('cookieConsentUpdate', handleUpdate as EventListener);
  }, []);

  return consent;
}
