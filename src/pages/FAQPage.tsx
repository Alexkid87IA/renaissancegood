import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import LegalPageTemplate from '../components/LegalPageTemplate';

const faqCategories = [
  {
    category: 'Commande & Paiement',
    questions: [
      {
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et les virements bancaires. Tous les paiements sont sécurisés et cryptés.'
      },
      {
        q: 'Puis-je modifier ou annuler ma commande ?',
        a: 'Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant sa validation en nous contactant immédiatement. Passé ce délai, votre commande est en cours de préparation.'
      },
      {
        q: 'Recevrai-je une facture ?',
        a: 'Oui, une facture détaillée vous sera envoyée par e-mail dès l\'expédition de votre commande.'
      }
    ]
  },
  {
    category: 'Livraison',
    questions: [
      {
        q: 'Quels sont les délais de livraison ?',
        a: 'Les commandes sont expédiées sous 24-48h. La livraison en France métropolitaine prend 1-2 jours ouvrés, 2-3 jours pour l\'UE, et 3-7 jours pour l\'international.'
      },
      {
        q: 'La livraison est-elle gratuite ?',
        a: 'Oui, la livraison est gratuite pour toutes les commandes, quelle que soit la destination.'
      },
      {
        q: 'Puis-je suivre ma commande ?',
        a: 'Oui, vous recevrez un numéro de suivi par e-mail dès l\'expédition de votre commande. Vous pourrez suivre votre colis en temps réel.'
      },
      {
        q: 'Livrez-vous à l\'international ?',
        a: 'Oui, nous livrons dans le monde entier. Des frais de douane peuvent s\'appliquer selon les pays et sont à la charge du destinataire.'
      }
    ]
  },
  {
    category: 'Retours & Échanges',
    questions: [
      {
        q: 'Quelle est votre politique de retour ?',
        a: 'Vous disposez de 14 jours à compter de la réception pour retourner votre commande. Le produit doit être dans son état d\'origine avec l\'emballage intact. Les frais de retour sont pris en charge par Renaissance.'
      },
      {
        q: 'Comment procéder à un retour ?',
        a: 'Contactez notre service client à contact@renaissance-eyewear.fr avec votre numéro de commande. Nous vous enverrons une étiquette de retour prépayée et les instructions.'
      },
      {
        q: 'Quand serai-je remboursé ?',
        a: 'Le remboursement est effectué sous 14 jours suivant la réception et la validation de votre retour, sur le moyen de paiement utilisé lors de l\'achat.'
      },
      {
        q: 'Puis-je échanger ma monture ?',
        a: 'Oui, nous proposons des échanges gratuits. Contactez-nous pour organiser l\'échange de votre monture.'
      }
    ]
  },
  {
    category: 'Produits & Entretien',
    questions: [
      {
        q: 'Comment choisir la bonne taille de monture ?',
        a: 'Consultez notre Guide des Tailles qui détaille les dimensions de chaque modèle. Vous pouvez également essayer nos montures chez l\'un de nos 200+ opticiens partenaires.'
      },
      {
        q: 'Les montures sont-elles adaptées aux verres correcteurs ?',
        a: 'Oui, toutes nos montures optiques peuvent recevoir vos verres correcteurs. Rendez-vous chez un opticien partenaire pour le montage.'
      },
      {
        q: 'Comment entretenir mes lunettes Renaissance ?',
        a: 'Nettoyez vos lunettes avec le chiffon microfibre fourni. Évitez les produits chimiques agressifs. Rangez-les dans leur étui lorsque vous ne les portez pas.'
      },
      {
        q: 'Quelle est la garantie sur les montures ?',
        a: 'Toutes nos montures bénéficient d\'une garantie constructeur de 2 ans couvrant les défauts de fabrication.'
      }
    ]
  },
  {
    category: 'Opticiens Partenaires',
    questions: [
      {
        q: 'Puis-je essayer les lunettes avant d\'acheter ?',
        a: 'Oui, visitez l\'un de nos 200+ opticiens partenaires en France pour essayer nos collections et bénéficier de conseils personnalisés.'
      },
      {
        q: 'Comment trouver un opticien partenaire ?',
        a: 'Utilisez notre localisateur d\'opticiens sur la page "Trouver un Opticien" pour trouver le point de vente le plus proche de chez vous.'
      },
      {
        q: 'Les prix sont-ils les mêmes en ligne et chez les opticiens ?',
        a: 'Oui, nos tarifs sont identiques sur notre site et chez nos opticiens partenaires.'
      }
    ]
  },
  {
    category: 'Contact & Assistance',
    questions: [
      {
        q: 'Comment contacter le service client ?',
        a: 'Vous pouvez nous contacter par e-mail à contact@renaissance-eyewear.fr ou par téléphone au +33 1 42 86 82 00 (Lun-Ven, 9h-18h).'
      },
      {
        q: 'Quel est le délai de réponse du service client ?',
        a: 'Nous nous engageons à répondre à toutes les demandes sous 48 heures ouvrées maximum.'
      },
      {
        q: 'Proposez-vous un service de personnalisation ?',
        a: 'Contactez-nous pour discuter de vos besoins en matière de personnalisation. Certaines options peuvent être disponibles sur demande.'
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-bronze/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between gap-4 text-left group hover:bg-beige/30 px-4 transition-colors"
      >
        <span className="font-sans text-dark-text text-base font-medium leading-relaxed flex-1">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} className="text-bronze" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-sans text-dark-text/70 text-sm leading-relaxed pb-5 px-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <LegalPageTemplate title="Questions Fréquentes">
      <div className="mb-8">
        <p className="font-sans text-dark-text/70 text-base leading-relaxed mb-4">
          Vous trouverez ci-dessous les réponses aux questions les plus fréquemment posées.
          Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter.
        </p>
      </div>

      <div className="space-y-8">
        {faqCategories.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-bronze/10"
          >
            <div className="bg-bronze/5 px-6 py-4 border-b border-bronze/10">
              <h2 className="font-sans text-dark-text text-lg font-bold tracking-wider uppercase">
                {category.category}
              </h2>
            </div>
            <div>
              {category.questions.map((item, idx) => (
                <FAQItem key={idx} question={item.q} answer={item.a} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-8 bg-gradient-to-br from-bronze/5 to-transparent border-l-4 border-bronze"
      >
        <h3 className="font-serif text-2xl text-dark-text mb-4">
          Vous avez une autre question ?
        </h3>
        <p className="font-sans text-dark-text/70 text-base leading-relaxed mb-6">
          Notre équipe est à votre disposition pour répondre à toutes vos questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:contact@renaissance-eyewear.fr"
            className="inline-block px-6 py-3 bg-bronze text-white font-sans text-sm tracking-wider uppercase hover:bg-bronze/90 transition-colors text-center"
          >
            Nous contacter
          </a>
          <a
            href="tel:+33142868200"
            className="inline-block px-6 py-3 border border-bronze text-bronze font-sans text-sm tracking-wider uppercase hover:bg-bronze hover:text-white transition-colors text-center"
          >
            +33 1 42 86 82 00
          </a>
        </div>
      </motion.div>
    </LegalPageTemplate>
  );
}
