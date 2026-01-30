// ========================================
// COMPOSANT LANGUAGE SELECTOR
// Dropdown de sélection de langue avec drapeaux
// ========================================

import { motion, AnimatePresence } from 'framer-motion';

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
  const currentLanguage = languages.find(l => l.code === currentLang);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button className={`flex items-center gap-1.5 font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium transition-colors duration-500 uppercase leading-none ${
        transparent
          ? 'text-white/90 hover:text-white/50'
          : 'text-dark-text hover:text-bronze'
      }`}>
        {currentLanguage && (
          <span className="text-sm leading-none">{currentLanguage.flag}</span>
        )}
        {currentLang}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-3 bg-white border border-dark-text/[0.08] overflow-hidden min-w-[180px] shadow-lg shadow-dark-text/5"
          >
            <div className="px-4 pt-3 pb-2">
              <p className="font-sans text-[7px] tracking-[0.4em] uppercase text-dark-text/25 font-medium">
                Langue
              </p>
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onSelect(lang.code);
                  onToggle(false);
                }}
                className={`w-full text-left px-4 py-2.5 flex items-center gap-3 font-sans text-xs tracking-wider transition-all duration-300 ${
                  currentLang === lang.code
                    ? 'bg-dark-text/[0.04] text-dark-text font-medium'
                    : 'text-dark-text/50 hover:bg-beige hover:text-dark-text'
                }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="flex-1">{lang.label}</span>
                {currentLang === lang.code && (
                  <span className="w-1 h-1 rounded-full bg-bronze" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Constante des langues supportées avec drapeaux
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'RU', label: 'Русский', flag: '🇷🇺' },
  { code: 'IT', label: 'Italiano', flag: '🇮🇹' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ES', label: 'Español', flag: '🇪🇸' },
];
