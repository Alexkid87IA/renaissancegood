import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function handleRefuse() {
    localStorage.setItem(STORAGE_KEY, 'refused');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[200] bg-[#0a0a0a] border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-white/70 leading-relaxed">
              Ce site utilise des cookies pour améliorer votre expérience.{' '}
              <Link to="/cookies" className="underline underline-offset-2 text-white/90 hover:text-white transition-colors">
                En savoir plus
              </Link>
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
              <button
                onClick={handleAccept}
                className="px-5 py-2.5 bg-white text-black text-sm font-medium tracking-wide uppercase rounded-none hover:bg-white/90 transition-colors"
              >
                Tout accepter
              </button>
              <button
                onClick={handleRefuse}
                className="px-5 py-2.5 border border-white/20 text-white/60 text-sm font-medium tracking-wide uppercase rounded-none hover:text-white hover:border-white/40 transition-colors"
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
