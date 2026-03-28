import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function CollapseSection({
  id,
  title,
  icon,
  badge,
  subtitle,
  children,
  isOpen,
  onToggle,
}) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  /* Calcule la hauteur réelle du contenu pour l'animation */
  useEffect(() => {
    if (!bodyRef.current) return;
    if (isOpen) {
      setHeight(bodyRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, children]);

  return (
    <div
      id={id}
      style={{
        background: "#fff",
        border: "1px solid #f1f5f9",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 10,
        transition: "box-shadow .2s",
        boxShadow: isOpen ? "0 4px 16px rgba(0,0,0,.06)" : "0 1px 3px rgba(0,0,0,.03)",
      }}
    >
      {/* ── Header ── */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background .15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        {/* Left — icône + texte */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 38, height: 38,
              borderRadius: 9,
              background: isOpen ? "#f0fdf9" : "#f8fafc",
              border: isOpen ? "1px solid #a7f3d0" : "1px solid #f1f5f9",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: isOpen ? "#0F9E78" : "#94a3b8",
              flexShrink: 0,
              transition: "all .2s",
            }}
          >
            <FontAwesomeIcon icon={icon} style={{ fontSize: 15 }} />
          </div>

          <div>
            <div
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: "#0f172a",
                lineHeight: 1.3,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {/* Right — badge + chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {badge && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#0F9E78",
                background: "#f0fdf9",
                border: "1px solid #a7f3d0",
                borderRadius: 20,
                padding: "3px 10px",
              }}
            >
              {badge}
            </span>
          )}
          <div
            style={{
              width: 28, height: 28,
              borderRadius: 7,
              background: isOpen ? "#f0fdf9" : "#f8fafc",
              border: isOpen ? "1px solid #a7f3d0" : "1px solid #f1f5f9",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: isOpen ? "#0F9E78" : "#94a3b8",
              transition: "all .2s",
            }}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{
                fontSize: 11,
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .25s ease",
              }}
            />
          </div>
        </div>
      </button>

      {/* ── Body animé ── */}
      <div
        ref={bodyRef}
        style={{
          maxHeight: height,
          overflow: "hidden",
          transition: "max-height .35s ease",
          borderTop: isOpen ? "1px solid #f1f5f9" : "none",
        }}
      >
        <div style={{ padding: "20px 20px 24px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}