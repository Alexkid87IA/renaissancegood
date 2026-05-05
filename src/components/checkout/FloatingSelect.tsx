import { ChevronDown } from 'lucide-react';

interface FloatingSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: { value: string; label: string }[];
}

export default function FloatingSelect({
  name,
  value,
  onChange,
  label,
  options,
}: FloatingSelectProps) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="peer w-full px-4 pt-5 pb-2 border border-dark-text/10 focus:border-dark-text focus:outline-none transition-colors duration-300 text-sm font-sans bg-white text-dark-text appearance-none"
        id={`field-${name}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <label
        htmlFor={`field-${name}`}
        className="absolute left-4 top-2 text-[10px] tracking-[0.1em] text-dark-text/40 uppercase pointer-events-none"
      >
        {label}
      </label>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text/30 pointer-events-none" />
    </div>
  );
}
