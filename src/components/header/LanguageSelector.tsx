// ========================================
// COMPOSANT LANGUAGE SELECTOR
// Dropdown de sélection de langue
// ========================================

import { motion, AnimatePresence } from 'framer-motion';

export interface Language {
  code: string;
  label: string;
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
  return (
    <div
      className="relative"
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button className={`font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium transition-colors duration-500 uppercase ${
        transparent
          ? 'text-white/90 hover:text-white/50'
          : 'text-dark-text hover:text-bronze'
      }`}>
        {currentLang}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-3 bg-white border border-dark-text/[0.08] overflow-hidden min-w-[140px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onSelect(lang.code);
                  onToggle(false);
                }}
                className={`w-full text-left px-5 py-3 font-sans text-xs tracking-wider transition-colors duration-300 ${
                  currentLang === lang.code
                    ? 'bg-dark-text/5 text-dark-text font-medium'
                    : 'text-dark-text/60 hover:bg-beige hover:text-dark-text'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Constante des langues supportées
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'FR', label: 'Français' },
  { code: 'EN', label: 'English' },
  { code: 'RU', label: 'Русский' },
  { code: 'IT', label: 'Italiano' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'ES', label: 'Español' }
];
