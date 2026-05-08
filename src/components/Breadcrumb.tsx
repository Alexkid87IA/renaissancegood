import LocaleLink from './LocaleLink';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark';
}

export default function Breadcrumb({ items, variant = 'dark' }: BreadcrumbProps) {
  const isLight = variant === 'light';

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span className={`font-sans text-[8px] ${isLight ? 'text-white/20' : 'text-dark-text/20'}`}>/</span>
              )}
              {item.to && !isLast ? (
                <LocaleLink
                  to={item.to}
                  className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                    isLight
                      ? 'text-white/35 hover:text-white/70'
                      : 'text-dark-text/35 hover:text-dark-text/60'
                  }`}
                >
                  {item.label}
                </LocaleLink>
              ) : (
                <span className={`font-sans text-[9px] tracking-[0.25em] uppercase ${
                  isLight ? 'text-white/55' : 'text-dark-text/50'
                }`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
