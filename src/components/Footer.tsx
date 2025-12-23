import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark-text text-white">
      
      {/* Main Footer */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        
        {/* Top Section - Logo + Tagline */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-20 mb-16 pb-16 border-b border-white/10">
          
          {/* Logo & Description */}
          <div className="lg:max-w-md">
            <img
              src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1766502526/6c20430c-e6c7-41d2-b451-8717d92026d9_l19hau.png"
              alt="Renaissance Eyewear"
              className="h-16 md:h-20 w-auto object-contain mb-6 brightness-0 invert"
            />
            <img
              src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1764956518/4064a921-64ab-455f-a852-c349da46d95a_mlfxhm.png"
              alt="Pour que chaque jour compte"
              className="h-10 md:h-12 w-auto object-contain mb-6 opacity-70"
            />
            <p className="font-sans text-sm text-white/50 font-light leading-relaxed">
              Lunetterie française d'exception. Symboles intemporels, savoir-faire artisanal, éditions limitées.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
            
            {/* Collections */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] mb-6 font-bold text-bronze uppercase">
                Collections
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/collections/heritage" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Héritage
                  </Link>
                </li>
                <li>
                  <Link to="/collections/versailles" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Versailles
                  </Link>
                </li>
                <li>
                  <Link to="/collections/isis" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Isis
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Toutes les créations
                  </Link>
                </li>
              </ul>
            </div>

            {/* La Maison */}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] mb-6 font-bold text-bronze uppercase">
                La Maison
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/histoire" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Notre Histoire
                  </Link>
                </li>
                <li>
                  <Link to="/symboles" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Les 5 Symboles
                  </Link>
                </li>
                <li>
                  <Link to="/opticiens" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Trouver un opticien
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Aide */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-sans text-[10px] tracking-[0.3em] mb-6 font-bold text-bronze uppercase">
                Aide
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/faq" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/livraison" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Livraison & Retours
                  </Link>
                </li>
                <li>
                  <Link to="/garantie" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    Garantie 2 ans
                  </Link>
                </li>
                <li>
                  <Link to="/cgv" className="font-sans text-white/60 hover:text-bronze transition-colors text-sm font-light">
                    CGV
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          
          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <a
              href="mailto:contact@renaissance-eyewear.fr"
              className="flex items-center gap-2 group"
            >
              <Mail size={14} className="text-bronze" />
              <span className="font-sans text-white/60 group-hover:text-bronze transition-colors text-sm font-light">
                contact@renaissance-eyewear.fr
              </span>
            </a>
            <a
              href="tel:+33142868200"
              className="flex items-center gap-2 group"
            >
              <Phone size={14} className="text-bronze" />
              <span className="font-sans text-white/60 group-hover:text-bronze transition-colors text-sm font-light">
                +33 1 42 86 82 00
              </span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-bronze" />
              <span className="font-sans text-white/60 text-sm font-light">
                Paris, France
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <span className="font-sans text-white/40 text-xs tracking-wider uppercase">Suivez-nous</span>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ y: -2 }}
                href="https://instagram.com/renaissance.eyewear"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-bronze hover:bg-bronze/10 transition-all"
              >
                <Instagram size={16} className="text-white/70 hover:text-bronze" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://facebook.com/renaissance.eyewear"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-bronze hover:bg-bronze/10 transition-all"
              >
                <Facebook size={16} className="text-white/70 hover:text-bronze" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-sans text-white/30 text-xs font-light tracking-wider">
              © 2025 Renaissance Eyewear. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/mentions-legales" className="font-sans text-white/30 hover:text-white/60 text-xs transition-colors font-light">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="font-sans text-white/30 hover:text-white/60 text-xs transition-colors font-light">
                Confidentialité
              </Link>
              <Link to="/cookies" className="font-sans text-white/30 hover:text-white/60 text-xs transition-colors font-light">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}