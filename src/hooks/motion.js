import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* Passe à true la première fois que l'élément entre dans le viewport */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold, rootMargin });

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/* Compteur animé 0 → target, déclenché par `start` */
export function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) { setValue(target); return; }

    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}

/*
 * Expose la progression du scroll dans --scroll (0 → 1) et l'état
 * data-scrolled / data-scrolled-far sur <html>, sans re-render React.
 */
export function useScrollVars() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      root.style.setProperty("--scroll", progress.toFixed(4));
      root.dataset.scrolled = y > 8 ? "true" : "false";
      root.dataset.scrolledFar = y > 480 ? "true" : "false";
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = "ResizeObserver" in window ? new ResizeObserver(schedule) : null;
    ro?.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
}

export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}

/* Handler onPointerMove : position du curseur dans --mx / --my (halo des cartes) */
export function trackPointer(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
