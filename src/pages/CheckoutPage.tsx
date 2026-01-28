import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe, type Appearance } from '@stripe/stripe-js';
import { Elements, PaymentElement, ExpressCheckoutElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { Lock, ArrowLeft, AlertCircle, ChevronDown, Check, Shield, Truck, RotateCcw } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const COUNTRY_CODES: Record<string, string> = {
  'France': 'FR',
  'Belgique': 'BE',
  'Suisse': 'CH',
  'Luxembourg': 'LU',
};

interface ShippingFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  addressComplement: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

type FormErrors = Partial<Record<keyof ShippingFormData, string>>;

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const stripeAppearance: Appearance = {
  theme: 'flat',
  variables: {
    colorPrimary: '#1a1a1a',
    colorBackground: '#ffffff',
    colorText: '#1a1a1a',
    colorDanger: '#dc2626',
    fontFamily: '"DM Sans", "Inter", system-ui, sans-serif',
    fontSizeBase: '14px',
    borderRadius: '0px',
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
// EXPRESS CHECKOUT (Apple Pay / Google Pay)
// ========================================

function ExpressCheckoutSection({
  total,
  onSuccess,
  onError,
}: {
  total: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}) {
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
        onError(error.message || 'Erreur de paiement express');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inattendue';
      onError(message);
    }
  };

  if (hasExpressMethods === false) return null;

  return (
    <div className={hasExpressMethods === null ? 'min-h-[60px]' : ''}>
      <div className={hasExpressMethods === null ? 'opacity-0 h-0 overflow-hidden' : ''}>
        <p className="font-sans text-[10px] tracking-[0.25em] text-dark-text/40 uppercase font-medium mb-4">
          Paiement express
        </p>
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
            const shippingFree = total >= 500;
            resolve({
              emailRequired: true,
              phoneNumberRequired: true,
              shippingAddressRequired: true,
              allowedShippingCountries: ['FR', 'BE', 'CH', 'LU'],
              shippingRates: shippingFree
                ? [{ id: 'free', displayName: 'Livraison Express Offerte', amount: 0 }]
                : [{ id: 'standard', displayName: 'Livraison Express 48h', amount: 1500 }],
            });
          }}
          options={{
            buttonType: {
              applePay: 'buy',
              googlePay: 'buy',
            },
            buttonTheme: {
              applePay: 'black',
              googlePay: 'black',
            },
            layout: {
              maxColumns: 2,
              maxRows: 1,
            },
          }}
        />

        {/* Divider "OU" */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-dark-text/[0.07]" />
          <span className="font-sans text-[10px] tracking-[0.25em] text-dark-text/25 uppercase">ou</span>
          <div className="flex-1 h-px bg-dark-text/[0.07]" />
        </div>
      </div>
    </div>
  );
}

// ========================================
// COMPOSANT PAIEMENT STRIPE
// ========================================

