import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';

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

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-dark-text/8"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between gap-6 text-left group"
      >
        <span className="font-sans text-dark-text text-sm lg:text-base font-medium leading-relaxed flex-1">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={16} className="text-bronze" />
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
            <p className="font-sans text-dark-text/50 text-sm leading-[1.8] font-light pb-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allFaqItems = useMemo(() => {
    return faqCategories.flatMap(category =>
      category.questions.map(q => ({
        question: q.q,
        answer: q.a,
      }))
    );
  }, []);

  const totalQuestions = allFaqItems.length;

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title="Questions Fréquentes (FAQ)"
        description="Trouvez les réponses à vos questions sur les lunettes RENAISSANCE Paris : commande, livraison, retours, entretien, garantie et opticiens partenaires."
        url="/faq"
        faqItems={allFaqItems}
      />

      {/* HERO — Éditorial dark */}
      <section className="bg-[#000000] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            ref={heroRef}
            variants={stagger}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              Aide & Support
            </motion.p>
            <motion.h1 variants={fade} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              QUESTIONS
              <br />FRÉQUENTES.
            </motion.h1>
            <motion.p variants={fade} className="font-display text-xl lg:text-2xl xl:text-3xl font-light italic text-white/40 tracking-[-0.02em] mb-8">
              Tout ce qu'il faut savoir.
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8" />
            <motion.div variants={fade} className="flex items-center gap-6">
              <div>
                <p className="font-display text-2xl lg:text-3xl font-bold text-white leading-none">{totalQuestions}</p>
                <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/25 mt-1">Réponses</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-display text-2xl lg:text-3xl font-bold text-white leading-none">{faqCategories.length}</p>
                <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/25 mt-1">Catégories</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="space-y-12 lg:space-y-16">
            {faqCategories.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.05 }}
              >
                {/* Category header */}
                <div className="mb-6">
                  <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-bronze uppercase mb-2">
                    {String(catIndex + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-dark-text tracking-[-0.02em]">
                    {category.category}
                  </h2>
                  <div className="w-8 h-px bg-dark-text/15 mt-4" />
                </div>

                {/* Questions */}
                <div>
                  {category.questions.map((item, idx) => (
                    <FAQItem key={idx} question={item.q} answer={item.a} index={idx} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#0a0a0a] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            ref={ctaRef}
            variants={stagger}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              Besoin d'aide
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              Une autre question ?
            </motion.h2>
            <motion.p variants={fade} className="font-display text-lg lg:text-xl font-light italic text-white/35 tracking-[-0.02em] mb-8">
              Nous sommes là pour vous.
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-8" />
            <motion.p variants={fade} className="font-sans text-white/30 text-[13px] lg:text-sm leading-[1.8] font-light mb-10 max-w-lg mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </motion.p>
            <motion.div variants={fade} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  Nous contacter
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
              <a
                href="tel:+33142868200"
                className="group border border-white/8 px-10 py-4 transition-all duration-500 hover:border-white/20"
              >
                <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/35 group-hover:text-white/60 transition-colors duration-500">
                  +33 1 42 86 82 00
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
