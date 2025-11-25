import { Instagram, Facebook, Mail, MapPin, Phone, Shield, Truck, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Intégrer avec votre système d'emailing
    console.log('Newsletter signup:', email);
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gradient-to-b from-white to-beige/30 border-t border-bronze/10">
      {/* Newsletter Section */}
      <div className="border-b border-bronze/10 bg-white/50">
        <div className="max-w-[1800px] mx-auto px-8 laptop:px-10 py-10 laptop:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="font-serif text-2xl laptop:text-2xl text-dark-text mb-3 laptop:mb-4">
              Rejoignez le Cercle Renaissance
            </h3>
            <p className="font-sans text-sm laptop:text-[15px] text-dark-text/60 mb-5 laptop:mb-6 tracking-wide">
              Recevez en exclusivité nos nouvelles créations, invitations privées et l'actualité de la Maison
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-1 px-4 py-3 laptop:py-3.5 border border-bronze/20 bg-white/80 text-sm laptop:text-[15px] font-sans focus:outline-none focus:border-bronze transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 laptop:py-3.5 bg-bronze text-white font-sans text-sm laptop:text-[14px] tracking-wider hover:bg-bronze/90 transition-colors"
              >
                {isSubscribed ? 'Inscrit ✓' : 'S\'inscrire'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1800px] mx-auto px-8 laptop:px-10 py-10 laptop:py-12">
        {/* Logo & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 laptop:mb-12"
        >
          <img
            src="https://res.cloudinary.com/dwt7u0azs/image/upload/v1761868999/RENAISSANCE_TRANSPARENT_bbe5d805-70e6-4344-856b-1d8534ad9056_ujgcyh.webp"
            alt="Renaissance Eyewear"
            className="h-24 laptop:h-28 w-auto object-contain mb-5 laptop:mb-6 mx-auto"
          />
          <p className="font-serif text-base laptop:text-[17px] text-dark-text/70 max-w-2xl mx-auto mb-5 laptop:mb-6 italic">
            « Le silence stylé des symboles intemporels »
          </p>
          
          {/* Social Media */}
          <div className="flex gap-3 laptop:gap-4 justify-center">
            <motion.a
              whileHover={{ y: -2 }}
              href="https://instagram.com/renaissance.eyewear"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 laptop:w-11 h-10 laptop:h-11 border border-bronze/20 flex items-center justify-center hover:border-bronze hover:bg-bronze/5 transition-all group"
            >
              <Instagram size={16} className="text-dark-text/50 group-hover:text-bronze transition-colors laptop:w-[17px] laptop:h-[17px]" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="https://facebook.com/renaissance.eyewear"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 laptop:w-11 h-10 laptop:h-11 border border-bronze/20 flex items-center justify-center hover:border-bronze hover:bg-bronze/5 transition-all group"
            >
              <Facebook size={16} className="text-dark-text/50 group-hover:text-bronze transition-colors laptop:w-[17px] laptop:h-[17px]" />
            </motion.a>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 laptop:grid-cols-2 gap-5 laptop:gap-6 mb-10 laptop:mb-12 pb-10 laptop:pb-12 border-b border-bronze/10">
          {[
            { icon: MapPin, text: '200+ Opticiens Partenaires en France' },
            { icon: Truck, text: 'Livraison Offerte dès 500€' },
            { icon: Award, text: 'Garantie 2 ans' },
            { icon: Shield, text: 'Paiement 100% Sécurisé' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 laptop:w-14 h-12 laptop:h-14 rounded-full bg-bronze/5 flex items-center justify-center mb-3">
                <item.icon size={20} className="text-bronze laptop:w-[22px] laptop:h-[22px]" />
              </div>
              <p className="font-sans text-xs laptop:text-[13px] text-dark-text/60 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 laptop:grid-cols-3 gap-6 laptop:gap-10 mb-10 laptop:mb-12">
          {/* Boutique */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-sans text-[10px] laptop:text-[11px] tracking-[0.3em] mb-4 laptop:mb-5 font-bold text-dark-text uppercase">
              Boutique
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm laptop:text-[15px] font-light block">
                  Toutes les Créations
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=heritage" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Collection Héritage
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=versailles" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Collection Versailles
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=isis" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Collection Isis
                </Link>
              </li>
              <li>
                <Link to="/opticiens" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
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
          >
            <h4 className="font-sans text-[10px] laptop:text-[11px] tracking-[0.3em] mb-4 laptop:mb-5 font-bold text-dark-text uppercase">
              Le Magazine
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Tous les Articles
                </Link>
              </li>
              <li>
                <Link to="/histoire" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/manifesto" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Manifeste
                </Link>
              </li>
              <li>
                <Link to="/savoir-faire" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Savoir-Faire
                </Link>
              </li>
              <li>
                <Link to="/symboles" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
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
          >
            <h4 className="font-sans text-[10px] laptop:text-[11px] tracking-[0.3em] mb-4 laptop:mb-5 font-bold text-dark-text uppercase">
              Service Client
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Questions Fréquentes
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link to="/garantie" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Garantie & SAV
                </Link>
              </li>
              <li>
                <Link to="/guide-tailles" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Guide des Tailles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light block">
                  Nous Contacter
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
          >
            <h4 className="font-sans text-[10px] laptop:text-[11px] tracking-[0.3em] mb-4 laptop:mb-5 font-bold text-dark-text uppercase">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-bronze mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:contact@renaissance-eyewear.fr" 
                  className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light"
                >
                  contact@renaissance-eyewear.fr
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-bronze mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+33142868200" 
                  className="font-sans text-dark-text/60 hover:text-bronze transition-colors text-sm font-light"
                >
                  +33 1 42 86 82 00
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-bronze mt-0.5 flex-shrink-0" />
                <span className="font-sans text-dark-text/60 text-sm font-light">
                  Lun-Ven : 9h-18h
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-bronze mt-0.5 flex-shrink-0" />
                <span className="font-sans text-dark-text/60 text-sm font-light">
                  Paris, France
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-bronze/10 pt-6 laptop:pt-8">
          <div className="flex flex-col laptop:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-sans text-dark-text/50 text-xs laptop:text-[13px] font-light tracking-wider"
            >
              © 2025 Renaissance Eyewear — Tous droits réservés
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-5 laptop:gap-6"
            >
              <Link to="/mentions-legales" className="font-sans text-dark-text/50 hover:text-bronze text-xs laptop:text-[13px] transition-colors font-light tracking-wider">
                Mentions Légales
              </Link>
              <Link to="/confidentialite" className="font-sans text-dark-text/50 hover:text-bronze text-xs laptop:text-[13px] transition-colors font-light tracking-wider">
                Confidentialité
              </Link>
              <Link to="/cgv" className="font-sans text-dark-text/50 hover:text-bronze text-xs transition-colors font-light tracking-wider">
                CGV
              </Link>
              <Link to="/remboursement" className="font-sans text-dark-text/50 hover:text-bronze text-xs transition-colors font-light tracking-wider">
                Retours
              </Link>
              <Link to="/expedition" className="font-sans text-dark-text/50 hover:text-bronze text-xs transition-colors font-light tracking-wider">
                Expédition
              </Link>
              <Link to="/cookies" className="font-sans text-dark-text/50 hover:text-bronze text-xs transition-colors font-light tracking-wider">
                Cookies
              </Link>
              <Link to="/conditions-utilisation" className="font-sans text-dark-text/50 hover:text-bronze text-xs transition-colors font-light tracking-wider">
                Conditions
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}