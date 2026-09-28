import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../contexts/LanguageContext";
import Reveal from "./Reveal";

const SOCIALS = [
  { href: "https://github.com/likwel",                   label: "GitHub",   icon: faGithub   },
  { href: "https://www.linkedin.com/in/elie-fenohasina/", label: "LinkedIn", icon: faLinkedin },
  { href: "mailto:eliefenohasina@gmail.com",             label: "Email",    icon: faEnvelope },
];

export default function Footer({ onContact }) {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container">
        <Reveal className="cta-band">
          <span className="blob blob-a" aria-hidden="true" />
          <span className="blob blob-b" aria-hidden="true" />
          <span className="dot-grid" aria-hidden="true" />

          <div>
            <p className="script">{t("ctaScript")}</p>
            <h2>{t("ctaTitle")}</h2>
            <p>{t("ctaText")}</p>
          </div>

          <div className="cta-actions">
            <button className="btn btn-copper" onClick={onContact}>
              {t("contactMe")}
              <FontAwesomeIcon icon={faArrowRight} className="icon-shift" />
            </button>
            <a className="btn btn-on-dark" href="https://github.com/likwel" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
              GitHub
            </a>
          </div>
        </Reveal>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Elie Andriatsitohaina · {t("allRightsReserved")}</span>
          <div className="footer-social">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                className="social-btn"
                href={s.href}
                aria-label={s.label}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <FontAwesomeIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
