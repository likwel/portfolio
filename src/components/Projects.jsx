import im1 from "../assets/projects/1.png";
import im2 from "../assets/projects/2.png";
import im3 from "../assets/projects/3.png";
import im4 from "../assets/projects/4.png";
import im5 from "../assets/projects/5.PNG";
import im6 from "../assets/projects/6.PNG";
import im7 from "../assets/projects/7.png";
import im8 from "../assets/projects/8.png";
import plus from "../assets/projects/plus.jpg";
import cmz from "../assets/projects/cmz.PNG";
import scrap from "../assets/projects/scap.jpeg";
import geomada from "../assets/projects/geomada.PNG";
import mailflow from "../assets/projects/mailflow.PNG";
import depenzo from "../assets/projects/depenzo.PNG";
import glink from "../assets/projects/glink.PNG";
import itadImmo from "../assets/projects/itadimmo.PNG";

import { useState, useEffect, useCallback } from "react";
import { faTimes, faLock, faExpand, faCompress, faChevronLeft, faChevronRight, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "../contexts/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [allProjects, setAllProjects] = useState([]);

  const personalProjects = [
    { title: "WorldFeeds",           description: t("project1Desc"),       image: im5,      link: "https://worldfeeds.vercel.app/",             category: t("categoryPersonal") },
    { title: "Factura.mg",           description: t("project2Desc"),       image: im1,      link: "https://tsaratantana.alwaysdata.net/",        category: t("categoryPersonal") },
    { title: "Commune Tsaratantana", description: t("project3Desc"),       image: im3,      link: "https://commune-tsaratantana.onrender.com/",  category: t("categoryPersonal") },
    { title: "Agile Kanban",         description: t("project4Desc"),       image: im7,                                                           category: t("categoryPersonal") },
    { title: "GPS Tracking",         description: t("project5Desc"),       image: im8,                                                           category: t("categoryPersonal") },
    { title: "Sales Forecast 2.0",   description: t("project6Desc"),       image: im4,                                                           category: t("categoryPersonal") },
    { title: "SmartShop",            description: t("project7Desc"),       image: im2,                                                           category: t("categoryPersonal") },
    { title: "Talkio",               description: t("project8Desc"),       image: im6,                                                           category: t("categoryPersonal") },
    { title: "MailFlow",             description: t("projectMailDesc"),    image: mailflow,                                                      category: t("categoryPersonal") },
    { title: "Depenzo",              description: t("depenzoDesc"),        image: depenzo,                                                       category: t("categoryPersonal") },
    { title: "Glink",                description: t("glinkDesc"),          image: glink,                                                         category: t("categoryPersonal") },
    { title: "ItadImmo",             description: t("itadImmoDesc"),       image: itadImmo,                                                      category: t("categoryPersonal") },
    { title: t("project9Title"),     description: t("project9Desc"),       image: cmz,      link: "https://consomyzone.com/",                    category: t("categoryCompany")  },
    { title: t("project10Title"),    description: t("project10Desc"),      image: scrap,                                                         category: t("categoryCompany")  },
    { title: t("seeMore"),           description: t("seeMoreDesc"),        image: plus,     link: "https://github.com/likwel",                   category: t("categoryPersonal") },
    { title: t("companyWebsite"),    description: t("companyWebsiteDesc"), image: geomada,  link: "https://www.geomadagascar.com/",              category: t("categoryCompany")  },
  ];

  useEffect(() => { setAllProjects(personalProjects); }, []);

  const isCompanyCategory = (category) => category === t("categoryCompany");

  const openModal = (index) => {
    setCurrentIndex(index);
    setExpanded(false);
    setIsOpen(true);
  };

  const closeModal = () => { setIsOpen(false); setExpanded(false); };

  const prev = useCallback(() => setCurrentIndex(i => (i - 1 + personalProjects.length) % personalProjects.length), [personalProjects.length]);
  const next = useCallback(() => setCurrentIndex(i => (i + 1) % personalProjects.length), [personalProjects.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, prev, next]);

  const selected = personalProjects[currentIndex];
  const isCompanySelected = selected && isCompanyCategory(selected.category);

  const grouped = personalProjects.reduce((acc, p) => {
    (acc[p.category] = acc[p.category] || []).push(p);
    return acc;
  }, {});

  // Flat index lookup
  const getFlatIndex = (project) => personalProjects.findIndex(p => p.title === project.title && p.image === project.image);

  const btnStyle = {
    background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "5px",
    color: "#cbd5e1", cursor: "pointer", padding: "0.3rem 0.55rem",
    fontSize: "0.85rem", transition: "background 0.15s",
  };

  return (
    <>
      <main id="projects" className="bg-white pt-10 border-1rem">
        <div className="mx-auto">
          <h1 className="text-2xl font-bold mb-2 text-center">{t("projectsMainTitle")}</h1>
          <p className="text-center text-gray-700 mb-6">{t("projectsSubtitle")}</p>

          {Object.entries(grouped).map(([category, categoryProjects], idx) => {
            const isCompany = isCompanyCategory(category);
            return (
              <div key={idx} className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 badge-skill">{category}</h2>
                <div className="lg:p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 experience">
                  {categoryProjects.map((project, index) => (
                    <div
                      key={index}
                      className="project-card"
                      style={{
                        background: isCompany ? "#f1f5f9" : "#fff",
                        border: isCompany ? "1px solid #cbd5e1" : "1px solid #e5e7eb",
                        borderRadius: "12px", overflow: "hidden",
                        display: "flex", flexDirection: "column",
                        transition: "box-shadow 0.2s, transform 0.2s",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.07)";  e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      {/* Image */}
                      <div
                        className="project-image relative group"
                        style={{ height: "180px", overflow: "hidden", cursor: "pointer", flexShrink: 0 }}
                        onClick={() => openModal(getFlatIndex(project))}
                      >
                        <img
                          src={project.image} alt={project.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", filter: isCompany ? "grayscale(50%)" : "none", transition: "transform 0.3s" }}
                          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(0,0,0,0.28)" }}>
                          <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} style={{ color: "#fff", fontSize: "1.2rem" }} />
                        </div>
                        {isCompany && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold" style={{ background: "#475569", color: "#fff" }}>
                            <FontAwesomeIcon icon={faLock} style={{ fontSize: "0.65rem" }} /> Confidentiel
                          </div>
                        )}
                      </div>

                      {/* Contenu */}
                      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", flex: 1 }}>
                        <h3 className="project-title" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem", color: isCompany ? "#64748b" : "#1e293b" }}>
                          {project.title}
                        </h3>
                        <p className="project-description" style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.55, flex: 1, marginBottom: "0.75rem" }}>
                          {project.description}
                        </p>
                        {project.link ? (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-btn"
                            style={{ display: "inline-block", padding: "0.4rem 1rem", borderRadius: "6px", fontSize: "0.82rem", fontWeight: 600, background: "#2563eb", color: "#fff", textDecoration: "none", alignSelf: "flex-start", transition: "background 0.15s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                            onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                          >{t("seeProject")}</a>
                        ) : (
                          <span style={{ display: "inline-block", padding: "0.4rem 1rem", borderRadius: "6px", fontSize: "0.82rem", fontWeight: 600, background: "#e2e8f0", color: "#94a3b8", alignSelf: "flex-start", cursor: "not-allowed" }}>
                            {t("seeProject")}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── MODAL ─────────────────────────────────────── */}
      {isOpen && selected && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)", zIndex: 99999 }}
          onClick={closeModal}
        >
          <div
            style={{
              display: "flex", flexDirection: "column",
              width: expanded ? "99vw" : "min(900px, 92vw)",
              maxHeight: expanded ? "99vh" : "90vh",
              borderRadius: "12px", overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              transition: "width 0.25s, max-height 0.25s",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.55rem 1rem", background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {isCompanySelected && <FontAwesomeIcon icon={faLock} style={{ color: "#94a3b8", fontSize: "0.75rem" }} />}
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem" }}>{selected.title}</span>
                <span style={{ color: "#475569", fontSize: "0.78rem" }}>{currentIndex + 1} / {personalProjects.length}</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button style={btnStyle} onClick={() => setExpanded(e => !e)} title={expanded ? "Réduire" : "Agrandir"}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.background = btnStyle.background}>
                  <FontAwesomeIcon icon={expanded ? faCompress : faExpand} />
                </button>
                <button style={btnStyle} onClick={closeModal}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.45)"}
                  onMouseLeave={e => e.currentTarget.style.background = btnStyle.background}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>

            {/* ── Body : image + description ── */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden", background: "#0f172a" }}>

              {/* Image avec nav */}
              <div style={{ flex: expanded ? "1" : "1.6", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", minWidth: 0 }}>
                <img
                  key={currentIndex}
                  src={selected.image} alt={selected.title}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", animation: "fadeIn 0.2s ease" }}
                />
                {/* Prev */}
                <button
                  onClick={prev}
                  style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "36px", height: "36px", color: "#fff", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.8)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {/* Next */}
                <button
                  onClick={next}
                  style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "36px", height: "36px", color: "#fff", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.8)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>

              {/* Panneau description */}
              <div style={{ width: "260px", flexShrink: 0, background: "#1e293b", padding: "1.25rem 1rem", display: "flex", flexDirection: "column", gap: "0.75rem", overflowY: "auto", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>Projet</p>
                  <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>{selected.title}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>Catégorie</p>
                  <span style={{ display: "inline-block", fontSize: "0.75rem", padding: "0.2rem 0.65rem", borderRadius: "20px", background: isCompanySelected ? "#334155" : "#1e3a5f", color: isCompanySelected ? "#94a3b8" : "#93c5fd", fontWeight: 600 }}>
                    {selected.category}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>Description</p>
                  <p style={{ color: "#cbd5e1", fontSize: "0.82rem", lineHeight: 1.6, margin: 0 }}>{selected.description}</p>
                </div>
                {selected.link && (
                  <a href={selected.link} target="_blank" rel="noopener noreferrer"
                    style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "0.5rem", borderRadius: "7px", background: "#2563eb", color: "#fff", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                    onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                  >
                    {t("seeProject")} →
                  </a>
                )}
              </div>
            </div>

            {/* ── Thumbnails ── */}
            <div style={{ display: "flex", gap: "6px", padding: "8px 10px", background: "#0a1120", overflowX: "auto", flexShrink: 0 }}>
              {personalProjects.map((p, i) => (
                <img
                  key={i}
                  src={p.image} alt={p.title}
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    width: "48px", height: "34px", objectFit: "cover", borderRadius: "4px", cursor: "pointer", flexShrink: 0,
                    border: i === currentIndex ? "2px solid #2563eb" : "2px solid transparent",
                    opacity: i === currentIndex ? 1 : 0.45,
                    transition: "opacity 0.15s, border 0.15s",
                  }}
                />
              ))}
            </div>
          </div>

          <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
        </div>
      )}
    </>
  );
}