import { Monitor } from 'lucide-react';

export default function MobileWarning() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#F5F1EB] flex items-center justify-center p-6 lg:hidden">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-[#2C2416]/5">
          <Monitor className="w-10 h-10 text-[#2C2416]" strokeWidth={1.5} />
        </div>

        <h1 className="font-serif text-3xl font-semibold text-[#2C2416] mb-4">
          Consultation sur ordinateur requise
        </h1>

        <p className="text-lg text-[#2C2416]/70 leading-relaxed mb-2">
          Pour une expérience optimale et apprécier pleinement nos collections,
          veuillez consulter notre site depuis un ordinateur.
        </p>

        <p className="text-sm text-[#2C2416]/50 italic">
          Merci de votre compréhension.
        </p>
      </div>
    </div>
  );
}
