import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Package, Truck, Mail, ArrowRight, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import LocaleLink from '../components/LocaleLink';

interface OrderInfo {
  email: string;
  name: string;
  total: number;
  date: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const TIMELINE_ICONS = [Mail, Package, Truck];

export default function CheckoutConfirmationPage() {
  const { t } = useTranslation('cart');
  const [searchParams] = useSearchParams();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const { clearCart } = useCart();

  const TIMELINE_STEPS = [
    { icon: Mail, title: t('confirmationPage.step1Title'), description: t('confirmationPage.step1Desc') },
    { icon: Package, title: t('confirmationPage.step2Title'), description: t('confirmationPage.step2Desc') },
    { icon: Truck, title: t('confirmationPage.step3Title'), description: t('confirmationPage.step3Desc') },
  ];

  useEffect(() => {
    // Récupérer les infos de commande du localStorage
    const savedOrder = sessionStorage.getItem('renaissance_last_order');
    if (savedOrder) {
      try {
        setOrderInfo(JSON.parse(savedOrder));
      } catch {
        // Ignore parse errors
      }
    }

    // Sécurité : vider le panier si pas déjà fait
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const paymentIntentId = searchParams.get('payment_intent');
  const orderRef = paymentIntentId ? paymentIntentId.slice(-8).toUpperCase() : null;

  return (
    <div className="min-h-screen bg-beige">
      {/* ==================== HEADER ==================== */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-dark-text/[0.07]">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="w-20" />

          <LocaleLink to="/" className="font-display text-base tracking-[0.25em] text-dark-text font-bold uppercase">
            {t('confirmationPage.headerTitle')}
          </LocaleLink>

          <div className="w-20 flex justify-end">
            <div className="flex items-center gap-1.5 text-dark-text/30">
              <Shield className="w-3 h-3" />
              <span className="font-sans text-[9px] tracking-[0.1em] uppercase hidden sm:inline">{t('confirmationPage.confirmed')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== CONTENU ==================== */}
      <main className="pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-[680px] mx-auto px-6">

          {/* Icône de succès */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, duration: 0.6 }}
            className="w-20 h-20 mx-auto mb-10 bg-bronze/10 flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-bronze" strokeWidth={2.5} />
          </motion.div>

          {/* Titre principal */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeIn}
            className="text-center mb-4"
          >
            <p className="font-sans text-[9px] tracking-[0.35em] text-dark-text/30 uppercase font-medium mb-4">
              {t('confirmationPage.orderConfirmedLabel')}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.08em] text-dark-text font-light uppercase">
              {t('confirmationPage.thankYouTitle')}
            </h1>
          </motion.div>

          {/* Sous-titre */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeIn}
            className="text-center font-sans text-sm md:text-base text-dark-text/45 leading-relaxed mb-12 md:mb-16 max-w-[480px] mx-auto"
          >
            {t('confirmationPage.thankYouSubtitle')}
          </motion.p>

          {/* Détails de la commande */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeIn}
            className="bg-white border border-dark-text/[0.07] mb-10 md:mb-14"
          >
            <div className="px-6 md:px-8 py-5 border-b border-dark-text/[0.05]">
              <h2 className="font-sans text-[9px] tracking-[0.3em] text-dark-text/30 uppercase font-medium">
                {t('confirmationPage.summaryTitle')}
              </h2>
            </div>

            <div className="px-6 md:px-8 py-6 space-y-4">
              {orderRef && (
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-[11px] tracking-[0.1em] text-dark-text/40 uppercase">{t('confirmationPage.reference')}</span>
                  <span className="font-mono text-xs tracking-wider text-dark-text/70">REN-{orderRef}</span>
                </div>
              )}

              {orderInfo && (
                <>
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[11px] tracking-[0.1em] text-dark-text/40 uppercase">{t('confirmationPage.client')}</span>
                    <span className="font-sans text-sm text-dark-text">{orderInfo.name}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[11px] tracking-[0.1em] text-dark-text/40 uppercase">{t('confirmationPage.email')}</span>
                    <span className="font-sans text-sm text-dark-text/70">{orderInfo.email}</span>
                  </div>

                  <div className="h-px bg-dark-text/[0.05] my-2" />

                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[11px] tracking-[0.1em] text-dark-text/40 uppercase">{t('confirmationPage.totalPaid')}</span>
                    <span className="font-display text-xl tracking-wider text-dark-text">
                      {orderInfo.total.toFixed(2)}<span className="text-base ml-0.5">€</span>
                    </span>
                  </div>
                </>
              )}

              {orderInfo?.date && (
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-[11px] tracking-[0.1em] text-dark-text/40 uppercase">{t('confirmationPage.date')}</span>
                  <span className="font-sans text-sm text-dark-text/60">
                    {new Date(orderInfo.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Timeline - prochaines étapes */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeIn}
            className="mb-12 md:mb-16"
          >
            <h3 className="font-sans text-[9px] tracking-[0.3em] text-dark-text/30 uppercase font-medium mb-8 text-center">
              {t('confirmationPage.nextStepsTitle')}
            </h3>

            <div className="relative">
              {/* Ligne verticale de connexion */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-dark-text/[0.06]" />

              <div className="space-y-0">
                {TIMELINE_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex items-start gap-5 py-5"
                    >
                      <div className="relative z-10 w-10 h-10 bg-white border border-dark-text/[0.08] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-bronze" />
                      </div>
                      <div className="pt-1">
                        <h4 className="font-sans text-sm font-medium text-dark-text mb-1.5 tracking-wide">
                          {step.title}
                        </h4>
                        <p className="font-sans text-[13px] text-dark-text/40 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Séparateur */}
          <div className="w-10 h-px bg-dark-text/10 mx-auto mb-10 md:mb-14" />

          {/* Actions */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={5}
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-3"
          >
            <LocaleLink
              to="/shop"
              className="flex-1 bg-dark-text text-white text-center font-sans text-[10px] tracking-[0.3em] uppercase py-4.5 hover:bg-bronze transition-all duration-500 flex items-center justify-center gap-2.5"
            >
              <span>{t('confirmationPage.continueShopping')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </LocaleLink>
            <LocaleLink
              to="/"
              className="flex-1 border border-dark-text/15 text-dark-text text-center font-sans text-[10px] tracking-[0.3em] uppercase py-4.5 hover:border-dark-text hover:bg-dark-text hover:text-white transition-all duration-500"
            >
              {t('confirmationPage.backToHome')}
            </LocaleLink>
          </motion.div>

          {/* Contact */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-14 md:mt-20 font-sans text-[11px] text-dark-text/30 leading-relaxed"
          >
            {t('confirmationPage.orderQuestion')}{' '}
            <a href="mailto:contact@renaissance-eyewear.fr" className="text-bronze/70 hover:text-bronze transition-colors">
              contact@renaissance-eyewear.fr
            </a>
          </motion.p>
        </div>
      </main>
    </div>
  );
}
