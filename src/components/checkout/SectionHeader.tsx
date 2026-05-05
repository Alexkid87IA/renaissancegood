export default function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-px bg-bronze/40" />
      <h2 className="font-display text-lg font-medium text-dark-text">{children}</h2>
    </div>
  );
}
