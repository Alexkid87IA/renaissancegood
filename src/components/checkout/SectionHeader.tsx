export default function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-lg font-medium text-dark-text mb-6">{children}</h2>
  );
}
