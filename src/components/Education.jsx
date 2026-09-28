import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Timeline from "./Timeline";
import { useLanguage } from '../contexts/LanguageContext';
import { CERTIFICATIONS } from "../data/certifications";
import { formatMonth } from "../utils/dates";
import { trackPointer } from "../hooks/motion";

const ESPA = "École Supérieure Polytechnique d'Antananarivo (ESPA)";

export const DEGREES = [
  { key: 'edu1', company: ESPA, start: '2018', end: '2020', hasChip: true },
  { key: 'edu2', company: ESPA, start: '2014', end: '2017' },
];

export default function Education() {
  const { t, language } = useLanguage();

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
          <div className="cert-grid stagger">
            {CERTIFICATIONS.map((cert, i) => {
              const skills = Array.isArray(cert.skills) ? cert.skills : cert.skills?.[language] || [];
              return (
              <article key={cert.name} className="cert-card" style={{ "--i": i }} onPointerMove={trackPointer}>
                <span className="cert-seal"><FontAwesomeIcon icon={faAward} /></span>
                <div className="cert-body">
                  <h4>{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-meta">
                    {t('certIssued')} {formatMonth(cert.date, language)}
                    {cert.platform && <> · {t('certVia')} {cert.platform}</>}
                    {cert.credentialId && <> · ID {cert.credentialId}</>}
                  </p>
                  {skills.length > 0 && (
                    <div className="tech-tags">
                      {skills.map((s) => <span key={s} className="tech-tag">{s}</span>)}
                    </div>
                  )}
                  {cert.url && (
                    <a className="link-arrow" href={cert.url} target="_blank" rel="noopener noreferrer">
                      {t('certView')}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  )}
                </div>
              </article>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
