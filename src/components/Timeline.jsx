import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faBuilding, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../contexts/LanguageContext";
import { formatPeriod, formatDuration } from "../utils/dates";

/* Frise verticale partagée par Expériences et Formation */
export default function Timeline({ items, pointsLabel }) {
  const { t, language } = useLanguage();

  return (
    <ol className="timeline stagger">
      {items.map((item, i) => {
        const current = !item.end;
        const duration = item.showDuration ? formatDuration(item.start, item.end, t) : null;
        const points = Array.isArray(item.points) ? item.points : [];

        return (
          <li key={i} className="tl-item" style={{ "--i": i }}>
            <span className={`tl-dot ${current ? "is-current" : ""}`} aria-hidden="true" />

            <article className="tl-card">
              <div className="tl-head">
                <span className="tl-date">
                  <FontAwesomeIcon icon={faCalendar} />
                  {formatPeriod(item.start, item.end, language, t)}
                </span>
                {duration && <span className="tl-duration">{duration}</span>}
                {current && (
                  <span className="chip chip-success chip-xs">
                    <span className="dot-live" />
                    {t("currentRole")}
                  </span>
                )}
                {item.chip && <span className="chip chip-xs">{item.chip}</span>}
              </div>

              <h3 className="tl-title">{item.title}</h3>
              <p className="tl-org">
                <FontAwesomeIcon icon={faBuilding} />
                {item.company}
              </p>
              {item.summary && <p className="tl-summary">{item.summary}</p>}

              {points.length > 0 && (
                <>
                  <span className="tl-label">{pointsLabel}</span>
                  <ul className="tl-points">
                    {points.map((point) => (
                      <li key={point}>
                        <FontAwesomeIcon icon={faCheck} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {item.tech?.length > 0 && (
                <div className="tech-tags tl-tags">
                  {item.tech.map((name) => <span key={name} className="tech-tag">{name}</span>)}
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
