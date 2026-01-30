import { useTranslation } from 'react-i18next';
import LegalPageTemplate from '../components/LegalPageTemplate';

export default function ConfidentialitePage() {
  const { t } = useTranslation('legal');

  return (
    <LegalPageTemplate
      title={t('confidentialite.title')}
      lastUpdated={t('confidentialite.lastUpdated')}
    >
      <p dangerouslySetInnerHTML={{ __html: t('confidentialite.intro') }} />

      <p>{t('confidentialite.readCarefully')}</p>

      <h2>{t('confidentialite.changesTitle')}</h2>
      <p>{t('confidentialite.changesText')}</p>

      <h2>{t('confidentialite.howWeCollectTitle')}</h2>
      <p>{t('confidentialite.howWeCollectText1')}</p>
      <p>{t('confidentialite.howWeCollectText2')}</p>

      <h3>{t('confidentialite.personalInfoTitle')}</h3>
      <p>{t('confidentialite.personalInfoText')}</p>

      <h3>{t('confidentialite.directInfoTitle')}</h3>
      <p>{t('confidentialite.directInfoText')}</p>
      <ul>
        {(t('confidentialite.directInfoItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('confidentialite.usageInfoTitle')}</h3>
      <p>{t('confidentialite.usageInfoText')}</p>

      <h3>{t('confidentialite.thirdPartyInfoTitle')}</h3>
      <p>{t('confidentialite.thirdPartyInfoText')}</p>
      <ul>
        {(t('confidentialite.thirdPartyInfoItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('confidentialite.howWeUseTitle')}</h2>

      <h3>{t('confidentialite.providingServicesTitle')}</h3>
      <p>{t('confidentialite.providingServicesText')}</p>

      <h3>{t('confidentialite.marketingTitle')}</h3>
      <p>{t('confidentialite.marketingText')}</p>

      <h3>{t('confidentialite.securityTitle')}</h3>
      <p>{t('confidentialite.securityText')}</p>

      <h2>{t('confidentialite.cookiesTitle')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('confidentialite.cookiesText1') }} />
      <p>{t('confidentialite.cookiesText2')}</p>

      <h2>{t('confidentialite.disclosureTitle')}</h2>
      <p>{t('confidentialite.disclosureText')}</p>
      <ul>
        {(t('confidentialite.disclosureItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('confidentialite.childrenTitle')}</h2>
      <p>{t('confidentialite.childrenText')}</p>

      <h2>{t('confidentialite.retentionTitle')}</h2>
      <p>{t('confidentialite.retentionText')}</p>

      <h2>{t('confidentialite.rightsTitle')}</h2>
      <p>{t('confidentialite.rightsText')}</p>
      <ul>
        {(t('confidentialite.rightsItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h2>{t('confidentialite.internationalTitle')}</h2>
      <p>{t('confidentialite.internationalText')}</p>

      <h2>{t('confidentialite.contactTitle')}</h2>
      <p>{t('confidentialite.contactText')}</p>
      <p dangerouslySetInnerHTML={{ __html: t('confidentialite.contactInfo') }} />
    </LegalPageTemplate>
  );
}
