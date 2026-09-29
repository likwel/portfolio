import im1 from "../assets/projects/factura.PNG";
import facturaApp from "../assets/projects/1.png";
import factura1 from "../assets/projects/factura1.PNG";
import im2 from "../assets/projects/2.png";
import im3 from "../assets/projects/3.png";
import im4 from "../assets/projects/4.png";
import im5 from "../assets/projects/5.PNG";
import im6 from "../assets/projects/6.PNG";
import talkio from "../assets/projects/talkio.PNG";
import talkio1 from "../assets/projects/talkio1.PNG";
import im7 from "../assets/projects/7.png";
import im8 from "../assets/projects/8.png";
import mailflow from "../assets/projects/mailflow.PNG";
import depenzo from "../assets/projects/depenzo.PNG";
import glink from "../assets/projects/glink.PNG";
import itadImmo from "../assets/projects/itadimmo.PNG";
import cyberconnect from "../assets/projects/cyberconnect.PNG";
import worldfeeds from "../assets/projects/worldfeed.PNG";
import cmz from "../assets/projects/consomyzone.PNG";
import enrich from "../assets/projects/enrich.svg";
import enrich_python from "../assets/projects/pipeline_enrich.PNG";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  faTimes, faExpand, faCompress, faChevronLeft, faChevronRight, faCheck,
  faUpRightAndDownLeftFromCenter, faArrowUpRightFromSquare, faArrowRight, faLock,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "../contexts/LanguageContext";
import { useLockBodyScroll } from "../hooks/motion";
import ProjectSlider from "./ProjectSlider";

/*
 * Galeries : toute image déposée dans src/assets/projects/gallery/<Id>/
 * (ex. gallery/Talkio/02-chat.png) est ajoutée au carrousel du projet,
 * après les images déclarées ci-dessous, triée par nom de fichier.
 */
const GALLERY_FILES = import.meta.glob("../assets/projects/gallery/*/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp}", { eager: true, import: "default" });
const galleryOf = (id) => Object.keys(GALLERY_FILES)
  .filter((path) => path.split("/").at(-2) === id)
  .sort()
  .map((path) => GALLERY_FILES[path]);

/* Textes (accroche, description, fonctionnalités) : clés prj{Id}… dans LanguageContext */
export const PROJECTS = [
  { id: "Worldfeeds",   title: "WorldFeeds",           cat: "prjCatData",     image: im5,          stack: ["Next.js", "React", "Prisma"],               link: "https://worldfeeds.vercel.app/", extra: [worldfeeds] },
  { id: "Factura",      title: "Factura.mg",           cat: "prjCatBusiness", image: im1,          stack: ["Node.js", "React"], extra: [facturaApp, factura1] },
  { id: "Talkio",       title: "Talkio",               cat: "prjCatPlatform", image: im6,          stack: ["React", "Express", "Socket.io", "Prisma"], extra: [talkio, talkio1] },
  { id: "Commune",      title: "Commune Tsaratantana", cat: "prjCatBusiness", image: im3,          stack: ["Node.js", "Express"],                       link: "https://commune-tsaratantana.onrender.com/" },
  { id: "Forecast",     title: "Sales Forecast 2.0",   cat: "prjCatData",     image: im4,          stack: ["Python", "Streamlit"] },
  { id: "Itadimmo",     title: "ItadImmo",             cat: "prjCatBusiness", image: itadImmo,     stack: ["Node.js", "React"] },
  { id: "Depenzo",      title: "Depenzo",              cat: "prjCatBusiness", image: depenzo,      stack: ["Node.js", "React"] },
  { id: "Cyberconnect", title: "CyberConnect",         cat: "prjCatBusiness", image: cyberconnect, stack: ["Node.js", "React"] },
  { id: "Gps",          title: "GPS Tracking",         cat: "prjCatData",     image: im8,          stack: ["Java", "Spring Boot"] },
  { id: "Smartshop",    title: "SmartShop",            cat: "prjCatPlatform", image: im2,          stack: ["Symfony 7", "EasyAdmin"] },
  { id: "Mailflow",     title: "MailFlow",             cat: "prjCatPlatform", image: mailflow,     stack: ["Express", "Prisma", "Nodemailer"] },
  { id: "Glink",        title: "Glink",                cat: "prjCatPlatform", image: glink,        stack: ["React", "Express", "Prisma"] },
  { id: "Cmz",          title: "ConsoMyZone",          cat: "prjCatData",     image: cmz,          stack: ["Symfony 6", "MapLibre", "FastAPI", "PostgreSQL", "Meilisearch"], link: "https://consomyzone.com/", company: "Géomadagascar" },
  { id: "Enrich",       title: "Enrich",               cat: "prjCatData",     image: enrich,       stack: ["Python", "PostgreSQL", "DuckDB", "RapidFuzz", "OpenStreetMap", "Wikidata"], company: "Géomadagascar", extra: [enrich_python] },
  // { id: "Kanban",       title: "Agile Kanban",         cat: "prjCatBusiness", image: im7,          stack: ["Node.js", "Express"] },
  // Projets entreprise désactivés (réimporter scap / geomada pour les réactiver) :
  // { title: t("project10Title"),    description: t("project10Desc"),      image: scrap },
  // { title: t("companyWebsite"),    description: t("companyWebsiteDesc"), image: geomada,  link: "https://www.geomadagascar.com/" },
];

