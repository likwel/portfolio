import { useState } from "react";
import { faPhone, faEnvelope, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DuotoneIcon from "./DuotoneIcon";
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';

const P = "#007b8b";

export default function Modal({ open, setOpen, onClose }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    from_name: "", from_email: "", subject: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          senderName:  formData.from_name,
          senderEmail: formData.from_email,
          subject:     formData.subject,
          senderMsg:   formData.message,
          to_email:    'eliefenohasina@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ from_name: "", from_email: "", subject: "", message: "" });
      }, 3000);
    } catch (err) {
      setError(t('emailError') || 'Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          z-index: 2000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .modal-overlay { align-items: center; padding: 16px; }
        }

        .modal-box {
          position: relative;
          background: #fff;
          width: 100%;
          height: calc(100vh - 60px);
          border-radius: 20px 20px 0 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .modal-box {
            border-radius: 16px;
            max-width: 780px;
            height: auto;
            max-height: 88vh;
            flex-direction: column;
            overflow: visible;
          }
        }

        .modal-scroll {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 640px) {
          .modal-scroll {
            flex-direction: row;
            max-height: 88vh;
            overflow-y: auto;
          }
        }

        .modal-handle {
          width: 40px; height: 4px;
          background: #e2e8f0; border-radius: 99px;
          margin: 12px auto 0; flex-shrink: 0;
        }
        @media (min-width: 640px) { .modal-handle { display: none; } }

        .modal-title {
          font-size: 24px; font-weight: 700;
          color: #0f172a; margin: 0 0 18px;
        }

        .modal-col {
          padding: 24px 20px;
          flex: 1;
        }
        @media (min-width: 640px) {
          .modal-col { padding: 32px 28px; }
          .modal-col:first-child { border-right: 1px solid #f1f5f9; }
        }

        .contact-link {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px; border-radius: 10px;
          border: 1px solid #f1f5f9;
          font-size: 15px; color: #0f172a;
          text-decoration: none;
          transition: background .15s, box-shadow .15s;
        }
        .contact-link:hover { background: #f8fafc; box-shadow: 0 2px 8px rgba(0,0,0,.06); }

        .form-label {
          display: block; font-size: 14px; font-weight: 600;
          color: #374151; margin-bottom: 6px;
          width: fit-content; 
        }
        .form-input {
          width: 100%; padding: 12px;
          border: 1px solid #e2e8f0; border-radius: 8px;
          font-size: 15px; color: #0f172a;
          outline: none; box-sizing: border-box;
          transition: border-color .15s;
          font-family: inherit;
        }
        .form-input:focus { border-color: ${P}; box-shadow: 0 0 0 3px ${P}22; }

        .submit-btn {
          width: 100%; padding: 13px 0;
          background: ${P}; color: #fff;
          border: none; border-radius: 8px;
          font-size: 15px; font-weight: 600;
          cursor: pointer; display: flex;
          align-items: center; justify-content: center; gap: 8px;
          transition: background .15s;
          margin-top: 4px;
        }
        .submit-btn:hover:not(:disabled) { background: #005f6e; }
        .submit-btn:disabled { background: #94a3b8; cursor: not-allowed; }

        .close-btn {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px; border-radius: 50%;
          background: #f1f5f9; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #64748b; z-index: 10;
          transition: background .15s;
        }
        .close-btn:hover { background: #e2e8f0; }

        .section-label {
          font-size: 11px; font-weight: 700;
          color: #94a3b8; text-transform: uppercase;
          letter-spacing: 1px; margin: 0 0 10px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            {/* Poignée mobile */}
            <div className="modal-handle" />

            {/* Bouton fermer */}
            <button className="close-btn" onClick={handleClose}>
              <FontAwesomeIcon icon={faXmark} style={{ fontSize: 14 }} />
            </button>

            {/* Zone scrollable */}
            <div className="modal-scroll">

              {/* ── COL 1 : infos contact ── */}
              <div className="modal-col">
                <h2 className="modal-title">{t('contactInfo') || "Informations de contact"}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <p className="section-label">{t('phoneNumbers') || "Téléphone"}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <a href="tel:+261348523479" className="contact-link">
                        <DuotoneIcon icon={faPhone} size="text-sm" />
                        +261 34 85 234 79
                      </a>
                      <a href="tel:+261324323601" className="contact-link">
                        <DuotoneIcon icon={faPhone} size="text-sm" />
                        +261 32 43 236 01
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="section-label">{t('socialNetworks') || "Réseaux"}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <a href="https://www.linkedin.com/in/elie-fenohasina/" target="_blank" rel="noopener noreferrer" className="contact-link">
                        <DuotoneIcon icon={faLinkedin} size="text-sm" />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Elie Fenohasina</span>
                      </a>
                      <a href="https://github.com/likwel" target="_blank" rel="noopener noreferrer" className="contact-link">
                        <DuotoneIcon icon={faGithub} size="text-sm" />
                        github.com/likwel
                      </a>
                      <a href="mailto:eliefenohasina@gmail.com" className="contact-link">
                        <DuotoneIcon icon={faEnvelope} size="text-sm" />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>eliefenohasina@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── COL 2 : formulaire ── */}
              <div className="modal-col" style={{ borderTop: "1px solid #f1f5f9" }}>
                <h2 className="modal-title">{t('sendMessage') || "Envoyer un message"}</h2>

                {submitted && (
                  <div style={{ background: "#f0fdf4", border: "1px solid #86efac", color: "#166534", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 14 }}>
                    {t('messageSent') || "Message envoyé avec succès !"}
                  </div>
                )}
                {error && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#991b1b", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 14 }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 32 }}>
                  <div>
                    <label className="form-label">{t('yourName') || "Votre nom"}</label>
                    <input className="form-input" type="text" name="from_name" value={formData.from_name} onChange={handleChange} placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="form-label">{t('yourEmail') || "Votre email"}</label>
                    <input className="form-input" type="email" name="from_email" value={formData.from_email} onChange={handleChange} placeholder="your.email@example.com" required />
                  </div>
                  <div>
                    <label className="form-label">{t('subject') || "Sujet"}</label>
                    <input className="form-input" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={t('subjectPlaceholder') || "Sujet du message"} required />
                  </div>
                  <div>
                    <label className="form-label">{t('message') || "Message"}</label>
                    <textarea className="form-input" name="message" value={formData.message} onChange={handleChange} placeholder={t('messagePlaceholder') || "Votre message..."} rows={4} required style={{ resize: "none" }} />
                  </div>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <div style={{ width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                        {t('sending') || "Envoi…"}
                      </>
                    ) : (
                      <>
                        <DuotoneIcon icon={faPaperPlane} size="text-sm" backActive={false} fgColor="text-white" />
                        {t('sendMessageBtn') || "Envoyer"}
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>{/* fin modal-scroll */}
          </div>{/* fin modal-box */}
        </div>
    </>
  );
}