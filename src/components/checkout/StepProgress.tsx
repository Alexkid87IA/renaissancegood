import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function StepProgress({ currentStep }: { currentStep: 1 | 2 }) {
  const { t } = useTranslation('cart');
  const steps = [
    { num: 1, label: t('checkoutPage.stepInformation') },
    { num: 2, label: t('checkoutPage.stepPayment') },
  ];

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center gap-0 mb-10 md:mb-14">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center">
            <span
              className={`transition-all duration-500 ${
                step.num === currentStep
                  ? 'font-display text-lg font-medium text-dark-text'
                  : step.num < currentStep
                  ? 'font-display text-lg font-medium text-dark-text'
                  : 'font-sans text-sm text-dark-text/30'
              }`}
            >
              {step.label}
              {step.num < currentStep && (
                <Check className="inline-block w-4 h-4 text-bronze ml-2" />
              )}
            </span>

            {index < steps.length - 1 && (
              <div className="w-24 sm:w-32 md:w-40 h-px mx-6 relative">
                <div className="absolute inset-0 bg-dark-text/10" />
                <motion.div
                  className="absolute inset-y-0 left-0 bg-bronze"
                  initial={false}
                  animate={{ width: step.num < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden mb-8">
        <p className="font-sans text-[11px] tracking-[0.1em] text-dark-text/50 text-center mb-3">
          {t('checkoutPage.stepXofY', { current: currentStep, total: 2 })}
        </p>
        <div className="h-[2px] bg-dark-text/10 relative">
          <motion.div
            className="absolute inset-y-0 left-0 bg-bronze"
            initial={false}
            animate={{ width: currentStep === 1 ? '50%' : '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </>
  );
}
