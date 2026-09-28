import { useState, useEffect, useRef } from "react";
import elieImg from "../assets/images/elie.png";
import cv from "../assets/CV_ANDRIATSITOHAINA_ELIE.pdf";
import presentation_en from "../assets/presentation_en.mp3";
import presentation_fr from "../assets/presentation_fr.mp3";
import { PopupModal } from "react-calendly";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay, faPause, faCalendarDays, faDownload, faArrowRight,
  faCode, faDatabase, faLaptopCode, faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../contexts/LanguageContext";
import { useInView, useCountUp, prefersReducedMotion } from "../hooks/motion";

const SPEED = 70;
const PAUSE = 1600;
const ERASE = 35;

/* Bouton audio de présentation (masqué pour l'instant) */
const SHOW_AUDIO_PITCH = false;

const TECH_STACK = [
  "Python", "ETL", "SQL", "Node.js", "Symfony", "React", "TypeScript",
  "Spring Boot", "PostgreSQL", "Power BI", "Talend", "Docker", "Git",
];

function parseJobTitle(jobTitle) {
  return jobTitle.split("&").map((part) => {
    const words = part.trim().split(" ");
    const accent = words.pop();
    const plain  = words.join(" ") + " ";
    return { plain, accent };
  });
}

function TypewriterTitle({ lines }) {
  const reduced = prefersReducedMotion();
  const [lineIdx, setLineIdx] = useState(0);
  const [text,    setText]    = useState(reduced ? lines[0].plain + lines[0].accent : "");
  const [phase,   setPhase]   = useState("typing");
  const timer = useRef(null);

  const full = (i) => lines[i].plain + lines[i].accent;

  useEffect(() => {
    if (reduced) return;
    const clr = () => clearTimeout(timer.current);

    if (phase === "typing") {
      if (text.length < full(lineIdx).length) {
        timer.current = setTimeout(() => setText(full(lineIdx).slice(0, text.length + 1)), SPEED);
      } else {
        timer.current = setTimeout(() => setPhase("erasing"), PAUSE);
      }
    }

    if (phase === "erasing") {
      if (text.length > 0) {
        timer.current = setTimeout(() => setText((t) => t.slice(0, -1)), ERASE);
      } else {
        setLineIdx((lineIdx + 1) % lines.length);
        setPhase("typing");
      }
    }

    return clr;
  }, [phase, text, lineIdx]);

  /* Changement de langue : on repart de zéro */
  useEffect(() => {
    setLineIdx(0);
    setText(reduced ? lines[0].plain + lines[0].accent : "");
    setPhase("typing");
  }, [lines.map((l) => l.plain + l.accent).join("|")]);

  const line       = lines[lineIdx] || lines[0];
  const plainPart  = text.slice(0, Math.min(text.length, line.plain.length));
  const accentPart = text.length > line.plain.length ? text.slice(line.plain.length) : "";

  return (
    <p className="hero-role" aria-label={lines.map((l) => l.plain + l.accent).join(" & ")}>
      <span aria-hidden="true">{plainPart}</span>
      <em aria-hidden="true">{accentPart}</em>
      <span className="hero-caret" aria-hidden="true" />
    </p>
  );
}

function Stat({ value, suffix = "+", label, start }) {
  const n = useCountUp(value, start);
  return (
    <div className="hero-stat">
      <dt>{label}</dt>
      <dd>{n}<span>{suffix}</span></dd>
    </div>
  );
}

