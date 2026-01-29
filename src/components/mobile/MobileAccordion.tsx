import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="bg-white px-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className="border-t border-dark-text/8"
        >
          <button
            onClick={() => toggleSection(index)}
            className="w-full flex items-center justify-between py-5 group"
          >
            <span className="font-sans text-[9px] tracking-[0.3em] font-medium text-dark-text/50 uppercase">
              {section.title}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4 flex items-center justify-center"
            >
              <span className="block w-3 h-px bg-dark-text/40 relative">
                <span className={`absolute inset-0 bg-dark-text/40 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-0' : 'rotate-90'
                }`} />
              </span>
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
