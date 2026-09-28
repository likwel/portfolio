import { useState, useEffect } from "react";
import { faPhone, faEnvelope, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
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
  { href: "mailto:eliefenohasina@gmail.com",             label: "eliefenohasina@gmail.com", icon: faEnvelope },
];

const REQUEST_TYPES = ['rtFreelance', 'rtJob', 'rtCollab', 'rtOther'];
const EMPTY_FORM = { from_name: "", from_email: "", subject: "", message: "", requestType: "", website: "" };

export default function Modal({ setOpen, onClose }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);

  useLockBodyScroll(true);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const done = () => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(EMPTY_FORM);
      }, 3000);
    };

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose} aria-label="Fermer">
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="modal-scroll">
          {/* ── Infos de contact ── */}
          <div className="modal-aside">
            <span className="blob" aria-hidden="true" />
            <div className="modal-handle" />
            <p className="script">{t('contactScript')}</p>
            <h2>{t('contactInfo')}</h2>

            <div className="modal-group">
              <p className="modal-label">{t('phoneNumbers')}</p>
              <div className="contact-links">
                {PHONES.map((p) => (
                  <a key={p.href} href={p.href} className="contact-link">
                    <span className="icon-tile"><FontAwesomeIcon icon={faPhone} /></span>
                    <span>{p.label}</span>
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
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Formulaire ── */}
          <div className="modal-main">
            <h2 id="contact-title">{t('sendMessage')}</h2>

            <form className="modal-form" onSubmit={handleSubmit}>
              {submitted && <div className="form-alert is-success" role="status">{t('messageSent')}</div>}
              {error && <div className="form-alert is-error" role="alert">{error}</div>}

              <div>
                <label className="form-label" htmlFor="cf-name">{t('yourName')}</label>
                <input id="cf-name" className="form-input" type="text" name="from_name" value={formData.from_name} onChange={handleChange} placeholder="John Doe" autoComplete="name" required />
              </div>
              <div>
                <label className="form-label" htmlFor="cf-email">{t('yourEmail')}</label>
                <input id="cf-email" className="form-input" type="email" name="from_email" value={formData.from_email} onChange={handleChange} placeholder={t('emailPlaceholder')} autoComplete="email" required />
              </div>
              <fieldset className="rt-field">
                <legend className="form-label">{t('requestTypeLabel')}</legend>
                <div className="rt-chips">
                  {REQUEST_TYPES.map((key) => (
                    <label key={key} className={`rt-chip ${formData.requestType === key ? "is-active" : ""}`}>
                      <input type="radio" name="requestType" value={key} checked={formData.requestType === key} onChange={handleChange} />
                      {t(key)}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label className="form-label" htmlFor="cf-subject">{t('subject')}</label>
                <input id="cf-subject" className="form-input" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={t('subjectPlaceholder')} required />
              </div>
              <div>
                <label className="form-label" htmlFor="cf-message">{t('message')}</label>
                <textarea id="cf-message" className="form-input" name="message" value={formData.message} onChange={handleChange} placeholder={t('messagePlaceholder')} rows={4} required style={{ resize: "none" }} />
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
