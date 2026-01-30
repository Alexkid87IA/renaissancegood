import { useTranslation } from 'react-i18next';
import LegalPageTemplate from '../components/LegalPageTemplate';
import SEO from '../components/SEO';

export default function ExpeditionPage() {
  const { t } = useTranslation('legal');

  return (
    <LegalPageTemplate title={t('expedition.title')}>
      <SEO
        title={t('expedition.seoTitle')}
        description={t('expedition.seoDescription')}
        url="/livraison"
      />
      <h2>{t('expedition.policyTitle')}</h2>
      <p>{t('expedition.policyText')}</p>

      <h3>{t('expedition.zoneTitle')}</h3>
      <ul>
        {(t('expedition.zoneItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('expedition.delaysTitle')}</h3>
      <ul>
        {(t('expedition.delaysItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h2>{t('expedition.costsTitle')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('expedition.costsText') }} />

      <h2>{t('expedition.detailedZonesTitle')}</h2>

      <h3>{t('expedition.franceTitle')}</h3>
      <ul>
        {(t('expedition.franceItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('expedition.euTitle')}</h3>
      <ul>
        {(t('expedition.euItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('expedition.internationalTitle')}</h3>
      <ul>
        {(t('expedition.internationalItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h2>{t('expedition.preparationTitle')}</h2>
      <p>{t('expedition.preparationText')}</p>

      <h2>{t('expedition.trackingTitle')}</h2>
      <p>{t('expedition.trackingText')}</p>
      <ul>
        {(t('expedition.trackingItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('expedition.issuesTitle')}</h2>

      <h3>{t('expedition.notReceivedTitle')}</h3>
      <p dangerouslySetInnerHTML={{ __html: t('expedition.notReceivedText') }} />

      <h3>{t('expedition.damagedTitle')}</h3>
      <p>{t('expedition.damagedText')}</p>
      <ol>
        {(t('expedition.damagedItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
      <p>{t('expedition.damagedResolution')}</p>

      <h2>{t('expedition.partnerTitle')}</h2>
      <p>{t('expedition.partnerText')}</p>

      <h2>{t('expedition.contactTitle')}</h2>
      <p>{t('expedition.contactText')}</p>
      <ul>
        {(t('expedition.contactItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </LegalPageTemplate>
  );
}
