import { CSSProperties } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { trackPointer } from "../hooks/motion";

interface ServiceItemProps {
  index: number;
  icon: IconDefinition;
  title: string;
  description: string;
  points?: string[];
  tech?: string[];
  projects?: string[];
  projectsLabel?: string;
}

export default function ServiceItem({
  index, icon, title, description, points, tech = [], projects = [], projectsLabel,
}: ServiceItemProps) {
  return (
    <article
      className="service-card"
      style={{ "--i": index } as CSSProperties}
      onPointerMove={trackPointer}
    >
      <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
      <span className="icon-tile">
        <FontAwesomeIcon icon={icon} />
      </span>
      <h4>{title}</h4>
      <p>{description}</p>

      {Array.isArray(points) && points.length > 0 && (
        <ul className="service-points">
          {points.map((point) => (
            <li key={point}>
              <FontAwesomeIcon icon={faCheck} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="service-foot">
        {tech.length > 0 && (
          <div className="tech-tags">
            {tech.map((name) => <span key={name} className="tech-tag">{name}</span>)}
          </div>
        )}
        {projects.length > 0 && (
          <p className="service-proof">
            <span>{projectsLabel}</span> {projects.join(" · ")}
          </p>
        )}
      </div>
    </article>
  );
}
