import { useTranslation } from 'react-i18next';

interface StepSummaryProps {
  label: string;
  value: string;
  onEdit: () => void;
}

export default function StepSummary({ label, value, onEdit }: StepSummaryProps) {
  const { t } = useTranslation('cart');
  return (
    <div className="bg-white border border-dark-text/[0.07] px-6 py-4 flex items-center justify-between mb-0">
      <div className="min-w-0">
        <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/30 uppercase mb-1">{label}</p>
        <p className="font-sans text-sm text-dark-text truncate">{value}</p>
      </div>
      <button
        onClick={onEdit}
        className="font-sans text-[10px] text-dark-text/40 hover:text-dark-text uppercase tracking-[0.1em] transition-colors flex-shrink-0 ml-4"
      >
        {t('checkoutPage.edit')}
      </button>
    </div>
  );
}
