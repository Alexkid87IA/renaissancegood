import { useState, useRef } from 'react';
import { Instagram, Facebook, ArrowUp, MapPin, Phone, Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { stagger, fade } from './shared';
import LocaleLink from './LocaleLink';
import { useLocale } from '../contexts/LocaleContext';
import { subscribeToKlaviyo } from '../lib/klaviyo';

export default function Footer() {
  const { t } = useTranslation('common');
  const { locale } = useLocale();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const newsletterRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const newsletterInView = useInView(newsletterRef, { once: true, amount: 0.2 });
  const mainInView = useInView(mainRef, { once: true, amount: 0.15 });
  const trustInView = useInView(trustRef, { once: true, amount: 0.3 });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(false);
    const success = await subscribeToKlaviyo(email, locale);
    if (success) {
      setSubscribed(true);
    } else {
      setError(true);
    }
    setSubmitting(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] text-white relative overflow-hidden">

      {/* ═══════════════════════════════════════ */}
      {/* DESKTOP FOOTER                          */}
      {/* ═══════════════════════════════════════ */}
      <div className="hidden md:block">

        {/* Newsletter */}
        <div className="relative border-b border-white/[0.06]">
          <div className="max-w-[1600px] mx-auto px-12 lg:px-20 xl:px-28 py-28 lg:py-32">
            <motion.div
              ref={newsletterRef}
              variants={stagger}
              initial="hidden"
              animate={newsletterInView ? "visible" : "hidden"}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.p variants={fade} className="font-sans text-[9px] tracking-[0.4em] text-white/30 uppercase font-medium mb-4">
                {t('footer.newsletterLabel')}
              </motion.p>
              <motion.h2 variants={fade} className="font-display text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
                {t('footer.newsletterTitle')}
              </motion.h2>
              <motion.p variants={fade} className="font-display text-3xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-10">
                {t('footer.newsletterSubtitle')}
              </motion.p>
              <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-10" />
              <motion.p variants={fade} className="font-sans text-white/35 text-sm leading-[1.9] font-light mb-12 max-w-lg mx-auto">
                {t('footer.newsletterDescription')}
              </motion.p>
              <motion.div variants={fade}>
                {!subscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('footer.emailPlaceholder')}
                      required
                      disabled={submitting}
                      className="flex-1 px-5 py-4 bg-white/[0.04] border border-white/[0.08] text-white text-sm font-sans placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-all duration-500 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative overflow-hidden border border-white/20 px-8 py-4 transition-all duration-500 hover:border-white disabled:opacity-50"
                    >
                      <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#000000] transition-colors duration-500 flex items-center gap-2">
                        {submitting ? t('footer.subscribing', { defaultValue: 'Envoi...' }) : t('footer.subscribe')}
                        {!submitting && <ArrowRight className="w-3.5 h-3.5" />}
                      </span>
                      <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="py-4"
                  >
                    <p className="font-sans text-sm text-white font-medium">
                      {t('footer.subscribeSuccess')}
                    </p>
                    <p className="font-sans text-xs text-white/30 mt-2">
                      {t('footer.subscribeSuccessDetail')}
                    </p>
                  </motion.div>
                )}
                {error && (
                  <p className="font-sans text-xs text-red-400 mt-3">
                    {t('footer.subscribeError', { defaultValue: 'Une erreur est survenue. Veuillez réessayer.' })}
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-[1600px] mx-auto px-12 lg:px-20 xl:px-28 pt-24 pb-20">
          <motion.div
            ref={mainRef}
            variants={stagger}
            initial="hidden"
            animate={mainInView ? "visible" : "hidden"}
            className="grid grid-cols-[280px_1fr] gap-20"
          >
            {/* Left — Brand */}
            <motion.div variants={fade}>
              <img
                src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT%20blanc-Photoroom.png"
                alt="Renaissance Paris"
                className="h-20 lg:h-24 w-auto object-contain mb-8"
                loading="lazy"
              />
              <p className="font-sans text-xs text-white/30 leading-[1.9] max-w-[260px] font-light mb-10">
                {t('footer.brandDescription')}
              </p>
              <div className="space-y-3.5 mb-10">
                <a href="mailto:contact@renaissance-eyewear.fr" className="flex items-center gap-3 group">
                  <Mail className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors duration-500" />
                  <span className="font-sans text-[11px] text-white/35 group-hover:text-white/60 transition-colors duration-500">
                    contact@renaissance-eyewear.fr
                  </span>
                </a>
                <a href="tel:+33142868200" className="flex items-center gap-3 group">
                  <Phone className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors duration-500" />
                  <span className="font-sans text-[11px] text-white/35 group-hover:text-white/60 transition-colors duration-500">
                    +33 1 42 86 82 00
                  </span>
                </a>
                <LocaleLink to="/store-locator" className="flex items-center gap-3 group">
                  <MapPin className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors duration-500" />
                  <span className="font-sans text-[11px] text-white/35 group-hover:text-white/60 transition-colors duration-500">
                    {t('footer.findOptician')}
                  </span>
                </LocaleLink>
              </div>
              <div className="flex items-center gap-2.5">
                <a href="https://instagram.com/renaissance.eyewear" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/[0.08] flex items-center justify-center hover:border-white/30 hover:bg-white/[0.03] transition-all duration-500" aria-label="Instagram">
                  <Instagram size={14} className="text-white/35" />
                </a>
                <a href="https://facebook.com/renaissance.eyewear" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/[0.08] flex items-center justify-center hover:border-white/30 hover:bg-white/[0.03] transition-all duration-500" aria-label="Facebook">
                  <Facebook size={14} className="text-white/35" />
                </a>
              </div>
            </motion.div>

            {/* Right — 4 link columns */}
            <motion.div variants={fade} className="grid grid-cols-4 gap-6 lg:gap-10">
              {[
                { title: t('nav.collections'), links: [
                  { to: '/collections/heritage', label: t('footerLinks.heritage') },
                  { to: '/collections/versailles', label: t('footerLinks.versailles') },
                  { to: '/collections/isis', label: t('footerLinks.isis') },
                  { to: '/shop', label: t('footerLinks.allCreations') },
                ]},
                { title: t('nav.laMaison'), links: [
                  { to: '/histoire', label: t('footerLinks.ourHistory') },
                  { to: '/savoir-faire', label: t('footerLinks.savoirFaire') },
                  { to: '/symboles', label: t('footerLinks.fiveSymbols') },
                  { to: '/blog', label: t('footerLinks.manifeste') },
                ]},
                { title: t('nav.services'), links: [
                  { to: '/livraison', label: t('footerLinks.shipping') },
                  { to: '/garantie', label: t('footerLinks.warranty') },
                  { to: '/store-locator', label: t('footerLinks.ourOpticians') },
                  { to: '/suivi-commande', label: t('footerLinks.orderTracking') },
                ]},
                { title: t('nav.aide'), links: [
                  { to: '/faq', label: t('footerLinks.faq') },
                  { to: '/contact', label: t('footerLinks.contact') },
                  { to: '/cgv', label: t('footerLinks.cgv') },
                  { to: '/confidentialite', label: t('footerLinks.privacy') },
                ]},
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3 font-semibold">{col.title}</h4>
                  <div className="w-8 h-px bg-white/10 mb-5" />
                  <ul className="space-y-3.5">
                    {col.links.map(({ to, label }) => (
                      <li key={to}>
                        <LocaleLink to={to} className="font-sans text-[12px] text-white/35 hover:text-white/70 hover:translate-x-1 transition-all duration-500 font-light inline-block">
                          {label}
                        </LocaleLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* PQCJCN — below link columns, aligned right */}
              <div className="col-span-4 mt-8 flex justify-end">
                <img
                  src="https://renaissance-cdn.b-cdn.net/fd9d5fd3-567f-4abb-9157-6f52b4ccb3c5.png"
                  alt="Pour Que Cela Ne s'Oublie Jamais"
                  className="w-full max-w-[500px] lg:max-w-[600px] h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust */}
        <div className="relative border-t border-white/[0.06]">
          <div className="max-w-[1600px] mx-auto px-12 lg:px-20 xl:px-28 py-14">
            <motion.div
              ref={trustRef}
              variants={stagger}
              initial="hidden"
              animate={trustInView ? "visible" : "hidden"}
              className="grid grid-cols-4 gap-0"
            >
              {[
                { number: '300', label: t('trust.editions'), description: t('trust.editionsDesc') },
                { number: '48h', label: t('trust.delivery'), description: t('trust.deliveryDesc') },
                { number: '2 ans', label: t('trust.warranty'), description: t('trust.warrantyDesc') },
                { number: '200+', label: t('trust.opticians'), description: t('trust.opticiansDesc') },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={fade}
                  className={`text-center ${index > 0 ? 'border-l border-white/[0.07]' : ''}`}
                >
                  <p className="font-display text-4xl font-bold text-white tracking-[-0.02em] leading-none mb-2">{item.number}</p>
                  <p className="font-sans text-[9px] tracking-[0.25em] text-white/25 uppercase font-medium mb-2">{item.label}</p>
                  <p className="font-sans text-xs text-white/40 font-light">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-white/[0.06]">
          <div className="max-w-[1600px] mx-auto px-12 lg:px-20 xl:px-28 py-7">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {['Visa', 'Mastercard', 'CB', 'Amex', 'Apple Pay', 'Google Pay'].map((method) => (
                  <div key={method} className="h-8 px-4 border border-white/[0.06] flex items-center justify-center">
                    <span className="font-sans text-[10px] font-semibold tracking-wider text-white/30 uppercase">{method}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-5">
                <div className="flex gap-4">
                  {[
                    { to: '/cgv', label: t('footerLinks.cgv') },
                    { to: '/mentions-legales', label: t('footerLinks.legalNotice') },
                    { to: '/confidentialite', label: t('footerLinks.privacy') },
                    { to: '/cookies', label: t('footerLinks.cookies') },
                  ].map(({ to, label }) => (
                    <LocaleLink key={to} to={to} className="font-sans text-[11px] text-white/25 hover:text-white/50 transition-colors duration-300">
                      {label}
                    </LocaleLink>
                  ))}
                </div>
                <p className="font-sans text-[11px] text-white/20">
                  &copy; {new Date().getFullYear()} Renaissance Paris
                </p>
                <button
                  onClick={scrollToTop}
                  className="w-9 h-9 border border-white/[0.08] flex items-center justify-center hover:border-white/30 hover:bg-white/[0.03] transition-all duration-500 group"
                  aria-label={t('footer.backToTop')}
                >
                  <ArrowUp className="w-3.5 h-3.5 text-white/25 group-hover:text-white/60 transition-colors duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* MOBILE FOOTER                           */}
      {/* ═══════════════════════════════════════ */}
      <div className="md:hidden">

        {/* Newsletter */}
        <div className="px-6 py-20">
          <div className="text-center">
            <p className="font-sans text-[8px] tracking-[0.4em] text-white/30 uppercase font-medium mb-5">
              {t('footer.newsletterLabel')}
            </p>
            <h2 className="font-display text-3xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-2">
              {t('footer.newsletterTitle')}
            </h2>
            <p className="font-display text-lg font-light italic text-white/40 tracking-[-0.02em] mb-8">
              {t('footer.newsletterSubtitle')}
            </p>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8" />
            <p className="font-sans text-white/30 text-[12px] leading-[1.9] font-light mb-10 max-w-[280px] mx-auto">
              {t('footer.newsletterDescriptionMobile')}
            </p>

            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  required
                  disabled={submitting}
                  className="w-full px-5 py-4 bg-white/[0.04] border border-white/[0.08] text-white text-[13px] font-sans placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-all duration-500 text-center disabled:opacity-50 rounded-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-white py-4 disabled:opacity-50 active:bg-white/90 transition-colors"
                >
                  <span className="font-sans text-[9px] tracking-[0.3em] font-semibold uppercase text-[#000000] flex items-center justify-center gap-2">
                    {submitting ? t('footer.subscribing', { defaultValue: 'Envoi...' }) : t('footer.subscribe')}
                    {!submitting && <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                </button>
                {error && (
                  <p className="font-sans text-xs text-red-400 mt-2 text-center">
                    {t('footer.subscribeError', { defaultValue: 'Une erreur est survenue. Veuillez réessayer.' })}
                  </p>
                )}
              </form>
            ) : (
              <div className="py-4">
                <p className="font-sans text-sm text-white font-medium">
                  {t('footer.subscribeSuccess')}
                </p>
                <p className="font-sans text-xs text-white/30 mt-2">
                  {t('footer.subscribeSuccessDetail')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Séparateur doré */}
        <div className="h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

        {/* Navigation — Accordéons */}
        <div>
          {[
            { key: 'collections', title: t('nav.collections'), links: [
              { to: '/collections/heritage', label: t('footerLinks.heritage') },
              { to: '/collections/versailles', label: t('footerLinks.versailles') },
              { to: '/collections/isis', label: t('footerLinks.isis') },
              { to: '/shop', label: t('nav.explorer') },
            ]},
            { key: 'laMaison', title: t('nav.laMaison'), links: [
              { to: '/histoire', label: t('footerLinks.ourHistory') },
              { to: '/savoir-faire', label: t('footerLinks.savoirFaire') },
              { to: '/symboles', label: t('footerLinks.fiveSymbols') },
              { to: '/blog', label: t('footerLinks.manifeste') },
            ]},
            { key: 'services', title: t('nav.services'), links: [
              { to: '/livraison', label: t('footerLinks.shipping') },
              { to: '/garantie', label: t('footerLinks.warranty') },
              { to: '/store-locator', label: t('footerLinks.ourOpticians') },
              { to: '/suivi-commande', label: t('footerLinks.orderTracking') },
            ]},
            { key: 'aide', title: t('nav.aide'), links: [
              { to: '/faq', label: t('footerLinks.faq') },
              { to: '/contact', label: t('footerLinks.contact') },
              { to: '/cgv', label: t('footerLinks.cgv') },
              { to: '/confidentialite', label: t('footerLinks.privacy') },
            ]},
          ].map((col) => (
            <div key={col.key} className="border-b border-white/[0.06]">
              <button
                onClick={() => setOpenAccordion(openAccordion === col.key ? null : col.key)}
                className="w-full flex items-center justify-between px-6 py-5"
              >
                <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase font-semibold">
                  {col.title}
                </h4>
                <motion.div
                  animate={{ rotate: openAccordion === col.key ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} className="text-white/25" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openAccordion === col.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="px-6 pb-6 space-y-4">
                      {col.links.map(({ to, label }) => (
                        <li key={to}>
                          <LocaleLink to={to} className="font-sans text-[13px] text-white/35 hover:text-white/60 font-light transition-colors duration-300">
                            {label}
                          </LocaleLink>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Brand — Logo + description */}
        <div className="px-6 py-16">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT%20blanc-Photoroom.png"
              alt="Renaissance Paris"
              className="h-20 w-auto object-contain mb-6"
              loading="lazy"
            />
            <p className="font-sans text-[11px] text-white/25 leading-[1.9] font-light max-w-[260px] mb-8">
              {t('footer.brandDescriptionMobile')}
            </p>

            {/* Socials */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <a href="https://instagram.com/renaissance.eyewear" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/[0.08] flex items-center justify-center hover:border-white/20 transition-colors duration-300" aria-label="Instagram">
                <Instagram size={15} className="text-white/30" />
              </a>
              <a href="https://facebook.com/renaissance.eyewear" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/[0.08] flex items-center justify-center hover:border-white/20 transition-colors duration-300" aria-label="Facebook">
                <Facebook size={15} className="text-white/30" />
              </a>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <a href="mailto:contact@renaissance-eyewear.fr" className="flex items-center justify-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-white/15" />
                <span className="font-sans text-[11px] text-white/30">contact@renaissance-eyewear.fr</span>
              </a>
              <a href="tel:+33142868200" className="flex items-center justify-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-white/15" />
                <span className="font-sans text-[11px] text-white/30">+33 1 42 86 82 00</span>
              </a>
            </div>
          </div>
        </div>

        {/* Séparateur doré */}
        <div className="h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

        {/* CTA Opticien */}
        <div className="px-6 py-8">
          <LocaleLink
            to="/store-locator"
            className="flex items-center justify-center gap-3 w-full border border-white/[0.1] py-4 hover:border-white/20 active:bg-white/[0.03] transition-all duration-300"
          >
            <MapPin className="w-4 h-4 text-white/25" />
            <span className="font-sans text-[10px] tracking-[0.2em] font-medium uppercase text-white/40">
              {t('footer.findOptician')}
            </span>
          </LocaleLink>
        </div>

        {/* Trust stats — ligne horizontale */}
        <div className="border-t border-white/[0.06] px-6 py-8">
          <div className="flex items-center justify-between">
            {[
              { number: '300', label: t('trust.editions') },
              { number: '48h', label: t('trust.delivery') },
              { number: '2 ans', label: t('trust.warranty') },
              { number: '200+', label: t('trust.opticians') },
            ].map((item, index) => (
              <div key={item.label} className="flex-1 text-center">
                {index > 0 && <div className="sr-only" />}
                <p className="font-display text-lg font-bold text-white/80 tracking-[-0.02em] leading-none mb-1">
                  {item.number}
                </p>
                <p className="font-sans text-[7px] tracking-[0.2em] text-white/20 uppercase font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="border-t border-white/[0.06] px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Visa', 'Mastercard', 'CB', 'Amex', 'Apple Pay', 'Google Pay'].map((method) => (
              <div key={method} className="h-8 px-3.5 border border-white/[0.06] flex items-center justify-center">
                <span className="font-sans text-[9px] font-semibold tracking-wider text-white/20 uppercase">{method}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Legal */}
        <div className="border-t border-white/[0.06] px-6 py-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {[
                { to: '/cgv', label: t('footerLinks.cgv') },
                { to: '/mentions-legales', label: t('footerLinks.legalNotice') },
                { to: '/confidentialite', label: t('footerLinks.privacy') },
                { to: '/cookies', label: t('footerLinks.cookies') },
              ].map(({ to, label }) => (
                <LocaleLink key={to} to={to} className="font-sans text-[10px] text-white/20 hover:text-white/40 transition-colors duration-300">
                  {label}
                </LocaleLink>
              ))}
            </div>
            <p className="font-sans text-[10px] text-white/15">
              &copy; {new Date().getFullYear()} Renaissance Paris
            </p>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 border border-white/[0.08] flex items-center justify-center hover:border-white/20 transition-all duration-300 group"
              aria-label={t('footer.backToTop')}
            >
              <ArrowUp className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
