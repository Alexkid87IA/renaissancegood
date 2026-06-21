// ========================================
// COMPOSANT OPTICIAN LINK
// Lien direct vers le store locator
// ========================================

import { useTranslation } from 'react-i18next';
import LocaleLink from '../LocaleLink';

interface OpticianDropdownProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  transparent?: boolean;
}

export default function OpticianDropdown({ transparent }: OpticianDropdownProps) {
  const { t } = useTranslation('common');

  return (
    <LocaleLink
      to="/opticiens"
      className={`inline-flex items-center font-sans text-[10px] laptop:text-[10.5px] xl:text-[10.5px] 2xl:text-[11px] tracking-[0.18em] font-medium transition-colors duration-500 uppercase whitespace-nowrap ${
        transparent
          ? 'text-white/90 hover:text-white/50'
          : 'text-dark-text hover:text-bronze'
      }`}
    >
      {t('header.findOptician')}
    </LocaleLink>
  );
}
