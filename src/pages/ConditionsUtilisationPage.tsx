import { useTranslation } from 'react-i18next';
import LegalPageTemplate from '../components/LegalPageTemplate';

export default function ConditionsUtilisationPage() {
  const { t } = useTranslation('legal');

  return (
    <LegalPageTemplate title={t('conditions.title')}>
      <p dangerouslySetInnerHTML={{ __html: t('conditions.intro') }} />

      <h2>{t('conditions.section1Title')}</h2>

      <h3>{t('conditions.accessTitle')}</h3>
      <p>{t('conditions.accessText')}</p>

      <h3>{t('conditions.ordersTitle')}</h3>
      <ul>
        {(t('conditions.ordersItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('conditions.section2Title')}</h2>

      <h3>{t('conditions.pricesTitle')}</h3>
      <ul>
        {(t('conditions.pricesItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('conditions.paymentTitle')}</h3>
      <ul>
        {(t('conditions.paymentItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('conditions.section3Title')}</h2>
      <p>{t('conditions.section3Text')}</p>

      <h3>{t('conditions.brandsTitle')}</h3>
      <p>{t('conditions.brandsText')}</p>

      <h2>{t('conditions.section4Title')}</h2>

      <h3>{t('conditions.liabilityTitle')}</h3>
      <p>{t('conditions.liabilityText')}</p>
      <ul>
        {(t('conditions.liabilityItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('conditions.warrantyTitle')}</h3>
      <p>{t('conditions.warrantyText')}</p>

      <h2>{t('conditions.section5Title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('conditions.section5Text1') }} />
      <p dangerouslySetInnerHTML={{ __html: t('conditions.section5Text2') }} />

      <h2>{t('conditions.section6Title')}</h2>
      <p>{t('conditions.section6Text')}</p>

      <h2>{t('conditions.section7Title')}</h2>
      <p>{t('conditions.section7Text')}</p>
      <ul>
        {(t('conditions.section7Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h2>{t('conditions.section8Title')}</h2>
      <p>{t('conditions.section8Text')}</p>

      <h2>{t('conditions.section9Title')}</h2>
      <p>{t('conditions.section9Text')}</p>
    </LegalPageTemplate>
  );
}
