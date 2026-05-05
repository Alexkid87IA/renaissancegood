import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, AlertCircle } from 'lucide-react';
import { PaymentLogos } from '../PaymentLogos';
import TrustBar from './TrustBar';
import type { ShippingFormData } from './types';
import { COUNTRY_CODES } from './types';

interface StripePaymentFormProps {
  formData: ShippingFormData;
  total: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

export default function StripePaymentForm({
  formData,
  total,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const { t } = useTranslation('cart');
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !isReady) return;

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/confirmation`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setPaymentError(error.message || t('checkoutPage.errorPaymentGeneric'));
        onError(error.message || t('checkoutPage.errorPayment'));
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      } else if (paymentIntent) {
        setPaymentError(t('checkoutPage.errorPaymentAction'));
        onError(t('checkoutPage.errorPaymentActionRequired'));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('checkoutPage.errorUnexpected');
      setPaymentError(message);
      onError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-bronze/40" />
          <p className="font-display text-lg font-medium text-dark-text">
            {t('checkoutPage.cardPayment')}
          </p>
        </div>

        {/* Stripe security note */}
        <div className="flex items-center gap-2 mb-5 px-3 py-2.5 bg-bronze/[0.04] border border-bronze/10">
          <Lock className="w-3 h-3 text-bronze/50" />
          <span className="font-sans text-[10px] text-dark-text/40">{t('checkoutPage.stripeSecurityNote')}</span>
        </div>

        <div className={isReady ? '' : 'min-h-[200px] flex items-center justify-center'}>
          {!isReady && (
            <div className="text-center">
              <div className="w-5 h-5 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin mx-auto mb-2" />
              <p className="font-sans text-[11px] text-dark-text/30">{t('checkoutPage.loadingPaymentForm')}</p>
            </div>
          )}
          <div className={isReady ? '' : 'sr-only'}>
            <PaymentElement
              onReady={() => setIsReady(true)}
              onLoadError={(e) => {
                setPaymentError(t('checkoutPage.loadError', { message: e.error?.message || t('checkoutPage.loadErrorFallback') }));
              }}
              options={{
                layout: 'tabs',
                defaultValues: {
                  billingDetails: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    address: {
                      line1: formData.address,
                      city: formData.city,
                      postal_code: formData.postalCode,
                      country: COUNTRY_CODES[formData.country] || 'FR',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {paymentError && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 mt-6"
          >
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="font-sans text-sm text-red-700">{paymentError}</p>
          </motion.div>
        )}

        {/* CTA with bronze sweep */}
        <button
          type="submit"
          disabled={!stripe || !isReady || isProcessing}
          className="group relative w-full mt-8 bg-dark-text text-white py-5 font-sans text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left group-disabled:scale-x-0" />
          {isProcessing ? (
            <>
              <div className="relative z-10 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="relative z-10">{t('checkoutPage.processing')}</span>
            </>
          ) : (
            <>
              <Lock className="relative z-10 w-3.5 h-3.5" />
              <span className="relative z-10">{t('checkoutPage.confirmAndPay', { total: `${total.toFixed(2)}\u20AC` })}</span>
            </>
          )}
        </button>

        {/* Trust bar under confirm button */}
        <TrustBar />

        {/* Payment method icons */}
        <div className="mt-2">
          <p className="font-sans text-[9px] tracking-[0.1em] text-dark-text/20 uppercase text-center mb-2">
            {t('checkoutPage.acceptedMethods')}
          </p>
          <PaymentLogos size="compact" />
        </div>
      </form>
    </div>
  );
}
