// ========================================
// COMPOSANT LANGUAGE SELECTOR
// Dropdown de sélection de langue — style typographique luxe
// ========================================

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface Language {
  code: string;
  label: string;
  flag: string;
}

interface LanguageSelectorProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  currentLang: string;
  languages: Language[];
  onSelect: (code: string) => void;
  transparent?: boolean;
}

export default function LanguageSelector({
  isOpen,
  onToggle,
  currentLang,
  languages,
  onSelect,
  transparent
}: LanguageSelectorProps) {
  const { t } = useTranslation('common');

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${t('header.language')}: ${currentLang}`}
        className={`flex items-center gap-1.5 font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium transition-colors duration-500 uppercase leading-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 ${
        transparent
          ? 'text-white/90 hover:text-white/50'
          : 'text-dark-text hover:text-bronze'
      }`}>
        {currentLang}
        <svg className="w-2.5 h-2.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-3 bg-white border border-dark-text/[0.08] overflow-hidden min-w-[160px] shadow-lg shadow-dark-text/5"
          >
            <div className="px-5 pt-4 pb-2">
              <p className="font-sans text-[7px] tracking-[0.4em] uppercase text-dark-text/25 font-medium">
                {t('header.language')}
              </p>
            </div>
            <div className="pb-2">
              {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelect(lang.code);
                      onToggle(false);
                    }}
                    className={`w-full text-left px-5 py-2 flex items-center justify-between transition-all duration-300 group ${
                      isActive
                        ? 'text-dark-text'
                        : 'text-dark-text/35 hover:text-dark-text/70'
                    }`}
                  >
                    <span className="flex items-baseline gap-2.5">
                      <span className={`font-sans text-[9px] tracking-[0.3em] uppercase ${isActive ? 'font-bold' : 'font-medium'}`}>
                        {lang.code}
                      </span>
                      <span className="font-display text-[13px] tracking-[-0.01em]">
                        {lang.label}
                      </span>
                    </span>
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-bronze" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Constante des langues supportées avec drapeaux
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'FR', label: 'Fran\u00e7ais', flag: '' },
  { code: 'EN', label: 'English', flag: '' },
  { code: 'RU', label: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439', flag: '' },
  { code: 'IT', label: 'Italiano', flag: '' },
  { code: 'DE', label: 'Deutsch', flag: '' },
  { code: 'ES', label: 'Espa\u00f1ol', flag: '' },
];
