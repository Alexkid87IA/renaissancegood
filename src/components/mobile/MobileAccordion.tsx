import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface AccordionSection {
  title: string;
  content: React.ReactNode;
}

interface MobileAccordionProps {
  sections: AccordionSection[];
  defaultOpen?: number;
}

export default function MobileAccordion({ sections, defaultOpen }: MobileAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    if ('vibrate' in navigator) {
      navigator.vibrate(5);
    }
  };

  return (
    <div className="bg-white px-6 py-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`${index !== 0 ? 'border-t border-dark-text/10' : ''}`}
        >
          <button
            onClick={() => toggleSection(index)}
            className="w-full flex items-center justify-between py-5 group"
          >
            <span className="font-sans text-[11px] tracking-[0.25em] font-bold text-dark-text uppercase">
              {section.title}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 0 : 90 }}
              transition={{ duration: 0.2 }}
            >
              {openIndex === index ? (
                <Minus className="w-4 h-4 text-dark-text" />
              ) : (
                <Plus className="w-4 h-4 text-dark-text" />
              )}
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="pb-6">
                  {section.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
