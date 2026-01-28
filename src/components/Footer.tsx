import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowUp, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-[#0a0a0a] text-white relative overflow-hidden">

      {/* ── Subtle background texture ── */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute left-[15%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[85%] top-0 bottom-0 w-px bg-white" />
      </div>

      {/* ── Newsletter Section ── */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-sans text-[9px] tracking-[0.4em] text-bronze/60 uppercase font-medium mb-4">
                Le Cercle Renaissance
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] mb-3">
                Rejoignez la Maison
              </h2>
              <p className="font-sans text-sm md:text-base text-white/30 leading-relaxed font-light mb-8 md:mb-10 max-w-lg mx-auto">
                Accès anticipé aux nouvelles collections, invitations privées et histoires de l'atelier.
              </p>

              {!subscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    required
                    className="flex-1 px-5 py-4 bg-white/[0.04] border border-white/[0.08] text-white text-sm font-sans placeholder:text-white/25 focus:outline-none focus:border-bronze/40 transition-all duration-500"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-dark-text font-sans text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-bronze hover:text-white transition-all duration-500 flex items-center justify-center gap-2"
                  >
                    <span>S'inscrire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4"
                >
                  <p className="font-sans text-sm text-bronze font-medium">
                    Bienvenue dans le Cercle Renaissance.
                  </p>
                  <p className="font-sans text-xs text-white/30 mt-1">
                    Vous recevrez nos prochaines communications.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 5 Symbols Band ── */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-12">
          <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 lg:gap-20">
            {[
              { name: 'Trident', src: 'https://renaissance-cdn.b-cdn.net/TRIDENT%20SYMBOL.png', meaning: 'Pouvoir' },
              { name: 'Fleur de Lys', src: 'https://renaissance-cdn.b-cdn.net/FLEUR%20DE%20LYS%20SYMBOL.png', meaning: 'Exigence' },
              { name: 'Cobra', src: 'https://renaissance-cdn.b-cdn.net/COBRA%20SYMBOL.png', meaning: 'Protection' },
              { name: 'Ankh', src: 'https://renaissance-cdn.b-cdn.net/ANKH%20SYMBOL.png', meaning: 'Éternité' },
              { name: 'Scarabée', src: 'https://renaissance-cdn.b-cdn.net/SCARABEE%20SYMBOL.png', meaning: 'Renaissance' },
            ].map((symbol, i) => (
              <motion.div
                key={symbol.name}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-2.5 group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center">
                  <img
                    src={symbol.src}
                    alt={symbol.name}
                    className="w-full h-full object-contain invert opacity-25 group-hover:opacity-50 transition-opacity duration-500"
                  />
                </div>
                <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] text-white/20 uppercase hidden sm:block group-hover:text-white/40 transition-colors duration-500">
                  {symbol.meaning}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 pt-14 md:pt-20 lg:pt-24 pb-12 md:pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">

          {/* Left — Brand */}
          <div>
            {/* Logo */}
            <img
              src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT%20blanc-Photoroom.png"
              alt="Renaissance Paris"
              className="h-5 sm:h-6 w-auto object-contain mb-6"
            />

            <p className="font-sans text-[11px] md:text-xs text-white/30 leading-[1.9] max-w-[260px] font-light mb-8">
              Lunetterie parisienne d'exception. Cinq symboles millénaires, un savoir-faire artisanal, des éditions limitées à 300 pièces.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <a href="mailto:contact@renaissance-eyewear.fr" className="flex items-center gap-3 group">
                <Mail className="w-3.5 h-3.5 text-white/20 group-hover:text-bronze/60 transition-colors duration-500" />
                <span className="font-sans text-[11px] text-white/35 group-hover:text-white/60 transition-colors duration-500">
                  contact@renaissance-eyewear.fr
                </span>
              </a>
              <a href="tel:+33142868200" className="flex items-center gap-3 group">
                <Phone className="w-3.5 h-3.5 text-white/20 group-hover:text-bronze/60 transition-colors duration-500" />
                <span className="font-sans text-[11px] text-white/35 group-hover:text-white/60 transition-colors duration-500">
                  +33 1 42 86 82 00
                </span>
              </a>
              <Link to="/store-locator" className="flex items-center gap-3 group">
                <MapPin className="w-3.5 h-3.5 text-white/20 group-hover:text-bronze/60 transition-colors duration-500" />
                <span className="font-sans text-[11px] text-white/35 group-hover:text-white/60 transition-colors duration-500">
                  Trouver un opticien
                </span>
              </Link>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com/renaissance.eyewear"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/[0.08] flex items-center justify-center hover:border-bronze/40 hover:bg-white/[0.03] transition-all duration-500"
                aria-label="Instagram"
              >
                <Instagram size={14} className="text-white/35" />
              </a>
              <a
                href="https://facebook.com/renaissance.eyewear"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/[0.08] flex items-center justify-center hover:border-bronze/40 hover:bg-white/[0.03] transition-all duration-500"
                aria-label="Facebook"
              >
                <Facebook size={14} className="text-white/35" />
              </a>
            </div>
          </div>

          {/* Right — 4 link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-6 lg:gap-10">

            {/* Collections */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-5 md:mb-6 font-semibold">
                Collections
              </h4>
              <ul className="space-y-3">
                {[
                  { to: '/collections/heritage', label: 'Héritage' },
                  { to: '/collections/versailles', label: 'Versailles' },
                  { to: '/collections/isis', label: 'Isis' },
                  { to: '/shop', label: 'Toutes les créations' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="font-sans text-[12px] text-white/35 hover:text-bronze transition-colors duration-500 font-light">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* La Maison */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-5 md:mb-6 font-semibold">
                La Maison
              </h4>
              <ul className="space-y-3">
                {[
                  { to: '/histoire', label: 'Notre Histoire' },
                  { to: '/savoir-faire', label: 'Savoir-faire' },
                  { to: '/symboles', label: 'Les 5 Symboles' },
                  { to: '/blog', label: 'Le Manifeste' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="font-sans text-[12px] text-white/35 hover:text-bronze transition-colors duration-500 font-light">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-5 md:mb-6 font-semibold">
                Services
              </h4>
              <ul className="space-y-3">
                {[
                  { to: '/livraison', label: 'Livraison & Retours' },
                  { to: '/garantie', label: 'Garantie 2 ans' },
                  { to: '/guide-tailles', label: 'Guide des tailles' },
                  { to: '/store-locator', label: 'Nos opticiens' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="font-sans text-[12px] text-white/35 hover:text-bronze transition-colors duration-500 font-light">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aide */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-5 md:mb-6 font-semibold">
                Aide
              </h4>
              <ul className="space-y-3">
                {[
                  { to: '/faq', label: 'FAQ' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/cgv', label: 'CGV' },
                  { to: '/confidentialite', label: 'Confidentialité' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="font-sans text-[12px] text-white/35 hover:text-bronze transition-colors duration-500 font-light">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Trust & Engagements ── */}
      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: 'Fabrication', value: 'Artisanale française' },
              { label: 'Éditions', value: 'Limitées à 300 pièces' },
              { label: 'Livraison', value: 'Express 48h offerte*' },
              { label: 'Garantie', value: '2 ans incluse' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center md:text-left">
                <p className="font-sans text-[9px] tracking-[0.2em] text-white/20 uppercase mb-1">{label}</p>
                <p className="font-sans text-[11px] text-white/45 font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 py-6 md:py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            {/* Payment methods */}
            <div className="flex flex-wrap items-center gap-2">
              {['Visa', 'Mastercard', 'CB', 'Amex', 'Apple Pay', 'Google Pay'].map((method) => (
                <div key={method} className="h-6 px-2.5 border border-white/[0.08] rounded-sm flex items-center justify-center">
                  <span className="font-sans text-[8px] font-semibold tracking-wider text-white/40 uppercase">{method}</span>
                </div>
              ))}
            </div>

            {/* Legal + copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {[
                  { to: '/cgv', label: 'CGV' },
                  { to: '/mentions-legales', label: 'Mentions légales' },
                  { to: '/confidentialite', label: 'Confidentialité' },
                  { to: '/cookies', label: 'Cookies' },
                ].map(({ to, label }) => (
                  <Link key={to} to={to} className="font-sans text-[9px] text-white/25 hover:text-white/50 transition-colors duration-300">
                    {label}
                  </Link>
                ))}
              </div>
              <p className="font-sans text-[9px] text-white/20">
                &copy; {new Date().getFullYear()} Renaissance Paris &mdash; Tous droits réservés
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Back to top ── */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 md:bottom-7 md:right-10 lg:right-16 w-10 h-10 border border-white/[0.08] flex items-center justify-center hover:border-bronze/40 hover:bg-white/[0.03] transition-all duration-500 group"
        aria-label="Retour en haut"
      >
        <ArrowUp className="w-4 h-4 text-white/25 group-hover:text-white/60 transition-colors duration-500" />
      </button>

    </footer>
  );
}
