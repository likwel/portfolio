import { useState, useEffect, useRef } from "react";
import {
  faUser, faBriefcase, faFolderOpen,
  faGraduationCap, faLightbulb, faEnvelope, faBars, faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DuotoneIcon from "./DuotoneIcon";
import { useLanguage } from "../contexts/LanguageContext";

const NAV_ITEMS = (t) => [
  { key: "home",      label: t("home")      || "Accueil",     icon: faUser,          href: "#home"      },
  { key: "services",  label: t("services")  || "Services",    icon: faBriefcase,     href: "#services"  },
  { key: "projects",  label: t("projects")  || "Projets",     icon: faFolderOpen,    href: "#projects"  },
  { key: "education", label: t("education") || "Formation",   icon: faGraduationCap, href: "#education" },
  { key: "skills",    label: t("skills")    || "Compétences", icon: faLightbulb,     href: "#skills"    },
];

const FlagFR = () => (
  <svg width="22" height="15" viewBox="0 0 900 600">
    <rect fill="#ED2939" width="900" height="600"/>
    <rect fill="#fff" width="600" height="600"/>
    <rect fill="#002395" width="300" height="600"/>
  </svg>
);

const FlagEN = () => (
  <svg width="22" height="15" viewBox="0 0 60 30">
    <clipPath id="uk"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk)" stroke="#cf142b" strokeWidth="4"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
  </svg>
);

