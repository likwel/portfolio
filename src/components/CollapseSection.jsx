import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "../hooks/motion";

export default function CollapseSection({
  id,
  index,
  title,
  icon,
  badge,
  subtitle,
  children,
  isOpen,
  onToggle,
}) {
  const [ref, inView] = useInView();
  const headId = `${id}-head`;
  const bodyId = `${id}-body`;

  return (
    <div
      ref={ref}
      id={id}
      className={`collapse-card reveal ${inView ? "is-visible" : ""} ${isOpen ? "is-open" : ""}`}
      style={{ "--d": `${(index || 0) * 70}ms` }}
    >
      <button
        id={headId}
        className="collapse-head"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={bodyId}
      >
        <span className="collapse-index">{String(index + 1).padStart(2, "0")}</span>

        <span className="icon-tile">
          <FontAwesomeIcon icon={icon} />
        </span>

        <span>
          <span className="collapse-title">{title}</span>
          {subtitle && <span className="collapse-sub">{subtitle}</span>}
        </span>

        {badge ? <span className="chip chip-success collapse-badge">{badge}</span> : <span />}

        <span className="collapse-chevron">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </button>

      {/* Hauteur animée via grid-template-rows 0fr → 1fr */}
      <div id={bodyId} className="collapse-body" role="region" aria-labelledby={headId}>
        <div className="collapse-inner">
          <div className="collapse-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
