import { useTranslation } from 'react-i18next';
import LegalPageTemplate from '../components/LegalPageTemplate';

export default function MentionsLegalesPage() {
  const { t } = useTranslation('legal');

  return (
    <LegalPageTemplate title={t('mentions.title')}>
      <h2>{t('mentions.section1Title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('mentions.section1Text') }} />

      <h2>{t('mentions.section2Title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('mentions.section2Text1') }} />
      <p dangerouslySetInnerHTML={{ __html: t('mentions.section2Text2') }} />

      <h2>{t('mentions.section3Title')}</h2>

      <h3>{t('mentions.section3_1Title')}</h3>
      <p dangerouslySetInnerHTML={{ __html: t('mentions.section3_1Text') }} />

      <h3>{t('mentions.section3_2Title')}</h3>
      <p>{t('mentions.section3_2Text')}</p>
      <ul>
        {(t('mentions.section3_2Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('mentions.section3_3Title')}</h3>
      <p>{t('mentions.section3_3Text')}</p>

      <h3>{t('mentions.section3_4Title')}</h3>
      <p>{t('mentions.section3_4Text')}</p>

      <h2>{t('mentions.section4Title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('mentions.section4Text1') }} />
      <p dangerouslySetInnerHTML={{ __html: t('mentions.section4Text2') }} />

      <h2>{t('mentions.section5Title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('mentions.section5Text') }} />

      <h2>{t('mentions.section6Title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('mentions.section6Text') }} />

      <h2>{t('mentions.section7Title')}</h2>

      <h3>{t('mentions.section7_1Title')}</h3>
      <p>{t('mentions.section7_1Text')}</p>

      <h3>{t('mentions.section7_2Title')}</h3>
      <p>{t('mentions.section7_2Text')}</p>

      <h3>{t('mentions.section7_3Title')}</h3>
      <p>{t('mentions.section7_3Text')}</p>

      <h2>{t('mentions.section8Title')}</h2>
      <p>{t('mentions.section8Text')}</p>

      <h2>{t('mentions.section9Title')}</h2>

      <h3>{t('mentions.section9_1Title')}</h3>
      <p dangerouslySetInnerHTML={{ __html: t('mentions.section9_1Text') }} />

      <h3>{t('mentions.section9_2Title')}</h3>
      <ul>
        {(t('mentions.section9_2Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('mentions.section9_3Title')}</h3>
      <p>{t('mentions.section9_3Text')}</p>

      <h2>{t('mentions.section10Title')}</h2>
      <p>{t('mentions.section10Text')}</p>
      <ul>
        {(t('mentions.section10Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h2>{t('mentions.section11Title')}</h2>
      <p>{t('mentions.section11Text')}</p>
    </LegalPageTemplate>
  );
}