export default function Header({ setSection, setOpen, isOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active,   setActive]   = useState("home");
  const { language, toggleLanguage, t } = useLanguage();
  const langRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Bloquer le scroll body quand drawer ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (key) => {
    setActive(key);
    setSection(key);
    setMenuOpen(false);
  };

  const handleContact = () => {
    setMenuOpen(false);
    // Petit délai pour laisser le drawer se fermer avant d'ouvrir le modal
    setTimeout(() => setOpen && setOpen(true), 300);
  };

  const items = NAV_ITEMS(t);

  const s = {
    header: {
      position: "sticky", top: 0, zIndex: 1000,
      background: "#fff",
      borderBottom: "1px solid #f1f5f9",
      boxShadow: "0 1px 8px rgba(0,0,0,.05)",
    },
    inner: {
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px", height: 64,
      maxWidth: 1200, margin: "0 auto",
    },
    logo: {
      fontSize: 17, fontWeight: 700, color: "#0f172a",
      letterSpacing: "-.5px", textDecoration: "none", flexShrink: 0,
    },
    logoAccent: { color: "#007b8b" },
    desktopNav: { display: "flex", alignItems: "center", gap: 2 },
    navLink: (isActive) => ({
      display: "flex", alignItems: "center", gap: 6,
      padding: "5px 13px", borderRadius: 7,
      fontSize: "0.9rem", fontWeight: isActive ? 600 : 500,
      color: isActive ? "#007b8b" : "#64748b",
      background: isActive ? "#f0fdf9" : "transparent",
      border: "none", cursor: "pointer", textDecoration: "none",
      transition: "all .15s", whiteSpace: "nowrap",
    }),
    sep: { width: 1, height: 20, background: "#f1f5f9", margin: "0 8px" },
    rightZone: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
    langBtn: {
      display: "flex", alignItems: "center", gap: 6,
      padding: "6px 10px", borderRadius: 7,
      border: "1px solid #e2e8f0", background: "#fff",
      fontSize: 12, fontWeight: 600, color: "#0f172a",
      cursor: "pointer", position: "relative",
    },
    langDropdown: {
      position: "absolute", top: "calc(100% + 6px)", left: 0,
      background: "#fff", borderRadius: 10,
      boxShadow: "0 8px 24px rgba(0,0,0,.12)",
      border: "1px solid #f1f5f9",
      minWidth: 140, zIndex: 9999, overflow: "hidden",
    },
    langOption: {
      display: "flex", alignItems: "center", gap: 10,
      padding: "11px 16px", border: "none", background: "transparent",
      width: "100%", cursor: "pointer", fontSize: 13,
      fontWeight: 600, color: "#0f172a", textAlign: "left",
    },
    contactBtn: {
      display: "flex", alignItems: "center", gap: 7,
      padding: "6px 15px", background: "#026673", color: "#fff",
      borderRadius: '.75rem', fontSize: 13, fontWeight: 600,
      border: "none", cursor: "pointer", whiteSpace: "nowrap",
    },
    burgerBtn: {
      display: "none", alignItems: "center", justifyContent: "center",
      width: 38, height: 38, borderRadius: 8,
      border: "1px solid #e2e8f0", background: "#fff",
      cursor: "pointer", fontSize: 16, color: "#0f172a",
      flexShrink: 0,
    },
    // Overlay sombre derrière le drawer
    overlay: {
      position: "fixed", inset: 0, top: 64,
      background: "rgba(0,0,0,0.3)",
      zIndex: 998,
      opacity: menuOpen ? 1 : 0,
      pointerEvents: menuOpen ? "auto" : "none",
      transition: "opacity .25s ease",
    },
    drawer: {
      position: "fixed", top: 64, right: 0, bottom: 0,
      width: "min(320px, 85vw)",
      background: "#fff", zIndex: 999,
      padding: "16px 20px 32px",
      display: "flex", flexDirection: "column", gap: 6,
      transform: menuOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform .25s ease",
      overflowY: "auto",
      boxShadow: "-4px 0 24px rgba(0,0,0,.08)",
      maxHeight:500,
    },
    mobileLink: (isActive) => ({
      display: "flex", alignItems: "center", gap: 12,
      padding: "5px 16px", borderRadius: 10,
      fontSize: 15, fontWeight: isActive ? 600 : 500,
      color: isActive ? "#007b8b" : "#0f172a",
      background: isActive ? "#f0fdf9" : "transparent",
      border: "none", cursor: "pointer", textAlign: "left",
      borderLeft: isActive ? "3px solid #007b8b" : "3px solid transparent",
    }),
    mobileIcon: (isActive) => ({
      width: 36, height: 36, borderRadius: 8,
      background: isActive ? "#f0fdf9" : "#f8fafc",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: isActive ? "#007b8b" : "#64748b",
      flexShrink: 0,
    }),
    mobileContact: {
      display: "flex", alignItems: "center", gap: 10,
      padding: "6px 15px", borderRadius: 10,
      fontSize: 15, fontWeight: 600, color: "#fff",
      background: "#007b8b", border: "none", cursor: "pointer",
      marginTop: "auto",
    },
    mobileLangRow: {
      display: "flex", gap: 8, padding: "8px 0",
      borderTop: "1px solid #f1f5f9", marginTop: 8,
    },
    mobileLangBtn: (isActive) => ({
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      gap: 8, padding: "10px 0", borderRadius: 8,
      border: isActive ? "1.5px solid #007b8b" : "1px solid #e2e8f0",
      background: isActive ? "#f0fdf9" : "#fff",
      fontSize: 13, fontWeight: 600,
      color: isActive ? "#007b8b" : "#64748b", cursor: "pointer",
    }),
  };

  return (
    <>
      <style>{`
        /* Masquer nav desktop sous 1024px, burger visible */
        @media (max-width: 1024px) {
          #header-desktop-nav { display: none !important; }
          #header-contact-btn { display: none !important; }
          #header-lang-btn    { display: none !important; }
          #header-sep         { display: none !important; }
          #header-burger      { display: flex !important; }
        }
        /* Sur écran moyen (768–1024) garder le lang switcher visible */
        @media (min-width: 769px) and (max-width: 1024px) {
          #header-lang-btn { display: flex !important; }
          #header-sep      { display: flex !important; }
        }
        @media (max-width: 768px) {
          #header-inner { padding: 0 16px !important; }
        }
        .nav-link-item:hover { background: #f8fafc !important; color: #0f172a !important; }
        .lang-opt:hover { background: #f8fafc; }
        .mobile-nav-link:hover { background: #f8fafc !important; }
      `}</style>

      <header style={{ ...s.header, zIndex: isOpen ? 999 : 1000 }}>
        {/* Overlay sur le header quand modal ouvert */}
        {isOpen && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 10,
            borderRadius: 0,
          }} />
        )}
        <div id="header-inner" style={s.inner}>

          {/* ── Logo ── */}
          <a
            href="#home"
            style={{ ...s.logo, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
            onClick={() => handleNav("home")}
          >
            <img src="/favicon.png" alt="" style={{ width: 36, height: 36, borderRadius: 10 }} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontFamily: "'Satisfy', cursive", fontSize: 18, color: "#007b8b", letterSpacing: "0.02em" }}>
                Elie
              </span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                .dev
              </span>
            </div>
          </a>

          {/* ── Desktop nav ── */}
          <nav id="header-desktop-nav" style={s.desktopNav}>
            {items.map((item) => (
              <button
                key={item.key}
                className="nav-link-item"
                style={s.navLink(active === item.key)}
                onClick={() => handleNav(item.key)}
              >
                <FontAwesomeIcon icon={item.icon} style={{ fontSize: 13 }} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* ── Right zone ── */}
          <div style={s.rightZone}>

            {/* Language dropdown */}
            <div id="header-lang-btn" ref={langRef} style={{ position: "relative" }}>
              <button style={s.langBtn} onClick={() => setLangOpen(!langOpen)}>
                {language === "fr" ? <FlagFR /> : <FlagEN />}
                <span>{language === "fr" ? "FR" : "EN"}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 3.5l3 3 3-3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {langOpen && (
                <div style={s.langDropdown}>
                  {language !== "fr" && (
                    <button className="lang-opt" style={s.langOption} onClick={() => { toggleLanguage(); setLangOpen(false); }}>
                      <FlagFR /><span>Français</span>
                    </button>
                  )}
                  {language !== "en" && (
                    <button className="lang-opt" style={s.langOption} onClick={() => { toggleLanguage(); setLangOpen(false); }}>
                      <FlagEN /><span>English</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div id="header-sep" style={s.sep} />

            {/* Contact */}
            <button id="header-contact-btn" className="btn-primary" style={s.contactBtn} onClick={handleContact}>
              <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 13 }} />
              {t("contactMe") || "Me contacter"}
            </button>

            {/* Burger */}
            <button
              id="header-burger"
              style={s.burgerBtn}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div style={s.overlay} onClick={() => setMenuOpen(false)} />

      {/* ── Mobile drawer ── */}
      <div style={s.drawer}>
        <p style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, padding: "0 1px" }}>
          Navigation
        </p>

        {items.map((item) => (
          <button
            key={item.key}
            className="mobile-nav-link"
            style={{ ...s.mobileLink(active === item.key), gap:8, paddingTop:10, paddingBottom:10,}}
            onClick={() => handleNav(item.key)}
          >
            <div style={s.mobileIcon(active === item.key)}>
              <FontAwesomeIcon icon={item.icon} style={{ fontSize: 15 }} />
            </div>
            {item.label}
          </button>
        ))}

        {/* Contact mobile */}
        <button style={s.mobileContact} onClick={handleContact}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 15 }} />
          </div>
          {t("contactMe") || "Me contacter"}
        </button>

        {/* Language switcher mobile */}
        <div style={s.mobileLangRow}>
          <button style={s.mobileLangBtn(language === "fr")} onClick={() => { if (language !== "fr") toggleLanguage(); }}>
            <FlagFR /><span>Français</span>
          </button>
          <button style={s.mobileLangBtn(language === "en")} onClick={() => { if (language !== "en") toggleLanguage(); }}>
            <FlagEN /><span>English</span>
          </button>
        </div>
      </div>
    </>
  );
}