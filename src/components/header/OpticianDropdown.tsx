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
      to="/store-locator"
      className={`inline-flex items-center font-sans text-[9px] laptop:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] tracking-[0.25em] font-medium transition-colors duration-500 uppercase whitespace-nowrap ${
        transparent
          ? 'text-white/90 hover:text-white/50'
          : 'text-dark-text hover:text-bronze'
      }`}
    >
      {t('header.findOptician')}
    </LocaleLink>
  );
}
