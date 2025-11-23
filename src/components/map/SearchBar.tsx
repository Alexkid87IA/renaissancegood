import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onGetLocation: () => void;
}

export default function SearchBar({ value, onChange, onGetLocation }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-3">
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

        {/* Geolocation Button */}
        <button
          onClick={onGetLocation}
          className="group px-6 py-4 border border-dark-text/20 bg-white hover:bg-dark-text hover:border-dark-text transition-all duration-300 flex items-center gap-2"
          title="Utiliser ma position actuelle"
        >
          <MapPin className="w-5 h-5 text-dark-text group-hover:text-white transition-colors" />
          <span className="hidden laptop:inline font-sans text-xs tracking-wider uppercase text-dark-text group-hover:text-white transition-colors">
            Ma position
          </span>
        </button>
      </div>

      {/* Helper text */}
      <p className="mt-3 font-sans text-xs text-dark-text/50 text-center">
        Recherchez parmi {value ? 'les résultats' : 'plus de 200 opticiens partenaires'}
      </p>
    </div>
  );
}