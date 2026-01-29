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
                Le Cercle Renaissance
              </motion.p>
              <motion.h2 variants={fade} className="font-display text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
                REJOIGNEZ LA MAISON.
              </motion.h2>
              <motion.p variants={fade} className="font-display text-3xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-10">
                Accès anticipé. Invitations privées.
              </motion.p>
              <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-10" />
              <motion.p variants={fade} className="font-sans text-white/35 text-sm leading-[1.9] font-light mb-12 max-w-lg mx-auto">
                Nouvelles collections en avant-première, coulisses de l'atelier et histoires de la Maison. Rien de plus.
              </motion.p>
              <motion.div variants={fade}>
                {!subscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email"
                      required
                      className="flex-1 px-5 py-4 bg-white/[0.04] border border-white/[0.08] text-white text-sm font-sans placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-all duration-500"
                    />
                    <button
                      type="submit"
                      className="group relative overflow-hidden border border-white/20 px-8 py-4 transition-all duration-500 hover:border-white"
                    >
                      <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#000000] transition-colors duration-500 flex items-center gap-2">
                        S'inscrire
                        <ArrowRight className="w-3.5 h-3.5" />
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
              />
              <p className="font-sans text-xs text-white/30 leading-[1.9] max-w-[260px] font-light mb-10">
                Lunetterie parisienne d'exception. Cinq symboles millénaires, un savoir-faire artisanal, des éditions limitées à 300 pièces.
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
                <Link to="/store-locator" className="flex items-center gap-3 group">
                  <MapPin className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors duration-500" />
                  <span className="font-sans text-[11px] text-white/35 group-hover:text-white/60 transition-colors duration-500">
                    Trouver un opticien
                  </span>
                </Link>
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
                { title: 'Collections', links: [
                  { to: '/collections/heritage', label: 'Héritage' },
                  { to: '/collections/versailles', label: 'Versailles' },
                  { to: '/collections/isis', label: 'Isis' },
                  { to: '/shop', label: 'Toutes les créations' },
                ]},
                { title: 'La Maison', links: [
                  { to: '/histoire', label: 'Notre Histoire' },
                  { to: '/savoir-faire', label: 'Savoir-faire' },
                  { to: '/symboles', label: 'Les 5 Symboles' },
                  { to: '/blog', label: 'Le Manifeste' },
                ]},
                { title: 'Services', links: [
                  { to: '/livraison', label: 'Livraison & Retours' },
                  { to: '/garantie', label: 'Garantie 2 ans' },
                  { to: '/guide-tailles', label: 'Guide des tailles' },
                  { to: '/store-locator', label: 'Nos opticiens' },
                  { to: '/suivi-commande', label: 'Suivi de commande' },
                ]},
                { title: 'Aide', links: [
                  { to: '/faq', label: 'FAQ' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/cgv', label: 'CGV' },
                  { to: '/confidentialite', label: 'Confidentialité' },
                ]},
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3 font-semibold">{col.title}</h4>
                  <div className="w-8 h-px bg-white/10 mb-5" />
                  <ul className="space-y-3.5">
                    {col.links.map(({ to, label }) => (
                      <li key={to}>
                        <Link to={to} className="font-sans text-[12px] text-white/35 hover:text-white/70 hover:translate-x-1 transition-all duration-500 font-light inline-block">
                          {label}
                        </Link>
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
                { number: '300', label: 'Éditions', description: 'Pièces par série' },
                { number: '48h', label: 'Livraison', description: 'Express offerte' },
                { number: '2 ans', label: 'Garantie', description: 'Incluse' },
                { number: '200+', label: 'Opticiens', description: 'Partout en France' },
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
                    { to: '/cgv', label: 'CGV' },
                    { to: '/mentions-legales', label: 'Mentions légales' },
                    { to: '/confidentialite', label: 'Confidentialité' },
                    { to: '/cookies', label: 'Cookies' },
                  ].map(({ to, label }) => (
                    <Link key={to} to={to} className="font-sans text-[11px] text-white/25 hover:text-white/50 transition-colors duration-300">
                      {label}
                    </Link>
                  ))}
                </div>
                <p className="font-sans text-[11px] text-white/20">
                  &copy; {new Date().getFullYear()} Renaissance Paris
                </p>
                <button
                  onClick={scrollToTop}
                  className="w-9 h-9 border border-white/[0.08] flex items-center justify-center hover:border-white/30 hover:bg-white/[0.03] transition-all duration-500 group"
                  aria-label="Retour en haut"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-white/25 group-hover:text-white/60 transition-colors duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* MOBILE FOOTER — Kubrick symmetry        */}
      {/* ═══════════════════════════════════════ */}
      <div className="md:hidden">

        {/* Newsletter */}
        <div className="border-b border-white/[0.06] px-6 py-16">
          <div className="text-center">
            <p className="font-sans text-[8px] tracking-[0.4em] text-white/30 uppercase font-medium mb-4">
              Le Cercle Renaissance
            </p>
            <h2 className="font-display text-[26px] font-bold text-white tracking-[-0.03em] leading-[0.95] mb-2">
              REJOIGNEZ
              <br />LA MAISON.
            </h2>
            <p className="font-display text-base font-light italic text-white/45 tracking-[-0.02em] mb-6">
              Accès anticipé. Invitations privées.
            </p>
            <div className="w-10 h-px bg-white/15 mx-auto mb-6" />
            <p className="font-sans text-white/30 text-[12px] leading-[1.8] font-light mb-8 max-w-[260px] mx-auto">
              Nouvelles collections en avant-première, coulisses de l'atelier et histoires de la Maison.
            </p>

            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                  className="w-full px-5 py-4 bg-white/[0.04] border border-white/[0.08] text-white text-sm font-sans placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-all duration-500 text-center"
                />
                <button
                  type="submit"
                  className="w-full bg-white py-4"
                >
                  <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-[#000000] flex items-center justify-center gap-2">
                    S'inscrire
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </form>
            ) : (
              <div className="py-4">
                <p className="font-sans text-sm text-white font-medium">
                  Bienvenue dans le Cercle Renaissance.
                </p>
                <p className="font-sans text-xs text-white/30 mt-2">
                  Vous recevrez nos prochaines communications.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation — 2x2 centered grid */}
        <div className="border-b border-white/[0.06] px-6 py-12">
          <div className="grid grid-cols-2 gap-y-10 gap-x-6">
            {[
              { title: 'Collections', links: [
                { to: '/collections/heritage', label: 'Héritage' },
                { to: '/collections/versailles', label: 'Versailles' },
                { to: '/collections/isis', label: 'Isis' },
                { to: '/shop', label: 'Boutique' },
              ]},
              { title: 'La Maison', links: [
                { to: '/histoire', label: 'Notre Histoire' },
                { to: '/savoir-faire', label: 'Savoir-faire' },
                { to: '/symboles', label: 'Les 5 Symboles' },
                { to: '/blog', label: 'Le Manifeste' },
              ]},
              { title: 'Services', links: [
                { to: '/livraison', label: 'Livraison & Retours' },
                { to: '/garantie', label: 'Garantie 2 ans' },
                { to: '/guide-tailles', label: 'Guide des tailles' },
                { to: '/store-locator', label: 'Nos opticiens' },
                { to: '/suivi-commande', label: 'Suivi de commande' },
              ]},
              { title: 'Aide', links: [
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact' },
                { to: '/cgv', label: 'CGV' },
                { to: '/confidentialite', label: 'Confidentialité' },
              ]},
            ].map((col) => (
              <div key={col.title} className="text-center">
                <h4 className="font-sans text-[9px] tracking-[0.3em] text-white/40 uppercase mb-4 font-medium">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to} className="font-sans text-[12px] text-white/30 font-light">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Brand — Big centered logo */}
        <div className="border-b border-white/[0.06] px-6 py-14">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT%20blanc-Photoroom.png"
              alt="Renaissance Paris"
              className="h-32 w-auto object-contain mb-6"
            />
            <p className="font-sans text-[11px] text-white/25 leading-[1.8] font-light max-w-[240px] mb-8">
              Lunetterie parisienne d'exception. Savoir-faire artisanal, éditions limitées à 300 pièces.
            </p>

            {/* Contact centered */}
            <div className="space-y-3 mb-8">
              <a href="mailto:contact@renaissance-eyewear.fr" className="flex items-center justify-center gap-2.5">
                <Mail className="w-3 h-3 text-white/20" />
                <span className="font-sans text-[10px] text-white/30">contact@renaissance-eyewear.fr</span>
              </a>
              <a href="tel:+33142868200" className="flex items-center justify-center gap-2.5">
                <Phone className="w-3 h-3 text-white/20" />
                <span className="font-sans text-[10px] text-white/30">+33 1 42 86 82 00</span>
              </a>
            </div>

            {/* Socials centered */}
            <div className="flex items-center justify-center gap-3">
              <a href="https://instagram.com/renaissance.eyewear" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/[0.08] flex items-center justify-center" aria-label="Instagram">
                <Instagram size={14} className="text-white/30" />
              </a>
              <a href="https://facebook.com/renaissance.eyewear" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/[0.08] flex items-center justify-center" aria-label="Facebook">
                <Facebook size={14} className="text-white/30" />
              </a>
            </div>
          </div>
        </div>

        {/* Trust stats — 2x2 centered */}
        <div className="border-b border-white/[0.06] px-6 py-10">
          <div className="grid grid-cols-2 gap-0">
            {[
              { number: '300', label: 'Éditions' },
              { number: '48h', label: 'Livraison' },
              { number: '2 ans', label: 'Garantie' },
              { number: '200+', label: 'Opticiens' },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`text-center py-5 ${
                  index % 2 !== 0 ? 'border-l border-white/[0.06]' : ''
                } ${index >= 2 ? 'border-t border-white/[0.06]' : ''}`}
              >
                <p className="font-display text-2xl font-bold text-white tracking-[-0.02em] leading-none mb-1">
                  {item.number}
                </p>
                <p className="font-sans text-[8px] tracking-[0.25em] text-white/25 uppercase font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment centered */}
        <div className="border-b border-white/[0.06] px-6 py-8">
          <div className="grid grid-cols-3 gap-2.5">
            {['Visa', 'Mastercard', 'CB', 'Amex', 'Apple Pay', 'Google Pay'].map((method) => (
              <div key={method} className="h-10 border border-white/[0.08] flex items-center justify-center">
                <span className="font-sans text-[10px] font-semibold tracking-wider text-white/30 uppercase">{method}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Legal centered */}
        <div className="px-6 py-6">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {[
                { to: '/cgv', label: 'CGV' },
                { to: '/mentions-legales', label: 'Mentions légales' },
                { to: '/confidentialite', label: 'Confidentialité' },
                { to: '/cookies', label: 'Cookies' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="font-sans text-[9px] text-white/20">
                  {label}
                </Link>
              ))}
            </div>
            <p className="font-sans text-[9px] text-white/15">
              &copy; {new Date().getFullYear()} Renaissance Paris &mdash; Tous droits réservés
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
