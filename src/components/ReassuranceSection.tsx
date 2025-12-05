import { motion } from 'framer-motion';
import { MapPin, Truck, Award, Shield } from 'lucide-react';

const guarantees = [
  {
    icon: MapPin,
    title: '200+ Opticiens',
    subtitle: 'Partout en France'
  },
  {
    icon: Truck,
    title: 'Livraison offerte',
    subtitle: 'Dès 500€'
  },
  {
    icon: Award,
    title: 'Garantie 2 ans',
    subtitle: 'On assume ce qu’on fabrique'
  },
  {
    icon: Shield,
    title: 'Paiement sécurisé',
    subtitle: '100% crypté'
  }
];

export default function ReassuranceSection() {
  return (
    <section className="relative z-[10] bg-beige py-16 md:py-20 border-t border-dark-text/10">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-white rounded-full group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 border border-dark-text/10 rounded-full group-hover:border-bronze/30 transition-colors duration-500" />
                <guarantee.icon
                  className="w-7 h-7 md:w-8 md:h-8 text-bronze relative z-10"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="font-sans text-dark-text text-sm md:text-base font-bold mb-2 tracking-wide">
                {guarantee.title}
              </h3>

              <p className="font-sans text-dark-text/60 text-xs md:text-sm">
                {guarantee.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
