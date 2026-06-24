import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe, type Appearance } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { Lock, ArrowLeft, AlertCircle, ChevronDown, Shield, Truck, RotateCcw } from 'lucide-react';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import LocaleLink from '../components/LocaleLink';
import { SHIPPING } from '../constants/shipping';
import FloatingInput from '../components/checkout/FloatingInput';
import FloatingSelect from '../components/checkout/FloatingSelect';
import StepProgress from '../components/checkout/StepProgress';
import TrustBar from '../components/checkout/TrustBar';
import SectionHeader from '../components/checkout/SectionHeader';
import StepSummary from '../components/checkout/StepSummary';
import OrderSummary from '../components/checkout/OrderSummary';
import PromoCodeField from '../components/checkout/PromoCodeField';
import ExpressCheckoutSection from '../components/checkout/ExpressCheckoutSection';
import StripePaymentForm from '../components/checkout/StripePaymentForm';
import type { ShippingFormData, FormErrors } from '../components/checkout/types';
import { COUNTRY_CODES } from '../components/checkout/types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const stripeAppearance: Appearance = {
  theme: 'flat',
  variables: {
    colorPrimary: '#1a1a1a',
    colorBackground: '#ffffff',
    colorText: '#1a1a1a',
    colorDanger: '#dc2626',
    fontFamily: '"DM Sans", "Inter", system-ui, sans-serif',
    fontSizeBase: '14px',
    borderRadius: '12px',
    spacingUnit: '4px',
    colorTextPlaceholder: 'rgba(26, 26, 26, 0.3)',
  },
  rules: {
    '.Input': {
      border: '1px solid rgba(26, 26, 26, 0.15)',
      padding: '14px 16px',
      fontSize: '14px',
      transition: 'border-color 0.2s ease',
    },
    '.Input:focus': {
      border: '1px solid #1a1a1a',
      boxShadow: 'none',
    },
    '.Label': {
      fontSize: '10px',
      fontWeight: '500',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'rgba(26, 26, 26, 0.45)',
      marginBottom: '8px',
    },
    '.Tab': {
      border: '1px solid rgba(26, 26, 26, 0.1)',
      backgroundColor: '#ffffff',
    },
    '.Tab--selected': {
      borderColor: '#1a1a1a',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
    },
  },
};

// ========================================
// PAGE CHECKOUT PRINCIPALE
// ========================================

