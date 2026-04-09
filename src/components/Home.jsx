import { useState, useEffect, useRef } from "react";
import elieImg from "../assets/images/elie.png";
import cv from "../assets/CV_ANDRIATSITOHAINA_ELIE.pdf";
import presentation_en from "../assets/presentation_en.mp3";
import presentation_fr from "../assets/presentation_fr.mp3";
import { PopupModal } from "react-calendly";
import { faPlay, faPause, faCalendarDays, faDownload } from "@fortawesome/free-solid-svg-icons";
import DuotoneIcon from "./DuotoneIcon";
import { useLanguage } from "../contexts/LanguageContext";

const P  = "#0c8a68";
const PL = "#f0faf7";
const PB = "#6fcba8";

const SPEED = 70;
const PAUSE = 1400;
const ERASE = 35;

function parseJobTitle(jobTitle) {
  return jobTitle.split("&").map((part) => {
    const words = part.trim().split(" ");
    const accent = words.pop();
    const plain  = words.join(" ") + " ";
    return { plain, accent };
  });
}

function TypewriterTitle({ color, lines }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [text,    setText]    = useState("");
  const [phase,   setPhase]   = useState("typing");
  const timer = useRef(null);

  const full = (i) => lines[i].plain + lines[i].accent;

  useEffect(() => {
    const clr = () => clearTimeout(timer.current);

    if (phase === "typing") {
      if (text.length < full(lineIdx).length) {
        timer.current = setTimeout(
          () => setText(full(lineIdx).slice(0, text.length + 1)),
          SPEED
        );
      } else {
        timer.current = setTimeout(() => setPhase("erasing"), PAUSE);
      }
    }

    if (phase === "erasing") {
      if (text.length > 0) {
        timer.current = setTimeout(() => setText(t => t.slice(0, -1)), ERASE);
      } else {
        const next = (lineIdx + 1) % lines.length;
        setLineIdx(next);
        setPhase("typing");
      }
    }

    return clr;
  }, [phase, text, lineIdx]);

  const line       = lines[lineIdx];
  const plainPart  = text.slice(0, Math.min(text.length, line.plain.length));
  const accentPart = text.length > line.plain.length ? text.slice(line.plain.length) : "";

  return (
    <h1 style={{
      fontSize: "clamp(2rem, 4vw, 2.75rem)",
      fontWeight: 700,
      color: "#0f172a",
      lineHeight: 1.15,
      letterSpacing: "-0.04em",
      margin: 0,
      display: "flex",
      alignItems: "baseline",
      flexWrap: "wrap",
      gap: "0.3em",
    }}>
      <span>{plainPart}</span>
      <em style={{ fontStyle: "normal", color }}>{accentPart}</em>
      <span style={{
        display: "inline-block",
        width: 3,
        height: "0.85em",
        background: color,
        borderRadius: 2,
        verticalAlign: "baseline",
        animation: "tw-blink 0.7s step-end infinite",
      }} />
      <style>{`@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </h1>
  );
}

export default function Home({ setOpen }) {
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [openCalendly, setOpenCalendly] = useState(false);
  const { language, t } = useLanguage();
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const techStack = ["Python", "Node.js", "Symfony", "React", "TypeScript", "Sring Boot", "SQL/T-SQL", "PostgreSQL", "Docker", "Git"];

  const badges = [
    { label: t("softwareEngineer") || "Software Engineer", color: "#0F9E78", pos: { top: 80,    left: -50   } },
    { label: t("dataEngineer")     || "Data Engineer",     color: "#2563eb", pos: { bottom: 250, right: -10  } },
    { label: t("webDevelopment")   || "Web Development",   color: "#7c3aed", pos: { bottom: 20,  right: -10  } },
  ];

  return (
    <section id="home" style={{ background: "#fff", minHeight: "80vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        #home-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 50px 85px; align-items: center; max-width: 1200px; margin: 0 auto; width: 100%; flex: 1; padding-bottom: 0;}
        .home-desc { font-size: 15px; color: #64748b; line-height: 1.8; margin: 0; max-width: 420px; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; background: #0F9E78; color: #fff; border-radius: 8px; font-size: 14px; font-weight: 600; border: none; cursor: pointer; text-decoration: none; transition: background .2s; }
        .btn-primary:hover { background: #0c8a68; }
        .btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; background: #fff; color: #0f172a; border-radius: 8px; font-size: 14px; font-weight: 500; border: 1.5px solid #e2e8f0; cursor: pointer; text-decoration: none; transition: border-color .2s, background .2s; }
        .btn-secondary:hover { border-color: #0F9E78; background: #f0fdf9; }

        /* ── float-badge avec blur ── */
        .float-badge {
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(1px);
          border: 1px solid rgba(255, 255, 255, 0.45);
          border-radius: 10px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 2;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,.25);
        }

        .float-badge-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .float-badge-text { font-size: 14px; color: #0f172a; font-weight: 600; }
        @keyframes wave { from { transform: scaleY(0.4); } to { transform: scaleY(1.2); } }
        @media (max-width: 900px) {
          #home-inner { grid-template-columns: 1fr !important; padding: 40px 28px !important; gap: 32px !important; }
          #home-right { order: -1; }
          #home-photo-wrap { width: 220px !important; margin: 0 auto; }
          #home-photo-wrap img { width: 200px !important; }
          #home-photo-bg { width: 200px !important; height: 260px !important; border-radius: 100px 100px 0 0 !important; }
          .float-badge.float-badge-1 { top: auto !important; bottom: 150px !important; left: 100% !important; right: auto !important; transform: translateX(-50%) !important; }
          .float-badge.float-badge-2 { top: auto !important; left: 100% !important; right: auto !important; transform: translateX(-50%) !important; }
          .float-badge.float-badge-0 { top: auto !important; bottom: 80px !important;  left: -80px !important; right: auto !important; transform: none !important; }
          .home-desc { text-align: center; margin: 0 auto !important; }
          #home-badge-row, #home-name-row { justify-content: center; }
          #home-btn-row { justify-content: center; }
          #home-tech { padding: 12px 28px !important; }
        }
        @media (max-width: 480px) {
          #home-btn-row { flex-direction: column; align-items: stretch; }
          #home-btn-row .btn-primary, #home-btn-row .btn-secondary { justify-content: center; }
        }
        @media (max-width: 768px) {
          #home-tech { padding: 12px 40px !important; gap: 16px !important; }
        }
      `}</style>

      <audio ref={audioRef} src={language === "fr" ? presentation_fr : presentation_en} />

      <div id="home-inner">

        {/* ── LEFT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

          {/* Badge disponible */}
          <div id="home-badge-row" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: PL, border: `1px solid ${PB}`,
              borderRadius: 20, padding: "6px 14px",
              fontSize: 13, color: P, fontWeight: 600,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: P, display: "inline-block",
                boxShadow: `0 0 0 3px ${PL}, 0 0 0 4px ${PB}`,
              }} />
              {t("openToWork") || "Disponible pour missions"}
            </div>

            <span style={{ fontSize: 16, color: "#e2e8f0", lineHeight: 1 }}>|</span>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "#f8fafc", border: "1px solid #e2e8f0",
              borderRadius: 20, padding: "6px 14px",
              fontSize: 13, color: "#64748b", fontWeight: 500,
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>4+</span>
              {t("yearsExperience") || "ans d'expérience"}
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "#f8fafc", border: "1px solid #e2e8f0",
              borderRadius: 20, padding: "6px 14px",
              fontSize: 13, color: "#64748b", fontWeight: 500,
            }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C5.8 1 4 2.8 4 5c0 3.5 4 9 4 9s4-5.5 4-9c0-2.2-1.8-4-4-4z"
                  stroke="#94a3b8" strokeWidth="1.4" fill="none" />
                <circle cx="8" cy="5" r="1.5" fill="#94a3b8" />
              </svg>
              Madagascar
            </div>
          </div>

          {/* Nom + bouton audio */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: "#94a3b8", letterSpacing: "2.5px",
              textTransform: "uppercase",
            }}>
              Andriatsitohaina Elie Fenohasina
            </span>

            <button
              id="home-name-row"
              onClick={toggleAudio}
              style={{
                display: "none", alignItems: "center", gap: 8,
                background: isPlaying ? PL : "#f8fafc",
                border: `1px solid ${isPlaying ? PB : "#e2e8f0"}`,
                borderRadius: 20, padding: "5px 14px 5px 6px",
                cursor: "pointer", width: "fit-content",
                transition: "all .2s", margin: "0 auto",
              }}
            >
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: isPlaying ? P : "#fff",
                border: `1px solid ${isPlaying ? P : "#e2e8f0"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: isPlaying ? "#fff" : P,
                flexShrink: 0, transition: "all .2s",
              }}>
                <DuotoneIcon icon={isPlaying ? faPause : faPlay} size="text-xs" />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: isPlaying ? P : "#64748b", transition: "color .2s" }}>
                {isPlaying ? (t("playing") || "En lecture…") : (t("presentation") || "Écouter la présentation")}
              </span>
              {isPlaying && (
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {[1, 1.4, 0.8].map((delay, i) => (
                    <span key={i} style={{
                      display: "inline-block", width: 3, height: 10,
                      background: P, borderRadius: 2,
                      animation: `wave .8s ease-in-out ${delay * 0.15}s infinite alternate`,
                    }} />
                  ))}
                </div>
              )}
            </button>
          </div>

          {/* ── Titre animé ── */}
          <TypewriterTitle
            color={P}
            lines={parseJobTitle(
              t("jobTitle") || "Développeur Fullstack & Ingénieur Data"
            )}
          />

          {/* Description */}
          <p style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
            color: "#64748b", lineHeight: 1.8, margin: 0, maxWidth: 440,
            borderLeft: `3px solid ${PB}`, paddingLeft: 14,
          }}>
            {t("jobDescription") ||
              "Je me spécialise en ingénierie et traitement des données, ainsi qu'en développement web multiplateforme."}
          </p>

          {/* CTA */}
          <div id="home-btn-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setOpenCalendly(true)}>
              <DuotoneIcon icon={faCalendarDays} size="text-sm" fgColor="text-white" />
              {t("schedule") || "Planifier une réunion"}
            </button>
            <a className="btn-secondary" href={cv} target="_blank" download>
              <DuotoneIcon icon={faDownload} size="text-sm" />
              {t("downloadCV") || "Télécharger mon CV"}
            </a>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div id="home-right" style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
          <div id="home-photo-wrap" style={{ position: "relative", width: 360 }}>
            <div id="home-photo-bg" style={{
              position: "absolute", bottom: 0, left: "50%",
              transform: "translateX(-50%)",
              width: 290, height: 375,
              background: "linear-gradient(160deg, #f0fdf9 0%, #dcfce7 100%)",
              borderRadius: "145px 145px 0 0",
              border: "1px solid #bbf7d0",
            }} />
            <img
              src={elieImg}
              alt="Elie Andriatsitohaina"
              style={{
                position: "relative", zIndex: 1,
                width: 300, display: "block",
                margin: "0 auto",
                borderRadius: "135px 135px 0 0",
                objectFit: "cover",
              }}
            />
            {badges.map((b, i) => (
              <div key={i} className={`float-badge float-badge-${i}`} data-badge="true" style={b.pos}>
                <span className="float-badge-dot" style={{ background: b.color }} />
                <span className="float-badge-text">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TECH STRIP ── */}
      <div id="home-tech" style={{
        borderTop: "1px solid #f1f5f9", background: "#fafafa",
        display: "flex", alignItems: "center", flexWrap: "wrap", gap: 24,
        maxWidth: 1200, width: "100%", margin: "0 auto",
        padding: "14px 50px", boxSizing: "border-box",
      }}>
        <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight:600, textTransform: "uppercase", letterSpacing: "1.5px", whiteSpace: "nowrap" }}>
          Stack
        </span>
        {techStack.map((tech) => (
          <span key={tech} style={{ fontSize: 16, fontWeight: 600, color: "#94a3b8" }}>{tech}</span>
        ))}
      </div>

      <PopupModal
        url="https://calendly.com/eliefenohasina/30min"
        rootElement={document.getElementById("root")}
        open={openCalendly}
        onModalClose={() => setOpenCalendly(false)}
      />
    </section>
  );
}