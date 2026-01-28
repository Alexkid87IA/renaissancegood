import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowUp, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { stagger, fade } from './shared';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const newsletterRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const newsletterInView = useInView(newsletterRef, { once: true, amount: 0.2 });
  const mainInView = useInView(mainRef, { once: true, amount: 0.15 });
  const trustInView = useInView(trustRef, { once: true, amount: 0.3 });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] text-white relative overflow-hidden">

      {/* ── Newsletter Section ── */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-28 lg:py-32">
          <motion.div
            ref={newsletterRef}
            variants={stagger}
            initial="hidden"
            animate={newsletterInView ? "visible" : "hidden"}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.p variants={fade} className="font-sans text-[9px] tracking-[0.4em] text-white/30 uppercase font-medium mb-4">
              Le Cercle Renaissance
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              REJOIGNEZ LA MAISON.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-xl sm:text-2xl md:text-3xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 md:mb-10">
              Accès anticipé. Invitations privées.
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-8 md:mb-10" />

            <motion.p variants={fade} className="font-sans text-white/35 text-[13px] md:text-sm leading-[1.9] font-light mb-10 md:mb-12 max-w-lg mx-auto">
              Nouvelles collections en avant-première, coulisses de l'atelier et histoires de la Maison. Rien de plus.
            </motion.p>

            <motion.div variants={fade}>
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
                    className="group relative overflow-hidden border border-white/20 px-8 py-4 transition-all duration-500 hover:border-bronze/60"
                  >
                    <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500 flex items-center justify-center gap-2">
                      S'inscrire
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="py-4"
                >
                  <p className="font-sans text-sm text-bronze font-medium">
                    Bienvenue dans le Cercle Renaissance.
                  </p>
                  <p className="font-sans text-xs text-white/30 mt-2">
                    Vous recevrez nos prochaines communications.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 pt-16 md:pt-24 pb-14 md:pb-20">
        <motion.div
          ref={mainRef}
          variants={stagger}
          initial="hidden"
          animate={mainInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_1fr] gap-14 lg:gap-20"
        >

          {/* Left — Brand */}
          <motion.div variants={fade}>
            <img
              src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT%20blanc-Photoroom.png"
              alt="Renaissance Paris"
              className="h-5 sm:h-6 w-auto object-contain mb-8"
            />

            <p className="font-sans text-[11px] md:text-xs text-white/30 leading-[1.9] max-w-[260px] font-light mb-10">
              Lunetterie parisienne d'exception. Cinq symboles millénaires, un savoir-faire artisanal, des éditions limitées à 300 pièces.
            </p>

            {/* Contact info */}
            <div className="space-y-3.5 mb-10">
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
          </motion.div>

          {/* Right — 4 link columns */}
          <motion.div variants={fade} className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-6 lg:gap-10">

            {/* Collections */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3 font-semibold">
                Collections
              </h4>
              <div className="w-8 h-px bg-white/10 mb-5" />
              <ul className="space-y-3.5">
                {[
                  { to: '/collections/heritage', label: 'Héritage' },
                  { to: '/collections/versailles', label: 'Versailles' },
                  { to: '/collections/isis', label: 'Isis' },
                  { to: '/shop', label: 'Toutes les créations' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="font-sans text-[12px] text-white/35 hover:text-bronze hover:translate-x-1 transition-all duration-500 font-light inline-block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* La Maison */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3 font-semibold">
                La Maison
              </h4>
              <div className="w-8 h-px bg-white/10 mb-5" />
              <ul className="space-y-3.5">
                {[
                  { to: '/histoire', label: 'Notre Histoire' },
                  { to: '/savoir-faire', label: 'Savoir-faire' },
                  { to: '/symboles', label: 'Les 5 Symboles' },
                  { to: '/blog', label: 'Le Manifeste' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="font-sans text-[12px] text-white/35 hover:text-bronze hover:translate-x-1 transition-all duration-500 font-light inline-block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3 font-semibold">
                Services
              </h4>
              <div className="w-8 h-px bg-white/10 mb-5" />
              <ul className="space-y-3.5">
                {[
                  { to: '/livraison', label: 'Livraison & Retours' },
                  { to: '/garantie', label: 'Garantie 2 ans' },
                  { to: '/guide-tailles', label: 'Guide des tailles' },
                  { to: '/store-locator', label: 'Nos opticiens' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="font-sans text-[12px] text-white/35 hover:text-bronze hover:translate-x-1 transition-all duration-500 font-light inline-block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aide */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3 font-semibold">
                Aide
              </h4>
              <div className="w-8 h-px bg-white/10 mb-5" />
              <ul className="space-y-3.5">
                {[
                  { to: '/faq', label: 'FAQ' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/cgv', label: 'CGV' },
                  { to: '/confidentialite', label: 'Confidentialité' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="font-sans text-[12px] text-white/35 hover:text-bronze hover:translate-x-1 transition-all duration-500 font-light inline-block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
        </motion.div>
      </div>

      {/* ── Trust & Engagements ── */}
      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-10 md:py-14">
          <motion.div
            ref={trustRef}
            variants={stagger}
            initial="hidden"
            animate={trustInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          >
            {[
              { number: '300', label: 'Éditions', description: 'Pièces par série' },
              { number: '48h', label: 'Livraison', description: 'Express offerte' },
              { number: '2 ans', label: 'Garantie', description: 'Incluse' },
              { number: '200+', label: 'Opticiens', description: 'Partout en France' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                variants={fade}
                className={`py-6 lg:py-0 lg:pr-10 xl:pr-14 ${
                  index > 0 ? 'lg:pl-10 xl:pl-14 lg:border-l lg:border-white/[0.07]' : ''
                } ${index >= 2 ? 'border-t lg:border-t-0 border-white/[0.07]' : ''} ${
                  index === 1 ? 'border-l border-white/[0.07] pl-6 sm:pl-8 lg:pl-10 xl:pl-14' : ''
                } ${index === 3 ? 'border-l border-white/[0.07] pl-6 sm:pl-8 lg:pl-10 xl:pl-14' : ''}`}
              >
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-[-0.02em] leading-none mb-2">
                  {item.number}
                </p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-white/25 uppercase font-medium mb-2">
                  {item.label}
                </p>
                <p className="font-sans text-xs text-white/40 font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-6 md:py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            {/* Payment methods */}
            <div className="flex flex-wrap items-center gap-2">
              {['Visa', 'Mastercard', 'CB', 'Amex', 'Apple Pay', 'Google Pay'].map((method) => (
                <div key={method} className="h-6 px-2.5 border border-white/[0.06] flex items-center justify-center">
                  <span className="font-sans text-[8px] font-semibold tracking-wider text-white/30 uppercase">{method}</span>
                </div>
              ))}
            </div>

            {/* Legal + copyright + back to top */}
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
              <button
                onClick={scrollToTop}
                className="hidden md:flex w-9 h-9 border border-white/[0.08] items-center justify-center hover:border-bronze/40 hover:bg-white/[0.03] transition-all duration-500 group ml-auto"
                aria-label="Retour en haut"
              >
                <ArrowUp className="w-3.5 h-3.5 text-white/25 group-hover:text-white/60 transition-colors duration-500" />
              </button>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}