function StripePaymentForm({
  formData,
  total,
  onSuccess,
  onError,
}: {
  formData: ShippingFormData;
  total: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}) {
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
        setPaymentError(error.message || 'Une erreur est survenue');
        onError(error.message || 'Erreur de paiement');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      } else if (paymentIntent) {
        setPaymentError('Le paiement nécessite une action supplémentaire.');
        onError('Action supplémentaire requise');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inattendue';
      console.error('Payment error:', err);
      setPaymentError(message);
      onError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {/* EXPRESS CHECKOUT */}
      <ExpressCheckoutSection
        total={total}
        onSuccess={onSuccess}
        onError={onError}
      />

      {/* CARD PAYMENT */}
      <form onSubmit={handleSubmit}>
        <p className="font-sans text-[10px] tracking-[0.25em] text-dark-text/40 uppercase font-medium mb-4">
          Paiement par carte
        </p>

        <div className={isReady ? '' : 'min-h-[200px] flex items-center justify-center'}>
          {!isReady && (
            <div className="text-center">
              <div className="w-5 h-5 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin mx-auto mb-2" />
              <p className="font-sans text-[11px] text-dark-text/30">Chargement du formulaire de paiement...</p>
            </div>
          )}
          <div className={isReady ? '' : 'sr-only'}>
            <PaymentElement
              onReady={() => setIsReady(true)}
              onLoadError={(e) => {
                console.error('PaymentElement load error:', e);
                setPaymentError(`Erreur de chargement: ${e.error?.message || 'Vérifiez votre connexion.'}`);
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

        <button
          type="submit"
          disabled={!stripe || !isReady || isProcessing}
          className="w-full mt-8 bg-dark-text text-white py-5 font-sans text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-bronze transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Traitement en cours...</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5" />
              <span>Confirmer et payer {total.toFixed(2)}&euro;</span>
            </>
          )}
        </button>

        {/* Payment method icons */}
        <div className="flex items-center justify-center gap-2.5 mt-5">
          <span className="font-sans text-[9px] tracking-[0.1em] text-dark-text/20 uppercase mr-1">
            Moyens accept&eacute;s
          </span>
          {['VISA', 'MC', 'CB', 'AMEX'].map((brand) => (
            <div key={brand} className="w-8 h-5 border border-dark-text/[0.07] rounded-sm flex items-center justify-center bg-white">
              <span className="font-sans text-[7px] font-bold text-dark-text/50">{brand}</span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

// ========================================
// BARRE DE PROGRESSION (2 étapes)
// ========================================

function StepProgress({ currentStep }: { currentStep: 1 | 2 }) {
  const steps = [
    { num: 1, label: 'Information' },
    { num: 2, label: 'Paiement' },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-10 md:mb-14">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                step.num < currentStep
                  ? 'bg-dark-text'
                  : step.num === currentStep
                  ? 'bg-dark-text'
                  : 'border border-dark-text/20'
              }`}
            >
              {step.num < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Check className="w-3.5 h-3.5 text-white" />
                </motion.div>
              ) : (
                <span
                  className={`font-sans text-[11px] font-medium ${
                    step.num === currentStep ? 'text-white' : 'text-dark-text/30'
                  }`}
                >
                  {step.num}
                </span>
              )}
            </div>
            <span
              className={`font-sans text-[9px] tracking-[0.15em] uppercase mt-2 transition-colors duration-300 ${
                step.num <= currentStep ? 'text-dark-text' : 'text-dark-text/30'
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className="w-24 sm:w-32 md:w-40 h-px mx-4 sm:mx-5 relative -mt-5">
              <div className="absolute inset-0 bg-dark-text/10" />
              <motion.div
                className="absolute inset-y-0 left-0 bg-dark-text"
                initial={false}
                animate={{ width: step.num < currentStep ? '100%' : '0%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ========================================
// PAGE CHECKOUT PRINCIPALE
// ========================================

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, isLoading, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);
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

  const cartLines = cart?.lines.edges || [];

  // Rediriger si panier vide
  useEffect(() => {
    if (!isLoading && cartLines.length === 0 && !orderComplete) {
      navigate('/shop');
    }
  }, [cartLines, isLoading, navigate, orderComplete]);

  // Calculs
  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const shipping = subtotal >= 500 ? 0 : 15;
  const total = subtotal + shipping;

  // Créer le PaymentIntent à l'étape 2
  useEffect(() => {
    if (currentStep === 2 && !clientSecret && total > 0) {
      createPaymentIntent();
    }
  }, [currentStep, clientSecret, total]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: 'eur',
          metadata: {
            source: 'checkout',
            customerEmail: formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`,
          },
          cartItems: cartLines.slice(0, 5).map(({ node }) => ({
            id: node.merchandise.product.id,
            title: node.merchandise.product.title,
            quantity: node.quantity,
            price: parseFloat(node.merchandise.priceV2?.amount || '0'),
          })),
          shippingAddress: {
            address: formData.address,
            addressComplement: formData.addressComplement,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
            countryCode: COUNTRY_CODES[formData.country] || 'FR',
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setPaymentError('Impossible de préparer le paiement.');
        return;
      }
      setClientSecret(data.clientSecret);
    } catch {
      setPaymentError('Erreur de connexion au serveur de paiement.');
    }
  };

  // Validation fusionnée — étape 1 valide contact + adresse
  const validateStep = (step: number): boolean => {
    const errors: FormErrors = {};

    if (step === 1) {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Adresse email invalide';
      }
      if (!formData.firstName.trim()) errors.firstName = 'Prénom requis';
      if (!formData.lastName.trim()) errors.lastName = 'Nom requis';
      if (!formData.address.trim()) errors.address = 'Adresse requise';
      if (!formData.city.trim()) errors.city = 'Ville requise';
      if (!formData.postalCode.trim()) errors.postalCode = 'Code postal requis';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToStep = (step: 1 | 2) => {
    if (step > currentStep) {
      if (!validateStep(currentStep)) return;
    }
    setCurrentStep(step);
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
    localStorage.setItem('renaissance_last_order', JSON.stringify({
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      total,
      paymentIntentId,
      date: new Date().toISOString(),
    }));
    await clearCart();
    navigate(`/checkout/confirmation?payment_intent=${paymentIntentId}`);
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin mx-auto mb-4" />
          <p className="font-sans text-xs tracking-[0.2em] text-dark-text/50 uppercase">Chargement</p>
        </div>
      </div>
    );
  }

  const stripeOptions = clientSecret ? { clientSecret, appearance: stripeAppearance } : undefined;

  return (
    <div className="min-h-screen bg-beige">
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-dark-text/[0.07]">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/cart" className="flex items-center gap-2 text-dark-text/40 hover:text-dark-text transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-xs tracking-[0.1em] hidden sm:inline">Panier</span>
          </Link>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png"
              alt="Renaissance Paris"
              className="h-6 md:h-7 object-contain"
            />
          </Link>

          <div className="flex items-center gap-1.5 text-dark-text/30">
            <Lock className="w-3 h-3" />
            <span className="font-sans text-[9px] tracking-[0.15em] uppercase hidden sm:inline">
              Paiement sécurisé
            </span>
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
              Finaliser votre commande
            </p>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-dark-text tracking-[-0.02em]">
              CHECKOUT
            </h1>
          </motion.div>

          {/* ==================== PROGRESSION ==================== */}
          <StepProgress currentStep={currentStep} />

          {/* ==================== RÉSUMÉ MOBILE (accordéon) ==================== */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => setSummaryOpen(!summaryOpen)}
              className="w-full bg-white border border-dark-text/[0.07] p-4 flex items-center justify-between"
            >
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-dark-text/60">
                Votre commande ({cartLines.length} {cartLines.length > 1 ? 'articles' : 'article'})
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
                  <OrderSummary cartLines={cartLines} subtotal={subtotal} shipping={shipping} total={total} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ==================== GRID PRINCIPAL ==================== */}
          <div className="grid lg:grid-cols-[1fr,400px] gap-10 lg:gap-14">

            {/* COLONNE GAUCHE — Formulaire en étapes */}
            <div>
              <AnimatePresence mode="wait">
                {/* ===== ÉTAPE 1 : INFORMATION + LIVRAISON ===== */}
                {currentStep === 1 && (
                  <motion.div key="step1" variants={fadeIn} initial="hidden" animate="visible" exit="exit">
                    <div className="bg-white border border-dark-text/[0.07] p-6 md:p-8">
                      {/* Contact */}
                      <h2 className="font-sans text-[10px] tracking-[0.25em] text-dark-text/40 uppercase font-medium mb-6">
                        Vos coordonnées
                      </h2>
                      <div className="space-y-4">
                        <InputField
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Adresse email *"
                          error={formErrors.email}
                        />
                        <InputField
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Téléphone (pour la livraison)"
                          error={formErrors.phone}
                        />
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-dark-text/[0.07] my-8" />

                      {/* Shipping Address */}
                      <h2 className="font-sans text-[10px] tracking-[0.25em] text-dark-text/40 uppercase font-medium mb-6">
                        Adresse de livraison
                      </h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Prénom *"
                            error={formErrors.firstName}
                          />
                          <InputField
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Nom *"
                            error={formErrors.lastName}
                          />
                        </div>
                        <InputField
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Adresse *"
                          error={formErrors.address}
                        />
                        <InputField
                          name="addressComplement"
                          value={formData.addressComplement}
                          onChange={handleInputChange}
                          placeholder="Complément d'adresse (optionnel)"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="Code postal *"
                            error={formErrors.postalCode}
                          />
                          <InputField
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Ville *"
                            error={formErrors.city}
                          />
                        </div>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm font-sans bg-white text-dark-text"
                        >
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Luxembourg">Luxembourg</option>
                        </select>
                      </div>

                      <button
                        onClick={() => goToStep(2)}
                        className="w-full mt-8 bg-dark-text text-white py-5 font-sans text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-bronze transition-all duration-300"
                      >
                        Continuer vers le paiement
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ===== ÉTAPE 2 : PAIEMENT ===== */}
                {currentStep === 2 && (
                  <motion.div key="step2" variants={fadeIn} initial="hidden" animate="visible" exit="exit">
                    {/* Résumés des infos précédentes */}
                    <StepSummary
                      label="Contact"
                      value={`${formData.email}${formData.phone ? ` · ${formData.phone}` : ''}`}
                      onEdit={() => setCurrentStep(1)}
                    />
                    <StepSummary
                      label="Livraison"
                      value={`${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.postalCode} ${formData.city}`}
                      onEdit={() => setCurrentStep(1)}
                    />

                    <div className="bg-white border border-dark-text/[0.07] p-6 md:p-8 mt-4">
                      <h2 className="font-sans text-[10px] tracking-[0.25em] text-dark-text/40 uppercase font-medium mb-6">
                        Paiement sécurisé
                      </h2>

                      {clientSecret && stripeOptions ? (
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
                            Réessayer
                          </button>
                        </div>
                      ) : (
                        <div className="py-14 flex flex-col items-center justify-center">
                          <div className="w-6 h-6 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin mb-3" />
                          <p className="font-sans text-xs text-dark-text/40">Préparation du paiement...</p>
                        </div>
                      )}
                    </div>

                    {/* Retour */}
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="mt-4 flex items-center gap-2 text-dark-text/35 hover:text-dark-text transition-colors font-sans text-xs"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Modifier mes informations
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ===== MENTIONS LÉGALES ===== */}
              <p className="mt-8 font-sans text-[11px] text-dark-text/25 leading-relaxed text-center">
                En passant commande, vous acceptez nos{' '}
                <Link to="/cgv" className="underline hover:text-dark-text/40">CGV</Link>
                {' '}et notre{' '}
                <Link to="/confidentialite" className="underline hover:text-dark-text/40">politique de confidentialité</Link>.
              </p>
            </div>

            {/* COLONNE DROITE — Récapitulatif (desktop) */}
            <div className="hidden lg:block">
              <div className="lg:sticky lg:top-24">
                <OrderSummary cartLines={cartLines} subtotal={subtotal} shipping={shipping} total={total} />

                {/* Garanties */}
                <div className="mt-4 bg-white border border-dark-text/[0.07] p-6">
                  <div className="space-y-4">
                    {[
                      { Icon: Truck, label: 'Livraison Express', desc: 'Sous 48h dans toute la France' },
                      { Icon: Shield, label: 'Garantie 2 ans', desc: 'Fabrication artisanale certifiée' },
                      { Icon: RotateCcw, label: 'Retours gratuits', desc: '30 jours pour changer d\'avis' },
                    ].map(({ Icon, label, desc }) => (
                      <div key={label} className="flex items-center gap-4">
                        <div className="w-9 h-9 border border-dark-text/[0.07] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-bronze/60" />
                        </div>
                        <div>
                          <p className="font-sans text-xs text-dark-text font-medium">{label}</p>
                          <p className="font-sans text-[11px] text-dark-text/35">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Retour panier */}
                <Link
                  to="/cart"
                  className="mt-4 flex items-center justify-center gap-2 text-dark-text/30 hover:text-dark-text transition-colors font-sans text-xs py-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Modifier mon panier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ========================================
// COMPOSANTS UTILITAIRES
// ========================================

function InputField({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
}: {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3.5 border focus:outline-none transition-colors text-sm font-sans placeholder:text-dark-text/30 ${
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-dark-text/15 focus:border-dark-text'
        }`}
      />
      {error && (
        <p className="font-sans text-[11px] text-red-500 mt-1.5">{error}</p>
      )}
    </div>
  );
}

function StepSummary({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
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
        Modifier
      </button>
    </div>
  );
}

function OrderSummary({
  cartLines,
  subtotal,
  shipping,
  total,
}: {
  cartLines: Array<{ node: { id: string; quantity: number; merchandise: { priceV2: { amount: string }; title: string; product: { title: string; images: { edges: Array<{ node: { url: string } }> } } } } }>;
  subtotal: number;
  shipping: number;
  total: number;
}) {
  return (
    <div className="bg-white border border-dark-text/[0.07] p-6">
      <h2 className="font-sans text-[10px] tracking-[0.25em] text-dark-text/40 uppercase font-medium mb-6">
        Votre commande
      </h2>

      {/* Produits */}
      <div className="space-y-5 mb-6">
        {cartLines.map(({ node }) => {
          const price = parseFloat(node.merchandise.priceV2?.amount || '0');
          const itemTotal = price * node.quantity;
          const image = node.merchandise.product.images.edges[0]?.node.url;

          return (
            <div key={node.id} className="flex gap-4">
              <div className="w-20 h-20 bg-[#f5f5f3] border border-dark-text/[0.05] flex-shrink-0 relative overflow-hidden">
                {image && (
                  <img
                    src={image}
                    alt={node.merchandise.product.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {node.quantity > 1 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-dark-text text-white rounded-full flex items-center justify-center">
                    <span className="font-sans text-[9px] font-bold">{node.quantity}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="font-sans text-sm text-dark-text truncate">
                  {node.merchandise.product.title}
                </p>
                {node.merchandise.title !== 'Default Title' && (
                  <p className="font-sans text-[11px] text-dark-text/35 mt-0.5">{node.merchandise.title}</p>
                )}
                <p className="font-sans text-sm text-dark-text mt-1.5 font-medium">{itemTotal.toFixed(2)}&euro;</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totaux */}
      <div className="border-t border-dark-text/[0.07] pt-5 space-y-2.5">
        <div className="flex justify-between">
          <span className="font-sans text-sm text-dark-text/45">Sous-total</span>
          <span className="font-sans text-sm text-dark-text">{subtotal.toFixed(2)}&euro;</span>
        </div>
        <div className="flex justify-between">
          <span className="font-sans text-sm text-dark-text/45">Livraison</span>
          <span className="font-sans text-sm text-dark-text">
            {shipping === 0 ? (
              <span className="text-green-700">Offerte</span>
            ) : (
              `${shipping.toFixed(2)}€`
            )}
          </span>
        </div>
      </div>

      <div className="border-t border-dark-text/[0.07] mt-4 pt-4">
        <div className="flex justify-between items-baseline">
          <span className="font-sans text-[10px] tracking-[0.2em] text-dark-text/50 uppercase">Total</span>
          <span className="font-display text-2xl font-bold text-dark-text">{total.toFixed(2)}&euro;</span>
        </div>
      </div>
    </div>
  );
}
