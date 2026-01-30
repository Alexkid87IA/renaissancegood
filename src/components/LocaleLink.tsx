import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { useLocale } from '../contexts/LocaleContext';

type LocaleLinkProps = Omit<LinkProps, 'to'> & {
  to: string;
};

export default function LocaleLink({ to, ...props }: LocaleLinkProps) {
  const { locale } = useLocale();

  // Prefix path with locale (skip for 'fr' — default)
  const localizedTo = locale === 'fr' ? to : `/${locale}${to}`;

  return <Link {...props} to={localizedTo} />;
}
