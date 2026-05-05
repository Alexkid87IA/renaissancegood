import { useTranslation } from 'react-i18next';
import { Shield, Lock, Truck } from 'lucide-react';

export default function TrustBar() {
  const { t } = useTranslation('cart');
  return (
    <div className="grid grid-cols-3 gap-3 my-6">
      {[
        { Icon: Shield, label: t('checkoutPage.trustBarSecure') },
        { Icon: Lock, label: t('checkoutPage.trustBarEncrypted') },
        { Icon: Truck, label: t('checkoutPage.trustBarShipping') },
      ].map(({ Icon, label }) => (
        <div key={label} className="flex items-center justify-center gap-2 py-3 bg-bronze/[0.04] border border-bronze/10">
          <Icon className="w-3.5 h-3.5 text-bronze/60" />
          <span className="font-sans text-[9px] tracking-[0.1em] text-dark-text/50 uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
}
