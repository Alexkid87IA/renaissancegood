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
  { code: 'ALL', label: 'Tous les pays', flag: '🌍' },
  { code: 'FRA', label: 'France métropolitaine', flag: '🇫🇷' },
  { code: 'DOM-TOM', label: 'DOM-TOM', flag: '🏝️' },
  { code: 'BEL', label: 'Belgique', flag: '🇧🇪' },
  { code: 'CHE', label: 'Suisse', flag: '🇨🇭' },
  { code: 'LUX', label: 'Luxembourg', flag: '🇱🇺' },
  { code: 'DEU', label: 'Allemagne', flag: '🇩🇪' },
  { code: 'ITA', label: 'Italie', flag: '🇮🇹' },
  { code: 'GRE', label: 'Grèce', flag: '🇬🇷' },
  { code: 'ALB', label: 'Albanie', flag: '🇦🇱' },
  { code: 'UAE', label: 'Émirats (Dubai)', flag: '🇦🇪' },
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
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col laptop:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="w-5 h-5 text-dark-text/40" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ville, code postal ou nom d'opticien..."
            className="w-full pl-12 pr-4 py-4 border border-dark-text/20 bg-white font-sans text-sm text-dark-text placeholder:text-dark-text/40 focus:outline-none focus:border-bronze transition-colors"
          />
        </div>

        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full laptop:w-auto px-5 py-4 border border-dark-text/20 bg-white hover:border-bronze transition-colors flex items-center justify-between gap-3 min-w-[200px]"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedCountryData.flag}</span>
              <span className="font-sans text-sm text-dark-text">
                {selectedCountryData.label}
              </span>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-dark-text/60 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-dark-text/20 shadow-lg z-50 max-h-[300px] overflow-y-auto">
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
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-beige transition-colors ${
                      selectedCountry === country.code ? 'bg-beige' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-sans text-sm text-dark-text">
                        {country.label}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-dark-text/50">
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
          className="group px-6 py-4 border border-dark-text/20 bg-white hover:bg-dark-text hover:border-dark-text transition-all duration-300 flex items-center justify-center gap-2"
          title="Utiliser ma position actuelle"
        >
          <MapPin className="w-5 h-5 text-dark-text group-hover:text-white transition-colors" />
          <span className="laptop:hidden font-sans text-xs tracking-wider uppercase text-dark-text group-hover:text-white transition-colors">
            Ma position
          </span>
        </button>
      </div>

      {/* Helper text */}
      <p className="mt-3 font-sans text-xs text-dark-text/50 text-center">
        {selectedCountry === 'ALL' 
          ? `Recherchez parmi tous nos opticiens partenaires`
          : `Recherchez parmi nos opticiens en ${selectedCountryData.label}`
        }
      </p>
    </div>
  );
}