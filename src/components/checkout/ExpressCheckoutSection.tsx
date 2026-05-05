import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExpressCheckoutElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { SHIPPING } from '../../constants/shipping';

interface ExpressCheckoutSectionProps {
  total: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

export default function ExpressCheckoutSection({
  total,
  onSuccess,
  onError,
}: ExpressCheckoutSectionProps) {
  const { t } = useTranslation('cart');
  const stripe = useStripe();
  const elements = useElements();
  const [hasExpressMethods, setHasExpressMethods] = useState<boolean | null>(null);

  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/confirmation`,
        },
        redirect: 'if_required',
      });

      if (error) {
        onError(error.message || t('checkoutPage.errorExpressPayment'));
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('checkoutPage.errorUnexpected');
      onError(message);
    }
  };

  if (hasExpressMethods === false) return null;

  return (
    <div className={hasExpressMethods === null ? 'min-h-[60px]' : ''}>
      <div className={hasExpressMethods === null ? 'opacity-0 h-0 overflow-hidden' : ''}>
        <ExpressCheckoutElement
          onReady={({ availablePaymentMethods }) => {
            if (availablePaymentMethods) {
              const hasAny = Object.values(availablePaymentMethods).some(Boolean);
              setHasExpressMethods(hasAny);
            } else {
              setHasExpressMethods(false);
            }
          }}
          onConfirm={handleExpressConfirm}
          onClick={({ resolve }) => {
            const shippingFree = total >= SHIPPING.FREE_THRESHOLD;
            resolve({
              emailRequired: true,
              phoneNumberRequired: true,
              shippingAddressRequired: true,
              allowedShippingCountries: ['FR', 'BE', 'CH', 'LU'],
              shippingRates: shippingFree
                ? [{ id: 'free', displayName: t('checkoutPage.shippingRateFree'), amount: 0 }]
                : [{ id: 'standard', displayName: t('checkoutPage.shippingRateStandard'), amount: SHIPPING.STANDARD_RATE_CENTS }],
            });
          }}
          options={{
            paymentMethods: {
              applePay: 'always',
              googlePay: 'always',
              link: 'auto',
            },
            buttonType: {
              applePay: 'buy',
              googlePay: 'buy',
            },
            buttonTheme: {
              applePay: 'black',
              googlePay: 'black',
            },
            layout: {
              maxColumns: 3,
              maxRows: 1,
            },
          }}
        />

        {/* Divider "OU" with bronze ornament */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-dark-text/[0.07]" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-bronze/30" />
            <span className="font-sans text-[10px] tracking-[0.25em] text-dark-text/25 uppercase">{t('checkoutPage.orDivider')}</span>
            <div className="w-4 h-px bg-bronze/30" />
          </div>
          <div className="flex-1 h-px bg-dark-text/[0.07]" />
        </div>
      </div>
    </div>
  );
}
