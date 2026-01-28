import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

export default function ProductFooter() {
  return (
    <footer className="bg-dark-text text-white">

      {/* Main content — padding-left accounts for sidebar on desktop */}
      <div className="px-6 md:px-10 lg:pl-[380px] laptop:pl-[420px] xl:pl-[520px] lg:pr-12 xl:pr-16 pt-10 pb-6">

        {/* Top row — Logo + Social */}
        <div className="flex items-center justify-between mb-8">
          <img
            src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png"
            alt="Renaissance Eyewear"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/renaissance.eyewear"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 border border-white/15 flex items-center justify-center hover:border-bronze transition-colors"
            >
              <Instagram size={12} className="text-white/50" />
            </a>
            <a
              href="https://facebook.com/renaissance.eyewear"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 border border-white/15 flex items-center justify-center hover:border-bronze transition-colors"
            >
              <Facebook size={12} className="text-white/50" />
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-white/8 mb-6" />

        {/* Links — compact inline rows */}
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-sans text-[8px] tracking-[0.3em] text-bronze uppercase font-bold mb-2.5">Collections</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Link to="/collections/heritage" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Héritage</Link>
              <Link to="/collections/versailles" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Versailles</Link>
              <Link to="/collections/isis" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Isis</Link>
              <Link to="/shop" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Boutique</Link>
            </div>
          </div>
          <div>
            <p className="font-sans text-[8px] tracking-[0.3em] text-bronze uppercase font-bold mb-2.5">La Maison</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Link to="/histoire" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Histoire</Link>
              <Link to="/symboles" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Symboles</Link>
              <Link to="/opticiens" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Opticiens</Link>
              <Link to="/contact" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <p className="font-sans text-[8px] tracking-[0.3em] text-bronze uppercase font-bold mb-2.5">Aide</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Link to="/faq" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">FAQ</Link>
              <Link to="/livraison" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Livraison</Link>
              <Link to="/garantie" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">Garantie</Link>
              <Link to="/cgv" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">CGV</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="px-6 md:px-10 lg:pl-[380px] laptop:pl-[420px] xl:pl-[520px] lg:pr-12 xl:pr-16 py-4 border-t border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-sans text-white/20 text-[10px] font-light">
            © 2025 Renaissance Eyewear
          </p>
          <div className="flex gap-4">
            <Link to="/mentions-legales" className="font-sans text-white/20 hover:text-white/40 text-[10px] transition-colors font-light">
              Mentions légales
            </Link>
            <Link to="/confidentialite" className="font-sans text-white/20 hover:text-white/40 text-[10px] transition-colors font-light">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
