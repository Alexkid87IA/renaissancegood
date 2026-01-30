import { useTranslation } from 'react-i18next';
import LegalPageTemplate from '../components/LegalPageTemplate';
import SEO from '../components/SEO';

export default function GarantiePage() {
  const { t } = useTranslation('legal');

  return (
    <LegalPageTemplate title={t('garantie.title')}>
      <SEO
        title={t('garantie.seoTitle')}
        description={t('garantie.seoDescription')}
        url="/garantie"
      />
      <h2>{t('garantie.warrantyTitle')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('garantie.warrantyText') }} />

      <h3>{t('garantie.coveredTitle')}</h3>
      <ul>
        {(t('garantie.coveredItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('garantie.notCoveredTitle')}</h3>
      <ul>
        {(t('garantie.notCoveredItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('garantie.afterSalesTitle')}</h2>
      <p>{t('garantie.afterSalesText')}</p>

      <h3>{t('garantie.warrantyRepairTitle')}</h3>
      <p>{t('garantie.warrantyRepairText')}</p>
      <ol>
        {(t('garantie.warrantyRepairItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ol>

      <h3>{t('garantie.outOfWarrantyTitle')}</h3>
      <p>{t('garantie.outOfWarrantyText')}</p>
      <ul>
        {(t('garantie.outOfWarrantyItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('garantie.repairTypesTitle')}</h3>
      <ul>
        {(t('garantie.repairTypesItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h2>{t('garantie.maintenanceTitle')}</h2>

      <h3>{t('garantie.cleaningTitle')}</h3>
      <ul>
        {(t('garantie.cleaningItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('garantie.storageTitle')}</h3>
      <ul>
        {(t('garantie.storageItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('garantie.precautionsTitle')}</h3>
      <ul>
        {(t('garantie.precautionsItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('garantie.opticiansTitle')}</h2>
      <p>{t('garantie.opticiansText')}</p>
      <ul>
        {(t('garantie.opticiansItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p>
        <a href="/store-locator">{t('garantie.findOptician')}</a>
      </p>

      <h2>{t('garantie.certificateTitle')}</h2>
      <p>{t('garantie.certificateText')}</p>

      <h2>{t('garantie.contactTitle')}</h2>
      <p>{t('garantie.contactText')}</p>
      <ul>
        {(t('garantie.contactItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h2>{t('garantie.qualityTitle')}</h2>
      <p>{t('garantie.qualityText1')}</p>
      <p>{t('garantie.qualityText2')}</p>
    </LegalPageTemplate>
  );
}
