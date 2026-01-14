import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Package, Truck, Mail, ArrowRight } from 'lucide-react';

interface OrderInfo {
  email: string;
  name: string;
  total: number;
  date: string;
}

export default function CheckoutConfirmationPage() {
  const [searchParams] = useSearchParams();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    // Récupérer les infos de commande du localStorage
    const savedOrder = localStorage.getItem('renaissance_last_order');
    if (savedOrder) {
      setOrderInfo(JSON.parse(savedOrder));
    }

    // Vider le panier (optionnel - dépend de comment tu veux gérer ça)
    // localStorage.removeItem('renaissance_cart_id');
  }, []);

  const paymentIntentId = searchParams.get('payment_intent');

  return (
    <div className="min-h-screen bg-beige pt-32 pb-20">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Animation de succès */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-24 h-24 mx-auto mb-8 bg-green-500 rounded-full flex items-center justify-center"
        >
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl laptop:text-5xl text-dark-text mb-4">
            Merci pour votre commande !
          </h1>
          <p className="font-sans text-lg text-dark-text/60">
            Votre paiement a été confirmé avec succès
          </p>
        </motion.div>

        {/* Détails de la commande */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-dark-text/10 p-8 mb-8"
        >
          <h2 className="font-sans text-xs tracking-[0.2em] font-bold text-dark-text uppercase mb-6 pb-4 border-b border-dark-text/10">
            Détails de la commande
          </h2>

          <div className="space-y-4">
            {orderInfo && (
              <>
                <div className="flex justify-between">
                  <span className="font-sans text-sm text-dark-text/60">Client</span>
                  <span className="font-sans text-sm text-dark-text">{orderInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-sm text-dark-text/60">Email</span>
                  <span className="font-sans text-sm text-dark-text">{orderInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-sm text-dark-text/60">Total payé</span>
                  <span className="font-serif text-lg font-bold text-bronze">{orderInfo.total.toFixed(2)}€</span>
                </div>
              </>
            )}
            {paymentIntentId && (
              <div className="flex justify-between pt-4 border-t border-dark-text/10">
                <span className="font-sans text-xs text-dark-text/40">Référence</span>
                <span className="font-mono text-xs text-dark-text/60">{paymentIntentId.slice(-12)}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Prochaines étapes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-12"
        >
          <div className="bg-white border border-dark-text/10 p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-bronze/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-bronze" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold text-dark-text mb-1">Email de confirmation</h3>
              <p className="font-sans text-sm text-dark-text/60">
                Vous allez recevoir un email de confirmation avec tous les détails de votre commande.
              </p>
            </div>
          </div>

          <div className="bg-white border border-dark-text/10 p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-bronze/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-bronze" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold text-dark-text mb-1">Préparation</h3>
              <p className="font-sans text-sm text-dark-text/60">
                Votre commande sera préparée avec soin dans nos ateliers sous 24-48h.
              </p>
            </div>
          </div>

          <div className="bg-white border border-dark-text/10 p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-bronze/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-bronze" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold text-dark-text mb-1">Expédition</h3>
              <p className="font-sans text-sm text-dark-text/60">
                Livraison soignée avec suivi en 3-5 jours ouvrés. Vous recevrez un email avec le numéro de suivi.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/shop"
            className="flex-1 bg-dark-text text-beige py-5 px-8 font-sans text-xs tracking-[0.3em] text-center hover:bg-bronze transition-all duration-500 flex items-center justify-center gap-3"
          >
            <span>CONTINUER MES ACHATS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="flex-1 border-2 border-dark-text text-dark-text py-5 px-8 font-sans text-xs tracking-[0.3em] text-center hover:bg-dark-text hover:text-beige transition-all duration-500"
          >
            RETOUR À L'ACCUEIL
          </Link>
        </motion.div>

        {/* Contact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12 font-sans text-sm text-dark-text/50"
        >
          Une question ? Contactez-nous à{' '}
          <a href="mailto:contact@renaissance-paris.com" className="text-bronze hover:underline">
            contact@renaissance-paris.com
          </a>
        </motion.p>
      </div>
    </div>
  );
}
