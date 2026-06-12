import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
          className="border-t border-dark-text/[0.08]"
        >
          <button
            onClick={() => toggleSection(index)}
            className="w-full flex items-center justify-between py-5 group"
          >
            <span className="font-sans text-[9px] tracking-[0.3em] font-medium text-dark-text/50 uppercase">
              {section.title}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4 flex items-center justify-center"
            >
              <ChevronDown className="w-4 h-4 text-dark-text/40" />
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