export default function CheckoutPage() {
  const { t } = useTranslation('cart');
  const navigate = useLocalizedNavigate();
  const { cart, isLoading, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [placingFree, setPlacingFree] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [formData, setFormData] = useState<ShippingFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    addressComplement: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: '',
  });

  const cartEdges = cart?.lines.edges;
  const cartLines = useMemo(() => cartEdges || [], [cartEdges]);

  // Rediriger si panier vide
  useEffect(() => {
    if (!isLoading && cartLines.length === 0 && !orderComplete) {
      navigate('/shop');
    }
  }, [cartLines, isLoading, navigate, orderComplete]);

  // Total marchandise AVANT remise = somme des lignes. (Pour une remise "montant
  // sur les produits", Shopify met déjà le prix remisé dans subtotalAmount, donc
  // on ne peut pas s'y fier pour l'affichage ni le seuil de livraison.)
  const subtotal = cart
    ? cart.lines.edges.reduce((s, { node }) => s + parseFloat(node.merchandise.priceV2?.amount || '0') * node.quantity, 0)
    : 0;
  const discountedMerch = cart ? parseFloat(cart.cost.totalAmount.amount) : 0; // après toutes remises
  const discount = Math.max(0, subtotal - discountedMerch);
  const shipping = subtotal >= SHIPPING.FREE_THRESHOLD ? 0 : SHIPPING.STANDARD_RATE;
  const total = discountedMerch + shipping;
  // Commande gratuite : total à 0 (ex. remise = prix) ou sous le minimum Stripe (0,50€).
  const isFreeOrder = total < 0.5;

  const createPaymentIntent = useCallback(async () => {
    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Le montant n'est PAS envoyé par le client : la fonction lit le total
          // faisant autorité (remise comprise) depuis Shopify via ce cartId.
          cartId: cart?.id,
          metadata: {
            source: 'checkout',
            ...(formData.email && { customerEmail: formData.email }),
            ...(formData.firstName && { customerName: `${formData.firstName} ${formData.lastName}` }),
            ...(formData.phone && { customerPhone: formData.phone }),
          },
          cartItems: cartLines.slice(0, 5).map(({ node }) => ({
            id: node.merchandise.product.id,
            title: node.merchandise.product.title,
            quantity: node.quantity,
            price: parseFloat(node.merchandise.priceV2?.amount || '0'),
          })),
          ...(formData.address && {
            shippingAddress: {
              address: formData.address,
              addressComplement: formData.addressComplement,
              city: formData.city,
              postalCode: formData.postalCode,
              country: formData.country,
              countryCode: COUNTRY_CODES[formData.country] || 'FR',
            },
          }),
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setPaymentError(t('checkoutPage.errorPreparePayment'));
        return;
      }
      setClientSecret(data.clientSecret);
    } catch {
      setPaymentError(t('checkoutPage.errorServerConnection'));
    }
  }, [
    cart?.id,
    cartLines,
    formData.address,
    formData.addressComplement,
    formData.city,
    formData.country,
    formData.email,
    formData.firstName,
    formData.lastName,
    formData.postalCode,
    t,
  ]);

  // (Re)créer le PaymentIntent quand le total change (ex. application d'un code
  // promo) : Stripe fige le montant à la création, il faut donc le refaire.
  const intentForTotal = useRef<number>(0);
  useEffect(() => {
    // Commande gratuite : aucun PaymentIntent (Stripe refuse les montants < 0,50€).
    if (isFreeOrder) {
      intentForTotal.current = 0;
      setClientSecret(null);
      return;
    }
    if (total > 0 && intentForTotal.current !== total) {
      intentForTotal.current = total;
      setClientSecret(null);
      void createPaymentIntent();
    }
  }, [isFreeOrder, total, createPaymentIntent]);

  // Validation fusionnée — étape 1 valide contact + adresse
  const validateStep = (step: number): boolean => {
    const errors: FormErrors = {};

    if (step === 1) {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = t('checkoutPage.validationEmailInvalid');
      }
      if (!formData.firstName.trim()) errors.firstName = t('checkoutPage.validationFirstNameRequired');
      if (!formData.lastName.trim()) errors.lastName = t('checkoutPage.validationLastNameRequired');
      if (!formData.address.trim()) errors.address = t('checkoutPage.validationAddressRequired');
      if (!formData.city.trim()) errors.city = t('checkoutPage.validationCityRequired');
      if (!formData.postalCode.trim()) errors.postalCode = t('checkoutPage.validationPostalCodeRequired');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToStep = (step: 1 | 2) => {
    if (step > currentStep) {
      if (!validateStep(currentStep)) return;
    }
    setCurrentStep(step);
    // En passant au paiement, on recrée le PaymentIntent avec les coordonnées
    // désormais remplies (nom/email/téléphone/adresse) pour qu'elles arrivent
    // sur la commande Shopify créée par le webhook.
    if (step === 2 && !isFreeOrder) {
      intentForTotal.current = 0;
      setClientSecret(null);
      void createPaymentIntent();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ShippingFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setOrderComplete(true);
    sessionStorage.setItem('renaissance_last_order', JSON.stringify({
      email: formData.email,
      firstName: formData.firstName,
      name: `${formData.firstName} ${formData.lastName}`,
      total,
      paymentIntentId,
      date: new Date().toISOString(),
    }));
    await clearCart();
    navigate(`/checkout/confirmation?payment_intent=${paymentIntentId}`);
  };

  // Commande gratuite (total à 0) : on finalise sans passer par Stripe.
  const handleFreeOrder = async () => {
    setPlacingFree(true);
    try {
      await handlePaymentSuccess(`free_${Date.now()}`);
    } finally {
      setPlacingFree(false);
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin mx-auto mb-4" />
          <p className="font-sans text-xs tracking-[0.2em] text-dark-text/50 uppercase">{t('checkoutPage.loading')}</p>
        </div>
      </div>
    );
  }

  const stripeOptions = clientSecret ? { clientSecret, appearance: stripeAppearance } : undefined;

  return (
    <div className="min-h-screen bg-beige">
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-50 bg-transparent">
        <div className="max-w-[1400px] mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <LocaleLink to="/cart" className="flex items-center gap-2 text-dark-text/40 hover:text-dark-text transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-xs tracking-[0.1em] hidden sm:inline">{t('checkoutPage.backToCart')}</span>
          </LocaleLink>

          <LocaleLink to="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png"
              alt="Renaissance Eyewear"
              className="h-28 sm:h-32 md:h-36 object-contain"
              loading="eager"
            />
          </LocaleLink>

          <div className="flex items-center gap-1.5 bg-bronze/[0.06] px-3 py-1.5 border border-bronze/10 rounded-full">
            <Lock className="w-3 h-3 text-bronze/60" />
            <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-dark-text/50 hidden sm:inline">
              {t('checkoutPage.sslSecure')}
            </span>
            <Lock className="w-3 h-3 text-bronze/60 sm:hidden" />
          </div>
        </div>
      </header>

      <main className="pt-10 md:pt-14 pb-16 md:pb-24">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* ==================== TITRE ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8 md:mb-10"
          >
            <p className="font-sans text-[9px] tracking-[0.35em] text-dark-text/30 uppercase mb-3 font-medium">
              {t('checkoutPage.finalizeLabel')}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-dark-text tracking-[-0.02em]">
              {t('checkoutPage.titleCheckout')}
            </h1>
          </motion.div>

          {/* ==================== PROGRESSION ==================== */}
          <StepProgress currentStep={currentStep} />

          {/* ==================== RÉSUMÉ MOBILE (accordéon) ==================== */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => setSummaryOpen(!summaryOpen)}
              className="w-full bg-white border border-dark-text/[0.07] p-4 flex items-center justify-between rounded-t-2xl"
            >
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-dark-text/60">
                {t('checkoutPage.yourOrder')} ({t('checkoutPage.articles', { count: cartLines.length })})
              </span>
              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-bold text-dark-text">{total.toFixed(2)}&euro;</span>
                <ChevronDown className={`w-4 h-4 text-dark-text/40 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            <AnimatePresence>
              {summaryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <OrderSummary cartLines={cartLines} subtotal={subtotal} shipping={shipping} total={total} discount={discount} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ==================== GRID PRINCIPAL ==================== */}
          <div className="grid lg:grid-cols-[1fr,400px] gap-10 lg:gap-14">

            {/* COLONNE GAUCHE — Formulaire en étapes */}
            <div>
                {/* ===== ÉTAPE 1 : INFORMATION + LIVRAISON ===== */}
                <div className={currentStep === 1 ? '' : 'hidden'}>
                    {/* Réassurance (paiement sécurisé / chiffré / livraison) — au-dessus du code promo */}
                    <div className="mb-6">
                      <TrustBar />
                    </div>
                    {/* Code promo — avant le paiement express, pour appliquer la remise d'abord */}
                    <div className="bg-white border border-dark-text/[0.07] p-6 mb-6 rounded-2xl">
                      <PromoCodeField />
                    </div>
                    {/* Express Checkout Panel */}
                    {clientSecret && stripeOptions && (
                      <>
                        <div className="bg-white border border-dark-text/[0.07] p-6 md:p-8 rounded-2xl">
                          <div className="mb-5">
                            <h2 className="font-display text-lg font-medium text-dark-text mb-1">
                              {t('checkoutPage.expressHeadline')}
                            </h2>
                            <p className="font-sans text-[12px] text-dark-text/[0.35]">{t('checkoutPage.expressMicrocopy')}</p>
                          </div>
                          <Elements stripe={stripePromise} options={stripeOptions} key={`express-step1-${clientSecret}`}>
                            <ExpressCheckoutSection
                              total={total}
                              onSuccess={handlePaymentSuccess}
                              onError={(e) => setPaymentError(e)}
                            />
                          </Elements>
                        </div>
                        {/* OU — entre le paiement express et le formulaire */}
                        <div className="flex items-center gap-4 mt-6">
                          <div className="flex-1 h-px bg-dark-text/[0.07]" />
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-px bg-bronze/30" />
                            <span className="font-sans text-[10px] tracking-[0.25em] text-dark-text/25 uppercase">{t('checkoutPage.orDivider')}</span>
                            <div className="w-4 h-px bg-bronze/30" />
                          </div>
                          <div className="flex-1 h-px bg-dark-text/[0.07]" />
                        </div>
                      </>
                    )}

                    <div className="bg-white border border-dark-text/[0.07] p-6 md:p-8 rounded-2xl mt-6">
                      {/* Contact */}
                      <SectionHeader>{t('checkoutPage.yourCoordinates')}</SectionHeader>
                      <div className="space-y-5">
                        <FloatingInput
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          label={t('checkoutPage.emailPlaceholder')}
                          error={formErrors.email}
                        />
                        <FloatingInput
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          label={t('checkoutPage.phonePlaceholder')}
                          error={formErrors.phone}
                        />
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-dark-text/[0.07] my-8" />

                      {/* Shipping Address */}
                      <SectionHeader>{t('checkoutPage.shippingAddress')}</SectionHeader>
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <FloatingInput
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            label={t('checkoutPage.firstNamePlaceholder')}
                            error={formErrors.firstName}
                          />
                          <FloatingInput
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            label={t('checkoutPage.lastNamePlaceholder')}
                            error={formErrors.lastName}
                          />
                        </div>
                        <FloatingInput
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          label={t('checkoutPage.addressPlaceholder')}
                          error={formErrors.address}
                        />
                        <FloatingInput
                          name="addressComplement"
                          value={formData.addressComplement}
                          onChange={handleInputChange}
                          label={t('checkoutPage.addressComplementPlaceholder')}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FloatingInput
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            label={t('checkoutPage.postalCodePlaceholder')}
                            error={formErrors.postalCode}
                          />
                          <FloatingInput
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            label={t('checkoutPage.cityPlaceholder')}
                            error={formErrors.city}
                          />
                        </div>
                        <FloatingSelect
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          label="Pays"
                          options={[
                            { value: 'France', label: 'France' },
                            { value: 'Belgique', label: 'Belgique' },
                            { value: 'Suisse', label: 'Suisse' },
                            { value: 'Luxembourg', label: 'Luxembourg' },
                          ]}
                        />
                      </div>

                      {/* CTA with bronze sweep */}
                      <button
                        onClick={() => goToStep(2)}
                        className="group relative w-full mt-8 bg-dark-text text-white py-5 font-sans text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden transition-all duration-300 rounded-2xl"
                      >
                        <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <span className="relative z-10">{t('checkoutPage.continueToPayment')}</span>
                      </button>

                      {/* Trust bar under continue button */}
                      <TrustBar />
                    </div>
                </div>

                {/* ===== ÉTAPE 2 : PAIEMENT ===== */}
                <div className={currentStep === 2 ? '' : 'hidden'}>
                    {/* Résumés des infos précédentes */}
                    <StepSummary
                      label={t('checkoutPage.contact')}
                      value={`${formData.email}${formData.phone ? ` · ${formData.phone}` : ''}`}
                      onEdit={() => setCurrentStep(1)}
                    />
                    <StepSummary
                      label={t('checkoutPage.delivery')}
                      value={`${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.postalCode} ${formData.city}`}
                      onEdit={() => setCurrentStep(1)}
                    />

                    {/* Code promo — toujours visible à l'étape paiement */}
                    <div className="bg-white border border-dark-text/[0.07] p-6 mt-4 rounded-2xl">
                      <PromoCodeField />
                    </div>

                    <div className="bg-white border border-dark-text/[0.07] p-6 md:p-8 rounded-2xl mt-4">
                      <SectionHeader>{t('checkoutPage.securePaymentTitle')}</SectionHeader>

                      {isFreeOrder ? (
                        <div className="text-center py-8">
                          <p className="font-display text-lg text-dark-text mb-1">Commande offerte</p>
                          <p className="font-sans text-xs text-dark-text/50 mb-6">
                            Aucun paiement requis pour ce panier. Confirmez pour valider votre commande.
                          </p>
                          <button
                            type="button"
                            onClick={() => void handleFreeOrder()}
                            disabled={placingFree}
                            className="w-full bg-dark-text text-white font-sans text-xs tracking-[0.15em] uppercase py-4 disabled:opacity-50 transition-opacity rounded-2xl"
                          >
                            {placingFree ? '...' : 'Confirmer la commande'}
                          </button>
                        </div>
                      ) : clientSecret && stripeOptions ? (
                        <Elements stripe={stripePromise} options={stripeOptions}>
                          <StripePaymentForm
                            formData={formData}
                            total={total}
                            onSuccess={handlePaymentSuccess}
                            onError={(e) => setPaymentError(e)}
                          />
                        </Elements>
                      ) : paymentError ? (
                        <div className="text-center py-10">
                          <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-3" />
                          <p className="font-sans text-sm text-red-600 mb-4">{paymentError}</p>
                          <button
                            onClick={createPaymentIntent}
                            className="font-sans text-xs text-dark-text/50 hover:text-dark-text underline transition-colors"
                          >
                            {t('checkoutPage.retry')}
                          </button>
                        </div>
                      ) : (
                        <div className="py-14 flex flex-col items-center justify-center">
                          <div className="w-6 h-6 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin mb-3" />
                          <p className="font-sans text-xs text-dark-text/40">{t('checkoutPage.preparingPayment')}</p>
                        </div>
                      )}
                    </div>

                    {/* Retour */}
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="mt-4 flex items-center gap-2 text-dark-text/[0.35] hover:text-dark-text transition-colors font-sans text-xs"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      {t('checkoutPage.editInfo')}
                    </button>
                </div>

              {/* ===== MENTIONS LÉGALES ===== */}
              <p className="mt-8 font-sans text-[11px] text-dark-text/25 leading-relaxed text-center">
                {t('checkoutPage.legalAcceptCgv')}{' '}
                <LocaleLink to="/cgv" className="underline hover:text-dark-text/40">{t('checkoutPage.cgv')}</LocaleLink>
                {' '}{t('checkoutPage.legalAnd')}{' '}
                <LocaleLink to="/confidentialite" className="underline hover:text-dark-text/40">{t('checkoutPage.privacyPolicy')}</LocaleLink>.
              </p>
            </div>

            {/* COLONNE DROITE — Récapitulatif (desktop) */}
            <div className="hidden lg:block">
              <div className="lg:sticky lg:top-24">
                <OrderSummary cartLines={cartLines} subtotal={subtotal} shipping={shipping} total={total} discount={discount} />

                {/* Garanties */}
                <div className="mt-4 bg-white border border-dark-text/[0.07] p-6 rounded-2xl">
                  <div className="space-y-4">
                    {[
                      { Icon: Truck, label: t('checkoutPage.expressDelivery'), desc: t('checkoutPage.expressDeliveryDesc') },
                      { Icon: Shield, label: t('checkoutPage.warranty2years'), desc: t('checkoutPage.warranty2yearsDesc') },
                      { Icon: RotateCcw, label: t('checkoutPage.freeReturns'), desc: t('checkoutPage.freeReturnsDesc') },
                    ].map(({ Icon, label, desc }) => (
                      <div key={label} className="flex items-center gap-4">
                        <div className="w-9 h-9 border border-dark-text/[0.07] flex items-center justify-center flex-shrink-0 rounded-xl">
                          <Icon className="w-4 h-4 text-bronze/60" />
                        </div>
                        <div>
                          <p className="font-sans text-xs text-dark-text font-medium">{label}</p>
                          <p className="font-sans text-[11px] text-dark-text/[0.35]">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Retour panier */}
                <LocaleLink
                  to="/cart"
                  className="mt-4 flex items-center justify-center gap-2 text-dark-text/30 hover:text-dark-text transition-colors font-sans text-xs py-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t('checkoutPage.editCart')}
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ==================== MOBILE BOTTOM BAR — Step 1 only ==================== */}
      {currentStep === 1 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-dark-text/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex-shrink-0">
              <p className="font-sans text-[8px] tracking-[0.1em] text-dark-text/40 uppercase">Total</p>
              <p className="font-display text-lg font-bold text-dark-text">{total.toFixed(2)}&euro;</p>
            </div>
            <button
              onClick={() => goToStep(2)}
              className="group relative flex-1 flex items-center justify-center gap-1.5 bg-dark-text text-white py-3.5 px-4 text-center font-sans text-[9px] tracking-[0.15em] font-bold uppercase overflow-hidden transition-colors duration-200 rounded-xl"
            >
              <span className="absolute inset-0 bg-bronze transform scale-x-0 group-active:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="relative z-10">{t('checkoutPage.continueToPayment')}</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
