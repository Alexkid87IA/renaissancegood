import { useTranslation } from 'react-i18next';
import LegalPageTemplate from '../components/LegalPageTemplate';

export default function CookiesPage() {
  const { t } = useTranslation('legal');

  return (
    <LegalPageTemplate
      title={t('cookies.title')}
      lastUpdated={t('cookies.lastUpdated')}
    >
      <p dangerouslySetInnerHTML={{ __html: t('cookies.intro') }} />

      <h2>{t('cookies.whatIsTitle')}</h2>
      <p>{t('cookies.whatIsText')}</p>

      <h2>{t('cookies.whyTitle')}</h2>
      <p>{t('cookies.whyText')}</p>
      <ul>
        {(t('cookies.whyItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('cookies.typesTitle')}</h2>

      <h3>{t('cookies.essentialTitle')}</h3>
      <p>{t('cookies.essentialText')}</p>
      <p><strong>{t('cookies.essentialExamples')}</strong></p>
      <ul>
        {(t('cookies.essentialItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t('cookies.essentialDuration') }} />

      <h3>{t('cookies.personalizationTitle')}</h3>
      <p>{t('cookies.personalizationText')}</p>
      <p><strong>{t('cookies.personalizationExamples')}</strong></p>
      <ul>
        {(t('cookies.personalizationItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t('cookies.personalizationDuration') }} />

      <h3>{t('cookies.advertisingTitle')}</h3>
      <p>{t('cookies.advertisingText')}</p>
      <p><strong>{t('cookies.advertisingExamples')}</strong></p>
      <ul>
        {(t('cookies.advertisingItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t('cookies.advertisingDuration') }} />

      <h3>{t('cookies.analyticsTitle')}</h3>
      <p>{t('cookies.analyticsText')}</p>
      <p><strong>{t('cookies.analyticsExamples')}</strong></p>
      <ul>
        {(t('cookies.analyticsItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t('cookies.analyticsDuration') }} />

      <h2>{t('cookies.thirdPartyTitle')}</h2>
      <p>{t('cookies.thirdPartyText')}</p>

      <h3>{t('cookies.shopifyTitle')}</h3>
      <p dangerouslySetInnerHTML={{ __html: t('cookies.shopifyText') }} />

      <h3>{t('cookies.googleAnalyticsTitle')}</h3>
      <p dangerouslySetInnerHTML={{ __html: t('cookies.googleAnalyticsText') }} />

      <h3>{t('cookies.socialTitle')}</h3>
      <p>{t('cookies.socialText')}</p>

      <h2>{t('cookies.manageTitle')}</h2>

      <h3>{t('cookies.bannerTitle')}</h3>
      <p>{t('cookies.bannerText')}</p>

      <h3>{t('cookies.browserTitle')}</h3>
      <p>{t('cookies.browserText')}</p>
      <ul>
        {(t('cookies.browserItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('cookies.instructionsTitle')}</h3>
      <ul>
        {(t('cookies.instructionsItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('cookies.gpcTitle')}</h3>
      <p>{t('cookies.gpcText1')}</p>
      <p dangerouslySetInnerHTML={{ __html: t('cookies.gpcText2') }} />

      <h2>{t('cookies.consequencesTitle')}</h2>
      <p>{t('cookies.consequencesText')}</p>
      <ul>
        {(t('cookies.consequencesItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('cookies.updateTitle')}</h2>
      <p>{t('cookies.updateText')}</p>

      <h2>{t('cookies.contactTitle')}</h2>
      <p>{t('cookies.contactText')}</p>
      <ul>
        {(t('cookies.contactItems', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </LegalPageTemplate>
  );
}
