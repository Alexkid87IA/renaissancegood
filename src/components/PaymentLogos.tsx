export function PaymentLogos({ size = 'normal' }: { size?: 'compact' | 'normal' }) {
  const h = size === 'compact' ? 'h-6' : 'h-8';
  const px = size === 'compact' ? 'px-2' : 'px-2.5';
  const text = size === 'compact' ? 'text-[9px]' : 'text-[10px]';

  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap">
      {/* Visa */}
      <div className={`${h} ${px} bg-white border border-dark-text/10 rounded flex items-center justify-center`}>
        <span className={`${text} font-bold text-[#1A1F71] tracking-wide italic`}>VISA</span>
      </div>

      {/* Mastercard */}
      <div className={`${h} ${px} bg-white border border-dark-text/10 rounded flex items-center justify-center`}>
        <div className="flex items-center -space-x-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-80" />
        </div>
      </div>

      {/* AMEX */}
      <div className={`${h} ${px} bg-[#006FCF] rounded flex items-center justify-center`}>
        <span className={`${text} font-bold text-white tracking-tight`}>AMEX</span>
      </div>

      {/* Apple Pay */}
      <div className={`${h} ${px} bg-black rounded flex items-center justify-center gap-0.5`}>
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
        <span className={`${text} font-medium text-white`}>Pay</span>
      </div>

      {/* Google Pay */}
      <div className={`${h} ${px} bg-white border border-dark-text/10 rounded flex items-center justify-center gap-0.5`}>
        <svg className="w-3 h-3" viewBox="0 0 24 24">
          <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
        </svg>
        <span className={`${text} font-medium text-[#5F6368]`}>Pay</span>
      </div>

      {/* PayPal */}
      <div className={`${h} ${px} bg-[#003087] rounded flex items-center justify-center`}>
        <span className={`${text} font-bold text-white tracking-tight`}>Pay<span className="text-[#009CDE]">Pal</span></span>
      </div>

    </div>
  );
}
