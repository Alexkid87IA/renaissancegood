import { Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-dark-text/5">
      <div className="max-w-[1800px] mx-auto px-8 laptop:px-12 py-8 laptop:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-8"
        >
          <img
            src="https://res.cloudinary.com/dwt7u0azs/image/upload/v1761868999/RENAISSANCE_TRANSPARENT_bbe5d805-70e6-4344-856b-1d8534ad9056_ujgcyh.webp"
            alt="Renaissance Eyewear"
            className="h-32 laptop:h-40 w-auto object-contain mb-4"
          />
          <div className="flex gap-3">
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="w-8 h-8 border border-dark-text/10 flex items-center justify-center hover:border-bronze hover:bg-bronze/5 transition-all group"
            >
              <Instagram size={14} className="text-dark-text/40 group-hover:text-bronze transition-colors" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="w-8 h-8 border border-dark-text/10 flex items-center justify-center hover:border-bronze hover:bg-bronze/5 transition-all group"
            >
              <Facebook size={14} className="text-dark-text/40 group-hover:text-bronze transition-colors" />
            </motion.a>
          </div>
        </motion.div>

        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 laptop:gap-20 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="font-sans text-[9px] tracking-[0.3em] mb-4 font-bold text-dark-text uppercase">
                  Collections
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#heritage" className="font-sans text-dark-text/50 hover:text-dark-text transition-colors text-xs font-light block">
                      Héritage
                    </a>
                  </li>
                  <li>
                    <a href="#versailles" className="font-sans text-dark-text/50 hover:text-dark-text transition-colors text-xs font-light block">
                      Versailles
                    </a>
                  </li>
                  <li>
                    <a href="#isis" className="font-sans text-dark-text/50 hover:text-dark-text transition-colors text-xs font-light block">
                      Isis
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-sans text-[9px] tracking-[0.3em] mb-4 font-bold text-dark-text uppercase">
                  La Maison
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/histoire" className="font-sans text-dark-text/50 hover:text-dark-text transition-colors text-xs font-light block">
                      Histoire
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="font-sans text-dark-text/50 hover:text-dark-text transition-colors text-xs font-light block">
                      Savoir-Faire
                    </a>
                  </li>
                  <li>
                    <a href="#" className="font-sans text-dark-text/50 hover:text-dark-text transition-colors text-xs font-light block">
                      Boutiques
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="font-sans text-[9px] tracking-[0.3em] mb-4 font-bold text-dark-text uppercase">
                  Contact
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:contact@renaissance-eyewear.fr" className="font-sans text-dark-text/50 hover:text-dark-text transition-colors text-xs font-light block">
                      contact@renaissance-eyewear.fr
                    </a>
                  </li>
                  <li>
                    <a href="tel:+33142868200" className="font-sans text-dark-text/50 hover:text-dark-text transition-colors text-xs font-light block">
                      +33 1 42 86 82 00
                    </a>
                  </li>
                  <li>
                    <span className="font-sans text-dark-text/50 text-xs font-light block">
                      Paris, France
                    </span>
                  </li>
                </ul>
              </motion.div>
          </div>
        </div>

        <div className="border-t border-dark-text/5 pt-6">
          <div className="flex flex-col laptop:flex-row justify-between items-center gap-3">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-sans text-dark-text text-xs font-light tracking-wider"
            >
              © 2025 Renaissance Eyewear
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6"
            >
              <a href="#" className="font-sans text-dark-text hover:text-bronze text-xs transition-colors font-light tracking-wider">
                Mentions Légales
              </a>
              <a href="#" className="font-sans text-dark-text hover:text-bronze text-xs transition-colors font-light tracking-wider">
                Confidentialité
              </a>
              <a href="#" className="font-sans text-dark-text hover:text-bronze text-xs transition-colors font-light tracking-wider">
                CGV
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
