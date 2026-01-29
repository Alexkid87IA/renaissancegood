import { Search, MapPin, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onGetLocation: () => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  countryCounts: { [key: string]: number };
}

// Liste des pays avec leurs codes et labels
const COUNTRIES = [
  { code: 'ALL', label: 'Tous les pays' },
  { code: 'FRA', label: 'France' },
  { code: 'DOM-TOM', label: 'DOM-TOM' },
  { code: 'BEL', label: 'Belgique' },
  { code: 'CHE', label: 'Suisse' },
  { code: 'LUX', label: 'Luxembourg' },
  { code: 'DEU', label: 'Allemagne' },
  { code: 'ITA', label: 'Italie' },
  { code: 'GRE', label: 'Grèce' },
  { code: 'ALB', label: 'Albanie' },
  { code: 'UAE', label: 'Dubai' },
];

export default function SearchBar({
  value,
  onChange,
  onGetLocation,
  selectedCountry,
  onCountryChange,
  countryCounts
}: SearchBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Trouver le pays sélectionné
  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry) || COUNTRIES[0];

  // Filtrer les pays qui ont des opticiens
  const availableCountries = COUNTRIES.filter(country => {
    if (country.code === 'ALL') return true;
    return (countryCounts[country.code] || 0) > 0;
  });

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="w-4 h-4 text-white/25" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ville, code postal ou nom d'opticien..."
            className="w-full pl-11 pr-4 py-4 border border-white/10 bg-white/5 font-sans text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-bronze/60 transition-colors duration-300"
          />
        </div>

        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full lg:w-auto px-5 py-4 border border-white/10 bg-white/5 hover:border-bronze/40 transition-colors duration-300 flex items-center justify-between gap-4 min-w-[200px]"
          >
            <span className="font-sans text-[11px] tracking-[0.15em] font-medium uppercase text-white/60">
              {selectedCountryData.label}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-white/30 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-white/10 shadow-2xl z-50 max-h-[300px] overflow-y-auto">
              {availableCountries.map((country) => {
                const count = country.code === 'ALL'
                  ? Object.values(countryCounts).reduce((a, b) => a + b, 0)
                  : countryCounts[country.code] || 0;

                return (
                  <button
                    key={country.code}
                    onClick={() => {
                      onCountryChange(country.code);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 transition-colors duration-200 ${
                      selectedCountry === country.code ? 'bg-white/8' : ''
                    }`}
                  >
                    <span className="font-sans text-[11px] tracking-[0.1em] font-medium uppercase text-white/60">
                      {country.label}
                    </span>
                    <span className="font-sans text-[10px] text-white/20 tracking-wider">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Geolocation Button */}
        <button
          onClick={onGetLocation}
          className="group relative overflow-hidden px-6 py-4 border border-white/10 bg-white/5 transition-all duration-500 hover:border-bronze/60 flex items-center justify-center gap-2"
          title="Utiliser ma position actuelle"
        >
          <MapPin className="w-4 h-4 relative z-10 text-white/40 group-hover:text-[#0a0a0a] transition-colors duration-500" />
          <span className="lg:hidden relative z-10 font-sans text-[9px] tracking-[0.2em] font-medium uppercase text-white/40 group-hover:text-[#0a0a0a] transition-colors duration-500">
            Ma position
          </span>
          <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </button>
      </div>
    </div>
  );
}
