import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import LocaleLink from '../components/LocaleLink';

export default function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="font-serif text-[120px] sm:text-[180px] leading-none text-bronze/20">
            404
          </h1>
        </motion.div>

        {/* Title */}
        <h2 className="font-serif text-4xl sm:text-5xl text-dark-text mb-6">
          {t('notFound.pageTitle')}
        </h2>

        {/* Description */}
        <p className="font-sans text-dark-text/60 text-lg mb-12 leading-relaxed">
          {t('notFound.descriptionLong')}<br />
          {t('notFound.descriptionSub')}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LocaleLink to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-dark-text text-white px-10 py-5 font-sans text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-bronze transition-colors duration-300"
            >
              <Home size={16} strokeWidth={2} />
              {t('notFound.backToHome')}
            </motion.button>
          </LocaleLink>

          <LocaleLink to="/shop">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 border-2 border-dark-text text-dark-text px-10 py-5 font-sans text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-dark-text hover:text-white transition-colors duration-300"
            >
              <Search size={16} strokeWidth={2} />
              {t('notFound.explore')}
            </motion.button>
          </LocaleLink>
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 opacity-20"
        >
          <svg viewBox="0 0 100 50" className="w-24 h-12 mx-auto text-dark-text">
            <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="38" y1="25" x2="62" y2="25" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
