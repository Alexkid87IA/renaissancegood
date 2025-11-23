import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { updateCheckoutEmail, updateCheckoutShippingAddress } from '../lib/shopify';
import { 
  Shield, Truck, Package, CreditCard, Lock, ChevronRight, 
  ChevronLeft, Award, MapPin, Mail, User, Phone, Smartphone 
} from 'lucide-react';

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

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, isLoading } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  
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

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const cartLines = cart?.lines.edges || [];

  useEffect(() => {
    if (!isLoading && cartLines.length === 0) {
      navigate('/shop');
    }
  }, [cartLines, isLoading, navigate]);

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const freeShippingThreshold = 500;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 15;
  const tax = subtotal * 0.20;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email invalide';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.firstName) errors.firstName = 'Le prénom est requis';
    if (!formData.lastName) errors.lastName = 'Le nom est requis';
    if (!formData.address) errors.address = 'L\'adresse est requise';
    if (!formData.city) errors.city = 'La ville est requise';
    if (!formData.postalCode) errors.postalCode = 'Le code postal est requis';
    if (!formData.phone) {
      errors.phone = 'Le téléphone est requis';
    } else if (!/^[\d\s+()-]+$/.test(formData.phone)) {
      errors.phone = 'Numéro de téléphone invalide';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!acceptedTerms) {
      errors.terms = 'Vous devez accepter les conditions générales';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    try {
      localStorage.setItem('renaissance_shipping_info', JSON.stringify(formData));

      if (!cart?.id || !cart?.checkoutUrl) {
        console.error('Pas de panier ou checkoutUrl');
        return;
      }

      // 🎯 PRÉ-REMPLIR SHOPIFY AVANT LA REDIRECTION
      console.log('Pré-remplissage du checkout Shopify...');

      // 1. Mettre à jour l'email
      await updateCheckoutEmail(cart.id, formData.email);

      // 2. Mettre à jour l'adresse de livraison
      await updateCheckoutShippingAddress(cart.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address1: formData.address,
        address2: formData.addressComplement || undefined,
        city: formData.city,
        zip: formData.postalCode,
        country: formData.country,
        phone: formData.phone
      });

      console.log('✅ Checkout Shopify pré-rempli avec succès !');

      // 3. Rediriger vers Shopify checkout (déjà pré-rempli !)
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error('❌ Erreur lors du pré-remplissage:', error);
      // En cas d'erreur, on redirige quand même vers Shopify
      if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="w-8 h-8 border-2 border-bronze border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-sans text-sm text-dark-text/60">Chargement...</p>
        </motion.div>
      </div>
    );
  }

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen bg-beige">
      <div className="max-w-[1400px] mx-auto px-6 laptop:px-12 xl:px-16">
        
        {/* ÉTAPE 1 - PAIEMENT EXPRESS + EMAIL */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center justify-center py-20"
            >
              <div className="max-w-[600px] w-full">
                
                {/* Titre principal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <h2 className="font-serif text-3xl laptop:text-4xl text-dark-text mb-4">
                    Finaliser votre achat
                  </h2>
                  <p className="font-sans text-sm text-dark-text/60">
                    Total : <span className="font-serif text-lg text-bronze">{total.toFixed(2)}€</span>
                  </p>
                </motion.div>

                {/* Progress */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <p className="font-sans text-xs tracking-widest text-dark-text/40 mb-6 uppercase text-center">
                    Étape 1 sur 3
                  </p>
                  <div className="flex gap-3 justify-center">
                    <div className="h-1 w-20 bg-bronze" />
                    <div className="h-1 w-20 bg-dark-text/10" />
                    <div className="h-1 w-20 bg-dark-text/10" />
                  </div>
                </motion.div>

                {/* PAIEMENT EXPRESS - EN PREMIER */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-2xl text-dark-text mb-2">
                      Paiement Express
                    </h3>
                    <p className="font-sans text-sm text-dark-text/60">
                      Finalisez en quelques secondes
                    </p>
                  </div>

                  {/* Boutons de paiement express */}
                  <div className="space-y-4">
                    {/* Apple Pay */}
                    <a
                      href={cart?.checkoutUrl}
                      className="block w-full bg-black text-white py-4 px-6 text-center hover:bg-black/90 transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="currentColor">
                          <path d="M35.2 24.4c0-3.4 2.8-5.2 2.9-5.2-1.6-2.3-4-2.6-4.9-2.7-2-.2-4 1.2-5 1.2-1.1 0-2.7-1.2-4.5-1.1-2.3 0-4.4 1.3-5.6 3.4-2.4 4.1-.6 10.3 1.7 13.6 1.1 1.6 2.5 3.4 4.3 3.4 1.7-.1 2.4-1.1 4.5-1.1s2.7 1.1 4.5 1.1c1.9 0 3.1-1.7 4.2-3.3 1.3-1.9 1.9-3.7 1.9-3.8-.1 0-3.5-1.4-3.5-5.5zm-3.3-9.8c.9-1.1 1.5-2.7 1.3-4.2-1.3.1-2.9.9-3.9 2-.8 1-1.6 2.6-1.4 4.1 1.5.1 3-.8 4-1.9z"/>
                        </svg>
                        <span className="font-sans text-base tracking-wide">Pay</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </a>

                    {/* PayPal */}
                    <a
                      href={cart?.checkoutUrl}
                      className="block w-full bg-[#0070ba] text-white py-4 px-6 text-center hover:bg-[#005ea6] transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l1.12-7.105c.082-.519.526-.901 1.05-.901h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.065-.345.108-.645.141-.68z"/>
                        </svg>
                        <span className="font-sans text-base font-bold tracking-wide">PayPal</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </a>

                    {/* Shop Pay */}
                    <a
                      href={cart?.checkoutUrl}
                      className="block w-full bg-[#5a31f4] text-white py-4 px-6 text-center hover:bg-[#4c28d4] transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <Smartphone className="w-5 h-5" />
                        <span className="font-sans text-base font-bold tracking-wide">Shop Pay</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </a>
                  </div>
                </motion.div>

                {/* Séparateur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative mb-12"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dark-text/20" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-beige px-6 font-sans text-sm text-dark-text/60 uppercase tracking-wider">
                      ou paiement classique
                    </span>
                  </div>
                </motion.div>

                {/* FORMULAIRE EMAIL */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-12"
                >
                  <h3 className="font-serif text-2xl text-dark-text mb-8 text-center">
                    Votre adresse email
                  </h3>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-bronze" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      className="w-full text-center text-lg py-5 pl-12 pr-4 border-2 border-dark-text/20 bg-white focus:outline-none focus:border-bronze transition-colors duration-300 font-sans placeholder:text-dark-text/30"
                    />
                  </div>
                  {formErrors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-3 font-sans text-center"
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Bouton */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleNextStep}
                  className="w-full bg-dark-text text-beige px-8 py-6 font-sans text-sm tracking-[0.3em] hover:bg-bronze transition-all duration-500 flex items-center justify-center gap-4 group"
                >
                  <span>CONTINUER</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.button>

                {/* Trust signals */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 flex items-center justify-center gap-6 text-dark-text/40"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span className="font-sans text-xs">Sécurisé SSL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="font-sans text-xs">Garantie 2 ans</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ÉTAPE 2 - ADRESSE */}
        <AnimatePresence mode="wait">
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center justify-center py-20"
            >
              <div className="max-w-[700px] w-full">
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <h2 className="font-serif text-3xl laptop:text-4xl text-dark-text mb-4">
                    Adresse de livraison
                  </h2>
                  <p className="font-sans text-sm text-dark-text/60">
                    Livraison soignée • {shipping === 0 ? 'Gratuite' : `${shipping}€`}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <p className="font-sans text-xs tracking-widest text-dark-text/40 mb-6 uppercase text-center">
                    Étape 2 sur 3
                  </p>
                  <div className="flex gap-3 justify-center">
                    <div className="h-1 w-20 bg-bronze" />
                    <div className="h-1 w-20 bg-bronze" />
                    <div className="h-1 w-20 bg-dark-text/10" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6 bg-white p-8 border border-dark-text/10"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 font-sans text-xs text-dark-text/60 mb-3 uppercase tracking-wider">
                        <User className="w-4 h-4 text-bronze" />
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full text-base py-3 px-4 border border-dark-text/20 bg-beige focus:outline-none focus:border-bronze transition-colors duration-300 font-sans"
                      />
                      {formErrors.firstName && <p className="text-red-600 text-xs mt-2 font-sans">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-sans text-xs text-dark-text/60 mb-3 uppercase tracking-wider">
                        <User className="w-4 h-4 text-bronze" />
                        Nom
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full text-base py-3 px-4 border border-dark-text/20 bg-beige focus:outline-none focus:border-bronze transition-colors duration-300 font-sans"
                      />
                      {formErrors.lastName && <p className="text-red-600 text-xs mt-2 font-sans">{formErrors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-sans text-xs text-dark-text/60 mb-3 uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-bronze" />
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full text-base py-3 px-4 border border-dark-text/20 bg-beige focus:outline-none focus:border-bronze transition-colors duration-300 font-sans"
                    />
                    {formErrors.address && <p className="text-red-600 text-xs mt-2 font-sans">{formErrors.address}</p>}
                  </div>

                  <div>
                    <label className="font-sans text-xs text-dark-text/40 mb-3 uppercase tracking-wider block">
                      Complément (optionnel)
                    </label>
                    <input
                      type="text"
                      name="addressComplement"
                      value={formData.addressComplement}
                      onChange={handleInputChange}
                      placeholder="Appartement, bâtiment..."
                      className="w-full text-base py-3 px-4 border border-dark-text/20 bg-beige focus:outline-none focus:border-bronze transition-colors duration-300 font-sans placeholder:text-dark-text/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="font-sans text-xs text-dark-text/60 mb-3 uppercase tracking-wider block">
                        Code postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full text-base py-3 px-4 border border-dark-text/20 bg-beige focus:outline-none focus:border-bronze transition-colors duration-300 font-sans"
                      />
                      {formErrors.postalCode && <p className="text-red-600 text-xs mt-2 font-sans">{formErrors.postalCode}</p>}
                    </div>
                    <div>
                      <label className="font-sans text-xs text-dark-text/60 mb-3 uppercase tracking-wider block">
                        Ville
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full text-base py-3 px-4 border border-dark-text/20 bg-beige focus:outline-none focus:border-bronze transition-colors duration-300 font-sans"
                      />
                      {formErrors.city && <p className="text-red-600 text-xs mt-2 font-sans">{formErrors.city}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-xs text-dark-text/60 mb-3 uppercase tracking-wider block">
                      Pays
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full text-base py-3 px-4 border border-dark-text/20 bg-beige focus:outline-none focus:border-bronze transition-colors duration-300 font-sans"
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Monaco">Monaco</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-sans text-xs text-dark-text/60 mb-3 uppercase tracking-wider">
                      <Phone className="w-4 h-4 text-bronze" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full text-base py-3 px-4 border border-dark-text/20 bg-beige focus:outline-none focus:border-bronze transition-colors duration-300 font-sans placeholder:text-dark-text/20"
                    />
                    {formErrors.phone && <p className="text-red-600 text-xs mt-2 font-sans">{formErrors.phone}</p>}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4 mt-8"
                >
                  <button
                    onClick={handlePreviousStep}
                    className="flex-1 border-2 border-dark-text text-dark-text px-8 py-5 font-sans text-xs tracking-[0.3em] hover:bg-dark-text hover:text-beige transition-all duration-500 flex items-center justify-center gap-3"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>RETOUR</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex-1 bg-dark-text text-beige px-8 py-5 font-sans text-xs tracking-[0.3em] hover:bg-bronze transition-all duration-500 flex items-center justify-center gap-3 group"
                  >
                    <span>CONTINUER</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ÉTAPE 3 - RÉCAPITULATIF */}
        <AnimatePresence mode="wait">
          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="py-20"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                
                <div className="mt-8">
                  <p className="font-sans text-xs tracking-widest text-dark-text/40 mb-6 uppercase">
                    Étape 3 sur 3
                  </p>
                  <div className="flex gap-3 justify-center">
                    <div className="h-1 w-20 bg-bronze" />
                    <div className="h-1 w-20 bg-bronze" />
                    <div className="h-1 w-20 bg-bronze" />
                  </div>
                </div>

                <h2 className="font-serif text-3xl laptop:text-4xl mt-8 text-dark-text">
                  Confirmation de votre achat
                </h2>
                <p className="font-sans text-sm text-dark-text/60 mt-4">
                  Vérifiez vos informations avant le paiement
                </p>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="bg-white p-8 border border-dark-text/10">
                      <h3 className="font-serif text-2xl text-dark-text mb-6 flex items-center gap-3">
                        <Mail className="w-6 h-6 text-bronze" />
                        Vos informations
                      </h3>
                      <div className="space-y-4 font-sans text-sm">
                        <div>
                          <p className="text-dark-text/60 mb-1 text-xs uppercase tracking-wider">Email</p>
                          <p className="text-dark-text font-medium">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-dark-text/60 mb-1 text-xs uppercase tracking-wider">Nom complet</p>
                          <p className="text-dark-text font-medium">{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <p className="text-dark-text/60 mb-1 text-xs uppercase tracking-wider">Adresse de livraison</p>
                          <p className="text-dark-text font-medium">
                            {formData.address}
                            {formData.addressComplement && <><br />{formData.addressComplement}</>}
                            <br />
                            {formData.postalCode} {formData.city}
                            <br />
                            {formData.country}
                          </p>
                        </div>
                        <div>
                          <p className="text-dark-text/60 mb-1 text-xs uppercase tracking-wider">Téléphone</p>
                          <p className="text-dark-text font-medium">{formData.phone}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="mt-6 text-bronze hover:text-dark-text transition-colors font-sans text-sm flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Modifier
                      </button>
                    </div>

                    <div className="bg-white p-8 border border-dark-text/10">
                      <h3 className="font-serif text-2xl text-dark-text mb-6 flex items-center gap-3">
                        <Package className="w-6 h-6 text-bronze" />
                        Votre commande
                      </h3>

                      <div className="space-y-4 mb-6">
                        {cartLines.map(({ node }) => {
                          const image = node.merchandise.product.images.edges[0]?.node.url;
                          const price = parseFloat(node.merchandise.priceV2.amount);
                          const itemTotal = price * node.quantity;

                          return (
                            <div key={node.id} className="flex gap-4 pb-4 border-b border-dark-text/10 last:border-0">
                              <div className="w-20 h-20 bg-beige overflow-hidden flex-shrink-0">
                                {image && <img src={image} alt={node.merchandise.product.title} className="w-full h-full object-cover" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-sans text-sm text-dark-text font-medium">{node.merchandise.product.title}</h4>
                                <p className="font-sans text-xs text-dark-text/60 mt-1">Qté: {node.quantity}</p>
                              </div>
                              <div className="font-sans text-sm text-dark-text font-medium">{itemTotal.toFixed(2)}€</div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="space-y-3 pt-4 border-t border-dark-text/10">
                        <div className="flex justify-between font-sans text-sm">
                          <span className="text-dark-text/60">Sous-total</span>
                          <span className="text-dark-text">{subtotal.toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between font-sans text-sm">
                          <span className="text-dark-text/60 flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            Livraison
                          </span>
                          <span className="text-dark-text">
                            {shipping === 0 ? <span className="text-green-600">Gratuite</span> : `${shipping.toFixed(2)}€`}
                          </span>
                        </div>
                        <div className="flex justify-between font-sans text-sm">
                          <span className="text-dark-text/60">TVA (20%)</span>
                          <span className="text-dark-text">{tax.toFixed(2)}€</span>
                        </div>
                      </div>

                      <div className="border-t border-dark-text/10 mt-4 pt-4">
                        <div className="flex justify-between items-baseline">
                          <span className="font-serif text-xl text-dark-text">Total</span>
                          <span className="font-serif text-3xl text-dark-text">{total.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 border border-dark-text/10">
                      <label className="flex items-start gap-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceptedTerms}
                          onChange={(e) => {
                            setAcceptedTerms(e.target.checked);
                            if (formErrors.terms) {
                              setFormErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors.terms;
                                return newErrors;
                              });
                            }
                          }}
                          className="mt-1 w-5 h-5 border-dark-text/20 text-bronze focus:ring-bronze"
                        />
                        <span className="font-sans text-sm text-dark-text/80">
                          J'accepte les{' '}
                          <a href="/cgv" className="text-bronze hover:underline">conditions générales de vente</a>
                          {' '}et la{' '}
                          <a href="/privacy" className="text-bronze hover:underline">politique de confidentialité</a>
                        </span>
                      </label>
                      {formErrors.terms && <p className="text-red-600 text-xs mt-2 font-sans">{formErrors.terms}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-dark-text text-beige py-6 px-8 font-sans text-sm tracking-[0.3em] hover:bg-bronze transition-all duration-500 flex items-center justify-center gap-4 group"
                    >
                      <Lock className="w-5 h-5" />
                      <span>PAYER {total.toFixed(2)}€</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full border-2 border-dark-text/20 text-dark-text py-4 px-8 font-sans text-xs tracking-[0.2em] hover:border-dark-text transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>RETOUR</span>
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="bg-dark-text/5 aspect-square overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Package className="w-16 h-16 text-bronze mx-auto mb-4 opacity-50" />
                          <p className="font-serif text-2xl text-dark-text/60">
                            Emballage<br />Renaissance
                          </p>
                          <p className="font-sans text-xs text-dark-text/40 mt-2">
                            Livrée dans un écrin soigné
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 border border-dark-text/10 space-y-6">
                      <div className="flex items-start gap-4">
                        <Award className="w-8 h-8 text-bronze flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-serif text-lg text-dark-text mb-2">
                            Qualité Renaissance
                          </h4>
                          <p className="font-sans text-sm text-dark-text/60 leading-relaxed">
                            Fabriqué en Corée du Sud avec précision et matériaux d'exception.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 pt-6 border-t border-dark-text/10">
                        <Shield className="w-8 h-8 text-bronze flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-serif text-lg text-dark-text mb-2">
                            Garantie 2 ans
                          </h4>
                          <p className="font-sans text-sm text-dark-text/60 leading-relaxed">
                            Retours 30 jours • Garantie constructeur 2 ans
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 pt-6 border-t border-dark-text/10">
                        <Truck className="w-8 h-8 text-bronze flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-serif text-lg text-dark-text mb-2">
                            Livraison sécurisée
                          </h4>
                          <p className="font-sans text-sm text-dark-text/60 leading-relaxed">
                            Expédition soignée avec suivi • 3-5 jours ouvrés
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 pt-6 border-t border-dark-text/10">
                        <CreditCard className="w-8 h-8 text-bronze flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-serif text-lg text-dark-text mb-2">
                            Paiement 100% sécurisé
                          </h4>
                          <p className="font-sans text-sm text-dark-text/60 leading-relaxed">
                            CB • PayPal • Apple Pay • Cryptage SSL
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-beige p-8 text-center border border-dark-text/10">
                      <p className="font-serif text-2xl text-dark-text mb-2">200+</p>
                      <p className="font-sans text-sm text-dark-text/60">
                        opticiens nous font confiance en France
                      </p>
                    </div>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}