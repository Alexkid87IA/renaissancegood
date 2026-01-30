import { useTranslation } from 'react-i18next';
import LegalPageTemplate from '../components/LegalPageTemplate';

export default function RemboursementPage() {
  const { t } = useTranslation('legal');

  return (
    <LegalPageTemplate title={t('remboursement.title')}>
      <h2>{t('remboursement.section1Title')}</h2>
      <p>{t('remboursement.section1Text')}</p>

      <h3>{t('remboursement.returnConditionsTitle')}</h3>
      <ul>
        {(t('remboursement.returnConditionsItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('remboursement.costsTitle')}</h3>
      <ul>
        {(t('remboursement.costsItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h2>{t('remboursement.section2Title')}</h2>
      <p>{t('remboursement.section2Text')}</p>

      <h2>{t('remboursement.section3Title')}</h2>
      <p>{t('remboursement.section3Text')}</p>
      <ul>
        {(t('remboursement.section3Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h2>{t('remboursement.section4Title')}</h2>

      <h3>{t('remboursement.customProductsTitle')}</h3>
      <p>{t('remboursement.customProductsText')}</p>

      <h3>{t('remboursement.damagedProductsTitle')}</h3>
      <p>{t('remboursement.damagedProductsText')}</p>

      <h2>{t('remboursement.section5Title')}</h2>
      <p>{t('remboursement.section5Text')}</p>
    </LegalPageTemplate>
  );
}
