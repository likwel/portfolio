import { useState, useEffect, useRef } from "react";
import {
  faPhone, faEnvelope, faPaperPlane, faXmark, faUser, faTag, faCopy, faCheck, faClock, faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage, translations } from '../contexts/LanguageContext';
import { useLockBodyScroll } from "../hooks/motion";
import emailjs from '@emailjs/browser';

const PHONES = [
  { href: "tel:+261348523479", label: "+261 34 85 234 79" },
  { href: "tel:+261373977732", label: "+261 37 39 777 32" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/in/elie-fenohasina/", label: "Elie Fenohasina",          icon: faLinkedin, external: true },
  { href: "https://github.com/likwel",                   label: "github.com/likwel",        icon: faGithub,   external: true },
  { href: "mailto:eliefenohasina@gmail.com",             label: "eliefenohasina@gmail.com", icon: faEnvelope, copy: "eliefenohasina@gmail.com" },
];

const REQUEST_TYPES = ['rtFreelance', 'rtJob', 'rtCollab', 'rtOther'];
const EMPTY_FORM = { from_name: "", from_email: "", subject: "", message: "", requestType: "", website: "" };
const MAX_MESSAGE = 1500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VALIDATED = ["from_name", "from_email", "subject", "message"];

/* Retourne la clé de traduction de l'erreur d'un champ, ou null */
function validate(name, value) {
  const v = value.trim();
  if (name === "from_name" || name === "subject") return v ? null : "errRequired";
  if (name === "from_email") return !v ? "errRequired" : EMAIL_RE.test(v) ? null : "errEmail";
  if (name === "message") return !v ? "errRequired" : v.length < 10 ? "errMessage" : null;
  return null;
}

function CopyButton({ value }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* presse-papiers indisponible : on ne fait rien */ }
  };
  return (
    <button type="button" className={`copy-btn ${copied ? "is-copied" : ""}`} onClick={copy} aria-label={t('copy')}>
      <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
      <span>{copied ? t('copied') : t('copy')}</span>
    </button>
  );
}

/* Heure locale d'Elie, mise à jour toutes les 30 s */
function LocalTime() {
  const { t, language } = useLanguage();
  const format = () => new Date().toLocaleTimeString(language === "fr" ? "fr-FR" : "en-GB", {
    hour: "2-digit", minute: "2-digit", timeZone: "Indian/Antananarivo",
  });
  const [time, setTime] = useState(format);
  useEffect(() => {
    setTime(format());
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
  }, [language]);
  return (
    <p className="modal-time">
      <FontAwesomeIcon icon={faClock} />
      {t('localTime').replace('{time}', time)}
    </p>
  );
}

