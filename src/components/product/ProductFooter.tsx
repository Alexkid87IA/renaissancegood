import { useTranslation } from 'react-i18next';
import { Instagram, Facebook } from 'lucide-react';
import LocaleLink from '../LocaleLink';

export default function ProductFooter() {
  const { t } = useTranslation('common');
  return (
    <footer className="bg-dark-text text-white">

      {/* Main content — padding-left accounts for sidebar on desktop */}
      <div className="px-6 md:px-10 lg:pl-[380px] laptop:pl-[420px] xl:pl-[520px] lg:pr-12 xl:pr-16 pt-10 pb-6">

        {/* Top row — Logo + Social */}
        <div className="flex items-center justify-between mb-8">
          <img
            src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png"
            alt="Renaissance Eyewear"
            className="h-10 w-auto object-contain brightness-0 invert"
            loading="lazy"
          />
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/renaissance.eyewear"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 border border-white/15 flex items-center justify-center hover:border-bronze transition-colors"
            >
              <Instagram size={12} className="text-white/50" />
            </a>
            <a
              href="https://facebook.com/renaissance.eyewear"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 border border-white/15 flex items-center justify-center hover:border-bronze transition-colors"
            >
              <Facebook size={12} className="text-white/50" />
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-white/8 mb-6" />

        {/* Links — compact inline rows */}
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-sans text-[8px] tracking-[0.3em] text-bronze uppercase font-bold mb-2.5">{t('productFooter.collections')}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <LocaleLink to="/collections/heritage" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.heritage')}</LocaleLink>
              <LocaleLink to="/collections/versailles" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.versailles')}</LocaleLink>
              <LocaleLink to="/collections/isis" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.isis')}</LocaleLink>
              <LocaleLink to="/shop" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.explore')}</LocaleLink>
            </div>
          </div>
          <div>
            <p className="font-sans text-[8px] tracking-[0.3em] text-bronze uppercase font-bold mb-2.5">{t('productFooter.theHouse')}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <LocaleLink to="/histoire" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.history')}</LocaleLink>
              <LocaleLink to="/symboles" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.symbols')}</LocaleLink>
              <LocaleLink to="/opticiens" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.opticians')}</LocaleLink>
              <LocaleLink to="/contact" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.contact')}</LocaleLink>
            </div>
          </div>
          <div>
            <p className="font-sans text-[8px] tracking-[0.3em] text-bronze uppercase font-bold mb-2.5">{t('productFooter.help')}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <LocaleLink to="/faq" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.faq')}</LocaleLink>
              <LocaleLink to="/livraison" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.shipping')}</LocaleLink>
              <LocaleLink to="/garantie" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.warranty')}</LocaleLink>
              <LocaleLink to="/cgv" className="font-sans text-white/45 hover:text-white/80 text-xs font-light transition-colors">{t('productFooter.terms')}</LocaleLink>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="px-6 md:px-10 lg:pl-[380px] laptop:pl-[420px] xl:pl-[520px] lg:pr-12 xl:pr-16 py-4 border-t border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-sans text-white/20 text-[10px] font-light">
            {t('productFooter.copyright')}
          </p>
          <div className="flex gap-4">
            <LocaleLink to="/mentions-legales" className="font-sans text-white/20 hover:text-white/40 text-[10px] transition-colors font-light">
              {t('productFooter.legalNotice')}
            </LocaleLink>
            <LocaleLink to="/confidentialite" className="font-sans text-white/20 hover:text-white/40 text-[10px] transition-colors font-light">
              {t('productFooter.privacy')}
            </LocaleLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
