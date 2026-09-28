import { faArrowUp, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "../contexts/LanguageContext";

/*
 * La visibilité du bouton "haut de page" et son anneau de progression
 * sont pilotés en CSS par data-scrolled-far et --scroll (voir useScrollVars).
 */
export default function FloatingActions({ onMessageClick }) {
  const { t } = useLanguage();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fab-stack">
      <button className="fab fab-top" onClick={scrollToTop} aria-label={t("backToTop")}>
        <svg className="fab-ring" viewBox="0 0 46 46" aria-hidden="true">
          <circle className="track" cx="23" cy="23" r="20" />
          <circle className="bar" cx="23" cy="23" r="20" />
        </svg>
        <FontAwesomeIcon icon={faArrowUp} />
        <span className="fab-tip">{t("backToTop")}</span>
      </button>

      <button className="fab fab-chat" onClick={onMessageClick} aria-label={t("chatWithMe")}>
        <FontAwesomeIcon icon={faMessage} />
        <span className="fab-tip">{t("chatWithMe")}</span>
      </button>
    </div>
  );
}