export default function Modal({ setOpen, onClose }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [touched,  setTouched]  = useState({});
  const [sentTo,   setSentTo]   = useState(null);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [closing,  setClosing]  = useState(false);
  const formRef = useRef(null);

  useLockBodyScroll(true);

  /* Fermeture animée */
  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      onClose?.();
    }, 260);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closing]);

  useEffect(() => {
    const id = setTimeout(() => formRef.current?.querySelector("input")?.focus(), 300);
    return () => clearTimeout(id);
  }, []);

  const errors = Object.fromEntries(VALIDATED.map((k) => [k, validate(k, formData[k])]));
  const showError = (k) => touched[k] && errors[k];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTouched(Object.fromEntries(VALIDATED.map((k) => [k, true])));
    const firstInvalid = VALIDATED.find((k) => errors[k]);
    if (firstInvalid) {
      formRef.current?.querySelector(`#cf-${firstInvalid}`)?.focus();
      return;
    }

    const done = () => setSentTo({ name: formData.from_name.trim(), email: formData.from_email.trim() });

    // Champ piège rempli = robot : on simule un succès sans rien envoyer
    if (formData.website) { done(); return; }

    setLoading(true);
    const name = formData.from_name.trim();
    try {
      // Variables du modèle emailjs/contact-template.html (lu par Elie, donc en français)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          senderName:      name,
          senderInitial:   name.charAt(0).toUpperCase() || "?",
          senderEmail:     formData.from_email.trim(),
          subject:         formData.subject.trim(),
          senderMsg:       formData.message.trim(),
          requestType:     formData.requestType ? translations.fr[formData.requestType] : "Non précisé",
          visitorLanguage: language === "fr" ? "Français" : "Anglais",
          sentAt:          new Date().toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Indian/Antananarivo" }),
          pageUrl:         window.location.origin + window.location.pathname,
          replySubject:    encodeURIComponent(`Re: ${formData.subject.trim()}`),
          reply_to:        formData.from_email.trim(),
          to_email:        'eliefenohasina@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      done();
    } catch (err) {
      setError(t('emailError'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  /* En quittant un champ, on ne signale que les erreurs de format : « champ requis »
     n'apparaît qu'à l'envoi, sinon le décalage fait rater le clic sur « Envoyer » */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim()) setTouched((prev) => ({ ...prev, [name]: true }));
  };

  /* Ctrl/Cmd + Entrée pour envoyer depuis le message */
  const onMessageKey = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) formRef.current?.requestSubmit();
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setTouched({});
    setSentTo(null);
    setTimeout(() => formRef.current?.querySelector("input")?.focus(), 50);
  };

  const field = (name) => ({
    id: `cf-${name}`,
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": showError(name) ? "true" : "false",
    "aria-describedby": showError(name) ? `cf-${name}-err` : undefined,
  });

  const fieldError = (name) => (showError(name)
    ? <span id={`cf-${name}-err`} className="field-error">{t(errors[name])}</span>
    : null);

  return (
    <div className={`modal-overlay ${closing ? "is-closing" : ""}`} onClick={handleClose}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose} aria-label={t('close')}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="modal-scroll">
          {/* ── Infos de contact ── */}
          <div className="modal-aside">
            <span className="blob" aria-hidden="true" />
            <div className="modal-handle" />
            <p className="script">{t('contactScript')}</p>
            <h2>{t('contactInfo')}</h2>
            <LocalTime />

            <div className="modal-group">
              <p className="modal-label">{t('phoneNumbers')}</p>
              <div className="contact-links">
                {PHONES.map((p) => (
                  <a key={p.href} href={p.href} className="contact-link">
                    <span className="icon-tile"><FontAwesomeIcon icon={faPhone} /></span>
                    <span className="contact-link-label">{p.label}</span>
                    <CopyButton value={p.label.replace(/\s/g, "")} />
                  </a>
                ))}
              </div>
            </div>

            <div className="modal-group">
              <p className="modal-label">{t('socialNetworks')}</p>
              <div className="contact-links">
                {SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="contact-link"
                    {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="icon-tile"><FontAwesomeIcon icon={s.icon} /></span>
                    <span className="contact-link-label">{s.label}</span>
                    {s.copy && <CopyButton value={s.copy} />}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Formulaire ou confirmation ── */}
          <div className="modal-main">
            {sentTo ? (
              <div className="form-success" role="status">
                <svg className="success-check" viewBox="0 0 52 52" aria-hidden="true">
                  <circle cx="26" cy="26" r="24" />
                  <path d="M15 27l7 7 15-15" />
                </svg>
                <h2 id="contact-title">{t('msgSentTitle')}</h2>
                <p>
                  {t('msgSentText').replace('{name}', sentTo.name)}{" "}
                  <strong>{sentTo.email}</strong>.
                </p>
                <div className="form-success-actions">
                  <button className="btn btn-secondary btn-sm" onClick={resetForm}>
                    <FontAwesomeIcon icon={faRotateLeft} />
                    {t('sendAnother')}
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={handleClose}>{t('close')}</button>
                </div>
              </div>
            ) : (
              <>
                <h2 id="contact-title">{t('sendMessage')}</h2>

                <form ref={formRef} className="modal-form" onSubmit={handleSubmit} noValidate>
                  {error && <div className="form-alert is-error" role="alert">{error}</div>}

                  <div className="form-row">
                    <div>
                      <label className="form-label" htmlFor="cf-from_name">{t('yourName')}</label>
                      <div className="input-wrap">
                        <FontAwesomeIcon icon={faUser} />
                        <input className="form-input" type="text" placeholder="John Doe" autoComplete="name" {...field("from_name")} />
                      </div>
                      {fieldError("from_name")}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="cf-from_email">{t('yourEmail')}</label>
                      <div className="input-wrap">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input className="form-input" type="email" placeholder={t('emailPlaceholder')} autoComplete="email" {...field("from_email")} />
                      </div>
                      {fieldError("from_email")}
                    </div>
                  </div>

                  <fieldset className="rt-field">
                    <legend className="form-label">{t('requestTypeLabel')} <span className="form-optional">{t('optional')}</span></legend>
                    <div className="rt-chips">
                      {REQUEST_TYPES.map((key) => (
                        <label key={key} className={`rt-chip ${formData.requestType === key ? "is-active" : ""}`}>
                          <input type="radio" name="requestType" value={key} checked={formData.requestType === key} onChange={handleChange} />
                          {formData.requestType === key && <FontAwesomeIcon icon={faCheck} />}
                          {t(key)}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label className="form-label" htmlFor="cf-subject">{t('subject')}</label>
                    <div className="input-wrap">
                      <FontAwesomeIcon icon={faTag} />
                      <input className="form-input" type="text" placeholder={t('subjectPlaceholder')} {...field("subject")} />
                    </div>
                    {fieldError("subject")}
                  </div>

                  <div>
                    <label className="form-label" htmlFor="cf-message">{t('message')}</label>
                    <textarea
                      className="form-input"
                      placeholder={t('messagePlaceholder')}
                      rows={5}
                      maxLength={MAX_MESSAGE}
                      onKeyDown={onMessageKey}
                      style={{ resize: "vertical" }}
                      {...field("message")}
                    />
                    <div className="form-meta">
                      {fieldError("message") || <span />}
                      <span className={`char-count ${formData.message.length > MAX_MESSAGE * 0.9 ? "is-warn" : ""}`}>
                        {formData.message.length} / {MAX_MESSAGE}
                      </span>
                    </div>
                  </div>

                  {/* Piège anti-spam : invisible pour les humains */}
                  <div className="hp-field" aria-hidden="true">
                    <label htmlFor="cf-website">Website</label>
                    <input id="cf-website" type="text" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", marginTop: 4 }}>
                    {loading ? (
                      <>
                        <span className="spinner" />
                        {t('sending')}
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} className="icon-shift" />
                        {t('sendMessageBtn')}
                      </>
                    )}
                  </button>
                  <p className="form-shortcut">{t('sendShortcut')}</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
