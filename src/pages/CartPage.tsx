import LocaleLink from '../components/LocaleLink';
import { useTranslation } from 'react-i18next';
import { Shield, Truck, Award, Package, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { PaymentLogos } from '../components/PaymentLogos';
import { SHIPPING } from '../constants/shipping';
import CartItemWithCarousel from '../components/cart/CartItemWithCarousel';

export default function CartPage() {
  const { cart, isLoading, updateQuantity, removeItem } = useCart();
  const { t } = useTranslation('cart');

  const cartLines = cart?.lines.edges || [];

  const calculateSubtotal = () => {
    if (!cart) return 0;
    return parseFloat(cart.cost.subtotalAmount.amount);
  };

  const subtotal = calculateSubtotal();
  const freeShippingThreshold = SHIPPING.FREE_THRESHOLD;
  const shipping = subtotal >= freeShippingThreshold ? 0 : SHIPPING.STANDARD_RATE;
  const total = subtotal + shipping;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  if (isLoading && !cart) {
    return (
      <div data-header-theme="light" className="min-h-screen bg-beige flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-8 h-8 border-2 border-bronze border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-sans text-sm text-dark-text/60">{t('loading', { ns: 'common' })}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div data-header-theme="light" className="min-h-screen bg-beige pt-24 sm:pt-32 pb-32 lg:pb-20 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 laptop:px-12 xl:px-16">
        {cartLines.length === 0 ? (
          /* Empty Cart — Premium editorial */
          <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <h1 className="font-serif text-3xl sm:text-5xl laptop:text-6xl xl:text-7xl text-dark-text leading-[0.9]">
              {t('title')}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto py-8 sm:py-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left — Image */}
              <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
                <img
                  src="https://renaissance-cdn.b-cdn.net/campgane.png"
                  alt="Renaissance Eyewear"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 via-transparent to-transparent lg:bg-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#000000] to-transparent hidden lg:block" />
              </div>

              {/* Right — Content */}
              <div className="bg-[#000000] px-5 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-0 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <p className="font-sans text-bronze/[0.70] text-[9px] tracking-[0.4em] font-medium uppercase mb-5">
                    {t('title')}
                  </p>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
                    {t('emptyTitle')}
                  </h2>
                  <p className="font-display text-lg font-light italic text-white/[0.68] tracking-[-0.02em] mb-6">
                    {t('emptySubtitle')}
                  </p>
                  <div className="w-10 h-px bg-bronze/[0.42] mb-6" />
                  <p className="font-sans text-white/[0.62] text-[13px] leading-[1.8] font-light mb-8 max-w-sm">
                    {t('emptyDesc')}
                  </p>
                  <div className="flex flex-col gap-3">
                    <LocaleLink
                      to="/shop"
                      className="group relative overflow-hidden border border-white/[0.15] px-5 py-3.5 transition-all duration-500 hover:border-bronze/60 text-center"
                    >
                      <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500 whitespace-nowrap">
                        {t('emptyCollections')}
                      </span>
                      <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </LocaleLink>
                    <div className="flex gap-3">
                      <LocaleLink
                        to="/shop"
                        className="group relative overflow-hidden flex-1 border border-white/[0.14] px-5 py-3.5 transition-all duration-500 hover:border-white/30 text-center"
                      >
                        <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/[0.62] group-hover:text-white/[0.82] transition-colors duration-500 whitespace-nowrap">
                          {t('emptyExplore')}
                        </span>
                      </LocaleLink>
                      <LocaleLink
                        to="/shop"
                        className="group relative overflow-hidden flex-1 border border-white/[0.14] px-5 py-3.5 transition-all duration-500 hover:border-white/30 text-center"
                      >
                        <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/[0.62] group-hover:text-white/[0.82] transition-colors duration-500 whitespace-nowrap">
                          {t('checkoutPage.bestSellers')}
                        </span>
                      </LocaleLink>
                    </div>
                  </div>
                  <p className="mt-6 font-sans text-[11px] text-white/[0.42] tracking-[0.05em]">
                    {t('checkoutPage.socialProof')}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
          </>
        ) : (
          <div className="grid lg:grid-cols-[1fr,420px] xl:grid-cols-[1fr,480px] gap-8 lg:gap-12 xl:gap-16">
            {/* Cart Items */}
            <div className="min-w-0">
              {/* Titre — aligné avec le récap, réduit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-5 sm:mb-7"
              >
                <h1 className="font-serif text-2xl sm:text-4xl laptop:text-5xl xl:text-5xl text-dark-text leading-[0.9]">
                  {t('title')}
                </h1>
              </motion.div>
              {/* Trust Badges (L'engagement) — déplacé en haut */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-5 lg:mb-7"
              >
                {/* Mobile: 2x2 grid */}
                <div className="lg:hidden grid grid-cols-2 gap-2">
                  {[
                    { icon: Shield, title: t('trustBadgeWarrantyTitle') },
                    { icon: Truck, title: t('trustBadgeShippingTitle') },
                    { icon: Award, title: t('trustBadgeParisTitle') },
                    { icon: Package, title: t('trustBadgeCaseTitle') }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white border border-dark-text/[0.08] px-3 py-2.5 rounded-xl">
                      <item.icon size={14} className="text-bronze flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-sans text-[8px] tracking-[0.05em] font-medium text-dark-text/60 uppercase leading-tight">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Desktop: full grid */}
                <div className="hidden lg:grid grid-cols-4 gap-px border-y border-dark-text/[0.08] bg-dark-text/[0.08] rounded-2xl overflow-hidden">
                  <p className="col-span-4 font-sans text-[9px] tracking-[0.2em] text-dark-text/25 uppercase font-medium text-center mb-1">
                    {t('checkoutPage.engagementTitle')}
                  </p>
                  {[
                    { icon: Shield, title: t('trustBadgeWarrantyTitle'), description: t('trustBadgeWarrantyDesc') },
                    { icon: Truck, title: t('trustBadgeShippingTitle'), description: t('trustBadgeShippingDesc') },
                    { icon: Award, title: t('trustBadgeParisTitle'), description: t('trustBadgeParisDesc') },
                    { icon: Package, title: t('trustBadgeCaseTitle'), description: t('trustBadgeCaseDesc') }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
                      viewport={{ once: true }}
                      className="bg-beige px-3 py-3.5 text-left transition-colors duration-500 group hover:bg-white"
                    >
                      <div className="mb-2 flex justify-start">
                        <div className="w-6 h-6 border border-bronze/[0.25] flex items-center justify-center rounded-xl transition-colors duration-500 group-hover:border-bronze/60">
                          <item.icon size={12} className="text-bronze transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                        </div>
                      </div>
                      <h4 className="font-sans text-[9px] tracking-[0.22em] font-bold text-dark-text uppercase mb-1.5 leading-[1.35]">
                        {item.title}
                      </h4>
                      <p className="font-sans text-[10px] leading-[1.45] text-dark-text/55">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {cartLines.map(({ node }, index) => (
                  <CartItemWithCarousel
                    key={node.id}
                    node={node}
                    index={index}
                    isLoading={isLoading}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </AnimatePresence>

              {/* Free Shipping Progress — déplacé en bas */}
              {subtotal < freeShippingThreshold && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-bronze/20 p-4 sm:p-6 mt-4 sm:mt-8 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-sans text-xs text-dark-text">
                      <span className="font-bold text-bronze">{remainingForFreeShipping.toFixed(0)}€</span> {t('freeShippingRemaining')}
                    </p>
                    <Truck size={18} className="text-bronze" />
                  </div>
                  <div className="w-full bg-dark-text/5 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressToFreeShipping}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-bronze"
                    />
                  </div>
                </motion.div>
              )}

              {/* Order Summary — Mobile inline (simplified) */}
              <div className="lg:hidden mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border border-dark-text/5 p-5 rounded-2xl"
              >
                <div className="flex justify-between items-baseline mb-3">
                  <span className="font-sans text-xs text-dark-text/60">{t('subtotal')}</span>
                  <span className="font-sans text-sm text-dark-text">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-baseline mb-4">
                  <span className="font-sans text-xs text-dark-text/60">{t('shipping')}</span>
                  <span className="font-sans text-sm text-dark-text">
                    {shipping > 0 ? `${shipping.toFixed(2)}€` : (
                      <span className="text-bronze font-medium">{t('shippingFree')}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t-2 border-dark-text mb-4">
                  <span className="font-serif text-base text-dark-text">{t('total')}</span>
                  <span className="font-serif text-2xl font-bold text-bronze">
                    {total.toFixed(2)}€
                  </span>
                </div>

                {/* Payment methods — compact */}
                <div className="pt-3 border-t border-dark-text/[0.08]">
                  <PaymentLogos size="compact" />
                </div>
              </motion.div>
              </div>
            </div>

            {/* Order Summary - Sticky Sidebar (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white border border-dark-text/5 p-5 lg:p-6 sticky top-32 rounded-2xl">
                <h2 className="font-sans text-[10px] tracking-[0.3em] font-bold text-dark-text uppercase mb-5 pb-3 border-b border-dark-text/10">
                  {t('orderSummary')}
                </h2>

                <div className="space-y-3.5 mb-5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-dark-text/60">{t('subtotal')}</span>
                    <span className="font-sans text-base text-dark-text">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-dark-text/60">{t('shipping')}</span>
                    <span className="font-sans text-base text-dark-text">
                      {shipping > 0 ? `${shipping.toFixed(2)}€` : (
                        <span className="text-bronze font-medium">{t('shippingFree')}</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-5 pt-4 border-t-2 border-dark-text">
                  <span className="font-serif text-lg text-dark-text">{t('total')}</span>
                  <span className="font-serif text-2xl font-bold text-bronze">
                    {total.toFixed(2)}€
                  </span>
                </div>

                {/* Value banner */}
                <div className="mb-3 p-3 bg-bronze/5 border border-bronze/[0.15] rounded-2xl">
                  <div className="flex items-center gap-2 justify-center text-dark-text/70">
                    <Package size={14} strokeWidth={1.5} className="text-bronze" />
                    <p className="font-sans text-xs font-medium">
                      {t('checkoutPage.valueBanner')}
                    </p>
                  </div>
                </div>

                {/* Message de réassurance */}
                <div className="mb-3 p-3 bg-beige border border-bronze/20 rounded-2xl">
                  <div className="flex items-center gap-2 justify-center text-dark-text/70">
                    <Lock size={14} strokeWidth={2} className="text-bronze" />
                    <p className="font-sans text-xs">
                      {t('securePayment')}
                    </p>
                  </div>
                </div>

                {/* Bouton vers Checkout — bronze sweep */}
                <LocaleLink
                  to="/checkout"
                  className="group relative flex items-center justify-center gap-2 w-full bg-dark-text text-white py-4 px-6 text-center font-sans text-[10px] tracking-[0.3em] font-bold overflow-hidden transition-all duration-300 mb-3 rounded-2xl"
                >
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="relative z-10">{t('checkout')}</span>
                </LocaleLink>

                <LocaleLink
                  to="/shop"
                  className="block w-full text-center py-3.5 font-sans text-[9px] tracking-[0.2em] font-bold text-dark-text hover:text-bronze transition-colors duration-300 border border-dark-text/20 hover:border-bronze/40 rounded-2xl"
                >
                  {t('continueShopping')}
                </LocaleLink>

                {/* Satisfaction guarantee */}
                <p className="text-center mt-2 font-sans text-[10px] text-dark-text/[0.35] tracking-[0.05em]">
                  {t('checkoutPage.satisfactionGuarantee')}
                </p>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-dark-text/10">
                  <p className="font-sans text-[9px] tracking-[0.2em] text-dark-text/25 uppercase font-medium mb-4 text-center">
                    {t('checkoutPage.engagementTitle')}
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { icon: Shield, text: t('trustSecure') },
                      { icon: Truck, text: t('trustFreeShipping') },
                      { icon: Package, text: t('trustPackaging') },
                    ].map(({ icon: Icon, text }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-dark-text/60 group"
                      >
                        <Icon size={16} strokeWidth={1.5} className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <p className="font-sans text-xs">{text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Moyens de paiement */}
                <div className="mt-6 pt-5 border-t border-dark-text/10">
                  <p className="text-[9px] text-dark-text/40 uppercase tracking-[0.15em] text-center mb-4">
                    {t('paymentMethods')}
                  </p>
                  <PaymentLogos />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* ═══ FIXED BOTTOM CHECKOUT BAR — Mobile only ═══ */}
      {cartLines.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-dark-text/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          {/* Free shipping progress — mini (top of bar) */}
          {subtotal < freeShippingThreshold && (
            <div className="px-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-dark-text/5 h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-bronze" style={{ width: `${progressToFreeShipping}%` }} />
                </div>
                <span className="font-sans text-[9px] text-dark-text/40 flex-shrink-0">
                  {remainingForFreeShipping.toFixed(0)}€
                </span>
              </div>
            </div>
          )}
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex-shrink-0 min-w-0">
              <p className="font-sans text-[8px] tracking-[0.1em] text-dark-text/40 uppercase">{t('total')}</p>
              <p className="font-serif text-lg font-bold text-dark-text">{total.toFixed(2)}€</p>
            </div>
            <LocaleLink
              to="/checkout"
              className="flex-1 flex items-center justify-center gap-1.5 bg-dark-text text-white py-3.5 px-4 text-center font-sans text-[9px] tracking-[0.15em] font-bold uppercase active:bg-bronze transition-colors duration-200 min-w-0 rounded-xl"
            >
              <Lock size={11} strokeWidth={2} className="flex-shrink-0" />
              <span className="truncate">{t('checkout')}</span>
            </LocaleLink>
          </div>
        </motion.div>
      )}
    </div>
  );
}
