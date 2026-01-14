import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';
import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

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

function StripePaymentForm({
  formData,
  total,
  onSuccess,
  onError
}: {
  formData: ShippingFormData;
  total: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/confirmation`,
          receipt_email: formData.email,
          shipping: {
            name: `${formData.firstName} ${formData.lastName}`,
            address: {
              line1: formData.address,
              line2: formData.addressComplement || undefined,
              city: formData.city,
              postal_code: formData.postalCode,
              country: formData.country === 'France' ? 'FR' : 'FR',
            },
            phone: formData.phone,
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        setPaymentError(error.message || 'Une erreur est survenue');
        onError(error.message || 'Erreur de paiement');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch {
      setPaymentError('Une erreur inattendue est survenue');
      onError('Erreur inattendue');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
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
                country: 'FR',
              },
            },
          },
        }}
      />

      {paymentError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 p-4 bg-red-50 text-red-700 mt-6"
        >
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{paymentError}</p>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={!stripe || isProcessing}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full mt-8 bg-dark-text text-white py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark-text/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Traitement en cours...</span>
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>Confirmer et payer {total.toFixed(2)}€</span>
          </>
        )}
      </motion.button>
    </form>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, isLoading } = useCart();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState<ShippingFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    addressComplement: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: ''
  });

  const cartLines = cart?.lines.edges || [];

  useEffect(() => {
    if (!isLoading && cartLines.length === 0 && !orderComplete) {
      navigate('/shop');
    }
  }, [cartLines, isLoading, navigate, orderComplete]);

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const freeShippingThreshold = 500;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 15;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!clientSecret && subtotal > 0) {
      createPaymentIntent();
    }
  }, [clientSecret, subtotal]);

  const createPaymentIntent = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: Math.round(total * 100),
          currency: 'eur',
          metadata: { source: 'checkout' },
          cartItems: cartLines.map(({ node }) => ({
            id: node.merchandise.product.id,
            title: node.merchandise.product.title,
            quantity: node.quantity,
            price: parseFloat(node.merchandise.priceV2?.amount || '0'),
          })),
        },
      });

      if (error) {
        setPaymentError('Impossible de préparer le paiement.');
        return;
      }
      setClientSecret(data.clientSecret);
    } catch {
      setPaymentError('Erreur de connexion.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = () => {
    setOrderComplete(true);
    localStorage.setItem('renaissance_last_order', JSON.stringify({
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      total,
      date: new Date().toISOString(),
    }));
    navigate('/checkout/confirmation');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin" />
      </div>
    );
  }

  const stripeOptions = clientSecret ? {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#1a1a1a',
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '0px',
      },
    },
  } : undefined;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header fixe */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-dark-text/5">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-dark-text/50 hover:text-dark-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Panier</span>
          </Link>

          <Link to="/" className="font-display text-lg tracking-[0.2em] text-dark-text">
            RENAISSANCE
          </Link>

          <div className="w-20" />
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Titre */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-dark-text mb-2">
              Finaliser ma commande
            </h1>
            <p className="text-dark-text/40 text-sm">
              Livraison offerte à partir de 500€
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr,420px] gap-12 lg:gap-16">
            {/* Colonne gauche - Formulaire */}
            <div className="order-2 lg:order-1">
              {/* Express Checkout */}
              <div className="bg-white p-6 mb-6">
                <p className="text-[10px] text-dark-text/40 uppercase tracking-[0.2em] mb-4">
                  Paiement express
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-black text-white py-3.5 flex items-center justify-center gap-2 hover:bg-black/90 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="text-xs font-medium">Pay</span>
                  </button>
                  <button className="flex-1 bg-white border border-dark-text/15 py-3.5 flex items-center justify-center gap-2 hover:border-dark-text/30 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-xs font-medium">Pay</span>
                  </button>
                  <button className="flex-1 bg-[#0070BA] py-3.5 flex items-center justify-center hover:bg-[#005ea6] transition-colors">
                    <span className="text-white text-xs font-bold tracking-wide">Pay<span className="text-[#00457C]">Pal</span></span>
                  </button>
                </div>
              </div>

              {/* Séparateur */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-dark-text/10" />
                <span className="text-[10px] text-dark-text/30 uppercase tracking-wider">ou continuer ci-dessous</span>
                <div className="flex-1 h-px bg-dark-text/10" />
              </div>

              {/* Contact */}
              <div className="bg-white p-6 mb-4">
                <h2 className="text-xs text-dark-text uppercase tracking-[0.15em] font-medium mb-5">
                  Contact
                </h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Adresse email"
                    required
                    className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm placeholder:text-dark-text/30"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Téléphone (pour la livraison)"
                    className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm placeholder:text-dark-text/30"
                  />
                </div>
              </div>

              {/* Livraison */}
              <div className="bg-white p-6 mb-4">
                <h2 className="text-xs text-dark-text uppercase tracking-[0.15em] font-medium mb-5">
                  Adresse de livraison
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Prénom"
                      required
                      className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm placeholder:text-dark-text/30"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Nom"
                      required
                      className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm placeholder:text-dark-text/30"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Adresse"
                    required
                    className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm placeholder:text-dark-text/30"
                  />
                  <input
                    type="text"
                    name="addressComplement"
                    value={formData.addressComplement}
                    onChange={handleInputChange}
                    placeholder="Complément d'adresse (optionnel)"
                    className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm placeholder:text-dark-text/30"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Code postal"
                      required
                      className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm placeholder:text-dark-text/30"
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Ville"
                      required
                      className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm placeholder:text-dark-text/30"
                    />
                  </div>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 border border-dark-text/15 focus:border-dark-text focus:outline-none transition-colors text-sm bg-white"
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                  </select>
                </div>
              </div>

              {/* Paiement */}
              <div className="bg-white p-6">
                <h2 className="text-xs text-dark-text uppercase tracking-[0.15em] font-medium mb-5">
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
                  <div className="text-center py-8">
                    <p className="text-red-600 text-sm mb-4">{paymentError}</p>
                    <button onClick={createPaymentIntent} className="text-dark-text/60 hover:text-dark-text text-sm underline">
                      Réessayer
                    </button>
                  </div>
                ) : (
                  <div className="py-12 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-dark-text/20 border-t-dark-text rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Moyens de paiement */}
              <div className="mt-8 pt-6 border-t border-dark-text/10">
                <p className="text-[10px] text-dark-text/30 uppercase tracking-[0.15em] text-center mb-4">
                  Moyens de paiement acceptés
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {/* Visa */}
                  <div className="h-8 px-3 bg-white border border-dark-text/10 rounded flex items-center justify-center">
                    <span className="text-[11px] font-bold text-[#1A1F71] tracking-wide">VISA</span>
                  </div>
                  {/* Mastercard */}
                  <div className="w-12 h-8 bg-white border border-dark-text/10 rounded flex items-center justify-center">
                    <div className="flex items-center -space-x-2">
                      <div className="w-4 h-4 rounded-full bg-[#EB001B]"></div>
                      <div className="w-4 h-4 rounded-full bg-[#F79E1B]"></div>
                    </div>
                  </div>
                  {/* Apple Pay */}
                  <div className="h-8 px-3 bg-black rounded flex items-center justify-center">
                    <span className="text-[11px] font-medium text-white">Pay</span>
                  </div>
                  {/* Google Pay */}
                  <div className="h-8 px-3 bg-white border border-dark-text/10 rounded flex items-center justify-center">
                    <span className="text-[11px] font-medium text-[#5F6368]">G Pay</span>
                  </div>
                  {/* PayPal */}
                  <div className="h-8 px-3 bg-[#0070BA] rounded flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white">PayPal</span>
                  </div>
                  {/* CB */}
                  <div className="h-8 px-3 bg-white border border-dark-text/10 rounded flex items-center justify-center">
                    <span className="text-[11px] font-bold text-[#1A4298]">CB</span>
                  </div>
                </div>
              </div>

              {/* Mentions légales */}
              <p className="mt-6 text-[11px] text-dark-text/30 leading-relaxed text-center">
                En passant commande, vous acceptez nos{' '}
                <Link to="/cgv" className="underline hover:text-dark-text/50">conditions générales de vente</Link>
                {' '}et notre{' '}
                <Link to="/confidentialite" className="underline hover:text-dark-text/50">politique de confidentialité</Link>.
              </p>
            </div>

            {/* Colonne droite - Récapitulatif */}
            <div className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <div className="bg-white p-6">
                  <h2 className="text-xs text-dark-text uppercase tracking-[0.15em] font-medium mb-6">
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
                          <div className="w-20 h-20 bg-[#f5f5f5] flex-shrink-0">
                            {image && (
                              <img
                                src={image}
                                alt={node.merchandise.product.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-dark-text font-medium truncate">
                              {node.merchandise.product.title}
                            </p>
                            <p className="text-xs text-dark-text/40 mt-1">
                              Qté: {node.quantity}
                            </p>
                            <p className="text-sm text-dark-text mt-2">
                              {itemTotal.toFixed(2)}€
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Totaux */}
                  <div className="border-t border-dark-text/10 pt-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-text/50">Sous-total</span>
                      <span className="text-dark-text">{subtotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-text/50">Livraison</span>
                      <span className="text-dark-text">
                        {shipping === 0 ? 'Offerte' : `${shipping.toFixed(2)}€`}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-dark-text/10 mt-5 pt-5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-dark-text">Total</span>
                      <span className="font-display text-2xl text-dark-text">
                        {total.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>

                {/* Garanties */}
                <div className="mt-4 p-6 bg-white">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-[10px] text-dark-text/40 uppercase tracking-wider">Livraison</p>
                      <p className="text-xs text-dark-text mt-1">Express 48h</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-dark-text/40 uppercase tracking-wider">Garantie</p>
                      <p className="text-xs text-dark-text mt-1">3 ans</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-dark-text/40 uppercase tracking-wider">Retours</p>
                      <p className="text-xs text-dark-text mt-1">30 jours</p>
                    </div>
                  </div>
                </div>

                {/* Lien retour panier */}
                <Link
                  to="/cart"
                  className="mt-4 flex items-center justify-center gap-2 text-dark-text/40 hover:text-dark-text transition-colors text-sm py-3"
                >
                  <ArrowLeft className="w-4 h-4" />
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
