/**
 * Colored SVG flag icons for language selector.
 * Simple, visible, high-contrast designs.
 */

const flags: Record<string, JSX.Element> = {
  FR: (
    <svg viewBox="0 0 36 24" className="w-full h-full">
      <rect width="12" height="24" x="0" fill="#002395" />
      <rect width="12" height="24" x="12" fill="#FFFFFF" />
      <rect width="12" height="24" x="24" fill="#ED2939" />
    </svg>
  ),
  EN: (
    <svg viewBox="0 0 36 24" className="w-full h-full">
      <rect width="36" height="24" fill="#012169" />
      <path d="M0,0 L36,24 M36,0 L0,24" stroke="#FFF" strokeWidth="4" />
      <path d="M0,0 L36,24 M36,0 L0,24" stroke="#C8102E" strokeWidth="2.5" />
      <path d="M18,0 V24 M0,12 H36" stroke="#FFF" strokeWidth="6" />
      <path d="M18,0 V24 M0,12 H36" stroke="#C8102E" strokeWidth="3.5" />
    </svg>
  ),
  RU: (
    <svg viewBox="0 0 36 24" className="w-full h-full">
      <rect width="36" height="8" y="0" fill="#FFFFFF" />
      <rect width="36" height="8" y="8" fill="#0039A6" />
      <rect width="36" height="8" y="16" fill="#D52B1E" />
    </svg>
  ),
  IT: (
    <svg viewBox="0 0 36 24" className="w-full h-full">
      <rect width="12" height="24" x="0" fill="#009246" />
      <rect width="12" height="24" x="12" fill="#FFFFFF" />
      <rect width="12" height="24" x="24" fill="#CE2B37" />
    </svg>
  ),
  DE: (
    <svg viewBox="0 0 36 24" className="w-full h-full">
      <rect width="36" height="8" y="0" fill="#000000" />
      <rect width="36" height="8" y="8" fill="#DD0000" />
      <rect width="36" height="8" y="16" fill="#FFCC00" />
    </svg>
  ),
  ES: (
    <svg viewBox="0 0 36 24" className="w-full h-full">
      <rect width="36" height="6" y="0" fill="#AA151B" />
      <rect width="36" height="12" y="6" fill="#F1BF00" />
      <rect width="36" height="6" y="18" fill="#AA151B" />
    </svg>
  ),
};

interface FlagIconProps {
  code: string;
  className?: string;
}

export default function FlagIcon({ code, className = 'w-6 h-4' }: FlagIconProps) {
  const flag = flags[code.toUpperCase()];
  if (!flag) return null;
  return (
    <span className={`inline-block overflow-hidden rounded-[2px] flex-shrink-0 ${className}`}>
      {flag}
    </span>
  );
}