const CATEGORIES = ["prjCatBusiness", "prjCatPlatform", "prjCatData"];

/* Image de couverture + images supplémentaires + dossier galerie */
PROJECTS.forEach((p) => { p.images = [p.image, ...(p.extra || []), ...galleryOf(p.id)]; });

function StatusBadge({ project }) {
  const { t } = useLanguage();
  return project.link ? (
    <span className="project-status is-live"><span className="dot-live" />{t("prjStatusLive")}</span>
  ) : (
    <span className="project-status"><FontAwesomeIcon icon={faLock} />{t("privateProject")}</span>
  );
}

function Lightbox({ projects, index, setIndex, startImage = 0, onClose }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [img, setImg] = useState(startImage);
  const thumbsRef = useRef(null);
  const touchX = useRef(null);
  const project = projects[index];
  const features = t(`prj${project.id}Features`);

  useLockBodyScroll(true);

  const images = project.images;

  /* Flèches : on parcourt les images du projet, puis on passe au projet voisin */
  const openProject = useCallback((i, atEnd = false) => {
    const target = (i + projects.length) % projects.length;
    setIndex(target);
    setImg(atEnd ? projects[target].images.length - 1 : 0);
  }, [projects, setIndex]);
  const prev = useCallback(() => (img > 0 ? setImg(img - 1) : openProject(index - 1, true)), [img, index, openProject]);
  const next = useCallback(() => (img < images.length - 1 ? setImg(img + 1) : openProject(index + 1)), [img, images.length, index, openProject]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  /* Garde la vignette active visible */
  useEffect(() => {
    thumbsRef.current?.children[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
    touchX.current = null;
  };

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className={`lightbox ${expanded ? "is-expanded" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lb-bar">
          <div className="lb-bar-title">
            <strong>{project.title}</strong>
            <span>{index + 1} / {projects.length}</span>
          </div>
          <div className="lb-tools">
            <button className="lb-icon-btn" onClick={() => setExpanded((e) => !e)} aria-label={expanded ? "Réduire" : "Agrandir"}>
              <FontAwesomeIcon icon={expanded ? faCompress : faExpand} />
            </button>
            <button className="lb-icon-btn is-danger" onClick={onClose} aria-label="Fermer">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>

        <div className="lb-body">
          <div className="lb-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img key={`${project.id}-${img}`} src={images[img]} alt={project.title} />
            {images.length > 1 && (
              <div className="lb-gallery">
                <span className="lb-count">{img + 1} / {images.length}</span>
                <div className="slide-dots">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      className={`slide-dot ${i === img ? "is-active" : ""}`}
                      onClick={() => setImg(i)}
                      aria-label={`${i + 1} / ${images.length}`}
                      aria-current={i === img}
                    />
                  ))}
                </div>
              </div>
            )}
            {(projects.length > 1 || images.length > 1) && (
              <>
                <button className="lb-nav prev" onClick={prev} aria-label="Précédent">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="lb-nav next" onClick={next} aria-label="Suivant">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}
          </div>

          <aside className="lb-panel">
            <div>
              <span className="lb-panel-label">
                {t(project.cat)}{project.company && ` · ${t("prjCompany")} ${project.company}`}
              </span>
              <h3>{project.title}</h3>
              <p className="lb-tagline">{t(`prj${project.id}Tagline`)}</p>
            </div>
            <p>{t(`prj${project.id}Desc`)}</p>
            {Array.isArray(features) && (
              <div>
                <span className="lb-panel-label">{t("prjFeatures")}</span>
                <ul className="lb-features">
                  {features.map((f) => (
                    <li key={f}><FontAwesomeIcon icon={faCheck} />{f}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <span className="lb-panel-label">Stack</span>
              <div className="tech-tags">
                {project.stack.map((s) => <span key={s} className="tech-tag">{s}</span>)}
              </div>
            </div>
            {project.link ? (
              <a className="btn btn-primary btn-sm" href={project.link} target="_blank" rel="noopener noreferrer">
                {t("seeProject")}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: 12 }} />
              </a>
            ) : (
              <StatusBadge project={project} />
            )}
          </aside>
        </div>

        <div ref={thumbsRef} className="lb-thumbs">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`lb-thumb ${i === index ? "is-active" : ""}`}
              onClick={() => openProject(i)}
              aria-label={p.title}
            >
              <img src={p.image} alt="" loading="lazy" />
              {p.images.length > 1 && <span className="lb-thumb-count">{p.images.length}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);
  const [startImage, setStartImage] = useState(0);
  const openLightbox = (i, image = 0) => { setStartImage(image); setOpenIndex(i); };

  const visible = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);
  const filters = [
    { key: "all", label: t("all"), count: PROJECTS.length },
    ...CATEGORIES.map((c) => ({ key: c, label: t(c), count: PROJECTS.filter((p) => p.cat === c).length })),
  ];

  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      <div className="filter-bar" role="tablist" aria-label={t("projects")}>
        {filters.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={`filter-chip ${filter === f.key ? "is-active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="count">{f.count}</span>
          </button>
        ))}
      </div>

      {/* key={filter} : la grille est recréée pour rejouer la cascade */}
      <div key={filter} className="projects-grid stagger" role="tabpanel">
        {visible.map((project, index) => (
          <article key={project.id} className="project-card" style={{ "--i": index }}>
            <ProjectSlider images={project.images} title={project.title} onOpen={(image) => openLightbox(index, image)}>
              <span className="project-num">{String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}</span>
              {project.link && <StatusBadge project={project} />}
              <span className="project-peek">
                <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} style={{ fontSize: 12 }} />
                {t("preview")}
                {project.images.length > 1 && <span className="project-peek-count"> {project.images.length}</span>}
              </span>
            </ProjectSlider>

            <div className="project-body">
              {project.company && (
                <span className="project-company">{t("prjCompany")} · {project.company}</span>
              )}
              <span className="project-kicker">{t(`prj${project.id}Tagline`)}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{t(`prj${project.id}Desc`)}</p>
              <div className="tech-tags">
                {project.stack.map((s) => <span key={s} className="tech-tag">{s}</span>)}
              </div>

              <div className="project-actions">
                {project.link ? (
                  <a className="link-arrow" href={project.link} target="_blank" rel="noopener noreferrer">
                    {t("seeProject")}
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </a>
                ) : (
                  <span className="link-muted">
                    <FontAwesomeIcon icon={faLock} style={{ fontSize: 11 }} />
                    {t("privateProject")}
                  </span>
                )}
                <button className="link-plain" onClick={() => openLightbox(index)}>
                  {t("preview")}
                  <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 11 }} />
                </button>
              </div>
            </div>
          </article>
        ))}

        {filter === "all" && (
          <a
            className="project-more"
            href="https://github.com/likwel"
            target="_blank"
            rel="noopener noreferrer"
            style={{ "--i": visible.length }}
          >
            <span className="icon-tile"><FontAwesomeIcon icon={faGithub} /></span>
            <h3>{t("seeMore")}</h3>
            <p>{t("seeMoreDesc")}</p>
            <span className="link-arrow">
              github.com/likwel
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </span>
          </a>
        )}
      </div>

      {openIndex !== null && visible[openIndex] && (
        <Lightbox
          projects={visible}
          index={openIndex}
          setIndex={setOpenIndex}
          startImage={startImage}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
