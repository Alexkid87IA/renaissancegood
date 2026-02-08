import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Package, Truck, Mail, Shield, Award, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import LocaleLink from '../components/LocaleLink';

interface OrderInfo {
  email: string;
  firstName?: string;
  name: string;
  total: number;
  date: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 },
  }),
};

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return result;
}

function formatDateFR(date: Date): string {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
}

export default function CheckoutConfirmationPage() {
  const { t } = useTranslation('cart');
  const [searchParams] = useSearchParams();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('renaissance_last_order');
    if (savedOrder) {
      try {
        setOrderInfo(JSON.parse(savedOrder));
      } catch {
        // Ignore parse errors
      }
    }
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const paymentIntentId = searchParams.get('payment_intent');
  const orderRef = paymentIntentId ? paymentIntentId.slice(-8).toUpperCase() : null;

  const orderDate = useMemo(() => {
    if (!orderInfo?.date) return new Date();
    return new Date(orderInfo.date);
  }, [orderInfo?.date]);

  const preparationDate = useMemo(() => addBusinessDays(orderDate, 2), [orderDate]);
  const shippingDate = useMemo(() => addBusinessDays(orderDate, 5), [orderDate]);

  const firstName = orderInfo?.firstName || orderInfo?.name?.split(' ')[0] || '';

  const TIMELINE_STEPS = [
    {
      icon: Mail,
      title: t('confirmationPage.step1Title'),
      description: t('confirmationPage.step1Desc'),
      status: 'completed' as const,
      date: t('confirmationPage.estimatedConfirmation'),
    },
    {
      icon: Package,
      title: t('confirmationPage.step2Title'),
      description: t('confirmationPage.step2Desc'),
      status: 'current' as const,
      date: t('confirmationPage.estimatedPreparation', { date: formatDateFR(preparationDate) }),
    },
    {
      icon: Truck,
      title: t('confirmationPage.step3Title'),
      description: t('confirmationPage.step3Desc'),
      status: 'upcoming' as const,
      date: t('confirmationPage.estimatedShipping', { date: formatDateFR(shippingDate) }),
    },
  ];

  // Confetti particles
  const confettiParticles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      angle: (i / 14) * 360,
      distance: 60 + Math.random() * 40,
      size: 4 + Math.random() * 4,
      delay: Math.random() * 0.3,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-beige">
      {/* ==================== HEADER ==================== */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-bronze/15">
        <div className="max-w-[1400px] mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="w-20" />

          <LocaleLink to="/">
            <img
              src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png"
              alt="Renaissance Paris"
              className="h-28 sm:h-32 md:h-36 object-contain"
              loading="eager"
            />
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

          {/* ==================== CELEBRATION — Logo + Confetti ==================== */}
          <div className="relative w-24 h-24 mx-auto mb-10">
            {/* Confetti particles */}
            {confettiParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute left-1/2 top-1/2 rounded-sm bg-bronze"
                style={{
                  width: p.size,
                  height: p.size,
                  marginLeft: -p.size / 2,
                  marginTop: -p.size / 2,
                }}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                  y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                  scale: [0, 1.2, 1, 0.5],
                  rotate: p.rotation,
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.3 + p.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}

            {/* Logo container with spring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
              className="relative w-24 h-24 bg-bronze/10 flex items-center justify-center z-10"
            >
              <img
                src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png"
                alt="Renaissance"
                className="h-8 object-contain"
              />
              {/* Checkmark overlay */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 250, delay: 0.6 }}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-bronze rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </motion.div>
            </motion.div>
          </div>

          {/* ==================== PERSONALIZED GREETING ==================== */}
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
              {firstName
                ? t('confirmationPage.greetingPersonalized', { firstName })
                : t('confirmationPage.greetingDefault')
              }
            </h1>
          </motion.div>

          {/* Emotional subtitle */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeIn}
            className="text-center font-display text-base md:text-lg italic text-dark-text/40 leading-relaxed mb-4"
          >
            {t('confirmationPage.subtitleEmotional')}
          </motion.p>

          {/* Artisanal body */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeIn}
            className="text-center font-sans text-sm text-dark-text/35 leading-relaxed mb-12 md:mb-16 max-w-[480px] mx-auto"
          >
            {t('confirmationPage.bodyArtisanal')}
          </motion.p>

          {/* ==================== LUXURY RECAP CARD ==================== */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeIn}
            className="bg-white border border-dark-text/[0.07] shadow-[0_2px_20px_rgba(0,0,0,0.04)] mb-10 md:mb-14"
          >
            <div className="px-6 md:px-8 py-5 border-b border-dark-text/[0.05]">
              <h2 className="font-sans text-[9px] tracking-[0.3em] text-dark-text/30 uppercase font-medium">
                {t('confirmationPage.summaryTitle')}
              </h2>
            </div>

            {/* Bronze decorative line */}
            <div className="h-px bg-bronze/20" />

            <div className="px-6 md:px-8 py-6 space-y-4">
              {orderRef && (
                <div className="text-center mb-4">
                  <span className="font-sans text-[11px] tracking-[0.1em] text-dark-text/40 uppercase block mb-2">{t('confirmationPage.reference')}</span>
                  <span className="font-display text-xl tracking-[0.15em] text-dark-text">REN-{orderRef}</span>
                </div>
              )}

              {orderInfo && (
                <>
                  <div className="h-px bg-dark-text/[0.05]" />

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
                    <span className="font-display text-3xl font-bold text-dark-text">
                      {orderInfo.total.toFixed(2)}<span className="text-lg ml-0.5">&euro;</span>
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

          {/* ==================== IMPROVED TIMELINE ==================== */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeIn}
            className="mb-12 md:mb-16"
          >
            <h3 className="font-sans text-[9px] tracking-[0.3em] text-dark-text/30 uppercase font-medium mb-8 text-center">
              {t('confirmationPage.nextStepsTitle')}
            </h3>

            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-dark-text/[0.06]" />
              {/* Filled portion of connection line */}
              <motion.div
                className="absolute left-5 top-6 w-px bg-bronze"
                initial={{ height: 0 }}
                animate={{ height: '33%' }}
                transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="space-y-0">
                {TIMELINE_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex items-start gap-5 py-5"
                    >
                      {/* Step indicator */}
                      <div className="relative z-10 flex-shrink-0">
                        {step.status === 'completed' ? (
                          <div className="w-10 h-10 bg-bronze flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                          </div>
                        ) : step.status === 'current' ? (
                          <div className="w-10 h-10 bg-white border-2 border-bronze flex items-center justify-center relative">
                            <motion.div
                              className="w-2.5 h-2.5 rounded-full bg-bronze"
                              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-white border border-dark-text/[0.12] flex items-center justify-center">
                            <Icon className="w-4 h-4 text-dark-text/30" />
                          </div>
                        )}
                      </div>

                      <div className="pt-1 flex-1">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-sans text-sm font-medium text-dark-text mb-1 tracking-wide">
                            {step.title}
                          </h4>
                          <span className="font-sans text-[10px] text-bronze/60">{step.date}</span>
                        </div>
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

          {/* ==================== BRAND EXPERIENCE SECTION ==================== */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={5}
            variants={fadeIn}
            className="mb-12 md:mb-16"
          >
            <p className="font-sans text-[9px] tracking-[0.3em] text-dark-text/25 uppercase font-medium text-center mb-6">
              {t('confirmationPage.experienceTitle')}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Star, label: t('confirmationPage.experienceParisian') },
                { icon: Shield, label: t('confirmationPage.experienceWarranty') },
                { icon: Award, label: t('confirmationPage.experienceCase') },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 border border-dark-text/[0.07]">
                  <div className="w-10 h-10 border border-dark-text/[0.08] flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-bronze/60" />
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.05em] text-dark-text/50 uppercase leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ==================== SEPARATOR ==================== */}
          <div className="w-10 h-px bg-bronze/20 mx-auto mb-10 md:mb-14" />

          {/* ==================== CTAs ==================== */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={6}
            variants={fadeIn}
            className="flex flex-col items-center gap-4"
          >
            <LocaleLink
              to="/shop"
              className="group relative w-full bg-dark-text text-white text-center font-sans text-[10px] tracking-[0.3em] uppercase py-5 overflow-hidden flex items-center justify-center gap-2.5"
            >
              <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="relative z-10">{t('confirmationPage.discoverCollections')}</span>
            </LocaleLink>
            <LocaleLink
              to="/"
              className="font-sans text-[11px] text-dark-text/35 hover:text-dark-text transition-colors tracking-[0.1em] uppercase"
            >
              {t('confirmationPage.backHome')}
            </LocaleLink>
          </motion.div>

          {/* ==================== CONTACT CARD ==================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-14 md:mt-20 bg-white border border-dark-text/[0.07] p-6 text-center"
          >
            <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/25 uppercase font-medium mb-3">
              {t('confirmationPage.contactTitle')}
            </p>
            <a
              href="mailto:contact@renaissance-eyewear.fr"
              className="font-sans text-sm text-bronze/70 hover:text-bronze transition-colors"
            >
              contact@renaissance-eyewear.fr
            </a>
            <p className="font-sans text-[11px] text-dark-text/25 mt-2">
              {t('confirmationPage.contactResponse')}
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
