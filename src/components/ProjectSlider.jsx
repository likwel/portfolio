import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../contexts/LanguageContext";
import { prefersReducedMotion } from "../hooks/motion";

const INTERVAL = 2200;

/*
 * Carrousel d'images d'une carte projet : fondu enchaîné, lecture auto
 * au survol (avec barre de progression), flèches, points et balayage tactile.
 */
export default function ProjectSlider({ images, title, onOpen, children }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const touchX = useRef(null);
  const rootRef = useRef(null);
  const many = images.length > 1;

  /* Lecture auto tant que la souris survole la carte entière */
  useEffect(() => {
    const card = rootRef.current?.closest(".project-card");
    if (!card || !many) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    card.addEventListener("mouseenter", on);
    card.addEventListener("mouseleave", off);
    return () => { card.removeEventListener("mouseenter", on); card.removeEventListener("mouseleave", off); };
  }, [many]);

  useEffect(() => {
    if (!playing || !many || prefersReducedMotion()) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), INTERVAL);
    return () => clearInterval(id);
  }, [playing, many, images.length]);

  const go = (step) => (e) => {
    e.stopPropagation();
    setActive((i) => (i + step + images.length) % images.length);
  };

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null || !many) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) setActive((i) => (i + (dx > 0 ? -1 : 1) + images.length) % images.length);
    touchX.current = null;
  };

  return (
    <div
      ref={rootRef}
      className="project-media"
      onClick={() => onOpen(active)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === active ? title : ""}
          aria-hidden={i !== active}
          loading="lazy"
          className={`slide ${i === active ? "is-active" : ""}`}
        />
      ))}

      {children}

      {many && (
        <>
          <button className="slide-nav prev" onClick={go(-1)} aria-label={t("prevImage")}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="slide-nav next" onClick={go(1)} aria-label={t("nextImage")}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <div className="slide-dots" onClick={(e) => e.stopPropagation()}>
            {images.map((src, i) => (
              <button
                key={src}
                className={`slide-dot ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`${i + 1} / ${images.length}`}
                aria-current={i === active}
              />
            ))}
          </div>
          {playing && <span key={active} className="slide-progress" style={{ animationDuration: `${INTERVAL}ms` }} />}
        </>
      )}
    </div>
  );
}
