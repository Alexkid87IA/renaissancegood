import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white relative overflow-hidden">

      {/* ── Brand moment ── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28 lg:py-32 flex flex-col items-center text-center">

          {/* Top line */}
          <div className="w-10 h-px bg-white/10 mb-10 md:mb-12" />

          {/* Logo image */}
          <img
            src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT%20blanc-Photoroom.png"
            alt="Renaissance Paris"
            className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto object-contain mb-3"
          />
          <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.35em] text-white/25 uppercase font-medium mb-6 md:mb-8">
            Paris
          </p>

          {/* Tagline */}
          <p className="font-display text-sm sm:text-base md:text-lg font-light italic text-white/25 tracking-[-0.01em]">
            Pour que chaque jour compte.
          </p>

          {/* Bottom line */}
          <div className="w-10 h-px bg-white/10 mt-10 md:mt-12" />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 pt-14 md:pt-20 lg:pt-24 pb-12 md:pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[260px_1fr] gap-12 lg:gap-24">

          {/* Left — R logo with glassmorphism + description + socials */}
          <div>
            {/* R logo in glassmorphism circle */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 mb-8 flex items-center justify-center">
              {/* Outer circle */}
              <div className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md" />
              {/* Inner circle */}
              <div className="absolute inset-2 md:inset-3 rounded-full border border-white/[0.05]" />
              {/* R logo */}
              <img
                src="https://renaissance-cdn.b-cdn.net/LOGO%20R%20TRANSPARENT.png"
                alt="Renaissance Paris"
                className="relative w-[55%] h-[55%] object-contain invert opacity-80"
              />
            </div>

            <p className="font-sans text-[11px] md:text-xs text-white/30 leading-[1.8] max-w-[240px] font-light">
              Lunetterie française d'exception. Symboles intemporels, savoir-faire artisanal, éditions limitées.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://instagram.com/renaissance.eyewear"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/[0.08] flex items-center justify-center hover:border-bronze/50 hover:bg-white/[0.03] transition-all duration-500"
                aria-label="Instagram"
              >
                <Instagram size={14} className="text-white/35" />
              </a>
              <a
                href="https://facebook.com/renaissance.eyewear"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/[0.08] flex items-center justify-center hover:border-bronze/50 hover:bg-white/[0.03] transition-all duration-500"
                aria-label="Facebook"
              >
                <Facebook size={14} className="text-white/35" />
              </a>
            </div>
          </div>

          {/* Right — 3 link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-10 lg:gap-16">

            {/* Collections */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/60 uppercase mb-6 font-semibold">
                Collections
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/collections/heritage" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Héritage
                  </Link>
                </li>
                <li>
                  <Link to="/collections/versailles" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Versailles
                  </Link>
                </li>
                <li>
                  <Link to="/collections/isis" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Isis
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Toutes les créations
                  </Link>
                </li>
              </ul>
            </div>

            {/* La Maison */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/60 uppercase mb-6 font-semibold">
                La Maison
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/histoire" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Notre Histoire
                  </Link>
                </li>
                <li>
                  <Link to="/savoir-faire" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Savoir-faire
                  </Link>
                </li>
                <li>
                  <Link to="/symboles" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Les 5 Symboles
                  </Link>
                </li>
                <li>
                  <Link to="/store-locator" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Trouver un opticien
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Journal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Aide */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-sans text-[10px] tracking-[0.3em] text-white/60 uppercase mb-6 font-semibold">
                Aide
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/faq" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/livraison" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Livraison & Retours
                  </Link>
                </li>
                <li>
                  <Link to="/garantie" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Garantie 2 ans
                  </Link>
                </li>
                <li>
                  <Link to="/guide-tailles" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    Guide des tailles
                  </Link>
                </li>
                <li>
                  <a href="mailto:contact@renaissance-eyewear.fr" className="font-sans text-[13px] text-white/40 hover:text-bronze transition-colors duration-500 font-light">
                    contact@renaissance-eyewear.fr
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Payment methods */}
            <div className="flex flex-wrap items-center gap-2.5">
              {['Visa', 'Mastercard', 'CB', 'Amex', 'Apple Pay', 'PayPal'].map((method) => (
                <div key={method} className="h-7 px-3 border border-white/15 rounded-sm flex items-center justify-center">
                  <span className="font-sans text-[9px] font-semibold tracking-wider text-white/60 uppercase">{method}</span>
                </div>
              ))}
            </div>

            {/* Legal links + copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                <Link to="/cgv" className="font-sans text-[10px] text-white/40 hover:text-white/70 transition-colors duration-300">
                  CGV
                </Link>
                <Link to="/mentions-legales" className="font-sans text-[10px] text-white/40 hover:text-white/70 transition-colors duration-300">
                  Mentions légales
                </Link>
                <Link to="/confidentialite" className="font-sans text-[10px] text-white/40 hover:text-white/70 transition-colors duration-300">
                  Confidentialité
                </Link>
                <Link to="/cookies" className="font-sans text-[10px] text-white/40 hover:text-white/70 transition-colors duration-300">
                  Cookies
                </Link>
              </div>
              <p className="font-sans text-[10px] text-white/35">
                &copy; {new Date().getFullYear()} Renaissance Paris
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
