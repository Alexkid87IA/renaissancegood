import { useTranslation } from 'react-i18next';
import LegalPageTemplate from '../components/LegalPageTemplate';

export default function CGVPage() {
  const { t } = useTranslation('legal');

  return (
    <LegalPageTemplate
      title={t('cgv.title')}
      lastUpdated={t('cgv.lastUpdated')}
    >
      <p dangerouslySetInnerHTML={{ __html: t('cgv.intro') }} />

      <h2>{t('cgv.article1Title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('cgv.article1Text') }} />

      <h2>{t('cgv.article2Title')}</h2>
      <p>{t('cgv.article2Text')}</p>

      <h2>{t('cgv.article3Title')}</h2>

      <h3>{t('cgv.article3_1Title')}</h3>
      <p>{t('cgv.article3_1Text')}</p>
      <ul>
        {(t('cgv.article3_1Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('cgv.article3_2Title')}</h3>
      <p>{t('cgv.article3_2Text')}</p>
      <ul>
        {(t('cgv.article3_2Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('cgv.article3_3Title')}</h3>
      <p>{t('cgv.article3_3Text')}</p>
      <ul>
        {(t('cgv.article3_3Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('cgv.article4Title')}</h2>

      <h3>{t('cgv.article4_1Title')}</h3>
      <ol>
        {(t('cgv.article4_1Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>

      <h3>{t('cgv.article4_2Title')}</h3>
      <p>{t('cgv.article4_2Text')}</p>
      <ul>
        {(t('cgv.article4_2Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('cgv.article4_3Title')}</h3>
      <p>{t('cgv.article4_3Text')}</p>

      <h2>{t('cgv.article5Title')}</h2>

      <h3>{t('cgv.article5_1Title')}</h3>
      <ul>
        {(t('cgv.article5_1Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('cgv.article5_2Title')}</h3>
      <p>{t('cgv.article5_2Text')}</p>

      <h3>{t('cgv.article5_3Title')}</h3>
      <p>{t('cgv.article5_3Text')}</p>

      <h2>{t('cgv.article6Title')}</h2>

      <h3>{t('cgv.article6_1Title')}</h3>
      <p>{t('cgv.article6_1Text')}</p>

      <h3>{t('cgv.article6_2Title')}</h3>
      <ul>
        {(t('cgv.article6_2Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{t('cgv.article6_3Title')}</h3>
      <p>{t('cgv.article6_3Text')}</p>

      <h3>{t('cgv.article6_4Title')}</h3>
      <p dangerouslySetInnerHTML={{ __html: t('cgv.article6_4Text') }} />

      <h3>{t('cgv.article6_5Title')}</h3>
      <p>{t('cgv.article6_5Text')}</p>

      <h2>{t('cgv.article7Title')}</h2>

      <h3>{t('cgv.article7_1Title')}</h3>
      <p>{t('cgv.article7_1Text')}</p>

      <h3>{t('cgv.article7_2Title')}</h3>
      <p>{t('cgv.article7_2Text')}</p>
      <ol>
        {(t('cgv.article7_2Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ol>

      <h3>{t('cgv.article7_3Title')}</h3>
      <p>{t('cgv.article7_3Text')}</p>

      <h3>{t('cgv.article7_4Title')}</h3>
      <p>{t('cgv.article7_4Text')}</p>

      <h3>{t('cgv.article7_5Title')}</h3>
      <p>{t('cgv.article7_5Text')}</p>

      <h2>{t('cgv.article8Title')}</h2>

      <h3>{t('cgv.article8_1Title')}</h3>
      <p>{t('cgv.article8_1Text')}</p>

      <h3>{t('cgv.article8_2Title')}</h3>
      <p dangerouslySetInnerHTML={{ __html: t('cgv.article8_2Text') }} />
      <ul>
        {(t('cgv.article8_2Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('cgv.article8_3Title')}</h3>
      <p>{t('cgv.article8_3Text')}</p>
      <ul>
        {(t('cgv.article8_3Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('cgv.article8_4Title')}</h3>
      <p>{t('cgv.article8_4Text')}</p>
      <ul>
        {(t('cgv.article8_4Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{t('cgv.article9Title')}</h2>

      <h3>{t('cgv.article9_1Title')}</h3>
      <p>{t('cgv.article9_1Text')}</p>
      <ul>
        {(t('cgv.article9_1Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>{t('cgv.article9_2Title')}</h3>
      <p>{t('cgv.article9_2Text')}</p>

      <h2>{t('cgv.article10Title')}</h2>
      <p>{t('cgv.article10Text1')}</p>
      <p>{t('cgv.article10Text2')}</p>

      <h2>{t('cgv.article11Title')}</h2>
      <p>{t('cgv.article11Text1')}</p>
      <p dangerouslySetInnerHTML={{ __html: t('cgv.article11Text2') }} />

      <h2>{t('cgv.article12Title')}</h2>

      <h3>{t('cgv.article12_1Title')}</h3>
      <p dangerouslySetInnerHTML={{ __html: t('cgv.article12_1Text') }} />

      <h3>{t('cgv.article12_2Title')}</h3>
      <p>{t('cgv.article12_2Text')}</p>

      <h3>{t('cgv.article12_3Title')}</h3>
      <p>{t('cgv.article12_3Text')}</p>

      <h2>{t('cgv.article13Title')}</h2>
      <p>{t('cgv.article13Text')}</p>

      <h2>{t('cgv.article14Title')}</h2>
      <p>{t('cgv.article14Text')}</p>
      <ul>
        {(t('cgv.article14Items', { returnObjects: true }) as string[]).map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </LegalPageTemplate>
  );
}
