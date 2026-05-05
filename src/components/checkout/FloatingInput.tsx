import { motion } from 'framer-motion';

interface FloatingInputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
}

export default function FloatingInput({
  type = 'text',
  name,
  value,
  onChange,
  label,
  error,
}: FloatingInputProps) {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer w-full px-4 pt-5 pb-2 border focus:outline-none transition-colors duration-300 text-sm font-sans ${
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-dark-text/10 focus:border-dark-text'
          }`}
          id={`field-${name}`}
        />
        <label
          htmlFor={`field-${name}`}
          className={`absolute left-4 transition-all duration-300 pointer-events-none
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-dark-text/30
            peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:tracking-[0.1em] peer-focus:text-bronze peer-focus:uppercase
            ${value ? 'top-2 -translate-y-0 text-[10px] tracking-[0.1em] text-dark-text/40 uppercase' : 'top-1/2 -translate-y-1/2 text-sm text-dark-text/30'}`}
        >
          {label}
        </label>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-sans text-[11px] text-red-500 mt-1.5"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
