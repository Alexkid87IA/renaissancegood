import { Instagram, Facebook, Mail, MapPin, Phone, Shield, Truck, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-gradient-to-b from-white to-beige/30 border-t border-bronze/10">
      {/* Newsletter Section */}
      <div className="border-b border-bronze/10 bg-white/50">
        <div className="max-w-[1800px] mx-auto px-6 laptop:px-10 py-8 laptop:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="font-serif text-xl laptop:text-2xl text-dark-text mb-2 laptop:mb-4">
              Rejoignez le Cercle Renaissance
            </h3>
            <p className="font-sans text-xs laptop:text-[15px] text-dark-text/60 mb-4 laptop:mb-6 tracking-wide">
              Recevez en exclusivité nos nouvelles créations
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 laptop:gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-1 px-4 py-2.5 laptop:py-3.5 border border-bronze/20 bg-white/80 text-xs laptop:text-[15px] font-sans focus:outline-none focus:border-bronze transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-5 laptop:px-6 py-2.5 laptop:py-3.5 bg-bronze text-white font-sans text-xs laptop:text-[14px] tracking-wider hover:bg-bronze/90 transition-colors"
              >
                {isSubscribed ? 'Inscrit ✓' : 'S\'inscrire'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1800px] mx-auto px-6 laptop:px-10 py-8 laptop:py-12">
        {/* Logo & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 laptop:mb-12"
        >
          <img
            src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1766502526/6c20430c-e6c7-41d2-b451-8717d92026d9_l19hau.png"
            alt="Renaissance Eyewear"
            className="h-16 laptop:h-28 w-auto object-contain mb-3 laptop:mb-6 mx-auto"
          />
          <p className="font-serif text-sm laptop:text-[17px] text-dark-text/70 max-w-2xl mx-auto mb-4 laptop:mb-6 italic">
            Pour que chaque jour compte.
          </p>

          {/* Social Media */}
          <div className="flex gap-2.5 laptop:gap-4 justify-center">
            <motion.a
              whileHover={{ y: -2 }}
              href="https://instagram.com/renaissance.eyewear"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 laptop:w-11 h-9 laptop:h-11 border border-bronze/20 flex items-center justify-center hover:border-bronze hover:bg-bronze/5 transition-all group"
            >
              <Instagram size={14} className="text-dark-text/50 group-hover:text-bronze transition-colors laptop:w-[17px] laptop:h-[17px]" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="https://facebook.com/renaissance.eyewear"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 laptop:w-11 h-9 laptop:h-11 border border-bronze/20 flex items-center justify-center hover:border-bronze hover:bg-bronze/5 transition-all group"
            >
              <Facebook size={14} className="text-dark-text/50 group-hover:text-bronze transition-colors laptop:w-[17px] laptop:h-[17px]" />
            </motion.a>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center laptop:justify-between gap-4 md:gap-6 laptop:gap-8 mb-8 laptop:mb-12 pb-8 laptop:pb-12 border-b border-bronze/10">
          {[
            { icon: MapPin, text: '200+ Opticiens' },
            { icon: Truck, text: 'Livraison Offerte' },
            { icon: Award, text: 'Garantie 2 ans' },
            { icon: Shield, text: 'Paiement Sécurisé' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center md:flex-1 md:min-w-[140px] md:max-w-[200px]"
            >
              <div className="w-12 laptop:w-14 h-12 laptop:h-14 rounded-full bg-bronze/5 flex items-center justify-center mb-2 laptop:mb-3">
                <item.icon size={18} className="text-bronze laptop:w-[22px] laptop:h-[22px]" />
              </div>
              <p className="font-sans text-[11px] laptop:text-[13px] text-dark-text/60 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-8 laptop:mb-12">
          {/* Boutique */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <h4 className="font-sans text-[10px] laptop:text-[11px] tracking-[0.3em] mb-4 laptop:mb-5 font-bold text-dark-text uppercase">
              Boutique
            </h4>
            <ul className="space-y-2.5 laptop:space-y-3">
              <li>
                <Link to="/shop" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Toutes les Créations
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=heritage" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Collection Héritage
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=versailles" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Collection Versailles
                </Link>
              </li>
              <li>
                <Link to="/opticiens" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Trouver un Opticien
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Le Magazine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <h4 className="font-sans text-[10px] laptop:text-[11px] tracking-[0.3em] mb-4 laptop:mb-5 font-bold text-dark-text uppercase">
              La Maison
            </h4>
            <ul className="space-y-2.5 laptop:space-y-3">
              <li>
                <Link to="/histoire" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/manifesto" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Manifeste
                </Link>
              </li>
              <li>
                <Link to="/savoir-faire" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Savoir-Faire
                </Link>
              </li>
              <li>
                <Link to="/symboles" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Les 5 Symboles
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Service Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <h4 className="font-sans text-[10px] laptop:text-[11px] tracking-[0.3em] mb-4 laptop:mb-5 font-bold text-dark-text uppercase">
              Service Client
            </h4>
            <ul className="space-y-2.5 laptop:space-y-3">
              <li>
                <Link to="/faq" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link to="/garantie" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Garantie
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light block">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <h4 className="font-sans text-[10px] laptop:text-[11px] tracking-[0.3em] mb-4 laptop:mb-5 font-bold text-dark-text uppercase">
              Contact
            </h4>
            <ul className="space-y-2.5 laptop:space-y-3">
              <li className="flex items-start gap-2 justify-center sm:justify-start">
                <Mail size={14} className="text-bronze mt-0.5 flex-shrink-0 laptop:w-[14px] laptop:h-[14px]" />
                <a
                  href="mailto:contact@renaissance-eyewear.fr"
                  className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light break-all"
                >
                  contact@renaissance.fr
                </a>
              </li>
              <li className="flex items-start gap-2 justify-center sm:justify-start">
                <Phone size={14} className="text-bronze mt-0.5 flex-shrink-0 laptop:w-[14px] laptop:h-[14px]" />
                <a
                  href="tel:+33142868200"
                  className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-[13px] laptop:text-[15px] font-light"
                >
                  +33 1 42 86 82 00
                </a>
              </li>
              <li className="flex items-start gap-2 justify-center sm:justify-start">
                <MapPin size={14} className="text-bronze mt-0.5 flex-shrink-0 laptop:w-[14px] laptop:h-[14px]" />
                <span className="font-sans text-dark-text/60 text-[13px] laptop:text-[15px] font-light">
                  Paris, France
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-bronze/10 pt-6 laptop:pt-8">
          <div className="flex flex-col laptop:flex-row justify-between items-center gap-4 laptop:gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-sans text-dark-text/50 text-[11px] laptop:text-[13px] font-light tracking-wider"
            >
              © 2025 Renaissance Eyewear
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 laptop:gap-6"
            >
              <Link to="/mentions-legales" className="font-sans text-dark-text/50 hover:text-bronze text-[11px] laptop:text-[13px] transition-colors font-light tracking-wider">
                Mentions
              </Link>
              <Link to="/confidentialite" className="font-sans text-dark-text/50 hover:text-bronze text-[11px] laptop:text-[13px] transition-colors font-light tracking-wider">
                Confidentialité
              </Link>
              <Link to="/cgv" className="font-sans text-dark-text/50 hover:text-bronze text-[11px] laptop:text-[13px] transition-colors font-light tracking-wider">
                CGV
              </Link>
              <Link to="/cookies" className="font-sans text-dark-text/50 hover:text-bronze text-[11px] laptop:text-[13px] transition-colors font-light tracking-wider">
                Cookies
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}