export default function Home({ setOpen }) {
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [openCalendly, setOpenCalendly] = useState(false);
  const { language, t } = useLanguage();
  const audioRef  = useRef(null);
  const visualRef = useRef(null);
  const [statsRef, statsVisible] = useInView({ threshold: 0.4 });
  const [copyRef,  copyVisible]  = useInView({ threshold: 0.1 });

  const toggleAudio = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  /* Parallaxe légère des calques du visuel, souris uniquement */
  const canParallax = typeof window !== "undefined"
    && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches
    && !prefersReducedMotion();

  const onPointerMove = (e) => {
    const el = visualRef.current;
    if (!canParallax || !el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onPointerLeave = () => {
    visualRef.current?.style.setProperty("--px", 0);
    visualRef.current?.style.setProperty("--py", 0);
  };

  const floatCards = [
    { cls: "float-card-1", icon: faCode,       color: "var(--verdigris)", title: t("softwareEngineer"), sub: "Java · Node.js"     },
    { cls: "float-card-2", icon: faDatabase,   color: "var(--sky)",       title: t("dataEngineer"),     sub: "Python · ETL · SQL" },
    { cls: "float-card-3", icon: faLaptopCode, color: "var(--copper)",    title: t("webDevelopment"),   sub: "React · Symfony"    },
  ];

  const step = (i) => ({ "--d": `${i * 90}ms` });
  const revealCls = `reveal ${copyVisible ? "is-visible" : ""}`;

  return (
    <section id="home" className="hero" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <audio ref={audioRef} src={language === "fr" ? presentation_fr : presentation_en} onEnded={() => setIsPlaying(false)} />

      <div className="container hero-grid">
        {/* ── Texte ── */}
        <div ref={copyRef} className="hero-copy">
          <div className={`hero-meta ${revealCls}`} style={step(0)}>
            <span className="chip chip-success">
              <span className="dot-live" />
              {t("heroAvailable")}
            </span>
            <span className="chip">
              <FontAwesomeIcon icon={faLocationDot} style={{ color: "var(--copper)" }} />
              Madagascar
            </span>
          </div>

          <p className={`hero-hello script ${revealCls}`} style={step(1)}>{t("helloIAm")}</p>

          <h1 className={`hero-name ${revealCls}`} style={step(2)}>
            Elie Fenohasina
            <small>Andriatsitohaina</small>
          </h1>

          <div className={revealCls} style={step(3)}>
            <TypewriterTitle lines={parseJobTitle(t("jobTitle"))} />
          </div>

          <p className={`hero-desc ${revealCls}`} style={step(4)}>{t("jobDescription")}</p>

          <div className={`hero-ctas ${revealCls}`} style={step(5)}>
            <button className="btn btn-primary" onClick={() => setOpenCalendly(true)}>
              <FontAwesomeIcon icon={faCalendarDays} />
              {t("schedule")}
              <FontAwesomeIcon icon={faArrowRight} className="icon-shift" style={{ fontSize: 13 }} />
            </button>
            <a className="btn btn-secondary" href={cv} target="_blank" rel="noopener noreferrer" download>
              <FontAwesomeIcon icon={faDownload} className="icon-drop" />
              {t("downloadCV")}
            </a>
            {SHOW_AUDIO_PITCH && (
              <button className="btn btn-ghost" onClick={toggleAudio} aria-pressed={isPlaying}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                {isPlaying ? t("playing") : t("presentation")}
              </button>
            )}
          </div>

          <dl ref={statsRef} className={`hero-stats ${revealCls}`} style={step(6)}>
            <Stat value={4}  label={t("statYears")}    start={statsVisible} />
            <Stat value={10} label={t("statProjects")} start={statsVisible} />
            <Stat value={15} label={t("statTech")}     start={statsVisible} />
          </dl>
        </div>

        {/* ── Visuel ── */}
        <div ref={visualRef} className="hero-visual" aria-hidden="true">
          <div className="depth depth-far">
            <span className="blob blob-mist" />
            <span className="orbit" />
            <span className="blob blob-copper" />
            <span className="blob blob-sky" />
            <span className="dot-grid" />
          </div>

          <div className="depth depth-mid">
            <div className="arch">
              <img src={elieImg} alt="" />
            </div>
          </div>

          <div className="depth depth-near">
            {floatCards.map((c) => (
              <div key={c.cls} className={`float-card ${c.cls}`}>
                <span className="icon-tile" style={{ background: c.color }}>
                  <FontAwesomeIcon icon={c.icon} />
                </span>
                <span>
                  <strong>{c.title}</strong>
                  <small>{c.sub}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bandeau stack ── */}
      <div className="marquee">
        <div className="container marquee-inner">
          <span className="marquee-label">Stack</span>
          <div className="marquee-viewport">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="marquee-group" aria-hidden={copy === 1 ? "true" : undefined}>
                  {TECH_STACK.map((tech) => (
                    <span key={tech} className="marquee-item">{tech}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
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
