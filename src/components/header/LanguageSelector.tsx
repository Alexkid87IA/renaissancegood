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
  /** Ouverture au survol (desktop). Sur tactile, passer false pour éviter le conflit hover/tap. */
  hoverable?: boolean;
}

export default function LanguageSelector({
  isOpen,
  onToggle,
  currentLang,
  languages,
  onSelect,
  transparent,
  hoverable = true
}: LanguageSelectorProps) {
  const { t } = useTranslation('common');

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={hoverable ? () => onToggle(true) : undefined}
      onMouseLeave={hoverable ? () => onToggle(false) : undefined}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${t('header.language')}: ${currentLang}`}
        onClick={() => onToggle(!isOpen)}
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
            className="absolute top-full left-0 mt-3 overflow-hidden min-w-[180px]"
            role="listbox"
            aria-label={t('header.language')}
          >
            <div className="flex flex-col gap-1">
              {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    type="button"
                    key={lang.code}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      onSelect(lang.code);
                      onToggle(false);
                    }}
                    className={`w-full text-left flex items-baseline gap-2.5 py-2 transition-colors duration-300 ${
                      transparent
                        ? `[text-shadow:0_1px_16px_rgba(0,0,0,0.75)] ${isActive ? 'text-white' : 'text-white/90 hover:text-white'}`
                        : `[text-shadow:0_1px_14px_rgba(255,255,255,0.75)] ${isActive ? 'text-dark-text' : 'text-dark-text/85 hover:text-dark-text'}`
                    }`}
                  >
                    <span className={`font-sans text-[9px] tracking-[0.3em] uppercase ${isActive ? 'font-bold' : 'font-medium'}`}>
                      {lang.code}
                    </span>
                    <span className="font-display text-[14px] tracking-[-0.01em]">
                      {lang.label}
                    </span>
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
  { code: 'TR', label: 'T\u00fcrk\u00e7e', flag: '' },
];
