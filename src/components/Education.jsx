import Timeline from "./Timeline";
import Certifications from "./Certifications";
import { useLanguage } from '../contexts/LanguageContext';
import { CERTIFICATIONS } from "../data/certifications";

const ESPA = "École Supérieure Polytechnique d'Antananarivo (ESPA)";

export const DEGREES = [
  { key: 'edu1', company: ESPA, start: '2018', end: '2020', hasChip: true },
  { key: 'edu2', company: ESPA, start: '2014', end: '2017' },
];

export default function Education() {
  const { t } = useLanguage();

  const degrees = DEGREES.map((d) => ({
    ...d,
    title: t(`${d.key}Title`),
    summary: t(`${d.key}Summary`),
    points: t(`${d.key}Points`),
    chip: d.hasChip ? t(`${d.key}Chip`) : null,
  }));

  return (
    <>
      <section className="service-group">
        <h3 className="group-title">{t('eduDegrees')}</h3>
        <Timeline items={degrees} pointsLabel={t('studies')} />
      </section>

      {CERTIFICATIONS.length > 0 && (
        <section className="service-group">
          <h3 className="group-title">{t('eduCerts')}</h3>
          <Certifications />
        </section>
      )}
    </>
  );
}
