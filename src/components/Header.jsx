import { useState, useEffect, useLayoutEffect, useRef, useId } from "react";
import {
  faUser, faBriefcase, faFolderOpen, faCode,
  faGraduationCap, faLightbulb, faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "../contexts/LanguageContext";
import { useLockBodyScroll } from "../hooks/motion";

/* Même ordre que les sections de la page */
const NAV_ITEMS = (t) => [
  { key: "home",        label: t("home"),        icon: faUser          },
  { key: "services",    label: t("services"),    icon: faCode          },
  { key: "experiences", label: t("experiences"), icon: faBriefcase     },
  { key: "skills",      label: t("skills"),      icon: faLightbulb     },
  { key: "education",   label: t("education"),   icon: faGraduationCap },
  { key: "projects",    label: t("projects"),    icon: faFolderOpen    },
];

const SECTION_IDS = ["services", "experiences", "skills", "education", "projects"];

const FlagFR = () => (
  <svg width="18" height="12" viewBox="0 0 900 600" aria-hidden="true">
    <rect fill="#ED2939" width="900" height="600"/>
    <rect fill="#fff" width="600" height="600"/>
    <rect fill="#002395" width="300" height="600"/>
  </svg>
);

const FlagEN = () => {
  // Deux instances (header + drawer) : un id unique par clipPath
  const clipId = `uk${useId().replace(/:/g, "")}`;
  return (
    <svg width="18" height="12" viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id={clipId}><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clipId})`} stroke="#cf142b" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
    </svg>
  );
};

function LangSwitch({ language, toggleLanguage }) {
  const set = (lang) => { if (language !== lang) toggleLanguage(); };
  return (
    <div className="lang-switch" data-lang={language} role="group" aria-label="Langue / Language">
      <span className="lang-thumb" aria-hidden="true" />
      <button className={`lang-opt ${language === "fr" ? "is-active" : ""}`} onClick={() => set("fr")} aria-pressed={language === "fr"}>
        <FlagFR /> FR
      </button>
      <button className={`lang-opt ${language === "en" ? "is-active" : ""}`} onClick={() => set("en")} aria-pressed={language === "en"}>
        <FlagEN /> EN
      </button>
    </div>
  );
}

export default function Header({ setSection, setOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("home");
  const [pill,     setPill]     = useState({ x: 0, w: 0, ready: false });
  const { language, toggleLanguage, t } = useLanguage();
  const navRef   = useRef(null);
  const spyLock  = useRef(0);

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    const handler = () => { if (window.innerWidth > 1080) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* Scroll-spy : la section dont le haut a dépassé le header devient active */
  useEffect(() => {
    let raf = 0;
    const spy = () => {
      raf = 0;
      if (performance.now() < spyLock.current) return;
      const offset = (navRef.current?.closest("header")?.offsetHeight || 68) + 48;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = "home";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0 || (atBottom && top < window.innerHeight / 2)) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(spy); };
    spy();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  /* Pilule qui glisse sous le lien actif */
  useLayoutEffect(() => {
    const measure = () => {
      const btn = navRef.current?.querySelector(`[data-key="${active}"]`);
      if (!btn || !btn.offsetWidth) return;
      setPill({ x: btn.offsetLeft, w: btn.offsetWidth, ready: true });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, language]);

  const handleNav = (key) => {
    spyLock.current = performance.now() + 900;
    setActive(key);
    setSection(key);
    setMenuOpen(false);
  };

  const handleContact = () => {
    setMenuOpen(false);
    // Laisse le drawer se refermer avant d'ouvrir la modale
    setTimeout(() => setOpen && setOpen(true), menuOpen ? 300 : 0);
  };

  const items = NAV_ITEMS(t);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a
            href="#home"
            className="brand"
            onClick={(e) => { e.preventDefault(); handleNav("home"); }}
          >
            <img src="/favicon.png" alt="" />
            <span className="brand-text">
              <span className="brand-name">Elie</span>
              <span className="brand-sub">.dev</span>
            </span>
          </a>

          <nav ref={navRef} className="nav" aria-label="Navigation">
            <span
              className="nav-indicator"
              aria-hidden="true"
              style={{ width: pill.w, transform: `translateX(${pill.x}px)`, opacity: pill.ready ? 1 : 0 }}
            />
            {items.map((item) => (
              <button
                key={item.key}
                data-key={item.key}
                className={`nav-link ${active === item.key ? "is-active" : ""}`}
                aria-current={active === item.key ? "true" : undefined}
                onClick={() => handleNav(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <LangSwitch language={language} toggleLanguage={toggleLanguage} />

            <button className="btn btn-primary btn-sm header-contact" onClick={handleContact}>
              <FontAwesomeIcon icon={faEnvelope} />
              {t("contactMe")}
            </button>

            <button
              className={`burger ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <span className="scroll-progress" aria-hidden="true" />
      </header>

      <div className={`drawer-overlay ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(false)} />

      <aside id="mobile-drawer" className={`drawer ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <p className="drawer-label drawer-item" style={{ "--i": 0 }}>Navigation</p>

        {items.map((item, i) => (
          <div key={item.key} className="drawer-item" style={{ "--i": i + 1 }}>
            <button
              className={`drawer-link ${active === item.key ? "is-active" : ""}`}
              onClick={() => handleNav(item.key)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="icon-tile icon-tile-sm"><FontAwesomeIcon icon={item.icon} /></span>
              {item.label}
            </button>
          </div>
        ))}

        <div className="drawer-footer drawer-item" style={{ "--i": items.length + 1 }}>
          <LangSwitch language={language} toggleLanguage={toggleLanguage} />
          <button className="btn btn-primary" onClick={handleContact} tabIndex={menuOpen ? 0 : -1}>
            <FontAwesomeIcon icon={faEnvelope} />
            {t("contactMe")}
          </button>
        </div>
      </aside>
    </>
  );
}
