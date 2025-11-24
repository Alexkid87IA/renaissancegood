import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-beige pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark-text mb-4">
            Nous Contacter
          </h1>
          <p className="font-sans text-dark-text/60 text-lg max-w-2xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-6 border border-bronze/10 hover:border-bronze/30 transition-colors"
          >
            <div className="w-12 h-12 bg-bronze/10 flex items-center justify-center mb-4">
              <Mail className="text-bronze" size={24} />
            </div>
            <h3 className="font-sans text-dark-text text-lg font-bold mb-2 tracking-wider uppercase">
              Email
            </h3>
            <p className="font-sans text-dark-text/60 text-sm mb-3">
              Nous répondons sous 48h
            </p>
            <a
              href="mailto:contact@renaissance-eyewear.fr"
              className="font-sans text-bronze text-sm hover:text-bronze/80 transition-colors break-all"
            >
              contact@renaissance-eyewear.fr
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 border border-bronze/10 hover:border-bronze/30 transition-colors"
          >
            <div className="w-12 h-12 bg-bronze/10 flex items-center justify-center mb-4">
              <Phone className="text-bronze" size={24} />
            </div>
            <h3 className="font-sans text-dark-text text-lg font-bold mb-2 tracking-wider uppercase">
              Téléphone
            </h3>
            <p className="font-sans text-dark-text/60 text-sm mb-3">
              Service client disponible
            </p>
            <a
              href="tel:+33142868200"
              className="font-sans text-bronze text-sm hover:text-bronze/80 transition-colors"
            >
              +33 1 42 86 82 00
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 border border-bronze/10 hover:border-bronze/30 transition-colors"
          >
            <div className="w-12 h-12 bg-bronze/10 flex items-center justify-center mb-4">
              <Clock className="text-bronze" size={24} />
            </div>
            <h3 className="font-sans text-dark-text text-lg font-bold mb-2 tracking-wider uppercase">
              Horaires
            </h3>
            <p className="font-sans text-dark-text/60 text-sm mb-3">
              Du lundi au vendredi
            </p>
            <p className="font-sans text-bronze text-sm">
              9h - 18h
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 border border-bronze/10"
          >
            <h2 className="font-serif text-2xl text-dark-text mb-6">
              Envoyez-nous un message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-sans text-sm text-dark-text/70 mb-2 tracking-wide uppercase">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-dark-text/20 bg-beige/30 font-sans text-sm text-dark-text focus:outline-none focus:border-bronze transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-sans text-sm text-dark-text/70 mb-2 tracking-wide uppercase">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-dark-text/20 bg-beige/30 font-sans text-sm text-dark-text focus:outline-none focus:border-bronze transition-colors"
                  placeholder="votre@email.fr"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-sans text-sm text-dark-text/70 mb-2 tracking-wide uppercase">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-dark-text/20 bg-beige/30 font-sans text-sm text-dark-text focus:outline-none focus:border-bronze transition-colors"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-sans text-sm text-dark-text/70 mb-2 tracking-wide uppercase">
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-dark-text/20 bg-beige/30 font-sans text-sm text-dark-text focus:outline-none focus:border-bronze transition-colors"
                >
                  <option value="general">Question générale</option>
                  <option value="order">Ma commande</option>
                  <option value="product">Question produit</option>
                  <option value="return">Retour ou échange</option>
                  <option value="sav">Service après-vente</option>
                  <option value="partner">Devenir partenaire</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-sans text-sm text-dark-text/70 mb-2 tracking-wide uppercase">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-dark-text/20 bg-beige/30 font-sans text-sm text-dark-text focus:outline-none focus:border-bronze transition-colors resize-none"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                className={`w-full py-4 font-sans text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2 ${
                  isSubmitted
                    ? 'bg-green-600 text-white'
                    : isSubmitting
                    ? 'bg-bronze/50 text-white cursor-not-allowed'
                    : 'bg-bronze text-white hover:bg-bronze/90'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <span>✓</span>
                    <span>Message envoyé</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Envoyer le message</span>
                  </>
                )}
              </motion.button>

              <p className="font-sans text-xs text-dark-text/50 text-center">
                * Champs obligatoires
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white p-8 border border-bronze/10">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="text-bronze flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-sans text-dark-text text-lg font-bold mb-2 tracking-wider uppercase">
                    Localisation
                  </h3>
                  <p className="font-sans text-dark-text/70 text-sm leading-relaxed">
                    Paris, France
                  </p>
                  <p className="font-sans text-dark-text/50 text-xs mt-2">
                    La Maison Renaissance est fièrement établie à Paris, capitale de l'élégance et du savoir-faire français.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-bronze/5 to-transparent p-8 border-l-4 border-bronze">
              <h3 className="font-serif text-2xl text-dark-text mb-4">
                Besoin d'un conseil ?
              </h3>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed mb-4">
                Rendez-vous chez l'un de nos 200+ opticiens partenaires pour essayer nos collections et bénéficier de conseils personnalisés.
              </p>
              <a
                href="/store-locator"
                className="inline-block px-6 py-3 bg-bronze text-white font-sans text-sm tracking-wider uppercase hover:bg-bronze/90 transition-colors"
              >
                Trouver un opticien
              </a>
            </div>

            <div className="bg-white p-8 border border-bronze/10">
              <h3 className="font-sans text-dark-text text-lg font-bold mb-4 tracking-wider uppercase">
                Réseaux Sociaux
              </h3>
              <p className="font-sans text-dark-text/60 text-sm mb-4">
                Suivez-nous pour découvrir nos nouvelles collections et l'actualité de la Maison.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/renaissance.eyewear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-bronze/20 flex items-center justify-center hover:border-bronze hover:bg-bronze/5 transition-all"
                >
                  <span className="text-bronze text-sm">IG</span>
                </a>
                <a
                  href="https://facebook.com/renaissance.eyewear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-bronze/20 flex items-center justify-center hover:border-bronze hover:bg-bronze/5 transition-all"
                >
                  <span className="text-bronze text-sm">FB</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
