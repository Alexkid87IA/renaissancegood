import { useTranslation } from 'react-i18next';
import T from '../TranslatedText';
import { resizeShopifyImage } from '../../lib/imageUtils';

interface CartLineNode {
  id: string;
  quantity: number;
  merchandise: {
    priceV2: { amount: string };
    title: string;
    product: {
      title: string;
      images: { edges: Array<{ node: { url: string } }> };
    };
  };
}

interface OrderSummaryProps {
  cartLines: Array<{ node: CartLineNode }>;
  subtotal: number;
  shipping: number;
  total: number;
}

export default function OrderSummary({ cartLines, subtotal, shipping, total }: OrderSummaryProps) {
  const { t } = useTranslation('cart');
  return (
    <div className="bg-[#f8f6f1] border border-dark-text/[0.07] p-6">
      <h2 className="font-sans text-[10px] tracking-[0.25em] text-dark-text/40 uppercase font-medium mb-6">
        {t('checkoutPage.yourOrderSummary')}
      </h2>

      {/* Produits */}
      <div className="space-y-5 mb-6">
        {cartLines.map(({ node }) => {
          const price = parseFloat(node.merchandise.priceV2?.amount || '0');
          const itemTotal = price * node.quantity;
          const image = node.merchandise.product.images.edges[0]?.node.url;

          return (
            <div key={node.id} className="flex gap-4 group">
              <div className="w-28 h-28 bg-white border border-dark-text/[0.05] flex-shrink-0 relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.05]">
                {image && (
                  <img
                    src={resizeShopifyImage(image, 224)}
                    alt={node.merchandise.product.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                {node.quantity > 1 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-dark-text text-white rounded-full flex items-center justify-center">
                    <span className="font-sans text-[9px] font-bold">{node.quantity}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="font-sans text-sm text-dark-text truncate">
                  <T>{node.merchandise.product.title}</T>
                </p>
                {node.merchandise.title !== 'Default Title' && (
                  <p className="font-sans text-[11px] text-dark-text/35 mt-0.5"><T>{node.merchandise.title}</T></p>
                )}
                <p className="font-sans text-sm text-dark-text mt-1.5 font-medium">{itemTotal.toFixed(2)}&euro;</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Artisanal message */}
      <p className="font-display text-[12px] italic text-dark-text/35 leading-relaxed mb-5 border-l-2 border-bronze/20 pl-3">
        {t('checkoutPage.artisanalMessage')}
      </p>

      {/* Totaux */}
      <div className="border-t border-dark-text/[0.07] pt-5 space-y-2.5">
        <div className="flex justify-between">
          <span className="font-sans text-sm text-dark-text/45">{t('subtotal')}</span>
          <span className="font-sans text-sm text-dark-text">{subtotal.toFixed(2)}&euro;</span>
        </div>
        <div className="flex justify-between">
          <span className="font-sans text-sm text-dark-text/45">{t('shipping')}</span>
          <span className="font-sans text-sm text-dark-text">
            {shipping === 0 ? (
              <span className="text-green-700">{t('checkoutPage.shippingFree')}</span>
            ) : (
              `${shipping.toFixed(2)}€`
            )}
          </span>
        </div>
      </div>

      <div className="border-t border-dark-text/[0.07] mt-4 pt-4">
        <div className="flex justify-between items-baseline">
          <span className="font-sans text-[10px] tracking-[0.2em] text-dark-text/50 uppercase">Total</span>
          <span className="font-display text-2xl font-bold text-dark-text">{total.toFixed(2)}&euro;</span>
        </div>
      </div>
    </div>
  );
}
