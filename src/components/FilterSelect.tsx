// ========================================
// COMPOSANT FILTERSELECT RÉUTILISABLE
// Utilisé dans : ShopPage, CollectionsPage, HeritageCollectionPage, VersaillesCollectionPage
// ========================================

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSelect({
  label,
  options,
  value,
  onChange
}: FilterSelectProps) {
  return (
    <div className="relative">
      <label className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-dark-text uppercase mb-2 sm:mb-3 block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b-2 border-dark-text/20 pb-1.5 sm:pb-2 font-sans text-xs sm:text-sm text-dark-text focus:outline-none focus:border-dark-text transition-colors appearance-none cursor-pointer pr-6"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-0 bottom-2 sm:bottom-3 pointer-events-none">
          <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="sm:w-[10px] sm:h-[6px]">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Export des types pour réutilisation
export type { FilterOption, FilterSelectProps };
