import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../contexts/LocaleContext';
import { subscribeToKlaviyo } from '../lib/klaviyo';

const STORAGE_KEY = 'newsletter-popup-seen';

export default function NewsletterPopup() {
  const { t, ready } = useTranslation('common', { useSuspense: false });
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Trigger logic: scroll 30% OR 5s timeout (whichever first)
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;
    const show = () => {
      if (triggered) return;
      triggered = true;
      setVisible(true);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };

    const onScroll = () => {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.3) show();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = setTimeout(show, 5000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  }, []);

  // Escape key + focus trap
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // Focus first element
    requestAnimationFrame(() => {
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>('button, input');
      firstFocusable?.focus();
    });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [visible, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(false);
    const success = await subscribeToKlaviyo(email, locale, 'Website Popup');
    if (success) {
      setSubscribed(true);
    } else {
      setError(true);
    }
    setSubmitting(false);
  };

  if (!ready) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="newsletter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('newsletterPopup.title')}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white w-full max-w-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left — Image (hidden on mobile) */}
              <div className="hidden lg:block relative">
                <img
                  src="https://renaissance-cdn.b-cdn.net/page%20histoire.png"
                  alt="Renaissance Eyewear"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Right — Form */}
              <div className="relative px-8 py-12 lg:px-10 lg:py-14 flex flex-col items-center text-center">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-dark-text/40 hover:text-dark-text transition-colors duration-300"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Logo */}
                <img
                  src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png"
                  alt="Renaissance"
                  className="h-12 w-auto object-contain mb-8"
                />

                {!subscribed ? (
                  <>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-dark-text tracking-[-0.02em] leading-tight mb-2">
                      {t('newsletterPopup.title')}
                    </h2>
                    <p className="font-display text-lg lg:text-xl font-light italic text-dark-text/50 mb-4">
                      {t('newsletterPopup.subtitle')}
                    </p>
                    <div className="w-10 h-px bg-dark-text/15 mx-auto mb-4" />
                    <p className="font-sans text-sm text-dark-text/50 leading-relaxed mb-8 max-w-xs">
                      {t('newsletterPopup.description')}
                    </p>

                    <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('newsletterPopup.emailPlaceholder')}
                        required
                        disabled={submitting}
                        className="w-full px-5 py-3.5 bg-beige/50 border border-dark-text/10 text-dark-text text-sm font-sans placeholder:text-dark-text/30 focus:outline-none focus:border-dark-text/30 transition-all duration-300 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-dark-text text-white py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-dark-text/90 transition-colors duration-300 disabled:opacity-50"
                      >
                        {submitting ? '...' : t('newsletterPopup.cta')}
                      </button>
                    </form>

                    {error && (
                      <p className="font-sans text-xs text-red-500 mt-3" role="alert" aria-live="polite">
                        {t('newsletterPopup.error')}
                      </p>
                    )}

                    <button
                      onClick={handleClose}
                      className="mt-6 font-sans text-[11px] text-dark-text/30 hover:text-dark-text/50 transition-colors duration-300 underline underline-offset-2"
                    >
                      {t('newsletterPopup.noThanks')}
                    </button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                  >
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-dark-text tracking-[-0.02em] mb-3">
                      {t('newsletterPopup.success')}
                    </h2>
                    <p className="font-sans text-sm text-dark-text/50 leading-relaxed mb-6 max-w-xs">
                      {t('newsletterPopup.successDetail')}
                    </p>
                    <div className="px-6 py-3 border border-dark-text/15 bg-beige/50">
                      <span className="font-sans text-[11px] tracking-[0.3em] text-dark-text/70 uppercase font-semibold">
                        {t('newsletterPopup.successCode')}
                      </span>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-8 font-sans text-[11px] text-dark-text/30 hover:text-dark-text/50 transition-colors duration-300 underline underline-offset-2"
                    >
                      {t('newsletterPopup.close', { defaultValue: 'Fermer' })}
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
