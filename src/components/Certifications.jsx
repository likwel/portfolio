import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare, faShieldHalved, faFileLines, faCertificate, faTrophy,
  faCalendar, faGraduationCap, faCopy, faCheck, faExpand, faArrowRight,
  faTimes, faChevronLeft, faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../contexts/LanguageContext";
import { CERTIFICATIONS } from "../data/certifications";
import { formatMonth } from "../utils/dates";
import { useLockBodyScroll, prefersReducedMotion } from "../hooks/motion";

const KINDS = {
  certificate: { icon: faFileLines,   label: "certKindCertificate" },
  badge:       { icon: faCertificate, label: "certKindBadge" },
  achievement: { icon: faTrophy,      label: "certKindAchievement" },
};
const DOMAINS = {
  meal:     { label: "certDomainMeal",     color: "var(--copper)" },
  data:     { label: "certDomainData",     color: "var(--verdigris)" },
  language: { label: "certDomainLanguage", color: "var(--sky)" },
};

/* Délivrée il y a moins de 3 mois */
const isRecent = (date) => {
  const [y, m] = date.split("-").map(Number);
  const now = new Date();
  return (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m) < 3;
};

/* Inclinaison 3D + reflet qui suivent la souris */
const canTilt = () => window.matchMedia?.("(hover: hover) and (pointer: fine)").matches && !prefersReducedMotion();
function onTilt(e) {
  if (e.pointerType !== "mouse" || !canTilt()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
  el.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
  el.style.setProperty("--sx", `${x * 100}%`);
  el.style.setProperty("--sy", `${y * 100}%`);
}
function resetTilt(e) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

function CopyId({ value }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* presse-papiers indisponible */ }
  };
  return (
    <button type="button" className={`cert-id ${copied ? "is-copied" : ""}`} onClick={copy} title={t("copy")}>
      ID {value}
      <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
    </button>
  );
}

function CertMedia({ cert }) {
  if (!cert.image) {
    return (
      <span className="cert-placeholder" aria-hidden="true">
        <FontAwesomeIcon icon={KINDS[cert.kind]?.icon || faCertificate} />
      </span>
    );
  }
  return cert.kind === "badge"
    ? <img className="cert-badge-img" src={cert.image} alt="" loading="lazy" />
    : <img className="cert-doc" src={cert.image} alt="" loading="lazy" />;
}

function Preview({ items, index, setIndex, onClose }) {
  const { t, language } = useLanguage();
  const cert = items[index];
  useLockBodyScroll(true);

  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length, setIndex]);
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length, setIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox cert-lightbox" role="dialog" aria-modal="true" aria-label={cert.name} onClick={(e) => e.stopPropagation()}>
        <div className="lb-bar">
          <div className="lb-bar-title">
            <strong>{cert.name}</strong>
            <span>{index + 1} / {items.length}</span>
          </div>
          <div className="lb-tools">
            <button className="lb-icon-btn is-danger" onClick={onClose} aria-label={t("close")}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>

        <div className={`lb-stage cert-stage kind-${cert.kind}`}>
          <img key={cert.name} src={cert.image} alt={cert.name} />
          {items.length > 1 && (
            <>
              <button className="lb-nav prev" onClick={prev} aria-label={t("prevImage")}><FontAwesomeIcon icon={faChevronLeft} /></button>
              <button className="lb-nav next" onClick={next} aria-label={t("nextImage")}><FontAwesomeIcon icon={faChevronRight} /></button>
            </>
          )}
        </div>

        <div className="cert-lb-foot">
          <span>
            <strong>{cert.issuer}</strong> · {formatMonth(cert.date, language)}
            {cert.platform && <> · {t("certVia")} {cert.platform}</>}
          </span>
          {cert.url && (
            <a className="btn btn-primary btn-sm" href={cert.url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faShieldHalved} />
              {t("certVerify")}
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Certifications() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState(null);

  const visible = filter === "all" ? CERTIFICATIONS : CERTIFICATIONS.filter((c) => c.domain === filter);
  const withImage = visible.filter((c) => c.image);
  const domains = Object.keys(DOMAINS).filter((d) => CERTIFICATIONS.some((c) => c.domain === d));
  const filters = [
    { key: "all", label: t("all"), count: CERTIFICATIONS.length },
    ...domains.map((d) => ({ key: d, label: t(DOMAINS[d].label), count: CERTIFICATIONS.filter((c) => c.domain === d).length })),
  ];

  const openPreview = (cert) => setPreview(withImage.indexOf(cert));
  const closePreview = useCallback(() => setPreview(null), []);

  return (
    <>
      <div className="filter-bar" role="tablist" aria-label={t("eduCerts")}>
        {filters.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={`filter-chip ${filter === f.key ? "is-active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="count">{f.count}</span>
          </button>
        ))}
      </div>

      {/* key={filter} : la grille est recréée pour rejouer la cascade */}
      <div key={filter} className="cert-grid stagger" role="tabpanel">
        {visible.map((cert, i) => {
          const skills = Array.isArray(cert.skills) ? cert.skills : cert.skills?.[language] || [];
          const kind = KINDS[cert.kind] || KINDS.certificate;
          const domain = DOMAINS[cert.domain];
          return (
            <article
              key={cert.name}
              className={`cert-card kind-${cert.kind}`}
              style={{ "--i": i, "--accent": domain?.color || "var(--verdigris)" }}
              onPointerMove={onTilt}
              onPointerLeave={resetTilt}
            >
              <div
                className={`cert-media ${cert.image ? "is-zoomable" : ""}`}
                onClick={cert.image ? () => openPreview(cert) : undefined}
              >
                <CertMedia cert={cert} />
                <span className="cert-kind"><FontAwesomeIcon icon={kind.icon} />{t(kind.label)}</span>
                {isRecent(cert.date) && <span className="cert-new">{t("certNew")}</span>}
                {cert.image && <span className="cert-zoom" aria-hidden="true"><FontAwesomeIcon icon={faExpand} /></span>}
                <span className="cert-shine" aria-hidden="true" />
              </div>

              <div className="cert-body">
                {domain && <span className="cert-domain">{t(domain.label)}</span>}
                <h4>{cert.name}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
                <div className="cert-facts">
                  <span><FontAwesomeIcon icon={faCalendar} />{formatMonth(cert.date, language)}</span>
                  {cert.platform && <span><FontAwesomeIcon icon={faGraduationCap} />{cert.platform}</span>}
                  {cert.credentialId && <CopyId value={cert.credentialId} />}
                </div>
                {skills.length > 0 && (
                  <div className="tech-tags">
                    {skills.map((s) => <span key={s} className="tech-tag">{s}</span>)}
                  </div>
                )}
                <div className="cert-actions">
                  {cert.url && (
                    <a className="cert-verify" href={cert.url} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faShieldHalved} />
                      {t("certVerify")}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="cert-verify-ext" />
                    </a>
                  )}
                  {cert.image && (
                    <button className="link-plain" onClick={() => openPreview(cert)}>
                      {t("preview")}
                      <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 11 }} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {preview !== null && withImage[preview] && (
        <Preview items={withImage} index={preview} setIndex={setPreview} onClose={closePreview} />
      )}
    </>
  );
}
