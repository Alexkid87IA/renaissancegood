import { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

// Champ code promo. Le code est validé par Shopify (cartDiscountCodesUpdate) et
// la remise est recalculée côté serveur au paiement : rien n'est calculé ici.
export default function PromoCodeField() {
  const { cart, applyPromo, removePromo, isLoading } = useCart();
  const [code, setCode] = useState('');
  const [invalid, setInvalid] = useState(false);

  const applied = cart?.discountCodes?.find((d) => d.applicable);

  const handleApply = async () => {
    if (!code.trim()) return;
    setInvalid(false);
    const ok = await applyPromo(code);
    if (ok) {
      setCode('');
    } else {
      setInvalid(true);
    }
  };

  if (applied) {
    return (
      <div className="flex items-center justify-between bg-green-700/[0.06] border border-green-700/20 px-4 py-3 rounded-xl">
        <span className="flex items-center gap-2 font-sans text-sm text-green-800">
          <Check className="w-4 h-4" />
          Code <strong className="font-medium">{applied.code}</strong> appliqué
        </span>
        <button
          type="button"
          onClick={() => { setInvalid(false); void removePromo(); }}
          disabled={isLoading}
          className="text-dark-text/40 hover:text-dark-text transition-colors disabled:opacity-50"
          aria-label="Retirer le code promo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] text-dark-text/45 uppercase mb-2">
        <Tag className="w-3 h-3" />
        Code promo
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value); setInvalid(false); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); void handleApply(); } }}
          placeholder="Votre code"
          className="flex-1 border border-dark-text/15 px-4 py-3 rounded-xl font-sans text-sm uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal placeholder:text-dark-text/30 focus:border-dark-text focus:outline-none"
        />
        <button
          type="button"
          onClick={() => void handleApply()}
          disabled={isLoading || !code.trim()}
          className="bg-dark-text text-white font-sans text-xs tracking-[0.15em] uppercase px-5 rounded-xl disabled:opacity-40 transition-opacity"
        >
          {isLoading ? '...' : 'Appliquer'}
        </button>
      </div>
      {invalid && (
        <p className="mt-2 font-sans text-xs text-red-600">Code invalide ou non applicable à ce panier.</p>
      )}
    </div>
  );
}
